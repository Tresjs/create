#!/usr/bin/env node

import { program } from 'commander'
import chalk from 'chalk'
import prompts from 'prompts'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import validateProjectName from 'validate-npm-package-name'
import { bold, gray, lightGreen, yellow } from 'kolorist'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface ProjectOptions {
  name: string
  template: 'vue' | 'nuxt'
  // typescript: boolean // Removed: TypeScript is always enabled
  eslint: boolean
  packages: string[]
  packageManager: 'npm' | 'yarn' | 'pnpm'
}

const ECOSYSTEM_PACKAGES = [
  {
    name: '@tresjs/cientos',
    description: 'Collection of useful helpers and ready-made abstractions',
    value: 'cientos',
    recommended: true
  },
  {
    name: '@tresjs/post-processing',
    description: 'Post-processing effects for TresJS',
    value: 'post-processing'
  },
  {
    name: '@tresjs/leches',
    description: 'Tasty GUI controls for development',
    value: 'leches'
  },
  /* {
    name: '@tresjs/path-tracing',
    description: 'Path-tracing rendering capabilities',
    value: 'path-tracing'
  } */
]

function validatePackageName(name: string): boolean {
  const validation = validateProjectName(name)
  return validation.validForNewPackages
}

function getPackageManager(): 'npm' | 'yarn' | 'pnpm' {
  const userAgent = process.env.npm_config_user_agent || ''
  
  if (userAgent.includes('yarn')) return 'yarn'
  if (userAgent.includes('pnpm')) return 'pnpm'
  return 'npm'
}

function getInstallCommand(packageManager: string): string {
  switch (packageManager) {
    case 'yarn': return 'yarn'
    case 'pnpm': return 'pnpm install'
    default: return 'npm install'
  }
}

function getRunCommand(packageManager: string): string {
  switch (packageManager) {
    case 'yarn': return 'yarn dev'
    case 'pnpm': return 'pnpm dev'
    default: return 'npm run dev'
  }
}

async function replaceTemplateVariables(targetDir: string, projectName: string): Promise<void> {
  const filesToProcess = ['package.json', 'README.md']
  
  for (const file of filesToProcess) {
    const filePath = path.join(targetDir, file)
    
    if (await fs.pathExists(filePath)) {
      let content = await fs.readFile(filePath, 'utf-8')
      content = content.replace(/\{\{projectName\}\}/g, projectName)
      await fs.writeFile(filePath, content)
    }
  }
}

async function createProject(options: ProjectOptions): Promise<void> {
  const { name, template, eslint, packages, packageManager } = options
  
  const targetDir = path.resolve(process.cwd(), name)
  
  // Create project directory
  await fs.ensureDir(targetDir)
  
  // Copy template files
  const templateDir = path.join(__dirname, '..', 'templates', template)
  await fs.copy(templateDir, targetDir)
  
  // Replace template variables in files
  await replaceTemplateVariables(targetDir, name)
  
  // Update package.json
  const packageJsonPath = path.join(targetDir, 'package.json')
  const packageJson = await fs.readJson(packageJsonPath)
  
  packageJson.name = name
  
  // Add ecosystem packages
  const ecosystemPackages = packages.map(pkg => {
    const packageInfo = ECOSYSTEM_PACKAGES.find(p => p.value === pkg)
    return packageInfo?.name || pkg
  })
  
  if (ecosystemPackages.length > 0) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      ...ecosystemPackages.reduce((acc, pkg) => {
        acc[pkg] = 'latest'
        return acc
      }, {} as Record<string, string>)
    }
  }
  
  // Add TypeScript dependencies (always enabled)
  if (template === 'vue') {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'typescript': 'latest',
      '@vitejs/plugin-vue': 'latest',
      'vue-tsc': 'latest',
      '@types/three': 'latest'
    }
  }

  if (template === 'nuxt') {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'typescript': 'latest',
      '@types/three': 'latest'
    }
  }
  
  // Add ESLint dependencies if needed
  if (eslint) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      '@tresjs/eslint-config': '^1.1.0',
      'eslint': '^9.16.0'
    }
    
    packageJson.scripts = {
      ...packageJson.scripts,
      'lint': 'eslint ',
      'lint:fix': 'eslint  --fix'
    }
  }
  
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
  
  // Handle TypeScript configuration (always enabled)
  if (template === 'vue') {
    // No JS fallback: template must always have main.ts
    // Update index.html to reference main.ts (for safety)
    const indexPath = path.join(targetDir, 'index.html')
    let indexContent = await fs.readFile(indexPath, 'utf-8')
    await fs.writeFile(indexPath, indexContent)
  }
  
  // Add ESLint config if needed
  if (eslint) {
    const eslintConfig = {
      extends: ['@tresjs/eslint-config'],
      rules: {}
    }
    
    await fs.writeJson(path.join(targetDir, '.eslintrc.json'), eslintConfig, { spaces: 2 })
  }
  
  console.log(chalk.green(`\n✓ Project ${name} created successfully!`))
  console.log(chalk.yellow('\nNext steps:'))
  console.log(chalk.blue(`  cd ${name}`))
  console.log(chalk.blue(`  ${getInstallCommand(packageManager)}`))
  console.log(chalk.blue(`  ${getRunCommand(packageManager)}`))
  
  if (packages.length > 0) {
    console.log(chalk.green('\nEcosystem packages included:'))
    packages.forEach(pkg => {
      const packageInfo = ECOSYSTEM_PACKAGES.find(p => p.value === pkg)
      console.log(chalk.gray(`  - ${packageInfo?.name}: ${packageInfo?.description}`))
    })
  }
}

