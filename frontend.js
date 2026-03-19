/**
 * frontend.js
 * Frontend Web Server - รันบน port 4000
 * 
 * ทำหน้าที่:
 * 1. ให้ Web Interface ด้วย EJS Template
 * 2. เรียก API จาก Backend (port 3000) ผ่าน Axios
 * 3. แสดงผลข้อมูล Artists, Albums, Songs
 * 4. รองรับ Filter และ CRUD Operations
 */

const express = require('express');
const axios = require('axios');
const path = require('path');
const http = require('http');

const app = express();
const PORT = 4000;

// URL ของ Backend API
const API_URL = 'http://localhost:3000';

// ==========================================
// Middleware
// ==========================================

// ตั้งค่า EJS เป็น Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files จาก public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON และ URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

/**
 * เรียก API จาก Backend พร้อมจัดการ error
 */
async function callAPI(method, endpoint, data = null) {
  try {
    const url = `${API_URL}${endpoint}`;
    let response;
    
    switch (method) {
      case 'GET':
        response = await axios.get(url);
        break;
      case 'POST':
        response = await axios.post(url, data);
        break;
      case 'PUT':
        response = await axios.put(url, data);
        break;
      case 'DELETE':
        response = await axios.delete(url);
        break;
      default:
        throw new Error('Method not supported');
    }
    
    return response.data;
  } catch (error) {
    console.error(`API Error (${method} ${endpoint}):`, error.message);
    throw error;
  }
}

// ==========================================
// Routes: Pages
// ==========================================

/**
 * GET /
 * หน้า Home - แสดงภาพรวมของระบบ
 */
app.get('/', async (req, res) => {
  try {
    // ดึงข้อมูลสรุปจาก Backend
    const [artistsRes, albumsRes, songsRes] = await Promise.all([
      callAPI('GET', '/artists'),
      callAPI('GET', '/albums'),
      callAPI('GET', '/songs')
    ]);
    
    res.render('index', {
      page: 'home',
      artistsCount: artistsRes.data?.length || 0,
      albumsCount: albumsRes.data?.length || 0,
      songsCount: songsRes.data?.length || 0,
      formatDuration
    });
  } catch (error) {
    res.render('index', {
      page: 'home',
      artistsCount: 0,
      albumsCount: 0,
      songsCount: 0,
      formatDuration,
      error: 'ไม่สามารถเชื่อมต่อกับ Backend API ได้'
    });
  }
});

/**
 * GET /artists
 * หน้ารายการศิลปิน
 */
app.get('/artists', async (req, res) => {
  try {
    const response = await callAPI('GET', '/artists');
    
    res.render('artists', {
      page: 'artists',
      artists: response.data || [],
      formatDuration
    });
  } catch (error) {
    res.render('artists', {
      page: 'artists',
      artists: [],
      formatDuration,
      error: 'ไม่สามารถดึงข้อมูลศิลปินได้'
    });
  }
});

/**
 * GET /artists/new
 * หน้าสร้างศิลปินใหม่
 */
app.get('/artists/new', (req, res) => {
  res.render('artist-form', {
    page: 'artists',
    artist: null,
    action: '/artists',
    method: 'POST',
    title: 'เพิ่มศิลปินใหม่'
  });
});

/**
 * GET /artists/:id/edit
 * หน้าแก้ไขศิลปิน
 */
app.get('/artists/:id/edit', async (req, res) => {
  try {
    const response = await callAPI('GET', `/artists/${req.params.id}`);
    
    res.render('artist-form', {
      page: 'artists',
      artist: response.data,
      action: `/artists/${req.params.id}`,
      method: 'PUT',
      title: 'แก้ไขศิลปิน'
    });
  } catch (error) {
    res.redirect('/artists');
  }
});

/**
 * POST /artists
 * Handle form submit สำหรับสร้างศิลปิน
 */
app.post('/artists', async (req, res) => {
  try {
    const { artist_name, country } = req.body;
    await callAPI('POST', '/artists', { artist_name, country });
    res.redirect('/artists');
  } catch (error) {
    res.render('artist-form', {
      page: 'artists',
      artist: req.body,
      action: '/artists',
      method: 'POST',
      title: 'เพิ่มศิลปินใหม่',
      error: 'เกิดข้อผิดพลาดในการสร้างศิลปิน'
    });
  }
});

/**
 * POST /artists/:id (ใช้สำหรับ PUT)
 * Handle form submit สำหรับแก้ไขศิลปิน
 */
app.post('/artists/:id', async (req, res) => {
  try {
    const { artist_name, country } = req.body;
    await callAPI('PUT', `/artists/${req.params.id}`, { artist_name, country });
    res.redirect('/artists');
  } catch (error) {
    res.render('artist-form', {
      page: 'artists',
      artist: req.body,
      action: `/artists/${req.params.id}`,
      method: 'PUT',
      title: 'แก้ไขศิลปิน',
      error: 'เกิดข้อผิดพลาดในการแก้ไขศิลปิน'
    });
  }
});

