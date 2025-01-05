# KudoSpot Frontend

## Overview
KudoSpot is a modern employee recognition platform that allows team members to celebrate achievements and show appreciation through digital kudos. The frontend is built with React and Material-UI, providing a responsive and intuitive user interface.

## Features

### 1. Authentication
- Secure login and registration system
- JWT-based authentication
- Protected routes for authenticated users
- Persistent session management

### 2. Kudos Wall
- Real-time kudos feed
- Like and interact with kudos
- Filter kudos by category
- Search functionality for messages and users
- Modern card-based layout with animations

### 3. Profile Management
- Customizable user profiles
- Achievement badges system
- Experience level progression
- Statistics and analytics
- Profile picture customization

### 4. Leaderboard
- Real-time rankings
- Multiple ranking categories
- Weekly and monthly statistics
- Achievement showcases

### 5. Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions
- Cross-browser compatibility

## Technology Stack

- **React**: Frontend framework
- **Material-UI**: UI component library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Context API**: State management
- **JWT**: Authentication
- **ESLint**: Code quality
- **Prettier**: Code formatting

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── auth/
│   │   ├── kudos/
│   │   └── profile/
│   ├── context/
│   ├── theme/
│   ├── utils/
│   ├── App.js
│   └── index.js
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manjeet13804/kudospot.git
cd kudospot/client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run lint`: Runs ESLint
- `npm run format`: Formats code with Prettier

## Development Guidelines

### Code Style
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names
- Add JSDoc comments for complex functions

### State Management
- Use Context API for global state
- Implement local state with useState
- Utilize useReducer for complex state logic
- Follow immutable state patterns

### Component Structure
- Create reusable components
- Implement proper prop validation
- Use composition over inheritance
- Follow single responsibility principle

## Security

- Implement JWT token refresh mechanism
- Sanitize user inputs
- Use HTTPS in production
- Implement rate limiting
- Follow security best practices

## Performance

- Implement lazy loading for routes
- Use proper image optimization
- Minimize bundle size
- Implement proper caching strategies
- Use React.memo for expensive components

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
