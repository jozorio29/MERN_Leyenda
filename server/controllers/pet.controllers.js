import Pet from "../models/pet.models.js";

const createPet = async (req, res) => {
    try {
        const { petName } = req.body;

        // Verificar si la mascota ya existe
        const existingPet = await Pet.findOne({ petName });
        if (existingPet) {
            return res.status(400).json({ message: 'El nombre de la mascota ya existe. Por favor, elige otro nombre.' });
        }

        // Crear la nueva mascota
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).json({ message: 'Pet creada exitosamente', pet });
    } catch (error) {
        if (error.code === 11000) {
            // Error de unicidad
            res.status(400).json({ message: 'El nombre de la mascota ya existe. Por favor, elige otro nombre.' });
        } else {
            res.status(500).json({ message: 'Error al crear la mascota', error });
        }
    }
};

const getAllPets = async (req, res) => {
    try {
      const pet = await Pet.find();
      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener Pet' });
    }
  }

  const getOnePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet no encontrada' });
        }
        res.status(200).json( { pet } );
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la Pet' });
    }
}

const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet no encontrada' });
        }
        res.status(200).json({ message: 'Pet eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la musica' });
    }
}

const updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body , { runValidators: true, new: true });
        if (!pet) {
            return res.status(404).json({ message: 'Pet no encontrada' });
        }
        res.status(200).json({ message: 'Pet actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la Pet' });
    }
}

const updatePetLikes = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, { $inc: { petLike: 1 } }, { new: true });
        if (!pet) {
            return res.status(404).json({ message: 'Pet no encontrada' });
        }
        res.status(200).json({ message: 'Pet actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la Pet' });
    }
}


export { createPet, getAllPets, deletePet, updatePet, getOnePet, updatePetLikes };