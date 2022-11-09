import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) { // eslint-disable-line
      // implement node event listeners here
    },
  },
  env: {
    NODE_ENV: 'test'
  }
})
