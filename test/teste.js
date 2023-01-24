import logfy from "../src/index.js";

const Logger = new logfy();

Logger.registerLogger('custom', 
{
   symbol: '🚀',
   label: 'CUSTOM',
   labelBackgroundColor: '#5D3FD3',
   backgroundColor: '#3b3b3b',
   level: 0
})

Logger.custom("Teste de logger para o CUSTOM!!!!")

console.log("\n")
Logger.info("Teste de logger para INFO!!!!")
console.log("\n")
Logger.alert("Teste de logger para ALERT!!!!")
console.log("\n")
Logger.warn("Teste de logger para o aliase de ALERT, o WARN!!!!")
console.log("\n")
Logger.debug("Teste de logger para o DEBUG")
console.log("\n")
Logger.error("Teste de logger para o ERROR")
console.log("\n")
Logger.ok("Teste de logger para o OK")
console.log("\n")

setInterval(() => {
    Logger.success("Teste logger temporário!")
}, 1000);