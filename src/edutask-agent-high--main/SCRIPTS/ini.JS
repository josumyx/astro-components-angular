const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

const RAIZ = path.join(__dirname, '..');
const CARPETA_ESCUELAS = path.join(RAIZ, 'DB', 'escuelas');
const RUTA_USUARIOS = path.join(RAIZ, 'DB', 'usuarios.json');


function obtenerRutaEscuela(nombreEscuela) {
    const ruta = path.join(CARPETA_ESCUELAS, nombreEscuela);
    if (!fs.existsSync(ruta)) fs.mkdirSync(ruta, { recursive: true });
    return ruta;
}

function leerUsuarios() {
    return fs.existsSync(RUTA_USUARIOS) ? JSON.parse(fs.readFileSync(RUTA_USUARIOS, 'utf-8')) : [];
}


app.post('/api/registrar-escuela', (req, res) => {
    const { nombreEscuela } = req.body;
    const rutaEscuela = obtenerRutaEscuela(nombreEscuela);
    const archivoReportes = path.join(rutaEscuela, 'reportes.json');
    const archivoAreas = path.join(rutaEscuela, 'areas.json');
    if (fs.existsSync(archivoReportes)) return res.status(400).json({ mensaje: "La escuela ya existe" });
    fs.writeFileSync(archivoReportes, '[]');
    fs.writeFileSync(archivoAreas, JSON.stringify(["Salón 1", "Salón 2"], null, 2));
    const usuarios = leerUsuarios();
    usuarios.push(
        { user: `admin_${nombreEscuela}`, pass: "1234", rol: "admin", escuela: nombreEscuela },
        { user: `alumno_${nombreEscuela}`, pass: "1234", rol: "alumno", escuela: nombreEscuela }
    );
    fs.writeFileSync(RUTA_USUARIOS, JSON.stringify(usuarios, null, 2));
    res.status(201).json({ mensaje: "Escuela registrada" });
});

app.post('/api/login', (req, res) => {
    const { user, pass } = req.body;
    const usuarios = leerUsuarios();
    const encontrado = usuarios.find(u => u.user === user && u.pass === pass);
    if (encontrado) res.json({ success: true, escuela: encontrado.escuela, rol: encontrado.rol });
    else res.status(401).json({ success: false });
});

app.get('/api/:escuela/areas', (req, res) => {
    const rutaEscuela = obtenerRutaEscuela(req.params.escuela);
    const archivoAreas = path.join(rutaEscuela, 'areas.json');

    // depurar
    console.log("Buscando áreas en:", archivoAreas);

    res.json(fs.existsSync(archivoAreas) ? JSON.parse(fs.readFileSync(archivoAreas, 'utf-8')) : ["General"]);
});

app.post('/api/:escuela/areas', (req, res) => {
    const rutaEscuela = obtenerRutaEscuela(req.params.escuela);
    const archivoAreas = path.join(rutaEscuela, 'areas.json');
    const { nuevaArea } = req.body;
    let areas = JSON.parse(fs.readFileSync(archivoAreas, 'utf-8'));
    if (!areas.includes(nuevaArea)) {
        areas.push(nuevaArea);
        fs.writeFileSync(archivoAreas, JSON.stringify(areas, null, 2));
        res.status(201).send("OK");
    } else res.status(400).send("Ya existe");
});

app.delete('/api/:escuela/areas', (req, res) => {
    const rutaEscuela = obtenerRutaEscuela(req.params.escuela);
    const archivoAreas = path.join(rutaEscuela, 'areas.json');
    let areas = JSON.parse(fs.readFileSync(archivoAreas, 'utf-8'));
    areas = areas.filter(a => a !== req.body.areaBorrar);
    fs.writeFileSync(archivoAreas, JSON.stringify(areas, null, 2));
    res.json({ mensaje: "Eliminada" });
});

app.get('/api/:escuela/reportes', (req, res) => {
    const rutaEscuela = obtenerRutaEscuela(req.params.escuela);
    const archivoReportes = path.join(rutaEscuela, 'reportes.json');
    res.json(fs.existsSync(archivoReportes) ? JSON.parse(fs.readFileSync(archivoReportes, 'utf-8')) : []);
});

app.post('/api/:escuela/reportes', (req, res) => {
    const rutaEscuela = obtenerRutaEscuela(req.params.escuela);
    const archivoReportes = path.join(rutaEscuela, 'reportes.json');
    let reportes = JSON.parse(fs.readFileSync(archivoReportes, 'utf-8'));
    // Unificamos a 'prioridad'
    const nuevo = { id: Date.now(), ...req.body, fecha: new Date().toLocaleString(), estado: "Pendiente" };
    reportes.push(nuevo);
    fs.writeFileSync(archivoReportes, JSON.stringify(reportes, null, 2));
    res.status(201).json(nuevo);
});

// ruta, para que el boton de Gestionar funcione
app.put('/api/:escuela/reportes/:id', (req, res) => {
    const rutaEscuela = obtenerRutaEscuela(req.params.escuela);
    const archivoReportes = path.join(rutaEscuela, 'reportes.json');
    let reportes = JSON.parse(fs.readFileSync(archivoReportes, 'utf-8'));
    const index = reportes.findIndex(r => r.id == req.params.id);

    if (index !== -1) {
        reportes[index] = { ...reportes[index], ...req.body };
        fs.writeFileSync(archivoReportes, JSON.stringify(reportes, null, 2));
        res.json({ mensaje: "Actualizado" });
    }
    else res.status(404).send("No encontrado");
});

app.delete('/api/:escuela/reportes/:id', (req, res) => {
    const rutaEscuela = obtenerRutaEscuela(req.params.escuela);
    const archivoReportes = path.join(rutaEscuela, 'reportes.json');
    let reportes = JSON.parse(fs.readFileSync(archivoReportes, 'utf-8'));
    reportes = reportes.filter(r => r.id != req.params.id);
    fs.writeFileSync(archivoReportes, JSON.stringify(reportes, null, 2));
    res.json({ mensaje: "Borrado" });
});

app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));