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
