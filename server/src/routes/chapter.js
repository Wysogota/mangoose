const { Router } = require('express');
const Controller = require('../controllers/chapter.controller');

const router = Router();

router.get('/', Controller.getChapters);

module.exports = router;