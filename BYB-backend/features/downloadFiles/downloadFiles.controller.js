const PromiseFtp = require("promise-ftp");
const ftp = new PromiseFtp();
const ftpConfig = require("../../config/keys");
const fs = require('fs')
// const list = require('../listFiles/listFiles.controller')

const downloadFiles = async (request, response, next) => {
    try {
        ftp.connect({
            host: ftpConfig.host,
            user: ftpConfig.user,
            password: ftpConfig.password
        })
            .then(function (serverMessage) {
                console.log('Server message: ' + serverMessage);
                // const result = list.listOfFiles()
                // console.log(result,'result');
                /* TODO: change the path that has written in hard coded */
                return ftp.get('./Documents/SpringSecurityNaaga.zip');
            }).then(function (stream) {
                console.log(stream);
                return new Promise(function (resolve, reject) {
                    stream.once('close', resolve);
                    stream.once('error', reject);
                    /* TODO: change the path that has written in hard coded */
                    stream.pipe(fs.createWriteStream('./downloads/SpringSecurityNaaga.zip'));
                });
            }).then(function () {
                response.send('downloaded successfully')
                return ftp.end();
            });
    } catch (error) {
        response.status(401).json({
            message: error.error
        });
    }
}



module.exports = {
    downloadFiles
};