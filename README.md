## SPFx React PNP example

This is a boilerplate example using SPFx with React and @pnp/sp

### Clone repo and install dependencies

```bash
git clone the repo
npm i
```

Before proceed further we need a little trick:
- open `package-lock.json`
- replace code `"typescript": "~2.2.2"` with `"typescript": "~2.4.2"`
- run `npm list typescript`, you should see something like this:
  ``` bash
  +-- @microsoft/sp-build-web@1.1.0
  `-- @microsoft/gulp-core-build-typescript@3.1.1
   +-- @microsoft/api-extractor@2.3.8
   | `-- typescript@2.4.2
   `-- typescript@2.4.2
  `-- typescript@2.9.2
  ```

Run `gulp serve`

Test on you development environment, this example assumes you have:
 - a SP list named `PeopleList`
 - `PeopleList` have columns
   - `ID`
   - `Email`
   - `Firstname`
   - `LastName`  

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

- gulp clean - TODO
- gulp test - TODO
- gulp serve - TODO
- gulp bundle - TODO
- gulp package-solution - TODO

## References
- [Development Environmont for SPFx and PNP](https://github.com/sabitertan/spfx-pnp-env)
- [Set up your SharePoint Framework development environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)
- [Build your first SharePoint client-side web part](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)
- [SharePoint Framework Client-Side Web Part Samples & Tutorial Materials](https://github.com/SharePoint/sp-dev-fx-webparts)
- [Use sp-pnp-js with SharePoint Framework web parts](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/use-sp-pnp-js-with-spfx-web-parts)
- [PnPjs: Client Side Libraries for Microsoft 365](https://pnp.github.io/pnpjs/)
- [Workaround for SPFx TypeScript Version](https://pnp.github.io/pnpjs/SPFx-On-Premesis-2016.html)
- [TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter)


