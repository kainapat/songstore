/**
 * backend/controllers/artists.js
 * Artist business logic
 */

const { Artist, Album } = require('../../models');

/**
 * ดึงรายการศิลปินทั้งหมด
 */
exports.getAllArtists = async (filters = {}) => {
  const { country } = filters;
  const where = {};
  
  if (country) {
    where.country = country;
  }
  
  const artists = await Artist.findAll({
    where,
    include: [{
      model: Album,
      as: 'albums',
      attributes: ['album_id', 'album_title', 'release_year']
    }],
    order: [['artist_id', 'ASC']]
  });
  
  return artists;
};

/**
 * ดึงข้อมูลศิลปินตาม ID
 */
exports.getArtistById = async (id) => {
  const artist = await Artist.findByPk(id, {
    include: [{
      model: Album,
      as: 'albums',
      include: [{
        model: require('../../models').Song,
        as: 'songs'
      }]
    }]
  });
  
  return artist;
};

/**
 * สร้างศิลปินใหม่
 */
exports.createArtist = async (data) => {
  const artist = await Artist.create(data);
  return artist;
};

/**
 * แก้ไขข้อมูลศิลปิน
 */
exports.updateArtist = async (id, data) => {
  const artist = await Artist.findByPk(id);
  
  if (!artist) {
    throw new Error('ไม่พบศิลปินนี้');
  }
  
  await artist.update(data);
  return artist;
};

/**
 * ลบศิลปิน
 */
exports.deleteArtist = async (id) => {
  const artist = await Artist.findByPk(id);
  
  if (!artist) {
    throw new Error('ไม่พบศิลปินนี้');
  }
  
  await artist.destroy();
  return true;
};
