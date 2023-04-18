/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html, body {\r\n    font-family: \"Cascadia Mono\", Tahoma, Verdana, Arial, sans-serif;\r\n}\r\n\r\nbody {\r\n    padding: 3rem;\r\n}\r\n\r\n[tm-role='setup'] {\r\n    border-color: gainsboro;\r\n    border-width: 0.2rem;\r\n    border-style: solid;\r\n    padding: 1rem;\r\n}\r\n\r\n[tm-arg] {\r\n    color: darkred;\r\n    font-weight: bold;\r\n}\r\n\r\n[tm-role='assert'] p:first-child {\r\n    font-weight: bold;\r\n    font-size: larger;\r\n}\r\n\r\n.failure {\r\n    background: lightpink;\r\n}\r\n\r\n.success {\r\n    background: lightgreen;\r\n}\r\n\r\n.error {\r\n    padding: 0.5rem;\r\n    background: lightgoldenrodyellow;\r\n    line-height: 1.5rem;\r\n}\r\n\r\nspan.error {\r\n    font-size: smaller;\r\n    font-style: italic;\r\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;IACI,gEAAgE;AACpE;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,uBAAuB;IACvB,oBAAoB;IACpB,mBAAmB;IACnB,aAAa;AACjB;;AAEA;IACI,cAAc;IACd,iBAAiB;AACrB;;AAEA;IACI,iBAAiB;IACjB,iBAAiB;AACrB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,eAAe;IACf,gCAAgC;IAChC,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,kBAAkB;AACtB","sourcesContent":["html, body {\r\n    font-family: \"Cascadia Mono\", Tahoma, Verdana, Arial, sans-serif;\r\n}\r\n\r\nbody {\r\n    padding: 3rem;\r\n}\r\n\r\n[tm-role='setup'] {\r\n    border-color: gainsboro;\r\n    border-width: 0.2rem;\r\n    border-style: solid;\r\n    padding: 1rem;\r\n}\r\n\r\n[tm-arg] {\r\n    color: darkred;\r\n    font-weight: bold;\r\n}\r\n\r\n[tm-role='assert'] p:first-child {\r\n    font-weight: bold;\r\n    font-size: larger;\r\n}\r\n\r\n.failure {\r\n    background: lightpink;\r\n}\r\n\r\n.success {\r\n    background: lightgreen;\r\n}\r\n\r\n.error {\r\n    padding: 0.5rem;\r\n    background: lightgoldenrodyellow;\r\n    line-height: 1.5rem;\r\n}\r\n\r\nspan.error {\r\n    font-size: smaller;\r\n    font-style: italic;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/endpointContext.js":
/*!********************************!*\
  !*** ./src/endpointContext.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EndpointContext": () => (/* binding */ EndpointContext)
/* harmony export */ });
﻿class EndpointContext {
    _backendUrl;
    _endpoints;
    
    constructor(backendUrl) {
        this._backendUrl = backendUrl;
    }
    
    init() {
        return fetch(this._backendUrl)
            .then(response => response.json())
            .then(endpoints => this._initializeEndpoints(endpoints))
            .then(() => this);
    }
    
    invoke(name, parameters) {
        this._endpoints[name](parameters);
    }

    _initializeEndpoints(endpoints) {
        this._endpoints = {};
        for (const name of endpoints) {
            this._endpoints[name] = () => {
                return false;
            }
        }
    }
}

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Test": () => (/* binding */ Test)
/* harmony export */ });
/* harmony import */ var _testAssert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./testAssert */ "./src/testAssert.js");
/* harmony import */ var _testSequence__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./testSequence */ "./src/testSequence.js");



class Test {
    _setup;
    _act;
    _assert;

    constructor(node) {
        this._setup = new _testSequence__WEBPACK_IMPORTED_MODULE_1__.TestSequence(node.querySelectorAll('div[tm-role="setup"]').item(0));
        this._act = new _testSequence__WEBPACK_IMPORTED_MODULE_1__.TestSequence(node.querySelectorAll('div[tm-role="act"]').item(0));
        this._assert = new _testAssert__WEBPACK_IMPORTED_MODULE_0__.TestAssert(node.querySelectorAll('div[tm-role="assert"]').item(0));
    }

    execute(context) {
        this._setup.execute(context);
        this._act.execute(context);
        this._assert.execute(context);
    }
}

/***/ }),

/***/ "./src/testAssert.js":
/*!***************************!*\
  !*** ./src/testAssert.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestAssert": () => (/* binding */ TestAssert)
/* harmony export */ });
/* harmony import */ var _testListExpectation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./testListExpectation */ "./src/testListExpectation.js");
/* harmony import */ var _unknownExpectation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unknownExpectation */ "./src/unknownExpectation.js");



class TestAssert {
    _expectations;

    constructor(node) {
        this._expectations = [];

        node.querySelectorAll('[tm-role="expect"]').forEach(
            n => this._expectations.push(this.createExpectation(n))
        )
    }

