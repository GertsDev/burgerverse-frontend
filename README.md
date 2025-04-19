# 🍔 BurgerVerse - Space Builder Platform

BurgerVerse is a modern web application that allows users to create and customize their perfect space burger while exploring a unique cosmic dining experience.

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0.1-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.27.0-CA4245?style=flat&logo=react-router)](https://reactrouter.com/)
[![Express.js](https://img.shields.io/badge/Express.js-Server-000000?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

## 🚀 Live Demo and Backend

Live: [BurgerVerse](https://www.BurgerVerse.space) to try it out!
Backend repo: [BurgerVerse-backend](https://github.com/GertsDev/burgerverse-backend)

## ✨ Features

- 🍔 **Interactive Space Burger Builder**
- 🛒 **Order Management**: Place orders and track them in real-time
- 🔐 **User Authentication**: Register, login, forgot password, profile management
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌓 **Accessibility**: Built with a11y in mind

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: CSS Modules with SCSS
- **Testing**: Jest (unit tests) and Cypress (e2e tests)
- **Component Development**: Storybook
- **Build Tools**: Webpack, Babel
- **Code Quality**: ESLint, Prettier

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stellar-burger.git
cd stellar-burger

# Install dependencies
npm install

# Start the development server
npm start
```

## 🔧 Available Scripts

- `npm start` - Run the development server
- `npm run build` - Build for production
- `npm test` - Run Jest tests
- `npm run cypress:open` - Open Cypress for e2e testing
- `npm run storybook` - Run Storybook for component development
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📂 Project Structure

```
burgerverse/
├── src/
│   ├── components/
│   │   ├── app-header/
│   │   ├── burger-constructor/
│   │   ├── burger-constructor-element/
│   │   ├── burger-ingredient/
│   │   ├── burger-ingredients/
│   │   ├── feed-info/
│   │   ├── image-preloader/
│   │   ├── ingredient-details/
│   │   ├── ingredients-category/
│   │   ├── modal/
│   │   ├── modal-overlay/
│   │   ├── order-card/
│   │   ├── order-info/
│   │   ├── order-status/
│   │   ├── orders-list/
│   │   ├── page-wrapper/
│   │   ├── profile-menu/
│   │   ├── protected-route/
│   │   ├── ui/
│   │   └── app/
│   ├── images/
│   ├── pages/
│   │   ├── constructor-page/
│   │   ├── feed/
│   │   ├── forgot-password/
│   │   ├── login/
│   │   ├── not-fount-404/
│   │   ├── profile/
│   │   ├── profile-orders/
│   │   ├── register/
│   │   └── reset-password/
│   ├── services/
│   │   ├── slices/
│   │   │   ├── constructorSlice.ts
│   │   │   ├── feedsSlice.ts
│   │   │   ├── ingredients-slice.ts
│   │   │   ├── order-slice.ts
│   │   │   ├── userOrdersSlice.ts
│   │   │   └── userSlice.ts
│   │   ├── authActions.ts
│   │   ├── root-reducer.ts
│   │   └── store.ts
│   ├── stories/
│   │   ├── assets/
│   │   ├── BurgerConstructor.stories.ts
│   │   ├── BurgerConstructorElement.stories.ts
│   │   ├── BurgerIngredient.stories.tsx
│   │   ├── Configure.mdx
│   │   ├── FeedInfo.stories.ts
│   │   ├── Header.stories.ts
│   │   ├── IngredientDetails.stories.ts
│   │   ├── OrderCard.stories.ts
│   │   ├── OrderDetails.stories.tsx
│   │   ├── OrderInfo.stories.ts
│   │   ├── OrderStatus.stories.tsx
│   │   ├── Preloader.stories.ts
│   │   └── ProfileMenu.stories.ts
│   ├── utils/
│   │   ├── api/
│   │   │   ├── auth-api.ts
│   │   │   ├── helpers.ts
│   │   │   ├── ingredients-api.ts
│   │   │   └── orders-api.ts
│   │   ├── cookie.ts
│   │   ├── jest-utils.ts
│   │   └── types.ts
│   ├── __tests__/
│   │   ├── __fixtures__/
│   │   └── reducers/
│   ├── styles.d.ts
│   ├── index.css
│   └── index.tsx
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── .storybook/
│   ├── main.ts
│   ├── preview.tsx
│   └── storybook-config-entry.js
├── cypress/
│   ├── e2e/
│   │   └── constructor.cy.tsx
│   ├── fixtures/
│   ├── support/
│   ├── utils/
│   └── tsconfig.json
```

## 📚 Component Architecture

We follow the Container/Presentational pattern:

- **Container Components**: Handle logic and data
- **Presentational Components**: Pure rendering with props

Example:

```typescript
// Container Component (app-header.tsx)
const AppHeader: FC = () => {
  const { user } = useSelector(getUserState);
  return <AppHeaderUI userName={user.name} />;
};

// Presentational Component (ui/app-header.tsx)
const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header>...</header>
);
```

## 🔒 Authentication & API Integration

The application uses JWT-based authentication with access and refresh tokens. All endpoints return JSON. CORS is enabled for `http://localhost:3000`.

### Backend API Overview

| Endpoint                | Method | Auth Required | Description               |
| ----------------------- | ------ | ------------- | ------------------------- |
| `/auth/register`        | POST   | No            | Register new user         |
| `/auth/login`           | POST   | No            | Login user                |
| `/auth/logout`          | POST   | Yes           | Logout user               |
| `/auth/user`            | GET    | Yes           | Get current user info     |
| `/auth/user`            | PATCH  | Yes           | Update user info          |
| `/password-reset`       | POST   | No            | Request password reset    |
| `/password-reset/reset` | POST   | No            | Reset password with token |
| `/auth/token`           | POST   | No            | Refresh access token      |

**Authentication Flow:**

- On login/register, backend returns:
  - `accessToken` (JWT, short-lived, sent in `Authorization` header)
  - `refreshToken` (long-lived, stored in localStorage)
- Use `accessToken` for authenticated requests.
- If `accessToken` expires, use `refreshToken` to get a new one (`/auth/token`).
- The frontend stores `accessToken` in cookies for requests.
- `refreshToken` is stored in localStorage.

**Error responses:** `{ success: false, message: "Error message" }`

**Request/Response Example:**
See `src/services/api/auth-api.ts` for expected payloads.

## 🧑‍💻 Backend Structure (for reference)

```
backend/
└── src/
    ├── index.ts
    ├── db.ts
    ├── config/
    │   └── auth.ts
    ├── initialData/
    │   ├── seed.ts
    │   ├── seedIngredients.ts
    │   └── ingredientsData.ts
    ├── middleware/
    │   └── authMiddleware.ts
    ├── models/
    │   ├── Counter.ts
    │   ├── Order.ts
    │   ├── Ingredient.ts
    │   └── User.ts
    └── routes/
        ├── ingredients.ts
        ├── orders.ts
        └── auth.ts
```

## 🎨 UI/UX

The UI is designed according to a Figma mockup, providing a cosmic-themed user experience with smooth transitions and responsive layouts. The styling is implemented using CSS Modules with SCSS preprocessor for modular and maintainable styles.

## 🧪 Testing

- **Unit Tests**: Component testing with Jest
- **End-to-End Tests**: Application flow testing with Cypress
- **Storybook**: Visual testing of UI components

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌐 Live Demo

Visit the live application at [www.stellarburger.com](https://www.stellarburger.com)

## 🔗 Links

- [Design in Figma](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)
