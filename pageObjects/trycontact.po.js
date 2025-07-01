const { expect } = require('@playwright/test');

exports.tryContactPage = class tryContactPage{
    constructor(page){
        this.page= page;
        this.fName= "#firstName";
        this.lName= "#lastName";
        this.dob= "#birthdate";
        this.email="#email";
        this.phone="#phone";
        this.s1= "#street1";
        this.s2= "#street2";
        this.city="#city";
        this.sp= "#stateProvince";
        this.pCode = "#postalCode";
        this.country= "#country";
        this.submit="#submit";
        this.contactValidation= '//h1[text() = "Contact List"]';
    }

    async addContact(fName, lName,dob, email,phone,s1,s2,city,sp,pCode,country){
        await this.page.locator(this.fName).fill(fName);
        await this.page.locator(this.lName).fill(lName);
        await this.page.locator(this.dob).fill(dob);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.s1).fill(s1);
        await this.page.locator(this.s2).fill(s2);
        await this.page.locator(this.city).fill(city);
        await this.page.locator(this.sp).fill(sp);
        await this.page.locator(this.pCode).fill(pCode);
        await this.page.locator(this.country).fill(country);
        await this.page.locator(this.submit).click();

    }

    async validateContact(){
        const validateContact = await this.page.locator(this.contactValidation);
        await this.page.waitForTimeout(2000);
        await expect(validateContact).toHaveText('Contact List');
    }
}