describe('test master expectations tests', () => {
   beforeEach(() => {
      cy.visit('http://localhost:5000');
   });
   
   it('given single expectation when verifying then expectation gets executed', () => {
      cy.runTestCase('Single expectation');
      
      cy.contains('Expectation succeeds')
          .should('have.class', 'success');
      
      cy.contains('Expectation fails')
          .should('have.class', 'failure')
          .and('contain.text', 'AssertionError: expected true to not equal true');
      
      cy.contains('Expectation error')
          .should('have.class', 'error');
      
       cy.contains('Expectation error')
           .find('.error')
           .should('contain.text', 'Error: Exception was thrown');
      
   });
});