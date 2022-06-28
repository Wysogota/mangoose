const { Router } = require('express');
const Controller = require('../controllers/manga.controller');

const router = Router();

router.get('/:mangaId', Controller.getManga);

module.exports = router;