const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('index', { profes, layout: false });
});

router.get('/sobre', (req, res) => {
    res.send('Página sobre');
});


module.exports = router;