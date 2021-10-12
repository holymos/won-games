/// <reference path="../support/index.d.ts" />

describe("Reset password", () => {
  it("should show error if password does not match", () => {
    cy.visit("/reset-password?code=12345678");

    cy.findAllByPlaceholderText(/^password/i).type("123");
    cy.findAllByPlaceholderText(/confirm password/i).type("321");
    cy.findByRole("button", { name: /reset password/i }).click();

    cy.findByText(/confirm password does not match with password/i).should(
      "exist"
    );
  });

  it("should show error if code is not valid", () => {
    cy.intercept("POST", "**/auth/reset-password", (res) => {
      res.reply({
        status: 400,
        body: {
          error: "Bad Request",
          message: [
            {
              messages: [
                {
                  message: "Incorrect code provided"
                }
              ]
            }
          ]
        }
      });
    });

    cy.visit("/reset-password?code=wrong_code");

    cy.findAllByPlaceholderText(/^password/i).type("123");
    cy.findAllByPlaceholderText(/confirm password/i).type("123");
    cy.findByRole("button", { name: /reset password/i }).click();

    cy.findByText(/incorrect code provided/i).should("exist");
  });

  it("should fill the input and redirect to home page with user signed in", () => {
    cy.intercept("POST", "**/auth/reset-password", (res) => {
      res.reply({
        status: 200,
        body: { user: { email: "cypress@email.com" } }
      });
    });

    cy.intercept("POST", "**/auth/callback/credentials*", {
      statusCode: 200,
      body: { user: { email: "cypress@email.com" } }
    });

    cy.intercept("GET", "**/auth/session*", {
      statusCode: 200,
      body: { user: { name: "cypress", email: "cypress@email.com" } }
    });

    cy.visit("/reset-password?code=valid_token");

    cy.findAllByPlaceholderText(/^password/i).type("123");
    cy.findAllByPlaceholderText(/confirm password/i).type("123");
    cy.findByRole("button", { name: /reset password/i }).click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.findByText(/cypress/i).should("exist");
  });
});
