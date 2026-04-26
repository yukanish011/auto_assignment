import { expect, type Locator, type Page } from '@playwright/test';

export class MyPage {
  readonly page: Page;
  readonly emailDisplay: Locator;
  readonly rankDisplay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailDisplay = page.locator('#email');
    this.rankDisplay = page.locator('#rank');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/mypage\.html/);
    await expect(this.page.getByRole('heading', { name: /マイページ/ })).toBeVisible();
  }

  async expectUser(email: string) {
    await expect(this.emailDisplay).toHaveText(email);
  }
}
