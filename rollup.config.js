import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";

const PACKAGE = require("./package.json");

process.env.NODE_ENV = "production";

export default {
  entry: "./src/index.js",
  targets: [
    {
      format: "umd",
      moduleName: "ValidateEmail",
      dest: PACKAGE.main
    },
    {
      format: "es",
      moduleName: "ValidateEmail",
      dest: PACKAGE.module
    }
  ],
  exports: "named",
  plugins: [
    resolve({
      jsnext: true,
      extensions: [".js", ".json"]
    }),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs(),
    builtins(),
    uglify({}, minify)
  ]
};
