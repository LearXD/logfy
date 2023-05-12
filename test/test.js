const Logfy = require('../dist/index').default

describe("Testando o logfy...", () => {

  it("Registrando loggers", () => {
    Logfy.registerLogger('custom',
      {
        symbol: '🚀',
        label: 'CUSTOM',
        prefixBackground: '#5D3FD3',
        contentBackground: '#3b3b3b',
        level: 0
      })
  });

  describe("Testando individualmente cada Logfy...", () => {
    it("Teste de logger para o CUSTOM...", () => {
      Logfy.custom("Hello World!")
    });
    it("Teste de logger para INFO...", () => {
      Logfy.info("Hello World!")
    });
    it("Teste de logger para ALERT...", () => {
      Logfy.alert("Hello World!")
    });
    it("Teste de logger para o aliase de ALERT, o WARN...", () => {
      Logfy.warn("Hello World!")
    });
    it("Teste de logger para o DEBUG...", () => {
      Logfy.debug("Hello World!")
    });
    it("Teste de logger para o ERROR...", () => {
      Logfy.error("Hello World!")
    });
    it("Teste de logger para o OK...", () => {
      Logfy.ok("Hello World!")
    });

    it("Teste de desfragmentação de aray...", () => {
      Logfy.success("Minha array: ", ["Miguel", 18, "M"]);
    });

    it("Teste de desfragmentação de Objeto...", () => {
      Logfy.success("Meu objeto: ", { "nome": "Miguel", "idade": 18, "sexo": "M" })
    });

    it("Teste de desfragmentação de Classe...", () => {
      Logfy.success("Minha classe: ", Logfy)
    });

    it("Teste de Logger após 1s...", () => {
      const startTime = Date.now();
      while (Date.now() - startTime < 1000);
      Logfy.success("OK!!!")
    });
  })

});
