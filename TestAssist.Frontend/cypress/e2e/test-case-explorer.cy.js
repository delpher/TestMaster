describe('test case explorer', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5000');
    });
    
    it('should display list of tests', () => {
        cy.get('h1').should('have.text', 'Test cases:');
        cy.get('a').invoke('attr', 'href').should('eq', 'javascript:void(0)');
    });

    it('given test case when clicking then test case is opened', () => {
        cy.get('a[test-id="test-case-1"]').click();
        cy.get('#test-display h1').should('have.text', 'Filling user details');
    });
});