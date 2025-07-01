const { expect } = require('@playwright/test');

exports.ContactPage = class LoginPage {
    // Here the class with constructor is defined, inside constructor the locators are defined
    // The locators are defined using CSS selectors or XPath
    constructor(page){
        this.page=page;
        this.firstNameInput = '//input[@placeholder= "First Name"]';
        this.lastNameInput = '//input[@placeholder="Last Name"]';
        this.dob= '//input[@placeholder="yyyy-MM-dd"]';
        this.email = '//input[@id="email"]';
        this.phone = '//input[@id="phone"]';
        this.street1 = '//input[@id="street1"]';
        this.street2 = '//input[@id="street2"]';
        this.city = '//input[@id="city"]';
        this.stateProvince = '//input[@id="stateProvince"]';
        this.postalCode= '//input[@id="postalCode"]';
        this.country= '//input[@id="country"]';
        this.submit= '//button[@id = "submit"]';
        this.contactValidation= '//h1[text() = "Contact List"]';
        this.edit= "#edit-contact";
        this.viewContactButton= '#view-contact'; //assume a button to view contact exists
    }

    async addContact(firstNameInput,lastNameInput,dob,email,phone,street1,street2,city,stateProvince,postalCode,country,submit,cancel){
        await this.page.locator(this.firstNameInput).fill(firstNameInput);
        await this.page.locator(this.lastNameInput).fill(lastNameInput);
        await this.page.locator(this.dob).fill(dob);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.street1).fill(street1);
        await this.page.locator(this.street2).fill(street2);
        await this.page.locator(this.city).fill(city);
        await this.page.locator(this.stateProvince).fill(stateProvince);
        await this.page.locator(this.postalCode).fill(postalCode);
        await this.page.locator(this.country).fill(country);
        await this.page.locator(this.submit).click();
        
        // await this.page.locator(this.cancel).click();
    }

    async verifyContactPage(){
        const contactValidation= await this.page.locator(this.contactValidation);
        await this.page.waitForTimeout(2000);
        expect (this.logout).toBeVisible;
        await expect(contactValidation).toHaveText('Contact List');
    }

     async validateContact(firstNameInput,lastNameInput,dob,email,phone,street1,street2,city,stateProvince,postalCode,country,submit,cancel){
        const fNameValidation= await this.page.locator(this.firstNameInput);
        const lNameValidation= await this.page.locator(this.lastNameInput);
        const dobValidation= await this.page.locator(this.dob);
        const emailValidation = await this.page.locator(this.email);
        const phoneValidation= await this.page.locator(this.phone);
        const street1Validation= await this.page.locator(this.street1);
        const street2Validation= await this.page.locator(this.street2);
        const cityValidation= await this.page.locator(this.city);
        const stateProvinceValidation= await this.page.locator(this.stateProvince);
        const postalCodeValidation= await this.page.locator(this.postalCode);
        const countryValidation=  await this.page.locator(this.country);

        await expect (fNameValidation).toHaveText(firstNameInput);
        await expect (lNameValidation).toHaveText(lastNameInput);
        await expect (dobValidation).toHaveText(dob);
        await expect (emailValidation).toHaveText(email);
        await expect (phoneValidation).toHaveText(phone);
        await expect (street1Validation).toHaveText(street1);
        await expect (street2Validation).toHaveText(street2);
        await expect (cityValidation).toHaveText(city);
        await expect (stateProvinceValidation).toHaveText(stateProvince);
        await expect (postalCodeValidation).toHaveText(postalCode);
        await expect (countryValidation).toHaveText(country);

    }

   async viewContact(firstName, lastName){
        const fullName = `${firstName} ${lastName}`;
        const contactRowselector = this.page.locator('//tr[td[contains(text(), "' + fullName + '")]]');
        await contactRowselector.waitFor( {timeout: 5000} );
        await contactRowselector.ckick();
        await this.page.waitForTimeout(2000); 

    }

// async viewContact(){
//     await this.page.locator(this.viewContactButton).click();
// }

    async EditContact(firstName){
        // click on the edit button after viewing the contact
        await this.page.locator(this.editButton).click();

        // select the first name input field
        const FirstName = await this.page.locator(this.firstNameInput);

        //clear the first name input field
        await FirstName.fill('');

        //fill the updated first name in input field
        await FirstName.fill(firstName);
        await this.page.waitForTimeout(2000);

        // click on the submit button to save the changes
        await this.page.locator(this.submitButton).click();
        await this.page.waitForTimeout(2000); // Wait for 2 seconds to ensure the contact is updated
    }

    // async contactEdit(firstName){
    //     await this.page.locator(this.EditContact).click();
    //     await this.page.locator.waitForTimeout(2000);
    //     await this.page.locator(this.firstName).clear();
    //     await this.page.locator.waitForTimeout(2000);
    //     await this.page.locator(this.Save).click();
    // }

    async deleteContact(){
        await this.page.waitForTimeout(2000);
        this.page.once('dialog', async dialog =>{
            console.log(`Dialog message: ${dialog.message()}`); 
            await dialog.accept();//use dialog.dismiss() if you want to cancel instead
        });
        await this.page.locator(this.deleteContact).click();
    }
}
