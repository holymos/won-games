/// <reference path="../support/index.d.ts" />

describe("Home Page", () => {
  it("should render home sections", () => {
    cy.visit("/");

    cy.shouldRenderBanner();
    cy.shouldRenderShowcase({ name: "New games" });
    cy.shouldRenderShowcase({ name: "Most popular", highlight: true });
    cy.shouldRenderShowcase({ name: "Coming soon", highlight: true });
    cy.shouldRenderShowcase({ name: "Free games", highlight: true });
  });
});
