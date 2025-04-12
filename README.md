# 🍔 BurgerVerse - Space Builder Platform

BurgerVerse is a modern web application that allows users to create and customize their perfect space burger while exploring a unique cosmic dining experience.

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0.1-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.27.0-CA4245?style=flat&logo=react-router)](https://reactrouter.com/)
[![Express.js](https://img.shields.io/badge/Express.js-Server-000000?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

## 🚀 Live Demo

Visit [BurgerVerse](https://www.BurgerVerse.space) to try it out!

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
├── 📁 src/
│ ├── components/
│ │ ├── app-header/ # Container components
│ │ └── ui/ # Presentational components
│ ├── pages/ # Route pages
│ ├── services/
│ │ ├── slices/ # Redux slices
│ │ └── selectors/ # Redux selectors
│ ├── utils/
│ │ └── types/ # TypeScript types
│ └── styles/ # Global styles
├── 📁 public/ # Static assets
├── 📁 .storybook/ # Storybook configuration
└── 📁 cypress/ # E2E tests


src/
├── components/     # UI components
├── pages/          # Application pages
├── services/       # Redux store, slices, and actions
├── utils/          # Utility functions and API calls
├── images/         # Static images
├── stories/        # Storybook stories
├── __tests__/      # Test files
└── index.tsx       # Application entry point
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

## 🔒 Authentication

The application implements a JWT-based authentication flow with access and refresh tokens. Protected routes require authentication, and the app handles token refreshing seamlessly.

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
