const uploadFilesRoutes = require('./features/uploadFiles/uploadFiles.routing');
const listFilesRoutes = require('./features/listFiles/listFiles.routing');
const downloadFilesRoutes = require('./features/downloadFiles/downloadFiles.routing');

app.use("/upload",uploadFilesRoutes);
app.use("/list",listFilesRoutes);
app.use("/download",downloadFilesRoutes);
