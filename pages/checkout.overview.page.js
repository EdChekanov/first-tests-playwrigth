import { BasePage } from './base.page';

export class CheckoutOverviewPage extends BasePage {
  constructor(page) {
    super(page);

    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.totalPrice = page.locator('[data-test="total-label"]');
    this.finishBtn = page.locator('[data-test="finish"]');
  }

  async finishCheckout() {
    this.finishBtn.click();
  }
}
