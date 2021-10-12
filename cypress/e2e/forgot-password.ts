/// <reference path="../support/index.d.ts" />

describe("Forgot password", () => {
  it("should fill the input and get a success message", () => {
    cy.intercept("POST", "**/auth/forgot-password", (res) => {
      res.reply({
        status: 200,
        body: { ok: true }
      });

      expect(res.body.email).to.eq("ci@wongames.com");
    });

    cy.visit("/forgot-password");
    cy.findAllByPlaceholderText(/e-mail/i).type("ci@wongames.com");
    cy.findByRole("button", { name: /send e-mail/i }).click();

    cy.findByText(/you just received an e-mail/i).should("exist");
  });

  it("should fill the input with invalid email and receive error", () => {
    cy.intercept("POST", "**/auth/forgot-password", (res) => {
      res.reply({
        status: 400,
        body: {
          error: "Bad Request",
          message: [
            {
              messages: [
                {
                  message: "This email does not exist"
                }
              ]
            }
          ]
        }
      });
    });

    cy.visit("/forgot-password");
    cy.findAllByPlaceholderText(/e-mail/i).type("false@wongames.com");
    cy.findByRole("button", { name: /send e-mail/i }).click();

    cy.findByText(/this email does not exist/i).should("exist");
  });
});
