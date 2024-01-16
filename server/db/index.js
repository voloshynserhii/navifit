const mongoose = require('mongoose')
const config = require('../config')
const tunnel = require('tunnel-ssh')

/**
 * Override Promise
 */
mongoose.Promise = global.Promise

const db = mongoose.connection

/**
 * Connect to DB
 */
const connectDb = (dbUri) => {
  if (!dbUri) {
    console.error('[FAILED] No configs for MongoDB')
    process.exit(-1)
  }

  mongoose.connect(dbUri, {
    maxPoolSize: 10,
    //keepAlive: true, // - Use this for big import scripts to prevent timeouts
    //socketTimeoutMS: 30000000, // - Use this for big import scripts to prevent timeouts
  })

  /**
   * Check connect
   */
  db.on('error', () => {
    console.error('[FAILED] Unable to establish connection to mongodb.')
    process.exit(-1)
  })

  db.once('open', () => {
    console.log('[OK] Application connect to mongodb')
  })
}

// if (config.server.env === 'development' && !!config.db.host) {
//   if (!config.sshTunnel.host || !config.sshTunnel.user || !config.sshTunnel.privateKey) {
//     console.error('[FAILED] No configs for tunnel-ssh')
//     process.exit(-1)
//   }

//   if (!config.db.password) {
//     console.error('[FAILED] No configs for DB')
//     process.exit(-1)
//   }

//   const privateKey = config.sshTunnel.privateKey.replace(/\\n/g, '\n')
//   const tunelConfig = {
//     host: config.sshTunnel.host,
//     username: config.sshTunnel.user,
//     privateKey,
//     dstHost: config.db.host,
//     dstPort: 27017,
//     localPort: 27000,
//   }

//   tunnel(tunelConfig, (error) => {
//     if (error) {
//       console.log('SSH connection error: ' + error)
//       process.exit(1)
//     }
//     connectDb(`mongodb://regdesk:${config.db.password}@localhost:27000/${config.db.name || 'rd'}`)
//   })
// } else {
//   connectDb(config.db.uri)
// }

connectDb(config.db.uri)

