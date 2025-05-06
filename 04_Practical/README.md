# Department User Management System

A simple Angular application for managing departments and users within an organization.

## Project Overview

This application provides a user interface for managing departments and users with the following features:

- Add new departments
- Add users to departments
- View users by department
- Filter departments
- Expandable department view with user details

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── department-list/       # Main component for department management
│   ├── models/
│   │   ├── department.model.ts    # Department data model
│   │   └── user.model.ts         # User data model
│   ├── services/
│   │   ├── department.service.ts  # Department management service
│   │   └── user.service.ts       # User management service
│   ├── app.component.ts          # Root component
│   ├── app.config.ts             # Application configuration
│   └── app.routes.ts             # Router configuration
└── styles.css                    # Global styles
```

## Technical Stack

- Angular 17
- TypeScript
- RxJS for state management
- Standalone components architecture

## Features

### Department Management

- Create new departments
- View department list
- Expand/collapse department details
- See user count per department

### User Management

- Add users to departments
- View users within departments
- Filter users by department

## Services

### DepartmentService

- Manages department data
- Provides methods for adding departments
- Handles user assignments to departments

### UserService

- Manages user data
- Provides user creation functionality
- Handles user-department relationships

## Components

### DepartmentListComponent

- Main interface for department management
- Displays department list with expandable details
- Provides forms for adding departments and users
- Implements filtering functionality

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
ng serve
```

3. Open browser and navigate to `http://localhost:4200`

## Development

This project uses Angular's standalone components and dependency injection for better modularity and maintenance.

### Project Configuration

- Uses EditorConfig for consistent coding style
- Implements Angular's zone.js for change detection
- Utilizes TypeScript strict mode for type safety

### State Management

- Implements BehaviorSubject for reactive state management
- Uses Observable patterns for data streaming
- Maintains consistent state across components

## Build & Deployment

To build for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.
