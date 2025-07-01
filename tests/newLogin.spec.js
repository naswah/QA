const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/newLogin.po.js');
const testData = require('../fixtures/loginFixture.json');


test.beforeEach(async ({ page }) => {
    await page.goto('/');  //base URL is set in playwright.config.js. So that we can always refer to that URL whenever we use /
})

test.describe('Login Tests', () => {
    test('Login using valid username and password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.validUser.username, testData.validUser.password);
        await login.verifyValidLogin();
    })
})

test.describe('Login Invalid Tests',() =>  {
    test('Login using invalid username and password', async ({ page }) => {
        const login = new LoginPage(page);
        // await login.login("nash123@gmail.com", "123@mdr");
        await login.login(testData.invalidUser.username, testData.invalidUser.password);s
        await login.verifyInvalidLogin();
    })
})

test('Login using valid username and invalid password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login("nashmdr123@gmail.com", "12345");
    await login.verifyInvalidLogin();
})

test('Login using invalid username and valid password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login("nashmdr@gmail.com", "Nash!123@mdr");
    await login.verifyInvalidLogin();
})

test('Login using empty username and password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login("", "");
    await login.verifyInvalidLogin();
})

test('Login using empty username and valid password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login("", "Nash!123@mdr");
    await login.verifyInvalidLogin();
})
test('Login using empty username and invalid password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login("", "hello");
    await login.verifyInvalidLogin();
})

test('Login using valid username and empty password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login("nashmdr123@gmail.com", "");
    await login.verifyInvalidLogin();
})

test('Login using invalid username and empty password', async ({page}) => {
    const login = new LoginPage(page);
    await login.login("hello@gmail.com", "");
    await login.verifyInvalidLogin();
})

test.afterEach(async ({page})=>{
    await page.close();
})