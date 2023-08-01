import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
    input: 'build/easy-table.js', // Starting point for bundling

    // Output options for the generated bundle
    output: {
        file: 'build/easy-table.js',
        format: 'iife',
        sourcemap: true
    },

    plugins: [
        // Babel to transpile es2015 code for older browsers
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        // use source maps from input files
        sourcemaps()
    ]
}