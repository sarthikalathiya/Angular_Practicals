# User Display App

A modern Angular application that displays user information from the JSONPlaceholder API with a clean and responsive interface.

## Features

- Fetches and displays user data from JSONPlaceholder API
- Responsive grid layout for user cards
- Custom phone number formatting using pipes
- Loading state handling
- Hover animations on user cards
- Clean and modern UI design

## Prerequisites

- Node.js (v14 or higher)
- Angular CLI (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

## Project Structure

```
src/
├── app/
│   ├── services/
│   │   └── user.service.ts      # API service for fetching users
│   ├── pipes/
│   │   └── phone-mask.pipe.ts   # Custom pipe for phone formatting
│   ├── app.component.ts         # Main component
│   ├── app.component.html       # Main template
│   └── app.component.css        # Styles
└── assets/                      # Static assets
```

## API Integration

The app uses the JSONPlaceholder API to fetch user data:

- Endpoint: `https://jsonplaceholder.typicode.com/users`
- Data includes: name, username, email, phone, website, and company details

## Styling

- Responsive grid layout
- Material-inspired card design
- Smooth hover animations
- Mobile-friendly interface

## Contributing

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License.
