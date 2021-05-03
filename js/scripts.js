(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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
  var ELEMENTS = '.animate';
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
      if (!document.querySelectorAll(ELEMENTS + ':not(.' + VISIBLE_CLASS + ')')) return;

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

    this.sections = document.querySelectorAll(ELEMENTS);
    window.addEventListener('scroll', function () {
      return _this.scrollHandler(RATIO);
    }, false);
    this.scrollHandler(LOAD_RATIO);
  };

  new Animate();

  new Swiper(".references__slider", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 65
      }
    }
  });

}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXMiOlsic3JjL3NjcmlwdHMvbW9kdWxlcy9BbmltYXRlLmpzIiwic3JjL3NjcmlwdHMvc2NyaXB0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQW5pbWF0ZVxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAtIGFkZCBjbGFzcyB0byBlbGVtZW50IGluIHZpZXdwb3J0XHJcbiAqIC0gc3VwcG9ydCBjdXN0b20gYW5pbWF0aW9uIGRlbGF5IHZpYSBbYW5pbWF0ZS1kZWxheV0gaHRtbCBhdHRyaWJ1dGVcclxuICogLSBzdXBwb3J0IGN1c3RvbSB2aXNpYmxlIHJhdGlvIHZpYSBbYW5pbWF0ZS1yYXRpb10gaHRtbCBhdHRyaWJ1dGVcclxuICovXHJcblxyXG5jb25zdCBSQVRJTyA9ICcwLjc1J1xyXG5jb25zdCBMT0FEX1JBVElPID0gJzEnXHJcbmNvbnN0IEVMRU1FTlRTID0gJy5hbmltYXRlJ1xyXG5jb25zdCBWSVNJQkxFX0NMQVNTID0gJ2FuaW1hdGUtLXZpc2libGUnXHJcblxyXG5jbGFzcyBBbmltYXRlIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuc2VjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKEVMRU1FTlRTKVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB0aGlzLnNjcm9sbEhhbmRsZXIoUkFUSU8pLCBmYWxzZSlcclxuXHJcblx0XHR0aGlzLnNjcm9sbEhhbmRsZXIoTE9BRF9SQVRJTylcclxuXHR9XHJcblxyXG5cdGdldERlbGF5ID0gdmFsdWUgPT4ge1xyXG5cdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiAwXHJcblx0XHR9IGVsc2UgaWYgKHZhbHVlLmluY2x1ZGVzKCcuJykpIHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlICogMTAwMFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHZhbHVlKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2Nyb2xsSGFuZGxlciA9IChDVVNUT01fUkFUSU8pID0+IHtcclxuXHRcdGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChFTEVNRU5UUyArICc6bm90KC4nICsgVklTSUJMRV9DTEFTUyArICcpJykpIHJldHVyblxyXG5cclxuXHRcdGZvciAoY29uc3Qgc2VjdGlvbiBvZiB0aGlzLnNlY3Rpb25zKSB7XHJcblx0XHRcdGNvbnN0IGRlbGF5ID0gdGhpcy5nZXREZWxheShzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1kZWxheScpKVxyXG5cdFx0XHRjb25zdCByYXRpbyA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdhbmltYXRlLXJhdGlvJykgPyBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnYW5pbWF0ZS1yYXRpbycpIDogQ1VTVE9NX1JBVElPXHJcblxyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0c2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgPD0gd2luZG93LmlubmVySGVpZ2h0ICogcmF0aW8gJiZcclxuXHRcdFx0XHRzZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA+IDBcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRzZWN0aW9uLmNsYXNzTGlzdC5hZGQoVklTSUJMRV9DTEFTUylcclxuXHRcdFx0XHR9LCBkZWxheSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubmV3IEFuaW1hdGUoKVxyXG5cclxuIiwiaW1wb3J0IFwiLi9tb2R1bGVzL0FuaW1hdGVcIjtcclxuXHJcbnZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKFwiLnJlZmVyZW5jZXNfX3NsaWRlclwiLCB7XHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgIGVsOiBcIi5zd2lwZXItcGFnaW5hdGlvblwiLFxyXG4gICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgIDY0MDoge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDQwLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIDEwMjQ6IHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgIHNwYWNlQmV0d2VlbjogNjUsXHJcbiAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiUkFUSU8iLCJMT0FEX1JBVElPIiwiRUxFTUVOVFMiLCJWSVNJQkxFX0NMQVNTIiwiQW5pbWF0ZSIsInZhbHVlIiwiaW5jbHVkZXMiLCJwYXJzZUludCIsIkNVU1RPTV9SQVRJTyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInNlY3Rpb25zIiwic2VjdGlvbiIsImRlbGF5IiwiZ2V0RGVsYXkiLCJnZXRBdHRyaWJ1dGUiLCJyYXRpbyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsIndpbmRvdyIsImlubmVySGVpZ2h0Iiwic2V0VGltZW91dCIsImNsYXNzTGlzdCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzY3JvbGxIYW5kbGVyIiwiU3dpcGVyIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsInBhZ2luYXRpb24iLCJlbCIsImNsaWNrYWJsZSIsImJyZWFrcG9pbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
