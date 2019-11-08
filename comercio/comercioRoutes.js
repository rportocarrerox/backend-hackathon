var express = require('express');
var router = express.Router();
var comercioController = require('./comercioController.js');

/*
 * GET
 */
router.get('/', comercioController.list);

/*
 * GET
 */
router.get('/:id', comercioController.show);

/*
 * POST
 */
router.post('/', comercioController.create);

/*
 * PUT
 */
router.put('/:id', comercioController.update);

/*
 * DELETE
 */
router.delete('/:id', comercioController.remove);

/*
 * GET RUC
 */
router.get('/ruc/:id', comercioController.showruc);

/*
 * GET ALL
 */
router.get('/all/v1', comercioController.todos);

module.exports = router;
