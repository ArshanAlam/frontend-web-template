# Frontend
This subproject contains the source code for the web application. We are using [React](https://reactjs.org/), [Blueprintjs](https://blueprintjs.com/), and [webpack](https://webpack.js.org/) as the basic building blocks.

**Note: Please review the README.md in frontend-web-template**


## Yarn Scripts
We are using `Yarn` to clean, build, and bundle this application. Here is the `scripts` field in `package.json`.

```
"scripts": {
  "build": "npm-run-all compile",
  "compile": "npm-run-all compile:typescript compile:sass",
  "compile:typescript": "tsc --build",
  "compile:sass": "webpack --config webpack.config.sass.ts",
  "clean": "rm -rf node_modules/ && rm -rf lib/ && rm -rf dist/",
  "serve": "http-server dist/"
}
```


### Clean
The `clean` script is very simple. We remove the `node_modules`, `lib`, and `dist` directories.


### Build
The `build` script calls the `compile` script.


### Compile
The `compile` script executes the `compile:typescript` and `compile:sass` scripts. The `compile:typescript` simply calls typescript and the `compile:sass` uses webpack to compile the `Sass`.

The configuration for `TypeScript` and `webpack` are defined in `tsconfig.json` and `webpack.config.sass.ts`, respectively.


### Serve
Since the bundled output of the application is written to `dist/`, the `serve` script starts up a simple http file server in that directory to serve the application.


## tsconfig.json
Here we will explain what is going on in the `tsconfig.json` file.

```
{
  "compilerOptions": {
    "target": "es5",            /* tells the compiler what library version to include while compiling and what version of JS is emitted by the compiler */
    "module": "commonjs",       /* Specify module code generation. commonjs means that node could load the output. */
    "allowJs": false,           /* Allow javascript files to be compiled. */
    "checkJs": false,           /* Report errors in .js files. */
    "outDir": "lib",            /* Redirect output structure to the directory. */
    "removeComments": true,     /* Do not emit comments to output. */
    "strict": true,             /* Enable all strict type-checking options. */
    "moduleResolution": "node", /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    "jsx": "react"              /* Specify JSX code generation: react will convert the jsx to JS` */
  },

  /* Include the follow directories when compiling */
  "include": [
    "src",
    "style"
  ],

  /* Exclude the following directories when compiling */
  "exclude": [
    "node_modules",
    "lib"
  ]
}
```


## webpack.config.sass.ts
Below we explain the `webpack` config.


```
mode: "production",
entry: "./lib/index.js",
output: {
  path: path.resolve(__dirname, "dist"),
  filename: "app.js"
}
```

The `mode` field indicates to webpack to treat the output as a production build.

The `entry` field indicates the index JavaScript file. Notice, that the entry is a `JavaScript` file in the `lib/` directory rather than a `TypeScript` file in the `src/` directory. Since we are using `TypeScript`, we build the output JavaScript and write it to `lib/` and we pass the built `index.js` file to webpack.

Lastly, the `output` field indicates where to write the bundled output. Here we are telling `webpack` to write the output to a directory called `dist/` and call the output application `app.js`.


### Style Loaders
Below we define a rule that will execute on all files with the file extension `sass` and `scss`. The rule tells webpack to execute the `sass-loader`, that will compile the sass into css. Than execute the `css-loader`, which will interpret `@import` and `url()` like `import/require()` and will resolve them. Lastly, the `style-loader` injects CSS into the DOM.

```
module: {
  rules: [
    {
      test: /\.s[ac]ss$/i,
      // note, these are executed from last to first (so sass-loader -> style-loader)
      use: [
        "style-loader",
        "css-loader",
        "sass-loader"
      ]
    }
  ]
}
```


### HtmlWebpackPlugin
The `HtmlWebpackPlugin` simplifies creation of HTML files to serve the webpack bundle. The `hash` field adds a hash in the filename which changes with every compilation. The plugin will generate an HTML file for you.

```
plugins: [
  new HtmlWebpackPlugin({
    hash: true
  })
]
```



### Chunks and Optimizations
In the  Webpack config we have added some optimizations to speed up application load time.


In the `optimization` block below, we are doing two things:

1. Splitting vendor modules into chunk files so that they could be loaded in parallel
2. removing all dead code, unused code, and comments from the bundled output

```
optimization: {
  splitChunks: {
    chunks: "all",
    maxInitialRequests: Infinity,
    minSize: 0,                     /* Minimum size, in bytes, for a chunk to be generated */
    cacheGroups: {
      default: false,               /* Disable the default behaviour for cacheGroups and vendor code */
      vendors: false,
      vendor: {
        enforce: true,
        test: /node_modules/,       /* Execute the following for all node_modules that are used */
        name(module) {
          // get the name of the module. ex node_modules/packageName/not/this/part.js
          const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

          // remove @ symbol from package name
          return packageName.replace("@", '');
        }
      }
    }
  },
  minimizer: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          unused: true,
          dead_code: true,
        },
        output: {
          comments: false,
        }
      },
    })
  ]
}
```


## Jest
We are using Jest for testing our web application. Below is the very simple and self explanatory config for jest.

```
module.exports = {
  // jest should be looking for tests in the 'tests` directory
  roots: ["<rootDir>/tests"],

  // ts-jest will take care of .ts and .tsx files only, leaving JavaScript files as-is
  preset: "ts-jest"
};
```

To run the all tests execute `yarn test`.
