# Mobile UI Architecture Guide

## Overview

This guide summarizes the current front-end architecture, CSS system, and best practices for preparing and implementing mobile UI features in the project. It is designed to help developers quickly understand the structure and make informed decisions for scalable, maintainable mobile UI development.

---

## 1. Component & CSS Architecture

### Component Structure

- **Pages:**

  - Located in `/src/pages/[feature]/index.tsx` (or similar).
  - Serve as route entry points.
  - Typically minimal, just import and render a component (container or UI), but may contain some logic for simple cases.

- **Components (Container/Smart):**

  - Located in `/src/components/[feature]/[feature].tsx` (or similar).
  - Handle data fetching, state management, and business logic.
  - Pass all necessary data and event handlers as props to UI components.
  - Sometimes called “container” or “smart” components.

- **UI/Presentational Components:**

  - Located in `/src/components/ui/[feature]/[feature].tsx`.
  - Focused solely on rendering the UI.
  - Receive all data and handlers via props.
  - Contain no business logic or data fetching.
  - Highly reusable and easy to test.

- **Feature-based folders:**

  - Each UI feature (e.g., burger-constructor, modal, order-card) is in its own directory under `src/components` and `src/pages` as appropriate.

- **Re-exports:**

  - Each folder typically has an `index.ts` for clean imports.

- **Data & Props Flow:**

  - The Page component renders a Component (container/smart), which manages logic and passes data/handlers to the UI component for rendering.

- **Benefits:**
  - This pattern ensures a clear separation of concerns, improves maintainability, testability, and reusability of UI components.

### CSS System

- **CSS Modules:** Styles are defined in `*.module.css` files, imported directly into components. This ensures local scoping and prevents global style conflicts.
- **No Utility Frameworks:** No TailwindCSS, Shadcn, or CSS-in-JS detected. Styling is handled via CSS Modules.
- **Import Pattern:** Styles are imported at the top of each component file (e.g., `import styles from './app.module.css'`).

### UI/Container Segregation

- **UI Components:** Focused on rendering and style, reusable across the app.
- **Containers:** Not explicitly separated, but higher-level components (like `app.tsx`) may act as containers for logic and data fetching.

---

## 2. Pages Architecture

- **Thin Pages:** Each route (e.g., `/profile`, `/register`) is a folder in `src/pages` with a main `*.tsx` file and an `index.ts` for re-exports.
- **Composition:** Pages primarily compose components from `src/components`, keeping logic minimal and focused on layout.
- **No Page-level CSS:** All styling is handled at the component level, not in pages.
- **Routing:** Follows standard React/Next.js conventions for code splitting and maintainability.

---

## 3. Best Practices for Mobile UI Implementation

### Preparation

- **Audit Components:** Identify which components need mobile-specific styles or responsive behavior.
- **Leverage CSS Modules:** Add mobile styles in the same `*.module.css` files using media queries.
- **Atomic Design:** Expand the `ui/` directory with more atomic components if needed (e.g., mobile buttons, inputs).
- **Accessibility:** Ensure all interactive elements are accessible (tabindex, aria-labels, keyboard handlers).

### Implementation

- **Responsive CSS:** Use media queries in CSS Modules for breakpoints (e.g., `@media (max-width: 600px) { ... }`).
- **Mobile-first:** Consider a mobile-first approach for new styles.
- **Touch Targets:** Ensure buttons and interactive elements are large enough for touch.
- **Test on Devices:** Regularly test UI on real devices and emulators.
- **Performance:** Optimize images and assets for mobile.

### Example: Adding Mobile Styles to a Component

```css
/* burger-constructor.module.css */
.root {
  /* desktop styles */
}

@media (max-width: 600px) {
  .root {
    /* mobile styles */
    flex-direction: column;
    padding: 8px;
  }
}
```

---

## 4. Recommendations & Next Steps

- **Document Patterns:** Keep this guide updated as new patterns emerge.
- **Design System:** Consider formalizing a design system if mobile UI grows in complexity.
- **Utility Classes:** If utility-first CSS is desired, evaluate TailwindCSS or similar frameworks.
- **Explicit Containers:** For complex logic, introduce explicit container components.

---

## 5. Summary

- The project uses a modern, scalable architecture with CSS Modules and feature-based components.
- Mobile UI can be implemented cleanly by extending existing CSS Modules and following responsive design best practices.
- Maintain separation of concerns, accessibility, and test thoroughly on mobile devices.

---

_This guide is intended to help developers prepare for and implement mobile UI features efficiently and consistently across the codebase._
