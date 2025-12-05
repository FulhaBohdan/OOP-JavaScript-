const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use('/gallery', express.static('gallery'));

const users = [
    { id: 1, name: 'Тарас', surname: 'Шевченко', email: 'taras@example.com' },
    { id: 2, name: 'Олександр', surname: 'Довженко', email: 'dovje@test.com' },
    { id: 3, name: 'Петро', surname: 'Порошенко', email: 'porox@test.com' }
];

// API для юзерів
app.get('/api/users', (req, res) => {
    let result = [...users];
    const { sort, order } = req.query;
    if (sort) {
        result.sort((a, b) => {
            const fieldA = a[sort]?.toLowerCase() || '';
            const fieldB = b[sort]?.toLowerCase() || '';
            if (fieldA < fieldB) return order === 'desc' ? 1 : -1;
            if (fieldA > fieldB) return order === 'desc' ? -1 : 1;
            return 0;
        });
    }
    res.json(result);
});

// API для галереї
app.get('/api/gallery', (req, res) => {
    const galleryPath = path.join(__dirname, 'gallery');
    fs.readdir(galleryPath, (err, files) => {
        if (err) return res.json([]);
        const images = files.filter(f => /\.(jpg|png|jpeg)$/i.test(f));
        res.json(images);
    });
});

// API для погоди
app.get('/weather', (req, res) => {
    res.json({ city: 'Kyiv', temperature: Math.floor(Math.random() * 31) });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));