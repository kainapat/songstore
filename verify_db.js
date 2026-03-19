/**
 * verify_db.js
 * ไฟล์ตรวจสอบฐานข้อมูลและทดสอบ API
 * 
 * วิธีใช้:
 *   node verify_db.js
 */

const axios = require('axios');

const API_URL = 'http://localhost:3000';

// สีสำหรับ console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

async function verifyDatabase() {
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}          🎵 Song Store - Database Verification${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

  let allPassed = true;

  // ทดสอบที่ 1: ตรวจสอบ Artists
  console.log(`${colors.blue}[1/6]${colors.reset} กำลังตรวจสอบ Artists...`);
  try {
    const response = await axios.get(`${API_URL}/artists`);
    if (response.data.success) {
      console.log(`${colors.green}   ✓ Artists API ทำงาน${colors.reset}`);
      console.log(`   พบ ${response.data.count} ศิลปิน:`);
      response.data.data.forEach(artist => {
        console.log(`     - ${artist.artist_name} (${artist.country}) - ${artist.albums?.length || 0} อัลบั้ม`);
      });
    } else {
      console.log(`${colors.red}   ✗ Artists API ไม่ทำงาน${colors.reset}`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`${colors.red}   ✗ ไม่สามารถเชื่อมต่อ API: ${error.message}${colors.reset}`);
    allPassed = false;
  }
  console.log();

  // ทดสอบที่ 2: ตรวจสอบ Albums
  console.log(`${colors.blue}[2/6]${colors.reset} กำลังตรวจสอบ Albums...`);
  try {
    const response = await axios.get(`${API_URL}/albums`);
    if (response.data.success) {
      console.log(`${colors.green}   ✓ Albums API ทำงาน${colors.reset}`);
      console.log(`   พบ ${response.data.count} อัลบั้ม:`);
      response.data.data.forEach(album => {
        console.log(`     - ${album.album_title} (${album.release_year}) - ${album.artist?.artist_name || 'Unknown'}`);
      });
    } else {
      console.log(`${colors.red}   ✗ Albums API ไม่ทำงาน${colors.reset}`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`${colors.red}   ✗ ไม่สามารถเชื่อมต่อ API: ${error.message}${colors.reset}`);
    allPassed = false;
  }
  console.log();

  // ทดสอบที่ 3: ตรวจสอบ Songs
  console.log(`${colors.blue}[3/6]${colors.reset} กำลังตรวจสอบ Songs...`);
  try {
    const response = await axios.get(`${API_URL}/songs`);
    if (response.data.success) {
      console.log(`${colors.green}   ✓ Songs API ทำงาน${colors.reset}`);
      console.log(`   พบ ${response.data.count} เพลง:`);
      response.data.data.forEach(song => {
        const duration = `${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}`;
        console.log(`     - ${song.song_name} (${song.genre}) - ${duration} นาที - ${song.album?.album_title || 'Unknown'}`);
      });
    } else {
      console.log(`${colors.red}   ✗ Songs API ไม่ทำงาน${colors.reset}`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`${colors.red}   ✗ ไม่สามารถเชื่อมต่อ API: ${error.message}${colors.reset}`);
    allPassed = false;
  }
  console.log();

  // ทดสอบที่ 4: Filter เพลงตาม Artist
  console.log(`${colors.blue}[4/6]${colors.reset} กำลังทดสอบ Filter เพลงตามศิลปิน...`);
  try {
    const response = await axios.get(`${API_URL}/songs?artist_id=1`);
    if (response.data.success) {
      console.log(`${colors.green}   ✓ Filter เพลงตามศิลปินทำงาน${colors.reset}`);
      console.log(`   พบ ${response.data.count} เพลงของ artist_id=1`);
    } else {
      console.log(`${colors.red}   ✗ Filter ไม่ทำงาน${colors.reset}`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`${colors.red}   ✗ Error: ${error.message}${colors.reset}`);
    allPassed = false;
  }
  console.log();

  // ทดสอบที่ 5: Filter เพลงตาม Genre
  console.log(`${colors.blue}[5/6]${colors.reset} กำลังทดสอบ Filter เพลงตามแนวเพลง...`);
  try {
    const response = await axios.get(`${API_URL}/songs?genre=Rock`);
    if (response.data.success) {
      console.log(`${colors.green}   ✓ Filter เพลงตามแนวเพลงทำงาน${colors.reset}`);
      console.log(`   พบ ${response.data.count} เพลงแนว Rock`);
    } else {
      console.log(`${colors.red}   ✗ Filter ไม่ทำงาน${colors.reset}`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`${colors.red}   ✗ Error: ${error.message}${colors.reset}`);
    allPassed = false;
  }
  console.log();

  // ทดสอบที่ 6: Filter อัลบั้มตามปี
  console.log(`${colors.blue}[6/6]${colors.reset} กำลังทดสอบ Filter อัลบั้มตามปี...`);
  try {
    const response = await axios.get(`${API_URL}/albums?release_year=1982`);
    if (response.data.success) {
      console.log(`${colors.green}   ✓ Filter อัลบั้มตามปีทำงาน${colors.reset}`);
      console.log(`   พบ ${response.data.count} อัลบั้มในปี 1982`);
      response.data.data.forEach(album => {
        console.log(`     - ${album.album_title}`);
      });
    } else {
      console.log(`${colors.red}   ✗ Filter ไม่ทำงาน${colors.reset}`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`${colors.red}   ✗ Error: ${error.message}${colors.reset}`);
    allPassed = false;
  }
  console.log();

  // สรุปผล
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
  if (allPassed) {
    console.log(`${colors.green} ✓ ทุกการทดสอบผ่าน! ฐานข้อมูลพร้อมใช้งาน${colors.reset}`);
  } else {
    console.log(`${colors.yellow} ⚠ มีบางการทดสอบไม่ผ่าน กรุณาตรวจสอบ${colors.reset}`);
  }
  console.log(`${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

  // แสดงวิธีใช้งาน
  console.log(`${colors.yellow}📌 วิธีใช้งาน:${colors.reset}`);
  console.log(`   Frontend: http://localhost:4000`);
  console.log(`   Backend API: http://localhost:3000`);
  console.log();
}

// รันการตรวจสอบ
verifyDatabase().catch(console.error);
