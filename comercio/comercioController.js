var comercioModel = require('./comercioModel.js');

/**
 * comercioController.js
 *
 * @description :: Server-side logic for managing comercios.
 */
module.exports = {

    /**
     * comercioController.list()
     */
    list: function (req, res) {

        comercioModel.find({}, 'latitude longitude convenio', function (err, comercios) {
            if (err) {
                return res.status(500).json({
                    message: 'Error comercio.',
                    error: err
                });
            }

            let ofertas = obtenerOfertasCercanas(req.query.lat,req.query.lon, comercios);

            comercioModel.find({convenio:{$in:ofertas}}, function (err, comercios) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting comercio.',
                        error: err
                    });
                }
                return res.json(comercios);
            });
            return false;
        });
    },

    /**
     * comercioController.todos()
     */
    todos: function (req, res) {
        comercioModel.find(function (err, comercios) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comercio.',
                    error: err
                });
            }
            return res.json(comercios);
        });
    },

    /**
     * comercioController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        comercioModel.findOne({convenio: id}, function (err, comercio) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when select convenio.',
                    error: err
                });
            }
            if (!comercio) {
                return res.status(404).json({
                    message: 'No such comercio'
                });
            }
            return res.json(comercio);
        });
    },

    /**
     * comercioController.showruc()
     */
    showruc: function (req, res) {
        var id = req.params.id;
        comercioModel.find({RUC: id}, function (err, comercio) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when get RUC.',
                    error: err
                });
            }
            if (!comercio) {
                return res.status(404).json({
                    message: 'No such RUC'
                });
            }
            return res.json(comercio);
        });
    },

    /**
     * comercioController.create()
     */
    create: function (req, res) {
        var comercio = new comercioModel({
            convenio : req.body.convenio,
            KAM : req.body.KAM,
            RUC : req.body.RUC,
            NombreComercialMarca : req.body.NombreComercialMarca,
            Categoria : req.body.Categoria,
            Promocion : req.body.Promocion,
            Desde : req.body.Desde,
            Hasta : req.body.Hasta,
            Campana : req.body.Campana,
            TC : req.body.TC,
            TD : req.body.TD,
            PSI : req.body.PSI,
            PV : req.body.PV,
            Direcciones : req.body.Direcciones,
            latitude : req.body.latitude,
            longitude : req.body.longitude,
            TerminosyCondiciones : req.body.TerminosyCondiciones,
            Masa : req.body.Masa,
            Core : req.body.Core,
            Premium : req.body.Premium
        });

        comercio.save(function (err, comercio) {
            if (err) {
                return res.status(500).json({
                    message: 'Error to create comercio',
                    error: err
                });
            }
            return res.status(201).json(comercio);
        });
    },

    /**
     * comercioController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        comercioModel.findOne({convenio: id}, function (err, comercio) {
            if (err) {
                return res.status(500).json({
                    message: 'Error to obten commerce',
                    error: err
                });
            }
            if (!comercio) {
                return res.status(404).json({
                    message: 'No existe convenio'
                });
            }

            comercio.convenio = req.body.convenio ? req.body.convenio : comercio.convenio;
            comercio.KAM = req.body.KAM ? req.body.KAM : comercio.KAM;
            comercio.RUC = req.body.RUC ? req.body.RUC : comercio.RUC;
            comercio.NombreComercialMarca = req.body.NombreComercialMarca ? req.body.NombreComercialMarca : comercio.NombreComercialMarca;
            comercio.Categoria = req.body.Categoria ? req.body.Categoria : comercio.Categoria;
            comercio.Promocion = req.body.Promocion ? req.body.Promocion : comercio.Promocion;
            comercio.Desde = req.body.Desde ? req.body.Desde : comercio.Desde;
            comercio.Hasta = req.body.Hasta ? req.body.Hasta : comercio.Hasta;
            comercio.Campana = req.body.Campana ? req.body.Campana : comercio.Campana;
            comercio.TC = req.body.TC ? req.body.TC : comercio.TC;
            comercio.TD = req.body.TD ? req.body.TD : comercio.TD;
            comercio.PSI = req.body.PSI ? req.body.PSI : comercio.PSI;
            comercio.PV = req.body.PV ? req.body.PV : comercio.PV;
            comercio.Direcciones = req.body.Direcciones ? req.body.Direcciones : comercio.Direcciones;
            comercio.latitude = req.body.latitude ? req.body.latitude : comercio.latitude;
            comercio.longitude = req.body.longitude ? req.body.longitude : comercio.longitude;
            comercio.TerminosyCondiciones = req.body.TerminosyCondiciones ? req.body.TerminosyCondiciones : comercio.TerminosyCondiciones;
            comercio.Masa = req.body.Masa ? req.body.Masa : comercio.Masa;
            comercio.Core = req.body.Core ? req.body.Core : comercio.Core;
            comercio.Premium = req.body.Premium ? req.body.Premium : comercio.Premium;

            comercio.save(function (err, comercio) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating comercio.',
                        error: err
                    });
                }
                return res.json(comercio);
            });
            return false;
        });
    },

    /**
     * comercioController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        comercioModel.findByIdAndRemove(id, function (err, comercio) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the comercio.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    getPosicionesOfertas: function () {
    },
};

function obtenerOfertasCercanas(latOrig, lonOrig, ofertas){
    const radioMts = 1000;
    let posiciones = [];
    for(let oferta of ofertas){
        let distancia = getDistanceFromLatLonInMts(latOrig, lonOrig, oferta.latitude, oferta.longitude )
        if (distancia <= radioMts) posiciones.push(oferta.convenio)
    }
        return posiciones;
}

function getDistanceFromLatLonInMts(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return (d*1020).toFixed(2);
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
