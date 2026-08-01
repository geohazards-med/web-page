# Design System — Curso "Conocimientos del Territorio"

## Brand
- **GeoHazards** — investigación participativa en gestión del riesgo
- **Geoloro** — guía ilustrada del curso (mascota)
- Paleta arcilla/ocre: tierra, ladrillo, ámbar, vegetación

## Tokens (CSS custom properties)

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#8A4F2A` | Headings, primary UI, dark accents |
| `--primary-dark` | `#6A3A1C` | Hover states, footer |
| `--accent` | `#D99A2B` | CTAs, progress bars, highlights |
| `--accent-dark` | `#B87D1E` | Hover on accent elements |
| `--bg` | `#FFF8EC` | Page background (cream) |
| `--bg-mid` | `#F4E7D3` | Card/secondary surfaces |
| `--bg-dark` | `#2F241D` | Dark banners, hero scrims |
| `--ink` | `#241a10` | Body text |
| `--text` | `#2F241D` | Primary text |
| `--text-muted` | `#6F6258` | Secondary text |
| `--green` | `#607A4B` | Safe/complete indicators |
| `--red` | `#A94438` | Alert/danger |
| `--blue` | `#3E5F66` | Information accents |
| `--border` | `#D8CCBE` | Dividers, card borders |
| `--radius` | `14px` | Card/component rounding |
| `--radius-sm` | `9px` | Small element rounding |

## Typography
- **Font:** Inter (300–900), sans-serif
- **Scale:** clamp-based responsive sizing
- **Hero h1:** `clamp(1.8rem, 4.5vw, 2.8rem)` — 900 weight, tight tracking
- **Module title:** `clamp(1.45rem, 3.4vw, 2rem)` — 900 weight
- **Lesson heading:** `clamp(1.2rem, 2.8vw, 1.5rem)` — 800 weight
- **Body:** `0.92rem` — 400 weight, `1.6` line-height

## Layout
- **Three-level navigation:** Home → Mission cards → Module checklist → Lesson
- **Persistent sidebar** (desktop: 260px fixed left; mobile: slide-in overlay)
- **Topbar:** 64px, brand left + breadcrumb + global progress
- **Content:** `max-width: 820px`, centered with `margin-left: 260px` on desktop

## Components

### Sidebar
- Fixed `260px` on desktop, slides from left on mobile
- Header: GeoHazards logo + course title
- Body: Module groups with expand/collapse lesson lists
- Icons per module (compass, tree, droplet, mountain)
- Active lesson highlighted with accent background
- Footer: global progress bar + completion count

### Topbar
- Fixed `64px` height, cream background
- GeoHazards logo (clickable → home)
- Breadcrumb showing current location
- Global progress track (hidden on narrow screens)
- Hamburger button on mobile to toggle sidebar

### Hero (Home)
- Full-width banner with field photography
- Dark scrim overlay for text legibility
- Geoloro guide illustration
- Progress bar + "Continuar" CTA
- 4 mission cards with real territory photography

### Mission Cards
- 2×2 grid, responsive → 1 column on mobile
- Real photography background overlay
- Module number badge, title, lesson count
- Accent border on hover

### Module Banner
- Module photography header with dark scrim
- Back link, title, tagline, progress row
- Lesson checklist with completion checkboxes

### Lesson View
- Audio player with synchronized transcript
- Scrollable transcript with clickable segments
- Image gallery with lightbox modal
- PDF viewer embed
- "Ir al audio" inline button + floating FAB

### FAB (Floating Action Button)
- Fixed bottom-right, accent gradient
- Appears when audio is out of view
- Pulse animation on appearance
- Uppercase label + speaker icon

## Shadows
- `--shadow-sm`: Subtle elevation for cards
- `--shadow-md`: Hover state elevation
- `--shadow-lg`: Modal/dropdown elevation
- Neutral `rgba(0,0,0,…)` — no colored glows

## Responsive Breakpoints
- **≤ 560px:** Single column, sidebar hidden, hamburger visible
- **560–820px:** Narrow sidebar, condensed typography
- **≥ 820px:** Full sidebar, max-width content centered

## States
- **Lesson complete:** `--accent` checkbox fill, strikethrough text if desired
- **Active lesson:** `--primary` background in sidebar, accent border
- **Incomplete:** Transparent checkbox, muted text
- **CTA dynamic:** "Comenzar" / "Continuar" / "Repasar" based on progress

## Assets
- **Logo:** `../logo/LogoGeoHazards.svg`
- **Hero:** `img/redesign/hero-campo.webp`
- **Mission cards:** `img/redesign/mission-{1,2,3,4}-*.webp`
- **Geoloro guide:** `img/redesign/geoloro-guide.webp`
- **Icons:** Inline SVG (compass, tree, droplet, mountain, speaker)
- **Media:** Audio MP3s, video, PDFs in `audio/`, `video/`, `pdf/` directories

## Accessibility
- `prefers-reduced-motion` respected
- Semantic headings (h1 → h2 → h3)
- Keyboard-navigable lesson list and sidebar
- ARIA labels on icon-only buttons (hamburger)
- Checkbox toggles for lesson completion
