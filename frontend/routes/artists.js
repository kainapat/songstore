/**
 * frontend/routes/artists.js
 * Artist page routes
 */

const express = require('express');
const router = express.Router();
const callAPI = require('../utils/api');

/**
 * GET /artists
 * หน้ารายการศิลปิน
 */
router.get('/', async (req, res) => {
  try {
    const response = await callAPI('GET', '/artists');
    
    res.render('artists', {
      page: 'artists',
      artists: response.data || [],
      formatDuration: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      }
    });
  } catch (error) {
    res.render('artists', {
      page: 'artists',
      artists: [],
      formatDuration: () => '',
      error: 'ไม่สามารถดึงข้อมูลศิลปินได้'
    });
  }
});

/**
 * GET /artists/new
 * หน้าสร้างศิลปินใหม่
 */
router.get('/new', (req, res) => {
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
router.get('/:id/edit', async (req, res) => {
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
router.post('/', async (req, res) => {
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
router.post('/:id', async (req, res) => {
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
router.post('/:id/delete', async (req, res) => {
  try {
    await callAPI('DELETE', `/artists/${req.params.id}`);
    res.redirect('/artists');
  } catch (error) {
    res.redirect('/artists');
  }
});

module.exports = router;
