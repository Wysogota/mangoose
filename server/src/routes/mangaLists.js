const { Router } = require('express');
const Controller = require('../controllers/mangaLists.controller');
const { tokenChecker, permissionChecker } = require('../middlewares');
const { PERMISSION: { RECOMMENDATION } } = require('../constants');

const router = Router();

router.post('/', tokenChecker, Controller.getLists);
router.post('/list', tokenChecker, Controller.getList);
router.post('/add', tokenChecker, Controller.addMangaToList);
router.post('/remove', tokenChecker, Controller.removeMangaFromList);

router.get('/recommendation/', Controller.getRecommendationList);
router.post('/recommendation/full',
  tokenChecker, permissionChecker(RECOMMENDATION),
  Controller.getFullRecommendationList
);
router.post('/recommendation/add',
  tokenChecker, permissionChecker(RECOMMENDATION),
  Controller.addMangaToRecommendation
);
router.post('/recommendation/remove',
  tokenChecker, permissionChecker(RECOMMENDATION),
  Controller.removeMangaFromRecommendation
);

module.exports = router;