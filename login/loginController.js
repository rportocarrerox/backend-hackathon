var loginModel = require('./loginModel.js');

/**
 * loginController.js
 *
 * @description :: Server-side logic for managing logins.
 */
module.exports = {

    /**
     * loginController.list()
     */
    list: function (req, res) {
        loginModel.find(function (err, logins) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting login.',
                    error: err
                });
            }
            return res.json(logins);
        });
    },

    /**
     * loginController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        loginModel.findOne({userID: id}, function (err, login) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting login.',
                    error: err
                });
            }
            if (!login) {
                return res.status(404).json({
                    message: 'No such login'
                });
            }
            return res.json(login);
        });
    },

    /**
     * loginController.create()
     */
    // create: function (req, res) {
    //     var login = new loginModel({
	// 		userID : req.body.userID,
	// 		password : req.body.password

    //     });

    create:function (req, res) {
        //Login a registered user
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            res.send({ user })
        } catch (error) {
            res.status(400).send(error)
        }
    
    })

        login.save(function (err, login) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating login',
                    error: err
                });
            }
            return res.status(201).json(login);
        });
    },

    /**
     * loginController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        loginModel.findOne({userID: id}, function (err, login) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting login',
                    error: err
                });
            }
            if (!login) {
                return res.status(404).json({
                    message: 'No such login'
                });
            }

            login.userID = req.body.userID ? req.body.userID : login.userID;
			login.password = req.body.password ? req.body.password : login.password;
			
            login.save(function (err, login) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating login.',
                        error: err
                    });
                }

                return res.json(login);
            });
        });
    },

    /**
     * loginController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        loginModel.findByIdAndRemove(id, function (err, login) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the login.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
