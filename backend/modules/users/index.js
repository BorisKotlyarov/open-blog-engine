const {Errors} = require('just-rest');
const UsersModel = require('../../models/Users');


module.exports = {

    GET: {
        '/users': async function (request, response) {
            try {
                if (null === this.session) {
                    throw new Errors(401);
                }

                if (!this.session.user.permissions.includes('all')) {
                    throw new Errors(403);
                }

                let users = await UsersModel.find({}).select('-password');
                response.resp(users);
            } catch (e) {
                response.error(e.statusCode || 500, e.message || null);
            }
        }
    },

    POST: {
        '/users': async function (request, response) {

            let body = await request.body;

            let data = {
                login: body.login,
                password: body.password,
            }; //This variable is intended only to see which fields should be in the body of the request

            try {
                let user = await UsersModel.create(data);

                if (1 == user._id) {
                    user.permissions = ['all'];
                    await user.save();
                }

                response.resp(user);
            } catch (e) {

                if (11000 === e.code) {
                    e.statusCode = 409;
                    e.message = `User with current login is already exist`;
                }

                response.error(e.statusCode || 500, e.message || null);
            }

        },
    },

    PUT: {
        '/users/([0-9]{1,})': async function (request, response, match) {
            try {
                let userId = parseInt(match[1]);

                if (null === this.session) {
                    throw new Errors(401);
                }

                if (this.session.user._id != userId || !this.session.user.permissions.includes('all')) {
                    throw new Errors(403);
                }

                let user = await UsersModel.findOne({_id: userId});

                if (!user) {
                    throw new Errors(404);
                }

                user = await request.body;
                await user.save();

                response.resp(user);
            } catch (e) {
                response.error(e.statusCode || 500, e.message || null);
            }
        },
    }

};
