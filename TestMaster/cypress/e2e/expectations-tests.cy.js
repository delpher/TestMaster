describe('test master expectations tests', () => {
   beforeEach(() => {
      cy.visit('http://localhost:5000');
   });
   
   it('given single expectation when verifying then expectation gets executed', () => {
      cy.runTestCase('Single expectation');
      cy.contains('Equal assertion succeeds because returned value is true')
          .should('have.class', 'success');
   });
});