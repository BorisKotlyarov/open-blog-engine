const {Errors} = require('just-rest');
const UsersModel = require('../../models/Users');
const SessionsModel = require('../../models/Sessions');


module.exports = {

    POST: {
        '/authorize': async function (request, response) {

            let body = await request.body;

            let find = {
                login: body.login,
                password: body.password,
            }; //This variable is intended only to see which fields should be in the body of the request

            let user = await UsersModel.findUser(find);

            if (null === user) {
                throw new Errors(401);
            }

            let session = await SessionsModel.create(user._id);

            response.resp(session);
        },

        '/authorize/close': async function (request, response) {

            if (!request.headers['access-token']) {
                throw new Errors(401);
            }

            let session = await SessionsModel.close(request.headers['access-token']);

            if (null === session) {
                throw new Errors(403);
            }

            response.resp(session);

        }
    }

};
