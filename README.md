# 🎵 Song Store - Spotify Dark Theme

ระบบจัดการเพลงและอัลบั้มแบบ Full-stack Web Application พร้อม UI แบบ Spotify Dark Theme

---

## 🎨 UI Theme

**Spotify Dark Theme** - โหมดมืดทั้งระบบ พร้อมสีเขียว Spotify (`#1DB954`) เป็นสีเน้น

![Theme Preview](https://via.placeholder.com/800x400/121212/1DB954?text=Spotify+Dark+Theme)

---

## 📋 สารบัญ

- [คุณสมบัติ](#-คุณสมบัติ)
- [UI Components](#-ui-components)
- [เทคโนโลยีที่ใช้](#-เทคโนโลยีที่ใช้)
- [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
- [การติดตั้ง](#-การติดตั้ง)
- [วิธีรัน](#-วิธีรัน)
- [API Endpoints](#-api-endpoints)
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
- 🎨 **Spotify Dark Theme** - UI โหมดมืดทั้งระบบ
- 🔗 แสดงข้อมูลแบบสัมพันธ์ (เพลง → อัลบั้ม → ศิลปิน)
- 🎯 ใช้ฟอนต์ **Sukhumvit Set** สำหรับภาษาไทย

---

## 🎨 UI Components

### Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-base` | `#121212` | พื้นหลังหลักของหน้า |
| `--bg-surface` | `#181818` | Navbar, Footer, Page Header |
| `--bg-card` | `#282828` | Cards, Tables, Forms |
| `--bg-hover` | `#333333` | Hover state |
| `--accent` | `#1DB954` | Spotify Green (Primary buttons, links) |
| `--accent-dark` | `#158a3e` | Green hover state |
| `--text-primary` | `#FFFFFF` | ข้อความหลัก |
| `--text-secondary` | `#B3B3B3` | ข้อความรอง |
| `--text-muted` | `#6B6B6B` | ข้อความจาง |
| `--border` | `#333333` | เส้นขอบ |
| `--danger` | `#E22134` | Delete buttons |
| `--tag-bg` | `#1a3a1a` | Genre badge background |
| `--tag-text` | `#1DB954` | Genre badge text |
| `--edit-bg` | `#2a2000` | Edit button background |
| `--edit-color` | `#f59e0b` | Edit button text |

### Components

#### Navigation Bar
- พื้นหลัง: `#181818` พร้อม border ด้านล่าง
- โลโก้: สีเขียว Spotify
- Nav links: สีเทา (`#B3B3B3`), hover/active เป็นสีเขียวพร้อม underline

#### Dashboard Cards
- พื้นหลัง: `#282828`
- ตัวเลขสถิติ: ขนาด 42px สีเขียว (`#1DB954`)
- Label: ตัวพิมพ์ใหญ่ สีเทา
- Link "ดูทั้งหมด": สีเขียว พร้อม underline เมื่อ hover

#### Buttons
| Type | Background | Color | Border |
|------|-----------|-------|--------|
| **Primary** | `#1DB954` | `#000` | None |
| **Secondary** | Transparent | `#B3B3B3` | `#333` |
| **Edit** | `#2a2000` | `#f59e0b` | `#f59e0b` |
| **Delete** | Transparent | `#E22134` | `#E22134` |

#### Tables
- Header row: `#181818` ตัวหนังสือสีเทา ตัวพิมพ์ใหญ่
- Body rows: สลับสี `#121212` / `#282828`
- Hover: `#333333`
- Border: `#333`

#### Forms
- Card: `#282828` พร้อม border
- Labels: ตัวพิมพ์ใหญ่ สีเทา
- Inputs: `#121212` border `#333`, focus border สีเขียว
- Focus shadow: `rgba(29, 185, 84, 0.2)`

#### Genre Badge
- Background: `#1a3a1a` (เขียวเข้ม)
- Text: `#1DB954` (เขียว Spotify)
- Border radius: 500px (pill shape)

#### Typography
- Font: **Sukhumvit Set** (Google Fonts)
- Base size: 14px
- Line height: 1.6

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

### Fonts
| Font | แหล่งที่มา |
|------|-----------|
| **Sukhumvit Set** | Google Fonts |

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
│   ├── header.ejs          # Navbar (Spotify Dark)
│   ├── footer.ejs          # Footer (Dark)
│   ├── index.ejs           # Dashboard (Dark Cards)
│   ├── artists.ejs         # Artists Table (Dark)
│   ├── artist-form.ejs     # Artist Form (Dark)
│   ├── albums.ejs          # Albums Table + Filter (Dark)
│   ├── album-form.ejs      # Album Form (Dark)
│   ├── songs.ejs           # Songs Table + Filter (Dark)
│   └── song-form.ejs       # Song Form (Dark)
└── public/
    └── styles.css          # Spotify Dark Theme CSS
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
5. **Font:** ระบบใช้ Google Font "Sukhumvit Set" ต้องเชื่อมต่ออินเทอร์เน็ต
6. **Theme:** Spotify Dark Theme - ไม่มี gradient ใช้ solid color เท่านั้น

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

### Font ไม่แสดง
- ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต (สำหรับโหลด Font)
- กด Ctrl+F5 เพื่อ Hard Refresh Browser
- ลบ Cache ของ Browser

### ฐานข้อมูลมีปัญหา
ลบไฟล์ `music.sqlite` แล้วรัน backend ใหม่ ระบบจะสร้างและ seed ข้อมูลใหม่

---

## 📄 License

MIT License - พัฒนาเพื่อการศึกษา
