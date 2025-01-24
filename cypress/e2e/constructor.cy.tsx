import { getRandomIngredient } from '../utils/getRandomIngredient';

describe('Application functionality tests', function () {
  beforeEach(() => {
    // Add fake tokens before the test
    cy.setCookie('accessToken', 'mocked-valid-token');
    cy.window().then((win) => {
      win.localStorage.setItem(
        'refreshToken',
        JSON.stringify('mocked-valid-refresh-token')
      );
    });

    // Mock request for fetching user
    cy.intercept('GET', '**/auth/user', { fixture: 'authLogin.json' }).as(
      'getAuthUser'
    );

    // Mock request for fetching ingredients
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients'); // Wait for data to load
  });

  afterEach(() => {
    // Clear fake tokens after the test
    cy.clearCookie('accessToken');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });

  describe('Constructor and modal functionality tests', function () {
    it('[CONSTRUCTOR-INGREDIENTS] Should add a random bun, sauce, and main ingredient to the constructor', function () {
      // Step 1: Load ingredients from the mock
      cy.fixture('ingredients.json').then((data) => {
        const ingredients = data.data;

        // Step 2: Get random ingredients
        const randomBun = getRandomIngredient(ingredients, 'bun');
        const randomMain = getRandomIngredient(ingredients, 'main');
        const randomSauce = getRandomIngredient(ingredients, 'sauce');

        // Log selected ingredients for debugging
        cy.log(`Selected bun: ${randomBun.name}`);
        cy.log(`Selected sauce: ${randomSauce.name}`);
        cy.log(`Selected main: ${randomMain.name}`);

        // Step 3: Add selected ingredients to the constructor
        [randomBun, randomMain, randomSauce].forEach((ingredient) => {
          cy.get(`[data-cy="ingredient-${ingredient._id}"]`)
            .find('button')
            .contains('Добавить')
            .click();
        });

        // Step 4: Verify that all ingredients are added to the constructor
        [randomBun, randomMain, randomSauce].forEach((ingredient) => {
          cy.get('[data-cy="constructor"]').should(
            'contain.text',
            ingredient.name
          );
        });
      });
    });

    it('Should open and close modal windows correctly', function () {
      // Step 1: Load ingredients from the mock
      cy.fixture('ingredients.json').then((data) => {
        const ingredients = data.data;

        // Step 2: Get a random ingredient
        const randomIngredient1 = getRandomIngredient(ingredients);

        // Log the selected ingredient for debugging
        cy.log(`Opening modal for ingredient: ${randomIngredient1.name}`);

        // Step 3: Click on the ingredient to open the modal
        cy.get(`[data-cy="ingredient-${randomIngredient1._id}"]`)
          .find('a')
          .click();

        // Step 4: Verify that the modal is visible with the correct content
        cy.wait(500);
        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="modal"]').should(
          'contain.text',
          randomIngredient1.name
        );

        // Step 5: Close the modal using the close button
        cy.get('[data-cy="modal-close"]').click();

        // Step 6: Verify that the modal is closed
        cy.get('[data-cy="modal"]').should('not.exist');
      });
    });

    describe('Order functionality tests', function () {
      beforeEach(() => {
        // Mock API calls for user and order functionality

        cy.intercept('POST', '**/auth/token', { fixture: 'authToken.json' }).as(
          'postAuthToken'
        );
        cy.intercept('POST', '**/api/orders', { fixture: 'orders.json' }).as(
          'postOrder'
        );
      });

      it('Should successfully create an order', function () {
        cy.fixture('ingredients.json').then((data) => {
          const ingredients = data.data;

          // Step 1: Select static ingredients
          const staticBun = ingredients.find((item) => item.type === 'bun');
          const staticMain = ingredients.find((item) => item.type === 'main');
          const staticSauce = ingredients.find((item) => item.type === 'sauce');

          // Log selected ingredients for debugging
          cy.log(`Selected bun: ${staticBun.name}`);
          cy.log(`Selected sauce: ${staticSauce.name}`);
          cy.log(`Selected main: ${staticMain.name}`);

          // Step 2: Add selected ingredients to the constructor
          [staticBun, staticMain, staticSauce].forEach((ingredient) => {
            cy.get(`[data-cy="ingredient-${ingredient._id}"]`)
              .find('button')
              .contains('Добавить')
              .click();
          });

          // Step 3: Verify that all ingredients are added to the constructor
          [staticBun, staticMain, staticSauce].forEach((ingredient) => {
            cy.get('[data-cy="constructor"]').should(
              'contain.text',
              ingredient.name
            );
          });

          // Step 4: Place the order
          cy.get('[data-cy="constructor"]')
            .find('button')
            .contains('Оформить заказ')
            .click();

          // Step 5: Verify that the order number matches
          cy.wait(500);
          cy.get('[data-cy="order-number"]').should('contain.text', '7880');

          // Step 6: Verify that the modal is visible
          cy.get('[data-cy="modal"]').should('be.visible');

          // Step 7: Close the modal using the close button
          cy.get('[data-cy="modal-close"]').click();
          cy.get('[data-cy="modal"]').should('not.exist');

          // Step 8: Verify that the constructor is empty
          cy.get('[data-cy="constructor"]').should(
            'not.contain.text',
            staticBun.name
          );
          cy.get('[data-cy="constructor"]').should(
            'not.contain.text',
            staticMain.name
          );
          cy.get('[data-cy="constructor"]').should(
            'not.contain.text',
            staticSauce.name
          );
        });
      });
    });
  });
});
