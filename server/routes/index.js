const path = require('path')
const express = require('express')

// const Acl = require('../util/Acl')
// const Session = require('../util/Session')
// const Role = require('../util/Role')
// const Permission = require('../util/Permission')
// const Functions = require('../util/Functions')
// const FileControl = require('../util/FileControl')

// const Auth = require('../lib/Auth')

const router = express.Router()


// /**
//  * Module Auth
//  */
// router.post('/api/auth/', Auth.Check, Auth.Check2FA, Auth.Exec, Auth.Log)
// router.get('/api/auth/logout', Auth.Signout)
// router.post('/api/auth/email', Session.isAuth, Role.isAdmin, Role.isSU, Auth.LoginAs, Auth.Exec, Auth.Log)
// router.post('/api/auth/linkedEmail', Session.isAuth, Auth.LinkedLoginAs, Auth.Exec, Auth.Log)
// router.post('/api/auth/verify', Auth.Verify2FA, Auth.Exec, Auth.Log)
// router.post('/api/auth/resetPassword', Auth.ResetPassword)
// router.post('/api/auth/restorePassword', Auth.RestorePassword)
// router.get('/api/auth/azure', Auth.SsoAzureRedirect)
// router.get('/api/auth/okta', Auth.SsoOktaRedirect)
// router.post('/api/auth/validateEmailAndPassword', Session.isAuth, Auth.ValidateEmailAndPassword)
// router.post('/sso/callback', Auth.SsoAzureLogin, Auth.Log)
// router.post('/sso/okta', Auth.SsoOktaLogin, Auth.Log)

// /**
//  * Module Session
//  */
// router.get('/api/session/update', Session.isAuth, Session.Update)
// router.get('/api/session/check', Session.Check, Auth.Exec, Functions.Empty)
// router.get('/api/session/timeout', Session.Timeout)

// /**
//  * If not one router not found, send 404
//  */
router.use('/api/', (req, res) => { res.sendStatus(404) })

/**
 * Send static files for portal
 */
const staticPortal = path.resolve(__dirname, '../../public/portal')
const indexPortal = path.resolve(__dirname, '../../public/portal/index.html')

router.use('/', express.static(staticPortal))
router.use('/', (req, res) => res.sendFile(indexPortal))

module.exports = router
