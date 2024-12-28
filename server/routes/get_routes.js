const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const { authenticate, verifyEditor, verifyReviewer, verifySuperAdmin } = require('../middleware/authentication');

// GET Routes
router.get('/article/get-article', authenticate, postController.getArticle);
router.get('/auth/logout', authenticate, authController.logout);
router.get('/auth/user', authenticate, authController.userProfile);
router.get('/journal/get-journal-list', postController.getJournalList);
router.get('/journal/delete-journal/:journalId', authenticate, verifySuperAdmin, postController.deleteJournal);
router.get("/article/get-article-list/:journalId", postController.getArticleList);
router.get("/user/get-user-list", authenticate, verifyEditor, authController.userList);
router.get("/reviewer/get-reviewer-list", authenticate, verifyEditor, postController.getReviewerList);
router.get("/article/get-review-articles", authenticate, verifyReviewer, postController.getReviewArticles);
router.get("/reviewer/delete-reviewer/:reviewerId", authenticate, verifyEditor, postController.deleteReviewer);
router.get("/zip/download-zip/:filename", postController.downloadZip);
router.get("/editor/remove-editor/:journalId", authenticate, verifySuperAdmin, postController.removeEditor);

module.exports = router;