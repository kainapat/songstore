/**
 * frontend/routes/albums.js
 * Album page routes
 */

const express = require('express');
const router = express.Router();
const callAPI = require('../utils/api');

/**
 * GET /albums
 * หน้ารายการอัลบั้ม (รองรับ filter)
 */
router.get('/', async (req, res) => {
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
      formatDuration: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      }
    });
  } catch (error) {
    res.render('albums', {
      page: 'albums',
      albums: [],
      artists: [],
      filters: {},
      formatDuration: () => '',
      error: 'ไม่สามารถดึงข้อมูลอัลบั้มได้'
    });
  }
});

/**
 * GET /albums/new
 * หน้าสร้างอัลบั้มใหม่
 */
router.get('/new', async (req, res) => {
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
router.get('/:id/edit', async (req, res) => {
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
router.post('/', async (req, res) => {
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
router.post('/:id', async (req, res) => {
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
router.post('/:id/delete', async (req, res) => {
  try {
    await callAPI('DELETE', `/albums/${req.params.id}`);
    res.redirect('/albums');
  } catch (error) {
    res.redirect('/albums');
  }
});

module.exports = router;
