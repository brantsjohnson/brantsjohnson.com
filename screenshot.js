const puppeteer = require('puppeteer');

const routes = [
  { url: 'http://localhost:3000/', filename: 'home.png' },
  { url: 'http://localhost:3000/about', filename: 'about.png' },
  { url: 'http://localhost:3000/experience', filename: 'experience.png' },
  { url: 'http://localhost:3000/leadership', filename: 'leadership.png' },
  { url: 'http://localhost:3000/service', filename: 'service.png' },
  { url: 'http://localhost:3000/projects', filename: 'projects.png' }
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  for (const route of routes) {
    console.log(`Capturing ${route.filename}...`);
    await page.goto(route.url, { waitUntil: 'networkidle0' });
    await page.screenshot({
      path: `/opt/cursor/artifacts/screenshots/${route.filename}`,
      fullPage: true
    });
    console.log(`Saved ${route.filename}`);
  }
  
  await browser.close();
  console.log('All screenshots captured!');
})();
