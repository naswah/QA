const { expect } = require('@playwright/test');
exports.newLoginPage= class newLoginPage{
    constructor(page){
        this.page=page;
        this.email="//input[@id= 'email']";
        this.password="#password";
        this.submit= "#submit";
        this.validateLogin="//h1[contains(text(), 'Contact List')]";
    }

    async newlogin(username, password){
        await this.page.locator(this.email).fill(username);
        await this.page.locator(this.password).fill(password);
        await this.page.locator(this.submit).click();
    }

    async verifyLogin(){
        const LoginValidation= await this.page.locator(this.validateLogin);
        await this.page.waitForTimeout(2000);
        await expect(LoginValidation).toHaveText('Contact List');
    }
}