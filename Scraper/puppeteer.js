const puppeteer = require("puppeteer");

// Puppeteer funciona de forma asíncrona, então tudo deve ser inserido dentro de uma async IIFE.
(async () => {
  let links = [];

  // Executar o Puppeteer
  const browser = await puppeteer.launch();

  // Criar uma nova página

  const page = await browser.newPage();

  // Ir para Url

  await page.goto("https://plainenglish.io/blog");

  // Informar o tamanho da página

  await page.setViewport({ width: 1080, height: 1024 });

  // CSS Selector para o elemento

  const element = ".PostPreview_container__f8slr";

  // Pegar todos os elementos correspondentes

  const elements = await page.$$(element);

  // Envolver com Promise.all para esperar com que todas promises sejam resolvidas antes de continuar

  const _links = await Promise.all(
    // Pegar o atributo href de cada elemento
    elements.map(async (el) => el.evaluate((el) => el.children[0].href))
  );
  // Se houver algum link
  if (_links.length) {
    // Passar o loop por cada link
    _links.forEach((url) => {
      // Adicionar o link no array de links.
      links.push(url);
    });
  }

  console.log(links);

  await browser.close();
})();
