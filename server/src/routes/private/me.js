const { Router } = require('express');
const Controller = require('../../controllers/user.controller');

const router = Router();

router.get('/', Controller.getMe);

module.exports = router;