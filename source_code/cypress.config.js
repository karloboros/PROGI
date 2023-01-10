import { defineConfig } from 'cypress';
import seed from './cypress/tasks/seed.js';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents,
  },
});

function setupNodeEvents(on) {
  on('task', { seed });
}
