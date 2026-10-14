# Real Car Mileage

Static Astro site comparing ARAI claimed mileage with curated real-world city/highway mileage estimates for Indian cars and bikes, plus a fuel-efficiency calculator and trip cost planner.

## Commands

Run from the project root:

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Regenerate vehicle data, then start the dev server at `localhost:4321` |
| `npm run build` | Regenerate vehicle data, then build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | TypeScript/Astro type checking |
| `npm run generate:data` | Rebuild `src/data/all_vehicles.json` and `public/data/vehicles.json` from `scripts/build_vehicle_database.js` |

## Project structure

- `src/pages` — pages, including dynamically generated `/vehicles/[id]` detail pages
- `src/layouts` — shared HTML shell, navigation, theme toggle
- `src/data/vehicles.ts` — typed vehicle/fuel-price data helpers
- `src/styles/global.css` — Tailwind v4 entry point and theme tokens
- `scripts/build_vehicle_database.js` — source catalog and database generator
- `public` — favicons, manifest, and generated runtime vehicle data

## Notes

- Vehicle mileage is a catalogued estimate; real-world results vary by driving style, fuel quality, tyres, and climate use.
- Run `npm run generate:data` after editing the vehicle catalog in `scripts/build_vehicle_database.js`.