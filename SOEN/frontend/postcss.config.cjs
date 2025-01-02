module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


// Tailwind CSS needs to be processed by PostCSS to work correctly.
// The postcss.config.js file is the configuration file for PostCSS.
// If your project uses ES modules, PostCSS might not work properly with the module.exports syntax, so renaming the file to postcss.config.cjs resolves this by adhering to CommonJS module syntax.
// This file wasn’t automatically created during the installation because Tailwind doesn’t always include a postcss.config.js file by default—this depends on the specific environment or setup you're using.