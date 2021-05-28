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
      message: "Tato stránka používá cookies. Užíváním této stránky souhlasíte s naším používáním těchto cookies.",
      style: "background: #eaeaea;",
      consentMessage: "Rozumím",
      consentStyle: "background: #26a37a; border-radius: 50px; font-size: 14px; cursor: pointer;"
    });
  });

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9BbmltYXRlLmpzIiwic3JjL3NjcmlwdHMvbW9kdWxlcy9Ub2dnbGVOYXYuanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL2N1c3RvbS1zZWxlY3Rib3guanMiLCJzcmMvc2NyaXB0cy9tb2R1bGVzL2Nvb2tpZXMuanMiLCJzcmMvc2NyaXB0cy9zY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBbmltYXRlXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIC0gYWRkIGNsYXNzIHRvIGVsZW1lbnQgaW4gdmlld3BvcnRcclxuICogLSBzdXBwb3J0IGN1c3RvbSBhbmltYXRpb24gZGVsYXkgdmlhIFthbmltYXRlLWRlbGF5XSBodG1sIGF0dHJpYnV0ZVxyXG4gKiAtIHN1cHBvcnQgY3VzdG9tIHZpc2libGUgcmF0aW8gdmlhIFthbmltYXRlLXJhdGlvXSBodG1sIGF0dHJpYnV0ZVxyXG4gKi9cclxuXHJcbmNvbnN0IFJBVElPID0gJzAuNzUnXHJcbmNvbnN0IExPQURfUkFUSU8gPSAnMSdcclxuY29uc3QgRUxFTUVOVFMgPSAnLmFuaW1hdGUnXHJcbmNvbnN0IFZJU0lCTEVfQ0xBU1MgPSAnYW5pbWF0ZS0tdmlzaWJsZSdcclxuXHJcbmNsYXNzIEFuaW1hdGUge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5zZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMpXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHRoaXMuc2Nyb2xsSGFuZGxlcihSQVRJTyksIGZhbHNlKVxyXG5cclxuXHRcdHRoaXMuc2Nyb2xsSGFuZGxlcihMT0FEX1JBVElPKVxyXG5cdH1cclxuXHJcblx0Z2V0RGVsYXkgPSB2YWx1ZSA9PiB7XHJcblx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIDBcclxuXHRcdH0gZWxzZSBpZiAodmFsdWUuaW5jbHVkZXMoJy4nKSkge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUgKiAxMDAwXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodmFsdWUpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzY3JvbGxIYW5kbGVyID0gKENVU1RPTV9SQVRJTykgPT4ge1xyXG5cdFx0aWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKEVMRU1FTlRTICsgJzpub3QoLicgKyBWSVNJQkxFX0NMQVNTICsgJyknKSkgcmV0dXJuXHJcblxyXG5cdFx0Zm9yIChjb25zdCBzZWN0aW9uIG9mIHRoaXMuc2VjdGlvbnMpIHtcclxuXHRcdFx0Y29uc3QgZGVsYXkgPSB0aGlzLmdldERlbGF5KHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLWRlbGF5JykpXHJcblx0XHRcdGNvbnN0IHJhdGlvID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2FuaW1hdGUtcmF0aW8nKSA/IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLXJhdGlvJykgOiBDVVNUT01fUkFUSU9cclxuXHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRzZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8PSB3aW5kb3cuaW5uZXJIZWlnaHQgKiByYXRpbyAmJlxyXG5cdFx0XHRcdHNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gMFxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdHNlY3Rpb24uY2xhc3NMaXN0LmFkZChWSVNJQkxFX0NMQVNTKVxyXG5cdFx0XHRcdH0sIGRlbGF5KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5uZXcgQW5pbWF0ZSgpXHJcblxyXG4iLCIvKipcclxuICogVG9nZ2xlIE5hdlxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIHRvZ2dsZSBjbGFzcyBvbiBib2R5XHJcbiAqL1xyXG5cclxuY29uc3QgRUxFTUVOVFMgPSAnLnRvZ2dsZW5hdl9fYnV0dG9uJ1xyXG5jb25zdCBUT0dHTEVfQ0xBU1MgPSAnbmF2LWlzLW9wZW4nXHJcblxyXG5jbGFzcyBUb2dnbGVOYXYge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRUxFTUVOVFMpXHJcblxyXG4gICAgaWYgKCF0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU5hdiwgZmFsc2UpXHJcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvZ2dsZU5hdiwgZmFsc2UpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlTmF2KGUpIHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZShUT0dHTEVfQ0xBU1MpXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2xvY2snKVxyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gIH1cclxufVxyXG5cclxubmV3IFRvZ2dsZU5hdigpXHJcbiIsIihmdW5jdGlvbigkKSB7XG4gICQuZm4uUmV2U2VsZWN0Qm94ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGg7XG5cblxuICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdC1oaWRkZW4nKTtcblxuICAgICAgaWYoICEkdGhpcy5wYXJlbnQoKS5oYXNDbGFzcygncmV2LXNlbGVjdCcpICl7XG4gICAgICAgICR0aGlzLndyYXAoJzxkaXYgY2xhc3M9XCJyZXYtc2VsZWN0XCI+PC9kaXY+Jyk7XG4gICAgICB9XG4gICAgICAkdGhpcy5jbG9zZXN0KCcucmV2LXNlbGVjdCcpLmZpbmQoJy5zZWxlY3Qtc3R5bGVkJykucmVtb3ZlKCk7XG4gICAgICAkdGhpcy5jbG9zZXN0KCcucmV2LXNlbGVjdCcpLmZpbmQoJy5zZWxlY3Qtb3B0aW9ucycpLnJlbW92ZSgpO1xuXG5cbiAgICAgICR0aGlzLmFmdGVyKCc8ZGl2IGNsYXNzPVwic2VsZWN0LXN0eWxlZFwiPjwvZGl2PicpO1xuXG4gICAgICB2YXIgJHN0eWxlZFNlbGVjdCA9ICR0aGlzLm5leHQoJ2Rpdi5zZWxlY3Qtc3R5bGVkJyk7XG4gICAgICBpZiggJHRoaXMuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykgKXtcbiAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKSk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKDApLnRleHQoKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NlbGVjdC1vcHRpb25zJ1xuICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJHN0eWxlZFNlbGVjdCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZPcHRpb25zOyBpKyspIHtcbiAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgIHRleHQ6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS50ZXh0KCksXG4gICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgfSkuYXBwZW5kVG8oJGxpc3QpO1xuICAgICAgfVxuXG4gICAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuXG4gICAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJCgnZGl2LnNlbGVjdC1zdHlsZWQuYWN0aXZlJykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJykubmV4dCgndWwuc2VsZWN0LW9wdGlvbnMnKS5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCd1bC5zZWxlY3Qtb3B0aW9ucycpLnRvZ2dsZSgpO1xuICAgICAgfSk7XG5cbiAgICAgICRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMudmFsKCkpO1xuICAgICAgfSk7XG5cbiAgICAgICR0aGlzLmNoYW5nZShmdW5jdGlvbihlKSB7XG4gICAgICAgIC8vIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCggJHRoaXMuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpICk7XG4gICAgICB9KTtcblxuICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkbGlzdC5oaWRlKCk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH07XG5cbn0oalF1ZXJ5KSk7XG5cbmpRdWVyeShcIi5yZXYtc2VsZWN0LWJveFwiKS5SZXZTZWxlY3RCb3goKTtcbmpRdWVyeSggXCJzZWxlY3RcIiApLlJldlNlbGVjdEJveCgpO1xuIiwiLyohXG4gKiBqUXVlcnkgQ29va2llIGNvbnNlbnQgcGx1Z2luIHYxLjAuMTZcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9teXNwYWNlLW51XG4gKlxuICogQ29weXJpZ2h0IDIwMTcgSm9oYW4gSm9oYW5zc29uXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuXG4hZnVuY3Rpb24oYSl7YS5jb29raWU9ZnVuY3Rpb24oZSxvLG4pe2lmKDE8YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gbj1hLmV4dGVuZCh7fSxuKSxudWxsPT1vJiYobi5leHBpcmVzPS0xKSxkb2N1bWVudC5jb29raWU9W2VuY29kZVVSSUNvbXBvbmVudChlKSxcIj1cIixuLnJhdz9vOmVuY29kZVVSSUNvbXBvbmVudChvKSxuLmV4cGlyZXM/XCI7IGV4cGlyZXM9XCIrbi5leHBpcmVzLnRvVVRDU3RyaW5nKCk6XCJcIixuLnBhdGg/XCI7IHBhdGg9XCIrbi5wYXRoOlwiXCIsbi5kb21haW4/XCI7IGRvbWFpbj1cIituLmRvbWFpbjpcIlwiLG4uc2VjdXJlP1wiOyBzZWN1cmVcIjpcIlwiXS5qb2luKFwiXCIpO2Zvcih2YXIgdCxzPWRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjsgXCIpLGk9MDt0PXNbaV0mJnNbaV0uc3BsaXQoXCI9XCIpO2krKylpZihkZWNvZGVVUklDb21wb25lbnQodFswXSk9PT1lKXJldHVybiBkZWNvZGVVUklDb21wb25lbnQodFsxXXx8XCJcIik7cmV0dXJuIG51bGx9LGEuZm4uY29va2llQ29uc2VudD1mdW5jdGlvbihlKXt2YXIgbz1hLmV4dGVuZCh7cG9zaXRpb246XCJzdGF0aWNcIixtZXNzYWdlOlwiVGhpcyB3ZWJzaXRlIHVzZXMgY29va2llcy4gQnkgdXNpbmcgdGhpcyB3ZWJzaXRlIHlvdSBjb25zZW50IHRvIG91ciB1c2Ugb2YgdGhlc2UgY29va2llcy5cIixzdHlsZTpcIlwiLGNvbnNlbnRNZXNzYWdlOlwiSSB1bmRlcnN0YW5kXCIsY29uc2VudFN0eWxlOlwiXCIsYWNjZXB0Q2xhc3M6XCJjb29raWVBY2NlcHRcIixjb25zZW50VGltZTozNjUwLHN0b3JhZ2U6XCJjb29raWVcIixvbkluaXQ6ZnVuY3Rpb24oKXt9LG9uQ29uc2VudDpmdW5jdGlvbigpe30sb25UZW1wbGF0ZTpmdW5jdGlvbigpe2NvbnNvbGUubG9nKHRoaXMpfSx0ZXN0aW5nOiExLGNvbnNlbnRLZXk6XCJjb29raWVzQ29uc2VudERhdGVcIn0sZSk7by5pc0dvb2dsZUJvdD0hIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0Nocm9tZS1MaWdodGhvdXNlfFBhZ2UgU3BlZWR8SGVhZGxlc3MvaSk7d2luZG93Lm5hdmlnYXRvci51c2VyTGFuZ3VhZ2V8fHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2U7by5zdG9yYWdlPVwibG9jYWxcIj09PW8uc3RvcmFnZSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN0b3JhZ2U/XCJsb2NhbFwiOlwic2Vzc2lvblwiPT09by5zdG9yYWdlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgU3RvcmFnZT9cInNlc3Npb25cIjpcImNvb2tpZVwiO3ZhciBuPVwibG9jYWxcIj09PW8uc3RvcmFnZT9wYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShvLmNvbnNlbnRLZXkpKTpcInNlc3Npb25cIj09PW8uc3RvcmFnZT9wYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKG8uY29uc2VudEtleSkpOnBhcnNlSW50KGEuY29va2llKG8uY29uc2VudEtleSkpLHQ9dGhpcy5sZW5ndGg/dGhpczphKFwiPGRpdj5cIix7aHRtbDpvLm1lc3NhZ2Usc3R5bGU6XCJiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO2NvbG9yOiMzMzM7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTpub25lO1wiK28uc3R5bGV9KS5hcHBlbmQoYShcIjxidXR0b24+XCIse2h0bWw6by5jb25zZW50TWVzc2FnZSxzdHlsZTpcImJhY2tncm91bmQ6IzA5MDtjb2xvcjp3aGl0ZTtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjAuMmVtO21hcmdpbjowLjVlbTtwYWRkaW5nOjAuMmVtIDAuNWVtIDAuMmVtIDAuNWVtO1wiK28uY29uc2VudFN0eWxlLGNsYXNzOm8uYWNjZXB0Q2xhc3N9KSkucHJlcGVuZFRvKGEoXCJib2R5XCIpKTtyZXR1cm4gby5vbkluaXQuY2FsbCh0KSxvLmlzR29vZ2xlQm90P2EodCkuaGlkZSgpOm8udGVzdGluZ3x8IW58fG4rODY0ZTUqby5jb25zZW50VGltZTwobmV3IERhdGUpLmdldFRpbWUoKT9hKHQpLnNob3coKTphKHQpLmhpZGUoKSx0LmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpO2EodGhpcykucHJlcGVuZFRvKGEoXCJib2R5XCIpKSxhKHRoaXMpLmZpbmQoXCIuXCIrby5hY2NlcHRDbGFzcykuY2xpY2soZnVuY3Rpb24oKXtcImxvY2FsXCI9PT1vLnN0b3JhZ2U/bG9jYWxTdG9yYWdlLnNldEl0ZW0oby5jb25zZW50S2V5LChuZXcgRGF0ZSkuZ2V0VGltZSgpKTpcInNlc3Npb25cIj09PW8uc3RvcmFnZT9zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKG8uY29uc2VudEtleSwobmV3IERhdGUpLmdldFRpbWUoKSk6YS5jb29raWUoby5jb25zZW50S2V5LChuZXcgRGF0ZSkuZ2V0VGltZSgpLHtleHBpcmVzOm5ldyBEYXRlKChuZXcgRGF0ZSkuZ2V0VGltZSgpKzg2NGU1Km8uY29uc2VudFRpbWUpLHBhdGg6XCIvXCJ9KSxlLmhpZGUoKSxvLm9uQ29uc2VudC5jYWxsKGUpfSl9KSx0aGlzfSxhLmNvb2tpZUNvbnNlbnQ9ZnVuY3Rpb24oZSl7YS5mbi5jb29raWVDb25zZW50KGUpfX0oalF1ZXJ5KTtcbiIsImltcG9ydCBcIi4vbW9kdWxlcy9BbmltYXRlXCI7XHJcbmltcG9ydCBcIi4vbW9kdWxlcy9Ub2dnbGVOYXZcIjtcclxuaW1wb3J0IFwiLi9tb2R1bGVzL2N1c3RvbS1zZWxlY3Rib3hcIjtcclxuaW1wb3J0IFwiLi9tb2R1bGVzL2Nvb2tpZXNcIjtcclxuXHJcbnZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLnJlZmVyZW5jZXNfX3NsaWRlclwiLCB7XHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgIGVsOiBcIi5zd2lwZXItcGFnaW5hdGlvblwiLFxyXG4gICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgNTAwOiB7XHJcbiAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgNzY3OiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgOTkxOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNDAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiA2NSxcclxuICAgICB9LFxyXG4gICAgfSxcclxufSk7XHJcblxyXG4kKCcjZmlsZS11cGxvYWQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGkgPSAkKHRoaXMpLnByZXYoJ2xhYmVsJykuY2xvbmUoKTtcclxuICB2YXIgZmlsZSA9ICQoJyNmaWxlLXVwbG9hZCcpWzBdLmZpbGVzWzBdLm5hbWU7XHJcbiAgJCh0aGlzKS5wcmV2KCdsYWJlbCcpLnRleHQoZmlsZSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0JC5jb29raWVDb25zZW50KHtcclxuICAgICAgICBtZXNzYWdlOiBcIlRhdG8gc3Ryw6Fua2EgcG91xb7DrXbDoSBjb29raWVzLiBVxb7DrXbDoW7DrW0gdMOpdG8gc3Ryw6Fua3kgc291aGxhc8OtdGUgcyBuYcWhw61tIHBvdcW+w612w6Fuw61tIHTEm2NodG8gY29va2llcy5cIixcclxuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kOiAjZWFlYWVhO1wiLFxyXG4gICAgICAgIGNvbnNlbnRNZXNzYWdlOiBcIlJvenVtw61tXCIsXHJcbiAgICAgICAgY29uc2VudFN0eWxlOiBcImJhY2tncm91bmQ6ICMyNmEzN2E7IGJvcmRlci1yYWRpdXM6IDUwcHg7IGZvbnQtc2l6ZTogMTRweDsgY3Vyc29yOiBwb2ludGVyO1wiXHJcbiAgICB9KTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJSQVRJTyIsIkxPQURfUkFUSU8iLCJFTEVNRU5UUyIsIlZJU0lCTEVfQ0xBU1MiLCJBbmltYXRlIiwidmFsdWUiLCJpbmNsdWRlcyIsInBhcnNlSW50IiwiQ1VTVE9NX1JBVElPIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2VjdGlvbnMiLCJzZWN0aW9uIiwiZGVsYXkiLCJnZXREZWxheSIsImdldEF0dHJpYnV0ZSIsInJhdGlvIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJzZXRUaW1lb3V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNjcm9sbEhhbmRsZXIiLCJUT0dHTEVfQ0xBU1MiLCJUb2dnbGVOYXYiLCJlbGVtZW50cyIsImZvckVhY2giLCJlbCIsInRvZ2dsZU5hdiIsImUiLCJib2R5IiwidG9nZ2xlIiwicHJldmVudERlZmF1bHQiLCIkIiwiZm4iLCJSZXZTZWxlY3RCb3giLCJlYWNoIiwiJHRoaXMiLCJudW1iZXJPZk9wdGlvbnMiLCJjaGlsZHJlbiIsImxlbmd0aCIsImFkZENsYXNzIiwicGFyZW50IiwiaGFzQ2xhc3MiLCJ3cmFwIiwiY2xvc2VzdCIsImZpbmQiLCJyZW1vdmUiLCJhZnRlciIsIiRzdHlsZWRTZWxlY3QiLCJuZXh0IiwidGV4dCIsImVxIiwiJGxpc3QiLCJpbnNlcnRBZnRlciIsImkiLCJyZWwiLCJ2YWwiLCJhcHBlbmRUbyIsIiRsaXN0SXRlbXMiLCJjbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm5vdCIsInJlbW92ZUNsYXNzIiwiaGlkZSIsInRvZ2dsZUNsYXNzIiwiYXR0ciIsInRyaWdnZXIiLCJjaGFuZ2UiLCJqUXVlcnkiLCJhIiwiY29va2llIiwibyIsIm4iLCJhcmd1bWVudHMiLCJleHRlbmQiLCJleHBpcmVzIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmF3IiwidG9VVENTdHJpbmciLCJwYXRoIiwiZG9tYWluIiwic2VjdXJlIiwiam9pbiIsInQiLCJzIiwic3BsaXQiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjb29raWVDb25zZW50IiwicG9zaXRpb24iLCJtZXNzYWdlIiwic3R5bGUiLCJjb25zZW50TWVzc2FnZSIsImNvbnNlbnRTdHlsZSIsImFjY2VwdENsYXNzIiwiY29uc2VudFRpbWUiLCJzdG9yYWdlIiwib25Jbml0Iiwib25Db25zZW50Iiwib25UZW1wbGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJ0ZXN0aW5nIiwiY29uc2VudEtleSIsImlzR29vZ2xlQm90IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWF0Y2giLCJTdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNlc3Npb25TdG9yYWdlIiwiaHRtbCIsImFwcGVuZCIsInByZXBlbmRUbyIsImNhbGwiLCJEYXRlIiwiZ2V0VGltZSIsInNob3ciLCJzZXRJdGVtIiwiU3dpcGVyIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsInBhZ2luYXRpb24iLCJjbGlja2FibGUiLCJicmVha3BvaW50cyIsInByZXYiLCJjbG9uZSIsImZpbGUiLCJmaWxlcyIsIm5hbWUiLCJyZWFkeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBQUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFFQSxJQUFNQSxLQUFLLEdBQUcsTUFBZDtFQUNBLElBQU1DLFVBQVUsR0FBRyxHQUFuQjtFQUNBLElBQU1DLFVBQVEsR0FBRyxVQUFqQjtFQUNBLElBQU1DLGFBQWEsR0FBRyxrQkFBdEI7O01BRU1DLFVBQ0wsbUJBQWM7RUFBQTs7RUFBQTs7RUFBQSxvQ0FRSCxVQUFBQyxLQUFLLEVBQUk7RUFDbkIsUUFBSUEsS0FBSyxLQUFLLElBQWQsRUFBb0I7RUFDbkIsYUFBTyxDQUFQO0VBQ0EsS0FGRCxNQUVPLElBQUlBLEtBQUssQ0FBQ0MsUUFBTixDQUFlLEdBQWYsQ0FBSixFQUF5QjtFQUMvQixhQUFPRCxLQUFLLEdBQUcsSUFBZjtFQUNBLEtBRk0sTUFFQTtFQUNOLGFBQU9FLFFBQVEsQ0FBQ0YsS0FBRCxDQUFmO0VBQ0E7RUFDRCxHQWhCYTs7RUFBQSx5Q0FrQkUsVUFBQ0csWUFBRCxFQUFrQjtFQUNqQyxRQUFJLENBQUNDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEJSLFVBQVEsR0FBRyxRQUFYLEdBQXNCQyxhQUF0QixHQUFzQyxHQUFoRSxDQUFMLEVBQTJFOztFQUQxQywrQ0FHWCxLQUFJLENBQUNRLFFBSE07RUFBQTs7RUFBQTtFQUFBO0VBQUEsWUFHdEJDLE9BSHNCOztFQUloQyxZQUFNQyxLQUFLLEdBQUcsS0FBSSxDQUFDQyxRQUFMLENBQWNGLE9BQU8sQ0FB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
