import { BasePage } from './base.page';
import products from '../data/products';

export class ProductsPage extends BasePage {
  constructor(page) {
    super(page);

    this.title = page.locator('[data-test="title"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.filter = page.locator('[data-test="product-sort-container"]');

    this.products = products;

    this.addToCartLocators = {};
    this.products.forEach((item) => {
      this.addToCartLocators[item.name] = {
        locator: `[data-test="add-to-cart-${item.prefix}${item.name}"]`,
      };
    });

    this.removeFromCartLocators = {};
    this.products.forEach((item) => {
      this.removeFromCartLocators[item.name] = {
        locator: `[data-test="remove-cart-${item.prefix}${item.name}"]`,
      };
    });

    this.backpackAddToCartBtn = page.locator(
      this.addToCartLocators['backpack'].locator
    );
    this.bikeLightAddToCartBtn = page.locator(
      this.addToCartLocators['bike-light'].locator
    );
    this.boldTShirtAddToCartBtn = page.locator(
      this.addToCartLocators['bolt-t-shirt'].locator
    );
    this.fleeceJacketAddToCartBtn = page.locator(
      this.addToCartLocators['fleece-jacket'].locator
    );
    this.onesieAddToCartBtn = page.locator(
      this.addToCartLocators['onesie'].locator
    );
    this.allTheThingsAddToCartBtn = page.locator(
      this.addToCartLocators['allthethings()-t-shirt-(red)'].locator
    );

    this.backpackRemoveFromCartBtn = page.locator(
      this.removeFromCartLocators['backpack'].locator
    );
    this.bikeLightRemoveFromCartBtn = page.locator(
      this.removeFromCartLocators['bike-light'].locator
    );
    this.boldTShirtRemoveFromCartBtn = page.locator(
      this.removeFromCartLocators['bolt-t-shirt'].locator
    );
    this.fleeceJacketRemoveFromCartBtn = page.locator(
      this.removeFromCartLocators['fleece-jacket'].locator
    );
    this.onesieRemoveFromCartBtn = page.locator(
      this.removeFromCartLocators['onesie'].locator
    );
    this.allTheThingsRemoveFromCartBtn = page.locator(
      this.removeFromCartLocators['allthethings()-t-shirt-(red)'].locator
    );
  }

  async addItemToCart(itemName) {
    const product = this.products.find(product => product.title == itemName);
    await this.page
      .locator(this.addToCartLocators[product.name].locator)
      .click();
  }
  async removeItemFromCart(itemName) {
    await this.page.locator(`[data-test="remove-cart-${itemName}]`).click();
  }
  async openCart() {
    await this.cartIcon.click();
  }
  async getPageTitle() {
    return await this.title.innerText();
  }
  async sortProduct(method) {
    await this.filter.waitFor({ state: 'visible' });
    await this.filter.selectOption(method);
  }
  async getFirstProductTitle() {
    return this.page.locator(
      "//div[@class='inventory_list']/div[@class='inventory_item'][1]//div[@class='inventory_item_label']/a/div[@class='inventory_item_name ']"
    ).innerText();
  }
}
