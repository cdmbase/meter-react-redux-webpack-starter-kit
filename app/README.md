# Known issues

- Do not imply the ecmascript package, instead add it individually to each  package (see [thereactivestack/meteor-webpack#44](https://github.com/thereactivestack/meteor-webpack/issues/44)).
- Add `react-runtime` and [`react-runtime-additional`](https://github.com/veeramarni/react-runtime-additional) to expose local copy of the package to fix the multiple copies of React.   Make sure to clone `react-runtime-additional` under packages folder as the meteor package is not published to public.
- Add local copy of meteor-webpack to enable resolve.alias (see [thereactivestack/meteor-webpack#218](https://github.com/thereactivestack/meteor-webpack/issues/44)). Also read (https://github.com/webpack/webpack/issues/1275)
- Add triggerUpdate to AccountsField (see [studiointeract/accounts-ui#60](https://github.com/studiointeract/accounts-ui/issues/60)). Make sure to clone [veeramarni/accounts-ui](https://github.com/veeramarni/accounts-ui) under packages directory.


CodeSplitting References:
===============
http://moduscreate.com/code-splitting-for-react-router-with-es6-imports/
http://stackoverflow.com/questions/35025371/possible-to-mix-jsx-and-regular-object-for-routes-in-react-router/35025838#35025838
https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes/tree/master/modules
https://github.com/ReactTraining/react-router/blob/v2.7.0/examples/huge-apps/app.js
https://github.com/mxstbr/react-boilerplate/blob/master/app/routes.js(uses System.imports)
https://github.com/maximoleinyk/reactjs/blob/master/src/js/common/createStore.js#L12
https://github.com/mxstbr/react-boilerplate/blob/master/app/routes.js
http://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application