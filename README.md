
# Emergence: Out of the Shadows - Digital Exhibit

A digital exhibit showcasing the acclaimed documentary "Emergence: Out of the Shadows" by the South Asian Canadian Digital Archive (SACDA).

## About the Film

**Emergence: Out of the Shadows** is a powerful documentary exploring the journeys of three South Asian LGBTQ+ individuals as they navigate identity, family, and belonging. The film has won 7 awards across 51 international film festivals.

## About This Project

This web exhibit provides:

- Interactive film synopsis in multiple languages
- Cast and crew profiles with video interviews
- Award-winning festival recognitions
- Embedded trailers and full film viewing
- Smooth scroll-based animations
- Responsive design for all devices

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.20.0 or higher)

### Installation

Install dependencies (always use `pnpm`):

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173/`

### Building

Build for production:

```bash
pnpm build
```

### Preview Production Build

Preview the production build:

```bash
pnpm preview
```

The app will be available at `http://localhost:4173/exhibits/emergence`

> **Important:** Always use `pnpm` for package management.

## Project Structure

```
.
├── src/
│   ├── lib/
│   │   ├── assets/            # Imported assets (processed by Vite)
│   │   ├── components/        # Svelte components
│   │   ├── content/           # JSON data files (cast, synopsis, etc.)
│   │   ├── hooks/             # Custom hooks (mobile detection)
│   │   ├── icons/             # Icon components
│   │   └── utils.ts           # Utility functions
│   ├── routes/
│   │   ├── +layout.svelte     # Root layout
│   │   ├── +layout.ts         # Layout configuration (prerender)
│   │   └── +page.svelte       # Home page
│   ├── app.css                # Global styles (Tailwind)
│   └── app.html               # HTML template
├── static/                    # Static assets (served as-is)
│   ├── crew/                  # Cast & crew photos
│   ├── stills/                # Movie stills
│   ├── favicon-32x32.png
│   ├── logo.png
│   └── poster.webp
└── svelte.config.js           # SvelteKit configuration
```

## Tech Stack

- **Framework**: SvelteKit (Svelte 5 with runes)
- **Styling**: Tailwind CSS 4 with design tokens
- **Animations**: GSAP (ScrollTrigger, ScrollToPlugin)
- **UI Components**: shadcn-svelte
- **TypeScript**: Full type safety
- **Package Manager**: pnpm

## Deployment

After running `pnpm build`, the static files will be in the `build/` directory. These can be deployed to any static hosting service.

## Development Tools

```bash
# Type checking
pnpm check

# Type checking with watch mode
pnpm check:watch

# Format code
pnpm format

# Lint code
pnpm lint
```

## License

This project is part of the South Asian Canadian Digital Archive (SACDA).

## Acknowledgments

- **Film**: "Emergence: Out of the Shadows" by Vinay Giridhar
- **Production**: Sher Films (A Division of the Sher Vancouver LGBTQ Friends Society)
- **Digital Exhibit**: South Asian Canadian Digital Archive (SACDA)
- **Featured Stories**: Alex Sangha, Kayden Bhangu, Jag Nagra, and their families