module.exports = {
  db,
//   agency: require('./models/Agency.model'),
//   application: require('./models/Application.model'),
//   applicationHash: require('./models/ApplicationHash.model'),
//   claims: require('./models/Claim.model'),
//   applicationAnswer: require('./models/ApplicationAnswer.model'),
//   applicationAutofillHistory: require('./models/ApplicationAutofillHistory.model'),
//   article: require('./models/Article.model'),
//   checklist: require('./models/Checklist.model'),
//   checklistType: require('./models/ChecklistType.model'),
//   checklistSubType: require('./models/ChecklistSubType.model'),
//   classification: require('./models/Classification.model'),
//   deficiency: require('./models/Deficiency.model'),
//   dicType: require('./models/DicType.model'),
//   pharmaDicType: require('./models/PharmaDicType.model'),
//   doc: require('./models/Doc.model').Doc,
//   generalDoc: require('./models/GeneralDoc.model'),
//   document: require('./models/Document.model'),
//   dmsAcl: require('./models/DMS.Acl.model'),
//   dmsContainer: require('./models/DMS.Container.model'),
//   dmsDocument: require('./models/DMS.Document.model'),
//   dmsFile: require('./models/DMS.File.model'),
//   dmsTag: require('./models/DMS.Tag.model'),
//   notification: require('./models/Notification.model'),
//   bannerNotice: require('./models/BannerNotice.model'),
//   pharmaceutical: require('./models/Pharmaceutical.model'),
//   product: require('./models/Product.model').Product,
//   productSnapshot: require('./models/Product.model').ProductSnapshot,
//   productFamily: require('./models/ProductFamily.model').ProductFamily,
//   productSolution: require('./models/ProductSolution.model').ProductSolution,
//   familySnapshot: require('./models/ProductFamily.model').FamilySnapshot,
//   productChecklist: require('./models/ProductChecklist.model'),
//   productChecklistItem: require('./models/ProductChecklistItem.model'),
//   project: require('./models/Project.model'),
//   projectChange: require('./models/ProjectChange.model'),
//   projectAttachment: require('./models/ProjectAttachment.model'),
//   projectControl: require('./models/ProjectControl.model'),
//   taskControl: require('./models/TaskControl.model'),
//   question: require('./models/Question.model').Question,
//   questionSnapshot: require('./models/Question.model').QuestionSnapshot,
//   regulationEcig: require('./models/RegulationEcig.model'),
//   releaseRegulationEcig: require('./models/ReleaseRegulationEcig.model'),
//   regulationPharma: require('./models/RegulationPharma.model').Regulation,
//   releaseRegulationPharma: require('./models/ReleaseRegulationPharma.model'),
//   regulationControl: require('./models/RegulationControl.model').Regulation,
//   releaseRegulationControl: require('./models/ReleaseRegulationControl.model'),
//   cacheControl: require('./models/CacheControl.model'),
//   regulation: require('./models/Regulation.model'),
//   regulationReport: require('./models/RegulationReport.model'),
//   releaseRegulation: require('./models/ReleaseRegulation.model'),
//   trigger: require('./models/Trigger.model'),
//   releaseTrigger: require('./models/ReleaseTrigger.model'),
//   section: require('./models/Section.model').Section,
//   sectionSnapshot: require('./models/Section.model').SectionSnapshot,
//   user: require('./models/User.model'),
//   userBehaviorAnalysis: require('./models/UserBehaviorAnalysis.model'),
//   wizard: require('./models/Wizard.model').Wizard,
//   wizardSnapshot: require('./models/Wizard.model').WizardSnapshot,
//   log: require('./models/Log.model'),
//   changeLog: require('./models/ChangeLog.model'),
//   certificate: require('./models/Certificate.model'),
//   tracking: require('./models/Tracking.model'),
//   projectType: require('./models/ProjectType.model'),
//   sku: require('./models/Sku.model').Sku,
//   skuSnapshot: require('./models/Sku.model').SkuSnapshot,
//   skuContact: require('./models/SkuContact.model'),
//   chat: require('./models/Chat.model'),
//   role: require('./models/Role.model'),
//   message: require('./models/Message.model'),
//   updates: require('./models/Updates.model'),
//   standard: require('./models/Standard.model'),
//   releaseStandard: require('./models/ReleaseStandard.model'),
//   standardWatchlist: require('./models/StandardWatchlist.model'),
//   tag: require('./models/Tag.model'),
//   signature: require('./models/Signature.model'),
//   passwordIsUnique: require('./helpers.js').passwordIsUnique,
//   comment: require('./models/Comment.model'),
//   versionsHistory: require('./models/VersionsHistory.model'),
//   countrySet: require('./models/CountrySet.model'),
//   bauschFieldsSuggestion: require('./models/BauschFieldsSuggestion.model'),
//   oneTimeNotice: require('./models/Onetimenotice.model'),
//   regulatoryPlans: require('./models/RegulatoryPlan.model'),
//   integration: require('./models/Integration.model'),
//   standardNote: require('./models/StandardNote.model'),
//   standardLogs: require('./models/StandardLogs.model'),
//   standardTags: require('./models/StandardTags.model'),
//   standardsAlert: require('./models/StandardsAlert.model'),
//   standardsNews: require('./models/StandardsNews.model'),
//   standardRules: require('./models/StandardRule.model'),
//   standardProduct: require('./models/StandardProduct'),
//   standardWorkflow: require('./models/StandardWorkflow.model'),
//   standardUser: require('./models/StandardUser.model'),
//   legislation: require('./models/Legislation.model'),
//   regPlan: require('./models/RegPlan.model'),
//   regPlanAnswer: require('./models/RegPlanAnswer.model'),
//   regPlanWizard: require('./models/RegPlanWizard.model'),
//   regPlanSection: require('./models/RegPlanSection.model'),
//   regPlanQuestion: require('./models/RegPlanQuestion.model'),
//   migration: require('./models/Migration.model'),
//   pharmaAlert: require('./models/PharmaAlert.model'),
//   pharmaRegulationReport: require('./models/PharmaRegulationReport.model'),
//   slice: require('./models/Slice.model'),
//   notificationLog: require('./models/NotificationLog.model'),
//   notifiedBody: require('./models/NotifiedBody.model'),
//   guide: require('./models/Guide.model'),
//   defaultAcl: require('./models/Default.Acl.model'),
//   auditTrails: require('./models/AuditTrail.model'),
//   businessUnit: require('./models/BusinessUnit.model'),
//   division: require('./models/Division.model'),
//   group: require('./models/Group.model'),
//   task: require('./models/Task.model'),
//   gspr: require('./models/Form.model').GSPR,
//   formDoc: require('./models/Form.model').FormDoc,
//   formChapter: require('./models/FormChapter.model').FormChapter,
//   formChapterSnapshot: require('./models/FormChapter.model').FormChapterSnapshot,
//   formSection: require('./models/FormSection.model').FormSection,
//   formSectionSnapshot: require('./models/FormSection.model').FormSectionSnapshot,
//   formRequirement: require('./models/FormRequirement.model').FormRequirement,
//   formRequirementSnapshot: require('./models/FormRequirement.model').FormRequirementSnapshot,
//   formAnswer: require('./models/FormAnswer.model'),
//   formAnswerMethodOfConformity: require('./models/FormAnswerMethodOfConformity.model'),
//   formTemplate: require('./models/FormTemplate.model').FormTemplate,
//   formTemplateSnapshot: require('./models/FormTemplate.model').FormTemplateSnapshot,
//   mdrContainer: require('./models/MDR.Container.model').MDRContainer,
//   mdrRelease: require('./models/MDR.Release.model'),
//   mdrDocType: require('./models/MDR.DocType.model'),
//   mdrReport: require('./models/MDR.Report.model'),
//   phrContainer: require('./models/PHR.Container.model').PHRContainer,
//   phrRelease: require('./models/PHR.Release.model'),
//   phrDocType: require('./models/PHR.DocType.model'),
//   phrReport: require('./models/PHR.Report.model'),
//   eSign: require('./models/ESign.model'),
//   package: require('./models/Package.model'),
//   advCategory: require('./models/AdvCategory.model'),
//   advTemplate: require('./models/AdvTemplate.model'),
  toObjectId: (id) => new mongoose.Types.ObjectId(id),
}
