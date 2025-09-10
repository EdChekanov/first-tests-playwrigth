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
}
