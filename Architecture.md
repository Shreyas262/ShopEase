# ShopEase — Project Architecture

> **Version:** 3.0  
> **Purpose:** Define the baseline architecture for the ShopEase modernization phase, including TypeScript, SCSS, Redux Toolkit, RTK Query, coding standards, and development workflow.

---

# 1. Project Context

ShopEase is an existing React 19 e-commerce portfolio application.

This document updates the previous architecture rather than replacing the project architecture from scratch.

The migration is progressive:

```text
JavaScript
    ↓
TypeScript
    ↓
CSS
    ↓
SCSS
    ↓
TanStack Query
    ↓
Redux Toolkit + RTK Query
```

Existing functionality and established architectural decisions must remain intact unless a migration explicitly requires a change.

---

# 2. Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- React Redux
- RTK Query
- Axios where appropriate

## Styling

- SCSS
- CSS Variables / SCSS design tokens where appropriate
- Mobile-first responsive design
- **No Tailwind CSS**

## API

- DummyJSON API for development
- API abstraction retained so the backend can later be replaced

## Future Backend

- Node.js
- Express
- PostgreSQL
- JWT Authentication

---

# 3. Migration Roadmap

The modernization phase follows this order:

```text
Phase A
TypeScript Migration
        ↓
Phase B
SCSS Migration
        ↓
Phase C
Advanced Redux Toolkit + RTK Query
```

The migrations are progressive. Do not perform a mechanical whole-project conversion without considering type boundaries, state ownership, API contracts, and component responsibilities.

---

# 4. Phase A — TypeScript Migration

## Goals

The TypeScript migration must establish a strict, maintainable type system for the existing application.

Learn and apply:

- TypeScript fundamentals in the real project
- Component props
- State
- Events
- Forms
- Redux
- Selectors
- Dispatch
- Async logic
- API response types
- Generic types
- Utility types
- Type narrowing
- Discriminated unions where useful
- React Router typing
- Reusable component typing
- Custom hook typing
- Avoiding `any`

## Migration Order

```text
TypeScript configuration
        ↓
Domain/data models
        ↓
API layer
        ↓
Redux store and slices
        ↓
Shared components
        ↓
Hooks
        ↓
Routes/pages
        ↓
Utilities
        ↓
Strict TypeScript cleanup
        ↓
Remove remaining JavaScript
```

Do not rename every file first and then repair types afterward.

## Type Domains

The application should establish reusable types for at least:

- Product
- Product query/filter parameters
- User
- Address
- Cart item
- Wishlist item
- Order
- Order item
- Payment method
- Order status
- API responses

Types should represent actual application contracts rather than merely mirror individual component needs.

## TypeScript Rules

- Prefer strict TypeScript configuration.
- Avoid `any`.
- Prefer `unknown` when data is genuinely unknown.
- Narrow external data before use.
- Do not solve typing problems with unnecessary type assertions.
- Keep domain types reusable.
- Use generics when they improve type safety or reuse.
- Use utility types where they express intent clearly.
- Use discriminated unions for genuinely variant states.
- Do not create excessive types for trivial local values.

---

# 5. Phase B — SCSS Migration

The existing CSS architecture remains the conceptual baseline.

Each component continues to own its styles:

```text
ProductCard/
├── ProductCard.tsx
└── ProductCard.scss
```

Page-specific styles remain inside the page folder.

## SCSS Goals

Learn and use:

- `.scss`
- Variables
- Nesting
- Parent selector `&`
- Mixins
- Functions where useful
- Partials
- `@use`
- `@forward`
- Design tokens
- Responsive breakpoints
- Reusable styling patterns
- SCSS modules where appropriate

## SCSS Organization

A suitable shared structure is:

```text
src/
└── styles/
    ├── _variables.scss
    ├── _breakpoints.scss
    ├── _mixins.scss
    ├── _functions.scss
    ├── _tokens.scss
    ├── reset.scss
    └── global.scss
```

Component styles remain local:

```text
components/
└── ProductCard/
    ├── ProductCard.tsx
    └── ProductCard.scss
```

Shared styles should not become a dumping ground.

