# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**create-tres** - CLI wizard for scaffolding TresJS projects (Vue.js + Three.js). Interactive tool that generates project templates with configurable ecosystem packages.

## Commands

```bash
# Build
pnpm build              # Compile TypeScript (tsdown)
pnpm build:watch        # Watch mode

# Development
pnpm dev                # Build and run CLI locally

# Test locally (after build)
node bin/index.js [project-name]

# Testing
pnpm test               # Run vitest

# Linting
pnpm lint               # ESLint check
pnpm lint:fix           # Auto-fix

# Release
pnpm release            # release-it (runs lint + build)
```

## Architecture

```
bin/index.js           → Entry point, dynamically imports dist/index.js
src/index.ts           → Main CLI logic (commander + prompts)
templates/
  vue/                 → Vue + Vite template
  nuxt/                → Nuxt template with @tresjs/nuxt module
```

### CLI Flow

1. Parse args with `commander`
2. Interactive prompts: project name, template (vue/nuxt), ESLint, ecosystem packages
3. Copy template to target directory
4. Replace `{{projectName}}` placeholders in package.json/README.md
5. Inject selected dependencies and TypeScript/ESLint configs

### Key Patterns

- **Package manager detection**: Auto-detects npm/yarn/pnpm from `npm_config_user_agent`
- **TypeScript always enabled**: No opt-out option
- **Ecosystem packages**: cientos (recommended), post-processing, leches defined in `ECOSYSTEM_PACKAGES` array
- **Template variables**: Use `{{projectName}}` in template files for substitution

## Templates

Both templates include `TheExperience.vue` component demonstrating:
- TresCanvas setup with camera, lights, grid
- `useLoop` composable for animation
- Type-safe TresObject refs

**Vue template**: Vite config with GLSL plugin, Three.js chunking, vue-tsc
**Nuxt template**: Pre-configured `@tresjs/nuxt` module, SSR-ready
