const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/calificaciones', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calificaciones.html'));
});

app.get('/conversor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'conversor.html'));
});

app.post('/calcular-promedio', (req, res) => {
    const { nombre, unidad1, unidad2, unidad3 } = req.body;

    const u1 = parseFloat(unidad1);
    const u2 = parseFloat(unidad2);
    const u3 = parseFloat(unidad3);

    if (isNaN(u1) || isNaN(u2) || isNaN(u3)) {
        return res.status(400).json({ error: 'Calificaciones inválidas' });
    }

    const promedio = (u1 + u2 + u3) / 3;
    const estatus = promedio >= 6 ? 'Aprobado' : 'Reprobado';

    res.json({
        nombre,
        promedio,
        estatus
    });
});

app.post('/convertir-pesos', (req, res) => {
    const { pesos, tipoCambio } = req.body;

    const mxn = parseFloat(pesos);
    const tc = parseFloat(tipoCambio);

    if (isNaN(mxn) || isNaN(tc) || mxn < 0 || tc <= 0) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }

    const dolares = mxn / tc;

    res.json({
        pesos: mxn,
        tipoCambio: tc,
        dolares
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
