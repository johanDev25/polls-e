const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const app = require("../src/index");


let server;
let page;
let browser;
let nav;

beforeAll(async () => {
   browser = await puppeteer.launch();
   page = await browser.newPage();
})

beforeEach(async () => {
  for (var i in mongoose.connection.collections) {
    await mongoose.connection.collections[i].remove({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await browser.close();
});

test("user can register and login", async () => {
  await page.goto("http://localhost:3000/signin");
  await page.click('a[href="/signup"]');

  // registrarse
  await page.waitFor('input[id=inputEmail]');
  await page.type("input[id=inputEmail]", "pedro@gmail.com");
  await page.type("input[id=inputPassword]", "test1234");
  nav = page.waitForNavigation();
  await page.click("button[type=submit]");
  await nav;

  // login
  expect(page.url()).toBe("http://localhost:3000/signin");
  await page.type("input[id=inputEmail]", "pedro@gmail.com");
  await page.type("input[id=inputPassword]", "test1234");
  nav = page.waitForNavigation();
  await page.click("button[type=submit]");
  await nav;

  //logout
  expect(page.url()).toBe("http://localhost:3000/");
  await page.click('a[href="/logout"]');

});
