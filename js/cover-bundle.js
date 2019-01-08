/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./webpack/home.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/offline-plugin/runtime.js":
/*!************************************************!*\
  !*** ./node_modules/offline-plugin/runtime.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var warn = \"offline-plugin: runtime was installed without OfflinePlugin being added to the webpack.config.js. See https://goo.gl/2Ca7NO for details.\";\n\nif (window.console) {\n  if (console.info) {\n    console.info(warn);\n  } else if (console.log) {\n    console.log(warn);\n  }\n}\n\nexports.install = function() {};\nexports.applyUpdate = function() {};\nexports.update = function() {};\n\n//# sourceURL=webpack:///./node_modules/offline-plugin/runtime.js?");

/***/ }),

/***/ "./webpack/ServiceWorker.js":
/*!**********************************!*\
  !*** ./webpack/ServiceWorker.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  if ('serviceWorker' in navigator) {\n    window.addEventListener(\"load\", function () {\n      navigator.serviceWorker.register('/sw.js').then(function (registration) {\n        console.log(\"Service Worker registrado em \".concat(registration.scope));\n      }).catch(function (err) {\n        return console.log(err);\n      });\n    });\n  }\n});\n\n//# sourceURL=webpack:///./webpack/ServiceWorker.js?");

/***/ }),

/***/ "./webpack/home.js":
/*!*************************!*\
  !*** ./webpack/home.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ServiceWorker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ServiceWorker */ \"./webpack/ServiceWorker.js\");\n/* harmony import */ var _node_modules_offline_plugin_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/offline-plugin/runtime */ \"./node_modules/offline-plugin/runtime.js\");\n/* harmony import */ var _node_modules_offline_plugin_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_offline_plugin_runtime__WEBPACK_IMPORTED_MODULE_1__);\n\n\n_node_modules_offline_plugin_runtime__WEBPACK_IMPORTED_MODULE_1__[\"install\"](); // SW();\n\n//# sourceURL=webpack:///./webpack/home.js?");

/***/ })

/******/ });