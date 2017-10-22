## Preloader

##### Components

* spinner
* close

##### Modifiers

* loaded

### Quick Look

> It is recommended to place the preloader at the top of the `body` HTML element

```html
<div class="preloader">
    <div class="preloader_spinner"></div>
</div>
```

### Options

For default values view the [`preloader.json`](preloader.json) file. Standard CSS properties for modules, components and modifiers are not documented below - [learn more](https://github.com/esr360/Synergy/wiki/Configuring-a-Module#pass-custom-css-to-modules).

<table class="table">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>The name used when generating the CSS selector</td>
        </tr>
        <tr>
            <td>spinner</td>
            <td>The value to pass to the <a href="http://franzheidl.github.io/spinners/">spinner</a> mixin</td>
        </tr>
        <tr>
            <td>visible-at</td>
            <td>The minimum width at which the preloader should be visible</td>
        </tr>
    </tbody>
</table>

Pass custom options to the `preloader` object in your theme's config file (e.g. [themes/One-Nexus/config.json](../../../themes/One-Nexus/config.json)):

> Look at the [Spinners](http://franzheidl.github.io/spinners/) example page for more Spinner examples

```json
{
    "app": {
        "preloader": {
            "spinner": ["6px double fuchsia"],
        }
    }
}
```

### Sass

Load the Preloader styles in your theme's main `scss` file (e.g. [themes/One-Nexus/One-Nexus.scss](../../../themes/One-Nexus/One-Nexus.scss)) by including the `preloader()` mixin:

```scss
@import '../../app';
@import './config.json';

@include preloader();
```

### JavaScript

Call the `preloader()` function in your theme's main `js` file (e.g. [themes/One-Nexus/One-Nexus.js](../../../themes/One-Nexus/One-Nexus.js)):

```js
import * as app from '../../app';
import config from './config.json';

app.theme = config.app;

app.preloader();
```

#### API

##### Show

```js
app.preloader().show();
```

##### Hide

```js
app.preloader().hide();
```

##### Toggle

```js
app.preloader().toggle();
```

### Examples

#### With Preloader-Close Button

> Any element with the `preloader_close` class can close the preloader

```html
<div class="preloader">
    <div class="preloader_spinner"></div>
    <div class="preloader_close">
        <button class="button">Disable Preloader</button>
    </div>
</div>
```