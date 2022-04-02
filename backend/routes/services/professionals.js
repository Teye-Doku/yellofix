const express = require('express');
const professionalController = require('../../controllers/services/professionals');


const router = express.Router();
const fileUpload = require('../../middleware/file-upload');

router.post('/',professionalController.createProfessional);
router.post('/login',professionalController.profLogin);
router.get('/',professionalController.getProfessionals);
router.get('/:id',professionalController.getProfessional);
router.put('/uploads/:id',fileUpload('uploads/professionals').single('image'),professionalController.uploadProfessionalImage)
router.put('/:id',professionalController.updateProfessional);
router.delete('/:id',professionalController.deleteProfessional);

module.exports = router;