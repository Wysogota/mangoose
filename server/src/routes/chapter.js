const { Router } = require('express');
const Controller = require('../controllers/chapter.controller');

const router = Router();

router.get('/', Controller.getChapters);
router.get('/next', Controller.getNextChapterId);
router.get('/:chapterId', Controller.getChapter);
router.get('/pages/:chapterId', Controller.getChapterPages);


module.exports = router;