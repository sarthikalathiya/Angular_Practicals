# Note App

A modern note-taking application built with Angular, allowing users to create, read, update, and delete notes efficiently.

## Features

- Create and manage notes
- View detailed notes
- Responsive design
- Modern user interface
- Real-time updates

## Technology Stack

- **Frontend Framework**: Angular (Latest Version)
- **Language**: TypeScript
- **Styling**: CSS
- **Routing**: Angular Router

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── note-detail/    # Individual note view component
│   │   └── notes-list/     # List of notes component
│   │   ├── models/            # Data models
│   │   ├── services/          # Application services
│   │   ├── app.component.ts   # Root component
│   │   ├── app.config.ts      # App configuration
│   │   └── app.routes.ts      # Route definitions
│   ├── index.html
│   ├── main.ts               # Application entry point
│   └── styles.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sarthikalathiya/note_app.git
```

2. Navigate to the project directory:
```bash
cd note_app
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

## Development

- Run `ng serve` for a dev server
- Run `ng build` to build the project
- Run `ng test` to execute unit tests