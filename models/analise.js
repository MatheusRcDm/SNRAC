let mongoose = require('mongoose');

// Analise Schema - Criar o esquema da análise no banco de dados
let analiseSchema = mongoose.Schema({

    // O ID da análise é gerado automaticamente pelo próprio MongoDB e acessado posteriormente
    title:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },

    // Macro Nutrientes Folha
    valorCalcio_f:{
        type: Number,
    },
    valorEnxofre_f:{
        type: Number,
    },
    valorFosforo_f:{
        type: Number,
    },
    valorMagnesio_f:{
        type: Number,
    },
    valorNitrogenio_f:{
        type: Number,
    },
    valorPotassio_f:{
        type: Number,
    },

    // Micro Nutrientes Folha
    valorBoro_f:{
        type: Number,
    },
    valorFerro_f:{
        type: Number,
    },
    valorManganes_f:{
        type: Number,
    },
    valorOrganica_f:{
        type: Number,
    },
    valorCobre_f:{
        type: Number,
    },
    valorZinco_f:{
        type: Number,
    },

    // Macro Nutrientes Solo
    valorCalcio_s:{
        type: Number,
    },
    valorEnxofre_s:{
        type: Number,
    },
    valorFosforo_s:{
        type: Number,
    },
    valorMagnesio_s:{
        type: Number,
    },
    valorPotassio_s:{
        type: Number,
    },

    // Micro Nutrientes Solo
    valorBoro_s:{
        type: Number,
    },
    valorAcidez_s:{
        type: Number,
    },
    valorManganes_s:{
        type: Number,
    },
    valorOrganica_s:{
        type: Number,
    },
    valorCobre_s:{
        type: Number,
    },
    valorZinco_s:{
        type: Number,
    },
});

let Analise = module.exports = mongoose.model('Analise', analiseSchema);