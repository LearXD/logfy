const Logger = require('../dist/index').default;

describe("Testando o logfy...", () => {

  it("Registrando loggers", () => {
    Logger.Logfy.registerLogger('custom',
      {
        symbol: '🚀',
        label: 'CUSTOM',
        labelBackgroundColor: '#5D3FD3',
        backgroundColor: '#3b3b3b',
        level: 0
      })
  });

  const { loggers } = Logger.Logfy;

  describe("Testando individualmente cada Logger...", () => {
    it("Teste de logger para o CUSTOM...", () => {
      loggers.custom("Hello World!")
    });
    it("Teste de logger para INFO...", () => {
      Logger.info("Hello World!")
    });
    it("Teste de logger para ALERT...", () => {
      Logger.alert("Hello World!")
    });
    it("Teste de logger para o aliase de ALERT, o WARN...", () => {
      Logger.warn("Hello World!")
    });
    it("Teste de logger para o DEBUG...", () => {
      Logger.debug("Hello World!")
    });
    it("Teste de logger para o ERROR...", () => {
      Logger.error("Hello World!")
    });
    it("Teste de logger para o OK...", () => {
      Logger.ok("Hello World!")
    });

    it("Teste de desfragmentação de aray...", () => {
      Logger.success("Minha array: ", ["Miguel", 18, "M"]);
    });

    it("Teste de desfragmentação de Objeto...", () => {
      Logger.success("Meu objeto: ", { "nome": "Miguel", "idade": 18, "sexo": "M" })
    });

    it("Teste de desfragmentação de Classe...", () => {
      Logger.success("Minha classe: ", Logger)
    });

    it("Teste de Logger após 1s...", () => {
      const startTime = Date.now();
      while (Date.now() - startTime < 1000);
      Logger.success("OK!!!")
    });
  })

});
