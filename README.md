# APIDiscovery
Created with CodeSandbox

### Dependancies
```html
<link href="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_Drupal_Theme@v0.3.27/b5_ac_conect/css/style.css" rel="stylesheet" crossorigin="anonymous">
```

# How to integrate on your website

```html
    <script>
        window.SETTINGS={
            title:"ACCESS Resource Provider Software Discovery",
            affiliation:"access-ci.org",
            resourceGroup:"Software"
        }
    </script>
    <script defer="defer" src="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_WebApp_SoftwareDiscovery@2.0.13/build/static/js/main.js"></script>
    <link href="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_WebApp_SoftwareDiscovery@2.0.13/build/static/css/main.css" rel="stylesheet">

    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="Operations_WebApp_SoftwareDiscovery"></div>
```

# Build

## Development server

`npm run start`

[http://localhost:3000/](http://localhost:3000/)

## Release

`npm version patch`

or

`npm version minor`

or

`npm version major`
