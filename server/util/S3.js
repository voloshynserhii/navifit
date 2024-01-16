const AWS = require('aws-sdk')
const config = require('../../config')
const stream = require('stream')
const JSZip = require('jszip')

/**
 * Init AWS S3
 * @type {S3}
 */
let s3

if (
  config.s3.accessKeyId
  && config.s3.secretAccessKey
  && config.s3.region
  && config.s3.bucketCommon
  && config.s3.bucketName
) {
  s3 = new AWS.S3({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
    region: config.s3.region,
  })

  /**
   * Check connection
   */
  s3.listBuckets()
    .promise()
    .then(async() => {
      console.log('[OK] Application connect to S3')

      /**
       * Check exist bucket
       */
      const checkExistBucket = (Bucket) =>
        s3.headBucket({ Bucket })
          .promise()
          .then(() => console.log(`[OK] Bucket "${Bucket}" is done`))
          .catch(() => console.log(`[FAILED] Unable to connect to bucket ${Bucket}`))

          // .catch(() => {
          //   s3.createBucket({
          //     Bucket,
          //     ACL: 'private',
          //     CreateBucketConfiguration: { LocationConstraint: config.s3.region, },
          //   }).promise()
          //     .then(() => console.log(`[OK] Bucket "${Bucket}" for upload secure files is created`))
          //     .then(() =>
          //       s3.putBucketEncryption({
          //         Bucket,
          //         ServerSideEncryptionConfiguration: {
          //           Rules: [
          //             { ApplyServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256', } },
          //           ]
          //         },
          //       })
          //         .promise()
          //         .then(() => console.log(`[OK] Bucket "${Bucket}" - encrypted AES256`))
          //         .catch(() => console.log(`[FAILED] Unable to encryption bucket ${Bucket}`))
          //     )
          //     .then(() =>
          //       s3.putBucketLifecycle({
          //         Bucket,
          //         LifecycleConfiguration: {
          //           Rules: [
          //             {
          //               ID: 'GlacierArchive',
          //               Status: 'Enabled',
          //               Prefix: '/',
          //               Transition: {
          //                 Days: 1,
          //                 StorageClass: 'GLACIER',
          //               },
          //               Expiration: { Days: 30, }
          //             }
          //           ],
          //         },
          //       })
          //         .promise()
          //         .then(() => console.log(`[OK] Bucket "${Bucket}" added Lifecycle for backup`))
          //         .catch(() => console.log(`[FAILED] Unable to enable backup for bucket ${Bucket}`))
          //     )
          //     .catch(() => console.log(`[FAILED] Unable to create bucket ${Bucket}`))
          // })

        await checkExistBucket(config.s3.bucketName)
        await checkExistBucket(config.s3.bucketCommon)
      })
      .catch(() => console.log('[FAILED] Unable to establish connection to S3'))
} else {
  console.error('[FAILED] No configs for S3')
}


/**
 * Tools
 * @type {{}}
 */
const Actions = {
  /**
   * Delete dir
   * @param dir
   */
  deleteDir(dir) {
    const listParams = {
      Bucket: config.s3.bucketName,
      Prefix: dir
    }

    return s3 && s3.listObjectsV2(listParams)
      .promise()
      .then(listedObjects => {
        if (listedObjects.Contents.length === 0) {
          return
        }

        const deleteParams = {
          Bucket: config.s3.bucketName,
          Delete: { Objects: [] }
        }

        listedObjects.Contents.forEach(({ Key }) => {
          deleteParams.Delete.Objects.push({ Key })
        })

        return s3.deleteObjects(deleteParams)
          .promise()
          .then(() => {
            if (listedObjects.IsTruncated) {
              return Actions.deleteDir(dir)
            }
          })
      })
      .catch(error => console.log(error))
  },

  /**
   * Delete object
   * @param key
   */
  deleteObj(key) {
    return s3 && s3.deleteObject({
      Bucket: config.s3.bucketName,
      Key: key,
    }).promise()
  },

  /**
   * Exist object
   * @param key
   * @param common
   */
  existObj(key, common = false) {
    return s3.headObject({
      Bucket: common ? config.s3.bucketCommon : config.s3.bucketName,
      Key: key,
    }).promise()
  },

  /**
   * Upload file
   * @param key
   * @param body
   * @param common
   */
  upload({ key, body, common = false }) {
    const uploadParams = {
      Bucket: common ? config.s3.bucketCommon : config.s3.bucketName,
      Key: key,
    }
    if (body) {
      uploadParams.Body = body
    }
    return s3 && s3.putObject(uploadParams).promise()
  },

  /**
   * Upload Stream
   * @param Key
   * @param common
   */
  uploadStream({ Key, common = false }) {
    const pass = new stream.PassThrough()
    return {
      writeStream: pass,
      promise: s3
        .upload({
          Key,
          Body: pass,
          Bucket: common ? config.s3.bucketCommon : config.s3.bucketName
        })
        .promise(),
    }
  },

  /**
   * Get doc
   * @param key
   * @param common
   */
  get(key, common = false) {
    return s3.getObject({
      Bucket: common ? config.s3.bucketCommon : config.s3.bucketName,
      Key: key,
    })
  },

  /**
   * Rename
   * @param olkKey
   * @param newKey
   * @returns {Promise}
   */
  rename(olkKey, newKey) {
    return s3 && s3.copyObject({
      Bucket: config.s3.bucketName,
      CopySource: `/${config.s3.bucketName}/${olkKey}`,
      Key: newKey
    })
      .promise()
      .then(() => Actions.deleteObj(olkKey))
  },

  /**
   * Get Zip file
   * @param files
   * @param res
   */
  zip({ files = [], res }) {
    const zip = new JSZip()

    for (const { key, path } of files) {
      if (!Actions.existObj(key)) {
        res.sendStatus(404)
      }

      zip.file(path, Actions.get(key).createReadStream(), { binary: true })
    }

    return zip
      .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(res)
  },
}

module.exports = Actions
