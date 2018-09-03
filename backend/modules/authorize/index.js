const crypto                    = require('crypto');
const UsersModel                = require('../../models/Users');
const SessionsModel             = require('../../models/Sessions');


module.exports = {

    POST: {
        '/authorize': async function(request, response) {

            let body = await request.body;

            let find = {
                login: body.login,
                password: body.password,
            }; //This variable is intended only to see which fields should be in the body of the request

            try {
                let user = await UsersModel.findUser(find);

                if (null === user) {
                    response.error(403);
                    return;
                }

                let session = await SessionsModel.insert(user.id);

                response.resp(session);

            } catch(error){
                response.error(500, error.stack);
            }
        },

        '/authorize/close': async function(request, response){

            if (!request.headers['access-token']) {
                response.error(403);
                return;
            }

            try {
                let session = await SessionsModel.close(request.headers['access-token']);

                if (null === session) {
                    response.error(401);
                    return;
                }

                response.resp(session);

            } catch(error){
                response.error(500, error.stack);
            }

        }
    }

};
