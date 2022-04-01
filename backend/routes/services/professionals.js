const express = require('express');
const professionalController = require('../../controllers/services/professionals');


const router = express.Router();

router.post('/',professionalController.createProfessional);
router.get('/',professionalController.getProfessionals);
router.get('/:id',professionalController.getProfessional);
router.put('/:id',professionalController.updateProfessional);
router.delete('/:id',professionalController.deleteProfessional);

module.exports = router;