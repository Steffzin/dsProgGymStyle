const express = require('express');
const database = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(database.products);
});


router.post('/cart', (req, res) => {
    const { userId, productId } = req.body;

    if (!database.users.find((user) => user.id === userId)) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    const product = database.products.find((product) => product.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado!' });
    }

    if (!database.carts[userId]) {
        database.carts[userId] = [];
    }
    database.carts[userId].push(product);

    res.status(200).json({ message: 'Produto adicionado ao carrinho!' });
});

router.get('/cart/:userId', (req, res) => {
    const { userId } = req.params;

    const cart = database.carts[userId] || [];
    res.json(cart);
});

module.exports = router;