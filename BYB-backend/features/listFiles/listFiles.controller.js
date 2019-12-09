const PromiseFtp = require("promise-ftp");
const ftp = new PromiseFtp();
const ftpConfig = require("../../config/keys");

const listFiles = async (request, response, next) => {
    try {
        ftp.connect({
            host: ftpConfig.host,
            user: ftpConfig.user,
            password: ftpConfig.password
        })
            .then(function (serverMessage) {
                console.log('Server message: ' + serverMessage);
                return ftp.list('/Documents');
            }).then(function (list) {
                console.log('Directory listing:');
                console.dir(list);
                response.send(list)
                return ftp.end();
            });
    } catch (error) {
        response.status(401).json({
            message: error.error
        });
    }
}

const listOfFiles = async (request, response, next) => {
    const fileNames = [];
    try {
        ftp.connect({
            host: ftpConfig.host,
            user: ftpConfig.user,
            password: ftpConfig.password
        })
            .then(function (serverMessage) {
                console.log('Server message: ' + serverMessage);
                return ftp.list('/Documents');
            }).then(function (list) {
                list.forEach((obj) => {
                    fileNames.push(obj.name);
                })
                response.send(fileNames)
                return ftp.end();
            });
    } catch (error) {
        response.status(401).json({
            message: error.error
        });
    }
}

module.exports = {
    listFiles,
    listOfFiles
};