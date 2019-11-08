var pagoModel = require('./pagoModel.js');

/**
 * pagoController.js
 *
 * @description :: Server-side logic for managing pagos.
 */
module.exports = {

    /**
     * pagoController.list()
     */
    list: function (req, res) {
        pagoModel.find(function (err, pagos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting pago.',
                    error: err
                });
            }
            return res.json(pagos);
        });
    },

    /**
     * pagoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        pagoModel.findOne({codOperacion: id}, function (err, pago) {
            if (err) {
                return res.status(500).json({
                    message: 'Error to get pago.',
                    error: err
                });
            }
            if (!pago) {
                return res.status(404).json({
                    message: 'No such pago'
                });
            }
            return res.json(pago);
        });
    },

    /**
     * pagoController.create()
     */
    create: function (req, res) {
        var pago = new pagoModel({
            codOperacion : req.body.codOperacion,
            telefono : req.body.telefono,
            monto : req.body.monto,
            producto : req.body.producto,
            dateoperacion : req.body.dateoperacion,
            comercio : req.body.comercio
        });

        pago.save(function (err, pago) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating pago',
                    error: err
                });
            }
            return res.status(201).json(pago);
        });
    },

    /**
     * pagoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        pagoModel.findOne({codOperacion: id}, function (err, pago) {
            if (err) {
                return res.status(500).json({
                    message: 'Error to obtain pago',
                    error: err
                });
            }
            if (!pago) {
                return res.status(404).json({
                    message: 'No such pago'
                });
            }
            pago.codOperacion = req.body.codOperacion ? req.body.codOperacion : pago.codOperacion;
            pago.telefono = req.body.telefono ? req.body.telefono : pago.telefono;
            pago.monto = req.body.monto ? req.body.monto : pago.monto;
            pago.producto = req.body.producto ? req.body.producto : pago.producto;
            pago.dateoperacion = req.body.dateoperacion ? req.body.dateoperacion : pago.dateoperacion;
            pago.comercio = req.body.comercio ? req.body.comercio : pago.comercio;
            pago.save(function (err, pago) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating pago.',
                        error: err
                    });
                }

                return res.json(pago);
            });
            return false;
        });
    },

    /**
     * pagoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        pagoModel.findByIdAndRemove(id, function (err, pago) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the pago.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
