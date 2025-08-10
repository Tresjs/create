# TresJS Templates

This directory contains the template files for the `create-tresjs` CLI tool.

## Available Templates

### Vue Template (`vue/`)

A complete Vue.js application with TresJS integration:

- **Framework**: Vue 3 with Vite
- **3D Library**: TresJS with Three.js
- **Features**:
  - TypeScript support
  - ESLint configuration with TresJS rules
  - Vite plugin for GLSL shaders
  - Leches GUI controls for debugging
  - Cientos utilities pre-installed
  - Basic 3D scene with rotating cube

**Key Files**:
- `src/App.vue` - Main application component
- `src/components/TheExperience.vue` - 3D scene component
- `vite.config.ts` - Vite configuration with TresJS optimizations
- `package.json` - Dependencies and scripts

### Nuxt Template (`nuxt/`)

A complete Nuxt 3 application with TresJS integration:

- **Framework**: Nuxt 3
- **3D Library**: TresJS with Three.js
- **Features**:
  - TypeScript support
  - ESLint configuration with Nuxt
  - TresJS Nuxt module pre-configured
  - Server-side rendering (SSR) ready
  - Cientos utilities pre-installed
  - Basic 3D scene with rotating torus knot

**Key Files**:
- `app.vue` - Root application component
- `pages/index.vue` - Main page with 3D canvas
- `components/TheExperience.vue` - 3D scene component
- `nuxt.config.ts` - Nuxt configuration with TresJS module
- `package.json` - Dependencies and scripts

## Template Variables

Both templates use the following variables that should be replaced during scaffolding:

- `{{projectName}}` - The name of the user's project

## Usage

These templates are designed to be used with the `create-tresjs` CLI tool to scaffold new TresJS projects quickly and efficiently.

## Dependencies

Both templates include the core TresJS packages:
- `@tresjs/core` - Core TresJS functionality
- `@tresjs/cientos` - Utility components and helpers
- `three` - Three.js library
- `@types/three` - TypeScript types for Three.js

The Vue template additionally includes:
- `@tresjs/leches` - GUI controls for debugging
- `vite-plugin-glsl` - GLSL shader support

The Nuxt template additionally includes:
- `@tresjs/nuxt` - TresJS Nuxt module
- `@nuxt/eslint` - ESLint integration for Nuxt