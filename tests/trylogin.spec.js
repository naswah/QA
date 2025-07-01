const { test, expect } = require('@playwright/test');
import {newLoginPage} from '../pageObjects/trylogin.po.js';
const testdata = require ('../fixtures/loginFixture.json')

test.beforeEach(async ({page})=>{
    await page.goto('/'); 
})

test.describe('Login verify', ()=>{
    test("Valid username and password", async ({page})=>{
        const login = new newLoginPage(page);
        await login.newlogin(testdata.validUser.username, testdata.validUser.password);
        await login.verifyLogin();
    })
})