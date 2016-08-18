# Known issues

- Do not imply the ecmascript package, instead add it individually to each  package (see [thereactivestack/meteor-webpack#44](https://github.com/thereactivestack/meteor-webpack/issues/44)).
- Add `react-runtime` and [`react-runtime-additional`](https://github.com/veeramarni/react-runtime-additional) to expose local copy of the package to fix the multiple copies of React.   Make sure to clone `react-runtime-additional` under packages folder as the meteor package is not published to public.
- Add local copy of meteor-webpack to enable resolve.alias (see [thereactivestack/meteor-webpack#218](https://github.com/thereactivestack/meteor-webpack/issues/44)). Also read (https://github.com/webpack/webpack/issues/1275)
- Add triggerUpdate to AccountsField (see [studiointeract/accounts-ui#60](https://github.com/studiointeract/accounts-ui/issues/60)). Make sure to clone [veeramarni/accounts-ui](https://github.com/veeramarni/accounts-ui) under packages directory.
