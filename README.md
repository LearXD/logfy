# Logfy - 

A Beauty Logger with colors for NodeJS...

<br>
<image src="./assets/images/icon.png"/>
<br>

# Instalation

```
npm i --save logfy
```

OR

```
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
## Default code
```js
// Simple usage

logfy.info("Server started! 😎");
logfy.alert("Something important! 😮");
logfy.debug("Packet received! 😴");
logfy.error("3 errors are found! 😱");
logfy.ok("Build complete! 🔨");

// Alternative/Custom usage

const options = {
    alertLevel: logfy.HIGH_LOG_LEVEL
};

const Logger = logfy.Logfy(options);

Logger.registerLogger('customName', 
    {
        symbol: '🚀',
        label: 'CUSTOM',
        labelBackgroundColor: '#5D3FD3',
        backgroundColor: '#3b3b3b',
        level: 0
    }
)

Logger.customName("A MESSAGE... 😁")
```

# License
MIT