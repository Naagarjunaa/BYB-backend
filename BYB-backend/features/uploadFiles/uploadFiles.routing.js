const { upload } = require('./uploadFiles.controller');
const router = express.Router();

router.post('/data', upload);

module.exports = router