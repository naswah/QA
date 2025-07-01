const { test, expect } = require('@playwright/test');

// import {   ContactPage } from '../pageObjects/contact.po.js';
// import { LoginPage } from '../pageObjects/newLogin.po.js';
const {ContactPage} = require('../pageObjects/contact.po.js');
const {LoginPage} = require ('../pageObjects/newLogin.po.js');
const testData= require('../fixtures/loginFixture.json');
const contactData = require('../fixtures/contactFixture.json');

test.beforeEach(async ({ page }) => {
    const login= new LoginPage(page);
    await page.goto('/');  //base URL is set in playwright.config.js. So that we can always refer to that URL whenever we use /
    await login.login(testData.validUser.username, testData.validUser.password);
    await login.verifyValidLogin();
    await page.locator('//button[@id = "add-contact"]').click();

})

// test.describe('Contact TestCases', () =>{
//     test('Test to add new contacts', async ({page, request })=>{
//         const contact= new ContactPage(page);
//         await contact.addContact(
//             contactData.validInput.firstNameInput,
//             contactData.validInput.lastNameInput,
//             contactData.validInput.dob,
//             contactData.validInput.email,
//             contactData.validInput.phone,
//             contactData.validInput.street1,
//             contactData.validInput.street2,
//             contactData.validInput.city,
//             contactData.validInput.stateProvince,
//             contactData.validInput.postalCode,
//             contactData.validInput.country
//         )
//         await contact.verifyContactPage();
//         await contact.EditContact();
//     })
// })

test.describe('Contact testcases',()=>{
    test('Test to add new contacts', async ({page, request})=>{
        const contact = new ContactPage(page);
        await contact.addContact(contactData.validInput.firstNameInput,
            contactData.validInput.lastNameInput,
            contactData.validInput.dob,
            contactData.validInput.email,
            contactData.validInput.phone,
            contactData.validInput.street1,
            contactData.validInput.street2,
            contactData.validInput.city,
            contactData.validInput.stateProvince,
            contactData.validInput.postalCode,
            contactData.validInput.country)
            await contact.viewContact();
            await contact.validateContact( contactData.validInput.lastNameInput,
            contactData.validInput.dob,
            contactData.validInput.email,
            contactData.validInput.phone,
            contactData.validInput.street1,
            contactData.validInput.street2,
            contactData.validInput.city,
            contactData.validInput.stateProvince,
            contactData.validInput.postalCode,
            contactData.validInput.country);
            accessToken= await authenticateUser(testData.validUser.username, testData.validUser.password);
            const id = await getEntity(accessToken, '/contacts','200', {request});
            await deleteEntity(accessToken,`/contacts/${id}`, {request});
            await validateEntity(accessToken,`/contacts/${id}`, '404',{request});
    })

    test.only('Contact Delete test', async ({page, request})=>{
        const Data={
        "firstName": "Hello",
        "lastName": "World",
        "birthdate" : "2003-01-01",
        "email": "helloworld@gmail.com",
        "phone": "00000000000",
        "street1": "Address1",
        "street2": "Address2",
        "city": "Bhaktapur",
        "stateProvince": "Somewhere in ktm",
        "postalCode": "11111",
        "country": "USA"
        }

        const contact = new ContactPage(page);
       const accessToken= await authenticateUser(testData.validUser.username, testData.validUser.password, {request});
       await createEntity(Data, accessToken, '/contacts', {request});
       page.reload();
       await contact.viewContact(contactData.validInput.firstNameInput, contactData.validInput.lastNameInput, );
       const id= await getEntity(accessToken, '/contacts', 200, {request});

       await contact.deleteContact();

       await validateEntity(accessToken, `/contacts/${id}`, 404, {request});
    })

})

test.describe('Contact edit test', () => {
  test('Edit existing contact', async ({ page, request }) => {
     const Data = {
        "firstName": "Hello",
        "lastName": "World",
        "birthdate" : "2003-01-01",
        "email": "helloworld@gmail.com",
        "phone": "00000000000",
        "street1": "Address1",
        "street2": "Address2",
        "city": "Bhaktapur",
        "stateProvince": "Somewhere in ktm",
        "postalCode": "11111",
        "country": "USA"
    };
     const contact = new ContactPage(page);
       const accessToken= await authenticateUser(testData.validUser.username, testData.validUser.password, {request});
       await createEntity(Data, accessToken, '/contacts', {request});
       page.reload();
       await contact.viewContact(contactData.validInput.firstNameInput, contactData.validInput.lastNameInput, );
       await contact.EditContact(contactData.EditContact.firstName);
       await contact.validateContactCreated(contactData.EditContact.firstName, contactData.EditContact.lastName, contactFixture.EditContact.dob, contactFixture.EditContact.email, contactFixture.EditContact.phone, contactFixture.EditContact.street1, contactFixture.EditContact.street2, contactFixture.EditContact.city, contactFixture.EditContact.stateProvince, contactFixture.EditContact.postalCode, contactFixture.EditContact.country);
        const id= await getEntity(accessToken, '/contacts', 200, {request});
        await deleteEntity(accessToken, `/contacts/${id}`, {request});
        await validateEntity(accessToken, `/contacts/${id}`, 404, {request});
  });
});

test.afterEach(async({page})=>{
    await page.close();
})
   