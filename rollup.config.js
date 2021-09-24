import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "./index.js",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
            },
            {
                file: "dist/index.es.js",
                format: "es",
                export: "named",
            },
        ],
        plugins: [
            image(),
            json(),
            babel({
                exclude: "node_module/**",
                presets: ["@babel/preset-react"],
            }),
            external(),
            resolve(),
            terser(),
        ],
    },
];