## SCSS Rules

- Prefer `@use` and `@forward`.
- Avoid deprecated `@import`.
- Avoid excessive nesting.
- Keep nesting shallow and readable.
- Use design tokens instead of repeated hardcoded values.
- Preserve the existing visual design during migration.
- Keep responsive behavior mobile-first.
- Do not introduce Tailwind.

---

# 6. Responsive Design

The existing mobile-first approach remains authoritative.

| Device | Width |
|---|---:|
| Small Mobile | 0–479px |
| Large Mobile | 480–767px |
| Tablet | 768–1023px |
| Desktop | 1024–1439px |
| Large Desktop | 1440px+ |

Preferred structure:

```scss
/* Mobile base */

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1440px) {
  /* Large Desktop */
}
```

Container baseline:

```scss
.container {
  width: min(1400px, 92%);
  margin: 0 auto;
}
```

---

# 7. Phase C — Redux Toolkit + RTK Query

The existing separation between client state and server state remains conceptually important.

The architecture changes from:

```text
Redux Toolkit
    └── Client state

TanStack Query
    └── Server state
```

to:

```text
Redux Toolkit
├── Client state
│   ├── Cart
│   ├── Wishlist
│   ├── Authentication
│   └── Global UI state
│
└── RTK Query
    └── Server state
```

## Redux Client State

Redux slices remain responsible for client-owned state such as:

- Cart
- Wishlist
- Authentication
- Global UI state where required

Do not put ordinary server responses into normal slices when RTK Query is the appropriate owner.

## RTK Query

RTK Query becomes the primary server-state/data-fetching architecture.

Learn and use:

- `createApi`
- `fetchBaseQuery`
- Custom `baseQuery` where appropriate
- Axios/custom base queries where justified
- Query endpoints
- Mutation endpoints
- Generated hooks
- Query caching
- Cache lifetimes
- Tags
- Cache invalidation
- Optimistic updates
- Conditional fetching
- `skip`
- Lazy queries
- Polling
- `selectFromResult`
- Endpoint lifecycle behavior
- Authentication headers
- Error handling
- RTK middleware
- Advanced selectors

The migration must not be treated as:

```text
useQuery()
        ↓
useGetProductsQuery()
```

The purpose is to understand the underlying RTK Query architecture.

---

# 8. RTK Query API Architecture

The API layer should have a clear ownership boundary.

Conceptually:

```text
src/
├── api/
│   ├── baseApi.ts
│   ├── products.ts
│   ├── auth.ts
│   └── ...
│
└── app-store/
    ├── store.ts
    ├── slices/
    └── middleware/
```

A single base API can provide the common RTK Query infrastructure, while feature-specific endpoint modules extend that API.

The exact split should follow the existing implementation once the source tree is inspected.

---

# 9. Server State vs Client State

Use this decision model:

## Client State

Use Redux slices when the application owns the state:

- Cart contents
- Wishlist contents
- Authentication/session state
- UI state that genuinely needs global access

## Server State

Use RTK Query for remote data:

- Products
- Product details
- Search results
- Future reviews
- Future backend orders
- Other API-backed resources

## Local Component State

Use component state for ephemeral UI concerns:

- Modal visibility
- Selected image
- Form input state where appropriate
- Temporary UI interaction state

Avoid promoting local state to Redux without a clear ownership reason.

## Persistence

LocalStorage remains valid for the current portfolio application's persisted local data.

The future backend migration can replace appropriate local persistence later.

---

# 10. Authentication and API Integration

The current authentication implementation is a portfolio/demo implementation.

The migration should preserve current behavior while preparing the architecture for future:

```text
JWT
    ↓
API authentication
    ↓
Authorization
```

RTK Query should provide a clear place for authentication headers and future token refresh behavior.

Do not introduce a production authentication system merely as part of the TypeScript or RTK Query migration.

---

# 11. Existing Domain Features

The following functionality must remain intact during migration.

## Cart

- `items`
- `addToCart`
- `removeFromCart`
- `increaseQuantity`
- `decreaseQuantity`
- `clearCart`

Cart items contain product information and quantity.

