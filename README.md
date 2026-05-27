# simeon.dev

This is my portfolio website. It is built with React, TypeScript, Vite, and pnpm.

## Development

Install dependencies:

```sh
pnpm install
```

Start the local development server:

```sh
pnpm dev
```

Build the production site:

```sh
pnpm build
```

Preview the production build locally:

```sh
pnpm preview
```

## GitHub Actions

The `Deploy to GitHub Pages` workflow runs on pushes to `main` and can also be started manually from GitHub Actions.

The workflow:

- Checks out the repository.
- Sets up pnpm 10 and Node.js 22.
- Installs dependencies with `pnpm install --frozen-lockfile`.
- Builds the site with `pnpm build`.
- Publishes the `dist` folder to GitHub Pages.
