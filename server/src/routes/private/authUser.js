const { Router } = require('express');
const Controller = require('../../controllers/authUser.controller');

const router = Router();

router.get('/:userId', Controller.getAuthUser);

module.exports = router;