## Wishlist

- `items`
- Add/remove behavior
- Local persistence

## Authentication

- Login
- Register
- Protected routes
- Profile
- Address management
- Password management

## Orders

Orders currently use localStorage and are keyed by `userId`.

Existing concepts include:

- `loadOrders()`
- `saveOrders()`
- `addOrder()`
- `createOrder()`
- `calculateOrderTotals()`

Do not move localStorage-based orders to RTK Query until a real server-backed order API exists.

---

# 12. Product Architecture

Products are currently provided by DummyJSON.

Existing functionality includes:

- Product listing
- Product details
- Search
- Global navbar search
- URL search parameters
- Category filtering
- Sorting
- Pagination

Current flow:

```text
Navbar Search
      ↓
URL search parameter
      ↓
Products page
      ↓
Filtering
```

This behavior must remain unchanged during migration.

Eventually:

```text
React component
      ↓
RTK Query generated hook
      ↓
API slice
      ↓
DummyJSON / future backend
```

---

# 13. Component Architecture

Components should retain single responsibility.

Prefer reusable components for repeated UI:

- Button
- Card
- Modal
- ProductCard
- EmptyState
- SectionTitle
- Loaders
- Search components

Avoid large page components.

TypeScript should improve component contracts rather than make components more complex.

---

# 14. Folder Structure

The existing architecture remains the baseline.

The modernization should evolve it rather than replace it.

A TypeScript/SCSS-oriented target is:

```text
src/
│
├── api/
│   ├── apiClient.ts
│   ├── baseApi.ts
│   ├── auth.ts
│   └── products.ts
│
├── assets/
│
├── app-store/
│   ├── store.ts
│   ├── slices/
│   └── middleware/
│
├── components/
│   ├── checkout/
│   ├── orders/
│   ├── product/
│   ├── profile/
│   ├── search/
│   ├── skeletons/
│   └── ...
│
├── features/
│   ├── auth/
│   ├── cart/
│   └── wishlist/
│
├── hooks/
│
├── layouts/
│
├── pages/
│   ├── auth/
│   ├── checkout/
│   ├── orders/
│   ├── products/
│   ├── profile/
│   └── ...
│
├── routes/
│
├── styles/
│   ├── _variables.scss
│   ├── _breakpoints.scss
│   ├── _mixins.scss
│   ├── _functions.scss
│   ├── _tokens.scss
│   ├── reset.scss
│   └── global.scss
│
├── types/
│   ├── product.ts
│   ├── user.ts
│   ├── address.ts
│   ├── cart.ts
│   ├── wishlist.ts
│   └── order.ts
│
└── utils/
```

This is a target structure, not a requirement to move every existing file immediately.

---

# 15. Naming Conventions

## Components

PascalCase:

```text
ProductCard.tsx
CartSummary.tsx
```

## Functions and variables

camelCase:

```text
selectedImage
productDetails
handleAddToCart()
handleWishlistToggle()
```

## Redux actions

Verb-first:

```text
addToCart
removeFromWishlist
clearCart
loginUser
logoutUser
```

## Types

Use descriptive PascalCase names:

```text
Product
CartItem
Order
PaymentMethod
```

Avoid redundant names such as `IProduct` unless an established convention specifically requires it.

---

# 16. Utility Rules

Utilities must remain:

- Framework-independent
- Reusable
- Deterministic where possible
- Free from React state management
- Free from JSX
- Free from DOM manipulation unless the utility is explicitly DOM-specific

Utilities should accept input and return output.

Data fetching belongs in the API layer, not generic utilities.

---

# 17. Performance

Maintain the existing performance principles:

- Lazy-load pages.
- Split large components.
- Memoize genuinely expensive calculations.
- Use RTK Query caching for server state.
- Avoid unnecessary Redux state.
- Avoid unnecessary re-renders.
- Use `selectFromResult` where it provides meaningful subscription optimization.

Do not add memoization speculatively.

---

# 18. Loading, Error, and Empty States

The existing Definition of Done remains applicable.

Features should account for:

- Loading state
- Error state
- Empty state
- Accessible interaction
- Responsive behavior
- Hover/focus states

