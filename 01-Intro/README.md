
# Introduction to Nodejs

What is Nodejs

Nodejs is javascript runtime environment.

A process is created.

## Modules

```js
import React from 'react';

const React =  require('react');

// npm init -y
// with "type": "module" in your package.json, you can use import
// import React from 'react';

```

### Core Modules

E.g., `fs` module which stands filesystem is a core module

### User Defined Modules

```js

function func() {

}

module.exports = {
    func
}
```

### Third Party Modules

`npm i axios`  
`npm i voucher-code-generator`  

Third party modules can be downloaded again if we delete node_modules folder or it is skipped in version control system.