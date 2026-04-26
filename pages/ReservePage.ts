import { expect, type Locator, type Page } from '@playwright/test';

export class ReservePage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly contactSelect: Locator;
  readonly usernameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.locator('#submit-button');
    this.contactSelect = page.locator('#contact');
    this.usernameInput = page.locator('#username');
  }

  async expectLoaded() {
    await expect(this.page.getByRole('heading', { name: '宿泊予約' })).toBeVisible();
    await expect(this.submitButton).toBeEnabled({ timeout: 30_000 });
  }

  async chooseNoContactFollowup() {
    await this.contactSelect.selectOption('no');
  }

  async goToConfirm() {
    await this.submitButton.click();
    await this.page.waitForURL(/confirm\.html/, { timeout: 15_000 });
  }
}
