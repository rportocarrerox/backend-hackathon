mongoose-gen -m comerciox -f convenio,KAM,RUC,NombreComercialMarca,Categoria,Promocion,Desde,Hasta,Campana,TC,TD,PSI,PV,Direcciones,latitude,longitude,TerminosyCondiciones,Masa,Core, -r -t m
        create: ./comerciox/comercioRoutes.js
        create: ./comerciox/comercioModel.js
        create: ./comerciox/comercioController.js
