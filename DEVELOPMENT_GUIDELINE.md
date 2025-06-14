# Development Guidelines

## Technical Stack

This project uses the following main technologies:

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed JavaScript for safer and more maintainable code.
- **Prisma**: ORM for database access and migrations.
- **PostgreSQL**: Primary relational database (or another SQL database, if specified).
- **Tailwind CSS / PostCSS**: Utility-first CSS framework for styling (if Tailwind is present, otherwise PostCSS for CSS processing).
- **pnpm**: Fast, disk space efficient package manager.

Other supporting libraries and tools may be used as needed for authentication, logging, and utility functions.

## Linting and Formatting

- **ESLint**: This project uses ESLint for static code analysis to identify problematic patterns and enforce code quality standards. The configuration can be found in the `eslint.config.mjs` file.
- **Prettier**: Prettier is used for automatic code formatting to ensure a consistent code style across the project. It is typically integrated with ESLint and your code editor for seamless formatting on save.

## Directory Structure

- **Data Access Layer**: All code files related to data access are placed in the `./dataAccess` directory. This includes modules responsible for interacting with databases, external APIs, or any persistent storage.

- **Business Logic Layer**: All code files related to business logic are placed in the `./services` directory. This includes modules that implement the core functionality, rules, and workflows of the application.

- **Database Layer**: All code files related to the database are placed in the `./db` directory. Database schema files are specifically placed in the `./db/sql` directory.

- **Prisma Layer**: All Prisma related items, such as schema files, client generation scripts, and seed scripts, are placed in the `./prisma` directory.

- **UI Components**: All UI components are placed in the `./components` directory.

- **Pages**: All page-related code is placed in the `./app` directory.

- **TypeScript Models**: All TypeScript model definitions are placed in the `./models` directory.

Please follow this structure when adding new features or refactoring existing code to maintain consistency and clarity in the project.
