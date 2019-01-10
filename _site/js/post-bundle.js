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
/******/ 	return __webpack_require__(__webpack_require__.s = "./webpack/postPage.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./webpack/Viewer/ImageViewer.js":
/*!***************************************!*\
  !*** ./webpack/Viewer/ImageViewer.js ***!
  \***************************************/
/*! exports provided: ImageViewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ImageViewer\", function() { return ImageViewer; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ImageViewer =\n/*#__PURE__*/\nfunction () {\n  function ImageViewer(images) {\n    var _this = this;\n\n    _classCallCheck(this, ImageViewer);\n\n    this.currentImage;\n    this.built;\n    this.images = images;\n\n    var _loop = function _loop(i) {\n      _this.images[i].addEventListener(\"click\", function () {\n        _this.buildViewerWindow();\n\n        _this.alterImageViewer(_this.images[i].getAttribute('src'));\n      });\n    };\n\n    for (var i = 0; i < this.images.length; i++) {\n      _loop(i);\n    }\n  }\n\n  _createClass(ImageViewer, [{\n    key: \"buildViewerWindow\",\n    value: function buildViewerWindow() {\n      if (this.built) {\n        document.querySelector('.image-viewer-container').classList.remove('oculto');\n        return;\n      }\n\n      var container = document.createElement('div');\n      container.classList.add(\"image-viewer-container\");\n      document.querySelector('body').appendChild(container);\n      var html = \"<img class=\\\"image-viewer\\\" src=\\\"\\\">\" + \"<div class=\\\"bts-viewers-container\\\">\" + \"<button class=\\\"bt-viewer bt-previous\\\">Anterior</button>\" + \"<button class=\\\"bt-viewer bt-next\\\">Próxima</button>\" + \"<button class=\\\"bt-viewer bt-close\\\">Fechar</button>\" + \"</div>\";\n      container.innerHTML = html;\n      this.addEventListeners();\n      this.built = true;\n      return this;\n    }\n  }, {\n    key: \"addEventListeners\",\n    value: function addEventListeners() {\n      var _this2 = this;\n\n      document.querySelector('.bt-next').addEventListener(\"click\", function () {\n        _this2.nextImage();\n      });\n      document.querySelector('.bt-previous').addEventListener(\"click\", function () {\n        _this2.previousImage();\n      });\n      document.querySelector('.bt-close').addEventListener(\"click\", function () {\n        _this2.close();\n      });\n      return this;\n    }\n  }, {\n    key: \"alterImageViewer\",\n    value: function alterImageViewer(fileName) {\n      var img = document.querySelector('.image-viewer');\n      img.setAttribute('src', fileName);\n      this.setCurrentImage();\n      return this;\n    }\n  }, {\n    key: \"setCurrentImage\",\n    value: function setCurrentImage() {\n      var img = document.querySelector('.image-viewer');\n      var src = img.getAttribute('src');\n\n      for (var i = 0; i < this.images.length; i++) {\n        if (this.images[i].getAttribute('src') == src) {\n          this.currentImage = this.images[i];\n        }\n      }\n\n      return this;\n    }\n  }, {\n    key: \"getCurrentImage\",\n    value: function getCurrentImage() {\n      return this.currentImage;\n    }\n  }, {\n    key: \"nextImage\",\n    value: function nextImage() {\n      var nextImage;\n\n      for (var i = 0; i < this.images.length; i++) {\n        if (this.images[i] == this.getCurrentImage()) {\n          if (i == this.images.length - 1) {\n            nextImage = this.images[0];\n          } else {\n            nextImage = this.images[i + 1];\n          }\n        }\n      }\n\n      var nextImageSrc = nextImage.getAttribute('src');\n      this.alterImageViewer(nextImageSrc);\n      return this;\n    }\n  }, {\n    key: \"previousImage\",\n    value: function previousImage() {\n      var previousImage;\n\n      for (var i = 0; i < this.images.length; i++) {\n        if (this.images[i] == this.getCurrentImage()) {\n          if (i == 0) {\n            previousImage = this.images[this.images.length - 1];\n          } else {\n            previousImage = this.images[i - 1];\n          }\n        }\n      }\n\n      var previousImageSrc = previousImage.getAttribute('src');\n      this.alterImageViewer(previousImageSrc);\n      return this;\n    }\n  }, {\n    key: \"close\",\n    value: function close() {\n      document.querySelector('.image-viewer-container').classList.add('oculto');\n      return this;\n    }\n  }]);\n\n  return ImageViewer;\n}();\n\n\n\n//# sourceURL=webpack:///./webpack/Viewer/ImageViewer.js?");

/***/ }),

/***/ "./webpack/Viewer/Window.js":
/*!**********************************!*\
  !*** ./webpack/Viewer/Window.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ImageViewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageViewer */ \"./webpack/Viewer/ImageViewer.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  window.addEventListener(\"DOMContentLoaded\", function () {\n    var images = document.querySelectorAll('img');\n    new _ImageViewer__WEBPACK_IMPORTED_MODULE_0__[\"ImageViewer\"](images);\n  });\n});\n\n//# sourceURL=webpack:///./webpack/Viewer/Window.js?");

/***/ }),

/***/ "./webpack/postPage.js":
/*!*****************************!*\
  !*** ./webpack/postPage.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Viewer_Window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Viewer/Window.js */ \"./webpack/Viewer/Window.js\");\n\nObject(_Viewer_Window_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack:///./webpack/postPage.js?");

/***/ })

/******/ });