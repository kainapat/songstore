/**
 * backend.js
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

// Import Models และ Database Connection
const { sequelize, Artist, Album, Song, seedData } = require('./models');

const app = express();
const PORT = 3000;

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
// Helper Functions (ฟังก์ชันช่วย)
// ==========================================

/**
 * แปลง duration (วินาที) เป็นรูปแบบ mm:ss
 */
function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ==========================================
// API Routes: Artists
// ==========================================

/**
 * GET /artists
 * ดึงรายการศิลปินทั้งหมด
 * Query parameters (optional):
 *   - country: กรองตามประเทศ
 */
app.get('/artists', async (req, res) => {
  try {
    const { country } = req.query;
    const where = {};
    
    if (country) {
      where.country = country;
    }
    
    const artists = await Artist.findAll({
      where,
      include: [{
        model: Album,
        as: 'albums',
        attributes: ['album_id', 'album_title', 'release_year']
      }],
      order: [['artist_id', 'ASC']]
    });
    
    res.json({
      success: true,
      data: artists,
      count: artists.length
    });
  } catch (error) {
    console.error('Error GET /artists:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน',
      error: error.message
    });
  }
});

/**
 * GET /artists/:id
 * ดึงข้อมูลศิลปินตาม ID
 */
app.get('/artists/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      include: [{
        model: Album,
        as: 'albums',
        include: [{
          model: Song,
          as: 'songs'
        }]
      }]
    });
    
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบศิลปินนี้'
      });
    }
    
    res.json({
      success: true,
      data: artist
    });
  } catch (error) {
    console.error('Error GET /artists/:id:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน',
      error: error.message
    });
  }
});

/**
 * POST /artists
 * สร้างศิลปินใหม่
 * Body: { artist_name, country }
 */
app.post('/artists', async (req, res) => {
  try {
    const { artist_name, country } = req.body;
    
    if (!artist_name) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุชื่อศิลปิน'
      });
    }
    
    const artist = await Artist.create({ artist_name, country });
    
    res.status(201).json({
      success: true,
      message: 'สร้างศิลปินสำเร็จ',
      data: artist
    });
  } catch (error) {
    console.error('Error POST /artists:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้างศิลปิน',
      error: error.message
    });
  }
});

/**
 * PUT /artists/:id
 * แก้ไขข้อมูลศิลปิน
 * Body: { artist_name, country }
 */
app.put('/artists/:id', async (req, res) => {
  try {
    const { artist_name, country } = req.body;
    const artist = await Artist.findByPk(req.params.id);
    
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบศิลปินนี้'
      });
    }
    
    await artist.update({
      artist_name: artist_name || artist.artist_name,
      country: country !== undefined ? country : artist.country
    });
    
    res.json({
      success: true,
      message: 'แก้ไขข้อมูลศิลปินสำเร็จ',
      data: artist
    });
  } catch (error) {
    console.error('Error PUT /artists/:id:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลศิลปิน',
      error: error.message
    });
  }
});

/**
 * DELETE /artists/:id
 * ลบศิลปิน (และ albums, songs ที่เกี่ยวข้อง)
 */
app.delete('/artists/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบศิลปินนี้'
      });
    }
    
    await artist.destroy();
    
    res.json({
      success: true,
      message: 'ลบศิลปินสำเร็จ'
    });
  } catch (error) {
    console.error('Error DELETE /artists/:id:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบศิลปิน',
      error: error.message
    });
  }
});

// ==========================================
// API Routes: Albums
// ==========================================

/**
 * GET /albums
 * ดึงรายการอัลบั้มทั้งหมด
 * Query parameters (optional):
 *   - artist_id: กรองตามศิลปิน
 *   - release_year: กรองตามปี
 */
