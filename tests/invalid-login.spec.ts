import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * シナリオ2: 誤ったパスワードではログインできず、フォーム側のエラー表示になること
 * （マイページへは進まない）
 */
test.describe('ログイン失敗', () => {
  test('存在するメールでもパスワードが違えば弾かれる', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.signIn('ichiro@example.com', 'definitely-not-the-password');

    await expect(page).toHaveURL(/login\.html/);
    await login.expectValidationShown();
  });
});
