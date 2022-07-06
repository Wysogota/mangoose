const { Router } = require('express');
const Controller = require('../controllers/chapter.controller');

const router = Router();

router.get('/', Controller.getChapters);
router.get('/:chapterId', Controller.getChapterPages);

module.exports = router;