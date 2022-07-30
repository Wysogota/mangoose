const { Router } = require('express');
const Controller = require('../controllers/mangaLists.controller');
const tokenChecker = require('../middlewares/tokenChecker.mw');

const router = Router();

router.get('/', tokenChecker, Controller.getLists);
router.post('/add', tokenChecker, Controller.addMangaToList);
router.delete('/remove', tokenChecker, Controller.removeMangaFromList);

module.exports = router;