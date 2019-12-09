const router = express.Router();
const { downloadFiles } = require('./downloadFiles.controller');

router.post("/file", downloadFiles);

module.exports = router;