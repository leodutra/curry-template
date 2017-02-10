# curry-template
**Create curried templates from common JS structures using ES6 syntax**

## Install
In a browser:
```html
<script src="curry-template.js"></script>
```

Using npm:
```shell
$ npm i -g npm
$ npm i --save curry-template
```

## Usage

### curryTemplate(String, Object) -> String
```js
var curryTemplate = require('curry-template');
var buildPath = curryTemplate('/api/users/${id}/');
buildPath({id: '549873456448'}); // -> "/api/users/549873456448/"
```

### curryTemplate(Object, Object) -> Object
```js
var configTemplate = {
    a: ['/api/users/${id}/${action}'],
    b: { 
        deep: {
            foo: [
                { 
                    stuff: 'DEFAULT_ENV=${env}'
                }
            ] 
        }
    },
    c: function() { console.log('avoided') },
    d: /keepRegExp/gim,
    e: 'keep simple texts',
    f: 10
};
var defaults = {action: 'defaultAction', env: '/usr/bin/bash'};
var configBuilder = curryTemplate(configTemplate, defaults);
configBuilder({id: '549873456448'}); 
/* -> {
        a: ["/api/users/549873456448/defaultAction"],
        b: {
            deep: {
                foo: [{
                    stuff: "DEFAULT_ENV=/usr/bin/bash"
                }]
            }
        },
        c: function() { console.log('avoided') },
        d: /keepRegExp/gim,
        e: "keep simple texts",
        f: 10
    }
*/
```

### curryTemplate(String, Array) -> String
```js
var arrayBuildPath = curryTemplate('/api/users/${0}/${1}/${2}', [null, null, 'ascending']);
arrayBuildPath(['549873456448', 'getUser']); // -> "/api/users/549873456448/getUser/ascending"
```