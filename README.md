# JsCv — Curriculum Vitae & Portfolio

**JsCv** is a minimalist, Swiss-modernist personal curriculum vitae and portfolio website for Javed Shariyar Mandal, built with React, TypeScript, Tailwind CSS, and Three.js. Designed for high performance, editorial typographic hierarchy, and automated continuous deployment directly to GitHub Pages.

---

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow for automated Pages deployment
├── public/
│   └── favicon.svg           # Site favicon
├── src/
│   ├── components/
│   │   ├── Antigravity.tsx   # Kinetic particle field (Three.js WebGL)
│   │   ├── ColophonFooter.tsx# Publication colophon & metadata footer
│   │   ├── CoordinatesSection.tsx # Contact channels & direct transmission
│   │   ├── CredentialsSection.tsx # Academic foundation & verified certifications
│   │   ├── HeroStatement.tsx # Typographic introduction & summary dossier
│   │   ├── Masthead.tsx      # Navigation header & live status indicator
│   │   ├── ProjectSection.tsx# Architectural project catalog with tag filters
│   │   ├── SectionHeader.tsx # Standardized editorial section header
│   │   └── SkillsSection.tsx # Categorized technical competencies
│   ├── data/
│   │   └── cvData.ts         # Structured CV data schema and content
│   ├── App.tsx               # Root application composition
│   ├── index.css             # Tailwind styling and typography definitions
│   └── main.tsx              # DOM entry point
├── index.html                # HTML entry point with metadata tags
├── package.json              # Project dependencies and build scripts
├── tsconfig.json             # TypeScript compiler configuration
└── vite.config.ts            # Vite configuration with relative base path support
```

---

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm (or pnpm / bun / yarn)

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```
Starts the local development server at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Compiles TypeScript and bundles static production assets into `./dist`.

---

## Deployment to GitHub Pages

The repository contains an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

### One-Time Setup on GitHub:
1. Push this repository to GitHub.
2. In your repository, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Push any commit to `main` (or trigger manually via the **Actions** tab).

GitHub Pages will automatically build and publish the site at `https://<username>.github.io/<repository-name>/`.
