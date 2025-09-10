import { assert } from "console";
import { BasePage } from "./base.page";

export class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page);

    this.title = page.locator('[data-test="complete-header"]');
    this.backHomeBtn = page.locator('[data-test="back-to-products"]')
  }

  async getCompletionMessage() {
    return await this.title.innerText();
  }
}
