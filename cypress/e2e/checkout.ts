/// <reference path="../support/index.d.ts" />

import { createUser, User } from "../support/generate";

describe("Checkout", () => {
  let user: User;

  describe("Free games", () => {
    before(() => {
      user = createUser();
    });

    it("should buy free games", () => {
      // cria usuário
      cy.visit("/sign-up");
      cy.signUp(user);
      cy.url().should("eq", `${Cypress.config().baseUrl}/`);

      // ir para explore page
      cy.findByRole("link", { name: /explore/i }).click();
      cy.url().should("eq", `${Cypress.config().baseUrl}/games`);

      // filtrar por jogos free
      cy.findByText(/free/i).click();
      cy.url().should("contain", "price_lte=0");

      // adiciona um jogo ao carrinho
      cy.addToCartByIndex(0);

      // verificar se o carrinho tem item
      cy.findAllByLabelText(/cart items/i)
        .first()
        .should("have.text", 1)
        .click();

      // clicar para fazer a compra e ir para a página de checkout
      cy.getByDataCy("cart-list").within(() => {
        cy.findByRole("link", { name: /buy it now/i }).click();
      });

      // encontrar texto de free games
      cy.findByText(/click buy and enjoy your free games/i).should("exist");

      // clicar para comprar
      cy.findByRole("button", { name: /buy now/i }).click();

      // redirecionar para página de success
      cy.url().should("eq", `${Cypress.config().baseUrl}/success`);
      cy.findByRole("heading", {
        name: /your purchase was successful!/i
      }).should("exist");
    });

    it("should show games in order page", () => {
      cy.visit("/profile/orders");
      cy.location("href").should(
        "eq",
        `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/orders`
      );

      cy.signIn(user);
      cy.location("href").should(
        "eq",
        `${Cypress.config().baseUrl}/profile/orders`
      );

      cy.getByDataCy("game-item").should("have.length", 1);
    });
  });

  describe("Paid games", () => {
    before(() => {
      user = createUser();
    });

    it("should buy paid games", () => {
      // cria usuário
      cy.visit("/sign-up");
      cy.signUp(user);
      cy.url().should("eq", `${Cypress.config().baseUrl}/`);

      // ir para explore page
      cy.findByRole("link", { name: /explore/i }).click();
      cy.url().should("eq", `${Cypress.config().baseUrl}/games`);

      // filtrar do preço maior para o menor
      cy.findByText(/highest to lowest/i).click();
      cy.location("href").should("contain", "sort=price%3Adesc");

      // adiciona um jogo ao carrinho
      cy.addToCartByIndex(0);

      // verificar se o carrinho tem item
      cy.findAllByLabelText(/cart items/i)
        .first()
        .should("have.text", 1)
        .click();

      // clicar para fazer a compra e ir para a página de checkout
      cy.getByDataCy("cart-list").within(() => {
        cy.findByRole("link", { name: /buy it now/i }).click();
      });

      // botão de comprar precisa estar desabilitado
      cy.findByRole("button", { name: /buy now/i }).should(
        "have.attr",
        "disabled"
      );

      // preencher com cartão de crédito
      cy.fillElementsInput("cardNumber", "4242424242424242");
      cy.fillElementsInput("cardExpiry", "1040");
      cy.fillElementsInput("cardCvc", "104");

      // clicar para comprar
      cy.findByRole("button", { name: /buy now/i }).click();

      // redirecionar para página de success
      cy.wait(2000);
      cy.url().should("eq", `${Cypress.config().baseUrl}/success`);
      cy.findByRole("heading", {
        name: /your purchase was successful!/i
      }).should("exist");
    });

    it("should show games in order page", () => {
      cy.visit("/profile/orders");
      cy.location("href").should(
        "eq",
        `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/orders`
      );

      cy.signIn(user);
      cy.location("href").should(
        "eq",
        `${Cypress.config().baseUrl}/profile/orders`
      );

      cy.getByDataCy("game-item").should("have.length", 1);
    });
  });
});
