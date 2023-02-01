(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * Animate
   * ======================================
   * - add class to element in viewport
   * - support custom animation delay via [animate-delay] html attribute
   * - support custom visible ratio via [animate-ratio] html attribute
   */
  var RATIO = '0.75';
  var LOAD_RATIO = '1';
  var ELEMENTS$2 = '.animate';
  var VISIBLE_CLASS = 'animate--visible';

  var Animate$1 = function Animate() {
    var _this = this;

    _classCallCheck(this, Animate);

    _defineProperty(this, "getDelay", function (value) {
      if (value === null) {
        return 0;
      } else if (value.includes('.')) {
        return value * 1000;
      } else {
        return parseInt(value);
      }
    });

    _defineProperty(this, "scrollHandler", function (CUSTOM_RATIO) {
      if (!document.querySelectorAll(ELEMENTS$2 + ':not(.' + VISIBLE_CLASS + ')')) return;

      var _iterator = _createForOfIteratorHelper(_this.sections),
          _step;

      try {
        var _loop = function _loop() {
          var section = _step.value;

          var delay = _this.getDelay(section.getAttribute('animate-delay'));

          var ratio = section.getAttribute('animate-ratio') ? section.getAttribute('animate-ratio') : CUSTOM_RATIO;

          if (section.getBoundingClientRect().top <= window.innerHeight * ratio && section.getBoundingClientRect().top > 0) {
            setTimeout(function () {
              section.classList.add(VISIBLE_CLASS);
            }, delay);
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });

    this.sections = document.querySelectorAll(ELEMENTS$2);
    window.addEventListener('scroll', function () {
      return _this.scrollHandler(RATIO);
    }, false);
    this.scrollHandler(LOAD_RATIO);
  };

  new Animate$1();

  /**
   * Toggle Nav
   * ======================================
   * - toggle class on body
   */
  var ELEMENTS$1 = '.togglenav__button';
  var TOGGLE_CLASS = 'nav-is-open';

  var ToggleNav = /*#__PURE__*/function () {
    function ToggleNav() {
      var _this = this;

      _classCallCheck(this, ToggleNav);

      this.elements = document.querySelectorAll(ELEMENTS$1);

      if (!this.elements) {
        return false;
      }

      this.elements.forEach(function (el) {
        el.addEventListener('click', _this.toggleNav, false);
        el.addEventListener('touchstart', _this.toggleNav, false);
      });
    }

    _createClass$1(ToggleNav, [{
      key: "toggleNav",
      value: function toggleNav(e) {
        document.body.classList.toggle(TOGGLE_CLASS);
        document.body.classList.toggle('lock');
        e.preventDefault();
      }
    }]);

    return ToggleNav;
  }();

  new ToggleNav();

  (function ($) {
    $.fn.RevSelectBox = function () {
      this.each(function () {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;
        $this.addClass('select-hidden');

        if (!$this.parent().hasClass('rev-select')) {
          $this.wrap('<div class="rev-select"></div>');
        }

        $this.closest('.rev-select').find('.select-styled').remove();
        $this.closest('.rev-select').find('.select-options').remove();
        $this.after('<div class="select-styled"></div>');
        var $styledSelect = $this.next('div.select-styled');

        if ($this.find('option:selected')) {
          $styledSelect.text($this.find('option:selected').text());
        } else {
          $styledSelect.text($this.children('option').eq(0).text());
        }

        var $list = $('<ul />', {
          'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
          $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
          }).appendTo($list);
        }

        var $listItems = $list.children('li');
        $styledSelect.click(function (e) {
          e.stopPropagation();
          $('div.select-styled.active').not(this).each(function () {
            $(this).removeClass('active').next('ul.select-options').hide();
          });
          $(this).toggleClass('active').next('ul.select-options').toggle();
        });
        $listItems.click(function (e) {
          e.stopPropagation();
          $styledSelect.text($(this).text()).removeClass('active');
          $this.val($(this).attr('rel')).trigger('change');
          $list.hide(); //console.log($this.val());
        });
        $this.change(function (e) {
          // e.stopPropagation();
          $styledSelect.text($this.find('option:selected').text());
        });
        $(document).click(function () {
          $styledSelect.removeClass('active');
          $list.hide();
        });
      });
    };
  })(jQuery);

  jQuery(".rev-select-box").RevSelectBox();
  jQuery("select").RevSelectBox();

  /*!
   * jQuery Cookie consent plugin v1.0.16
   * https://github.com/myspace-nu
   *
   * Copyright 2017 Johan Johansson
   * Released under the MIT license
   */
  !function (a) {
    a.cookie = function (e, o, n) {
      if (1 < arguments.length) return n = a.extend({}, n), null == o && (n.expires = -1), document.cookie = [encodeURIComponent(e), "=", n.raw ? o : encodeURIComponent(o), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path : "", n.domain ? "; domain=" + n.domain : "", n.secure ? "; secure" : ""].join("");

      for (var t, s = document.cookie.split("; "), i = 0; t = s[i] && s[i].split("="); i++) {
        if (decodeURIComponent(t[0]) === e) return decodeURIComponent(t[1] || "");
      }

      return null;
    }, a.fn.cookieConsent = function (e) {
      var o = a.extend({
        position: "static",
        message: "This website uses cookies. By using this website you consent to our use of these cookies.",
        style: "",
        consentMessage: "I understand",
        consentStyle: "",
        acceptClass: "cookieAccept",
        consentTime: 3650,
        storage: "cookie",
        onInit: function onInit() {},
        onConsent: function onConsent() {},
        onTemplate: function onTemplate() {
          console.log(this);
        },
        testing: !1,
        consentKey: "cookiesConsentDate"
      }, e);
      o.isGoogleBot = !!navigator.userAgent.match(/Chrome-Lighthouse|Page Speed|Headless/i);
      o.storage = "local" === o.storage && "undefined" != typeof Storage ? "local" : "session" === o.storage && "undefined" != typeof Storage ? "session" : "cookie";
      var n = "local" === o.storage ? parseInt(localStorage.getItem(o.consentKey)) : "session" === o.storage ? parseInt(sessionStorage.getItem(o.consentKey)) : parseInt(a.cookie(o.consentKey)),
          t = this.length ? this : a("<div>", {
        html: o.message,
        style: "background-color:white;color:#333;text-align:center;display:none;" + o.style
      }).append(a("<button>", {
        html: o.consentMessage,
        style: "background:#090;color:white;border:none;border-radius:0.2em;margin:0.5em;padding:0.2em 0.5em 0.2em 0.5em;" + o.consentStyle,
        "class": o.acceptClass
      })).prependTo(a("body"));
      return o.onInit.call(t), o.isGoogleBot ? a(t).hide() : o.testing || !n || n + 864e5 * o.consentTime < new Date().getTime() ? a(t).show() : a(t).hide(), t.each(function () {
        var e = a(this);
        a(this).prependTo(a("body")), a(this).find("." + o.acceptClass).click(function () {
          "local" === o.storage ? localStorage.setItem(o.consentKey, new Date().getTime()) : "session" === o.storage ? sessionStorage.setItem(o.consentKey, new Date().getTime()) : a.cookie(o.consentKey, new Date().getTime(), {
            expires: new Date(new Date().getTime() + 864e5 * o.consentTime),
            path: "/"
          }), e.hide(), o.onConsent.call(e);
        });
      }), this;
    }, a.cookieConsent = function (e) {
      a.fn.cookieConsent(e);
    };
  }(jQuery);

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var glightbox_min = createCommonjsModule(function (module, exports) {
  !function(e,t){module.exports=t();}(commonjsGlobal,(function(){function e(t){return (e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}function n(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}var s=Date.now();function l(){var e={},t=!0,i=0,n=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],i++);for(var s=function(i){for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t&&"[object Object]"===Object.prototype.toString.call(i[n])?e[n]=l(!0,e[n],i[n]):e[n]=i[n]);};i<n;i++){var o=arguments[i];s(o);}return e}function o(e,t){if((k(e)||e===window||e===document)&&(e=[e]),A(e)||L(e)||(e=[e]),0!=P(e))if(A(e)&&!L(e))for(var i=e.length,n=0;n<i&&!1!==t.call(e[n],e[n],n,e);n++);else if(L(e))for(var s in e)if(O(e,s)&&!1===t.call(e[s],e[s],s,e))break}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=e[s]=e[s]||[],l={all:n,evt:null,found:null};return t&&i&&P(n)>0&&o(n,(function(e,n){if(e.eventName==t&&e.fn.toString()==i.toString())return l.found=!0,l.evt=n,!1})),l}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.onElement,n=t.withCallback,s=t.avoidDuplicate,l=void 0===s||s,a=t.once,h=void 0!==a&&a,d=t.useCapture,c=void 0!==d&&d,u=arguments.length>2?arguments[2]:void 0,g=i||[];function v(e){T(n)&&n.call(u,e,this),h&&v.destroy();}return C(g)&&(g=document.querySelectorAll(g)),v.destroy=function(){o(g,(function(t){var i=r(t,e,v);i.found&&i.all.splice(i.evt,1),t.removeEventListener&&t.removeEventListener(e,v,c);}));},o(g,(function(t){var i=r(t,e,v);(t.addEventListener&&l&&!i.found||!l)&&(t.addEventListener(e,v,c),i.all.push({eventName:e,fn:v}));})),v}function h(e,t){o(t.split(" "),(function(t){return e.classList.add(t)}));}function d(e,t){o(t.split(" "),(function(t){return e.classList.remove(t)}));}function c(e,t){return e.classList.contains(t)}function u(e,t){for(;e!==document.body;){if(!(e=e.parentElement))return !1;if("function"==typeof e.matches?e.matches(t):e.msMatchesSelector(t))return e}}function g(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!e||""===t)return !1;if("none"==t)return T(i)&&i(),!1;var n=x(),s=t.split(" ");o(s,(function(t){h(e,"g"+t);})),a(n,{onElement:e,avoidDuplicate:!1,once:!0,withCallback:function(e,t){o(s,(function(e){d(t,"g"+e);})),T(i)&&i();}});}function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(""==t)return e.style.webkitTransform="",e.style.MozTransform="",e.style.msTransform="",e.style.OTransform="",e.style.transform="",!1;e.style.webkitTransform=t,e.style.MozTransform=t,e.style.msTransform=t,e.style.OTransform=t,e.style.transform=t;}function f(e){e.style.display="block";}function p(e){e.style.display="none";}function m(e){var t=document.createDocumentFragment(),i=document.createElement("div");for(i.innerHTML=e;i.firstChild;)t.appendChild(i.firstChild);return t}function y(){return {width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}}function x(){var e,t=document.createElement("fakeelement"),i={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(e in i)if(void 0!==t.style[e])return i[e]}function b(e,t,i,n){if(e())t();else {var s;i||(i=100);var l=setInterval((function(){e()&&(clearInterval(l),s&&clearTimeout(s),t());}),i);n&&(s=setTimeout((function(){clearInterval(l);}),n));}}function S(e,t,i){if(I(e))console.error("Inject assets error");else if(T(t)&&(i=t,t=!1),C(t)&&t in window)T(i)&&i();else {var n;if(-1!==e.indexOf(".css")){if((n=document.querySelectorAll('link[href="'+e+'"]'))&&n.length>0)return void(T(i)&&i());var s=document.getElementsByTagName("head")[0],l=s.querySelectorAll('link[rel="stylesheet"]'),o=document.createElement("link");return o.rel="stylesheet",o.type="text/css",o.href=e,o.media="all",l?s.insertBefore(o,l[0]):s.appendChild(o),void(T(i)&&i())}if((n=document.querySelectorAll('script[src="'+e+'"]'))&&n.length>0){if(T(i)){if(C(t))return b((function(){return void 0!==window[t]}),(function(){i();})),!1;i();}}else {var r=document.createElement("script");r.type="text/javascript",r.src=e,r.onload=function(){if(T(i)){if(C(t))return b((function(){return void 0!==window[t]}),(function(){i();})),!1;i();}},document.body.appendChild(r);}}}function w(){return "navigator"in window&&window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i)}function T(e){return "function"==typeof e}function C(e){return "string"==typeof e}function k(e){return !(!e||!e.nodeType||1!=e.nodeType)}function E(e){return Array.isArray(e)}function A(e){return e&&e.length&&isFinite(e.length)}function L(t){return "object"===e(t)&&null!=t&&!T(t)&&!E(t)}function I(e){return null==e}function O(e,t){return null!==e&&hasOwnProperty.call(e,t)}function P(e){if(L(e)){if(e.keys)return e.keys().length;var t=0;for(var i in e)O(e,i)&&t++;return t}return e.length}function M(e){return !isNaN(parseFloat(e))&&isFinite(e)}function X(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,t=document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");if(!t.length)return !1;if(1==t.length)return t[0];"string"==typeof e&&(e=parseInt(e));var i=e<0?1:e+1;i>t.length&&(i="1");var n=[];o(t,(function(e){n.push(e.getAttribute("data-taborder"));}));var s=n.filter((function(e){return e>=parseInt(i)})),l=s.sort()[0];return document.querySelector('.gbtn[data-taborder="'.concat(l,'"]'))}function z(e){if(e.events.hasOwnProperty("keyboard"))return !1;e.events.keyboard=a("keydown",{onElement:window,withCallback:function(t,i){var n=(t=t||window.event).keyCode;if(9==n){var s=document.querySelector(".gbtn.focused");if(!s){var l=!(!document.activeElement||!document.activeElement.nodeName)&&document.activeElement.nodeName.toLocaleLowerCase();if("input"==l||"textarea"==l||"button"==l)return}t.preventDefault();var o=document.querySelectorAll(".gbtn[data-taborder]");if(!o||o.length<=0)return;if(!s){var r=X();return void(r&&(r.focus(),h(r,"focused")))}var a=X(s.getAttribute("data-taborder"));d(s,"focused"),a&&(a.focus(),h(a,"focused"));}39==n&&e.nextSlide(),37==n&&e.prevSlide(),27==n&&e.close();}});}function Y(e){return Math.sqrt(e.x*e.x+e.y*e.y)}function q(e,t){var i=function(e,t){var i=Y(e)*Y(t);if(0===i)return 0;var n=function(e,t){return e.x*t.x+e.y*t.y}(e,t)/i;return n>1&&(n=1),Math.acos(n)}(e,t);return function(e,t){return e.x*t.y-t.x*e.y}(e,t)>0&&(i*=-1),180*i/Math.PI}var N=function(){function e(i){t(this,e),this.handlers=[],this.el=i;}return n(e,[{key:"add",value:function(e){this.handlers.push(e);}},{key:"del",value:function(e){e||(this.handlers=[]);for(var t=this.handlers.length;t>=0;t--)this.handlers[t]===e&&this.handlers.splice(t,1);}},{key:"dispatch",value:function(){for(var e=0,t=this.handlers.length;e<t;e++){var i=this.handlers[e];"function"==typeof i&&i.apply(this.el,arguments);}}}]),e}();function D(e,t){var i=new N(e);return i.add(t),i}var _=function(){function e(i,n){t(this,e),this.element="string"==typeof i?document.querySelector(i):i,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),this.element.addEventListener("touchstart",this.start,!1),this.element.addEventListener("touchmove",this.move,!1),this.element.addEventListener("touchend",this.end,!1),this.element.addEventListener("touchcancel",this.cancel,!1),this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1;var s=function(){};this.rotate=D(this.element,n.rotate||s),this.touchStart=D(this.element,n.touchStart||s),this.multipointStart=D(this.element,n.multipointStart||s),this.multipointEnd=D(this.element,n.multipointEnd||s),this.pinch=D(this.element,n.pinch||s),this.swipe=D(this.element,n.swipe||s),this.tap=D(this.element,n.tap||s),this.doubleTap=D(this.element,n.doubleTap||s),this.longTap=D(this.element,n.longTap||s),this.singleTap=D(this.element,n.singleTap||s),this.pressMove=D(this.element,n.pressMove||s),this.twoFingerPressMove=D(this.element,n.twoFingerPressMove||s),this.touchMove=D(this.element,n.touchMove||s),this.touchEnd=D(this.element,n.touchEnd||s),this.touchCancel=D(this.element,n.touchCancel||s),this.translateContainer=this.element,this._cancelAllHandler=this.cancelAll.bind(this),window.addEventListener("scroll",this._cancelAllHandler),this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null};}return n(e,[{key:"start",value:function(e){if(e.touches){if(e.target&&e.target.nodeName&&["a","button","input"].indexOf(e.target.nodeName.toLowerCase())>=0)console.log("ignore drag for this touched element",e.target.nodeName.toLowerCase());else {this.now=Date.now(),this.x1=e.touches[0].pageX,this.y1=e.touches[0].pageY,this.delta=this.now-(this.last||this.now),this.touchStart.dispatch(e,this.element),null!==this.preTapPosition.x&&(this.isDoubleTap=this.delta>0&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30,this.isDoubleTap&&clearTimeout(this.singleTapTimeout)),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var t=this.preV;if(e.touches.length>1){this._cancelLongTap(),this._cancelSingleTap();var i={x:e.touches[1].pageX-this.x1,y:e.touches[1].pageY-this.y1};t.x=i.x,t.y=i.y,this.pinchStartLen=Y(t),this.multipointStart.dispatch(e,this.element);}this._preventTap=!1,this.longTapTimeout=setTimeout(function(){this.longTap.dispatch(e,this.element),this._preventTap=!0;}.bind(this),750);}}}},{key:"move",value:function(e){if(e.touches){var t=this.preV,i=e.touches.length,n=e.touches[0].pageX,s=e.touches[0].pageY;if(this.isDoubleTap=!1,i>1){var l=e.touches[1].pageX,o=e.touches[1].pageY,r={x:e.touches[1].pageX-n,y:e.touches[1].pageY-s};null!==t.x&&(this.pinchStartLen>0&&(e.zoom=Y(r)/this.pinchStartLen,this.pinch.dispatch(e,this.element)),e.angle=q(r,t),this.rotate.dispatch(e,this.element)),t.x=r.x,t.y=r.y,null!==this.x2&&null!==this.sx2?(e.deltaX=(n-this.x2+l-this.sx2)/2,e.deltaY=(s-this.y2+o-this.sy2)/2):(e.deltaX=0,e.deltaY=0),this.twoFingerPressMove.dispatch(e,this.element),this.sx2=l,this.sy2=o;}else {if(null!==this.x2){e.deltaX=n-this.x2,e.deltaY=s-this.y2;var a=Math.abs(this.x1-this.x2),h=Math.abs(this.y1-this.y2);(a>10||h>10)&&(this._preventTap=!0);}else e.deltaX=0,e.deltaY=0;this.pressMove.dispatch(e,this.element);}this.touchMove.dispatch(e,this.element),this._cancelLongTap(),this.x2=n,this.y2=s,i>1&&e.preventDefault();}}},{key:"end",value:function(e){if(e.changedTouches){this._cancelLongTap();var t=this;e.touches.length<2&&(this.multipointEnd.dispatch(e,this.element),this.sx2=this.sy2=null),this.x2&&Math.abs(this.x1-this.x2)>30||this.y2&&Math.abs(this.y1-this.y2)>30?(e.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout((function(){t.swipe.dispatch(e,t.element);}),0)):(this.tapTimeout=setTimeout((function(){t._preventTap||t.tap.dispatch(e,t.element),t.isDoubleTap&&(t.doubleTap.dispatch(e,t.element),t.isDoubleTap=!1);}),0),t.isDoubleTap||(t.singleTapTimeout=setTimeout((function(){t.singleTap.dispatch(e,t.element);}),250))),this.touchEnd.dispatch(e,this.element),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=null;}}},{key:"cancelAll",value:function(){this._preventTap=!0,clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout);}},{key:"cancel",value:function(e){this.cancelAll(),this.touchCancel.dispatch(e,this.element);}},{key:"_cancelLongTap",value:function(){clearTimeout(this.longTapTimeout);}},{key:"_cancelSingleTap",value:function(){clearTimeout(this.singleTapTimeout);}},{key:"_swipeDirection",value:function(e,t,i,n){return Math.abs(e-t)>=Math.abs(i-n)?e-t>0?"Left":"Right":i-n>0?"Up":"Down"}},{key:"on",value:function(e,t){this[e]&&this[e].add(t);}},{key:"off",value:function(e,t){this[e]&&this[e].del(t);}},{key:"destroy",value:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),this.element.removeEventListener("touchstart",this.start),this.element.removeEventListener("touchmove",this.move),this.element.removeEventListener("touchend",this.end),this.element.removeEventListener("touchcancel",this.cancel),this.rotate.del(),this.touchStart.del(),this.multipointStart.del(),this.multipointEnd.del(),this.pinch.del(),this.swipe.del(),this.tap.del(),this.doubleTap.del(),this.longTap.del(),this.singleTap.del(),this.pressMove.del(),this.twoFingerPressMove.del(),this.touchMove.del(),this.touchEnd.del(),this.touchCancel.del(),this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=this.rotate=this.touchStart=this.multipointStart=this.multipointEnd=this.pinch=this.swipe=this.tap=this.doubleTap=this.longTap=this.singleTap=this.pressMove=this.touchMove=this.touchEnd=this.touchCancel=this.twoFingerPressMove=null,window.removeEventListener("scroll",this._cancelAllHandler),null}}]),e}();function W(e){var t=function(){var e,t=document.createElement("fakeelement"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in i)if(void 0!==t.style[e])return i[e]}(),i=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,n=c(e,"gslide-media")?e:e.querySelector(".gslide-media"),s=u(n,".ginner-container"),l=e.querySelector(".gslide-description");i>769&&(n=s),h(n,"greset"),v(n,"translate3d(0, 0, 0)"),a(t,{onElement:n,once:!0,withCallback:function(e,t){d(n,"greset");}}),n.style.opacity="",l&&(l.style.opacity="");}function B(e){if(e.events.hasOwnProperty("touch"))return !1;var t,i,n,s=y(),l=s.width,o=s.height,r=!1,a=null,g=null,f=null,p=!1,m=1,x=1,b=!1,S=!1,w=null,T=null,C=null,k=null,E=0,A=0,L=!1,I=!1,O={},P={},M=0,X=0,z=document.getElementById("glightbox-slider"),Y=document.querySelector(".goverlay"),q=new _(z,{touchStart:function(t){if(r=!0,(c(t.targetTouches[0].target,"ginner-container")||u(t.targetTouches[0].target,".gslide-desc")||"a"==t.targetTouches[0].target.nodeName.toLowerCase())&&(r=!1),u(t.targetTouches[0].target,".gslide-inline")&&!c(t.targetTouches[0].target.parentNode,"gslide-inline")&&(r=!1),r){if(P=t.targetTouches[0],O.pageX=t.targetTouches[0].pageX,O.pageY=t.targetTouches[0].pageY,M=t.targetTouches[0].clientX,X=t.targetTouches[0].clientY,a=e.activeSlide,g=a.querySelector(".gslide-media"),n=a.querySelector(".gslide-inline"),f=null,c(g,"gslide-image")&&(f=g.querySelector("img")),(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)>769&&(g=a.querySelector(".ginner-container")),d(Y,"greset"),t.pageX>20&&t.pageX<window.innerWidth-20)return;t.preventDefault();}},touchMove:function(s){if(r&&(P=s.targetTouches[0],!b&&!S)){if(n&&n.offsetHeight>o){var a=O.pageX-P.pageX;if(Math.abs(a)<=13)return !1}p=!0;var h,d=s.targetTouches[0].clientX,c=s.targetTouches[0].clientY,u=M-d,m=X-c;if(Math.abs(u)>Math.abs(m)?(L=!1,I=!0):(I=!1,L=!0),t=P.pageX-O.pageX,E=100*t/l,i=P.pageY-O.pageY,A=100*i/o,L&&f&&(h=1-Math.abs(i)/o,Y.style.opacity=h,e.settings.touchFollowAxis&&(E=0)),I&&(h=1-Math.abs(t)/l,g.style.opacity=h,e.settings.touchFollowAxis&&(A=0)),!f)return v(g,"translate3d(".concat(E,"%, 0, 0)"));v(g,"translate3d(".concat(E,"%, ").concat(A,"%, 0)"));}},touchEnd:function(){if(r){if(p=!1,S||b)return C=w,void(k=T);var t=Math.abs(parseInt(A)),i=Math.abs(parseInt(E));if(!(t>29&&f))return t<29&&i<25?(h(Y,"greset"),Y.style.opacity=1,W(g)):void 0;e.close();}},multipointEnd:function(){setTimeout((function(){b=!1;}),50);},multipointStart:function(){b=!0,m=x||1;},pinch:function(e){if(!f||p)return !1;b=!0,f.scaleX=f.scaleY=m*e.zoom;var t=m*e.zoom;if(S=!0,t<=1)return S=!1,t=1,k=null,C=null,w=null,T=null,void f.setAttribute("style","");t>4.5&&(t=4.5),f.style.transform="scale3d(".concat(t,", ").concat(t,", 1)"),x=t;},pressMove:function(e){if(S&&!b){var t=P.pageX-O.pageX,i=P.pageY-O.pageY;C&&(t+=C),k&&(i+=k),w=t,T=i;var n="translate3d(".concat(t,"px, ").concat(i,"px, 0)");x&&(n+=" scale3d(".concat(x,", ").concat(x,", 1)")),v(f,n);}},swipe:function(t){if(!S)if(b)b=!1;else {if("Left"==t.direction){if(e.index==e.elements.length-1)return W(g);e.nextSlide();}if("Right"==t.direction){if(0==e.index)return W(g);e.prevSlide();}}}});e.events.touch=q;}var H=function(){function e(i,n){var s=this,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(t(this,e),this.img=i,this.slide=n,this.onclose=l,this.img.setZoomEvents)return !1;this.active=!1,this.zoomedIn=!1,this.dragging=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.img.addEventListener("mousedown",(function(e){return s.dragStart(e)}),!1),this.img.addEventListener("mouseup",(function(e){return s.dragEnd(e)}),!1),this.img.addEventListener("mousemove",(function(e){return s.drag(e)}),!1),this.img.addEventListener("click",(function(e){return s.slide.classList.contains("dragging-nav")?(s.zoomOut(),!1):s.zoomedIn?void(s.zoomedIn&&!s.dragging&&s.zoomOut()):s.zoomIn()}),!1),this.img.setZoomEvents=!0;}return n(e,[{key:"zoomIn",value:function(){var e=this.widowWidth();if(!(this.zoomedIn||e<=768)){var t=this.img;if(t.setAttribute("data-style",t.getAttribute("style")),t.style.maxWidth=t.naturalWidth+"px",t.style.maxHeight=t.naturalHeight+"px",t.naturalWidth>e){var i=e/2-t.naturalWidth/2;this.setTranslate(this.img.parentNode,i,0);}this.slide.classList.add("zoomed"),this.zoomedIn=!0;}}},{key:"zoomOut",value:function(){this.img.parentNode.setAttribute("style",""),this.img.setAttribute("style",this.img.getAttribute("data-style")),this.slide.classList.remove("zoomed"),this.zoomedIn=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.onclose&&"function"==typeof this.onclose&&this.onclose();}},{key:"dragStart",value:function(e){e.preventDefault(),this.zoomedIn?("touchstart"===e.type?(this.initialX=e.touches[0].clientX-this.xOffset,this.initialY=e.touches[0].clientY-this.yOffset):(this.initialX=e.clientX-this.xOffset,this.initialY=e.clientY-this.yOffset),e.target===this.img&&(this.active=!0,this.img.classList.add("dragging"))):this.active=!1;}},{key:"dragEnd",value:function(e){var t=this;e.preventDefault(),this.initialX=this.currentX,this.initialY=this.currentY,this.active=!1,setTimeout((function(){t.dragging=!1,t.img.isDragging=!1,t.img.classList.remove("dragging");}),100);}},{key:"drag",value:function(e){this.active&&(e.preventDefault(),"touchmove"===e.type?(this.currentX=e.touches[0].clientX-this.initialX,this.currentY=e.touches[0].clientY-this.initialY):(this.currentX=e.clientX-this.initialX,this.currentY=e.clientY-this.initialY),this.xOffset=this.currentX,this.yOffset=this.currentY,this.img.isDragging=!0,this.dragging=!0,this.setTranslate(this.img,this.currentX,this.currentY));}},{key:"onMove",value:function(e){if(this.zoomedIn){var t=e.clientX-this.img.naturalWidth/2,i=e.clientY-this.img.naturalHeight/2;this.setTranslate(this.img,t,i);}}},{key:"setTranslate",value:function(e,t,i){e.style.transform="translate3d("+t+"px, "+i+"px, 0)";}},{key:"widowWidth",value:function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth}}]),e}(),V=function(){function e(){var i=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e);var s=n.dragEl,l=n.toleranceX,o=void 0===l?40:l,r=n.toleranceY,a=void 0===r?65:r,h=n.slide,d=void 0===h?null:h,c=n.instance,u=void 0===c?null:c;this.el=s,this.active=!1,this.dragging=!1,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.direction=null,this.lastDirection=null,this.toleranceX=o,this.toleranceY=a,this.toleranceReached=!1,this.dragContainer=this.el,this.slide=d,this.instance=u,this.el.addEventListener("mousedown",(function(e){return i.dragStart(e)}),!1),this.el.addEventListener("mouseup",(function(e){return i.dragEnd(e)}),!1),this.el.addEventListener("mousemove",(function(e){return i.drag(e)}),!1);}return n(e,[{key:"dragStart",value:function(e){if(this.slide.classList.contains("zoomed"))this.active=!1;else {"touchstart"===e.type?(this.initialX=e.touches[0].clientX-this.xOffset,this.initialY=e.touches[0].clientY-this.yOffset):(this.initialX=e.clientX-this.xOffset,this.initialY=e.clientY-this.yOffset);var t=e.target.nodeName.toLowerCase();e.target.classList.contains("nodrag")||u(e.target,".nodrag")||-1!==["input","select","textarea","button","a"].indexOf(t)?this.active=!1:(e.preventDefault(),(e.target===this.el||"img"!==t&&u(e.target,".gslide-inline"))&&(this.active=!0,this.el.classList.add("dragging"),this.dragContainer=u(e.target,".ginner-container")));}}},{key:"dragEnd",value:function(e){var t=this;e&&e.preventDefault(),this.initialX=0,this.initialY=0,this.currentX=null,this.currentY=null,this.initialX=null,this.initialY=null,this.xOffset=0,this.yOffset=0,this.active=!1,this.doSlideChange&&(this.instance.preventOutsideClick=!0,"right"==this.doSlideChange&&this.instance.prevSlide(),"left"==this.doSlideChange&&this.instance.nextSlide()),this.doSlideClose&&this.instance.close(),this.toleranceReached||this.setTranslate(this.dragContainer,0,0,!0),setTimeout((function(){t.instance.preventOutsideClick=!1,t.toleranceReached=!1,t.lastDirection=null,t.dragging=!1,t.el.isDragging=!1,t.el.classList.remove("dragging"),t.slide.classList.remove("dragging-nav"),t.dragContainer.style.transform="",t.dragContainer.style.transition="";}),100);}},{key:"drag",value:function(e){if(this.active){e.preventDefault(),this.slide.classList.add("dragging-nav"),"touchmove"===e.type?(this.currentX=e.touches[0].clientX-this.initialX,this.currentY=e.touches[0].clientY-this.initialY):(this.currentX=e.clientX-this.initialX,this.currentY=e.clientY-this.initialY),this.xOffset=this.currentX,this.yOffset=this.currentY,this.el.isDragging=!0,this.dragging=!0,this.doSlideChange=!1,this.doSlideClose=!1;var t=Math.abs(this.currentX),i=Math.abs(this.currentY);if(t>0&&t>=Math.abs(this.currentY)&&(!this.lastDirection||"x"==this.lastDirection)){this.yOffset=0,this.lastDirection="x",this.setTranslate(this.dragContainer,this.currentX,0);var n=this.shouldChange();if(!this.instance.settings.dragAutoSnap&&n&&(this.doSlideChange=n),this.instance.settings.dragAutoSnap&&n)return this.instance.preventOutsideClick=!0,this.toleranceReached=!0,this.active=!1,this.instance.preventOutsideClick=!0,this.dragEnd(null),"right"==n&&this.instance.prevSlide(),void("left"==n&&this.instance.nextSlide())}if(this.toleranceY>0&&i>0&&i>=t&&(!this.lastDirection||"y"==this.lastDirection)){this.xOffset=0,this.lastDirection="y",this.setTranslate(this.dragContainer,0,this.currentY);var s=this.shouldClose();return !this.instance.settings.dragAutoSnap&&s&&(this.doSlideClose=!0),void(this.instance.settings.dragAutoSnap&&s&&this.instance.close())}}}},{key:"shouldChange",value:function(){var e=!1;if(Math.abs(this.currentX)>=this.toleranceX){var t=this.currentX>0?"right":"left";("left"==t&&this.slide!==this.slide.parentNode.lastChild||"right"==t&&this.slide!==this.slide.parentNode.firstChild)&&(e=t);}return e}},{key:"shouldClose",value:function(){var e=!1;return Math.abs(this.currentY)>=this.toleranceY&&(e=!0),e}},{key:"setTranslate",value:function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e.style.transition=n?"all .2s ease":"",e.style.transform="translate3d(".concat(t,"px, ").concat(i,"px, 0)");}}]),e}();function j(e,t,i,n){var s=e.querySelector(".gslide-media"),l=new Image,o="gSlideTitle_"+i,r="gSlideDesc_"+i;l.addEventListener("load",(function(){T(n)&&n();}),!1),l.src=t.href,l.alt="",""!==t.title&&l.setAttribute("aria-labelledby",o),""!==t.description&&l.setAttribute("aria-describedby",r),t.hasOwnProperty("_hasCustomWidth")&&t._hasCustomWidth&&(l.style.width=t.width),t.hasOwnProperty("_hasCustomHeight")&&t._hasCustomHeight&&(l.style.height=t.height),s.insertBefore(l,s.firstChild);}function F(e,t,i,n){var s=this,l=e.querySelector(".ginner-container"),o="gvideo"+i,r=e.querySelector(".gslide-media"),a=this.getAllPlayers();h(l,"gvideo-container"),r.insertBefore(m('<div class="gvideo-wrapper"></div>'),r.firstChild);var d=e.querySelector(".gvideo-wrapper");S(this.settings.plyr.css,"Plyr");var c=t.href;location.protocol.replace(":","");var g="",v="",f=!1;r.style.maxWidth=t.width,S(this.settings.plyr.js,"Plyr",(function(){if(c.match(/vimeo\.com\/([0-9]*)/)){var l=/vimeo.*\/(\d+)/i.exec(c);g="vimeo",v=l[1];}if(c.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/)||c.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)||c.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)){var r=function(e){var t="";t=void 0!==(e=e.replace(/(>|<)/gi,"").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2]?(t=e[2].split(/[^0-9a-z_\-]/i))[0]:e;return t}(c);g="youtube",v=r;}if(null!==c.match(/\.(mp4|ogg|webm|mov)$/)){g="local";var u='<video id="'+o+'" ';u+='style="background:#000; max-width: '.concat(t.width,';" '),u+='preload="metadata" ',u+='x-webkit-airplay="allow" ',u+='webkit-playsinline="" ',u+="controls ",u+='class="gvideo-local">';var p=c.toLowerCase().split(".").pop(),y={mp4:"",ogg:"",webm:""};for(var x in y[p="mov"==p?"mp4":p]=c,y)if(y.hasOwnProperty(x)){var S=y[x];t.hasOwnProperty(x)&&(S=t[x]),""!==S&&(u+='<source src="'.concat(S,'" type="video/').concat(x,'">'));}f=m(u+="</video>");}var w=f||m('<div id="'.concat(o,'" data-plyr-provider="').concat(g,'" data-plyr-embed-id="').concat(v,'"></div>'));h(d,"".concat(g,"-video gvideo")),d.appendChild(w),d.setAttribute("data-id",o),d.setAttribute("data-index",i);var C=O(s.settings.plyr,"config")?s.settings.plyr.config:{},k=new Plyr("#"+o,C);k.on("ready",(function(e){var t=e.detail.plyr;a[o]=t,T(n)&&n();})),b((function(){return e.querySelector("iframe")&&"true"==e.querySelector("iframe").dataset.ready}),(function(){s.resize(e);})),k.on("enterfullscreen",R),k.on("exitfullscreen",R);}));}function R(e){var t=u(e.target,".gslide-media");"enterfullscreen"==e.type&&h(t,"fullscreen"),"exitfullscreen"==e.type&&d(t,"fullscreen");}function G(e,t,i,n){var s,l=this,o=e.querySelector(".gslide-media"),r=!(!O(t,"href")||!t.href)&&t.href.split("#").pop().trim(),d=!(!O(t,"content")||!t.content)&&t.content;if(d&&(C(d)&&(s=m('<div class="ginlined-content">'.concat(d,"</div>"))),k(d))){"none"==d.style.display&&(d.style.display="block");var c=document.createElement("div");c.className="ginlined-content",c.appendChild(d),s=c;}if(r){var u=document.getElementById(r);if(!u)return !1;var g=u.cloneNode(!0);g.style.height=t.height,g.style.maxWidth=t.width,h(g,"ginlined-content"),s=g;}if(!s)return console.error("Unable to append inline slide content",t),!1;o.style.height=t.height,o.style.width=t.width,o.appendChild(s),this.events["inlineclose"+r]=a("click",{onElement:o.querySelectorAll(".gtrigger-close"),withCallback:function(e){e.preventDefault(),l.close();}}),T(n)&&n();}function Z(e,t,i,n){var s=e.querySelector(".gslide-media"),l=function(e){var t=e.url,i=e.allow,n=e.callback,s=e.appendTo,l=document.createElement("iframe");return l.className="vimeo-video gvideo",l.src=t,l.style.width="100%",l.style.height="100%",i&&l.setAttribute("allow",i),l.onload=function(){h(l,"node-ready"),T(n)&&n();},s&&s.appendChild(l),l}({url:t.href,callback:n});s.parentNode.style.maxWidth=t.width,s.parentNode.style.height=t.height,s.appendChild(l);}var $=function(){function e(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e),this.defaults={href:"",title:"",type:"",description:"",descPosition:"bottom",effect:"",width:"",height:"",content:!1,zoomable:!0,draggable:!0},L(i)&&(this.defaults=l(this.defaults,i));}return n(e,[{key:"sourceType",value:function(e){var t=e;if(null!==(e=e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|svg)$/))return "image";if(e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/)||e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)||e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/))return "video";if(e.match(/vimeo\.com\/([0-9]*)/))return "video";if(null!==e.match(/\.(mp4|ogg|webm|mov)$/))return "video";if(null!==e.match(/\.(mp3|wav|wma|aac|ogg)$/))return "audio";if(e.indexOf("#")>-1&&""!==t.split("#").pop().trim())return "inline";return e.indexOf("goajax=true")>-1?"ajax":"external"}},{key:"parseConfig",value:function(e,t){var i=this,n=l({descPosition:t.descPosition},this.defaults);if(L(e)&&!k(e)){O(e,"type")||(O(e,"content")&&e.content?e.type="inline":O(e,"href")&&(e.type=this.sourceType(e.href)));var s=l(n,e);return this.setSize(s,t),s}var r="",a=e.getAttribute("data-glightbox"),h=e.nodeName.toLowerCase();if("a"===h&&(r=e.href),"img"===h&&(r=e.src),n.href=r,o(n,(function(s,l){O(t,l)&&"width"!==l&&(n[l]=t[l]);var o=e.dataset[l];I(o)||(n[l]=i.sanitizeValue(o));})),n.content&&(n.type="inline"),!n.type&&r&&(n.type=this.sourceType(r)),I(a)){if(!n.title&&"a"==h){var d=e.title;I(d)||""===d||(n.title=d);}if(!n.title&&"img"==h){var c=e.alt;I(c)||""===c||(n.title=c);}}else {var u=[];o(n,(function(e,t){u.push(";\\s?"+t);})),u=u.join("\\s?:|"),""!==a.trim()&&o(n,(function(e,t){var s=a,l=new RegExp("s?"+t+"s?:s?(.*?)("+u+"s?:|$)"),o=s.match(l);if(o&&o.length&&o[1]){var r=o[1].trim().replace(/;\s*$/,"");n[t]=i.sanitizeValue(r);}}));}if(n.description&&"."===n.description.substring(0,1)){var g;try{g=document.querySelector(n.description).innerHTML;}catch(e){if(!(e instanceof DOMException))throw e}g&&(n.description=g);}if(!n.description){var v=e.querySelector(".glightbox-desc");v&&(n.description=v.innerHTML);}return this.setSize(n,t,e),this.slideConfig=n,n}},{key:"setSize",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n="video"==e.type?this.checkSize(t.videosWidth):this.checkSize(t.width),s=this.checkSize(t.height);return e.width=O(e,"width")&&""!==e.width?this.checkSize(e.width):n,e.height=O(e,"height")&&""!==e.height?this.checkSize(e.height):s,i&&"image"==e.type&&(e._hasCustomWidth=!!i.dataset.width,e._hasCustomHeight=!!i.dataset.height),e}},{key:"checkSize",value:function(e){return M(e)?"".concat(e,"px"):e}},{key:"sanitizeValue",value:function(e){return "true"!==e&&"false"!==e?e:"true"===e}}]),e}(),U=function(){function e(i,n,s){t(this,e),this.element=i,this.instance=n,this.index=s;}return n(e,[{key:"setContent",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(c(t,"loaded"))return !1;var n=this.instance.settings,s=this.slideConfig,l=w();T(n.beforeSlideLoad)&&n.beforeSlideLoad({index:this.index,slide:t,player:!1});var o=s.type,r=s.descPosition,a=t.querySelector(".gslide-media"),d=t.querySelector(".gslide-title"),u=t.querySelector(".gslide-desc"),g=t.querySelector(".gdesc-inner"),v=i,f="gSlideTitle_"+this.index,p="gSlideDesc_"+this.index;if(T(n.afterSlideLoad)&&(v=function(){T(i)&&i(),n.afterSlideLoad({index:e.index,slide:t,player:e.instance.getSlidePlayerInstance(e.index)});}),""==s.title&&""==s.description?g&&g.parentNode.parentNode.removeChild(g.parentNode):(d&&""!==s.title?(d.id=f,d.innerHTML=s.title):d.parentNode.removeChild(d),u&&""!==s.description?(u.id=p,l&&n.moreLength>0?(s.smallDescription=this.slideShortDesc(s.description,n.moreLength,n.moreText),u.innerHTML=s.smallDescription,this.descriptionEvents(u,s)):u.innerHTML=s.description):u.parentNode.removeChild(u),h(a.parentNode,"desc-".concat(r)),h(g.parentNode,"description-".concat(r))),h(a,"gslide-".concat(o)),h(t,"loaded"),"video"!==o){if("external"!==o)return "inline"===o?(G.apply(this.instance,[t,s,this.index,v]),void(n.draggable&&new V({dragEl:t.querySelector(".gslide-inline"),toleranceX:n.dragToleranceX,toleranceY:n.dragToleranceY,slide:t,instance:this.instance}))):void("image"!==o?T(v)&&v():j(t,s,this.index,(function(){var i=t.querySelector("img");n.draggable&&new V({dragEl:i,toleranceX:n.dragToleranceX,toleranceY:n.dragToleranceY,slide:t,instance:e.instance}),s.zoomable&&i.naturalWidth>i.offsetWidth&&(h(i,"zoomable"),new H(i,t,(function(){e.instance.resize();}))),T(v)&&v();})));Z.apply(this,[t,s,this.index,v]);}else F.apply(this.instance,[t,s,this.index,v]);}},{key:"slideShortDesc",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=document.createElement("div");n.innerHTML=e;var s=n.innerText,l=i;if((e=s.trim()).length<=t)return e;var o=e.substr(0,t-1);return l?(n=null,o+'... <a href="#" class="desc-more">'+i+"</a>"):o}},{key:"descriptionEvents",value:function(e,t){var i=this,n=e.querySelector(".desc-more");if(!n)return !1;a("click",{onElement:n,withCallback:function(e,n){e.preventDefault();var s=document.body,l=u(n,".gslide-desc");if(!l)return !1;l.innerHTML=t.description,h(s,"gdesc-open");var o=a("click",{onElement:[s,u(l,".gslide-description")],withCallback:function(e,n){"a"!==e.target.nodeName.toLowerCase()&&(d(s,"gdesc-open"),h(s,"gdesc-closed"),l.innerHTML=t.smallDescription,i.descriptionEvents(l,t),setTimeout((function(){d(s,"gdesc-closed");}),400),o.destroy());}});}});}},{key:"create",value:function(){return m(this.instance.settings.slideHTML)}},{key:"getConfig",value:function(){var e=new $(this.instance.settings.slideExtraAttributes);return this.slideConfig=e.parseConfig(this.element,this.instance.settings),this.slideConfig}}]),e}(),J=w(),K=null!==w()||void 0!==document.createTouch||"ontouchstart"in window||"onmsgesturechange"in window||navigator.msMaxTouchPoints,Q=document.getElementsByTagName("html")[0],ee={selector:".glightbox",elements:null,skin:"clean",theme:"clean",closeButton:!0,startAt:null,autoplayVideos:!0,autofocusVideos:!0,descPosition:"bottom",width:"900px",height:"506px",videosWidth:"960px",beforeSlideChange:null,afterSlideChange:null,beforeSlideLoad:null,afterSlideLoad:null,slideInserted:null,slideRemoved:null,slideExtraAttributes:null,onOpen:null,onClose:null,loop:!1,zoomable:!0,draggable:!0,dragAutoSnap:!1,dragToleranceX:40,dragToleranceY:65,preload:!0,oneSlidePerOpen:!1,touchNavigation:!0,touchFollowAxis:!0,keyboardNavigation:!0,closeOnOutsideClick:!0,plugins:!1,plyr:{css:"https://cdn.plyr.io/3.6.8/plyr.css",js:"https://cdn.plyr.io/3.6.8/plyr.js",config:{ratio:"16:9",fullscreen:{enabled:!0,iosNative:!0},youtube:{noCookie:!0,rel:0,showinfo:0,iv_load_policy:3},vimeo:{byline:!1,portrait:!1,title:!1,transparent:!1}}},openEffect:"zoom",closeEffect:"zoom",slideEffect:"slide",moreText:"See more",moreLength:60,cssEfects:{fade:{in:"fadeIn",out:"fadeOut"},zoom:{in:"zoomIn",out:"zoomOut"},slide:{in:"slideInRight",out:"slideOutLeft"},slideBack:{in:"slideInLeft",out:"slideOutRight"},none:{in:"none",out:"none"}},svg:{close:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',next:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',prev:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'},slideHTML:'<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',lightboxHTML:'<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>'},te=function(){function e(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e),this.customOptions=i,this.settings=l(ee,i),this.effectsClasses=this.getAnimationClasses(),this.videoPlayers={},this.apiEvents=[],this.fullElementsList=!1;}return n(e,[{key:"init",value:function(){var e=this,t=this.getSelector();t&&(this.baseEvents=a("click",{onElement:t,withCallback:function(t,i){t.preventDefault(),e.open(i);}})),this.elements=this.getElements();}},{key:"open",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(0==this.elements.length)return !1;this.activeSlide=null,this.prevActiveSlideIndex=null,this.prevActiveSlide=null;var i=M(t)?t:this.settings.startAt;if(k(e)){var n=e.getAttribute("data-gallery");n&&(this.fullElementsList=this.elements,this.elements=this.getGalleryElements(this.elements,n)),I(i)&&(i=this.getElementIndex(e))<0&&(i=0);}M(i)||(i=0),this.build(),g(this.overlay,"none"==this.settings.openEffect?"none":this.settings.cssEfects.fade.in);var s=document.body,l=window.innerWidth-document.documentElement.clientWidth;if(l>0){var o=document.createElement("style");o.type="text/css",o.className="gcss-styles",o.innerText=".gscrollbar-fixer {margin-right: ".concat(l,"px}"),document.head.appendChild(o),h(s,"gscrollbar-fixer");}h(s,"glightbox-open"),h(Q,"glightbox-open"),J&&(h(document.body,"glightbox-mobile"),this.settings.slideEffect="slide"),this.showSlide(i,!0),1==this.elements.length?(h(this.prevButton,"glightbox-button-hidden"),h(this.nextButton,"glightbox-button-hidden")):(d(this.prevButton,"glightbox-button-hidden"),d(this.nextButton,"glightbox-button-hidden")),this.lightboxOpen=!0,this.trigger("open"),T(this.settings.onOpen)&&this.settings.onOpen(),K&&this.settings.touchNavigation&&B(this),this.settings.keyboardNavigation&&z(this);}},{key:"openAt",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.open(null,e);}},{key:"showSlide",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];f(this.loader),this.index=parseInt(t);var n=this.slidesContainer.querySelector(".current");n&&d(n,"current"),this.slideAnimateOut();var s=this.slidesContainer.querySelectorAll(".gslide")[t];if(c(s,"loaded"))this.slideAnimateIn(s,i),p(this.loader);else {f(this.loader);var l=this.elements[t],o={index:this.index,slide:s,slideNode:s,slideConfig:l.slideConfig,slideIndex:this.index,trigger:l.node,player:null};this.trigger("slide_before_load",o),l.instance.setContent(s,(function(){p(e.loader),e.resize(),e.slideAnimateIn(s,i),e.trigger("slide_after_load",o);}));}this.slideDescription=s.querySelector(".gslide-description"),this.slideDescriptionContained=this.slideDescription&&c(this.slideDescription.parentNode,"gslide-media"),this.settings.preload&&(this.preloadSlide(t+1),this.preloadSlide(t-1)),this.updateNavigationClasses(),this.activeSlide=s;}},{key:"preloadSlide",value:function(e){var t=this;if(e<0||e>this.elements.length-1)return !1;if(I(this.elements[e]))return !1;var i=this.slidesContainer.querySelectorAll(".gslide")[e];if(c(i,"loaded"))return !1;var n=this.elements[e],s=n.type,l={index:e,slide:i,slideNode:i,slideConfig:n.slideConfig,slideIndex:e,trigger:n.node,player:null};this.trigger("slide_before_load",l),"video"==s||"external"==s?setTimeout((function(){n.instance.setContent(i,(function(){t.trigger("slide_after_load",l);}));}),200):n.instance.setContent(i,(function(){t.trigger("slide_after_load",l);}));}},{key:"prevSlide",value:function(){this.goToSlide(this.index-1);}},{key:"nextSlide",value:function(){this.goToSlide(this.index+1);}},{key:"goToSlide",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.prevActiveSlide=this.activeSlide,this.prevActiveSlideIndex=this.index,!this.loop()&&(e<0||e>this.elements.length-1))return !1;e<0?e=this.elements.length-1:e>=this.elements.length&&(e=0),this.showSlide(e);}},{key:"insertSlide",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;t<0&&(t=this.elements.length);var i=new U(e,this,t),n=i.getConfig(),s=l({},n),o=i.create(),r=this.elements.length-1;s.index=t,s.node=!1,s.instance=i,s.slideConfig=n,this.elements.splice(t,0,s);var a=null,h=null;if(this.slidesContainer){if(t>r)this.slidesContainer.appendChild(o);else {var d=this.slidesContainer.querySelectorAll(".gslide")[t];this.slidesContainer.insertBefore(o,d);}(this.settings.preload&&0==this.index&&0==t||this.index-1==t||this.index+1==t)&&this.preloadSlide(t),0==this.index&&0==t&&(this.index=1),this.updateNavigationClasses(),a=this.slidesContainer.querySelectorAll(".gslide")[t],h=this.getSlidePlayerInstance(t),s.slideNode=a;}this.trigger("slide_inserted",{index:t,slide:a,slideNode:a,slideConfig:n,slideIndex:t,trigger:null,player:h}),T(this.settings.slideInserted)&&this.settings.slideInserted({index:t,slide:a,player:h});}},{key:"removeSlide",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;if(e<0||e>this.elements.length-1)return !1;var t=this.slidesContainer&&this.slidesContainer.querySelectorAll(".gslide")[e];t&&(this.getActiveSlideIndex()==e&&(e==this.elements.length-1?this.prevSlide():this.nextSlide()),t.parentNode.removeChild(t)),this.elements.splice(e,1),this.trigger("slide_removed",e),T(this.settings.slideRemoved)&&this.settings.slideRemoved(e);}},{key:"slideAnimateIn",value:function(e,t){var i=this,n=e.querySelector(".gslide-media"),s=e.querySelector(".gslide-description"),l={index:this.prevActiveSlideIndex,slide:this.prevActiveSlide,slideNode:this.prevActiveSlide,slideIndex:this.prevActiveSlide,slideConfig:I(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].slideConfig,trigger:I(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].node,player:this.getSlidePlayerInstance(this.prevActiveSlideIndex)},o={index:this.index,slide:this.activeSlide,slideNode:this.activeSlide,slideConfig:this.elements[this.index].slideConfig,slideIndex:this.index,trigger:this.elements[this.index].node,player:this.getSlidePlayerInstance(this.index)};if(n.offsetWidth>0&&s&&(p(s),s.style.display=""),d(e,this.effectsClasses),t)g(e,this.settings.cssEfects[this.settings.openEffect].in,(function(){i.settings.autoplayVideos&&i.slidePlayerPlay(e),i.trigger("slide_changed",{prev:l,current:o}),T(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[l,o]);}));else {var r=this.settings.slideEffect,a="none"!==r?this.settings.cssEfects[r].in:r;this.prevActiveSlideIndex>this.index&&"slide"==this.settings.slideEffect&&(a=this.settings.cssEfects.slideBack.in),g(e,a,(function(){i.settings.autoplayVideos&&i.slidePlayerPlay(e),i.trigger("slide_changed",{prev:l,current:o}),T(i.settings.afterSlideChange)&&i.settings.afterSlideChange.apply(i,[l,o]);}));}setTimeout((function(){i.resize(e);}),100),h(e,"current");}},{key:"slideAnimateOut",value:function(){if(!this.prevActiveSlide)return !1;var e=this.prevActiveSlide;d(e,this.effectsClasses),h(e,"prev");var t=this.settings.slideEffect,i="none"!==t?this.settings.cssEfects[t].out:t;this.slidePlayerPause(e),this.trigger("slide_before_change",{prev:{index:this.prevActiveSlideIndex,slide:this.prevActiveSlide,slideNode:this.prevActiveSlide,slideIndex:this.prevActiveSlideIndex,slideConfig:I(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].slideConfig,trigger:I(this.prevActiveSlideIndex)?null:this.elements[this.prevActiveSlideIndex].node,player:this.getSlidePlayerInstance(this.prevActiveSlideIndex)},current:{index:this.index,slide:this.activeSlide,slideNode:this.activeSlide,slideIndex:this.index,slideConfig:this.elements[this.index].slideConfig,trigger:this.elements[this.index].node,player:this.getSlidePlayerInstance(this.index)}}),T(this.settings.beforeSlideChange)&&this.settings.beforeSlideChange.apply(this,[{index:this.prevActiveSlideIndex,slide:this.prevActiveSlide,player:this.getSlidePlayerInstance(this.prevActiveSlideIndex)},{index:this.index,slide:this.activeSlide,player:this.getSlidePlayerInstance(this.index)}]),this.prevActiveSlideIndex>this.index&&"slide"==this.settings.slideEffect&&(i=this.settings.cssEfects.slideBack.out),g(e,i,(function(){var t=e.querySelector(".ginner-container"),i=e.querySelector(".gslide-media"),n=e.querySelector(".gslide-description");t.style.transform="",i.style.transform="",d(i,"greset"),i.style.opacity="",n&&(n.style.opacity=""),d(e,"prev");}));}},{key:"getAllPlayers",value:function(){return this.videoPlayers}},{key:"getSlidePlayerInstance",value:function(e){var t="gvideo"+e,i=this.getAllPlayers();return !(!O(i,t)||!i[t])&&i[t]}},{key:"stopSlideVideo",value:function(e){if(k(e)){var t=e.querySelector(".gvideo-wrapper");t&&(e=t.getAttribute("data-index"));}console.log("stopSlideVideo is deprecated, use slidePlayerPause");var i=this.getSlidePlayerInstance(e);i&&i.playing&&i.pause();}},{key:"slidePlayerPause",value:function(e){if(k(e)){var t=e.querySelector(".gvideo-wrapper");t&&(e=t.getAttribute("data-index"));}var i=this.getSlidePlayerInstance(e);i&&i.playing&&i.pause();}},{key:"playSlideVideo",value:function(e){if(k(e)){var t=e.querySelector(".gvideo-wrapper");t&&(e=t.getAttribute("data-index"));}console.log("playSlideVideo is deprecated, use slidePlayerPlay");var i=this.getSlidePlayerInstance(e);i&&!i.playing&&i.play();}},{key:"slidePlayerPlay",value:function(e){if(k(e)){var t=e.querySelector(".gvideo-wrapper");t&&(e=t.getAttribute("data-index"));}var i=this.getSlidePlayerInstance(e);i&&!i.playing&&(i.play(),this.settings.autofocusVideos&&i.elements.container.focus());}},{key:"setElements",value:function(e){var t=this;this.settings.elements=!1;var i=[];e&&e.length&&o(e,(function(e,n){var s=new U(e,t,n),o=s.getConfig(),r=l({},o);r.slideConfig=o,r.instance=s,r.index=n,i.push(r);})),this.elements=i,this.lightboxOpen&&(this.slidesContainer.innerHTML="",this.elements.length&&(o(this.elements,(function(){var e=m(t.settings.slideHTML);t.slidesContainer.appendChild(e);})),this.showSlide(0,!0)));}},{key:"getElementIndex",value:function(e){var t=!1;return o(this.elements,(function(i,n){if(O(i,"node")&&i.node==e)return t=n,!0})),t}},{key:"getElements",value:function(){var e=this,t=[];this.elements=this.elements?this.elements:[],!I(this.settings.elements)&&E(this.settings.elements)&&this.settings.elements.length&&o(this.settings.elements,(function(i,n){var s=new U(i,e,n),o=s.getConfig(),r=l({},o);r.node=!1,r.index=n,r.instance=s,r.slideConfig=o,t.push(r);}));var i=!1;return this.getSelector()&&(i=document.querySelectorAll(this.getSelector())),i?(o(i,(function(i,n){var s=new U(i,e,n),o=s.getConfig(),r=l({},o);r.node=i,r.index=n,r.instance=s,r.slideConfig=o,r.gallery=i.getAttribute("data-gallery"),t.push(r);})),t):t}},{key:"getGalleryElements",value:function(e,t){return e.filter((function(e){return e.gallery==t}))}},{key:"getSelector",value:function(){return !this.settings.elements&&(this.settings.selector&&"data-"==this.settings.selector.substring(0,5)?"*[".concat(this.settings.selector,"]"):this.settings.selector)}},{key:"getActiveSlide",value:function(){return this.slidesContainer.querySelectorAll(".gslide")[this.index]}},{key:"getActiveSlideIndex",value:function(){return this.index}},{key:"getAnimationClasses",value:function(){var e=[];for(var t in this.settings.cssEfects)if(this.settings.cssEfects.hasOwnProperty(t)){var i=this.settings.cssEfects[t];e.push("g".concat(i.in)),e.push("g".concat(i.out));}return e.join(" ")}},{key:"build",value:function(){var e=this;if(this.built)return !1;var t=document.body.childNodes,i=[];o(t,(function(e){e.parentNode==document.body&&"#"!==e.nodeName.charAt(0)&&e.hasAttribute&&!e.hasAttribute("aria-hidden")&&(i.push(e),e.setAttribute("aria-hidden","true"));}));var n=O(this.settings.svg,"next")?this.settings.svg.next:"",s=O(this.settings.svg,"prev")?this.settings.svg.prev:"",l=O(this.settings.svg,"close")?this.settings.svg.close:"",r=this.settings.lightboxHTML;r=m(r=(r=(r=r.replace(/{nextSVG}/g,n)).replace(/{prevSVG}/g,s)).replace(/{closeSVG}/g,l)),document.body.appendChild(r);var d=document.getElementById("glightbox-body");this.modal=d;var g=d.querySelector(".gclose");this.prevButton=d.querySelector(".gprev"),this.nextButton=d.querySelector(".gnext"),this.overlay=d.querySelector(".goverlay"),this.loader=d.querySelector(".gloader"),this.slidesContainer=document.getElementById("glightbox-slider"),this.bodyHiddenChildElms=i,this.events={},h(this.modal,"glightbox-"+this.settings.skin),this.settings.closeButton&&g&&(this.events.close=a("click",{onElement:g,withCallback:function(t,i){t.preventDefault(),e.close();}})),g&&!this.settings.closeButton&&g.parentNode.removeChild(g),this.nextButton&&(this.events.next=a("click",{onElement:this.nextButton,withCallback:function(t,i){t.preventDefault(),e.nextSlide();}})),this.prevButton&&(this.events.prev=a("click",{onElement:this.prevButton,withCallback:function(t,i){t.preventDefault(),e.prevSlide();}})),this.settings.closeOnOutsideClick&&(this.events.outClose=a("click",{onElement:d,withCallback:function(t,i){e.preventOutsideClick||c(document.body,"glightbox-mobile")||u(t.target,".ginner-container")||u(t.target,".gbtn")||c(t.target,"gnext")||c(t.target,"gprev")||e.close();}})),o(this.elements,(function(t,i){e.slidesContainer.appendChild(t.instance.create()),t.slideNode=e.slidesContainer.querySelectorAll(".gslide")[i];})),K&&h(document.body,"glightbox-touch"),this.events.resize=a("resize",{onElement:window,withCallback:function(){e.resize();}}),this.built=!0;}},{key:"resize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if((e=e||this.activeSlide)&&!c(e,"zoomed")){var t=y(),i=e.querySelector(".gvideo-wrapper"),n=e.querySelector(".gslide-image"),s=this.slideDescription,l=t.width,o=t.height;if(l<=768?h(document.body,"glightbox-mobile"):d(document.body,"glightbox-mobile"),i||n){var r=!1;if(s&&(c(s,"description-bottom")||c(s,"description-top"))&&!c(s,"gabsolute")&&(r=!0),n)if(l<=768)n.querySelector("img");else if(r){var a=s.offsetHeight,u=n.querySelector("img");u.setAttribute("style","max-height: calc(100vh - ".concat(a,"px)")),s.setAttribute("style","max-width: ".concat(u.offsetWidth,"px;"));}if(i){var g=O(this.settings.plyr.config,"ratio")?this.settings.plyr.config.ratio:"";if(!g){var v=i.clientWidth,f=i.clientHeight,p=v/f;g="".concat(v/p,":").concat(f/p);}var m=g.split(":"),x=this.settings.videosWidth,b=this.settings.videosWidth,S=(b=M(x)||-1!==x.indexOf("px")?parseInt(x):-1!==x.indexOf("vw")?l*parseInt(x)/100:-1!==x.indexOf("vh")?o*parseInt(x)/100:-1!==x.indexOf("%")?l*parseInt(x)/100:parseInt(i.clientWidth))/(parseInt(m[0])/parseInt(m[1]));if(S=Math.floor(S),r&&(o-=s.offsetHeight),b>l||S>o||o<S&&l>b){var w=i.offsetWidth,T=i.offsetHeight,C=o/T,k={width:w*C,height:T*C};i.parentNode.setAttribute("style","max-width: ".concat(k.width,"px")),r&&s.setAttribute("style","max-width: ".concat(k.width,"px;"));}else i.parentNode.style.maxWidth="".concat(x),r&&s.setAttribute("style","max-width: ".concat(x,";"));}}}}},{key:"reload",value:function(){this.init();}},{key:"updateNavigationClasses",value:function(){var e=this.loop();d(this.nextButton,"disabled"),d(this.prevButton,"disabled"),0==this.index&&this.elements.length-1==0?(h(this.prevButton,"disabled"),h(this.nextButton,"disabled")):0!==this.index||e?this.index!==this.elements.length-1||e||h(this.nextButton,"disabled"):h(this.prevButton,"disabled");}},{key:"loop",value:function(){var e=O(this.settings,"loopAtEnd")?this.settings.loopAtEnd:null;return e=O(this.settings,"loop")?this.settings.loop:e,e}},{key:"close",value:function(){var e=this;if(!this.lightboxOpen){if(this.events){for(var t in this.events)this.events.hasOwnProperty(t)&&this.events[t].destroy();this.events=null;}return !1}if(this.closing)return !1;this.closing=!0,this.slidePlayerPause(this.activeSlide),this.fullElementsList&&(this.elements=this.fullElementsList),this.bodyHiddenChildElms.length&&o(this.bodyHiddenChildElms,(function(e){e.removeAttribute("aria-hidden");})),h(this.modal,"glightbox-closing"),g(this.overlay,"none"==this.settings.openEffect?"none":this.settings.cssEfects.fade.out),g(this.activeSlide,this.settings.cssEfects[this.settings.closeEffect].out,(function(){if(e.activeSlide=null,e.prevActiveSlideIndex=null,e.prevActiveSlide=null,e.built=!1,e.events){for(var t in e.events)e.events.hasOwnProperty(t)&&e.events[t].destroy();e.events=null;}var i=document.body;d(Q,"glightbox-open"),d(i,"glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"),e.modal.parentNode.removeChild(e.modal),e.trigger("close"),T(e.settings.onClose)&&e.settings.onClose();var n=document.querySelector(".gcss-styles");n&&n.parentNode.removeChild(n),e.lightboxOpen=!1,e.closing=null;}));}},{key:"destroy",value:function(){this.close(),this.clearAllEvents(),this.baseEvents&&this.baseEvents.destroy();}},{key:"on",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!e||!T(t))throw new TypeError("Event name and callback must be defined");this.apiEvents.push({evt:e,once:i,callback:t});}},{key:"once",value:function(e,t){this.on(e,t,!0);}},{key:"trigger",value:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=[];o(this.apiEvents,(function(t,s){var l=t.evt,o=t.once,r=t.callback;l==e&&(r(i),o&&n.push(s));})),n.length&&o(n,(function(e){return t.apiEvents.splice(e,1)}));}},{key:"clearAllEvents",value:function(){this.apiEvents.splice(0,this.apiEvents.length);}},{key:"version",value:function(){return "3.0.9"}}]),e}();return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new te(e);return t.init(),t}}));
  });

  /**
   * ZipModal
   * ======================================
   * - show popup based on zip code
   */

  var INPUT = '.js-ZipModal';

  var ZipModal = function ZipModal() {
    var _this = this;

    _classCallCheck(this, ZipModal);

    _defineProperty(this, "submit", function (e) {
      var text = document.all.kraj.value;
      var address = document.all.cela_adresa.value;
      document.getElementById("modalAddress").innerHTML = address;
      document.getElementById("modalAddressNo").innerHTML = address;

      if (text === "Středočeský kraj" || text === "Hlavní město Praha") {
        _this.openModal('#glightbox-modal-1');
      } else {
        _this.openModal('#glightbox-modal-2');
      }

      e.preventDefault();
    });

    _defineProperty(this, "openModal", function (id) {
      var CLOSE_BUTTON = '.js-close-lightbox';
      var content = document.querySelector(id + ' > div').cloneNode(true);
      var modal = glightbox_min({
        skin: 'modal',
        elements: [{
          'content': content
        }]
      });
      modal.open(); // close

      document.querySelectorAll(CLOSE_BUTTON).forEach(function (el) {
        el.addEventListener('click', function () {
          modal.close();
        });
      });
    });

    this.input = document.querySelector(INPUT);

    if (!this.input) {
      return false;
    }

    this.form = this.input.closest('form');
    this.form.addEventListener('submit', this.submit, false);
  };

  new ZipModal();

  if ($('.giftModal').length) {
    var is_modal_show = sessionStorage.getItem('alreadyShow');

    if (is_modal_show != 'alredy shown') {
      setTimeout(callModal, 5000);
      sessionStorage.setItem('alreadyShow', 'alredy shown');
    }
  }

  glightbox_min();
  var lightboxInlineIframe = glightbox_min({
    selector: '.giftModal',
    touchNavigation: false,
    slideEffect: 'none',
    draggable: false,
    skin: 'modal giftmodalwrapper'
  });

  function callModal() {
    lightboxInlineIframe.open();
  }

  /**
   * Ajax Forms
   * ======================================
   * - global recaptcha js object required
   * - form validation handled via html5 required attribute
   * - handled with ajax/forms.php
   * - required [hidden] attribute css support
   * - recaptcha support https://developers.google.com/recaptcha/docs/v3
   */
  var AJAX_URL = '/api/index.php';
  var reCAPTCHA_site_key = "6Le--SUbAAAAAFbwYRj49pMtbv37FdmpnyljN6B7";
  var ELEMENTS = '.ajaxForm';
  var SUCCESS_CLASS = 'is-send';

  var AjaxForm = function AjaxForm() {
    var _this = this;

    _classCallCheck(this, AjaxForm);

    _defineProperty(this, "submitHandler", function (e) {
      var self = _this;
      e.preventDefault();

      {
        grecaptcha.ready(function () {
          grecaptcha.execute(reCAPTCHA_site_key, {
            action: 'submit'
          }).then(function (token) {
            self.ajaxHandler(e.target, token);
          });
        });
      }
    });

    _defineProperty(this, "spamProtection", function (form) {
      var formData = new FormData(form);

      if (formData.getAll('website')[0].length) {
        return false;
      }

      return true;
    });

    _defineProperty(this, "ajaxHandler", function (form, token) {
      var formData = new FormData(form);

      {
        formData.append('grecaptcha_token', token);
      }

      var parent = form.closest('.ajaxForm__parent');
      var body = parent.querySelector('.ajaxForm__body');
      var message = parent.querySelector('.ajaxForm__message');
      var message_success = parent.querySelector('.ajaxForm-success');
      var message_error = parent.querySelector('.ajaxForm-error');
      var submit = form.querySelector('button[type=submit]');
      submit.classList.add('is-loading');
      var xhr = new XMLHttpRequest();
      xhr.open('POST', _this.ajaxUrl, true);
      xhr.send(formData);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var response = JSON.parse(xhr.responseText);
          message.removeAttribute('hidden');

          {
            body.style.display = 'none';
          } // ok


          if (xhr.status === 200 && response.status == 'success') {
            message_success.removeAttribute('hidden');
            document.getElementById('form1').scrollIntoView();
            submit.classList.remove('is-loading');
            parent.classList.add(SUCCESS_CLASS);
            var conversionConf = {
              id: 100125206,
              value: null
            };

            if (window.rc && window.rc.conversionHit) {
              window.rc.conversionHit(conversionConf);
            }

            var flatButton = document.getElementById("flatButton");

            if (flatButton) {
              gtag('event', 'conversion', {
                'send_to': 'AW-599199696/uXKGCOCdtfYCENCf3J0C'
              });
            }
          } // error
          else {
              message_error.removeAttribute('hidden');
              console.log('js error!', xhr, response.errors);
            }
        }
      };
    });

    this.elements = document.querySelectorAll(ELEMENTS);
    this.ajaxUrl = AJAX_URL;
    this.elements.forEach(function (el) {
      el.addEventListener('submit', _this.submitHandler);
    });
  };

  new AjaxForm();

  // https://github.com/biati-digital/glightbox
  glightbox_min();

  $('#file-upload').change(function () {
    var limit = 5; // MB

    var file = $('#file-upload')[0].files[0];
    var fileName = file.name;
    var fileSize = (file.size / 1024 / 1024).toFixed(2);
    var $label = $(this).prev('label');

    if (fileSize > limit) {
      alert('Soubor může mít maximálně ' + limit + 'MB. Současná velikost: ' + fileSize + 'MB');
      return false;
    }

    $label.text(fileName);
  });

  var Numbers;
  (function (Numbers) {
      Numbers.parseOrElse = function (str, or) {
          if (or === void 0) { or = '0'; }
          if (str) {
              return parseInt(str);
          }
          return or && typeof or === 'string' ? parseInt(or) : 0;
      };
  })(Numbers || (Numbers = {}));

  var Element;
  (function (Element) {
      var isElement = function (element) { return element instanceof HTMLElement; };
      Element.setStyles = function (element, styles) {
          Object.keys(styles).map(function (key) {
              element.style[key] = styles[key];
          });
      };
      Element.getBoxStyles = function (element) {
          var computedValue = window.getComputedStyle(element);
          return {
              height: Numbers.parseOrElse(computedValue.height),
              padding: {
                  top: Numbers.parseOrElse(computedValue.paddingTop),
                  bottom: Numbers.parseOrElse(computedValue.paddingBottom),
              },
              border: {
                  top: Numbers.parseOrElse(computedValue.borderTopWidth),
                  bottom: Numbers.parseOrElse(computedValue.borderBottomWidth),
              },
          };
      };
      Element.getElement = function (element) {
          if (isElement(element)) {
              return element;
          }
          var elementFromSelector = document.querySelector(element);
          if (isElement(elementFromSelector)) {
              return elementFromSelector;
          }
          throw new Error('Your element does not exist in the DOM.');
      };
      Element.setAttribute = function (element, attribute, value) {
          element.setAttribute(attribute, value);
      };
      Element.getAttribute = function (element, attribute) {
          return element.getAttribute(attribute);
      };
  })(Element || (Element = {}));

  var Events;
  (function (Events) {
      Events.on = function (element, event, callback) {
          element.addEventListener(event, callback);
          return {
              destroy: function () { return element && element.removeEventListener(event, callback); },
          };
      };
  })(Events || (Events = {}));

  var __rest = (undefined && undefined.__rest) || function (s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  };
  var Animate;
  (function (Animate) {
      var slideToggleAttribute = 'data-slide-toggle';
      var onRequestAnimationFrame = function (callback) {
          requestAnimationFrame(callback);
      };
      var getTransition = function (options) {
          var _a = options.miliseconds, miliseconds = _a === void 0 ? 200 : _a, _b = options.transitionFunction, transitionFunction = _b === void 0 ? 'linear' : _b;
          return "all " + miliseconds + "ms " + transitionFunction + " 0s";
      };
      var isHidden = function (element) { return Element.getAttribute(element, slideToggleAttribute) === 'false'; };
      var isShown = function (element) { return Element.getAttribute(element, slideToggleAttribute) === 'true'; };
      Animate.shouldCollapse = function (element) {
          var attribute = Element.getAttribute(element, slideToggleAttribute);
          if (!attribute) {
              var height = Element.getBoxStyles(element).height;
              return height && height > 0;
          }
          return Element.getAttribute(element, slideToggleAttribute) === 'true';
      };
      Animate.hide = function (element, options) {
          var _a;
          if (isHidden(element)) {
              return;
          }
          (_a = options.onAnimationStart) === null || _a === void 0 ? void 0 : _a.call(options);
          var _b = Element.getBoxStyles(element), height = _b.height, boxStyles = __rest(_b, ["height"]);
          Element.setStyles(element, { transition: '' });
          onRequestAnimationFrame(function () {
              Element.setStyles(element, {
                  overflow: 'hidden',
                  height: height + "px",
                  paddingTop: boxStyles.padding.top + "px",
                  paddingBottom: boxStyles.padding.bottom + "px",
                  borderTopWidth: boxStyles.border.top + "px",
                  borderBottomWidth: boxStyles.border.bottom + "px",
                  transition: getTransition(options),
              });
              onRequestAnimationFrame(function () {
                  Element.setStyles(element, {
                      height: '0',
                      paddingTop: '0',
                      paddingBottom: '0',
                      borderTopWidth: '0',
                      borderBottomWidth: '0',
                  });
                  var event = Events.on(element, 'transitionend', function () {
                      var _a;
                      event.destroy();
                      (_a = options.onAnimationEnd) === null || _a === void 0 ? void 0 : _a.call(options);
                  });
              });
          });
          Element.setAttribute(element, slideToggleAttribute, 'false');
      };
      Animate.show = function (element, options) {
          var _a;
          if (isShown(element)) {
              return;
          }
          var _b = options.elementDisplayStyle, elementDisplayStyle = _b === void 0 ? 'block' : _b;
          (_a = options.onAnimationStart) === null || _a === void 0 ? void 0 : _a.call(options);
          Element.setStyles(element, {
              transition: '',
              display: elementDisplayStyle,
              height: 'auto',
              paddingTop: '',
              paddingBottom: '',
              borderTopWidth: '',
              borderBottomWidth: '',
          });
          var _c = Element.getBoxStyles(element), height = _c.height, boxStyles = __rest(_c, ["height"]);
          Element.setStyles(element, {
              display: 'none',
          });
          onRequestAnimationFrame(function () {
              Element.setStyles(element, {
                  display: elementDisplayStyle,
                  overflow: 'hidden',
                  height: '0',
                  paddingTop: '0',
                  paddingBottom: '0',
                  borderTopWidth: '0',
                  borderBottomWidth: '0',
                  transition: getTransition(options),
              });
              onRequestAnimationFrame(function () {
                  Element.setStyles(element, {
                      height: height + "px",
                      paddingTop: boxStyles.padding.top + "px",
                      paddingBottom: boxStyles.padding.bottom + "px",
                      borderTopWidth: boxStyles.border.top + "px",
                      borderBottomWidth: boxStyles.border.bottom + "px",
                  });
                  var event = Events.on(element, 'transitionend', function () {
                      var _a;
                      Element.setStyles(element, {
                          height: '',
                          overflow: '',
                          paddingTop: '',
                          paddingBottom: '',
                          borderTopWidth: '',
                          borderBottomWidth: '',
                      });
                      event.destroy();
                      (_a = options.onAnimationEnd) === null || _a === void 0 ? void 0 : _a.call(options);
                  });
              });
          });
          Element.setAttribute(element, slideToggleAttribute, 'true');
      };
  })(Animate || (Animate = {}));

  var Hide;
  (function (Hide) {
      Hide.on = function (element, options) {
          Animate.hide(element, options);
      };
  })(Hide || (Hide = {}));

  var Show;
  (function (Show) {
      Show.on = function (element, options) {
          Animate.show(element, options);
      };
  })(Show || (Show = {}));

  var __assign = (undefined && undefined.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  var Toggle;
  (function (Toggle) {
      var onHideEnd = function (options) {
          return function () {
              var _a, _b;
              (_a = options.onClose) === null || _a === void 0 ? void 0 : _a.call(options);
              (_b = options.onAnimationEnd) === null || _b === void 0 ? void 0 : _b.call(options);
          };
      };
      var onShowEnd = function (options) {
          return function () {
              var _a, _b;
              (_a = options.onOpen) === null || _a === void 0 ? void 0 : _a.call(options);
              (_b = options.onAnimationEnd) === null || _b === void 0 ? void 0 : _b.call(options);
          };
      };
      Toggle.on = function (element, options) {
          if (Animate.shouldCollapse(element)) {
              Animate.hide(element, __assign(__assign({}, options), { onAnimationEnd: onHideEnd(options) }));
          }
          else {
              Animate.show(element, __assign(__assign({}, options), { onAnimationEnd: onShowEnd(options) }));
          }
      };
  })(Toggle || (Toggle = {}));
  var toggle = function (element, options) {
      Toggle.on(Element.getElement(element), options);
  };

  if ($('.js-show-references').length) {
    var btn = document.querySelector('.js-show-references');
    btn.addEventListener('click', function () {
      event.preventDefault();
      toggle('.references__hide', {
        miliseconds: 300,
        transitionFunction: 'ease',
        onOpen: function onOpen() {
          $(".js-show-references").addClass("opened");
        },
        onClose: function onClose() {
          $(".js-show-references").removeClass("opened");
        }
      });
    });
  }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  /*!
   * Splide.js
   * Version  : 4.1.4
   * License  : MIT
   * Copyright: 2022 Naotoshi Fujita
   */
  var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
  var CREATED = 1;
  var MOUNTED = 2;
  var IDLE = 3;
  var MOVING = 4;
  var SCROLLING = 5;
  var DRAGGING = 6;
  var DESTROYED = 7;
  var STATES = {
    CREATED: CREATED,
    MOUNTED: MOUNTED,
    IDLE: IDLE,
    MOVING: MOVING,
    SCROLLING: SCROLLING,
    DRAGGING: DRAGGING,
    DESTROYED: DESTROYED
  };

  function empty(array) {
    array.length = 0;
  }

  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }

  var nextTick = setTimeout;

  var noop = function noop() {};

  function raf(func) {
    return requestAnimationFrame(func);
  }

  function typeOf(type, subject) {
    return typeof subject === type;
  }

  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }

  var isArray = Array.isArray;
  var isFunction = apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");

  function isNull(subject) {
    return subject === null;
  }

  function isHTMLElement(subject) {
    try {
      return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
    } catch (e) {
      return false;
    }
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  function includes(array, value) {
    return array.indexOf(value) > -1;
  }

  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }

  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
  }

  function append(parent, children) {
    forEach(children, parent.appendChild.bind(parent));
  }

  function before(nodes, ref) {
    forEach(nodes, function (node) {
      var parent = (ref || node).parentNode;

      if (parent) {
        parent.insertBefore(node, ref);
      }
    });
  }

  function matches(elm, selector) {
    return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }

  function children(parent, selector) {
    var children2 = parent ? slice(parent.children) : [];
    return selector ? children2.filter(function (child) {
      return matches(child, selector);
    }) : children2;
  }

  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }

  var ownKeys = Object.keys;

  function forOwn(object, iteratee, right) {
    if (object) {
      (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function (key) {
        key !== "__proto__" && iteratee(object[key], key);
      });
    }

    return object;
  }

  function assign(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function merge(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        if (isArray(value)) {
          object[key] = value.slice();
        } else if (isObject(value)) {
          object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
        } else {
          object[key] = value;
        }
      });
    });
    return object;
  }

  function omit(object, keys) {
    forEach(keys || ownKeys(object), function (key) {
      delete object[key];
    });
  }

  function removeAttribute(elms, attrs) {
    forEach(elms, function (elm) {
      forEach(attrs, function (attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }

  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function (value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function (elm) {
        isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
      });
    }
  }

  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);

    if (attrs) {
      isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
    }

    parent && append(parent, elm);
    return elm;
  }

  function style(elm, prop, value) {
    if (isUndefined(value)) {
      return getComputedStyle(elm)[prop];
    }

    if (!isNull(value)) {
      elm.style[prop] = "" + value;
    }
  }

  function display(elm, display2) {
    style(elm, "display", display2);
  }

  function focus(elm) {
    elm["setActive"] && elm["setActive"]() || elm.focus({
      preventScroll: true
    });
  }

  function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
  }

  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }

  function rect(target) {
    return target.getBoundingClientRect();
  }

  function remove(nodes) {
    forEach(nodes, function (node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }

  function parseHtml(html) {
    return child(new DOMParser().parseFromString(html, "text/html").body);
  }

  function prevent(e, stopPropagation) {
    e.preventDefault();

    if (stopPropagation) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }

  function query(parent, selector) {
    return parent && parent.querySelector(selector);
  }

  function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
  }

  function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
  }

  function timeOf(e) {
    return e.timeStamp;
  }

  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }

  var PROJECT_CODE = "splide";
  var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;

  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }

  var min = Math.min,
      max = Math.max,
      floor = Math.floor,
      ceil = Math.ceil,
      abs = Math.abs;

  function approximatelyEqual(x, y, epsilon) {
    return abs(x - y) < epsilon;
  }

  function between(number, x, y, exclusive) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
  }

  function clamp(number, x, y) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return min(max(minimum, number), maximum);
  }

  function sign(x) {
    return +(x > 0) - +(x < 0);
  }

  function format(string, replacements) {
    forEach(replacements, function (replacement) {
      string = string.replace("%s", "" + replacement);
    });
    return string;
  }

  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var ids = {};

  function uniqueId(prefix) {
    return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
  }

  function EventBinder() {
    var listeners = [];

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event, namespace) {
        var isEventTarget = ("addEventListener" in target);
        var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
        isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }

    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function (target, event, namespace) {
        listeners = listeners.filter(function (listener) {
          if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
            listener[4]();
            return false;
          }

          return true;
        });
      });
    }

    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;

      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles: bubbles,
          detail: detail
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initCustomEvent(type, bubbles, false, detail);
      }

      target.dispatchEvent(e);
      return e;
    }

    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function (target) {
        target && forEach(events, function (events2) {
          events2.split(" ").forEach(function (eventNS) {
            var fragment = eventNS.split(".");
            iteratee(target, fragment[0], fragment[1]);
          });
        });
      });
    }

    function destroy() {
      listeners.forEach(function (data) {
        data[4]();
      });
      empty(listeners);
    }

    return {
      bind: bind,
      unbind: unbind,
      dispatch: dispatch,
      destroy: destroy
    };
  }

  var EVENT_MOUNTED = "mounted";
  var EVENT_READY = "ready";
  var EVENT_MOVE = "move";
  var EVENT_MOVED = "moved";
  var EVENT_CLICK = "click";
  var EVENT_ACTIVE = "active";
  var EVENT_INACTIVE = "inactive";
  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_RESIZE = "resize";
  var EVENT_RESIZED = "resized";
  var EVENT_DRAG = "drag";
  var EVENT_DRAGGING = "dragging";
  var EVENT_DRAGGED = "dragged";
  var EVENT_SCROLL = "scroll";
  var EVENT_SCROLLED = "scrolled";
  var EVENT_OVERFLOW = "overflow";
  var EVENT_DESTROY = "destroy";
  var EVENT_ARROWS_MOUNTED = "arrows:mounted";
  var EVENT_ARROWS_UPDATED = "arrows:updated";
  var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
  var EVENT_PAGINATION_UPDATED = "pagination:updated";
  var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
  var EVENT_AUTOPLAY_PLAY = "autoplay:play";
  var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
  var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
  var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
  var EVENT_SLIDE_KEYDOWN = "sk";
  var EVENT_SHIFTED = "sh";
  var EVENT_END_INDEX_CHANGED = "ei";

  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();

    function on(events, callback) {
      binder.bind(bus, toArray(events).join(" "), function (e) {
        callback.apply(callback, isArray(e.detail) ? e.detail : []);
      });
    }

    function emit(event) {
      binder.dispatch(bus, event, slice(arguments, 1));
    }

    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }

    return assign(binder, {
      bus: bus,
      on: on,
      off: apply(binder.unbind, bus),
      emit: emit
    });
  }

  function RequestInterval(interval, onInterval, onUpdate, limit) {
    var now = Date.now;
    var startTime;
    var rate = 0;
    var id;
    var paused = true;
    var count = 0;

    function update() {
      if (!paused) {
        rate = interval ? min((now() - startTime) / interval, 1) : 1;
        onUpdate && onUpdate(rate);

        if (rate >= 1) {
          onInterval();
          startTime = now();

          if (limit && ++count >= limit) {
            return pause();
          }
        }

        id = raf(update);
      }
    }

    function start(resume) {
      resume || cancel();
      startTime = now() - (resume ? rate * interval : 0);
      paused = false;
      id = raf(update);
    }

    function pause() {
      paused = true;
    }

    function rewind() {
      startTime = now();
      rate = 0;

      if (onUpdate) {
        onUpdate(rate);
      }
    }

    function cancel() {
      id && cancelAnimationFrame(id);
      rate = 0;
      id = 0;
      paused = true;
    }

    function set(time) {
      interval = time;
    }

    function isPaused() {
      return paused;
    }

    return {
      start: start,
      rewind: rewind,
      pause: pause,
      cancel: cancel,
      set: set,
      isPaused: isPaused
    };
  }

  function State(initialState) {
    var state = initialState;

    function set(value) {
      state = value;
    }

    function is(states) {
      return includes(toArray(states), state);
    }

    return {
      set: set,
      is: is
    };
  }

  function Throttle(func, duration) {
    var interval = RequestInterval(duration || 0, func, null, 1);
    return function () {
      interval.isPaused() && interval.start();
    };
  }

  function Media(Splide2, Components2, options) {
    var state = Splide2.state;
    var breakpoints = options.breakpoints || {};
    var reducedMotion = options.reducedMotion || {};
    var binder = EventBinder();
    var queries = [];

    function setup() {
      var isMin = options.mediaQuery === "min";
      ownKeys(breakpoints).sort(function (n, m) {
        return isMin ? +n - +m : +m - +n;
      }).forEach(function (key) {
        register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
      });
      register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
      update();
    }

    function destroy(completely) {
      if (completely) {
        binder.destroy();
      }
    }

    function register(options2, query) {
      var queryList = matchMedia(query);
      binder.bind(queryList, "change", update);
      queries.push([options2, queryList]);
    }

    function update() {
      var destroyed = state.is(DESTROYED);
      var direction = options.direction;
      var merged = queries.reduce(function (merged2, entry) {
        return merge(merged2, entry[1].matches ? entry[0] : {});
      }, {});
      omit(options);
      set(merged);

      if (options.destroy) {
        Splide2.destroy(options.destroy === "completely");
      } else if (destroyed) {
        destroy(true);
        Splide2.mount();
      } else {
        direction !== options.direction && Splide2.refresh();
      }
    }

    function reduce(enable) {
      if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
        enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
      }
    }

    function set(opts, base, notify) {
      merge(options, opts);
      base && merge(Object.getPrototypeOf(options), opts);

      if (notify || !state.is(CREATED)) {
        Splide2.emit(EVENT_UPDATED, options);
      }
    }

    return {
      setup: setup,
      destroy: destroy,
      reduce: reduce,
      set: set
    };
  }

  var ARROW = "Arrow";
  var ARROW_LEFT = ARROW + "Left";
  var ARROW_RIGHT = ARROW + "Right";
  var ARROW_UP = ARROW + "Up";
  var ARROW_DOWN = ARROW + "Down";
  var RTL = "rtl";
  var TTB = "ttb";
  var ORIENTATION_MAP = {
    width: ["height"],
    left: ["top", "right"],
    right: ["bottom", "left"],
    x: ["y"],
    X: ["Y"],
    Y: ["X"],
    ArrowLeft: [ARROW_UP, ARROW_RIGHT],
    ArrowRight: [ARROW_DOWN, ARROW_LEFT]
  };

  function Direction(Splide2, Components2, options) {
    function resolve(prop, axisOnly, direction) {
      direction = direction || options.direction;
      var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
      return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function (match, offset) {
        var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
        return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
      });
    }

    function orient(value) {
      return value * (options.direction === RTL ? 1 : -1);
    }

    return {
      resolve: resolve,
      orient: orient
    };
  }

  var ROLE = "role";
  var TAB_INDEX = "tabindex";
  var DISABLED = "disabled";
  var ARIA_PREFIX = "aria-";
  var ARIA_CONTROLS = ARIA_PREFIX + "controls";
  var ARIA_CURRENT = ARIA_PREFIX + "current";
  var ARIA_SELECTED = ARIA_PREFIX + "selected";
  var ARIA_LABEL = ARIA_PREFIX + "label";
  var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
  var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
  var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
  var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
  var ARIA_LIVE = ARIA_PREFIX + "live";
  var ARIA_BUSY = ARIA_PREFIX + "busy";
  var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
  var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
  var CLASS_PREFIX = PROJECT_CODE + "__";
  var STATUS_CLASS_PREFIX = "is-";
  var CLASS_ROOT = PROJECT_CODE;
  var CLASS_TRACK = CLASS_PREFIX + "track";
  var CLASS_LIST = CLASS_PREFIX + "list";
  var CLASS_SLIDE = CLASS_PREFIX + "slide";
  var CLASS_CLONE = CLASS_SLIDE + "--clone";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";
  var CLASS_ARROWS = CLASS_PREFIX + "arrows";
  var CLASS_ARROW = CLASS_PREFIX + "arrow";
  var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
  var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
  var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
  var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
  var CLASS_PROGRESS = CLASS_PREFIX + "progress";
  var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
  var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
  var CLASS_SPINNER = CLASS_PREFIX + "spinner";
  var CLASS_SR = CLASS_PREFIX + "sr";
  var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
  var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
  var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
  var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
  var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
  var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
  var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
  var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
  var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
  var CLASSES = {
    slide: CLASS_SLIDE,
    clone: CLASS_CLONE,
    arrows: CLASS_ARROWS,
    arrow: CLASS_ARROW,
    prev: CLASS_ARROW_PREV,
    next: CLASS_ARROW_NEXT,
    pagination: CLASS_PAGINATION,
    page: CLASS_PAGINATION_PAGE,
    spinner: CLASS_SPINNER
  };

  function closest(from, selector) {
    if (isFunction(from.closest)) {
      return from.closest(selector);
    }

    var elm = from;

    while (elm && elm.nodeType === 1) {
      if (matches(elm, selector)) {
        break;
      }

      elm = elm.parentElement;
    }

    return elm;
  }

  var FRICTION = 5;
  var LOG_INTERVAL = 200;
  var POINTER_DOWN_EVENTS = "touchstart mousedown";
  var POINTER_MOVE_EVENTS = "touchmove mousemove";
  var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";

  function Elements(Splide2, Components2, options) {
    var _EventInterface = EventInterface(Splide2),
        on = _EventInterface.on,
        bind = _EventInterface.bind;

    var root = Splide2.root;
    var i18n = options.i18n;
    var elements = {};
    var slides = [];
    var rootClasses = [];
    var trackClasses = [];
    var track;
    var list;
    var isUsingKey;

    function setup() {
      collect();
      init();
      update();
    }

    function mount() {
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, setup);
      on(EVENT_UPDATED, update);
      bind(document, POINTER_DOWN_EVENTS + " keydown", function (e) {
        isUsingKey = e.type === "keydown";
      }, {
        capture: true
      });
      bind(root, "focusin", function () {
        toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
      });
    }

    function destroy(completely) {
      var attrs = ALL_ATTRIBUTES.concat("style");
      empty(slides);
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      removeAttribute([track, list], attrs);
      removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
    }

    function update() {
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      rootClasses = getClasses(CLASS_ROOT);
      trackClasses = getClasses(CLASS_TRACK);
      addClass(root, rootClasses);
      addClass(track, trackClasses);
      setAttribute(root, ARIA_LABEL, options.label);
      setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
    }

    function collect() {
      track = find("." + CLASS_TRACK);
      list = child(track, "." + CLASS_LIST);
      assert(track && list, "A track/list element is missing.");
      push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
      forOwn({
        arrows: CLASS_ARROWS,
        pagination: CLASS_PAGINATION,
        prev: CLASS_ARROW_PREV,
        next: CLASS_ARROW_NEXT,
        bar: CLASS_PROGRESS_BAR,
        toggle: CLASS_TOGGLE
      }, function (className, key) {
        elements[key] = find("." + className);
      });
      assign(elements, {
        root: root,
        track: track,
        list: list,
        slides: slides
      });
    }

    function init() {
      var id = root.id || uniqueId(PROJECT_CODE);
      var role = options.role;
      root.id = id;
      track.id = track.id || id + "-track";
      list.id = list.id || id + "-list";

      if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
        setAttribute(root, ROLE, role);
      }

      setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
      setAttribute(list, ROLE, "presentation");
    }

    function find(selector) {
      var elm = query(root, selector);
      return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
    }

    function getClasses(base) {
      return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
    }

    return assign(elements, {
      setup: setup,
      mount: mount,
      destroy: destroy
    });
  }

  var SLIDE = "slide";
  var LOOP = "loop";
  var FADE = "fade";

  function Slide$1(Splide2, index, slideIndex, slide) {
    var event = EventInterface(Splide2);
    var on = event.on,
        emit = event.emit,
        bind = event.bind;
    var Components = Splide2.Components,
        root = Splide2.root,
        options = Splide2.options;
    var isNavigation = options.isNavigation,
        updateOnMove = options.updateOnMove,
        i18n = options.i18n,
        pagination = options.pagination,
        slideFocus = options.slideFocus;
    var resolve = Components.Direction.resolve;
    var styles = getAttribute(slide, "style");
    var label = getAttribute(slide, ARIA_LABEL);
    var isClone = slideIndex > -1;
    var container = child(slide, "." + CLASS_CONTAINER);
    var destroyed;

    function mount() {
      if (!isClone) {
        slide.id = root.id + "-slide" + pad(index + 1);
        setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
        setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
        setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
      }

      listen();
    }

    function listen() {
      bind(slide, "click", apply(emit, EVENT_CLICK, self));
      bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
      on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
      on(EVENT_NAVIGATION_MOUNTED, initNavigation);

      if (updateOnMove) {
        on(EVENT_MOVE, onMove);
      }
    }

    function destroy() {
      destroyed = true;
      event.destroy();
      removeClass(slide, STATUS_CLASSES);
      removeAttribute(slide, ALL_ATTRIBUTES);
      setAttribute(slide, "style", styles);
      setAttribute(slide, ARIA_LABEL, label || "");
    }

    function initNavigation() {
      var controls = Splide2.splides.map(function (target) {
        var Slide2 = target.splide.Components.Slides.getAt(index);
        return Slide2 ? Slide2.slide.id : "";
      }).join(" ");
      setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
      setAttribute(slide, ARIA_CONTROLS, controls);
      setAttribute(slide, ROLE, slideFocus ? "button" : "");
      slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
    }

    function onMove() {
      if (!destroyed) {
        update();
      }
    }

    function update() {
      if (!destroyed) {
        var curr = Splide2.index;
        updateActivity();
        updateVisibility();
        toggleClass(slide, CLASS_PREV, index === curr - 1);
        toggleClass(slide, CLASS_NEXT, index === curr + 1);
      }
    }

    function updateActivity() {
      var active = isActive();

      if (active !== hasClass(slide, CLASS_ACTIVE)) {
        toggleClass(slide, CLASS_ACTIVE, active);
        setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
        emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
      }
    }

    function updateVisibility() {
      var visible = isVisible();
      var hidden = !visible && (!isActive() || isClone);

      if (!Splide2.state.is([MOVING, SCROLLING])) {
        setAttribute(slide, ARIA_HIDDEN, hidden || "");
      }

      setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");

      if (slideFocus) {
        setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
      }

      if (visible !== hasClass(slide, CLASS_VISIBLE)) {
        toggleClass(slide, CLASS_VISIBLE, visible);
        emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
      }

      if (!visible && document.activeElement === slide) {
        var Slide2 = Components.Slides.getAt(Splide2.index);
        Slide2 && focus(Slide2.slide);
      }
    }

    function style$1(prop, value, useContainer) {
      style(useContainer && container || slide, prop, value);
    }

    function isActive() {
      var curr = Splide2.index;
      return curr === index || options.cloneStatus && curr === slideIndex;
    }

    function isVisible() {
      if (Splide2.is(FADE)) {
        return isActive();
      }

      var trackRect = rect(Components.Elements.track);
      var slideRect = rect(slide);
      var left = resolve("left", true);
      var right = resolve("right", true);
      return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
    }

    function isWithin(from, distance) {
      var diff = abs(from - index);

      if (!isClone && (options.rewind || Splide2.is(LOOP))) {
        diff = min(diff, Splide2.length - diff);
      }

      return diff <= distance;
    }

    var self = {
      index: index,
      slideIndex: slideIndex,
      slide: slide,
      container: container,
      isClone: isClone,
      mount: mount,
      destroy: destroy,
      update: update,
      style: style$1,
      isWithin: isWithin
    };
    return self;
  }

  function Slides(Splide2, Components2, options) {
    var _EventInterface2 = EventInterface(Splide2),
        on = _EventInterface2.on,
        emit = _EventInterface2.emit,
        bind = _EventInterface2.bind;

    var _Components2$Elements = Components2.Elements,
        slides = _Components2$Elements.slides,
        list = _Components2$Elements.list;
    var Slides2 = [];

    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
    }

    function init() {
      slides.forEach(function (slide, index) {
        register(slide, index, -1);
      });
    }

    function destroy() {
      forEach$1(function (Slide2) {
        Slide2.destroy();
      });
      empty(Slides2);
    }

    function update() {
      forEach$1(function (Slide2) {
        Slide2.update();
      });
    }

    function register(slide, index, slideIndex) {
      var object = Slide$1(Splide2, index, slideIndex, slide);
      object.mount();
      Slides2.push(object);
      Slides2.sort(function (Slide1, Slide2) {
        return Slide1.index - Slide2.index;
      });
    }

    function get(excludeClones) {
      return excludeClones ? filter(function (Slide2) {
        return !Slide2.isClone;
      }) : Slides2;
    }

    function getIn(page) {
      var Controller = Components2.Controller;
      var index = Controller.toIndex(page);
      var max = Controller.hasFocus() ? 1 : options.perPage;
      return filter(function (Slide2) {
        return between(Slide2.index, index, index + max - 1);
      });
    }

    function getAt(index) {
      return filter(index)[0];
    }

    function add(items, index) {
      forEach(items, function (slide) {
        if (isString(slide)) {
          slide = parseHtml(slide);
        }

        if (isHTMLElement(slide)) {
          var ref = slides[index];
          ref ? before(slide, ref) : append(list, slide);
          addClass(slide, options.classes.slide);
          observeImages(slide, apply(emit, EVENT_RESIZE));
        }
      });
      emit(EVENT_REFRESH);
    }

    function remove$1(matcher) {
      remove(filter(matcher).map(function (Slide2) {
        return Slide2.slide;
      }));
      emit(EVENT_REFRESH);
    }

    function forEach$1(iteratee, excludeClones) {
      get(excludeClones).forEach(iteratee);
    }

    function filter(matcher) {
      return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
        return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
      });
    }

    function style(prop, value, useContainer) {
      forEach$1(function (Slide2) {
        Slide2.style(prop, value, useContainer);
      });
    }

    function observeImages(elm, callback) {
      var images = queryAll(elm, "img");
      var length = images.length;

      if (length) {
        images.forEach(function (img) {
          bind(img, "load error", function () {
            if (! --length) {
              callback();
            }
          });
        });
      } else {
        callback();
      }
    }

    function getLength(excludeClones) {
      return excludeClones ? slides.length : Slides2.length;
    }

    function isEnough() {
      return Slides2.length > options.perPage;
    }

    return {
      mount: mount,
      destroy: destroy,
      update: update,
      register: register,
      get: get,
      getIn: getIn,
      getAt: getAt,
      add: add,
      remove: remove$1,
      forEach: forEach$1,
      filter: filter,
      style: style,
      getLength: getLength,
      isEnough: isEnough
    };
  }

  function Layout(Splide2, Components2, options) {
    var _EventInterface3 = EventInterface(Splide2),
        on = _EventInterface3.on,
        bind = _EventInterface3.bind,
        emit = _EventInterface3.emit;

    var Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var _Components2$Elements2 = Components2.Elements,
        root = _Components2$Elements2.root,
        track = _Components2$Elements2.track,
        list = _Components2$Elements2.list;
    var getAt = Slides.getAt,
        styleSlides = Slides.style;
    var vertical;
    var rootRect;
    var overflow;

    function mount() {
      init();
      bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
      on([EVENT_UPDATED, EVENT_REFRESH], init);
      on(EVENT_RESIZE, resize);
    }

    function init() {
      vertical = options.direction === TTB;
      style(root, "maxWidth", unit(options.width));
      style(track, resolve("paddingLeft"), cssPadding(false));
      style(track, resolve("paddingRight"), cssPadding(true));
      resize(true);
    }

    function resize(force) {
      var newRect = rect(root);

      if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
        style(track, "height", cssTrackHeight());
        styleSlides(resolve("marginRight"), unit(options.gap));
        styleSlides("width", cssSlideWidth());
        styleSlides("height", cssSlideHeight(), true);
        rootRect = newRect;
        emit(EVENT_RESIZED);

        if (overflow !== (overflow = isOverflow())) {
          toggleClass(root, CLASS_OVERFLOW, overflow);
          emit(EVENT_OVERFLOW, overflow);
        }
      }
    }

    function cssPadding(right) {
      var padding = options.padding;
      var prop = resolve(right ? "right" : "left");
      return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
    }

    function cssTrackHeight() {
      var height = "";

      if (vertical) {
        height = cssHeight();
        assert(height, "height or heightRatio is missing.");
        height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
      }

      return height;
    }

    function cssHeight() {
      return unit(options.height || rect(list).width * options.heightRatio);
    }

    function cssSlideWidth() {
      return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
    }

    function cssSlideHeight() {
      return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
    }

    function cssSlideSize() {
      var gap = unit(options.gap);
      return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
    }

    function listSize() {
      return rect(list)[resolve("width")];
    }

    function slideSize(index, withoutGap) {
      var Slide = getAt(index || 0);
      return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
    }

    function totalSize(index, withoutGap) {
      var Slide = getAt(index);

      if (Slide) {
        var right = rect(Slide.slide)[resolve("right")];
        var left = rect(list)[resolve("left")];
        return abs(right - left) + (withoutGap ? 0 : getGap());
      }

      return 0;
    }

    function sliderSize(withoutGap) {
      return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
    }

    function getGap() {
      var Slide = getAt(0);
      return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
    }

    function getPadding(right) {
      return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
    }

    function isOverflow() {
      return Splide2.is(FADE) || sliderSize(true) > listSize();
    }

    return {
      mount: mount,
      resize: resize,
      listSize: listSize,
      slideSize: slideSize,
      sliderSize: sliderSize,
      totalSize: totalSize,
      getPadding: getPadding,
      isOverflow: isOverflow
    };
  }

  var MULTIPLIER = 2;

  function Clones(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on;
    var Elements = Components2.Elements,
        Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var clones = [];
    var cloneCount;

    function mount() {
      on(EVENT_REFRESH, remount);
      on([EVENT_UPDATED, EVENT_RESIZE], observe);

      if (cloneCount = computeCloneCount()) {
        generate(cloneCount);
        Components2.Layout.resize(true);
      }
    }

    function remount() {
      destroy();
      mount();
    }

    function destroy() {
      remove(clones);
      empty(clones);
      event.destroy();
    }

    function observe() {
      var count = computeCloneCount();

      if (cloneCount !== count) {
        if (cloneCount < count || !count) {
          event.emit(EVENT_REFRESH);
        }
      }
    }

    function generate(count) {
      var slides = Slides.get().slice();
      var length = slides.length;

      if (length) {
        while (slides.length < count) {
          push(slides, slides);
        }

        push(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
          var isHead = index < count;
          var clone = cloneDeep(Slide.slide, index);
          isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
          push(clones, clone);
          Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
        });
      }
    }

    function cloneDeep(elm, index) {
      var clone = elm.cloneNode(true);
      addClass(clone, options.classes.clone);
      clone.id = Splide2.root.id + "-clone" + pad(index + 1);
      return clone;
    }

    function computeCloneCount() {
      var clones2 = options.clones;

      if (!Splide2.is(LOOP)) {
        clones2 = 0;
      } else if (isUndefined(clones2)) {
        var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
        var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
        clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
      }

      return clones2;
    }

    return {
      mount: mount,
      destroy: destroy
    };
  }

  function Move(Splide2, Components2, options) {
    var _EventInterface4 = EventInterface(Splide2),
        on = _EventInterface4.on,
        emit = _EventInterface4.emit;

    var set = Splide2.state.set;
    var _Components2$Layout = Components2.Layout,
        slideSize = _Components2$Layout.slideSize,
        getPadding = _Components2$Layout.getPadding,
        totalSize = _Components2$Layout.totalSize,
        listSize = _Components2$Layout.listSize,
        sliderSize = _Components2$Layout.sliderSize;
    var _Components2$Directio = Components2.Direction,
        resolve = _Components2$Directio.resolve,
        orient = _Components2$Directio.orient;
    var _Components2$Elements3 = Components2.Elements,
        list = _Components2$Elements3.list,
        track = _Components2$Elements3.track;
    var Transition;

    function mount() {
      Transition = Components2.Transition;
      on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
    }

    function reposition() {
      if (!Components2.Controller.isBusy()) {
        Components2.Scroll.cancel();
        jump(Splide2.index);
        Components2.Slides.update();
      }
    }

    function move(dest, index, prev, callback) {
      if (dest !== index && canShift(dest > prev)) {
        cancel();
        translate(shift(getPosition(), dest > prev), true);
      }

      set(MOVING);
      emit(EVENT_MOVE, index, prev, dest);
      Transition.start(index, function () {
        set(IDLE);
        emit(EVENT_MOVED, index, prev, dest);
        callback && callback();
      });
    }

    function jump(index) {
      translate(toPosition(index, true));
    }

    function translate(position, preventLoop) {
      if (!Splide2.is(FADE)) {
        var destination = preventLoop ? position : loop(position);
        style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
        position !== destination && emit(EVENT_SHIFTED);
      }
    }

    function loop(position) {
      if (Splide2.is(LOOP)) {
        var index = toIndex(position);
        var exceededMax = index > Components2.Controller.getEnd();
        var exceededMin = index < 0;

        if (exceededMin || exceededMax) {
          position = shift(position, exceededMax);
        }
      }

      return position;
    }

    function shift(position, backwards) {
      var excess = position - getLimit(backwards);
      var size = sliderSize();
      position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
      return position;
    }

    function cancel() {
      translate(getPosition(), true);
      Transition.cancel();
    }

    function toIndex(position) {
      var Slides = Components2.Slides.get();
      var index = 0;
      var minDistance = Infinity;

      for (var i = 0; i < Slides.length; i++) {
        var slideIndex = Slides[i].index;
        var distance = abs(toPosition(slideIndex, true) - position);

        if (distance <= minDistance) {
          minDistance = distance;
          index = slideIndex;
        } else {
          break;
        }
      }

      return index;
    }

    function toPosition(index, trimming) {
      var position = orient(totalSize(index - 1) - offset(index));
      return trimming ? trim(position) : position;
    }

    function getPosition() {
      var left = resolve("left");
      return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
    }

    function trim(position) {
      if (options.trimSpace && Splide2.is(SLIDE)) {
        position = clamp(position, 0, orient(sliderSize(true) - listSize()));
      }

      return position;
    }

    function offset(index) {
      var focus = options.focus;
      return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
    }

    function getLimit(max) {
      return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
    }

    function canShift(backwards) {
      var shifted = orient(shift(getPosition(), backwards));
      return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
    }

    function exceededLimit(max, position) {
      position = isUndefined(position) ? getPosition() : position;
      var exceededMin = max !== true && orient(position) < orient(getLimit(false));
      var exceededMax = max !== false && orient(position) > orient(getLimit(true));
      return exceededMin || exceededMax;
    }

    return {
      mount: mount,
      move: move,
      jump: jump,
      translate: translate,
      shift: shift,
      cancel: cancel,
      toIndex: toIndex,
      toPosition: toPosition,
      getPosition: getPosition,
      getLimit: getLimit,
      exceededLimit: exceededLimit,
      reposition: reposition
    };
  }

  function Controller(Splide2, Components2, options) {
    var _EventInterface5 = EventInterface(Splide2),
        on = _EventInterface5.on,
        emit = _EventInterface5.emit;

    var Move = Components2.Move;
    var getPosition = Move.getPosition,
        getLimit = Move.getLimit,
        toPosition = Move.toPosition;
    var _Components2$Slides = Components2.Slides,
        isEnough = _Components2$Slides.isEnough,
        getLength = _Components2$Slides.getLength;
    var omitEnd = options.omitEnd;
    var isLoop = Splide2.is(LOOP);
    var isSlide = Splide2.is(SLIDE);
    var getNext = apply(getAdjacent, false);
    var getPrev = apply(getAdjacent, true);
    var currIndex = options.start || 0;
    var endIndex;
    var prevIndex = currIndex;
    var slideCount;
    var perMove;
    var perPage;

    function mount() {
      init();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
      on(EVENT_RESIZED, onResized);
    }

    function init() {
      slideCount = getLength(true);
      perMove = options.perMove;
      perPage = options.perPage;
      endIndex = getEnd();
      var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);

      if (index !== currIndex) {
        currIndex = index;
        Move.reposition();
      }
    }

    function onResized() {
      if (endIndex !== getEnd()) {
        emit(EVENT_END_INDEX_CHANGED);
      }
    }

    function go(control, allowSameIndex, callback) {
      if (!isBusy()) {
        var dest = parse(control);
        var index = loop(dest);

        if (index > -1 && (allowSameIndex || index !== currIndex)) {
          setIndex(index);
          Move.move(dest, index, prevIndex, callback);
        }
      }
    }

    function scroll(destination, duration, snap, callback) {
      Components2.Scroll.scroll(destination, duration, snap, function () {
        var index = loop(Move.toIndex(getPosition()));
        setIndex(omitEnd ? min(index, endIndex) : index);
        callback && callback();
      });
    }

    function parse(control) {
      var index = currIndex;

      if (isString(control)) {
        var _ref = control.match(/([+\-<>])(\d+)?/) || [],
            indicator = _ref[1],
            number = _ref[2];

        if (indicator === "+" || indicator === "-") {
          index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
        } else if (indicator === ">") {
          index = number ? toIndex(+number) : getNext(true);
        } else if (indicator === "<") {
          index = getPrev(true);
        }
      } else {
        index = isLoop ? control : clamp(control, 0, endIndex);
      }

      return index;
    }

    function getAdjacent(prev, destination) {
      var number = perMove || (hasFocus() ? 1 : perPage);
      var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));

      if (dest === -1 && isSlide) {
        if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
          return prev ? 0 : endIndex;
        }
      }

      return destination ? dest : loop(dest);
    }

    function computeDestIndex(dest, from, snapPage) {
      if (isEnough() || hasFocus()) {
        var index = computeMovableDestIndex(dest);

        if (index !== dest) {
          from = dest;
          dest = index;
          snapPage = false;
        }

        if (dest < 0 || dest > endIndex) {
          if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
            dest = toIndex(toPage(dest));
          } else {
            if (isLoop) {
              dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
            } else if (options.rewind) {
              dest = dest < 0 ? endIndex : 0;
            } else {
              dest = -1;
            }
          }
        } else {
          if (snapPage && dest !== from) {
            dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
          }
        }
      } else {
        dest = -1;
      }

      return dest;
    }

    function computeMovableDestIndex(dest) {
      if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
        var position = getPosition();

        while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
          dest < currIndex ? --dest : ++dest;
        }
      }

      return dest;
    }

    function loop(index) {
      return isLoop ? (index + slideCount) % slideCount || 0 : index;
    }

    function getEnd() {
      var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);

      while (omitEnd && end-- > 0) {
        if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
          end++;
          break;
        }
      }

      return clamp(end, 0, slideCount - 1);
    }

    function toIndex(page) {
      return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
    }

    function toPage(index) {
      return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
    }

    function toDest(destination) {
      var closest = Move.toIndex(destination);
      return isSlide ? clamp(closest, 0, endIndex) : closest;
    }

    function setIndex(index) {
      if (index !== currIndex) {
        prevIndex = currIndex;
        currIndex = index;
      }
    }

    function getIndex(prev) {
      return prev ? prevIndex : currIndex;
    }

    function hasFocus() {
      return !isUndefined(options.focus) || options.isNavigation;
    }

    function isBusy() {
      return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
    }

    return {
      mount: mount,
      go: go,
      scroll: scroll,
      getNext: getNext,
      getPrev: getPrev,
      getAdjacent: getAdjacent,
      getEnd: getEnd,
      setIndex: setIndex,
      getIndex: getIndex,
      toIndex: toIndex,
      toPage: toPage,
      toDest: toDest,
      hasFocus: hasFocus,
      isBusy: isBusy
    };
  }

  var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
  var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
  var SIZE = 40;

  function Arrows(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on,
        bind = event.bind,
        emit = event.emit;
    var classes = options.classes,
        i18n = options.i18n;
    var Elements = Components2.Elements,
        Controller = Components2.Controller;
    var placeholder = Elements.arrows,
        track = Elements.track;
    var wrapper = placeholder;
    var prev = Elements.prev;
    var next = Elements.next;
    var created;
    var wrapperClasses;
    var arrows = {};

    function mount() {
      init();
      on(EVENT_UPDATED, remount);
    }

    function remount() {
      destroy();
      mount();
    }

    function init() {
      var enabled = options.arrows;

      if (enabled && !(prev && next)) {
        createArrows();
      }

      if (prev && next) {
        assign(arrows, {
          prev: prev,
          next: next
        });
        display(wrapper, enabled ? "" : "none");
        addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);

        if (enabled) {
          listen();
          update();
          setAttribute([prev, next], ARIA_CONTROLS, track.id);
          emit(EVENT_ARROWS_MOUNTED, prev, next);
        }
      }
    }

    function destroy() {
      event.destroy();
      removeClass(wrapper, wrapperClasses);

      if (created) {
        remove(placeholder ? [prev, next] : wrapper);
        prev = next = null;
      } else {
        removeAttribute([prev, next], ALL_ATTRIBUTES);
      }
    }

    function listen() {
      on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
      bind(next, "click", apply(go, ">"));
      bind(prev, "click", apply(go, "<"));
    }

    function go(control) {
      Controller.go(control, true);
    }

    function createArrows() {
      wrapper = placeholder || create("div", classes.arrows);
      prev = createArrow(true);
      next = createArrow(false);
      created = true;
      append(wrapper, [prev, next]);
      !placeholder && before(wrapper, track);
    }

    function createArrow(prev2) {
      var arrow = "<button class=\"" + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + "\" type=\"button\"><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\" focusable=\"false\"><path d=\"" + (options.arrowPath || PATH) + "\" />";
      return parseHtml(arrow);
    }

    function update() {
      if (prev && next) {
        var index = Splide2.index;
        var prevIndex = Controller.getPrev();
        var nextIndex = Controller.getNext();
        var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
        var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
        prev.disabled = prevIndex < 0;
        next.disabled = nextIndex < 0;
        setAttribute(prev, ARIA_LABEL, prevLabel);
        setAttribute(next, ARIA_LABEL, nextLabel);
        emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
      }
    }

    return {
      arrows: arrows,
      mount: mount,
      destroy: destroy,
      update: update
    };
  }

  var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";

  function Autoplay(Splide2, Components2, options) {
    var _EventInterface6 = EventInterface(Splide2),
        on = _EventInterface6.on,
        bind = _EventInterface6.bind,
        emit = _EventInterface6.emit;

    var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
    var isPaused = interval.isPaused;
    var Elements = Components2.Elements,
        _Components2$Elements4 = Components2.Elements,
        root = _Components2$Elements4.root,
        toggle = _Components2$Elements4.toggle;
    var autoplay = options.autoplay;
    var hovered;
    var focused;
    var stopped = autoplay === "pause";

    function mount() {
      if (autoplay) {
        listen();
        toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
        stopped || play();
        update();
      }
    }

    function listen() {
      if (options.pauseOnHover) {
        bind(root, "mouseenter mouseleave", function (e) {
          hovered = e.type === "mouseenter";
          autoToggle();
        });
      }

      if (options.pauseOnFocus) {
        bind(root, "focusin focusout", function (e) {
          focused = e.type === "focusin";
          autoToggle();
        });
      }

      if (toggle) {
        bind(toggle, "click", function () {
          stopped ? play() : pause(true);
        });
      }

      on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
      on(EVENT_MOVE, onMove);
    }

    function play() {
      if (isPaused() && Components2.Slides.isEnough()) {
        interval.start(!options.resetProgress);
        focused = hovered = stopped = false;
        update();
        emit(EVENT_AUTOPLAY_PLAY);
      }
    }

    function pause(stop) {
      if (stop === void 0) {
        stop = true;
      }

      stopped = !!stop;
      update();

      if (!isPaused()) {
        interval.pause();
        emit(EVENT_AUTOPLAY_PAUSE);
      }
    }

    function autoToggle() {
      if (!stopped) {
        hovered || focused ? pause(false) : play();
      }
    }

    function update() {
      if (toggle) {
        toggleClass(toggle, CLASS_ACTIVE, !stopped);
        setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
      }
    }

    function onAnimationFrame(rate) {
      var bar = Elements.bar;
      bar && style(bar, "width", rate * 100 + "%");
      emit(EVENT_AUTOPLAY_PLAYING, rate);
    }

    function onMove(index) {
      var Slide = Components2.Slides.getAt(index);
      interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
    }

    return {
      mount: mount,
      destroy: interval.cancel,
      play: play,
      pause: pause,
      isPaused: isPaused
    };
  }

  function Cover(Splide2, Components2, options) {
    var _EventInterface7 = EventInterface(Splide2),
        on = _EventInterface7.on;

    function mount() {
      if (options.cover) {
        on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
        on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
      }
    }

    function cover(cover2) {
      Components2.Slides.forEach(function (Slide) {
        var img = child(Slide.container || Slide.slide, "img");

        if (img && img.src) {
          toggle(cover2, img, Slide);
        }
      });
    }

    function toggle(cover2, img, Slide) {
      Slide.style("background", cover2 ? "center/cover no-repeat url(\"" + img.src + "\")" : "", true);
      display(img, cover2 ? "none" : "");
    }

    return {
      mount: mount,
      destroy: apply(cover, false)
    };
  }

  var BOUNCE_DIFF_THRESHOLD = 10;
  var BOUNCE_DURATION = 600;
  var FRICTION_FACTOR = 0.6;
  var BASE_VELOCITY = 1.5;
  var MIN_DURATION = 800;

  function Scroll(Splide2, Components2, options) {
    var _EventInterface8 = EventInterface(Splide2),
        on = _EventInterface8.on,
        emit = _EventInterface8.emit;

    var set = Splide2.state.set;
    var Move = Components2.Move;
    var getPosition = Move.getPosition,
        getLimit = Move.getLimit,
        exceededLimit = Move.exceededLimit,
        translate = Move.translate;
    var isSlide = Splide2.is(SLIDE);
    var interval;
    var callback;
    var friction = 1;

    function mount() {
      on(EVENT_MOVE, clear);
      on([EVENT_UPDATED, EVENT_REFRESH], cancel);
    }

    function scroll(destination, duration, snap, onScrolled, noConstrain) {
      var from = getPosition();
      clear();

      if (snap && (!isSlide || !exceededLimit())) {
        var size = Components2.Layout.sliderSize();
        var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
        destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
      }

      var noDistance = approximatelyEqual(from, destination, 1);
      friction = 1;
      duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
      callback = onScrolled;
      interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
      set(SCROLLING);
      emit(EVENT_SCROLL);
      interval.start();
    }

    function onEnd() {
      set(IDLE);
      callback && callback();
      emit(EVENT_SCROLLED);
    }

    function update(from, to, noConstrain, rate) {
      var position = getPosition();
      var target = from + (to - from) * easing(rate);
      var diff = (target - position) * friction;
      translate(position + diff);

      if (isSlide && !noConstrain && exceededLimit()) {
        friction *= FRICTION_FACTOR;

        if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
          scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
        }
      }
    }

    function clear() {
      if (interval) {
        interval.cancel();
      }
    }

    function cancel() {
      if (interval && !interval.isPaused()) {
        clear();
        onEnd();
      }
    }

    function easing(t) {
      var easingFunc = options.easingFunc;
      return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
    }

    return {
      mount: mount,
      destroy: clear,
      scroll: scroll,
      cancel: cancel
    };
  }

  var SCROLL_LISTENER_OPTIONS = {
    passive: false,
    capture: true
  };

  function Drag(Splide2, Components2, options) {
    var _EventInterface9 = EventInterface(Splide2),
        on = _EventInterface9.on,
        emit = _EventInterface9.emit,
        bind = _EventInterface9.bind,
        unbind = _EventInterface9.unbind;

    var state = Splide2.state;
    var Move = Components2.Move,
        Scroll = Components2.Scroll,
        Controller = Components2.Controller,
        track = Components2.Elements.track,
        reduce = Components2.Media.reduce;
    var _Components2$Directio2 = Components2.Direction,
        resolve = _Components2$Directio2.resolve,
        orient = _Components2$Directio2.orient;
    var getPosition = Move.getPosition,
        exceededLimit = Move.exceededLimit;
    var basePosition;
    var baseEvent;
    var prevBaseEvent;
    var isFree;
    var dragging;
    var exceeded = false;
    var clickPrevented;
    var disabled;
    var target;

    function mount() {
      bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
      bind(track, "click", onClick, {
        capture: true
      });
      bind(track, "dragstart", prevent);
      on([EVENT_MOUNTED, EVENT_UPDATED], init);
    }

    function init() {
      var drag = options.drag;
      disable(!drag);
      isFree = drag === "free";
    }

    function onPointerDown(e) {
      clickPrevented = false;

      if (!disabled) {
        var isTouch = isTouchEvent(e);

        if (isDraggable(e.target) && (isTouch || !e.button)) {
          if (!Controller.isBusy()) {
            target = isTouch ? track : window;
            dragging = state.is([MOVING, SCROLLING]);
            prevBaseEvent = null;
            bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
            bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
            Move.cancel();
            Scroll.cancel();
            save(e);
          } else {
            prevent(e, true);
          }
        }
      }
    }

    function onPointerMove(e) {
      if (!state.is(DRAGGING)) {
        state.set(DRAGGING);
        emit(EVENT_DRAG);
      }

      if (e.cancelable) {
        if (dragging) {
          Move.translate(basePosition + constrain(diffCoord(e)));
          var expired = diffTime(e) > LOG_INTERVAL;
          var hasExceeded = exceeded !== (exceeded = exceededLimit());

          if (expired || hasExceeded) {
            save(e);
          }

          clickPrevented = true;
          emit(EVENT_DRAGGING);
          prevent(e);
        } else if (isSliderDirection(e)) {
          dragging = shouldStart(e);
          prevent(e);
        }
      }
    }

    function onPointerUp(e) {
      if (state.is(DRAGGING)) {
        state.set(IDLE);
        emit(EVENT_DRAGGED);
      }

      if (dragging) {
        move(e);
        prevent(e);
      }

      unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
      unbind(target, POINTER_UP_EVENTS, onPointerUp);
      dragging = false;
    }

    function onClick(e) {
      if (!disabled && clickPrevented) {
        prevent(e, true);
      }
    }

    function save(e) {
      prevBaseEvent = baseEvent;
      baseEvent = e;
      basePosition = getPosition();
    }

    function move(e) {
      var velocity = computeVelocity(e);
      var destination = computeDestination(velocity);
      var rewind = options.rewind && options.rewindByDrag;
      reduce(false);

      if (isFree) {
        Controller.scroll(destination, 0, options.snap);
      } else if (Splide2.is(FADE)) {
        Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
      } else if (Splide2.is(SLIDE) && exceeded && rewind) {
        Controller.go(exceededLimit(true) ? ">" : "<");
      } else {
        Controller.go(Controller.toDest(destination), true);
      }

      reduce(true);
    }

    function shouldStart(e) {
      var thresholds = options.dragMinThreshold;
      var isObj = isObject(thresholds);
      var mouse = isObj && thresholds.mouse || 0;
      var touch = (isObj ? thresholds.touch : +thresholds) || 10;
      return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
    }

    function isSliderDirection(e) {
      return abs(diffCoord(e)) > abs(diffCoord(e, true));
    }

    function computeVelocity(e) {
      if (Splide2.is(LOOP) || !exceeded) {
        var time = diffTime(e);

        if (time && time < LOG_INTERVAL) {
          return diffCoord(e) / time;
        }
      }

      return 0;
    }

    function computeDestination(velocity) {
      return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
    }

    function diffCoord(e, orthogonal) {
      return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
    }

    function diffTime(e) {
      return timeOf(e) - timeOf(getBaseEvent(e));
    }

    function getBaseEvent(e) {
      return baseEvent === e && prevBaseEvent || baseEvent;
    }

    function coordOf(e, orthogonal) {
      return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
    }

    function constrain(diff) {
      return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
    }

    function isDraggable(target2) {
      var noDrag = options.noDrag;
      return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
    }

    function isTouchEvent(e) {
      return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
    }

    function isDragging() {
      return dragging;
    }

    function disable(value) {
      disabled = value;
    }

    return {
      mount: mount,
      disable: disable,
      isDragging: isDragging
    };
  }

  var NORMALIZATION_MAP = {
    Spacebar: " ",
    Right: ARROW_RIGHT,
    Left: ARROW_LEFT,
    Up: ARROW_UP,
    Down: ARROW_DOWN
  };

  function normalizeKey(key) {
    key = isString(key) ? key : key.key;
    return NORMALIZATION_MAP[key] || key;
  }

  var KEYBOARD_EVENT = "keydown";

  function Keyboard(Splide2, Components2, options) {
    var _EventInterface10 = EventInterface(Splide2),
        on = _EventInterface10.on,
        bind = _EventInterface10.bind,
        unbind = _EventInterface10.unbind;

    var root = Splide2.root;
    var resolve = Components2.Direction.resolve;
    var target;
    var disabled;

    function mount() {
      init();
      on(EVENT_UPDATED, destroy);
      on(EVENT_UPDATED, init);
      on(EVENT_MOVE, onMove);
    }

    function init() {
      var keyboard = options.keyboard;

      if (keyboard) {
        target = keyboard === "global" ? window : root;
        bind(target, KEYBOARD_EVENT, onKeydown);
      }
    }

    function destroy() {
      unbind(target, KEYBOARD_EVENT);
    }

    function disable(value) {
      disabled = value;
    }

    function onMove() {
      var _disabled = disabled;
      disabled = true;
      nextTick(function () {
        disabled = _disabled;
      });
    }

    function onKeydown(e) {
      if (!disabled) {
        var key = normalizeKey(e);

        if (key === resolve(ARROW_LEFT)) {
          Splide2.go("<");
        } else if (key === resolve(ARROW_RIGHT)) {
          Splide2.go(">");
        }
      }
    }

    return {
      mount: mount,
      destroy: destroy,
      disable: disable
    };
  }

  var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
  var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
  var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";

  function LazyLoad(Splide2, Components2, options) {
    var _EventInterface11 = EventInterface(Splide2),
        on = _EventInterface11.on,
        off = _EventInterface11.off,
        bind = _EventInterface11.bind,
        emit = _EventInterface11.emit;

    var isSequential = options.lazyLoad === "sequential";
    var events = [EVENT_MOVED, EVENT_SCROLLED];
    var entries = [];

    function mount() {
      if (options.lazyLoad) {
        init();
        on(EVENT_REFRESH, init);
      }
    }

    function init() {
      empty(entries);
      register();

      if (isSequential) {
        loadNext();
      } else {
        off(events);
        on(events, check);
        check();
      }
    }

    function register() {
      Components2.Slides.forEach(function (Slide) {
        queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
          var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
          var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);

          if (src !== img.src || srcset !== img.srcset) {
            var className = options.classes.spinner;
            var parent = img.parentElement;
            var spinner = child(parent, "." + className) || create("span", className, parent);
            entries.push([img, Slide, spinner]);
            img.src || display(img, "none");
          }
        });
      });
    }

    function check() {
      entries = entries.filter(function (data) {
        var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
        return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
      });
      entries.length || off(events);
    }

    function load(data) {
      var img = data[0];
      addClass(data[1].slide, CLASS_LOADING);
      bind(img, "load error", apply(onLoad, data));
      setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
      setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
      removeAttribute(img, SRC_DATA_ATTRIBUTE);
      removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
    }

    function onLoad(data, e) {
      var img = data[0],
          Slide = data[1];
      removeClass(Slide.slide, CLASS_LOADING);

      if (e.type !== "error") {
        remove(data[2]);
        display(img, "");
        emit(EVENT_LAZYLOAD_LOADED, img, Slide);
        emit(EVENT_RESIZE);
      }

      isSequential && loadNext();
    }

    function loadNext() {
      entries.length && load(entries.shift());
    }

    return {
      mount: mount,
      destroy: apply(empty, entries),
      check: check
    };
  }

  function Pagination(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on,
        emit = event.emit,
        bind = event.bind;
    var Slides = Components2.Slides,
        Elements = Components2.Elements,
        Controller = Components2.Controller;
    var hasFocus = Controller.hasFocus,
        getIndex = Controller.getIndex,
        go = Controller.go;
    var resolve = Components2.Direction.resolve;
    var placeholder = Elements.pagination;
    var items = [];
    var list;
    var paginationClasses;

    function mount() {
      destroy();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
      var enabled = options.pagination;
      placeholder && display(placeholder, enabled ? "" : "none");

      if (enabled) {
        on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
        createPagination();
        update();
        emit(EVENT_PAGINATION_MOUNTED, {
          list: list,
          items: items
        }, getAt(Splide2.index));
      }
    }

    function destroy() {
      if (list) {
        remove(placeholder ? slice(list.children) : list);
        removeClass(list, paginationClasses);
        empty(items);
        list = null;
      }

      event.destroy();
    }

    function createPagination() {
      var length = Splide2.length;
      var classes = options.classes,
          i18n = options.i18n,
          perPage = options.perPage;
      var max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
      list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
      addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
      setAttribute(list, ROLE, "tablist");
      setAttribute(list, ARIA_LABEL, i18n.select);
      setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");

      for (var i = 0; i < max; i++) {
        var li = create("li", null, list);
        var button = create("button", {
          class: classes.page,
          type: "button"
        }, li);
        var controls = Slides.getIn(i).map(function (Slide) {
          return Slide.slide.id;
        });
        var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
        bind(button, "click", apply(onClick, i));

        if (options.paginationKeyboard) {
          bind(button, "keydown", apply(onKeydown, i));
        }

        setAttribute(li, ROLE, "presentation");
        setAttribute(button, ROLE, "tab");
        setAttribute(button, ARIA_CONTROLS, controls.join(" "));
        setAttribute(button, ARIA_LABEL, format(text, i + 1));
        setAttribute(button, TAB_INDEX, -1);
        items.push({
          li: li,
          button: button,
          page: i
        });
      }
    }

    function onClick(page) {
      go(">" + page, true);
    }

    function onKeydown(page, e) {
      var length = items.length;
      var key = normalizeKey(e);
      var dir = getDirection();
      var nextPage = -1;

      if (key === resolve(ARROW_RIGHT, false, dir)) {
        nextPage = ++page % length;
      } else if (key === resolve(ARROW_LEFT, false, dir)) {
        nextPage = (--page + length) % length;
      } else if (key === "Home") {
        nextPage = 0;
      } else if (key === "End") {
        nextPage = length - 1;
      }

      var item = items[nextPage];

      if (item) {
        focus(item.button);
        go(">" + nextPage);
        prevent(e, true);
      }
    }

    function getDirection() {
      return options.paginationDirection || options.direction;
    }

    function getAt(index) {
      return items[Controller.toPage(index)];
    }

    function update() {
      var prev = getAt(getIndex(true));
      var curr = getAt(getIndex());

      if (prev) {
        var button = prev.button;
        removeClass(button, CLASS_ACTIVE);
        removeAttribute(button, ARIA_SELECTED);
        setAttribute(button, TAB_INDEX, -1);
      }

      if (curr) {
        var _button = curr.button;
        addClass(_button, CLASS_ACTIVE);
        setAttribute(_button, ARIA_SELECTED, true);
        setAttribute(_button, TAB_INDEX, "");
      }

      emit(EVENT_PAGINATION_UPDATED, {
        list: list,
        items: items
      }, prev, curr);
    }

    return {
      items: items,
      mount: mount,
      destroy: destroy,
      getAt: getAt,
      update: update
    };
  }

  var TRIGGER_KEYS = [" ", "Enter"];

  function Sync(Splide2, Components2, options) {
    var isNavigation = options.isNavigation,
        slideFocus = options.slideFocus;
    var events = [];

    function mount() {
      Splide2.splides.forEach(function (target) {
        if (!target.isParent) {
          sync(Splide2, target.splide);
          sync(target.splide, Splide2);
        }
      });

      if (isNavigation) {
        navigate();
      }
    }

    function destroy() {
      events.forEach(function (event) {
        event.destroy();
      });
      empty(events);
    }

    function remount() {
      destroy();
      mount();
    }

    function sync(splide, target) {
      var event = EventInterface(splide);
      event.on(EVENT_MOVE, function (index, prev, dest) {
        target.go(target.is(LOOP) ? dest : index);
      });
      events.push(event);
    }

    function navigate() {
      var event = EventInterface(Splide2);
      var on = event.on;
      on(EVENT_CLICK, onClick);
      on(EVENT_SLIDE_KEYDOWN, onKeydown);
      on([EVENT_MOUNTED, EVENT_UPDATED], update);
      events.push(event);
      event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
    }

    function update() {
      setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
    }

    function onClick(Slide) {
      Splide2.go(Slide.index);
    }

    function onKeydown(Slide, e) {
      if (includes(TRIGGER_KEYS, normalizeKey(e))) {
        onClick(Slide);
        prevent(e);
      }
    }

    return {
      setup: apply(Components2.Media.set, {
        slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
      }, true),
      mount: mount,
      destroy: destroy,
      remount: remount
    };
  }

  function Wheel(Splide2, Components2, options) {
    var _EventInterface12 = EventInterface(Splide2),
        bind = _EventInterface12.bind;

    var lastTime = 0;

    function mount() {
      if (options.wheel) {
        bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
      }
    }

    function onWheel(e) {
      if (e.cancelable) {
        var deltaY = e.deltaY;
        var backwards = deltaY < 0;
        var timeStamp = timeOf(e);

        var _min = options.wheelMinThreshold || 0;

        var sleep = options.wheelSleep || 0;

        if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
          Splide2.go(backwards ? "<" : ">");
          lastTime = timeStamp;
        }

        shouldPrevent(backwards) && prevent(e);
      }
    }

    function shouldPrevent(backwards) {
      return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
    }

    return {
      mount: mount
    };
  }

  var SR_REMOVAL_DELAY = 90;

  function Live(Splide2, Components2, options) {
    var _EventInterface13 = EventInterface(Splide2),
        on = _EventInterface13.on;

    var track = Components2.Elements.track;
    var enabled = options.live && !options.isNavigation;
    var sr = create("span", CLASS_SR);
    var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));

    function mount() {
      if (enabled) {
        disable(!Components2.Autoplay.isPaused());
        setAttribute(track, ARIA_ATOMIC, true);
        sr.textContent = "\u2026";
        on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
        on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
        on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
      }
    }

    function toggle(active) {
      setAttribute(track, ARIA_BUSY, active);

      if (active) {
        append(track, sr);
        interval.start();
      } else {
        remove(sr);
        interval.cancel();
      }
    }

    function destroy() {
      removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
      remove(sr);
    }

    function disable(disabled) {
      if (enabled) {
        setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
      }
    }

    return {
      mount: mount,
      disable: disable,
      destroy: destroy
    };
  }

  var ComponentConstructors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Media: Media,
    Direction: Direction,
    Elements: Elements,
    Slides: Slides,
    Layout: Layout,
    Clones: Clones,
    Move: Move,
    Controller: Controller,
    Arrows: Arrows,
    Autoplay: Autoplay,
    Cover: Cover,
    Scroll: Scroll,
    Drag: Drag,
    Keyboard: Keyboard,
    LazyLoad: LazyLoad,
    Pagination: Pagination,
    Sync: Sync,
    Wheel: Wheel,
    Live: Live
  });
  var I18N = {
    prev: "Previous slide",
    next: "Next slide",
    first: "Go to first slide",
    last: "Go to last slide",
    slideX: "Go to slide %s",
    pageX: "Go to page %s",
    play: "Start autoplay",
    pause: "Pause autoplay",
    carousel: "carousel",
    slide: "slide",
    select: "Select a slide to show",
    slideLabel: "%s of %s"
  };
  var DEFAULTS = {
    type: "slide",
    role: "region",
    speed: 400,
    perPage: 1,
    cloneStatus: true,
    arrows: true,
    pagination: true,
    paginationKeyboard: true,
    interval: 5e3,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: true,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    drag: true,
    direction: "ltr",
    trimSpace: true,
    focusableNodes: "a, button, textarea, input, select, iframe",
    live: true,
    classes: CLASSES,
    i18n: I18N,
    reducedMotion: {
      speed: 0,
      rewindSpeed: 0,
      autoplay: "pause"
    }
  };

  function Fade(Splide2, Components2, options) {
    var Slides = Components2.Slides;

    function mount() {
      EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
    }

    function init() {
      Slides.forEach(function (Slide) {
        Slide.style("transform", "translateX(-" + 100 * Slide.index + "%)");
      });
    }

    function start(index, done) {
      Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
      nextTick(done);
    }

    return {
      mount: mount,
      start: start,
      cancel: noop
    };
  }

  function Slide(Splide2, Components2, options) {
    var Move = Components2.Move,
        Controller = Components2.Controller,
        Scroll = Components2.Scroll;
    var list = Components2.Elements.list;
    var transition = apply(style, list, "transition");
    var endCallback;

    function mount() {
      EventInterface(Splide2).bind(list, "transitionend", function (e) {
        if (e.target === list && endCallback) {
          cancel();
          endCallback();
        }
      });
    }

    function start(index, done) {
      var destination = Move.toPosition(index, true);
      var position = Move.getPosition();
      var speed = getSpeed(index);

      if (abs(destination - position) >= 1 && speed >= 1) {
        if (options.useScroll) {
          Scroll.scroll(destination, speed, false, done);
        } else {
          transition("transform " + speed + "ms " + options.easing);
          Move.translate(destination, true);
          endCallback = done;
        }
      } else {
        Move.jump(index);
        done();
      }
    }

    function cancel() {
      transition("");
      Scroll.cancel();
    }

    function getSpeed(index) {
      var rewindSpeed = options.rewindSpeed;

      if (Splide2.is(SLIDE) && rewindSpeed) {
        var prev = Controller.getIndex(true);
        var end = Controller.getEnd();

        if (prev === 0 && index >= end || prev >= end && index === 0) {
          return rewindSpeed;
        }
      }

      return options.speed;
    }

    return {
      mount: mount,
      start: start,
      cancel: cancel
    };
  }

  var _Splide = /*#__PURE__*/function () {
    function _Splide(target, options) {
      this.event = EventInterface();
      this.Components = {};
      this.state = State(CREATED);
      this.splides = [];
      this._o = {};
      this._E = {};
      var root = isString(target) ? query(document, target) : target;
      assert(root, root + " is invalid.");
      this.root = root;
      options = merge({
        label: getAttribute(root, ARIA_LABEL) || "",
        labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
      }, DEFAULTS, _Splide.defaults, options || {});

      try {
        merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
      } catch (e) {
        assert(false, "Invalid JSON");
      }

      this._o = Object.create(merge({}, options));
    }

    var _proto = _Splide.prototype;

    _proto.mount = function mount(Extensions, Transition) {
      var _this = this;

      var state = this.state,
          Components2 = this.Components;
      assert(state.is([CREATED, DESTROYED]), "Already mounted!");
      state.set(CREATED);
      this._C = Components2;
      this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
      this._E = Extensions || this._E;
      var Constructors = assign({}, ComponentConstructors, this._E, {
        Transition: this._T
      });
      forOwn(Constructors, function (Component, key) {
        var component = Component(_this, Components2, _this._o);
        Components2[key] = component;
        component.setup && component.setup();
      });
      forOwn(Components2, function (component) {
        component.mount && component.mount();
      });
      this.emit(EVENT_MOUNTED);
      addClass(this.root, CLASS_INITIALIZED);
      state.set(IDLE);
      this.emit(EVENT_READY);
      return this;
    };

    _proto.sync = function sync(splide) {
      this.splides.push({
        splide: splide
      });
      splide.splides.push({
        splide: this,
        isParent: true
      });

      if (this.state.is(IDLE)) {
        this._C.Sync.remount();

        splide.Components.Sync.remount();
      }

      return this;
    };

    _proto.go = function go(control) {
      this._C.Controller.go(control);

      return this;
    };

    _proto.on = function on(events, callback) {
      this.event.on(events, callback);
      return this;
    };

    _proto.off = function off(events) {
      this.event.off(events);
      return this;
    };

    _proto.emit = function emit(event) {
      var _this$event;

      (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));

      return this;
    };

    _proto.add = function add(slides, index) {
      this._C.Slides.add(slides, index);

      return this;
    };

    _proto.remove = function remove(matcher) {
      this._C.Slides.remove(matcher);

      return this;
    };

    _proto.is = function is(type) {
      return this._o.type === type;
    };

    _proto.refresh = function refresh() {
      this.emit(EVENT_REFRESH);
      return this;
    };

    _proto.destroy = function destroy(completely) {
      if (completely === void 0) {
        completely = true;
      }

      var event = this.event,
          state = this.state;

      if (state.is(CREATED)) {
        EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
      } else {
        forOwn(this._C, function (component) {
          component.destroy && component.destroy(completely);
        }, true);
        event.emit(EVENT_DESTROY);
        event.destroy();
        completely && empty(this.splides);
        state.set(DESTROYED);
      }

      return this;
    };

    _createClass(_Splide, [{
      key: "options",
      get: function get() {
        return this._o;
      },
      set: function set(options) {
        this._C.Media.set(options, true, true);
      }
    }, {
      key: "length",
      get: function get() {
        return this._C.Slides.getLength(true);
      }
    }, {
      key: "index",
      get: function get() {
        return this._C.Controller.getIndex();
      }
    }]);

    return _Splide;
  }();

  var Splide = _Splide;
  Splide.defaults = {};
  Splide.STATES = STATES;

  var EL = '.js-show';

  if (document.querySelector(EL)) {
    new Splide(EL, {
      type: 'loop',
      perMove: 1,
      perPage: 4,
      autoWidth: true,
      width: 700,
      gap: 50,
      pagination: false
    }).mount();
  }

  new Swiper(".references__slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 65
      }
    }
  });
  $(document).ready(function () {
    $.cookieConsent({
      message: "Tato stránka používá cookies. Užíváním této stránky souhlasíte s naším používáním těchto cookies.",
      style: "background: #eaeaea; position: fixed; top: 0; z-index: 9999999; width: 100%;",
      consentMessage: "Rozumím",
      consentStyle: "background: #26a37a; border-radius: 50px; font-size: 14px; cursor: pointer;"
    });
    $(".tile2kk").on("click", function () {
      $(".form select").val("Byt 2kk").change();
    });
    $(".tile3kk").on("click", function () {
      $(".form select").val("Byt 3kk").change();
    });
    $(".tile4kk").on("click", function () {
      $(".form select").val("Byt 4kk").change();
    });
    $(".tilerd100").on("click", function () {
      $(".form select").val("RD do 100m²").change();
    });
    $(".tilerd150").on("click", function () {
      $(".form select").val("RD do 150m²").change();
    });
    $(".tilerd200").on("click", function () {
      $(".form select").val("RD do 200m²").change();
    });
  });

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9BbmltYXRlLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9Ub2dnbGVOYXYuanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL2Nvb2tpZXMuanMiLCJub2RlX21vZHVsZXMvZ2xpZ2h0Ym94L2Rpc3QvanMvZ2xpZ2h0Ym94Lm1pbi5qcyIsInNyYy9zY3JpcHRzL21vZHVsZXMvWmlwTW9kYWwuanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL0dpZnRNb2RhbC5qcyIsInNyYy9zY3JpcHRzL21vZHVsZXMvQWpheEZvcm0uanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL0xpZ2h0Qm94LmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9GaWxlVXBsb2FkLmpzIiwibm9kZV9tb2R1bGVzL3NsaWRldG9nZ2xlL2Rpc3QvdXRpbHMvTnVtYmVycy5qcyIsIm5vZGVfbW9kdWxlcy9zbGlkZXRvZ2dsZS9kaXN0L3V0aWxzL0VsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvc2xpZGV0b2dnbGUvZGlzdC91dGlscy9FdmVudC5qcyIsIm5vZGVfbW9kdWxlcy9zbGlkZXRvZ2dsZS9kaXN0L3V0aWxzL0FuaW1hdGUuanMiLCJub2RlX21vZHVsZXMvc2xpZGV0b2dnbGUvZGlzdC9jb21tb24vaGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9zbGlkZXRvZ2dsZS9kaXN0L2NvbW1vbi9zaG93LmpzIiwibm9kZV9tb2R1bGVzL3NsaWRldG9nZ2xlL2Rpc3QvY29tbW9uL3RvZ2dsZS5qcyIsInNyYy9zY3JpcHRzL21vZHVsZXMvUmVmZXJlbmNlc0J1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9Ac3BsaWRlanMvc3BsaWRlL2Rpc3QvanMvc3BsaWRlLmVzbS5qcyIsInNyYy9zY3JpcHRzL21vZHVsZXMvU2hvdy5qcyIsInNyYy9zY3JpcHRzL3NjcmlwdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEFuaW1hdGVcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogLSBhZGQgY2xhc3MgdG8gZWxlbWVudCBpbiB2aWV3cG9ydFxyXG4gKiAtIHN1cHBvcnQgY3VzdG9tIGFuaW1hdGlvbiBkZWxheSB2aWEgW2FuaW1hdGUtZGVsYXldIGh0bWwgYXR0cmlidXRlXHJcbiAqIC0gc3VwcG9ydCBjdXN0b20gdmlzaWJsZSByYXRpbyB2aWEgW2FuaW1hdGUtcmF0aW9dIGh0bWwgYXR0cmlidXRlXHJcbiAqL1xyXG5cclxuY29uc3QgUkFUSU8gPSAnMC43NSdcclxuY29uc3QgTE9BRF9SQVRJTyA9ICcxJ1xyXG5jb25zdCBFTEVNRU5UUyA9ICcuYW5pbWF0ZSdcclxuY29uc3QgVklTSUJMRV9DTEFTUyA9ICdhbmltYXRlLS12aXNpYmxlJ1xyXG5cclxuY2xhc3MgQW5pbWF0ZSB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLnNlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChFTEVNRU5UUylcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4gdGhpcy5zY3JvbGxIYW5kbGVyKFJBVElPKSwgZmFsc2UpXHJcblxyXG5cdFx0dGhpcy5zY3JvbGxIYW5kbGVyKExPQURfUkFUSU8pXHJcblx0fVxyXG5cclxuXHRnZXREZWxheSA9IHZhbHVlID0+IHtcclxuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gMFxyXG5cdFx0fSBlbHNlIGlmICh2YWx1ZS5pbmNsdWRlcygnLicpKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZSAqIDEwMDBcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh2YWx1ZSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNjcm9sbEhhbmRsZXIgPSAoQ1VTVE9NX1JBVElPKSA9PiB7XHJcblx0XHRpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMgKyAnOm5vdCguJyArIFZJU0lCTEVfQ0xBU1MgKyAnKScpKSByZXR1cm5cclxuXHJcblx0XHRmb3IgKGNvbnN0IHNlY3Rpb24gb2YgdGhpcy5zZWN0aW9ucykge1xyXG5cdFx0XHRjb25zdCBkZWxheSA9IHRoaXMuZ2V0RGVsYXkoc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtZGVsYXknKSlcclxuXHRcdFx0Y29uc3QgcmF0aW8gPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1yYXRpbycpID8gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtcmF0aW8nKSA6IENVU1RPTV9SQVRJT1xyXG5cclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdHNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDw9IHdpbmRvdy5pbm5lckhlaWdodCAqIHJhdGlvICYmXHJcblx0XHRcdFx0c2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPiAwXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0c2VjdGlvbi5jbGFzc0xpc3QuYWRkKFZJU0lCTEVfQ0xBU1MpXHJcblx0XHRcdFx0fSwgZGVsYXkpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbm5ldyBBbmltYXRlKClcclxuXHJcbiIsIi8qKlxyXG4gKiBUb2dnbGUgTmF2XHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIC0gdG9nZ2xlIGNsYXNzIG9uIGJvZHlcclxuICovXHJcblxyXG5jb25zdCBFTEVNRU5UUyA9ICcudG9nZ2xlbmF2X19idXR0b24nXHJcbmNvbnN0IFRPR0dMRV9DTEFTUyA9ICduYXYtaXMtb3BlbidcclxuXHJcbmNsYXNzIFRvZ2dsZU5hdiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChFTEVNRU5UUylcclxuXHJcbiAgICBpZiAoIXRoaXMuZWxlbWVudHMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTmF2LCBmYWxzZSlcclxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG9nZ2xlTmF2LCBmYWxzZSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICB0b2dnbGVOYXYoZSkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKFRPR0dMRV9DTEFTUylcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnbG9jaycpXHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgfVxyXG59XHJcblxyXG5uZXcgVG9nZ2xlTmF2KClcclxuIiwiKGZ1bmN0aW9uKCQpIHtcbiAgJC5mbi5SZXZTZWxlY3RCb3ggPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIG51bWJlck9mT3B0aW9ucyA9ICQodGhpcykuY2hpbGRyZW4oJ29wdGlvbicpLmxlbmd0aDtcblxuXG4gICAgICAkdGhpcy5hZGRDbGFzcygnc2VsZWN0LWhpZGRlbicpO1xuXG4gICAgICBpZiggISR0aGlzLnBhcmVudCgpLmhhc0NsYXNzKCdyZXYtc2VsZWN0JykgKXtcbiAgICAgICAgJHRoaXMud3JhcCgnPGRpdiBjbGFzcz1cInJldi1zZWxlY3RcIj48L2Rpdj4nKTtcbiAgICAgIH1cbiAgICAgICR0aGlzLmNsb3Nlc3QoJy5yZXYtc2VsZWN0JykuZmluZCgnLnNlbGVjdC1zdHlsZWQnKS5yZW1vdmUoKTtcbiAgICAgICR0aGlzLmNsb3Nlc3QoJy5yZXYtc2VsZWN0JykuZmluZCgnLnNlbGVjdC1vcHRpb25zJykucmVtb3ZlKCk7XG5cblxuICAgICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJzZWxlY3Qtc3R5bGVkXCI+PC9kaXY+Jyk7XG5cbiAgICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnZGl2LnNlbGVjdC1zdHlsZWQnKTtcbiAgICAgIGlmKCAkdGhpcy5maW5kKCdvcHRpb246c2VsZWN0ZWQnKSApe1xuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJHRoaXMuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoMCkudGV4dCgpKTtcbiAgICAgIH1cblxuICAgICAgdmFyICRsaXN0ID0gJCgnPHVsIC8+Jywge1xuICAgICAgICAnY2xhc3MnOiAnc2VsZWN0LW9wdGlvbnMnXG4gICAgICB9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAkKCc8bGkgLz4nLCB7XG4gICAgICAgICAgdGV4dDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnRleHQoKSxcbiAgICAgICAgICByZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxuICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XG4gICAgICB9XG5cbiAgICAgIHZhciAkbGlzdEl0ZW1zID0gJGxpc3QuY2hpbGRyZW4oJ2xpJyk7XG5cbiAgICAgICRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkKCdkaXYuc2VsZWN0LXN0eWxlZC5hY3RpdmUnKS5ub3QodGhpcykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsLnNlbGVjdC1vcHRpb25zJykudG9nZ2xlKCk7XG4gICAgICB9KTtcblxuICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkKHRoaXMpLnRleHQoKSkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy52YWwoKSk7XG4gICAgICB9KTtcblxuICAgICAgJHRoaXMuY2hhbmdlKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgLy8gZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCAkdGhpcy5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS50ZXh0KCkgKTtcbiAgICAgIH0pO1xuXG4gICAgICAkKGRvY3VtZW50KS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfTtcblxufShqUXVlcnkpKTtcblxualF1ZXJ5KFwiLnJldi1zZWxlY3QtYm94XCIpLlJldlNlbGVjdEJveCgpO1xualF1ZXJ5KCBcInNlbGVjdFwiICkuUmV2U2VsZWN0Qm94KCk7XG4iLCIvKiFcbiAqIGpRdWVyeSBDb29raWUgY29uc2VudCBwbHVnaW4gdjEuMC4xNlxuICogaHR0cHM6Ly9naXRodWIuY29tL215c3BhY2UtbnVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNyBKb2hhbiBKb2hhbnNzb25cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbiFmdW5jdGlvbihhKXthLmNvb2tpZT1mdW5jdGlvbihlLG8sbil7aWYoMTxhcmd1bWVudHMubGVuZ3RoKXJldHVybiBuPWEuZXh0ZW5kKHt9LG4pLG51bGw9PW8mJihuLmV4cGlyZXM9LTEpLGRvY3VtZW50LmNvb2tpZT1bZW5jb2RlVVJJQ29tcG9uZW50KGUpLFwiPVwiLG4ucmF3P286ZW5jb2RlVVJJQ29tcG9uZW50KG8pLG4uZXhwaXJlcz9cIjsgZXhwaXJlcz1cIituLmV4cGlyZXMudG9VVENTdHJpbmcoKTpcIlwiLG4ucGF0aD9cIjsgcGF0aD1cIituLnBhdGg6XCJcIixuLmRvbWFpbj9cIjsgZG9tYWluPVwiK24uZG9tYWluOlwiXCIsbi5zZWN1cmU/XCI7IHNlY3VyZVwiOlwiXCJdLmpvaW4oXCJcIik7Zm9yKHZhciB0LHM9ZG9jdW1lbnQuY29va2llLnNwbGl0KFwiOyBcIiksaT0wO3Q9c1tpXSYmc1tpXS5zcGxpdChcIj1cIik7aSsrKWlmKGRlY29kZVVSSUNvbXBvbmVudCh0WzBdKT09PWUpcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh0WzFdfHxcIlwiKTtyZXR1cm4gbnVsbH0sYS5mbi5jb29raWVDb25zZW50PWZ1bmN0aW9uKGUpe3ZhciBvPWEuZXh0ZW5kKHtwb3NpdGlvbjpcInN0YXRpY1wiLG1lc3NhZ2U6XCJUaGlzIHdlYnNpdGUgdXNlcyBjb29raWVzLiBCeSB1c2luZyB0aGlzIHdlYnNpdGUgeW91IGNvbnNlbnQgdG8gb3VyIHVzZSBvZiB0aGVzZSBjb29raWVzLlwiLHN0eWxlOlwiXCIsY29uc2VudE1lc3NhZ2U6XCJJIHVuZGVyc3RhbmRcIixjb25zZW50U3R5bGU6XCJcIixhY2NlcHRDbGFzczpcImNvb2tpZUFjY2VwdFwiLGNvbnNlbnRUaW1lOjM2NTAsc3RvcmFnZTpcImNvb2tpZVwiLG9uSW5pdDpmdW5jdGlvbigpe30sb25Db25zZW50OmZ1bmN0aW9uKCl7fSxvblRlbXBsYXRlOmZ1bmN0aW9uKCl7Y29uc29sZS5sb2codGhpcyl9LHRlc3Rpbmc6ITEsY29uc2VudEtleTpcImNvb2tpZXNDb25zZW50RGF0ZVwifSxlKTtvLmlzR29vZ2xlQm90PSEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lLUxpZ2h0aG91c2V8UGFnZSBTcGVlZHxIZWFkbGVzcy9pKTt3aW5kb3cubmF2aWdhdG9yLnVzZXJMYW5ndWFnZXx8d2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZTtvLnN0b3JhZ2U9XCJsb2NhbFwiPT09by5zdG9yYWdlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgU3RvcmFnZT9cImxvY2FsXCI6XCJzZXNzaW9uXCI9PT1vLnN0b3JhZ2UmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBTdG9yYWdlP1wic2Vzc2lvblwiOlwiY29va2llXCI7dmFyIG49XCJsb2NhbFwiPT09by5zdG9yYWdlP3BhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKG8uY29uc2VudEtleSkpOlwic2Vzc2lvblwiPT09by5zdG9yYWdlP3BhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oby5jb25zZW50S2V5KSk6cGFyc2VJbnQoYS5jb29raWUoby5jb25zZW50S2V5KSksdD10aGlzLmxlbmd0aD90aGlzOmEoXCI8ZGl2PlwiLHtodG1sOm8ubWVzc2FnZSxzdHlsZTpcImJhY2tncm91bmQtY29sb3I6d2hpdGU7Y29sb3I6IzMzMzt0ZXh0LWFsaWduOmNlbnRlcjtkaXNwbGF5Om5vbmU7XCIrby5zdHlsZX0pLmFwcGVuZChhKFwiPGJ1dHRvbj5cIix7aHRtbDpvLmNvbnNlbnRNZXNzYWdlLHN0eWxlOlwiYmFja2dyb3VuZDojMDkwO2NvbG9yOndoaXRlO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6MC4yZW07bWFyZ2luOjAuNWVtO3BhZGRpbmc6MC4yZW0gMC41ZW0gMC4yZW0gMC41ZW07XCIrby5jb25zZW50U3R5bGUsY2xhc3M6by5hY2NlcHRDbGFzc30pKS5wcmVwZW5kVG8oYShcImJvZHlcIikpO3JldHVybiBvLm9uSW5pdC5jYWxsKHQpLG8uaXNHb29nbGVCb3Q/YSh0KS5oaWRlKCk6by50ZXN0aW5nfHwhbnx8bis4NjRlNSpvLmNvbnNlbnRUaW1lPChuZXcgRGF0ZSkuZ2V0VGltZSgpP2EodCkuc2hvdygpOmEodCkuaGlkZSgpLHQuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyk7YSh0aGlzKS5wcmVwZW5kVG8oYShcImJvZHlcIikpLGEodGhpcykuZmluZChcIi5cIitvLmFjY2VwdENsYXNzKS5jbGljayhmdW5jdGlvbigpe1wibG9jYWxcIj09PW8uc3RvcmFnZT9sb2NhbFN0b3JhZ2Uuc2V0SXRlbShvLmNvbnNlbnRLZXksKG5ldyBEYXRlKS5nZXRUaW1lKCkpOlwic2Vzc2lvblwiPT09by5zdG9yYWdlP3Nlc3Npb25TdG9yYWdlLnNldEl0ZW0oby5jb25zZW50S2V5LChuZXcgRGF0ZSkuZ2V0VGltZSgpKTphLmNvb2tpZShvLmNvbnNlbnRLZXksKG5ldyBEYXRlKS5nZXRUaW1lKCkse2V4cGlyZXM6bmV3IERhdGUoKG5ldyBEYXRlKS5nZXRUaW1lKCkrODY0ZTUqby5jb25zZW50VGltZSkscGF0aDpcIi9cIn0pLGUuaGlkZSgpLG8ub25Db25zZW50LmNhbGwoZSl9KX0pLHRoaXN9LGEuY29va2llQ29uc2VudD1mdW5jdGlvbihlKXthLmZuLmNvb2tpZUNvbnNlbnQoZSl9fShqUXVlcnkpO1xuIiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9ZXx8c2VsZikuR0xpZ2h0Ym94PXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKHQpe3JldHVybihlPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9KSh0KX1mdW5jdGlvbiB0KGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1mdW5jdGlvbiBpKGUsdCl7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKyspe3ZhciBuPXRbaV07bi5lbnVtZXJhYmxlPW4uZW51bWVyYWJsZXx8ITEsbi5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gbiYmKG4ud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4ua2V5LG4pfX1mdW5jdGlvbiBuKGUsdCxuKXtyZXR1cm4gdCYmaShlLnByb3RvdHlwZSx0KSxuJiZpKGUsbiksZX12YXIgcz1EYXRlLm5vdygpO2Z1bmN0aW9uIGwoKXt2YXIgZT17fSx0PSEwLGk9MCxuPWFyZ3VtZW50cy5sZW5ndGg7XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnRzWzBdKSYmKHQ9YXJndW1lbnRzWzBdLGkrKyk7Zm9yKHZhciBzPWZ1bmN0aW9uKGkpe2Zvcih2YXIgbiBpbiBpKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpLG4pJiYodCYmXCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpW25dKT9lW25dPWwoITAsZVtuXSxpW25dKTplW25dPWlbbl0pfTtpPG47aSsrKXt2YXIgbz1hcmd1bWVudHNbaV07cyhvKX1yZXR1cm4gZX1mdW5jdGlvbiBvKGUsdCl7aWYoKGsoZSl8fGU9PT13aW5kb3d8fGU9PT1kb2N1bWVudCkmJihlPVtlXSksQShlKXx8TChlKXx8KGU9W2VdKSwwIT1QKGUpKWlmKEEoZSkmJiFMKGUpKWZvcih2YXIgaT1lLmxlbmd0aCxuPTA7bjxpJiYhMSE9PXQuY2FsbChlW25dLGVbbl0sbixlKTtuKyspO2Vsc2UgaWYoTChlKSlmb3IodmFyIHMgaW4gZSlpZihPKGUscykmJiExPT09dC5jYWxsKGVbc10sZVtzXSxzLGUpKWJyZWFrfWZ1bmN0aW9uIHIoZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOm51bGwsaT1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06bnVsbCxuPWVbc109ZVtzXXx8W10sbD17YWxsOm4sZXZ0Om51bGwsZm91bmQ6bnVsbH07cmV0dXJuIHQmJmkmJlAobik+MCYmbyhuLChmdW5jdGlvbihlLG4pe2lmKGUuZXZlbnROYW1lPT10JiZlLmZuLnRvU3RyaW5nKCk9PWkudG9TdHJpbmcoKSlyZXR1cm4gbC5mb3VuZD0hMCxsLmV2dD1uLCExfSkpLGx9ZnVuY3Rpb24gYShlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e30saT10Lm9uRWxlbWVudCxuPXQud2l0aENhbGxiYWNrLHM9dC5hdm9pZER1cGxpY2F0ZSxsPXZvaWQgMD09PXN8fHMsYT10Lm9uY2UsaD12b2lkIDAhPT1hJiZhLGQ9dC51c2VDYXB0dXJlLGM9dm9pZCAwIT09ZCYmZCx1PWFyZ3VtZW50cy5sZW5ndGg+Mj9hcmd1bWVudHNbMl06dm9pZCAwLGc9aXx8W107ZnVuY3Rpb24gdihlKXtUKG4pJiZuLmNhbGwodSxlLHRoaXMpLGgmJnYuZGVzdHJveSgpfXJldHVybiBDKGcpJiYoZz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGcpKSx2LmRlc3Ryb3k9ZnVuY3Rpb24oKXtvKGcsKGZ1bmN0aW9uKHQpe3ZhciBpPXIodCxlLHYpO2kuZm91bmQmJmkuYWxsLnNwbGljZShpLmV2dCwxKSx0LnJlbW92ZUV2ZW50TGlzdGVuZXImJnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHYsYyl9KSl9LG8oZywoZnVuY3Rpb24odCl7dmFyIGk9cih0LGUsdik7KHQuYWRkRXZlbnRMaXN0ZW5lciYmbCYmIWkuZm91bmR8fCFsKSYmKHQuYWRkRXZlbnRMaXN0ZW5lcihlLHYsYyksaS5hbGwucHVzaCh7ZXZlbnROYW1lOmUsZm46dn0pKX0pKSx2fWZ1bmN0aW9uIGgoZSx0KXtvKHQuc3BsaXQoXCIgXCIpLChmdW5jdGlvbih0KXtyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKHQpfSkpfWZ1bmN0aW9uIGQoZSx0KXtvKHQuc3BsaXQoXCIgXCIpLChmdW5jdGlvbih0KXtyZXR1cm4gZS5jbGFzc0xpc3QucmVtb3ZlKHQpfSkpfWZ1bmN0aW9uIGMoZSx0KXtyZXR1cm4gZS5jbGFzc0xpc3QuY29udGFpbnModCl9ZnVuY3Rpb24gdShlLHQpe2Zvcig7ZSE9PWRvY3VtZW50LmJvZHk7KXtpZighKGU9ZS5wYXJlbnRFbGVtZW50KSlyZXR1cm4hMTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLm1hdGNoZXM/ZS5tYXRjaGVzKHQpOmUubXNNYXRjaGVzU2VsZWN0b3IodCkpcmV0dXJuIGV9fWZ1bmN0aW9uIGcoZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOlwiXCIsaT1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO2lmKCFlfHxcIlwiPT09dClyZXR1cm4hMTtpZihcIm5vbmVcIj09dClyZXR1cm4gVChpKSYmaSgpLCExO3ZhciBuPXgoKSxzPXQuc3BsaXQoXCIgXCIpO28ocywoZnVuY3Rpb24odCl7aChlLFwiZ1wiK3QpfSkpLGEobix7b25FbGVtZW50OmUsYXZvaWREdXBsaWNhdGU6ITEsb25jZTohMCx3aXRoQ2FsbGJhY2s6ZnVuY3Rpb24oZSx0KXtvKHMsKGZ1bmN0aW9uKGUpe2QodCxcImdcIitlKX0pKSxUKGkpJiZpKCl9fSl9ZnVuY3Rpb24gdihlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06XCJcIjtpZihcIlwiPT10KXJldHVybiBlLnN0eWxlLndlYmtpdFRyYW5zZm9ybT1cIlwiLGUuc3R5bGUuTW96VHJhbnNmb3JtPVwiXCIsZS5zdHlsZS5tc1RyYW5zZm9ybT1cIlwiLGUuc3R5bGUuT1RyYW5zZm9ybT1cIlwiLGUuc3R5bGUudHJhbnNmb3JtPVwiXCIsITE7ZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm09dCxlLnN0eWxlLk1velRyYW5zZm9ybT10LGUuc3R5bGUubXNUcmFuc2Zvcm09dCxlLnN0eWxlLk9UcmFuc2Zvcm09dCxlLnN0eWxlLnRyYW5zZm9ybT10fWZ1bmN0aW9uIGYoZSl7ZS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIn1mdW5jdGlvbiBwKGUpe2Uuc3R5bGUuZGlzcGxheT1cIm5vbmVcIn1mdW5jdGlvbiBtKGUpe3ZhciB0PWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Zm9yKGkuaW5uZXJIVE1MPWU7aS5maXJzdENoaWxkOyl0LmFwcGVuZENoaWxkKGkuZmlyc3RDaGlsZCk7cmV0dXJuIHR9ZnVuY3Rpb24geSgpe3JldHVybnt3aWR0aDp3aW5kb3cuaW5uZXJXaWR0aHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRofHxkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHR8fGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0fX1mdW5jdGlvbiB4KCl7dmFyIGUsdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIiksaT17YW5pbWF0aW9uOlwiYW5pbWF0aW9uZW5kXCIsT0FuaW1hdGlvbjpcIm9BbmltYXRpb25FbmRcIixNb3pBbmltYXRpb246XCJhbmltYXRpb25lbmRcIixXZWJraXRBbmltYXRpb246XCJ3ZWJraXRBbmltYXRpb25FbmRcIn07Zm9yKGUgaW4gaSlpZih2b2lkIDAhPT10LnN0eWxlW2VdKXJldHVybiBpW2VdfWZ1bmN0aW9uIGIoZSx0LGksbil7aWYoZSgpKXQoKTtlbHNle3ZhciBzO2l8fChpPTEwMCk7dmFyIGw9c2V0SW50ZXJ2YWwoKGZ1bmN0aW9uKCl7ZSgpJiYoY2xlYXJJbnRlcnZhbChsKSxzJiZjbGVhclRpbWVvdXQocyksdCgpKX0pLGkpO24mJihzPXNldFRpbWVvdXQoKGZ1bmN0aW9uKCl7Y2xlYXJJbnRlcnZhbChsKX0pLG4pKX19ZnVuY3Rpb24gUyhlLHQsaSl7aWYoSShlKSljb25zb2xlLmVycm9yKFwiSW5qZWN0IGFzc2V0cyBlcnJvclwiKTtlbHNlIGlmKFQodCkmJihpPXQsdD0hMSksQyh0KSYmdCBpbiB3aW5kb3cpVChpKSYmaSgpO2Vsc2V7dmFyIG47aWYoLTEhPT1lLmluZGV4T2YoXCIuY3NzXCIpKXtpZigobj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW2hyZWY9XCInK2UrJ1wiXScpKSYmbi5sZW5ndGg+MClyZXR1cm4gdm9pZChUKGkpJiZpKCkpO3ZhciBzPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSxsPXMucXVlcnlTZWxlY3RvckFsbCgnbGlua1tyZWw9XCJzdHlsZXNoZWV0XCJdJyksbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtyZXR1cm4gby5yZWw9XCJzdHlsZXNoZWV0XCIsby50eXBlPVwidGV4dC9jc3NcIixvLmhyZWY9ZSxvLm1lZGlhPVwiYWxsXCIsbD9zLmluc2VydEJlZm9yZShvLGxbMF0pOnMuYXBwZW5kQ2hpbGQobyksdm9pZChUKGkpJiZpKCkpfWlmKChuPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFtzcmM9XCInK2UrJ1wiXScpKSYmbi5sZW5ndGg+MCl7aWYoVChpKSl7aWYoQyh0KSlyZXR1cm4gYigoZnVuY3Rpb24oKXtyZXR1cm4gdm9pZCAwIT09d2luZG93W3RdfSksKGZ1bmN0aW9uKCl7aSgpfSkpLCExO2koKX19ZWxzZXt2YXIgcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3IudHlwZT1cInRleHQvamF2YXNjcmlwdFwiLHIuc3JjPWUsci5vbmxvYWQ9ZnVuY3Rpb24oKXtpZihUKGkpKXtpZihDKHQpKXJldHVybiBiKChmdW5jdGlvbigpe3JldHVybiB2b2lkIDAhPT13aW5kb3dbdF19KSwoZnVuY3Rpb24oKXtpKCl9KSksITE7aSgpfX0sZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyKX19fWZ1bmN0aW9uIHcoKXtyZXR1cm5cIm5hdmlnYXRvclwiaW4gd2luZG93JiZ3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQYWQpfChpUGhvbmUpfChpUG9kKXwoQW5kcm9pZCl8KFBsYXlCb29rKXwoQkIxMCl8KEJsYWNrQmVycnkpfChPcGVyYSBNaW5pKXwoSUVNb2JpbGUpfCh3ZWJPUyl8KE1lZUdvKS9pKX1mdW5jdGlvbiBUKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGV9ZnVuY3Rpb24gQyhlKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgZX1mdW5jdGlvbiBrKGUpe3JldHVybiEoIWV8fCFlLm5vZGVUeXBlfHwxIT1lLm5vZGVUeXBlKX1mdW5jdGlvbiBFKGUpe3JldHVybiBBcnJheS5pc0FycmF5KGUpfWZ1bmN0aW9uIEEoZSl7cmV0dXJuIGUmJmUubGVuZ3RoJiZpc0Zpbml0ZShlLmxlbmd0aCl9ZnVuY3Rpb24gTCh0KXtyZXR1cm5cIm9iamVjdFwiPT09ZSh0KSYmbnVsbCE9dCYmIVQodCkmJiFFKHQpfWZ1bmN0aW9uIEkoZSl7cmV0dXJuIG51bGw9PWV9ZnVuY3Rpb24gTyhlLHQpe3JldHVybiBudWxsIT09ZSYmaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfWZ1bmN0aW9uIFAoZSl7aWYoTChlKSl7aWYoZS5rZXlzKXJldHVybiBlLmtleXMoKS5sZW5ndGg7dmFyIHQ9MDtmb3IodmFyIGkgaW4gZSlPKGUsaSkmJnQrKztyZXR1cm4gdH1yZXR1cm4gZS5sZW5ndGh9ZnVuY3Rpb24gTShlKXtyZXR1cm4haXNOYU4ocGFyc2VGbG9hdChlKSkmJmlzRmluaXRlKGUpfWZ1bmN0aW9uIFgoKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06LTEsdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdidG5bZGF0YS10YWJvcmRlcl06bm90KC5kaXNhYmxlZClcIik7aWYoIXQubGVuZ3RoKXJldHVybiExO2lmKDE9PXQubGVuZ3RoKXJldHVybiB0WzBdO1wic3RyaW5nXCI9PXR5cGVvZiBlJiYoZT1wYXJzZUludChlKSk7dmFyIGk9ZTwwPzE6ZSsxO2k+dC5sZW5ndGgmJihpPVwiMVwiKTt2YXIgbj1bXTtvKHQsKGZ1bmN0aW9uKGUpe24ucHVzaChlLmdldEF0dHJpYnV0ZShcImRhdGEtdGFib3JkZXJcIikpfSkpO3ZhciBzPW4uZmlsdGVyKChmdW5jdGlvbihlKXtyZXR1cm4gZT49cGFyc2VJbnQoaSl9KSksbD1zLnNvcnQoKVswXTtyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdidG5bZGF0YS10YWJvcmRlcj1cIicuY29uY2F0KGwsJ1wiXScpKX1mdW5jdGlvbiB6KGUpe2lmKGUuZXZlbnRzLmhhc093blByb3BlcnR5KFwia2V5Ym9hcmRcIikpcmV0dXJuITE7ZS5ldmVudHMua2V5Ym9hcmQ9YShcImtleWRvd25cIix7b25FbGVtZW50OndpbmRvdyx3aXRoQ2FsbGJhY2s6ZnVuY3Rpb24odCxpKXt2YXIgbj0odD10fHx3aW5kb3cuZXZlbnQpLmtleUNvZGU7aWYoOT09bil7dmFyIHM9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYnRuLmZvY3VzZWRcIik7aWYoIXMpe3ZhciBsPSEoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnR8fCFkb2N1bWVudC5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lKSYmZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpO2lmKFwiaW5wdXRcIj09bHx8XCJ0ZXh0YXJlYVwiPT1sfHxcImJ1dHRvblwiPT1sKXJldHVybn10LnByZXZlbnREZWZhdWx0KCk7dmFyIG89ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYnRuW2RhdGEtdGFib3JkZXJdXCIpO2lmKCFvfHxvLmxlbmd0aDw9MClyZXR1cm47aWYoIXMpe3ZhciByPVgoKTtyZXR1cm4gdm9pZChyJiYoci5mb2N1cygpLGgocixcImZvY3VzZWRcIikpKX12YXIgYT1YKHMuZ2V0QXR0cmlidXRlKFwiZGF0YS10YWJvcmRlclwiKSk7ZChzLFwiZm9jdXNlZFwiKSxhJiYoYS5mb2N1cygpLGgoYSxcImZvY3VzZWRcIikpfTM5PT1uJiZlLm5leHRTbGlkZSgpLDM3PT1uJiZlLnByZXZTbGlkZSgpLDI3PT1uJiZlLmNsb3NlKCl9fSl9ZnVuY3Rpb24gWShlKXtyZXR1cm4gTWF0aC5zcXJ0KGUueCplLngrZS55KmUueSl9ZnVuY3Rpb24gcShlLHQpe3ZhciBpPWZ1bmN0aW9uKGUsdCl7dmFyIGk9WShlKSpZKHQpO2lmKDA9PT1pKXJldHVybiAwO3ZhciBuPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUueCp0LngrZS55KnQueX0oZSx0KS9pO3JldHVybiBuPjEmJihuPTEpLE1hdGguYWNvcyhuKX0oZSx0KTtyZXR1cm4gZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS54KnQueS10LngqZS55fShlLHQpPjAmJihpKj0tMSksMTgwKmkvTWF0aC5QSX12YXIgTj1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoaSl7dCh0aGlzLGUpLHRoaXMuaGFuZGxlcnM9W10sdGhpcy5lbD1pfXJldHVybiBuKGUsW3trZXk6XCJhZGRcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmhhbmRsZXJzLnB1c2goZSl9fSx7a2V5OlwiZGVsXCIsdmFsdWU6ZnVuY3Rpb24oZSl7ZXx8KHRoaXMuaGFuZGxlcnM9W10pO2Zvcih2YXIgdD10aGlzLmhhbmRsZXJzLmxlbmd0aDt0Pj0wO3QtLSl0aGlzLmhhbmRsZXJzW3RdPT09ZSYmdGhpcy5oYW5kbGVycy5zcGxpY2UodCwxKX19LHtrZXk6XCJkaXNwYXRjaFwiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPTAsdD10aGlzLmhhbmRsZXJzLmxlbmd0aDtlPHQ7ZSsrKXt2YXIgaT10aGlzLmhhbmRsZXJzW2VdO1wiZnVuY3Rpb25cIj09dHlwZW9mIGkmJmkuYXBwbHkodGhpcy5lbCxhcmd1bWVudHMpfX19XSksZX0oKTtmdW5jdGlvbiBEKGUsdCl7dmFyIGk9bmV3IE4oZSk7cmV0dXJuIGkuYWRkKHQpLGl9dmFyIF89ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGksbil7dCh0aGlzLGUpLHRoaXMuZWxlbWVudD1cInN0cmluZ1wiPT10eXBlb2YgaT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGkpOmksdGhpcy5zdGFydD10aGlzLnN0YXJ0LmJpbmQodGhpcyksdGhpcy5tb3ZlPXRoaXMubW92ZS5iaW5kKHRoaXMpLHRoaXMuZW5kPXRoaXMuZW5kLmJpbmQodGhpcyksdGhpcy5jYW5jZWw9dGhpcy5jYW5jZWwuYmluZCh0aGlzKSx0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIix0aGlzLnN0YXJ0LCExKSx0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHRoaXMubW92ZSwhMSksdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHRoaXMuZW5kLCExKSx0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoY2FuY2VsXCIsdGhpcy5jYW5jZWwsITEpLHRoaXMucHJlVj17eDpudWxsLHk6bnVsbH0sdGhpcy5waW5jaFN0YXJ0TGVuPW51bGwsdGhpcy56b29tPTEsdGhpcy5pc0RvdWJsZVRhcD0hMTt2YXIgcz1mdW5jdGlvbigpe307dGhpcy5yb3RhdGU9RCh0aGlzLmVsZW1lbnQsbi5yb3RhdGV8fHMpLHRoaXMudG91Y2hTdGFydD1EKHRoaXMuZWxlbWVudCxuLnRvdWNoU3RhcnR8fHMpLHRoaXMubXVsdGlwb2ludFN0YXJ0PUQodGhpcy5lbGVtZW50LG4ubXVsdGlwb2ludFN0YXJ0fHxzKSx0aGlzLm11bHRpcG9pbnRFbmQ9RCh0aGlzLmVsZW1lbnQsbi5tdWx0aXBvaW50RW5kfHxzKSx0aGlzLnBpbmNoPUQodGhpcy5lbGVtZW50LG4ucGluY2h8fHMpLHRoaXMuc3dpcGU9RCh0aGlzLmVsZW1lbnQsbi5zd2lwZXx8cyksdGhpcy50YXA9RCh0aGlzLmVsZW1lbnQsbi50YXB8fHMpLHRoaXMuZG91YmxlVGFwPUQodGhpcy5lbGVtZW50LG4uZG91YmxlVGFwfHxzKSx0aGlzLmxvbmdUYXA9RCh0aGlzLmVsZW1lbnQsbi5sb25nVGFwfHxzKSx0aGlzLnNpbmdsZVRhcD1EKHRoaXMuZWxlbWVudCxuLnNpbmdsZVRhcHx8cyksdGhpcy5wcmVzc01vdmU9RCh0aGlzLmVsZW1lbnQsbi5wcmVzc01vdmV8fHMpLHRoaXMudHdvRmluZ2VyUHJlc3NNb3ZlPUQodGhpcy5lbGVtZW50LG4udHdvRmluZ2VyUHJlc3NNb3ZlfHxzKSx0aGlzLnRvdWNoTW92ZT1EKHRoaXMuZWxlbWVudCxuLnRvdWNoTW92ZXx8cyksdGhpcy50b3VjaEVuZD1EKHRoaXMuZWxlbWVudCxuLnRvdWNoRW5kfHxzKSx0aGlzLnRvdWNoQ2FuY2VsPUQodGhpcy5lbGVtZW50LG4udG91Y2hDYW5jZWx8fHMpLHRoaXMudHJhbnNsYXRlQ29udGFpbmVyPXRoaXMuZWxlbWVudCx0aGlzLl9jYW5jZWxBbGxIYW5kbGVyPXRoaXMuY2FuY2VsQWxsLmJpbmQodGhpcyksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLl9jYW5jZWxBbGxIYW5kbGVyKSx0aGlzLmRlbHRhPW51bGwsdGhpcy5sYXN0PW51bGwsdGhpcy5ub3c9bnVsbCx0aGlzLnRhcFRpbWVvdXQ9bnVsbCx0aGlzLnNpbmdsZVRhcFRpbWVvdXQ9bnVsbCx0aGlzLmxvbmdUYXBUaW1lb3V0PW51bGwsdGhpcy5zd2lwZVRpbWVvdXQ9bnVsbCx0aGlzLngxPXRoaXMueDI9dGhpcy55MT10aGlzLnkyPW51bGwsdGhpcy5wcmVUYXBQb3NpdGlvbj17eDpudWxsLHk6bnVsbH19cmV0dXJuIG4oZSxbe2tleTpcInN0YXJ0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoZS50b3VjaGVzKXtpZihlLnRhcmdldCYmZS50YXJnZXQubm9kZU5hbWUmJltcImFcIixcImJ1dHRvblwiLFwiaW5wdXRcIl0uaW5kZXhPZihlLnRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKT49MCljb25zb2xlLmxvZyhcImlnbm9yZSBkcmFnIGZvciB0aGlzIHRvdWNoZWQgZWxlbWVudFwiLGUudGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpO2Vsc2V7dGhpcy5ub3c9RGF0ZS5ub3coKSx0aGlzLngxPWUudG91Y2hlc1swXS5wYWdlWCx0aGlzLnkxPWUudG91Y2hlc1swXS5wYWdlWSx0aGlzLmRlbHRhPXRoaXMubm93LSh0aGlzLmxhc3R8fHRoaXMubm93KSx0aGlzLnRvdWNoU3RhcnQuZGlzcGF0Y2goZSx0aGlzLmVsZW1lbnQpLG51bGwhPT10aGlzLnByZVRhcFBvc2l0aW9uLngmJih0aGlzLmlzRG91YmxlVGFwPXRoaXMuZGVsdGE+MCYmdGhpcy5kZWx0YTw9MjUwJiZNYXRoLmFicyh0aGlzLnByZVRhcFBvc2l0aW9uLngtdGhpcy54MSk8MzAmJk1hdGguYWJzKHRoaXMucHJlVGFwUG9zaXRpb24ueS10aGlzLnkxKTwzMCx0aGlzLmlzRG91YmxlVGFwJiZjbGVhclRpbWVvdXQodGhpcy5zaW5nbGVUYXBUaW1lb3V0KSksdGhpcy5wcmVUYXBQb3NpdGlvbi54PXRoaXMueDEsdGhpcy5wcmVUYXBQb3NpdGlvbi55PXRoaXMueTEsdGhpcy5sYXN0PXRoaXMubm93O3ZhciB0PXRoaXMucHJlVjtpZihlLnRvdWNoZXMubGVuZ3RoPjEpe3RoaXMuX2NhbmNlbExvbmdUYXAoKSx0aGlzLl9jYW5jZWxTaW5nbGVUYXAoKTt2YXIgaT17eDplLnRvdWNoZXNbMV0ucGFnZVgtdGhpcy54MSx5OmUudG91Y2hlc1sxXS5wYWdlWS10aGlzLnkxfTt0Lng9aS54LHQueT1pLnksdGhpcy5waW5jaFN0YXJ0TGVuPVkodCksdGhpcy5tdWx0aXBvaW50U3RhcnQuZGlzcGF0Y2goZSx0aGlzLmVsZW1lbnQpfXRoaXMuX3ByZXZlbnRUYXA9ITEsdGhpcy5sb25nVGFwVGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dGhpcy5sb25nVGFwLmRpc3BhdGNoKGUsdGhpcy5lbGVtZW50KSx0aGlzLl9wcmV2ZW50VGFwPSEwfS5iaW5kKHRoaXMpLDc1MCl9fX19LHtrZXk6XCJtb3ZlXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoZS50b3VjaGVzKXt2YXIgdD10aGlzLnByZVYsaT1lLnRvdWNoZXMubGVuZ3RoLG49ZS50b3VjaGVzWzBdLnBhZ2VYLHM9ZS50b3VjaGVzWzBdLnBhZ2VZO2lmKHRoaXMuaXNEb3VibGVUYXA9ITEsaT4xKXt2YXIgbD1lLnRvdWNoZXNbMV0ucGFnZVgsbz1lLnRvdWNoZXNbMV0ucGFnZVkscj17eDplLnRvdWNoZXNbMV0ucGFnZVgtbix5OmUudG91Y2hlc1sxXS5wYWdlWS1zfTtudWxsIT09dC54JiYodGhpcy5waW5jaFN0YXJ0TGVuPjAmJihlLnpvb209WShyKS90aGlzLnBpbmNoU3RhcnRMZW4sdGhpcy5waW5jaC5kaXNwYXRjaChlLHRoaXMuZWxlbWVudCkpLGUuYW5nbGU9cShyLHQpLHRoaXMucm90YXRlLmRpc3BhdGNoKGUsdGhpcy5lbGVtZW50KSksdC54PXIueCx0Lnk9ci55LG51bGwhPT10aGlzLngyJiZudWxsIT09dGhpcy5zeDI/KGUuZGVsdGFYPShuLXRoaXMueDIrbC10aGlzLnN4MikvMixlLmRlbHRhWT0ocy10aGlzLnkyK28tdGhpcy5zeTIpLzIpOihlLmRlbHRhWD0wLGUuZGVsdGFZPTApLHRoaXMudHdvRmluZ2VyUHJlc3NNb3ZlLmRpc3BhdGNoKGUsdGhpcy5lbGVtZW50KSx0aGlzLnN4Mj1sLHRoaXMuc3kyPW99ZWxzZXtpZihudWxsIT09dGhpcy54Mil7ZS5kZWx0YVg9bi10aGlzLngyLGUuZGVsdGFZPXMtdGhpcy55Mjt2YXIgYT1NYXRoLmFicyh0aGlzLngxLXRoaXMueDIpLGg9TWF0aC5hYnModGhpcy55MS10aGlzLnkyKTsoYT4xMHx8aD4xMCkmJih0aGlzLl9wcmV2ZW50VGFwPSEwKX1lbHNlIGUuZGVsdGFYPTAsZS5kZWx0YVk9MDt0aGlzLnByZXNzTW92ZS5kaXNwYXRjaChlLHRoaXMuZWxlbWVudCl9dGhpcy50b3VjaE1vdmUuZGlzcGF0Y2goZSx0aGlzLmVsZW1lbnQpLHRoaXMuX2NhbmNlbExvbmdUYXAoKSx0aGlzLngyPW4sdGhpcy55Mj1zLGk+MSYmZS5wcmV2ZW50RGVmYXVsdCgpfX19LHtrZXk6XCJlbmRcIix2YWx1ZTpmdW5jdGlvbihlKXtpZihlLmNoYW5nZWRUb3VjaGVzKXt0aGlzLl9jYW5jZWxMb25nVGFwKCk7dmFyIHQ9dGhpcztlLnRvdWNoZXMubGVuZ3RoPDImJih0aGlzLm11bHRpcG9pbnRFbmQuZGlzcGF0Y2goZSx0aGlzLmVsZW1lbnQpLHRoaXMuc3gyPXRoaXMuc3kyPW51bGwpLHRoaXMueDImJk1hdGguYWJzKHRoaXMueDEtdGhpcy54Mik+MzB8fHRoaXMueTImJk1hdGguYWJzKHRoaXMueTEtdGhpcy55Mik+MzA/KGUuZGlyZWN0aW9uPXRoaXMuX3N3aXBlRGlyZWN0aW9uKHRoaXMueDEsdGhpcy54Mix0aGlzLnkxLHRoaXMueTIpLHRoaXMuc3dpcGVUaW1lb3V0PXNldFRpbWVvdXQoKGZ1bmN0aW9uKCl7dC5zd2lwZS5kaXNwYXRjaChlLHQuZWxlbWVudCl9KSwwKSk6KHRoaXMudGFwVGltZW91dD1zZXRUaW1lb3V0KChmdW5jdGlvbigpe3QuX3ByZXZlbnRUYXB8fHQudGFwLmRpc3BhdGNoKGUsdC5lbGVtZW50KSx0LmlzRG91YmxlVGFwJiYodC5kb3VibGVUYXAuZGlzcGF0Y2goZSx0LmVsZW1lbnQpLHQuaXNEb3VibGVUYXA9ITEpfSksMCksdC5pc0RvdWJsZVRhcHx8KHQuc2luZ2xlVGFwVGltZW91dD1zZXRUaW1lb3V0KChmdW5jdGlvbigpe3Quc2luZ2xlVGFwLmRpc3BhdGNoKGUsdC5lbGVtZW50KX0pLDI1MCkpKSx0aGlzLnRvdWNoRW5kLmRpc3BhdGNoKGUsdGhpcy5lbGVtZW50KSx0aGlzLnByZVYueD0wLHRoaXMucHJlVi55PTAsdGhpcy56b29tPTEsdGhpcy5waW5jaFN0YXJ0TGVuPW51bGwsdGhpcy54MT10aGlzLngyPXRoaXMueTE9dGhpcy55Mj1udWxsfX19LHtrZXk6XCJjYW5jZWxBbGxcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuX3ByZXZlbnRUYXA9ITAsY2xlYXJUaW1lb3V0KHRoaXMuc2luZ2xlVGFwVGltZW91dCksY2xlYXJUaW1lb3V0KHRoaXMudGFwVGltZW91dCksY2xlYXJUaW1lb3V0KHRoaXMubG9uZ1RhcFRpbWVvdXQpLGNsZWFyVGltZW91dCh0aGlzLnN3aXBlVGltZW91dCl9fSx7a2V5OlwiY2FuY2VsXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5jYW5jZWxBbGwoKSx0aGlzLnRvdWNoQ2FuY2VsLmRpc3BhdGNoKGUsdGhpcy5lbGVtZW50KX19LHtrZXk6XCJfY2FuY2VsTG9uZ1RhcFwiLHZhbHVlOmZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHRoaXMubG9uZ1RhcFRpbWVvdXQpfX0se2tleTpcIl9jYW5jZWxTaW5nbGVUYXBcIix2YWx1ZTpmdW5jdGlvbigpe2NsZWFyVGltZW91dCh0aGlzLnNpbmdsZVRhcFRpbWVvdXQpfX0se2tleTpcIl9zd2lwZURpcmVjdGlvblwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxpLG4pe3JldHVybiBNYXRoLmFicyhlLXQpPj1NYXRoLmFicyhpLW4pP2UtdD4wP1wiTGVmdFwiOlwiUmlnaHRcIjppLW4+MD9cIlVwXCI6XCJEb3duXCJ9fSx7a2V5Olwib25cIix2YWx1ZTpmdW5jdGlvbihlLHQpe3RoaXNbZV0mJnRoaXNbZV0uYWRkKHQpfX0se2tleTpcIm9mZlwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dGhpc1tlXSYmdGhpc1tlXS5kZWwodCl9fSx7a2V5OlwiZGVzdHJveVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2luZ2xlVGFwVGltZW91dCYmY2xlYXJUaW1lb3V0KHRoaXMuc2luZ2xlVGFwVGltZW91dCksdGhpcy50YXBUaW1lb3V0JiZjbGVhclRpbWVvdXQodGhpcy50YXBUaW1lb3V0KSx0aGlzLmxvbmdUYXBUaW1lb3V0JiZjbGVhclRpbWVvdXQodGhpcy5sb25nVGFwVGltZW91dCksdGhpcy5zd2lwZVRpbWVvdXQmJmNsZWFyVGltZW91dCh0aGlzLnN3aXBlVGltZW91dCksdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsdGhpcy5zdGFydCksdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIix0aGlzLm1vdmUpLHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIix0aGlzLmVuZCksdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLHRoaXMuY2FuY2VsKSx0aGlzLnJvdGF0ZS5kZWwoKSx0aGlzLnRvdWNoU3RhcnQuZGVsKCksdGhpcy5tdWx0aXBvaW50U3RhcnQuZGVsKCksdGhpcy5tdWx0aXBvaW50RW5kLmRlbCgpLHRoaXMucGluY2guZGVsKCksdGhpcy5zd2lwZS5kZWwoKSx0aGlzLnRhcC5kZWwoKSx0aGlzLmRvdWJsZVRhcC5kZWwoKSx0aGlzLmxvbmdUYXAuZGVsKCksdGhpcy5zaW5nbGVUYXAuZGVsKCksdGhpcy5wcmVzc01vdmUuZGVsKCksdGhpcy50d29GaW5nZXJQcmVzc01vdmUuZGVsKCksdGhpcy50b3VjaE1vdmUuZGVsKCksdGhpcy50b3VjaEVuZC5kZWwoKSx0aGlzLnRvdWNoQ2FuY2VsLmRlbCgpLHRoaXMucHJlVj10aGlzLnBpbmNoU3RhcnRMZW49dGhpcy56b29tPXRoaXMuaXNEb3VibGVUYXA9dGhpcy5kZWx0YT10aGlzLmxhc3Q9dGhpcy5ub3c9dGhpcy50YXBUaW1lb3V0PXRoaXMuc2luZ2xlVGFwVGltZW91dD10aGlzLmxvbmdUYXBUaW1lb3V0PXRoaXMuc3dpcGVUaW1lb3V0PXRoaXMueDE9dGhpcy54Mj10aGlzLnkxPXRoaXMueTI9dGhpcy5wcmVUYXBQb3NpdGlvbj10aGlzLnJvdGF0ZT10aGlzLnRvdWNoU3RhcnQ9dGhpcy5tdWx0aXBvaW50U3RhcnQ9dGhpcy5tdWx0aXBvaW50RW5kPXRoaXMucGluY2g9dGhpcy5zd2lwZT10aGlzLnRhcD10aGlzLmRvdWJsZVRhcD10aGlzLmxvbmdUYXA9dGhpcy5zaW5nbGVUYXA9dGhpcy5wcmVzc01vdmU9dGhpcy50b3VjaE1vdmU9dGhpcy50b3VjaEVuZD10aGlzLnRvdWNoQ2FuY2VsPXRoaXMudHdvRmluZ2VyUHJlc3NNb3ZlPW51bGwsd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIix0aGlzLl9jYW5jZWxBbGxIYW5kbGVyKSxudWxsfX1dKSxlfSgpO2Z1bmN0aW9uIFcoZSl7dmFyIHQ9ZnVuY3Rpb24oKXt2YXIgZSx0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKSxpPXt0cmFuc2l0aW9uOlwidHJhbnNpdGlvbmVuZFwiLE9UcmFuc2l0aW9uOlwib1RyYW5zaXRpb25FbmRcIixNb3pUcmFuc2l0aW9uOlwidHJhbnNpdGlvbmVuZFwiLFdlYmtpdFRyYW5zaXRpb246XCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCJ9O2ZvcihlIGluIGkpaWYodm9pZCAwIT09dC5zdHlsZVtlXSlyZXR1cm4gaVtlXX0oKSxpPXdpbmRvdy5pbm5lcldpZHRofHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGh8fGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsbj1jKGUsXCJnc2xpZGUtbWVkaWFcIik/ZTplLnF1ZXJ5U2VsZWN0b3IoXCIuZ3NsaWRlLW1lZGlhXCIpLHM9dShuLFwiLmdpbm5lci1jb250YWluZXJcIiksbD1lLnF1ZXJ5U2VsZWN0b3IoXCIuZ3NsaWRlLWRlc2NyaXB0aW9uXCIpO2k+NzY5JiYobj1zKSxoKG4sXCJncmVzZXRcIiksdihuLFwidHJhbnNsYXRlM2QoMCwgMCwgMClcIiksYSh0LHtvbkVsZW1lbnQ6bixvbmNlOiEwLHdpdGhDYWxsYmFjazpmdW5jdGlvbihlLHQpe2QobixcImdyZXNldFwiKX19KSxuLnN0eWxlLm9wYWNpdHk9XCJcIixsJiYobC5zdHlsZS5vcGFjaXR5PVwiXCIpfWZ1bmN0aW9uIEIoZSl7aWYoZS5ldmVudHMuaGFzT3duUHJvcGVydHkoXCJ0b3VjaFwiKSlyZXR1cm4hMTt2YXIgdCxpLG4scz15KCksbD1zLndpZHRoLG89cy5oZWlnaHQscj0hMSxhPW51bGwsZz1udWxsLGY9bnVsbCxwPSExLG09MSx4PTEsYj0hMSxTPSExLHc9bnVsbCxUPW51bGwsQz1udWxsLGs9bnVsbCxFPTAsQT0wLEw9ITEsST0hMSxPPXt9LFA9e30sTT0wLFg9MCx6PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xpZ2h0Ym94LXNsaWRlclwiKSxZPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ292ZXJsYXlcIikscT1uZXcgXyh6LHt0b3VjaFN0YXJ0OmZ1bmN0aW9uKHQpe2lmKHI9ITAsKGModC50YXJnZXRUb3VjaGVzWzBdLnRhcmdldCxcImdpbm5lci1jb250YWluZXJcIil8fHUodC50YXJnZXRUb3VjaGVzWzBdLnRhcmdldCxcIi5nc2xpZGUtZGVzY1wiKXx8XCJhXCI9PXQudGFyZ2V0VG91Y2hlc1swXS50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkmJihyPSExKSx1KHQudGFyZ2V0VG91Y2hlc1swXS50YXJnZXQsXCIuZ3NsaWRlLWlubGluZVwiKSYmIWModC50YXJnZXRUb3VjaGVzWzBdLnRhcmdldC5wYXJlbnROb2RlLFwiZ3NsaWRlLWlubGluZVwiKSYmKHI9ITEpLHIpe2lmKFA9dC50YXJnZXRUb3VjaGVzWzBdLE8ucGFnZVg9dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYLE8ucGFnZVk9dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZLE09dC50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsWD10LnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSxhPWUuYWN0aXZlU2xpZGUsZz1hLnF1ZXJ5U2VsZWN0b3IoXCIuZ3NsaWRlLW1lZGlhXCIpLG49YS5xdWVyeVNlbGVjdG9yKFwiLmdzbGlkZS1pbmxpbmVcIiksZj1udWxsLGMoZyxcImdzbGlkZS1pbWFnZVwiKSYmKGY9Zy5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpKSwod2luZG93LmlubmVyV2lkdGh8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aHx8ZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCk+NzY5JiYoZz1hLnF1ZXJ5U2VsZWN0b3IoXCIuZ2lubmVyLWNvbnRhaW5lclwiKSksZChZLFwiZ3Jlc2V0XCIpLHQucGFnZVg+MjAmJnQucGFnZVg8d2luZG93LmlubmVyV2lkdGgtMjApcmV0dXJuO3QucHJldmVudERlZmF1bHQoKX19LHRvdWNoTW92ZTpmdW5jdGlvbihzKXtpZihyJiYoUD1zLnRhcmdldFRvdWNoZXNbMF0sIWImJiFTKSl7aWYobiYmbi5vZmZzZXRIZWlnaHQ+byl7dmFyIGE9Ty5wYWdlWC1QLnBhZ2VYO2lmKE1hdGguYWJzKGEpPD0xMylyZXR1cm4hMX1wPSEwO3ZhciBoLGQ9cy50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFgsYz1zLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSx1PU0tZCxtPVgtYztpZihNYXRoLmFicyh1KT5NYXRoLmFicyhtKT8oTD0hMSxJPSEwKTooST0hMSxMPSEwKSx0PVAucGFnZVgtTy5wYWdlWCxFPTEwMCp0L2wsaT1QLnBhZ2VZLU8ucGFnZVksQT0xMDAqaS9vLEwmJmYmJihoPTEtTWF0aC5hYnMoaSkvbyxZLnN0eWxlLm9wYWNpdHk9aCxlLnNldHRpbmdzLnRvdWNoRm9sbG93QXhpcyYmKEU9MCkpLEkmJihoPTEtTWF0aC5hYnModCkvbCxnLnN0eWxlLm9wYWNpdHk9aCxlLnNldHRpbmdzLnRvdWNoRm9sbG93QXhpcyYmKEE9MCkpLCFmKXJldHVybiB2KGcsXCJ0cmFuc2xhdGUzZChcIi5jb25jYXQoRSxcIiUsIDAsIDApXCIpKTt2KGcsXCJ0cmFuc2xhdGUzZChcIi5jb25jYXQoRSxcIiUsIFwiKS5jb25jYXQoQSxcIiUsIDApXCIpKX19LHRvdWNoRW5kOmZ1bmN0aW9uKCl7aWYocil7aWYocD0hMSxTfHxiKXJldHVybiBDPXcsdm9pZChrPVQpO3ZhciB0PU1hdGguYWJzKHBhcnNlSW50KEEpKSxpPU1hdGguYWJzKHBhcnNlSW50KEUpKTtpZighKHQ+MjkmJmYpKXJldHVybiB0PDI5JiZpPDI1PyhoKFksXCJncmVzZXRcIiksWS5zdHlsZS5vcGFjaXR5PTEsVyhnKSk6dm9pZCAwO2UuY2xvc2UoKX19LG11bHRpcG9pbnRFbmQ6ZnVuY3Rpb24oKXtzZXRUaW1lb3V0KChmdW5jdGlvbigpe2I9ITF9KSw1MCl9LG11bHRpcG9pbnRTdGFydDpmdW5jdGlvbigpe2I9ITAsbT14fHwxfSxwaW5jaDpmdW5jdGlvbihlKXtpZighZnx8cClyZXR1cm4hMTtiPSEwLGYuc2NhbGVYPWYuc2NhbGVZPW0qZS56b29tO3ZhciB0PW0qZS56b29tO2lmKFM9ITAsdDw9MSlyZXR1cm4gUz0hMSx0PTEsaz1udWxsLEM9bnVsbCx3PW51bGwsVD1udWxsLHZvaWQgZi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwiXCIpO3Q+NC41JiYodD00LjUpLGYuc3R5bGUudHJhbnNmb3JtPVwic2NhbGUzZChcIi5jb25jYXQodCxcIiwgXCIpLmNvbmNhdCh0LFwiLCAxKVwiKSx4PXR9LHByZXNzTW92ZTpmdW5jdGlvbihlKXtpZihTJiYhYil7dmFyIHQ9UC5wYWdlWC1PLnBhZ2VYLGk9UC5wYWdlWS1PLnBhZ2VZO0MmJih0Kz1DKSxrJiYoaSs9ayksdz10LFQ9aTt2YXIgbj1cInRyYW5zbGF0ZTNkKFwiLmNvbmNhdCh0LFwicHgsIFwiKS5jb25jYXQoaSxcInB4LCAwKVwiKTt4JiYobis9XCIgc2NhbGUzZChcIi5jb25jYXQoeCxcIiwgXCIpLmNvbmNhdCh4LFwiLCAxKVwiKSksdihmLG4pfX0sc3dpcGU6ZnVuY3Rpb24odCl7aWYoIVMpaWYoYiliPSExO2Vsc2V7aWYoXCJMZWZ0XCI9PXQuZGlyZWN0aW9uKXtpZihlLmluZGV4PT1lLmVsZW1lbnRzLmxlbmd0aC0xKXJldHVybiBXKGcpO2UubmV4dFNsaWRlKCl9aWYoXCJSaWdodFwiPT10LmRpcmVjdGlvbil7aWYoMD09ZS5pbmRleClyZXR1cm4gVyhnKTtlLnByZXZTbGlkZSgpfX19fSk7ZS5ldmVudHMudG91Y2g9cX12YXIgSD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoaSxuKXt2YXIgcz10aGlzLGw9YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOm51bGw7aWYodCh0aGlzLGUpLHRoaXMuaW1nPWksdGhpcy5zbGlkZT1uLHRoaXMub25jbG9zZT1sLHRoaXMuaW1nLnNldFpvb21FdmVudHMpcmV0dXJuITE7dGhpcy5hY3RpdmU9ITEsdGhpcy56b29tZWRJbj0hMSx0aGlzLmRyYWdnaW5nPSExLHRoaXMuY3VycmVudFg9bnVsbCx0aGlzLmN1cnJlbnRZPW51bGwsdGhpcy5pbml0aWFsWD1udWxsLHRoaXMuaW5pdGlhbFk9bnVsbCx0aGlzLnhPZmZzZXQ9MCx0aGlzLnlPZmZzZXQ9MCx0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsKGZ1bmN0aW9uKGUpe3JldHVybiBzLmRyYWdTdGFydChlKX0pLCExKSx0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLChmdW5jdGlvbihlKXtyZXR1cm4gcy5kcmFnRW5kKGUpfSksITEpLHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwoZnVuY3Rpb24oZSl7cmV0dXJuIHMuZHJhZyhlKX0pLCExKSx0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZnVuY3Rpb24oZSl7cmV0dXJuIHMuc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJhZ2dpbmctbmF2XCIpPyhzLnpvb21PdXQoKSwhMSk6cy56b29tZWRJbj92b2lkKHMuem9vbWVkSW4mJiFzLmRyYWdnaW5nJiZzLnpvb21PdXQoKSk6cy56b29tSW4oKX0pLCExKSx0aGlzLmltZy5zZXRab29tRXZlbnRzPSEwfXJldHVybiBuKGUsW3trZXk6XCJ6b29tSW5cIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMud2lkb3dXaWR0aCgpO2lmKCEodGhpcy56b29tZWRJbnx8ZTw9NzY4KSl7dmFyIHQ9dGhpcy5pbWc7aWYodC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0eWxlXCIsdC5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKSksdC5zdHlsZS5tYXhXaWR0aD10Lm5hdHVyYWxXaWR0aCtcInB4XCIsdC5zdHlsZS5tYXhIZWlnaHQ9dC5uYXR1cmFsSGVpZ2h0K1wicHhcIix0Lm5hdHVyYWxXaWR0aD5lKXt2YXIgaT1lLzItdC5uYXR1cmFsV2lkdGgvMjt0aGlzLnNldFRyYW5zbGF0ZSh0aGlzLmltZy5wYXJlbnROb2RlLGksMCl9dGhpcy5zbGlkZS5jbGFzc0xpc3QuYWRkKFwiem9vbWVkXCIpLHRoaXMuem9vbWVkSW49ITB9fX0se2tleTpcInpvb21PdXRcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuaW1nLnBhcmVudE5vZGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIlwiKSx0aGlzLmltZy5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLHRoaXMuaW1nLmdldEF0dHJpYnV0ZShcImRhdGEtc3R5bGVcIikpLHRoaXMuc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcInpvb21lZFwiKSx0aGlzLnpvb21lZEluPSExLHRoaXMuY3VycmVudFg9bnVsbCx0aGlzLmN1cnJlbnRZPW51bGwsdGhpcy5pbml0aWFsWD1udWxsLHRoaXMuaW5pdGlhbFk9bnVsbCx0aGlzLnhPZmZzZXQ9MCx0aGlzLnlPZmZzZXQ9MCx0aGlzLm9uY2xvc2UmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMub25jbG9zZSYmdGhpcy5vbmNsb3NlKCl9fSx7a2V5OlwiZHJhZ1N0YXJ0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuem9vbWVkSW4/KFwidG91Y2hzdGFydFwiPT09ZS50eXBlPyh0aGlzLmluaXRpYWxYPWUudG91Y2hlc1swXS5jbGllbnRYLXRoaXMueE9mZnNldCx0aGlzLmluaXRpYWxZPWUudG91Y2hlc1swXS5jbGllbnRZLXRoaXMueU9mZnNldCk6KHRoaXMuaW5pdGlhbFg9ZS5jbGllbnRYLXRoaXMueE9mZnNldCx0aGlzLmluaXRpYWxZPWUuY2xpZW50WS10aGlzLnlPZmZzZXQpLGUudGFyZ2V0PT09dGhpcy5pbWcmJih0aGlzLmFjdGl2ZT0hMCx0aGlzLmltZy5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dpbmdcIikpKTp0aGlzLmFjdGl2ZT0hMX19LHtrZXk6XCJkcmFnRW5kXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztlLnByZXZlbnREZWZhdWx0KCksdGhpcy5pbml0aWFsWD10aGlzLmN1cnJlbnRYLHRoaXMuaW5pdGlhbFk9dGhpcy5jdXJyZW50WSx0aGlzLmFjdGl2ZT0hMSxzZXRUaW1lb3V0KChmdW5jdGlvbigpe3QuZHJhZ2dpbmc9ITEsdC5pbWcuaXNEcmFnZ2luZz0hMSx0LmltZy5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZ2dpbmdcIil9KSwxMDApfX0se2tleTpcImRyYWdcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmFjdGl2ZSYmKGUucHJldmVudERlZmF1bHQoKSxcInRvdWNobW92ZVwiPT09ZS50eXBlPyh0aGlzLmN1cnJlbnRYPWUudG91Y2hlc1swXS5jbGllbnRYLXRoaXMuaW5pdGlhbFgsdGhpcy5jdXJyZW50WT1lLnRvdWNoZXNbMF0uY2xpZW50WS10aGlzLmluaXRpYWxZKToodGhpcy5jdXJyZW50WD1lLmNsaWVudFgtdGhpcy5pbml0aWFsWCx0aGlzLmN1cnJlbnRZPWUuY2xpZW50WS10aGlzLmluaXRpYWxZKSx0aGlzLnhPZmZzZXQ9dGhpcy5jdXJyZW50WCx0aGlzLnlPZmZzZXQ9dGhpcy5jdXJyZW50WSx0aGlzLmltZy5pc0RyYWdnaW5nPSEwLHRoaXMuZHJhZ2dpbmc9ITAsdGhpcy5zZXRUcmFuc2xhdGUodGhpcy5pbWcsdGhpcy5jdXJyZW50WCx0aGlzLmN1cnJlbnRZKSl9fSx7a2V5Olwib25Nb3ZlXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYodGhpcy56b29tZWRJbil7dmFyIHQ9ZS5jbGllbnRYLXRoaXMuaW1nLm5hdHVyYWxXaWR0aC8yLGk9ZS5jbGllbnRZLXRoaXMuaW1nLm5hdHVyYWxIZWlnaHQvMjt0aGlzLnNldFRyYW5zbGF0ZSh0aGlzLmltZyx0LGkpfX19LHtrZXk6XCJzZXRUcmFuc2xhdGVcIix2YWx1ZTpmdW5jdGlvbihlLHQsaSl7ZS5zdHlsZS50cmFuc2Zvcm09XCJ0cmFuc2xhdGUzZChcIit0K1wicHgsIFwiK2krXCJweCwgMClcIn19LHtrZXk6XCJ3aWRvd1dpZHRoXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gd2luZG93LmlubmVyV2lkdGh8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aHx8ZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aH19XSksZX0oKSxWPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe3ZhciBpPXRoaXMsbj1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e307dCh0aGlzLGUpO3ZhciBzPW4uZHJhZ0VsLGw9bi50b2xlcmFuY2VYLG89dm9pZCAwPT09bD80MDpsLHI9bi50b2xlcmFuY2VZLGE9dm9pZCAwPT09cj82NTpyLGg9bi5zbGlkZSxkPXZvaWQgMD09PWg/bnVsbDpoLGM9bi5pbnN0YW5jZSx1PXZvaWQgMD09PWM/bnVsbDpjO3RoaXMuZWw9cyx0aGlzLmFjdGl2ZT0hMSx0aGlzLmRyYWdnaW5nPSExLHRoaXMuY3VycmVudFg9bnVsbCx0aGlzLmN1cnJlbnRZPW51bGwsdGhpcy5pbml0aWFsWD1udWxsLHRoaXMuaW5pdGlhbFk9bnVsbCx0aGlzLnhPZmZzZXQ9MCx0aGlzLnlPZmZzZXQ9MCx0aGlzLmRpcmVjdGlvbj1udWxsLHRoaXMubGFzdERpcmVjdGlvbj1udWxsLHRoaXMudG9sZXJhbmNlWD1vLHRoaXMudG9sZXJhbmNlWT1hLHRoaXMudG9sZXJhbmNlUmVhY2hlZD0hMSx0aGlzLmRyYWdDb250YWluZXI9dGhpcy5lbCx0aGlzLnNsaWRlPWQsdGhpcy5pbnN0YW5jZT11LHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLChmdW5jdGlvbihlKXtyZXR1cm4gaS5kcmFnU3RhcnQoZSl9KSwhMSksdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLChmdW5jdGlvbihlKXtyZXR1cm4gaS5kcmFnRW5kKGUpfSksITEpLHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLChmdW5jdGlvbihlKXtyZXR1cm4gaS5kcmFnKGUpfSksITEpfXJldHVybiBuKGUsW3trZXk6XCJkcmFnU3RhcnRcIix2YWx1ZTpmdW5jdGlvbihlKXtpZih0aGlzLnNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhcInpvb21lZFwiKSl0aGlzLmFjdGl2ZT0hMTtlbHNle1widG91Y2hzdGFydFwiPT09ZS50eXBlPyh0aGlzLmluaXRpYWxYPWUudG91Y2hlc1swXS5jbGllbnRYLXRoaXMueE9mZnNldCx0aGlzLmluaXRpYWxZPWUudG91Y2hlc1swXS5jbGllbnRZLXRoaXMueU9mZnNldCk6KHRoaXMuaW5pdGlhbFg9ZS5jbGllbnRYLXRoaXMueE9mZnNldCx0aGlzLmluaXRpYWxZPWUuY2xpZW50WS10aGlzLnlPZmZzZXQpO3ZhciB0PWUudGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7ZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm9kcmFnXCIpfHx1KGUudGFyZ2V0LFwiLm5vZHJhZ1wiKXx8LTEhPT1bXCJpbnB1dFwiLFwic2VsZWN0XCIsXCJ0ZXh0YXJlYVwiLFwiYnV0dG9uXCIsXCJhXCJdLmluZGV4T2YodCk/dGhpcy5hY3RpdmU9ITE6KGUucHJldmVudERlZmF1bHQoKSwoZS50YXJnZXQ9PT10aGlzLmVsfHxcImltZ1wiIT09dCYmdShlLnRhcmdldCxcIi5nc2xpZGUtaW5saW5lXCIpKSYmKHRoaXMuYWN0aXZlPSEwLHRoaXMuZWwuY2xhc3NMaXN0LmFkZChcImRyYWdnaW5nXCIpLHRoaXMuZHJhZ0NvbnRhaW5lcj11KGUudGFyZ2V0LFwiLmdpbm5lci1jb250YWluZXJcIikpKX19fSx7a2V5OlwiZHJhZ0VuZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7ZSYmZS5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuaW5pdGlhbFg9MCx0aGlzLmluaXRpYWxZPTAsdGhpcy5jdXJyZW50WD1udWxsLHRoaXMuY3VycmVudFk9bnVsbCx0aGlzLmluaXRpYWxYPW51bGwsdGhpcy5pbml0aWFsWT1udWxsLHRoaXMueE9mZnNldD0wLHRoaXMueU9mZnNldD0wLHRoaXMuYWN0aXZlPSExLHRoaXMuZG9TbGlkZUNoYW5nZSYmKHRoaXMuaW5zdGFuY2UucHJldmVudE91dHNpZGVDbGljaz0hMCxcInJpZ2h0XCI9PXRoaXMuZG9TbGlkZUNoYW5nZSYmdGhpcy5pbnN0YW5jZS5wcmV2U2xpZGUoKSxcImxlZnRcIj09dGhpcy5kb1NsaWRlQ2hhbmdlJiZ0aGlzLmluc3RhbmNlLm5leHRTbGlkZSgpKSx0aGlzLmRvU2xpZGVDbG9zZSYmdGhpcy5pbnN0YW5jZS5jbG9zZSgpLHRoaXMudG9sZXJhbmNlUmVhY2hlZHx8dGhpcy5zZXRUcmFuc2xhdGUodGhpcy5kcmFnQ29udGFpbmVyLDAsMCwhMCksc2V0VGltZW91dCgoZnVuY3Rpb24oKXt0Lmluc3RhbmNlLnByZXZlbnRPdXRzaWRlQ2xpY2s9ITEsdC50b2xlcmFuY2VSZWFjaGVkPSExLHQubGFzdERpcmVjdGlvbj1udWxsLHQuZHJhZ2dpbmc9ITEsdC5lbC5pc0RyYWdnaW5nPSExLHQuZWwuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nXCIpLHQuc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImRyYWdnaW5nLW5hdlwiKSx0LmRyYWdDb250YWluZXIuc3R5bGUudHJhbnNmb3JtPVwiXCIsdC5kcmFnQ29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb249XCJcIn0pLDEwMCl9fSx7a2V5OlwiZHJhZ1wiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKHRoaXMuYWN0aXZlKXtlLnByZXZlbnREZWZhdWx0KCksdGhpcy5zbGlkZS5jbGFzc0xpc3QuYWRkKFwiZHJhZ2dpbmctbmF2XCIpLFwidG91Y2htb3ZlXCI9PT1lLnR5cGU/KHRoaXMuY3VycmVudFg9ZS50b3VjaGVzWzBdLmNsaWVudFgtdGhpcy5pbml0aWFsWCx0aGlzLmN1cnJlbnRZPWUudG91Y2hlc1swXS5jbGllbnRZLXRoaXMuaW5pdGlhbFkpOih0aGlzLmN1cnJlbnRYPWUuY2xpZW50WC10aGlzLmluaXRpYWxYLHRoaXMuY3VycmVudFk9ZS5jbGllbnRZLXRoaXMuaW5pdGlhbFkpLHRoaXMueE9mZnNldD10aGlzLmN1cnJlbnRYLHRoaXMueU9mZnNldD10aGlzLmN1cnJlbnRZLHRoaXMuZWwuaXNEcmFnZ2luZz0hMCx0aGlzLmRyYWdnaW5nPSEwLHRoaXMuZG9TbGlkZUNoYW5nZT0hMSx0aGlzLmRvU2xpZGVDbG9zZT0hMTt2YXIgdD1NYXRoLmFicyh0aGlzLmN1cnJlbnRYKSxpPU1hdGguYWJzKHRoaXMuY3VycmVudFkpO2lmKHQ+MCYmdD49TWF0aC5hYnModGhpcy5jdXJyZW50WSkmJighdGhpcy5sYXN0RGlyZWN0aW9ufHxcInhcIj09dGhpcy5sYXN0RGlyZWN0aW9uKSl7dGhpcy55T2Zmc2V0PTAsdGhpcy5sYXN0RGlyZWN0aW9uPVwieFwiLHRoaXMuc2V0VHJhbnNsYXRlKHRoaXMuZHJhZ0NvbnRhaW5lcix0aGlzLmN1cnJlbnRYLDApO3ZhciBuPXRoaXMuc2hvdWxkQ2hhbmdlKCk7aWYoIXRoaXMuaW5zdGFuY2Uuc2V0dGluZ3MuZHJhZ0F1dG9TbmFwJiZuJiYodGhpcy5kb1NsaWRlQ2hhbmdlPW4pLHRoaXMuaW5zdGFuY2Uuc2V0dGluZ3MuZHJhZ0F1dG9TbmFwJiZuKXJldHVybiB0aGlzLmluc3RhbmNlLnByZXZlbnRPdXRzaWRlQ2xpY2s9ITAsdGhpcy50b2xlcmFuY2VSZWFjaGVkPSEwLHRoaXMuYWN0aXZlPSExLHRoaXMuaW5zdGFuY2UucHJldmVudE91dHNpZGVDbGljaz0hMCx0aGlzLmRyYWdFbmQobnVsbCksXCJyaWdodFwiPT1uJiZ0aGlzLmluc3RhbmNlLnByZXZTbGlkZSgpLHZvaWQoXCJsZWZ0XCI9PW4mJnRoaXMuaW5zdGFuY2UubmV4dFNsaWRlKCkpfWlmKHRoaXMudG9sZXJhbmNlWT4wJiZpPjAmJmk+PXQmJighdGhpcy5sYXN0RGlyZWN0aW9ufHxcInlcIj09dGhpcy5sYXN0RGlyZWN0aW9uKSl7dGhpcy54T2Zmc2V0PTAsdGhpcy5sYXN0RGlyZWN0aW9uPVwieVwiLHRoaXMuc2V0VHJhbnNsYXRlKHRoaXMuZHJhZ0NvbnRhaW5lciwwLHRoaXMuY3VycmVudFkpO3ZhciBzPXRoaXMuc2hvdWxkQ2xvc2UoKTtyZXR1cm4hdGhpcy5pbnN0YW5jZS5zZXR0aW5ncy5kcmFnQXV0b1NuYXAmJnMmJih0aGlzLmRvU2xpZGVDbG9zZT0hMCksdm9pZCh0aGlzLmluc3RhbmNlLnNldHRpbmdzLmRyYWdBdXRvU25hcCYmcyYmdGhpcy5pbnN0YW5jZS5jbG9zZSgpKX19fX0se2tleTpcInNob3VsZENoYW5nZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9ITE7aWYoTWF0aC5hYnModGhpcy5jdXJyZW50WCk+PXRoaXMudG9sZXJhbmNlWCl7dmFyIHQ9dGhpcy5jdXJyZW50WD4wP1wicmlnaHRcIjpcImxlZnRcIjsoXCJsZWZ0XCI9PXQmJnRoaXMuc2xpZGUhPT10aGlzLnNsaWRlLnBhcmVudE5vZGUubGFzdENoaWxkfHxcInJpZ2h0XCI9PXQmJnRoaXMuc2xpZGUhPT10aGlzLnNsaWRlLnBhcmVudE5vZGUuZmlyc3RDaGlsZCkmJihlPXQpfXJldHVybiBlfX0se2tleTpcInNob3VsZENsb3NlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT0hMTtyZXR1cm4gTWF0aC5hYnModGhpcy5jdXJyZW50WSk+PXRoaXMudG9sZXJhbmNlWSYmKGU9ITApLGV9fSx7a2V5Olwic2V0VHJhbnNsYXRlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LGkpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MyYmdm9pZCAwIT09YXJndW1lbnRzWzNdJiZhcmd1bWVudHNbM107ZS5zdHlsZS50cmFuc2l0aW9uPW4/XCJhbGwgLjJzIGVhc2VcIjpcIlwiLGUuc3R5bGUudHJhbnNmb3JtPVwidHJhbnNsYXRlM2QoXCIuY29uY2F0KHQsXCJweCwgXCIpLmNvbmNhdChpLFwicHgsIDApXCIpfX1dKSxlfSgpO2Z1bmN0aW9uIGooZSx0LGksbil7dmFyIHM9ZS5xdWVyeVNlbGVjdG9yKFwiLmdzbGlkZS1tZWRpYVwiKSxsPW5ldyBJbWFnZSxvPVwiZ1NsaWRlVGl0bGVfXCIraSxyPVwiZ1NsaWRlRGVzY19cIitpO2wuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwoZnVuY3Rpb24oKXtUKG4pJiZuKCl9KSwhMSksbC5zcmM9dC5ocmVmLGwuYWx0PVwiXCIsXCJcIiE9PXQudGl0bGUmJmwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbGxlZGJ5XCIsbyksXCJcIiE9PXQuZGVzY3JpcHRpb24mJmwuc2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiLHIpLHQuaGFzT3duUHJvcGVydHkoXCJfaGFzQ3VzdG9tV2lkdGhcIikmJnQuX2hhc0N1c3RvbVdpZHRoJiYobC5zdHlsZS53aWR0aD10LndpZHRoKSx0Lmhhc093blByb3BlcnR5KFwiX2hhc0N1c3RvbUhlaWdodFwiKSYmdC5faGFzQ3VzdG9tSGVpZ2h0JiYobC5zdHlsZS5oZWlnaHQ9dC5oZWlnaHQpLHMuaW5zZXJ0QmVmb3JlKGwscy5maXJzdENoaWxkKX1mdW5jdGlvbiBGKGUsdCxpLG4pe3ZhciBzPXRoaXMsbD1lLnF1ZXJ5U2VsZWN0b3IoXCIuZ2lubmVyLWNvbnRhaW5lclwiKSxvPVwiZ3ZpZGVvXCIraSxyPWUucXVlcnlTZWxlY3RvcihcIi5nc2xpZGUtbWVkaWFcIiksYT10aGlzLmdldEFsbFBsYXllcnMoKTtoKGwsXCJndmlkZW8tY29udGFpbmVyXCIpLHIuaW5zZXJ0QmVmb3JlKG0oJzxkaXYgY2xhc3M9XCJndmlkZW8td3JhcHBlclwiPjwvZGl2PicpLHIuZmlyc3RDaGlsZCk7dmFyIGQ9ZS5xdWVyeVNlbGVjdG9yKFwiLmd2aWRlby13cmFwcGVyXCIpO1ModGhpcy5zZXR0aW5ncy5wbHlyLmNzcyxcIlBseXJcIik7dmFyIGM9dC5ocmVmLHU9bG9jYXRpb24ucHJvdG9jb2wucmVwbGFjZShcIjpcIixcIlwiKSxnPVwiXCIsdj1cIlwiLGY9ITE7XCJmaWxlXCI9PXUmJih1PVwiaHR0cFwiKSxyLnN0eWxlLm1heFdpZHRoPXQud2lkdGgsUyh0aGlzLnNldHRpbmdzLnBseXIuanMsXCJQbHlyXCIsKGZ1bmN0aW9uKCl7aWYoYy5tYXRjaCgvdmltZW9cXC5jb21cXC8oWzAtOV0qKS8pKXt2YXIgbD0vdmltZW8uKlxcLyhcXGQrKS9pLmV4ZWMoYyk7Zz1cInZpbWVvXCIsdj1sWzFdfWlmKGMubWF0Y2goLyh5b3V0dWJlXFwuY29tfHlvdXR1YmUtbm9jb29raWVcXC5jb20pXFwvd2F0Y2hcXD92PShbYS16QS1aMC05XFwtX10rKS8pfHxjLm1hdGNoKC95b3V0dVxcLmJlXFwvKFthLXpBLVowLTlcXC1fXSspLyl8fGMubWF0Y2goLyh5b3V0dWJlXFwuY29tfHlvdXR1YmUtbm9jb29raWVcXC5jb20pXFwvZW1iZWRcXC8oW2EtekEtWjAtOVxcLV9dKykvKSl7dmFyIHI9ZnVuY3Rpb24oZSl7dmFyIHQ9XCJcIjt0PXZvaWQgMCE9PShlPWUucmVwbGFjZSgvKD58PCkvZ2ksXCJcIikuc3BsaXQoLyh2aVxcL3x2PXxcXC92XFwvfHlvdXR1XFwuYmVcXC98XFwvZW1iZWRcXC8pLykpWzJdPyh0PWVbMl0uc3BsaXQoL1teMC05YS16X1xcLV0vaSkpWzBdOmU7cmV0dXJuIHR9KGMpO2c9XCJ5b3V0dWJlXCIsdj1yfWlmKG51bGwhPT1jLm1hdGNoKC9cXC4obXA0fG9nZ3x3ZWJtfG1vdikkLykpe2c9XCJsb2NhbFwiO3ZhciB1PSc8dmlkZW8gaWQ9XCInK28rJ1wiICc7dSs9J3N0eWxlPVwiYmFja2dyb3VuZDojMDAwOyBtYXgtd2lkdGg6ICcuY29uY2F0KHQud2lkdGgsJztcIiAnKSx1Kz0ncHJlbG9hZD1cIm1ldGFkYXRhXCIgJyx1Kz0neC13ZWJraXQtYWlycGxheT1cImFsbG93XCIgJyx1Kz0nd2Via2l0LXBsYXlzaW5saW5lPVwiXCIgJyx1Kz1cImNvbnRyb2xzIFwiLHUrPSdjbGFzcz1cImd2aWRlby1sb2NhbFwiPic7dmFyIHA9Yy50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiLlwiKS5wb3AoKSx5PXttcDQ6XCJcIixvZ2c6XCJcIix3ZWJtOlwiXCJ9O2Zvcih2YXIgeCBpbiB5W3A9XCJtb3ZcIj09cD9cIm1wNFwiOnBdPWMseSlpZih5Lmhhc093blByb3BlcnR5KHgpKXt2YXIgUz15W3hdO3QuaGFzT3duUHJvcGVydHkoeCkmJihTPXRbeF0pLFwiXCIhPT1TJiYodSs9Jzxzb3VyY2Ugc3JjPVwiJy5jb25jYXQoUywnXCIgdHlwZT1cInZpZGVvLycpLmNvbmNhdCh4LCdcIj4nKSl9Zj1tKHUrPVwiPC92aWRlbz5cIil9dmFyIHc9Znx8bSgnPGRpdiBpZD1cIicuY29uY2F0KG8sJ1wiIGRhdGEtcGx5ci1wcm92aWRlcj1cIicpLmNvbmNhdChnLCdcIiBkYXRhLXBseXItZW1iZWQtaWQ9XCInKS5jb25jYXQodiwnXCI+PC9kaXY+JykpO2goZCxcIlwiLmNvbmNhdChnLFwiLXZpZGVvIGd2aWRlb1wiKSksZC5hcHBlbmRDaGlsZCh3KSxkLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIixvKSxkLnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIixpKTt2YXIgQz1PKHMuc2V0dGluZ3MucGx5cixcImNvbmZpZ1wiKT9zLnNldHRpbmdzLnBseXIuY29uZmlnOnt9LGs9bmV3IFBseXIoXCIjXCIrbyxDKTtrLm9uKFwicmVhZHlcIiwoZnVuY3Rpb24oZSl7dmFyIHQ9ZS5kZXRhaWwucGx5cjthW29dPXQsVChuKSYmbigpfSkpLGIoKGZ1bmN0aW9uKCl7cmV0dXJuIGUucXVlcnlTZWxlY3RvcihcImlmcmFtZVwiKSYmXCJ0cnVlXCI9PWUucXVlcnlTZWxlY3RvcihcImlmcmFtZVwiKS5kYXRhc2V0LnJlYWR5fSksKGZ1bmN0aW9uKCl7cy5yZXNpemUoZSl9KSksay5vbihcImVudGVyZnVsbHNjcmVlblwiLFIpLGsub24oXCJleGl0ZnVsbHNjcmVlblwiLFIpfSkpfWZ1bmN0aW9uIFIoZSl7dmFyIHQ9dShlLnRhcmdldCxcIi5nc2xpZGUtbWVkaWFcIik7XCJlbnRlcmZ1bGxzY3JlZW5cIj09ZS50eXBlJiZoKHQsXCJmdWxsc2NyZWVuXCIpLFwiZXhpdGZ1bGxzY3JlZW5cIj09ZS50eXBlJiZkKHQsXCJmdWxsc2NyZWVuXCIpfWZ1bmN0aW9uIEcoZSx0LGksbil7dmFyIHMsbD10aGlzLG89ZS5xdWVyeVNlbGVjdG9yKFwiLmdzbGlkZS1tZWRpYVwiKSxyPSEoIU8odCxcImhyZWZcIil8fCF0LmhyZWYpJiZ0LmhyZWYuc3BsaXQoXCIjXCIpLnBvcCgpLnRyaW0oKSxkPSEoIU8odCxcImNvbnRlbnRcIil8fCF0LmNvbnRlbnQpJiZ0LmNvbnRlbnQ7aWYoZCYmKEMoZCkmJihzPW0oJzxkaXYgY2xhc3M9XCJnaW5saW5lZC1jb250ZW50XCI+Jy5jb25jYXQoZCxcIjwvZGl2PlwiKSkpLGsoZCkpKXtcIm5vbmVcIj09ZC5zdHlsZS5kaXNwbGF5JiYoZC5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIik7dmFyIGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjLmNsYXNzTmFtZT1cImdpbmxpbmVkLWNvbnRlbnRcIixjLmFwcGVuZENoaWxkKGQpLHM9Y31pZihyKXt2YXIgdT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChyKTtpZighdSlyZXR1cm4hMTt2YXIgZz11LmNsb25lTm9kZSghMCk7Zy5zdHlsZS5oZWlnaHQ9dC5oZWlnaHQsZy5zdHlsZS5tYXhXaWR0aD10LndpZHRoLGgoZyxcImdpbmxpbmVkLWNvbnRlbnRcIikscz1nfWlmKCFzKXJldHVybiBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGFwcGVuZCBpbmxpbmUgc2xpZGUgY29udGVudFwiLHQpLCExO28uc3R5bGUuaGVpZ2h0PXQuaGVpZ2h0LG8uc3R5bGUud2lkdGg9dC53aWR0aCxvLmFwcGVuZENoaWxkKHMpLHRoaXMuZXZlbnRzW1wiaW5saW5lY2xvc2VcIityXT1hKFwiY2xpY2tcIix7b25FbGVtZW50Om8ucXVlcnlTZWxlY3RvckFsbChcIi5ndHJpZ2dlci1jbG9zZVwiKSx3aXRoQ2FsbGJhY2s6ZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpLGwuY2xvc2UoKX19KSxUKG4pJiZuKCl9ZnVuY3Rpb24gWihlLHQsaSxuKXt2YXIgcz1lLnF1ZXJ5U2VsZWN0b3IoXCIuZ3NsaWRlLW1lZGlhXCIpLGw9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS51cmwsaT1lLmFsbG93LG49ZS5jYWxsYmFjayxzPWUuYXBwZW5kVG8sbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO3JldHVybiBsLmNsYXNzTmFtZT1cInZpbWVvLXZpZGVvIGd2aWRlb1wiLGwuc3JjPXQsbC5zdHlsZS53aWR0aD1cIjEwMCVcIixsLnN0eWxlLmhlaWdodD1cIjEwMCVcIixpJiZsLnNldEF0dHJpYnV0ZShcImFsbG93XCIsaSksbC5vbmxvYWQ9ZnVuY3Rpb24oKXtoKGwsXCJub2RlLXJlYWR5XCIpLFQobikmJm4oKX0scyYmcy5hcHBlbmRDaGlsZChsKSxsfSh7dXJsOnQuaHJlZixjYWxsYmFjazpufSk7cy5wYXJlbnROb2RlLnN0eWxlLm1heFdpZHRoPXQud2lkdGgscy5wYXJlbnROb2RlLnN0eWxlLmhlaWdodD10LmhlaWdodCxzLmFwcGVuZENoaWxkKGwpfXZhciAkPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe3ZhciBpPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fTt0KHRoaXMsZSksdGhpcy5kZWZhdWx0cz17aHJlZjpcIlwiLHRpdGxlOlwiXCIsdHlwZTpcIlwiLGRlc2NyaXB0aW9uOlwiXCIsZGVzY1Bvc2l0aW9uOlwiYm90dG9tXCIsZWZmZWN0OlwiXCIsd2lkdGg6XCJcIixoZWlnaHQ6XCJcIixjb250ZW50OiExLHpvb21hYmxlOiEwLGRyYWdnYWJsZTohMH0sTChpKSYmKHRoaXMuZGVmYXVsdHM9bCh0aGlzLmRlZmF1bHRzLGkpKX1yZXR1cm4gbihlLFt7a2V5Olwic291cmNlVHlwZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PWU7aWYobnVsbCE9PShlPWUudG9Mb3dlckNhc2UoKSkubWF0Y2goL1xcLihqcGVnfGpwZ3xqcGV8Z2lmfHBuZ3xhcG58d2VicHxzdmcpJC8pKXJldHVyblwiaW1hZ2VcIjtpZihlLm1hdGNoKC8oeW91dHViZVxcLmNvbXx5b3V0dWJlLW5vY29va2llXFwuY29tKVxcL3dhdGNoXFw/dj0oW2EtekEtWjAtOVxcLV9dKykvKXx8ZS5tYXRjaCgveW91dHVcXC5iZVxcLyhbYS16QS1aMC05XFwtX10rKS8pfHxlLm1hdGNoKC8oeW91dHViZVxcLmNvbXx5b3V0dWJlLW5vY29va2llXFwuY29tKVxcL2VtYmVkXFwvKFthLXpBLVowLTlcXC1fXSspLykpcmV0dXJuXCJ2aWRlb1wiO2lmKGUubWF0Y2goL3ZpbWVvXFwuY29tXFwvKFswLTldKikvKSlyZXR1cm5cInZpZGVvXCI7aWYobnVsbCE9PWUubWF0Y2goL1xcLihtcDR8b2dnfHdlYm18bW92KSQvKSlyZXR1cm5cInZpZGVvXCI7aWYobnVsbCE9PWUubWF0Y2goL1xcLihtcDN8d2F2fHdtYXxhYWN8b2dnKSQvKSlyZXR1cm5cImF1ZGlvXCI7aWYoZS5pbmRleE9mKFwiI1wiKT4tMSYmXCJcIiE9PXQuc3BsaXQoXCIjXCIpLnBvcCgpLnRyaW0oKSlyZXR1cm5cImlubGluZVwiO3JldHVybiBlLmluZGV4T2YoXCJnb2FqYXg9dHJ1ZVwiKT4tMT9cImFqYXhcIjpcImV4dGVybmFsXCJ9fSx7a2V5OlwicGFyc2VDb25maWdcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBpPXRoaXMsbj1sKHtkZXNjUG9zaXRpb246dC5kZXNjUG9zaXRpb259LHRoaXMuZGVmYXVsdHMpO2lmKEwoZSkmJiFrKGUpKXtPKGUsXCJ0eXBlXCIpfHwoTyhlLFwiY29udGVudFwiKSYmZS5jb250ZW50P2UudHlwZT1cImlubGluZVwiOk8oZSxcImhyZWZcIikmJihlLnR5cGU9dGhpcy5zb3VyY2VUeXBlKGUuaHJlZikpKTt2YXIgcz1sKG4sZSk7cmV0dXJuIHRoaXMuc2V0U2l6ZShzLHQpLHN9dmFyIHI9XCJcIixhPWUuZ2V0QXR0cmlidXRlKFwiZGF0YS1nbGlnaHRib3hcIiksaD1lLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7aWYoXCJhXCI9PT1oJiYocj1lLmhyZWYpLFwiaW1nXCI9PT1oJiYocj1lLnNyYyksbi5ocmVmPXIsbyhuLChmdW5jdGlvbihzLGwpe08odCxsKSYmXCJ3aWR0aFwiIT09bCYmKG5bbF09dFtsXSk7dmFyIG89ZS5kYXRhc2V0W2xdO0kobyl8fChuW2xdPWkuc2FuaXRpemVWYWx1ZShvKSl9KSksbi5jb250ZW50JiYobi50eXBlPVwiaW5saW5lXCIpLCFuLnR5cGUmJnImJihuLnR5cGU9dGhpcy5zb3VyY2VUeXBlKHIpKSxJKGEpKXtpZighbi50aXRsZSYmXCJhXCI9PWgpe3ZhciBkPWUudGl0bGU7SShkKXx8XCJcIj09PWR8fChuLnRpdGxlPWQpfWlmKCFuLnRpdGxlJiZcImltZ1wiPT1oKXt2YXIgYz1lLmFsdDtJKGMpfHxcIlwiPT09Y3x8KG4udGl0bGU9Yyl9fWVsc2V7dmFyIHU9W107byhuLChmdW5jdGlvbihlLHQpe3UucHVzaChcIjtcXFxccz9cIit0KX0pKSx1PXUuam9pbihcIlxcXFxzPzp8XCIpLFwiXCIhPT1hLnRyaW0oKSYmbyhuLChmdW5jdGlvbihlLHQpe3ZhciBzPWEsbD1uZXcgUmVnRXhwKFwicz9cIit0K1wicz86cz8oLio/KShcIit1K1wicz86fCQpXCIpLG89cy5tYXRjaChsKTtpZihvJiZvLmxlbmd0aCYmb1sxXSl7dmFyIHI9b1sxXS50cmltKCkucmVwbGFjZSgvO1xccyokLyxcIlwiKTtuW3RdPWkuc2FuaXRpemVWYWx1ZShyKX19KSl9aWYobi5kZXNjcmlwdGlvbiYmXCIuXCI9PT1uLmRlc2NyaXB0aW9uLnN1YnN0cmluZygwLDEpKXt2YXIgZzt0cnl7Zz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG4uZGVzY3JpcHRpb24pLmlubmVySFRNTH1jYXRjaChlKXtpZighKGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24pKXRocm93IGV9ZyYmKG4uZGVzY3JpcHRpb249Zyl9aWYoIW4uZGVzY3JpcHRpb24pe3ZhciB2PWUucXVlcnlTZWxlY3RvcihcIi5nbGlnaHRib3gtZGVzY1wiKTt2JiYobi5kZXNjcmlwdGlvbj12LmlubmVySFRNTCl9cmV0dXJuIHRoaXMuc2V0U2l6ZShuLHQsZSksdGhpcy5zbGlkZUNvbmZpZz1uLG59fSx7a2V5Olwic2V0U2l6ZVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIGk9YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOm51bGwsbj1cInZpZGVvXCI9PWUudHlwZT90aGlzLmNoZWNrU2l6ZSh0LnZpZGVvc1dpZHRoKTp0aGlzLmNoZWNrU2l6ZSh0LndpZHRoKSxzPXRoaXMuY2hlY2tTaXplKHQuaGVpZ2h0KTtyZXR1cm4gZS53aWR0aD1PKGUsXCJ3aWR0aFwiKSYmXCJcIiE9PWUud2lkdGg/dGhpcy5jaGVja1NpemUoZS53aWR0aCk6bixlLmhlaWdodD1PKGUsXCJoZWlnaHRcIikmJlwiXCIhPT1lLmhlaWdodD90aGlzLmNoZWNrU2l6ZShlLmhlaWdodCk6cyxpJiZcImltYWdlXCI9PWUudHlwZSYmKGUuX2hhc0N1c3RvbVdpZHRoPSEhaS5kYXRhc2V0LndpZHRoLGUuX2hhc0N1c3RvbUhlaWdodD0hIWkuZGF0YXNldC5oZWlnaHQpLGV9fSx7a2V5OlwiY2hlY2tTaXplXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIE0oZSk/XCJcIi5jb25jYXQoZSxcInB4XCIpOmV9fSx7a2V5Olwic2FuaXRpemVWYWx1ZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVyblwidHJ1ZVwiIT09ZSYmXCJmYWxzZVwiIT09ZT9lOlwidHJ1ZVwiPT09ZX19XSksZX0oKSxVPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShpLG4scyl7dCh0aGlzLGUpLHRoaXMuZWxlbWVudD1pLHRoaXMuaW5zdGFuY2U9bix0aGlzLmluZGV4PXN9cmV0dXJuIG4oZSxbe2tleTpcInNldENvbnRlbnRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06bnVsbCxpPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07aWYoYyh0LFwibG9hZGVkXCIpKXJldHVybiExO3ZhciBuPXRoaXMuaW5zdGFuY2Uuc2V0dGluZ3Mscz10aGlzLnNsaWRlQ29uZmlnLGw9dygpO1Qobi5iZWZvcmVTbGlkZUxvYWQpJiZuLmJlZm9yZVNsaWRlTG9hZCh7aW5kZXg6dGhpcy5pbmRleCxzbGlkZTp0LHBsYXllcjohMX0pO3ZhciBvPXMudHlwZSxyPXMuZGVzY1Bvc2l0aW9uLGE9dC5xdWVyeVNlbGVjdG9yKFwiLmdzbGlkZS1tZWRpYVwiKSxkPXQucXVlcnlTZWxlY3RvcihcIi5nc2xpZGUtdGl0bGVcIiksdT10LnF1ZXJ5U2VsZWN0b3IoXCIuZ3NsaWRlLWRlc2NcIiksZz10LnF1ZXJ5U2VsZWN0b3IoXCIuZ2Rlc2MtaW5uZXJcIiksdj1pLGY9XCJnU2xpZGVUaXRsZV9cIit0aGlzLmluZGV4LHA9XCJnU2xpZGVEZXNjX1wiK3RoaXMuaW5kZXg7aWYoVChuLmFmdGVyU2xpZGVMb2FkKSYmKHY9ZnVuY3Rpb24oKXtUKGkpJiZpKCksbi5hZnRlclNsaWRlTG9hZCh7aW5kZXg6ZS5pbmRleCxzbGlkZTp0LHBsYXllcjplLmluc3RhbmNlLmdldFNsaWRlUGxheWVySW5zdGFuY2UoZS5pbmRleCl9KX0pLFwiXCI9PXMudGl0bGUmJlwiXCI9PXMuZGVzY3JpcHRpb24/ZyYmZy5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZy5wYXJlbnROb2RlKTooZCYmXCJcIiE9PXMudGl0bGU/KGQuaWQ9ZixkLmlubmVySFRNTD1zLnRpdGxlKTpkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZCksdSYmXCJcIiE9PXMuZGVzY3JpcHRpb24/KHUuaWQ9cCxsJiZuLm1vcmVMZW5ndGg+MD8ocy5zbWFsbERlc2NyaXB0aW9uPXRoaXMuc2xpZGVTaG9ydERlc2Mocy5kZXNjcmlwdGlvbixuLm1vcmVMZW5ndGgsbi5tb3JlVGV4dCksdS5pbm5lckhUTUw9cy5zbWFsbERlc2NyaXB0aW9uLHRoaXMuZGVzY3JpcHRpb25FdmVudHModSxzKSk6dS5pbm5lckhUTUw9cy5kZXNjcmlwdGlvbik6dS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHUpLGgoYS5wYXJlbnROb2RlLFwiZGVzYy1cIi5jb25jYXQocikpLGgoZy5wYXJlbnROb2RlLFwiZGVzY3JpcHRpb24tXCIuY29uY2F0KHIpKSksaChhLFwiZ3NsaWRlLVwiLmNvbmNhdChvKSksaCh0LFwibG9hZGVkXCIpLFwidmlkZW9cIiE9PW8pe2lmKFwiZXh0ZXJuYWxcIiE9PW8pcmV0dXJuXCJpbmxpbmVcIj09PW8/KEcuYXBwbHkodGhpcy5pbnN0YW5jZSxbdCxzLHRoaXMuaW5kZXgsdl0pLHZvaWQobi5kcmFnZ2FibGUmJm5ldyBWKHtkcmFnRWw6dC5xdWVyeVNlbGVjdG9yKFwiLmdzbGlkZS1pbmxpbmVcIiksdG9sZXJhbmNlWDpuLmRyYWdUb2xlcmFuY2VYLHRvbGVyYW5jZVk6bi5kcmFnVG9sZXJhbmNlWSxzbGlkZTp0LGluc3RhbmNlOnRoaXMuaW5zdGFuY2V9KSkpOnZvaWQoXCJpbWFnZVwiIT09bz9UKHYpJiZ2KCk6aih0LHMsdGhpcy5pbmRleCwoZnVuY3Rpb24oKXt2YXIgaT10LnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7bi5kcmFnZ2FibGUmJm5ldyBWKHtkcmFnRWw6aSx0b2xlcmFuY2VYOm4uZHJhZ1RvbGVyYW5jZVgsdG9sZXJhbmNlWTpuLmRyYWdUb2xlcmFuY2VZLHNsaWRlOnQsaW5zdGFuY2U6ZS5pbnN0YW5jZX0pLHMuem9vbWFibGUmJmkubmF0dXJhbFdpZHRoPmkub2Zmc2V0V2lkdGgmJihoKGksXCJ6b29tYWJsZVwiKSxuZXcgSChpLHQsKGZ1bmN0aW9uKCl7ZS5pbnN0YW5jZS5yZXNpemUoKX0pKSksVCh2KSYmdigpfSkpKTtaLmFwcGx5KHRoaXMsW3Qscyx0aGlzLmluZGV4LHZdKX1lbHNlIEYuYXBwbHkodGhpcy5pbnN0YW5jZSxbdCxzLHRoaXMuaW5kZXgsdl0pfX0se2tleTpcInNsaWRlU2hvcnREZXNjXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOjUwLGk9YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXSxuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7bi5pbm5lckhUTUw9ZTt2YXIgcz1uLmlubmVyVGV4dCxsPWk7aWYoKGU9cy50cmltKCkpLmxlbmd0aDw9dClyZXR1cm4gZTt2YXIgbz1lLnN1YnN0cigwLHQtMSk7cmV0dXJuIGw/KG49bnVsbCxvKycuLi4gPGEgaHJlZj1cIiNcIiBjbGFzcz1cImRlc2MtbW9yZVwiPicraStcIjwvYT5cIik6b319LHtrZXk6XCJkZXNjcmlwdGlvbkV2ZW50c1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIGk9dGhpcyxuPWUucXVlcnlTZWxlY3RvcihcIi5kZXNjLW1vcmVcIik7aWYoIW4pcmV0dXJuITE7YShcImNsaWNrXCIse29uRWxlbWVudDpuLHdpdGhDYWxsYmFjazpmdW5jdGlvbihlLG4pe2UucHJldmVudERlZmF1bHQoKTt2YXIgcz1kb2N1bWVudC5ib2R5LGw9dShuLFwiLmdzbGlkZS1kZXNjXCIpO2lmKCFsKXJldHVybiExO2wuaW5uZXJIVE1MPXQuZGVzY3JpcHRpb24saChzLFwiZ2Rlc2Mtb3BlblwiKTt2YXIgbz1hKFwiY2xpY2tcIix7b25FbGVtZW50OltzLHUobCxcIi5nc2xpZGUtZGVzY3JpcHRpb25cIildLHdpdGhDYWxsYmFjazpmdW5jdGlvbihlLG4pe1wiYVwiIT09ZS50YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSYmKGQocyxcImdkZXNjLW9wZW5cIiksaChzLFwiZ2Rlc2MtY2xvc2VkXCIpLGwuaW5uZXJIVE1MPXQuc21hbGxEZXNjcmlwdGlvbixpLmRlc2NyaXB0aW9uRXZlbnRzKGwsdCksc2V0VGltZW91dCgoZnVuY3Rpb24oKXtkKHMsXCJnZGVzYy1jbG9zZWRcIil9KSw0MDApLG8uZGVzdHJveSgpKX19KX19KX19LHtrZXk6XCJjcmVhdGVcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBtKHRoaXMuaW5zdGFuY2Uuc2V0dGluZ3Muc2xpZGVIVE1MKX19LHtrZXk6XCJnZXRDb25maWdcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPW5ldyAkKHRoaXMuaW5zdGFuY2Uuc2V0dGluZ3Muc2xpZGVFeHRyYUF0dHJpYnV0ZXMpO3JldHVybiB0aGlzLnNsaWRlQ29uZmlnPWUucGFyc2VDb25maWcodGhpcy5lbGVtZW50LHRoaXMuaW5zdGFuY2Uuc2V0dGluZ3MpLHRoaXMuc2xpZGVDb25maWd9fV0pLGV9KCksSj13KCksSz1udWxsIT09dygpfHx2b2lkIDAhPT1kb2N1bWVudC5jcmVhdGVUb3VjaHx8XCJvbnRvdWNoc3RhcnRcImluIHdpbmRvd3x8XCJvbm1zZ2VzdHVyZWNoYW5nZVwiaW4gd2luZG93fHxuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyxRPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaHRtbFwiKVswXSxlZT17c2VsZWN0b3I6XCIuZ2xpZ2h0Ym94XCIsZWxlbWVudHM6bnVsbCxza2luOlwiY2xlYW5cIix0aGVtZTpcImNsZWFuXCIsY2xvc2VCdXR0b246ITAsc3RhcnRBdDpudWxsLGF1dG9wbGF5VmlkZW9zOiEwLGF1dG9mb2N1c1ZpZGVvczohMCxkZXNjUG9zaXRpb246XCJib3R0b21cIix3aWR0aDpcIjkwMHB4XCIsaGVpZ2h0OlwiNTA2cHhcIix2aWRlb3NXaWR0aDpcIjk2MHB4XCIsYmVmb3JlU2xpZGVDaGFuZ2U6bnVsbCxhZnRlclNsaWRlQ2hhbmdlOm51bGwsYmVmb3JlU2xpZGVMb2FkOm51bGwsYWZ0ZXJTbGlkZUxvYWQ6bnVsbCxzbGlkZUluc2VydGVkOm51bGwsc2xpZGVSZW1vdmVkOm51bGwsc2xpZGVFeHRyYUF0dHJpYnV0ZXM6bnVsbCxvbk9wZW46bnVsbCxvbkNsb3NlOm51bGwsbG9vcDohMSx6b29tYWJsZTohMCxkcmFnZ2FibGU6ITAsZHJhZ0F1dG9TbmFwOiExLGRyYWdUb2xlcmFuY2VYOjQwLGRyYWdUb2xlcmFuY2VZOjY1LHByZWxvYWQ6ITAsb25lU2xpZGVQZXJPcGVuOiExLHRvdWNoTmF2aWdhdGlvbjohMCx0b3VjaEZvbGxvd0F4aXM6ITAsa2V5Ym9hcmROYXZpZ2F0aW9uOiEwLGNsb3NlT25PdXRzaWRlQ2xpY2s6ITAscGx1Z2luczohMSxwbHlyOntjc3M6XCJodHRwczovL2Nkbi5wbHlyLmlvLzMuNi44L3BseXIuY3NzXCIsanM6XCJodHRwczovL2Nkbi5wbHlyLmlvLzMuNi44L3BseXIuanNcIixjb25maWc6e3JhdGlvOlwiMTY6OVwiLGZ1bGxzY3JlZW46e2VuYWJsZWQ6ITAsaW9zTmF0aXZlOiEwfSx5b3V0dWJlOntub0Nvb2tpZTohMCxyZWw6MCxzaG93aW5mbzowLGl2X2xvYWRfcG9saWN5OjN9LHZpbWVvOntieWxpbmU6ITEscG9ydHJhaXQ6ITEsdGl0bGU6ITEsdHJhbnNwYXJlbnQ6ITF9fX0sb3BlbkVmZmVjdDpcInpvb21cIixjbG9zZUVmZmVjdDpcInpvb21cIixzbGlkZUVmZmVjdDpcInNsaWRlXCIsbW9yZVRleHQ6XCJTZWUgbW9yZVwiLG1vcmVMZW5ndGg6NjAsY3NzRWZlY3RzOntmYWRlOntpbjpcImZhZGVJblwiLG91dDpcImZhZGVPdXRcIn0sem9vbTp7aW46XCJ6b29tSW5cIixvdXQ6XCJ6b29tT3V0XCJ9LHNsaWRlOntpbjpcInNsaWRlSW5SaWdodFwiLG91dDpcInNsaWRlT3V0TGVmdFwifSxzbGlkZUJhY2s6e2luOlwic2xpZGVJbkxlZnRcIixvdXQ6XCJzbGlkZU91dFJpZ2h0XCJ9LG5vbmU6e2luOlwibm9uZVwiLG91dDpcIm5vbmVcIn19LHN2Zzp7Y2xvc2U6JzxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGc+PGc+PHBhdGggZD1cIk01MDUuOTQzLDYuMDU4Yy04LjA3Ny04LjA3Ny0yMS4xNzItOC4wNzctMjkuMjQ5LDBMNi4wNTgsNDc2LjY5M2MtOC4wNzcsOC4wNzctOC4wNzcsMjEuMTcyLDAsMjkuMjQ5QzEwLjA5Niw1MDkuOTgyLDE1LjM5LDUxMiwyMC42ODMsNTEyYzUuMjkzLDAsMTAuNTg2LTIuMDE5LDE0LjYyNS02LjA1OUw1MDUuOTQzLDM1LjMwNkM1MTQuMDE5LDI3LjIzLDUxNC4wMTksMTQuMTM1LDUwNS45NDMsNi4wNTh6XCIvPjwvZz48L2c+PGc+PGc+PHBhdGggZD1cIk01MDUuOTQyLDQ3Ni42OTRMMzUuMzA2LDYuMDU5Yy04LjA3Ni04LjA3Ny0yMS4xNzItOC4wNzctMjkuMjQ4LDBjLTguMDc3LDguMDc2LTguMDc3LDIxLjE3MSwwLDI5LjI0OGw0NzAuNjM2LDQ3MC42MzZjNC4wMzgsNC4wMzksOS4zMzIsNi4wNTgsMTQuNjI1LDYuMDU4YzUuMjkzLDAsMTAuNTg3LTIuMDE5LDE0LjYyNC02LjA1N0M1MTQuMDE4LDQ5Ny44NjYsNTE0LjAxOCw0ODQuNzcxLDUwNS45NDIsNDc2LjY5NHpcIi8+PC9nPjwvZz48L3N2Zz4nLG5leHQ6JzxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgNDc3LjE3NSA0NzcuMTc1XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4gPGc+PHBhdGggZD1cIk0zNjAuNzMxLDIyOS4wNzVsLTIyNS4xLTIyNS4xYy01LjMtNS4zLTEzLjgtNS4zLTE5LjEsMHMtNS4zLDEzLjgsMCwxOS4xbDIxNS41LDIxNS41bC0yMTUuNSwyMTUuNWMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjFjMi42LDIuNiw2LjEsNCw5LjUsNGMzLjQsMCw2LjktMS4zLDkuNS00bDIyNS4xLTIyNS4xQzM2NS45MzEsMjQyLjg3NSwzNjUuOTMxLDIzNC4yNzUsMzYwLjczMSwyMjkuMDc1elwiLz48L2c+PC9zdmc+JyxwcmV2Oic8c3ZnIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDQ3Ny4xNzUgNDc3LjE3NVwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGc+PHBhdGggZD1cIk0xNDUuMTg4LDIzOC41NzVsMjE1LjUtMjE1LjVjNS4zLTUuMyw1LjMtMTMuOCwwLTE5LjFzLTEzLjgtNS4zLTE5LjEsMGwtMjI1LjEsMjI1LjFjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xbDIyNS4xLDIyNWMyLjYsMi42LDYuMSw0LDkuNSw0czYuOS0xLjMsOS41LTRjNS4zLTUuMyw1LjMtMTMuOCwwLTE5LjFMMTQ1LjE4OCwyMzguNTc1elwiLz48L2c+PC9zdmc+J30sc2xpZGVIVE1MOic8ZGl2IGNsYXNzPVwiZ3NsaWRlXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJnc2xpZGUtaW5uZXItY29udGVudFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImdpbm5lci1jb250YWluZXJcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3NsaWRlLW1lZGlhXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdzbGlkZS1kZXNjcmlwdGlvblwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2Rlc2MtaW5uZXJcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImdzbGlkZS10aXRsZVwiPjwvaDQ+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3NsaWRlLWRlc2NcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+JyxsaWdodGJveEhUTUw6JzxkaXYgaWQ9XCJnbGlnaHRib3gtYm9keVwiIGNsYXNzPVwiZ2xpZ2h0Ym94LWNvbnRhaW5lclwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1oaWRkZW49XCJmYWxzZVwiPlxcbiAgICA8ZGl2IGNsYXNzPVwiZ2xvYWRlciB2aXNpYmxlXCI+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJnb3ZlcmxheVwiPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiZ2NvbnRhaW5lclwiPlxcbiAgICA8ZGl2IGlkPVwiZ2xpZ2h0Ym94LXNsaWRlclwiIGNsYXNzPVwiZ3NsaWRlclwiPjwvZGl2PlxcbiAgICA8YnV0dG9uIGNsYXNzPVwiZ2Nsb3NlIGdidG5cIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBkYXRhLXRhYm9yZGVyPVwiM1wiPntjbG9zZVNWR308L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiBjbGFzcz1cImdwcmV2IGdidG5cIiBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIiBkYXRhLXRhYm9yZGVyPVwiMlwiPntwcmV2U1ZHfTwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIGNsYXNzPVwiZ25leHQgZ2J0blwiIGFyaWEtbGFiZWw9XCJOZXh0XCIgZGF0YS10YWJvcmRlcj1cIjFcIj57bmV4dFNWR308L2J1dHRvbj5cXG48L2Rpdj5cXG48L2Rpdj4nfSx0ZT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt2YXIgaT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e307dCh0aGlzLGUpLHRoaXMuY3VzdG9tT3B0aW9ucz1pLHRoaXMuc2V0dGluZ3M9bChlZSxpKSx0aGlzLmVmZmVjdHNDbGFzc2VzPXRoaXMuZ2V0QW5pbWF0aW9uQ2xhc3NlcygpLHRoaXMudmlkZW9QbGF5ZXJzPXt9LHRoaXMuYXBpRXZlbnRzPVtdLHRoaXMuZnVsbEVsZW1lbnRzTGlzdD0hMX1yZXR1cm4gbihlLFt7a2V5OlwiaW5pdFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PXRoaXMuZ2V0U2VsZWN0b3IoKTt0JiYodGhpcy5iYXNlRXZlbnRzPWEoXCJjbGlja1wiLHtvbkVsZW1lbnQ6dCx3aXRoQ2FsbGJhY2s6ZnVuY3Rpb24odCxpKXt0LnByZXZlbnREZWZhdWx0KCksZS5vcGVuKGkpfX0pKSx0aGlzLmVsZW1lbnRzPXRoaXMuZ2V0RWxlbWVudHMoKX19LHtrZXk6XCJvcGVuXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06bnVsbCx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpudWxsO2lmKDA9PXRoaXMuZWxlbWVudHMubGVuZ3RoKXJldHVybiExO3RoaXMuYWN0aXZlU2xpZGU9bnVsbCx0aGlzLnByZXZBY3RpdmVTbGlkZUluZGV4PW51bGwsdGhpcy5wcmV2QWN0aXZlU2xpZGU9bnVsbDt2YXIgaT1NKHQpP3Q6dGhpcy5zZXR0aW5ncy5zdGFydEF0O2lmKGsoZSkpe3ZhciBuPWUuZ2V0QXR0cmlidXRlKFwiZGF0YS1nYWxsZXJ5XCIpO24mJih0aGlzLmZ1bGxFbGVtZW50c0xpc3Q9dGhpcy5lbGVtZW50cyx0aGlzLmVsZW1lbnRzPXRoaXMuZ2V0R2FsbGVyeUVsZW1lbnRzKHRoaXMuZWxlbWVudHMsbikpLEkoaSkmJihpPXRoaXMuZ2V0RWxlbWVudEluZGV4KGUpKTwwJiYoaT0wKX1NKGkpfHwoaT0wKSx0aGlzLmJ1aWxkKCksZyh0aGlzLm92ZXJsYXksXCJub25lXCI9PXRoaXMuc2V0dGluZ3Mub3BlbkVmZmVjdD9cIm5vbmVcIjp0aGlzLnNldHRpbmdzLmNzc0VmZWN0cy5mYWRlLmluKTt2YXIgcz1kb2N1bWVudC5ib2R5LGw9d2luZG93LmlubmVyV2lkdGgtZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO2lmKGw+MCl7dmFyIG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO28udHlwZT1cInRleHQvY3NzXCIsby5jbGFzc05hbWU9XCJnY3NzLXN0eWxlc1wiLG8uaW5uZXJUZXh0PVwiLmdzY3JvbGxiYXItZml4ZXIge21hcmdpbi1yaWdodDogXCIuY29uY2F0KGwsXCJweH1cIiksZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChvKSxoKHMsXCJnc2Nyb2xsYmFyLWZpeGVyXCIpfWgocyxcImdsaWdodGJveC1vcGVuXCIpLGgoUSxcImdsaWdodGJveC1vcGVuXCIpLEomJihoKGRvY3VtZW50LmJvZHksXCJnbGlnaHRib3gtbW9iaWxlXCIpLHRoaXMuc2V0dGluZ3Muc2xpZGVFZmZlY3Q9XCJzbGlkZVwiKSx0aGlzLnNob3dTbGlkZShpLCEwKSwxPT10aGlzLmVsZW1lbnRzLmxlbmd0aD8oaCh0aGlzLnByZXZCdXR0b24sXCJnbGlnaHRib3gtYnV0dG9uLWhpZGRlblwiKSxoKHRoaXMubmV4dEJ1dHRvbixcImdsaWdodGJveC1idXR0b24taGlkZGVuXCIpKTooZCh0aGlzLnByZXZCdXR0b24sXCJnbGlnaHRib3gtYnV0dG9uLWhpZGRlblwiKSxkKHRoaXMubmV4dEJ1dHRvbixcImdsaWdodGJveC1idXR0b24taGlkZGVuXCIpKSx0aGlzLmxpZ2h0Ym94T3Blbj0hMCx0aGlzLnRyaWdnZXIoXCJvcGVuXCIpLFQodGhpcy5zZXR0aW5ncy5vbk9wZW4pJiZ0aGlzLnNldHRpbmdzLm9uT3BlbigpLEsmJnRoaXMuc2V0dGluZ3MudG91Y2hOYXZpZ2F0aW9uJiZCKHRoaXMpLHRoaXMuc2V0dGluZ3Mua2V5Ym9hcmROYXZpZ2F0aW9uJiZ6KHRoaXMpfX0se2tleTpcIm9wZW5BdFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOjA7dGhpcy5vcGVuKG51bGwsZSl9fSx7a2V5Olwic2hvd1NsaWRlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOjAsaT1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO2YodGhpcy5sb2FkZXIpLHRoaXMuaW5kZXg9cGFyc2VJbnQodCk7dmFyIG49dGhpcy5zbGlkZXNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50XCIpO24mJmQobixcImN1cnJlbnRcIiksdGhpcy5zbGlkZUFuaW1hdGVPdXQoKTt2YXIgcz10aGlzLnNsaWRlc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmdzbGlkZVwiKVt0XTtpZihjKHMsXCJsb2FkZWRcIikpdGhpcy5zbGlkZUFuaW1hdGVJbihzLGkpLHAodGhpcy5sb2FkZXIpO2Vsc2V7Zih0aGlzLmxvYWRlcik7dmFyIGw9dGhpcy5lbGVtZW50c1t0XSxvPXtpbmRleDp0aGlzLmluZGV4LHNsaWRlOnMsc2xpZGVOb2RlOnMsc2xpZGVDb25maWc6bC5zbGlkZUNvbmZpZyxzbGlkZUluZGV4OnRoaXMuaW5kZXgsdHJpZ2dlcjpsLm5vZGUscGxheWVyOm51bGx9O3RoaXMudHJpZ2dlcihcInNsaWRlX2JlZm9yZV9sb2FkXCIsbyksbC5pbnN0YW5jZS5zZXRDb250ZW50KHMsKGZ1bmN0aW9uKCl7cChlLmxvYWRlciksZS5yZXNpemUoKSxlLnNsaWRlQW5pbWF0ZUluKHMsaSksZS50cmlnZ2VyKFwic2xpZGVfYWZ0ZXJfbG9hZFwiLG8pfSkpfXRoaXMuc2xpZGVEZXNjcmlwdGlvbj1zLnF1ZXJ5U2VsZWN0b3IoXCIuZ3NsaWRlLWRlc2NyaXB0aW9uXCIpLHRoaXMuc2xpZGVEZXNjcmlwdGlvbkNvbnRhaW5lZD10aGlzLnNsaWRlRGVzY3JpcHRpb24mJmModGhpcy5zbGlkZURlc2NyaXB0aW9uLnBhcmVudE5vZGUsXCJnc2xpZGUtbWVkaWFcIiksdGhpcy5zZXR0aW5ncy5wcmVsb2FkJiYodGhpcy5wcmVsb2FkU2xpZGUodCsxKSx0aGlzLnByZWxvYWRTbGlkZSh0LTEpKSx0aGlzLnVwZGF0ZU5hdmlnYXRpb25DbGFzc2VzKCksdGhpcy5hY3RpdmVTbGlkZT1zfX0se2tleTpcInByZWxvYWRTbGlkZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7aWYoZTwwfHxlPnRoaXMuZWxlbWVudHMubGVuZ3RoLTEpcmV0dXJuITE7aWYoSSh0aGlzLmVsZW1lbnRzW2VdKSlyZXR1cm4hMTt2YXIgaT10aGlzLnNsaWRlc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmdzbGlkZVwiKVtlXTtpZihjKGksXCJsb2FkZWRcIikpcmV0dXJuITE7dmFyIG49dGhpcy5lbGVtZW50c1tlXSxzPW4udHlwZSxsPXtpbmRleDplLHNsaWRlOmksc2xpZGVOb2RlOmksc2xpZGVDb25maWc6bi5zbGlkZUNvbmZpZyxzbGlkZUluZGV4OmUsdHJpZ2dlcjpuLm5vZGUscGxheWVyOm51bGx9O3RoaXMudHJpZ2dlcihcInNsaWRlX2JlZm9yZV9sb2FkXCIsbCksXCJ2aWRlb1wiPT1zfHxcImV4dGVybmFsXCI9PXM/c2V0VGltZW91dCgoZnVuY3Rpb24oKXtuLmluc3RhbmNlLnNldENvbnRlbnQoaSwoZnVuY3Rpb24oKXt0LnRyaWdnZXIoXCJzbGlkZV9hZnRlcl9sb2FkXCIsbCl9KSl9KSwyMDApOm4uaW5zdGFuY2Uuc2V0Q29udGVudChpLChmdW5jdGlvbigpe3QudHJpZ2dlcihcInNsaWRlX2FmdGVyX2xvYWRcIixsKX0pKX19LHtrZXk6XCJwcmV2U2xpZGVcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuZ29Ub1NsaWRlKHRoaXMuaW5kZXgtMSl9fSx7a2V5OlwibmV4dFNsaWRlXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmdvVG9TbGlkZSh0aGlzLmluZGV4KzEpfX0se2tleTpcImdvVG9TbGlkZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtpZih0aGlzLnByZXZBY3RpdmVTbGlkZT10aGlzLmFjdGl2ZVNsaWRlLHRoaXMucHJldkFjdGl2ZVNsaWRlSW5kZXg9dGhpcy5pbmRleCwhdGhpcy5sb29wKCkmJihlPDB8fGU+dGhpcy5lbGVtZW50cy5sZW5ndGgtMSkpcmV0dXJuITE7ZTwwP2U9dGhpcy5lbGVtZW50cy5sZW5ndGgtMTplPj10aGlzLmVsZW1lbnRzLmxlbmd0aCYmKGU9MCksdGhpcy5zaG93U2xpZGUoZSl9fSx7a2V5OlwiaW5zZXJ0U2xpZGVcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSx0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTotMTt0PDAmJih0PXRoaXMuZWxlbWVudHMubGVuZ3RoKTt2YXIgaT1uZXcgVShlLHRoaXMsdCksbj1pLmdldENvbmZpZygpLHM9bCh7fSxuKSxvPWkuY3JlYXRlKCkscj10aGlzLmVsZW1lbnRzLmxlbmd0aC0xO3MuaW5kZXg9dCxzLm5vZGU9ITEscy5pbnN0YW5jZT1pLHMuc2xpZGVDb25maWc9bix0aGlzLmVsZW1lbnRzLnNwbGljZSh0LDAscyk7dmFyIGE9bnVsbCxoPW51bGw7aWYodGhpcy5zbGlkZXNDb250YWluZXIpe2lmKHQ+cil0aGlzLnNsaWRlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChvKTtlbHNle3ZhciBkPXRoaXMuc2xpZGVzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3NsaWRlXCIpW3RdO3RoaXMuc2xpZGVzQ29udGFpbmVyLmluc2VydEJlZm9yZShvLGQpfSh0aGlzLnNldHRpbmdzLnByZWxvYWQmJjA9PXRoaXMuaW5kZXgmJjA9PXR8fHRoaXMuaW5kZXgtMT09dHx8dGhpcy5pbmRleCsxPT10KSYmdGhpcy5wcmVsb2FkU2xpZGUodCksMD09dGhpcy5pbmRleCYmMD09dCYmKHRoaXMuaW5kZXg9MSksdGhpcy51cGRhdGVOYXZpZ2F0aW9uQ2xhc3NlcygpLGE9dGhpcy5zbGlkZXNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5nc2xpZGVcIilbdF0saD10aGlzLmdldFNsaWRlUGxheWVySW5zdGFuY2UodCkscy5zbGlkZU5vZGU9YX10aGlzLnRyaWdnZXIoXCJzbGlkZV9pbnNlcnRlZFwiLHtpbmRleDp0LHNsaWRlOmEsc2xpZGVOb2RlOmEsc2xpZGVDb25maWc6bixzbGlkZUluZGV4OnQsdHJpZ2dlcjpudWxsLHBsYXllcjpofSksVCh0aGlzLnNldHRpbmdzLnNsaWRlSW5zZXJ0ZWQpJiZ0aGlzLnNldHRpbmdzLnNsaWRlSW5zZXJ0ZWQoe2luZGV4OnQsc2xpZGU6YSxwbGF5ZXI6aH0pfX0se2tleTpcInJlbW92ZVNsaWRlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06LTE7aWYoZTwwfHxlPnRoaXMuZWxlbWVudHMubGVuZ3RoLTEpcmV0dXJuITE7dmFyIHQ9dGhpcy5zbGlkZXNDb250YWluZXImJnRoaXMuc2xpZGVzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3NsaWRlXCIpW2VdO3QmJih0aGlzLmdldEFjdGl2ZVNsaWRlSW5kZXgoKT09ZSYmKGU9PXRoaXMuZWxlbWVudHMubGVuZ3RoLTE/dGhpcy5wcmV2U2xpZGUoKTp0aGlzLm5leHRTbGlkZSgpKSx0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodCkpLHRoaXMuZWxlbWVudHMuc3BsaWNlKGUsMSksdGhpcy50cmlnZ2VyKFwic2xpZGVfcmVtb3ZlZFwiLGUpLFQodGhpcy5zZXR0aW5ncy5zbGlkZVJlbW92ZWQpJiZ0aGlzLnNldHRpbmdzLnNsaWRlUmVtb3ZlZChlKX19LHtrZXk6XCJzbGlkZUFuaW1hdGVJblwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIGk9dGhpcyxuPWUucXVlcnlTZWxlY3RvcihcIi5nc2xpZGUtbWVkaWFcIikscz1lLnF1ZXJ5U2VsZWN0b3IoXCIuZ3NsaWRlLWRlc2NyaXB0aW9uXCIpLGw9e2luZGV4OnRoaXMucHJldkFjdGl2ZVNsaWRlSW5kZXgsc2xpZGU6dGhpcy5wcmV2QWN0aXZlU2xpZGUsc2xpZGVOb2RlOnRoaXMucHJldkFjdGl2ZVNsaWRlLHNsaWRlSW5kZXg6dGhpcy5wcmV2QWN0aXZlU2xpZGUsc2xpZGVDb25maWc6SSh0aGlzLnByZXZBY3RpdmVTbGlkZUluZGV4KT9udWxsOnRoaXMuZWxlbWVudHNbdGhpcy5wcmV2QWN0aXZlU2xpZGVJbmRleF0uc2xpZGVDb25maWcsdHJpZ2dlcjpJKHRoaXMucHJldkFjdGl2ZVNsaWRlSW5kZXgpP251bGw6dGhpcy5lbGVtZW50c1t0aGlzLnByZXZBY3RpdmVTbGlkZUluZGV4XS5ub2RlLHBsYXllcjp0aGlzLmdldFNsaWRlUGxheWVySW5zdGFuY2UodGhpcy5wcmV2QWN0aXZlU2xpZGVJbmRleCl9LG89e2luZGV4OnRoaXMuaW5kZXgsc2xpZGU6dGhpcy5hY3RpdmVTbGlkZSxzbGlkZU5vZGU6dGhpcy5hY3RpdmVTbGlkZSxzbGlkZUNvbmZpZzp0aGlzLmVsZW1lbnRzW3RoaXMuaW5kZXhdLnNsaWRlQ29uZmlnLHNsaWRlSW5kZXg6dGhpcy5pbmRleCx0cmlnZ2VyOnRoaXMuZWxlbWVudHNbdGhpcy5pbmRleF0ubm9kZSxwbGF5ZXI6dGhpcy5nZXRTbGlkZVBsYXllckluc3RhbmNlKHRoaXMuaW5kZXgpfTtpZihuLm9mZnNldFdpZHRoPjAmJnMmJihwKHMpLHMuc3R5bGUuZGlzcGxheT1cIlwiKSxkKGUsdGhpcy5lZmZlY3RzQ2xhc3NlcyksdClnKGUsdGhpcy5zZXR0aW5ncy5jc3NFZmVjdHNbdGhpcy5zZXR0aW5ncy5vcGVuRWZmZWN0XS5pbiwoZnVuY3Rpb24oKXtpLnNldHRpbmdzLmF1dG9wbGF5VmlkZW9zJiZpLnNsaWRlUGxheWVyUGxheShlKSxpLnRyaWdnZXIoXCJzbGlkZV9jaGFuZ2VkXCIse3ByZXY6bCxjdXJyZW50Om99KSxUKGkuc2V0dGluZ3MuYWZ0ZXJTbGlkZUNoYW5nZSkmJmkuc2V0dGluZ3MuYWZ0ZXJTbGlkZUNoYW5nZS5hcHBseShpLFtsLG9dKX0pKTtlbHNle3ZhciByPXRoaXMuc2V0dGluZ3Muc2xpZGVFZmZlY3QsYT1cIm5vbmVcIiE9PXI/dGhpcy5zZXR0aW5ncy5jc3NFZmVjdHNbcl0uaW46cjt0aGlzLnByZXZBY3RpdmVTbGlkZUluZGV4PnRoaXMuaW5kZXgmJlwic2xpZGVcIj09dGhpcy5zZXR0aW5ncy5zbGlkZUVmZmVjdCYmKGE9dGhpcy5zZXR0aW5ncy5jc3NFZmVjdHMuc2xpZGVCYWNrLmluKSxnKGUsYSwoZnVuY3Rpb24oKXtpLnNldHRpbmdzLmF1dG9wbGF5VmlkZW9zJiZpLnNsaWRlUGxheWVyUGxheShlKSxpLnRyaWdnZXIoXCJzbGlkZV9jaGFuZ2VkXCIse3ByZXY6bCxjdXJyZW50Om99KSxUKGkuc2V0dGluZ3MuYWZ0ZXJTbGlkZUNoYW5nZSkmJmkuc2V0dGluZ3MuYWZ0ZXJTbGlkZUNoYW5nZS5hcHBseShpLFtsLG9dKX0pKX1zZXRUaW1lb3V0KChmdW5jdGlvbigpe2kucmVzaXplKGUpfSksMTAwKSxoKGUsXCJjdXJyZW50XCIpfX0se2tleTpcInNsaWRlQW5pbWF0ZU91dFwiLHZhbHVlOmZ1bmN0aW9uKCl7aWYoIXRoaXMucHJldkFjdGl2ZVNsaWRlKXJldHVybiExO3ZhciBlPXRoaXMucHJldkFjdGl2ZVNsaWRlO2QoZSx0aGlzLmVmZmVjdHNDbGFzc2VzKSxoKGUsXCJwcmV2XCIpO3ZhciB0PXRoaXMuc2V0dGluZ3Muc2xpZGVFZmZlY3QsaT1cIm5vbmVcIiE9PXQ/dGhpcy5zZXR0aW5ncy5jc3NFZmVjdHNbdF0ub3V0OnQ7dGhpcy5zbGlkZVBsYXllclBhdXNlKGUpLHRoaXMudHJpZ2dlcihcInNsaWRlX2JlZm9yZV9jaGFuZ2VcIix7cHJldjp7aW5kZXg6dGhpcy5wcmV2QWN0aXZlU2xpZGVJbmRleCxzbGlkZTp0aGlzLnByZXZBY3RpdmVTbGlkZSxzbGlkZU5vZGU6dGhpcy5wcmV2QWN0aXZlU2xpZGUsc2xpZGVJbmRleDp0aGlzLnByZXZBY3RpdmVTbGlkZUluZGV4LHNsaWRlQ29uZmlnOkkodGhpcy5wcmV2QWN0aXZlU2xpZGVJbmRleCk/bnVsbDp0aGlzLmVsZW1lbnRzW3RoaXMucHJldkFjdGl2ZVNsaWRlSW5kZXhdLnNsaWRlQ29uZmlnLHRyaWdnZXI6SSh0aGlzLnByZXZBY3RpdmVTbGlkZUluZGV4KT9udWxsOnRoaXMuZWxlbWVudHNbdGhpcy5wcmV2QWN0aXZlU2xpZGVJbmRleF0ubm9kZSxwbGF5ZXI6dGhpcy5nZXRTbGlkZVBsYXllckluc3RhbmNlKHRoaXMucHJldkFjdGl2ZVNsaWRlSW5kZXgpfSxjdXJyZW50OntpbmRleDp0aGlzLmluZGV4LHNsaWRlOnRoaXMuYWN0aXZlU2xpZGUsc2xpZGVOb2RlOnRoaXMuYWN0aXZlU2xpZGUsc2xpZGVJbmRleDp0aGlzLmluZGV4LHNsaWRlQ29uZmlnOnRoaXMuZWxlbWVudHNbdGhpcy5pbmRleF0uc2xpZGVDb25maWcsdHJpZ2dlcjp0aGlzLmVsZW1lbnRzW3RoaXMuaW5kZXhdLm5vZGUscGxheWVyOnRoaXMuZ2V0U2xpZGVQbGF5ZXJJbnN0YW5jZSh0aGlzLmluZGV4KX19KSxUKHRoaXMuc2V0dGluZ3MuYmVmb3JlU2xpZGVDaGFuZ2UpJiZ0aGlzLnNldHRpbmdzLmJlZm9yZVNsaWRlQ2hhbmdlLmFwcGx5KHRoaXMsW3tpbmRleDp0aGlzLnByZXZBY3RpdmVTbGlkZUluZGV4LHNsaWRlOnRoaXMucHJldkFjdGl2ZVNsaWRlLHBsYXllcjp0aGlzLmdldFNsaWRlUGxheWVySW5zdGFuY2UodGhpcy5wcmV2QWN0aXZlU2xpZGVJbmRleCl9LHtpbmRleDp0aGlzLmluZGV4LHNsaWRlOnRoaXMuYWN0aXZlU2xpZGUscGxheWVyOnRoaXMuZ2V0U2xpZGVQbGF5ZXJJbnN0YW5jZSh0aGlzLmluZGV4KX1dKSx0aGlzLnByZXZBY3RpdmVTbGlkZUluZGV4PnRoaXMuaW5kZXgmJlwic2xpZGVcIj09dGhpcy5zZXR0aW5ncy5zbGlkZUVmZmVjdCYmKGk9dGhpcy5zZXR0aW5ncy5jc3NFZmVjdHMuc2xpZGVCYWNrLm91dCksZyhlLGksKGZ1bmN0aW9uKCl7dmFyIHQ9ZS5xdWVyeVNlbGVjdG9yKFwiLmdpbm5lci1jb250YWluZXJcIiksaT1lLnF1ZXJ5U2VsZWN0b3IoXCIuZ3NsaWRlLW1lZGlhXCIpLG49ZS5xdWVyeVNlbGVjdG9yKFwiLmdzbGlkZS1kZXNjcmlwdGlvblwiKTt0LnN0eWxlLnRyYW5zZm9ybT1cIlwiLGkuc3R5bGUudHJhbnNmb3JtPVwiXCIsZChpLFwiZ3Jlc2V0XCIpLGkuc3R5bGUub3BhY2l0eT1cIlwiLG4mJihuLnN0eWxlLm9wYWNpdHk9XCJcIiksZChlLFwicHJldlwiKX0pKX19LHtrZXk6XCJnZXRBbGxQbGF5ZXJzXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52aWRlb1BsYXllcnN9fSx7a2V5OlwiZ2V0U2xpZGVQbGF5ZXJJbnN0YW5jZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PVwiZ3ZpZGVvXCIrZSxpPXRoaXMuZ2V0QWxsUGxheWVycygpO3JldHVybiEoIU8oaSx0KXx8IWlbdF0pJiZpW3RdfX0se2tleTpcInN0b3BTbGlkZVZpZGVvXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoayhlKSl7dmFyIHQ9ZS5xdWVyeVNlbGVjdG9yKFwiLmd2aWRlby13cmFwcGVyXCIpO3QmJihlPXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKSl9Y29uc29sZS5sb2coXCJzdG9wU2xpZGVWaWRlbyBpcyBkZXByZWNhdGVkLCB1c2Ugc2xpZGVQbGF5ZXJQYXVzZVwiKTt2YXIgaT10aGlzLmdldFNsaWRlUGxheWVySW5zdGFuY2UoZSk7aSYmaS5wbGF5aW5nJiZpLnBhdXNlKCl9fSx7a2V5Olwic2xpZGVQbGF5ZXJQYXVzZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKGsoZSkpe3ZhciB0PWUucXVlcnlTZWxlY3RvcihcIi5ndmlkZW8td3JhcHBlclwiKTt0JiYoZT10LmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIikpfXZhciBpPXRoaXMuZ2V0U2xpZGVQbGF5ZXJJbnN0YW5jZShlKTtpJiZpLnBsYXlpbmcmJmkucGF1c2UoKX19LHtrZXk6XCJwbGF5U2xpZGVWaWRlb1wiLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKGsoZSkpe3ZhciB0PWUucXVlcnlTZWxlY3RvcihcIi5ndmlkZW8td3JhcHBlclwiKTt0JiYoZT10LmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIikpfWNvbnNvbGUubG9nKFwicGxheVNsaWRlVmlkZW8gaXMgZGVwcmVjYXRlZCwgdXNlIHNsaWRlUGxheWVyUGxheVwiKTt2YXIgaT10aGlzLmdldFNsaWRlUGxheWVySW5zdGFuY2UoZSk7aSYmIWkucGxheWluZyYmaS5wbGF5KCl9fSx7a2V5Olwic2xpZGVQbGF5ZXJQbGF5XCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoayhlKSl7dmFyIHQ9ZS5xdWVyeVNlbGVjdG9yKFwiLmd2aWRlby13cmFwcGVyXCIpO3QmJihlPXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKSl9dmFyIGk9dGhpcy5nZXRTbGlkZVBsYXllckluc3RhbmNlKGUpO2kmJiFpLnBsYXlpbmcmJihpLnBsYXkoKSx0aGlzLnNldHRpbmdzLmF1dG9mb2N1c1ZpZGVvcyYmaS5lbGVtZW50cy5jb250YWluZXIuZm9jdXMoKSl9fSx7a2V5Olwic2V0RWxlbWVudHNcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzO3RoaXMuc2V0dGluZ3MuZWxlbWVudHM9ITE7dmFyIGk9W107ZSYmZS5sZW5ndGgmJm8oZSwoZnVuY3Rpb24oZSxuKXt2YXIgcz1uZXcgVShlLHQsbiksbz1zLmdldENvbmZpZygpLHI9bCh7fSxvKTtyLnNsaWRlQ29uZmlnPW8sci5pbnN0YW5jZT1zLHIuaW5kZXg9bixpLnB1c2gocil9KSksdGhpcy5lbGVtZW50cz1pLHRoaXMubGlnaHRib3hPcGVuJiYodGhpcy5zbGlkZXNDb250YWluZXIuaW5uZXJIVE1MPVwiXCIsdGhpcy5lbGVtZW50cy5sZW5ndGgmJihvKHRoaXMuZWxlbWVudHMsKGZ1bmN0aW9uKCl7dmFyIGU9bSh0LnNldHRpbmdzLnNsaWRlSFRNTCk7dC5zbGlkZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZSl9KSksdGhpcy5zaG93U2xpZGUoMCwhMCkpKX19LHtrZXk6XCJnZXRFbGVtZW50SW5kZXhcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD0hMTtyZXR1cm4gbyh0aGlzLmVsZW1lbnRzLChmdW5jdGlvbihpLG4pe2lmKE8oaSxcIm5vZGVcIikmJmkubm9kZT09ZSlyZXR1cm4gdD1uLCEwfSkpLHR9fSx7a2V5OlwiZ2V0RWxlbWVudHNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1bXTt0aGlzLmVsZW1lbnRzPXRoaXMuZWxlbWVudHM/dGhpcy5lbGVtZW50czpbXSwhSSh0aGlzLnNldHRpbmdzLmVsZW1lbnRzKSYmRSh0aGlzLnNldHRpbmdzLmVsZW1lbnRzKSYmdGhpcy5zZXR0aW5ncy5lbGVtZW50cy5sZW5ndGgmJm8odGhpcy5zZXR0aW5ncy5lbGVtZW50cywoZnVuY3Rpb24oaSxuKXt2YXIgcz1uZXcgVShpLGUsbiksbz1zLmdldENvbmZpZygpLHI9bCh7fSxvKTtyLm5vZGU9ITEsci5pbmRleD1uLHIuaW5zdGFuY2U9cyxyLnNsaWRlQ29uZmlnPW8sdC5wdXNoKHIpfSkpO3ZhciBpPSExO3JldHVybiB0aGlzLmdldFNlbGVjdG9yKCkmJihpPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5nZXRTZWxlY3RvcigpKSksaT8obyhpLChmdW5jdGlvbihpLG4pe3ZhciBzPW5ldyBVKGksZSxuKSxvPXMuZ2V0Q29uZmlnKCkscj1sKHt9LG8pO3Iubm9kZT1pLHIuaW5kZXg9bixyLmluc3RhbmNlPXMsci5zbGlkZUNvbmZpZz1vLHIuZ2FsbGVyeT1pLmdldEF0dHJpYnV0ZShcImRhdGEtZ2FsbGVyeVwiKSx0LnB1c2gocil9KSksdCk6dH19LHtrZXk6XCJnZXRHYWxsZXJ5RWxlbWVudHNcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3JldHVybiBlLmZpbHRlcigoZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2FsbGVyeT09dH0pKX19LHtrZXk6XCJnZXRTZWxlY3RvclwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIXRoaXMuc2V0dGluZ3MuZWxlbWVudHMmJih0aGlzLnNldHRpbmdzLnNlbGVjdG9yJiZcImRhdGEtXCI9PXRoaXMuc2V0dGluZ3Muc2VsZWN0b3Iuc3Vic3RyaW5nKDAsNSk/XCIqW1wiLmNvbmNhdCh0aGlzLnNldHRpbmdzLnNlbGVjdG9yLFwiXVwiKTp0aGlzLnNldHRpbmdzLnNlbGVjdG9yKX19LHtrZXk6XCJnZXRBY3RpdmVTbGlkZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2xpZGVzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3NsaWRlXCIpW3RoaXMuaW5kZXhdfX0se2tleTpcImdldEFjdGl2ZVNsaWRlSW5kZXhcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmluZGV4fX0se2tleTpcImdldEFuaW1hdGlvbkNsYXNzZXNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPVtdO2Zvcih2YXIgdCBpbiB0aGlzLnNldHRpbmdzLmNzc0VmZWN0cylpZih0aGlzLnNldHRpbmdzLmNzc0VmZWN0cy5oYXNPd25Qcm9wZXJ0eSh0KSl7dmFyIGk9dGhpcy5zZXR0aW5ncy5jc3NFZmVjdHNbdF07ZS5wdXNoKFwiZ1wiLmNvbmNhdChpLmluKSksZS5wdXNoKFwiZ1wiLmNvbmNhdChpLm91dCkpfXJldHVybiBlLmpvaW4oXCIgXCIpfX0se2tleTpcImJ1aWxkXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2lmKHRoaXMuYnVpbHQpcmV0dXJuITE7dmFyIHQ9ZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzLGk9W107byh0LChmdW5jdGlvbihlKXtlLnBhcmVudE5vZGU9PWRvY3VtZW50LmJvZHkmJlwiI1wiIT09ZS5ub2RlTmFtZS5jaGFyQXQoMCkmJmUuaGFzQXR0cmlidXRlJiYhZS5oYXNBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKSYmKGkucHVzaChlKSxlLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsXCJ0cnVlXCIpKX0pKTt2YXIgbj1PKHRoaXMuc2V0dGluZ3Muc3ZnLFwibmV4dFwiKT90aGlzLnNldHRpbmdzLnN2Zy5uZXh0OlwiXCIscz1PKHRoaXMuc2V0dGluZ3Muc3ZnLFwicHJldlwiKT90aGlzLnNldHRpbmdzLnN2Zy5wcmV2OlwiXCIsbD1PKHRoaXMuc2V0dGluZ3Muc3ZnLFwiY2xvc2VcIik/dGhpcy5zZXR0aW5ncy5zdmcuY2xvc2U6XCJcIixyPXRoaXMuc2V0dGluZ3MubGlnaHRib3hIVE1MO3I9bShyPShyPShyPXIucmVwbGFjZSgve25leHRTVkd9L2csbikpLnJlcGxhY2UoL3twcmV2U1ZHfS9nLHMpKS5yZXBsYWNlKC97Y2xvc2VTVkd9L2csbCkpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocik7dmFyIGQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbGlnaHRib3gtYm9keVwiKTt0aGlzLm1vZGFsPWQ7dmFyIGc9ZC5xdWVyeVNlbGVjdG9yKFwiLmdjbG9zZVwiKTt0aGlzLnByZXZCdXR0b249ZC5xdWVyeVNlbGVjdG9yKFwiLmdwcmV2XCIpLHRoaXMubmV4dEJ1dHRvbj1kLnF1ZXJ5U2VsZWN0b3IoXCIuZ25leHRcIiksdGhpcy5vdmVybGF5PWQucXVlcnlTZWxlY3RvcihcIi5nb3ZlcmxheVwiKSx0aGlzLmxvYWRlcj1kLnF1ZXJ5U2VsZWN0b3IoXCIuZ2xvYWRlclwiKSx0aGlzLnNsaWRlc0NvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsaWdodGJveC1zbGlkZXJcIiksdGhpcy5ib2R5SGlkZGVuQ2hpbGRFbG1zPWksdGhpcy5ldmVudHM9e30saCh0aGlzLm1vZGFsLFwiZ2xpZ2h0Ym94LVwiK3RoaXMuc2V0dGluZ3Muc2tpbiksdGhpcy5zZXR0aW5ncy5jbG9zZUJ1dHRvbiYmZyYmKHRoaXMuZXZlbnRzLmNsb3NlPWEoXCJjbGlja1wiLHtvbkVsZW1lbnQ6Zyx3aXRoQ2FsbGJhY2s6ZnVuY3Rpb24odCxpKXt0LnByZXZlbnREZWZhdWx0KCksZS5jbG9zZSgpfX0pKSxnJiYhdGhpcy5zZXR0aW5ncy5jbG9zZUJ1dHRvbiYmZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGcpLHRoaXMubmV4dEJ1dHRvbiYmKHRoaXMuZXZlbnRzLm5leHQ9YShcImNsaWNrXCIse29uRWxlbWVudDp0aGlzLm5leHRCdXR0b24sd2l0aENhbGxiYWNrOmZ1bmN0aW9uKHQsaSl7dC5wcmV2ZW50RGVmYXVsdCgpLGUubmV4dFNsaWRlKCl9fSkpLHRoaXMucHJldkJ1dHRvbiYmKHRoaXMuZXZlbnRzLnByZXY9YShcImNsaWNrXCIse29uRWxlbWVudDp0aGlzLnByZXZCdXR0b24sd2l0aENhbGxiYWNrOmZ1bmN0aW9uKHQsaSl7dC5wcmV2ZW50RGVmYXVsdCgpLGUucHJldlNsaWRlKCl9fSkpLHRoaXMuc2V0dGluZ3MuY2xvc2VPbk91dHNpZGVDbGljayYmKHRoaXMuZXZlbnRzLm91dENsb3NlPWEoXCJjbGlja1wiLHtvbkVsZW1lbnQ6ZCx3aXRoQ2FsbGJhY2s6ZnVuY3Rpb24odCxpKXtlLnByZXZlbnRPdXRzaWRlQ2xpY2t8fGMoZG9jdW1lbnQuYm9keSxcImdsaWdodGJveC1tb2JpbGVcIil8fHUodC50YXJnZXQsXCIuZ2lubmVyLWNvbnRhaW5lclwiKXx8dSh0LnRhcmdldCxcIi5nYnRuXCIpfHxjKHQudGFyZ2V0LFwiZ25leHRcIil8fGModC50YXJnZXQsXCJncHJldlwiKXx8ZS5jbG9zZSgpfX0pKSxvKHRoaXMuZWxlbWVudHMsKGZ1bmN0aW9uKHQsaSl7ZS5zbGlkZXNDb250YWluZXIuYXBwZW5kQ2hpbGQodC5pbnN0YW5jZS5jcmVhdGUoKSksdC5zbGlkZU5vZGU9ZS5zbGlkZXNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5nc2xpZGVcIilbaV19KSksSyYmaChkb2N1bWVudC5ib2R5LFwiZ2xpZ2h0Ym94LXRvdWNoXCIpLHRoaXMuZXZlbnRzLnJlc2l6ZT1hKFwicmVzaXplXCIse29uRWxlbWVudDp3aW5kb3csd2l0aENhbGxiYWNrOmZ1bmN0aW9uKCl7ZS5yZXNpemUoKX19KSx0aGlzLmJ1aWx0PSEwfX0se2tleTpcInJlc2l6ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOm51bGw7aWYoKGU9ZXx8dGhpcy5hY3RpdmVTbGlkZSkmJiFjKGUsXCJ6b29tZWRcIikpe3ZhciB0PXkoKSxpPWUucXVlcnlTZWxlY3RvcihcIi5ndmlkZW8td3JhcHBlclwiKSxuPWUucXVlcnlTZWxlY3RvcihcIi5nc2xpZGUtaW1hZ2VcIikscz10aGlzLnNsaWRlRGVzY3JpcHRpb24sbD10LndpZHRoLG89dC5oZWlnaHQ7aWYobDw9NzY4P2goZG9jdW1lbnQuYm9keSxcImdsaWdodGJveC1tb2JpbGVcIik6ZChkb2N1bWVudC5ib2R5LFwiZ2xpZ2h0Ym94LW1vYmlsZVwiKSxpfHxuKXt2YXIgcj0hMTtpZihzJiYoYyhzLFwiZGVzY3JpcHRpb24tYm90dG9tXCIpfHxjKHMsXCJkZXNjcmlwdGlvbi10b3BcIikpJiYhYyhzLFwiZ2Fic29sdXRlXCIpJiYocj0hMCksbilpZihsPD03Njgpbi5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO2Vsc2UgaWYocil7dmFyIGE9cy5vZmZzZXRIZWlnaHQsdT1uLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7dS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwibWF4LWhlaWdodDogY2FsYygxMDB2aCAtIFwiLmNvbmNhdChhLFwicHgpXCIpKSxzLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJtYXgtd2lkdGg6IFwiLmNvbmNhdCh1Lm9mZnNldFdpZHRoLFwicHg7XCIpKX1pZihpKXt2YXIgZz1PKHRoaXMuc2V0dGluZ3MucGx5ci5jb25maWcsXCJyYXRpb1wiKT90aGlzLnNldHRpbmdzLnBseXIuY29uZmlnLnJhdGlvOlwiXCI7aWYoIWcpe3ZhciB2PWkuY2xpZW50V2lkdGgsZj1pLmNsaWVudEhlaWdodCxwPXYvZjtnPVwiXCIuY29uY2F0KHYvcCxcIjpcIikuY29uY2F0KGYvcCl9dmFyIG09Zy5zcGxpdChcIjpcIikseD10aGlzLnNldHRpbmdzLnZpZGVvc1dpZHRoLGI9dGhpcy5zZXR0aW5ncy52aWRlb3NXaWR0aCxTPShiPU0oeCl8fC0xIT09eC5pbmRleE9mKFwicHhcIik/cGFyc2VJbnQoeCk6LTEhPT14LmluZGV4T2YoXCJ2d1wiKT9sKnBhcnNlSW50KHgpLzEwMDotMSE9PXguaW5kZXhPZihcInZoXCIpP28qcGFyc2VJbnQoeCkvMTAwOi0xIT09eC5pbmRleE9mKFwiJVwiKT9sKnBhcnNlSW50KHgpLzEwMDpwYXJzZUludChpLmNsaWVudFdpZHRoKSkvKHBhcnNlSW50KG1bMF0pL3BhcnNlSW50KG1bMV0pKTtpZihTPU1hdGguZmxvb3IoUyksciYmKG8tPXMub2Zmc2V0SGVpZ2h0KSxiPmx8fFM+b3x8bzxTJiZsPmIpe3ZhciB3PWkub2Zmc2V0V2lkdGgsVD1pLm9mZnNldEhlaWdodCxDPW8vVCxrPXt3aWR0aDp3KkMsaGVpZ2h0OlQqQ307aS5wYXJlbnROb2RlLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsXCJtYXgtd2lkdGg6IFwiLmNvbmNhdChrLndpZHRoLFwicHhcIikpLHImJnMuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIm1heC13aWR0aDogXCIuY29uY2F0KGsud2lkdGgsXCJweDtcIikpfWVsc2UgaS5wYXJlbnROb2RlLnN0eWxlLm1heFdpZHRoPVwiXCIuY29uY2F0KHgpLHImJnMuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIm1heC13aWR0aDogXCIuY29uY2F0KHgsXCI7XCIpKX19fX19LHtrZXk6XCJyZWxvYWRcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuaW5pdCgpfX0se2tleTpcInVwZGF0ZU5hdmlnYXRpb25DbGFzc2VzXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmxvb3AoKTtkKHRoaXMubmV4dEJ1dHRvbixcImRpc2FibGVkXCIpLGQodGhpcy5wcmV2QnV0dG9uLFwiZGlzYWJsZWRcIiksMD09dGhpcy5pbmRleCYmdGhpcy5lbGVtZW50cy5sZW5ndGgtMT09MD8oaCh0aGlzLnByZXZCdXR0b24sXCJkaXNhYmxlZFwiKSxoKHRoaXMubmV4dEJ1dHRvbixcImRpc2FibGVkXCIpKTowIT09dGhpcy5pbmRleHx8ZT90aGlzLmluZGV4IT09dGhpcy5lbGVtZW50cy5sZW5ndGgtMXx8ZXx8aCh0aGlzLm5leHRCdXR0b24sXCJkaXNhYmxlZFwiKTpoKHRoaXMucHJldkJ1dHRvbixcImRpc2FibGVkXCIpfX0se2tleTpcImxvb3BcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPU8odGhpcy5zZXR0aW5ncyxcImxvb3BBdEVuZFwiKT90aGlzLnNldHRpbmdzLmxvb3BBdEVuZDpudWxsO3JldHVybiBlPU8odGhpcy5zZXR0aW5ncyxcImxvb3BcIik/dGhpcy5zZXR0aW5ncy5sb29wOmUsZX19LHtrZXk6XCJjbG9zZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZighdGhpcy5saWdodGJveE9wZW4pe2lmKHRoaXMuZXZlbnRzKXtmb3IodmFyIHQgaW4gdGhpcy5ldmVudHMpdGhpcy5ldmVudHMuaGFzT3duUHJvcGVydHkodCkmJnRoaXMuZXZlbnRzW3RdLmRlc3Ryb3koKTt0aGlzLmV2ZW50cz1udWxsfXJldHVybiExfWlmKHRoaXMuY2xvc2luZylyZXR1cm4hMTt0aGlzLmNsb3Npbmc9ITAsdGhpcy5zbGlkZVBsYXllclBhdXNlKHRoaXMuYWN0aXZlU2xpZGUpLHRoaXMuZnVsbEVsZW1lbnRzTGlzdCYmKHRoaXMuZWxlbWVudHM9dGhpcy5mdWxsRWxlbWVudHNMaXN0KSx0aGlzLmJvZHlIaWRkZW5DaGlsZEVsbXMubGVuZ3RoJiZvKHRoaXMuYm9keUhpZGRlbkNoaWxkRWxtcywoZnVuY3Rpb24oZSl7ZS5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKX0pKSxoKHRoaXMubW9kYWwsXCJnbGlnaHRib3gtY2xvc2luZ1wiKSxnKHRoaXMub3ZlcmxheSxcIm5vbmVcIj09dGhpcy5zZXR0aW5ncy5vcGVuRWZmZWN0P1wibm9uZVwiOnRoaXMuc2V0dGluZ3MuY3NzRWZlY3RzLmZhZGUub3V0KSxnKHRoaXMuYWN0aXZlU2xpZGUsdGhpcy5zZXR0aW5ncy5jc3NFZmVjdHNbdGhpcy5zZXR0aW5ncy5jbG9zZUVmZmVjdF0ub3V0LChmdW5jdGlvbigpe2lmKGUuYWN0aXZlU2xpZGU9bnVsbCxlLnByZXZBY3RpdmVTbGlkZUluZGV4PW51bGwsZS5wcmV2QWN0aXZlU2xpZGU9bnVsbCxlLmJ1aWx0PSExLGUuZXZlbnRzKXtmb3IodmFyIHQgaW4gZS5ldmVudHMpZS5ldmVudHMuaGFzT3duUHJvcGVydHkodCkmJmUuZXZlbnRzW3RdLmRlc3Ryb3koKTtlLmV2ZW50cz1udWxsfXZhciBpPWRvY3VtZW50LmJvZHk7ZChRLFwiZ2xpZ2h0Ym94LW9wZW5cIiksZChpLFwiZ2xpZ2h0Ym94LW9wZW4gdG91Y2hpbmcgZ2Rlc2Mtb3BlbiBnbGlnaHRib3gtdG91Y2ggZ2xpZ2h0Ym94LW1vYmlsZSBnc2Nyb2xsYmFyLWZpeGVyXCIpLGUubW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlLm1vZGFsKSxlLnRyaWdnZXIoXCJjbG9zZVwiKSxUKGUuc2V0dGluZ3Mub25DbG9zZSkmJmUuc2V0dGluZ3Mub25DbG9zZSgpO3ZhciBuPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2Nzcy1zdHlsZXNcIik7biYmbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pLGUubGlnaHRib3hPcGVuPSExLGUuY2xvc2luZz1udWxsfSkpfX0se2tleTpcImRlc3Ryb3lcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuY2xvc2UoKSx0aGlzLmNsZWFyQWxsRXZlbnRzKCksdGhpcy5iYXNlRXZlbnRzJiZ0aGlzLmJhc2VFdmVudHMuZGVzdHJveSgpfX0se2tleTpcIm9uXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgaT1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO2lmKCFlfHwhVCh0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXZlbnQgbmFtZSBhbmQgY2FsbGJhY2sgbXVzdCBiZSBkZWZpbmVkXCIpO3RoaXMuYXBpRXZlbnRzLnB1c2goe2V2dDplLG9uY2U6aSxjYWxsYmFjazp0fSl9fSx7a2V5Olwib25jZVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dGhpcy5vbihlLHQsITApfX0se2tleTpcInRyaWdnZXJcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLGk9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOm51bGwsbj1bXTtvKHRoaXMuYXBpRXZlbnRzLChmdW5jdGlvbih0LHMpe3ZhciBsPXQuZXZ0LG89dC5vbmNlLHI9dC5jYWxsYmFjaztsPT1lJiYocihpKSxvJiZuLnB1c2gocykpfSkpLG4ubGVuZ3RoJiZvKG4sKGZ1bmN0aW9uKGUpe3JldHVybiB0LmFwaUV2ZW50cy5zcGxpY2UoZSwxKX0pKX19LHtrZXk6XCJjbGVhckFsbEV2ZW50c1wiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5hcGlFdmVudHMuc3BsaWNlKDAsdGhpcy5hcGlFdmVudHMubGVuZ3RoKX19LHtrZXk6XCJ2ZXJzaW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm5cIjMuMC45XCJ9fV0pLGV9KCk7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LHQ9bmV3IHRlKGUpO3JldHVybiB0LmluaXQoKSx0fX0pKTsiLCJpbXBvcnQgR0xpZ2h0Ym94IGZyb20gJ2dsaWdodGJveCdcclxuXHJcbi8qKlxyXG4gKiBaaXBNb2RhbFxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIHNob3cgcG9wdXAgYmFzZWQgb24gemlwIGNvZGVcclxuICovXHJcblxyXG5jb25zdCBJTlBVVCA9ICcuanMtWmlwTW9kYWwnXHJcblxyXG5cclxuY2xhc3MgWmlwTW9kYWwge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5pbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoSU5QVVQpXHJcblxyXG4gICAgaWYgKCF0aGlzLmlucHV0KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZm9ybSA9IHRoaXMuaW5wdXQuY2xvc2VzdCgnZm9ybScpXHJcblxyXG4gICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0LCBmYWxzZSlcclxuICB9XHJcblxyXG4gIHN1Ym1pdCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuYWxsLmtyYWoudmFsdWU7XHJcbiAgICBjb25zdCBhZGRyZXNzID0gZG9jdW1lbnQuYWxsLmNlbGFfYWRyZXNhLnZhbHVlO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbEFkZHJlc3NcIikuaW5uZXJIVE1MID0gYWRkcmVzcztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxBZGRyZXNzTm9cIikuaW5uZXJIVE1MID0gYWRkcmVzcztcclxuXHJcbiAgICBpZih0ZXh0ID09PSBcIlN0xZllZG/EjWVza8O9IGtyYWpcIiB8fCB0ZXh0ID09PSBcIkhsYXZuw60gbcSbc3RvIFByYWhhXCIpe1xyXG4gICAgICB0aGlzLm9wZW5Nb2RhbCgnI2dsaWdodGJveC1tb2RhbC0xJyk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcGVuTW9kYWwoJyNnbGlnaHRib3gtbW9kYWwtMicpO1xyXG4gICAgfVxyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gIH1cclxuXHJcbiAgb3Blbk1vZGFsID0gKGlkKSA9PiB7XHJcbiAgICBjb25zdCBDTE9TRV9CVVRUT04gPSAnLmpzLWNsb3NlLWxpZ2h0Ym94J1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQrJyA+IGRpdicpLmNsb25lTm9kZSh0cnVlKVxyXG5cclxuICAgIGNvbnN0IG1vZGFsID0gR0xpZ2h0Ym94KHtcclxuICAgICAgc2tpbjogJ21vZGFsJyxcclxuICAgICAgZWxlbWVudHM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAnY29udGVudCc6IGNvbnRlbnRcclxuICAgICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KTtcclxuICAgIG1vZGFsLm9wZW4oKTtcclxuXHJcbiAgICAvLyBjbG9zZVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChDTE9TRV9CVVRUT04pLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBtb2RhbC5jbG9zZSgpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxubmV3IFppcE1vZGFsKClcclxuIiwiaW1wb3J0IEdMaWdodGJveCBmcm9tICdnbGlnaHRib3gnXHJcblxyXG5pZiggJCgnLmdpZnRNb2RhbCcpLmxlbmd0aCApe1xyXG4gIHZhciBpc19tb2RhbF9zaG93ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYWxyZWFkeVNob3cnKTtcclxuICBpZihpc19tb2RhbF9zaG93ICE9ICdhbHJlZHkgc2hvd24nKXtcclxuICAgIGNvbnN0IG15VGltZW91dCA9IHNldFRpbWVvdXQoY2FsbE1vZGFsLCA1MDAwKTtcclxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2FscmVhZHlTaG93JywnYWxyZWR5IHNob3duJyk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgbGlnaHRib3ggPSBHTGlnaHRib3goKTtcclxudmFyIGxpZ2h0Ym94SW5saW5lSWZyYW1lID0gR0xpZ2h0Ym94KHtcclxuICBzZWxlY3RvcjogJy5naWZ0TW9kYWwnLFxyXG4gIHRvdWNoTmF2aWdhdGlvbjogZmFsc2UsXHJcbiAgc2xpZGVFZmZlY3Q6ICdub25lJyxcclxuICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gIHNraW46ICdtb2RhbCBnaWZ0bW9kYWx3cmFwcGVyJyxcclxufSk7XHJcblxyXG5mdW5jdGlvbiBjYWxsTW9kYWwoKSB7XHJcbiAgbGlnaHRib3hJbmxpbmVJZnJhbWUub3BlbigpO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBBamF4IEZvcm1zXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIC0gZ2xvYmFsIHJlY2FwdGNoYSBqcyBvYmplY3QgcmVxdWlyZWRcclxuICogLSBmb3JtIHZhbGlkYXRpb24gaGFuZGxlZCB2aWEgaHRtbDUgcmVxdWlyZWQgYXR0cmlidXRlXHJcbiAqIC0gaGFuZGxlZCB3aXRoIGFqYXgvZm9ybXMucGhwXHJcbiAqIC0gcmVxdWlyZWQgW2hpZGRlbl0gYXR0cmlidXRlIGNzcyBzdXBwb3J0XHJcbiAqIC0gcmVjYXB0Y2hhIHN1cHBvcnQgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vcmVjYXB0Y2hhL2RvY3MvdjNcclxuICovXHJcblxyXG4gY29uc3QgQUpBWF9VUkwgPSAnL2FwaS9pbmRleC5waHAnXHJcbiBjb25zdCByZUNBUFRDSEFfc2l0ZV9rZXkgPSBcIjZMZS0tU1ViQUFBQUFGYndZUmo0OXBNdGJ2MzdGZG1wbnlsak42QjdcIlxyXG4gY29uc3QgcmVDQVBUQ0hBX0VOQUJMRUQgPSB0cnVlXHJcbiBjb25zdCBFTEVNRU5UUyA9ICcuYWpheEZvcm0nXHJcbiBjb25zdCBTVUNDRVNTX0NMQVNTID0gJ2lzLXNlbmQnXHJcbiBjb25zdCBISURFX0FGVEVSX1NVQk1JVCA9IHRydWVcclxuIGNvbnN0IFNQQU1fUFJPVEVDVElPTiA9IGZhbHNlXHJcblxyXG4gY2xhc3MgQWpheEZvcm0ge1xyXG4gICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICB0aGlzLmVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChFTEVNRU5UUylcclxuICAgICB0aGlzLmFqYXhVcmwgPSBBSkFYX1VSTFxyXG5cclxuICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKVxyXG4gICAgIH0pXHJcbiAgIH1cclxuXHJcbiAgIHN1Ym1pdEhhbmRsZXIgPSBlID0+IHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICAgICBpZiAoU1BBTV9QUk9URUNUSU9OICYmICF0aGlzLnNwYW1Qcm90ZWN0aW9uKGUudGFyZ2V0KSkge1xyXG4gICAgICAgbG9jYXRpb24ucmVsb2FkKClcclxuXHJcbiAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICB9XHJcblxyXG4gICAgIGlmKHJlQ0FQVENIQV9FTkFCTEVEKXtcclxuICAgICAgZ3JlY2FwdGNoYS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICBncmVjYXB0Y2hhLmV4ZWN1dGUocmVDQVBUQ0hBX3NpdGVfa2V5LCB7YWN0aW9uOiAnc3VibWl0J30pLnRoZW4oZnVuY3Rpb24odG9rZW4pIHtcclxuICAgICAgICAgIHNlbGYuYWpheEhhbmRsZXIoZS50YXJnZXQsIHRva2VuKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlbGYuYWpheEhhbmRsZXIoZS50YXJnZXQsIHRva2VuKVxyXG4gICAgfVxyXG5cclxuICAgfVxyXG5cclxuICAgc3BhbVByb3RlY3Rpb24gPSBmb3JtID0+IHtcclxuICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKVxyXG5cclxuICAgICBpZiAoZm9ybURhdGEuZ2V0QWxsKCd3ZWJzaXRlJylbMF0ubGVuZ3RoKSB7XHJcbiAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICB9XHJcblxyXG4gICAgIHJldHVybiB0cnVlXHJcbiAgIH1cclxuXHJcbiAgIGFqYXhIYW5kbGVyID0gKGZvcm0sIHRva2VuKSA9PiB7XHJcbiAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcclxuXHJcbiAgICAgaWYocmVDQVBUQ0hBX0VOQUJMRUQpe1xyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ2dyZWNhcHRjaGFfdG9rZW4nLCB0b2tlbik7XHJcbiAgICAgfVxyXG5cclxuICAgICBjb25zdCBwYXJlbnQgPSBmb3JtLmNsb3Nlc3QoJy5hamF4Rm9ybV9fcGFyZW50JylcclxuICAgICBjb25zdCBib2R5ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5hamF4Rm9ybV9fYm9keScpXHJcbiAgICAgY29uc3QgbWVzc2FnZSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCcuYWpheEZvcm1fX21lc3NhZ2UnKVxyXG4gICAgIGNvbnN0IG1lc3NhZ2Vfc3VjY2VzcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCcuYWpheEZvcm0tc3VjY2VzcycpXHJcbiAgICAgY29uc3QgbWVzc2FnZV9lcnJvciA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCcuYWpheEZvcm0tZXJyb3InKVxyXG4gICAgIGNvbnN0IHN1Ym1pdCA9IGZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9c3VibWl0XScpXHJcblxyXG4gICAgIHN1Ym1pdC5jbGFzc0xpc3QuYWRkKCdpcy1sb2FkaW5nJylcclxuXHJcbiAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuICAgICB4aHIub3BlbignUE9TVCcsIHRoaXMuYWpheFVybCwgdHJ1ZSlcclxuICAgICB4aHIuc2VuZChmb3JtRGF0YSlcclxuXHJcbiAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICAgbWVzc2FnZS5yZW1vdmVBdHRyaWJ1dGUoJ2hpZGRlbicpXHJcblxyXG4gICAgICAgICBpZiAoSElERV9BRlRFUl9TVUJNSVQpIHtcclxuICAgICAgICAgICBib2R5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLy8gb2tcclxuICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgbWVzc2FnZV9zdWNjZXNzLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcclxuICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybTEnKS5zY3JvbGxJbnRvVmlldygpO1xyXG4gICAgICAgICAgIHN1Ym1pdC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1sb2FkaW5nJylcclxuICAgICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZChTVUNDRVNTX0NMQVNTKVxyXG5cclxuICAgICAgICAgICB2YXIgY29udmVyc2lvbkNvbmYgPSB7XHJcbiAgICAgICAgICAgIGlkOiAxMDAxMjUyMDYsXHJcbiAgICAgICAgICAgIHZhbHVlOiBudWxsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgaWYgKHdpbmRvdy5yYyAmJiB3aW5kb3cucmMuY29udmVyc2lvbkhpdCkge1xyXG4gICAgICAgICAgICB3aW5kb3cucmMuY29udmVyc2lvbkhpdChjb252ZXJzaW9uQ29uZik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgIHZhciBmbGF0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbGF0QnV0dG9uXCIpO1xyXG5cclxuICAgICAgICAgICBpZihmbGF0QnV0dG9uKXtcclxuICAgICAgICAgICAgICBndGFnKCdldmVudCcsICdjb252ZXJzaW9uJywge1xyXG4gICAgICAgICAgICAgICAgJ3NlbmRfdG8nOiAnQVctNTk5MTk5Njk2L3VYS0dDT0NkdGZZQ0VOQ2YzSjBDJ1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICAvLyBlcnJvclxyXG4gICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICBtZXNzYWdlX2Vycm9yLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJylcclxuICAgICAgICAgICBjb25zb2xlLmxvZygnanMgZXJyb3IhJywgeGhyLCByZXNwb25zZS5lcnJvcnMpXHJcbiAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICB9XHJcbiAgIH1cclxuIH1cclxuXHJcbiBuZXcgQWpheEZvcm0oKVxyXG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vYmlhdGktZGlnaXRhbC9nbGlnaHRib3hcclxuXHJcbmltcG9ydCBHTGlnaHRib3ggZnJvbSAnZ2xpZ2h0Ym94J1xyXG5cclxuR0xpZ2h0Ym94KClcclxuIiwiJCgnI2ZpbGUtdXBsb2FkJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gIHZhciBsaW1pdCA9IDU7IC8vIE1CXHJcbiAgdmFyIGZpbGUgPSAkKCcjZmlsZS11cGxvYWQnKVswXS5maWxlc1swXVxyXG4gIHZhciBmaWxlTmFtZSA9IGZpbGUubmFtZVxyXG4gIHZhciBmaWxlU2l6ZSA9IChmaWxlLnNpemUgLyAxMDI0IC8gMTAyNCkudG9GaXhlZCgyKVxyXG4gIHZhciAkbGFiZWwgPSAkKHRoaXMpLnByZXYoJ2xhYmVsJylcclxuXHJcbiAgaWYoZmlsZVNpemUgPiBsaW1pdCkge1xyXG4gICAgYWxlcnQoJ1NvdWJvciBtxa/FvmUgbcOtdCBtYXhpbcOhbG7EmyAnK2xpbWl0KydNQi4gU291xI1hc27DoSB2ZWxpa29zdDogJysgZmlsZVNpemUgKyAnTUInKVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICAkbGFiZWwudGV4dChmaWxlTmFtZSlcclxufSk7XHJcbiIsImV4cG9ydCB2YXIgTnVtYmVycztcbihmdW5jdGlvbiAoTnVtYmVycykge1xuICAgIE51bWJlcnMucGFyc2VPckVsc2UgPSBmdW5jdGlvbiAoc3RyLCBvcikge1xuICAgICAgICBpZiAob3IgPT09IHZvaWQgMCkgeyBvciA9ICcwJzsgfVxuICAgICAgICBpZiAoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoc3RyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3IgJiYgdHlwZW9mIG9yID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KG9yKSA6IDA7XG4gICAgfTtcbn0pKE51bWJlcnMgfHwgKE51bWJlcnMgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TnVtYmVycy5qcy5tYXAiLCJpbXBvcnQgeyBOdW1iZXJzIH0gZnJvbSAnLi9OdW1iZXJzJztcbmV4cG9ydCB2YXIgRWxlbWVudDtcbihmdW5jdGlvbiAoRWxlbWVudCkge1xuICAgIHZhciBpc0VsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50OyB9O1xuICAgIEVsZW1lbnQuc2V0U3R5bGVzID0gZnVuY3Rpb24gKGVsZW1lbnQsIHN0eWxlcykge1xuICAgICAgICBPYmplY3Qua2V5cyhzdHlsZXMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW2tleV0gPSBzdHlsZXNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBFbGVtZW50LmdldEJveFN0eWxlcyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBjb21wdXRlZFZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWlnaHQ6IE51bWJlcnMucGFyc2VPckVsc2UoY29tcHV0ZWRWYWx1ZS5oZWlnaHQpLFxuICAgICAgICAgICAgcGFkZGluZzoge1xuICAgICAgICAgICAgICAgIHRvcDogTnVtYmVycy5wYXJzZU9yRWxzZShjb21wdXRlZFZhbHVlLnBhZGRpbmdUb3ApLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogTnVtYmVycy5wYXJzZU9yRWxzZShjb21wdXRlZFZhbHVlLnBhZGRpbmdCb3R0b20pLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvcmRlcjoge1xuICAgICAgICAgICAgICAgIHRvcDogTnVtYmVycy5wYXJzZU9yRWxzZShjb21wdXRlZFZhbHVlLmJvcmRlclRvcFdpZHRoKSxcbiAgICAgICAgICAgICAgICBib3R0b206IE51bWJlcnMucGFyc2VPckVsc2UoY29tcHV0ZWRWYWx1ZS5ib3JkZXJCb3R0b21XaWR0aCksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH07XG4gICAgRWxlbWVudC5nZXRFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGlzRWxlbWVudChlbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnRGcm9tU2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuICAgICAgICBpZiAoaXNFbGVtZW50KGVsZW1lbnRGcm9tU2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudEZyb21TZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdXIgZWxlbWVudCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgRE9NLicpO1xuICAgIH07XG4gICAgRWxlbWVudC5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICB9O1xuICAgIEVsZW1lbnQuZ2V0QXR0cmlidXRlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICB9O1xufSkoRWxlbWVudCB8fCAoRWxlbWVudCA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbGVtZW50LmpzLm1hcCIsImV4cG9ydCB2YXIgRXZlbnRzO1xuKGZ1bmN0aW9uIChFdmVudHMpIHtcbiAgICBFdmVudHMub24gPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTsgfSxcbiAgICAgICAgfTtcbiAgICB9O1xufSkoRXZlbnRzIHx8IChFdmVudHMgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXZlbnQuanMubWFwIiwidmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudCc7XG5pbXBvcnQgeyBFdmVudHMgfSBmcm9tICcuL0V2ZW50JztcbmV4cG9ydCB2YXIgQW5pbWF0ZTtcbihmdW5jdGlvbiAoQW5pbWF0ZSkge1xuICAgIHZhciBzbGlkZVRvZ2dsZUF0dHJpYnV0ZSA9ICdkYXRhLXNsaWRlLXRvZ2dsZSc7XG4gICAgdmFyIG9uUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjayk7XG4gICAgfTtcbiAgICB2YXIgZ2V0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSA9IG9wdGlvbnMubWlsaXNlY29uZHMsIG1pbGlzZWNvbmRzID0gX2EgPT09IHZvaWQgMCA/IDIwMCA6IF9hLCBfYiA9IG9wdGlvbnMudHJhbnNpdGlvbkZ1bmN0aW9uLCB0cmFuc2l0aW9uRnVuY3Rpb24gPSBfYiA9PT0gdm9pZCAwID8gJ2xpbmVhcicgOiBfYjtcbiAgICAgICAgcmV0dXJuIFwiYWxsIFwiICsgbWlsaXNlY29uZHMgKyBcIm1zIFwiICsgdHJhbnNpdGlvbkZ1bmN0aW9uICsgXCIgMHNcIjtcbiAgICB9O1xuICAgIHZhciBpc0hpZGRlbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7IHJldHVybiBFbGVtZW50LmdldEF0dHJpYnV0ZShlbGVtZW50LCBzbGlkZVRvZ2dsZUF0dHJpYnV0ZSkgPT09ICdmYWxzZSc7IH07XG4gICAgdmFyIGlzU2hvd24gPSBmdW5jdGlvbiAoZWxlbWVudCkgeyByZXR1cm4gRWxlbWVudC5nZXRBdHRyaWJ1dGUoZWxlbWVudCwgc2xpZGVUb2dnbGVBdHRyaWJ1dGUpID09PSAndHJ1ZSc7IH07XG4gICAgQW5pbWF0ZS5zaG91bGRDb2xsYXBzZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGUgPSBFbGVtZW50LmdldEF0dHJpYnV0ZShlbGVtZW50LCBzbGlkZVRvZ2dsZUF0dHJpYnV0ZSk7XG4gICAgICAgIGlmICghYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gRWxlbWVudC5nZXRCb3hTdHlsZXMoZWxlbWVudCkuaGVpZ2h0O1xuICAgICAgICAgICAgcmV0dXJuIGhlaWdodCAmJiBoZWlnaHQgPiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFbGVtZW50LmdldEF0dHJpYnV0ZShlbGVtZW50LCBzbGlkZVRvZ2dsZUF0dHJpYnV0ZSkgPT09ICd0cnVlJztcbiAgICB9O1xuICAgIEFuaW1hdGUuaGlkZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKGlzSGlkZGVuKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgKF9hID0gb3B0aW9ucy5vbkFuaW1hdGlvblN0YXJ0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChvcHRpb25zKTtcbiAgICAgICAgdmFyIF9iID0gRWxlbWVudC5nZXRCb3hTdHlsZXMoZWxlbWVudCksIGhlaWdodCA9IF9iLmhlaWdodCwgYm94U3R5bGVzID0gX19yZXN0KF9iLCBbXCJoZWlnaHRcIl0pO1xuICAgICAgICBFbGVtZW50LnNldFN0eWxlcyhlbGVtZW50LCB7IHRyYW5zaXRpb246ICcnIH0pO1xuICAgICAgICBvblJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBFbGVtZW50LnNldFN0eWxlcyhlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICsgXCJweFwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IGJveFN0eWxlcy5wYWRkaW5nLnRvcCArIFwicHhcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiBib3hTdHlsZXMucGFkZGluZy5ib3R0b20gKyBcInB4XCIsXG4gICAgICAgICAgICAgICAgYm9yZGVyVG9wV2lkdGg6IGJveFN0eWxlcy5ib3JkZXIudG9wICsgXCJweFwiLFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbVdpZHRoOiBib3hTdHlsZXMuYm9yZGVyLmJvdHRvbSArIFwicHhcIixcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBnZXRUcmFuc2l0aW9uKG9wdGlvbnMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvblJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgRWxlbWVudC5zZXRTdHlsZXMoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogJzAnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclRvcFdpZHRoOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbVdpZHRoOiAnMCcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gRXZlbnRzLm9uKGVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gb3B0aW9ucy5vbkFuaW1hdGlvbkVuZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIEVsZW1lbnQuc2V0QXR0cmlidXRlKGVsZW1lbnQsIHNsaWRlVG9nZ2xlQXR0cmlidXRlLCAnZmFsc2UnKTtcbiAgICB9O1xuICAgIEFuaW1hdGUuc2hvdyA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKGlzU2hvd24oZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2IgPSBvcHRpb25zLmVsZW1lbnREaXNwbGF5U3R5bGUsIGVsZW1lbnREaXNwbGF5U3R5bGUgPSBfYiA9PT0gdm9pZCAwID8gJ2Jsb2NrJyA6IF9iO1xuICAgICAgICAoX2EgPSBvcHRpb25zLm9uQW5pbWF0aW9uU3RhcnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKG9wdGlvbnMpO1xuICAgICAgICBFbGVtZW50LnNldFN0eWxlcyhlbGVtZW50LCB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnJyxcbiAgICAgICAgICAgIGRpc3BsYXk6IGVsZW1lbnREaXNwbGF5U3R5bGUsXG4gICAgICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcnLFxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJycsXG4gICAgICAgICAgICBib3JkZXJUb3BXaWR0aDogJycsXG4gICAgICAgICAgICBib3JkZXJCb3R0b21XaWR0aDogJycsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX2MgPSBFbGVtZW50LmdldEJveFN0eWxlcyhlbGVtZW50KSwgaGVpZ2h0ID0gX2MuaGVpZ2h0LCBib3hTdHlsZXMgPSBfX3Jlc3QoX2MsIFtcImhlaWdodFwiXSk7XG4gICAgICAgIEVsZW1lbnQuc2V0U3R5bGVzKGVsZW1lbnQsIHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgICAgfSk7XG4gICAgICAgIG9uUmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEVsZW1lbnQuc2V0U3R5bGVzKGVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBlbGVtZW50RGlzcGxheVN0eWxlLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiAnMCcsXG4gICAgICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzAnLFxuICAgICAgICAgICAgICAgIGJvcmRlclRvcFdpZHRoOiAnMCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tV2lkdGg6ICcwJyxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBnZXRUcmFuc2l0aW9uKG9wdGlvbnMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvblJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgRWxlbWVudC5zZXRTdHlsZXMoZWxlbWVudCwge1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCArIFwicHhcIixcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogYm94U3R5bGVzLnBhZGRpbmcudG9wICsgXCJweFwiLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiBib3hTdHlsZXMucGFkZGluZy5ib3R0b20gKyBcInB4XCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclRvcFdpZHRoOiBib3hTdHlsZXMuYm9yZGVyLnRvcCArIFwicHhcIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tV2lkdGg6IGJveFN0eWxlcy5ib3JkZXIuYm90dG9tICsgXCJweFwiLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBldmVudCA9IEV2ZW50cy5vbihlbGVtZW50LCAndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICBFbGVtZW50LnNldFN0eWxlcyhlbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclRvcFdpZHRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbVdpZHRoOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gb3B0aW9ucy5vbkFuaW1hdGlvbkVuZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIEVsZW1lbnQuc2V0QXR0cmlidXRlKGVsZW1lbnQsIHNsaWRlVG9nZ2xlQXR0cmlidXRlLCAndHJ1ZScpO1xuICAgIH07XG59KShBbmltYXRlIHx8IChBbmltYXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFuaW1hdGUuanMubWFwIiwiaW1wb3J0IHsgQW5pbWF0ZSwgRWxlbWVudCB9IGZyb20gJy4uL3V0aWxzJztcbnZhciBIaWRlO1xuKGZ1bmN0aW9uIChIaWRlKSB7XG4gICAgSGlkZS5vbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIEFuaW1hdGUuaGlkZShlbGVtZW50LCBvcHRpb25zKTtcbiAgICB9O1xufSkoSGlkZSB8fCAoSGlkZSA9IHt9KSk7XG5leHBvcnQgdmFyIGhpZGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIEhpZGUub24oRWxlbWVudC5nZXRFbGVtZW50KGVsZW1lbnQpLCBvcHRpb25zKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oaWRlLmpzLm1hcCIsImltcG9ydCB7IEFuaW1hdGUsIEVsZW1lbnQgfSBmcm9tICcuLi91dGlscyc7XG52YXIgU2hvdztcbihmdW5jdGlvbiAoU2hvdykge1xuICAgIFNob3cub24gPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICBBbmltYXRlLnNob3coZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgfTtcbn0pKFNob3cgfHwgKFNob3cgPSB7fSkpO1xuZXhwb3J0IHZhciBzaG93ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBTaG93Lm9uKEVsZW1lbnQuZ2V0RWxlbWVudChlbGVtZW50KSwgb3B0aW9ucyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hvdy5qcy5tYXAiLCJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuaW1wb3J0IHsgQW5pbWF0ZSwgRWxlbWVudCB9IGZyb20gJy4uL3V0aWxzJztcbnZhciBUb2dnbGU7XG4oZnVuY3Rpb24gKFRvZ2dsZSkge1xuICAgIHZhciBvbkhpZGVFbmQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIChfYSA9IG9wdGlvbnMub25DbG9zZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwob3B0aW9ucyk7XG4gICAgICAgICAgICAoX2IgPSBvcHRpb25zLm9uQW5pbWF0aW9uRW5kKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHZhciBvblNob3dFbmQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIChfYSA9IG9wdGlvbnMub25PcGVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChvcHRpb25zKTtcbiAgICAgICAgICAgIChfYiA9IG9wdGlvbnMub25BbmltYXRpb25FbmQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgVG9nZ2xlLm9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKEFuaW1hdGUuc2hvdWxkQ29sbGFwc2UoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIEFuaW1hdGUuaGlkZShlbGVtZW50LCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgb3B0aW9ucyksIHsgb25BbmltYXRpb25FbmQ6IG9uSGlkZUVuZChvcHRpb25zKSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBBbmltYXRlLnNob3coZWxlbWVudCwgX19hc3NpZ24oX19hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG9uQW5pbWF0aW9uRW5kOiBvblNob3dFbmQob3B0aW9ucykgfSkpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKFRvZ2dsZSB8fCAoVG9nZ2xlID0ge30pKTtcbmV4cG9ydCB2YXIgdG9nZ2xlID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICBUb2dnbGUub24oRWxlbWVudC5nZXRFbGVtZW50KGVsZW1lbnQpLCBvcHRpb25zKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2dnbGUuanMubWFwIiwiaW1wb3J0IHsgaGlkZSwgc2hvdywgdG9nZ2xlIH0gZnJvbSAnc2xpZGV0b2dnbGUnO1xyXG5cclxuaWYoICQoJy5qcy1zaG93LXJlZmVyZW5jZXMnKS5sZW5ndGggKVxyXG57XHJcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNob3ctcmVmZXJlbmNlcycpO1xyXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0b2dnbGUoJy5yZWZlcmVuY2VzX19oaWRlJywge1xyXG4gICAgICBtaWxpc2Vjb25kczogMzAwLFxyXG4gICAgICB0cmFuc2l0aW9uRnVuY3Rpb246ICdlYXNlJyxcclxuICAgICAgb25PcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgJChcIi5qcy1zaG93LXJlZmVyZW5jZXNcIikuYWRkQ2xhc3MoXCJvcGVuZWRcIik7XHJcbiAgICAgICB9LFxyXG4gICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAkKFwiLmpzLXNob3ctcmVmZXJlbmNlc1wiKS5yZW1vdmVDbGFzcyhcIm9wZW5lZFwiKTtcclxuICAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG4iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbi8qIVxuICogU3BsaWRlLmpzXG4gKiBWZXJzaW9uICA6IDQuMS40XG4gKiBMaWNlbnNlICA6IE1JVFxuICogQ29weXJpZ2h0OiAyMDIyIE5hb3Rvc2hpIEZ1aml0YVxuICovXG52YXIgTUVESUFfUFJFRkVSU19SRURVQ0VEX01PVElPTiA9IFwiKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIjtcbnZhciBDUkVBVEVEID0gMTtcbnZhciBNT1VOVEVEID0gMjtcbnZhciBJRExFID0gMztcbnZhciBNT1ZJTkcgPSA0O1xudmFyIFNDUk9MTElORyA9IDU7XG52YXIgRFJBR0dJTkcgPSA2O1xudmFyIERFU1RST1lFRCA9IDc7XG52YXIgU1RBVEVTID0ge1xuICBDUkVBVEVEOiBDUkVBVEVELFxuICBNT1VOVEVEOiBNT1VOVEVELFxuICBJRExFOiBJRExFLFxuICBNT1ZJTkc6IE1PVklORyxcbiAgU0NST0xMSU5HOiBTQ1JPTExJTkcsXG4gIERSQUdHSU5HOiBEUkFHR0lORyxcbiAgREVTVFJPWUVEOiBERVNUUk9ZRURcbn07XG5cbmZ1bmN0aW9uIGVtcHR5KGFycmF5KSB7XG4gIGFycmF5Lmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIHNsaWNlKGFycmF5TGlrZSwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyYXlMaWtlLCBzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gYXBwbHkoZnVuYykge1xuICByZXR1cm4gZnVuYy5iaW5kLmFwcGx5KGZ1bmMsIFtudWxsXS5jb25jYXQoc2xpY2UoYXJndW1lbnRzLCAxKSkpO1xufVxuXG52YXIgbmV4dFRpY2sgPSBzZXRUaW1lb3V0O1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uIG5vb3AoKSB7fTtcblxuZnVuY3Rpb24gcmFmKGZ1bmMpIHtcbiAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jKTtcbn1cblxuZnVuY3Rpb24gdHlwZU9mKHR5cGUsIHN1YmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBzdWJqZWN0ID09PSB0eXBlO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChzdWJqZWN0KSB7XG4gIHJldHVybiAhaXNOdWxsKHN1YmplY3QpICYmIHR5cGVPZihcIm9iamVjdFwiLCBzdWJqZWN0KTtcbn1cblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGlzRnVuY3Rpb24gPSBhcHBseSh0eXBlT2YsIFwiZnVuY3Rpb25cIik7XG52YXIgaXNTdHJpbmcgPSBhcHBseSh0eXBlT2YsIFwic3RyaW5nXCIpO1xudmFyIGlzVW5kZWZpbmVkID0gYXBwbHkodHlwZU9mLCBcInVuZGVmaW5lZFwiKTtcblxuZnVuY3Rpb24gaXNOdWxsKHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QgPT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzSFRNTEVsZW1lbnQoc3ViamVjdCkge1xuICB0cnkge1xuICAgIHJldHVybiBzdWJqZWN0IGluc3RhbmNlb2YgKHN1YmplY3Qub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cpLkhUTUxFbGVtZW50O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoKHZhbHVlcywgaXRlcmF0ZWUpIHtcbiAgdG9BcnJheSh2YWx1ZXMpLmZvckVhY2goaXRlcmF0ZWUpO1xufVxuXG5mdW5jdGlvbiBpbmNsdWRlcyhhcnJheSwgdmFsdWUpIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpID4gLTE7XG59XG5cbmZ1bmN0aW9uIHB1c2goYXJyYXksIGl0ZW1zKSB7XG4gIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHRvQXJyYXkoaXRlbXMpKTtcbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbG0sIGNsYXNzZXMsIGFkZCkge1xuICBpZiAoZWxtKSB7XG4gICAgZm9yRWFjaChjbGFzc2VzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgZWxtLmNsYXNzTGlzdFthZGQgPyBcImFkZFwiIDogXCJyZW1vdmVcIl0obmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWxtLCBjbGFzc2VzKSB7XG4gIHRvZ2dsZUNsYXNzKGVsbSwgaXNTdHJpbmcoY2xhc3NlcykgPyBjbGFzc2VzLnNwbGl0KFwiIFwiKSA6IGNsYXNzZXMsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmQocGFyZW50LCBjaGlsZHJlbikge1xuICBmb3JFYWNoKGNoaWxkcmVuLCBwYXJlbnQuYXBwZW5kQ2hpbGQuYmluZChwYXJlbnQpKTtcbn1cblxuZnVuY3Rpb24gYmVmb3JlKG5vZGVzLCByZWYpIHtcbiAgZm9yRWFjaChub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgcGFyZW50ID0gKHJlZiB8fCBub2RlKS5wYXJlbnROb2RlO1xuXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCByZWYpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXMoZWxtLCBzZWxlY3Rvcikge1xuICByZXR1cm4gaXNIVE1MRWxlbWVudChlbG0pICYmIChlbG1bXCJtc01hdGNoZXNTZWxlY3RvclwiXSB8fCBlbG0ubWF0Y2hlcykuY2FsbChlbG0sIHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW4ocGFyZW50LCBzZWxlY3Rvcikge1xuICB2YXIgY2hpbGRyZW4yID0gcGFyZW50ID8gc2xpY2UocGFyZW50LmNoaWxkcmVuKSA6IFtdO1xuICByZXR1cm4gc2VsZWN0b3IgPyBjaGlsZHJlbjIuZmlsdGVyKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIHJldHVybiBtYXRjaGVzKGNoaWxkLCBzZWxlY3Rvcik7XG4gIH0pIDogY2hpbGRyZW4yO1xufVxuXG5mdW5jdGlvbiBjaGlsZChwYXJlbnQsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA/IGNoaWxkcmVuKHBhcmVudCwgc2VsZWN0b3IpWzBdIDogcGFyZW50LmZpcnN0RWxlbWVudENoaWxkO1xufVxuXG52YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzO1xuXG5mdW5jdGlvbiBmb3JPd24ob2JqZWN0LCBpdGVyYXRlZSwgcmlnaHQpIHtcbiAgaWYgKG9iamVjdCkge1xuICAgIChyaWdodCA/IG93bktleXMob2JqZWN0KS5yZXZlcnNlKCkgOiBvd25LZXlzKG9iamVjdCkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAga2V5ICE9PSBcIl9fcHJvdG9fX1wiICYmIGl0ZXJhdGVlKG9iamVjdFtrZXldLCBrZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gYXNzaWduKG9iamVjdCkge1xuICBzbGljZShhcmd1bWVudHMsIDEpLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgIGZvck93bihzb3VyY2UsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gbWVyZ2Uob2JqZWN0KSB7XG4gIHNsaWNlKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgZm9yT3duKHNvdXJjZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlLnNsaWNlKCk7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBvYmplY3Rba2V5XSA9IG1lcmdlKHt9LCBpc09iamVjdChvYmplY3Rba2V5XSkgPyBvYmplY3Rba2V5XSA6IHt9LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZnVuY3Rpb24gb21pdChvYmplY3QsIGtleXMpIHtcbiAgZm9yRWFjaChrZXlzIHx8IG93bktleXMob2JqZWN0KSwgZnVuY3Rpb24gKGtleSkge1xuICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZShlbG1zLCBhdHRycykge1xuICBmb3JFYWNoKGVsbXMsIGZ1bmN0aW9uIChlbG0pIHtcbiAgICBmb3JFYWNoKGF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgZWxtICYmIGVsbS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGUoZWxtcywgYXR0cnMsIHZhbHVlKSB7XG4gIGlmIChpc09iamVjdChhdHRycykpIHtcbiAgICBmb3JPd24oYXR0cnMsIGZ1bmN0aW9uICh2YWx1ZTIsIG5hbWUpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShlbG1zLCBuYW1lLCB2YWx1ZTIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGZvckVhY2goZWxtcywgZnVuY3Rpb24gKGVsbSkge1xuICAgICAgaXNOdWxsKHZhbHVlKSB8fCB2YWx1ZSA9PT0gXCJcIiA/IHJlbW92ZUF0dHJpYnV0ZShlbG0sIGF0dHJzKSA6IGVsbS5zZXRBdHRyaWJ1dGUoYXR0cnMsIFN0cmluZyh2YWx1ZSkpO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSh0YWcsIGF0dHJzLCBwYXJlbnQpIHtcbiAgdmFyIGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuICBpZiAoYXR0cnMpIHtcbiAgICBpc1N0cmluZyhhdHRycykgPyBhZGRDbGFzcyhlbG0sIGF0dHJzKSA6IHNldEF0dHJpYnV0ZShlbG0sIGF0dHJzKTtcbiAgfVxuXG4gIHBhcmVudCAmJiBhcHBlbmQocGFyZW50LCBlbG0pO1xuICByZXR1cm4gZWxtO1xufVxuXG5mdW5jdGlvbiBzdHlsZShlbG0sIHByb3AsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShlbG0pW3Byb3BdO1xuICB9XG5cbiAgaWYgKCFpc051bGwodmFsdWUpKSB7XG4gICAgZWxtLnN0eWxlW3Byb3BdID0gXCJcIiArIHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXkoZWxtLCBkaXNwbGF5Mikge1xuICBzdHlsZShlbG0sIFwiZGlzcGxheVwiLCBkaXNwbGF5Mik7XG59XG5cbmZ1bmN0aW9uIGZvY3VzKGVsbSkge1xuICBlbG1bXCJzZXRBY3RpdmVcIl0gJiYgZWxtW1wic2V0QWN0aXZlXCJdKCkgfHwgZWxtLmZvY3VzKHtcbiAgICBwcmV2ZW50U2Nyb2xsOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGUoZWxtLCBhdHRyKSB7XG4gIHJldHVybiBlbG0uZ2V0QXR0cmlidXRlKGF0dHIpO1xufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyhlbG0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gZWxtICYmIGVsbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbn1cblxuZnVuY3Rpb24gcmVjdCh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKG5vZGVzKSB7XG4gIGZvckVhY2gobm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VIdG1sKGh0bWwpIHtcbiAgcmV0dXJuIGNoaWxkKG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIikuYm9keSk7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnQoZSwgc3RvcFByb3BhZ2F0aW9uKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBpZiAoc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5KHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHBhcmVudCAmJiBwYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsKHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID8gc2xpY2UocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSA6IFtdO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhlbG0sIGNsYXNzZXMpIHtcbiAgdG9nZ2xlQ2xhc3MoZWxtLCBjbGFzc2VzLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHRpbWVPZihlKSB7XG4gIHJldHVybiBlLnRpbWVTdGFtcDtcbn1cblxuZnVuY3Rpb24gdW5pdCh2YWx1ZSkge1xuICByZXR1cm4gaXNTdHJpbmcodmFsdWUpID8gdmFsdWUgOiB2YWx1ZSA/IHZhbHVlICsgXCJweFwiIDogXCJcIjtcbn1cblxudmFyIFBST0pFQ1RfQ09ERSA9IFwic3BsaWRlXCI7XG52YXIgREFUQV9BVFRSSUJVVEUgPSBcImRhdGEtXCIgKyBQUk9KRUNUX0NPREU7XG5cbmZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJbXCIgKyBQUk9KRUNUX0NPREUgKyBcIl0gXCIgKyAobWVzc2FnZSB8fCBcIlwiKSk7XG4gIH1cbn1cblxudmFyIG1pbiA9IE1hdGgubWluLFxuICAgIG1heCA9IE1hdGgubWF4LFxuICAgIGZsb29yID0gTWF0aC5mbG9vcixcbiAgICBjZWlsID0gTWF0aC5jZWlsLFxuICAgIGFicyA9IE1hdGguYWJzO1xuXG5mdW5jdGlvbiBhcHByb3hpbWF0ZWx5RXF1YWwoeCwgeSwgZXBzaWxvbikge1xuICByZXR1cm4gYWJzKHggLSB5KSA8IGVwc2lsb247XG59XG5cbmZ1bmN0aW9uIGJldHdlZW4obnVtYmVyLCB4LCB5LCBleGNsdXNpdmUpIHtcbiAgdmFyIG1pbmltdW0gPSBtaW4oeCwgeSk7XG4gIHZhciBtYXhpbXVtID0gbWF4KHgsIHkpO1xuICByZXR1cm4gZXhjbHVzaXZlID8gbWluaW11bSA8IG51bWJlciAmJiBudW1iZXIgPCBtYXhpbXVtIDogbWluaW11bSA8PSBudW1iZXIgJiYgbnVtYmVyIDw9IG1heGltdW07XG59XG5cbmZ1bmN0aW9uIGNsYW1wKG51bWJlciwgeCwgeSkge1xuICB2YXIgbWluaW11bSA9IG1pbih4LCB5KTtcbiAgdmFyIG1heGltdW0gPSBtYXgoeCwgeSk7XG4gIHJldHVybiBtaW4obWF4KG1pbmltdW0sIG51bWJlciksIG1heGltdW0pO1xufVxuXG5mdW5jdGlvbiBzaWduKHgpIHtcbiAgcmV0dXJuICsoeCA+IDApIC0gKyh4IDwgMCk7XG59XG5cbmZ1bmN0aW9uIGNhbWVsVG9LZWJhYihzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oW2EtejAtOV0pKFtBLVpdKS9nLCBcIiQxLSQyXCIpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdChzdHJpbmcsIHJlcGxhY2VtZW50cykge1xuICBmb3JFYWNoKHJlcGxhY2VtZW50cywgZnVuY3Rpb24gKHJlcGxhY2VtZW50KSB7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoXCIlc1wiLCBcIlwiICsgcmVwbGFjZW1lbnQpO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZztcbn1cblxuZnVuY3Rpb24gcGFkKG51bWJlcikge1xuICByZXR1cm4gbnVtYmVyIDwgMTAgPyBcIjBcIiArIG51bWJlciA6IFwiXCIgKyBudW1iZXI7XG59XG5cbnZhciBpZHMgPSB7fTtcblxuZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG4gIHJldHVybiBcIlwiICsgcHJlZml4ICsgcGFkKGlkc1twcmVmaXhdID0gKGlkc1twcmVmaXhdIHx8IDApICsgMSk7XG59XG5cbmZ1bmN0aW9uIEV2ZW50QmluZGVyKCkge1xuICB2YXIgbGlzdGVuZXJzID0gW107XG5cbiAgZnVuY3Rpb24gYmluZCh0YXJnZXRzLCBldmVudHMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgZm9yRWFjaEV2ZW50KHRhcmdldHMsIGV2ZW50cywgZnVuY3Rpb24gKHRhcmdldCwgZXZlbnQsIG5hbWVzcGFjZSkge1xuICAgICAgdmFyIGlzRXZlbnRUYXJnZXQgPSAoXCJhZGRFdmVudExpc3RlbmVyXCIgaW4gdGFyZ2V0KTtcbiAgICAgIHZhciByZW1vdmVyID0gaXNFdmVudFRhcmdldCA/IHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyLmJpbmQodGFyZ2V0LCBldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIDogdGFyZ2V0W1wicmVtb3ZlTGlzdGVuZXJcIl0uYmluZCh0YXJnZXQsIGNhbGxiYWNrKTtcbiAgICAgIGlzRXZlbnRUYXJnZXQgPyB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIG9wdGlvbnMpIDogdGFyZ2V0W1wiYWRkTGlzdGVuZXJcIl0oY2FsbGJhY2spO1xuICAgICAgbGlzdGVuZXJzLnB1c2goW3RhcmdldCwgZXZlbnQsIG5hbWVzcGFjZSwgY2FsbGJhY2ssIHJlbW92ZXJdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuYmluZCh0YXJnZXRzLCBldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgZm9yRWFjaEV2ZW50KHRhcmdldHMsIGV2ZW50cywgZnVuY3Rpb24gKHRhcmdldCwgZXZlbnQsIG5hbWVzcGFjZSkge1xuICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyWzBdID09PSB0YXJnZXQgJiYgbGlzdGVuZXJbMV0gPT09IGV2ZW50ICYmIGxpc3RlbmVyWzJdID09PSBuYW1lc3BhY2UgJiYgKCFjYWxsYmFjayB8fCBsaXN0ZW5lclszXSA9PT0gY2FsbGJhY2spKSB7XG4gICAgICAgICAgbGlzdGVuZXJbNF0oKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGF0Y2godGFyZ2V0LCB0eXBlLCBkZXRhaWwpIHtcbiAgICB2YXIgZTtcbiAgICB2YXIgYnViYmxlcyA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGUgPSBuZXcgQ3VzdG9tRXZlbnQodHlwZSwge1xuICAgICAgICBidWJibGVzOiBidWJibGVzLFxuICAgICAgICBkZXRhaWw6IGRldGFpbFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgYnViYmxlcywgZmFsc2UsIGRldGFpbCk7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgcmV0dXJuIGU7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JFYWNoRXZlbnQodGFyZ2V0cywgZXZlbnRzLCBpdGVyYXRlZSkge1xuICAgIGZvckVhY2godGFyZ2V0cywgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdGFyZ2V0ICYmIGZvckVhY2goZXZlbnRzLCBmdW5jdGlvbiAoZXZlbnRzMikge1xuICAgICAgICBldmVudHMyLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5TKSB7XG4gICAgICAgICAgdmFyIGZyYWdtZW50ID0gZXZlbnROUy5zcGxpdChcIi5cIik7XG4gICAgICAgICAgaXRlcmF0ZWUodGFyZ2V0LCBmcmFnbWVudFswXSwgZnJhZ21lbnRbMV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgZGF0YVs0XSgpO1xuICAgIH0pO1xuICAgIGVtcHR5KGxpc3RlbmVycyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJpbmQ6IGJpbmQsXG4gICAgdW5iaW5kOiB1bmJpbmQsXG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcbn1cblxudmFyIEVWRU5UX01PVU5URUQgPSBcIm1vdW50ZWRcIjtcbnZhciBFVkVOVF9SRUFEWSA9IFwicmVhZHlcIjtcbnZhciBFVkVOVF9NT1ZFID0gXCJtb3ZlXCI7XG52YXIgRVZFTlRfTU9WRUQgPSBcIm1vdmVkXCI7XG52YXIgRVZFTlRfQ0xJQ0sgPSBcImNsaWNrXCI7XG52YXIgRVZFTlRfQUNUSVZFID0gXCJhY3RpdmVcIjtcbnZhciBFVkVOVF9JTkFDVElWRSA9IFwiaW5hY3RpdmVcIjtcbnZhciBFVkVOVF9WSVNJQkxFID0gXCJ2aXNpYmxlXCI7XG52YXIgRVZFTlRfSElEREVOID0gXCJoaWRkZW5cIjtcbnZhciBFVkVOVF9SRUZSRVNIID0gXCJyZWZyZXNoXCI7XG52YXIgRVZFTlRfVVBEQVRFRCA9IFwidXBkYXRlZFwiO1xudmFyIEVWRU5UX1JFU0laRSA9IFwicmVzaXplXCI7XG52YXIgRVZFTlRfUkVTSVpFRCA9IFwicmVzaXplZFwiO1xudmFyIEVWRU5UX0RSQUcgPSBcImRyYWdcIjtcbnZhciBFVkVOVF9EUkFHR0lORyA9IFwiZHJhZ2dpbmdcIjtcbnZhciBFVkVOVF9EUkFHR0VEID0gXCJkcmFnZ2VkXCI7XG52YXIgRVZFTlRfU0NST0xMID0gXCJzY3JvbGxcIjtcbnZhciBFVkVOVF9TQ1JPTExFRCA9IFwic2Nyb2xsZWRcIjtcbnZhciBFVkVOVF9PVkVSRkxPVyA9IFwib3ZlcmZsb3dcIjtcbnZhciBFVkVOVF9ERVNUUk9ZID0gXCJkZXN0cm95XCI7XG52YXIgRVZFTlRfQVJST1dTX01PVU5URUQgPSBcImFycm93czptb3VudGVkXCI7XG52YXIgRVZFTlRfQVJST1dTX1VQREFURUQgPSBcImFycm93czp1cGRhdGVkXCI7XG52YXIgRVZFTlRfUEFHSU5BVElPTl9NT1VOVEVEID0gXCJwYWdpbmF0aW9uOm1vdW50ZWRcIjtcbnZhciBFVkVOVF9QQUdJTkFUSU9OX1VQREFURUQgPSBcInBhZ2luYXRpb246dXBkYXRlZFwiO1xudmFyIEVWRU5UX05BVklHQVRJT05fTU9VTlRFRCA9IFwibmF2aWdhdGlvbjptb3VudGVkXCI7XG52YXIgRVZFTlRfQVVUT1BMQVlfUExBWSA9IFwiYXV0b3BsYXk6cGxheVwiO1xudmFyIEVWRU5UX0FVVE9QTEFZX1BMQVlJTkcgPSBcImF1dG9wbGF5OnBsYXlpbmdcIjtcbnZhciBFVkVOVF9BVVRPUExBWV9QQVVTRSA9IFwiYXV0b3BsYXk6cGF1c2VcIjtcbnZhciBFVkVOVF9MQVpZTE9BRF9MT0FERUQgPSBcImxhenlsb2FkOmxvYWRlZFwiO1xudmFyIEVWRU5UX1NMSURFX0tFWURPV04gPSBcInNrXCI7XG52YXIgRVZFTlRfU0hJRlRFRCA9IFwic2hcIjtcbnZhciBFVkVOVF9FTkRfSU5ERVhfQ0hBTkdFRCA9IFwiZWlcIjtcblxuZnVuY3Rpb24gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMikge1xuICB2YXIgYnVzID0gU3BsaWRlMiA/IFNwbGlkZTIuZXZlbnQuYnVzIDogZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB2YXIgYmluZGVyID0gRXZlbnRCaW5kZXIoKTtcblxuICBmdW5jdGlvbiBvbihldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgYmluZGVyLmJpbmQoYnVzLCB0b0FycmF5KGV2ZW50cykuam9pbihcIiBcIiksIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjYWxsYmFjay5hcHBseShjYWxsYmFjaywgaXNBcnJheShlLmRldGFpbCkgPyBlLmRldGFpbCA6IFtdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICBiaW5kZXIuZGlzcGF0Y2goYnVzLCBldmVudCwgc2xpY2UoYXJndW1lbnRzLCAxKSk7XG4gIH1cblxuICBpZiAoU3BsaWRlMikge1xuICAgIFNwbGlkZTIuZXZlbnQub24oRVZFTlRfREVTVFJPWSwgYmluZGVyLmRlc3Ryb3kpO1xuICB9XG5cbiAgcmV0dXJuIGFzc2lnbihiaW5kZXIsIHtcbiAgICBidXM6IGJ1cyxcbiAgICBvbjogb24sXG4gICAgb2ZmOiBhcHBseShiaW5kZXIudW5iaW5kLCBidXMpLFxuICAgIGVtaXQ6IGVtaXRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIFJlcXVlc3RJbnRlcnZhbChpbnRlcnZhbCwgb25JbnRlcnZhbCwgb25VcGRhdGUsIGxpbWl0KSB7XG4gIHZhciBub3cgPSBEYXRlLm5vdztcbiAgdmFyIHN0YXJ0VGltZTtcbiAgdmFyIHJhdGUgPSAwO1xuICB2YXIgaWQ7XG4gIHZhciBwYXVzZWQgPSB0cnVlO1xuICB2YXIgY291bnQgPSAwO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoIXBhdXNlZCkge1xuICAgICAgcmF0ZSA9IGludGVydmFsID8gbWluKChub3coKSAtIHN0YXJ0VGltZSkgLyBpbnRlcnZhbCwgMSkgOiAxO1xuICAgICAgb25VcGRhdGUgJiYgb25VcGRhdGUocmF0ZSk7XG5cbiAgICAgIGlmIChyYXRlID49IDEpIHtcbiAgICAgICAgb25JbnRlcnZhbCgpO1xuICAgICAgICBzdGFydFRpbWUgPSBub3coKTtcblxuICAgICAgICBpZiAobGltaXQgJiYgKytjb3VudCA+PSBsaW1pdCkge1xuICAgICAgICAgIHJldHVybiBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlkID0gcmFmKHVwZGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQocmVzdW1lKSB7XG4gICAgcmVzdW1lIHx8IGNhbmNlbCgpO1xuICAgIHN0YXJ0VGltZSA9IG5vdygpIC0gKHJlc3VtZSA/IHJhdGUgKiBpbnRlcnZhbCA6IDApO1xuICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgIGlkID0gcmFmKHVwZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV3aW5kKCkge1xuICAgIHN0YXJ0VGltZSA9IG5vdygpO1xuICAgIHJhdGUgPSAwO1xuXG4gICAgaWYgKG9uVXBkYXRlKSB7XG4gICAgICBvblVwZGF0ZShyYXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWQgJiYgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgIHJhdGUgPSAwO1xuICAgIGlkID0gMDtcbiAgICBwYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0KHRpbWUpIHtcbiAgICBpbnRlcnZhbCA9IHRpbWU7XG4gIH1cblxuICBmdW5jdGlvbiBpc1BhdXNlZCgpIHtcbiAgICByZXR1cm4gcGF1c2VkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydDogc3RhcnQsXG4gICAgcmV3aW5kOiByZXdpbmQsXG4gICAgcGF1c2U6IHBhdXNlLFxuICAgIGNhbmNlbDogY2FuY2VsLFxuICAgIHNldDogc2V0LFxuICAgIGlzUGF1c2VkOiBpc1BhdXNlZFxuICB9O1xufVxuXG5mdW5jdGlvbiBTdGF0ZShpbml0aWFsU3RhdGUpIHtcbiAgdmFyIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuXG4gIGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgIHN0YXRlID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBpcyhzdGF0ZXMpIHtcbiAgICByZXR1cm4gaW5jbHVkZXModG9BcnJheShzdGF0ZXMpLCBzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNldDogc2V0LFxuICAgIGlzOiBpc1xuICB9O1xufVxuXG5mdW5jdGlvbiBUaHJvdHRsZShmdW5jLCBkdXJhdGlvbikge1xuICB2YXIgaW50ZXJ2YWwgPSBSZXF1ZXN0SW50ZXJ2YWwoZHVyYXRpb24gfHwgMCwgZnVuYywgbnVsbCwgMSk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaW50ZXJ2YWwuaXNQYXVzZWQoKSAmJiBpbnRlcnZhbC5zdGFydCgpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBNZWRpYShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgc3RhdGUgPSBTcGxpZGUyLnN0YXRlO1xuICB2YXIgYnJlYWtwb2ludHMgPSBvcHRpb25zLmJyZWFrcG9pbnRzIHx8IHt9O1xuICB2YXIgcmVkdWNlZE1vdGlvbiA9IG9wdGlvbnMucmVkdWNlZE1vdGlvbiB8fCB7fTtcbiAgdmFyIGJpbmRlciA9IEV2ZW50QmluZGVyKCk7XG4gIHZhciBxdWVyaWVzID0gW107XG5cbiAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgdmFyIGlzTWluID0gb3B0aW9ucy5tZWRpYVF1ZXJ5ID09PSBcIm1pblwiO1xuICAgIG93bktleXMoYnJlYWtwb2ludHMpLnNvcnQoZnVuY3Rpb24gKG4sIG0pIHtcbiAgICAgIHJldHVybiBpc01pbiA/ICtuIC0gK20gOiArbSAtICtuO1xuICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmVnaXN0ZXIoYnJlYWtwb2ludHNba2V5XSwgXCIoXCIgKyAoaXNNaW4gPyBcIm1pblwiIDogXCJtYXhcIikgKyBcIi13aWR0aDpcIiArIGtleSArIFwicHgpXCIpO1xuICAgIH0pO1xuICAgIHJlZ2lzdGVyKHJlZHVjZWRNb3Rpb24sIE1FRElBX1BSRUZFUlNfUkVEVUNFRF9NT1RJT04pO1xuICAgIHVwZGF0ZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveShjb21wbGV0ZWx5KSB7XG4gICAgaWYgKGNvbXBsZXRlbHkpIHtcbiAgICAgIGJpbmRlci5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXIob3B0aW9uczIsIHF1ZXJ5KSB7XG4gICAgdmFyIHF1ZXJ5TGlzdCA9IG1hdGNoTWVkaWEocXVlcnkpO1xuICAgIGJpbmRlci5iaW5kKHF1ZXJ5TGlzdCwgXCJjaGFuZ2VcIiwgdXBkYXRlKTtcbiAgICBxdWVyaWVzLnB1c2goW29wdGlvbnMyLCBxdWVyeUxpc3RdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgZGVzdHJveWVkID0gc3RhdGUuaXMoREVTVFJPWUVEKTtcbiAgICB2YXIgZGlyZWN0aW9uID0gb3B0aW9ucy5kaXJlY3Rpb247XG4gICAgdmFyIG1lcmdlZCA9IHF1ZXJpZXMucmVkdWNlKGZ1bmN0aW9uIChtZXJnZWQyLCBlbnRyeSkge1xuICAgICAgcmV0dXJuIG1lcmdlKG1lcmdlZDIsIGVudHJ5WzFdLm1hdGNoZXMgPyBlbnRyeVswXSA6IHt9KTtcbiAgICB9LCB7fSk7XG4gICAgb21pdChvcHRpb25zKTtcbiAgICBzZXQobWVyZ2VkKTtcblxuICAgIGlmIChvcHRpb25zLmRlc3Ryb3kpIHtcbiAgICAgIFNwbGlkZTIuZGVzdHJveShvcHRpb25zLmRlc3Ryb3kgPT09IFwiY29tcGxldGVseVwiKTtcbiAgICB9IGVsc2UgaWYgKGRlc3Ryb3llZCkge1xuICAgICAgZGVzdHJveSh0cnVlKTtcbiAgICAgIFNwbGlkZTIubW91bnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9uICE9PSBvcHRpb25zLmRpcmVjdGlvbiAmJiBTcGxpZGUyLnJlZnJlc2goKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWR1Y2UoZW5hYmxlKSB7XG4gICAgaWYgKG1hdGNoTWVkaWEoTUVESUFfUFJFRkVSU19SRURVQ0VEX01PVElPTikubWF0Y2hlcykge1xuICAgICAgZW5hYmxlID8gbWVyZ2Uob3B0aW9ucywgcmVkdWNlZE1vdGlvbikgOiBvbWl0KG9wdGlvbnMsIG93bktleXMocmVkdWNlZE1vdGlvbikpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldChvcHRzLCBiYXNlLCBub3RpZnkpIHtcbiAgICBtZXJnZShvcHRpb25zLCBvcHRzKTtcbiAgICBiYXNlICYmIG1lcmdlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvcHRpb25zKSwgb3B0cyk7XG5cbiAgICBpZiAobm90aWZ5IHx8ICFzdGF0ZS5pcyhDUkVBVEVEKSkge1xuICAgICAgU3BsaWRlMi5lbWl0KEVWRU5UX1VQREFURUQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0dXA6IHNldHVwLFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgcmVkdWNlOiByZWR1Y2UsXG4gICAgc2V0OiBzZXRcbiAgfTtcbn1cblxudmFyIEFSUk9XID0gXCJBcnJvd1wiO1xudmFyIEFSUk9XX0xFRlQgPSBBUlJPVyArIFwiTGVmdFwiO1xudmFyIEFSUk9XX1JJR0hUID0gQVJST1cgKyBcIlJpZ2h0XCI7XG52YXIgQVJST1dfVVAgPSBBUlJPVyArIFwiVXBcIjtcbnZhciBBUlJPV19ET1dOID0gQVJST1cgKyBcIkRvd25cIjtcbnZhciBMVFIgPSBcImx0clwiO1xudmFyIFJUTCA9IFwicnRsXCI7XG52YXIgVFRCID0gXCJ0dGJcIjtcbnZhciBPUklFTlRBVElPTl9NQVAgPSB7XG4gIHdpZHRoOiBbXCJoZWlnaHRcIl0sXG4gIGxlZnQ6IFtcInRvcFwiLCBcInJpZ2h0XCJdLFxuICByaWdodDogW1wiYm90dG9tXCIsIFwibGVmdFwiXSxcbiAgeDogW1wieVwiXSxcbiAgWDogW1wiWVwiXSxcbiAgWTogW1wiWFwiXSxcbiAgQXJyb3dMZWZ0OiBbQVJST1dfVVAsIEFSUk9XX1JJR0hUXSxcbiAgQXJyb3dSaWdodDogW0FSUk9XX0RPV04sIEFSUk9XX0xFRlRdXG59O1xuXG5mdW5jdGlvbiBEaXJlY3Rpb24oU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgZnVuY3Rpb24gcmVzb2x2ZShwcm9wLCBheGlzT25seSwgZGlyZWN0aW9uKSB7XG4gICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uIHx8IG9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIHZhciBpbmRleCA9IGRpcmVjdGlvbiA9PT0gUlRMICYmICFheGlzT25seSA/IDEgOiBkaXJlY3Rpb24gPT09IFRUQiA/IDAgOiAtMTtcbiAgICByZXR1cm4gT1JJRU5UQVRJT05fTUFQW3Byb3BdICYmIE9SSUVOVEFUSU9OX01BUFtwcm9wXVtpbmRleF0gfHwgcHJvcC5yZXBsYWNlKC93aWR0aHxsZWZ0fHJpZ2h0L2ksIGZ1bmN0aW9uIChtYXRjaCwgb2Zmc2V0KSB7XG4gICAgICB2YXIgcmVwbGFjZW1lbnQgPSBPUklFTlRBVElPTl9NQVBbbWF0Y2gudG9Mb3dlckNhc2UoKV1baW5kZXhdIHx8IG1hdGNoO1xuICAgICAgcmV0dXJuIG9mZnNldCA+IDAgPyByZXBsYWNlbWVudC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlcGxhY2VtZW50LnNsaWNlKDEpIDogcmVwbGFjZW1lbnQ7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvcmllbnQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgKiAob3B0aW9ucy5kaXJlY3Rpb24gPT09IFJUTCA/IDEgOiAtMSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgb3JpZW50OiBvcmllbnRcbiAgfTtcbn1cblxudmFyIFJPTEUgPSBcInJvbGVcIjtcbnZhciBUQUJfSU5ERVggPSBcInRhYmluZGV4XCI7XG52YXIgRElTQUJMRUQgPSBcImRpc2FibGVkXCI7XG52YXIgQVJJQV9QUkVGSVggPSBcImFyaWEtXCI7XG52YXIgQVJJQV9DT05UUk9MUyA9IEFSSUFfUFJFRklYICsgXCJjb250cm9sc1wiO1xudmFyIEFSSUFfQ1VSUkVOVCA9IEFSSUFfUFJFRklYICsgXCJjdXJyZW50XCI7XG52YXIgQVJJQV9TRUxFQ1RFRCA9IEFSSUFfUFJFRklYICsgXCJzZWxlY3RlZFwiO1xudmFyIEFSSUFfTEFCRUwgPSBBUklBX1BSRUZJWCArIFwibGFiZWxcIjtcbnZhciBBUklBX0xBQkVMTEVEQlkgPSBBUklBX1BSRUZJWCArIFwibGFiZWxsZWRieVwiO1xudmFyIEFSSUFfSElEREVOID0gQVJJQV9QUkVGSVggKyBcImhpZGRlblwiO1xudmFyIEFSSUFfT1JJRU5UQVRJT04gPSBBUklBX1BSRUZJWCArIFwib3JpZW50YXRpb25cIjtcbnZhciBBUklBX1JPTEVERVNDUklQVElPTiA9IEFSSUFfUFJFRklYICsgXCJyb2xlZGVzY3JpcHRpb25cIjtcbnZhciBBUklBX0xJVkUgPSBBUklBX1BSRUZJWCArIFwibGl2ZVwiO1xudmFyIEFSSUFfQlVTWSA9IEFSSUFfUFJFRklYICsgXCJidXN5XCI7XG52YXIgQVJJQV9BVE9NSUMgPSBBUklBX1BSRUZJWCArIFwiYXRvbWljXCI7XG52YXIgQUxMX0FUVFJJQlVURVMgPSBbUk9MRSwgVEFCX0lOREVYLCBESVNBQkxFRCwgQVJJQV9DT05UUk9MUywgQVJJQV9DVVJSRU5ULCBBUklBX0xBQkVMLCBBUklBX0xBQkVMTEVEQlksIEFSSUFfSElEREVOLCBBUklBX09SSUVOVEFUSU9OLCBBUklBX1JPTEVERVNDUklQVElPTl07XG52YXIgQ0xBU1NfUFJFRklYID0gUFJPSkVDVF9DT0RFICsgXCJfX1wiO1xudmFyIFNUQVRVU19DTEFTU19QUkVGSVggPSBcImlzLVwiO1xudmFyIENMQVNTX1JPT1QgPSBQUk9KRUNUX0NPREU7XG52YXIgQ0xBU1NfVFJBQ0sgPSBDTEFTU19QUkVGSVggKyBcInRyYWNrXCI7XG52YXIgQ0xBU1NfTElTVCA9IENMQVNTX1BSRUZJWCArIFwibGlzdFwiO1xudmFyIENMQVNTX1NMSURFID0gQ0xBU1NfUFJFRklYICsgXCJzbGlkZVwiO1xudmFyIENMQVNTX0NMT05FID0gQ0xBU1NfU0xJREUgKyBcIi0tY2xvbmVcIjtcbnZhciBDTEFTU19DT05UQUlORVIgPSBDTEFTU19TTElERSArIFwiX19jb250YWluZXJcIjtcbnZhciBDTEFTU19BUlJPV1MgPSBDTEFTU19QUkVGSVggKyBcImFycm93c1wiO1xudmFyIENMQVNTX0FSUk9XID0gQ0xBU1NfUFJFRklYICsgXCJhcnJvd1wiO1xudmFyIENMQVNTX0FSUk9XX1BSRVYgPSBDTEFTU19BUlJPVyArIFwiLS1wcmV2XCI7XG52YXIgQ0xBU1NfQVJST1dfTkVYVCA9IENMQVNTX0FSUk9XICsgXCItLW5leHRcIjtcbnZhciBDTEFTU19QQUdJTkFUSU9OID0gQ0xBU1NfUFJFRklYICsgXCJwYWdpbmF0aW9uXCI7XG52YXIgQ0xBU1NfUEFHSU5BVElPTl9QQUdFID0gQ0xBU1NfUEFHSU5BVElPTiArIFwiX19wYWdlXCI7XG52YXIgQ0xBU1NfUFJPR1JFU1MgPSBDTEFTU19QUkVGSVggKyBcInByb2dyZXNzXCI7XG52YXIgQ0xBU1NfUFJPR1JFU1NfQkFSID0gQ0xBU1NfUFJPR1JFU1MgKyBcIl9fYmFyXCI7XG52YXIgQ0xBU1NfVE9HR0xFID0gQ0xBU1NfUFJFRklYICsgXCJ0b2dnbGVcIjtcbnZhciBDTEFTU19UT0dHTEVfUExBWSA9IENMQVNTX1RPR0dMRSArIFwiX19wbGF5XCI7XG52YXIgQ0xBU1NfVE9HR0xFX1BBVVNFID0gQ0xBU1NfVE9HR0xFICsgXCJfX3BhdXNlXCI7XG52YXIgQ0xBU1NfU1BJTk5FUiA9IENMQVNTX1BSRUZJWCArIFwic3Bpbm5lclwiO1xudmFyIENMQVNTX1NSID0gQ0xBU1NfUFJFRklYICsgXCJzclwiO1xudmFyIENMQVNTX0lOSVRJQUxJWkVEID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwiaW5pdGlhbGl6ZWRcIjtcbnZhciBDTEFTU19BQ1RJVkUgPSBTVEFUVVNfQ0xBU1NfUFJFRklYICsgXCJhY3RpdmVcIjtcbnZhciBDTEFTU19QUkVWID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwicHJldlwiO1xudmFyIENMQVNTX05FWFQgPSBTVEFUVVNfQ0xBU1NfUFJFRklYICsgXCJuZXh0XCI7XG52YXIgQ0xBU1NfVklTSUJMRSA9IFNUQVRVU19DTEFTU19QUkVGSVggKyBcInZpc2libGVcIjtcbnZhciBDTEFTU19MT0FESU5HID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwibG9hZGluZ1wiO1xudmFyIENMQVNTX0ZPQ1VTX0lOID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwiZm9jdXMtaW5cIjtcbnZhciBDTEFTU19PVkVSRkxPVyA9IFNUQVRVU19DTEFTU19QUkVGSVggKyBcIm92ZXJmbG93XCI7XG52YXIgU1RBVFVTX0NMQVNTRVMgPSBbQ0xBU1NfQUNUSVZFLCBDTEFTU19WSVNJQkxFLCBDTEFTU19QUkVWLCBDTEFTU19ORVhULCBDTEFTU19MT0FESU5HLCBDTEFTU19GT0NVU19JTiwgQ0xBU1NfT1ZFUkZMT1ddO1xudmFyIENMQVNTRVMgPSB7XG4gIHNsaWRlOiBDTEFTU19TTElERSxcbiAgY2xvbmU6IENMQVNTX0NMT05FLFxuICBhcnJvd3M6IENMQVNTX0FSUk9XUyxcbiAgYXJyb3c6IENMQVNTX0FSUk9XLFxuICBwcmV2OiBDTEFTU19BUlJPV19QUkVWLFxuICBuZXh0OiBDTEFTU19BUlJPV19ORVhULFxuICBwYWdpbmF0aW9uOiBDTEFTU19QQUdJTkFUSU9OLFxuICBwYWdlOiBDTEFTU19QQUdJTkFUSU9OX1BBR0UsXG4gIHNwaW5uZXI6IENMQVNTX1NQSU5ORVJcbn07XG5cbmZ1bmN0aW9uIGNsb3Nlc3QoZnJvbSwgc2VsZWN0b3IpIHtcbiAgaWYgKGlzRnVuY3Rpb24oZnJvbS5jbG9zZXN0KSkge1xuICAgIHJldHVybiBmcm9tLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICB9XG5cbiAgdmFyIGVsbSA9IGZyb207XG5cbiAgd2hpbGUgKGVsbSAmJiBlbG0ubm9kZVR5cGUgPT09IDEpIHtcbiAgICBpZiAobWF0Y2hlcyhlbG0sIHNlbGVjdG9yKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZWxtID0gZWxtLnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gZWxtO1xufVxuXG52YXIgRlJJQ1RJT04gPSA1O1xudmFyIExPR19JTlRFUlZBTCA9IDIwMDtcbnZhciBQT0lOVEVSX0RPV05fRVZFTlRTID0gXCJ0b3VjaHN0YXJ0IG1vdXNlZG93blwiO1xudmFyIFBPSU5URVJfTU9WRV9FVkVOVFMgPSBcInRvdWNobW92ZSBtb3VzZW1vdmVcIjtcbnZhciBQT0lOVEVSX1VQX0VWRU5UUyA9IFwidG91Y2hlbmQgdG91Y2hjYW5jZWwgbW91c2V1cCBjbGlja1wiO1xuXG5mdW5jdGlvbiBFbGVtZW50cyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZS5vbixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UuYmluZDtcblxuICB2YXIgcm9vdCA9IFNwbGlkZTIucm9vdDtcbiAgdmFyIGkxOG4gPSBvcHRpb25zLmkxOG47XG4gIHZhciBlbGVtZW50cyA9IHt9O1xuICB2YXIgc2xpZGVzID0gW107XG4gIHZhciByb290Q2xhc3NlcyA9IFtdO1xuICB2YXIgdHJhY2tDbGFzc2VzID0gW107XG4gIHZhciB0cmFjaztcbiAgdmFyIGxpc3Q7XG4gIHZhciBpc1VzaW5nS2V5O1xuXG4gIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGNvbGxlY3QoKTtcbiAgICBpbml0KCk7XG4gICAgdXBkYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBkZXN0cm95KTtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBzZXR1cCk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgdXBkYXRlKTtcbiAgICBiaW5kKGRvY3VtZW50LCBQT0lOVEVSX0RPV05fRVZFTlRTICsgXCIga2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaXNVc2luZ0tleSA9IGUudHlwZSA9PT0gXCJrZXlkb3duXCI7XG4gICAgfSwge1xuICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgIH0pO1xuICAgIGJpbmQocm9vdCwgXCJmb2N1c2luXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRvZ2dsZUNsYXNzKHJvb3QsIENMQVNTX0ZPQ1VTX0lOLCAhIWlzVXNpbmdLZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveShjb21wbGV0ZWx5KSB7XG4gICAgdmFyIGF0dHJzID0gQUxMX0FUVFJJQlVURVMuY29uY2F0KFwic3R5bGVcIik7XG4gICAgZW1wdHkoc2xpZGVzKTtcbiAgICByZW1vdmVDbGFzcyhyb290LCByb290Q2xhc3Nlcyk7XG4gICAgcmVtb3ZlQ2xhc3ModHJhY2ssIHRyYWNrQ2xhc3Nlcyk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKFt0cmFjaywgbGlzdF0sIGF0dHJzKTtcbiAgICByZW1vdmVBdHRyaWJ1dGUocm9vdCwgY29tcGxldGVseSA/IGF0dHJzIDogW1wic3R5bGVcIiwgQVJJQV9ST0xFREVTQ1JJUFRJT05dKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICByZW1vdmVDbGFzcyhyb290LCByb290Q2xhc3Nlcyk7XG4gICAgcmVtb3ZlQ2xhc3ModHJhY2ssIHRyYWNrQ2xhc3Nlcyk7XG4gICAgcm9vdENsYXNzZXMgPSBnZXRDbGFzc2VzKENMQVNTX1JPT1QpO1xuICAgIHRyYWNrQ2xhc3NlcyA9IGdldENsYXNzZXMoQ0xBU1NfVFJBQ0spO1xuICAgIGFkZENsYXNzKHJvb3QsIHJvb3RDbGFzc2VzKTtcbiAgICBhZGRDbGFzcyh0cmFjaywgdHJhY2tDbGFzc2VzKTtcbiAgICBzZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTCwgb3B0aW9ucy5sYWJlbCk7XG4gICAgc2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfTEFCRUxMRURCWSwgb3B0aW9ucy5sYWJlbGxlZGJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbGxlY3QoKSB7XG4gICAgdHJhY2sgPSBmaW5kKFwiLlwiICsgQ0xBU1NfVFJBQ0spO1xuICAgIGxpc3QgPSBjaGlsZCh0cmFjaywgXCIuXCIgKyBDTEFTU19MSVNUKTtcbiAgICBhc3NlcnQodHJhY2sgJiYgbGlzdCwgXCJBIHRyYWNrL2xpc3QgZWxlbWVudCBpcyBtaXNzaW5nLlwiKTtcbiAgICBwdXNoKHNsaWRlcywgY2hpbGRyZW4obGlzdCwgXCIuXCIgKyBDTEFTU19TTElERSArIFwiOm5vdCguXCIgKyBDTEFTU19DTE9ORSArIFwiKVwiKSk7XG4gICAgZm9yT3duKHtcbiAgICAgIGFycm93czogQ0xBU1NfQVJST1dTLFxuICAgICAgcGFnaW5hdGlvbjogQ0xBU1NfUEFHSU5BVElPTixcbiAgICAgIHByZXY6IENMQVNTX0FSUk9XX1BSRVYsXG4gICAgICBuZXh0OiBDTEFTU19BUlJPV19ORVhULFxuICAgICAgYmFyOiBDTEFTU19QUk9HUkVTU19CQVIsXG4gICAgICB0b2dnbGU6IENMQVNTX1RPR0dMRVxuICAgIH0sIGZ1bmN0aW9uIChjbGFzc05hbWUsIGtleSkge1xuICAgICAgZWxlbWVudHNba2V5XSA9IGZpbmQoXCIuXCIgKyBjbGFzc05hbWUpO1xuICAgIH0pO1xuICAgIGFzc2lnbihlbGVtZW50cywge1xuICAgICAgcm9vdDogcm9vdCxcbiAgICAgIHRyYWNrOiB0cmFjayxcbiAgICAgIGxpc3Q6IGxpc3QsXG4gICAgICBzbGlkZXM6IHNsaWRlc1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgaWQgPSByb290LmlkIHx8IHVuaXF1ZUlkKFBST0pFQ1RfQ09ERSk7XG4gICAgdmFyIHJvbGUgPSBvcHRpb25zLnJvbGU7XG4gICAgcm9vdC5pZCA9IGlkO1xuICAgIHRyYWNrLmlkID0gdHJhY2suaWQgfHwgaWQgKyBcIi10cmFja1wiO1xuICAgIGxpc3QuaWQgPSBsaXN0LmlkIHx8IGlkICsgXCItbGlzdFwiO1xuXG4gICAgaWYgKCFnZXRBdHRyaWJ1dGUocm9vdCwgUk9MRSkgJiYgcm9vdC50YWdOYW1lICE9PSBcIlNFQ1RJT05cIiAmJiByb2xlKSB7XG4gICAgICBzZXRBdHRyaWJ1dGUocm9vdCwgUk9MRSwgcm9sZSk7XG4gICAgfVxuXG4gICAgc2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfUk9MRURFU0NSSVBUSU9OLCBpMThuLmNhcm91c2VsKTtcbiAgICBzZXRBdHRyaWJ1dGUobGlzdCwgUk9MRSwgXCJwcmVzZW50YXRpb25cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG4gICAgdmFyIGVsbSA9IHF1ZXJ5KHJvb3QsIHNlbGVjdG9yKTtcbiAgICByZXR1cm4gZWxtICYmIGNsb3Nlc3QoZWxtLCBcIi5cIiArIENMQVNTX1JPT1QpID09PSByb290ID8gZWxtIDogdm9pZCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NlcyhiYXNlKSB7XG4gICAgcmV0dXJuIFtiYXNlICsgXCItLVwiICsgb3B0aW9ucy50eXBlLCBiYXNlICsgXCItLVwiICsgb3B0aW9ucy5kaXJlY3Rpb24sIG9wdGlvbnMuZHJhZyAmJiBiYXNlICsgXCItLWRyYWdnYWJsZVwiLCBvcHRpb25zLmlzTmF2aWdhdGlvbiAmJiBiYXNlICsgXCItLW5hdlwiLCBiYXNlID09PSBDTEFTU19ST09UICYmIENMQVNTX0FDVElWRV07XG4gIH1cblxuICByZXR1cm4gYXNzaWduKGVsZW1lbnRzLCB7XG4gICAgc2V0dXA6IHNldHVwLFxuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH0pO1xufVxuXG52YXIgU0xJREUgPSBcInNsaWRlXCI7XG52YXIgTE9PUCA9IFwibG9vcFwiO1xudmFyIEZBREUgPSBcImZhZGVcIjtcblxuZnVuY3Rpb24gU2xpZGUkMShTcGxpZGUyLCBpbmRleCwgc2xpZGVJbmRleCwgc2xpZGUpIHtcbiAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMik7XG4gIHZhciBvbiA9IGV2ZW50Lm9uLFxuICAgICAgZW1pdCA9IGV2ZW50LmVtaXQsXG4gICAgICBiaW5kID0gZXZlbnQuYmluZDtcbiAgdmFyIENvbXBvbmVudHMgPSBTcGxpZGUyLkNvbXBvbmVudHMsXG4gICAgICByb290ID0gU3BsaWRlMi5yb290LFxuICAgICAgb3B0aW9ucyA9IFNwbGlkZTIub3B0aW9ucztcbiAgdmFyIGlzTmF2aWdhdGlvbiA9IG9wdGlvbnMuaXNOYXZpZ2F0aW9uLFxuICAgICAgdXBkYXRlT25Nb3ZlID0gb3B0aW9ucy51cGRhdGVPbk1vdmUsXG4gICAgICBpMThuID0gb3B0aW9ucy5pMThuLFxuICAgICAgcGFnaW5hdGlvbiA9IG9wdGlvbnMucGFnaW5hdGlvbixcbiAgICAgIHNsaWRlRm9jdXMgPSBvcHRpb25zLnNsaWRlRm9jdXM7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIHN0eWxlcyA9IGdldEF0dHJpYnV0ZShzbGlkZSwgXCJzdHlsZVwiKTtcbiAgdmFyIGxhYmVsID0gZ2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMKTtcbiAgdmFyIGlzQ2xvbmUgPSBzbGlkZUluZGV4ID4gLTE7XG4gIHZhciBjb250YWluZXIgPSBjaGlsZChzbGlkZSwgXCIuXCIgKyBDTEFTU19DT05UQUlORVIpO1xuICB2YXIgZGVzdHJveWVkO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmICghaXNDbG9uZSkge1xuICAgICAgc2xpZGUuaWQgPSByb290LmlkICsgXCItc2xpZGVcIiArIHBhZChpbmRleCArIDEpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBST0xFLCBwYWdpbmF0aW9uID8gXCJ0YWJwYW5lbFwiIDogXCJncm91cFwiKTtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9ST0xFREVTQ1JJUFRJT04sIGkxOG4uc2xpZGUpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMLCBsYWJlbCB8fCBmb3JtYXQoaTE4bi5zbGlkZUxhYmVsLCBbaW5kZXggKyAxLCBTcGxpZGUyLmxlbmd0aF0pKTtcbiAgICB9XG5cbiAgICBsaXN0ZW4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbigpIHtcbiAgICBiaW5kKHNsaWRlLCBcImNsaWNrXCIsIGFwcGx5KGVtaXQsIEVWRU5UX0NMSUNLLCBzZWxmKSk7XG4gICAgYmluZChzbGlkZSwgXCJrZXlkb3duXCIsIGFwcGx5KGVtaXQsIEVWRU5UX1NMSURFX0tFWURPV04sIHNlbGYpKTtcbiAgICBvbihbRVZFTlRfTU9WRUQsIEVWRU5UX1NISUZURUQsIEVWRU5UX1NDUk9MTEVEXSwgdXBkYXRlKTtcbiAgICBvbihFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQsIGluaXROYXZpZ2F0aW9uKTtcblxuICAgIGlmICh1cGRhdGVPbk1vdmUpIHtcbiAgICAgIG9uKEVWRU5UX01PVkUsIG9uTW92ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBkZXN0cm95ZWQgPSB0cnVlO1xuICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICByZW1vdmVDbGFzcyhzbGlkZSwgU1RBVFVTX0NMQVNTRVMpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShzbGlkZSwgQUxMX0FUVFJJQlVURVMpO1xuICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgXCJzdHlsZVwiLCBzdHlsZXMpO1xuICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9MQUJFTCwgbGFiZWwgfHwgXCJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0TmF2aWdhdGlvbigpIHtcbiAgICB2YXIgY29udHJvbHMgPSBTcGxpZGUyLnNwbGlkZXMubWFwKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHZhciBTbGlkZTIgPSB0YXJnZXQuc3BsaWRlLkNvbXBvbmVudHMuU2xpZGVzLmdldEF0KGluZGV4KTtcbiAgICAgIHJldHVybiBTbGlkZTIgPyBTbGlkZTIuc2xpZGUuaWQgOiBcIlwiO1xuICAgIH0pLmpvaW4oXCIgXCIpO1xuICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9MQUJFTCwgZm9ybWF0KGkxOG4uc2xpZGVYLCAoaXNDbG9uZSA/IHNsaWRlSW5kZXggOiBpbmRleCkgKyAxKSk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0NPTlRST0xTLCBjb250cm9scyk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBST0xFLCBzbGlkZUZvY3VzID8gXCJidXR0b25cIiA6IFwiXCIpO1xuICAgIHNsaWRlRm9jdXMgJiYgcmVtb3ZlQXR0cmlidXRlKHNsaWRlLCBBUklBX1JPTEVERVNDUklQVElPTik7XG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdmUoKSB7XG4gICAgaWYgKCFkZXN0cm95ZWQpIHtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAoIWRlc3Ryb3llZCkge1xuICAgICAgdmFyIGN1cnIgPSBTcGxpZGUyLmluZGV4O1xuICAgICAgdXBkYXRlQWN0aXZpdHkoKTtcbiAgICAgIHVwZGF0ZVZpc2liaWxpdHkoKTtcbiAgICAgIHRvZ2dsZUNsYXNzKHNsaWRlLCBDTEFTU19QUkVWLCBpbmRleCA9PT0gY3VyciAtIDEpO1xuICAgICAgdG9nZ2xlQ2xhc3Moc2xpZGUsIENMQVNTX05FWFQsIGluZGV4ID09PSBjdXJyICsgMSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQWN0aXZpdHkoKSB7XG4gICAgdmFyIGFjdGl2ZSA9IGlzQWN0aXZlKCk7XG5cbiAgICBpZiAoYWN0aXZlICE9PSBoYXNDbGFzcyhzbGlkZSwgQ0xBU1NfQUNUSVZFKSkge1xuICAgICAgdG9nZ2xlQ2xhc3Moc2xpZGUsIENMQVNTX0FDVElWRSwgYWN0aXZlKTtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9DVVJSRU5ULCBpc05hdmlnYXRpb24gJiYgYWN0aXZlIHx8IFwiXCIpO1xuICAgICAgZW1pdChhY3RpdmUgPyBFVkVOVF9BQ1RJVkUgOiBFVkVOVF9JTkFDVElWRSwgc2VsZik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVmlzaWJpbGl0eSgpIHtcbiAgICB2YXIgdmlzaWJsZSA9IGlzVmlzaWJsZSgpO1xuICAgIHZhciBoaWRkZW4gPSAhdmlzaWJsZSAmJiAoIWlzQWN0aXZlKCkgfHwgaXNDbG9uZSk7XG5cbiAgICBpZiAoIVNwbGlkZTIuc3RhdGUuaXMoW01PVklORywgU0NST0xMSU5HXSkpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgQVJJQV9ISURERU4sIGhpZGRlbiB8fCBcIlwiKTtcbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUocXVlcnlBbGwoc2xpZGUsIG9wdGlvbnMuZm9jdXNhYmxlTm9kZXMgfHwgXCJcIiksIFRBQl9JTkRFWCwgaGlkZGVuID8gLTEgOiBcIlwiKTtcblxuICAgIGlmIChzbGlkZUZvY3VzKSB7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIFRBQl9JTkRFWCwgaGlkZGVuID8gLTEgOiAwKTtcbiAgICB9XG5cbiAgICBpZiAodmlzaWJsZSAhPT0gaGFzQ2xhc3Moc2xpZGUsIENMQVNTX1ZJU0lCTEUpKSB7XG4gICAgICB0b2dnbGVDbGFzcyhzbGlkZSwgQ0xBU1NfVklTSUJMRSwgdmlzaWJsZSk7XG4gICAgICBlbWl0KHZpc2libGUgPyBFVkVOVF9WSVNJQkxFIDogRVZFTlRfSElEREVOLCBzZWxmKTtcbiAgICB9XG5cbiAgICBpZiAoIXZpc2libGUgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gc2xpZGUpIHtcbiAgICAgIHZhciBTbGlkZTIgPSBDb21wb25lbnRzLlNsaWRlcy5nZXRBdChTcGxpZGUyLmluZGV4KTtcbiAgICAgIFNsaWRlMiAmJiBmb2N1cyhTbGlkZTIuc2xpZGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0eWxlJDEocHJvcCwgdmFsdWUsIHVzZUNvbnRhaW5lcikge1xuICAgIHN0eWxlKHVzZUNvbnRhaW5lciAmJiBjb250YWluZXIgfHwgc2xpZGUsIHByb3AsIHZhbHVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHZhciBjdXJyID0gU3BsaWRlMi5pbmRleDtcbiAgICByZXR1cm4gY3VyciA9PT0gaW5kZXggfHwgb3B0aW9ucy5jbG9uZVN0YXR1cyAmJiBjdXJyID09PSBzbGlkZUluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNWaXNpYmxlKCkge1xuICAgIGlmIChTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICByZXR1cm4gaXNBY3RpdmUoKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhY2tSZWN0ID0gcmVjdChDb21wb25lbnRzLkVsZW1lbnRzLnRyYWNrKTtcbiAgICB2YXIgc2xpZGVSZWN0ID0gcmVjdChzbGlkZSk7XG4gICAgdmFyIGxlZnQgPSByZXNvbHZlKFwibGVmdFwiLCB0cnVlKTtcbiAgICB2YXIgcmlnaHQgPSByZXNvbHZlKFwicmlnaHRcIiwgdHJ1ZSk7XG4gICAgcmV0dXJuIGZsb29yKHRyYWNrUmVjdFtsZWZ0XSkgPD0gY2VpbChzbGlkZVJlY3RbbGVmdF0pICYmIGZsb29yKHNsaWRlUmVjdFtyaWdodF0pIDw9IGNlaWwodHJhY2tSZWN0W3JpZ2h0XSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1dpdGhpbihmcm9tLCBkaXN0YW5jZSkge1xuICAgIHZhciBkaWZmID0gYWJzKGZyb20gLSBpbmRleCk7XG5cbiAgICBpZiAoIWlzQ2xvbmUgJiYgKG9wdGlvbnMucmV3aW5kIHx8IFNwbGlkZTIuaXMoTE9PUCkpKSB7XG4gICAgICBkaWZmID0gbWluKGRpZmYsIFNwbGlkZTIubGVuZ3RoIC0gZGlmZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZmYgPD0gZGlzdGFuY2U7XG4gIH1cblxuICB2YXIgc2VsZiA9IHtcbiAgICBpbmRleDogaW5kZXgsXG4gICAgc2xpZGVJbmRleDogc2xpZGVJbmRleCxcbiAgICBzbGlkZTogc2xpZGUsXG4gICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgaXNDbG9uZTogaXNDbG9uZSxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICB1cGRhdGU6IHVwZGF0ZSxcbiAgICBzdHlsZTogc3R5bGUkMSxcbiAgICBpc1dpdGhpbjogaXNXaXRoaW5cbiAgfTtcbiAgcmV0dXJuIHNlbGY7XG59XG5cbmZ1bmN0aW9uIFNsaWRlcyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMiA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2UyLm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTIuZW1pdCxcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UyLmJpbmQ7XG5cbiAgdmFyIF9Db21wb25lbnRzMiRFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgc2xpZGVzID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzLnNsaWRlcyxcbiAgICAgIGxpc3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHMubGlzdDtcbiAgdmFyIFNsaWRlczIgPSBbXTtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgZGVzdHJveSk7XG4gICAgb24oRVZFTlRfUkVGUkVTSCwgaW5pdCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzbGlkZSwgaW5kZXgpIHtcbiAgICAgIHJlZ2lzdGVyKHNsaWRlLCBpbmRleCwgLTEpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBmb3JFYWNoJDEoZnVuY3Rpb24gKFNsaWRlMikge1xuICAgICAgU2xpZGUyLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICBlbXB0eShTbGlkZXMyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBmb3JFYWNoJDEoZnVuY3Rpb24gKFNsaWRlMikge1xuICAgICAgU2xpZGUyLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXIoc2xpZGUsIGluZGV4LCBzbGlkZUluZGV4KSB7XG4gICAgdmFyIG9iamVjdCA9IFNsaWRlJDEoU3BsaWRlMiwgaW5kZXgsIHNsaWRlSW5kZXgsIHNsaWRlKTtcbiAgICBvYmplY3QubW91bnQoKTtcbiAgICBTbGlkZXMyLnB1c2gob2JqZWN0KTtcbiAgICBTbGlkZXMyLnNvcnQoZnVuY3Rpb24gKFNsaWRlMSwgU2xpZGUyKSB7XG4gICAgICByZXR1cm4gU2xpZGUxLmluZGV4IC0gU2xpZGUyLmluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0KGV4Y2x1ZGVDbG9uZXMpIHtcbiAgICByZXR1cm4gZXhjbHVkZUNsb25lcyA/IGZpbHRlcihmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gIVNsaWRlMi5pc0Nsb25lO1xuICAgIH0pIDogU2xpZGVzMjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEluKHBhZ2UpIHtcbiAgICB2YXIgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXI7XG4gICAgdmFyIGluZGV4ID0gQ29udHJvbGxlci50b0luZGV4KHBhZ2UpO1xuICAgIHZhciBtYXggPSBDb250cm9sbGVyLmhhc0ZvY3VzKCkgPyAxIDogb3B0aW9ucy5wZXJQYWdlO1xuICAgIHJldHVybiBmaWx0ZXIoZnVuY3Rpb24gKFNsaWRlMikge1xuICAgICAgcmV0dXJuIGJldHdlZW4oU2xpZGUyLmluZGV4LCBpbmRleCwgaW5kZXggKyBtYXggLSAxKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEF0KGluZGV4KSB7XG4gICAgcmV0dXJuIGZpbHRlcihpbmRleClbMF07XG4gIH1cblxuICBmdW5jdGlvbiBhZGQoaXRlbXMsIGluZGV4KSB7XG4gICAgZm9yRWFjaChpdGVtcywgZnVuY3Rpb24gKHNsaWRlKSB7XG4gICAgICBpZiAoaXNTdHJpbmcoc2xpZGUpKSB7XG4gICAgICAgIHNsaWRlID0gcGFyc2VIdG1sKHNsaWRlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzSFRNTEVsZW1lbnQoc2xpZGUpKSB7XG4gICAgICAgIHZhciByZWYgPSBzbGlkZXNbaW5kZXhdO1xuICAgICAgICByZWYgPyBiZWZvcmUoc2xpZGUsIHJlZikgOiBhcHBlbmQobGlzdCwgc2xpZGUpO1xuICAgICAgICBhZGRDbGFzcyhzbGlkZSwgb3B0aW9ucy5jbGFzc2VzLnNsaWRlKTtcbiAgICAgICAgb2JzZXJ2ZUltYWdlcyhzbGlkZSwgYXBwbHkoZW1pdCwgRVZFTlRfUkVTSVpFKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZW1pdChFVkVOVF9SRUZSRVNIKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZSQxKG1hdGNoZXIpIHtcbiAgICByZW1vdmUoZmlsdGVyKG1hdGNoZXIpLm1hcChmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gU2xpZGUyLnNsaWRlO1xuICAgIH0pKTtcbiAgICBlbWl0KEVWRU5UX1JFRlJFU0gpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9yRWFjaCQxKGl0ZXJhdGVlLCBleGNsdWRlQ2xvbmVzKSB7XG4gICAgZ2V0KGV4Y2x1ZGVDbG9uZXMpLmZvckVhY2goaXRlcmF0ZWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlsdGVyKG1hdGNoZXIpIHtcbiAgICByZXR1cm4gU2xpZGVzMi5maWx0ZXIoaXNGdW5jdGlvbihtYXRjaGVyKSA/IG1hdGNoZXIgOiBmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gaXNTdHJpbmcobWF0Y2hlcikgPyBtYXRjaGVzKFNsaWRlMi5zbGlkZSwgbWF0Y2hlcikgOiBpbmNsdWRlcyh0b0FycmF5KG1hdGNoZXIpLCBTbGlkZTIuaW5kZXgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3R5bGUocHJvcCwgdmFsdWUsIHVzZUNvbnRhaW5lcikge1xuICAgIGZvckVhY2gkMShmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICBTbGlkZTIuc3R5bGUocHJvcCwgdmFsdWUsIHVzZUNvbnRhaW5lcik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvYnNlcnZlSW1hZ2VzKGVsbSwgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1hZ2VzID0gcXVlcnlBbGwoZWxtLCBcImltZ1wiKTtcbiAgICB2YXIgbGVuZ3RoID0gaW1hZ2VzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgYmluZChpbWcsIFwibG9hZCBlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCEgLS1sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExlbmd0aChleGNsdWRlQ2xvbmVzKSB7XG4gICAgcmV0dXJuIGV4Y2x1ZGVDbG9uZXMgPyBzbGlkZXMubGVuZ3RoIDogU2xpZGVzMi5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBpc0Vub3VnaCgpIHtcbiAgICByZXR1cm4gU2xpZGVzMi5sZW5ndGggPiBvcHRpb25zLnBlclBhZ2U7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICBnZXQ6IGdldCxcbiAgICBnZXRJbjogZ2V0SW4sXG4gICAgZ2V0QXQ6IGdldEF0LFxuICAgIGFkZDogYWRkLFxuICAgIHJlbW92ZTogcmVtb3ZlJDEsXG4gICAgZm9yRWFjaDogZm9yRWFjaCQxLFxuICAgIGZpbHRlcjogZmlsdGVyLFxuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBnZXRMZW5ndGg6IGdldExlbmd0aCxcbiAgICBpc0Vub3VnaDogaXNFbm91Z2hcbiAgfTtcbn1cblxuZnVuY3Rpb24gTGF5b3V0KFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UzID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTMub24sXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMy5iaW5kLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTMuZW1pdDtcblxuICB2YXIgU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzO1xuICB2YXIgcmVzb2x2ZSA9IENvbXBvbmVudHMyLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgX0NvbXBvbmVudHMyJEVsZW1lbnRzMiA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgcm9vdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czIucm9vdCxcbiAgICAgIHRyYWNrID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzMi50cmFjayxcbiAgICAgIGxpc3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHMyLmxpc3Q7XG4gIHZhciBnZXRBdCA9IFNsaWRlcy5nZXRBdCxcbiAgICAgIHN0eWxlU2xpZGVzID0gU2xpZGVzLnN0eWxlO1xuICB2YXIgdmVydGljYWw7XG4gIHZhciByb290UmVjdDtcbiAgdmFyIG92ZXJmbG93O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBiaW5kKHdpbmRvdywgXCJyZXNpemUgbG9hZFwiLCBUaHJvdHRsZShhcHBseShlbWl0LCBFVkVOVF9SRVNJWkUpKSk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBpbml0KTtcbiAgICBvbihFVkVOVF9SRVNJWkUsIHJlc2l6ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZlcnRpY2FsID0gb3B0aW9ucy5kaXJlY3Rpb24gPT09IFRUQjtcbiAgICBzdHlsZShyb290LCBcIm1heFdpZHRoXCIsIHVuaXQob3B0aW9ucy53aWR0aCkpO1xuICAgIHN0eWxlKHRyYWNrLCByZXNvbHZlKFwicGFkZGluZ0xlZnRcIiksIGNzc1BhZGRpbmcoZmFsc2UpKTtcbiAgICBzdHlsZSh0cmFjaywgcmVzb2x2ZShcInBhZGRpbmdSaWdodFwiKSwgY3NzUGFkZGluZyh0cnVlKSk7XG4gICAgcmVzaXplKHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzaXplKGZvcmNlKSB7XG4gICAgdmFyIG5ld1JlY3QgPSByZWN0KHJvb3QpO1xuXG4gICAgaWYgKGZvcmNlIHx8IHJvb3RSZWN0LndpZHRoICE9PSBuZXdSZWN0LndpZHRoIHx8IHJvb3RSZWN0LmhlaWdodCAhPT0gbmV3UmVjdC5oZWlnaHQpIHtcbiAgICAgIHN0eWxlKHRyYWNrLCBcImhlaWdodFwiLCBjc3NUcmFja0hlaWdodCgpKTtcbiAgICAgIHN0eWxlU2xpZGVzKHJlc29sdmUoXCJtYXJnaW5SaWdodFwiKSwgdW5pdChvcHRpb25zLmdhcCkpO1xuICAgICAgc3R5bGVTbGlkZXMoXCJ3aWR0aFwiLCBjc3NTbGlkZVdpZHRoKCkpO1xuICAgICAgc3R5bGVTbGlkZXMoXCJoZWlnaHRcIiwgY3NzU2xpZGVIZWlnaHQoKSwgdHJ1ZSk7XG4gICAgICByb290UmVjdCA9IG5ld1JlY3Q7XG4gICAgICBlbWl0KEVWRU5UX1JFU0laRUQpO1xuXG4gICAgICBpZiAob3ZlcmZsb3cgIT09IChvdmVyZmxvdyA9IGlzT3ZlcmZsb3coKSkpIHtcbiAgICAgICAgdG9nZ2xlQ2xhc3Mocm9vdCwgQ0xBU1NfT1ZFUkZMT1csIG92ZXJmbG93KTtcbiAgICAgICAgZW1pdChFVkVOVF9PVkVSRkxPVywgb3ZlcmZsb3cpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNzc1BhZGRpbmcocmlnaHQpIHtcbiAgICB2YXIgcGFkZGluZyA9IG9wdGlvbnMucGFkZGluZztcbiAgICB2YXIgcHJvcCA9IHJlc29sdmUocmlnaHQgPyBcInJpZ2h0XCIgOiBcImxlZnRcIik7XG4gICAgcmV0dXJuIHBhZGRpbmcgJiYgdW5pdChwYWRkaW5nW3Byb3BdIHx8IChpc09iamVjdChwYWRkaW5nKSA/IDAgOiBwYWRkaW5nKSkgfHwgXCIwcHhcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNzc1RyYWNrSGVpZ2h0KCkge1xuICAgIHZhciBoZWlnaHQgPSBcIlwiO1xuXG4gICAgaWYgKHZlcnRpY2FsKSB7XG4gICAgICBoZWlnaHQgPSBjc3NIZWlnaHQoKTtcbiAgICAgIGFzc2VydChoZWlnaHQsIFwiaGVpZ2h0IG9yIGhlaWdodFJhdGlvIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgaGVpZ2h0ID0gXCJjYWxjKFwiICsgaGVpZ2h0ICsgXCIgLSBcIiArIGNzc1BhZGRpbmcoZmFsc2UpICsgXCIgLSBcIiArIGNzc1BhZGRpbmcodHJ1ZSkgKyBcIilcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzSGVpZ2h0KCkge1xuICAgIHJldHVybiB1bml0KG9wdGlvbnMuaGVpZ2h0IHx8IHJlY3QobGlzdCkud2lkdGggKiBvcHRpb25zLmhlaWdodFJhdGlvKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNzc1NsaWRlV2lkdGgoKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuYXV0b1dpZHRoID8gbnVsbCA6IHVuaXQob3B0aW9ucy5maXhlZFdpZHRoKSB8fCAodmVydGljYWwgPyBcIlwiIDogY3NzU2xpZGVTaXplKCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzU2xpZGVIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5maXhlZEhlaWdodCkgfHwgKHZlcnRpY2FsID8gb3B0aW9ucy5hdXRvSGVpZ2h0ID8gbnVsbCA6IGNzc1NsaWRlU2l6ZSgpIDogY3NzSGVpZ2h0KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzU2xpZGVTaXplKCkge1xuICAgIHZhciBnYXAgPSB1bml0KG9wdGlvbnMuZ2FwKTtcbiAgICByZXR1cm4gXCJjYWxjKCgxMDAlXCIgKyAoZ2FwICYmIFwiICsgXCIgKyBnYXApICsgXCIpL1wiICsgKG9wdGlvbnMucGVyUGFnZSB8fCAxKSArIChnYXAgJiYgXCIgLSBcIiArIGdhcCkgKyBcIilcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RTaXplKCkge1xuICAgIHJldHVybiByZWN0KGxpc3QpW3Jlc29sdmUoXCJ3aWR0aFwiKV07XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZVNpemUoaW5kZXgsIHdpdGhvdXRHYXApIHtcbiAgICB2YXIgU2xpZGUgPSBnZXRBdChpbmRleCB8fCAwKTtcbiAgICByZXR1cm4gU2xpZGUgPyByZWN0KFNsaWRlLnNsaWRlKVtyZXNvbHZlKFwid2lkdGhcIildICsgKHdpdGhvdXRHYXAgPyAwIDogZ2V0R2FwKCkpIDogMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvdGFsU2l6ZShpbmRleCwgd2l0aG91dEdhcCkge1xuICAgIHZhciBTbGlkZSA9IGdldEF0KGluZGV4KTtcblxuICAgIGlmIChTbGlkZSkge1xuICAgICAgdmFyIHJpZ2h0ID0gcmVjdChTbGlkZS5zbGlkZSlbcmVzb2x2ZShcInJpZ2h0XCIpXTtcbiAgICAgIHZhciBsZWZ0ID0gcmVjdChsaXN0KVtyZXNvbHZlKFwibGVmdFwiKV07XG4gICAgICByZXR1cm4gYWJzKHJpZ2h0IC0gbGVmdCkgKyAod2l0aG91dEdhcCA/IDAgOiBnZXRHYXAoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmdW5jdGlvbiBzbGlkZXJTaXplKHdpdGhvdXRHYXApIHtcbiAgICByZXR1cm4gdG90YWxTaXplKFNwbGlkZTIubGVuZ3RoIC0gMSkgLSB0b3RhbFNpemUoMCkgKyBzbGlkZVNpemUoMCwgd2l0aG91dEdhcCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRHYXAoKSB7XG4gICAgdmFyIFNsaWRlID0gZ2V0QXQoMCk7XG4gICAgcmV0dXJuIFNsaWRlICYmIHBhcnNlRmxvYXQoc3R5bGUoU2xpZGUuc2xpZGUsIHJlc29sdmUoXCJtYXJnaW5SaWdodFwiKSkpIHx8IDA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYWRkaW5nKHJpZ2h0KSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGUodHJhY2ssIHJlc29sdmUoXCJwYWRkaW5nXCIgKyAocmlnaHQgPyBcIlJpZ2h0XCIgOiBcIkxlZnRcIikpKSkgfHwgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT3ZlcmZsb3coKSB7XG4gICAgcmV0dXJuIFNwbGlkZTIuaXMoRkFERSkgfHwgc2xpZGVyU2l6ZSh0cnVlKSA+IGxpc3RTaXplKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICByZXNpemU6IHJlc2l6ZSxcbiAgICBsaXN0U2l6ZTogbGlzdFNpemUsXG4gICAgc2xpZGVTaXplOiBzbGlkZVNpemUsXG4gICAgc2xpZGVyU2l6ZTogc2xpZGVyU2l6ZSxcbiAgICB0b3RhbFNpemU6IHRvdGFsU2l6ZSxcbiAgICBnZXRQYWRkaW5nOiBnZXRQYWRkaW5nLFxuICAgIGlzT3ZlcmZsb3c6IGlzT3ZlcmZsb3dcbiAgfTtcbn1cblxudmFyIE1VTFRJUExJRVIgPSAyO1xuXG5mdW5jdGlvbiBDbG9uZXMoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMik7XG4gIHZhciBvbiA9IGV2ZW50Lm9uO1xuICB2YXIgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcztcbiAgdmFyIHJlc29sdmUgPSBDb21wb25lbnRzMi5EaXJlY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIGNsb25lcyA9IFtdO1xuICB2YXIgY2xvbmVDb3VudDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBvbihFVkVOVF9SRUZSRVNILCByZW1vdW50KTtcbiAgICBvbihbRVZFTlRfVVBEQVRFRCwgRVZFTlRfUkVTSVpFXSwgb2JzZXJ2ZSk7XG5cbiAgICBpZiAoY2xvbmVDb3VudCA9IGNvbXB1dGVDbG9uZUNvdW50KCkpIHtcbiAgICAgIGdlbmVyYXRlKGNsb25lQ291bnQpO1xuICAgICAgQ29tcG9uZW50czIuTGF5b3V0LnJlc2l6ZSh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdW50KCkge1xuICAgIGRlc3Ryb3koKTtcbiAgICBtb3VudCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICByZW1vdmUoY2xvbmVzKTtcbiAgICBlbXB0eShjbG9uZXMpO1xuICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9ic2VydmUoKSB7XG4gICAgdmFyIGNvdW50ID0gY29tcHV0ZUNsb25lQ291bnQoKTtcblxuICAgIGlmIChjbG9uZUNvdW50ICE9PSBjb3VudCkge1xuICAgICAgaWYgKGNsb25lQ291bnQgPCBjb3VudCB8fCAhY291bnQpIHtcbiAgICAgICAgZXZlbnQuZW1pdChFVkVOVF9SRUZSRVNIKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZShjb3VudCkge1xuICAgIHZhciBzbGlkZXMgPSBTbGlkZXMuZ2V0KCkuc2xpY2UoKTtcbiAgICB2YXIgbGVuZ3RoID0gc2xpZGVzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgIHdoaWxlIChzbGlkZXMubGVuZ3RoIDwgY291bnQpIHtcbiAgICAgICAgcHVzaChzbGlkZXMsIHNsaWRlcyk7XG4gICAgICB9XG5cbiAgICAgIHB1c2goc2xpZGVzLnNsaWNlKC1jb3VudCksIHNsaWRlcy5zbGljZSgwLCBjb3VudCkpLmZvckVhY2goZnVuY3Rpb24gKFNsaWRlLCBpbmRleCkge1xuICAgICAgICB2YXIgaXNIZWFkID0gaW5kZXggPCBjb3VudDtcbiAgICAgICAgdmFyIGNsb25lID0gY2xvbmVEZWVwKFNsaWRlLnNsaWRlLCBpbmRleCk7XG4gICAgICAgIGlzSGVhZCA/IGJlZm9yZShjbG9uZSwgc2xpZGVzWzBdLnNsaWRlKSA6IGFwcGVuZChFbGVtZW50cy5saXN0LCBjbG9uZSk7XG4gICAgICAgIHB1c2goY2xvbmVzLCBjbG9uZSk7XG4gICAgICAgIFNsaWRlcy5yZWdpc3RlcihjbG9uZSwgaW5kZXggLSBjb3VudCArIChpc0hlYWQgPyAwIDogbGVuZ3RoKSwgU2xpZGUuaW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmVEZWVwKGVsbSwgaW5kZXgpIHtcbiAgICB2YXIgY2xvbmUgPSBlbG0uY2xvbmVOb2RlKHRydWUpO1xuICAgIGFkZENsYXNzKGNsb25lLCBvcHRpb25zLmNsYXNzZXMuY2xvbmUpO1xuICAgIGNsb25lLmlkID0gU3BsaWRlMi5yb290LmlkICsgXCItY2xvbmVcIiArIHBhZChpbmRleCArIDEpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVDbG9uZUNvdW50KCkge1xuICAgIHZhciBjbG9uZXMyID0gb3B0aW9ucy5jbG9uZXM7XG5cbiAgICBpZiAoIVNwbGlkZTIuaXMoTE9PUCkpIHtcbiAgICAgIGNsb25lczIgPSAwO1xuICAgIH0gZWxzZSBpZiAoaXNVbmRlZmluZWQoY2xvbmVzMikpIHtcbiAgICAgIHZhciBmaXhlZFNpemUgPSBvcHRpb25zW3Jlc29sdmUoXCJmaXhlZFdpZHRoXCIpXSAmJiBDb21wb25lbnRzMi5MYXlvdXQuc2xpZGVTaXplKDApO1xuICAgICAgdmFyIGZpeGVkQ291bnQgPSBmaXhlZFNpemUgJiYgY2VpbChyZWN0KEVsZW1lbnRzLnRyYWNrKVtyZXNvbHZlKFwid2lkdGhcIildIC8gZml4ZWRTaXplKTtcbiAgICAgIGNsb25lczIgPSBmaXhlZENvdW50IHx8IG9wdGlvbnNbcmVzb2x2ZShcImF1dG9XaWR0aFwiKV0gJiYgU3BsaWRlMi5sZW5ndGggfHwgb3B0aW9ucy5wZXJQYWdlICogTVVMVElQTElFUjtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmVzMjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfTtcbn1cblxuZnVuY3Rpb24gTW92ZShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U0Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTQuZW1pdDtcblxuICB2YXIgc2V0ID0gU3BsaWRlMi5zdGF0ZS5zZXQ7XG4gIHZhciBfQ29tcG9uZW50czIkTGF5b3V0ID0gQ29tcG9uZW50czIuTGF5b3V0LFxuICAgICAgc2xpZGVTaXplID0gX0NvbXBvbmVudHMyJExheW91dC5zbGlkZVNpemUsXG4gICAgICBnZXRQYWRkaW5nID0gX0NvbXBvbmVudHMyJExheW91dC5nZXRQYWRkaW5nLFxuICAgICAgdG90YWxTaXplID0gX0NvbXBvbmVudHMyJExheW91dC50b3RhbFNpemUsXG4gICAgICBsaXN0U2l6ZSA9IF9Db21wb25lbnRzMiRMYXlvdXQubGlzdFNpemUsXG4gICAgICBzbGlkZXJTaXplID0gX0NvbXBvbmVudHMyJExheW91dC5zbGlkZXJTaXplO1xuICB2YXIgX0NvbXBvbmVudHMyJERpcmVjdGlvID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLFxuICAgICAgcmVzb2x2ZSA9IF9Db21wb25lbnRzMiREaXJlY3Rpby5yZXNvbHZlLFxuICAgICAgb3JpZW50ID0gX0NvbXBvbmVudHMyJERpcmVjdGlvLm9yaWVudDtcbiAgdmFyIF9Db21wb25lbnRzMiRFbGVtZW50czMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIGxpc3QgPSBfQ29tcG9uZW50czIkRWxlbWVudHMzLmxpc3QsXG4gICAgICB0cmFjayA9IF9Db21wb25lbnRzMiRFbGVtZW50czMudHJhY2s7XG4gIHZhciBUcmFuc2l0aW9uO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIFRyYW5zaXRpb24gPSBDb21wb25lbnRzMi5UcmFuc2l0aW9uO1xuICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9SRVNJWkVELCBFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgcmVwb3NpdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiByZXBvc2l0aW9uKCkge1xuICAgIGlmICghQ29tcG9uZW50czIuQ29udHJvbGxlci5pc0J1c3koKSkge1xuICAgICAgQ29tcG9uZW50czIuU2Nyb2xsLmNhbmNlbCgpO1xuICAgICAganVtcChTcGxpZGUyLmluZGV4KTtcbiAgICAgIENvbXBvbmVudHMyLlNsaWRlcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGRlc3QsIGluZGV4LCBwcmV2LCBjYWxsYmFjaykge1xuICAgIGlmIChkZXN0ICE9PSBpbmRleCAmJiBjYW5TaGlmdChkZXN0ID4gcHJldikpIHtcbiAgICAgIGNhbmNlbCgpO1xuICAgICAgdHJhbnNsYXRlKHNoaWZ0KGdldFBvc2l0aW9uKCksIGRlc3QgPiBwcmV2KSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2V0KE1PVklORyk7XG4gICAgZW1pdChFVkVOVF9NT1ZFLCBpbmRleCwgcHJldiwgZGVzdCk7XG4gICAgVHJhbnNpdGlvbi5zdGFydChpbmRleCwgZnVuY3Rpb24gKCkge1xuICAgICAgc2V0KElETEUpO1xuICAgICAgZW1pdChFVkVOVF9NT1ZFRCwgaW5kZXgsIHByZXYsIGRlc3QpO1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGp1bXAoaW5kZXgpIHtcbiAgICB0cmFuc2xhdGUodG9Qb3NpdGlvbihpbmRleCwgdHJ1ZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHBvc2l0aW9uLCBwcmV2ZW50TG9vcCkge1xuICAgIGlmICghU3BsaWRlMi5pcyhGQURFKSkge1xuICAgICAgdmFyIGRlc3RpbmF0aW9uID0gcHJldmVudExvb3AgPyBwb3NpdGlvbiA6IGxvb3AocG9zaXRpb24pO1xuICAgICAgc3R5bGUobGlzdCwgXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVcIiArIHJlc29sdmUoXCJYXCIpICsgXCIoXCIgKyBkZXN0aW5hdGlvbiArIFwicHgpXCIpO1xuICAgICAgcG9zaXRpb24gIT09IGRlc3RpbmF0aW9uICYmIGVtaXQoRVZFTlRfU0hJRlRFRCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbG9vcChwb3NpdGlvbikge1xuICAgIGlmIChTcGxpZGUyLmlzKExPT1ApKSB7XG4gICAgICB2YXIgaW5kZXggPSB0b0luZGV4KHBvc2l0aW9uKTtcbiAgICAgIHZhciBleGNlZWRlZE1heCA9IGluZGV4ID4gQ29tcG9uZW50czIuQ29udHJvbGxlci5nZXRFbmQoKTtcbiAgICAgIHZhciBleGNlZWRlZE1pbiA9IGluZGV4IDwgMDtcblxuICAgICAgaWYgKGV4Y2VlZGVkTWluIHx8IGV4Y2VlZGVkTWF4KSB7XG4gICAgICAgIHBvc2l0aW9uID0gc2hpZnQocG9zaXRpb24sIGV4Y2VlZGVkTWF4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBzaGlmdChwb3NpdGlvbiwgYmFja3dhcmRzKSB7XG4gICAgdmFyIGV4Y2VzcyA9IHBvc2l0aW9uIC0gZ2V0TGltaXQoYmFja3dhcmRzKTtcbiAgICB2YXIgc2l6ZSA9IHNsaWRlclNpemUoKTtcbiAgICBwb3NpdGlvbiAtPSBvcmllbnQoc2l6ZSAqIChjZWlsKGFicyhleGNlc3MpIC8gc2l6ZSkgfHwgMSkpICogKGJhY2t3YXJkcyA/IDEgOiAtMSk7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRyYW5zbGF0ZShnZXRQb3NpdGlvbigpLCB0cnVlKTtcbiAgICBUcmFuc2l0aW9uLmNhbmNlbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9JbmRleChwb3NpdGlvbikge1xuICAgIHZhciBTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXMuZ2V0KCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgbWluRGlzdGFuY2UgPSBJbmZpbml0eTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc2xpZGVJbmRleCA9IFNsaWRlc1tpXS5pbmRleDtcbiAgICAgIHZhciBkaXN0YW5jZSA9IGFicyh0b1Bvc2l0aW9uKHNsaWRlSW5kZXgsIHRydWUpIC0gcG9zaXRpb24pO1xuXG4gICAgICBpZiAoZGlzdGFuY2UgPD0gbWluRGlzdGFuY2UpIHtcbiAgICAgICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgaW5kZXggPSBzbGlkZUluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gdG9Qb3NpdGlvbihpbmRleCwgdHJpbW1pbmcpIHtcbiAgICB2YXIgcG9zaXRpb24gPSBvcmllbnQodG90YWxTaXplKGluZGV4IC0gMSkgLSBvZmZzZXQoaW5kZXgpKTtcbiAgICByZXR1cm4gdHJpbW1pbmcgPyB0cmltKHBvc2l0aW9uKSA6IHBvc2l0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UG9zaXRpb24oKSB7XG4gICAgdmFyIGxlZnQgPSByZXNvbHZlKFwibGVmdFwiKTtcbiAgICByZXR1cm4gcmVjdChsaXN0KVtsZWZ0XSAtIHJlY3QodHJhY2spW2xlZnRdICsgb3JpZW50KGdldFBhZGRpbmcoZmFsc2UpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyaW0ocG9zaXRpb24pIHtcbiAgICBpZiAob3B0aW9ucy50cmltU3BhY2UgJiYgU3BsaWRlMi5pcyhTTElERSkpIHtcbiAgICAgIHBvc2l0aW9uID0gY2xhbXAocG9zaXRpb24sIDAsIG9yaWVudChzbGlkZXJTaXplKHRydWUpIC0gbGlzdFNpemUoKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZnNldChpbmRleCkge1xuICAgIHZhciBmb2N1cyA9IG9wdGlvbnMuZm9jdXM7XG4gICAgcmV0dXJuIGZvY3VzID09PSBcImNlbnRlclwiID8gKGxpc3RTaXplKCkgLSBzbGlkZVNpemUoaW5kZXgsIHRydWUpKSAvIDIgOiArZm9jdXMgKiBzbGlkZVNpemUoaW5kZXgpIHx8IDA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMaW1pdChtYXgpIHtcbiAgICByZXR1cm4gdG9Qb3NpdGlvbihtYXggPyBDb21wb25lbnRzMi5Db250cm9sbGVyLmdldEVuZCgpIDogMCwgISFvcHRpb25zLnRyaW1TcGFjZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5TaGlmdChiYWNrd2FyZHMpIHtcbiAgICB2YXIgc2hpZnRlZCA9IG9yaWVudChzaGlmdChnZXRQb3NpdGlvbigpLCBiYWNrd2FyZHMpKTtcbiAgICByZXR1cm4gYmFja3dhcmRzID8gc2hpZnRlZCA+PSAwIDogc2hpZnRlZCA8PSBsaXN0W3Jlc29sdmUoXCJzY3JvbGxXaWR0aFwiKV0gLSByZWN0KHRyYWNrKVtyZXNvbHZlKFwid2lkdGhcIildO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhjZWVkZWRMaW1pdChtYXgsIHBvc2l0aW9uKSB7XG4gICAgcG9zaXRpb24gPSBpc1VuZGVmaW5lZChwb3NpdGlvbikgPyBnZXRQb3NpdGlvbigpIDogcG9zaXRpb247XG4gICAgdmFyIGV4Y2VlZGVkTWluID0gbWF4ICE9PSB0cnVlICYmIG9yaWVudChwb3NpdGlvbikgPCBvcmllbnQoZ2V0TGltaXQoZmFsc2UpKTtcbiAgICB2YXIgZXhjZWVkZWRNYXggPSBtYXggIT09IGZhbHNlICYmIG9yaWVudChwb3NpdGlvbikgPiBvcmllbnQoZ2V0TGltaXQodHJ1ZSkpO1xuICAgIHJldHVybiBleGNlZWRlZE1pbiB8fCBleGNlZWRlZE1heDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIG1vdmU6IG1vdmUsXG4gICAganVtcDoganVtcCxcbiAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZSxcbiAgICBzaGlmdDogc2hpZnQsXG4gICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICB0b1Bvc2l0aW9uOiB0b1Bvc2l0aW9uLFxuICAgIGdldFBvc2l0aW9uOiBnZXRQb3NpdGlvbixcbiAgICBnZXRMaW1pdDogZ2V0TGltaXQsXG4gICAgZXhjZWVkZWRMaW1pdDogZXhjZWVkZWRMaW1pdCxcbiAgICByZXBvc2l0aW9uOiByZXBvc2l0aW9uXG4gIH07XG59XG5cbmZ1bmN0aW9uIENvbnRyb2xsZXIoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTUgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlNS5vbixcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2U1LmVtaXQ7XG5cbiAgdmFyIE1vdmUgPSBDb21wb25lbnRzMi5Nb3ZlO1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZ2V0TGltaXQgPSBNb3ZlLmdldExpbWl0LFxuICAgICAgdG9Qb3NpdGlvbiA9IE1vdmUudG9Qb3NpdGlvbjtcbiAgdmFyIF9Db21wb25lbnRzMiRTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXMsXG4gICAgICBpc0Vub3VnaCA9IF9Db21wb25lbnRzMiRTbGlkZXMuaXNFbm91Z2gsXG4gICAgICBnZXRMZW5ndGggPSBfQ29tcG9uZW50czIkU2xpZGVzLmdldExlbmd0aDtcbiAgdmFyIG9taXRFbmQgPSBvcHRpb25zLm9taXRFbmQ7XG4gIHZhciBpc0xvb3AgPSBTcGxpZGUyLmlzKExPT1ApO1xuICB2YXIgaXNTbGlkZSA9IFNwbGlkZTIuaXMoU0xJREUpO1xuICB2YXIgZ2V0TmV4dCA9IGFwcGx5KGdldEFkamFjZW50LCBmYWxzZSk7XG4gIHZhciBnZXRQcmV2ID0gYXBwbHkoZ2V0QWRqYWNlbnQsIHRydWUpO1xuICB2YXIgY3VyckluZGV4ID0gb3B0aW9ucy5zdGFydCB8fCAwO1xuICB2YXIgZW5kSW5kZXg7XG4gIHZhciBwcmV2SW5kZXggPSBjdXJySW5kZXg7XG4gIHZhciBzbGlkZUNvdW50O1xuICB2YXIgcGVyTW92ZTtcbiAgdmFyIHBlclBhZ2U7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNILCBFVkVOVF9FTkRfSU5ERVhfQ0hBTkdFRF0sIGluaXQpO1xuICAgIG9uKEVWRU5UX1JFU0laRUQsIG9uUmVzaXplZCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHNsaWRlQ291bnQgPSBnZXRMZW5ndGgodHJ1ZSk7XG4gICAgcGVyTW92ZSA9IG9wdGlvbnMucGVyTW92ZTtcbiAgICBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlO1xuICAgIGVuZEluZGV4ID0gZ2V0RW5kKCk7XG4gICAgdmFyIGluZGV4ID0gY2xhbXAoY3VyckluZGV4LCAwLCBvbWl0RW5kID8gZW5kSW5kZXggOiBzbGlkZUNvdW50IC0gMSk7XG5cbiAgICBpZiAoaW5kZXggIT09IGN1cnJJbmRleCkge1xuICAgICAgY3VyckluZGV4ID0gaW5kZXg7XG4gICAgICBNb3ZlLnJlcG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblJlc2l6ZWQoKSB7XG4gICAgaWYgKGVuZEluZGV4ICE9PSBnZXRFbmQoKSkge1xuICAgICAgZW1pdChFVkVOVF9FTkRfSU5ERVhfQ0hBTkdFRCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ28oY29udHJvbCwgYWxsb3dTYW1lSW5kZXgsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFpc0J1c3koKSkge1xuICAgICAgdmFyIGRlc3QgPSBwYXJzZShjb250cm9sKTtcbiAgICAgIHZhciBpbmRleCA9IGxvb3AoZGVzdCk7XG5cbiAgICAgIGlmIChpbmRleCA+IC0xICYmIChhbGxvd1NhbWVJbmRleCB8fCBpbmRleCAhPT0gY3VyckluZGV4KSkge1xuICAgICAgICBzZXRJbmRleChpbmRleCk7XG4gICAgICAgIE1vdmUubW92ZShkZXN0LCBpbmRleCwgcHJldkluZGV4LCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgY2FsbGJhY2spIHtcbiAgICBDb21wb25lbnRzMi5TY3JvbGwuc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGluZGV4ID0gbG9vcChNb3ZlLnRvSW5kZXgoZ2V0UG9zaXRpb24oKSkpO1xuICAgICAgc2V0SW5kZXgob21pdEVuZCA/IG1pbihpbmRleCwgZW5kSW5kZXgpIDogaW5kZXgpO1xuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlKGNvbnRyb2wpIHtcbiAgICB2YXIgaW5kZXggPSBjdXJySW5kZXg7XG5cbiAgICBpZiAoaXNTdHJpbmcoY29udHJvbCkpIHtcbiAgICAgIHZhciBfcmVmID0gY29udHJvbC5tYXRjaCgvKFsrXFwtPD5dKShcXGQrKT8vKSB8fCBbXSxcbiAgICAgICAgICBpbmRpY2F0b3IgPSBfcmVmWzFdLFxuICAgICAgICAgIG51bWJlciA9IF9yZWZbMl07XG5cbiAgICAgIGlmIChpbmRpY2F0b3IgPT09IFwiK1wiIHx8IGluZGljYXRvciA9PT0gXCItXCIpIHtcbiAgICAgICAgaW5kZXggPSBjb21wdXRlRGVzdEluZGV4KGN1cnJJbmRleCArICsoXCJcIiArIGluZGljYXRvciArICgrbnVtYmVyIHx8IDEpKSwgY3VyckluZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kaWNhdG9yID09PSBcIj5cIikge1xuICAgICAgICBpbmRleCA9IG51bWJlciA/IHRvSW5kZXgoK251bWJlcikgOiBnZXROZXh0KHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChpbmRpY2F0b3IgPT09IFwiPFwiKSB7XG4gICAgICAgIGluZGV4ID0gZ2V0UHJldih0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBpc0xvb3AgPyBjb250cm9sIDogY2xhbXAoY29udHJvbCwgMCwgZW5kSW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFkamFjZW50KHByZXYsIGRlc3RpbmF0aW9uKSB7XG4gICAgdmFyIG51bWJlciA9IHBlck1vdmUgfHwgKGhhc0ZvY3VzKCkgPyAxIDogcGVyUGFnZSk7XG4gICAgdmFyIGRlc3QgPSBjb21wdXRlRGVzdEluZGV4KGN1cnJJbmRleCArIG51bWJlciAqIChwcmV2ID8gLTEgOiAxKSwgY3VyckluZGV4LCAhKHBlck1vdmUgfHwgaGFzRm9jdXMoKSkpO1xuXG4gICAgaWYgKGRlc3QgPT09IC0xICYmIGlzU2xpZGUpIHtcbiAgICAgIGlmICghYXBwcm94aW1hdGVseUVxdWFsKGdldFBvc2l0aW9uKCksIGdldExpbWl0KCFwcmV2KSwgMSkpIHtcbiAgICAgICAgcmV0dXJuIHByZXYgPyAwIDogZW5kSW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3RpbmF0aW9uID8gZGVzdCA6IGxvb3AoZGVzdCk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlRGVzdEluZGV4KGRlc3QsIGZyb20sIHNuYXBQYWdlKSB7XG4gICAgaWYgKGlzRW5vdWdoKCkgfHwgaGFzRm9jdXMoKSkge1xuICAgICAgdmFyIGluZGV4ID0gY29tcHV0ZU1vdmFibGVEZXN0SW5kZXgoZGVzdCk7XG5cbiAgICAgIGlmIChpbmRleCAhPT0gZGVzdCkge1xuICAgICAgICBmcm9tID0gZGVzdDtcbiAgICAgICAgZGVzdCA9IGluZGV4O1xuICAgICAgICBzbmFwUGFnZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGVzdCA8IDAgfHwgZGVzdCA+IGVuZEluZGV4KSB7XG4gICAgICAgIGlmICghcGVyTW92ZSAmJiAoYmV0d2VlbigwLCBkZXN0LCBmcm9tLCB0cnVlKSB8fCBiZXR3ZWVuKGVuZEluZGV4LCBmcm9tLCBkZXN0LCB0cnVlKSkpIHtcbiAgICAgICAgICBkZXN0ID0gdG9JbmRleCh0b1BhZ2UoZGVzdCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc0xvb3ApIHtcbiAgICAgICAgICAgIGRlc3QgPSBzbmFwUGFnZSA/IGRlc3QgPCAwID8gLShzbGlkZUNvdW50ICUgcGVyUGFnZSB8fCBwZXJQYWdlKSA6IHNsaWRlQ291bnQgOiBkZXN0O1xuICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZXdpbmQpIHtcbiAgICAgICAgICAgIGRlc3QgPSBkZXN0IDwgMCA/IGVuZEluZGV4IDogMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVzdCA9IC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNuYXBQYWdlICYmIGRlc3QgIT09IGZyb20pIHtcbiAgICAgICAgICBkZXN0ID0gdG9JbmRleCh0b1BhZ2UoZnJvbSkgKyAoZGVzdCA8IGZyb20gPyAtMSA6IDEpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0ID0gLTE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlTW92YWJsZURlc3RJbmRleChkZXN0KSB7XG4gICAgaWYgKGlzU2xpZGUgJiYgb3B0aW9ucy50cmltU3BhY2UgPT09IFwibW92ZVwiICYmIGRlc3QgIT09IGN1cnJJbmRleCkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gZ2V0UG9zaXRpb24oKTtcblxuICAgICAgd2hpbGUgKHBvc2l0aW9uID09PSB0b1Bvc2l0aW9uKGRlc3QsIHRydWUpICYmIGJldHdlZW4oZGVzdCwgMCwgU3BsaWRlMi5sZW5ndGggLSAxLCAhb3B0aW9ucy5yZXdpbmQpKSB7XG4gICAgICAgIGRlc3QgPCBjdXJySW5kZXggPyAtLWRlc3QgOiArK2Rlc3Q7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBsb29wKGluZGV4KSB7XG4gICAgcmV0dXJuIGlzTG9vcCA/IChpbmRleCArIHNsaWRlQ291bnQpICUgc2xpZGVDb3VudCB8fCAwIDogaW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFbmQoKSB7XG4gICAgdmFyIGVuZCA9IHNsaWRlQ291bnQgLSAoaGFzRm9jdXMoKSB8fCBpc0xvb3AgJiYgcGVyTW92ZSA/IDEgOiBwZXJQYWdlKTtcblxuICAgIHdoaWxlIChvbWl0RW5kICYmIGVuZC0tID4gMCkge1xuICAgICAgaWYgKHRvUG9zaXRpb24oc2xpZGVDb3VudCAtIDEsIHRydWUpICE9PSB0b1Bvc2l0aW9uKGVuZCwgdHJ1ZSkpIHtcbiAgICAgICAgZW5kKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbGFtcChlbmQsIDAsIHNsaWRlQ291bnQgLSAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvSW5kZXgocGFnZSkge1xuICAgIHJldHVybiBjbGFtcChoYXNGb2N1cygpID8gcGFnZSA6IHBlclBhZ2UgKiBwYWdlLCAwLCBlbmRJbmRleCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b1BhZ2UoaW5kZXgpIHtcbiAgICByZXR1cm4gaGFzRm9jdXMoKSA/IG1pbihpbmRleCwgZW5kSW5kZXgpIDogZmxvb3IoKGluZGV4ID49IGVuZEluZGV4ID8gc2xpZGVDb3VudCAtIDEgOiBpbmRleCkgLyBwZXJQYWdlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvRGVzdChkZXN0aW5hdGlvbikge1xuICAgIHZhciBjbG9zZXN0ID0gTW92ZS50b0luZGV4KGRlc3RpbmF0aW9uKTtcbiAgICByZXR1cm4gaXNTbGlkZSA/IGNsYW1wKGNsb3Nlc3QsIDAsIGVuZEluZGV4KSA6IGNsb3Nlc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRJbmRleChpbmRleCkge1xuICAgIGlmIChpbmRleCAhPT0gY3VyckluZGV4KSB7XG4gICAgICBwcmV2SW5kZXggPSBjdXJySW5kZXg7XG4gICAgICBjdXJySW5kZXggPSBpbmRleDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbmRleChwcmV2KSB7XG4gICAgcmV0dXJuIHByZXYgPyBwcmV2SW5kZXggOiBjdXJySW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBoYXNGb2N1cygpIHtcbiAgICByZXR1cm4gIWlzVW5kZWZpbmVkKG9wdGlvbnMuZm9jdXMpIHx8IG9wdGlvbnMuaXNOYXZpZ2F0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCdXN5KCkge1xuICAgIHJldHVybiBTcGxpZGUyLnN0YXRlLmlzKFtNT1ZJTkcsIFNDUk9MTElOR10pICYmICEhb3B0aW9ucy53YWl0Rm9yVHJhbnNpdGlvbjtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGdvOiBnbyxcbiAgICBzY3JvbGw6IHNjcm9sbCxcbiAgICBnZXROZXh0OiBnZXROZXh0LFxuICAgIGdldFByZXY6IGdldFByZXYsXG4gICAgZ2V0QWRqYWNlbnQ6IGdldEFkamFjZW50LFxuICAgIGdldEVuZDogZ2V0RW5kLFxuICAgIHNldEluZGV4OiBzZXRJbmRleCxcbiAgICBnZXRJbmRleDogZ2V0SW5kZXgsXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICB0b1BhZ2U6IHRvUGFnZSxcbiAgICB0b0Rlc3Q6IHRvRGVzdCxcbiAgICBoYXNGb2N1czogaGFzRm9jdXMsXG4gICAgaXNCdXN5OiBpc0J1c3lcbiAgfTtcbn1cblxudmFyIFhNTF9OQU1FX1NQQUNFID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xudmFyIFBBVEggPSBcIm0xNS41IDAuOTMyLTQuMyA0LjM4IDE0LjUgMTQuNi0xNC41IDE0LjUgNC4zIDQuNCAxNC42LTE0LjYgNC40LTQuMy00LjQtNC40LTE0LjYtMTQuNnpcIjtcbnZhciBTSVpFID0gNDA7XG5cbmZ1bmN0aW9uIEFycm93cyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBiaW5kID0gZXZlbnQuYmluZCxcbiAgICAgIGVtaXQgPSBldmVudC5lbWl0O1xuICB2YXIgY2xhc3NlcyA9IG9wdGlvbnMuY2xhc3NlcyxcbiAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG47XG4gIHZhciBFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXI7XG4gIHZhciBwbGFjZWhvbGRlciA9IEVsZW1lbnRzLmFycm93cyxcbiAgICAgIHRyYWNrID0gRWxlbWVudHMudHJhY2s7XG4gIHZhciB3cmFwcGVyID0gcGxhY2Vob2xkZXI7XG4gIHZhciBwcmV2ID0gRWxlbWVudHMucHJldjtcbiAgdmFyIG5leHQgPSBFbGVtZW50cy5uZXh0O1xuICB2YXIgY3JlYXRlZDtcbiAgdmFyIHdyYXBwZXJDbGFzc2VzO1xuICB2YXIgYXJyb3dzID0ge307XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIG9uKEVWRU5UX1VQREFURUQsIHJlbW91bnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgbW91bnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGVuYWJsZWQgPSBvcHRpb25zLmFycm93cztcblxuICAgIGlmIChlbmFibGVkICYmICEocHJldiAmJiBuZXh0KSkge1xuICAgICAgY3JlYXRlQXJyb3dzKCk7XG4gICAgfVxuXG4gICAgaWYgKHByZXYgJiYgbmV4dCkge1xuICAgICAgYXNzaWduKGFycm93cywge1xuICAgICAgICBwcmV2OiBwcmV2LFxuICAgICAgICBuZXh0OiBuZXh0XG4gICAgICB9KTtcbiAgICAgIGRpc3BsYXkod3JhcHBlciwgZW5hYmxlZCA/IFwiXCIgOiBcIm5vbmVcIik7XG4gICAgICBhZGRDbGFzcyh3cmFwcGVyLCB3cmFwcGVyQ2xhc3NlcyA9IENMQVNTX0FSUk9XUyArIFwiLS1cIiArIG9wdGlvbnMuZGlyZWN0aW9uKTtcblxuICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgbGlzdGVuKCk7XG4gICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICBzZXRBdHRyaWJ1dGUoW3ByZXYsIG5leHRdLCBBUklBX0NPTlRST0xTLCB0cmFjay5pZCk7XG4gICAgICAgIGVtaXQoRVZFTlRfQVJST1dTX01PVU5URUQsIHByZXYsIG5leHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICAgIHJlbW92ZUNsYXNzKHdyYXBwZXIsIHdyYXBwZXJDbGFzc2VzKTtcblxuICAgIGlmIChjcmVhdGVkKSB7XG4gICAgICByZW1vdmUocGxhY2Vob2xkZXIgPyBbcHJldiwgbmV4dF0gOiB3cmFwcGVyKTtcbiAgICAgIHByZXYgPSBuZXh0ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlQXR0cmlidXRlKFtwcmV2LCBuZXh0XSwgQUxMX0FUVFJJQlVURVMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbigpIHtcbiAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfTU9WRUQsIEVWRU5UX1JFRlJFU0gsIEVWRU5UX1NDUk9MTEVELCBFVkVOVF9FTkRfSU5ERVhfQ0hBTkdFRF0sIHVwZGF0ZSk7XG4gICAgYmluZChuZXh0LCBcImNsaWNrXCIsIGFwcGx5KGdvLCBcIj5cIikpO1xuICAgIGJpbmQocHJldiwgXCJjbGlja1wiLCBhcHBseShnbywgXCI8XCIpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvKGNvbnRyb2wpIHtcbiAgICBDb250cm9sbGVyLmdvKGNvbnRyb2wsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyb3dzKCkge1xuICAgIHdyYXBwZXIgPSBwbGFjZWhvbGRlciB8fCBjcmVhdGUoXCJkaXZcIiwgY2xhc3Nlcy5hcnJvd3MpO1xuICAgIHByZXYgPSBjcmVhdGVBcnJvdyh0cnVlKTtcbiAgICBuZXh0ID0gY3JlYXRlQXJyb3coZmFsc2UpO1xuICAgIGNyZWF0ZWQgPSB0cnVlO1xuICAgIGFwcGVuZCh3cmFwcGVyLCBbcHJldiwgbmV4dF0pO1xuICAgICFwbGFjZWhvbGRlciAmJiBiZWZvcmUod3JhcHBlciwgdHJhY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyb3cocHJldjIpIHtcbiAgICB2YXIgYXJyb3cgPSBcIjxidXR0b24gY2xhc3M9XFxcIlwiICsgY2xhc3Nlcy5hcnJvdyArIFwiIFwiICsgKHByZXYyID8gY2xhc3Nlcy5wcmV2IDogY2xhc3Nlcy5uZXh0KSArIFwiXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiPjxzdmcgeG1sbnM9XFxcIlwiICsgWE1MX05BTUVfU1BBQ0UgKyBcIlxcXCIgdmlld0JveD1cXFwiMCAwIFwiICsgU0laRSArIFwiIFwiICsgU0laRSArIFwiXFxcIiB3aWR0aD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiIGhlaWdodD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiIGZvY3VzYWJsZT1cXFwiZmFsc2VcXFwiPjxwYXRoIGQ9XFxcIlwiICsgKG9wdGlvbnMuYXJyb3dQYXRoIHx8IFBBVEgpICsgXCJcXFwiIC8+XCI7XG4gICAgcmV0dXJuIHBhcnNlSHRtbChhcnJvdyk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgaWYgKHByZXYgJiYgbmV4dCkge1xuICAgICAgdmFyIGluZGV4ID0gU3BsaWRlMi5pbmRleDtcbiAgICAgIHZhciBwcmV2SW5kZXggPSBDb250cm9sbGVyLmdldFByZXYoKTtcbiAgICAgIHZhciBuZXh0SW5kZXggPSBDb250cm9sbGVyLmdldE5leHQoKTtcbiAgICAgIHZhciBwcmV2TGFiZWwgPSBwcmV2SW5kZXggPiAtMSAmJiBpbmRleCA8IHByZXZJbmRleCA/IGkxOG4ubGFzdCA6IGkxOG4ucHJldjtcbiAgICAgIHZhciBuZXh0TGFiZWwgPSBuZXh0SW5kZXggPiAtMSAmJiBpbmRleCA+IG5leHRJbmRleCA/IGkxOG4uZmlyc3QgOiBpMThuLm5leHQ7XG4gICAgICBwcmV2LmRpc2FibGVkID0gcHJldkluZGV4IDwgMDtcbiAgICAgIG5leHQuZGlzYWJsZWQgPSBuZXh0SW5kZXggPCAwO1xuICAgICAgc2V0QXR0cmlidXRlKHByZXYsIEFSSUFfTEFCRUwsIHByZXZMYWJlbCk7XG4gICAgICBzZXRBdHRyaWJ1dGUobmV4dCwgQVJJQV9MQUJFTCwgbmV4dExhYmVsKTtcbiAgICAgIGVtaXQoRVZFTlRfQVJST1dTX1VQREFURUQsIHByZXYsIG5leHQsIHByZXZJbmRleCwgbmV4dEluZGV4KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFycm93czogYXJyb3dzLFxuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHVwZGF0ZTogdXBkYXRlXG4gIH07XG59XG5cbnZhciBJTlRFUlZBTF9EQVRBX0FUVFJJQlVURSA9IERBVEFfQVRUUklCVVRFICsgXCItaW50ZXJ2YWxcIjtcblxuZnVuY3Rpb24gQXV0b3BsYXkoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTYgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlNi5vbixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2U2LmJpbmQsXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlNi5lbWl0O1xuXG4gIHZhciBpbnRlcnZhbCA9IFJlcXVlc3RJbnRlcnZhbChvcHRpb25zLmludGVydmFsLCBTcGxpZGUyLmdvLmJpbmQoU3BsaWRlMiwgXCI+XCIpLCBvbkFuaW1hdGlvbkZyYW1lKTtcbiAgdmFyIGlzUGF1c2VkID0gaW50ZXJ2YWwuaXNQYXVzZWQ7XG4gIHZhciBFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgX0NvbXBvbmVudHMyJEVsZW1lbnRzNCA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgcm9vdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czQucm9vdCxcbiAgICAgIHRvZ2dsZSA9IF9Db21wb25lbnRzMiRFbGVtZW50czQudG9nZ2xlO1xuICB2YXIgYXV0b3BsYXkgPSBvcHRpb25zLmF1dG9wbGF5O1xuICB2YXIgaG92ZXJlZDtcbiAgdmFyIGZvY3VzZWQ7XG4gIHZhciBzdG9wcGVkID0gYXV0b3BsYXkgPT09IFwicGF1c2VcIjtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpZiAoYXV0b3BsYXkpIHtcbiAgICAgIGxpc3RlbigpO1xuICAgICAgdG9nZ2xlICYmIHNldEF0dHJpYnV0ZSh0b2dnbGUsIEFSSUFfQ09OVFJPTFMsIEVsZW1lbnRzLnRyYWNrLmlkKTtcbiAgICAgIHN0b3BwZWQgfHwgcGxheSgpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKCkge1xuICAgIGlmIChvcHRpb25zLnBhdXNlT25Ib3Zlcikge1xuICAgICAgYmluZChyb290LCBcIm1vdXNlZW50ZXIgbW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBob3ZlcmVkID0gZS50eXBlID09PSBcIm1vdXNlZW50ZXJcIjtcbiAgICAgICAgYXV0b1RvZ2dsZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucGF1c2VPbkZvY3VzKSB7XG4gICAgICBiaW5kKHJvb3QsIFwiZm9jdXNpbiBmb2N1c291dFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBmb2N1c2VkID0gZS50eXBlID09PSBcImZvY3VzaW5cIjtcbiAgICAgICAgYXV0b1RvZ2dsZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgYmluZCh0b2dnbGUsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzdG9wcGVkID8gcGxheSgpIDogcGF1c2UodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBvbihbRVZFTlRfTU9WRSwgRVZFTlRfU0NST0xMLCBFVkVOVF9SRUZSRVNIXSwgaW50ZXJ2YWwucmV3aW5kKTtcbiAgICBvbihFVkVOVF9NT1ZFLCBvbk1vdmUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICBpZiAoaXNQYXVzZWQoKSAmJiBDb21wb25lbnRzMi5TbGlkZXMuaXNFbm91Z2goKSkge1xuICAgICAgaW50ZXJ2YWwuc3RhcnQoIW9wdGlvbnMucmVzZXRQcm9ncmVzcyk7XG4gICAgICBmb2N1c2VkID0gaG92ZXJlZCA9IHN0b3BwZWQgPSBmYWxzZTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgICAgZW1pdChFVkVOVF9BVVRPUExBWV9QTEFZKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZShzdG9wKSB7XG4gICAgaWYgKHN0b3AgPT09IHZvaWQgMCkge1xuICAgICAgc3RvcCA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RvcHBlZCA9ICEhc3RvcDtcbiAgICB1cGRhdGUoKTtcblxuICAgIGlmICghaXNQYXVzZWQoKSkge1xuICAgICAgaW50ZXJ2YWwucGF1c2UoKTtcbiAgICAgIGVtaXQoRVZFTlRfQVVUT1BMQVlfUEFVU0UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGF1dG9Ub2dnbGUoKSB7XG4gICAgaWYgKCFzdG9wcGVkKSB7XG4gICAgICBob3ZlcmVkIHx8IGZvY3VzZWQgPyBwYXVzZShmYWxzZSkgOiBwbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIHRvZ2dsZUNsYXNzKHRvZ2dsZSwgQ0xBU1NfQUNUSVZFLCAhc3RvcHBlZCk7XG4gICAgICBzZXRBdHRyaWJ1dGUodG9nZ2xlLCBBUklBX0xBQkVMLCBvcHRpb25zLmkxOG5bc3RvcHBlZCA/IFwicGxheVwiIDogXCJwYXVzZVwiXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25BbmltYXRpb25GcmFtZShyYXRlKSB7XG4gICAgdmFyIGJhciA9IEVsZW1lbnRzLmJhcjtcbiAgICBiYXIgJiYgc3R5bGUoYmFyLCBcIndpZHRoXCIsIHJhdGUgKiAxMDAgKyBcIiVcIik7XG4gICAgZW1pdChFVkVOVF9BVVRPUExBWV9QTEFZSU5HLCByYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTW92ZShpbmRleCkge1xuICAgIHZhciBTbGlkZSA9IENvbXBvbmVudHMyLlNsaWRlcy5nZXRBdChpbmRleCk7XG4gICAgaW50ZXJ2YWwuc2V0KFNsaWRlICYmICtnZXRBdHRyaWJ1dGUoU2xpZGUuc2xpZGUsIElOVEVSVkFMX0RBVEFfQVRUUklCVVRFKSB8fCBvcHRpb25zLmludGVydmFsKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGludGVydmFsLmNhbmNlbCxcbiAgICBwbGF5OiBwbGF5LFxuICAgIHBhdXNlOiBwYXVzZSxcbiAgICBpc1BhdXNlZDogaXNQYXVzZWRcbiAgfTtcbn1cblxuZnVuY3Rpb24gQ292ZXIoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTcgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlNy5vbjtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpZiAob3B0aW9ucy5jb3Zlcikge1xuICAgICAgb24oRVZFTlRfTEFaWUxPQURfTE9BREVELCBhcHBseSh0b2dnbGUsIHRydWUpKTtcbiAgICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9VUERBVEVELCBFVkVOVF9SRUZSRVNIXSwgYXBwbHkoY292ZXIsIHRydWUpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb3Zlcihjb3ZlcjIpIHtcbiAgICBDb21wb25lbnRzMi5TbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUpIHtcbiAgICAgIHZhciBpbWcgPSBjaGlsZChTbGlkZS5jb250YWluZXIgfHwgU2xpZGUuc2xpZGUsIFwiaW1nXCIpO1xuXG4gICAgICBpZiAoaW1nICYmIGltZy5zcmMpIHtcbiAgICAgICAgdG9nZ2xlKGNvdmVyMiwgaW1nLCBTbGlkZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGUoY292ZXIyLCBpbWcsIFNsaWRlKSB7XG4gICAgU2xpZGUuc3R5bGUoXCJiYWNrZ3JvdW5kXCIsIGNvdmVyMiA/IFwiY2VudGVyL2NvdmVyIG5vLXJlcGVhdCB1cmwoXFxcIlwiICsgaW1nLnNyYyArIFwiXFxcIilcIiA6IFwiXCIsIHRydWUpO1xuICAgIGRpc3BsYXkoaW1nLCBjb3ZlcjIgPyBcIm5vbmVcIiA6IFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogYXBwbHkoY292ZXIsIGZhbHNlKVxuICB9O1xufVxuXG52YXIgQk9VTkNFX0RJRkZfVEhSRVNIT0xEID0gMTA7XG52YXIgQk9VTkNFX0RVUkFUSU9OID0gNjAwO1xudmFyIEZSSUNUSU9OX0ZBQ1RPUiA9IDAuNjtcbnZhciBCQVNFX1ZFTE9DSVRZID0gMS41O1xudmFyIE1JTl9EVVJBVElPTiA9IDgwMDtcblxuZnVuY3Rpb24gU2Nyb2xsKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U4ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTgub24sXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlOC5lbWl0O1xuXG4gIHZhciBzZXQgPSBTcGxpZGUyLnN0YXRlLnNldDtcbiAgdmFyIE1vdmUgPSBDb21wb25lbnRzMi5Nb3ZlO1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZ2V0TGltaXQgPSBNb3ZlLmdldExpbWl0LFxuICAgICAgZXhjZWVkZWRMaW1pdCA9IE1vdmUuZXhjZWVkZWRMaW1pdCxcbiAgICAgIHRyYW5zbGF0ZSA9IE1vdmUudHJhbnNsYXRlO1xuICB2YXIgaXNTbGlkZSA9IFNwbGlkZTIuaXMoU0xJREUpO1xuICB2YXIgaW50ZXJ2YWw7XG4gIHZhciBjYWxsYmFjaztcbiAgdmFyIGZyaWN0aW9uID0gMTtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBvbihFVkVOVF9NT1ZFLCBjbGVhcik7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBjYW5jZWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsKGRlc3RpbmF0aW9uLCBkdXJhdGlvbiwgc25hcCwgb25TY3JvbGxlZCwgbm9Db25zdHJhaW4pIHtcbiAgICB2YXIgZnJvbSA9IGdldFBvc2l0aW9uKCk7XG4gICAgY2xlYXIoKTtcblxuICAgIGlmIChzbmFwICYmICghaXNTbGlkZSB8fCAhZXhjZWVkZWRMaW1pdCgpKSkge1xuICAgICAgdmFyIHNpemUgPSBDb21wb25lbnRzMi5MYXlvdXQuc2xpZGVyU2l6ZSgpO1xuICAgICAgdmFyIG9mZnNldCA9IHNpZ24oZGVzdGluYXRpb24pICogc2l6ZSAqIGZsb29yKGFicyhkZXN0aW5hdGlvbikgLyBzaXplKSB8fCAwO1xuICAgICAgZGVzdGluYXRpb24gPSBNb3ZlLnRvUG9zaXRpb24oQ29tcG9uZW50czIuQ29udHJvbGxlci50b0Rlc3QoZGVzdGluYXRpb24gJSBzaXplKSkgKyBvZmZzZXQ7XG4gICAgfVxuXG4gICAgdmFyIG5vRGlzdGFuY2UgPSBhcHByb3hpbWF0ZWx5RXF1YWwoZnJvbSwgZGVzdGluYXRpb24sIDEpO1xuICAgIGZyaWN0aW9uID0gMTtcbiAgICBkdXJhdGlvbiA9IG5vRGlzdGFuY2UgPyAwIDogZHVyYXRpb24gfHwgbWF4KGFicyhkZXN0aW5hdGlvbiAtIGZyb20pIC8gQkFTRV9WRUxPQ0lUWSwgTUlOX0RVUkFUSU9OKTtcbiAgICBjYWxsYmFjayA9IG9uU2Nyb2xsZWQ7XG4gICAgaW50ZXJ2YWwgPSBSZXF1ZXN0SW50ZXJ2YWwoZHVyYXRpb24sIG9uRW5kLCBhcHBseSh1cGRhdGUsIGZyb20sIGRlc3RpbmF0aW9uLCBub0NvbnN0cmFpbiksIDEpO1xuICAgIHNldChTQ1JPTExJTkcpO1xuICAgIGVtaXQoRVZFTlRfU0NST0xMKTtcbiAgICBpbnRlcnZhbC5zdGFydCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25FbmQoKSB7XG4gICAgc2V0KElETEUpO1xuICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgZW1pdChFVkVOVF9TQ1JPTExFRCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoZnJvbSwgdG8sIG5vQ29uc3RyYWluLCByYXRlKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gZ2V0UG9zaXRpb24oKTtcbiAgICB2YXIgdGFyZ2V0ID0gZnJvbSArICh0byAtIGZyb20pICogZWFzaW5nKHJhdGUpO1xuICAgIHZhciBkaWZmID0gKHRhcmdldCAtIHBvc2l0aW9uKSAqIGZyaWN0aW9uO1xuICAgIHRyYW5zbGF0ZShwb3NpdGlvbiArIGRpZmYpO1xuXG4gICAgaWYgKGlzU2xpZGUgJiYgIW5vQ29uc3RyYWluICYmIGV4Y2VlZGVkTGltaXQoKSkge1xuICAgICAgZnJpY3Rpb24gKj0gRlJJQ1RJT05fRkFDVE9SO1xuXG4gICAgICBpZiAoYWJzKGRpZmYpIDwgQk9VTkNFX0RJRkZfVEhSRVNIT0xEKSB7XG4gICAgICAgIHNjcm9sbChnZXRMaW1pdChleGNlZWRlZExpbWl0KHRydWUpKSwgQk9VTkNFX0RVUkFUSU9OLCBmYWxzZSwgY2FsbGJhY2ssIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGlmIChpbnRlcnZhbCkge1xuICAgICAgaW50ZXJ2YWwuY2FuY2VsKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmIChpbnRlcnZhbCAmJiAhaW50ZXJ2YWwuaXNQYXVzZWQoKSkge1xuICAgICAgY2xlYXIoKTtcbiAgICAgIG9uRW5kKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZWFzaW5nKHQpIHtcbiAgICB2YXIgZWFzaW5nRnVuYyA9IG9wdGlvbnMuZWFzaW5nRnVuYztcbiAgICByZXR1cm4gZWFzaW5nRnVuYyA/IGVhc2luZ0Z1bmModCkgOiAxIC0gTWF0aC5wb3coMSAtIHQsIDQpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogY2xlYXIsXG4gICAgc2Nyb2xsOiBzY3JvbGwsXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn1cblxudmFyIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TID0ge1xuICBwYXNzaXZlOiBmYWxzZSxcbiAgY2FwdHVyZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gRHJhZyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlOSA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U5Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTkuZW1pdCxcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2U5LmJpbmQsXG4gICAgICB1bmJpbmQgPSBfRXZlbnRJbnRlcmZhY2U5LnVuYmluZDtcblxuICB2YXIgc3RhdGUgPSBTcGxpZGUyLnN0YXRlO1xuICB2YXIgTW92ZSA9IENvbXBvbmVudHMyLk1vdmUsXG4gICAgICBTY3JvbGwgPSBDb21wb25lbnRzMi5TY3JvbGwsXG4gICAgICBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcixcbiAgICAgIHRyYWNrID0gQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2ssXG4gICAgICByZWR1Y2UgPSBDb21wb25lbnRzMi5NZWRpYS5yZWR1Y2U7XG4gIHZhciBfQ29tcG9uZW50czIkRGlyZWN0aW8yID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLFxuICAgICAgcmVzb2x2ZSA9IF9Db21wb25lbnRzMiREaXJlY3RpbzIucmVzb2x2ZSxcbiAgICAgIG9yaWVudCA9IF9Db21wb25lbnRzMiREaXJlY3RpbzIub3JpZW50O1xuICB2YXIgZ2V0UG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uLFxuICAgICAgZXhjZWVkZWRMaW1pdCA9IE1vdmUuZXhjZWVkZWRMaW1pdDtcbiAgdmFyIGJhc2VQb3NpdGlvbjtcbiAgdmFyIGJhc2VFdmVudDtcbiAgdmFyIHByZXZCYXNlRXZlbnQ7XG4gIHZhciBpc0ZyZWU7XG4gIHZhciBkcmFnZ2luZztcbiAgdmFyIGV4Y2VlZGVkID0gZmFsc2U7XG4gIHZhciBjbGlja1ByZXZlbnRlZDtcbiAgdmFyIGRpc2FibGVkO1xuICB2YXIgdGFyZ2V0O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGJpbmQodHJhY2ssIFBPSU5URVJfTU9WRV9FVkVOVFMsIG5vb3AsIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICBiaW5kKHRyYWNrLCBQT0lOVEVSX1VQX0VWRU5UUywgbm9vcCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgIGJpbmQodHJhY2ssIFBPSU5URVJfRE9XTl9FVkVOVFMsIG9uUG9pbnRlckRvd24sIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICBiaW5kKHRyYWNrLCBcImNsaWNrXCIsIG9uQ2xpY2ssIHtcbiAgICAgIGNhcHR1cmU6IHRydWVcbiAgICB9KTtcbiAgICBiaW5kKHRyYWNrLCBcImRyYWdzdGFydFwiLCBwcmV2ZW50KTtcbiAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfVVBEQVRFRF0sIGluaXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgZHJhZyA9IG9wdGlvbnMuZHJhZztcbiAgICBkaXNhYmxlKCFkcmFnKTtcbiAgICBpc0ZyZWUgPSBkcmFnID09PSBcImZyZWVcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlckRvd24oZSkge1xuICAgIGNsaWNrUHJldmVudGVkID0gZmFsc2U7XG5cbiAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICB2YXIgaXNUb3VjaCA9IGlzVG91Y2hFdmVudChlKTtcblxuICAgICAgaWYgKGlzRHJhZ2dhYmxlKGUudGFyZ2V0KSAmJiAoaXNUb3VjaCB8fCAhZS5idXR0b24pKSB7XG4gICAgICAgIGlmICghQ29udHJvbGxlci5pc0J1c3koKSkge1xuICAgICAgICAgIHRhcmdldCA9IGlzVG91Y2ggPyB0cmFjayA6IHdpbmRvdztcbiAgICAgICAgICBkcmFnZ2luZyA9IHN0YXRlLmlzKFtNT1ZJTkcsIFNDUk9MTElOR10pO1xuICAgICAgICAgIHByZXZCYXNlRXZlbnQgPSBudWxsO1xuICAgICAgICAgIGJpbmQodGFyZ2V0LCBQT0lOVEVSX01PVkVfRVZFTlRTLCBvblBvaW50ZXJNb3ZlLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgICAgICAgYmluZCh0YXJnZXQsIFBPSU5URVJfVVBfRVZFTlRTLCBvblBvaW50ZXJVcCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgICAgICAgIE1vdmUuY2FuY2VsKCk7XG4gICAgICAgICAgU2Nyb2xsLmNhbmNlbCgpO1xuICAgICAgICAgIHNhdmUoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlck1vdmUoZSkge1xuICAgIGlmICghc3RhdGUuaXMoRFJBR0dJTkcpKSB7XG4gICAgICBzdGF0ZS5zZXQoRFJBR0dJTkcpO1xuICAgICAgZW1pdChFVkVOVF9EUkFHKTtcbiAgICB9XG5cbiAgICBpZiAoZS5jYW5jZWxhYmxlKSB7XG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgTW92ZS50cmFuc2xhdGUoYmFzZVBvc2l0aW9uICsgY29uc3RyYWluKGRpZmZDb29yZChlKSkpO1xuICAgICAgICB2YXIgZXhwaXJlZCA9IGRpZmZUaW1lKGUpID4gTE9HX0lOVEVSVkFMO1xuICAgICAgICB2YXIgaGFzRXhjZWVkZWQgPSBleGNlZWRlZCAhPT0gKGV4Y2VlZGVkID0gZXhjZWVkZWRMaW1pdCgpKTtcblxuICAgICAgICBpZiAoZXhwaXJlZCB8fCBoYXNFeGNlZWRlZCkge1xuICAgICAgICAgIHNhdmUoZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjbGlja1ByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgIGVtaXQoRVZFTlRfRFJBR0dJTkcpO1xuICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgfSBlbHNlIGlmIChpc1NsaWRlckRpcmVjdGlvbihlKSkge1xuICAgICAgICBkcmFnZ2luZyA9IHNob3VsZFN0YXJ0KGUpO1xuICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUG9pbnRlclVwKGUpIHtcbiAgICBpZiAoc3RhdGUuaXMoRFJBR0dJTkcpKSB7XG4gICAgICBzdGF0ZS5zZXQoSURMRSk7XG4gICAgICBlbWl0KEVWRU5UX0RSQUdHRUQpO1xuICAgIH1cblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgbW92ZShlKTtcbiAgICAgIHByZXZlbnQoZSk7XG4gICAgfVxuXG4gICAgdW5iaW5kKHRhcmdldCwgUE9JTlRFUl9NT1ZFX0VWRU5UUywgb25Qb2ludGVyTW92ZSk7XG4gICAgdW5iaW5kKHRhcmdldCwgUE9JTlRFUl9VUF9FVkVOVFMsIG9uUG9pbnRlclVwKTtcbiAgICBkcmFnZ2luZyA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgaWYgKCFkaXNhYmxlZCAmJiBjbGlja1ByZXZlbnRlZCkge1xuICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlKGUpIHtcbiAgICBwcmV2QmFzZUV2ZW50ID0gYmFzZUV2ZW50O1xuICAgIGJhc2VFdmVudCA9IGU7XG4gICAgYmFzZVBvc2l0aW9uID0gZ2V0UG9zaXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZSkge1xuICAgIHZhciB2ZWxvY2l0eSA9IGNvbXB1dGVWZWxvY2l0eShlKTtcbiAgICB2YXIgZGVzdGluYXRpb24gPSBjb21wdXRlRGVzdGluYXRpb24odmVsb2NpdHkpO1xuICAgIHZhciByZXdpbmQgPSBvcHRpb25zLnJld2luZCAmJiBvcHRpb25zLnJld2luZEJ5RHJhZztcbiAgICByZWR1Y2UoZmFsc2UpO1xuXG4gICAgaWYgKGlzRnJlZSkge1xuICAgICAgQ29udHJvbGxlci5zY3JvbGwoZGVzdGluYXRpb24sIDAsIG9wdGlvbnMuc25hcCk7XG4gICAgfSBlbHNlIGlmIChTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICBDb250cm9sbGVyLmdvKG9yaWVudChzaWduKHZlbG9jaXR5KSkgPCAwID8gcmV3aW5kID8gXCI8XCIgOiBcIi1cIiA6IHJld2luZCA/IFwiPlwiIDogXCIrXCIpO1xuICAgIH0gZWxzZSBpZiAoU3BsaWRlMi5pcyhTTElERSkgJiYgZXhjZWVkZWQgJiYgcmV3aW5kKSB7XG4gICAgICBDb250cm9sbGVyLmdvKGV4Y2VlZGVkTGltaXQodHJ1ZSkgPyBcIj5cIiA6IFwiPFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29udHJvbGxlci5nbyhDb250cm9sbGVyLnRvRGVzdChkZXN0aW5hdGlvbiksIHRydWUpO1xuICAgIH1cblxuICAgIHJlZHVjZSh0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZFN0YXJ0KGUpIHtcbiAgICB2YXIgdGhyZXNob2xkcyA9IG9wdGlvbnMuZHJhZ01pblRocmVzaG9sZDtcbiAgICB2YXIgaXNPYmogPSBpc09iamVjdCh0aHJlc2hvbGRzKTtcbiAgICB2YXIgbW91c2UgPSBpc09iaiAmJiB0aHJlc2hvbGRzLm1vdXNlIHx8IDA7XG4gICAgdmFyIHRvdWNoID0gKGlzT2JqID8gdGhyZXNob2xkcy50b3VjaCA6ICt0aHJlc2hvbGRzKSB8fCAxMDtcbiAgICByZXR1cm4gYWJzKGRpZmZDb29yZChlKSkgPiAoaXNUb3VjaEV2ZW50KGUpID8gdG91Y2ggOiBtb3VzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1NsaWRlckRpcmVjdGlvbihlKSB7XG4gICAgcmV0dXJuIGFicyhkaWZmQ29vcmQoZSkpID4gYWJzKGRpZmZDb29yZChlLCB0cnVlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlVmVsb2NpdHkoZSkge1xuICAgIGlmIChTcGxpZGUyLmlzKExPT1ApIHx8ICFleGNlZWRlZCkge1xuICAgICAgdmFyIHRpbWUgPSBkaWZmVGltZShlKTtcblxuICAgICAgaWYgKHRpbWUgJiYgdGltZSA8IExPR19JTlRFUlZBTCkge1xuICAgICAgICByZXR1cm4gZGlmZkNvb3JkKGUpIC8gdGltZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVEZXN0aW5hdGlvbih2ZWxvY2l0eSkge1xuICAgIHJldHVybiBnZXRQb3NpdGlvbigpICsgc2lnbih2ZWxvY2l0eSkgKiBtaW4oYWJzKHZlbG9jaXR5KSAqIChvcHRpb25zLmZsaWNrUG93ZXIgfHwgNjAwKSwgaXNGcmVlID8gSW5maW5pdHkgOiBDb21wb25lbnRzMi5MYXlvdXQubGlzdFNpemUoKSAqIChvcHRpb25zLmZsaWNrTWF4UGFnZXMgfHwgMSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlmZkNvb3JkKGUsIG9ydGhvZ29uYWwpIHtcbiAgICByZXR1cm4gY29vcmRPZihlLCBvcnRob2dvbmFsKSAtIGNvb3JkT2YoZ2V0QmFzZUV2ZW50KGUpLCBvcnRob2dvbmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpZmZUaW1lKGUpIHtcbiAgICByZXR1cm4gdGltZU9mKGUpIC0gdGltZU9mKGdldEJhc2VFdmVudChlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCYXNlRXZlbnQoZSkge1xuICAgIHJldHVybiBiYXNlRXZlbnQgPT09IGUgJiYgcHJldkJhc2VFdmVudCB8fCBiYXNlRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBjb29yZE9mKGUsIG9ydGhvZ29uYWwpIHtcbiAgICByZXR1cm4gKGlzVG91Y2hFdmVudChlKSA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlKVtcInBhZ2VcIiArIHJlc29sdmUob3J0aG9nb25hbCA/IFwiWVwiIDogXCJYXCIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cmFpbihkaWZmKSB7XG4gICAgcmV0dXJuIGRpZmYgLyAoZXhjZWVkZWQgJiYgU3BsaWRlMi5pcyhTTElERSkgPyBGUklDVElPTiA6IDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNEcmFnZ2FibGUodGFyZ2V0Mikge1xuICAgIHZhciBub0RyYWcgPSBvcHRpb25zLm5vRHJhZztcbiAgICByZXR1cm4gIW1hdGNoZXModGFyZ2V0MiwgXCIuXCIgKyBDTEFTU19QQUdJTkFUSU9OX1BBR0UgKyBcIiwgLlwiICsgQ0xBU1NfQVJST1cpICYmICghbm9EcmFnIHx8ICFtYXRjaGVzKHRhcmdldDIsIG5vRHJhZykpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNUb3VjaEV2ZW50KGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIFRvdWNoRXZlbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc0RyYWdnaW5nKCkge1xuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGUodmFsdWUpIHtcbiAgICBkaXNhYmxlZCA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGlzYWJsZTogZGlzYWJsZSxcbiAgICBpc0RyYWdnaW5nOiBpc0RyYWdnaW5nXG4gIH07XG59XG5cbnZhciBOT1JNQUxJWkFUSU9OX01BUCA9IHtcbiAgU3BhY2ViYXI6IFwiIFwiLFxuICBSaWdodDogQVJST1dfUklHSFQsXG4gIExlZnQ6IEFSUk9XX0xFRlQsXG4gIFVwOiBBUlJPV19VUCxcbiAgRG93bjogQVJST1dfRE9XTlxufTtcblxuZnVuY3Rpb24gbm9ybWFsaXplS2V5KGtleSkge1xuICBrZXkgPSBpc1N0cmluZyhrZXkpID8ga2V5IDoga2V5LmtleTtcbiAgcmV0dXJuIE5PUk1BTElaQVRJT05fTUFQW2tleV0gfHwga2V5O1xufVxuXG52YXIgS0VZQk9BUkRfRVZFTlQgPSBcImtleWRvd25cIjtcblxuZnVuY3Rpb24gS2V5Ym9hcmQoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTEwID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTEwLm9uLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTEwLmJpbmQsXG4gICAgICB1bmJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMC51bmJpbmQ7XG5cbiAgdmFyIHJvb3QgPSBTcGxpZGUyLnJvb3Q7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLnJlc29sdmU7XG4gIHZhciB0YXJnZXQ7XG4gIHZhciBkaXNhYmxlZDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgZGVzdHJveSk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgaW5pdCk7XG4gICAgb24oRVZFTlRfTU9WRSwgb25Nb3ZlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGtleWJvYXJkID0gb3B0aW9ucy5rZXlib2FyZDtcblxuICAgIGlmIChrZXlib2FyZCkge1xuICAgICAgdGFyZ2V0ID0ga2V5Ym9hcmQgPT09IFwiZ2xvYmFsXCIgPyB3aW5kb3cgOiByb290O1xuICAgICAgYmluZCh0YXJnZXQsIEtFWUJPQVJEX0VWRU5ULCBvbktleWRvd24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdW5iaW5kKHRhcmdldCwgS0VZQk9BUkRfRVZFTlQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzYWJsZSh2YWx1ZSkge1xuICAgIGRpc2FibGVkID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBvbk1vdmUoKSB7XG4gICAgdmFyIF9kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBkaXNhYmxlZCA9IF9kaXNhYmxlZDtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihlKSB7XG4gICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgdmFyIGtleSA9IG5vcm1hbGl6ZUtleShlKTtcblxuICAgICAgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19MRUZUKSkge1xuICAgICAgICBTcGxpZGUyLmdvKFwiPFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSByZXNvbHZlKEFSUk9XX1JJR0hUKSkge1xuICAgICAgICBTcGxpZGUyLmdvKFwiPlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIGRpc2FibGU6IGRpc2FibGVcbiAgfTtcbn1cblxudmFyIFNSQ19EQVRBX0FUVFJJQlVURSA9IERBVEFfQVRUUklCVVRFICsgXCItbGF6eVwiO1xudmFyIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSA9IFNSQ19EQVRBX0FUVFJJQlVURSArIFwiLXNyY3NldFwiO1xudmFyIElNQUdFX1NFTEVDVE9SID0gXCJbXCIgKyBTUkNfREFUQV9BVFRSSUJVVEUgKyBcIl0sIFtcIiArIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSArIFwiXVwiO1xuXG5mdW5jdGlvbiBMYXp5TG9hZChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTEgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTEub24sXG4gICAgICBvZmYgPSBfRXZlbnRJbnRlcmZhY2UxMS5vZmYsXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMTEuYmluZCxcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2UxMS5lbWl0O1xuXG4gIHZhciBpc1NlcXVlbnRpYWwgPSBvcHRpb25zLmxhenlMb2FkID09PSBcInNlcXVlbnRpYWxcIjtcbiAgdmFyIGV2ZW50cyA9IFtFVkVOVF9NT1ZFRCwgRVZFTlRfU0NST0xMRURdO1xuICB2YXIgZW50cmllcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChvcHRpb25zLmxhenlMb2FkKSB7XG4gICAgICBpbml0KCk7XG4gICAgICBvbihFVkVOVF9SRUZSRVNILCBpbml0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGVtcHR5KGVudHJpZXMpO1xuICAgIHJlZ2lzdGVyKCk7XG5cbiAgICBpZiAoaXNTZXF1ZW50aWFsKSB7XG4gICAgICBsb2FkTmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmYoZXZlbnRzKTtcbiAgICAgIG9uKGV2ZW50cywgY2hlY2spO1xuICAgICAgY2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcigpIHtcbiAgICBDb21wb25lbnRzMi5TbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUpIHtcbiAgICAgIHF1ZXJ5QWxsKFNsaWRlLnNsaWRlLCBJTUFHRV9TRUxFQ1RPUikuZm9yRWFjaChmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgIHZhciBzcmMgPSBnZXRBdHRyaWJ1dGUoaW1nLCBTUkNfREFUQV9BVFRSSUJVVEUpO1xuICAgICAgICB2YXIgc3Jjc2V0ID0gZ2V0QXR0cmlidXRlKGltZywgU1JDU0VUX0RBVEFfQVRUUklCVVRFKTtcblxuICAgICAgICBpZiAoc3JjICE9PSBpbWcuc3JjIHx8IHNyY3NldCAhPT0gaW1nLnNyY3NldCkge1xuICAgICAgICAgIHZhciBjbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzZXMuc3Bpbm5lcjtcbiAgICAgICAgICB2YXIgcGFyZW50ID0gaW1nLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgdmFyIHNwaW5uZXIgPSBjaGlsZChwYXJlbnQsIFwiLlwiICsgY2xhc3NOYW1lKSB8fCBjcmVhdGUoXCJzcGFuXCIsIGNsYXNzTmFtZSwgcGFyZW50KTtcbiAgICAgICAgICBlbnRyaWVzLnB1c2goW2ltZywgU2xpZGUsIHNwaW5uZXJdKTtcbiAgICAgICAgICBpbWcuc3JjIHx8IGRpc3BsYXkoaW1nLCBcIm5vbmVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2soKSB7XG4gICAgZW50cmllcyA9IGVudHJpZXMuZmlsdGVyKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgZGlzdGFuY2UgPSBvcHRpb25zLnBlclBhZ2UgKiAoKG9wdGlvbnMucHJlbG9hZFBhZ2VzIHx8IDEpICsgMSkgLSAxO1xuICAgICAgcmV0dXJuIGRhdGFbMV0uaXNXaXRoaW4oU3BsaWRlMi5pbmRleCwgZGlzdGFuY2UpID8gbG9hZChkYXRhKSA6IHRydWU7XG4gICAgfSk7XG4gICAgZW50cmllcy5sZW5ndGggfHwgb2ZmKGV2ZW50cyk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkKGRhdGEpIHtcbiAgICB2YXIgaW1nID0gZGF0YVswXTtcbiAgICBhZGRDbGFzcyhkYXRhWzFdLnNsaWRlLCBDTEFTU19MT0FESU5HKTtcbiAgICBiaW5kKGltZywgXCJsb2FkIGVycm9yXCIsIGFwcGx5KG9uTG9hZCwgZGF0YSkpO1xuICAgIHNldEF0dHJpYnV0ZShpbWcsIFwic3JjXCIsIGdldEF0dHJpYnV0ZShpbWcsIFNSQ19EQVRBX0FUVFJJQlVURSkpO1xuICAgIHNldEF0dHJpYnV0ZShpbWcsIFwic3Jjc2V0XCIsIGdldEF0dHJpYnV0ZShpbWcsIFNSQ1NFVF9EQVRBX0FUVFJJQlVURSkpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShpbWcsIFNSQ19EQVRBX0FUVFJJQlVURSk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKGltZywgU1JDU0VUX0RBVEFfQVRUUklCVVRFKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTG9hZChkYXRhLCBlKSB7XG4gICAgdmFyIGltZyA9IGRhdGFbMF0sXG4gICAgICAgIFNsaWRlID0gZGF0YVsxXTtcbiAgICByZW1vdmVDbGFzcyhTbGlkZS5zbGlkZSwgQ0xBU1NfTE9BRElORyk7XG5cbiAgICBpZiAoZS50eXBlICE9PSBcImVycm9yXCIpIHtcbiAgICAgIHJlbW92ZShkYXRhWzJdKTtcbiAgICAgIGRpc3BsYXkoaW1nLCBcIlwiKTtcbiAgICAgIGVtaXQoRVZFTlRfTEFaWUxPQURfTE9BREVELCBpbWcsIFNsaWRlKTtcbiAgICAgIGVtaXQoRVZFTlRfUkVTSVpFKTtcbiAgICB9XG5cbiAgICBpc1NlcXVlbnRpYWwgJiYgbG9hZE5leHQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWROZXh0KCkge1xuICAgIGVudHJpZXMubGVuZ3RoICYmIGxvYWQoZW50cmllcy5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGFwcGx5KGVtcHR5LCBlbnRyaWVzKSxcbiAgICBjaGVjazogY2hlY2tcbiAgfTtcbn1cblxuZnVuY3Rpb24gUGFnaW5hdGlvbihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBlbWl0ID0gZXZlbnQuZW1pdCxcbiAgICAgIGJpbmQgPSBldmVudC5iaW5kO1xuICB2YXIgU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzLFxuICAgICAgRWxlbWVudHMgPSBDb21wb25lbnRzMi5FbGVtZW50cyxcbiAgICAgIENvbnRyb2xsZXIgPSBDb21wb25lbnRzMi5Db250cm9sbGVyO1xuICB2YXIgaGFzRm9jdXMgPSBDb250cm9sbGVyLmhhc0ZvY3VzLFxuICAgICAgZ2V0SW5kZXggPSBDb250cm9sbGVyLmdldEluZGV4LFxuICAgICAgZ28gPSBDb250cm9sbGVyLmdvO1xuICB2YXIgcmVzb2x2ZSA9IENvbXBvbmVudHMyLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgcGxhY2Vob2xkZXIgPSBFbGVtZW50cy5wYWdpbmF0aW9uO1xuICB2YXIgaXRlbXMgPSBbXTtcbiAgdmFyIGxpc3Q7XG4gIHZhciBwYWdpbmF0aW9uQ2xhc3NlcztcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0gsIEVWRU5UX0VORF9JTkRFWF9DSEFOR0VEXSwgbW91bnQpO1xuICAgIHZhciBlbmFibGVkID0gb3B0aW9ucy5wYWdpbmF0aW9uO1xuICAgIHBsYWNlaG9sZGVyICYmIGRpc3BsYXkocGxhY2Vob2xkZXIsIGVuYWJsZWQgPyBcIlwiIDogXCJub25lXCIpO1xuXG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIG9uKFtFVkVOVF9NT1ZFLCBFVkVOVF9TQ1JPTEwsIEVWRU5UX1NDUk9MTEVEXSwgdXBkYXRlKTtcbiAgICAgIGNyZWF0ZVBhZ2luYXRpb24oKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgICAgZW1pdChFVkVOVF9QQUdJTkFUSU9OX01PVU5URUQsIHtcbiAgICAgICAgbGlzdDogbGlzdCxcbiAgICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgICB9LCBnZXRBdChTcGxpZGUyLmluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAobGlzdCkge1xuICAgICAgcmVtb3ZlKHBsYWNlaG9sZGVyID8gc2xpY2UobGlzdC5jaGlsZHJlbikgOiBsaXN0KTtcbiAgICAgIHJlbW92ZUNsYXNzKGxpc3QsIHBhZ2luYXRpb25DbGFzc2VzKTtcbiAgICAgIGVtcHR5KGl0ZW1zKTtcbiAgICAgIGxpc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhZ2luYXRpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IFNwbGlkZTIubGVuZ3RoO1xuICAgIHZhciBjbGFzc2VzID0gb3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBpMThuID0gb3B0aW9ucy5pMThuLFxuICAgICAgICBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlO1xuICAgIHZhciBtYXggPSBoYXNGb2N1cygpID8gQ29udHJvbGxlci5nZXRFbmQoKSArIDEgOiBjZWlsKGxlbmd0aCAvIHBlclBhZ2UpO1xuICAgIGxpc3QgPSBwbGFjZWhvbGRlciB8fCBjcmVhdGUoXCJ1bFwiLCBjbGFzc2VzLnBhZ2luYXRpb24sIEVsZW1lbnRzLnRyYWNrLnBhcmVudEVsZW1lbnQpO1xuICAgIGFkZENsYXNzKGxpc3QsIHBhZ2luYXRpb25DbGFzc2VzID0gQ0xBU1NfUEFHSU5BVElPTiArIFwiLS1cIiArIGdldERpcmVjdGlvbigpKTtcbiAgICBzZXRBdHRyaWJ1dGUobGlzdCwgUk9MRSwgXCJ0YWJsaXN0XCIpO1xuICAgIHNldEF0dHJpYnV0ZShsaXN0LCBBUklBX0xBQkVMLCBpMThuLnNlbGVjdCk7XG4gICAgc2V0QXR0cmlidXRlKGxpc3QsIEFSSUFfT1JJRU5UQVRJT04sIGdldERpcmVjdGlvbigpID09PSBUVEIgPyBcInZlcnRpY2FsXCIgOiBcIlwiKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgIHZhciBsaSA9IGNyZWF0ZShcImxpXCIsIG51bGwsIGxpc3QpO1xuICAgICAgdmFyIGJ1dHRvbiA9IGNyZWF0ZShcImJ1dHRvblwiLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnBhZ2UsXG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCJcbiAgICAgIH0sIGxpKTtcbiAgICAgIHZhciBjb250cm9scyA9IFNsaWRlcy5nZXRJbihpKS5tYXAoZnVuY3Rpb24gKFNsaWRlKSB7XG4gICAgICAgIHJldHVybiBTbGlkZS5zbGlkZS5pZDtcbiAgICAgIH0pO1xuICAgICAgdmFyIHRleHQgPSAhaGFzRm9jdXMoKSAmJiBwZXJQYWdlID4gMSA/IGkxOG4ucGFnZVggOiBpMThuLnNsaWRlWDtcbiAgICAgIGJpbmQoYnV0dG9uLCBcImNsaWNrXCIsIGFwcGx5KG9uQ2xpY2ssIGkpKTtcblxuICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbktleWJvYXJkKSB7XG4gICAgICAgIGJpbmQoYnV0dG9uLCBcImtleWRvd25cIiwgYXBwbHkob25LZXlkb3duLCBpKSk7XG4gICAgICB9XG5cbiAgICAgIHNldEF0dHJpYnV0ZShsaSwgUk9MRSwgXCJwcmVzZW50YXRpb25cIik7XG4gICAgICBzZXRBdHRyaWJ1dGUoYnV0dG9uLCBST0xFLCBcInRhYlwiKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIEFSSUFfQ09OVFJPTFMsIGNvbnRyb2xzLmpvaW4oXCIgXCIpKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIEFSSUFfTEFCRUwsIGZvcm1hdCh0ZXh0LCBpICsgMSkpO1xuICAgICAgc2V0QXR0cmlidXRlKGJ1dHRvbiwgVEFCX0lOREVYLCAtMSk7XG4gICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgbGk6IGxpLFxuICAgICAgICBidXR0b246IGJ1dHRvbixcbiAgICAgICAgcGFnZTogaVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhwYWdlKSB7XG4gICAgZ28oXCI+XCIgKyBwYWdlLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93bihwYWdlLCBlKSB7XG4gICAgdmFyIGxlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcbiAgICB2YXIga2V5ID0gbm9ybWFsaXplS2V5KGUpO1xuICAgIHZhciBkaXIgPSBnZXREaXJlY3Rpb24oKTtcbiAgICB2YXIgbmV4dFBhZ2UgPSAtMTtcblxuICAgIGlmIChrZXkgPT09IHJlc29sdmUoQVJST1dfUklHSFQsIGZhbHNlLCBkaXIpKSB7XG4gICAgICBuZXh0UGFnZSA9ICsrcGFnZSAlIGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19MRUZULCBmYWxzZSwgZGlyKSkge1xuICAgICAgbmV4dFBhZ2UgPSAoLS1wYWdlICsgbGVuZ3RoKSAlIGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJIb21lXCIpIHtcbiAgICAgIG5leHRQYWdlID0gMDtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJFbmRcIikge1xuICAgICAgbmV4dFBhZ2UgPSBsZW5ndGggLSAxO1xuICAgIH1cblxuICAgIHZhciBpdGVtID0gaXRlbXNbbmV4dFBhZ2VdO1xuXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGZvY3VzKGl0ZW0uYnV0dG9uKTtcbiAgICAgIGdvKFwiPlwiICsgbmV4dFBhZ2UpO1xuICAgICAgcHJldmVudChlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXREaXJlY3Rpb24oKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMucGFnaW5hdGlvbkRpcmVjdGlvbiB8fCBvcHRpb25zLmRpcmVjdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEF0KGluZGV4KSB7XG4gICAgcmV0dXJuIGl0ZW1zW0NvbnRyb2xsZXIudG9QYWdlKGluZGV4KV07XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHByZXYgPSBnZXRBdChnZXRJbmRleCh0cnVlKSk7XG4gICAgdmFyIGN1cnIgPSBnZXRBdChnZXRJbmRleCgpKTtcblxuICAgIGlmIChwcmV2KSB7XG4gICAgICB2YXIgYnV0dG9uID0gcHJldi5idXR0b247XG4gICAgICByZW1vdmVDbGFzcyhidXR0b24sIENMQVNTX0FDVElWRSk7XG4gICAgICByZW1vdmVBdHRyaWJ1dGUoYnV0dG9uLCBBUklBX1NFTEVDVEVEKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIFRBQl9JTkRFWCwgLTEpO1xuICAgIH1cblxuICAgIGlmIChjdXJyKSB7XG4gICAgICB2YXIgX2J1dHRvbiA9IGN1cnIuYnV0dG9uO1xuICAgICAgYWRkQ2xhc3MoX2J1dHRvbiwgQ0xBU1NfQUNUSVZFKTtcbiAgICAgIHNldEF0dHJpYnV0ZShfYnV0dG9uLCBBUklBX1NFTEVDVEVELCB0cnVlKTtcbiAgICAgIHNldEF0dHJpYnV0ZShfYnV0dG9uLCBUQUJfSU5ERVgsIFwiXCIpO1xuICAgIH1cblxuICAgIGVtaXQoRVZFTlRfUEFHSU5BVElPTl9VUERBVEVELCB7XG4gICAgICBsaXN0OiBsaXN0LFxuICAgICAgaXRlbXM6IGl0ZW1zXG4gICAgfSwgcHJldiwgY3Vycik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGl0ZW1zOiBpdGVtcyxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBnZXRBdDogZ2V0QXQsXG4gICAgdXBkYXRlOiB1cGRhdGVcbiAgfTtcbn1cblxudmFyIFRSSUdHRVJfS0VZUyA9IFtcIiBcIiwgXCJFbnRlclwiXTtcblxuZnVuY3Rpb24gU3luYyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgaXNOYXZpZ2F0aW9uID0gb3B0aW9ucy5pc05hdmlnYXRpb24sXG4gICAgICBzbGlkZUZvY3VzID0gb3B0aW9ucy5zbGlkZUZvY3VzO1xuICB2YXIgZXZlbnRzID0gW107XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgU3BsaWRlMi5zcGxpZGVzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgaWYgKCF0YXJnZXQuaXNQYXJlbnQpIHtcbiAgICAgICAgc3luYyhTcGxpZGUyLCB0YXJnZXQuc3BsaWRlKTtcbiAgICAgICAgc3luYyh0YXJnZXQuc3BsaWRlLCBTcGxpZGUyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChpc05hdmlnYXRpb24pIHtcbiAgICAgIG5hdmlnYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICBlbXB0eShldmVudHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3VudCgpIHtcbiAgICBkZXN0cm95KCk7XG4gICAgbW91bnQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN5bmMoc3BsaWRlLCB0YXJnZXQpIHtcbiAgICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShzcGxpZGUpO1xuICAgIGV2ZW50Lm9uKEVWRU5UX01PVkUsIGZ1bmN0aW9uIChpbmRleCwgcHJldiwgZGVzdCkge1xuICAgICAgdGFyZ2V0LmdvKHRhcmdldC5pcyhMT09QKSA/IGRlc3QgOiBpbmRleCk7XG4gICAgfSk7XG4gICAgZXZlbnRzLnB1c2goZXZlbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbmF2aWdhdGUoKSB7XG4gICAgdmFyIGV2ZW50ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMik7XG4gICAgdmFyIG9uID0gZXZlbnQub247XG4gICAgb24oRVZFTlRfQ0xJQ0ssIG9uQ2xpY2spO1xuICAgIG9uKEVWRU5UX1NMSURFX0tFWURPV04sIG9uS2V5ZG93bik7XG4gICAgb24oW0VWRU5UX01PVU5URUQsIEVWRU5UX1VQREFURURdLCB1cGRhdGUpO1xuICAgIGV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICBldmVudC5lbWl0KEVWRU5UX05BVklHQVRJT05fTU9VTlRFRCwgU3BsaWRlMi5zcGxpZGVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBzZXRBdHRyaWJ1dGUoQ29tcG9uZW50czIuRWxlbWVudHMubGlzdCwgQVJJQV9PUklFTlRBVElPTiwgb3B0aW9ucy5kaXJlY3Rpb24gPT09IFRUQiA/IFwidmVydGljYWxcIiA6IFwiXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25DbGljayhTbGlkZSkge1xuICAgIFNwbGlkZTIuZ28oU2xpZGUuaW5kZXgpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25LZXlkb3duKFNsaWRlLCBlKSB7XG4gICAgaWYgKGluY2x1ZGVzKFRSSUdHRVJfS0VZUywgbm9ybWFsaXplS2V5KGUpKSkge1xuICAgICAgb25DbGljayhTbGlkZSk7XG4gICAgICBwcmV2ZW50KGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0dXA6IGFwcGx5KENvbXBvbmVudHMyLk1lZGlhLnNldCwge1xuICAgICAgc2xpZGVGb2N1czogaXNVbmRlZmluZWQoc2xpZGVGb2N1cykgPyBpc05hdmlnYXRpb24gOiBzbGlkZUZvY3VzXG4gICAgfSwgdHJ1ZSksXG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgcmVtb3VudDogcmVtb3VudFxuICB9O1xufVxuXG5mdW5jdGlvbiBXaGVlbChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTIgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMi5iaW5kO1xuXG4gIHZhciBsYXN0VGltZSA9IDA7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKG9wdGlvbnMud2hlZWwpIHtcbiAgICAgIGJpbmQoQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2ssIFwid2hlZWxcIiwgb25XaGVlbCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uV2hlZWwoZSkge1xuICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgIHZhciBkZWx0YVkgPSBlLmRlbHRhWTtcbiAgICAgIHZhciBiYWNrd2FyZHMgPSBkZWx0YVkgPCAwO1xuICAgICAgdmFyIHRpbWVTdGFtcCA9IHRpbWVPZihlKTtcblxuICAgICAgdmFyIF9taW4gPSBvcHRpb25zLndoZWVsTWluVGhyZXNob2xkIHx8IDA7XG5cbiAgICAgIHZhciBzbGVlcCA9IG9wdGlvbnMud2hlZWxTbGVlcCB8fCAwO1xuXG4gICAgICBpZiAoYWJzKGRlbHRhWSkgPiBfbWluICYmIHRpbWVTdGFtcCAtIGxhc3RUaW1lID4gc2xlZXApIHtcbiAgICAgICAgU3BsaWRlMi5nbyhiYWNrd2FyZHMgPyBcIjxcIiA6IFwiPlwiKTtcbiAgICAgICAgbGFzdFRpbWUgPSB0aW1lU3RhbXA7XG4gICAgICB9XG5cbiAgICAgIHNob3VsZFByZXZlbnQoYmFja3dhcmRzKSAmJiBwcmV2ZW50KGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZFByZXZlbnQoYmFja3dhcmRzKSB7XG4gICAgcmV0dXJuICFvcHRpb25zLnJlbGVhc2VXaGVlbCB8fCBTcGxpZGUyLnN0YXRlLmlzKE1PVklORykgfHwgQ29tcG9uZW50czIuQ29udHJvbGxlci5nZXRBZGphY2VudChiYWNrd2FyZHMpICE9PSAtMTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50XG4gIH07XG59XG5cbnZhciBTUl9SRU1PVkFMX0RFTEFZID0gOTA7XG5cbmZ1bmN0aW9uIExpdmUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTEzID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTEzLm9uO1xuXG4gIHZhciB0cmFjayA9IENvbXBvbmVudHMyLkVsZW1lbnRzLnRyYWNrO1xuICB2YXIgZW5hYmxlZCA9IG9wdGlvbnMubGl2ZSAmJiAhb3B0aW9ucy5pc05hdmlnYXRpb247XG4gIHZhciBzciA9IGNyZWF0ZShcInNwYW5cIiwgQ0xBU1NfU1IpO1xuICB2YXIgaW50ZXJ2YWwgPSBSZXF1ZXN0SW50ZXJ2YWwoU1JfUkVNT1ZBTF9ERUxBWSwgYXBwbHkodG9nZ2xlLCBmYWxzZSkpO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICBkaXNhYmxlKCFDb21wb25lbnRzMi5BdXRvcGxheS5pc1BhdXNlZCgpKTtcbiAgICAgIHNldEF0dHJpYnV0ZSh0cmFjaywgQVJJQV9BVE9NSUMsIHRydWUpO1xuICAgICAgc3IudGV4dENvbnRlbnQgPSBcIlxcdTIwMjZcIjtcbiAgICAgIG9uKEVWRU5UX0FVVE9QTEFZX1BMQVksIGFwcGx5KGRpc2FibGUsIHRydWUpKTtcbiAgICAgIG9uKEVWRU5UX0FVVE9QTEFZX1BBVVNFLCBhcHBseShkaXNhYmxlLCBmYWxzZSkpO1xuICAgICAgb24oW0VWRU5UX01PVkVELCBFVkVOVF9TQ1JPTExFRF0sIGFwcGx5KHRvZ2dsZSwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZShhY3RpdmUpIHtcbiAgICBzZXRBdHRyaWJ1dGUodHJhY2ssIEFSSUFfQlVTWSwgYWN0aXZlKTtcblxuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgIGFwcGVuZCh0cmFjaywgc3IpO1xuICAgICAgaW50ZXJ2YWwuc3RhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKHNyKTtcbiAgICAgIGludGVydmFsLmNhbmNlbCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgcmVtb3ZlQXR0cmlidXRlKHRyYWNrLCBbQVJJQV9MSVZFLCBBUklBX0FUT01JQywgQVJJQV9CVVNZXSk7XG4gICAgcmVtb3ZlKHNyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc2FibGUoZGlzYWJsZWQpIHtcbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgc2V0QXR0cmlidXRlKHRyYWNrLCBBUklBX0xJVkUsIGRpc2FibGVkID8gXCJvZmZcIiA6IFwicG9saXRlXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRpc2FibGU6IGRpc2FibGUsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG52YXIgQ29tcG9uZW50Q29uc3RydWN0b3JzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBfX3Byb3RvX186IG51bGwsXG4gIE1lZGlhOiBNZWRpYSxcbiAgRGlyZWN0aW9uOiBEaXJlY3Rpb24sXG4gIEVsZW1lbnRzOiBFbGVtZW50cyxcbiAgU2xpZGVzOiBTbGlkZXMsXG4gIExheW91dDogTGF5b3V0LFxuICBDbG9uZXM6IENsb25lcyxcbiAgTW92ZTogTW92ZSxcbiAgQ29udHJvbGxlcjogQ29udHJvbGxlcixcbiAgQXJyb3dzOiBBcnJvd3MsXG4gIEF1dG9wbGF5OiBBdXRvcGxheSxcbiAgQ292ZXI6IENvdmVyLFxuICBTY3JvbGw6IFNjcm9sbCxcbiAgRHJhZzogRHJhZyxcbiAgS2V5Ym9hcmQ6IEtleWJvYXJkLFxuICBMYXp5TG9hZDogTGF6eUxvYWQsXG4gIFBhZ2luYXRpb246IFBhZ2luYXRpb24sXG4gIFN5bmM6IFN5bmMsXG4gIFdoZWVsOiBXaGVlbCxcbiAgTGl2ZTogTGl2ZVxufSk7XG52YXIgSTE4TiA9IHtcbiAgcHJldjogXCJQcmV2aW91cyBzbGlkZVwiLFxuICBuZXh0OiBcIk5leHQgc2xpZGVcIixcbiAgZmlyc3Q6IFwiR28gdG8gZmlyc3Qgc2xpZGVcIixcbiAgbGFzdDogXCJHbyB0byBsYXN0IHNsaWRlXCIsXG4gIHNsaWRlWDogXCJHbyB0byBzbGlkZSAlc1wiLFxuICBwYWdlWDogXCJHbyB0byBwYWdlICVzXCIsXG4gIHBsYXk6IFwiU3RhcnQgYXV0b3BsYXlcIixcbiAgcGF1c2U6IFwiUGF1c2UgYXV0b3BsYXlcIixcbiAgY2Fyb3VzZWw6IFwiY2Fyb3VzZWxcIixcbiAgc2xpZGU6IFwic2xpZGVcIixcbiAgc2VsZWN0OiBcIlNlbGVjdCBhIHNsaWRlIHRvIHNob3dcIixcbiAgc2xpZGVMYWJlbDogXCIlcyBvZiAlc1wiXG59O1xudmFyIERFRkFVTFRTID0ge1xuICB0eXBlOiBcInNsaWRlXCIsXG4gIHJvbGU6IFwicmVnaW9uXCIsXG4gIHNwZWVkOiA0MDAsXG4gIHBlclBhZ2U6IDEsXG4gIGNsb25lU3RhdHVzOiB0cnVlLFxuICBhcnJvd3M6IHRydWUsXG4gIHBhZ2luYXRpb246IHRydWUsXG4gIHBhZ2luYXRpb25LZXlib2FyZDogdHJ1ZSxcbiAgaW50ZXJ2YWw6IDVlMyxcbiAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICBwYXVzZU9uRm9jdXM6IHRydWUsXG4gIHJlc2V0UHJvZ3Jlc3M6IHRydWUsXG4gIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC4yNSwgMSwgMC41LCAxKVwiLFxuICBkcmFnOiB0cnVlLFxuICBkaXJlY3Rpb246IFwibHRyXCIsXG4gIHRyaW1TcGFjZTogdHJ1ZSxcbiAgZm9jdXNhYmxlTm9kZXM6IFwiYSwgYnV0dG9uLCB0ZXh0YXJlYSwgaW5wdXQsIHNlbGVjdCwgaWZyYW1lXCIsXG4gIGxpdmU6IHRydWUsXG4gIGNsYXNzZXM6IENMQVNTRVMsXG4gIGkxOG46IEkxOE4sXG4gIHJlZHVjZWRNb3Rpb246IHtcbiAgICBzcGVlZDogMCxcbiAgICByZXdpbmRTcGVlZDogMCxcbiAgICBhdXRvcGxheTogXCJwYXVzZVwiXG4gIH1cbn07XG5cbmZ1bmN0aW9uIEZhZGUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcztcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBFdmVudEludGVyZmFjZShTcGxpZGUyKS5vbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfUkVGUkVTSF0sIGluaXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBTbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUpIHtcbiAgICAgIFNsaWRlLnN0eWxlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWCgtXCIgKyAxMDAgKiBTbGlkZS5pbmRleCArIFwiJSlcIik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChpbmRleCwgZG9uZSkge1xuICAgIFNsaWRlcy5zdHlsZShcInRyYW5zaXRpb25cIiwgXCJvcGFjaXR5IFwiICsgb3B0aW9ucy5zcGVlZCArIFwibXMgXCIgKyBvcHRpb25zLmVhc2luZyk7XG4gICAgbmV4dFRpY2soZG9uZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBzdGFydDogc3RhcnQsXG4gICAgY2FuY2VsOiBub29wXG4gIH07XG59XG5cbmZ1bmN0aW9uIFNsaWRlKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBNb3ZlID0gQ29tcG9uZW50czIuTW92ZSxcbiAgICAgIENvbnRyb2xsZXIgPSBDb21wb25lbnRzMi5Db250cm9sbGVyLFxuICAgICAgU2Nyb2xsID0gQ29tcG9uZW50czIuU2Nyb2xsO1xuICB2YXIgbGlzdCA9IENvbXBvbmVudHMyLkVsZW1lbnRzLmxpc3Q7XG4gIHZhciB0cmFuc2l0aW9uID0gYXBwbHkoc3R5bGUsIGxpc3QsIFwidHJhbnNpdGlvblwiKTtcbiAgdmFyIGVuZENhbGxiYWNrO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLmJpbmQobGlzdCwgXCJ0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS50YXJnZXQgPT09IGxpc3QgJiYgZW5kQ2FsbGJhY2spIHtcbiAgICAgICAgY2FuY2VsKCk7XG4gICAgICAgIGVuZENhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChpbmRleCwgZG9uZSkge1xuICAgIHZhciBkZXN0aW5hdGlvbiA9IE1vdmUudG9Qb3NpdGlvbihpbmRleCwgdHJ1ZSk7XG4gICAgdmFyIHBvc2l0aW9uID0gTW92ZS5nZXRQb3NpdGlvbigpO1xuICAgIHZhciBzcGVlZCA9IGdldFNwZWVkKGluZGV4KTtcblxuICAgIGlmIChhYnMoZGVzdGluYXRpb24gLSBwb3NpdGlvbikgPj0gMSAmJiBzcGVlZCA+PSAxKSB7XG4gICAgICBpZiAob3B0aW9ucy51c2VTY3JvbGwpIHtcbiAgICAgICAgU2Nyb2xsLnNjcm9sbChkZXN0aW5hdGlvbiwgc3BlZWQsIGZhbHNlLCBkb25lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zaXRpb24oXCJ0cmFuc2Zvcm0gXCIgKyBzcGVlZCArIFwibXMgXCIgKyBvcHRpb25zLmVhc2luZyk7XG4gICAgICAgIE1vdmUudHJhbnNsYXRlKGRlc3RpbmF0aW9uLCB0cnVlKTtcbiAgICAgICAgZW5kQ2FsbGJhY2sgPSBkb25lO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBNb3ZlLmp1bXAoaW5kZXgpO1xuICAgICAgZG9uZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICB0cmFuc2l0aW9uKFwiXCIpO1xuICAgIFNjcm9sbC5jYW5jZWwoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNwZWVkKGluZGV4KSB7XG4gICAgdmFyIHJld2luZFNwZWVkID0gb3B0aW9ucy5yZXdpbmRTcGVlZDtcblxuICAgIGlmIChTcGxpZGUyLmlzKFNMSURFKSAmJiByZXdpbmRTcGVlZCkge1xuICAgICAgdmFyIHByZXYgPSBDb250cm9sbGVyLmdldEluZGV4KHRydWUpO1xuICAgICAgdmFyIGVuZCA9IENvbnRyb2xsZXIuZ2V0RW5kKCk7XG5cbiAgICAgIGlmIChwcmV2ID09PSAwICYmIGluZGV4ID49IGVuZCB8fCBwcmV2ID49IGVuZCAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gcmV3aW5kU3BlZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnMuc3BlZWQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBzdGFydDogc3RhcnQsXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn1cblxudmFyIF9TcGxpZGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBfU3BsaWRlKHRhcmdldCwgb3B0aW9ucykge1xuICAgIHRoaXMuZXZlbnQgPSBFdmVudEludGVyZmFjZSgpO1xuICAgIHRoaXMuQ29tcG9uZW50cyA9IHt9O1xuICAgIHRoaXMuc3RhdGUgPSBTdGF0ZShDUkVBVEVEKTtcbiAgICB0aGlzLnNwbGlkZXMgPSBbXTtcbiAgICB0aGlzLl9vID0ge307XG4gICAgdGhpcy5fRSA9IHt9O1xuICAgIHZhciByb290ID0gaXNTdHJpbmcodGFyZ2V0KSA/IHF1ZXJ5KGRvY3VtZW50LCB0YXJnZXQpIDogdGFyZ2V0O1xuICAgIGFzc2VydChyb290LCByb290ICsgXCIgaXMgaW52YWxpZC5cIik7XG4gICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICBvcHRpb25zID0gbWVyZ2Uoe1xuICAgICAgbGFiZWw6IGdldEF0dHJpYnV0ZShyb290LCBBUklBX0xBQkVMKSB8fCBcIlwiLFxuICAgICAgbGFiZWxsZWRieTogZ2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfTEFCRUxMRURCWSkgfHwgXCJcIlxuICAgIH0sIERFRkFVTFRTLCBfU3BsaWRlLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuICAgIHRyeSB7XG4gICAgICBtZXJnZShvcHRpb25zLCBKU09OLnBhcnNlKGdldEF0dHJpYnV0ZShyb290LCBEQVRBX0FUVFJJQlVURSkpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBhc3NlcnQoZmFsc2UsIFwiSW52YWxpZCBKU09OXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX28gPSBPYmplY3QuY3JlYXRlKG1lcmdlKHt9LCBvcHRpb25zKSk7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gX1NwbGlkZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLm1vdW50ID0gZnVuY3Rpb24gbW91bnQoRXh0ZW5zaW9ucywgVHJhbnNpdGlvbikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlLFxuICAgICAgICBDb21wb25lbnRzMiA9IHRoaXMuQ29tcG9uZW50cztcbiAgICBhc3NlcnQoc3RhdGUuaXMoW0NSRUFURUQsIERFU1RST1lFRF0pLCBcIkFscmVhZHkgbW91bnRlZCFcIik7XG4gICAgc3RhdGUuc2V0KENSRUFURUQpO1xuICAgIHRoaXMuX0MgPSBDb21wb25lbnRzMjtcbiAgICB0aGlzLl9UID0gVHJhbnNpdGlvbiB8fCB0aGlzLl9UIHx8ICh0aGlzLmlzKEZBREUpID8gRmFkZSA6IFNsaWRlKTtcbiAgICB0aGlzLl9FID0gRXh0ZW5zaW9ucyB8fCB0aGlzLl9FO1xuICAgIHZhciBDb25zdHJ1Y3RvcnMgPSBhc3NpZ24oe30sIENvbXBvbmVudENvbnN0cnVjdG9ycywgdGhpcy5fRSwge1xuICAgICAgVHJhbnNpdGlvbjogdGhpcy5fVFxuICAgIH0pO1xuICAgIGZvck93bihDb25zdHJ1Y3RvcnMsIGZ1bmN0aW9uIChDb21wb25lbnQsIGtleSkge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IENvbXBvbmVudChfdGhpcywgQ29tcG9uZW50czIsIF90aGlzLl9vKTtcbiAgICAgIENvbXBvbmVudHMyW2tleV0gPSBjb21wb25lbnQ7XG4gICAgICBjb21wb25lbnQuc2V0dXAgJiYgY29tcG9uZW50LnNldHVwKCk7XG4gICAgfSk7XG4gICAgZm9yT3duKENvbXBvbmVudHMyLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICBjb21wb25lbnQubW91bnQgJiYgY29tcG9uZW50Lm1vdW50KCk7XG4gICAgfSk7XG4gICAgdGhpcy5lbWl0KEVWRU5UX01PVU5URUQpO1xuICAgIGFkZENsYXNzKHRoaXMucm9vdCwgQ0xBU1NfSU5JVElBTElaRUQpO1xuICAgIHN0YXRlLnNldChJRExFKTtcbiAgICB0aGlzLmVtaXQoRVZFTlRfUkVBRFkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5zeW5jID0gZnVuY3Rpb24gc3luYyhzcGxpZGUpIHtcbiAgICB0aGlzLnNwbGlkZXMucHVzaCh7XG4gICAgICBzcGxpZGU6IHNwbGlkZVxuICAgIH0pO1xuICAgIHNwbGlkZS5zcGxpZGVzLnB1c2goe1xuICAgICAgc3BsaWRlOiB0aGlzLFxuICAgICAgaXNQYXJlbnQ6IHRydWVcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmlzKElETEUpKSB7XG4gICAgICB0aGlzLl9DLlN5bmMucmVtb3VudCgpO1xuXG4gICAgICBzcGxpZGUuQ29tcG9uZW50cy5TeW5jLnJlbW91bnQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZ28gPSBmdW5jdGlvbiBnbyhjb250cm9sKSB7XG4gICAgdGhpcy5fQy5Db250cm9sbGVyLmdvKGNvbnRyb2wpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLm9uID0gZnVuY3Rpb24gb24oZXZlbnRzLCBjYWxsYmFjaykge1xuICAgIHRoaXMuZXZlbnQub24oZXZlbnRzLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLm9mZiA9IGZ1bmN0aW9uIG9mZihldmVudHMpIHtcbiAgICB0aGlzLmV2ZW50Lm9mZihldmVudHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgIHZhciBfdGhpcyRldmVudDtcblxuICAgIChfdGhpcyRldmVudCA9IHRoaXMuZXZlbnQpLmVtaXQuYXBwbHkoX3RoaXMkZXZlbnQsIFtldmVudF0uY29uY2F0KHNsaWNlKGFyZ3VtZW50cywgMSkpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5hZGQgPSBmdW5jdGlvbiBhZGQoc2xpZGVzLCBpbmRleCkge1xuICAgIHRoaXMuX0MuU2xpZGVzLmFkZChzbGlkZXMsIGluZGV4KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUobWF0Y2hlcikge1xuICAgIHRoaXMuX0MuU2xpZGVzLnJlbW92ZShtYXRjaGVyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5pcyA9IGZ1bmN0aW9uIGlzKHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5fby50eXBlID09PSB0eXBlO1xuICB9O1xuXG4gIF9wcm90by5yZWZyZXNoID0gZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICB0aGlzLmVtaXQoRVZFTlRfUkVGUkVTSCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95KGNvbXBsZXRlbHkpIHtcbiAgICBpZiAoY29tcGxldGVseSA9PT0gdm9pZCAwKSB7XG4gICAgICBjb21wbGV0ZWx5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZXZlbnQgPSB0aGlzLmV2ZW50LFxuICAgICAgICBzdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoc3RhdGUuaXMoQ1JFQVRFRCkpIHtcbiAgICAgIEV2ZW50SW50ZXJmYWNlKHRoaXMpLm9uKEVWRU5UX1JFQURZLCB0aGlzLmRlc3Ryb3kuYmluZCh0aGlzLCBjb21wbGV0ZWx5KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvck93bih0aGlzLl9DLCBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgIGNvbXBvbmVudC5kZXN0cm95ICYmIGNvbXBvbmVudC5kZXN0cm95KGNvbXBsZXRlbHkpO1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgICBldmVudC5lbWl0KEVWRU5UX0RFU1RST1kpO1xuICAgICAgZXZlbnQuZGVzdHJveSgpO1xuICAgICAgY29tcGxldGVseSAmJiBlbXB0eSh0aGlzLnNwbGlkZXMpO1xuICAgICAgc3RhdGUuc2V0KERFU1RST1lFRCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX2NyZWF0ZUNsYXNzKF9TcGxpZGUsIFt7XG4gICAga2V5OiBcIm9wdGlvbnNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQob3B0aW9ucykge1xuICAgICAgdGhpcy5fQy5NZWRpYS5zZXQob3B0aW9ucywgdHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImxlbmd0aFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX0MuU2xpZGVzLmdldExlbmd0aCh0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5kZXhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9DLkNvbnRyb2xsZXIuZ2V0SW5kZXgoKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gX1NwbGlkZTtcbn0oKTtcblxudmFyIFNwbGlkZSA9IF9TcGxpZGU7XG5TcGxpZGUuZGVmYXVsdHMgPSB7fTtcblNwbGlkZS5TVEFURVMgPSBTVEFURVM7XG52YXIgQ0xBU1NfUkVOREVSRUQgPSBcImlzLXJlbmRlcmVkXCI7XG52YXIgUkVOREVSRVJfREVGQVVMVF9DT05GSUcgPSB7XG4gIGxpc3RUYWc6IFwidWxcIixcbiAgc2xpZGVUYWc6IFwibGlcIlxufTtcblxudmFyIFN0eWxlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3R5bGUoaWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnN0eWxlcyA9IHt9O1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBTdHlsZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMi5ydWxlID0gZnVuY3Rpb24gcnVsZShzZWxlY3RvciwgcHJvcCwgdmFsdWUsIGJyZWFrcG9pbnQpIHtcbiAgICBicmVha3BvaW50ID0gYnJlYWtwb2ludCB8fCBcImRlZmF1bHRcIjtcbiAgICB2YXIgc2VsZWN0b3JzID0gdGhpcy5zdHlsZXNbYnJlYWtwb2ludF0gPSB0aGlzLnN0eWxlc1ticmVha3BvaW50XSB8fCB7fTtcbiAgICB2YXIgc3R5bGVzID0gc2VsZWN0b3JzW3NlbGVjdG9yXSA9IHNlbGVjdG9yc1tzZWxlY3Rvcl0gfHwge307XG4gICAgc3R5bGVzW3Byb3BdID0gdmFsdWU7XG4gIH07XG5cbiAgX3Byb3RvMi5idWlsZCA9IGZ1bmN0aW9uIGJ1aWxkKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgICBpZiAodGhpcy5zdHlsZXMuZGVmYXVsdCkge1xuICAgICAgY3NzICs9IHRoaXMuYnVpbGRTZWxlY3RvcnModGhpcy5zdHlsZXMuZGVmYXVsdCk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy5zdHlsZXMpLnNvcnQoZnVuY3Rpb24gKG4sIG0pIHtcbiAgICAgIHJldHVybiBfdGhpczIub3B0aW9ucy5tZWRpYVF1ZXJ5ID09PSBcIm1pblwiID8gK24gLSArbSA6ICttIC0gK247XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoYnJlYWtwb2ludCkge1xuICAgICAgaWYgKGJyZWFrcG9pbnQgIT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgIGNzcyArPSBcIkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IFwiICsgYnJlYWtwb2ludCArIFwicHgpIHtcIjtcbiAgICAgICAgY3NzICs9IF90aGlzMi5idWlsZFNlbGVjdG9ycyhfdGhpczIuc3R5bGVzW2JyZWFrcG9pbnRdKTtcbiAgICAgICAgY3NzICs9IFwifVwiO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjc3M7XG4gIH07XG5cbiAgX3Byb3RvMi5idWlsZFNlbGVjdG9ycyA9IGZ1bmN0aW9uIGJ1aWxkU2VsZWN0b3JzKHNlbGVjdG9ycykge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdmFyIGNzcyA9IFwiXCI7XG4gICAgZm9yT3duKHNlbGVjdG9ycywgZnVuY3Rpb24gKHN0eWxlcywgc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yID0gKFwiI1wiICsgX3RoaXMzLmlkICsgXCIgXCIgKyBzZWxlY3RvcikudHJpbSgpO1xuICAgICAgY3NzICs9IHNlbGVjdG9yICsgXCIge1wiO1xuICAgICAgZm9yT3duKHN0eWxlcywgZnVuY3Rpb24gKHZhbHVlLCBwcm9wKSB7XG4gICAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuICAgICAgICAgIGNzcyArPSBwcm9wICsgXCI6IFwiICsgdmFsdWUgKyBcIjtcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjc3MgKz0gXCJ9XCI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNzcztcbiAgfTtcblxuICByZXR1cm4gU3R5bGU7XG59KCk7XG5cbnZhciBTcGxpZGVSZW5kZXJlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNwbGlkZVJlbmRlcmVyKGNvbnRlbnRzLCBvcHRpb25zLCBjb25maWcsIGRlZmF1bHRzKSB7XG4gICAgdGhpcy5zbGlkZXMgPSBbXTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gW107XG4gICAgbWVyZ2UoREVGQVVMVFMsIGRlZmF1bHRzIHx8IHt9KTtcbiAgICBtZXJnZShtZXJnZSh0aGlzLm9wdGlvbnMsIERFRkFVTFRTKSwgb3B0aW9ucyB8fCB7fSk7XG4gICAgdGhpcy5jb250ZW50cyA9IGNvbnRlbnRzO1xuICAgIHRoaXMuY29uZmlnID0gYXNzaWduKHt9LCBSRU5ERVJFUl9ERUZBVUxUX0NPTkZJRywgY29uZmlnIHx8IHt9KTtcbiAgICB0aGlzLmlkID0gdGhpcy5jb25maWcuaWQgfHwgdW5pcXVlSWQoXCJzcGxpZGVcIik7XG4gICAgdGhpcy5TdHlsZSA9IG5ldyBTdHlsZSh0aGlzLmlkLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuRGlyZWN0aW9uID0gRGlyZWN0aW9uKG51bGwsIG51bGwsIHRoaXMub3B0aW9ucyk7XG4gICAgYXNzZXJ0KHRoaXMuY29udGVudHMubGVuZ3RoLCBcIlByb3ZpZGUgYXQgbGVhc3QgMSBjb250ZW50LlwiKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIFNwbGlkZVJlbmRlcmVyLmNsZWFuID0gZnVuY3Rpb24gY2xlYW4oc3BsaWRlKSB7XG4gICAgdmFyIF9FdmVudEludGVyZmFjZTE0ID0gRXZlbnRJbnRlcmZhY2Uoc3BsaWRlKSxcbiAgICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2UxNC5vbjtcblxuICAgIHZhciByb290ID0gc3BsaWRlLnJvb3Q7XG4gICAgdmFyIGNsb25lcyA9IHF1ZXJ5QWxsKHJvb3QsIFwiLlwiICsgQ0xBU1NfQ0xPTkUpO1xuICAgIG9uKEVWRU5UX01PVU5URUQsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlbW92ZShjaGlsZChyb290LCBcInN0eWxlXCIpKTtcbiAgICB9KTtcbiAgICByZW1vdmUoY2xvbmVzKTtcbiAgfTtcblxuICB2YXIgX3Byb3RvMyA9IFNwbGlkZVJlbmRlcmVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8zLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMucGFyc2VCcmVha3BvaW50cygpO1xuICAgIHRoaXMuaW5pdFNsaWRlcygpO1xuICAgIHRoaXMucmVnaXN0ZXJSb290U3R5bGVzKCk7XG4gICAgdGhpcy5yZWdpc3RlclRyYWNrU3R5bGVzKCk7XG4gICAgdGhpcy5yZWdpc3RlclNsaWRlU3R5bGVzKCk7XG4gICAgdGhpcy5yZWdpc3Rlckxpc3RTdHlsZXMoKTtcbiAgfTtcblxuICBfcHJvdG8zLmluaXRTbGlkZXMgPSBmdW5jdGlvbiBpbml0U2xpZGVzKCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgcHVzaCh0aGlzLnNsaWRlcywgdGhpcy5jb250ZW50cy5tYXAoZnVuY3Rpb24gKGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICBjb250ZW50ID0gaXNTdHJpbmcoY29udGVudCkgPyB7XG4gICAgICAgIGh0bWw6IGNvbnRlbnRcbiAgICAgIH0gOiBjb250ZW50O1xuICAgICAgY29udGVudC5zdHlsZXMgPSBjb250ZW50LnN0eWxlcyB8fCB7fTtcbiAgICAgIGNvbnRlbnQuYXR0cnMgPSBjb250ZW50LmF0dHJzIHx8IHt9O1xuXG4gICAgICBfdGhpczQuY292ZXIoY29udGVudCk7XG5cbiAgICAgIHZhciBjbGFzc2VzID0gX3RoaXM0Lm9wdGlvbnMuY2xhc3Nlcy5zbGlkZSArIFwiIFwiICsgKGluZGV4ID09PSAwID8gQ0xBU1NfQUNUSVZFIDogXCJcIik7XG4gICAgICBhc3NpZ24oY29udGVudC5hdHRycywge1xuICAgICAgICBjbGFzczogKGNsYXNzZXMgKyBcIiBcIiArIChjb250ZW50LmF0dHJzLmNsYXNzIHx8IFwiXCIpKS50cmltKCksXG4gICAgICAgIHN0eWxlOiBfdGhpczQuYnVpbGRTdHlsZXMoY29udGVudC5zdHlsZXMpXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pKTtcblxuICAgIGlmICh0aGlzLmlzTG9vcCgpKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlQ2xvbmVzKHRoaXMuc2xpZGVzKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMy5yZWdpc3RlclJvb3RTdHlsZXMgPSBmdW5jdGlvbiByZWdpc3RlclJvb3RTdHlsZXMoKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmMlswXSxcbiAgICAgICAgICBvcHRpb25zID0gX3JlZjJbMV07XG5cbiAgICAgIF90aGlzNS5TdHlsZS5ydWxlKFwiIFwiLCBcIm1heC13aWR0aFwiLCB1bml0KG9wdGlvbnMud2lkdGgpLCB3aWR0aCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5yZWdpc3RlclRyYWNrU3R5bGVzID0gZnVuY3Rpb24gcmVnaXN0ZXJUcmFja1N0eWxlcygpIHtcbiAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgIHZhciBTdHlsZTIgPSB0aGlzLlN0eWxlO1xuICAgIHZhciBzZWxlY3RvciA9IFwiLlwiICsgQ0xBU1NfVFJBQ0s7XG4gICAgdGhpcy5icmVha3BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjNbMF0sXG4gICAgICAgICAgb3B0aW9ucyA9IF9yZWYzWzFdO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIF90aGlzNi5yZXNvbHZlKFwicGFkZGluZ0xlZnRcIiksIF90aGlzNi5jc3NQYWRkaW5nKG9wdGlvbnMsIGZhbHNlKSwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIF90aGlzNi5yZXNvbHZlKFwicGFkZGluZ1JpZ2h0XCIpLCBfdGhpczYuY3NzUGFkZGluZyhvcHRpb25zLCB0cnVlKSwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwiaGVpZ2h0XCIsIF90aGlzNi5jc3NUcmFja0hlaWdodChvcHRpb25zKSwgd2lkdGgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMucmVnaXN0ZXJMaXN0U3R5bGVzID0gZnVuY3Rpb24gcmVnaXN0ZXJMaXN0U3R5bGVzKCkge1xuICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgdmFyIFN0eWxlMiA9IHRoaXMuU3R5bGU7XG4gICAgdmFyIHNlbGVjdG9yID0gXCIuXCIgKyBDTEFTU19MSVNUO1xuICAgIHRoaXMuYnJlYWtwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjQpIHtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWY0WzBdLFxuICAgICAgICAgIG9wdGlvbnMgPSBfcmVmNFsxXTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcInRyYW5zZm9ybVwiLCBfdGhpczcuYnVpbGRUcmFuc2xhdGUob3B0aW9ucyksIHdpZHRoKTtcblxuICAgICAgaWYgKCFfdGhpczcuY3NzU2xpZGVIZWlnaHQob3B0aW9ucykpIHtcbiAgICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwiYXNwZWN0LXJhdGlvXCIsIF90aGlzNy5jc3NBc3BlY3RSYXRpbyhvcHRpb25zKSwgd2lkdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMucmVnaXN0ZXJTbGlkZVN0eWxlcyA9IGZ1bmN0aW9uIHJlZ2lzdGVyU2xpZGVTdHlsZXMoKSB7XG4gICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICB2YXIgU3R5bGUyID0gdGhpcy5TdHlsZTtcbiAgICB2YXIgc2VsZWN0b3IgPSBcIi5cIiArIENMQVNTX1NMSURFO1xuICAgIHRoaXMuYnJlYWtwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjUpIHtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWY1WzBdLFxuICAgICAgICAgIG9wdGlvbnMgPSBfcmVmNVsxXTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcIndpZHRoXCIsIF90aGlzOC5jc3NTbGlkZVdpZHRoKG9wdGlvbnMpLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJoZWlnaHRcIiwgX3RoaXM4LmNzc1NsaWRlSGVpZ2h0KG9wdGlvbnMpIHx8IFwiMTAwJVwiLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgX3RoaXM4LnJlc29sdmUoXCJtYXJnaW5SaWdodFwiKSwgdW5pdChvcHRpb25zLmdhcCkgfHwgXCIwcHhcIiwgd2lkdGgpO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IgKyBcIiA+IGltZ1wiLCBcImRpc3BsYXlcIiwgb3B0aW9ucy5jb3ZlciA/IFwibm9uZVwiIDogXCJpbmxpbmVcIiwgd2lkdGgpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRUcmFuc2xhdGUgPSBmdW5jdGlvbiBidWlsZFRyYW5zbGF0ZShvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzJERpcmVjdGlvbiA9IHRoaXMuRGlyZWN0aW9uLFxuICAgICAgICByZXNvbHZlID0gX3RoaXMkRGlyZWN0aW9uLnJlc29sdmUsXG4gICAgICAgIG9yaWVudCA9IF90aGlzJERpcmVjdGlvbi5vcmllbnQ7XG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHZhbHVlcy5wdXNoKHRoaXMuY3NzT2Zmc2V0Q2xvbmVzKG9wdGlvbnMpKTtcbiAgICB2YWx1ZXMucHVzaCh0aGlzLmNzc09mZnNldEdhcHMob3B0aW9ucykpO1xuXG4gICAgaWYgKHRoaXMuaXNDZW50ZXIob3B0aW9ucykpIHtcbiAgICAgIHZhbHVlcy5wdXNoKHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQoLTUwKSwgXCIlXCIpKTtcbiAgICAgIHZhbHVlcy5wdXNoLmFwcGx5KHZhbHVlcywgdGhpcy5jc3NPZmZzZXRDZW50ZXIob3B0aW9ucykpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXMuZmlsdGVyKEJvb2xlYW4pLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBcInRyYW5zbGF0ZVwiICsgcmVzb2x2ZShcIlhcIikgKyBcIihcIiArIHZhbHVlICsgXCIpXCI7XG4gICAgfSkuam9pbihcIiBcIik7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NPZmZzZXRDbG9uZXMgPSBmdW5jdGlvbiBjc3NPZmZzZXRDbG9uZXMob3B0aW9ucykge1xuICAgIHZhciBfdGhpcyREaXJlY3Rpb24yID0gdGhpcy5EaXJlY3Rpb24sXG4gICAgICAgIHJlc29sdmUgPSBfdGhpcyREaXJlY3Rpb24yLnJlc29sdmUsXG4gICAgICAgIG9yaWVudCA9IF90aGlzJERpcmVjdGlvbjIub3JpZW50O1xuICAgIHZhciBjbG9uZUNvdW50ID0gdGhpcy5nZXRDbG9uZUNvdW50KCk7XG5cbiAgICBpZiAodGhpcy5pc0ZpeGVkV2lkdGgob3B0aW9ucykpIHtcbiAgICAgIHZhciBfdGhpcyRwYXJzZUNzc1ZhbHVlID0gdGhpcy5wYXJzZUNzc1ZhbHVlKG9wdGlvbnNbcmVzb2x2ZShcImZpeGVkV2lkdGhcIildKSxcbiAgICAgICAgICB2YWx1ZSA9IF90aGlzJHBhcnNlQ3NzVmFsdWUudmFsdWUsXG4gICAgICAgICAgdW5pdDIgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlLnVuaXQ7XG5cbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KHZhbHVlKSAqIGNsb25lQ291bnQsIHVuaXQyKTtcbiAgICB9XG5cbiAgICB2YXIgcGVyY2VudCA9IDEwMCAqIGNsb25lQ291bnQgLyBvcHRpb25zLnBlclBhZ2U7XG4gICAgcmV0dXJuIG9yaWVudChwZXJjZW50KSArIFwiJVwiO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzT2Zmc2V0Q2VudGVyID0gZnVuY3Rpb24gY3NzT2Zmc2V0Q2VudGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMkRGlyZWN0aW9uMyA9IHRoaXMuRGlyZWN0aW9uLFxuICAgICAgICByZXNvbHZlID0gX3RoaXMkRGlyZWN0aW9uMy5yZXNvbHZlLFxuICAgICAgICBvcmllbnQgPSBfdGhpcyREaXJlY3Rpb24zLm9yaWVudDtcblxuICAgIGlmICh0aGlzLmlzRml4ZWRXaWR0aChvcHRpb25zKSkge1xuICAgICAgdmFyIF90aGlzJHBhcnNlQ3NzVmFsdWUyID0gdGhpcy5wYXJzZUNzc1ZhbHVlKG9wdGlvbnNbcmVzb2x2ZShcImZpeGVkV2lkdGhcIildKSxcbiAgICAgICAgICB2YWx1ZSA9IF90aGlzJHBhcnNlQ3NzVmFsdWUyLnZhbHVlLFxuICAgICAgICAgIHVuaXQyID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTIudW5pdDtcblxuICAgICAgcmV0dXJuIFt0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KHZhbHVlIC8gMiksIHVuaXQyKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgIHZhciBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlLFxuICAgICAgICBnYXAgPSBvcHRpb25zLmdhcDtcbiAgICB2YWx1ZXMucHVzaChvcmllbnQoNTAgLyBwZXJQYWdlKSArIFwiJVwiKTtcblxuICAgIGlmIChnYXApIHtcbiAgICAgIHZhciBfdGhpcyRwYXJzZUNzc1ZhbHVlMyA9IHRoaXMucGFyc2VDc3NWYWx1ZShnYXApLFxuICAgICAgICAgIF92YWx1ZSA9IF90aGlzJHBhcnNlQ3NzVmFsdWUzLnZhbHVlLFxuICAgICAgICAgIF91bml0ID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTMudW5pdDtcblxuICAgICAgdmFyIGdhcE9mZnNldCA9IChfdmFsdWUgLyBwZXJQYWdlIC0gX3ZhbHVlKSAvIDI7XG4gICAgICB2YWx1ZXMucHVzaCh0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KGdhcE9mZnNldCksIF91bml0KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICBfcHJvdG8zLmNzc09mZnNldEdhcHMgPSBmdW5jdGlvbiBjc3NPZmZzZXRHYXBzKG9wdGlvbnMpIHtcbiAgICB2YXIgY2xvbmVDb3VudCA9IHRoaXMuZ2V0Q2xvbmVDb3VudCgpO1xuXG4gICAgaWYgKGNsb25lQ291bnQgJiYgb3B0aW9ucy5nYXApIHtcbiAgICAgIHZhciBvcmllbnQgPSB0aGlzLkRpcmVjdGlvbi5vcmllbnQ7XG5cbiAgICAgIHZhciBfdGhpcyRwYXJzZUNzc1ZhbHVlNCA9IHRoaXMucGFyc2VDc3NWYWx1ZShvcHRpb25zLmdhcCksXG4gICAgICAgICAgdmFsdWUgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlNC52YWx1ZSxcbiAgICAgICAgICB1bml0MiA9IF90aGlzJHBhcnNlQ3NzVmFsdWU0LnVuaXQ7XG5cbiAgICAgIGlmICh0aGlzLmlzRml4ZWRXaWR0aChvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudCh2YWx1ZSAqIGNsb25lQ291bnQpLCB1bml0Mik7XG4gICAgICB9XG5cbiAgICAgIHZhciBwZXJQYWdlID0gb3B0aW9ucy5wZXJQYWdlO1xuICAgICAgdmFyIGdhcHMgPSBjbG9uZUNvdW50IC8gcGVyUGFnZTtcbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KGdhcHMgKiB2YWx1ZSksIHVuaXQyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIjtcbiAgfTtcblxuICBfcHJvdG8zLnJlc29sdmUgPSBmdW5jdGlvbiByZXNvbHZlKHByb3ApIHtcbiAgICByZXR1cm4gY2FtZWxUb0tlYmFiKHRoaXMuRGlyZWN0aW9uLnJlc29sdmUocHJvcCkpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzUGFkZGluZyA9IGZ1bmN0aW9uIGNzc1BhZGRpbmcob3B0aW9ucywgcmlnaHQpIHtcbiAgICB2YXIgcGFkZGluZyA9IG9wdGlvbnMucGFkZGluZztcbiAgICB2YXIgcHJvcCA9IHRoaXMuRGlyZWN0aW9uLnJlc29sdmUocmlnaHQgPyBcInJpZ2h0XCIgOiBcImxlZnRcIiwgdHJ1ZSk7XG4gICAgcmV0dXJuIHBhZGRpbmcgJiYgdW5pdChwYWRkaW5nW3Byb3BdIHx8IChpc09iamVjdChwYWRkaW5nKSA/IDAgOiBwYWRkaW5nKSkgfHwgXCIwcHhcIjtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1RyYWNrSGVpZ2h0ID0gZnVuY3Rpb24gY3NzVHJhY2tIZWlnaHQob3B0aW9ucykge1xuICAgIHZhciBoZWlnaHQgPSBcIlwiO1xuXG4gICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICBoZWlnaHQgPSB0aGlzLmNzc0hlaWdodChvcHRpb25zKTtcbiAgICAgIGFzc2VydChoZWlnaHQsICdcImhlaWdodFwiIGlzIG1pc3NpbmcuJyk7XG4gICAgICBoZWlnaHQgPSBcImNhbGMoXCIgKyBoZWlnaHQgKyBcIiAtIFwiICsgdGhpcy5jc3NQYWRkaW5nKG9wdGlvbnMsIGZhbHNlKSArIFwiIC0gXCIgKyB0aGlzLmNzc1BhZGRpbmcob3B0aW9ucywgdHJ1ZSkgKyBcIilcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9O1xuXG4gIF9wcm90bzMuY3NzSGVpZ2h0ID0gZnVuY3Rpb24gY3NzSGVpZ2h0KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdW5pdChvcHRpb25zLmhlaWdodCk7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NTbGlkZVdpZHRoID0gZnVuY3Rpb24gY3NzU2xpZGVXaWR0aChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuYXV0b1dpZHRoID8gXCJcIiA6IHVuaXQob3B0aW9ucy5maXhlZFdpZHRoKSB8fCAodGhpcy5pc1ZlcnRpY2FsKCkgPyBcIlwiIDogdGhpcy5jc3NTbGlkZVNpemUob3B0aW9ucykpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzU2xpZGVIZWlnaHQgPSBmdW5jdGlvbiBjc3NTbGlkZUhlaWdodChvcHRpb25zKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5maXhlZEhlaWdodCkgfHwgKHRoaXMuaXNWZXJ0aWNhbCgpID8gb3B0aW9ucy5hdXRvSGVpZ2h0ID8gXCJcIiA6IHRoaXMuY3NzU2xpZGVTaXplKG9wdGlvbnMpIDogdGhpcy5jc3NIZWlnaHQob3B0aW9ucykpO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzU2xpZGVTaXplID0gZnVuY3Rpb24gY3NzU2xpZGVTaXplKG9wdGlvbnMpIHtcbiAgICB2YXIgZ2FwID0gdW5pdChvcHRpb25zLmdhcCk7XG4gICAgcmV0dXJuIFwiY2FsYygoMTAwJVwiICsgKGdhcCAmJiBcIiArIFwiICsgZ2FwKSArIFwiKS9cIiArIChvcHRpb25zLnBlclBhZ2UgfHwgMSkgKyAoZ2FwICYmIFwiIC0gXCIgKyBnYXApICsgXCIpXCI7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NBc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIGNzc0FzcGVjdFJhdGlvKG9wdGlvbnMpIHtcbiAgICB2YXIgaGVpZ2h0UmF0aW8gPSBvcHRpb25zLmhlaWdodFJhdGlvO1xuICAgIHJldHVybiBoZWlnaHRSYXRpbyA/IFwiXCIgKyAxIC8gaGVpZ2h0UmF0aW8gOiBcIlwiO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRDc3NWYWx1ZSA9IGZ1bmN0aW9uIGJ1aWxkQ3NzVmFsdWUodmFsdWUsIHVuaXQyKSB7XG4gICAgcmV0dXJuIFwiXCIgKyB2YWx1ZSArIHVuaXQyO1xuICB9O1xuXG4gIF9wcm90bzMucGFyc2VDc3NWYWx1ZSA9IGZ1bmN0aW9uIHBhcnNlQ3NzVmFsdWUodmFsdWUpIHtcbiAgICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICB2YXIgbnVtYmVyID0gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcbiAgICAgIHZhciB1bml0MiA9IHZhbHVlLnJlcGxhY2UoL1xcZCooXFwuXFxkKik/LywgXCJcIikgfHwgXCJweFwiO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IG51bWJlcixcbiAgICAgICAgdW5pdDogdW5pdDJcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHVuaXQ6IFwicHhcIlxuICAgIH07XG4gIH07XG5cbiAgX3Byb3RvMy5wYXJzZUJyZWFrcG9pbnRzID0gZnVuY3Rpb24gcGFyc2VCcmVha3BvaW50cygpIHtcbiAgICB2YXIgX3RoaXM5ID0gdGhpcztcblxuICAgIHZhciBicmVha3BvaW50cyA9IHRoaXMub3B0aW9ucy5icmVha3BvaW50cztcbiAgICB0aGlzLmJyZWFrcG9pbnRzLnB1c2goW1wiZGVmYXVsdFwiLCB0aGlzLm9wdGlvbnNdKTtcblxuICAgIGlmIChicmVha3BvaW50cykge1xuICAgICAgZm9yT3duKGJyZWFrcG9pbnRzLCBmdW5jdGlvbiAob3B0aW9ucywgd2lkdGgpIHtcbiAgICAgICAgX3RoaXM5LmJyZWFrcG9pbnRzLnB1c2goW3dpZHRoLCBtZXJnZShtZXJnZSh7fSwgX3RoaXM5Lm9wdGlvbnMpLCBvcHRpb25zKV0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzMuaXNGaXhlZFdpZHRoID0gZnVuY3Rpb24gaXNGaXhlZFdpZHRoKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gISFvcHRpb25zW3RoaXMuRGlyZWN0aW9uLnJlc29sdmUoXCJmaXhlZFdpZHRoXCIpXTtcbiAgfTtcblxuICBfcHJvdG8zLmlzTG9vcCA9IGZ1bmN0aW9uIGlzTG9vcCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnR5cGUgPT09IExPT1A7XG4gIH07XG5cbiAgX3Byb3RvMy5pc0NlbnRlciA9IGZ1bmN0aW9uIGlzQ2VudGVyKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5mb2N1cyA9PT0gXCJjZW50ZXJcIikge1xuICAgICAgaWYgKHRoaXMuaXNMb29wKCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudHlwZSA9PT0gU0xJREUpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLm9wdGlvbnMudHJpbVNwYWNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBfcHJvdG8zLmlzVmVydGljYWwgPSBmdW5jdGlvbiBpc1ZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBUVEI7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZENsYXNzZXMgPSBmdW5jdGlvbiBidWlsZENsYXNzZXMoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgcmV0dXJuIFtDTEFTU19ST09ULCBDTEFTU19ST09UICsgXCItLVwiICsgb3B0aW9ucy50eXBlLCBDTEFTU19ST09UICsgXCItLVwiICsgb3B0aW9ucy5kaXJlY3Rpb24sIG9wdGlvbnMuZHJhZyAmJiBDTEFTU19ST09UICsgXCItLWRyYWdnYWJsZVwiLCBvcHRpb25zLmlzTmF2aWdhdGlvbiAmJiBDTEFTU19ST09UICsgXCItLW5hdlwiLCBDTEFTU19BQ1RJVkUsICF0aGlzLmNvbmZpZy5oaWRkZW4gJiYgQ0xBU1NfUkVOREVSRURdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkQXR0cnMgPSBmdW5jdGlvbiBidWlsZEF0dHJzKGF0dHJzKSB7XG4gICAgdmFyIGF0dHIgPSBcIlwiO1xuICAgIGZvck93bihhdHRycywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGF0dHIgKz0gdmFsdWUgPyBcIiBcIiArIGNhbWVsVG9LZWJhYihrZXkpICsgXCI9XFxcIlwiICsgdmFsdWUgKyBcIlxcXCJcIiA6IFwiXCI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGF0dHIudHJpbSgpO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRTdHlsZXMgPSBmdW5jdGlvbiBidWlsZFN0eWxlcyhzdHlsZXMpIHtcbiAgICB2YXIgc3R5bGUgPSBcIlwiO1xuICAgIGZvck93bihzdHlsZXMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBzdHlsZSArPSBcIiBcIiArIGNhbWVsVG9LZWJhYihrZXkpICsgXCI6XCIgKyB2YWx1ZSArIFwiO1wiO1xuICAgIH0pO1xuICAgIHJldHVybiBzdHlsZS50cmltKCk7XG4gIH07XG5cbiAgX3Byb3RvMy5yZW5kZXJTbGlkZXMgPSBmdW5jdGlvbiByZW5kZXJTbGlkZXMoKSB7XG4gICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgdmFyIHRhZyA9IHRoaXMuY29uZmlnLnNsaWRlVGFnO1xuICAgIHJldHVybiB0aGlzLnNsaWRlcy5tYXAoZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBcIjxcIiArIHRhZyArIFwiIFwiICsgX3RoaXMxMC5idWlsZEF0dHJzKGNvbnRlbnQuYXR0cnMpICsgXCI+XCIgKyAoY29udGVudC5odG1sIHx8IFwiXCIpICsgXCI8L1wiICsgdGFnICsgXCI+XCI7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICBfcHJvdG8zLmNvdmVyID0gZnVuY3Rpb24gY292ZXIoY29udGVudCkge1xuICAgIHZhciBzdHlsZXMgPSBjb250ZW50LnN0eWxlcyxcbiAgICAgICAgX2NvbnRlbnQkaHRtbCA9IGNvbnRlbnQuaHRtbCxcbiAgICAgICAgaHRtbCA9IF9jb250ZW50JGh0bWwgPT09IHZvaWQgMCA/IFwiXCIgOiBfY29udGVudCRodG1sO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb3ZlciAmJiAhdGhpcy5vcHRpb25zLmxhenlMb2FkKSB7XG4gICAgICB2YXIgc3JjID0gaHRtbC5tYXRjaCgvPGltZy4qP3NyY1xccyo9XFxzKihbJ1wiXSkoLis/KVxcMS4qPz4vKTtcblxuICAgICAgaWYgKHNyYyAmJiBzcmNbMl0pIHtcbiAgICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSBcImNlbnRlci9jb3ZlciBuby1yZXBlYXQgdXJsKCdcIiArIHNyY1syXSArIFwiJylcIjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMy5nZW5lcmF0ZUNsb25lcyA9IGZ1bmN0aW9uIGdlbmVyYXRlQ2xvbmVzKGNvbnRlbnRzKSB7XG4gICAgdmFyIGNsYXNzZXMgPSB0aGlzLm9wdGlvbnMuY2xhc3NlcztcbiAgICB2YXIgY291bnQgPSB0aGlzLmdldENsb25lQ291bnQoKTtcbiAgICB2YXIgc2xpZGVzID0gY29udGVudHMuc2xpY2UoKTtcblxuICAgIHdoaWxlIChzbGlkZXMubGVuZ3RoIDwgY291bnQpIHtcbiAgICAgIHB1c2goc2xpZGVzLCBzbGlkZXMpO1xuICAgIH1cblxuICAgIHB1c2goc2xpZGVzLnNsaWNlKC1jb3VudCkucmV2ZXJzZSgpLCBzbGlkZXMuc2xpY2UoMCwgY291bnQpKS5mb3JFYWNoKGZ1bmN0aW9uIChjb250ZW50LCBpbmRleCkge1xuICAgICAgdmFyIGF0dHJzID0gYXNzaWduKHt9LCBjb250ZW50LmF0dHJzLCB7XG4gICAgICAgIGNsYXNzOiBjb250ZW50LmF0dHJzLmNsYXNzICsgXCIgXCIgKyBjbGFzc2VzLmNsb25lXG4gICAgICB9KTtcbiAgICAgIHZhciBjbG9uZSA9IGFzc2lnbih7fSwgY29udGVudCwge1xuICAgICAgICBhdHRyczogYXR0cnNcbiAgICAgIH0pO1xuICAgICAgaW5kZXggPCBjb3VudCA/IGNvbnRlbnRzLnVuc2hpZnQoY2xvbmUpIDogY29udGVudHMucHVzaChjbG9uZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5nZXRDbG9uZUNvdW50ID0gZnVuY3Rpb24gZ2V0Q2xvbmVDb3VudCgpIHtcbiAgICBpZiAodGhpcy5pc0xvb3AoKSkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAgIGlmIChvcHRpb25zLmNsb25lcykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5jbG9uZXM7XG4gICAgICB9XG5cbiAgICAgIHZhciBwZXJQYWdlID0gbWF4LmFwcGx5KHZvaWQgMCwgdGhpcy5icmVha3BvaW50cy5tYXAoZnVuY3Rpb24gKF9yZWY2KSB7XG4gICAgICAgIHZhciBvcHRpb25zMiA9IF9yZWY2WzFdO1xuICAgICAgICByZXR1cm4gb3B0aW9uczIucGVyUGFnZTtcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBwZXJQYWdlICogKChvcHRpb25zLmZsaWNrTWF4UGFnZXMgfHwgMSkgKyAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfTtcblxuICBfcHJvdG8zLnJlbmRlckFycm93cyA9IGZ1bmN0aW9uIHJlbmRlckFycm93cygpIHtcbiAgICB2YXIgaHRtbCA9IFwiXCI7XG4gICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcIlwiICsgdGhpcy5vcHRpb25zLmNsYXNzZXMuYXJyb3dzICsgXCJcXFwiPlwiO1xuICAgIGh0bWwgKz0gdGhpcy5yZW5kZXJBcnJvdyh0cnVlKTtcbiAgICBodG1sICs9IHRoaXMucmVuZGVyQXJyb3coZmFsc2UpO1xuICAgIGh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICByZXR1cm4gaHRtbDtcbiAgfTtcblxuICBfcHJvdG8zLnJlbmRlckFycm93ID0gZnVuY3Rpb24gcmVuZGVyQXJyb3cocHJldikge1xuICAgIHZhciBfdGhpcyRvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBjbGFzc2VzID0gX3RoaXMkb3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBpMThuID0gX3RoaXMkb3B0aW9ucy5pMThuO1xuICAgIHZhciBhdHRycyA9IHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLmFycm93ICsgXCIgXCIgKyAocHJldiA/IGNsYXNzZXMucHJldiA6IGNsYXNzZXMubmV4dCksXG4gICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgYXJpYUxhYmVsOiBwcmV2ID8gaTE4bi5wcmV2IDogaTE4bi5uZXh0XG4gICAgfTtcbiAgICByZXR1cm4gXCI8YnV0dG9uIFwiICsgdGhpcy5idWlsZEF0dHJzKGF0dHJzKSArIFwiPjxzdmcgeG1sbnM9XFxcIlwiICsgWE1MX05BTUVfU1BBQ0UgKyBcIlxcXCIgdmlld0JveD1cXFwiMCAwIFwiICsgU0laRSArIFwiIFwiICsgU0laRSArIFwiXFxcIiB3aWR0aD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiIGhlaWdodD1cXFwiXCIgKyBTSVpFICsgXCJcXFwiPjxwYXRoIGQ9XFxcIlwiICsgKHRoaXMub3B0aW9ucy5hcnJvd1BhdGggfHwgUEFUSCkgKyBcIlxcXCIgLz48L3N2Zz48L2J1dHRvbj5cIjtcbiAgfTtcblxuICBfcHJvdG8zLmh0bWwgPSBmdW5jdGlvbiBodG1sKCkge1xuICAgIHZhciBfdGhpcyRjb25maWcgPSB0aGlzLmNvbmZpZyxcbiAgICAgICAgcm9vdENsYXNzID0gX3RoaXMkY29uZmlnLnJvb3RDbGFzcyxcbiAgICAgICAgbGlzdFRhZyA9IF90aGlzJGNvbmZpZy5saXN0VGFnLFxuICAgICAgICBhcnJvd3MgPSBfdGhpcyRjb25maWcuYXJyb3dzLFxuICAgICAgICBiZWZvcmVUcmFjayA9IF90aGlzJGNvbmZpZy5iZWZvcmVUcmFjayxcbiAgICAgICAgYWZ0ZXJUcmFjayA9IF90aGlzJGNvbmZpZy5hZnRlclRyYWNrLFxuICAgICAgICBzbGlkZXIgPSBfdGhpcyRjb25maWcuc2xpZGVyLFxuICAgICAgICBiZWZvcmVTbGlkZXIgPSBfdGhpcyRjb25maWcuYmVmb3JlU2xpZGVyLFxuICAgICAgICBhZnRlclNsaWRlciA9IF90aGlzJGNvbmZpZy5hZnRlclNsaWRlcjtcbiAgICB2YXIgaHRtbCA9IFwiXCI7XG4gICAgaHRtbCArPSBcIjxkaXYgaWQ9XFxcIlwiICsgdGhpcy5pZCArIFwiXFxcIiBjbGFzcz1cXFwiXCIgKyB0aGlzLmJ1aWxkQ2xhc3NlcygpICsgXCIgXCIgKyAocm9vdENsYXNzIHx8IFwiXCIpICsgXCJcXFwiPlwiO1xuICAgIGh0bWwgKz0gXCI8c3R5bGU+XCIgKyB0aGlzLlN0eWxlLmJ1aWxkKCkgKyBcIjwvc3R5bGU+XCI7XG5cbiAgICBpZiAoc2xpZGVyKSB7XG4gICAgICBodG1sICs9IGJlZm9yZVNsaWRlciB8fCBcIlwiO1xuICAgICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcInNwbGlkZV9fc2xpZGVyXFxcIj5cIjtcbiAgICB9XG5cbiAgICBodG1sICs9IGJlZm9yZVRyYWNrIHx8IFwiXCI7XG5cbiAgICBpZiAoYXJyb3dzKSB7XG4gICAgICBodG1sICs9IHRoaXMucmVuZGVyQXJyb3dzKCk7XG4gICAgfVxuXG4gICAgaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcInNwbGlkZV9fdHJhY2tcXFwiPlwiO1xuICAgIGh0bWwgKz0gXCI8XCIgKyBsaXN0VGFnICsgXCIgY2xhc3M9XFxcInNwbGlkZV9fbGlzdFxcXCI+XCI7XG4gICAgaHRtbCArPSB0aGlzLnJlbmRlclNsaWRlcygpO1xuICAgIGh0bWwgKz0gXCI8L1wiICsgbGlzdFRhZyArIFwiPlwiO1xuICAgIGh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICBodG1sICs9IGFmdGVyVHJhY2sgfHwgXCJcIjtcblxuICAgIGlmIChzbGlkZXIpIHtcbiAgICAgIGh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICAgIGh0bWwgKz0gYWZ0ZXJTbGlkZXIgfHwgXCJcIjtcbiAgICB9XG5cbiAgICBodG1sICs9IFwiPC9kaXY+XCI7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH07XG5cbiAgcmV0dXJuIFNwbGlkZVJlbmRlcmVyO1xufSgpO1xuXG5leHBvcnQgeyBDTEFTU0VTLCBDTEFTU19BQ1RJVkUsIENMQVNTX0FSUk9XLCBDTEFTU19BUlJPV1MsIENMQVNTX0FSUk9XX05FWFQsIENMQVNTX0FSUk9XX1BSRVYsIENMQVNTX0NMT05FLCBDTEFTU19DT05UQUlORVIsIENMQVNTX0ZPQ1VTX0lOLCBDTEFTU19JTklUSUFMSVpFRCwgQ0xBU1NfTElTVCwgQ0xBU1NfTE9BRElORywgQ0xBU1NfTkVYVCwgQ0xBU1NfT1ZFUkZMT1csIENMQVNTX1BBR0lOQVRJT04sIENMQVNTX1BBR0lOQVRJT05fUEFHRSwgQ0xBU1NfUFJFViwgQ0xBU1NfUFJPR1JFU1MsIENMQVNTX1BST0dSRVNTX0JBUiwgQ0xBU1NfUk9PVCwgQ0xBU1NfU0xJREUsIENMQVNTX1NQSU5ORVIsIENMQVNTX1NSLCBDTEFTU19UT0dHTEUsIENMQVNTX1RPR0dMRV9QQVVTRSwgQ0xBU1NfVE9HR0xFX1BMQVksIENMQVNTX1RSQUNLLCBDTEFTU19WSVNJQkxFLCBERUZBVUxUUywgRVZFTlRfQUNUSVZFLCBFVkVOVF9BUlJPV1NfTU9VTlRFRCwgRVZFTlRfQVJST1dTX1VQREFURUQsIEVWRU5UX0FVVE9QTEFZX1BBVVNFLCBFVkVOVF9BVVRPUExBWV9QTEFZLCBFVkVOVF9BVVRPUExBWV9QTEFZSU5HLCBFVkVOVF9DTElDSywgRVZFTlRfREVTVFJPWSwgRVZFTlRfRFJBRywgRVZFTlRfRFJBR0dFRCwgRVZFTlRfRFJBR0dJTkcsIEVWRU5UX0VORF9JTkRFWF9DSEFOR0VELCBFVkVOVF9ISURERU4sIEVWRU5UX0lOQUNUSVZFLCBFVkVOVF9MQVpZTE9BRF9MT0FERUQsIEVWRU5UX01PVU5URUQsIEVWRU5UX01PVkUsIEVWRU5UX01PVkVELCBFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQsIEVWRU5UX09WRVJGTE9XLCBFVkVOVF9QQUdJTkFUSU9OX01PVU5URUQsIEVWRU5UX1BBR0lOQVRJT05fVVBEQVRFRCwgRVZFTlRfUkVBRFksIEVWRU5UX1JFRlJFU0gsIEVWRU5UX1JFU0laRSwgRVZFTlRfUkVTSVpFRCwgRVZFTlRfU0NST0xMLCBFVkVOVF9TQ1JPTExFRCwgRVZFTlRfU0hJRlRFRCwgRVZFTlRfU0xJREVfS0VZRE9XTiwgRVZFTlRfVVBEQVRFRCwgRVZFTlRfVklTSUJMRSwgRXZlbnRCaW5kZXIsIEV2ZW50SW50ZXJmYWNlLCBGQURFLCBMT09QLCBMVFIsIFJUTCwgUmVxdWVzdEludGVydmFsLCBTTElERSwgU1RBVFVTX0NMQVNTRVMsIFNwbGlkZSwgU3BsaWRlUmVuZGVyZXIsIFN0YXRlLCBUVEIsIFRocm90dGxlLCBTcGxpZGUgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IFNwbGlkZSBmcm9tICdAc3BsaWRlanMvc3BsaWRlJztcclxuXHJcbmNvbnN0IEVMID0gJy5qcy1zaG93J1xyXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSAnaXMtYWN0aXZlJ1xyXG5cclxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoRUwpKSB7XHJcbiAgY29uc3Qgc2xpZGVyID0gbmV3IFNwbGlkZSggRUwsIHtcclxuICAgIHR5cGU6ICdsb29wJyxcclxuICAgIHBlck1vdmU6IDEsXHJcbiAgICBwZXJQYWdlOiA0LFxyXG4gICAgYXV0b1dpZHRoOiB0cnVlLFxyXG4gICAgd2lkdGg6IDcwMCxcclxuICAgIGdhcDogNTAsXHJcbiAgICBwYWdpbmF0aW9uOiBmYWxzZVxyXG4gIH0gKS5tb3VudCgpO1xyXG59XHJcbiIsImltcG9ydCBcIi4vbW9kdWxlcy9BbmltYXRlXCI7XHJcbmltcG9ydCBcIi4vbW9kdWxlcy9Ub2dnbGVOYXZcIjtcclxuaW1wb3J0IFwiLi9tb2R1bGVzL2N1c3RvbS1zZWxlY3Rib3hcIjtcclxuaW1wb3J0IFwiLi9tb2R1bGVzL2Nvb2tpZXNcIjtcclxuaW1wb3J0IFwiLi9tb2R1bGVzL1ppcE1vZGFsXCI7XHJcbmltcG9ydCBcIi4vbW9kdWxlcy9HaWZ0TW9kYWxcIjtcclxuaW1wb3J0IFwiLi9tb2R1bGVzL0FqYXhGb3JtXCI7XHJcbmltcG9ydCBcIi4vbW9kdWxlcy9MaWdodEJveFwiO1xyXG5pbXBvcnQgXCIuL21vZHVsZXMvRmlsZVVwbG9hZFwiO1xyXG5pbXBvcnQgXCIuL21vZHVsZXMvUmVmZXJlbmNlc0J1dHRvblwiO1xyXG5pbXBvcnQgXCIuL21vZHVsZXMvU2hvd1wiO1xyXG5cclxudmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoXCIucmVmZXJlbmNlc19fc2xpZGVyXCIsIHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgZWw6IFwiLnN3aXBlci1wYWdpbmF0aW9uXCIsXHJcbiAgICAgICAgICBjbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICA1MDA6IHtcclxuICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICA3Njc6IHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICA5OTE6IHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA0MCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgICBzcGFjZUJldHdlZW46IDY1LFxyXG4gICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cdCQuY29va2llQ29uc2VudCh7XHJcbiAgICAgICAgbWVzc2FnZTogXCJUYXRvIHN0csOhbmthIHBvdcW+w612w6EgY29va2llcy4gVcW+w612w6Fuw61tIHTDqXRvIHN0csOhbmt5IHNvdWhsYXPDrXRlIHMgbmHFocOtbSBwb3XFvsOtdsOhbsOtbSB0xJtjaHRvIGNvb2tpZXMuXCIsXHJcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZDogI2VhZWFlYTsgcG9zaXRpb246IGZpeGVkOyB0b3A6IDA7IHotaW5kZXg6IDk5OTk5OTk7IHdpZHRoOiAxMDAlO1wiLFxyXG4gICAgICAgIGNvbnNlbnRNZXNzYWdlOiBcIlJvenVtw61tXCIsXHJcbiAgICAgICAgY29uc2VudFN0eWxlOiBcImJhY2tncm91bmQ6ICMyNmEzN2E7IGJvcmRlci1yYWRpdXM6IDUwcHg7IGZvbnQtc2l6ZTogMTRweDsgY3Vyc29yOiBwb2ludGVyO1wiXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLnRpbGUya2tcIikub24oIFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcIi5mb3JtIHNlbGVjdFwiKS52YWwoXCJCeXQgMmtrXCIpLmNoYW5nZSgpO1xyXG4gICAgfSk7XHJcbiAgICAkKFwiLnRpbGUza2tcIikub24oIFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcIi5mb3JtIHNlbGVjdFwiKS52YWwoXCJCeXQgM2trXCIpLmNoYW5nZSgpO1xyXG4gICAgfSk7XHJcbiAgICAkKFwiLnRpbGU0a2tcIikub24oIFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcIi5mb3JtIHNlbGVjdFwiKS52YWwoXCJCeXQgNGtrXCIpLmNoYW5nZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi50aWxlcmQxMDBcIikub24oIFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcIi5mb3JtIHNlbGVjdFwiKS52YWwoXCJSRCBkbyAxMDBtwrJcIikuY2hhbmdlKCk7XHJcbiAgICB9KTtcclxuICAgICQoXCIudGlsZXJkMTUwXCIpLm9uKCBcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoXCIuZm9ybSBzZWxlY3RcIikudmFsKFwiUkQgZG8gMTUwbcKyXCIpLmNoYW5nZSgpO1xyXG4gICAgfSk7XHJcbiAgICAkKFwiLnRpbGVyZDIwMFwiKS5vbiggXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiLmZvcm0gc2VsZWN0XCIpLnZhbChcIlJEIGRvIDIwMG3CslwiKS5jaGFuZ2UoKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcbiJdLCJuYW1lcyI6WyJSQVRJTyIsIkxPQURfUkFUSU8iLCJFTEVNRU5UUyIsIlZJU0lCTEVfQ0xBU1MiLCJBbmltYXRlIiwidmFsdWUiLCJpbmNsdWRlcyIsInBhcnNlSW50IiwiQ1VTVE9NX1JBVElPIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2VjdGlvbnMiLCJzZWN0aW9uIiwiZGVsYXkiLCJnZXREZWxheSIsImdldEF0dHJpYnV0ZSIsInJhdGlvIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJzZXRUaW1lb3V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNjcm9sbEhhbmRsZXIiLCJUT0dHTEVfQ0xBU1MiLCJUb2dnbGVOYXYiLCJlbGVtZW50cyIsImZvckVhY2giLCJlbCIsInRvZ2dsZU5hdiIsImUiLCJib2R5IiwidG9nZ2xlIiwicHJldmVudERlZmF1bHQiLCIkIiwiZm4iLCJSZXZTZWxlY3RCb3giLCJlYWNoIiwiJHRoaXMiLCJudW1iZXJPZk9wdGlvbnMiLCJjaGlsZHJlbiIsImxlbmd0aCIsImFkZENsYXNzIiwicGFyZW50IiwiaGFzQ2xhc3MiLCJ3cmFwIiwiY2xvc2VzdCIsImZpbmQiLCJyZW1vdmUiLCJhZnRlciIsIiRzdHlsZWRTZWxlY3QiLCJuZXh0IiwidGV4dCIsImVxIiwiJGxpc3QiLCJpbnNlcnRBZnRlciIsImkiLCJyZWwiLCJ2YWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJjbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm5vdCIsInJlbW92ZUNsYXNzIiwiaGlkZSIsInRvZ2dsZUNsYXNzIiwiYXR0ciIsInRyaWdnZXIiLCJjaGFuZ2UiLCJqUXVlcnkiLCJhIiwiY29va2llIiwibyIsIm4iLCJhcmd1bWVudHMiLCJleHRlbmQiLCJleHBpcmVzIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmF3IiwidG9VVENTdHJpbmciLCJwYXRoIiwiZG9tYWluIiwic2VjdXJlIiwiam9pbiIsInQiLCJzIiwic3BsaXQiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjb29raWVDb25zZW50IiwicG9zaXRpb24iLCJtZXNzYWdlIiwic3R5bGUiLCJjb25zZW50TWVzc2FnZSIsImNvbnNlbnRTdHlsZSIsImFjY2VwdENsYXNzIiwiY29uc2VudFRpbWUiLCJzdG9yYWdlIiwib25Jbml0Iiwib25Db25zZW50Iiwib25UZW1wbGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJ0ZXN0aW5nIiwiY29uc2VudEtleSIsImlzR29vZ2xlQm90IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJTdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNlc3Npb25TdG9yYWdlIiwiaHRtbCIsImFwcGVuZCIsInByZXBlbmRUbyIsImNhbGwiLCJEYXRlIiwiZ2V0VGltZSIsInNob3ciLCJzZXRJdGVtIiwidGhpcyIsIklOUFVUIiwiWmlwTW9kYWwiLCJhbGwiLCJrcmFqIiwiYWRkcmVzcyIsImNlbGFfYWRyZXNhIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJvcGVuTW9kYWwiLCJpZCIsIkNMT1NFX0JVVFRPTiIsImNvbnRlbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xvbmVOb2RlIiwibW9kYWwiLCJHTGlnaHRib3giLCJza2luIiwib3BlbiIsImNsb3NlIiwiaW5wdXQiLCJmb3JtIiwic3VibWl0IiwiaXNfbW9kYWxfc2hvdyIsImNhbGxNb2RhbCIsImxpZ2h0Ym94SW5saW5lSWZyYW1lIiwic2VsZWN0b3IiLCJ0b3VjaE5hdmlnYXRpb24iLCJzbGlkZUVmZmVjdCIsImRyYWdnYWJsZSIsIkFKQVhfVVJMIiwicmVDQVBUQ0hBX3NpdGVfa2V5IiwiU1VDQ0VTU19DTEFTUyIsIkFqYXhGb3JtIiwic2VsZiIsImdyZWNhcHRjaGEiLCJyZWFkeSIsImV4ZWN1dGUiLCJhY3Rpb24iLCJ0aGVuIiwidG9rZW4iLCJhamF4SGFuZGxlciIsInRhcmdldCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJnZXRBbGwiLCJtZXNzYWdlX3N1Y2Nlc3MiLCJtZXNzYWdlX2Vycm9yIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJhamF4VXJsIiwic2VuZCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJyZXNwb25zZSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsInJlbW92ZUF0dHJpYnV0ZSIsImRpc3BsYXkiLCJzdGF0dXMiLCJzY3JvbGxJbnRvVmlldyIsImNvbnZlcnNpb25Db25mIiwicmMiLCJjb252ZXJzaW9uSGl0IiwiZmxhdEJ1dHRvbiIsImd0YWciLCJlcnJvcnMiLCJzdWJtaXRIYW5kbGVyIiwibGltaXQiLCJmaWxlIiwiZmlsZXMiLCJmaWxlTmFtZSIsIm5hbWUiLCJmaWxlU2l6ZSIsInNpemUiLCJ0b0ZpeGVkIiwiJGxhYmVsIiwicHJldiIsImFsZXJ0IiwiYnRuIiwiZXZlbnQiLCJtaWxpc2Vjb25kcyIsInRyYW5zaXRpb25GdW5jdGlvbiIsIm9uT3BlbiIsIm9uQ2xvc2UiLCJFTCIsIlNwbGlkZSIsInR5cGUiLCJwZXJNb3ZlIiwicGVyUGFnZSIsImF1dG9XaWR0aCIsIndpZHRoIiwiZ2FwIiwicGFnaW5hdGlvbiIsIm1vdW50IiwiU3dpcGVyIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsImNsaWNrYWJsZSIsImJyZWFrcG9pbnRzIiwib24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUFBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUEsSUFBTUEsS0FBSyxHQUFHLE1BQWQ7RUFDQSxJQUFNQyxVQUFVLEdBQUcsR0FBbkI7RUFDQSxJQUFNQyxVQUFRLEdBQUcsVUFBakI7RUFDQSxJQUFNQyxhQUFhLEdBQUcsa0JBQXRCOztNQUVNQyxZQUNMLG1CQUFjO0VBQUE7O0VBQUE7O0VBQUEsb0NBUUgsVUFBQUMsS0FBSyxFQUFJO0VBQ25CLFFBQUlBLEtBQUssS0FBSyxJQUFkLEVBQW9CO0VBQ25CLGFBQU8sQ0FBUDtFQUNBLEtBRkQsTUFFTyxJQUFJQSxLQUFLLENBQUNDLFFBQU4sQ0FBZSxHQUFmLENBQUosRUFBeUI7RUFDL0IsYUFBT0QsS0FBSyxHQUFHLElBQWY7RUFDQSxLQUZNLE1BRUE7RUFDTixhQUFPRSxRQUFRLENBQUNGLEtBQUQsQ0FBZjtFQUNBO0VBQ0QsR0FoQmE7O0VBQUEseUNBa0JFLFVBQUNHLFlBQUQsRUFBa0I7RUFDakMsUUFBSSxDQUFDQyxRQUFRLENBQUNDLGdCQUFULENBQTBCUixVQUFRLEdBQUcsUUFBWCxHQUFzQkMsYUFBdEIsR0FBc0MsR0FBaEUsQ0FBTCxFQUEyRTs7RUFEMUMsK0NBR1gsS0FBSSxDQUFDUSxRQUhNO0VBQUE7O0VBQUE7RUFBQTtFQUFBLFlBR3RCQyxPQUhzQjs7RUFJaEMsWUFBTUMsS0FBSyxHQUFHLEtBQUksQ0FBQ0MsUUFBTCxDQUFjRixPQUFPLENBQUNHLFlBQVIsQ0FBcUIsZUFBckIsQ0FBZCxDQUFkOztFQUNBLFlBQU1DLEtBQUssR0FBR0osT0FBTyxDQUFDRyxZQUFSLENBQXFCLGVBQXJCLElBQXdDSCxPQUFPLENBQUNHLFlBQVIsQ0FBcUIsZUFBckIsQ0FBeEMsR0FBZ0ZQLFlBQTlGOztFQUVBLFlBQ0NJLE9BQU8sQ0FBQ0sscUJBQVIsR0FBZ0NDLEdBQWhDLElBQXVDQyxNQUFNLENBQUNDLFdBQVAsR0FBcUJKLEtBQTVELElBQ0FKLE9BQU8sQ0FBQ0sscUJBQVIsR0FBZ0NDLEdBQWhDLEdBQXNDLENBRnZDLEVBR0U7RUFDREcsVUFBQUEsVUFBVSxDQUFDLFlBQU07RUFDaEJULFlBQUFBLE9BQU8sQ0FBQ1UsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0JwQixhQUF0QjtFQUNBLFdBRlMsRUFFUFUsS0FGTyxDQUFWO0VBR0E7RUFkK0I7O0VBR2pDLDBEQUFxQztFQUFBO0VBWXBDO0VBZmdDO0VBQUE7RUFBQTtFQUFBO0VBQUE7RUFnQmpDLEdBbENhOztFQUNiLE9BQUtGLFFBQUwsR0FBZ0JGLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEJSLFVBQTFCLENBQWhCO0VBRUVpQixFQUFBQSxNQUFNLENBQUNLLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDO0VBQUEsV0FBTSxLQUFJLENBQUNDLGFBQUwsQ0FBbUJ6QixLQUFuQixDQUFOO0VBQUEsR0FBbEMsRUFBbUUsS0FBbkU7RUFFRixPQUFLeUIsYUFBTCxDQUFtQnhCLFVBQW5CO0VBQ0E7O0VBK0JGLElBQUlHLFNBQUo7O0VDbkRBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFFQSxJQUFNRixVQUFRLEdBQUcsb0JBQWpCO0VBQ0EsSUFBTXdCLFlBQVksR0FBRyxhQUFyQjs7TUFFTUM7RUFDSix1QkFBYztFQUFBOztFQUFBOztFQUNaLFNBQUtDLFFBQUwsR0FBZ0JuQixRQUFRLENBQUNDLGdCQUFULENBQTBCUixVQUExQixDQUFoQjs7RUFFQSxRQUFJLENBQUMsS0FBSzBCLFFBQVYsRUFBb0I7RUFDbEIsYUFBTyxLQUFQO0VBQ0Q7O0VBRUQsU0FBS0EsUUFBTCxDQUFjQyxPQUFkLENBQXNCLFVBQUNDLEVBQUQsRUFBUTtFQUM1QkEsTUFBQUEsRUFBRSxDQUFDTixnQkFBSCxDQUFvQixPQUFwQixFQUE2QixLQUFJLENBQUNPLFNBQWxDLEVBQTZDLEtBQTdDO0VBQ0FELE1BQUFBLEVBQUUsQ0FBQ04sZ0JBQUgsQ0FBb0IsWUFBcEIsRUFBa0MsS0FBSSxDQUFDTyxTQUF2QyxFQUFrRCxLQUFsRDtFQUNELEtBSEQ7RUFJRDs7OzthQUVELG1CQUFVQyxDQUFWLEVBQWE7RUFDWHZCLE1BQUFBLFFBQVEsQ0FBQ3dCLElBQVQsQ0FBY1gsU0FBZCxDQUF3QlksTUFBeEIsQ0FBK0JSLFlBQS9CO0VBQ0FqQixNQUFBQSxRQUFRLENBQUN3QixJQUFULENBQWNYLFNBQWQsQ0FBd0JZLE1BQXhCLENBQStCLE1BQS9CO0VBRUFGLE1BQUFBLENBQUMsQ0FBQ0csY0FBRjtFQUNEOzs7Ozs7RUFHSCxJQUFJUixTQUFKOztFQy9CQyxXQUFTUyxDQUFULEVBQVk7RUFDWEEsRUFBQUEsQ0FBQyxDQUFDQyxFQUFGLENBQUtDLFlBQUwsR0FBb0IsWUFBVztFQUU3QixTQUFLQyxJQUFMLENBQVUsWUFBVztFQUNuQixVQUFJQyxLQUFLLEdBQUdKLENBQUMsQ0FBQyxJQUFELENBQWI7RUFBQSxVQUNFSyxlQUFlLEdBQUdMLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU0sUUFBUixDQUFpQixRQUFqQixFQUEyQkMsTUFEL0M7RUFJQUgsTUFBQUEsS0FBSyxDQUFDSSxRQUFOLENBQWUsZUFBZjs7RUFFQSxVQUFJLENBQUNKLEtBQUssQ0FBQ0ssTUFBTixHQUFlQyxRQUFmLENBQXdCLFlBQXhCLENBQUwsRUFBNEM7RUFDMUNOLFFBQUFBLEtBQUssQ0FBQ08sSUFBTixDQUFXLGdDQUFYO0VBQ0Q7O0VBQ0RQLE1BQUFBLEtBQUssQ0FBQ1EsT0FBTixDQUFjLGFBQWQsRUFBNkJDLElBQTdCLENBQWtDLGdCQUFsQyxFQUFvREMsTUFBcEQ7RUFDQVYsTUFBQUEsS0FBSyxDQUFDUSxPQUFOLENBQWMsYUFBZCxFQUE2QkMsSUFBN0IsQ0FBa0MsaUJBQWxDLEVBQXFEQyxNQUFyRDtFQUdBVixNQUFBQSxLQUFLLENBQUNXLEtBQU4sQ0FBWSxtQ0FBWjtFQUVBLFVBQUlDLGFBQWEsR0FBR1osS0FBSyxDQUFDYSxJQUFOLENBQVcsbUJBQVgsQ0FBcEI7O0VBQ0EsVUFBSWIsS0FBSyxDQUFDUyxJQUFOLENBQVcsaUJBQVgsQ0FBSixFQUFtQztFQUNqQ0csUUFBQUEsYUFBYSxDQUFDRSxJQUFkLENBQW1CZCxLQUFLLENBQUNTLElBQU4sQ0FBVyxpQkFBWCxFQUE4QkssSUFBOUIsRUFBbkI7RUFDRCxPQUZELE1BR0k7RUFDRkYsUUFBQUEsYUFBYSxDQUFDRSxJQUFkLENBQW1CZCxLQUFLLENBQUNFLFFBQU4sQ0FBZSxRQUFmLEVBQXlCYSxFQUF6QixDQUE0QixDQUE1QixFQUErQkQsSUFBL0IsRUFBbkI7RUFDRDs7RUFFRCxVQUFJRSxLQUFLLEdBQUdwQixDQUFDLENBQUMsUUFBRCxFQUFXO0VBQ3RCLGlCQUFTO0VBRGEsT0FBWCxDQUFELENBRVRxQixXQUZTLENBRUdMLGFBRkgsQ0FBWjs7RUFJQSxXQUFLLElBQUlNLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdqQixlQUFwQixFQUFxQ2lCLENBQUMsRUFBdEMsRUFBMEM7RUFDeEN0QixRQUFBQSxDQUFDLENBQUMsUUFBRCxFQUFXO0VBQ1ZrQixVQUFBQSxJQUFJLEVBQUVkLEtBQUssQ0FBQ0UsUUFBTixDQUFlLFFBQWYsRUFBeUJhLEVBQXpCLENBQTRCRyxDQUE1QixFQUErQkosSUFBL0IsRUFESTtFQUVWSyxVQUFBQSxHQUFHLEVBQUVuQixLQUFLLENBQUNFLFFBQU4sQ0FBZSxRQUFmLEVBQXlCYSxFQUF6QixDQUE0QkcsQ0FBNUIsRUFBK0JFLEdBQS9CO0VBRkssU0FBWCxDQUFELENBR0dDLFFBSEgsQ0FHWUwsS0FIWjtFQUlEOztFQUVELFVBQUlNLFVBQVUsR0FBR04sS0FBSyxDQUFDZCxRQUFOLENBQWUsSUFBZixDQUFqQjtFQUVBVSxNQUFBQSxhQUFhLENBQUNXLEtBQWQsQ0FBb0IsVUFBUy9CLENBQVQsRUFBWTtFQUM5QkEsUUFBQUEsQ0FBQyxDQUFDZ0MsZUFBRjtFQUNBNUIsUUFBQUEsQ0FBQyxDQUFDLDBCQUFELENBQUQsQ0FBOEI2QixHQUE5QixDQUFrQyxJQUFsQyxFQUF3QzFCLElBQXhDLENBQTZDLFlBQVc7RUFDdERILFVBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUThCLFdBQVIsQ0FBb0IsUUFBcEIsRUFBOEJiLElBQTlCLENBQW1DLG1CQUFuQyxFQUF3RGMsSUFBeEQ7RUFDRCxTQUZEO0VBR0EvQixRQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFnQyxXQUFSLENBQW9CLFFBQXBCLEVBQThCZixJQUE5QixDQUFtQyxtQkFBbkMsRUFBd0RuQixNQUF4RDtFQUNELE9BTkQ7RUFRQTRCLE1BQUFBLFVBQVUsQ0FBQ0MsS0FBWCxDQUFpQixVQUFTL0IsQ0FBVCxFQUFZO0VBQzNCQSxRQUFBQSxDQUFDLENBQUNnQyxlQUFGO0VBQ0FaLFFBQUFBLGFBQWEsQ0FBQ0UsSUFBZCxDQUFtQmxCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWtCLElBQVIsRUFBbkIsRUFBbUNZLFdBQW5DLENBQStDLFFBQS9DO0VBQ0ExQixRQUFBQSxLQUFLLENBQUNvQixHQUFOLENBQVV4QixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFpQyxJQUFSLENBQWEsS0FBYixDQUFWLEVBQStCQyxPQUEvQixDQUF1QyxRQUF2QztFQUNBZCxRQUFBQSxLQUFLLENBQUNXLElBQU4sR0FKMkI7RUFNNUIsT0FORDtFQVFBM0IsTUFBQUEsS0FBSyxDQUFDK0IsTUFBTixDQUFhLFVBQVN2QyxDQUFULEVBQVk7RUFDdkI7RUFDQW9CLFFBQUFBLGFBQWEsQ0FBQ0UsSUFBZCxDQUFvQmQsS0FBSyxDQUFDUyxJQUFOLENBQVcsaUJBQVgsRUFBOEJLLElBQTlCLEVBQXBCO0VBQ0QsT0FIRDtFQUtBbEIsTUFBQUEsQ0FBQyxDQUFDM0IsUUFBRCxDQUFELENBQVlzRCxLQUFaLENBQWtCLFlBQVc7RUFDM0JYLFFBQUFBLGFBQWEsQ0FBQ2MsV0FBZCxDQUEwQixRQUExQjtFQUNBVixRQUFBQSxLQUFLLENBQUNXLElBQU47RUFDRCxPQUhEO0VBS0QsS0EvREQ7RUFpRUQsR0FuRUQ7RUFxRUQsQ0F0RUEsRUFzRUNLLE1BdEVELENBQUQ7O0VBd0VBQSxNQUFNLENBQUMsaUJBQUQsQ0FBTixDQUEwQmxDLFlBQTFCO0VBQ0FrQyxNQUFNLENBQUUsUUFBRixDQUFOLENBQW1CbEMsWUFBbkI7O0VDekVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUEsQ0FBQyxVQUFTbUMsQ0FBVCxFQUFXO0VBQUNBLEVBQUFBLENBQUMsQ0FBQ0MsTUFBRixHQUFTLFVBQVMxQyxDQUFULEVBQVcyQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtFQUFDLFFBQUcsSUFBRUMsU0FBUyxDQUFDbEMsTUFBZixFQUFzQixPQUFPaUMsQ0FBQyxHQUFDSCxDQUFDLENBQUNLLE1BQUYsQ0FBUyxFQUFULEVBQVlGLENBQVosQ0FBRixFQUFpQixRQUFNRCxDQUFOLEtBQVVDLENBQUMsQ0FBQ0csT0FBRixHQUFVLENBQUMsQ0FBckIsQ0FBakIsRUFBeUN0RSxRQUFRLENBQUNpRSxNQUFULEdBQWdCLENBQUNNLGtCQUFrQixDQUFDaEQsQ0FBRCxDQUFuQixFQUF1QixHQUF2QixFQUEyQjRDLENBQUMsQ0FBQ0ssR0FBRixHQUFNTixDQUFOLEdBQVFLLGtCQUFrQixDQUFDTCxDQUFELENBQXJELEVBQXlEQyxDQUFDLENBQUNHLE9BQUYsR0FBVSxlQUFhSCxDQUFDLENBQUNHLE9BQUYsQ0FBVUcsV0FBVixFQUF2QixHQUErQyxFQUF4RyxFQUEyR04sQ0FBQyxDQUFDTyxJQUFGLEdBQU8sWUFBVVAsQ0FBQyxDQUFDTyxJQUFuQixHQUF3QixFQUFuSSxFQUFzSVAsQ0FBQyxDQUFDUSxNQUFGLEdBQVMsY0FBWVIsQ0FBQyxDQUFDUSxNQUF2QixHQUE4QixFQUFwSyxFQUF1S1IsQ0FBQyxDQUFDUyxNQUFGLEdBQVMsVUFBVCxHQUFvQixFQUEzTCxFQUErTEMsSUFBL0wsQ0FBb00sRUFBcE0sQ0FBaEU7O0VBQXdRLFNBQUksSUFBSUMsQ0FBSixFQUFNQyxDQUFDLEdBQUMvRSxRQUFRLENBQUNpRSxNQUFULENBQWdCZSxLQUFoQixDQUFzQixJQUF0QixDQUFSLEVBQW9DL0IsQ0FBQyxHQUFDLENBQTFDLEVBQTRDNkIsQ0FBQyxHQUFDQyxDQUFDLENBQUM5QixDQUFELENBQUQsSUFBTThCLENBQUMsQ0FBQzlCLENBQUQsQ0FBRCxDQUFLK0IsS0FBTCxDQUFXLEdBQVgsQ0FBcEQsRUFBb0UvQixDQUFDLEVBQXJFO0VBQXdFLFVBQUdnQyxrQkFBa0IsQ0FBQ0gsQ0FBQyxDQUFDLENBQUQsQ0FBRixDQUFsQixLQUEyQnZELENBQTlCLEVBQWdDLE9BQU8wRCxrQkFBa0IsQ0FBQ0gsQ0FBQyxDQUFDLENBQUQsQ0FBRCxJQUFNLEVBQVAsQ0FBekI7RUFBeEc7O0VBQTRJLFdBQU8sSUFBUDtFQUFZLEdBQS9jLEVBQWdkZCxDQUFDLENBQUNwQyxFQUFGLENBQUtzRCxhQUFMLEdBQW1CLFVBQVMzRCxDQUFULEVBQVc7RUFBQyxRQUFJMkMsQ0FBQyxHQUFDRixDQUFDLENBQUNLLE1BQUYsQ0FBUztFQUFDYyxNQUFBQSxRQUFRLEVBQUMsUUFBVjtFQUFtQkMsTUFBQUEsT0FBTyxFQUFDLDJGQUEzQjtFQUF1SEMsTUFBQUEsS0FBSyxFQUFDLEVBQTdIO0VBQWdJQyxNQUFBQSxjQUFjLEVBQUMsY0FBL0k7RUFBOEpDLE1BQUFBLFlBQVksRUFBQyxFQUEzSztFQUE4S0MsTUFBQUEsV0FBVyxFQUFDLGNBQTFMO0VBQXlNQyxNQUFBQSxXQUFXLEVBQUMsSUFBck47RUFBME5DLE1BQUFBLE9BQU8sRUFBQyxRQUFsTztFQUEyT0MsTUFBQUEsTUFBTSxFQUFDLGtCQUFVLEVBQTVQO0VBQStQQyxNQUFBQSxTQUFTLEVBQUMscUJBQVUsRUFBblI7RUFBc1JDLE1BQUFBLFVBQVUsRUFBQyxzQkFBVTtFQUFDQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxJQUFaO0VBQWtCLE9BQTlUO0VBQStUQyxNQUFBQSxPQUFPLEVBQUMsQ0FBQyxDQUF4VTtFQUEwVUMsTUFBQUEsVUFBVSxFQUFDO0VBQXJWLEtBQVQsRUFBb1gxRSxDQUFwWCxDQUFOO0VBQTZYMkMsSUFBQUEsQ0FBQyxDQUFDZ0MsV0FBRixHQUFjLENBQUMsQ0FBQ0MsU0FBUyxDQUFDQyxTQUFWLENBQW9CQyxLQUFwQixDQUEwQix3Q0FBMUIsQ0FBaEI7RUFBNkluQyxJQUFBQSxDQUFDLENBQUN3QixPQUFGLEdBQVUsWUFBVXhCLENBQUMsQ0FBQ3dCLE9BQVosSUFBcUIsZUFBYSxPQUFPWSxPQUF6QyxHQUFpRCxPQUFqRCxHQUF5RCxjQUFZcEMsQ0FBQyxDQUFDd0IsT0FBZCxJQUF1QixlQUFhLE9BQU9ZLE9BQTNDLEdBQW1ELFNBQW5ELEdBQTZELFFBQWhJO0VBQXlJLFFBQUluQyxDQUFDLEdBQUMsWUFBVUQsQ0FBQyxDQUFDd0IsT0FBWixHQUFvQjVGLFFBQVEsQ0FBQ3lHLFlBQVksQ0FBQ0MsT0FBYixDQUFxQnRDLENBQUMsQ0FBQytCLFVBQXZCLENBQUQsQ0FBNUIsR0FBaUUsY0FBWS9CLENBQUMsQ0FBQ3dCLE9BQWQsR0FBc0I1RixRQUFRLENBQUMyRyxjQUFjLENBQUNELE9BQWYsQ0FBdUJ0QyxDQUFDLENBQUMrQixVQUF6QixDQUFELENBQTlCLEdBQXFFbkcsUUFBUSxDQUFDa0UsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLENBQUMsQ0FBQytCLFVBQVgsQ0FBRCxDQUFwSjtFQUFBLFFBQTZLbkIsQ0FBQyxHQUFDLEtBQUs1QyxNQUFMLEdBQVksSUFBWixHQUFpQjhCLENBQUMsQ0FBQyxPQUFELEVBQVM7RUFBQzBDLE1BQUFBLElBQUksRUFBQ3hDLENBQUMsQ0FBQ2tCLE9BQVI7RUFBZ0JDLE1BQUFBLEtBQUssRUFBQyxzRUFBb0VuQixDQUFDLENBQUNtQjtFQUE1RixLQUFULENBQUQsQ0FBOEdzQixNQUE5RyxDQUFxSDNDLENBQUMsQ0FBQyxVQUFELEVBQVk7RUFBQzBDLE1BQUFBLElBQUksRUFBQ3hDLENBQUMsQ0FBQ29CLGNBQVI7RUFBdUJELE1BQUFBLEtBQUssRUFBQyw4R0FBNEduQixDQUFDLENBQUNxQixZQUEzSTtFQUF3SixlQUFNckIsQ0FBQyxDQUFDc0I7RUFBaEssS0FBWixDQUF0SCxFQUFpVG9CLFNBQWpULENBQTJUNUMsQ0FBQyxDQUFDLE1BQUQsQ0FBNVQsQ0FBaE07RUFBc2dCLFdBQU9FLENBQUMsQ0FBQ3lCLE1BQUYsQ0FBU2tCLElBQVQsQ0FBYy9CLENBQWQsR0FBaUJaLENBQUMsQ0FBQ2dDLFdBQUYsR0FBY2xDLENBQUMsQ0FBQ2MsQ0FBRCxDQUFELENBQUtwQixJQUFMLEVBQWQsR0FBMEJRLENBQUMsQ0FBQzhCLE9BQUYsSUFBVyxDQUFDN0IsQ0FBWixJQUFlQSxDQUFDLEdBQUMsUUFBTUQsQ0FBQyxDQUFDdUIsV0FBVixHQUF1QixJQUFJcUIsSUFBSixFQUFELENBQVdDLE9BQVgsRUFBckMsR0FBMEQvQyxDQUFDLENBQUNjLENBQUQsQ0FBRCxDQUFLa0MsSUFBTCxFQUExRCxHQUFzRWhELENBQUMsQ0FBQ2MsQ0FBRCxDQUFELENBQUtwQixJQUFMLEVBQWpILEVBQTZIb0IsQ0FBQyxDQUFDaEQsSUFBRixDQUFPLFlBQVU7RUFBQyxVQUFJUCxDQUFDLEdBQUN5QyxDQUFDLENBQUMsSUFBRCxDQUFQO0VBQWNBLE1BQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTRDLFNBQVIsQ0FBa0I1QyxDQUFDLENBQUMsTUFBRCxDQUFuQixHQUE2QkEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFReEIsSUFBUixDQUFhLE1BQUkwQixDQUFDLENBQUNzQixXQUFuQixFQUFnQ2xDLEtBQWhDLENBQXNDLFlBQVU7RUFBQyxvQkFBVVksQ0FBQyxDQUFDd0IsT0FBWixHQUFvQmEsWUFBWSxDQUFDVSxPQUFiLENBQXFCL0MsQ0FBQyxDQUFDK0IsVUFBdkIsRUFBbUMsSUFBSWEsSUFBSixFQUFELENBQVdDLE9BQVgsRUFBbEMsQ0FBcEIsR0FBNEUsY0FBWTdDLENBQUMsQ0FBQ3dCLE9BQWQsR0FBc0JlLGNBQWMsQ0FBQ1EsT0FBZixDQUF1Qi9DLENBQUMsQ0FBQytCLFVBQXpCLEVBQXFDLElBQUlhLElBQUosRUFBRCxDQUFXQyxPQUFYLEVBQXBDLENBQXRCLEdBQWdGL0MsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLENBQUMsQ0FBQytCLFVBQVgsRUFBdUIsSUFBSWEsSUFBSixFQUFELENBQVdDLE9BQVgsRUFBdEIsRUFBMkM7RUFBQ3pDLFVBQUFBLE9BQU8sRUFBQyxJQUFJd0MsSUFBSixDQUFVLElBQUlBLElBQUosRUFBRCxDQUFXQyxPQUFYLEtBQXFCLFFBQU03QyxDQUFDLENBQUN1QixXQUF0QyxDQUFUO0VBQTREZixVQUFBQSxJQUFJLEVBQUM7RUFBakUsU0FBM0MsQ0FBNUosRUFBOFFuRCxDQUFDLENBQUNtQyxJQUFGLEVBQTlRLEVBQXVSUSxDQUFDLENBQUMwQixTQUFGLENBQVlpQixJQUFaLENBQWlCdEYsQ0FBakIsQ0FBdlI7RUFBMlMsT0FBNVYsQ0FBN0I7RUFBMlgsS0FBM1osQ0FBN0gsRUFBMGhCLElBQWppQjtFQUFzaUIsR0FBOXFFLEVBQStxRXlDLENBQUMsQ0FBQ2tCLGFBQUYsR0FBZ0IsVUFBUzNELENBQVQsRUFBVztFQUFDeUMsSUFBQUEsQ0FBQyxDQUFDcEMsRUFBRixDQUFLc0QsYUFBTCxDQUFtQjNELENBQW5CO0VBQXNCLEdBQWp1RTtFQUFrdUUsQ0FBOXVFLENBQSt1RXdDLE1BQS91RSxDQUFEOzs7Ozs7Ozs7RUNSQSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFzRCxjQUFjLENBQUMsQ0FBQyxHQUE0RSxDQUFDLENBQUNtRCxjQUFJLEVBQUUsVUFBVSxDQUFjLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLE9BQU8sTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsQ0FBQyxPQUFPLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxDQUFDLE9BQU8sS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTSxXQUFXLEdBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQywwR0FBMEcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMscUNBQXFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRSxDQUFDLENBQUMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsS0FBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsR0FBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFDLENBQUMsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRSxDQUFDLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF3QixDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGtFQUFrRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0VBQWdFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxxQ0FBcUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxFQUFFLDJCQUEyQixDQUFDLENBQUMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLE9BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUMsT0FBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTSxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU0sT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTSxNQUFNLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxHQUFHLE1BQU0sRUFBRSxtQkFBbUIsR0FBRyxNQUFNLEVBQUUsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFLENBQUMsbUNBQW1DLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxzcUJBQXNxQixDQUFDLElBQUksQ0FBQyw4WkFBOFosQ0FBQyxJQUFJLENBQUMsK1hBQStYLENBQUMsQ0FBQyxTQUFTLENBQUMsb2JBQW9iLENBQUMsWUFBWSxDQUFDLG1pQkFBbWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLG1DQUFtQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxPQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsc0ZBQXNGLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMseUNBQXlDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFN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O0VBQ3BFLEtBQUssQ0FBQztFQUNOLENBQUMsRUFBRSxPQUFPLEtBQUssT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDOztFQzNIN0IsSUFBSSxJQUFJLENBQUM7RUFDVCxDQUFDLFVBQVUsSUFBSSxFQUFFO0VBQ2pCLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLE9BQU8sRUFBRSxPQUFPLEVBQUU7RUFDMUMsUUFBUSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztFQUN2QyxLQUFLLENBQUM7RUFDTixDQUFDLEVBQUUsSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQzs7RUNMdkIsSUFBSSxJQUFJLENBQUM7RUFDVCxDQUFDLFVBQVUsSUFBSSxFQUFFO0VBQ2pCLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLE9BQU8sRUFBRSxPQUFPLEVBQUU7RUFDMUMsUUFBUSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztFQUN2QyxLQUFLLENBQUM7RUFDTixDQUFDLEVBQUUsSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQzs7RUNOdkIsSUFBSSxRQUFRLEdBQUcsQ0FBQ0EsU0FBSSxJQUFJQSxTQUFJLENBQUMsUUFBUSxLQUFLLFlBQVk7RUFDdEQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsRUFBRTtFQUM1QyxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQzdELFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3QixZQUFZLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFD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QUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7RUFDMUYsS0FBSyxDQUFDLENBQUM7RUFDUCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztFQUMxRCxJQUFJLE1BQU0sRUFBRSxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLE9BQU8sQ0FBQyxVQUFVLEVBQUU7RUFDL0IsSUFBSSxJQUFJLFVBQVUsRUFBRTtFQUNwQixNQUFNLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztFQUN2QixLQUFLO0VBQ0wsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO0VBQ3JDLElBQUksSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3RDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0VBQzdDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0VBQ3hDLEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxNQUFNLEdBQUc7RUFDcEIsSUFBSSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQ3hDLElBQUksSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztFQUN0QyxJQUFJLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxPQUFPLEVBQUUsS0FBSyxFQUFFO0VBQzFELE1BQU0sT0FBTyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQzlELEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztFQUNYLElBQUksSUFBSSxD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U0FBUyxTQUFTLEdBQUc7RUFDdkIsSUFBSSxJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDMUIsTUFBTSxPQUFPLFFBQVEsRUFBRSxDQUFDO0VBQ3hCLEtBQUs7QUFDTDtFQUNBLElBQUksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDcEQsSUFBSSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDaEMsSUFBSSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ3JDLElBQUksSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztFQUN2QyxJQUFJLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ2hILEdBQUc7QUFDSDtFQUNBLEVBQUUsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtFQUNwQyxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDakM7RUFDQSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDMUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO0VBQzlDLEtBQUs7QUFDTDtFQUNBLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxDQUFDO0VBQzVCLEdBQUc7QUFDSDtFQUNBLEVB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