Existing skeleton components should continue to be used for asynchronous remote data.

---

# 19. SEO and Notifications

Existing SEO architecture must remain intact during migration.

Current abstraction:

```text
components/seo/SEO
hooks/useSEO
constants/seo
```

Toast behavior also remains intact.

Existing toast utility concepts:

```text
showSuccess()
showError()
showInfo()
showWarning()
```

Migration should preserve these behaviors.

---

# 20. Development Workflow

```text
Feature Branch
      ↓
Develop
      ↓
Validate
      ↓
Main
```

Commit convention:

```text
feat: add wishlist page
fix: cart quantity bug
refactor: split home sections
style: update product card spacing
docs: improve architecture guide
```

---

# 21. Migration Rules

1. Do not restart the project.
2. Do not redesign the architecture from scratch.
3. Preserve existing functionality.
4. Inspect existing implementation before making migration decisions.
5. Prefer incremental migrations.
6. Do not introduce Tailwind CSS.
7. Avoid mechanical type conversion.
8. Avoid unnecessary architectural churn.
9. Explain important architectural decisions when they matter.
10. When a complete file is requested, provide the complete file.
11. When guidance is requested, explain the concept step by step.
12. Do not over-explain basic React concepts.
13. Keep server state and client state ownership explicit.
14. Do not move localStorage-only orders into RTK Query without a server API.
15. Do not introduce technologies outside the migration scope without a concrete reason.

---

# 22. Definition of Done

A migrated feature is complete when:

- Functionality still works
- TypeScript types are meaningful
- No unnecessary `any`
- Mobile responsive
- Tablet responsive
- Desktop responsive
- Accessible
- Loading state works
- Error state works
- Empty state works
- Hover/focus states work
- No console errors
- No unused code
- Naming conventions are followed
- Existing architecture is respected
- Migration-specific behavior is understood
- Code is maintainable and production-oriented

---

# 23. Current Migration Status

## Phase A — TypeScript

- [ ] Configure TypeScript
- [ ] Establish domain models
- [ ] Type API layer
- [ ] Type Redux store
- [ ] Type Redux slices
- [ ] Type selectors
- [ ] Type hooks
- [ ] Type reusable components
- [ ] Type forms/events
- [ ] Type pages/routes
- [ ] Type utilities
- [ ] Enable strict configuration
- [ ] Remove remaining JavaScript

## Phase B — SCSS

- [ ] Configure SCSS
- [ ] Establish design tokens
- [ ] Establish partials
- [ ] Establish `@use` / `@forward`
- [ ] Establish mixins/functions where useful
- [ ] Migrate global styles
- [ ] Migrate component styles
- [ ] Migrate page styles
- [ ] Migrate skeleton/modal/navbar styles
- [ ] Remove obsolete CSS

## Phase C — Redux Toolkit + RTK Query

- [ ] Understand RTK Query architecture
- [ ] Create base API
- [ ] Configure RTK Query middleware
- [ ] Create query endpoints
- [ ] Create mutation endpoints
- [ ] Configure tags
- [ ] Configure invalidation
- [ ] Learn cache lifetimes
- [ ] Conditional queries
- [ ] Lazy queries
- [ ] Polling where appropriate
- [ ] `selectFromResult`
- [ ] Optimistic updates where appropriate
- [ ] Endpoint lifecycle behavior
- [ ] Authentication integration
- [ ] Error handling
- [ ] Advanced selectors
- [ ] Remove TanStack Query

---

# 24. Target Architecture

The final target is:

```text
React 19
│
├── TypeScript
│
├── Redux Toolkit
│   ├── Client State
│   │   ├── Cart
│   │   ├── Wishlist
│   │   ├── Authentication
│   │   └── Global UI
│   │
│   └── RTK Query
│       └── Server State
│
├── React Router
│
├── API Layer
│   └── DummyJSON / Future Backend
│
└── SCSS
    ├── Design Tokens
    ├── Global Styles
    ├── Shared Styles
    └── Component Styles
```

The target is modernization of the existing ShopEase application, not a new application.
