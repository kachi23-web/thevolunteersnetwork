import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import type { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'

// Strips sourceMappingURL from vendored minified files to suppress missing .map warnings
function stripSourceMapComments(): Plugin {
  return {
    name: 'strip-source-map-comments',
    transform(code, id) {
      if (id.includes('assets/vendor') && id.endsWith('.js')) {
        return { code: code.replace(/\/\/# sourceMappingURL=\S+/g, ''), map: null }
      }
    },
  }
}

// Serves the root-level assets/ folder at /assets/ in dev
function serveRootAssets(): Plugin {
  return {
    name: 'serve-root-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/assets/')) {
          const filePath = path.join(process.cwd(), req.url)
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Cache-Control', 'no-cache')
            fs.createReadStream(filePath).pipe(res)
            return
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    stripSourceMapComments(),
    serveRootAssets(),
    // Bundle analyzer - only in analyze mode
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  build: {
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor chunks for better caching
          if (id.includes('node_modules')) {
            // React core libraries - keep separate for better caching
            if (id.includes('react-dom')) {
              return 'react-dom-vendor';
            }
            if (id.includes('react-router')) {
              return 'react-router-vendor';
            }
            if (id.includes('react')) {
              return 'react-vendor';
            }
            // Animation libraries - separate for better caching
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            // Form libraries
            if (id.includes('react-hook-form')) {
              return 'form-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
          
          // Split pages into separate chunks for route-based lazy loading
          if (id.includes('src/pages/')) {
            const pageName = id.split('src/pages/')[1].split('.')[0].split('/')[0];
            return `page-${pageName.toLowerCase()}`;
          }
          
          // Split large component groups
          if (id.includes('src/components/')) {
            // Group smaller components together
            if (id.includes('Card') || id.includes('Form') || id.includes('Input')) {
              return 'components-ui';
            }
            // Keep larger components separate
            if (id.includes('Carousel') || id.includes('Lightbox') || id.includes('Modal')) {
              return 'components-interactive';
            }
            // Layout components
            if (id.includes('Layout') || id.includes('Header') || id.includes('Footer')) {
              return 'components-layout';
            }
          }
          
          // Utilities
          if (id.includes('src/utils/')) {
            if (id.includes('animations') || id.includes('vendor')) {
              return 'utils-animations';
            }
          }
        },
        // Optimize asset file names for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.');
          const ext = info?.[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff2?|ttf|eot/i.test(ext || '')) {
            return `assets/fonts/[name]-[hash][extname]`;
          } else if (/css/i.test(ext || '')) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Minify options - using esbuild (default, faster)
    minify: 'esbuild',
    // Chunk size warnings - more aggressive for better performance
    chunkSizeWarningLimit: 300, // Reduced from 500 for better performance
    // Source maps for production debugging (disabled for performance)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Optimize CSS
    cssMinify: true,
    // Enable asset inlining for small files
    assetsInlineLimit: 2048, // Reduced from 4096 for better caching
    // Enable tree-shaking for better dead code elimination
    reportCompressedSize: true,
    // Optimize module preloading
    modulePreload: {
      polyfill: true,
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'react-hook-form'],
    // Force pre-bundling of these dependencies
    force: true,
  },
  // Suppress source map warnings for vendored minified files
  css: {
    devSourcemap: false,
  },
  // Exclude old HTML files from Vite's file watcher
  server: {
    port: 3000,
    open: true,
    watch: {
      ignored: ['**/src/oldfiles/**', '**/*.html', '!**/index.html'],
    },
    // Serve root-level assets/ folder at /assets/
    fs: {
      allow: ['.'],
    },
  },
  // Preview configuration
  preview: {
    port: 4173,
  },
}))
