describe('test case explorer', () => {
    it('should list test cases', () => {
        cy.visit('http://localhost:8080');
        cy.get('title').should('have.text', 'Test Master : Home');

        const testNames = []
        cy.get('[test-id="tests"] li').each(($li) => testNames.push($li.text()))
        cy.wrap(testNames).should('deep.equal', [
            'Test1',
            'Test2'
        ]);
    });
});