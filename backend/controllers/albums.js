/**
 * backend/controllers/albums.js
 * Album business logic
 */

const { Album, Artist, Song } = require('../../models');

/**
 * ดึงรายการอัลบั้มทั้งหมด
 */
exports.getAllAlbums = async (filters = {}) => {
  const { artist_id, release_year } = filters;
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
  
  return albums;
};

/**
 * ดึงข้อมูลอัลบั้มตาม ID
 */
exports.getAlbumById = async (id) => {
  const album = await Album.findByPk(id, {
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
  
  return album;
};

/**
 * สร้างอัลบั้มใหม่
 */
exports.createAlbum = async (data) => {
  // ตรวจสอบว่ามี artist นี้หรือไม่
  const artist = await Artist.findByPk(data.artist_id);
  if (!artist) {
    throw new Error('ไม่พบศิลปินนี้');
  }
  
  const album = await Album.create(data);
  return album;
};

/**
 * แก้ไขข้อมูลอัลบั้ม
 */
exports.updateAlbum = async (id, data) => {
  const album = await Album.findByPk(id);
  
  if (!album) {
    throw new Error('ไม่พบอัลบั้มนี้');
  }
  
  // ถ้ามีการเปลี่ยน artist_id ให้ตรวจสอบว่ามี artist นี้
  if (data.artist_id && data.artist_id !== album.artist_id) {
    const artist = await Artist.findByPk(data.artist_id);
    if (!artist) {
      throw new Error('ไม่พบศิลปินนี้');
    }
  }
  
  await album.update(data);
  return album;
};

/**
 * ลบอัลบั้ม
 */
exports.deleteAlbum = async (id) => {
  const album = await Album.findByPk(id);
  
  if (!album) {
    throw new Error('ไม่พบอัลบั้มนี้');
  }
  
  await album.destroy();
  return true;
};
