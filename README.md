# Ryde 🚗

**Ryde** is a mobile ride-hailing app built with **React Native** and **Expo**, designed to provide a seamless Uber-like experience. With real-time driver tracking, secure payments, and easy ride management, Ryde simplifies getting from one place to another.

## Features

- **Authentication**: Sign in or sign up with your email and password, or use Google login for quick access.
- **Search for a Place**: Easily find your pickup and drop-off locations using the integrated search functionality.
- **Real-time Driver Availability**: See nearby drivers in real time and select the one that suits you.
- **Book a Ride**: Confirm your pickup and destination to book a ride instantly.
- **Payment Integration**: Pay securely using **Stripe** for a smooth transaction process.
- **Ride History**: View all your previous rides in one place for easy reference.
- **Profile Page**: Manage your account information and view your ride statistics.

## Tech Stack

- **React Native**: Cross-platform mobile development.
- **Expo**: Fast development and build tools.
- **Clerk**: User authentication and session management.
- **Zustand**: Lightweight state management.
- **NeonDB (PostgreSQL)**: Database for managing user and ride data.
- **Drizzle ORM**: Database queries and schema management.
- **NativeWind**: Styling for React Native components with Tailwind-like utility classes.
- **Stripe**: Secure and easy payment processing.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ryde-app.git
   cd ryde-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a .env file at the root of your project and add your credentials for Clerk, Stripe, and Google API.

   ```bash
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=""
   EXPO_PUBLIC_GOOGLE_API_KEY=""
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_API_KEY=""
   EXPO_PUBLIC_GEOAPIFY_API_KEY=""
   STRIPE_SECRET_KEY=""
   DATABASE_URL=""
   ```

4. Run the app in development mode:

   ```bash
   npm run start
   ```

## Contributing

1. Fork the repository.

2. Create a new feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request.








