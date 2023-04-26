﻿import {TestRunner} from './testRunner';
import {EndpointsParser} from './backend/endpointsParser';
import {ExternalEndpointsParser} from './backend/externalEndpointsParser';

class ContentsLoadError extends Error {
    constructor(response) {
        super(`Failed to load test case contents. ${response.status} ${response.statusText}`);
    }
}

class ContentsParseError extends Error {
    constructor(error) {
        super(`Failed to parse test case contents. ${error}`);
    }
}

export class TestExplorerComponent {
    _casesContainer;
    _testContainer;
    _testDisplay;
    _loader;
    _endpointsContext;
    _testRunner;

    async init() {
        const externalEndpoints = await ExternalEndpointsParser.parse();
        this._endpointsContext = externalEndpoints.join(EndpointsParser.parse(document.body));
        
        this._casesContainer = document.querySelectorAll("[tm-role='test-cases']").item(0);

        this._testDisplay = document.createElement('div');
        this._testDisplay.setAttribute('id', 'test-display');
        this._testDisplay.setAttribute('tm-role', 'test');
        this._testContainer = this._createTestContainer(this._testDisplay);
        this._casesContainer.after(this._testContainer);
        this._loader = document.createElement('div');
        this._loader.innerText = 'Loading test...';
        this._loader.style.display = 'none';
        this._casesContainer.after(this._loader);

        this._initializeTestCases();
    }

    _createBackLink() {
        const backLink = document.createElement('a');
        backLink.id = 'back-link';
        backLink.href = 'javascript:void(0)';
        backLink.innerHTML = '&larr; back to index';
        backLink.onclick = () => this._showTestCases();
        return backLink;
    }

    _initializeTestCases() {
        const links = document.querySelectorAll("[tm-role='test-cases'] a");
        links.forEach(anchor => {
            if (anchor.rel === "index") {
                anchor.title = 'Tests index';
            } else {
                anchor.title = 'Test case';
                const testCaseUrl = anchor.href;
                anchor.href = 'javascript:void(0)';
                anchor.onclick = () => this._loadTestCase(testCaseUrl);
            }
        });
    }

    async _loadTestCase(url) {
        this._hideTestCases();
        this._showLoader();
        try {
            const response = await fetch(url, {cache: 'no-store'})
            if (response.ok) {
                try {
                    const html = await response.text();
                    this._loadTestContents(html);
                    this._showTestContents();
                    this._appendRunTestButton();
                    this._initializeTest();
                } catch (error)
                {
                    this._showError(new ContentsParseError(error))
                }
            } else
                this._showError(new ContentsLoadError(response));

        } catch (error) {
            this._showError(error);
        } finally {
            this._hideLoader()
        }
    }

    _runTest() {
        return this._testRunner.run(this._endpointsContext);
    }

    _loadTestContents(html) {
        const testDocument = document.createElement('html');
        testDocument.innerHTML = html;
        
        this._testDisplay.innerHTML = testDocument
            .querySelectorAll('[tm-role="test"]')
            .item(0).innerHTML;
    }

    _hideTestCases() {
        this._casesContainer.style.display = 'none';
    }

    _showTestCases() {
        this._testContainer.style.display = 'none';
        this._casesContainer.style.display = 'block';
    }

    _createTestContainer(testDisplay) {
        const testContainer = document.createElement('div');
        testContainer.append(this._createBackLink());
        testContainer.append(testDisplay);
        testContainer.style.display = 'none';
        return testContainer;
    }

    _showError(error) {
        this._testDisplay.innerHTML = `<b>FAILED TO LOAD TEST</b><br/>${error}`;
        this._showTestContents();
        error.response && console.error(error.message, error.response);
    }

    _showTestContents() {
        this._testContainer.style.display = 'block';
    }

    _showLoader() {
        this._loader.style.display = 'block';
    }

    _hideLoader() {
        this._loader.style.display = 'none';
    }

    _appendRunTestButton() {
        const testHeader = this._testContainer.querySelectorAll('[tm-role="test-name"]').item(0);
        const runButton = document.createElement('button');
        runButton.id = 'run-test';
        runButton.innerText = 'Run test';
        runButton.onclick = () => this._runTest()
        testHeader.appendChild(runButton)
    }

    _initializeTest() {
        this._testRunner = new TestRunner(this._testDisplay);
    }
}