var userModel = require('./userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when get users.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({userID: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when get at user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
            userID : req.body.userID,
            password : req.body.password,
            tipoDOC : req.body.tipoDOC,
            email : req.body.email,
            perfil : req.body.perfil,
            nombre : req.body.nombre,
            nombreCOM : req.body.nombreCOM
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({userID: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when get user to modified',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            user.userID = req.body.userID ? req.body.userID : user.userID;
            user.password = req.body.password ? req.body.password : user.password;
            user.tipoDOC = req.body.tipoDOC ? req.body.tipoDOC : user.tipoDOC;
            user.email = req.body.email ? req.body.email : user.email;
            user.perfil = req.body.perfil ? req.body.perfil : user.perfil;
            user.nombre = req.body.nombre ? req.body.nombre : user.nombre;
            user.nombreCOM = req.body.nombreCOM ? req.body.nombreCOM : user.nombreCOM;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
            return false;
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    login: function (req, res) {
        var userID = req.body.userID;
        var clave = req.body.password;
        userModel.findOne({userID: userID, password: clave}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when get the user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'Credenciales incorrectas'
                });
            }
            user.logueado = true;
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
            return false;
        });
    },

    logout: function (req, res) {
        var userID = req.body.userID;
        userModel.findOne({userID: userID}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error with user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No user find'
                });
            }
            user.logueado = false;
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error to updating user.',
                        error: err
                    });
                }
                return res.json(user);
            });
            return false;
        });
    }
};
