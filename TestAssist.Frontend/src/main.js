import "./styles.css";
import {TestRunner} from "./testRunner";
import {EndpointContext} from "./endpointContext";

class TestExplorerComponent {
    _casesContainer;
    _testContainer;
    _testDisplay;
    _endpointUrl;

    init() {
        this._casesContainer = document.querySelectorAll("[tm-role='test-cases']").item(0);
        this._endpointUrl = this._casesContainer.getAttribute('tm-endpoint');
        this._testContainer = document.createElement('div');
        const backLink = document.createElement('a');
        backLink.href="javascript:void(0)";
        backLink.innerHTML = '&larr; back to test cases';
        backLink.onclick = () => this._showTestCases();
        this._testDisplay = document.createElement('div');
        this._testContainer.append(backLink);
        this._testContainer.append(this._testDisplay);
        this._testContainer.style.display = 'none';
        this._casesContainer.after(this._testContainer);

        const links = document.querySelectorAll("[tm-role='test-cases'] a");
        links.forEach(anchor => {
            const testCaseUrl = anchor.href;
            anchor.href = "javascript:void(0)";
            anchor.onclick = () => this._loadTestCase(testCaseUrl);
        });
    }

    _loadTestCase(url) {
        this._casesContainer.style.display = 'none';
        fetch(url)
            .then(response => response.text())
            .then(html => {
                this._testDisplay.innerHTML = html;
                this._testContainer.style.display = 'block';
                const context = new EndpointContext(this._endpointUrl);
                return context.init()
            })
            .then(context => {
                const runner = new TestRunner(this._testDisplay);
                runner.run(context);
            });
    }

    _showTestCases() {
        this._testContainer.style.display = 'none';
        this._casesContainer.style.display = 'block';
    }
}

const testExplorerComponent = new TestExplorerComponent();
testExplorerComponent.init();