import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('#login-form');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#login-button');
  }

  async open() {
    await this.page.goto('login.html');
    await expect(this.page.getByRole('heading', { name: 'ログイン' })).toBeVisible();
  }

  async signIn(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectValidationShown() {
    await expect(this.form).toHaveClass(/was-validated/);
  }
}
