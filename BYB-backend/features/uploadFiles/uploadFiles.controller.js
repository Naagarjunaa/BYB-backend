const PromiseFtp = require("promise-ftp");
const ftp = new PromiseFtp();
const ftpConfig = require("../../config/keys");

const upload = async (request, response, next) => {
    try {
        console.log(request);
        if (request.files) {
            const file = request.files.filename;
            const filename = file.name;

            file.mv("./uploads/" + filename, function (err) {
                if (err) {
                    console.log(err);
                    res.send("error occured");
                }
                else {
                    ftp.connect({
                        host: ftpConfig.host,
                        user: ftpConfig.user,
                        password: ftpConfig.password
                    })
                        .then(function (serverMessage) {
                            console.log("Server message: " + serverMessage);
                            return (
                                ftp.put(
                                    "./uploads/" + filename,  `./${ftpConfig.destPath}/` + filename
                                )
                            );
                        }).then(function (serverMessage) {
                            return ftp.end();
                        })  
                    response.send("Uploaded Successfully");
                }
            })
        }

    } catch (error) {
        response.status(401).json({
            message: error.error
        });
    }
}



module.exports = {
    upload
};