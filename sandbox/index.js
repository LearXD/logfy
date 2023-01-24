import logfy, { HIGH_LOG_LEVEL, Logfy } from '../src/index.js'

logfy.println()

logfy.info("LogFy");
logfy.alert("A powerful logger for NodeJS");
logfy.error("Debbug your code with ease... ");
logfy.debug({ name: "Jhon", age: 18 });

logfy.println()

const logger = new Logfy({ logLevel: HIGH_LOG_LEVEL});
logger.registerLogger('awasomeName', {
    symbol: '🚀',
    label: 'CUSTOM',
    labelBackgroundColor: '#5D3FD3',
    backgroundColor: '#3b3b3b',
    level: 0
})

logger.awasomeName("With custom loggers...");

logfy.println()
