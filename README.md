# 🎵 Song Store - ระบบจัดการเพลงและอัลบั้ม

Full-stack Web Application สำหรับจัดการข้อมูลศิลปิน อัลบั้ม และเพลง

---

## 📋 สารบัญ

- [คุณสมบัติ](#-คุณสมบัติ)
- [เทคโนโลยีที่ใช้](#-เทคโนโลยีที่ใช้)
- [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
- [การติดตั้ง](#-การติดตั้ง)
- [วิธีรัน](#-วิธีรัน)
- [API Endpoints](#-api-endpoints)
- [ฟีเจอร์กรองข้อมูล](#-ฟีเจอร์กรองข้อมูล)
- [ฐานข้อมูล](#-ฐานข้อมูล)

---

## ✨ คุณสมบัติ

### ระบบจัดการ
- ✅ จัดการข้อมูล **ศิลปิน** (เพิ่ม, แก้ไข, ลบ, ดู)
- ✅ จัดการข้อมูล **อัลบั้ม** (เพิ่ม, แก้ไข, ลบ, ดู)
- ✅ จัดการข้อมูล **เพลง** (เพิ่ม, แก้ไข, ลบ, ดู)

### ฟีเจอร์พิเศษ
- 🔍 **กรองข้อมูล** เพลงตาม: ศิลปิน, อัลบั้ม, แนวเพลง
- 🔍 **กรองข้อมูล** อัลบั้มตาม: ศิลปิน, ปีที่ออก
- 📊 แสดง Dashboard สรุปจำนวนข้อมูล
- 🎨 UI สวยงาม ทันสมัย รองรับ Responsive
- 🔗 แสดงข้อมูลแบบสัมพันธ์ (เพลง → อัลบั้ม → ศิลปิน)

---

## 🛠 เทคโนโลยีที่ใช้

### Backend (Port 3000)
| Technology | รายละเอียด |
|------------|------------|
| **Node.js** | JavaScript Runtime |
| **Express** | Web Framework |
| **Sequelize** | ORM สำหรับจัดการฐานข้อมูล |
| **SQLite3** | ฐานข้อมูลไฟล์เดียว |
| **body-parser** | Parse JSON และ URL-encoded data |
| **cors** | เปิดรับ request จาก frontend |

### Frontend (Port 4000)
| Technology | รายละเอียด |
|------------|------------|
| **Express** | Web Server |
| **EJS** | Template Engine |
| **Axios** | HTTP Client สำหรับเรียก API |

---

## 📁 โครงสร้างโปรเจกต์

```
songstore/
├── backend.js              # Backend API Server (Port 3000)
├── frontend.js             # Frontend Web Server (Port 4000)
├── package.json            # Dependencies
├── music.sqlite            # ฐานข้อมูล SQLite (สร้างอัตโนมัติ)
├── models/
│   └── index.js            # Sequelize Models & Relationships
├── views/
│   ├── header.ejs          # ส่วนหัวของหน้า
│   ├── footer.ejs          # ส่วนท้ายของหน้า
│   ├── index.ejs           # หน้าแรก (Home)
│   ├── artists.ejs         # หน้ารายการศิลปิน
│   ├── artist-form.ejs     # ฟอร์มเพิ่ม/แก้ไขศิลปิน
│   ├── albums.ejs          # หน้ารายการอัลบั้ม
│   ├── album-form.ejs      # ฟอร์มเพิ่ม/แก้ไขอัลบั้ม
│   ├── songs.ejs           # หน้ารายการเพลง
│   └── song-form.ejs       # ฟอร์มเพิ่ม/แก้ไขเพลง
└── public/
    └── styles.css          # CSS Styles
```

---

## 📦 การติดตั้ง

### ขั้นตอนที่ 1: ติดตั้ง Dependencies

```bash
cd c:\Users\guy26\Desktop\songstore
npm install
```

### ขั้นตอนที่ 2: ตรวจสอบการติดตั้ง

```bash
npm list --depth=0
```

---

## 🚀 วิธีรัน

### วิธีที่ 1: แยก Terminal (แนะนำ)

**Terminal 1 - รัน Backend:**
```bash
node backend.js
```

**Terminal 2 - รัน Frontend:**
```bash
node frontend.js
```

### วิธีที่ 2: รันพร้อมกันด้วย Concurrently

```bash
npm start
```

### เข้าใช้งานระบบ

เปิด Browser แล้วไปที่:
- 🌐 **Frontend:** http://localhost:4000
- 🔌 **Backend API:** http://localhost:3000

---

## 🔌 API Endpoints

### Artists (ศิลปิน)

| Method | Endpoint | รายละเอียด |
|--------|----------|------------|
| GET | `/artists` | ดึงรายการศิลปินทั้งหมด |
| GET | `/artists/:id` | ดึงข้อมูลศิลปินตาม ID |
| POST | `/artists` | สร้างศิลปินใหม่ |
| PUT | `/artists/:id` | แก้ไขข้อมูลศิลปิน |
| DELETE | `/artists/:id` | ลบศิลปิน |

**ตัวอย่าง Query Parameters:**
- `GET /artists?country=UK` - กรองตามประเทศ

### Albums (อัลบั้ม)

| Method | Endpoint | รายละเอียด |
|--------|----------|------------|
| GET | `/albums` | ดึงรายการอัลบั้มทั้งหมด |
| GET | `/albums/:id` | ดึงข้อมูลอัลบั้มตาม ID |
| POST | `/albums` | สร้างอัลบั้มใหม่ |
| PUT | `/albums/:id` | แก้ไขข้อมูลอัลบั้ม |
| DELETE | `/albums/:id` | ลบอัลบั้ม |

**ตัวอย่าง Query Parameters:**
- `GET /albums?artist_id=1` - กรองตามศิลปิน
- `GET /albums?release_year=1980` - กรองตามปี

### Songs (เพลง)

| Method | Endpoint | รายละเอียด |
|--------|----------|------------|
| GET | `/songs` | ดึงรายการเพลงทั้งหมด |
| GET | `/songs/:id` | ดึงข้อมูลเพลงตาม ID |
| POST | `/songs` | สร้างเพลงใหม่ |
| PUT | `/songs/:id` | แก้ไขข้อมูลเพลง |
| DELETE | `/songs/:id` | ลบเพลง |

**ตัวอย่าง Query Parameters:**
- `GET /songs?artist_id=1` - กรองตามศิลปิน (ผ่านอัลบั้ม)
- `GET /songs?album_id=1` - กรองตามอัลบั้ม
- `GET /songs?genre=Rock` - กรองตามแนวเพลง

---

## 🔍 ฟีเจอร์กรองข้อมูล

### กรองเพลง
เข้าใช้งานที่: http://localhost:4000/songs

| ฟิลด์ | รายละเอียด |
|-------|------------|
| ศิลปิน | แสดงเพลงของศิลปินที่เลือก |
| อัลบั้ม | แสดงเพลงในอัลบั้มที่เลือก |
| แนวเพลง | แสดงเพลงตามแนวเพลง (Rock, Pop, etc.) |

### กรองอัลบั้ม
เข้าใช้งานที่: http://localhost:4000/albums

| ฟิลด์ | รายละเอียด |
|-------|------------|
| ศิลปิน | แสดงอัลบั้มของศิลปินที่เลือก |
| ปี | แสดงอัลบั้มที่ออกในปีที่ระบุ |

---

## 💾 ฐานข้อมูล

### ชื่อไฟล์: `music.sqlite`

### ตารางข้อมูล

#### 1. artists (ศิลปิน)
| คอลัมน์ | ชนิด | คำอธิบาย |
|---------|------|----------|
| artist_id | INTEGER | รหัสศิลปิน (PK, Auto Increment) |
| artist_name | TEXT | ชื่อศิลปิน |
| country | TEXT | ประเทศ |

#### 2. albums (อัลบั้ม)
| คอลัมน์ | ชนิด | คำอธิบาย |
|---------|------|----------|
| album_id | INTEGER | รหัสอัลบั้ม (PK, Auto Increment) |
| album_title | TEXT | ชื่ออัลบั้ม |
| release_year | INTEGER | ปีที่ออก |
| artist_id | INTEGER | รหัสศิลปิน (FK) |

#### 3. songs (เพลง)
| คอลัมน์ | ชนิด | คำอธิบาย |
|---------|------|----------|
| song_id | INTEGER | รหัสเพลง (PK, Auto Increment) |
| song_name | TEXT | ชื่อเพลง |
| genre | TEXT | แนวเพลง |
| duration | INTEGER | ระยะเวลา (วินาที) |
| album_id | INTEGER | รหัสอัลบั้ม (FK) |

### Relationships (ความสัมพันธ์)

```
Artist (1) ──< Album (Many)
Album (1) ──< Song (Many)
```

### ข้อมูลตัวอย่าง (Seed Data)

ระบบจะสร้างข้อมูลตัวอย่างอัตโนมัติเมื่อเริ่มทำงานครั้งแรก:

**ศิลปิน:**
- The Beatles (UK)
- Queen (UK)
- Michael Jackson (USA)

**อัลบั้ม:**
- Abbey Road (1969) - The Beatles
- A Night at the Opera (1975) - Queen
- Thriller (1982) - Michael Jackson

**เพลง:**
- Come Together, Something (Abbey Road)
- Bohemian Rhapsody, We Are the Champions (A Night at the Opera)
- Billie Jean, Thriller (Thriller)

---

## 📝 หมายเหตุ

1. **ลำดับการรัน:** ต้องรัน `backend.js` ก่อน `frontend.js` เสมอ
2. **Port:** Backend ใช้ port 3000, Frontend ใช้ port 4000
3. **ฐานข้อมูล:** ไฟล์ `music.sqlite` จะถูกสร้างอัตโนมัติในโฟลเดอร์โปรเจกต์
4. **การลบข้อมูล:** การลบศิลปินจะลบอัลบั้มและเพลงที่เกี่ยวข้องทั้งหมด (CASCADE)

---

## 🎨 หน้าจอการใช้งาน

1. **หน้าแรก** - แสดง Dashboard สรุปจำนวนข้อมูล
2. **หน้าศิลปิน** - แสดงรายการศิลปิน พร้อมฟอร์มเพิ่ม/แก้ไข
3. **หน้าอัลบั้ม** - แสดงรายการอัลบั้ม พร้อมฟีเจอร์กรอง
4. **หน้าเพลง** - แสดงรายการเพลง พร้อมฟีเจอร์กรองแบบครบถ้วน

---

## 📞 การแก้ไขปัญหา

### Backend ไม่ทำงาน
```bash
# ตรวจสอบว่า port 3000 ว่าง
netstat -ano | findstr :3000
```

### Frontend ไม่ทำงาน
```bash
# ตรวจสอบว่า port 4000 ว่าง
netstat -ano | findstr :4000
```

### ฐานข้อมูลมีปัญหา
ลบไฟล์ `music.sqlite` แล้วรัน backend ใหม่ ระบบจะสร้างและ seed ข้อมูลใหม่

---

## 📄 License

MIT License - พัฒนาเพื่อการศึกษา
