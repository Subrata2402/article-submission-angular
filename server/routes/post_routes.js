const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const { authenticate, verifyEditor, verifyReviewer, verifySuperAdmin } = require('../middleware/authentication');
const authSchema = require('../validators/authValidator');
const validate = require('../middleware/validator');
const { upload } = require('../middleware/multer');

const articleUploadFields = [
    { name: "menuscript", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
    { name: "supplementaryFile", maxCount: 1 },
    { name: "mergedScript", maxCount: 1 }
];

// POST Routes
router.post('/article/add-article', authenticate, upload.fields(articleUploadFields), postController.addArticle);
router.post('/auth/register', validate(authSchema.register), authController.register);
router.post('/auth/login', validate(authSchema.login), authController.login);
router.post('/mail-api/send-mail', postController.sendMail);
router.post('/auth/verify-email', authController.verifyEmail);
router.post('/auth/reset-password', authController.resetPassword);
router.post('/journal/add-journal', authenticate, verifySuperAdmin, postController.addJournal);
router.post('/auth/update-profile', authenticate, upload.single('profile-picture'), authController.updateProfile);
router.post('/auth/validate-user', authController.validateUser);
router.post("/article/update-article", authenticate, verifyEditor, postController.updateArticle);
router.post("/reviewer/add-reviewer", authenticate, verifyEditor, postController.addReviewer);
router.post("/reviewer/add-bulk-reviewer", authenticate, verifyEditor, postController.addBulkReviewer);
router.post("/article/update-review", authenticate, verifyReviewer, postController.updateReview);
router.post("/zip/create-zip", authenticate, verifyEditor, postController.createZip);
router.post("/editor/add-editor", authenticate, verifySuperAdmin, postController.addEditor);

module.exports = router;