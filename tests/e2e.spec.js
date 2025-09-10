import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInfoPage } from '../pages/checkout.info.page';
import { CheckoutOverviewPage } from '../pages/checkout.overview.page';
import { CheckoutCompletePage } from '../pages/checkout.complete.page';

test('Успешный логин и проверка страницы товаров', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage1stStep = new CheckoutInfoPage(page);
  const checkoutPage2ndStep = new CheckoutOverviewPage(page);
  const checkoutPage3rdStep = new CheckoutCompletePage(page);

  //Открыть страницу логина
  await loginPage.open();
  //Залогиниться, используя валидные данные (standard_user, secret_sauce)
  await loginPage.login('standard_user', 'secret_sauce');
  //Убедиться, что после логина открылась страница с товарами (проверить заголовок "Products")
  const pageTitle = await productsPage.getPageTitle();
  expect(pageTitle).toBe('Products');
  //Добавить в корзину самый дорогой товар на странице
  productsPage.products.sort((a, b) => +b.price - +a.price);
  const highPriceProduct = productsPage.products[0];
  await page
    .locator(
      `[data-test="add-to-cart-${highPriceProduct.prefix}${highPriceProduct.name}"]`
    )
    .click();
  //Перейти в корзину.
  productsPage.openCart();
  //Проверить, что в корзине находится именно тот товар, который вы добавили
  await expect(
    page.locator(
      "//div[@class='cart_list']/div[@class='cart_item'][1]/div[@class='cart_item_label']/a/div[@class='inventory_item_name']"
    )
  ).toContainText(highPriceProduct.title);
  //Начать оформление заказа (нажать "Checkout")
  await cartPage.goToCheckout();
  //Заполнить информацию о пользователе
  await checkoutPage1stStep.fillUserInfo('FirstName', 'LastName', '12345');
  //Продолжить оформление заказа (нажать "Continue")
  await checkoutPage1stStep.continueBtn.click();
  //Завершить покупку (нажать "Finish").
  await checkoutPage2ndStep.finishCheckout();
  //Убедиться, что заказ успешно оформлен
  const finishTitle = await checkoutPage3rdStep.getCompletionMessage();
  expect(finishTitle).toBe('Thank you for your order!');
});
