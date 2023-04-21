describe('test master general acceptance tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5000');
    });

    it('given server is running when opening index should display list of tests', () => {
        cy.get('h1').should('have.text', 'Test cases:');
        cy.get('a').contains('Editing user details').should('exist');
        cy.get('a').contains('Test case file missing').should('exist');
        cy.get('a').contains('Steps failures').should('exist');
        cy.get('a').contains('Steps exceptions').should('exist');
    });

    it('given test case opened when clicking back to test then list of tests displayed', () => {
        cy.openTestCase('Editing user details');
        cy.get('a').contains('Editing user details').should('not.be.visible');
        cy.get('a#back-link').click();
        cy.get('a').contains('Editing user details').should('be.visible');
    });

    it('given index opened when clicking test case with link to not existing case file then error is displayed', () => {
        cy.openTestCase('Test case file missing');
        cy.get('#test-display')
            .should('have.text', 'FAILED TO LOAD TEST' +
                'Error: Failed to load test case contents. 404 Not Found');
    });

    it('given test case opened when clicking run then test gets executed', () => {
        cy.runTestCase('Editing user details');

        cy.get('[tm-call="SetFirstName"]').should('have.class', 'success');
        cy.get('[tm-call="SetLastName"]').should('have.class', 'success');
        cy.get('[tm-call="GetFullName"]').should('have.class', 'success');
    });

    it('given test executed when test step fails then step marked as failed', () => {
        cy.runTestCase('Steps failures');

        cy.get('[tm-call="ReturnFailure"]')
            .contains('Setup step fails')
            .should('have.class', 'failure');

        cy.get('[tm-call="ReturnFailure"]')
            .contains('Act step fails')
            .should('have.class', 'failure');

        cy.get('[tm-role="expect"]')
            .contains('Expectation step fail')
            .should('have.class', 'failure');
    });

    it('given test executed when test step throws exception then error is displayed', () => {
        cy.runTestCase('Steps exceptions');

        cy.get('[tm-call="ThrowException"]')
            .contains('Setup step throws exception')
            .should('have.class', 'error')

        cy.get('[tm-call="ThrowException"]')
            .contains('Setup step throws exception')
            .find('.error')
            .should('contain.text',
                'Exception was thrown invoking \'ThrowException\' System.InvalidOperationException: Test exception message')

        cy.get('[tm-call="ThrowException"]')
            .contains('Act step throws exception')
            .should('have.class', 'error');

        cy.get('[tm-call="ThrowException"]')
            .contains('Act step throws exception')
            .find('.error')
            .should('contain.text',
                'Exception was thrown invoking \'ThrowException\' System.InvalidOperationException: Test exception message')

        cy.get('[tm-role="expect"]')
            .contains('Expectation step throws exception')
            .should('have.class', 'error');

        cy.get('[tm-role="expect"]')
            .contains('Expectation step throws exception')
            .find('.error')
            .should('contain.text',
                'Exception was thrown invoking \'ThrowException\' System.InvalidOperationException: Test exception message')
    });

    it('given test executed when test step succeeds then step marked as succeeded', () => {
        cy.runTestCase('Steps success');

        cy.get('[tm-call="ReturnSuccess"]')
            .contains('Setup step succeeded')
            .should('have.class', 'success');

        cy.get('[tm-call="ReturnSuccess"]')
            .contains('Act step succeeded')
            .should('have.class', 'success');

        cy.get('[tm-call="ReturnSuccess"]')
            .contains('Assert step succeeded')
            .should('have.class', 'success');

    });
});