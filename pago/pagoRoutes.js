var express = require('express');
var router = express.Router();
var pagoController = require('./pagoController.js');

/*
 * GET
 */
router.get('/', pagoController.list);

/*
 * GET
 */
router.get('/:id', pagoController.show);

/*
 * POST
 */
router.post('/', pagoController.create);

/*
 * PUT
 */
router.put('/:id', pagoController.update);

/*
 * DELETE
 */
router.delete('/:id', pagoController.remove);

module.exports = router;
