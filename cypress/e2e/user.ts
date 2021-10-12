/// <reference path="../support/index.d.ts" />

import { createUser } from "../support/generate";

describe("User", () => {
  it("should sign up", () => {
    const user = createUser();
    cy.visit("/sign-up");
    cy.signUp(user);

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.findByText(user.username).should("exist");
  });

  it("should sign in and out", () => {
    cy.visit("/sign-in");

    cy.signIn();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);

    cy.findByText(/cypress/i)
      .should("exist")
      .click();
    cy.findByText(/sign out/i).click();
    cy.findByText(/cypress/i).should("not.exist");
    cy.findByRole("link", { name: /sign in/i }).should("exist");
  });

  it("should sign in the user and redirect to the page defined previously", () => {
    cy.visit("/profile/me");

    // redirecionado para sign in com call do profile/me
    cy.location("href").should(
      "eq",
      `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/me`
    );

    // sign in
    cy.signIn();

    // redirecionado para o profile/me
    cy.location("href").should("eq", `${Cypress.config().baseUrl}/profile/me`);
    cy.findByLabelText(/username/i).should("have.value", "cypress");
    cy.findByLabelText(/e-mail/i).should("have.value", "e2e@cypress.com");
  });
});
