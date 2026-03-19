# 🎵 Song Store - Spotify Dark Theme

ระบบจัดการเพลงและอัลบั้มแบบ Full-stack Web Application พร้อม UI แบบ Spotify Dark Theme

---

## 🎨 UI Theme

**Spotify Dark Theme** - โหมดมืดทั้งระบบ พร้อมสีเขียว Spotify (`#1DB954`) เป็นสีเน้น

---

## 📋 สารบัญ

- [คุณสมบัติ](#-คุณสมบัติ)
- [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
- [การติดตั้ง](#-การติดตั้ง)
- [วิธีรัน](#-วิธีรัน)
- [API Endpoints](#-api-endpoints)

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

## 📁 โครงสร้างโปรเจกต์

```
songstore/
├── backend/                    # Backend API (Refactored)
│   ├── index.js              # Main entry point (50 บรรทัด)
│   ├── config/
│   │   └── database.js       # Database connection
│   ├── routes/
│   │   ├── artists.js        # Artist routes
│   │   ├── albums.js         # Album routes
│   │   └── songs.js          # Song routes
│   ├── controllers/
│   │   ├── artists.js        # Artist business logic
│   │   ├── albums.js         # Album business logic
│   │   └── songs.js          # Song business logic
│   └── utils/
│       └── helpers.js        # Helper functions
│
├── frontend/                   # Frontend Web (Refactored)
│   ├── index.js              # Main entry point (50 บรรทัด)
│   ├── routes/
│   │   ├── pages.js          # Main page routes
│   │   ├── artists.js        # Artist page routes
│   │   ├── albums.js         # Album page routes
│   │   └── songs.js          # Song page routes
│   └── utils/
│       └── api.js            # API client
│
├── models/
│   └── index.js              # Sequelize models + relationships + seed data
├── views/                      # EJS templates
│   ├── header.ejs
│   ├── footer.ejs
│   ├── index.ejs
│   ├── artists.ejs
│   ├── artist-form.ejs
│   ├── albums.ejs
│   ├── album-form.ejs
│   ├── songs.ejs
│   └── song-form.ejs
├── public/
│   └── styles.css            # Spotify Dark Theme CSS
├── music.sqlite              # SQLite database (auto-generated)
└── package.json
```

### 📊 เปรียบเทียบก่อนและหลัง Refactor

| ก่อน Refactor | หลัง Refactor |
|--------------|---------------|
| `backend.js` (700+ บรรทัด) | 5 ไฟล์ (ไฟล์ละ ~50-150 บรรทัด) |
| `frontend.js` (550+ บรรทัด) | 5 ไฟล์ (ไฟล์ละ ~50-150 บรรทัด) |
| Mixed concerns | Separation of Concerns |
| Hard to maintain | Easy to maintain |
| Single file | Modular architecture |

---

## 📦 การติดตั้ง

```bash
cd c:\Users\guy26\Desktop\songstore
npm install
```

---

## 🚀 วิธีรัน

### วิธีที่ 1: แยก Terminal (แนะนำ)

**Terminal 1 - รัน Backend:**
```bash
npm run start:backend
# หรือ
node backend/index.js
```

**Terminal 2 - รัน Frontend:**
```bash
npm run start:frontend
# หรือ
node frontend/index.js
```

### วิธีที่ 2: รันพร้อมกันด้วย Concurrently

```bash
npm start
# หรือ
npm run dev
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

### Albums (อัลบั้ม)

| Method | Endpoint | รายละเอียด |
|--------|----------|------------|
| GET | `/albums` | ดึงรายการอัลบั้มทั้งหมด |
| GET | `/albums/:id` | ดึงข้อมูลอัลบั้มตาม ID |
| POST | `/albums` | สร้างอัลบั้มใหม่ |
| PUT | `/albums/:id` | แก้ไขข้อมูลอัลบั้ม |
| DELETE | `/albums/:id` | ลบอัลบั้ม |

### Songs (เพลง)

| Method | Endpoint | รายละเอียด |
|--------|----------|------------|
| GET | `/songs` | ดึงรายการเพลงทั้งหมด |
| GET | `/songs/:id` | ดึงข้อมูลเพลงตาม ID |
| POST | `/songs` | สร้างเพลงใหม่ |
| PUT | `/songs/:id` | แก้ไขข้อมูลเพลง |
| DELETE | `/songs/:id` | ลบเพลง |

---

## 💾 ฐานข้อมูล

### ชื่อไฟล์: `music.sqlite`

### ตารางข้อมูล

**3 Tables with Relationships:**

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

## 🎨 UI Components

### Color Palette (Spotify Dark Theme)

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-base` | `#121212` | พื้นหลังหลัก |
| `--bg-surface` | `#181818` | Navbar, Footer |
| `--bg-card` | `#282828` | Cards, Tables, Forms |
| `--accent` | `#1DB954` | Spotify Green |
| `--text-primary` | `#FFFFFF` | ข้อความหลัก |
| `--text-secondary` | `#B3B3B3` | ข้อความรอง |

---

## 📝 หมายเหตุ

1. **ลำดับการรัน:** ต้องรัน Backend ก่อน Frontend เสมอ
2. **Port:** Backend ใช้ port 3000, Frontend ใช้ port 4000
3. **ฐานข้อมูล:** ไฟล์ `music.sqlite` จะถูกสร้างอัตโนมัติ
4. **Font:** ระบบใช้ Google Font "Sukhumvit Set" ต้องเชื่อมต่ออินเทอร์เน็ต

---

## 📄 License

MIT License - พัฒนาเพื่อการศึกษา
