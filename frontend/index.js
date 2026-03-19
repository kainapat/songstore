/**
 * frontend/index.js
 * Frontend Web Server - รันบน port 4000
 * 
 * ทำหน้าที่:
 * 1. ให้ Web Interface ด้วย EJS Template
 * 2. เรียก API จาก Backend (port 3000) ผ่าน Axios
 * 3. แสดงผลข้อมูล Artists, Albums, Songs
 * 4. รองรับ Filter และ CRUD Operations
 */

const express = require('express');
const path = require('path');
const http = require('http');

// Import Routes
const pagesRoutes = require('./routes/pages');
const artistsRoutes = require('./routes/artists');
const albumsRoutes = require('./routes/albums');
const songsRoutes = require('./routes/songs');

const app = express();
const PORT = process.env.PORT || 4000;

// ==========================================
// Middleware
// ==========================================

// ตั้งค่า EJS เป็น Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Serve static files จาก public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

// Parse JSON และ URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Routes
// ==========================================

app.use(pagesRoutes);
app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);
app.use('/songs', songsRoutes);

// ==========================================
// Start Server
// ==========================================

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🎨 Frontend Web Server รันอยู่ที่ http://localhost:${PORT}`);
  console.log(`📄 Pages:`);
  console.log(`   - Home: http://localhost:${PORT}/`);
  console.log(`   - Artists: http://localhost:${PORT}/artists`);
  console.log(`   - Albums: http://localhost:${PORT}/albums`);
  console.log(`   - Songs: http://localhost:${PORT}/songs`);
});
