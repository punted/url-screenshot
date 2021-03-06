// Generated by IcedCoffeeScript 108.0.9
(function() {
  var bin_path, cp, e, iced, log, path, phantom_js, r, screenshot, ss_opt, _, __iced_deferrals, __iced_k, __iced_k_noop,
    __slice = [].slice;

  iced = {
    Deferrals: (function() {
      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) {
          return this.continuation(this.ret);
        }
      };

      _Class.prototype.defer = function(defer_params) {
        ++this.count;
        return (function(_this) {
          return function() {
            var inner_params, _ref;
            inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (defer_params != null) {
              if ((_ref = defer_params.assign_fn) != null) {
                _ref.apply(null, inner_params);
              }
            }
            return _this._fulfill();
          };
        })(this);
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  __iced_k = __iced_k_noop = function() {};

  log = function() {
    var x;
    x = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    try {
      return console.log.apply(console, x);
    } catch (_error) {}
  };

  _ = require('wegweg')({
    globals: false,
    shelljs: false
  });

  path = require('path');

  cp = require('child_process');

  phantom_js = require('phantomjs-prebuilt');

  bin_path = phantom_js.path;

  module.exports = screenshot = (function(opt, cb) {
    var child_args, err, response, stderr, stdout, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    if (!opt.url) {
      return cb(new Error("`opt.url` required"));
    }
    if (opt.outfile == null) {
      opt.outfile = "/tmp/" + _.uuid + ".png";
    }
    opt.outfile = _.resolve(opt.outfile);
    child_args = [path.join(__dirname, 'screenshot.js'), opt.url, opt.outfile];
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "/Users/douglaslauer/www/url-screenshot/module.iced"
        });
        cp.execFile(bin_path, child_args, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              err = arguments[0];
              stdout = arguments[1];
              return stderr = arguments[2];
            };
          })(),
          lineno: 26
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        if (err) {
          return cb(err);
        }
        try {
          response = JSON.parse(stdout.trim());
        } catch (_error) {
          return cb(new Error('Failed to decode response: ' + stdout.trim()));
        }
        if (response.error) {
          return cb(new Error(response.error));
        }
        return cb(null, response.outfile);
      };
    })(this));
  });

  if (!module.parent) {
    log(/DEVEL/);
    ss_opt = {
      url: 'https://www.google.com',
      outfile: '/tmp/google.png'
    };
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          filename: "/Users/douglaslauer/www/url-screenshot/module.iced"
        });
        screenshot(ss_opt, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              e = arguments[0];
              return r = arguments[1];
            };
          })(),
          lineno: 48
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        log(e);
        log(r);
        return __iced_k(process.exit(0));
      };
    })(this));
  } else {
    __iced_k();
  }

}).call(this);
