Install `yarn add git+https://github.com:imerkle/fbt_runtime.git`

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