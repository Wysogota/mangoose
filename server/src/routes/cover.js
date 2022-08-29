const { Router } = require('express');
const Controller = require('../controllers/cover.controller');

const router = Router();

router.get('/', Controller.getMangaCovers);
router.get('/:mangaId/:coverName', Controller.getCover);

module.exports = router;