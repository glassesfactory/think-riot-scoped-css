import riot from 'rollup-plugin-riot';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
//

export default {
  entry: 'src/main.js',
  dest: 'dist/main.js',
  plugins: [
    riot(),
    nodeResolve({ jsnext: true }),
    commonjs(),
    buble(),
    uglify()
  ]
}
