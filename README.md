# Coral Shop

Storefront built with React, React Router, Tailwind CSS, and Vite.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Architecture

```text
src/
├── app/       # Application setup, providers, routes, and layouts
├── pages/     # Route-level composition
├── features/  # Domain behavior such as products and cart
├── shared/    # Domain-independent reusable components
├── main.jsx   # Browser entry point
└── index.css  # Global styles
```

Dependencies flow in one direction:

```text
app → pages → features → shared
```

- `app` may compose any lower layer.
- `pages` integrate features into route-level screens.
- A feature must not import another feature directly. Cross-feature behavior is
  composed by a page or the application shell.
- `shared` must not depend on application domains or pages.
- Page-specific components stay next to their page.

The products endpoint defaults to Fake Store API. It can be replaced through:

```env
VITE_PRODUCTS_API_URL=https://example.com/products
```
