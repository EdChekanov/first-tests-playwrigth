import { BasePage } from './base.page';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);

    //откуда брать список?
    this.products = [];

    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
  }

  async goToCheckout() {
    await this.checkoutBtn.click();
  }

  async getFirstProductTitle() {
    return this.page.locator(
      "//div[@class='cart_list']/div[@class='cart_item'][1]/div[@class='cart_item_label']/a/div[@class='inventory_item_name']"
    ).innerText();
  }
}
