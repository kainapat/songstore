# Song Store - Project Context

## Project Overview

**Song Store** is a full-stack web application for managing music data including artists, albums, and songs. Built with Node.js, it features a separated backend/frontend architecture with RESTful API communication.

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

### Database Schema

**3 Tables with Relationships:**

```
Artist (1) ──< Album (Many)
Album (1) ──< Song (Many)
```

| Table | Primary Key | Foreign Keys | Key Fields |
|-------|-------------|--------------|------------|
| `artists` | artist_id | - | artist_name, country |
| `albums` | album_id | artist_id → artists | album_title, release_year |
| `songs` | song_id | album_id → albums | song_name, genre, duration |

---

## Project Structure

```
songstore/
├── backend.js              # Backend API Server (Port 3000)
├── frontend.js             # Frontend Web Server (Port 4000)
├── package.json            # Dependencies & scripts
├── music.sqlite            # SQLite database (auto-generated)
├── verify_db.js            # Database verification script
├── models/
│   └── index.js            # Sequelize models + relationships + seed data
├── views/                  # EJS templates
│   ├── header.ejs          # Navigation header (with Google Fonts link)
│   ├── footer.ejs          # Footer component
│   ├── index.ejs           # Home/Dashboard page
│   ├── artists.ejs         # Artists list page
│   ├── artist-form.ejs     # Create/Edit artist form
│   ├── albums.ejs          # Albums list page (with filters)
│   ├── album-form.ejs      # Create/Edit album form
│   ├── songs.ejs           # Songs list page (with filters)
│   └── song-form.ejs       # Create/Edit song form
└── public/
    └── styles.css          # Global styles (Sukhumvit Set font, responsive design)
```

---

## Building and Running

### Installation

```bash
npm install
```

### Running the Application

**Option 1: Separate terminals (recommended)**
```bash
# Terminal 1 - Start Backend API
node backend.js

# Terminal 2 - Start Frontend Web Server
node frontend.js
```

**Option 2: Run both concurrently**
```bash
npm start
```

### Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:4000 | Web UI |
| Backend API | http://localhost:3000 | REST API |

### Verification

Run the verification script to test all APIs:
```bash
node verify_db.js
```

---

## API Endpoints

### Artists API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/artists` | List all artists (filter: `?country=`) |
| GET | `/artists/:id` | Get artist by ID (includes albums) |
| POST | `/artists` | Create artist `{artist_name, country}` |
| PUT | `/artists/:id` | Update artist |
| DELETE | `/artists/:id` | Delete artist (CASCADE: deletes albums & songs) |

### Albums API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/albums` | List all albums (filters: `?artist_id=`, `?release_year=`) |
| GET | `/albums/:id` | Get album by ID (includes artist & songs) |
| POST | `/albums` | Create album `{album_title, release_year, artist_id}` |
| PUT | `/albums/:id` | Update album |
| DELETE | `/albums/:id` | Delete album (CASCADE: deletes songs) |

### Songs API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/songs` | List all songs (filters: `?artist_id=`, `?album_id=`, `?genre=`) |
| GET | `/songs/:id` | Get song by ID (includes album & artist) |
| POST | `/songs` | Create song `{song_name, genre, duration, album_id}` |
| PUT | `/songs/:id` | Update song |
| DELETE | `/songs/:id` | Delete song |

---

## Key Features

### CRUD Operations
- Full Create, Read, Update, Delete for all entities
- Form-based UI for all operations
- Confirmation dialogs for delete actions

### Filtering System
- **Songs**: Filter by artist, album, or genre
- **Albums**: Filter by artist or release year
- Query parameters passed through Axios to backend API

### Relational Data Display
- Songs show associated album and artist names
- Albums show associated artist name
- Artists show album count

### UI/UX
- **Font**: Sukhumvit Set (loaded from Google Fonts)
- **Dashboard Cards**: Grid layout with proper spacing (padding: 30px 25px 35px)
- **Card Links**: Inline-block positioning (not absolute) to prevent text overlap
- **Responsive design** with mobile support
- **Gradient theme** (purple/indigo)
- **Clean table layouts** with hover effects

### Seed Data
Auto-populated on first run:
- 3 Artists: The Beatles, Queen, Michael Jackson
- 3 Albums: Abbey Road, A Night at the Opera, Thriller
- 6 Songs with various genres (Rock, Pop)

---

## Development Conventions

### Code Style
- **Comments**: Bilingual (Thai + English) for clarity
- **Naming**: snake_case for database fields, camelCase for JavaScript
- **Async/Await**: Used throughout for database operations
- **Error Handling**: Try-catch blocks with user-friendly messages

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

