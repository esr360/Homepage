## Overlay

##### Components

* _This module has no components_

##### Modifiers

* visible

### Quick Look

```html
<div class="overlay"></div>
```

### Options

For default values view the [`overlay.json`](overlay.json) file. Standard CSS properties for modules, components and modifiers are not documented below - [learn more](https://github.com/esr360/Synergy/wiki/Configuring-a-Module#pass-custom-css-to-modules).

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
    </tbody>
</table>

Pass custom options to the `overlay` object in your theme's config file (e.g. [themes/One-Nexus/config.json](../../../themes/One-Nexus/config.json)):

```json
{
    "app": {
        "overlay": {
            "background": "rgba(black, 0.4)",
        }
    }
}
```

### Sass

Load the Overlay styles in your theme's main `scss` file (e.g. [themes/One-Nexus/One-Nexus.scss](../../../themes/One-Nexus/One-Nexus.scss)) by including the `overlay()` mixin:

```scss
@import '../../app';
@import './config.json';

@include overlay();
```

### JavaScript

Call the `overlay()` function in your theme's main `js` file (e.g. [themes/One-Nexus/One-Nexus.js](../../../themes/One-Nexus/One-Nexus.js)):

```js
import * as app from '../../app';
import config from './config.json';

app.theme = config.app;

app.overlay();
```

#### API

##### Show

```js
app.overlay().show();
```

##### Hide

```js
app.overlay().hide();
```

##### Toggle

```js
app.overlay().toggle();
```