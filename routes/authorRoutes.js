const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, authorController.getAuthors);
router.get('/:id', authenticateToken, authorController.getAuthorById);
router.post('/', authenticateToken, authorController.createAuthor);
router.put('/:id', authenticateToken, authorController.updateAuthor);
router.delete('/:id', authenticateToken, authorController.deleteAuthor);

module.exports = router;
