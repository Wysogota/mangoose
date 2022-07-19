const { Router } = require('express');
const Controller = require('../controllers/author.controller');

const router = Router();

router.get('/:authorName', Controller.getAuthorManga);

module.exports = router;