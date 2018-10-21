const SessionsModel = require('./../../models/Sessions');

module.exports = {

    ANY: {
        '(.+?)': async function (request, response, match) {
            let instance = this;
            instance.session = null;

            if (request.headers['access-token']) {

                let session = await SessionsModel.findOne({token: request.headers['access-token']}).populate({
                    path: 'user',
                    model: 'Users'
                });

                instance.session = session;
            }

            return;
        }
    }

};