    createExpectation(node) {
        switch (node.nodeName.toLocaleLowerCase()) {
            case 'ul':
                return new _testListExpectation__WEBPACK_IMPORTED_MODULE_0__.TestListExpectation(node);
            default: return new _unknownExpectation__WEBPACK_IMPORTED_MODULE_1__.UnknownExpectation(node);
        }
    }

    execute(context) {
        this._expectations.forEach(expectation => expectation.execute(context));
    }
}

/***/ }),

/***/ "./src/testListExpectation.js":
/*!************************************!*\
  !*** ./src/testListExpectation.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestListExpectation": () => (/* binding */ TestListExpectation)
/* harmony export */ });
/* harmony import */ var _testSequenceStep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./testSequenceStep */ "./src/testSequenceStep.js");


class TestListExpectation extends _testSequenceStep__WEBPACK_IMPORTED_MODULE_0__.TestSequenceStep {

    _expectedValues;

    constructor(node) {
        super(node);
        this._expectedValues = [];
        node.querySelectorAll('li').forEach(n => this._expectedValues.push(n.innerText));
    }

    handleResult(invocationResult) {
        if (invocationResult.length !== this._expectedValues.length)
            throw new Error(`Assert Failed: expected ${this._expectedValues.length} elements but found ${invocationResult.length}`);
        return true;
    }
}

/***/ }),

/***/ "./src/testRunner.js":
/*!***************************!*\
  !*** ./src/testRunner.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestRunner": () => (/* binding */ TestRunner)
/* harmony export */ });
/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ "./src/test.js");


class TestRunner {

    _testNode;
    
    constructor(testNode) {
        this._testNode = testNode;
    }
    
    run(context) {
        const test = this._parseTest();
        test.execute(context)
    }

    _parseTest() {
        return new _test__WEBPACK_IMPORTED_MODULE_0__.Test(this._testNode);
    }
}



/***/ }),

/***/ "./src/testSequence.js":
/*!*****************************!*\
  !*** ./src/testSequence.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestSequence": () => (/* binding */ TestSequence)
/* harmony export */ });
/* harmony import */ var _testSequenceStep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./testSequenceStep */ "./src/testSequenceStep.js");


class TestSequence {

    _steps;

    constructor(node) {
        this._steps = [];
        node.querySelectorAll('p[tm-call]').forEach(n => this.createStep(n));
    }

    createStep(node) {
        this._steps.push(this.createStepInstance(node));
    }

    execute(context) {
        this._steps.forEach(step => step.execute(context));
    }

    createStepInstance(node) {
        return new _testSequenceStep__WEBPACK_IMPORTED_MODULE_0__.TestSequenceStep(node);
    }
}

/***/ }),

/***/ "./src/testSequenceStep.js":
/*!*********************************!*\
  !*** ./src/testSequenceStep.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestSequenceStep": () => (/* binding */ TestSequenceStep)
/* harmony export */ });
class TestSequenceStep {

    _node;
    _methodName;
    _methodArguments;

    constructor(node) {

        this._node = node;

        this._methodName = node.getAttribute('tm-call');
        this._methodArguments = [];
        node.querySelectorAll('span[tm-arg]').forEach(n => this._methodArguments.push(
            {
                name: n.getAttribute('tm-arg'),
                value: n.innerText
            }));
    }

    execute(context) {
        try {
            const result = this.handleResult(context.invoke(this._methodName, this._methodArguments));
            if (result) this.showSuccess();
            else this.showFailure();
        } catch (e) {
            this.showError(e);
        }
    }

    showSuccess() {
        this._node.classList.add('success');
    }

    showFailure() {
        this._node.classList.add('failure');
    }

    showError(e) {
        this._node.classList.add('error');
        const errorDisplay = document.createElement('div');
        errorDisplay.innerHTML = `<span class="error">${e.toString()}</span>`;
        errorDisplay.classList.add('error');
        this._node.before(errorDisplay);
    }

    handleResult(invocationResult) {
        return invocationResult;
    }
}

/***/ }),

/***/ "./src/unknownExpectation.js":
/*!***********************************!*\
  !*** ./src/unknownExpectation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnknownExpectation": () => (/* binding */ UnknownExpectation)
/* harmony export */ });
/* harmony import */ var _testListExpectation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./testListExpectation */ "./src/testListExpectation.js");
﻿

class UnknownExpectation extends _testListExpectation__WEBPACK_IMPORTED_MODULE_0__.TestListExpectation {
    constructor(node) {
        super(node);
    }

    execute(context) {
        console.error('Expectation syntax can not be recognized.', this._node);
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _testRunner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./testRunner */ "./src/testRunner.js");
/* harmony import */ var _endpointContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./endpointContext */ "./src/endpointContext.js");




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
                const context = new _endpointContext__WEBPACK_IMPORTED_MODULE_2__.EndpointContext(this._endpointUrl);
                return context.init()
            })
            .then(context => {
                const runner = new _testRunner__WEBPACK_IMPORTED_MODULE_1__.TestRunner(this._testDisplay);
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
})();

/******/ })()
;
//# sourceMappingURL=test-assist.js.map