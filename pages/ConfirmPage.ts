import { expect, type Locator, type Page } from '@playwright/test';

export class ConfirmPage {
  readonly page: Page;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmButton = page.getByRole('button', { name: 'この内容で予約する' });
  }

  async expectLoaded() {
    await expect(this.page.getByRole('heading', { name: '宿泊予約確認' })).toBeVisible();
    await expect(this.confirmButton).toBeVisible();
  }

  async finalizeReservation() {
    await this.confirmButton.click();
    const modal = this.page.locator('#success-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('heading', { name: '予約を完了しました' })).toBeVisible();
    await modal.getByRole('button', { name: '閉じる' }).click();
    await expect(modal).toBeHidden();
  }
}
