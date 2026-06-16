const express = require('express'); 
const app = express();              

const PORT = process.env.PORT || 8080; 

app.get('/', (req, res) => {
    res.send('Selamat datang di API Manajemen Buku! Server berhasil berjalan.');
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server berjalan di port ${PORT}`);
});