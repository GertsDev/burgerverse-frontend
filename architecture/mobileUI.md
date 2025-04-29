# Mobile UI Architecture Guide

## Overview

This guide summarizes the current front-end architecture, CSS system, and best practices for implementing mobile UI features in the project. It aims to help developers understand the structure and apply responsive design principles consistently.

---

## 1. Component & CSS Architecture

### Component Structure

- **Feature-based Components:** Major UI features (e.g., `burger-constructor`, `order-card`, `feed-info`) reside in their respective directories under `src/components`. Each folder contains the component logic, styles, and potentially related sub-components.
- **Shared UI Components:** General-purpose, reusable presentational components (e.g., `modal`, `preloader`, `modal-overlay`) are located in `src/shared/ui`. These components are designed to be stateless and receive data/handlers via props.
- **Component Focus:** Components generally follow a presentational or container pattern. Feature components in `src/components` might contain more logic and state management, acting as containers, while components in `src/shared/ui` are primarily presentational.
- **Re-exports:** Each component and page directory typically uses an `index.ts` file for cleaner imports across the application.

### CSS System

- **CSS Modules:** Styling is primarily handled using CSS Modules (`*.module.css`). Styles are scoped locally to the component by importing the module (e.g., `import styles from './component.module.css';`). This prevents global style conflicts.
- **No Utility Frameworks:** The project does not currently use utility-first CSS frameworks like TailwindCSS or CSS-in-JS libraries like Styled Components.
- **Global Styles:** Minimal global styles might exist, but component-specific styling should be prioritized within CSS Modules.

### UI/Container Logic Separation

- **Presentational Components (`src/shared/ui`):** Focus on rendering the UI based on props. They are reusable and unaware of application state or data fetching logic.
- **Feature/Container Components (`src/components`, `src/pages`):** Responsible for state management, data fetching (via hooks/services), handling user interactions, and composing presentational components.

---

## 2. Pages Architecture

- **Page Structure:** Each page corresponding to a route (e.g., `/`, `/login`, `/feed`, `/profile`) is located within its own directory in `src/pages`.
- **Composition:** Page components primarily orchestrate the layout by composing feature components from `src/components` and shared UI components from `src/shared/ui`. They typically handle page-level state or data fetching needed for the components they render.
- **Page-level CSS:** While most styling resides within components, some shared page layout styles might exist (e.g., `src/pages/common.module.css`). However, styling specific to page content should be encapsulated within the respective components.

---

## 3. Best Practices for Mobile UI Implementation

### Preparation

- **Component Audit:** Identify components in `src/components` and `src/shared/ui` that require responsive adjustments for mobile screens.
- **Design Review:** Ensure mobile designs are available and cover various screen sizes and interactions.
- **Accessibility:** Plan for accessibility from the start (touch targets, ARIA attributes, keyboard navigation).

### Implementation

- **Responsive CSS with Media Queries:** Use media queries within the existing `*.module.css` files to apply mobile-specific styles. Define consistent breakpoints.

  ```css
  /* Example: some-component.module.css */
  .container {
    /* Default (Desktop) styles */
    display: flex;
    padding: 20px;
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      padding: 10px;
    }
    /* Add other mobile-specific overrides */
  }
  ```

- **Mobile-First vs. Desktop-First:** Decide on an approach (mobile-first is often recommended for new development, but adapting existing desktop styles might be pragmatic). Apply chosen approach consistently.
- **Conditional Rendering:** For significant layout changes or mobile-specific components, use hooks (like a `useMediaQuery` hook) to conditionally render different JSX structures.
- **Touch Interactions:** Ensure interactive elements have adequate `padding` for touch targets. Test touch events thoroughly.
- **Performance:** Optimize images, fonts, and JavaScript bundles for faster loading on mobile networks. Consider code splitting.
- **Testing:** Test rigorously on various physical devices and emulators, covering different screen sizes, orientations, and platforms (iOS, Android).

---

## 4. Recommendations & Next Steps

- **Establish Breakpoints:** Define and document a set of standard breakpoints to be used consistently across all CSS Modules.
- **Develop `useMediaQuery` Hook:** Create a reusable hook to easily check for screen size conditions in component logic if needed for conditional rendering.
- **Refine Shared Styles:** Review `common.module.css` in `src/pages` and ensure its rules are necessary and well-defined. Move styles to components if applicable.
- **Continuous Testing:** Integrate mobile UI testing into the development workflow.

---

## 5. Summary

- The project architecture uses feature-based components (`src/components`), shared UI elements (`src/shared/ui`), and CSS Modules for styling.
- Implement mobile responsiveness by adding media queries to existing CSS Modules.
- Prioritize accessibility, performance, and thorough testing on mobile devices.
- Follow consistent patterns for breakpoints and conditional rendering.

---

_This guide should be kept updated as the mobile UI implementation progresses and patterns evolve._
