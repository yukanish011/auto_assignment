import { test } from '@playwright/test';
import { ConfirmPage } from '../pages/ConfirmPage';
import { LoginPage } from '../pages/LoginPage';
import { MyPage } from '../pages/MyPage';
import { PlansPage } from '../pages/PlansPage';
import { ReservePage } from '../pages/ReservePage';

/**
 * シナリオ1: 登録済みユーザーでログインし、宿泊予約を完了できること
 * （プラン一覧 → おすすめプラン → 予約フォーム → 確認 → 完了モーダル）
 */
test.describe('ログインから宿泊予約', () => {
  test('プレミアム会員が予約フローを通せる', async ({ page }) => {
    const login = new LoginPage(page);
    const my = new MyPage(page);
    const plans = new PlansPage(page);

    await login.open();
    await login.signIn('ichiro@example.com', 'password');
    await my.expectLoaded();
    await my.expectUser('ichiro@example.com');

    await plans.open();
    await plans.waitForPlanListReady();

    const reserveTab = await plans.openRecommendedPlanInNewTab();
    const reserve = new ReservePage(reserveTab);
    await reserve.expectLoaded();
    await reserve.chooseNoContactFollowup();
    await reserve.goToConfirm();

    const confirm = new ConfirmPage(reserveTab);
    await confirm.expectLoaded();
    await confirm.finalizeReservation();
  });
});
