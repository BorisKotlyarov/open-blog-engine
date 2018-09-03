const crypto                    = require('crypto');
const UsersModel                = require('../../models/Users');
const SessionsModel             = require('../../models/Sessions');


module.exports = {

    POST: {
        '/authorize': function(request, response) {

            let find = {
                login: request.body.login,
                password: request.body.password,
            }; //This variable is intended only to see which fields should be in the body of the request

            UsersModel.findUser(find)
                .then((error, user) => {
                    if (null === user) {
                        response.error(403);
                        return;
                    }
                    return SessionsModel.insert(user.id);
                })
                .then((session) => {
                    response.resp(session);
                })
                .catch((error)=> {
                    response.error(500, error.stack);
                });
        },

        '/authorize/close': function(request, response){

            SessionsModel.findOne({
                token: request.headers['access-token']
            }, (error, session) => {

                if (null === session) {
                    response.status(403).send({error: 403, message: 'Forbidden'});
                    return;
                }

                session.state = 'close';
                session.save();

                response.json(session);
            });
        }
    }

};
