/**
 * backend/routes/albums.js
 * Album routes
 */

const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albums');

/**
 * GET /albums
 * ดึงรายการอัลบั้มทั้งหมด
 */
router.get('/', async (req, res) => {
  try {
    const { artist_id, release_year } = req.query;
    const albums = await albumController.getAllAlbums({ artist_id, release_year });
    
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
router.get('/:id', async (req, res) => {
  try {
    const album = await albumController.getAlbumById(req.params.id);
    
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
 */
router.post('/', async (req, res) => {
  try {
    const { album_title, release_year, artist_id } = req.body;
    
    if (!album_title || !release_year || !artist_id) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุข้อมูลให้ครบถ้วน (album_title, release_year, artist_id)'
      });
    }
    
    const album = await albumController.createAlbum({ album_title, release_year, artist_id });
    
    res.status(201).json({
      success: true,
      message: 'สร้างอัลบั้มสำเร็จ',
      data: album
    });
  } catch (error) {
    console.error('Error POST /albums:', error);
    if (error.message === 'ไม่พบศิลปินนี้') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
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
 */
router.put('/:id', async (req, res) => {
  try {
    const { album_title, release_year, artist_id } = req.body;
    const album = await albumController.updateAlbum(req.params.id, {
      album_title,
      release_year,
      artist_id
    });
    
    res.json({
      success: true,
      message: 'แก้ไขข้อมูลอัลบั้มสำเร็จ',
      data: album
    });
  } catch (error) {
    console.error('Error PUT /albums/:id:', error);
    if (error.message === 'ไม่พบอัลบั้มนี้' || error.message === 'ไม่พบศิลปินนี้') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลอัลบั้ม',
      error: error.message
    });
  }
});

/**
 * DELETE /albums/:id
 * ลบอัลบั้ม
 */
router.delete('/:id', async (req, res) => {
  try {
    await albumController.deleteAlbum(req.params.id);
    
    res.json({
      success: true,
      message: 'ลบอัลบั้มสำเร็จ'
    });
  } catch (error) {
    console.error('Error DELETE /albums/:id:', error);
    if (error.message === 'ไม่พบอัลบั้มนี้') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบอัลบั้ม',
      error: error.message
    });
  }
});

module.exports = router;
