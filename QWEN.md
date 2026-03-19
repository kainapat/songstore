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
| **Theme** | Spotify Dark Theme |

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
│   ├── header.ejs          # Navigation header (Spotify Dark navbar)
│   ├── footer.ejs          # Footer component (Dark)
│   ├── index.ejs           # Home/Dashboard (Dark cards)
│   ├── artists.ejs         # Artists list (Dark table)
│   ├── artist-form.ejs     # Create/Edit artist (Dark form)
│   ├── albums.ejs          # Albums list with filters (Dark)
│   ├── album-form.ejs      # Create/Edit album (Dark form)
│   ├── songs.ejs           # Songs list with filters (Dark)
│   └── song-form.ejs       # Create/Edit song (Dark form)
└── public/
    └── styles.css          # Spotify Dark Theme CSS
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
| Frontend | http://localhost:4000 | Web UI (Spotify Dark Theme) |
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

### UI/UX - Spotify Dark Theme
- **Font**: Sukhumvit Set (loaded from Google Fonts)
- **Color Palette**:
  - Background: `#121212` (base), `#181818` (surface), `#282828` (card)
  - Accent: `#1DB954` (Spotify Green)
  - Text: `#FFFFFF` (primary), `#B3B3B3` (secondary), `#6B6B6B` (muted)
  - Danger: `#E22134` (red)
  - Edit: `#f59e0b` (amber)
- **Design**: Flat solid fills only, no gradients
- **Components**: Dark navbar, dark cards, dark tables, dark forms
- **Responsive design** with mobile support
- **Custom scrollbar** (dark themed)

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

### CSS Conventions - Spotify Dark Theme
- **CSS Variables**: All colors defined in `:root`
- **Font**: `'Sukhumvit Set', 'Helvetica Neue', Arial, sans-serif`
- **Line-height**: 1.3-1.6 for readability
- **Box-sizing**: border-box globally (`*, *::before, *::after`)
- **Responsive breakpoints**: 768px
- **Buttons**: Rounded (500px border-radius)
- **Tables**: Striped rows (odd/even backgrounds)
- **Forms**: Dark inputs with green focus border
- **Badges**: Green pill shape (`#1a3a1a` bg, `#1DB954` text)
- **No gradients**: Flat solid fills only

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

### Change Theme Colors
Edit CSS variables in `public/styles.css` `:root` section

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Check with `netstat -ano \| findstr :3000` or `:4000` |
| Database locked | Close other Node processes, delete `music.sqlite-journal` |
| CORS errors | Ensure backend CORS allows `http://localhost:4000` |
| API not responding | Start backend before frontend |
| Font not loading | Verify Google Fonts link in header.ejs, check network tab |
| UI looks wrong | Hard refresh browser (Ctrl+F5), clear cache |

---

## File Purposes Summary

| File | Purpose |
|------|---------|
| `backend.js` | Express API server with Sequelize ORM integration |
| `frontend.js` | Express web server with EJS templating |
| `models/index.js` | Database connection, models, relationships, seed data |
| `views/header.ejs` | HTML head with Google Fonts + Dark navbar |
| `views/footer.ejs` | Closing HTML tags + Dark footer |
| `views/index.ejs` | Home dashboard with dark stat cards |
| `views/artists.ejs` | Artists list with dark table |
| `views/artist-form.ejs` | Artist create/edit dark form |
| `views/albums.ejs` | Albums list with dark table + filters |
| `views/album-form.ejs` | Album create/edit dark form |
| `views/songs.ejs` | Songs list with dark table + filters + genre badges |
| `views/song-form.ejs` | Song create/edit dark form |
| `public/styles.css` | Spotify Dark Theme CSS (all colors, components) |
| `verify_db.js` | Automated API testing script |

---

## Current State (Latest Updates)

### Theme: Spotify Dark Theme
- **Background**: `#121212` (base), `#181818` (surface), `#282828` (card)
- **Accent**: `#1DB954` (Spotify Green)
- **Text**: `#FFFFFF` (primary), `#B3B3B3` (secondary), `#6B6B6B` (muted)
- **Buttons**: Rounded 500px, solid colors (no gradients)
- **Tables**: Striped rows with hover effect
- **Forms**: Dark inputs with green focus border/shadow
- **Badges**: Green pill (`#1a3a1a` bg, `#1DB954` text)
- **Scrollbar**: Custom dark themed (8px width)

### Font
- **Primary**: Sukhumvit Set (Google Fonts)
- **Fallback**: Helvetica Neue, Arial, sans-serif
- **Loading**: Via `<link>` in header.ejs
- **Smoothing**: `-webkit-font-smoothing`, `-moz-osx-font-smoothing`

### CSS Variables (Complete List)
```css
:root {
  --bg-base:        #121212;
  --bg-surface:     #181818;
  --bg-card:        #282828;
  --bg-hover:       #333333;
  --accent:         #1DB954;
  --accent-dark:    #158a3e;
  --text-primary:   #FFFFFF;
  --text-secondary: #B3B3B3;
  --text-muted:     #6B6B6B;
  --border:         #333333;
  --danger:         #E22134;
  --tag-bg:         #1a3a1a;
  --tag-text:       #1DB954;
  --edit-bg:        #2a2000;
  --edit-color:     #f59e0b;
}
```

### Template Structure
- Page headers wrapped in `<div>` for better flex layout
- Consistent button styling (Primary, Secondary, Edit, Delete)
- Filter sections with dark background
- Genre badges use `badge-genre` class

### Color Scheme (No Gradients)
- All backgrounds: Flat solid fills
- All buttons: Solid colors with border-radius 500px
- Hover effects: Transform scale or background change only