app.get('/albums', async (req, res) => {
  try {
    const { artist_id, release_year } = req.query;
    const where = {};
    
    if (artist_id) {
      where.artist_id = parseInt(artist_id);
    }
    
    if (release_year) {
      where.release_year = parseInt(release_year);
    }
    
    const albums = await Album.findAll({
      where,
      include: [{
        model: Artist,
        as: 'artist',
        attributes: ['artist_id', 'artist_name', 'country']
      }],
      order: [['album_id', 'ASC']]
    });
    
    res.json({
      success: true,
      data: albums,
      count: albums.length
    });
  } catch (error) {
    console.error('Error GET /albums:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลอัลบั้ม',
      error: error.message
    });
  }
});

/**
 * GET /albums/:id
 * ดึงข้อมูลอัลบั้มตาม ID
 */
app.get('/albums/:id', async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id, {
      include: [
        {
          model: Artist,
          as: 'artist'
        },
        {
          model: Song,
          as: 'songs'
        }
      ]
    });
    
    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบอัลบั้มนี้'
      });
    }
    
    res.json({
      success: true,
      data: album
    });
  } catch (error) {
    console.error('Error GET /albums/:id:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลอัลบั้ม',
      error: error.message
    });
  }
});

/**
 * POST /albums
 * สร้างอัลบั้มใหม่
 * Body: { album_title, release_year, artist_id }
 */
app.post('/albums', async (req, res) => {
  try {
    const { album_title, release_year, artist_id } = req.body;
    
    if (!album_title || !release_year || !artist_id) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุข้อมูลให้ครบถ้วน (album_title, release_year, artist_id)'
      });
    }
    
    // ตรวจสอบว่ามี artist นี้หรือไม่
    const artist = await Artist.findByPk(artist_id);
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบศิลปินนี้'
      });
    }
    
    const album = await Album.create({ album_title, release_year, artist_id });
    
    res.status(201).json({
      success: true,
      message: 'สร้างอัลบั้มสำเร็จ',
      data: album
    });
  } catch (error) {
    console.error('Error POST /albums:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้างอัลบั้ม',
      error: error.message
    });
  }
});

/**
 * PUT /albums/:id
 * แก้ไขข้อมูลอัลบั้ม
 * Body: { album_title, release_year, artist_id }
 */
app.put('/albums/:id', async (req, res) => {
  try {
    const { album_title, release_year, artist_id } = req.body;
    const album = await Album.findByPk(req.params.id);
    
    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบอัลบั้มนี้'
      });
    }
    
    // ถ้ามีการเปลี่ยน artist_id ให้ตรวจสอบว่ามี artist นี้
    if (artist_id && artist_id !== album.artist_id) {
      const artist = await Artist.findByPk(artist_id);
      if (!artist) {
        return res.status(404).json({
          success: false,
          message: 'ไม่พบศิลปินนี้'
        });
      }
    }
    
    await album.update({
      album_title: album_title || album.album_title,
      release_year: release_year || album.release_year,
      artist_id: artist_id || album.artist_id
    });
    
    res.json({
      success: true,
      message: 'แก้ไขข้อมูลอัลบั้มสำเร็จ',
      data: album
    });
  } catch (error) {
    console.error('Error PUT /albums/:id:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลอัลบั้ม',
      error: error.message
    });
  }
});

/**
 * DELETE /albums/:id
 * ลบอัลบั้ม (และ songs ที่เกี่ยวข้อง)
 */
app.delete('/albums/:id', async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);
    
    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบอัลบั้มนี้'
      });
    }
    
    await album.destroy();
    
    res.json({
      success: true,
      message: 'ลบอัลบั้มสำเร็จ'
    });
  } catch (error) {
    console.error('Error DELETE /albums/:id:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบอัลบั้ม',
      error: error.message
    });
  }
});

// ==========================================
// API Routes: Songs
// ==========================================

/**
 * GET /songs
 * ดึงรายการเพลงทั้งหมด
 * Query parameters (optional):
 *   - artist_id: กรองตามศิลปิน (ผ่าน album)
 *   - album_id: กรองตามอัลบั้ม
 *   - genre: กรองตามแนวเพลง
 */
