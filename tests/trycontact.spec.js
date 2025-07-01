const {test, expect }= require('@playwright/test');
const {newLoginPage} = require("../pageObjects/trylogin.po.js")
const {tryContactPage }= require("../pageObjects/trycontact.po.js")

const testdata= require("../fixtures/loginFixture.json")
const testdata2= require("../fixtures/contactFixture.json")

test.beforeEach(async ({page})=>{
    await page.goto('/'); 
    const login= new newLoginPage(page);
    await login.newlogin(testdata.validUser.username, testdata.validUser.password)
    await login.verifyLogin();
    await page.locator('//button[@id = "add-contact"]').click();
})

test.describe('Contact Cases', ()=>{
    test('Test to add contacts', async ({page})=>{
        const contact= new tryContactPage(page);
        await contact.addContact(
            testdata2.validInput.firstNameInput,
            testdata2.validInput.lastNameInput,
            testdata2.validInput.dob,
            testdata2.validInput.email,
            testdata2.validInput.phone,
            testdata2.validInput.street1,
            testdata2.validInput.street2,
            testdata2.validInput.city,
            testdata2.validInput.stateProvince,
            testdata2.validInput.postalCode,
            testdata2.validInput.country
        )
        await contact.validateContact();
    })
})