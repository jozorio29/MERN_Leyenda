import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: [true, 'Nombre de la mascota es requerido'],
        minlength: [2, 'Nombre demasiado corto'],
        unique: true
    },
    petType: {
        type: String,
        required: [true, 'Tipo de mascota es requerido'],
        minlength: [2, 'Tipo demasiado corto']
    },
    petDescription: {
        type: String,
        required: [true, 'Descripción de la mascota es requerida'],
        minlength: [2, 'Descripción demasiado corta']
    },
    petSkill1: {
        type: String
    },
    petSkill2: {
        type: String
    },
    petSkill3: {
        type: String
    },
    petLike: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
