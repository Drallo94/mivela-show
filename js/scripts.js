(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
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
  var ELEMENTS$1 = '.animate';
  var VISIBLE_CLASS = 'animate--visible';

  var Animate = function Animate() {
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
      if (!document.querySelectorAll(ELEMENTS$1 + ':not(.' + VISIBLE_CLASS + ')')) return;

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

    this.sections = document.querySelectorAll(ELEMENTS$1);
    window.addEventListener('scroll', function () {
      return _this.scrollHandler(RATIO);
    }, false);
    this.scrollHandler(LOAD_RATIO);
  };

  new Animate();

  /**
   * Toggle Nav
   * ======================================
   * - toggle class on body
   */
  var ELEMENTS = '.togglenav__button';
  var TOGGLE_CLASS = 'nav-is-open';

  var ToggleNav = /*#__PURE__*/function () {
    function ToggleNav() {
      var _this = this;

      _classCallCheck(this, ToggleNav);

      this.elements = document.querySelectorAll(ELEMENTS);

      if (!this.elements) {
        return false;
      }

      this.elements.forEach(function (el) {
        el.addEventListener('click', _this.toggleNav, false);
        el.addEventListener('touchstart', _this.toggleNav, false);
      });
    }

    _createClass(ToggleNav, [{
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
  $('#file-upload').change(function () {
    $(this).prev('label').clone();
    var file = $('#file-upload')[0].files[0].name;
    $(this).prev('label').text(file);
  });
  $(document).ready(function () {
    $.cookieConsent({
      message: "Tato str??nka pou????v?? cookies. U????v??n??m t??to str??nky souhlas??te s na????m pou????v??n??m t??chto cookies.",
      style: "background: #eaeaea; position: fixed; top: 0; z-index: 9999999; width: 100%;",
      consentMessage: "Rozum??m",
      consentStyle: "background: #26a37a; border-radius: 50px; font-size: 14px; cursor: pointer;"
    });
  });

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9BbmltYXRlLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9Ub2dnbGVOYXYuanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL2Nvb2tpZXMuanMiLCJzcmMvc2NyaXB0cy9zY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBbmltYXRlXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIC0gYWRkIGNsYXNzIHRvIGVsZW1lbnQgaW4gdmlld3BvcnRcclxuICogLSBzdXBwb3J0IGN1c3RvbSBhbmltYXRpb24gZGVsYXkgdmlhIFthbmltYXRlLWRlbGF5XSBodG1sIGF0dHJpYnV0ZVxyXG4gKiAtIHN1cHBvcnQgY3VzdG9tIHZpc2libGUgcmF0aW8gdmlhIFthbmltYXRlLXJhdGlvXSBodG1sIGF0dHJpYnV0ZVxyXG4gKi9cclxuXHJcbmNvbnN0IFJBVElPID0gJzAuNzUnXHJcbmNvbnN0IExPQURfUkFUSU8gPSAnMSdcclxuY29uc3QgRUxFTUVOVFMgPSAnLmFuaW1hdGUnXHJcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSAnYW5pbWF0ZS0tdmlzaWJsZSdcclxuXHJcbmNsYXNzIEFuaW1hdGUge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMpXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHRoaXMuc2Nyb2xsSGFuZGxlcihSQVRJTyksIGZhbHNlKVxyXG5cclxuXHRcdHRoaXMuc2Nyb2xsSGFuZGxlcihMT0FEX1JBVElPKVxyXG5cdH1cclxuXHJcblx0Z2V0RGVsYXkgPSB2YWx1ZSA9PiB7XHJcblx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIDBcclxuXHRcdH0gZWxzZSBpZiAodmFsdWUuaW5jbHVkZXMoJy4nKSkge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUgKiAxMDAwXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodmFsdWUpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzY3JvbGxIYW5kbGVyID0gKENVU1RPTV9SQVRJTykgPT4ge1xyXG5cdFx0aWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKEVMRU1FTlRTICsgJzpub3QoLicgKyBWSVNJQkxFX0NMQVNTICsgJyknKSkgcmV0dXJuXHJcblxyXG5cdFx0Zm9yIChjb25zdCBzZWN0aW9uIG9mIHRoaXMuc2VjdGlvbnMpIHtcclxuXHRcdFx0Y29uc3QgZGVsYXkgPSB0aGlzLmdldERlbGF5KHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLWRlbGF5JykpXHJcblx0XHRcdGNvbnN0IHJhdGlvID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtcmF0aW8nKSA/IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLXJhdGlvJykgOiBDVVNUT01fUkFUSU9cclxuXHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRzZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8PSB3aW5kb3cuaW5uZXJIZWlnaHQgKiByYXRpbyAmJlxyXG5cdFx0XHRcdHNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gMFxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHNlY3Rpb24uY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKVxyXG5cdFx0XHRcdH0sIGRlbGF5KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5uZXcgQW5pbWF0ZSgpXHJcblxyXG4iLCIvKipcclxuICogVG9nZ2xlIE5hdlxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIHRvZ2dsZSBjbGFzcyBvbiBib2R5XHJcbiAqL1xyXG5cclxuY29uc3QgRUxFTUVOVFMgPSAnLnRvZ2dsZW5hdl9fYnV0dG9uJ1xyXG5jb25zdCBUT0dHTEVfQ0xBU1MgPSAnbmF2LWlzLW9wZW4nXHJcblxyXG5jbGFzcyBUb2dnbGVOYXYge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMpXHJcblxyXG4gICAgaWYgKCF0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU5hdiwgZmFsc2UpXHJcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvZ2dsZU5hdiwgZmFsc2UpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTmF2KGUpIHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShUT0dHTEVfQ0xBU1MpXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2xvY2snKVxyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gIH1cclxufVxyXG5cclxubmV3IFRvZ2dsZU5hdigpXHJcbiIsIihmdW5jdGlvbigkKSB7XG4gICQuZm4uUmV2U2VsZWN0Qm94ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XG5cblxuICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcblxuICAgICAgaWYoICEkdGhpcy5wYXJlbnQoKS5oYXNDbGFzcygncmV2LXNlbGVjdCcpICl7XG4gICAgICAgICR0aGlzLndyYXAoJzxkaXYgY2xhc3M9XCJyZXYtc2VsZWN0XCI+PC9kaXY+Jyk7XG4gICAgICB9XG4gICAgICAkdGhpcy5jbG9zZXN0KCcucmV2LXNlbGVjdCcpLmZpbmQoJy5zZWxlY3Qtc3R5bGVkJykucmVtb3ZlKCk7XG4gICAgICAkdGhpcy5jbG9zZXN0KCcucmV2LXNlbGVjdCcpLmZpbmQoJy5zZWxlY3Qtb3B0aW9ucycpLnJlbW92ZSgpO1xuXG5cbiAgICAgICR0aGlzLmFmdGVyKCc8ZGl2IGNsYXNzPVwic2VsZWN0LXN0eWxlZFwiPjwvZGl2PicpO1xuXG4gICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgICBpZiggJHRoaXMuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykgKXtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKDApLnRleHQoKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NlbGVjdC1vcHRpb25zJ1xuICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZPcHRpb25zOyBpKyspIHtcbiAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgfSkuYXBwZW5kVG8oJGxpc3QpO1xuICAgICAgfVxuXG4gICAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuXG4gICAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJCgnZGl2LnNlbGVjdC1zdHlsZWQuYWN0aXZlJykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgICRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgICAgfSk7XG5cbiAgICAgICR0aGlzLmNoYW5nZShmdW5jdGlvbihlKSB7XG4gICAgICAgIC8vIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCggJHRoaXMuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpICk7XG4gICAgICB9KTtcblxuICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH07XG5cbn0oalF1ZXJ5KSk7XG5cbmpRdWVyeShcIi5yZXYtc2VsZWN0LWJveFwiKS5SZXZTZWxlY3RCb3goKTtcbmpRdWVyeSggXCJzZWxlY3RcIiApLlJldlNlbGVjdEJveCgpO1xuIiwiLyohXG4gKiBqUXVlcnkgQ29va2llIGNvbnNlbnQgcGx1Z2luIHYxLjAuMTZcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9teXNwYWNlLW51XG4gKlxuICogQ29weXJpZ2h0IDIwMTcgSm9oYW4gSm9oYW5zc29uXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuXG4hZnVuY3Rpb24oYSl7YS5jb29raWU9ZnVuY3Rpb24oZSxvLG4pe2lmKDE8YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gbj1hLmV4dGVuZCh7fSxuKSxudWxsPT1vJiYobi5leHBpcmVzPS0xKSxkb2N1bWVudC5jb29raWU9W2VuY29kZVVSSUNvbXBvbmVudChlKSxcIj1cIixuLnJhdz9vOmVuY29kZVVSSUNvbXBvbmVudChvKSxuLmV4cGlyZXM/XCI7IGV4cGlyZXM9XCIrbi5leHBpcmVzLnRvVVRDU3RyaW5nKCk6XCJcIixuLnBhdGg/XCI7IHBhdGg9XCIrbi5wYXRoOlwiXCIsbi5kb21haW4/XCI7IGRvbWFpbj1cIituLmRvbWFpbjpcIlwiLG4uc2VjdXJlP1wiOyBzZWN1cmVcIjpcIlwiXS5qb2luKFwiXCIpO2Zvcih2YXIgdCxzPWRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjsgXCIpLGk9MDt0PXNbaV0mJnNbaV0uc3BsaXQoXCI9XCIpO2krKylpZihkZWNvZGVVUklDb21wb25lbnQodFswXSk9PT1lKXJldHVybiBkZWNvZGVVUklDb21wb25lbnQodFsxXXx8XCJcIik7cmV0dXJuIG51bGx9LGEuZm4uY29va2llQ29uc2VudD1mdW5jdGlvbihlKXt2YXIgbz1hLmV4dGVuZCh7cG9zaXRpb246XCJzdGF0aWNcIixtZXNzYWdlOlwiVGhpcyB3ZWJzaXRlIHVzZXMgY29va2llcy4gQnkgdXNpbmcgdGhpcyB3ZWJzaXRlIHlvdSBjb25zZW50IHRvIG91ciB1c2Ugb2YgdGhlc2UgY29va2llcy5cIixzdHlsZTpcIlwiLGNvbnNlbnRNZXNzYWdlOlwiSSB1bmRlcnN0YW5kXCIsY29uc2VudFN0eWxlOlwiXCIsYWNjZXB0Q2xhc3M6XCJjb29raWVBY2NlcHRcIixjb25zZW50VGltZTozNjUwLHN0b3JhZ2U6XCJjb29raWVcIixvbkluaXQ6ZnVuY3Rpb24oKXt9LG9uQ29uc2VudDpmdW5jdGlvbigpe30sb25UZW1wbGF0ZTpmdW5jdGlvbigpe2NvbnNvbGUubG9nKHRoaXMpfSx0ZXN0aW5nOiExLGNvbnNlbnRLZXk6XCJjb29raWVzQ29uc2VudERhdGVcIn0sZSk7by5pc0dvb2dsZUJvdD0hIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0Nocm9tZS1MaWdodGhvdXNlfFBhZ2UgU3BlZWR8SGVhZGxlc3MvaSk7d2luZG93Lm5hdmlnYXRvci51c2VyTGFuZ3VhZ2V8fHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2U7by5zdG9yYWdlPVwibG9jYWxcIj09PW8uc3RvcmFnZSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN0b3JhZ2U/XCJsb2NhbFwiOlwic2Vzc2lvblwiPT09by5zdG9yYWdlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgU3RvcmFnZT9cInNlc3Npb25cIjpcImNvb2tpZVwiO3ZhciBuPVwibG9jYWxcIj09PW8uc3RvcmFnZT9wYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShvLmNvbnNlbnRLZXkpKTpcInNlc3Npb25cIj09PW8uc3RvcmFnZT9wYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKG8uY29uc2VudEtleSkpOnBhcnNlSW50KGEuY29va2llKG8uY29uc2VudEtleSkpLHQ9dGhpcy5sZW5ndGg/dGhpczphKFwiPGRpdj5cIix7aHRtbDpvLm1lc3NhZ2Usc3R5bGU6XCJiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO2NvbG9yOiMzMzM7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTpub25lO1wiK28uc3R5bGV9KS5hcHBlbmQoYShcIjxidXR0b24+XCIse2h0bWw6by5jb25zZW50TWVzc2FnZSxzdHlsZTpcImJhY2tncm91bmQ6IzA5MDtjb2xvcjp3aGl0ZTtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjAuMmVtO21hcmdpbjowLjVlbTtwYWRkaW5nOjAuMmVtIDAuNWVtIDAuMmVtIDAuNWVtO1wiK28uY29uc2VudFN0eWxlLGNsYXNzOm8uYWNjZXB0Q2xhc3N9KSkucHJlcGVuZFRvKGEoXCJib2R5XCIpKTtyZXR1cm4gby5vbkluaXQuY2FsbCh0KSxvLmlzR29vZ2xlQm90P2EodCkuaGlkZSgpOm8udGVzdGluZ3x8IW58fG4rODY0ZTUqby5jb25zZW50VGltZTwobmV3IERhdGUpLmdldFRpbWUoKT9hKHQpLnNob3coKTphKHQpLmhpZGUoKSx0LmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpO2EodGhpcykucHJlcGVuZFRvKGEoXCJib2R5XCIpKSxhKHRoaXMpLmZpbmQoXCIuXCIrby5hY2NlcHRDbGFzcykuY2xpY2soZnVuY3Rpb24oKXtcImxvY2FsXCI9PT1vLnN0b3JhZ2U/bG9jYWxTdG9yYWdlLnNldEl0ZW0oby5jb25zZW50S2V5LChuZXcgRGF0ZSkuZ2V0VGltZSgpKTpcInNlc3Npb25cIj09PW8uc3RvcmFnZT9zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKG8uY29uc2VudEtleSwobmV3IERhdGUpLmdldFRpbWUoKSk6YS5jb29raWUoby5jb25zZW50S2V5LChuZXcgRGF0ZSkuZ2V0VGltZSgpLHtleHBpcmVzOm5ldyBEYXRlKChuZXcgRGF0ZSkuZ2V0VGltZSgpKzg2NGU1Km8uY29uc2VudFRpbWUpLHBhdGg6XCIvXCJ9KSxlLmhpZGUoKSxvLm9uQ29uc2VudC5jYWxsKGUpfSl9KSx0aGlzfSxhLmNvb2tpZUNvbnNlbnQ9ZnVuY3Rpb24oZSl7YS5mbi5jb29raWVDb25zZW50KGUpfX0oalF1ZXJ5KTtcbiIsImltcG9ydCBcIi4vbW9kdWxlcy9BbmltYXRlXCI7XHJcbmltcG9ydCBcIi4vbW9kdWxlcy9Ub2dnbGVOYXZcIjtcclxuaW1wb3J0IFwiLi9tb2R1bGVzL2N1c3RvbS1zZWxlY3Rib3hcIjtcclxuaW1wb3J0IFwiLi9tb2R1bGVzL2Nvb2tpZXNcIjtcclxuXHJcbnZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLnJlZmVyZW5jZXNfX3NsaWRlclwiLCB7XHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgIGVsOiBcIi5zd2lwZXItcGFnaW5hdGlvblwiLFxyXG4gICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgNTAwOiB7XHJcbiAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgNzY3OiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgOTkxOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNDAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiA2NSxcclxuICAgICB9LFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4kKCcjZmlsZS11cGxvYWQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGkgPSAkKHRoaXMpLnByZXYoJ2xhYmVsJykuY2xvbmUoKTtcclxuICB2YXIgZmlsZSA9ICQoJyNmaWxlLXVwbG9hZCcpWzBdLmZpbGVzWzBdLm5hbWU7XHJcbiAgJCh0aGlzKS5wcmV2KCdsYWJlbCcpLnRleHQoZmlsZSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0JC5jb29raWVDb25zZW50KHtcclxuICAgICAgICBtZXNzYWdlOiBcIlRhdG8gc3Ryw6Fua2EgcG91xb7DrXbDoSBjb29raWVzLiBVxb7DrXbDoW7DrW0gdMOpdG8gc3Ryw6Fua3kgc291aGxhc8OtdGUgcyBuYcWhw61tIHBvdcW+w612w6Fuw61tIHTEm2NodG8gY29va2llcy5cIixcclxuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kOiAjZWFlYWVhOyBwb3NpdGlvbjogZml4ZWQ7IHRvcDogMDsgei1pbmRleDogOTk5OTk5OTsgd2lkdGg6IDEwMCU7XCIsXHJcbiAgICAgICAgY29uc2VudE1lc3NhZ2U6IFwiUm96dW3DrW1cIixcclxuICAgICAgICBjb25zZW50U3R5bGU6IFwiYmFja2dyb3VuZDogIzI2YTM3YTsgYm9yZGVyLXJhZGl1czogNTBweDsgZm9udC1zaXplOiAxNHB4OyBjdXJzb3I6IHBvaW50ZXI7XCJcclxuICAgIH0pO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbIlJBVElPIiwiTE9BRF9SQVRJTyIsIkVMRU1FTlRTIiwiVklTSUJMRV9DTEFTUyIsIkFuaW1hdGUiLCJ2YWx1ZSIsImluY2x1ZGVzIiwicGFyc2VJbnQiLCJDVVNUT01fUkFUSU8iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWN0aW9ucyIsInNlY3Rpb24iLCJkZWxheSIsImdldERlbGF5IiwiZ2V0QXR0cmlidXRlIiwicmF0aW8iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInNldFRpbWVvdXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhZGRFdmVudExpc3RlbmVyIiwic2Nyb2xsSGFuZGxlciIsIlRPR0dMRV9DTEFTUyIsIlRvZ2dsZU5hdiIsImVsZW1lbnRzIiwiZm9yRWFjaCIsImVsIiwidG9nZ2xlTmF2IiwiZSIsImJvZHkiLCJ0b2dnbGUiLCJwcmV2ZW50RGVmYXVsdCIsIiQiLCJmbiIsIlJldlNlbGVjdEJveCIsImVhY2giLCIkdGhpcyIsIm51bWJlck9mT3B0aW9ucyIsImNoaWxkcmVuIiwibGVuZ3RoIiwiYWRkQ2xhc3MiLCJwYXJlbnQiLCJoYXNDbGFzcyIsIndyYXAiLCJjbG9zZXN0IiwiZmluZCIsInJlbW92ZSIsImFmdGVyIiwiJHN0eWxlZFNlbGVjdCIsIm5leHQiLCJ0ZXh0IiwiZXEiLCIkbGlzdCIsImluc2VydEFmdGVyIiwiaSIsInJlbCIsInZhbCIsImFwcGVuZFRvIiwiJGxpc3RJdGVtcyIsImNsaWNrIiwic3RvcFByb3BhZ2F0aW9uIiwibm90IiwicmVtb3ZlQ2xhc3MiLCJoaWRlIiwidG9nZ2xlQ2xhc3MiLCJhdHRyIiwidHJpZ2dlciIsImNoYW5nZSIsImpRdWVyeSIsImEiLCJjb29raWUiLCJvIiwibiIsImFyZ3VtZW50cyIsImV4dGVuZCIsImV4cGlyZXMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyYXciLCJ0b1VUQ1N0cmluZyIsInBhdGgiLCJkb21haW4iLCJzZWN1cmUiLCJqb2luIiwidCIsInMiLCJzcGxpdCIsImRlY29kZVVSSUNvbXBvbmVudCIsImNvb2tpZUNvbnNlbnQiLCJwb3NpdGlvbiIsIm1lc3NhZ2UiLCJzdHlsZSIsImNvbnNlbnRNZXNzYWdlIiwiY29uc2VudFN0eWxlIiwiYWNjZXB0Q2xhc3MiLCJjb25zZW50VGltZSIsInN0b3JhZ2UiLCJvbkluaXQiLCJvbkNvbnNlbnQiLCJvblRlbXBsYXRlIiwiY29uc29sZSIsImxvZyIsInRlc3RpbmciLCJjb25zZW50S2V5IiwiaXNHb29nbGVCb3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsIlN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJodG1sIiwiYXBwZW5kIiwicHJlcGVuZFRvIiwiY2FsbCIsIkRhdGUiLCJnZXRUaW1lIiwic2hvdyIsInNldEl0ZW0iLCJTd2lwZXIiLCJzbGlkZXNQZXJWaWV3Iiwic3BhY2VCZXR3ZWVuIiwicGFnaW5hdGlvbiIsImNsaWNrYWJsZSIsImJyZWFrcG9pbnRzIiwicHJldiIsImNsb25lIiwiZmlsZSIsImZpbGVzIiwibmFtZSIsInJlYWR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUVBLElBQU1BLEtBQUssR0FBRyxNQUFkO0VBQ0EsSUFBTUMsVUFBVSxHQUFHLEdBQW5CO0VBQ0EsSUFBTUMsVUFBUSxHQUFHLFVBQWpCO0VBQ0EsSUFBTUMsYUFBYSxHQUFHLGtCQUF0Qjs7TUFFTUMsVUFDTCxtQkFBYztFQUFBOztFQUFBOztFQUFBLG9DQVFILFVBQUFDLEtBQUssRUFBSTtFQUNuQixRQUFJQSxLQUFLLEtBQUssSUFBZCxFQUFvQjtFQUNuQixhQUFPLENBQVA7RUFDQSxLQUZELE1BRU8sSUFBSUEsS0FBSyxDQUFDQyxRQUFOLENBQWUsR0FBZixDQUFKLEVBQXlCO0VBQy9CLGFBQU9ELEtBQUssR0FBRyxJQUFmO0VBQ0EsS0FGTSxNQUVBO0VBQ04sYUFBT0UsUUFBUSxDQUFDRixLQUFELENBQWY7RUFDQTtFQUNELEdBaEJhOztFQUFBLHlDQWtCRSxVQUFDRyxZQUFELEVBQWtCO0VBQ2pDLFFBQUksQ0FBQ0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQlIsVUFBUSxHQUFHLFFBQVgsR0FBc0JDLGFBQXRCLEdBQXNDLEdBQWhFLENBQUwsRUFBMkU7O0VBRDFDLCtDQUdYLEtBQUksQ0FBQ1EsUUFITTtFQUFBOztFQUFBO0VBQUE7RUFBQSxZQUd0QkMsT0FIc0I7O0VBSWhDLFlBQU1DLEtBQUssR0FBRyxLQUFJLENBQUNDLFFBQUwsQ0FBY0YsT0FBTyxDQUFDRyxZQUFSLENBQXFCLGVBQXJCLENBQWQsQ0FBZDs7RUFDQSxZQUFNQyxLQUFLLEdBQUdKLE9BQU8sQ0FBQ0csWUFBUixDQUFxQixlQUFyQixJQUF3Q0gsT0FBTyxDQUFDRyxZQUFSLENBQXFCLGVBQXJCLENBQXhDLEdBQWdGUCxZQUE5Rjs7RUFFQSxZQUNDSSxPQUFPLENBQUNLLHFCQUFSLEdBQWdDQyxHQUFoQyxJQUF1Q0MsTUFBTSxDQUFDQyxXQUFQLEdBQXFCSixLQUE1RCxJQUNBSixPQUFPLENBQUNLLHFCQUFSLEdBQWdDQyxHQUFoQyxHQUFzQyxDQUZ2QyxFQUdFO0VBQ0RHLFVBQUFBLFVBQVUsQ0FBQyxZQUFNO0VBQ2hCVCxZQUFBQSxPQUFPLENBQUNVLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCcEIsYUFBdEI7RUFDQSxXQUZTLEVBRVBVLEtBRk8sQ0FBVjtFQUdBO0VBZCtCOztFQUdqQywwREFBcUM7RUFBQTtFQVlwQztFQWZnQztFQUFBO0VBQUE7RUFBQTtFQUFBO0VBZ0JqQyxHQWxDYTs7RUFDYixPQUFLRixRQUFMLEdBQWdCRixRQUFRLENBQUNDLGdCQUFULENBQTBCUixVQUExQixDQUFoQjtFQUVFaUIsRUFBQUEsTUFBTSxDQUFDSyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQztFQUFBLFdBQU0sS0FBSSxDQUFDQyxhQUFMLENBQW1CekIsS0FBbkIsQ0FBTjtFQUFBLEdBQWxDLEVBQW1FLEtBQW5FO0VBRUYsT0FBS3lCLGFBQUwsQ0FBbUJ4QixVQUFuQjtFQUNBOztFQStCRixJQUFJRyxPQUFKOztFQ25EQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBRUEsSUFBTUYsUUFBUSxHQUFHLG9CQUFqQjtFQUNBLElBQU13QixZQUFZLEdBQUcsYUFBckI7O01BRU1DO0VBQ0osdUJBQWM7RUFBQTs7RUFBQTs7RUFDWixTQUFLQyxRQUFMLEdBQWdCbkIsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQlIsUUFBMUIsQ0FBaEI7O0VBRUEsUUFBSSxDQUFDLEtBQUswQixRQUFWLEVBQW9CO0VBQ2xCLGFBQU8sS0FBUDtFQUNEOztFQUVELFNBQUtBLFFBQUwsQ0FBY0MsT0FBZCxDQUFzQixVQUFDQyxFQUFELEVBQVE7RUFDNUJBLE1BQUFBLEVBQUUsQ0FBQ04sZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsS0FBSSxDQUFDTyxTQUFsQyxFQUE2QyxLQUE3QztFQUNBRCxNQUFBQSxFQUFFLENBQUNOLGdCQUFILENBQW9CLFlBQXBCLEVBQWtDLEtBQUksQ0FBQ08sU0FBdkMsRUFBa0QsS0FBbEQ7RUFDRCxLQUhEO0VBSUQ7Ozs7YUFFRCxtQkFBVUMsQ0FBVixFQUFhO0VBQ1h2QixNQUFBQSxRQUFRLENBQUN3QixJQUFULENBQWNYLFNBQWQsQ0FBd0JZLE1BQXhCLENBQStCUixZQUEvQjtFQUNBakIsTUFBQUEsUUFBUSxDQUFDd0IsSUFBVCxDQUFjWCxTQUFkLENBQXdCWSxNQUF4QixDQUErQixNQUEvQjtFQUVBRixNQUFBQSxDQUFDLENBQUNHLGNBQUY7RUFDRDs7Ozs7O0VBR0gsSUFBSVIsU0FBSjs7RUMvQkMsV0FBU1MsQ0FBVCxFQUFZO0VBQ1hBLEVBQUFBLENBQUMsQ0FBQ0MsRUFBRixDQUFLQyxZQUFMLEdBQW9CLFlBQVc7RUFFN0IsU0FBS0MsSUFBTCxDQUFVLFlBQVc7RUFDbkIsVUFBSUMsS0FBSyxHQUFHSixDQUFDLENBQUMsSUFBRCxDQUFiO0VBQUEsVUFDRUssZUFBZSxHQUFHTCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFNLFFBQVIsQ0FBaUIsUUFBakIsRUFBMkJDLE1BRC9DO0VBSUFILE1BQUFBLEtBQUssQ0FBQ0ksUUFBTixDQUFlLGVBQWY7O0VBRUEsVUFBSSxDQUFDSixLQUFLLENBQUNLLE1BQU4sR0FBZUMsUUFBZixDQUF3QixZQUF4QixDQUFMLEVBQTRDO0VBQzFDTixRQUFBQSxLQUFLLENBQUNPLElBQU4sQ0FBVyxnQ0FBWDtFQUNEOztFQUNEUCxNQUFBQSxLQUFLLENBQUNRLE9BQU4sQ0FBYyxhQUFkLEVBQTZCQyxJQUE3QixDQUFrQyxnQkFBbEMsRUFBb0RDLE1BQXBEO0VBQ0FWLE1BQUFBLEtBQUssQ0FBQ1EsT0FBTixDQUFjLGFBQWQsRUFBNkJDLElBQTdCLENBQWtDLGlCQUFsQyxFQUFxREMsTUFBckQ7RUFHQVYsTUFBQUEsS0FBSyxDQUFDVyxLQUFOLENBQVksbUNBQVo7RUFFQSxVQUFJQyxhQUFhLEdBQUdaLEtBQUssQ0FBQ2EsSUFBTixDQUFXLG1CQUFYLENBQXBCOztFQUNBLFVBQUliLEtBQUssQ0FBQ1MsSUFBTixDQUFXLGlCQUFYLENBQUosRUFBbUM7RUFDakNHLFFBQUFBLGFBQWEsQ0FBQ0UsSUFBZCxDQUFtQmQsS0FBSyxDQUFDUyxJQUFOLENBQVcsaUJBQVgsRUFBOEJLLElBQTlCLEVBQW5CO0VBQ0QsT0FGRCxNQUdJO0VBQ0ZGLFFBQUFBLGFBQWEsQ0FBQ0UsSUFBZCxDQUFtQmQsS0FBSyxDQUFDRSxRQUFOLENBQWUsUUFBZixFQUF5QmEsRUFBekIsQ0FBNEIsQ0FBNUIsRUFBK0JELElBQS9CLEVBQW5CO0VBQ0Q7O0VBRUQsVUFBSUUsS0FBSyxHQUFHcEIsQ0FBQyxDQUFDLFFBQUQsRUFBVztFQUN0QixpQkFBUztFQURhLE9BQVgsQ0FBRCxDQUVUcUIsV0FGUyxDQUVHTCxhQUZILENBQVo7O0VBSUEsV0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHakIsZUFBcEIsRUFBcUNpQixDQUFDLEVBQXRDLEVBQTBDO0VBQ3hDdEIsUUFBQUEsQ0FBQyxDQUFDLFFBQUQsRUFBVztFQUNWa0IsVUFBQUEsSUFBSSxFQUFFZCxLQUFLLENBQUNFLFFBQU4sQ0FBZSxRQUFmLEVBQXlCYSxFQUF6QixDQUE0QkcsQ0FBNUIsRUFBK0JKLElBQS9CLEVBREk7RUFFVkssVUFBQUEsR0FBRyxFQUFFbkIsS0FBSyxDQUFDRSxRQUFOLENBQWUsUUFBZixFQUF5QmEsRUFBekIsQ0FBNEJHLENBQTVCLEVBQStCRSxHQUEvQjtFQUZLLFNBQVgsQ0FBRCxDQUdHQyxRQUhILENBR1lMLEtBSFo7RUFJRDs7RUFFRCxVQUFJTSxVQUFVLEdBQUdOLEtBQUssQ0FBQ2QsUUFBTixDQUFlLElBQWYsQ0FBakI7RUFFQVUsTUFBQUEsYUFBYSxDQUFDVyxLQUFkLENBQW9CLFVBQVMvQixDQUFULEVBQVk7RUFDOUJBLFFBQUFBLENBQUMsQ0FBQ2dDLGVBQUY7RUFDQTVCLFFBQUFBLENBQUMsQ0FBQywwQkFBRCxDQUFELENBQThCNkIsR0FBOUIsQ0FBa0MsSUFBbEMsRUFBd0MxQixJQUF4QyxDQUE2QyxZQUFXO0VBQ3RESCxVQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVE4QixXQUFSLENBQW9CLFFBQXBCLEVBQThCYixJQUE5QixDQUFtQyxtQkFBbkMsRUFBd0RjLElBQXhEO0VBQ0QsU0FGRDtFQUdBL0IsUUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRZ0MsV0FBUixDQUFvQixRQUFwQixFQUE4QmYsSUFBOUIsQ0FBbUMsbUJBQW5DLEVBQXdEbkIsTUFBeEQ7RUFDRCxPQU5EO0VBUUE0QixNQUFBQSxVQUFVLENBQUNDLEtBQVgsQ0FBaUIsVUFBUy9CLENBQVQsRUFBWTtFQUMzQkEsUUFBQUEsQ0FBQyxDQUFDZ0MsZUFBRjtFQUNBWixRQUFBQSxhQUFhLENBQUNFLElBQWQsQ0FBbUJsQixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFrQixJQUFSLEVBQW5CLEVBQW1DWSxXQUFuQyxDQUErQyxRQUEvQztFQUNBMUIsUUFBQUEsS0FBSyxDQUFDb0IsR0FBTixDQUFVeEIsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRaUMsSUFBUixDQUFhLEtBQWIsQ0FBVixFQUErQkMsT0FBL0IsQ0FBdUMsUUFBdkM7RUFDQWQsUUFBQUEsS0FBSyxDQUFDVyxJQUFOLEdBSjJCO0VBTTVCLE9BTkQ7RUFRQTNCLE1BQUFBLEtBQUssQ0FBQytCLE1BQU4sQ0FBYSxVQUFTdkMsQ0FBVCxFQUFZO0VBQ3ZCO0VBQ0FvQixRQUFBQSxhQUFhLENBQUNFLElBQWQsQ0FBb0JkLEtBQUssQ0FBQ1MsSUFBTixDQUFXLGlCQUFYLEVBQThCSyxJQUE5QixFQUFwQjtFQUNELE9BSEQ7RUFLQWxCLE1BQUFBLENBQUMsQ0FBQzNCLFFBQUQsQ0FBRCxDQUFZc0QsS0FBWixDQUFrQixZQUFXO0VBQzNCWCxRQUFBQSxhQUFhLENBQUNjLFdBQWQsQ0FBMEIsUUFBMUI7RUFDQVYsUUFBQUEsS0FBSyxDQUFDVyxJQUFOO0VBQ0QsT0FIRDtFQUtELEtBL0REO0VBaUVELEdBbkVEO0VBcUVELENBdEVBLEVBc0VDSyxNQXRFRCxDQUFEOztFQXdFQUEsTUFBTSxDQUFDLGlCQUFELENBQU4sQ0FBMEJsQyxZQUExQjtFQUNBa0MsTUFBTSxDQUFFLFFBQUYsQ0FBTixDQUFtQmxDLFlBQW5COztFQ3pFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUVBLENBQUMsVUFBU21DLENBQVQsRUFBVztFQUFDQSxFQUFBQSxDQUFDLENBQUNDLE1BQUYsR0FBUyxVQUFTMUMsQ0FBVCxFQUFXMkMsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7RUFBQyxRQUFHLElBQUVDLFNBQVMsQ0FBQ2xDLE1BQWYsRUFBc0IsT0FBT2lDLENBQUMsR0FBQ0gsQ0FBQyxDQUFDSyxNQUFGLENBQVMsRUFBVCxFQUFZRixDQUFaLENBQUYsRUFBaUIsUUFBTUQsQ0FBTixLQUFVQyxDQUFDLENBQUNHLE9BQUYsR0FBVSxDQUFDLENBQXJCLENBQWpCLEVBQXlDdEUsUUFBUSxDQUFDaUUsTUFBVCxHQUFnQixDQUFDTSxrQkFBa0IsQ0FBQ2hELENBQUQsQ0FBbkIsRUFBdUIsR0FBdkIsRUFBMkI0QyxDQUFDLENBQUNLLEdBQUYsR0FBTU4sQ0FBTixHQUFRSyxrQkFBa0IsQ0FBQ0wsQ0FBRCxDQUFyRCxFQUF5REMsQ0FBQyxDQUFDRyxPQUFGLEdBQVUsZUFBYUgsQ0FBQyxDQUFDRyxPQUFGLENBQVVHLFdBQVYsRUFBdkIsR0FBK0MsRUFBeEcsRUFBMkdOLENBQUMsQ0FBQ08sSUFBRixHQUFPLFlBQVVQLENBQUMsQ0FBQ08sSUFBbkIsR0FBd0IsRUFBbkksRUFBc0lQLENBQUMsQ0FBQ1EsTUFBRixHQUFTLGNBQVlSLENBQUMsQ0FBQ1EsTUFBdkIsR0FBOEIsRUFBcEssRUFBdUtSLENBQUMsQ0FBQ1MsTUFBRixHQUFTLFVBQVQsR0FBb0IsRUFBM0wsRUFBK0xDLElBQS9MLENBQW9NLEVBQXBNLENBQWhFOztFQUF3USxTQUFJLElBQUlDLENBQUosRUFBTUMsQ0FBQyxHQUFDL0UsUUFBUSxDQUFDaUUsTUFBVCxDQUFnQmUsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBUixFQUFvQy9CLENBQUMsR0FBQyxDQUExQyxFQUE0QzZCLENBQUMsR0FBQ0MsQ0FBQyxDQUFDOUIsQ0FBRCxDQUFELElBQU04QixDQUFDLENBQUM5QixDQUFELENBQUQsQ0FBSytCLEtBQUwsQ0FBVyxHQUFYLENBQXBELEVBQW9FL0IsQ0FBQyxFQUFyRTtFQUF3RSxVQUFHZ0Msa0JBQWtCLENBQUNILENBQUMsQ0FBQyxDQUFELENBQUYsQ0FBbEIsS0FBMkJ2RCxDQUE5QixFQUFnQyxPQUFPMEQsa0JBQWtCLENBQUNILENBQUMsQ0FBQyxDQUFELENBQUQsSUFBTSxFQUFQLENBQXpCO0VBQXhHOztFQUE0SSxXQUFPLElBQVA7RUFBWSxHQUEvYyxFQUFnZGQsQ0FBQyxDQUFDcEMsRUFBRixDQUFLc0QsYUFBTCxHQUFtQixVQUFTM0QsQ0FBVCxFQUFXO0VBQUMsUUFBSTJDLENBQUMsR0FBQ0YsQ0FBQyxDQUFDSyxNQUFGLENBQVM7RUFBQ2MsTUFBQUEsUUFBUSxFQUFDLFFBQVY7RUFBbUJDLE1BQUFBLE9BQU8sRUFBQywyRkFBM0I7RUFBdUhDLE1BQUFBLEtBQUssRUFBQyxFQUE3SDtFQUFnSUMsTUFBQUEsY0FBYyxFQUFDLGNBQS9JO0VBQThKQyxNQUFBQSxZQUFZLEVBQUMsRUFBM0s7RUFBOEtDLE1BQUFBLFdBQVcsRUFBQyxjQUExTDtFQUF5TUMsTUFBQUEsV0FBVyxFQUFDLElBQXJOO0VBQTBOQyxNQUFBQSxPQUFPLEVBQUMsUUFBbE87RUFBMk9DLE1BQUFBLE1BQU0sRUFBQyxrQkFBVSxFQUE1UDtFQUErUEMsTUFBQUEsU0FBUyxFQUFDLHFCQUFVLEVBQW5SO0VBQXNSQyxNQUFBQSxVQUFVLEVBQUMsc0JBQVU7RUFBQ0MsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWjtFQUFrQixPQUE5VDtFQUErVEMsTUFBQUEsT0FBTyxFQUFDLENBQUMsQ0FBeFU7RUFBMFVDLE1BQUFBLFVBQVUsRUFBQztFQUFyVixLQUFULEVBQW9YMUUsQ0FBcFgsQ0FBTjtFQUE2WDJDLElBQUFBLENBQUMsQ0FBQ2dDLFdBQUYsR0FBYyxDQUFDLENBQUNDLFNBQVMsQ0FBQ0MsU0FBVixDQUFvQkMsS0FBcEIsQ0FBMEIsd0NBQTFCLENBQWhCO0VBQTZJbkMsSUFBQUEsQ0FBQyxDQUFDd0IsT0FBRixHQUFVLFlBQVV4QixDQUFDLENBQUN3QixPQUFaLElBQXFCLGVBQWEsT0FBT1ksT0FBekMsR0FBaUQsT0FBakQsR0FBeUQsY0FBWXBDLENBQUMsQ0FBQ3dCLE9BQWQsSUFBdUIsZUFBYSxPQUFPWSxPQUEzQyxHQUFtRCxTQUFuRCxHQUE2RCxRQUFoSTtFQUF5SSxRQUFJbkMsQ0FBQyxHQUFDLFlBQVVELENBQUMsQ0FBQ3dCLE9BQVosR0FBb0I1RixRQUFRLENBQUN5RyxZQUFZLENBQUNDLE9BQWIsQ0FBcUJ0QyxDQUFDLENBQUMrQixVQUF2QixDQUFELENBQTVCLEdBQWlFLGNBQVkvQixDQUFDLENBQUN3QixPQUFkLEdBQXNCNUYsUUFBUSxDQUFDMkcsY0FBYyxDQUFDRCxPQUFmLENBQXVCdEMsQ0FBQyxDQUFDK0IsVUFBekIsQ0FBRCxDQUE5QixHQUFxRW5HLFFBQVEsQ0FBQ2tFLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxDQUFDLENBQUMrQixVQUFYLENBQUQsQ0FBcEo7RUFBQSxRQUE2S25CLENBQUMsR0FBQyxLQUFLNUMsTUFBTCxHQUFZLElBQVosR0FBaUI4QixDQUFDLENBQUMsT0FBRCxFQUFTO0VBQUMwQyxNQUFBQSxJQUFJLEVBQUN4QyxDQUFDLENBQUNrQixPQUFSO0VBQWdCQyxNQUFBQSxLQUFLLEVBQUMsc0VBQW9FbkIsQ0FBQyxDQUFDbUI7RUFBNUYsS0FBVCxDQUFELENBQThHc0IsTUFBOUcsQ0FBcUgzQyxDQUFDLENBQUMsVUFBRCxFQUFZO0VBQUMwQyxNQUFBQSxJQUFJLEVBQUN4QyxDQUFDLENBQUNvQixjQUFSO0VBQXVCRCxNQUFBQSxLQUFLLEVBQUMsOEdBQTRHbkIsQ0FBQyxDQUFDcUIsWUFBM0k7RUFBd0osZUFBTXJCLENBQUMsQ0FBQ3NCO0VBQWhLLEtBQVosQ0FBdEgsRUFBaVRvQixTQUFqVCxDQUEyVDVDLENBQUMsQ0FBQyxNQUFELENBQTVULENBQWhNO0VBQXNnQixXQUFPRSxDQUFDLENBQUN5QixNQUFGLENBQVNrQixJQUFULENBQWMvQixDQUFkLEdBQWlCWixDQUFDLENBQUNnQyxXQUFGLEdBQWNsQyxDQUFDLENBQUNjLENBQUQsQ0FBRCxDQUFLcEIsSUFBTCxFQUFkLEdBQTBCUSxDQUFDLENBQUM4QixPQUFGLElBQVcsQ0FBQzdCLENBQVosSUFBZUEsQ0FBQyxHQUFDLFFBQU1ELENBQUMsQ0FBQ3VCLFdBQVYsR0FBdUIsSUFBSXFCLElBQUosRUFBRCxDQUFXQyxPQUFYLEVBQXJDLEdBQTBEL0MsQ0FBQyxDQUFDYyxDQUFELENBQUQsQ0FBS2tDLElBQUwsRUFBMUQsR0FBc0VoRCxDQUFDLENBQUNjLENBQUQsQ0FBRCxDQUFLcEIsSUFBTCxFQUFqSCxFQUE2SG9CLENBQUMsQ0FBQ2hELElBQUYsQ0FBTyxZQUFVO0VBQUMsVUFBSVAsQ0FBQyxHQUFDeUMsQ0FBQyxDQUFDLElBQUQsQ0FBUDtFQUFjQSxNQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVE0QyxTQUFSLENBQWtCNUMsQ0FBQyxDQUFDLE1BQUQsQ0FBbkIsR0FBNkJBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXhCLElBQVIsQ0FBYSxNQUFJMEIsQ0FBQyxDQUFDc0IsV0FBbkIsRUFBZ0NsQyxLQUFoQyxDQUFzQyxZQUFVO0VBQUMsb0JBQVVZLENBQUMsQ0FBQ3dCLE9BQVosR0FBb0JhLFlBQVksQ0FBQ1UsT0FBYixDQUFxQi9DLENBQUMsQ0FBQytCLFVBQXZCLEVBQW1DLElBQUlhLElBQUosRUFBRCxDQUFXQyxPQUFYLEVBQWxDLENBQXBCLEdBQTRFLGNBQVk3QyxDQUFDLENBQUN3QixPQUFkLEdBQXNCZSxjQUFjLENBQUNRLE9BQWYsQ0FBdUIvQyxDQUFDLENBQUMrQixVQUF6QixFQUFxQyxJQUFJYSxJQUFKLEVBQUQsQ0FBV0MsT0FBWCxFQUFwQyxDQUF0QixHQUFnRi9DLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxDQUFDLENBQUMrQixVQUFYLEVBQXVCLElBQUlhLElBQUosRUFBRCxDQUFXQyxPQUFYLEVBQXRCLEVBQTJDO0VBQUN6QyxVQUFBQSxPQUFPLEVBQUMsSUFBSXdDLElBQUosQ0FBVSxJQUFJQSxJQUFKLEVBQUQsQ0FBV0MsT0FBWCxLQUFxQixRQUFNN0MsQ0FBQyxDQUFDdUIsV0FBdEMsQ0FBVDtFQUE0RGYsVUFBQUEsSUFBSSxFQUFDO0VBQWpFLFNBQTNDLENBQTVKLEVBQThRbkQsQ0FBQyxDQUFDbUMsSUFBRixFQUE5USxFQUF1UlEsQ0FBQyxDQUFDMEIsU0FBRixDQUFZaUIsSUFBWixDQUFpQnRGLENBQWpCLENBQXZSO0VBQTJTLE9BQTVWLENBQTdCO0VBQTJYLEtBQTNaLENBQTdILEVBQTBoQixJQUFqaUI7RUFBc2lCLEdBQTlxRSxFQUErcUV5QyxDQUFDLENBQUNrQixhQUFGLEdBQWdCLFVBQVMzRCxDQUFULEVBQVc7RUFBQ3lDLElBQUFBLENBQUMsQ0FBQ3BDLEVBQUYsQ0FBS3NELGFBQUwsQ0FBbUIzRCxDQUFuQjtFQUFzQixHQUFqdUU7RUFBa3VFLENBQTl1RSxDQUErdUV3QyxNQUEvdUUsQ0FBRDs7RUNIYSxJQUFJbUQsTUFBSixDQUFXLHFCQUFYLEVBQWtDO0VBQ3ZDQyxFQUFBQSxhQUFhLEVBQUUsQ0FEd0I7RUFFdkNDLEVBQUFBLFlBQVksRUFBRSxFQUZ5QjtFQUd2Q0MsRUFBQUEsVUFBVSxFQUFFO0VBQ1ZoRyxJQUFBQSxFQUFFLEVBQUUsb0JBRE07RUFFVmlHLElBQUFBLFNBQVMsRUFBRTtFQUZELEdBSDJCO0VBT3ZDQyxFQUFBQSxXQUFXLEVBQUU7RUFDVCxTQUFLO0VBQ0hKLE1BQUFBLGFBQWEsRUFBRSxDQURaO0VBRUhDLE1BQUFBLFlBQVksRUFBRTtFQUZYLEtBREk7RUFLWCxTQUFLO0VBQ0hELE1BQUFBLGFBQWEsRUFBRSxDQURaO0VBRUhDLE1BQUFBLFlBQVksRUFBRTtFQUZYLEtBTE07RUFTWCxTQUFLO0VBQ0hELE1BQUFBLGFBQWEsRUFBRSxDQURaO0VBRUhDLE1BQUFBLFlBQVksRUFBRTtFQUZYLEtBVE07RUFhWCxVQUFNO0VBQ1JELE1BQUFBLGFBQWEsRUFBRSxDQURQO0VBRVJDLE1BQUFBLFlBQVksRUFBRTtFQUZOO0VBYks7RUFQMEIsQ0FBbEM7RUEyQmJ6RixDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCbUMsTUFBbEIsQ0FBeUIsWUFBVztFQUNsQyxFQUFRbkMsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRNkYsSUFBUixDQUFhLE9BQWIsRUFBc0JDLEtBQXRCO0VBQ1IsTUFBSUMsSUFBSSxHQUFHL0YsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixDQUFsQixFQUFxQmdHLEtBQXJCLENBQTJCLENBQTNCLEVBQThCQyxJQUF6QztFQUNBakcsRUFBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRNkYsSUFBUixDQUFhLE9BQWIsRUFBc0IzRSxJQUF0QixDQUEyQjZFLElBQTNCO0VBQ0QsQ0FKRDtFQU1BL0YsQ0FBQyxDQUFDM0IsUUFBRCxDQUFELENBQVk2SCxLQUFaLENBQWtCLFlBQVc7RUFDNUJsRyxFQUFBQSxDQUFDLENBQUN1RCxhQUFGLENBQWdCO0VBQ1RFLElBQUFBLE9BQU8sRUFBRSxtR0FEQTtFQUVUQyxJQUFBQSxLQUFLLEVBQUUsOEVBRkU7RUFHVEMsSUFBQUEsY0FBYyxFQUFFLFNBSFA7RUFJVEMsSUFBQUEsWUFBWSxFQUFFO0VBSkwsR0FBaEI7RUFNQSxDQVBEOzs7Ozs7In0=