### Frontend Patterns
- EJS partials for header/footer
- Header includes Google Fonts link (Sukhumvit Set)
- Form actions use POST method (PUT/DELETE routed via Express)
- Filter forms use GET with query parameters
- Inline confirmation for destructive actions
- Page headers wrapped in `<div>` for flex layout

### CSS Conventions
- **Font**: `'Sukhumvit Set', 'Sarabun', sans-serif`
- **Line-height**: 1.3-1.6 for readability
- **Box-sizing**: border-box globally (`*, *::before, *::after`)
- **Responsive breakpoints**: 768px
- **Gradient buttons and badges**
- **Card padding**: 30px 25px 35px (extra bottom padding)
- **Card links**: inline-block with margin-top (not absolute positioned)

### Database Practices
- `timestamps: false` - No auto-generated created_at/updated_at
- `underscored: true` - Snake case column names
- CASCADE delete for referential integrity
- Auto-increment integer primary keys

---

## Common Tasks

### Reset Database
Delete `music.sqlite` and restart backend to reseed:
```bash
rm music.sqlite
node backend.js
```

### Add New Entity Type
1. Add model definition in `models/index.js`
2. Define relationships with existing models
3. Create API routes in `backend.js`
4. Create EJS views in `views/`
5. Add routes in `frontend.js`

### Modify Filter Options
1. Update backend API query parameter handling
2. Update frontend filter form in relevant EJS template
3. Ensure query string construction in frontend.js

### Change Font
Edit `views/header.ejs` to change Google Fonts link, and update `body` font-family in `public/styles.css`

### Fix Card Text Overlap
Ensure `.card-link` uses `position: relative` and `display: inline-block` with `margin-top`, and `.card` has sufficient bottom padding (35px)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Check with `netstat -ano \| findstr :3000` or `:4000` |
| Database locked | Close other Node processes, delete `music.sqlite-journal` |
| CORS errors | Ensure backend CORS allows `http://localhost:4000` |
| API not responding | Start backend before frontend |
| Text overlapping | Check internet connection for font, hard refresh (Ctrl+F5) |
| Font not loading | Verify Google Fonts link in header.ejs, check network tab |
| Card text overlap | Ensure card-link uses inline-block positioning, check card padding |

---

## File Purposes Summary

| File | Purpose |
|------|---------|
| `backend.js` | Express API server with Sequelize ORM integration |
| `frontend.js` | Express web server with EJS templating |
| `models/index.js` | Database connection, models, relationships, seed data |
| `views/header.ejs` | HTML head with Google Fonts (Sukhumvit Set) |
| `views/footer.ejs` | Closing HTML tags and footer |
| `views/index.ejs` | Home dashboard with stat cards |
| `views/artists.ejs` | Artists list with table |
| `views/artist-form.ejs` | Artist create/edit form |
| `views/albums.ejs` | Albums list with filters |
| `views/album-form.ejs` | Album create/edit form |
| `views/songs.ejs` | Songs list with filters |
| `views/song-form.ejs` | Song create/edit form |
| `public/styles.css` | Responsive CSS with Sukhumvit Set font, fixed card layout |
| `verify_db.js` | Automated API testing script |

---

## Current State (Latest Updates)

### Font
- **Primary**: Sukhumvit Set (Google Fonts)
- **Fallback**: Sarabun, Segoe UI, sans-serif
- **Loading**: Via `<link>` in header.ejs
- **Smoothing**: `-webkit-font-smoothing`, `-moz-osx-font-smoothing`

### CSS Improvements (Latest)
- **Line-height** applied to all text elements (1.3-1.6)
- **Box-sizing** with `*, *::before, *::after`
- **Responsive breakpoints** at 768px
- **White-space: nowrap** for badges and buttons
- **Card layout fixed**:
  - Padding: `30px 25px 35px` (extra bottom padding)
  - Card-link: `display: inline-block`, `margin-top: 10px`, `position: relative`, `bottom: auto`
  - Stat-info p: `margin: 0 0 15px 0` (bottom margin for spacing)

### Template Structure
- Page headers wrapped in `<div>` for better flex layout
- Consistent button styling across all pages
- Filter sections with proper spacing

### Color Scheme
- **Primary**: #667eea (purple)
- **Secondary**: #764ba2 (indigo)
- **Gradient**: 135deg linear gradient
- **Text**: #333, #555, #777
- **White**: #ffffff for cards/forms
