/**
 * backend/routes/artists.js
 * Artist routes
 */

const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artists');

/**
 * GET /artists
 * ดึงรายการศิลปินทั้งหมด
 */
router.get('/', async (req, res) => {
  try {
    const { country } = req.query;
    const artists = await artistController.getAllArtists({ country });
    
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
router.get('/:id', async (req, res) => {
  try {
    const artist = await artistController.getArtistById(req.params.id);
    
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
 */
router.post('/', async (req, res) => {
  try {
    const { artist_name, country } = req.body;
    
    if (!artist_name) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุชื่อศิลปิน'
      });
    }
    
    const artist = await artistController.createArtist({ artist_name, country });
    
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
 */
router.put('/:id', async (req, res) => {
  try {
    const { artist_name, country } = req.body;
    const artist = await artistController.updateArtist(req.params.id, {
      artist_name,
      country
    });
    
    res.json({
      success: true,
      message: 'แก้ไขข้อมูลศิลปินสำเร็จ',
      data: artist
    });
  } catch (error) {
    console.error('Error PUT /artists/:id:', error);
    if (error.message === 'ไม่พบศิลปินนี้') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลศิลปิน',
      error: error.message
    });
  }
});

/**
 * DELETE /artists/:id
 * ลบศิลปิน
 */
router.delete('/:id', async (req, res) => {
  try {
    await artistController.deleteArtist(req.params.id);
    
    res.json({
      success: true,
      message: 'ลบศิลปินสำเร็จ'
    });
  } catch (error) {
    console.error('Error DELETE /artists/:id:', error);
    if (error.message === 'ไม่พบศิลปินนี้') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบศิลปิน',
      error: error.message
    });
  }
});

module.exports = router;
