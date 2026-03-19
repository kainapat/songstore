/**
 * models/index.js
 * ไฟล์นี้ทำหน้าที่:
 * 1. เชื่อมต่อกับฐานข้อมูล SQLite (music.sqlite)
 * 2. กำหนด Models ทั้ง 3: Artist, Album, Song
 * 3. สร้าง Relationships (Associations) ระหว่าง tables
 * 4. Seed ข้อมูลตัวอย่างเริ่มต้น
 */

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// สร้างการเชื่อมต่อกับฐานข้อมูล SQLite
// เก็บไฟล์ฐานข้อมูลชื่อ music.sqlite ในโฟลเดอร์โปรเจกต์
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'music.sqlite'),
  logging: false // ปิด logging เพื่อความสะอาดของ console
});

// ==========================================
// Model: Artist (ศิลปิน)
// ==========================================
const Artist = sequelize.define('Artist', {
  artist_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  artist_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'artists',
  timestamps: false, // ไม่ใช้ created_at, updated_at
  underscored: true  // ใช้ underscore ในชื่อคอลัมน์
});

// ==========================================
// Model: Album (อัลบั้ม)
// ==========================================
const Album = sequelize.define('Album', {
  album_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  album_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'artists',
      key: 'artist_id'
    }
  }
}, {
  tableName: 'albums',
  timestamps: false,
  underscored: true
});

// ==========================================
// Model: Song (เพลง)
// ==========================================
const Song = sequelize.define('Song', {
  song_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  song_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false // ระยะเวลาเป็นวินาที
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'albums',
      key: 'album_id'
    }
  }
}, {
  tableName: 'songs',
  timestamps: false,
  underscored: true
});

// ==========================================
// Relationships (ความสัมพันธ์ระหว่าง tables)
// ==========================================

// 1 Artist มีได้ Many Albums
Artist.hasMany(Album, { 
  foreignKey: 'artist_id', 
  as: 'albums',
  onDelete: 'CASCADE' // ลบ artist จะลบ albums ด้วย
});

// 1 Album belongs to 1 Artist
Album.belongsTo(Artist, { 
  foreignKey: 'artist_id', 
  as: 'artist' 
});

// 1 Album มีได้ Many Songs
Album.hasMany(Song, { 
  foreignKey: 'album_id', 
  as: 'songs',
  onDelete: 'CASCADE' // ลบ album จะลบ songs ด้วย
});

// 1 Song belongs to 1 Album
Song.belongsTo(Album, { 
  foreignKey: 'album_id', 
  as: 'album' 
});

// ==========================================
// Seed Data (ข้อมูลตัวอย่าง)
// ==========================================
async function seedData() {
  try {
    // ตรวจสอบว่ามีข้อมูลอยู่แล้วหรือไม่
    const artistCount = await Artist.count();
    
    if (artistCount === 0) {
      console.log('🌱 กำลัง seed ข้อมูลตัวอย่าง...');
      
      // สร้าง Artists
      const artist1 = await Artist.create({ artist_name: 'The Beatles', country: 'UK' });
      const artist2 = await Artist.create({ artist_name: 'Queen', country: 'UK' });
      const artist3 = await Artist.create({ artist_name: 'Michael Jackson', country: 'USA' });
      
      // สร้าง Albums
      const album1 = await Album.create({ album_title: 'Abbey Road', release_year: 1969, artist_id: artist1.artist_id });
      const album2 = await Album.create({ album_title: 'A Night at the Opera', release_year: 1975, artist_id: artist2.artist_id });
      const album3 = await Album.create({ album_title: 'Thriller', release_year: 1982, artist_id: artist3.artist_id });
      
      // สร้าง Songs
      await Song.create({ song_name: 'Come Together', genre: 'Rock', duration: 259, album_id: album1.album_id });
      await Song.create({ song_name: 'Something', genre: 'Rock', duration: 182, album_id: album1.album_id });
      await Song.create({ song_name: 'Bohemian Rhapsody', genre: 'Rock', duration: 354, album_id: album2.album_id });
      await Song.create({ song_name: 'We Are the Champions', genre: 'Rock', duration: 179, album_id: album2.album_id });
      await Song.create({ song_name: 'Billie Jean', genre: 'Pop', duration: 294, album_id: album3.album_id });
      await Song.create({ song_name: 'Thriller', genre: 'Pop', duration: 357, album_id: album3.album_id });
      
      console.log('✅ Seed ข้อมูลเสร็จสิ้น!');
    } else {
      console.log('ℹ️ ฐานข้อมูลมีข้อมูลอยู่แล้ว (ข้ามการ seed)');
    }
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการ seed ข้อมูล:', error);
  }
}

// ==========================================
// Export
// ==========================================
module.exports = {
  sequelize,
  Artist,
  Album,
  Song,
  seedData
};
