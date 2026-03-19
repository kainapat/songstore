/**
 * backend/controllers/songs.js
 * Song business logic
 */

const { Song, Album, Artist } = require('../../models');

/**
 * ดึงรายการเพลงทั้งหมด
 */
exports.getAllSongs = async (filters = {}) => {
  const { artist_id, album_id, genre } = filters;
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
  
  return filteredSongs;
};

/**
 * ดึงข้อมูลเพลงตาม ID
 */
exports.getSongById = async (id) => {
  const song = await Song.findByPk(id, {
    include: [{
      model: Album,
      as: 'album',
      include: [{
        model: Artist,
        as: 'artist'
      }]
    }]
  });
  
  return song;
};

/**
 * สร้างเพลงใหม่
 */
exports.createSong = async (data) => {
  // ตรวจสอบว่ามี album นี้หรือไม่
  const album = await Album.findByPk(data.album_id);
  if (!album) {
    throw new Error('ไม่พบอัลบั้มนี้');
  }
  
  const song = await Song.create(data);
  return song;
};

/**
 * แก้ไขข้อมูลเพลง
 */
exports.updateSong = async (id, data) => {
  const song = await Song.findByPk(id);
  
  if (!song) {
    throw new Error('ไม่พบเพลงนี้');
  }
  
  // ถ้ามีการเปลี่ยน album_id ให้ตรวจสอบว่ามี album นี้
  if (data.album_id && data.album_id !== song.album_id) {
    const album = await Album.findByPk(data.album_id);
    if (!album) {
      throw new Error('ไม่พบอัลบั้มนี้');
    }
  }
  
  await song.update(data);
  return song;
};

/**
 * ลบเพลง
 */
exports.deleteSong = async (id) => {
  const song = await Song.findByPk(id);
  
  if (!song) {
    throw new Error('ไม่พบเพลงนี้');
  }
  
  await song.destroy();
  return true;
};