/**
 * POST /artists/:id/delete
 * Handle form submit สำหรับลบศิลปิน
 */
app.post('/artists/:id/delete', async (req, res) => {
  try {
    await callAPI('DELETE', `/artists/${req.params.id}`);
    res.redirect('/artists');
  } catch (error) {
    res.redirect('/artists');
  }
});

/**
 * GET /albums
 * หน้ารายการอัลบั้ม (รองรับ filter)
 */
app.get('/albums', async (req, res) => {
  try {
    const { artist_id, release_year } = req.query;
    
    // สร้าง query string สำหรับ filter
    let queryParams = [];
    if (artist_id) queryParams.push(`artist_id=${artist_id}`);
    if (release_year) queryParams.push(`release_year=${release_year}`);
    
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const response = await callAPI('GET', `/albums${queryString}`);
    
    // ดึงรายการศิลปินทั้งหมดสำหรับ dropdown filter
    const artistsRes = await callAPI('GET', '/artists');
    
    res.render('albums', {
      page: 'albums',
      albums: response.data || [],
      artists: artistsRes.data || [],
      filters: { artist_id, release_year },
      formatDuration
    });
  } catch (error) {
    res.render('albums', {
      page: 'albums',
      albums: [],
      artists: [],
      filters: {},
      formatDuration,
      error: 'ไม่สามารถดึงข้อมูลอัลบั้มได้'
    });
  }
});

/**
 * GET /albums/new
 * หน้าสร้างอัลบั้มใหม่
 */
app.get('/albums/new', async (req, res) => {
  try {
    const artistsRes = await callAPI('GET', '/artists');
    
    res.render('album-form', {
      page: 'albums',
      album: null,
      artists: artistsRes.data || [],
      action: '/albums',
      method: 'POST',
      title: 'เพิ่มอัลบั้มใหม่'
    });
  } catch (error) {
    res.render('album-form', {
      page: 'albums',
      album: null,
      artists: [],
      action: '/albums',
      method: 'POST',
      title: 'เพิ่มอัลบั้มใหม่',
      error: 'ไม่สามารถดึงข้อมูลศิลปินได้'
    });
  }
});

/**
 * GET /albums/:id/edit
 * หน้าแก้ไขอัลบั้ม
 */
app.get('/albums/:id/edit', async (req, res) => {
  try {
    const [albumRes, artistsRes] = await Promise.all([
      callAPI('GET', `/albums/${req.params.id}`),
      callAPI('GET', '/artists')
    ]);
    
    res.render('album-form', {
      page: 'albums',
      album: albumRes.data,
      artists: artistsRes.data || [],
      action: `/albums/${req.params.id}`,
      method: 'PUT',
      title: 'แก้ไขอัลบั้ม'
    });
  } catch (error) {
    res.redirect('/albums');
  }
});

/**
 * POST /albums
 * Handle form submit สำหรับสร้างอัลบั้ม
 */
app.post('/albums', async (req, res) => {
  try {
    const { album_title, release_year, artist_id } = req.body;
    await callAPI('POST', '/albums', { album_title, release_year, artist_id });
    res.redirect('/albums');
  } catch (error) {
    const artistsRes = await callAPI('GET', '/artists');
    res.render('album-form', {
      page: 'albums',
      album: req.body,
      artists: artistsRes.data || [],
      action: '/albums',
      method: 'POST',
      title: 'เพิ่มอัลบั้มใหม่',
      error: 'เกิดข้อผิดพลาดในการสร้างอัลบั้ม'
    });
  }
});

/**
 * POST /albums/:id (ใช้สำหรับ PUT)
 * Handle form submit สำหรับแก้ไขอัลบั้ม
 */
app.post('/albums/:id', async (req, res) => {
  try {
    const { album_title, release_year, artist_id } = req.body;
    await callAPI('PUT', `/albums/${req.params.id}`, { album_title, release_year, artist_id });
    res.redirect('/albums');
  } catch (error) {
    const artistsRes = await callAPI('GET', '/artists');
    res.render('album-form', {
      page: 'albums',
      album: req.body,
      artists: artistsRes.data || [],
      action: `/albums/${req.params.id}`,
      method: 'PUT',
      title: 'แก้ไขอัลบั้ม',
      error: 'เกิดข้อผิดพลาดในการแก้ไขอัลบั้ม'
    });
  }
});

/**
 * POST /albums/:id/delete
 * Handle form submit สำหรับลบอัลบั้ม
 */
app.post('/albums/:id/delete', async (req, res) => {
  try {
    await callAPI('DELETE', `/albums/${req.params.id}`);
    res.redirect('/albums');
  } catch (error) {
    res.redirect('/albums');
  }
});

