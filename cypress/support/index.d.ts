// load type definitions from Cypress module
/// <reference types="cypress" />

type UserAttributes = {
  username: string;
  email: string;
  password: string;
};

type ShowcaseAttributes = {
  name: string;
  highlight?: boolean;
};

type FieldAttributes = {
  label: string;
  name: string | number;
};

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to get element by data-cy value
     * @example cy.getByDataCy("selector")
     */
    getByDataCy(selector: string): Chainable<Element>;

    /**
     * Custom command to get fields from imported object
     * @example cy.getFields("selector")
     */
    getFields(fields: FieldAttributes[]): Chainable<Element>;

    /**
     * Custom command to check if value is less than price
     * @example cy.shouldBeLessThan(100)
     */
    shouldBeLessThan(value: number): Chainable<Element>;

    /**
     * Custom command to check if value is greater than price
     * @example cy.shouldBeGreaterThan(50)
     */
    shouldBeGreaterThan(value: number): Chainable<Element>;

    /**
     * Custom command to check banner in page
     * @example cy.shouldRenderBanner()
     */
    shouldRenderBanner(): Chainable<Element>;

    /**
     * Custom command to check showcase in page
     * @example cy.shouldRenderShowcase()
     */
    shouldRenderShowcase(attrs: ShowcaseAttributes): Chainable<Element>;

    /**
     * Custom command to sign up
     * @example cy.signUp(user)
     */
    signUp(user: UserAttributes): Chainable<Element>;

    /**
     * Custom command to sign in
     * @example cy.signIn(user)
     */
    signIn(
      user?: Pick<UserAttributes, "email" | "password">
    ): Chainable<Element>;

    /**
     * Custom command to add to cart by index
     * @example cy.addToCartByIndex(index)
     */
    addToCartByIndex(index: number): Chainable<Element>;

    /**
     * Custom command to remove from cart by index
     * @example cy.removeFromCartByIndex(index)
     */
    removeFromCartByIndex(index: number): Chainable<Element>;
  }
}
