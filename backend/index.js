/**
 * backend/index.js
 * Backend API Server - รันบน port 3000
 * 
 * ทำหน้าที่:
 * 1. ให้ RESTful API สำหรับ Artists, Albums, Songs
 * 2. รองรับ Filter ตาม query parameters
 * 3. เชื่อมต่อกับฐานข้อมูล SQLite ผ่าน Sequelize
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');

// Import Database
const sequelize = require('./config/database');

// Import Models และ Seed Data
const { seedData } = require('../models');

// Import Routes
const artistsRoutes = require('./routes/artists');
const albumsRoutes = require('./routes/albums');
const songsRoutes = require('./routes/songs');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// Middleware
// ==========================================

// เปิด CORS เพื่อให้ frontend (port 4000) เรียก API ได้
app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true
}));

// Parse JSON body
app.use(bodyParser.json());

// Parse URL-encoded body
app.use(bodyParser.urlencoded({ extended: true }));

// ==========================================
// API Routes
// ==========================================

app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);
app.use('/songs', songsRoutes);

// ==========================================
// Start Server
// ==========================================

async function startServer() {
  try {
    // เชื่อมต่อฐานข้อมูล
    await sequelize.authenticate();
    console.log('✅ เชื่อมต่อฐานข้อมูล SQLite สำเร็จ');
    
    // Sync models (สร้างตารางถ้ายังไม่มี)
    await sequelize.sync({ force: false });
    console.log('✅ Database synced (ตารางพร้อมใช้งาน)');
    
    // Seed ข้อมูลตัวอย่าง
    await seedData();
    
    // สร้าง HTTP Server
    const server = http.createServer(app);
    
    server.listen(PORT, () => {
      console.log(`🚀 Backend API Server รันอยู่ที่ http://localhost:${PORT}`);
      console.log(`📡 API Endpoints:`);
      console.log(`   - GET/POST /artists`);
      console.log(`   - GET/PUT/DELETE /artists/:id`);
      console.log(`   - GET/POST /albums`);
      console.log(`   - GET/PUT/DELETE /albums/:id`);
      console.log(`   - GET/POST /songs`);
      console.log(`   - GET/PUT/DELETE /songs/:id`);
    });
    
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการเริ่มต้น server:', error);
    process.exit(1);
  }
}

// เริ่ม server
startServer();
