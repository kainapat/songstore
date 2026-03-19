/**
 * backend/routes/songs.js
 * Song routes
 */

const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs');

/**
 * GET /songs
 * ดึงรายการเพลงทั้งหมด
 */
router.get('/', async (req, res) => {
  try {
    const { artist_id, album_id, genre } = req.query;
    const songs = await songController.getAllSongs({ artist_id, album_id, genre });
    
    res.json({
      success: true,
      data: songs,
      count: songs.length
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
router.get('/:id', async (req, res) => {
  try {
    const song = await songController.getSongById(req.params.id);
    
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
 */
router.post('/', async (req, res) => {
  try {
    const { song_name, genre, duration, album_id } = req.body;
    
    if (!song_name || !genre || !duration || !album_id) {
      return res.status(400).json({
        success: false,
        message: 'กรุณาระบุข้อมูลให้ครบถ้วน (song_name, genre, duration, album_id)'
      });
    }
    
    const song = await songController.createSong({ song_name, genre, duration, album_id });
    
    res.status(201).json({
      success: true,
      message: 'สร้างเพลงสำเร็จ',
      data: song
    });
  } catch (error) {
    console.error('Error POST /songs:', error);
    if (error.message === 'ไม่พบอัลบั้มนี้') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
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
 */
router.put('/:id', async (req, res) => {
  try {
    const { song_name, genre, duration, album_id } = req.body;
    const song = await songController.updateSong(req.params.id, {
      song_name,
      genre,
      duration,
      album_id
    });
    
    res.json({
      success: true,
      message: 'แก้ไขข้อมูลเพลงสำเร็จ',
      data: song
    });
  } catch (error) {
    console.error('Error PUT /songs/:id:', error);
    if (error.message === 'ไม่พบเพลงนี้' || error.message === 'ไม่พบอัลบั้มนี้') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
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
router.delete('/:id', async (req, res) => {
  try {
    await songController.deleteSong(req.params.id);
    
    res.json({
      success: true,
      message: 'ลบเพลงสำเร็จ'
    });
  } catch (error) {
    console.error('Error DELETE /songs/:id:', error);
    if (error.message === 'ไม่พบเพลงนี้') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบเพลง',
      error: error.message
    });
  }
});

module.exports = router;
