# 💍 Isabella & Alexander — Luxury Wedding Invitation Website

A premium, multi-page wedding invitation website with a cinematic champagne & obsidian design aesthetic.

---

## Project Structure

```
wedding-invitation/
├── index.html        ← Home — fullscreen hero, countdown, feature sections
├── story.html        ← Our Story — timeline layout with images
├── event.html        ← The Event — venue, schedule, dress code, map
├── gallery.html      ← Gallery — masonry grid with JS lightbox + filters
├── rsvp.html         ← RSVP — split layout form with full JS validation
├── contact.html      ← Contact — info, social links, contact form
├── css/
│   └── style.css     ← Full design system (2,000+ lines, CSS variables)
├── js/
│   └── script.js     ← All interactivity (nav, scroll, lightbox, countdown, RSVP)
├── images/           ← Add your own photos here (see below)
└── README.md
```

---

## Design System

**Color Palette**
| Token | Value | Usage |
|---|---|---|
| `--gold` | `#C9A84C` | Primary accent — borders, labels, icons |
| `--gold-light` | `#E8D5A3` | Soft gold — headers, eyebrows |
| `--gold-pale` | `#F5EDD6` | Background tints |
| `--obsidian` | `#0D0D0D` | Dark sections, hero overlays |
| `--warm-white` | `#FAF8F3` | Page background |
| `--champagne` | `#F2E8D5` | Card backgrounds |
| `--stone` | `#8A8070` | Body text, muted labels |

**Typography**
- `Great Vibes` — Script font for couple names & decorative elements
- `Cormorant Garamond` — Elegant serif for headings, quotes, card titles
- `Jost` — Clean geometric sans-serif for labels, nav, body copy

---

## Features

- **Fullscreen hero** with CSS Ken-Burns zoom animation & parallax scroll
- **Live countdown timer** counting to the wedding date
- **5-chapter story timeline** with alternating image/text layout
- **Event details** with schedule, venue cards, map placeholder, dress code swatches
- **Masonry gallery** with category filters and a full JS lightbox (keyboard accessible)
- **RSVP form** with real-time validation, radio buttons, and animated success screen
- **Contact form** with subject categories and send confirmation
- **Sticky navbar** with scroll-triggered glass effect
- **Mobile hamburger menu** with full-screen overlay
- **Scroll-reveal animations** via IntersectionObserver
- **Accessible** — semantic HTML5, ARIA labels, keyboard navigation

---

## Setup

No build tools required. Just open `index.html` in any modern browser.

### Customise for your wedding

1. **Names** — Find & replace `Isabella` / `Alexander` across all HTML files
2. **Date** — Update `September 20, 2025` in HTML and in `script.js` line ~30:
   ```js
   const weddingDate = new Date('2025-09-20T17:00:00');
   ```
3. **Venue** — Update venue name and address in `event.html` and `contact.html`
4. **Images** — Replace Unsplash URLs with your own photos. For production, download and host locally in the `/images/` folder.
5. **Email/phone** — Update contact details in `contact.html`
6. **Hashtag** — Update `#IsabellaAndAlexander` in `contact.html`

---

## Adding Real Images

Place your photos in `/images/` and update `src` attributes:
```html
<!-- Replace this: -->
<img src="https://images.unsplash.com/photo-xxx?w=900&q=80" ...>

<!-- With this: -->
<img src="images/your-photo.jpg" ...>
```

**Recommended sizes:**
- Hero: 1800×1200px
- Gallery: 600–800px wide (height varies)
- Timeline: 600×450px
- Page headers: 1600×900px

---

## Browser Support

Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).
Uses CSS Grid, Custom Properties, `IntersectionObserver`, and `column` layout.

---

## Credits

- Photography: [Unsplash](https://unsplash.com) (placeholder images)
- Fonts: [Google Fonts](https://fonts.google.com) — Great Vibes, Cormorant Garamond, Jost
- Built with pure HTML5, CSS3, and vanilla JavaScript

---

*With love — Isabella & Alexander, September 20, 2025*
