# Browsee Web SDK

[Browsee](https://browsee.io) helps you understand your users better.
Browsee's web SDK lets you install Browsee on SPAs or website without having to
install javascript manually. Learn more about Browsee at https://docs.browsee.io.

This SDK supports Service Side Rendered (SSR) as well as non-SSR setups.

## Install the SDK

#### with npm

```
npm i @browsee/web-sdk --save
```

#### with yarn
```
yarn add @browsee/web-sdk
```

## Usage

* `import browsee from '@browsee/web-sdk'`;

* Call the `init()` function with your project's API key either in the main component or in the components where you would like to start Browsee sessions.

### API Key

You need a valid `apiKey` for this SDK. More about getting your API key [here](https://docs.browsee.io/integration/sdk-integration).

### Examples

#### React

```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import browsee from '@browsee/web-sdk';
import * as serviceWorker from './serviceWorker';

browsee.init({ apiKey: '<Your API Key>' });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

#### Next

Assuming universal layout pattern.

```JSX
import Head from "next/head";

import browsee from '@browsee/web-sdk'

browsee.init({ apiKey: '<Your API Key>' });

export default function Layout(props) {
  return (
    ...
  )
}
```

#### Angular

```javascript
import { Component } from '@angular/core';
import browsee from '@browsee/web-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '...';

  constructor() {
    browsee.init({ apiKey: '<Your API Key>' });
  }
}
```

#### Vue

```javascript
import Vue from 'vue';
import App from './App.vue';
import browsee from '@browsee/web-sdk';

browsee.init({ apiKey: '<Your API Key>' });

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## API calls

Just like client side API, you can use `browsee` object to send events, identify
users, or get session URL.

### Sending custom events

```JavaScript
browsee.identify('User ID', {name:...});

browsee.logEvent('Event Name', {key: value, ...});

browsee.getSessionUrl(function(url) { console.log('Current session', url); });
```

Learn more about these APIs [here](https://docs.browsee.io/integration/api-calls).
