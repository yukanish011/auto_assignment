import { expect, type Page } from '@playwright/test';

export class PlansPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('plans.html');
    await expect(this.page.getByRole('heading', { name: '宿泊プラン一覧' })).toBeVisible();
  }

  /** 一覧末尾の Ajax 読み込みが終わるまで待つ（先頭のおすすめカードは静的） */
  async waitForPlanListReady() {
    const list = this.page.locator('#plan-list');
    await expect(list.locator('.spinner-border')).toHaveCount(0, { timeout: 30_000 });
    await expect(list.getByRole('link', { name: 'このプランで予約' }).first()).toBeVisible({
      timeout: 20_000,
    });
  }

  /**
   * おすすめ枠の「このプランで予約」（target=_blank の新規タブ）
   */
  async openRecommendedPlanInNewTab() {
    const popupEvent = this.page.waitForEvent('popup');
    await this.page
      .locator('.card')
      .filter({ has: this.page.getByText('お得な特典付きプラン') })
      .getByRole('link', { name: 'このプランで予約' })
      .click();
    const popup = await popupEvent;
    await popup.waitForLoadState('domcontentloaded');
    return popup;
  }
}
