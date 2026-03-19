# Song Store - Project Context

## Project Overview

**Song Store** is a full-stack web application for managing music data including artists, albums, and songs. Built with Node.js, it features a **modular architecture** with separated backend/frontend.

### Architecture

```
┌─────────────────┐     HTTP/Axios     ┌─────────────────┐
│   Frontend      │ ◄────────────────► │    Backend      │
│   (Port 4000)   │                    │   (Port 3000)   │
│   Express+EJS   │                    │   Express API   │
└─────────────────┘                    └────────┬────────┘
                                                │
                                                ▼
                                       ┌─────────────────┐
                                       │   SQLite DB     │
                                       │  (music.sqlite) │
                                       └─────────────────┘
```

### Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js, Express, Sequelize ORM, SQLite3, body-parser, cors |
| **Frontend** | Express, EJS templates, Axios |
| **Database** | SQLite3 with Sequelize ORM |
| **Fonts** | Google Fonts - Sukhumvit Set |
| **Theme** | Spotify Dark Theme |

---

## Project Structure (Refactored)

```
songstore/
├── backend/                    # Backend API (Refactored from backend.js)
│   ├── index.js              # Main entry point (~50 lines)
│   ├── config/
│   │   └── database.js       # Sequelize connection
│   ├── routes/
│   │   ├── artists.js        # Artist routes (~130 lines)
│   │   ├── albums.js         # Album routes (~150 lines)
│   │   └── songs.js          # Song routes (~150 lines)
│   ├── controllers/
│   │   ├── artists.js        # Artist business logic (~80 lines)
│   │   ├── albums.js         # Album business logic (~100 lines)
│   │   └── songs.js          # Song business logic (~110 lines)
│   └── utils/
│       └── helpers.js        # Helper functions
│
├── frontend/                   # Frontend Web (Refactored from frontend.js)
│   ├── index.js              # Main entry point (~50 lines)
│   ├── routes/
│   │   ├── pages.js          # Main page routes (~40 lines)
│   │   ├── artists.js        # Artist page routes (~120 lines)
│   │   ├── albums.js         # Album page routes (~150 lines)
│   │   └── songs.js          # Song page routes (~160 lines)
│   └── utils/
│       └── api.js            # API client (~50 lines)
│
├── models/
│   └── index.js              # Sequelize models + relationships + seed data
├── views/                      # EJS templates (9 files)
├── public/
│   └── styles.css            # Spotify Dark Theme CSS
├── music.sqlite              # SQLite database (auto-generated)
└── package.json
```

### 📊 Refactoring Benefits

| Before | After |
|--------|-------|
| `backend.js` (700+ lines) | 5 files (avg ~100 lines each) |
| `frontend.js` (550+ lines) | 5 files (avg ~100 lines each) |
| Mixed concerns | **Separation of Concerns** |
| Hard to maintain | **Easy to maintain** |
| Single file | **Modular architecture** |
| Hard to test | **Easy to test** |
| Unclear responsibilities | **Clear responsibilities** |

---

## Building and Running

### Installation

```bash
npm install
```

### Running the Application

**Option 1: Separate terminals (recommended)**
```bash
# Terminal 1 - Backend
npm run start:backend
# or
node backend/index.js

# Terminal 2 - Frontend
npm run start:frontend
# or
node frontend/index.js
```

**Option 2: Run both concurrently**
```bash
npm start
# or
npm run dev
```

### Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:4000 | Web UI |
| Backend API | http://localhost:3000 | REST API |

---

## API Endpoints

### Artists API

| Method | Endpoint | Controller |
|--------|----------|------------|
| GET | `/artists` | `artistsController.getAllArtists()` |
| GET | `/artists/:id` | `artistsController.getArtistById()` |
| POST | `/artists` | `artistsController.createArtist()` |
| PUT | `/artists/:id` | `artistsController.updateArtist()` |
| DELETE | `/artists/:id` | `artistsController.deleteArtist()` |

### Albums API

| Method | Endpoint | Controller |
|--------|----------|------------|
| GET | `/albums` | `albumsController.getAllAlbums()` |
| GET | `/albums/:id` | `albumsController.getAlbumById()` |
| POST | `/albums` | `albumsController.createAlbum()` |
| PUT | `/albums/:id` | `albumsController.updateAlbum()` |
| DELETE | `/albums/:id` | `albumsController.deleteAlbum()` |

### Songs API

