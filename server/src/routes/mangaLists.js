const { Router } = require('express');
const Controller = require('../controllers/mangaLists.controller');
const tokenChecker = require('../middlewares/tokenChecker.mw');

const router = Router();

router.post('/', tokenChecker, Controller.getLists);
router.post('/list', tokenChecker, Controller.getList);
router.post('/add', tokenChecker, Controller.addMangaToList);
router.post('/remove', tokenChecker, Controller.removeMangaFromList);

module.exports = router;