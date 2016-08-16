
# Known issues

- Do not imply the ecmascript package, instead add it individually to each  package (see thereactivestack/meteor-webpack#44).
- Add react-runtime and react-runtime-additional to expose local copy of the package to fix the multiple copies of React.
- Add local copy of meteor-webpack to enable resolve.alias (see thereactivestack/meteor-webpack#218).
- Add triggerUpdate to AccountsField (see studiointeract/accounts-ui#60)
