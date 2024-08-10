import express from 'express';
import { getAllPets, updatePet, createPet, deletePet, getOnePet, updatePetLikes } from '../controllers/pet.controllers.js';

const router = express.Router();

router.get('/pet', getAllPets);
router.get('/pet/:id', getOnePet);
router.put('/pet/:id', updatePet);
router.post('/pet', createPet);
router.delete('/pet/:id', deletePet);
router.patch('/:id/like', updatePetLikes);


export default router;