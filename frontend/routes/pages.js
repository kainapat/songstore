/**
 * frontend/routes/pages.js
 * Main page routes
 */

const express = require('express');
const router = express.Router();
const callAPI = require('../utils/api');

/**
 * GET /
 * หน้า Home - แสดงภาพรวมของระบบ
 */
router.get('/', async (req, res) => {
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
      formatDuration: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      }
    });
  } catch (error) {
    res.render('index', {
      page: 'home',
      artistsCount: 0,
      albumsCount: 0,
      songsCount: 0,
      formatDuration: () => '',
      error: 'ไม่สามารถเชื่อมต่อกับ Backend API ได้'
    });
  }
});

module.exports = router;
