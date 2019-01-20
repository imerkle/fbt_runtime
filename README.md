# Installation

Install `yarn add git+https://github.com/imerkle/fbt_runtime.git`

# Setup

Put your `translatedFbts.json` in `src/` folder.

Resolve the module in webpack. The files are in `/dist/`

```
    modules: [
      path.resolve(__dirname, './node_modules/fbt_runtime/dist/'),
      path.resolve(__dirname, './node_modules/fbt_runtime/dist/shared'),
      path.resolve(__dirname, './node_modules/fbt_runtime/dist/shared/FbtNumber'),
      path.resolve(__dirname, './node_modules/fbt_runtime/dist/nonfb'),
      path.resolve(__dirname, './node_modules/fbt_runtime/dist/nonfb/mocks'),
      './node_modules',
    ],
```

# Usage

```
const fbt = require("fbt")

<fbt desc="hello">hello</fbt>

```

I have modified original script to work for typescript since it only took *.js files. But you need to add this to `types/global.d.ts` to remove warnings form ts compiler.

```
declare module JSX {
  interface IntrinsicElements {
    "fbt": any
  }
}
```
