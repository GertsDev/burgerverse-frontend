describe('проверяем доступность приложения', function () {
  it('should redirect to login when placing an order unauthenticated', function () {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
    
  });
});