| Method | Endpoint | Controller |
|--------|----------|------------|
| GET | `/songs` | `songsController.getAllSongs()` |
| GET | `/songs/:id` | `songsController.getSongById()` |
| POST | `/songs` | `songsController.createSong()` |
| PUT | `/songs/:id` | `songsController.updateSong()` |
| DELETE | `/songs/:id` | `songsController.deleteSong()` |

---

## Key Features

### CRUD Operations
- Full Create, Read, Update, Delete for all entities
- Form-based UI for all operations
- Confirmation dialogs for delete actions

### Filtering System
- **Songs**: Filter by artist, album, or genre
- **Albums**: Filter by artist or release year

### Relational Data Display
- Songs show associated album and artist names
- Albums show associated artist name
- Artists show album count

### UI/UX - Spotify Dark Theme
- **Color Palette**:
  - Background: `#121212`, `#181818`, `#282828`
  - Accent: `#1DB954` (Spotify Green)
  - Text: `#FFFFFF`, `#B3B3B3`, `#6B6B6B`
- **Design**: Flat solid fills, no gradients
- **Font**: Sukhumvit Set (Google Fonts)

---

## Development Conventions

### Code Organization

**Backend:**
```
routes/     → HTTP endpoints, request/response handling
controllers/ → Business logic, database operations
config/     → Database, environment configuration
utils/      → Helper functions
```

**Frontend:**
```
routes/     → Page routes, form handling
utils/      → API client, helper functions
```

### Code Style
- **Comments**: Bilingual (Thai + English)
- **Naming**: snake_case for DB, camelCase for JS
- **Async/Await**: Used throughout
- **Error Handling**: Try-catch with user-friendly messages

### API Response Format
```javascript
{
  success: boolean,
  data: any,
  count?: number,
  message?: string,
  error?: string
}
```

---

## File Responsibilities

### Backend Files

| File | Lines | Responsibility |
|------|-------|----------------|
| `backend/index.js` | ~50 | Express app setup, middleware, route mounting |
| `backend/config/database.js` | ~15 | Sequelize connection |
| `backend/routes/artists.js` | ~130 | Artist HTTP endpoints |
| `backend/routes/albums.js` | ~150 | Album HTTP endpoints |
| `backend/routes/songs.js` | ~150 | Song HTTP endpoints |
| `backend/controllers/artists.js` | ~80 | Artist business logic |
| `backend/controllers/albums.js` | ~100 | Album business logic |
| `backend/controllers/songs.js` | ~110 | Song business logic |
| `backend/utils/helpers.js` | ~15 | Helper functions |

### Frontend Files

| File | Lines | Responsibility |
|------|-------|----------------|
| `frontend/index.js` | ~50 | Express app setup, middleware, route mounting |
| `frontend/routes/pages.js` | ~40 | Main page (home) |
| `frontend/routes/artists.js` | ~120 | Artist pages & forms |
| `frontend/routes/albums.js` | ~150 | Album pages & forms |
| `frontend/routes/songs.js` | ~160 | Song pages & forms |
| `frontend/utils/api.js` | ~50 | API client with error handling |

---

## Common Tasks

### Add New API Endpoint

1. Add controller function in `backend/controllers/<entity>.js`
2. Add route in `backend/routes/<entity>.js`
3. Add frontend route in `frontend/routes/<entity>.js`
4. Create/update EJS view

### Modify Business Logic

Edit the appropriate controller file:
- `backend/controllers/artists.js` - Artist logic
- `backend/controllers/albums.js` - Album logic
- `backend/controllers/songs.js` - Song logic

### Change Theme Colors

Edit CSS variables in `public/styles.css` `:root` section

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | `netstat -ano \| findstr :3000` or `:4000` |
| API not responding | Ensure backend is running before frontend |
| Module not found | Check paths use `..` to go up from backend/frontend folders |
| CORS errors | Backend CORS allows `http://localhost:4000` |

---

## Current State

### Architecture: Modular (Refactored)
- **Backend**: 5 files, ~600 total lines (was 700 in 1 file)
- **Frontend**: 5 files, ~520 total lines (was 550 in 1 file)
- **Separation of Concerns**: Routes, Controllers, Config separated
- **Maintainability**: Easy to find and modify specific features
- **Testability**: Each module can be tested independently

### Benefits of Refactoring
1. **Easier to understand** - Each file has single responsibility
2. **Easier to maintain** - Changes are localized
3. **Easier to test** - Can test controllers independently
4. **Better collaboration** - Multiple developers can work on different files
5. **Scalability** - Easy to add new features without bloating files
