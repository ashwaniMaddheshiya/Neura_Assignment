# Product Dashboard (React + Redux Toolkit + TypeScript)

A production-ready product dashboard with a modern dark UI, responsive design, typed Redux state, debounced search/filter/sort, favorites, and comprehensive testing (unit + integration).

---

## Tech Stack

- React 19 + TypeScript  
- Redux Toolkit (slices, thunks, selectors)  
- React Router v7  
- Tailwind CSS (custom dark theme, gradients, glass effects)  
- Vitest + Testing Library (React, user-event, JSDOM)  

---

## Scripts

- `npm run dev` — Start Vite dev server  
- `npm run build` — Production build to `dist/`  
- `npm run preview` — Preview the production build  
- `npm run lint` — ESLint over the codebase  
- `npm run typecheck` — TypeScript `tsc --noEmit` type checking  
- `npm run check` — Full preflight: typecheck + lint + tests  
- `npm test` — Run all tests (Vitest, JSDOM)  
- `npm run test:ui` — Open Vitest UI runner  
- `npm run test:coverage` — Run tests with coverage report  

---

## Requirements

- Node.js ^20.19.0 or >=22.12.0  
- npm (comes with Node)  

---

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open: http://localhost:5173

---

## Build & Preview

Create a production build and preview it:

```bash
npm run build
npm run preview
```

---

## Tests

Run unit and integration tests, coverage, and preflight checks:

```bash
npm test
npm run test:ui
npm run test:coverage
npm run check
```

---

## API

Data is fetched from Fake Store API:

- GET `/products`  
- GET `/products/:id`  
- GET `/products/categories`  

https://fakestoreapi.com

---

## Project Structure

```text
src/
├─ assets/icons/           # central icon components
├─ components/             # UI components
├─ pages/                  # routed pages
├─ store/                  # Redux store, slices, selectors, typed hooks
├─ services/               # API client
├─ hooks/                  # custom hooks
├─ utils/                  # utilities (formatPrice)
├─ test/                   # Vitest setup
└─ types/                  # shared TypeScript types
```

---

## Features

- Product listing with responsive grid and smooth loading  
- Debounced search (500ms), category filter, price sort  
- Product detail with rating, description, and favorites toggle  
- Favorites page with clear-all and empty states  
- Dark theme with gradients, glass effects, and subtle animations  
- Accessibility: ARIA labels, focus states, semantic markup  

---

## Testing Coverage

- Unit tests for:
  - Redux slices (products, filters, favorites)
  - Selectors
  - Hooks (`useDebounce`)
  - UI components (`ProductCard`, `ErrorMessage`, `SearchBar`)
- Integration tests for:
  - Product listing search and filtering
  - Favorites flow
- Current coverage:
  - ~92% Statements  
  - ~90% Branches  
  - ~88% Functions  
  - ~92% Lines  

---

## Notes

- Icons are centralized in `src/assets/icons/index.tsx`  
- Use `npm run check` before pushing changes to ensure:
  - Type safety
  - Linting passes
  - All tests are green  
- Async thunk error flows and UI edge cases are fully tested  

