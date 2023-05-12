# Logfy 🌟 ~~> Log✨ + Beauty⭐ 

<div align="center">
  <image src="./assets/icon.png"/>
</div>

# Instalation

```bash
npm i --save logfy
```

OR

```bash
npm i --save github.com/LearXD/logfy
```

# Usage

## Java Script

```js
const logfy = require('logfy');
```
## TypeScript or ES6
```ts
import logfy from 'logfy';
```
## Usage
```js
logfy.info("Server started! 😎");
logfy.alert("Something important! 😮");
logfy.debug("Packet received! 😴");
logfy.error("3 errors are found! 😱");
logfy.ok("Build complete! 🔨");

logfy.registerLogger('customName', {
        symbol: '🚀',
        label: 'CUSTOM',
        prefixBackground: '#5D3FD3',
        contentBackground: '#3b3b3b'
})

logfy.customName("A MESSAGE... 😁")

```


# License
MIT