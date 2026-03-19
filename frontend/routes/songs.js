/**
 * frontend/routes/songs.js
 * Song page routes
 */

const express = require('express');
const router = express.Router();
const callAPI = require('../utils/api');

/**
 * GET /songs
 * หน้ารายการเพลง (รองรับ filter)
 */
router.get('/', async (req, res) => {
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
      formatDuration: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      }
    });
  } catch (error) {
    res.render('songs', {
      page: 'songs',
      songs: [],
      artists: [],
      albums: [],
      genres: [],
      filters: {},
      formatDuration: () => '',
      error: 'ไม่สามารถดึงข้อมูลเพลงได้'
    });
  }
});

/**
 * GET /songs/new
 * หน้าสร้างเพลงใหม่
 */
router.get('/new', async (req, res) => {
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
router.get('/:id/edit', async (req, res) => {
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
router.post('/', async (req, res) => {
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
router.post('/:id', async (req, res) => {
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
router.post('/:id/delete', async (req, res) => {
  try {
    await callAPI('DELETE', `/songs/${req.params.id}`);
    res.redirect('/songs');
  } catch (error) {
    res.redirect('/songs');
  }
});

module.exports = router;
