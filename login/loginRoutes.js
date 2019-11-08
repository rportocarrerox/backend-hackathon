var express = require('express');
var router = express.Router();
var loginController = require('./loginController.js');

/*
 * GET
 */
router.get('/', loginController.list);

/*
 * GET
 */
router.get('/:id', loginController.show);

/*
 * POST
 */
router.post('/', loginController.create);

/*
 * PUT
 */
router.put('/:id', loginController.update);

/*
 * DELETE
 */
router.delete('/:id', loginController.remove);

module.exports = router;
