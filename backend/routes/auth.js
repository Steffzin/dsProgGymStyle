const express = require('express');
const database = require('../database');

const router = express.Router();

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const userExists = database.users.find((user) => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já cadastrado!' });
    }

    const newUser = { id: database.users.length + 1, name, email, password };
    database.users.push(newUser);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = database.users.find((user) => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Email ou senha incorretos!' });
    }

    res.status(200).json({ message: 'Login bem-sucedido!', userId: user.id });
});

module.exports = router;