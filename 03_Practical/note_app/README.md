# Note App

A modern, responsive note-taking application built with Angular that allows users to create, edit, and manage their notes with a beautiful dark-themed UI.

## Features

- Create new notes with title and content
- Edit existing notes
- Delete notes (with visual indication)
- Status indicators for notes:
  - 🟢 New notes (green)
  - 🟠 Updated notes (orange)
  - ⚪ Default notes (white)
  - 🔴 Deleted notes (red with strikethrough)
- Responsive design with dark theme
- Real-time updates using RxJS
- Form validation for note creation/editing

## Technologies Used

- Angular (Latest version)
- TypeScript
- RxJS for state management
- CSS with CSS Variables for theming

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── notes-list/
│   │   │   ├── notes-list.component.ts
│   │   │   ├── notes-list.component.html
│   │   │   └── notes-list.component.css
│   ├── models/
│   │   └── note.ts
│   ├── services/
│   │   └── notes.service.ts
│   └── app.component.ts
├── styles.css
└── main.ts
```

## Features in Detail

### Note Management
- **Create Notes**: Add new notes with a title and content
- **Edit Notes**: Modify existing notes with real-time status updates
- **Delete Notes**: Instead of permanent deletion, notes are marked as deleted and shown with a red strikethrough
- **Status Tracking**: Visual indicators for note status (new, updated, default, deleted)

### User Interface
- Modern dark theme design
- Responsive layout that works on all device sizes
- Smooth animations and transitions
- Clear visual feedback for user actions

### State Management
- Centralized state management using RxJS BehaviorSubject
- Real-time updates across components
- Persistent note status tracking