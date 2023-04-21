/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Open test case by title
         * @example
         * cy.openTestCase('test case title')
         */
        openTestCase(title: string): void
        
        /**
         * Run currently opened test case
         * @example
         * cy.runOpenedTest()
         */
        runOpenedTest(): void
        
        /**
         * Open and run test case by title
         * @example
         * cy.runTestCase('test case title')
         */
        runTestCase(title: string): void
    }
}