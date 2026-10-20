import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' gir relative stier, så bygget fungerer både på
// <org>.github.io/landingpage/ og på et eget domene.
export default defineConfig({
  base: './',
  plugins: [react()],
});
