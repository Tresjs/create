# create-tresjs

🎮 CLI wizard to create TresJS projects with Vue.js and Three.js

## Usage

```bash
# With npm
npx create-tres my-tres-project

# With yarn
yarn create tres my-tres-project

# With pnpm
pnpm create tres my-tres-project
```

## Features

- 🎯 **Interactive wizard** - Guided setup for your TresJS project
- 🚀 **Template options** - Choose between Vue + Vite or Nuxt
- 📦 **Ecosystem packages** - Select from TresJS ecosystem packages
- 🔧 **TypeScript support** - Optional TypeScript configuration
- 📏 **ESLint integration** - Code quality with TresJS ESLint config
- 🔄 **Package manager detection** - Works with npm, yarn, or pnpm

## Templates

### Vue + Vite
- Vue 3 with Vite build tool
- Hot module replacement
- Fast development server
- Optimized for modern browsers

### Nuxt
- Nuxt 3 with TresJS integration
- Server-side rendering ready
- File-based routing
- Built-in SEO optimization

## Ecosystem Packages

The CLI includes options for the following TresJS ecosystem packages:

- **@tresjs/cientos** - Collection of useful helpers and ready-made abstractions
- **@tresjs/post-processing** - Post-processing effects for TresJS
- **@tresjs/leches** - Tasty GUI controls for development
- **@tresjs/rapier** - Physics for TresJS, powered by Rapier
- **@tresjs/path-tracing** - Path-tracing rendering capabilities

## Development

```bash
# Clone the repository
git clone https://github.com/Tresjs/create-tresjs.git
cd create-tresjs

# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Test locally
node bin/index.js test-project
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Related

- [TresJS](https://tresjs.org) - Create 3D experiences declaratively with Vue Components
- [TresJS Ecosystem](https://github.com/Tresjs) - Official TresJS packages and tools