app.get('/songs', async (req, res) => {
  try {
    const { artist_id, album_id, genre } = req.query;
    const where = {};
    const include = [{
      model: Album,
      as: 'album',
      include: [{
        model: Artist,
        as: 'artist'
      }]
    }];
    
    if (album_id) {
      where.album_id = parseInt(album_id);
    }
    
    if (genre) {
      where.genre = genre;
    }
    
    const songs = await Song.findAll({
      where,
      include,
      order: [['song_id', 'ASC']]
    });
    
    // กรองตาม artist_id (ต้องกรองหลัง query เพราะ artist อยู่ใน include)
    let filteredSongs = songs;
    if (artist_id) {
      filteredSongs = songs.filter(song => 
        song.album && song.album.artist && 
        song.album.artist.artist_id === parseInt(artist_id)
      );
    }
    
    res.json({
      success: true,
      data: filteredSongs,
      count: filteredSongs.length
    });
  } catch (error) {
    console.error('Error GET /songs:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลเพลง',
      error: error.message
    });
  }
});

/**
 * GET /songs/:id
 * ดึงข้อมูลเพลงตาม ID
 */
app.get('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id, {
      include: [{
        model: Album,
        as: 'album',
        include: [{
          model: Artist,
          as: 'artist'
        }]
      }]
    });
    
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบเพลงนี้'
      });
    }
    
    res.json({
      success: true,
      data: song
    });
  } catch (error) {
    console.error('Error GET /songs/:id:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลเพลง',
      error: error.message
    });
  }
});

/**
 * POST /songs
 * สร้างเพลงใหม่
 * Body: { song_name, genre, duration, album_id }
 */
app.post('/songs', async (req, res) => {
  try {
    const { song_name, genre, duration, album_id } = req.body;
    
    if (!song_name || !genre || !duration || !album_id) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุข้อมูลให้ครบถ้วน (song_name, genre, duration, album_id)'
      });
    }
    
    // ตรวจสอบว่ามี album นี้หรือไม่
    const album = await Album.findByPk(album_id);
    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบอัลบั้มนี้'
      });
    }
    
    const song = await Song.create({ song_name, genre, duration, album_id });
    
    res.status(201).json({
      success: true,
      message: 'สร้างเพลงสำเร็จ',
      data: song
    });
  } catch (error) {
    console.error('Error POST /songs:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้างเพลง',
      error: error.message
    });
  }
});

/**
 * PUT /songs/:id
 * แก้ไขข้อมูลเพลง
 * Body: { song_name, genre, duration, album_id }
 */
app.put('/songs/:id', async (req, res) => {
  try {
    const { song_name, genre, duration, album_id } = req.body;
    const song = await Song.findByPk(req.params.id);
    
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบเพลงนี้'
      });
    }
    
    // ถ้ามีการเปลี่ยน album_id ให้ตรวจสอบว่ามี album นี้
    if (album_id && album_id !== song.album_id) {
      const album = await Album.findByPk(album_id);
      if (!album) {
        return res.status(404).json({
          success: false,
          message: 'ไม่พบอัลบั้มนี้'
        });
      }
    }
    
    await song.update({
      song_name: song_name || song.song_name,
      genre: genre || song.genre,
      duration: duration || song.duration,
      album_id: album_id || song.album_id
    });
    
    res.json({
      success: true,
      message: 'แก้ไขข้อมูลเพลงสำเร็จ',
      data: song
    });
  } catch (error) {
    console.error('Error PUT /songs/:id:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลเพลง',
      error: error.message
    });
  }
});

/**
 * DELETE /songs/:id
 * ลบเพลง
 */
app.delete('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบเพลงนี้'
      });
    }
    
    await song.destroy();
    
    res.json({
      success: true,
      message: 'ลบเพลงสำเร็จ'
    });
  } catch (error) {
    console.error('Error DELETE /songs/:id:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบเพลง',
      error: error.message
    });
  }
});

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