/**
 * GET /songs
 * หน้ารายการเพลง (รองรับ filter)
 */
app.get('/songs', async (req, res) => {
  try {
    const { artist_id, album_id, genre } = req.query;
    
    // สร้าง query string สำหรับ filter
    let queryParams = [];
    if (artist_id) queryParams.push(`artist_id=${artist_id}`);
    if (album_id) queryParams.push(`album_id=${album_id}`);
    if (genre) queryParams.push(`genre=${encodeURIComponent(genre)}`);
    
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const songsRes = await callAPI('GET', `/songs${queryString}`);
    
    // ดึงข้อมูลสำหรับ dropdown filters
    const [artistsRes, albumsRes] = await Promise.all([
      callAPI('GET', '/artists'),
      callAPI('GET', '/albums')
    ]);
    
    // ดึง genres ทั้งหมดสำหรับ dropdown
    const allSongsRes = await callAPI('GET', '/songs');
    const genres = [...new Set(allSongsRes.data?.map(s => s.genre) || [])];
    
    res.render('songs', {
      page: 'songs',
      songs: songsRes.data || [],
      artists: artistsRes.data || [],
      albums: albumsRes.data || [],
      genres,
      filters: { artist_id, album_id, genre },
      formatDuration
    });
  } catch (error) {
    res.render('songs', {
      page: 'songs',
      songs: [],
      artists: [],
      albums: [],
      genres: [],
      filters: {},
      formatDuration,
      error: 'ไม่สามารถดึงข้อมูลเพลงได้'
    });
  }
});

/**
 * GET /songs/new
 * หน้าสร้างเพลงใหม่
 */
app.get('/songs/new', async (req, res) => {
  try {
    const albumsRes = await callAPI('GET', '/albums');
    
    res.render('song-form', {
      page: 'songs',
      song: null,
      albums: albumsRes.data || [],
      action: '/songs',
      method: 'POST',
      title: 'เพิ่มเพลงใหม่'
    });
  } catch (error) {
    res.render('song-form', {
      page: 'songs',
      song: null,
      albums: [],
      action: '/songs',
      method: 'POST',
      title: 'เพิ่มเพลงใหม่',
      error: 'ไม่สามารถดึงข้อมูลอัลบั้มได้'
    });
  }
});

/**
 * GET /songs/:id/edit
 * หน้าแก้ไขเพลง
 */
app.get('/songs/:id/edit', async (req, res) => {
  try {
    const [songRes, albumsRes] = await Promise.all([
      callAPI('GET', `/songs/${req.params.id}`),
      callAPI('GET', '/albums')
    ]);
    
    res.render('song-form', {
      page: 'songs',
      song: songRes.data,
      albums: albumsRes.data || [],
      action: `/songs/${req.params.id}`,
      method: 'PUT',
      title: 'แก้ไขเพลง'
    });
  } catch (error) {
    res.redirect('/songs');
  }
});

/**
 * POST /songs
 * Handle form submit สำหรับสร้างเพลง
 */
app.post('/songs', async (req, res) => {
  try {
    const { song_name, genre, duration, album_id } = req.body;
    await callAPI('POST', '/songs', { song_name, genre, duration, album_id });
    res.redirect('/songs');
  } catch (error) {
    const albumsRes = await callAPI('GET', '/albums');
    res.render('song-form', {
      page: 'songs',
      song: req.body,
      albums: albumsRes.data || [],
      action: '/songs',
      method: 'POST',
      title: 'เพิ่มเพลงใหม่',
      error: 'เกิดข้อผิดพลาดในการสร้างเพลง'
    });
  }
});

/**
 * POST /songs/:id (ใช้สำหรับ PUT)
 * Handle form submit สำหรับแก้ไขเพลง
 */
app.post('/songs/:id', async (req, res) => {
  try {
    const { song_name, genre, duration, album_id } = req.body;
    await callAPI('PUT', `/songs/${req.params.id}`, { song_name, genre, duration, album_id });
    res.redirect('/songs');
  } catch (error) {
    const albumsRes = await callAPI('GET', '/albums');
    res.render('song-form', {
      page: 'songs',
      song: req.body,
      albums: albumsRes.data || [],
      action: `/songs/${req.params.id}`,
      method: 'PUT',
      title: 'แก้ไขเพลง',
      error: 'เกิดข้อผิดพลาดในการแก้ไขเพลง'
    });
  }
});

/**
 * POST /songs/:id/delete
 * Handle form submit สำหรับลบเพลง
 */
app.post('/songs/:id/delete', async (req, res) => {
  try {
    await callAPI('DELETE', `/songs/${req.params.id}`);
    res.redirect('/songs');
  } catch (error) {
    res.redirect('/songs');
  }
});

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
