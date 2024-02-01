# APIDiscovery
Created with CodeSandbox

### Dependancies (Import bootstrap and JQuery if not imported already)
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
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
    <script defer="defer" src="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_WebApp_SoftwareDiscovery@2.0.11/build/static/js/main.js"></script>
    <link href="https://cdn.jsdelivr.net/gh/access-ci-org/Operations_WebApp_SoftwareDiscovery@2.0.11/build/static/css/main.css" rel="stylesheet">

    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="Operations_WebApp_SoftwareDiscovery"></div>
```