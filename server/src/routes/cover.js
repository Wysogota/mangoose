const { Router } = require('express');
const Controller = require('../controllers/cover.controller');

const router = Router();

router.get('/', Controller.getMangaCovers);

module.exports = router;