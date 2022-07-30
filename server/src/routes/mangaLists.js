const { Router } = require('express');
const Controller = require('../controllers/mangaLists.controller');
const tokenChecker = require('../middlewares/tokenChecker.mw');

const router = Router();

router.post('/', tokenChecker, Controller.addMangaToList);

module.exports = router;