async function main(): Promise<void> {
  console.log(chalk.blue.bold(`${lightGreen('▲')} ${gray('■')} ${yellow('●')} ${bold('Tres')}`))
  console.log(chalk.gray('Let\'s begin your journey with TresJS\n'))
  
  program
    .name('create-tresjs')
    .description('CLI wizard to create TresJS projects')
    .version('0.0.1')
    .argument('[project-name]', 'project name')
    .action(async (projectName?: string) => {
      try {
        const options = await prompts([
          {
            type: projectName ? null : 'text',
            name: 'name',
            message: 'Project name:',
            initial: 'my-tres-project',
            validate: (value: string) => {
              if (!value.trim()) return 'Project name is required'
              if (!validatePackageName(value)) return 'Invalid package name'
              return true
            }
          },
          {
            type: 'select',
            name: 'template',
            message: 'Select a template:',
            choices: [
              { title: 'Vue + Vite', value: 'vue', description: 'Vue 3 with Vite build tool' },
              { title: 'Nuxt', value: 'nuxt', description: 'Nuxt 3 with TresJS module' }
            ],
            initial: 0
          },
          // Removed TypeScript prompt: TypeScript is now always enabled by default
          {
            type: 'confirm',
            name: 'eslint',
            message: 'Add ESLint for code quality?',
            initial: true
          },
          {
            type: 'multiselect',
            name: 'packages',
            message: 'Select TresJS ecosystem packages:',
            choices: ECOSYSTEM_PACKAGES.map(pkg => ({
              title: pkg.name,
              value: pkg.value,
              description: pkg.description,
              selected: pkg.recommended || false
            })),
            hint: 'Space to select, Enter to confirm'
          }
        ])
        
        if (!options.name && !projectName) {
          console.log(chalk.red('Project creation cancelled'))
          process.exit(1)
        }
        
        const finalOptions: ProjectOptions = {
          name: projectName || options.name,
          template: options.template,
          eslint: options.eslint,
          packages: options.packages || [],
          packageManager: getPackageManager()
        }
        
        // Check if directory already exists
        const targetDir = path.resolve(process.cwd(), finalOptions.name)
        if (await fs.pathExists(targetDir)) {
          const { overwrite } = await prompts({
            type: 'confirm',
            name: 'overwrite',
            message: `Directory ${finalOptions.name} already exists. Overwrite?`,
            initial: false
          })
          
          if (!overwrite) {
            console.log(chalk.red('Project creation cancelled'))
            process.exit(1)
          }
          
          await fs.remove(targetDir)
        }
        
        console.log(chalk.blue('\n🚀 Creating project...'))
        await createProject(finalOptions)
        
      } catch (error) {
        console.error(chalk.red('\n❌ Error creating project:'), error)
        process.exit(1)
      }
    })
  
  program.parse()
}

main().catch(console.error)