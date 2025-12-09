# Angular Superapp

This project is a standalone Angular application structured as a superapp, featuring multiple libraries and a PWA setup.

## Project Structure

```
angular-superapp
├── apps
│   └── people-superapp          # Main application
│       ├── src
│       │   ├── app              # Application components and configuration
│       │   ├── assets           # Static assets (images, fonts, etc.)
│       │   ├── index.html       # Entry point HTML file
│       │   ├── main.ts          # Main entry point for the Angular application
│       │   ├── styles.scss      # Global SCSS styles
│       │   ├── manifest.webmanifest # PWA metadata
│       │   └── ngsw-config.json # Service Worker configuration
│       ├── angular.json         # Angular workspace configuration
│       └── tsconfig.app.json    # TypeScript configuration for the application
├── projects
│   ├── ui-tokens                # Design tokens library
│   ├── ui-widgets               # Reusable UI components library
│   ├── core                      # Shared services library
│   └── feature-beneficios        # Feature-specific library
├── tools                         # Build scripts and tools
├── angular.json                 # Workspace configuration for the entire project
├── tsconfig.json                # TypeScript configuration for the workspace
├── package.json                 # NPM configuration and scripts
└── README.md                    # Project documentation
```

## Getting Started

To get started with the Angular Superapp, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd angular-superapp
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   ng serve --project=people-superapp
   ```

4. **Build the application:**
   ```
   ng build --project=people-superapp
   ```

5. **Run tests:**
   ```
   ng test --project=people-superapp
   ```

## Features

- **PWA Support:** The application is configured as a Progressive Web App (PWA) with service worker support.
- **Modular Architecture:** The project is structured into multiple libraries for design tokens, UI components, shared services, and feature-specific functionalities.
- **SCSS Support:** The project uses SCSS as a preprocessor for styling.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.