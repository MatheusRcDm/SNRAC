const mongoose = require('mongoose');

// User Schema - Criar o esquema do usuário no banco de dados
const UserSchema = mongoose.Schema({

    // O ID do usuário é gerado automaticamente pelo próprio MongoDB e acessado posteriormente
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);