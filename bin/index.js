#!/usr/bin/env node

import('../dist/index.mjs').catch(error => {
  console.error('Error loading CLI:', error)
  process.exit(1)
})