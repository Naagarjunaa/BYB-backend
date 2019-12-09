const router = express.Router();
const { listFiles, listOfFiles } = require('./listFiles.controller');

router.get("/file", listFiles);
router.get("/list-of-files", listOfFiles)

module.exports = router;