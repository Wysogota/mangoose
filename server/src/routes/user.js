const { Router } = require('express');
const multer = require('multer');
const Controller = require('../controllers/user.controller');
const { tokenChecker } = require('../middlewares');

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/me', tokenChecker, Controller.getMe);
router.post('/avatar', upload.single('avatar'), tokenChecker, Controller.setAvatar);
router.get('/avatar/default', Controller.getDefaultAvatar);
router.get('/avatar/:userId', Controller.getUserAvatar);
router.get('/:userId', Controller.getUser);

module.exports = router;