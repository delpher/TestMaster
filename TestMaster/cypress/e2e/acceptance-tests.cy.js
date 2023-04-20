describe('test master acceptance tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5000');
    });
    
    it('given server is running when opening index should display list of tests', () => {
        cy.get('h1').should('have.text', 'Test cases:');
        cy.get('a').contains('Editing user details').should('exist');
    });

    it('given index is opened when clicking test case then test case is opened', () => {
        openTestCase('Editing user details');
        cy.get('#test-display h1').should('contain.text', 'Filling user details');
    });

    it('given test case opened when clicking back to test then list of tests displayed', () => {
        openTestCase('Editing user details');
        cy.get('a').contains('Editing user details').should('not.be.visible');
        cy.get('a#back-link').click();
        cy.get('a').contains('Editing user details').should('be.visible');
    });

    it('given test case opened when clicking run then test gets executed', () => {
        openTestCase('Editing user details');
        runOpenedTest();
        
        cy.get('[tm-call="SetFirstName"]').should('have.class', 'success');
        cy.get('[tm-call="SetLastName"]').should('have.class', 'success');
        cy.get('[tm-call="GetFullName"]').should('have.class', 'success');
    });

    it('given index opened when clicking test case with link to not existing case file then error is displayed', () => {
       openTestCase('Test case file missing');
       cy.get('#test-display')
           .should('have.text', 'FAILED TO LOAD TEST' +
               'Error: Failed to load test case contents. 404 Not Found');
    });
    
    it('given test executed when test step fails then step marked as failed', () => {
        openTestCase('Steps failures');
        runOpenedTest();
        
        cy.get('[tm-call="ReturnFailure"]')
            .contains('Setup step fails')
            .should('have.class', 'failure');

        cy.get('[tm-call="ReturnFailure"]')
            .contains('Act step fails')
            .should('have.class', 'failure');
        
        cy.get('[tm-role="expect"]')
            .contains('Expectation step fail')
            .should('have.class', 'error');
    });
    
    function runOpenedTest() {
        cy.get('#test-display button#run-test').click();
    }

    function openTestCase(testCaseTitle) {
        cy.get('a').contains(testCaseTitle).click();
    }
});