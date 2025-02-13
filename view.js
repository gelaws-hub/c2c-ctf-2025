import { C as o, m as d } from "./index.2e31e3b8.js";
window.CTFd = o;
window.Alpine = d;
d.start();

var oe =
    (typeof globalThis < "u" && globalThis) ||
    (typeof self < "u" && self) ||
    (typeof oe < "u" && oe),
  ue = {
    searchParams: "URLSearchParams" in oe,
    iterable: "Symbol" in oe && "iterator" in Symbol,
    blob:
      "FileReader" in oe &&
      "Blob" in oe &&
      (function () {
        try {
          return new Blob(), !0;
        } catch {
          return !1;
        }
      })(),
    formData: "FormData" in oe,
    arrayBuffer: "ArrayBuffer" in oe,
  };
function dl(e) {
  return e && DataView.prototype.isPrototypeOf(e);
}
if (ue.arrayBuffer)
  var hl = [
      "[object Int8Array]",
      "[object Uint8Array]",
      "[object Uint8ClampedArray]",
      "[object Int16Array]",
      "[object Uint16Array]",
      "[object Int32Array]",
      "[object Uint32Array]",
      "[object Float32Array]",
      "[object Float64Array]",
    ],
    pl =
      ArrayBuffer.isView ||
      function (e) {
        return e && hl.indexOf(Object.prototype.toString.call(e)) > -1;
      };
function tn(e) {
  if (
    (typeof e != "string" && (e = String(e)),
    /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || e === "")
  )
    throw new TypeError('Invalid character in header field name: "' + e + '"');
  return e.toLowerCase();
}
function si(e) {
  return typeof e != "string" && (e = String(e)), e;
}
function oi(e) {
  var t = {
    next: function () {
      var n = e.shift();
      return { done: n === void 0, value: n };
    },
  };
  return (
    ue.iterable &&
      (t[Symbol.iterator] = function () {
        return t;
      }),
    t
  );
}
function Z(e) {
  (this.map = {}),
    e instanceof Z
      ? e.forEach(function (t, n) {
          this.append(n, t);
        }, this)
      : Array.isArray(e)
      ? e.forEach(function (t) {
          this.append(t[0], t[1]);
        }, this)
      : e &&
        Object.getOwnPropertyNames(e).forEach(function (t) {
          this.append(t, e[t]);
        }, this);
}
Z.prototype.append = function (e, t) {
  (e = tn(e)), (t = si(t));
  var n = this.map[e];
  this.map[e] = n ? n + ", " + t : t;
};
Z.prototype.delete = function (e) {
  delete this.map[tn(e)];
};
Z.prototype.get = function (e) {
  return (e = tn(e)), this.has(e) ? this.map[e] : null;
};
Z.prototype.has = function (e) {
  return this.map.hasOwnProperty(tn(e));
};
Z.prototype.set = function (e, t) {
  this.map[tn(e)] = si(t);
};
Z.prototype.forEach = function (e, t) {
  for (var n in this.map)
    this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this);
};
Z.prototype.keys = function () {
  var e = [];
  return (
    this.forEach(function (t, n) {
      e.push(n);
    }),
    oi(e)
  );
};
Z.prototype.values = function () {
  var e = [];
  return (
    this.forEach(function (t) {
      e.push(t);
    }),
    oi(e)
  );
};
Z.prototype.entries = function () {
  var e = [];
  return (
    this.forEach(function (t, n) {
      e.push([n, t]);
    }),
    oi(e)
  );
};
ue.iterable && (Z.prototype[Symbol.iterator] = Z.prototype.entries);
function hr(e) {
  if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
  e.bodyUsed = !0;
}
function lo(e) {
  return new Promise(function (t, n) {
    (e.onload = function () {
      t(e.result);
    }),
      (e.onerror = function () {
        n(e.error);
      });
  });
}
function _l(e) {
  var t = new FileReader(),
    n = lo(t);
  return t.readAsArrayBuffer(e), n;
}
function ml(e) {
  var t = new FileReader(),
    n = lo(t);
  return t.readAsText(e), n;
}
function gl(e) {
  for (
    var t = new Uint8Array(e), n = new Array(t.length), r = 0;
    r < t.length;
    r++
  )
    n[r] = String.fromCharCode(t[r]);
  return n.join("");
}
function us(e) {
  if (e.slice) return e.slice(0);
  var t = new Uint8Array(e.byteLength);
  return t.set(new Uint8Array(e)), t.buffer;
}
function uo() {
  return (
    (this.bodyUsed = !1),
    (this._initBody = function (e) {
      (this.bodyUsed = this.bodyUsed),
        (this._bodyInit = e),
        e
          ? typeof e == "string"
            ? (this._bodyText = e)
            : ue.blob && Blob.prototype.isPrototypeOf(e)
            ? (this._bodyBlob = e)
            : ue.formData && FormData.prototype.isPrototypeOf(e)
            ? (this._bodyFormData = e)
            : ue.searchParams && URLSearchParams.prototype.isPrototypeOf(e)
            ? (this._bodyText = e.toString())
            : ue.arrayBuffer && ue.blob && dl(e)
            ? ((this._bodyArrayBuffer = us(e.buffer)),
              (this._bodyInit = new Blob([this._bodyArrayBuffer])))
            : ue.arrayBuffer &&
              (ArrayBuffer.prototype.isPrototypeOf(e) || pl(e))
            ? (this._bodyArrayBuffer = us(e))
            : (this._bodyText = e = Object.prototype.toString.call(e))
          : (this._bodyText = ""),
        this.headers.get("content-type") ||
          (typeof e == "string"
            ? this.headers.set("content-type", "text/plain;charset=UTF-8")
            : this._bodyBlob && this._bodyBlob.type
            ? this.headers.set("content-type", this._bodyBlob.type)
            : ue.searchParams &&
              URLSearchParams.prototype.isPrototypeOf(e) &&
              this.headers.set(
                "content-type",
                "application/x-www-form-urlencoded;charset=UTF-8"
              ));
    }),
    ue.blob &&
      ((this.blob = function () {
        var e = hr(this);
        if (e) return e;
        if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
        if (this._bodyArrayBuffer)
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        if (this._bodyFormData)
          throw new Error("could not read FormData body as blob");
        return Promise.resolve(new Blob([this._bodyText]));
      }),
      (this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          var e = hr(this);
          return (
            e ||
            (ArrayBuffer.isView(this._bodyArrayBuffer)
              ? Promise.resolve(
                  this._bodyArrayBuffer.buffer.slice(
                    this._bodyArrayBuffer.byteOffset,
                    this._bodyArrayBuffer.byteOffset +
                      this._bodyArrayBuffer.byteLength
                  )
                )
              : Promise.resolve(this._bodyArrayBuffer))
          );
        } else return this.blob().then(_l);
      })),
    (this.text = function () {
      var e = hr(this);
      if (e) return e;
      if (this._bodyBlob) return ml(this._bodyBlob);
      if (this._bodyArrayBuffer)
        return Promise.resolve(gl(this._bodyArrayBuffer));
      if (this._bodyFormData)
        throw new Error("could not read FormData body as text");
      return Promise.resolve(this._bodyText);
    }),
    ue.formData &&
      (this.formData = function () {
        return this.text().then(bl);
      }),
    (this.json = function () {
      return this.text().then(JSON.parse);
    }),
    this
  );
}
var vl = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
function yl(e) {
  var t = e.toUpperCase();
  return vl.indexOf(t) > -1 ? t : e;
}
function ct(e, t) {
  if (!(this instanceof ct))
    throw new TypeError(
      'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
    );
  t = t || {};
  var n = t.body;
  if (e instanceof ct) {
    if (e.bodyUsed) throw new TypeError("Already read");
    (this.url = e.url),
      (this.credentials = e.credentials),
      t.headers || (this.headers = new Z(e.headers)),
      (this.method = e.method),
      (this.mode = e.mode),
      (this.signal = e.signal),
      !n && e._bodyInit != null && ((n = e._bodyInit), (e.bodyUsed = !0));
  } else this.url = String(e);
  if (
    ((this.credentials = t.credentials || this.credentials || "same-origin"),
    (t.headers || !this.headers) && (this.headers = new Z(t.headers)),
    (this.method = yl(t.method || this.method || "GET")),
    (this.mode = t.mode || this.mode || null),
    (this.signal = t.signal || this.signal),
    (this.referrer = null),
    (this.method === "GET" || this.method === "HEAD") && n)
  )
    throw new TypeError("Body not allowed for GET or HEAD requests");
  if (
    (this._initBody(n),
    (this.method === "GET" || this.method === "HEAD") &&
      (t.cache === "no-store" || t.cache === "no-cache"))
  ) {
    var r = /([?&])_=[^&]*/;
    if (r.test(this.url))
      this.url = this.url.replace(r, "$1_=" + new Date().getTime());
    else {
      var i = /\?/;
      this.url += (i.test(this.url) ? "&" : "?") + "_=" + new Date().getTime();
    }
  }
}
ct.prototype.clone = function () {
  return new ct(this, { body: this._bodyInit });
};
function bl(e) {
  var t = new FormData();
  return (
    e
      .trim()
      .split("&")
      .forEach(function (n) {
        if (n) {
          var r = n.split("="),
            i = r.shift().replace(/\+/g, " "),
            o = r.join("=").replace(/\+/g, " ");
          t.append(decodeURIComponent(i), decodeURIComponent(o));
        }
      }),
    t
  );
}
function El(e) {
  var t = new Z(),
    n = e.replace(/\r?\n[\t ]+/g, " ");
  return (
    n
      .split("\r")
      .map(function (r) {
        return r.indexOf(`
`) === 0
          ? r.substr(1, r.length)
          : r;
      })
      .forEach(function (r) {
        var i = r.split(":"),
          o = i.shift().trim();
        if (o) {
          var a = i.join(":").trim();
          t.append(o, a);
        }
      }),
    t
  );
}
uo.call(ct.prototype);
function De(e, t) {
  if (!(this instanceof De))
    throw new TypeError(
      'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
    );
  t || (t = {}),
    (this.type = "default"),
    (this.status = t.status === void 0 ? 200 : t.status),
    (this.ok = this.status >= 200 && this.status < 300),
    (this.statusText = t.statusText === void 0 ? "" : "" + t.statusText),
    (this.headers = new Z(t.headers)),
    (this.url = t.url || ""),
    this._initBody(e);
}
uo.call(De.prototype);
De.prototype.clone = function () {
  return new De(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Z(this.headers),
    url: this.url,
  });
};
De.error = function () {
  var e = new De(null, { status: 0, statusText: "" });
  return (e.type = "error"), e;
};
var wl = [301, 302, 303, 307, 308];
De.redirect = function (e, t) {
  if (wl.indexOf(t) === -1) throw new RangeError("Invalid status code");
  return new De(null, { status: t, headers: { location: e } });
};
var tt = oe.DOMException;
try {
  new tt();
} catch {
  (tt = function (t, n) {
    (this.message = t), (this.name = n);
    var r = Error(t);
    this.stack = r.stack;
  }),
    (tt.prototype = Object.create(Error.prototype)),
    (tt.prototype.constructor = tt);
}
function fo(e, t) {
  return new Promise(function (n, r) {
    var i = new ct(e, t);
    if (i.signal && i.signal.aborted) return r(new tt("Aborted", "AbortError"));
    var o = new XMLHttpRequest();
    function a() {
      o.abort();
    }
    (o.onload = function () {
      var f = {
        status: o.status,
        statusText: o.statusText,
        headers: El(o.getAllResponseHeaders() || ""),
      };
      f.url =
        "responseURL" in o ? o.responseURL : f.headers.get("X-Request-URL");
      var d = "response" in o ? o.response : o.responseText;
      setTimeout(function () {
        n(new De(d, f));
      }, 0);
    }),
      (o.onerror = function () {
        setTimeout(function () {
          r(new TypeError("Network request failed"));
        }, 0);
      }),
      (o.ontimeout = function () {
        setTimeout(function () {
          r(new TypeError("Network request failed"));
        }, 0);
      }),
      (o.onabort = function () {
        setTimeout(function () {
          r(new tt("Aborted", "AbortError"));
        }, 0);
      });
    function u(f) {
      try {
        return f === "" && oe.location.href ? oe.location.href : f;
      } catch {
        return f;
      }
    }
    o.open(i.method, u(i.url), !0),
      i.credentials === "include"
        ? (o.withCredentials = !0)
        : i.credentials === "omit" && (o.withCredentials = !1),
      "responseType" in o &&
        (ue.blob
          ? (o.responseType = "blob")
          : ue.arrayBuffer &&
            i.headers.get("Content-Type") &&
            i.headers
              .get("Content-Type")
              .indexOf("application/octet-stream") !== -1 &&
            (o.responseType = "arraybuffer")),
      t && typeof t.headers == "object" && !(t.headers instanceof Z)
        ? Object.getOwnPropertyNames(t.headers).forEach(function (f) {
            o.setRequestHeader(f, si(t.headers[f]));
          })
        : i.headers.forEach(function (f, d) {
            o.setRequestHeader(d, f);
          }),
      i.signal &&
        (i.signal.addEventListener("abort", a),
        (o.onreadystatechange = function () {
          o.readyState === 4 && i.signal.removeEventListener("abort", a);
        })),
      o.send(typeof i._bodyInit > "u" ? null : i._bodyInit);
  });
}
fo.polyfill = !0;
oe.fetch ||
  ((oe.fetch = fo), (oe.Headers = Z), (oe.Request = ct), (oe.Response = De));
const X = {
    urlRoot: "",
    csrfNonce: "",
    userMode: "",
    userName: "",
    userEmail: "",
    start: null,
    end: null,
    themeSettings: {},
    eventSounds: [
      "/themes/core/static/sounds/notification.webm",
      "/themes/core/static/sounds/notification.mp3",
    ],
  },
  Al = window.fetch,
  Tl = (e, t) => (
    t === void 0 &&
      (t = { method: "GET", credentials: "same-origin", headers: {} }),
    (e = X.urlRoot + e),
    t.headers === void 0 && (t.headers = {}),
    (t.credentials = "same-origin"),
    (t.headers.Accept = "application/json"),
    (t.headers["Content-Type"] = "application/json"),
    (t.headers["CSRF-Token"] = X.csrfNonce),
    Al(e, t)
  );
var we =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  ho = { exports: {} };
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(we, function () {
    var n = 1e3,
      r = 6e4,
      i = 36e5,
      o = "millisecond",
      a = "second",
      u = "minute",
      f = "hour",
      d = "day",
      g = "week",
      s = "month",
      c = "quarter",
      l = "year",
      h = "date",
      _ = "Invalid Date",
      p =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      m =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      E = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        ordinal: function (A) {
          var b = ["th", "st", "nd", "rd"],
            v = A % 100;
          return "[" + A + (b[(v - 20) % 10] || b[v] || b[0]) + "]";
        },
      },
      O = function (A, b, v) {
        var T = String(A);
        return !T || T.length >= b
          ? A
          : "" + Array(b + 1 - T.length).join(v) + A;
      },
      D = {
        s: O,
        z: function (A) {
          var b = -A.utcOffset(),
            v = Math.abs(b),
            T = Math.floor(v / 60),
            y = v % 60;
          return (b <= 0 ? "+" : "-") + O(T, 2, "0") + ":" + O(y, 2, "0");
        },
        m: function A(b, v) {
          if (b.date() < v.date()) return -A(v, b);
          var T = 12 * (v.year() - b.year()) + (v.month() - b.month()),
            y = b.clone().add(T, s),
            x = v - y < 0,
            S = b.clone().add(T + (x ? -1 : 1), s);
          return +(-(T + (v - y) / (x ? y - S : S - y)) || 0);
        },
        a: function (A) {
          return A < 0 ? Math.ceil(A) || 0 : Math.floor(A);
        },
        p: function (A) {
          return (
            { M: s, y: l, w: g, d, D: h, h: f, m: u, s: a, ms: o, Q: c }[A] ||
            String(A || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (A) {
          return A === void 0;
        },
      },
      L = "en",
      I = {};
    I[L] = E;
    var F = function (A) {
        return A instanceof Y;
      },
      j = function A(b, v, T) {
        var y;
        if (!b) return L;
        if (typeof b == "string") {
          var x = b.toLowerCase();
          I[x] && (y = x), v && ((I[x] = v), (y = x));
          var S = b.split("-");
          if (!y && S.length > 1) return A(S[0]);
        } else {
          var k = b.name;
          (I[k] = b), (y = k);
        }
        return !T && y && (L = y), y || (!T && L);
      },
      $ = function (A, b) {
        if (F(A)) return A.clone();
        var v = typeof b == "object" ? b : {};
        return (v.date = A), (v.args = arguments), new Y(v);
      },
      N = D;
    (N.l = j),
      (N.i = F),
      (N.w = function (A, b) {
        return $(A, { locale: b.$L, utc: b.$u, x: b.$x, $offset: b.$offset });
      });
    var Y = (function () {
        function A(v) {
          (this.$L = j(v.locale, null, !0)), this.parse(v);
        }
        var b = A.prototype;
        return (
          (b.parse = function (v) {
            (this.$d = (function (T) {
              var y = T.date,
                x = T.utc;
              if (y === null) return new Date(NaN);
              if (N.u(y)) return new Date();
              if (y instanceof Date) return new Date(y);
              if (typeof y == "string" && !/Z$/i.test(y)) {
                var S = y.match(p);
                if (S) {
                  var k = S[2] - 1 || 0,
                    B = (S[7] || "0").substring(0, 3);
                  return x
                    ? new Date(
                        Date.UTC(
                          S[1],
                          k,
                          S[3] || 1,
                          S[4] || 0,
                          S[5] || 0,
                          S[6] || 0,
                          B
                        )
                      )
                    : new Date(
                        S[1],
                        k,
                        S[3] || 1,
                        S[4] || 0,
                        S[5] || 0,
                        S[6] || 0,
                        B
                      );
                }
              }
              return new Date(y);
            })(v)),
              (this.$x = v.x || {}),
              this.init();
          }),
          (b.init = function () {
            var v = this.$d;
            (this.$y = v.getFullYear()),
              (this.$M = v.getMonth()),
              (this.$D = v.getDate()),
              (this.$W = v.getDay()),
              (this.$H = v.getHours()),
              (this.$m = v.getMinutes()),
              (this.$s = v.getSeconds()),
              (this.$ms = v.getMilliseconds());
          }),
          (b.$utils = function () {
            return N;
          }),
          (b.isValid = function () {
            return this.$d.toString() !== _;
          }),
          (b.isSame = function (v, T) {
            var y = $(v);
            return this.startOf(T) <= y && y <= this.endOf(T);
          }),
          (b.isAfter = function (v, T) {
            return $(v) < this.startOf(T);
          }),
          (b.isBefore = function (v, T) {
            return this.endOf(T) < $(v);
          }),
          (b.$g = function (v, T, y) {
            return N.u(v) ? this[T] : this.set(y, v);
          }),
          (b.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (b.valueOf = function () {
            return this.$d.getTime();
          }),
          (b.startOf = function (v, T) {
            var y = this,
              x = !!N.u(T) || T,
              S = N.p(v),
              k = function (z, W) {
                var J = N.w(
                  y.$u ? Date.UTC(y.$y, W, z) : new Date(y.$y, W, z),
                  y
                );
                return x ? J : J.endOf(d);
              },
              B = function (z, W) {
                return N.w(
                  y
                    .toDate()
                    [z].apply(
                      y.toDate("s"),
                      (x ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(W)
                    ),
                  y
                );
              },
              R = this.$W,
              V = this.$M,
              K = this.$D,
              G = "set" + (this.$u ? "UTC" : "");
            switch (S) {
              case l:
                return x ? k(1, 0) : k(31, 11);
              case s:
                return x ? k(1, V) : k(0, V + 1);
              case g:
                var re = this.$locale().weekStart || 0,
                  se = (R < re ? R + 7 : R) - re;
                return k(x ? K - se : K + (6 - se), V);
              case d:
              case h:
                return B(G + "Hours", 0);
              case f:
                return B(G + "Minutes", 1);
              case u:
                return B(G + "Seconds", 2);
              case a:
                return B(G + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (b.endOf = function (v) {
            return this.startOf(v, !1);
          }),
          (b.$set = function (v, T) {
            var y,
              x = N.p(v),
              S = "set" + (this.$u ? "UTC" : ""),
              k = ((y = {}),
              (y[d] = S + "Date"),
              (y[h] = S + "Date"),
              (y[s] = S + "Month"),
              (y[l] = S + "FullYear"),
              (y[f] = S + "Hours"),
              (y[u] = S + "Minutes"),
              (y[a] = S + "Seconds"),
              (y[o] = S + "Milliseconds"),
              y)[x],
              B = x === d ? this.$D + (T - this.$W) : T;
            if (x === s || x === l) {
              var R = this.clone().set(h, 1);
              R.$d[k](B),
                R.init(),
                (this.$d = R.set(h, Math.min(this.$D, R.daysInMonth())).$d);
            } else k && this.$d[k](B);
            return this.init(), this;
          }),
          (b.set = function (v, T) {
            return this.clone().$set(v, T);
          }),
          (b.get = function (v) {
            return this[N.p(v)]();
          }),
          (b.add = function (v, T) {
            var y,
              x = this;
            v = Number(v);
            var S = N.p(T),
              k = function (V) {
                var K = $(x);
                return N.w(K.date(K.date() + Math.round(V * v)), x);
              };
            if (S === s) return this.set(s, this.$M + v);
            if (S === l) return this.set(l, this.$y + v);
            if (S === d) return k(1);
            if (S === g) return k(7);
            var B = ((y = {}), (y[u] = r), (y[f] = i), (y[a] = n), y)[S] || 1,
              R = this.$d.getTime() + v * B;
            return N.w(R, this);
          }),
          (b.subtract = function (v, T) {
            return this.add(-1 * v, T);
          }),
          (b.format = function (v) {
            var T = this,
              y = this.$locale();
            if (!this.isValid()) return y.invalidDate || _;
            var x = v || "YYYY-MM-DDTHH:mm:ssZ",
              S = N.z(this),
              k = this.$H,
              B = this.$m,
              R = this.$M,
              V = y.weekdays,
              K = y.months,
              G = function (W, J, be, Ee) {
                return (W && (W[J] || W(T, x))) || be[J].slice(0, Ee);
              },
              re = function (W) {
                return N.s(k % 12 || 12, W, "0");
              },
              se =
                y.meridiem ||
                function (W, J, be) {
                  var Ee = W < 12 ? "AM" : "PM";
                  return be ? Ee.toLowerCase() : Ee;
                },
              z = {
                YY: String(this.$y).slice(-2),
                YYYY: this.$y,
                M: R + 1,
                MM: N.s(R + 1, 2, "0"),
                MMM: G(y.monthsShort, R, K, 3),
                MMMM: G(K, R),
                D: this.$D,
                DD: N.s(this.$D, 2, "0"),
                d: String(this.$W),
                dd: G(y.weekdaysMin, this.$W, V, 2),
                ddd: G(y.weekdaysShort, this.$W, V, 3),
                dddd: V[this.$W],
                H: String(k),
                HH: N.s(k, 2, "0"),
                h: re(1),
                hh: re(2),
                a: se(k, B, !0),
                A: se(k, B, !1),
                m: String(B),
                mm: N.s(B, 2, "0"),
                s: String(this.$s),
                ss: N.s(this.$s, 2, "0"),
                SSS: N.s(this.$ms, 3, "0"),
                Z: S,
              };
            return x.replace(m, function (W, J) {
              return J || z[W] || S.replace(":", "");
            });
          }),
          (b.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (b.diff = function (v, T, y) {
            var x,
              S = N.p(T),
              k = $(v),
              B = (k.utcOffset() - this.utcOffset()) * r,
              R = this - k,
              V = N.m(this, k);
            return (
              (V =
                ((x = {}),
                (x[l] = V / 12),
                (x[s] = V),
                (x[c] = V / 3),
                (x[g] = (R - B) / 6048e5),
                (x[d] = (R - B) / 864e5),
                (x[f] = R / i),
                (x[u] = R / r),
                (x[a] = R / n),
                x)[S] || R),
              y ? V : N.a(V)
            );
          }),
          (b.daysInMonth = function () {
            return this.endOf(s).$D;
          }),
          (b.$locale = function () {
            return I[this.$L];
          }),
          (b.locale = function (v, T) {
            if (!v) return this.$L;
            var y = this.clone(),
              x = j(v, T, !0);
            return x && (y.$L = x), y;
          }),
          (b.clone = function () {
            return N.w(this.$d, this);
          }),
          (b.toDate = function () {
            return new Date(this.valueOf());
          }),
          (b.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (b.toISOString = function () {
            return this.$d.toISOString();
          }),
          (b.toString = function () {
            return this.$d.toUTCString();
          }),
          A
        );
      })(),
      Q = Y.prototype;
    return (
      ($.prototype = Q),
      [
        ["$ms", o],
        ["$s", a],
        ["$m", u],
        ["$H", f],
        ["$W", d],
        ["$M", s],
        ["$y", l],
        ["$D", h],
      ].forEach(function (A) {
        Q[A[1]] = function (b) {
          return this.$g(b, A[0], A[1]);
        };
      }),
      ($.extend = function (A, b) {
        return A.$i || (A(b, Y, $), (A.$i = !0)), $;
      }),
      ($.locale = j),
      ($.isDayjs = F),
      ($.unix = function (A) {
        return $(1e3 * A);
      }),
      ($.en = I[L]),
      ($.Ls = I),
      ($.p = {}),
      $
    );
  });
})(ho);
const nn = ho.exports;
var po = { exports: {} };
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(we, function () {
    return function (n, r) {
      var i = r.prototype,
        o = i.format;
      i.format = function (a) {
        var u = this,
          f = this.$locale();
        if (!this.isValid()) return o.bind(this)(a);
        var d = this.$utils(),
          g = (a || "YYYY-MM-DDTHH:mm:ssZ").replace(
            /\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,
            function (s) {
              switch (s) {
                case "Q":
                  return Math.ceil((u.$M + 1) / 3);
                case "Do":
                  return f.ordinal(u.$D);
                case "gggg":
                  return u.weekYear();
                case "GGGG":
                  return u.isoWeekYear();
                case "wo":
                  return f.ordinal(u.week(), "W");
                case "w":
                case "ww":
                  return d.s(u.week(), s === "w" ? 1 : 2, "0");
                case "W":
                case "WW":
                  return d.s(u.isoWeek(), s === "W" ? 1 : 2, "0");
                case "k":
                case "kk":
                  return d.s(
                    String(u.$H === 0 ? 24 : u.$H),
                    s === "k" ? 1 : 2,
                    "0"
                  );
                case "X":
                  return Math.floor(u.$d.getTime() / 1e3);
                case "x":
                  return u.$d.getTime();
                case "z":
                  return "[" + u.offsetName() + "]";
                case "zzz":
                  return "[" + u.offsetName("long") + "]";
                default:
                  return s;
              }
            }
          );
        return o.bind(this)(g);
      };
    };
  });
})(po);
const _o = po.exports,
  Pe = document,
  Cn = window,
  mo = Pe.documentElement,
  dt = Pe.createElement.bind(Pe),
  go = dt("div"),
  pr = dt("table"),
  Sl = dt("tbody"),
  fs = dt("tr"),
  { isArray: Fn, prototype: vo } = Array,
  {
    concat: Ol,
    filter: ai,
    indexOf: yo,
    map: bo,
    push: xl,
    slice: Eo,
    some: ci,
    splice: $l,
  } = vo,
  Cl = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,
  Dl = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,
  Nl = /<.+>/,
  Ml = /^\w+$/;
function li(e, t) {
  const n = Ll(t);
  return !e || (!n && !Ot(t) && !ne(t))
    ? []
    : !n && Dl.test(e)
    ? t.getElementsByClassName(e.slice(1).replace(/\\/g, ""))
    : !n && Ml.test(e)
    ? t.getElementsByTagName(e)
    : t.querySelectorAll(e);
}
class Vn {
  constructor(t, n) {
    if (!t) return;
    if (Pr(t)) return t;
    let r = t;
    if (de(t)) {
      const i = (Pr(n) ? n[0] : n) || Pe;
      if (
        ((r =
          Cl.test(t) && "getElementById" in i
            ? i.getElementById(t.slice(1).replace(/\\/g, ""))
            : Nl.test(t)
            ? To(t)
            : li(t, i)),
        !r)
      )
        return;
    } else if (ht(t)) return this.ready(t);
    (r.nodeType || r === Cn) && (r = [r]), (this.length = r.length);
    for (let i = 0, o = this.length; i < o; i++) this[i] = r[i];
  }
  init(t, n) {
    return new Vn(t, n);
  }
}
const C = Vn.prototype,
  H = C.init;
H.fn = H.prototype = C;
C.length = 0;
C.splice = $l;
typeof Symbol == "function" && (C[Symbol.iterator] = vo[Symbol.iterator]);
function Pr(e) {
  return e instanceof Vn;
}
function St(e) {
  return !!e && e === e.window;
}
function Ot(e) {
  return !!e && e.nodeType === 9;
}
function Ll(e) {
  return !!e && e.nodeType === 11;
}
function ne(e) {
  return !!e && e.nodeType === 1;
}
function Il(e) {
  return !!e && e.nodeType === 3;
}
function kl(e) {
  return typeof e == "boolean";
}
function ht(e) {
  return typeof e == "function";
}
function de(e) {
  return typeof e == "string";
}
function he(e) {
  return e === void 0;
}
function Zt(e) {
  return e === null;
}
function wo(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}
function ui(e) {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t === Object.prototype;
}
H.isWindow = St;
H.isFunction = ht;
H.isArray = Fn;
H.isNumeric = wo;
H.isPlainObject = ui;
function ie(e, t, n) {
  if (n) {
    let r = e.length;
    for (; r--; ) if (t.call(e[r], r, e[r]) === !1) return e;
  } else if (ui(e)) {
    const r = Object.keys(e);
    for (let i = 0, o = r.length; i < o; i++) {
      const a = r[i];
      if (t.call(e[a], a, e[a]) === !1) return e;
    }
  } else
    for (let r = 0, i = e.length; r < i; r++)
      if (t.call(e[r], r, e[r]) === !1) return e;
  return e;
}
H.each = ie;
C.each = function (e) {
  return ie(this, e);
};
C.empty = function () {
  return this.each((e, t) => {
    for (; t.firstChild; ) t.removeChild(t.firstChild);
  });
};
function Dn(...e) {
  const t = kl(e[0]) ? e.shift() : !1,
    n = e.shift(),
    r = e.length;
  if (!n) return {};
  if (!r) return Dn(t, H, n);
  for (let i = 0; i < r; i++) {
    const o = e[i];
    for (const a in o)
      t && (Fn(o[a]) || ui(o[a]))
        ? ((!n[a] || n[a].constructor !== o[a].constructor) &&
            (n[a] = new o[a].constructor()),
          Dn(t, n[a], o[a]))
        : (n[a] = o[a]);
  }
  return n;
}
H.extend = Dn;
C.extend = function (e) {
  return Dn(C, e);
};
const Pl = /\S+/g;
function jn(e) {
  return de(e) ? e.match(Pl) || [] : [];
}
C.toggleClass = function (e, t) {
  const n = jn(e),
    r = !he(t);
  return this.each((i, o) => {
    !ne(o) ||
      ie(n, (a, u) => {
        r
          ? t
            ? o.classList.add(u)
            : o.classList.remove(u)
          : o.classList.toggle(u);
      });
  });
};
C.addClass = function (e) {
  return this.toggleClass(e, !0);
};
C.removeAttr = function (e) {
  const t = jn(e);
  return this.each((n, r) => {
    !ne(r) ||
      ie(t, (i, o) => {
        r.removeAttribute(o);
      });
  });
};
function Rl(e, t) {
  if (!!e) {
    if (de(e)) {
      if (arguments.length < 2) {
        if (!this[0] || !ne(this[0])) return;
        const n = this[0].getAttribute(e);
        return Zt(n) ? void 0 : n;
      }
      return he(t)
        ? this
        : Zt(t)
        ? this.removeAttr(e)
        : this.each((n, r) => {
            !ne(r) || r.setAttribute(e, t);
          });
    }
    for (const n in e) this.attr(n, e[n]);
    return this;
  }
}
C.attr = Rl;
C.removeClass = function (e) {
  return arguments.length ? this.toggleClass(e, !1) : this.attr("class", "");
};
C.hasClass = function (e) {
  return !!e && ci.call(this, (t) => ne(t) && t.classList.contains(e));
};
C.get = function (e) {
  return he(e)
    ? Eo.call(this)
    : ((e = Number(e)), this[e < 0 ? e + this.length : e]);
};
C.eq = function (e) {
  return H(this.get(e));
};
C.first = function () {
  return this.eq(0);
};
C.last = function () {
  return this.eq(-1);
};
function Hl(e) {
  return he(e)
    ? this.get()
        .map((t) => (ne(t) || Il(t) ? t.textContent : ""))
        .join("")
    : this.each((t, n) => {
        !ne(n) || (n.textContent = e);
      });
}
C.text = Hl;
function Re(e, t, n) {
  if (!ne(e)) return;
  const r = Cn.getComputedStyle(e, null);
  return n ? r.getPropertyValue(t) || void 0 : r[t] || e.style[t];
}
function xe(e, t) {
  return parseInt(Re(e, t), 10) || 0;
}
function ds(e, t) {
  return (
    xe(e, `border${t ? "Left" : "Top"}Width`) +
    xe(e, `padding${t ? "Left" : "Top"}`) +
    xe(e, `padding${t ? "Right" : "Bottom"}`) +
    xe(e, `border${t ? "Right" : "Bottom"}Width`)
  );
}
const _r = {};
function Bl(e) {
  if (_r[e]) return _r[e];
  const t = dt(e);
  Pe.body.insertBefore(t, null);
  const n = Re(t, "display");
  return Pe.body.removeChild(t), (_r[e] = n !== "none" ? n : "block");
}
function hs(e) {
  return Re(e, "display") === "none";
}
function Ao(e, t) {
  const n = e && (e.matches || e.webkitMatchesSelector || e.msMatchesSelector);
  return !!n && !!t && n.call(e, t);
}
function Wn(e) {
  return de(e)
    ? (t, n) => Ao(n, e)
    : ht(e)
    ? e
    : Pr(e)
    ? (t, n) => e.is(n)
    : e
    ? (t, n) => n === e
    : () => !1;
}
C.filter = function (e) {
  const t = Wn(e);
  return H(ai.call(this, (n, r) => t.call(n, r, n)));
};
function qe(e, t) {
  return t ? e.filter(t) : e;
}
C.detach = function (e) {
  return (
    qe(this, e).each((t, n) => {
      n.parentNode && n.parentNode.removeChild(n);
    }),
    this
  );
};
const Fl = /^\s*<(\w+)[^>]*>/,
  Vl = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
  ps = { "*": go, tr: Sl, td: fs, th: fs, thead: pr, tbody: pr, tfoot: pr };
function To(e) {
  if (!de(e)) return [];
  if (Vl.test(e)) return [dt(RegExp.$1)];
  const t = Fl.test(e) && RegExp.$1,
    n = ps[t] || ps["*"];
  return (n.innerHTML = e), H(n.childNodes).detach().get();
}
H.parseHTML = To;
C.has = function (e) {
  const t = de(e) ? (n, r) => li(e, r).length : (n, r) => r.contains(e);
  return this.filter(t);
};
C.not = function (e) {
  const t = Wn(e);
  return this.filter((n, r) => (!de(e) || ne(r)) && !t.call(r, n, r));
};
function Be(e, t, n, r) {
  const i = [],
    o = ht(t),
    a = r && Wn(r);
  for (let u = 0, f = e.length; u < f; u++)
    if (o) {
      const d = t(e[u]);
      d.length && xl.apply(i, d);
    } else {
      let d = e[u][t];
      for (; d != null && !(r && a(-1, d)); ) i.push(d), (d = n ? d[t] : null);
    }
  return i;
}
function So(e) {
  return e.multiple && e.options
    ? Be(
        ai.call(
          e.options,
          (t) => t.selected && !t.disabled && !t.parentNode.disabled
        ),
        "value"
      )
    : e.value || "";
}
function jl(e) {
  return arguments.length
    ? this.each((t, n) => {
        const r = n.multiple && n.options;
        if (r || Lo.test(n.type)) {
          const i = Fn(e) ? bo.call(e, String) : Zt(e) ? [] : [String(e)];
          r
            ? ie(
                n.options,
                (o, a) => {
                  a.selected = i.indexOf(a.value) >= 0;
                },
                !0
              )
            : (n.checked = i.indexOf(n.value) >= 0);
        } else n.value = he(e) || Zt(e) ? "" : e;
      })
    : this[0] && So(this[0]);
}
C.val = jl;
C.is = function (e) {
  const t = Wn(e);
  return ci.call(this, (n, r) => t.call(n, r, n));
};
H.guid = 1;
function Me(e) {
  return e.length > 1 ? ai.call(e, (t, n, r) => yo.call(r, t) === n) : e;
}
H.unique = Me;
C.add = function (e, t) {
  return H(Me(this.get().concat(H(e, t).get())));
};
C.children = function (e) {
  return qe(H(Me(Be(this, (t) => t.children))), e);
};
C.parent = function (e) {
  return qe(H(Me(Be(this, "parentNode"))), e);
};
C.index = function (e) {
  const t = e ? H(e)[0] : this[0],
    n = e ? this : H(t).parent().children();
  return yo.call(n, t);
};
C.closest = function (e) {
  const t = this.filter(e);
  if (t.length) return t;
  const n = this.parent();
  return n.length ? n.closest(e) : t;
};
C.siblings = function (e) {
  return qe(H(Me(Be(this, (t) => H(t).parent().children().not(t)))), e);
};
C.find = function (e) {
  return H(Me(Be(this, (t) => li(e, t))));
};
const Wl = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
  Yl = /^$|^module$|\/(java|ecma)script/i,
  Gl = ["type", "src", "nonce", "noModule"];
function Kl(e, t) {
  const n = H(e);
  n.filter("script")
    .add(n.find("script"))
    .each((r, i) => {
      if (Yl.test(i.type) && mo.contains(i)) {
        const o = dt("script");
        (o.text = i.textContent.replace(Wl, "")),
          ie(Gl, (a, u) => {
            i[u] && (o[u] = i[u]);
          }),
          t.head.insertBefore(o, null),
          t.head.removeChild(o);
      }
    });
}
function Ul(e, t, n, r, i) {
  r
    ? e.insertBefore(t, n ? e.firstChild : null)
    : e.nodeName === "HTML"
    ? e.parentNode.replaceChild(t, e)
    : e.parentNode.insertBefore(t, n ? e : e.nextSibling),
    i && Kl(t, e.ownerDocument);
}
function ze(e, t, n, r, i, o, a, u) {
  return (
    ie(
      e,
      (f, d) => {
        ie(
          H(d),
          (g, s) => {
            ie(
              H(t),
              (c, l) => {
                const h = n ? s : l,
                  _ = n ? l : s,
                  p = n ? g : c;
                Ul(h, p ? _.cloneNode(!0) : _, r, i, !p);
              },
              u
            );
          },
          a
        );
      },
      o
    ),
    t
  );
}
C.after = function () {
  return ze(arguments, this, !1, !1, !1, !0, !0);
};
C.append = function () {
  return ze(arguments, this, !1, !1, !0);
};
function ql(e) {
  if (!arguments.length) return this[0] && this[0].innerHTML;
  if (he(e)) return this;
  const t = /<script[\s>]/.test(e);
  return this.each((n, r) => {
    !ne(r) || (t ? H(r).empty().append(e) : (r.innerHTML = e));
  });
}
C.html = ql;
C.appendTo = function (e) {
  return ze(arguments, this, !0, !1, !0);
};
C.wrapInner = function (e) {
  return this.each((t, n) => {
    const r = H(n),
      i = r.contents();
    i.length ? i.wrapAll(e) : r.append(e);
  });
};
C.before = function () {
  return ze(arguments, this, !1, !0);
};
C.wrapAll = function (e) {
  let t = H(e),
    n = t[0];
  for (; n.children.length; ) n = n.firstElementChild;
  return this.first().before(t), this.appendTo(n);
};
C.wrap = function (e) {
  return this.each((t, n) => {
    const r = H(e)[0];
    H(n).wrapAll(t ? r.cloneNode(!0) : r);
  });
};
C.insertAfter = function (e) {
  return ze(arguments, this, !0, !1, !1, !1, !1, !0);
};
C.insertBefore = function (e) {
  return ze(arguments, this, !0, !0);
};
C.prepend = function () {
  return ze(arguments, this, !1, !0, !0, !0, !0);
};
C.prependTo = function (e) {
  return ze(arguments, this, !0, !0, !0, !1, !1, !0);
};
C.contents = function () {
  return H(
    Me(
      Be(this, (e) =>
        e.tagName === "IFRAME"
          ? [e.contentDocument]
          : e.tagName === "TEMPLATE"
          ? e.content.childNodes
          : e.childNodes
      )
    )
  );
};
C.next = function (e, t, n) {
  return qe(H(Me(Be(this, "nextElementSibling", t, n))), e);
};
C.nextAll = function (e) {
  return this.next(e, !0);
};
C.nextUntil = function (e, t) {
  return this.next(t, !0, e);
};
C.parents = function (e, t) {
  return qe(H(Me(Be(this, "parentElement", !0, t))), e);
};
C.parentsUntil = function (e, t) {
  return this.parents(t, e);
};
C.prev = function (e, t, n) {
  return qe(H(Me(Be(this, "previousElementSibling", t, n))), e);
};
C.prevAll = function (e) {
  return this.prev(e, !0);
};
C.prevUntil = function (e, t) {
  return this.prev(t, !0, e);
};
C.map = function (e) {
  return H(
    Ol.apply(
      [],
      bo.call(this, (t, n) => e.call(t, n, t))
    )
  );
};
C.clone = function () {
  return this.map((e, t) => t.cloneNode(!0));
};
C.offsetParent = function () {
  return this.map((e, t) => {
    let n = t.offsetParent;
    for (; n && Re(n, "position") === "static"; ) n = n.offsetParent;
    return n || mo;
  });
};
C.slice = function (e, t) {
  return H(Eo.call(this, e, t));
};
const zl = /-([a-z])/g;
function fi(e) {
  return e.replace(zl, (t, n) => n.toUpperCase());
}
C.ready = function (e) {
  const t = () => setTimeout(e, 0, H);
  return (
    Pe.readyState !== "loading"
      ? t()
      : Pe.addEventListener("DOMContentLoaded", t),
    this
  );
};
C.unwrap = function () {
  return (
    this.parent().each((e, t) => {
      if (t.tagName === "BODY") return;
      const n = H(t);
      n.replaceWith(n.children());
    }),
    this
  );
};
C.offset = function () {
  const e = this[0];
  if (!e) return;
  const t = e.getBoundingClientRect();
  return { top: t.top + Cn.pageYOffset, left: t.left + Cn.pageXOffset };
};
C.position = function () {
  const e = this[0];
  if (!e) return;
  const t = Re(e, "position") === "fixed",
    n = t ? e.getBoundingClientRect() : this.offset();
  if (!t) {
    const r = e.ownerDocument;
    let i = e.offsetParent || r.documentElement;
    for (
      ;
      (i === r.body || i === r.documentElement) &&
      Re(i, "position") === "static";

    )
      i = i.parentNode;
    if (i !== e && ne(i)) {
      const o = H(i).offset();
      (n.top -= o.top + xe(i, "borderTopWidth")),
        (n.left -= o.left + xe(i, "borderLeftWidth"));
    }
  }
  return {
    top: n.top - xe(e, "marginTop"),
    left: n.left - xe(e, "marginLeft"),
  };
};
const Oo = {
  class: "className",
  contenteditable: "contentEditable",
  for: "htmlFor",
  readonly: "readOnly",
  maxlength: "maxLength",
  tabindex: "tabIndex",
  colspan: "colSpan",
  rowspan: "rowSpan",
  usemap: "useMap",
};
C.prop = function (e, t) {
  if (!!e) {
    if (de(e))
      return (
        (e = Oo[e] || e),
        arguments.length < 2
          ? this[0] && this[0][e]
          : this.each((n, r) => {
              r[e] = t;
            })
      );
    for (const n in e) this.prop(n, e[n]);
    return this;
  }
};
C.removeProp = function (e) {
  return this.each((t, n) => {
    delete n[Oo[e] || e];
  });
};
const Xl = /^--/;
function di(e) {
  return Xl.test(e);
}
const mr = {},
  { style: Ql } = go,
  Jl = ["webkit", "moz", "ms"];
function Zl(e, t = di(e)) {
  if (t) return e;
  if (!mr[e]) {
    const n = fi(e),
      r = `${n[0].toUpperCase()}${n.slice(1)}`,
      i = `${n} ${Jl.join(`${r} `)}${r}`.split(" ");
    ie(i, (o, a) => {
      if (a in Ql) return (mr[e] = a), !1;
    });
  }
  return mr[e];
}
const eu = {
  animationIterationCount: !0,
  columnCount: !0,
  flexGrow: !0,
  flexShrink: !0,
  fontWeight: !0,
  gridArea: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnStart: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowStart: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  widows: !0,
  zIndex: !0,
};
function xo(e, t, n = di(e)) {
  return !n && !eu[e] && wo(t) ? `${t}px` : t;
}
function tu(e, t) {
  if (de(e)) {
    const n = di(e);
    return (
      (e = Zl(e, n)),
      arguments.length < 2
        ? this[0] && Re(this[0], e, n)
        : e
        ? ((t = xo(e, t, n)),
          this.each((r, i) => {
            !ne(i) || (n ? i.style.setProperty(e, t) : (i.style[e] = t));
          }))
        : this
    );
  }
  for (const n in e) this.css(n, e[n]);
  return this;
}
C.css = tu;
function $o(e, t) {
  try {
    return e(t);
  } catch {
    return t;
  }
}
const nu = /^\s+|\s+$/;
function _s(e, t) {
  const n = e.dataset[t] || e.dataset[fi(t)];
  return nu.test(n) ? n : $o(JSON.parse, n);
}
function ru(e, t, n) {
  (n = $o(JSON.stringify, n)), (e.dataset[fi(t)] = n);
}
function iu(e, t) {
  if (!e) {
    if (!this[0]) return;
    const n = {};
    for (const r in this[0].dataset) n[r] = _s(this[0], r);
    return n;
  }
  if (de(e))
    return arguments.length < 2
      ? this[0] && _s(this[0], e)
      : he(t)
      ? this
      : this.each((n, r) => {
          ru(r, e, t);
        });
  for (const n in e) this.data(n, e[n]);
  return this;
}
C.data = iu;
function Co(e, t) {
  const n = e.documentElement;
  return Math.max(
    e.body[`scroll${t}`],
    n[`scroll${t}`],
    e.body[`offset${t}`],
    n[`offset${t}`],
    n[`client${t}`]
  );
}
ie([!0, !1], (e, t) => {
  ie(["Width", "Height"], (n, r) => {
    const i = `${t ? "outer" : "inner"}${r}`;
    C[i] = function (o) {
      if (!!this[0])
        return St(this[0])
          ? t
            ? this[0][`inner${r}`]
            : this[0].document.documentElement[`client${r}`]
          : Ot(this[0])
          ? Co(this[0], r)
          : this[0][`${t ? "offset" : "client"}${r}`] +
            (o && t
              ? xe(this[0], `margin${n ? "Top" : "Left"}`) +
                xe(this[0], `margin${n ? "Bottom" : "Right"}`)
              : 0);
    };
  });
});
ie(["Width", "Height"], (e, t) => {
  const n = t.toLowerCase();
  C[n] = function (r) {
    if (!this[0]) return he(r) ? void 0 : this;
    if (!arguments.length)
      return St(this[0])
        ? this[0].document.documentElement[`client${t}`]
        : Ot(this[0])
        ? Co(this[0], t)
        : this[0].getBoundingClientRect()[n] - ds(this[0], !e);
    const i = parseInt(r, 10);
    return this.each((o, a) => {
      if (!ne(a)) return;
      const u = Re(a, "boxSizing");
      a.style[n] = xo(n, i + (u === "border-box" ? ds(a, !e) : 0));
    });
  };
});
const ms = "___cd";
C.toggle = function (e) {
  return this.each((t, n) => {
    if (!ne(n)) return;
    (he(e) ? hs(n) : e)
      ? ((n.style.display = n[ms] || ""),
        hs(n) && (n.style.display = Bl(n.tagName)))
      : ((n[ms] = Re(n, "display")), (n.style.display = "none"));
  });
};
C.hide = function () {
  return this.toggle(!1);
};
C.show = function () {
  return this.toggle(!0);
};
const gs = "___ce",
  hi = ".",
  pi = { focus: "focusin", blur: "focusout" },
  Do = { mouseenter: "mouseover", mouseleave: "mouseout" },
  su = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
function _i(e) {
  return Do[e] || pi[e] || e;
}
function mi(e) {
  const t = e.split(hi);
  return [t[0], t.slice(1).sort()];
}
C.trigger = function (e, t) {
  if (de(e)) {
    const [r, i] = mi(e),
      o = _i(r);
    if (!o) return this;
    const a = su.test(o) ? "MouseEvents" : "HTMLEvents";
    (e = Pe.createEvent(a)),
      e.initEvent(o, !0, !0),
      (e.namespace = i.join(hi)),
      (e.___ot = r);
  }
  e.___td = t;
  const n = e.___ot in pi;
  return this.each((r, i) => {
    n &&
      ht(i[e.___ot]) &&
      ((i[`___i${e.type}`] = !0), i[e.___ot](), (i[`___i${e.type}`] = !1)),
      i.dispatchEvent(e);
  });
};
function No(e) {
  return (e[gs] = e[gs] || {});
}
function ou(e, t, n, r, i) {
  const o = No(e);
  (o[t] = o[t] || []), o[t].push([n, r, i]), e.addEventListener(t, i);
}
function Mo(e, t) {
  return !t || !ci.call(t, (n) => e.indexOf(n) < 0);
}
function Nn(e, t, n, r, i) {
  const o = No(e);
  if (t)
    o[t] &&
      (o[t] = o[t].filter(([a, u, f]) => {
        if ((i && f.guid !== i.guid) || !Mo(a, n) || (r && r !== u)) return !0;
        e.removeEventListener(t, f);
      }));
  else for (t in o) Nn(e, t, n, r, i);
}
C.off = function (e, t, n) {
  if (he(e))
    this.each((r, i) => {
      (!ne(i) && !Ot(i) && !St(i)) || Nn(i);
    });
  else if (de(e))
    ht(t) && ((n = t), (t = "")),
      ie(jn(e), (r, i) => {
        const [o, a] = mi(i),
          u = _i(o);
        this.each((f, d) => {
          (!ne(d) && !Ot(d) && !St(d)) || Nn(d, u, a, t, n);
        });
      });
  else for (const r in e) this.off(r, e[r]);
  return this;
};
C.remove = function (e) {
  return qe(this, e).detach().off(), this;
};
C.replaceWith = function (e) {
  return this.before(e).remove();
};
C.replaceAll = function (e) {
  return H(e).replaceWith(this), this;
};
function au(e, t, n, r, i) {
  if (!de(e)) {
    for (const o in e) this.on(o, t, n, e[o], i);
    return this;
  }
  return (
    de(t) ||
      (he(t) || Zt(t)
        ? (t = "")
        : he(n)
        ? ((n = t), (t = ""))
        : ((r = n), (n = t), (t = ""))),
    ht(r) || ((r = n), (n = void 0)),
    r
      ? (ie(jn(e), (o, a) => {
          const [u, f] = mi(a),
            d = _i(u),
            g = u in Do,
            s = u in pi;
          !d ||
            this.each((c, l) => {
              if (!ne(l) && !Ot(l) && !St(l)) return;
              const h = function (_) {
                if (_.target[`___i${_.type}`])
                  return _.stopImmediatePropagation();
                if (
                  (_.namespace && !Mo(f, _.namespace.split(hi))) ||
                  (!t &&
                    ((s && (_.target !== l || _.___ot === d)) ||
                      (g && _.relatedTarget && l.contains(_.relatedTarget))))
                )
                  return;
                let p = l;
                if (t) {
                  let E = _.target;
                  for (; !Ao(E, t); )
                    if (E === l || ((E = E.parentNode), !E)) return;
                  p = E;
                }
                Object.defineProperty(_, "currentTarget", {
                  configurable: !0,
                  get() {
                    return p;
                  },
                }),
                  Object.defineProperty(_, "delegateTarget", {
                    configurable: !0,
                    get() {
                      return l;
                    },
                  }),
                  Object.defineProperty(_, "data", {
                    configurable: !0,
                    get() {
                      return n;
                    },
                  });
                const m = r.call(p, _, _.___td);
                i && Nn(l, d, f, t, h),
                  m === !1 && (_.preventDefault(), _.stopPropagation());
              };
              (h.guid = r.guid = r.guid || H.guid++), ou(l, d, f, t, h);
            });
        }),
        this)
      : this
  );
}
C.on = au;
function cu(e, t, n, r) {
  return this.on(e, t, n, r, !0);
}
C.one = cu;
const lu = /\r?\n/g;
function uu(e, t) {
  return `&${encodeURIComponent(e)}=${encodeURIComponent(
    t.replace(
      lu,
      `\r
`
    )
  )}`;
}
const fu = /file|reset|submit|button|image/i,
  Lo = /radio|checkbox/i;
C.serialize = function () {
  let e = "";
  return (
    this.each((t, n) => {
      ie(n.elements || [n], (r, i) => {
        if (
          i.disabled ||
          !i.name ||
          i.tagName === "FIELDSET" ||
          fu.test(i.type) ||
          (Lo.test(i.type) && !i.checked)
        )
          return;
        const o = So(i);
        if (!he(o)) {
          const a = Fn(o) ? o : [o];
          ie(a, (u, f) => {
            e += uu(i.name, f);
          });
        }
      });
    }),
    e.slice(1)
  );
};
nn.extend(_o);
function du() {
  let e = document.querySelectorAll("[data-time]");
  for (const t of e) {
    let n = t.dataset.time,
      r = t.dataset.timeFormat;
    t.innerText = nn(n).format(r);
  }
}
function hu(e, t) {
  H(t).select(),
    document.execCommand("copy"),
    H(e.target).tooltip({ title: "Copied!", trigger: "manual" }),
    H(e.target).tooltip("show"),
    setTimeout(function () {
      H(e.target).tooltip("hide");
    }, 1500);
}
function pu(e) {
  let t = 0,
    n,
    r,
    i;
  if (e.length === 0) return t;
  for (n = 0, i = e.length; n < i; n++)
    (r = e.charCodeAt(n)), (t = (t << 5) - t + r), (t |= 0);
  return t;
}
function _u(e) {
  let t = 0;
  for (let o = 0; o < e.length; o++)
    (t = e.charCodeAt(o) + ((t << 5) - t)), (t = t & t);
  let n = ((t % 360) + 360) % 360,
    r = (((t % 25) + 25) % 25) + 75,
    i = (((t % 20) + 20) % 20) + 40;
  return `hsl(${n}, ${r}%, ${i}%)`;
}
async function Io(e = {}) {
  let t = "/api/v1/challenges";
  if (Object.keys(e).length !== 0) {
    let o = new URLSearchParams(e).toString();
    t = `${t}?${o}`;
  }
  let i = (await (await M.fetch(t, { method: "GET" })).json()).data;
  return (
    M._functions.challenges.sortChallenges &&
      (i = M._functions.challenges.sortChallenges(i)),
    i
  );
}
async function ko(e) {
  return (
    await (await M.fetch(`/api/v1/challenges/${e}`, { method: "GET" })).json()
  ).data;
}
async function mu() {
  let e = await Io();
  M._functions.challenges.displayChallenges &&
    M._functions.challenges.displayChallenges(e);
}
const Po = (e) =>
  new Promise((t, n) => {
    const r = document.querySelector(`script[src='${e}']`);
    r && r.remove();
    const i = document.createElement("script");
    document.body.appendChild(i),
      (i.onload = t),
      (i.onerror = n),
      (i.async = !0),
      (i.src = e);
  });
async function gu(e, t) {
  M._internal.challenge = {};
  let n = M.config,
    r = await ko(e);
  M._functions.challenge.displayChallenge &&
    M._functions.challenge.displayChallenge(r),
    Po(n.urlRoot + r.type_data.scripts.view).then(() => {
      const o = M._internal.challenge;
      (o.data = r),
        o.preRender(),
        M._functions.challenge.renderChallenge
          ? M._functions.challenge.renderChallenge(o)
          : t && t(o),
        o.postRender();
    });
}
async function vu(e, t, n = !1) {
  if (M._functions.challenge.submitChallenge) {
    M._functions.challenge.submitChallenge(e, t);
    return;
  }
  let r = "/api/v1/challenges/attempt";
  (n === !0 || M.config.preview === !0) && (r += "?preview=true");
  const o = await (
    await M.fetch(r, {
      method: "POST",
      body: JSON.stringify({ challenge_id: e, submission: t }),
    })
  ).json();
  return (
    M._functions.challenge.displaySubmissionResponse &&
      M._functions.challenge.displaySubmissionResponse(o),
    o
  );
}
async function Ro(e) {
  return await (await M.fetch(`/api/v1/hints/${e}`, { method: "GET" })).json();
}
async function Ho(e) {
  return await (
    await M.fetch("/api/v1/unlocks", {
      method: "POST",
      body: JSON.stringify({ target: e, type: "hints" }),
    })
  ).json();
}
async function Bo(e) {
  let n = (await Ro(e)).data;
  if (n.content) {
    M._functions.challenge.displayHint(n);
    return;
  }
  if (await Fo(n)) {
    let i = Ho(e);
    i.success ? await Bo(e) : M._functions.challenge.displayUnlockError(i);
  }
}
async function Fo(e) {
  return M._functions.challenge.displayUnlock(e);
}
async function Vo(e) {
  return (
    await (
      await M.fetch(`/api/v1/challenges/${e}/solves`, { method: "GET" })
    ).json()
  ).data;
}
async function yu(e) {
  let t = await Vo(e);
  M._functions.challenge.displaySolves &&
    M._functions.challenge.displaySolves(t);
}
async function bu(e = null) {
  let t = "/api/v1/scoreboard";
  return (
    e && (t = `${t}?bracket_id=${e}`),
    (await (await M.fetch(t, { method: "GET" })).json()).data
  );
}
async function Eu(e, t = null) {
  let n = `/api/v1/scoreboard/top/${e}`;
  return (
    t && (n = `${n}?bracket_id=${t}`),
    (await (await M.fetch(n, { method: "GET" })).json()).data
  );
}
async function wu(e) {
  return (
    await (
      await M.fetch(`/api/v1/brackets?type=${e}`, { method: "GET" })
    ).json()
  ).data;
}
async function Au(e) {
  return await (
    await M.fetch("/api/v1/users/me", {
      method: "PATCH",
      body: JSON.stringify(e),
    })
  ).json();
}
async function Tu(e) {
  return await (
    await M.fetch("/api/v1/tokens", { method: "POST", body: JSON.stringify(e) })
  ).json();
}
async function Su(e) {
  return await (
    await M.fetch(`/api/v1/tokens/${e}`, { method: "DELETE" })
  ).json();
}
async function Ou(e) {
  return await (
    await M.fetch(`/api/v1/users/${e}/solves`, { method: "GET" })
  ).json();
}
async function xu(e) {
  return await (
    await M.fetch(`/api/v1/users/${e}/fails`, { method: "GET" })
  ).json();
}
async function $u(e) {
  return await (
    await M.fetch(`/api/v1/users/${e}/awards`, { method: "GET" })
  ).json();
}
async function Cu() {
  return await (
    await M.fetch("/api/v1/teams/me/members", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  ).json();
}
async function Du() {
  return await (await M.fetch("/api/v1/teams/me", { method: "DELETE" })).json();
}
async function Nu(e) {
  return await (
    await M.fetch("/api/v1/teams/me", {
      method: "PATCH",
      body: JSON.stringify(e),
    })
  ).json();
}
async function Mu(e) {
  return await (
    await M.fetch(`/api/v1/teams/${e}/solves`, { method: "GET" })
  ).json();
}
async function Lu(e) {
  return await (
    await M.fetch(`/api/v1/teams/${e}/fails`, { method: "GET" })
  ).json();
}
async function Iu(e) {
  return await (
    await M.fetch(`/api/v1/teams/${e}/awards`, { method: "GET" })
  ).json();
}
function ku(e) {
  const t = document.createElement("template");
  return (t.innerHTML = e.trim()), t.content.firstChild;
}
function jo(e) {
  const t = document.createElement("div");
  return (t.innerText = e), t.innerHTML;
}
class Pu {
  constructor() {
    (this.id = Math.random()),
      (this.isMaster = !1),
      (this.others = {}),
      window.addEventListener("storage", this),
      window.addEventListener("unload", this),
      this.broadcast("hello"),
      setTimeout(this.check.bind(this), 500),
      (this._checkInterval = setInterval(this.check.bind(this), 9e3)),
      (this._pingInterval = setInterval(this.sendPing.bind(this), 17e3));
  }
  destroy() {
    clearInterval(this._pingInterval),
      clearInterval(this._checkInterval),
      window.removeEventListener("storage", this),
      window.removeEventListener("unload", this),
      this.broadcast("bye");
  }
  handleEvent(t) {
    if (t.type === "unload") {
      this.destroy();
      return;
    }
    if (t.type === "broadcast")
      try {
        const n = JSON.parse(t.newValue);
        n.id !== this.id && this[n.type](n);
      } catch (n) {
        console.error(n);
      }
  }
  sendPing() {
    this.broadcast("ping");
  }
  hello(t) {
    if ((this.ping(t), t.id < this.id)) {
      this.check();
      return;
    }
    this.sendPing();
  }
  ping(t) {
    this.others[t.id] = Date.now();
  }
  bye(t) {
    delete this.others[t.id], this.check();
  }
  check() {
    const t = Date.now();
    let n = !0;
    for (const r in this.others)
      this.others[r] + 23e3 < t
        ? delete this.others[r]
        : r < this.id && (n = !1);
    this.isMaster !== n && ((this.isMaster = n), this.masterDidChange());
  }
  masterDidChange() {}
  broadcast(t, n) {
    const r = { id: this.id, type: t, ...n };
    try {
      localStorage.setItem("broadcast", JSON.stringify(r));
    } catch (i) {
      console.error(i);
    }
  }
}
var Wo = {};
/*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */ (function (e) {
  (function () {
    var t = function () {
      this.init();
    };
    t.prototype = {
      init: function () {
        var s = this || n;
        return (
          (s._counter = 1e3),
          (s._html5AudioPool = []),
          (s.html5PoolSize = 10),
          (s._codecs = {}),
          (s._howls = []),
          (s._muted = !1),
          (s._volume = 1),
          (s._canPlayEvent = "canplaythrough"),
          (s._navigator =
            typeof window < "u" && window.navigator ? window.navigator : null),
          (s.masterGain = null),
          (s.noAudio = !1),
          (s.usingWebAudio = !0),
          (s.autoSuspend = !0),
          (s.ctx = null),
          (s.autoUnlock = !0),
          s._setup(),
          s
        );
      },
      volume: function (s) {
        var c = this || n;
        if (
          ((s = parseFloat(s)),
          c.ctx || g(),
          typeof s < "u" && s >= 0 && s <= 1)
        ) {
          if (((c._volume = s), c._muted)) return c;
          c.usingWebAudio &&
            c.masterGain.gain.setValueAtTime(s, n.ctx.currentTime);
          for (var l = 0; l < c._howls.length; l++)
            if (!c._howls[l]._webAudio)
              for (
                var h = c._howls[l]._getSoundIds(), _ = 0;
                _ < h.length;
                _++
              ) {
                var p = c._howls[l]._soundById(h[_]);
                p && p._node && (p._node.volume = p._volume * s);
              }
          return c;
        }
        return c._volume;
      },
      mute: function (s) {
        var c = this || n;
        c.ctx || g(),
          (c._muted = s),
          c.usingWebAudio &&
            c.masterGain.gain.setValueAtTime(
              s ? 0 : c._volume,
              n.ctx.currentTime
            );
        for (var l = 0; l < c._howls.length; l++)
          if (!c._howls[l]._webAudio)
            for (var h = c._howls[l]._getSoundIds(), _ = 0; _ < h.length; _++) {
              var p = c._howls[l]._soundById(h[_]);
              p && p._node && (p._node.muted = s ? !0 : p._muted);
            }
        return c;
      },
      stop: function () {
        for (var s = this || n, c = 0; c < s._howls.length; c++)
          s._howls[c].stop();
        return s;
      },
      unload: function () {
        for (var s = this || n, c = s._howls.length - 1; c >= 0; c--)
          s._howls[c].unload();
        return (
          s.usingWebAudio &&
            s.ctx &&
            typeof s.ctx.close < "u" &&
            (s.ctx.close(), (s.ctx = null), g()),
          s
        );
      },
      codecs: function (s) {
        return (this || n)._codecs[s.replace(/^x-/, "")];
      },
      _setup: function () {
        var s = this || n;
        if (
          ((s.state = (s.ctx && s.ctx.state) || "suspended"),
          s._autoSuspend(),
          !s.usingWebAudio)
        )
          if (typeof Audio < "u")
            try {
              var c = new Audio();
              typeof c.oncanplaythrough > "u" && (s._canPlayEvent = "canplay");
            } catch {
              s.noAudio = !0;
            }
          else s.noAudio = !0;
        try {
          var c = new Audio();
          c.muted && (s.noAudio = !0);
        } catch {}
        return s.noAudio || s._setupCodecs(), s;
      },
      _setupCodecs: function () {
        var s = this || n,
          c = null;
        try {
          c = typeof Audio < "u" ? new Audio() : null;
        } catch {
          return s;
        }
        if (!c || typeof c.canPlayType != "function") return s;
        var l = c.canPlayType("audio/mpeg;").replace(/^no$/, ""),
          h = s._navigator ? s._navigator.userAgent : "",
          _ = h.match(/OPR\/([0-6].)/g),
          p = _ && parseInt(_[0].split("/")[1], 10) < 33,
          m = h.indexOf("Safari") !== -1 && h.indexOf("Chrome") === -1,
          E = h.match(/Version\/(.*?) /),
          O = m && E && parseInt(E[1], 10) < 15;
        return (
          (s._codecs = {
            mp3: !!(
              !p &&
              (l || c.canPlayType("audio/mp3;").replace(/^no$/, ""))
            ),
            mpeg: !!l,
            opus: !!c
              .canPlayType('audio/ogg; codecs="opus"')
              .replace(/^no$/, ""),
            ogg: !!c
              .canPlayType('audio/ogg; codecs="vorbis"')
              .replace(/^no$/, ""),
            oga: !!c
              .canPlayType('audio/ogg; codecs="vorbis"')
              .replace(/^no$/, ""),
            wav: !!(
              c.canPlayType('audio/wav; codecs="1"') ||
              c.canPlayType("audio/wav")
            ).replace(/^no$/, ""),
            aac: !!c.canPlayType("audio/aac;").replace(/^no$/, ""),
            caf: !!c.canPlayType("audio/x-caf;").replace(/^no$/, ""),
            m4a: !!(
              c.canPlayType("audio/x-m4a;") ||
              c.canPlayType("audio/m4a;") ||
              c.canPlayType("audio/aac;")
            ).replace(/^no$/, ""),
            m4b: !!(
              c.canPlayType("audio/x-m4b;") ||
              c.canPlayType("audio/m4b;") ||
              c.canPlayType("audio/aac;")
            ).replace(/^no$/, ""),
            mp4: !!(
              c.canPlayType("audio/x-mp4;") ||
              c.canPlayType("audio/mp4;") ||
              c.canPlayType("audio/aac;")
            ).replace(/^no$/, ""),
            weba: !!(
              !O &&
              c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
            ),
            webm: !!(
              !O &&
              c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
            ),
            dolby: !!c
              .canPlayType('audio/mp4; codecs="ec-3"')
              .replace(/^no$/, ""),
            flac: !!(
              c.canPlayType("audio/x-flac;") || c.canPlayType("audio/flac;")
            ).replace(/^no$/, ""),
          }),
          s
        );
      },
      _unlockAudio: function () {
        var s = this || n;
        if (!(s._audioUnlocked || !s.ctx)) {
          (s._audioUnlocked = !1),
            (s.autoUnlock = !1),
            !s._mobileUnloaded &&
              s.ctx.sampleRate !== 44100 &&
              ((s._mobileUnloaded = !0), s.unload()),
            (s._scratchBuffer = s.ctx.createBuffer(1, 1, 22050));
          var c = function (l) {
            for (; s._html5AudioPool.length < s.html5PoolSize; )
              try {
                var h = new Audio();
                (h._unlocked = !0), s._releaseHtml5Audio(h);
              } catch {
                s.noAudio = !0;
                break;
              }
            for (var _ = 0; _ < s._howls.length; _++)
              if (!s._howls[_]._webAudio)
                for (
                  var p = s._howls[_]._getSoundIds(), m = 0;
                  m < p.length;
                  m++
                ) {
                  var E = s._howls[_]._soundById(p[m]);
                  E &&
                    E._node &&
                    !E._node._unlocked &&
                    ((E._node._unlocked = !0), E._node.load());
                }
            s._autoResume();
            var O = s.ctx.createBufferSource();
            (O.buffer = s._scratchBuffer),
              O.connect(s.ctx.destination),
              typeof O.start > "u" ? O.noteOn(0) : O.start(0),
              typeof s.ctx.resume == "function" && s.ctx.resume(),
              (O.onended = function () {
                O.disconnect(0),
                  (s._audioUnlocked = !0),
                  document.removeEventListener("touchstart", c, !0),
                  document.removeEventListener("touchend", c, !0),
                  document.removeEventListener("click", c, !0),
                  document.removeEventListener("keydown", c, !0);
                for (var D = 0; D < s._howls.length; D++)
                  s._howls[D]._emit("unlock");
              });
          };
          return (
            document.addEventListener("touchstart", c, !0),
            document.addEventListener("touchend", c, !0),
            document.addEventListener("click", c, !0),
            document.addEventListener("keydown", c, !0),
            s
          );
        }
      },
      _obtainHtml5Audio: function () {
        var s = this || n;
        if (s._html5AudioPool.length) return s._html5AudioPool.pop();
        var c = new Audio().play();
        return (
          c &&
            typeof Promise < "u" &&
            (c instanceof Promise || typeof c.then == "function") &&
            c.catch(function () {
              console.warn(
                "HTML5 Audio pool exhausted, returning potentially locked audio object."
              );
            }),
          new Audio()
        );
      },
      _releaseHtml5Audio: function (s) {
        var c = this || n;
        return s._unlocked && c._html5AudioPool.push(s), c;
      },
      _autoSuspend: function () {
        var s = this;
        if (
          !(
            !s.autoSuspend ||
            !s.ctx ||
            typeof s.ctx.suspend > "u" ||
            !n.usingWebAudio
          )
        ) {
          for (var c = 0; c < s._howls.length; c++)
            if (s._howls[c]._webAudio) {
              for (var l = 0; l < s._howls[c]._sounds.length; l++)
                if (!s._howls[c]._sounds[l]._paused) return s;
            }
          return (
            s._suspendTimer && clearTimeout(s._suspendTimer),
            (s._suspendTimer = setTimeout(function () {
              if (!!s.autoSuspend) {
                (s._suspendTimer = null), (s.state = "suspending");
                var h = function () {
                  (s.state = "suspended"),
                    s._resumeAfterSuspend &&
                      (delete s._resumeAfterSuspend, s._autoResume());
                };
                s.ctx.suspend().then(h, h);
              }
            }, 3e4)),
            s
          );
        }
      },
      _autoResume: function () {
        var s = this;
        if (!(!s.ctx || typeof s.ctx.resume > "u" || !n.usingWebAudio))
          return (
            s.state === "running" &&
            s.ctx.state !== "interrupted" &&
            s._suspendTimer
              ? (clearTimeout(s._suspendTimer), (s._suspendTimer = null))
              : s.state === "suspended" ||
                (s.state === "running" && s.ctx.state === "interrupted")
              ? (s.ctx.resume().then(function () {
                  s.state = "running";
                  for (var c = 0; c < s._howls.length; c++)
                    s._howls[c]._emit("resume");
                }),
                s._suspendTimer &&
                  (clearTimeout(s._suspendTimer), (s._suspendTimer = null)))
              : s.state === "suspending" && (s._resumeAfterSuspend = !0),
            s
          );
      },
    };
    var n = new t(),
      r = function (s) {
        var c = this;
        if (!s.src || s.src.length === 0) {
          console.error(
            "An array of source files must be passed with any new Howl."
          );
          return;
        }
        c.init(s);
      };
    r.prototype = {
      init: function (s) {
        var c = this;
        return (
          n.ctx || g(),
          (c._autoplay = s.autoplay || !1),
          (c._format = typeof s.format != "string" ? s.format : [s.format]),
          (c._html5 = s.html5 || !1),
          (c._muted = s.mute || !1),
          (c._loop = s.loop || !1),
          (c._pool = s.pool || 5),
          (c._preload =
            typeof s.preload == "boolean" || s.preload === "metadata"
              ? s.preload
              : !0),
          (c._rate = s.rate || 1),
          (c._sprite = s.sprite || {}),
          (c._src = typeof s.src != "string" ? s.src : [s.src]),
          (c._volume = s.volume !== void 0 ? s.volume : 1),
          (c._xhr = {
            method: s.xhr && s.xhr.method ? s.xhr.method : "GET",
            headers: s.xhr && s.xhr.headers ? s.xhr.headers : null,
            withCredentials:
              s.xhr && s.xhr.withCredentials ? s.xhr.withCredentials : !1,
          }),
          (c._duration = 0),
          (c._state = "unloaded"),
          (c._sounds = []),
          (c._endTimers = {}),
          (c._queue = []),
          (c._playLock = !1),
          (c._onend = s.onend ? [{ fn: s.onend }] : []),
          (c._onfade = s.onfade ? [{ fn: s.onfade }] : []),
          (c._onload = s.onload ? [{ fn: s.onload }] : []),
          (c._onloaderror = s.onloaderror ? [{ fn: s.onloaderror }] : []),
          (c._onplayerror = s.onplayerror ? [{ fn: s.onplayerror }] : []),
          (c._onpause = s.onpause ? [{ fn: s.onpause }] : []),
          (c._onplay = s.onplay ? [{ fn: s.onplay }] : []),
          (c._onstop = s.onstop ? [{ fn: s.onstop }] : []),
          (c._onmute = s.onmute ? [{ fn: s.onmute }] : []),
          (c._onvolume = s.onvolume ? [{ fn: s.onvolume }] : []),
          (c._onrate = s.onrate ? [{ fn: s.onrate }] : []),
          (c._onseek = s.onseek ? [{ fn: s.onseek }] : []),
          (c._onunlock = s.onunlock ? [{ fn: s.onunlock }] : []),
          (c._onresume = []),
          (c._webAudio = n.usingWebAudio && !c._html5),
          typeof n.ctx < "u" && n.ctx && n.autoUnlock && n._unlockAudio(),
          n._howls.push(c),
          c._autoplay &&
            c._queue.push({
              event: "play",
              action: function () {
                c.play();
              },
            }),
          c._preload && c._preload !== "none" && c.load(),
          c
        );
      },
      load: function () {
        var s = this,
          c = null;
        if (n.noAudio) {
          s._emit("loaderror", null, "No audio support.");
          return;
        }
        typeof s._src == "string" && (s._src = [s._src]);
        for (var l = 0; l < s._src.length; l++) {
          var h, _;
          if (s._format && s._format[l]) h = s._format[l];
          else {
            if (((_ = s._src[l]), typeof _ != "string")) {
              s._emit(
                "loaderror",
                null,
                "Non-string found in selected audio sources - ignoring."
              );
              continue;
            }
            (h = /^data:audio\/([^;,]+);/i.exec(_)),
              h || (h = /\.([^.]+)$/.exec(_.split("?", 1)[0])),
              h && (h = h[1].toLowerCase());
          }
          if (
            (h ||
              console.warn(
                'No file extension was found. Consider using the "format" property or specify an extension.'
              ),
            h && n.codecs(h))
          ) {
            c = s._src[l];
            break;
          }
        }
        if (!c) {
          s._emit(
            "loaderror",
            null,
            "No codec support for selected audio sources."
          );
          return;
        }
        return (
          (s._src = c),
          (s._state = "loading"),
          window.location.protocol === "https:" &&
            c.slice(0, 5) === "http:" &&
            ((s._html5 = !0), (s._webAudio = !1)),
          new i(s),
          s._webAudio && a(s),
          s
        );
      },
      play: function (s, c) {
        var l = this,
          h = null;
        if (typeof s == "number") (h = s), (s = null);
        else {
          if (typeof s == "string" && l._state === "loaded" && !l._sprite[s])
            return null;
          if (typeof s > "u" && ((s = "__default"), !l._playLock)) {
            for (var _ = 0, p = 0; p < l._sounds.length; p++)
              l._sounds[p]._paused &&
                !l._sounds[p]._ended &&
                (_++, (h = l._sounds[p]._id));
            _ === 1 ? (s = null) : (h = null);
          }
        }
        var m = h ? l._soundById(h) : l._inactiveSound();
        if (!m) return null;
        if (
          (h && !s && (s = m._sprite || "__default"), l._state !== "loaded")
        ) {
          (m._sprite = s), (m._ended = !1);
          var E = m._id;
          return (
            l._queue.push({
              event: "play",
              action: function () {
                l.play(E);
              },
            }),
            E
          );
        }
        if (h && !m._paused) return c || l._loadQueue("play"), m._id;
        l._webAudio && n._autoResume();
        var O = Math.max(0, m._seek > 0 ? m._seek : l._sprite[s][0] / 1e3),
          D = Math.max(0, (l._sprite[s][0] + l._sprite[s][1]) / 1e3 - O),
          L = (D * 1e3) / Math.abs(m._rate),
          I = l._sprite[s][0] / 1e3,
          F = (l._sprite[s][0] + l._sprite[s][1]) / 1e3;
        (m._sprite = s), (m._ended = !1);
        var j = function () {
          (m._paused = !1),
            (m._seek = O),
            (m._start = I),
            (m._stop = F),
            (m._loop = !!(m._loop || l._sprite[s][2]));
        };
        if (O >= F) {
          l._ended(m);
          return;
        }
        var $ = m._node;
        if (l._webAudio) {
          var N = function () {
            (l._playLock = !1), j(), l._refreshBuffer(m);
            var b = m._muted || l._muted ? 0 : m._volume;
            $.gain.setValueAtTime(b, n.ctx.currentTime),
              (m._playStart = n.ctx.currentTime),
              typeof $.bufferSource.start > "u"
                ? m._loop
                  ? $.bufferSource.noteGrainOn(0, O, 86400)
                  : $.bufferSource.noteGrainOn(0, O, D)
                : m._loop
                ? $.bufferSource.start(0, O, 86400)
                : $.bufferSource.start(0, O, D),
              L !== 1 / 0 &&
                (l._endTimers[m._id] = setTimeout(l._ended.bind(l, m), L)),
              c ||
                setTimeout(function () {
                  l._emit("play", m._id), l._loadQueue();
                }, 0);
          };
          n.state === "running" && n.ctx.state !== "interrupted"
            ? N()
            : ((l._playLock = !0), l.once("resume", N), l._clearTimer(m._id));
        } else {
          var Y = function () {
            ($.currentTime = O),
              ($.muted = m._muted || l._muted || n._muted || $.muted),
              ($.volume = m._volume * n.volume()),
              ($.playbackRate = m._rate);
            try {
              var b = $.play();
              if (
                (b &&
                typeof Promise < "u" &&
                (b instanceof Promise || typeof b.then == "function")
                  ? ((l._playLock = !0),
                    j(),
                    b
                      .then(function () {
                        (l._playLock = !1),
                          ($._unlocked = !0),
                          c ? l._loadQueue() : l._emit("play", m._id);
                      })
                      .catch(function () {
                        (l._playLock = !1),
                          l._emit(
                            "playerror",
                            m._id,
                            "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                          ),
                          (m._ended = !0),
                          (m._paused = !0);
                      }))
                  : c || ((l._playLock = !1), j(), l._emit("play", m._id)),
                ($.playbackRate = m._rate),
                $.paused)
              ) {
                l._emit(
                  "playerror",
                  m._id,
                  "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."
                );
                return;
              }
              s !== "__default" || m._loop
                ? (l._endTimers[m._id] = setTimeout(l._ended.bind(l, m), L))
                : ((l._endTimers[m._id] = function () {
                    l._ended(m),
                      $.removeEventListener("ended", l._endTimers[m._id], !1);
                  }),
                  $.addEventListener("ended", l._endTimers[m._id], !1));
            } catch (v) {
              l._emit("playerror", m._id, v);
            }
          };
          $.src ===
            "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" &&
            (($.src = l._src), $.load());
          var Q =
            (window && window.ejecta) ||
            (!$.readyState && n._navigator.isCocoonJS);
          if ($.readyState >= 3 || Q) Y();
          else {
            (l._playLock = !0), (l._state = "loading");
            var A = function () {
              (l._state = "loaded"),
                Y(),
                $.removeEventListener(n._canPlayEvent, A, !1);
            };
            $.addEventListener(n._canPlayEvent, A, !1), l._clearTimer(m._id);
          }
        }
        return m._id;
      },
      pause: function (s) {
        var c = this;
        if (c._state !== "loaded" || c._playLock)
          return (
            c._queue.push({
              event: "pause",
              action: function () {
                c.pause(s);
              },
            }),
            c
          );
        for (var l = c._getSoundIds(s), h = 0; h < l.length; h++) {
          c._clearTimer(l[h]);
          var _ = c._soundById(l[h]);
          if (
            _ &&
            !_._paused &&
            ((_._seek = c.seek(l[h])),
            (_._rateSeek = 0),
            (_._paused = !0),
            c._stopFade(l[h]),
            _._node)
          )
            if (c._webAudio) {
              if (!_._node.bufferSource) continue;
              typeof _._node.bufferSource.stop > "u"
                ? _._node.bufferSource.noteOff(0)
                : _._node.bufferSource.stop(0),
                c._cleanBuffer(_._node);
            } else
              (!isNaN(_._node.duration) || _._node.duration === 1 / 0) &&
                _._node.pause();
          arguments[1] || c._emit("pause", _ ? _._id : null);
        }
        return c;
      },
      stop: function (s, c) {
        var l = this;
        if (l._state !== "loaded" || l._playLock)
          return (
            l._queue.push({
              event: "stop",
              action: function () {
                l.stop(s);
              },
            }),
            l
          );
        for (var h = l._getSoundIds(s), _ = 0; _ < h.length; _++) {
          l._clearTimer(h[_]);
          var p = l._soundById(h[_]);
          p &&
            ((p._seek = p._start || 0),
            (p._rateSeek = 0),
            (p._paused = !0),
            (p._ended = !0),
            l._stopFade(h[_]),
            p._node &&
              (l._webAudio
                ? p._node.bufferSource &&
                  (typeof p._node.bufferSource.stop > "u"
                    ? p._node.bufferSource.noteOff(0)
                    : p._node.bufferSource.stop(0),
                  l._cleanBuffer(p._node))
                : (!isNaN(p._node.duration) || p._node.duration === 1 / 0) &&
                  ((p._node.currentTime = p._start || 0),
                  p._node.pause(),
                  p._node.duration === 1 / 0 && l._clearSound(p._node))),
            c || l._emit("stop", p._id));
        }
        return l;
      },
      mute: function (s, c) {
        var l = this;
        if (l._state !== "loaded" || l._playLock)
          return (
            l._queue.push({
              event: "mute",
              action: function () {
                l.mute(s, c);
              },
            }),
            l
          );
        if (typeof c > "u")
          if (typeof s == "boolean") l._muted = s;
          else return l._muted;
        for (var h = l._getSoundIds(c), _ = 0; _ < h.length; _++) {
          var p = l._soundById(h[_]);
          p &&
            ((p._muted = s),
            p._interval && l._stopFade(p._id),
            l._webAudio && p._node
              ? p._node.gain.setValueAtTime(
                  s ? 0 : p._volume,
                  n.ctx.currentTime
                )
              : p._node && (p._node.muted = n._muted ? !0 : s),
            l._emit("mute", p._id));
        }
        return l;
      },
      volume: function () {
        var s = this,
          c = arguments,
          l,
          h;
        if (c.length === 0) return s._volume;
        if (c.length === 1 || (c.length === 2 && typeof c[1] > "u")) {
          var _ = s._getSoundIds(),
            p = _.indexOf(c[0]);
          p >= 0 ? (h = parseInt(c[0], 10)) : (l = parseFloat(c[0]));
        } else
          c.length >= 2 && ((l = parseFloat(c[0])), (h = parseInt(c[1], 10)));
        var m;
        if (typeof l < "u" && l >= 0 && l <= 1) {
          if (s._state !== "loaded" || s._playLock)
            return (
              s._queue.push({
                event: "volume",
                action: function () {
                  s.volume.apply(s, c);
                },
              }),
              s
            );
          typeof h > "u" && (s._volume = l), (h = s._getSoundIds(h));
          for (var E = 0; E < h.length; E++)
            (m = s._soundById(h[E])),
              m &&
                ((m._volume = l),
                c[2] || s._stopFade(h[E]),
                s._webAudio && m._node && !m._muted
                  ? m._node.gain.setValueAtTime(l, n.ctx.currentTime)
                  : m._node && !m._muted && (m._node.volume = l * n.volume()),
                s._emit("volume", m._id));
        } else
          return (m = h ? s._soundById(h) : s._sounds[0]), m ? m._volume : 0;
        return s;
      },
      fade: function (s, c, l, h) {
        var _ = this;
        if (_._state !== "loaded" || _._playLock)
          return (
            _._queue.push({
              event: "fade",
              action: function () {
                _.fade(s, c, l, h);
              },
            }),
            _
          );
        (s = Math.min(Math.max(0, parseFloat(s)), 1)),
          (c = Math.min(Math.max(0, parseFloat(c)), 1)),
          (l = parseFloat(l)),
          _.volume(s, h);
        for (var p = _._getSoundIds(h), m = 0; m < p.length; m++) {
          var E = _._soundById(p[m]);
          if (E) {
            if ((h || _._stopFade(p[m]), _._webAudio && !E._muted)) {
              var O = n.ctx.currentTime,
                D = O + l / 1e3;
              (E._volume = s),
                E._node.gain.setValueAtTime(s, O),
                E._node.gain.linearRampToValueAtTime(c, D);
            }
            _._startFadeInterval(E, s, c, l, p[m], typeof h > "u");
          }
        }
        return _;
      },
      _startFadeInterval: function (s, c, l, h, _, p) {
        var m = this,
          E = c,
          O = l - c,
          D = Math.abs(O / 0.01),
          L = Math.max(4, D > 0 ? h / D : h),
          I = Date.now();
        (s._fadeTo = l),
          (s._interval = setInterval(function () {
            var F = (Date.now() - I) / h;
            (I = Date.now()),
              (E += O * F),
              (E = Math.round(E * 100) / 100),
              O < 0 ? (E = Math.max(l, E)) : (E = Math.min(l, E)),
              m._webAudio ? (s._volume = E) : m.volume(E, s._id, !0),
              p && (m._volume = E),
              ((l < c && E <= l) || (l > c && E >= l)) &&
                (clearInterval(s._interval),
                (s._interval = null),
                (s._fadeTo = null),
                m.volume(l, s._id),
                m._emit("fade", s._id));
          }, L));
      },
      _stopFade: function (s) {
        var c = this,
          l = c._soundById(s);
        return (
          l &&
            l._interval &&
            (c._webAudio &&
              l._node.gain.cancelScheduledValues(n.ctx.currentTime),
            clearInterval(l._interval),
            (l._interval = null),
            c.volume(l._fadeTo, s),
            (l._fadeTo = null),
            c._emit("fade", s)),
          c
        );
      },
      loop: function () {
        var s = this,
          c = arguments,
          l,
          h,
          _;
        if (c.length === 0) return s._loop;
        if (c.length === 1)
          if (typeof c[0] == "boolean") (l = c[0]), (s._loop = l);
          else return (_ = s._soundById(parseInt(c[0], 10))), _ ? _._loop : !1;
        else c.length === 2 && ((l = c[0]), (h = parseInt(c[1], 10)));
        for (var p = s._getSoundIds(h), m = 0; m < p.length; m++)
          (_ = s._soundById(p[m])),
            _ &&
              ((_._loop = l),
              s._webAudio &&
                _._node &&
                _._node.bufferSource &&
                ((_._node.bufferSource.loop = l),
                l &&
                  ((_._node.bufferSource.loopStart = _._start || 0),
                  (_._node.bufferSource.loopEnd = _._stop),
                  s.playing(p[m]) && (s.pause(p[m], !0), s.play(p[m], !0)))));
        return s;
      },
      rate: function () {
        var s = this,
          c = arguments,
          l,
          h;
        if (c.length === 0) h = s._sounds[0]._id;
        else if (c.length === 1) {
          var _ = s._getSoundIds(),
            p = _.indexOf(c[0]);
          p >= 0 ? (h = parseInt(c[0], 10)) : (l = parseFloat(c[0]));
        } else
          c.length === 2 && ((l = parseFloat(c[0])), (h = parseInt(c[1], 10)));
        var m;
        if (typeof l == "number") {
          if (s._state !== "loaded" || s._playLock)
            return (
              s._queue.push({
                event: "rate",
                action: function () {
                  s.rate.apply(s, c);
                },
              }),
              s
            );
          typeof h > "u" && (s._rate = l), (h = s._getSoundIds(h));
          for (var E = 0; E < h.length; E++)
            if (((m = s._soundById(h[E])), m)) {
              s.playing(h[E]) &&
                ((m._rateSeek = s.seek(h[E])),
                (m._playStart = s._webAudio
                  ? n.ctx.currentTime
                  : m._playStart)),
                (m._rate = l),
                s._webAudio && m._node && m._node.bufferSource
                  ? m._node.bufferSource.playbackRate.setValueAtTime(
                      l,
                      n.ctx.currentTime
                    )
                  : m._node && (m._node.playbackRate = l);
              var O = s.seek(h[E]),
                D =
                  (s._sprite[m._sprite][0] + s._sprite[m._sprite][1]) / 1e3 - O,
                L = (D * 1e3) / Math.abs(m._rate);
              (s._endTimers[h[E]] || !m._paused) &&
                (s._clearTimer(h[E]),
                (s._endTimers[h[E]] = setTimeout(s._ended.bind(s, m), L))),
                s._emit("rate", m._id);
            }
        } else return (m = s._soundById(h)), m ? m._rate : s._rate;
        return s;
      },
      seek: function () {
        var s = this,
          c = arguments,
          l,
          h;
        if (c.length === 0) s._sounds.length && (h = s._sounds[0]._id);
        else if (c.length === 1) {
          var _ = s._getSoundIds(),
            p = _.indexOf(c[0]);
          p >= 0
            ? (h = parseInt(c[0], 10))
            : s._sounds.length &&
              ((h = s._sounds[0]._id), (l = parseFloat(c[0])));
        } else
          c.length === 2 && ((l = parseFloat(c[0])), (h = parseInt(c[1], 10)));
        if (typeof h > "u") return 0;
        if (typeof l == "number" && (s._state !== "loaded" || s._playLock))
          return (
            s._queue.push({
              event: "seek",
              action: function () {
                s.seek.apply(s, c);
              },
            }),
            s
          );
        var m = s._soundById(h);
        if (m)
          if (typeof l == "number" && l >= 0) {
            var E = s.playing(h);
            E && s.pause(h, !0),
              (m._seek = l),
              (m._ended = !1),
              s._clearTimer(h),
              !s._webAudio &&
                m._node &&
                !isNaN(m._node.duration) &&
                (m._node.currentTime = l);
            var O = function () {
              E && s.play(h, !0), s._emit("seek", h);
            };
            if (E && !s._webAudio) {
              var D = function () {
                s._playLock ? setTimeout(D, 0) : O();
              };
              setTimeout(D, 0);
            } else O();
          } else if (s._webAudio) {
            var L = s.playing(h) ? n.ctx.currentTime - m._playStart : 0,
              I = m._rateSeek ? m._rateSeek - m._seek : 0;
            return m._seek + (I + L * Math.abs(m._rate));
          } else return m._node.currentTime;
        return s;
      },
      playing: function (s) {
        var c = this;
        if (typeof s == "number") {
          var l = c._soundById(s);
          return l ? !l._paused : !1;
        }
        for (var h = 0; h < c._sounds.length; h++)
          if (!c._sounds[h]._paused) return !0;
        return !1;
      },
      duration: function (s) {
        var c = this,
          l = c._duration,
          h = c._soundById(s);
        return h && (l = c._sprite[h._sprite][1] / 1e3), l;
      },
      state: function () {
        return this._state;
      },
      unload: function () {
        for (var s = this, c = s._sounds, l = 0; l < c.length; l++)
          c[l]._paused || s.stop(c[l]._id),
            s._webAudio ||
              (s._clearSound(c[l]._node),
              c[l]._node.removeEventListener("error", c[l]._errorFn, !1),
              c[l]._node.removeEventListener(n._canPlayEvent, c[l]._loadFn, !1),
              c[l]._node.removeEventListener("ended", c[l]._endFn, !1),
              n._releaseHtml5Audio(c[l]._node)),
            delete c[l]._node,
            s._clearTimer(c[l]._id);
        var h = n._howls.indexOf(s);
        h >= 0 && n._howls.splice(h, 1);
        var _ = !0;
        for (l = 0; l < n._howls.length; l++)
          if (
            n._howls[l]._src === s._src ||
            s._src.indexOf(n._howls[l]._src) >= 0
          ) {
            _ = !1;
            break;
          }
        return (
          o && _ && delete o[s._src],
          (n.noAudio = !1),
          (s._state = "unloaded"),
          (s._sounds = []),
          (s = null),
          null
        );
      },
      on: function (s, c, l, h) {
        var _ = this,
          p = _["_on" + s];
        return (
          typeof c == "function" &&
            p.push(h ? { id: l, fn: c, once: h } : { id: l, fn: c }),
          _
        );
      },
      off: function (s, c, l) {
        var h = this,
          _ = h["_on" + s],
          p = 0;
        if ((typeof c == "number" && ((l = c), (c = null)), c || l))
          for (p = 0; p < _.length; p++) {
            var m = l === _[p].id;
            if ((c === _[p].fn && m) || (!c && m)) {
              _.splice(p, 1);
              break;
            }
          }
        else if (s) h["_on" + s] = [];
        else {
          var E = Object.keys(h);
          for (p = 0; p < E.length; p++)
            E[p].indexOf("_on") === 0 &&
              Array.isArray(h[E[p]]) &&
              (h[E[p]] = []);
        }
        return h;
      },
      once: function (s, c, l) {
        var h = this;
        return h.on(s, c, l, 1), h;
      },
      _emit: function (s, c, l) {
        for (var h = this, _ = h["_on" + s], p = _.length - 1; p >= 0; p--)
          (!_[p].id || _[p].id === c || s === "load") &&
            (setTimeout(
              function (m) {
                m.call(this, c, l);
              }.bind(h, _[p].fn),
              0
            ),
            _[p].once && h.off(s, _[p].fn, _[p].id));
        return h._loadQueue(s), h;
      },
      _loadQueue: function (s) {
        var c = this;
        if (c._queue.length > 0) {
          var l = c._queue[0];
          l.event === s && (c._queue.shift(), c._loadQueue()), s || l.action();
        }
        return c;
      },
      _ended: function (s) {
        var c = this,
          l = s._sprite;
        if (
          !c._webAudio &&
          s._node &&
          !s._node.paused &&
          !s._node.ended &&
          s._node.currentTime < s._stop
        )
          return setTimeout(c._ended.bind(c, s), 100), c;
        var h = !!(s._loop || c._sprite[l][2]);
        if (
          (c._emit("end", s._id),
          !c._webAudio && h && c.stop(s._id, !0).play(s._id),
          c._webAudio && h)
        ) {
          c._emit("play", s._id),
            (s._seek = s._start || 0),
            (s._rateSeek = 0),
            (s._playStart = n.ctx.currentTime);
          var _ = ((s._stop - s._start) * 1e3) / Math.abs(s._rate);
          c._endTimers[s._id] = setTimeout(c._ended.bind(c, s), _);
        }
        return (
          c._webAudio &&
            !h &&
            ((s._paused = !0),
            (s._ended = !0),
            (s._seek = s._start || 0),
            (s._rateSeek = 0),
            c._clearTimer(s._id),
            c._cleanBuffer(s._node),
            n._autoSuspend()),
          !c._webAudio && !h && c.stop(s._id, !0),
          c
        );
      },
      _clearTimer: function (s) {
        var c = this;
        if (c._endTimers[s]) {
          if (typeof c._endTimers[s] != "function")
            clearTimeout(c._endTimers[s]);
          else {
            var l = c._soundById(s);
            l &&
              l._node &&
              l._node.removeEventListener("ended", c._endTimers[s], !1);
          }
          delete c._endTimers[s];
        }
        return c;
      },
      _soundById: function (s) {
        for (var c = this, l = 0; l < c._sounds.length; l++)
          if (s === c._sounds[l]._id) return c._sounds[l];
        return null;
      },
      _inactiveSound: function () {
        var s = this;
        s._drain();
        for (var c = 0; c < s._sounds.length; c++)
          if (s._sounds[c]._ended) return s._sounds[c].reset();
        return new i(s);
      },
      _drain: function () {
        var s = this,
          c = s._pool,
          l = 0,
          h = 0;
        if (!(s._sounds.length < c)) {
          for (h = 0; h < s._sounds.length; h++) s._sounds[h]._ended && l++;
          for (h = s._sounds.length - 1; h >= 0; h--) {
            if (l <= c) return;
            s._sounds[h]._ended &&
              (s._webAudio &&
                s._sounds[h]._node &&
                s._sounds[h]._node.disconnect(0),
              s._sounds.splice(h, 1),
              l--);
          }
        }
      },
      _getSoundIds: function (s) {
        var c = this;
        if (typeof s > "u") {
          for (var l = [], h = 0; h < c._sounds.length; h++)
            l.push(c._sounds[h]._id);
          return l;
        } else return [s];
      },
      _refreshBuffer: function (s) {
        var c = this;
        return (
          (s._node.bufferSource = n.ctx.createBufferSource()),
          (s._node.bufferSource.buffer = o[c._src]),
          s._panner
            ? s._node.bufferSource.connect(s._panner)
            : s._node.bufferSource.connect(s._node),
          (s._node.bufferSource.loop = s._loop),
          s._loop &&
            ((s._node.bufferSource.loopStart = s._start || 0),
            (s._node.bufferSource.loopEnd = s._stop || 0)),
          s._node.bufferSource.playbackRate.setValueAtTime(
            s._rate,
            n.ctx.currentTime
          ),
          c
        );
      },
      _cleanBuffer: function (s) {
        var c = this,
          l = n._navigator && n._navigator.vendor.indexOf("Apple") >= 0;
        if (
          n._scratchBuffer &&
          s.bufferSource &&
          ((s.bufferSource.onended = null), s.bufferSource.disconnect(0), l)
        )
          try {
            s.bufferSource.buffer = n._scratchBuffer;
          } catch {}
        return (s.bufferSource = null), c;
      },
      _clearSound: function (s) {
        var c = /MSIE |Trident\//.test(n._navigator && n._navigator.userAgent);
        c ||
          (s.src =
            "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
      },
    };
    var i = function (s) {
      (this._parent = s), this.init();
    };
    i.prototype = {
      init: function () {
        var s = this,
          c = s._parent;
        return (
          (s._muted = c._muted),
          (s._loop = c._loop),
          (s._volume = c._volume),
          (s._rate = c._rate),
          (s._seek = 0),
          (s._paused = !0),
          (s._ended = !0),
          (s._sprite = "__default"),
          (s._id = ++n._counter),
          c._sounds.push(s),
          s.create(),
          s
        );
      },
      create: function () {
        var s = this,
          c = s._parent,
          l = n._muted || s._muted || s._parent._muted ? 0 : s._volume;
        return (
          c._webAudio
            ? ((s._node =
                typeof n.ctx.createGain > "u"
                  ? n.ctx.createGainNode()
                  : n.ctx.createGain()),
              s._node.gain.setValueAtTime(l, n.ctx.currentTime),
              (s._node.paused = !0),
              s._node.connect(n.masterGain))
            : n.noAudio ||
              ((s._node = n._obtainHtml5Audio()),
              (s._errorFn = s._errorListener.bind(s)),
              s._node.addEventListener("error", s._errorFn, !1),
              (s._loadFn = s._loadListener.bind(s)),
              s._node.addEventListener(n._canPlayEvent, s._loadFn, !1),
              (s._endFn = s._endListener.bind(s)),
              s._node.addEventListener("ended", s._endFn, !1),
              (s._node.src = c._src),
              (s._node.preload = c._preload === !0 ? "auto" : c._preload),
              (s._node.volume = l * n.volume()),
              s._node.load()),
          s
        );
      },
      reset: function () {
        var s = this,
          c = s._parent;
        return (
          (s._muted = c._muted),
          (s._loop = c._loop),
          (s._volume = c._volume),
          (s._rate = c._rate),
          (s._seek = 0),
          (s._rateSeek = 0),
          (s._paused = !0),
          (s._ended = !0),
          (s._sprite = "__default"),
          (s._id = ++n._counter),
          s
        );
      },
      _errorListener: function () {
        var s = this;
        s._parent._emit(
          "loaderror",
          s._id,
          s._node.error ? s._node.error.code : 0
        ),
          s._node.removeEventListener("error", s._errorFn, !1);
      },
      _loadListener: function () {
        var s = this,
          c = s._parent;
        (c._duration = Math.ceil(s._node.duration * 10) / 10),
          Object.keys(c._sprite).length === 0 &&
            (c._sprite = { __default: [0, c._duration * 1e3] }),
          c._state !== "loaded" &&
            ((c._state = "loaded"), c._emit("load"), c._loadQueue()),
          s._node.removeEventListener(n._canPlayEvent, s._loadFn, !1);
      },
      _endListener: function () {
        var s = this,
          c = s._parent;
        c._duration === 1 / 0 &&
          ((c._duration = Math.ceil(s._node.duration * 10) / 10),
          c._sprite.__default[1] === 1 / 0 &&
            (c._sprite.__default[1] = c._duration * 1e3),
          c._ended(s)),
          s._node.removeEventListener("ended", s._endFn, !1);
      },
    };
    var o = {},
      a = function (s) {
        var c = s._src;
        if (o[c]) {
          (s._duration = o[c].duration), d(s);
          return;
        }
        if (/^data:[^;]+;base64,/.test(c)) {
          for (
            var l = atob(c.split(",")[1]), h = new Uint8Array(l.length), _ = 0;
            _ < l.length;
            ++_
          )
            h[_] = l.charCodeAt(_);
          f(h.buffer, s);
        } else {
          var p = new XMLHttpRequest();
          p.open(s._xhr.method, c, !0),
            (p.withCredentials = s._xhr.withCredentials),
            (p.responseType = "arraybuffer"),
            s._xhr.headers &&
              Object.keys(s._xhr.headers).forEach(function (m) {
                p.setRequestHeader(m, s._xhr.headers[m]);
              }),
            (p.onload = function () {
              var m = (p.status + "")[0];
              if (m !== "0" && m !== "2" && m !== "3") {
                s._emit(
                  "loaderror",
                  null,
                  "Failed loading audio file with status: " + p.status + "."
                );
                return;
              }
              f(p.response, s);
            }),
            (p.onerror = function () {
              s._webAudio &&
                ((s._html5 = !0),
                (s._webAudio = !1),
                (s._sounds = []),
                delete o[c],
                s.load());
            }),
            u(p);
        }
      },
      u = function (s) {
        try {
          s.send();
        } catch {
          s.onerror();
        }
      },
      f = function (s, c) {
        var l = function () {
            c._emit("loaderror", null, "Decoding audio data failed.");
          },
          h = function (_) {
            _ && c._sounds.length > 0 ? ((o[c._src] = _), d(c, _)) : l();
          };
        typeof Promise < "u" && n.ctx.decodeAudioData.length === 1
          ? n.ctx.decodeAudioData(s).then(h).catch(l)
          : n.ctx.decodeAudioData(s, h, l);
      },
      d = function (s, c) {
        c && !s._duration && (s._duration = c.duration),
          Object.keys(s._sprite).length === 0 &&
            (s._sprite = { __default: [0, s._duration * 1e3] }),
          s._state !== "loaded" &&
            ((s._state = "loaded"), s._emit("load"), s._loadQueue());
      },
      g = function () {
        if (!!n.usingWebAudio) {
          try {
            typeof AudioContext < "u"
              ? (n.ctx = new AudioContext())
              : typeof webkitAudioContext < "u"
              ? (n.ctx = new webkitAudioContext())
              : (n.usingWebAudio = !1);
          } catch {
            n.usingWebAudio = !1;
          }
          n.ctx || (n.usingWebAudio = !1);
          var s = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform),
            c =
              n._navigator &&
              n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
            l = c ? parseInt(c[1], 10) : null;
          if (s && l && l < 9) {
            var h = /safari/.test(
              n._navigator && n._navigator.userAgent.toLowerCase()
            );
            n._navigator && !h && (n.usingWebAudio = !1);
          }
          n.usingWebAudio &&
            ((n.masterGain =
              typeof n.ctx.createGain > "u"
                ? n.ctx.createGainNode()
                : n.ctx.createGain()),
            n.masterGain.gain.setValueAtTime(
              n._muted ? 0 : n._volume,
              n.ctx.currentTime
            ),
            n.masterGain.connect(n.ctx.destination)),
            n._setup();
        }
      };
    (e.Howler = n),
      (e.Howl = r),
      typeof we < "u"
        ? ((we.HowlerGlobal = t),
          (we.Howler = n),
          (we.Howl = r),
          (we.Sound = i))
        : typeof window < "u" &&
          ((window.HowlerGlobal = t),
          (window.Howler = n),
          (window.Howl = r),
          (window.Sound = i));
  })();
  /*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *
   *  howler.js v2.2.3
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   */ (function () {
    (HowlerGlobal.prototype._pos = [0, 0, 0]),
      (HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0]),
      (HowlerGlobal.prototype.stereo = function (n) {
        var r = this;
        if (!r.ctx || !r.ctx.listener) return r;
        for (var i = r._howls.length - 1; i >= 0; i--) r._howls[i].stereo(n);
        return r;
      }),
      (HowlerGlobal.prototype.pos = function (n, r, i) {
        var o = this;
        if (!o.ctx || !o.ctx.listener) return o;
        if (
          ((r = typeof r != "number" ? o._pos[1] : r),
          (i = typeof i != "number" ? o._pos[2] : i),
          typeof n == "number")
        )
          (o._pos = [n, r, i]),
            typeof o.ctx.listener.positionX < "u"
              ? (o.ctx.listener.positionX.setTargetAtTime(
                  o._pos[0],
                  Howler.ctx.currentTime,
                  0.1
                ),
                o.ctx.listener.positionY.setTargetAtTime(
                  o._pos[1],
                  Howler.ctx.currentTime,
                  0.1
                ),
                o.ctx.listener.positionZ.setTargetAtTime(
                  o._pos[2],
                  Howler.ctx.currentTime,
                  0.1
                ))
              : o.ctx.listener.setPosition(o._pos[0], o._pos[1], o._pos[2]);
        else return o._pos;
        return o;
      }),
      (HowlerGlobal.prototype.orientation = function (n, r, i, o, a, u) {
        var f = this;
        if (!f.ctx || !f.ctx.listener) return f;
        var d = f._orientation;
        if (
          ((r = typeof r != "number" ? d[1] : r),
          (i = typeof i != "number" ? d[2] : i),
          (o = typeof o != "number" ? d[3] : o),
          (a = typeof a != "number" ? d[4] : a),
          (u = typeof u != "number" ? d[5] : u),
          typeof n == "number")
        )
          (f._orientation = [n, r, i, o, a, u]),
            typeof f.ctx.listener.forwardX < "u"
              ? (f.ctx.listener.forwardX.setTargetAtTime(
                  n,
                  Howler.ctx.currentTime,
                  0.1
                ),
                f.ctx.listener.forwardY.setTargetAtTime(
                  r,
                  Howler.ctx.currentTime,
                  0.1
                ),
                f.ctx.listener.forwardZ.setTargetAtTime(
                  i,
                  Howler.ctx.currentTime,
                  0.1
                ),
                f.ctx.listener.upX.setTargetAtTime(
                  o,
                  Howler.ctx.currentTime,
                  0.1
                ),
                f.ctx.listener.upY.setTargetAtTime(
                  a,
                  Howler.ctx.currentTime,
                  0.1
                ),
                f.ctx.listener.upZ.setTargetAtTime(
                  u,
                  Howler.ctx.currentTime,
                  0.1
                ))
              : f.ctx.listener.setOrientation(n, r, i, o, a, u);
        else return d;
        return f;
      }),
      (Howl.prototype.init = (function (n) {
        return function (r) {
          var i = this;
          return (
            (i._orientation = r.orientation || [1, 0, 0]),
            (i._stereo = r.stereo || null),
            (i._pos = r.pos || null),
            (i._pannerAttr = {
              coneInnerAngle:
                typeof r.coneInnerAngle < "u" ? r.coneInnerAngle : 360,
              coneOuterAngle:
                typeof r.coneOuterAngle < "u" ? r.coneOuterAngle : 360,
              coneOuterGain: typeof r.coneOuterGain < "u" ? r.coneOuterGain : 0,
              distanceModel:
                typeof r.distanceModel < "u" ? r.distanceModel : "inverse",
              maxDistance: typeof r.maxDistance < "u" ? r.maxDistance : 1e4,
              panningModel:
                typeof r.panningModel < "u" ? r.panningModel : "HRTF",
              refDistance: typeof r.refDistance < "u" ? r.refDistance : 1,
              rolloffFactor: typeof r.rolloffFactor < "u" ? r.rolloffFactor : 1,
            }),
            (i._onstereo = r.onstereo ? [{ fn: r.onstereo }] : []),
            (i._onpos = r.onpos ? [{ fn: r.onpos }] : []),
            (i._onorientation = r.onorientation
              ? [{ fn: r.onorientation }]
              : []),
            n.call(this, r)
          );
        };
      })(Howl.prototype.init)),
      (Howl.prototype.stereo = function (n, r) {
        var i = this;
        if (!i._webAudio) return i;
        if (i._state !== "loaded")
          return (
            i._queue.push({
              event: "stereo",
              action: function () {
                i.stereo(n, r);
              },
            }),
            i
          );
        var o =
          typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
        if (typeof r > "u")
          if (typeof n == "number") (i._stereo = n), (i._pos = [n, 0, 0]);
          else return i._stereo;
        for (var a = i._getSoundIds(r), u = 0; u < a.length; u++) {
          var f = i._soundById(a[u]);
          if (f)
            if (typeof n == "number")
              (f._stereo = n),
                (f._pos = [n, 0, 0]),
                f._node &&
                  ((f._pannerAttr.panningModel = "equalpower"),
                  (!f._panner || !f._panner.pan) && t(f, o),
                  o === "spatial"
                    ? typeof f._panner.positionX < "u"
                      ? (f._panner.positionX.setValueAtTime(
                          n,
                          Howler.ctx.currentTime
                        ),
                        f._panner.positionY.setValueAtTime(
                          0,
                          Howler.ctx.currentTime
                        ),
                        f._panner.positionZ.setValueAtTime(
                          0,
                          Howler.ctx.currentTime
                        ))
                      : f._panner.setPosition(n, 0, 0)
                    : f._panner.pan.setValueAtTime(n, Howler.ctx.currentTime)),
                i._emit("stereo", f._id);
            else return f._stereo;
        }
        return i;
      }),
      (Howl.prototype.pos = function (n, r, i, o) {
        var a = this;
        if (!a._webAudio) return a;
        if (a._state !== "loaded")
          return (
            a._queue.push({
              event: "pos",
              action: function () {
                a.pos(n, r, i, o);
              },
            }),
            a
          );
        if (
          ((r = typeof r != "number" ? 0 : r),
          (i = typeof i != "number" ? -0.5 : i),
          typeof o > "u")
        )
          if (typeof n == "number") a._pos = [n, r, i];
          else return a._pos;
        for (var u = a._getSoundIds(o), f = 0; f < u.length; f++) {
          var d = a._soundById(u[f]);
          if (d)
            if (typeof n == "number")
              (d._pos = [n, r, i]),
                d._node &&
                  ((!d._panner || d._panner.pan) && t(d, "spatial"),
                  typeof d._panner.positionX < "u"
                    ? (d._panner.positionX.setValueAtTime(
                        n,
                        Howler.ctx.currentTime
                      ),
                      d._panner.positionY.setValueAtTime(
                        r,
                        Howler.ctx.currentTime
                      ),
                      d._panner.positionZ.setValueAtTime(
                        i,
                        Howler.ctx.currentTime
                      ))
                    : d._panner.setPosition(n, r, i)),
                a._emit("pos", d._id);
            else return d._pos;
        }
        return a;
      }),
      (Howl.prototype.orientation = function (n, r, i, o) {
        var a = this;
        if (!a._webAudio) return a;
        if (a._state !== "loaded")
          return (
            a._queue.push({
              event: "orientation",
              action: function () {
                a.orientation(n, r, i, o);
              },
            }),
            a
          );
        if (
          ((r = typeof r != "number" ? a._orientation[1] : r),
          (i = typeof i != "number" ? a._orientation[2] : i),
          typeof o > "u")
        )
          if (typeof n == "number") a._orientation = [n, r, i];
          else return a._orientation;
        for (var u = a._getSoundIds(o), f = 0; f < u.length; f++) {
          var d = a._soundById(u[f]);
          if (d)
            if (typeof n == "number")
              (d._orientation = [n, r, i]),
                d._node &&
                  (d._panner ||
                    (d._pos || (d._pos = a._pos || [0, 0, -0.5]),
                    t(d, "spatial")),
                  typeof d._panner.orientationX < "u"
                    ? (d._panner.orientationX.setValueAtTime(
                        n,
                        Howler.ctx.currentTime
                      ),
                      d._panner.orientationY.setValueAtTime(
                        r,
                        Howler.ctx.currentTime
                      ),
                      d._panner.orientationZ.setValueAtTime(
                        i,
                        Howler.ctx.currentTime
                      ))
                    : d._panner.setOrientation(n, r, i)),
                a._emit("orientation", d._id);
            else return d._orientation;
        }
        return a;
      }),
      (Howl.prototype.pannerAttr = function () {
        var n = this,
          r = arguments,
          i,
          o,
          a;
        if (!n._webAudio) return n;
        if (r.length === 0) return n._pannerAttr;
        if (r.length === 1)
          if (typeof r[0] == "object")
            (i = r[0]),
              typeof o > "u" &&
                (i.pannerAttr ||
                  (i.pannerAttr = {
                    coneInnerAngle: i.coneInnerAngle,
                    coneOuterAngle: i.coneOuterAngle,
                    coneOuterGain: i.coneOuterGain,
                    distanceModel: i.distanceModel,
                    maxDistance: i.maxDistance,
                    refDistance: i.refDistance,
                    rolloffFactor: i.rolloffFactor,
                    panningModel: i.panningModel,
                  }),
                (n._pannerAttr = {
                  coneInnerAngle:
                    typeof i.pannerAttr.coneInnerAngle < "u"
                      ? i.pannerAttr.coneInnerAngle
                      : n._coneInnerAngle,
                  coneOuterAngle:
                    typeof i.pannerAttr.coneOuterAngle < "u"
                      ? i.pannerAttr.coneOuterAngle
                      : n._coneOuterAngle,
                  coneOuterGain:
                    typeof i.pannerAttr.coneOuterGain < "u"
                      ? i.pannerAttr.coneOuterGain
                      : n._coneOuterGain,
                  distanceModel:
                    typeof i.pannerAttr.distanceModel < "u"
                      ? i.pannerAttr.distanceModel
                      : n._distanceModel,
                  maxDistance:
                    typeof i.pannerAttr.maxDistance < "u"
                      ? i.pannerAttr.maxDistance
                      : n._maxDistance,
                  refDistance:
                    typeof i.pannerAttr.refDistance < "u"
                      ? i.pannerAttr.refDistance
                      : n._refDistance,
                  rolloffFactor:
                    typeof i.pannerAttr.rolloffFactor < "u"
                      ? i.pannerAttr.rolloffFactor
                      : n._rolloffFactor,
                  panningModel:
                    typeof i.pannerAttr.panningModel < "u"
                      ? i.pannerAttr.panningModel
                      : n._panningModel,
                }));
          else
            return (
              (a = n._soundById(parseInt(r[0], 10))),
              a ? a._pannerAttr : n._pannerAttr
            );
        else r.length === 2 && ((i = r[0]), (o = parseInt(r[1], 10)));
        for (var u = n._getSoundIds(o), f = 0; f < u.length; f++)
          if (((a = n._soundById(u[f])), a)) {
            var d = a._pannerAttr;
            d = {
              coneInnerAngle:
                typeof i.coneInnerAngle < "u"
                  ? i.coneInnerAngle
                  : d.coneInnerAngle,
              coneOuterAngle:
                typeof i.coneOuterAngle < "u"
                  ? i.coneOuterAngle
                  : d.coneOuterAngle,
              coneOuterGain:
                typeof i.coneOuterGain < "u"
                  ? i.coneOuterGain
                  : d.coneOuterGain,
              distanceModel:
                typeof i.distanceModel < "u"
                  ? i.distanceModel
                  : d.distanceModel,
              maxDistance:
                typeof i.maxDistance < "u" ? i.maxDistance : d.maxDistance,
              refDistance:
                typeof i.refDistance < "u" ? i.refDistance : d.refDistance,
              rolloffFactor:
                typeof i.rolloffFactor < "u"
                  ? i.rolloffFactor
                  : d.rolloffFactor,
              panningModel:
                typeof i.panningModel < "u" ? i.panningModel : d.panningModel,
            };
            var g = a._panner;
            g
              ? ((g.coneInnerAngle = d.coneInnerAngle),
                (g.coneOuterAngle = d.coneOuterAngle),
                (g.coneOuterGain = d.coneOuterGain),
                (g.distanceModel = d.distanceModel),
                (g.maxDistance = d.maxDistance),
                (g.refDistance = d.refDistance),
                (g.rolloffFactor = d.rolloffFactor),
                (g.panningModel = d.panningModel))
              : (a._pos || (a._pos = n._pos || [0, 0, -0.5]), t(a, "spatial"));
          }
        return n;
      }),
      (Sound.prototype.init = (function (n) {
        return function () {
          var r = this,
            i = r._parent;
          (r._orientation = i._orientation),
            (r._stereo = i._stereo),
            (r._pos = i._pos),
            (r._pannerAttr = i._pannerAttr),
            n.call(this),
            r._stereo
              ? i.stereo(r._stereo)
              : r._pos && i.pos(r._pos[0], r._pos[1], r._pos[2], r._id);
        };
      })(Sound.prototype.init)),
      (Sound.prototype.reset = (function (n) {
        return function () {
          var r = this,
            i = r._parent;
          return (
            (r._orientation = i._orientation),
            (r._stereo = i._stereo),
            (r._pos = i._pos),
            (r._pannerAttr = i._pannerAttr),
            r._stereo
              ? i.stereo(r._stereo)
              : r._pos
              ? i.pos(r._pos[0], r._pos[1], r._pos[2], r._id)
              : r._panner &&
                (r._panner.disconnect(0),
                (r._panner = void 0),
                i._refreshBuffer(r)),
            n.call(this)
          );
        };
      })(Sound.prototype.reset));
    var t = function (n, r) {
      (r = r || "spatial"),
        r === "spatial"
          ? ((n._panner = Howler.ctx.createPanner()),
            (n._panner.coneInnerAngle = n._pannerAttr.coneInnerAngle),
            (n._panner.coneOuterAngle = n._pannerAttr.coneOuterAngle),
            (n._panner.coneOuterGain = n._pannerAttr.coneOuterGain),
            (n._panner.distanceModel = n._pannerAttr.distanceModel),
            (n._panner.maxDistance = n._pannerAttr.maxDistance),
            (n._panner.refDistance = n._pannerAttr.refDistance),
            (n._panner.rolloffFactor = n._pannerAttr.rolloffFactor),
            (n._panner.panningModel = n._pannerAttr.panningModel),
            typeof n._panner.positionX < "u"
              ? (n._panner.positionX.setValueAtTime(
                  n._pos[0],
                  Howler.ctx.currentTime
                ),
                n._panner.positionY.setValueAtTime(
                  n._pos[1],
                  Howler.ctx.currentTime
                ),
                n._panner.positionZ.setValueAtTime(
                  n._pos[2],
                  Howler.ctx.currentTime
                ))
              : n._panner.setPosition(n._pos[0], n._pos[1], n._pos[2]),
            typeof n._panner.orientationX < "u"
              ? (n._panner.orientationX.setValueAtTime(
                  n._orientation[0],
                  Howler.ctx.currentTime
                ),
                n._panner.orientationY.setValueAtTime(
                  n._orientation[1],
                  Howler.ctx.currentTime
                ),
                n._panner.orientationZ.setValueAtTime(
                  n._orientation[2],
                  Howler.ctx.currentTime
                ))
              : n._panner.setOrientation(
                  n._orientation[0],
                  n._orientation[1],
                  n._orientation[2]
                ))
          : ((n._panner = Howler.ctx.createStereoPanner()),
            n._panner.pan.setValueAtTime(n._stereo, Howler.ctx.currentTime)),
        n._panner.connect(n._node),
        n._paused || n._parent.pause(n._id, !0).play(n._id, !0);
    };
  })();
})(Wo);
const Yo = (e, t = []) => JSON.parse(localStorage.getItem(`CTFd:${e}`)) || t,
  Go = (e, t) => {
    localStorage.setItem(`CTFd:${e}`, JSON.stringify(t));
  };
function Yn() {
  return Yo("read_notifications");
}
function Gn() {
  return Yo("unread_notifications");
}
function gi(e) {
  Go("read_notifications", e);
}
function Kn(e) {
  Go("unread_notifications", e);
}
function Ru(e) {
  const t = [...Yn(), e];
  return gi(t), Ko(e), t;
}
function Hu(e) {
  const t = [...Gn(), e];
  return Kn(t), t;
}
function vs() {
  const e = Yn();
  return e.length === 0 ? 0 : Math.max(...e);
}
function Ko(e) {
  const n = Gn().filter((r) => r !== e);
  Kn(n);
}
function Bu() {
  const e = Gn(),
    t = Yn();
  gi(t.concat(e)), Kn([]);
}
const q = {
  init: (e, t) => {
    q.source = new EventSource(e + "/events");
    for (let r = 0; r < t.length; r++) t[r] = `${e}${t[r]}`;
    q.howl = new Wo.Howl({ src: t });
    let n = vs();
    M.fetch(`/api/v1/notifications?since_id=${n}`, { method: "HEAD" }).then(
      (r) => {
        let i = r.headers.get("result-count");
        i &&
          (q.controller.broadcast("counter", { count: i }),
          M._functions.events.eventCount(i));
      }
    );
  },
  controller: new Pu(),
  source: null,
  howl: null,
  connect: () => {
    q.source.addEventListener(
      "notification",
      function (e) {
        let t = JSON.parse(e.data);
        q.controller.broadcast("notification", t),
          M.events.counter.unread.add(t.id);
        let n = M.events.counter.unread.getAll().length;
        q.controller.broadcast("counter", { count: n }),
          M._functions.events.eventCount(n),
          q.render(t),
          t.sound && q.howl.play();
      },
      !1
    );
  },
  disconnect: () => {
    q.source && q.source.close();
  },
  render: (e) => {
    switch (e.type) {
      case "toast": {
        M._functions.events.eventToast(e);
        break;
      }
      case "alert": {
        M._functions.events.eventAlert(e);
        break;
      }
      case "background": {
        M._functions.events.eventBackground(e);
        break;
      }
      default: {
        console.log(e), alert(e);
        break;
      }
    }
  },
  counter: {
    read: { getAll: Yn, setAll: gi, add: Ru, getLast: vs },
    unread: { getAll: Gn, setAll: Kn, add: Hu, remove: Ko, readAll: Bu },
  },
};
q.controller.alert = function (e) {
  q.render(e);
};
q.controller.toast = function (e) {
  q.render(e);
};
q.controller.background = function (e) {
  q.render(e);
};
q.controller.counter = function (e) {
  M._functions.events.eventCount(e.count);
};
q.controller.masterDidChange = function () {
  this.isMaster ? q.connect() : q.disconnect();
};
var Uo = { exports: {} };
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(we, function () {
    return function (n, r, i) {
      n = n || {};
      var o = r.prototype,
        a = {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        };
      function u(d, g, s, c) {
        return o.fromToBase(d, g, s, c);
      }
      (i.en.relativeTime = a),
        (o.fromToBase = function (d, g, s, c, l) {
          for (
            var h,
              _,
              p,
              m = s.$locale().relativeTime || a,
              E = n.thresholds || [
                { l: "s", r: 44, d: "second" },
                { l: "m", r: 89 },
                { l: "mm", r: 44, d: "minute" },
                { l: "h", r: 89 },
                { l: "hh", r: 21, d: "hour" },
                { l: "d", r: 35 },
                { l: "dd", r: 25, d: "day" },
                { l: "M", r: 45 },
                { l: "MM", r: 10, d: "month" },
                { l: "y", r: 17 },
                { l: "yy", d: "year" },
              ],
              O = E.length,
              D = 0;
            D < O;
            D += 1
          ) {
            var L = E[D];
            L.d && (h = c ? i(d).diff(s, L.d, !0) : s.diff(d, L.d, !0));
            var I = (n.rounding || Math.round)(Math.abs(h));
            if (((p = h > 0), I <= L.r || !L.r)) {
              I <= 1 && D > 0 && (L = E[D - 1]);
              var F = m[L.l];
              l && (I = l("" + I)),
                (_ =
                  typeof F == "string" ? F.replace("%d", I) : F(I, g, L.l, p));
              break;
            }
          }
          if (g) return _;
          var j = p ? m.future : m.past;
          return typeof j == "function" ? j(_) : j.replace("%s", _);
        }),
        (o.to = function (d, g) {
          return u(d, g, this, !0);
        }),
        (o.from = function (d, g) {
          return u(d, g, this);
        });
      var f = function (d) {
        return d.$u ? i.utc() : i();
      };
      (o.toNow = function (d) {
        return this.to(f(this), d);
      }),
        (o.fromNow = function (d) {
          return this.from(f(this), d);
        });
    };
  });
})(Uo);
const Fu = Uo.exports;
nn.extend(_o);
nn.extend(Fu);
const yt = { id: null, name: null, email: null },
  Sn = { id: null, name: null },
  Vu = {},
  ju = {
    challenge: {
      displayChallenge: null,
      renderChallenge: null,
      displayHint(e) {
        alert(e.content);
      },
      displayUnlock(e) {
        return confirm("Are you sure you'd like to unlock this hint?");
      },
      displayUnlockError(e) {
        const t = [];
        Object.keys(e.errors).map((r) => {
          t.push(e.errors[r]);
        });
        const n = t.join(`
`);
        alert(n);
      },
      submitChallenge: null,
      displaySubmissionResponse: null,
      displaySolves: null,
    },
    challenges: { displayChallenges: null, sortChallenges: null },
    events: {
      eventAlert: null,
      eventToast: null,
      eventBackground: null,
      eventRead: null,
      eventCount: null,
    },
  },
  Wu = {
    htmlEntities: jo,
    colorHash: _u,
    copyToClipboard: hu,
    hashCode: pu,
    renderTimes: du,
  },
  Yu = {
    ajax: { getScript: Po },
    html: { createHtmlNode: ku, htmlEntities: jo },
  },
  Gu = {
    challenge: {
      displayChallenge: gu,
      submitChallenge: vu,
      loadSolves: Vo,
      displaySolves: yu,
      loadHint: Ro,
      loadUnlock: Ho,
      displayUnlock: Fo,
      displayHint: Bo,
    },
    challenges: { getChallenges: Io, getChallenge: ko, displayChallenges: mu },
    scoreboard: { getScoreboard: bu, getScoreboardDetail: Eu, getBrackets: wu },
    settings: { updateSettings: Au, generateToken: Tu, deleteToken: Su },
    users: { userSolves: Ou, userFails: xu, userAwards: $u },
    teams: {
      getInviteToken: Cu,
      disbandTeam: Du,
      updateTeamSettings: Nu,
      teamSolves: Mu,
      teamFails: Lu,
      teamAwards: Iu,
    },
  },
  Ku = { $: H, dayjs: nn };
let ys = !1;
const Uu = (e) => {
    ys ||
      ((ys = !0),
      (X.urlRoot = e.urlRoot || X.urlRoot),
      (X.csrfNonce = e.csrfNonce || X.csrfNonce),
      (X.userMode = e.userMode || X.userMode),
      (X.start = e.start || X.start),
      (X.end = e.end || X.end),
      (X.themeSettings = e.themeSettings || X.themeSettings),
      (X.eventSounds = e.eventSounds || X.eventSounds),
      (X.preview = !1),
      (yt.id = e.userId),
      (yt.name = e.userName || yt.name),
      (yt.email = e.userEmail || yt.email),
      (Sn.id = e.teamId),
      (Sn.name = e.teamName || Sn.name),
      q.init(X.urlRoot, X.eventSounds));
  },
  qu = {
    run(e) {
      e(vi);
    },
  },
  vi = {
    init: Uu,
    config: X,
    fetch: Tl,
    user: yt,
    team: Sn,
    ui: Wu,
    utils: Yu,
    pages: Gu,
    events: q,
    _internal: Vu,
    _functions: ju,
    plugin: qu,
    lib: Ku,
  };
window.CTFd = vi;
const M = vi;
var qo = { exports: {} };
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(we, function () {
    var n = 1e3,
      r = 6e4,
      i = 36e5,
      o = "millisecond",
      a = "second",
      u = "minute",
      f = "hour",
      d = "day",
      g = "week",
      s = "month",
      c = "quarter",
      l = "year",
      h = "date",
      _ = "Invalid Date",
      p =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      m =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      E = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
      },
      O = function (A, b, v) {
        var T = String(A);
        return !T || T.length >= b
          ? A
          : "" + Array(b + 1 - T.length).join(v) + A;
      },
      D = {
        s: O,
        z: function (A) {
          var b = -A.utcOffset(),
            v = Math.abs(b),
            T = Math.floor(v / 60),
            y = v % 60;
          return (b <= 0 ? "+" : "-") + O(T, 2, "0") + ":" + O(y, 2, "0");
        },
        m: function A(b, v) {
          if (b.date() < v.date()) return -A(v, b);
          var T = 12 * (v.year() - b.year()) + (v.month() - b.month()),
            y = b.clone().add(T, s),
            x = v - y < 0,
            S = b.clone().add(T + (x ? -1 : 1), s);
          return +(-(T + (v - y) / (x ? y - S : S - y)) || 0);
        },
        a: function (A) {
          return A < 0 ? Math.ceil(A) || 0 : Math.floor(A);
        },
        p: function (A) {
          return (
            { M: s, y: l, w: g, d, D: h, h: f, m: u, s: a, ms: o, Q: c }[A] ||
            String(A || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (A) {
          return A === void 0;
        },
      },
      L = "en",
      I = {};
    I[L] = E;
    var F = function (A) {
        return A instanceof Y;
      },
      j = function A(b, v, T) {
        var y;
        if (!b) return L;
        if (typeof b == "string") {
          var x = b.toLowerCase();
          I[x] && (y = x), v && ((I[x] = v), (y = x));
          var S = b.split("-");
          if (!y && S.length > 1) return A(S[0]);
        } else {
          var k = b.name;
          (I[k] = b), (y = k);
        }
        return !T && y && (L = y), y || (!T && L);
      },
      $ = function (A, b) {
        if (F(A)) return A.clone();
        var v = typeof b == "object" ? b : {};
        return (v.date = A), (v.args = arguments), new Y(v);
      },
      N = D;
    (N.l = j),
      (N.i = F),
      (N.w = function (A, b) {
        return $(A, { locale: b.$L, utc: b.$u, x: b.$x, $offset: b.$offset });
      });
    var Y = (function () {
        function A(v) {
          (this.$L = j(v.locale, null, !0)), this.parse(v);
        }
        var b = A.prototype;
        return (
          (b.parse = function (v) {
            (this.$d = (function (T) {
              var y = T.date,
                x = T.utc;
              if (y === null) return new Date(NaN);
              if (N.u(y)) return new Date();
              if (y instanceof Date) return new Date(y);
              if (typeof y == "string" && !/Z$/i.test(y)) {
                var S = y.match(p);
                if (S) {
                  var k = S[2] - 1 || 0,
                    B = (S[7] || "0").substring(0, 3);
                  return x
                    ? new Date(
                        Date.UTC(
                          S[1],
                          k,
                          S[3] || 1,
                          S[4] || 0,
                          S[5] || 0,
                          S[6] || 0,
                          B
                        )
                      )
                    : new Date(
                        S[1],
                        k,
                        S[3] || 1,
                        S[4] || 0,
                        S[5] || 0,
                        S[6] || 0,
                        B
                      );
                }
              }
              return new Date(y);
            })(v)),
              (this.$x = v.x || {}),
              this.init();
          }),
          (b.init = function () {
            var v = this.$d;
            (this.$y = v.getFullYear()),
              (this.$M = v.getMonth()),
              (this.$D = v.getDate()),
              (this.$W = v.getDay()),
              (this.$H = v.getHours()),
              (this.$m = v.getMinutes()),
              (this.$s = v.getSeconds()),
              (this.$ms = v.getMilliseconds());
          }),
          (b.$utils = function () {
            return N;
          }),
          (b.isValid = function () {
            return this.$d.toString() !== _;
          }),
          (b.isSame = function (v, T) {
            var y = $(v);
            return this.startOf(T) <= y && y <= this.endOf(T);
          }),
          (b.isAfter = function (v, T) {
            return $(v) < this.startOf(T);
          }),
          (b.isBefore = function (v, T) {
            return this.endOf(T) < $(v);
          }),
          (b.$g = function (v, T, y) {
            return N.u(v) ? this[T] : this.set(y, v);
          }),
          (b.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (b.valueOf = function () {
            return this.$d.getTime();
          }),
          (b.startOf = function (v, T) {
            var y = this,
              x = !!N.u(T) || T,
              S = N.p(v),
              k = function (z, W) {
                var J = N.w(
                  y.$u ? Date.UTC(y.$y, W, z) : new Date(y.$y, W, z),
                  y
                );
                return x ? J : J.endOf(d);
              },
              B = function (z, W) {
                return N.w(
                  y
                    .toDate()
                    [z].apply(
                      y.toDate("s"),
                      (x ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(W)
                    ),
                  y
                );
              },
              R = this.$W,
              V = this.$M,
              K = this.$D,
              G = "set" + (this.$u ? "UTC" : "");
            switch (S) {
              case l:
                return x ? k(1, 0) : k(31, 11);
              case s:
                return x ? k(1, V) : k(0, V + 1);
              case g:
                var re = this.$locale().weekStart || 0,
                  se = (R < re ? R + 7 : R) - re;
                return k(x ? K - se : K + (6 - se), V);
              case d:
              case h:
                return B(G + "Hours", 0);
              case f:
                return B(G + "Minutes", 1);
              case u:
                return B(G + "Seconds", 2);
              case a:
                return B(G + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (b.endOf = function (v) {
            return this.startOf(v, !1);
          }),
          (b.$set = function (v, T) {
            var y,
              x = N.p(v),
              S = "set" + (this.$u ? "UTC" : ""),
              k = ((y = {}),
              (y[d] = S + "Date"),
              (y[h] = S + "Date"),
              (y[s] = S + "Month"),
              (y[l] = S + "FullYear"),
              (y[f] = S + "Hours"),
              (y[u] = S + "Minutes"),
              (y[a] = S + "Seconds"),
              (y[o] = S + "Milliseconds"),
              y)[x],
              B = x === d ? this.$D + (T - this.$W) : T;
            if (x === s || x === l) {
              var R = this.clone().set(h, 1);
              R.$d[k](B),
                R.init(),
                (this.$d = R.set(h, Math.min(this.$D, R.daysInMonth())).$d);
            } else k && this.$d[k](B);
            return this.init(), this;
          }),
          (b.set = function (v, T) {
            return this.clone().$set(v, T);
          }),
          (b.get = function (v) {
            return this[N.p(v)]();
          }),
          (b.add = function (v, T) {
            var y,
              x = this;
            v = Number(v);
            var S = N.p(T),
              k = function (V) {
                var K = $(x);
                return N.w(K.date(K.date() + Math.round(V * v)), x);
              };
            if (S === s) return this.set(s, this.$M + v);
            if (S === l) return this.set(l, this.$y + v);
            if (S === d) return k(1);
            if (S === g) return k(7);
            var B = ((y = {}), (y[u] = r), (y[f] = i), (y[a] = n), y)[S] || 1,
              R = this.$d.getTime() + v * B;
            return N.w(R, this);
          }),
          (b.subtract = function (v, T) {
            return this.add(-1 * v, T);
          }),
          (b.format = function (v) {
            var T = this,
              y = this.$locale();
            if (!this.isValid()) return y.invalidDate || _;
            var x = v || "YYYY-MM-DDTHH:mm:ssZ",
              S = N.z(this),
              k = this.$H,
              B = this.$m,
              R = this.$M,
              V = y.weekdays,
              K = y.months,
              G = function (W, J, be, Ee) {
                return (W && (W[J] || W(T, x))) || be[J].substr(0, Ee);
              },
              re = function (W) {
                return N.s(k % 12 || 12, W, "0");
              },
              se =
                y.meridiem ||
                function (W, J, be) {
                  var Ee = W < 12 ? "AM" : "PM";
                  return be ? Ee.toLowerCase() : Ee;
                },
              z = {
                YY: String(this.$y).slice(-2),
                YYYY: this.$y,
                M: R + 1,
                MM: N.s(R + 1, 2, "0"),
                MMM: G(y.monthsShort, R, K, 3),
                MMMM: G(K, R),
                D: this.$D,
                DD: N.s(this.$D, 2, "0"),
                d: String(this.$W),
                dd: G(y.weekdaysMin, this.$W, V, 2),
                ddd: G(y.weekdaysShort, this.$W, V, 3),
                dddd: V[this.$W],
                H: String(k),
                HH: N.s(k, 2, "0"),
                h: re(1),
                hh: re(2),
                a: se(k, B, !0),
                A: se(k, B, !1),
                m: String(B),
                mm: N.s(B, 2, "0"),
                s: String(this.$s),
                ss: N.s(this.$s, 2, "0"),
                SSS: N.s(this.$ms, 3, "0"),
                Z: S,
              };
            return x.replace(m, function (W, J) {
              return J || z[W] || S.replace(":", "");
            });
          }),
          (b.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (b.diff = function (v, T, y) {
            var x,
              S = N.p(T),
              k = $(v),
              B = (k.utcOffset() - this.utcOffset()) * r,
              R = this - k,
              V = N.m(this, k);
            return (
              (V =
                ((x = {}),
                (x[l] = V / 12),
                (x[s] = V),
                (x[c] = V / 3),
                (x[g] = (R - B) / 6048e5),
                (x[d] = (R - B) / 864e5),
                (x[f] = R / i),
                (x[u] = R / r),
                (x[a] = R / n),
                x)[S] || R),
              y ? V : N.a(V)
            );
          }),
          (b.daysInMonth = function () {
            return this.endOf(s).$D;
          }),
          (b.$locale = function () {
            return I[this.$L];
          }),
          (b.locale = function (v, T) {
            if (!v) return this.$L;
            var y = this.clone(),
              x = j(v, T, !0);
            return x && (y.$L = x), y;
          }),
          (b.clone = function () {
            return N.w(this.$d, this);
          }),
          (b.toDate = function () {
            return new Date(this.valueOf());
          }),
          (b.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (b.toISOString = function () {
            return this.$d.toISOString();
          }),
          (b.toString = function () {
            return this.$d.toUTCString();
          }),
          A
        );
      })(),
      Q = Y.prototype;
    return (
      ($.prototype = Q),
      [
        ["$ms", o],
        ["$s", a],
        ["$m", u],
        ["$H", f],
        ["$W", d],
        ["$M", s],
        ["$y", l],
        ["$D", h],
      ].forEach(function (A) {
        Q[A[1]] = function (b) {
          return this.$g(b, A[0], A[1]);
        };
      }),
      ($.extend = function (A, b) {
        return A.$i || (A(b, Y, $), (A.$i = !0)), $;
      }),
      ($.locale = j),
      ($.isDayjs = F),
      ($.unix = function (A) {
        return $(1e3 * A);
      }),
      ($.en = I[L]),
      ($.Ls = I),
      ($.p = {}),
      $
    );
  });
})(qo);
const yi = qo.exports;
var zo = { exports: {} };
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(we, function () {
    return function (n, r, i) {
      var o = r.prototype,
        a = o.format;
      (i.en.ordinal = function (u) {
        var f = ["th", "st", "nd", "rd"],
          d = u % 100;
        return "[" + u + (f[(d - 20) % 10] || f[d] || f[0]) + "]";
      }),
        (o.format = function (u) {
          var f = this,
            d = this.$locale();
          if (!this.isValid()) return a.bind(this)(u);
          var g = this.$utils(),
            s = (u || "YYYY-MM-DDTHH:mm:ssZ").replace(
              /\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,
              function (c) {
                switch (c) {
                  case "Q":
                    return Math.ceil((f.$M + 1) / 3);
                  case "Do":
                    return d.ordinal(f.$D);
                  case "gggg":
                    return f.weekYear();
                  case "GGGG":
                    return f.isoWeekYear();
                  case "wo":
                    return d.ordinal(f.week(), "W");
                  case "w":
                  case "ww":
                    return g.s(f.week(), c === "w" ? 1 : 2, "0");
                  case "W":
                  case "WW":
                    return g.s(f.isoWeek(), c === "W" ? 1 : 2, "0");
                  case "k":
                  case "kk":
                    return g.s(
                      String(f.$H === 0 ? 24 : f.$H),
                      c === "k" ? 1 : 2,
                      "0"
                    );
                  case "X":
                    return Math.floor(f.$d.getTime() / 1e3);
                  case "x":
                    return f.$d.getTime();
                  case "z":
                    return "[" + f.offsetName() + "]";
                  case "zzz":
                    return "[" + f.offsetName("long") + "]";
                  default:
                    return c;
                }
              }
            );
          return a.bind(this)(s);
        });
    };
  });
})(zo);
const Xo = zo.exports;
yi.extend(Xo);
const zu = () => {
    document.querySelectorAll("[data-time]").forEach((e) => {
      const t = e.getAttribute("data-time"),
        n = e.getAttribute("data-time-format") || "MMMM Do, h:mm:ss A";
      e.innerText = yi(t).format(n);
    });
  },
  Xu = () => {
    document.querySelectorAll(".form-control").forEach((e) => {
      e.addEventListener("onfocus", () => {
        e.classList.remove("input-filled-invalid"),
          e.classList.add("input-filled-valid");
      }),
        e.addEventListener("onblur", () => {
          e.nodeValue === "" &&
            (e.classList.remove("input-filled-valid"),
            e.classList.remove("input-filled-invalid"));
        }),
        e.nodeValue && e.classList.add("input-filled-valid");
    }),
      document.querySelectorAll(".page-select").forEach((e) => {
        e.addEventListener("change", (t) => {
          var r;
          const n = new URL(window.location);
          n.searchParams.set("page", (r = t.target.value) != null ? r : "1"),
            (window.location.href = n.toString());
        });
      });
  };
var Qo = { exports: {} };
/*! lolight v1.4.0 - https://larsjung.de/lolight/ */ (function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(we, function () {
    function n(c) {
      if (typeof c != "string") throw new Error("tok: no string");
      for (var l = [], h = s.length, _ = !1; c; )
        for (var p = 0; p < h; p += 1) {
          var m = s[p][1].exec(c);
          if (m && m.index === 0) {
            var E = s[p][0];
            if (E !== "rex" || !_) {
              var O = m[0];
              E === d && u.test(O) && (E = "key"),
                E === "spc"
                  ? 0 <=
                      O.indexOf(`
`) && (_ = !1)
                  : (_ = E === g || E === d),
                (c = c.slice(O.length)),
                l.push([E, O]);
              break;
            }
          }
        }
      return l;
    }
    function r(c, l) {
      if (typeof document < "u") l(document);
      else if (c) throw new Error("no doc");
    }
    function i(c) {
      r(!0, function (l) {
        var h = n(c.textContent);
        (c.innerHTML = ""),
          h.forEach(function (_) {
            var p = l.createElement("span");
            (p.className = "ll-" + _[0]),
              (p.textContent = _[1]),
              c.appendChild(p);
          });
      });
    }
    function o(c) {
      r(!0, function (l) {
        [].forEach.call(l.querySelectorAll(c || ".lolight"), function (h) {
          i(h);
        });
      });
    }
    var a =
        "_nam#2196f3}_num#ec407a}_str#43a047}_rex#ef6c00}_pct#666}_key#555;font-weight:bold}_com#aaa;font-style:italic}"
          .replace(/_/g, ".ll-")
          .replace(/#/g, "{color:#"),
      u =
        /^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/,
      f = "com",
      d = "nam",
      g = "num",
      s = [
        [g, /#([0-9a-f]{6}|[0-9a-f]{3})\b/],
        [f, /(\/\/|#).*?(?=\n|$)/],
        [f, /\/\*[\s\S]*?\*\//],
        [f, /<!--[\s\S]*?-->/],
        ["rex", /\/(\\\/|[^\n])*?\//],
        ["str", /(['"`])(\\\1|[\s\S])*?\1/],
        [g, /[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?/],
        ["pct", /[\\.,:;+\-*\/=<>()[\]{}|?!&@~]/],
        ["spc", /\s+/],
        [d, /[\w$]+/],
        ["unk", /./],
      ];
    return (
      r(!1, function (c) {
        var l = c.querySelector("head"),
          h = c.createElement("style");
        (h.textContent = a),
          l.insertBefore(h, l.firstChild),
          /^(i|c|loade)/.test(c.readyState)
            ? o()
            : c.addEventListener("DOMContentLoaded", function () {
                o();
              });
      }),
      (o.tok = n),
      (o.el = i),
      o
    );
  });
})(Qo);
const Qu = Qo.exports,
  Ju = () => {
    (!M.config.themeSettings.hasOwnProperty("use_builtin_code_highlighter") ||
      M.config.themeSettings.use_builtin_code_highlighter === !0) &&
      Qu("pre code");
  };
var ae = "top",
  pe = "bottom",
  _e = "right",
  ce = "left",
  Un = "auto",
  Ht = [ae, pe, _e, ce],
  lt = "start",
  xt = "end",
  Jo = "clippingParents",
  bi = "viewport",
  bt = "popper",
  Zo = "reference",
  Rr = Ht.reduce(function (e, t) {
    return e.concat([t + "-" + lt, t + "-" + xt]);
  }, []),
  Ei = [].concat(Ht, [Un]).reduce(function (e, t) {
    return e.concat([t, t + "-" + lt, t + "-" + xt]);
  }, []),
  ea = "beforeRead",
  ta = "read",
  na = "afterRead",
  ra = "beforeMain",
  ia = "main",
  sa = "afterMain",
  oa = "beforeWrite",
  aa = "write",
  ca = "afterWrite",
  la = [ea, ta, na, ra, ia, sa, oa, aa, ca];
function Ne(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Te(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function $t(e) {
  var t = Te(e).Element;
  return e instanceof t || e instanceof Element;
}
function me(e) {
  var t = Te(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function wi(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = Te(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Zu(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (n) {
    var r = t.styles[n] || {},
      i = t.attributes[n] || {},
      o = t.elements[n];
    !me(o) ||
      !Ne(o) ||
      (Object.assign(o.style, r),
      Object.keys(i).forEach(function (a) {
        var u = i[a];
        u === !1 ? o.removeAttribute(a) : o.setAttribute(a, u === !0 ? "" : u);
      }));
  });
}
function ef(e) {
  var t = e.state,
    n = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, n.popper),
    (t.styles = n),
    t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
    function () {
      Object.keys(t.elements).forEach(function (r) {
        var i = t.elements[r],
          o = t.attributes[r] || {},
          a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
          u = a.reduce(function (f, d) {
            return (f[d] = ""), f;
          }, {});
        !me(i) ||
          !Ne(i) ||
          (Object.assign(i.style, u),
          Object.keys(o).forEach(function (f) {
            i.removeAttribute(f);
          }));
      });
    }
  );
}
const Ai = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Zu,
  effect: ef,
  requires: ["computeStyles"],
};
function $e(e) {
  return e.split("-")[0];
}
var it = Math.max,
  Mn = Math.min,
  Ct = Math.round;
function Dt(e, t) {
  t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(),
    r = 1,
    i = 1;
  if (me(e) && t) {
    var o = e.offsetHeight,
      a = e.offsetWidth;
    a > 0 && (r = Ct(n.width) / a || 1), o > 0 && (i = Ct(n.height) / o || 1);
  }
  return {
    width: n.width / r,
    height: n.height / i,
    top: n.top / i,
    right: n.right / r,
    bottom: n.bottom / i,
    left: n.left / r,
    x: n.left / r,
    y: n.top / i,
  };
}
function Ti(e) {
  var t = Dt(e),
    n = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
  );
}
function ua(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && wi(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function He(e) {
  return Te(e).getComputedStyle(e);
}
function tf(e) {
  return ["table", "td", "th"].indexOf(Ne(e)) >= 0;
}
function Xe(e) {
  return (($t(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function qn(e) {
  return Ne(e) === "html"
    ? e
    : e.assignedSlot || e.parentNode || (wi(e) ? e.host : null) || Xe(e);
}
function bs(e) {
  return !me(e) || He(e).position === "fixed" ? null : e.offsetParent;
}
function nf(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1,
    n = navigator.userAgent.indexOf("Trident") !== -1;
  if (n && me(e)) {
    var r = He(e);
    if (r.position === "fixed") return null;
  }
  var i = qn(e);
  for (wi(i) && (i = i.host); me(i) && ["html", "body"].indexOf(Ne(i)) < 0; ) {
    var o = He(i);
    if (
      o.transform !== "none" ||
      o.perspective !== "none" ||
      o.contain === "paint" ||
      ["transform", "perspective"].indexOf(o.willChange) !== -1 ||
      (t && o.willChange === "filter") ||
      (t && o.filter && o.filter !== "none")
    )
      return i;
    i = i.parentNode;
  }
  return null;
}
function rn(e) {
  for (var t = Te(e), n = bs(e); n && tf(n) && He(n).position === "static"; )
    n = bs(n);
  return n &&
    (Ne(n) === "html" || (Ne(n) === "body" && He(n).position === "static"))
    ? t
    : n || nf(e) || t;
}
function Si(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function qt(e, t, n) {
  return it(e, Mn(t, n));
}
function rf(e, t, n) {
  var r = qt(e, t, n);
  return r > n ? n : r;
}
function fa() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function da(e) {
  return Object.assign({}, fa(), e);
}
function ha(e, t) {
  return t.reduce(function (n, r) {
    return (n[r] = e), n;
  }, {});
}
var sf = function (t, n) {
  return (
    (t =
      typeof t == "function"
        ? t(Object.assign({}, n.rects, { placement: n.placement }))
        : t),
    da(typeof t != "number" ? t : ha(t, Ht))
  );
};
function of(e) {
  var t,
    n = e.state,
    r = e.name,
    i = e.options,
    o = n.elements.arrow,
    a = n.modifiersData.popperOffsets,
    u = $e(n.placement),
    f = Si(u),
    d = [ce, _e].indexOf(u) >= 0,
    g = d ? "height" : "width";
  if (!(!o || !a)) {
    var s = sf(i.padding, n),
      c = Ti(o),
      l = f === "y" ? ae : ce,
      h = f === "y" ? pe : _e,
      _ =
        n.rects.reference[g] + n.rects.reference[f] - a[f] - n.rects.popper[g],
      p = a[f] - n.rects.reference[f],
      m = rn(o),
      E = m ? (f === "y" ? m.clientHeight || 0 : m.clientWidth || 0) : 0,
      O = _ / 2 - p / 2,
      D = s[l],
      L = E - c[g] - s[h],
      I = E / 2 - c[g] / 2 + O,
      F = qt(D, I, L),
      j = f;
    n.modifiersData[r] = ((t = {}), (t[j] = F), (t.centerOffset = F - I), t);
  }
}
function af(e) {
  var t = e.state,
    n = e.options,
    r = n.element,
    i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null &&
    ((typeof i == "string" && ((i = t.elements.popper.querySelector(i)), !i)) ||
      !ua(t.elements.popper, i) ||
      (t.elements.arrow = i));
}
const pa = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: of,
  effect: af,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function Nt(e) {
  return e.split("-")[1];
}
var cf = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function lf(e) {
  var t = e.x,
    n = e.y,
    r = window,
    i = r.devicePixelRatio || 1;
  return { x: Ct(t * i) / i || 0, y: Ct(n * i) / i || 0 };
}
function Es(e) {
  var t,
    n = e.popper,
    r = e.popperRect,
    i = e.placement,
    o = e.variation,
    a = e.offsets,
    u = e.position,
    f = e.gpuAcceleration,
    d = e.adaptive,
    g = e.roundOffsets,
    s = e.isFixed,
    c = a.x,
    l = c === void 0 ? 0 : c,
    h = a.y,
    _ = h === void 0 ? 0 : h,
    p = typeof g == "function" ? g({ x: l, y: _ }) : { x: l, y: _ };
  (l = p.x), (_ = p.y);
  var m = a.hasOwnProperty("x"),
    E = a.hasOwnProperty("y"),
    O = ce,
    D = ae,
    L = window;
  if (d) {
    var I = rn(n),
      F = "clientHeight",
      j = "clientWidth";
    if (
      (I === Te(n) &&
        ((I = Xe(n)),
        He(I).position !== "static" &&
          u === "absolute" &&
          ((F = "scrollHeight"), (j = "scrollWidth"))),
      (I = I),
      i === ae || ((i === ce || i === _e) && o === xt))
    ) {
      D = pe;
      var $ = s && I === L && L.visualViewport ? L.visualViewport.height : I[F];
      (_ -= $ - r.height), (_ *= f ? 1 : -1);
    }
    if (i === ce || ((i === ae || i === pe) && o === xt)) {
      O = _e;
      var N = s && I === L && L.visualViewport ? L.visualViewport.width : I[j];
      (l -= N - r.width), (l *= f ? 1 : -1);
    }
  }
  var Y = Object.assign({ position: u }, d && cf),
    Q = g === !0 ? lf({ x: l, y: _ }) : { x: l, y: _ };
  if (((l = Q.x), (_ = Q.y), f)) {
    var A;
    return Object.assign(
      {},
      Y,
      ((A = {}),
      (A[D] = E ? "0" : ""),
      (A[O] = m ? "0" : ""),
      (A.transform =
        (L.devicePixelRatio || 1) <= 1
          ? "translate(" + l + "px, " + _ + "px)"
          : "translate3d(" + l + "px, " + _ + "px, 0)"),
      A)
    );
  }
  return Object.assign(
    {},
    Y,
    ((t = {}),
    (t[D] = E ? _ + "px" : ""),
    (t[O] = m ? l + "px" : ""),
    (t.transform = ""),
    t)
  );
}
function uf(e) {
  var t = e.state,
    n = e.options,
    r = n.gpuAcceleration,
    i = r === void 0 ? !0 : r,
    o = n.adaptive,
    a = o === void 0 ? !0 : o,
    u = n.roundOffsets,
    f = u === void 0 ? !0 : u,
    d = {
      placement: $e(t.placement),
      variation: Nt(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: i,
      isFixed: t.options.strategy === "fixed",
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Es(
        Object.assign({}, d, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: a,
          roundOffsets: f,
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        Es(
          Object.assign({}, d, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: f,
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    }));
}
const Oi = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: uf,
  data: {},
};
var mn = { passive: !0 };
function ff(e) {
  var t = e.state,
    n = e.instance,
    r = e.options,
    i = r.scroll,
    o = i === void 0 ? !0 : i,
    a = r.resize,
    u = a === void 0 ? !0 : a,
    f = Te(t.elements.popper),
    d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    o &&
      d.forEach(function (g) {
        g.addEventListener("scroll", n.update, mn);
      }),
    u && f.addEventListener("resize", n.update, mn),
    function () {
      o &&
        d.forEach(function (g) {
          g.removeEventListener("scroll", n.update, mn);
        }),
        u && f.removeEventListener("resize", n.update, mn);
    }
  );
}
const xi = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: ff,
  data: {},
};
var df = { left: "right", right: "left", bottom: "top", top: "bottom" };
function On(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return df[t];
  });
}
var hf = { start: "end", end: "start" };
function ws(e) {
  return e.replace(/start|end/g, function (t) {
    return hf[t];
  });
}
function $i(e) {
  var t = Te(e),
    n = t.pageXOffset,
    r = t.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function Ci(e) {
  return Dt(Xe(e)).left + $i(e).scrollLeft;
}
function pf(e) {
  var t = Te(e),
    n = Xe(e),
    r = t.visualViewport,
    i = n.clientWidth,
    o = n.clientHeight,
    a = 0,
    u = 0;
  return (
    r &&
      ((i = r.width),
      (o = r.height),
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
        ((a = r.offsetLeft), (u = r.offsetTop))),
    { width: i, height: o, x: a + Ci(e), y: u }
  );
}
function _f(e) {
  var t,
    n = Xe(e),
    r = $i(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    o = it(
      n.scrollWidth,
      n.clientWidth,
      i ? i.scrollWidth : 0,
      i ? i.clientWidth : 0
    ),
    a = it(
      n.scrollHeight,
      n.clientHeight,
      i ? i.scrollHeight : 0,
      i ? i.clientHeight : 0
    ),
    u = -r.scrollLeft + Ci(e),
    f = -r.scrollTop;
  return (
    He(i || n).direction === "rtl" &&
      (u += it(n.clientWidth, i ? i.clientWidth : 0) - o),
    { width: o, height: a, x: u, y: f }
  );
}
function Di(e) {
  var t = He(e),
    n = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function _a(e) {
  return ["html", "body", "#document"].indexOf(Ne(e)) >= 0
    ? e.ownerDocument.body
    : me(e) && Di(e)
    ? e
    : _a(qn(e));
}
function zt(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = _a(e),
    i = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
    o = Te(r),
    a = i ? [o].concat(o.visualViewport || [], Di(r) ? r : []) : r,
    u = t.concat(a);
  return i ? u : u.concat(zt(qn(a)));
}
function Hr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function mf(e) {
  var t = Dt(e);
  return (
    (t.top = t.top + e.clientTop),
    (t.left = t.left + e.clientLeft),
    (t.bottom = t.top + e.clientHeight),
    (t.right = t.left + e.clientWidth),
    (t.width = e.clientWidth),
    (t.height = e.clientHeight),
    (t.x = t.left),
    (t.y = t.top),
    t
  );
}
function As(e, t) {
  return t === bi ? Hr(pf(e)) : $t(t) ? mf(t) : Hr(_f(Xe(e)));
}
function gf(e) {
  var t = zt(qn(e)),
    n = ["absolute", "fixed"].indexOf(He(e).position) >= 0,
    r = n && me(e) ? rn(e) : e;
  return $t(r)
    ? t.filter(function (i) {
        return $t(i) && ua(i, r) && Ne(i) !== "body";
      })
    : [];
}
function vf(e, t, n) {
  var r = t === "clippingParents" ? gf(e) : [].concat(t),
    i = [].concat(r, [n]),
    o = i[0],
    a = i.reduce(function (u, f) {
      var d = As(e, f);
      return (
        (u.top = it(d.top, u.top)),
        (u.right = Mn(d.right, u.right)),
        (u.bottom = Mn(d.bottom, u.bottom)),
        (u.left = it(d.left, u.left)),
        u
      );
    }, As(e, o));
  return (
    (a.width = a.right - a.left),
    (a.height = a.bottom - a.top),
    (a.x = a.left),
    (a.y = a.top),
    a
  );
}
function ma(e) {
  var t = e.reference,
    n = e.element,
    r = e.placement,
    i = r ? $e(r) : null,
    o = r ? Nt(r) : null,
    a = t.x + t.width / 2 - n.width / 2,
    u = t.y + t.height / 2 - n.height / 2,
    f;
  switch (i) {
    case ae:
      f = { x: a, y: t.y - n.height };
      break;
    case pe:
      f = { x: a, y: t.y + t.height };
      break;
    case _e:
      f = { x: t.x + t.width, y: u };
      break;
    case ce:
      f = { x: t.x - n.width, y: u };
      break;
    default:
      f = { x: t.x, y: t.y };
  }
  var d = i ? Si(i) : null;
  if (d != null) {
    var g = d === "y" ? "height" : "width";
    switch (o) {
      case lt:
        f[d] = f[d] - (t[g] / 2 - n[g] / 2);
        break;
      case xt:
        f[d] = f[d] + (t[g] / 2 - n[g] / 2);
        break;
    }
  }
  return f;
}
function Mt(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    i = r === void 0 ? e.placement : r,
    o = n.boundary,
    a = o === void 0 ? Jo : o,
    u = n.rootBoundary,
    f = u === void 0 ? bi : u,
    d = n.elementContext,
    g = d === void 0 ? bt : d,
    s = n.altBoundary,
    c = s === void 0 ? !1 : s,
    l = n.padding,
    h = l === void 0 ? 0 : l,
    _ = da(typeof h != "number" ? h : ha(h, Ht)),
    p = g === bt ? Zo : bt,
    m = e.rects.popper,
    E = e.elements[c ? p : g],
    O = vf($t(E) ? E : E.contextElement || Xe(e.elements.popper), a, f),
    D = Dt(e.elements.reference),
    L = ma({ reference: D, element: m, strategy: "absolute", placement: i }),
    I = Hr(Object.assign({}, m, L)),
    F = g === bt ? I : D,
    j = {
      top: O.top - F.top + _.top,
      bottom: F.bottom - O.bottom + _.bottom,
      left: O.left - F.left + _.left,
      right: F.right - O.right + _.right,
    },
    $ = e.modifiersData.offset;
  if (g === bt && $) {
    var N = $[i];
    Object.keys(j).forEach(function (Y) {
      var Q = [_e, pe].indexOf(Y) >= 0 ? 1 : -1,
        A = [ae, pe].indexOf(Y) >= 0 ? "y" : "x";
      j[Y] += N[A] * Q;
    });
  }
  return j;
}
function yf(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    i = n.boundary,
    o = n.rootBoundary,
    a = n.padding,
    u = n.flipVariations,
    f = n.allowedAutoPlacements,
    d = f === void 0 ? Ei : f,
    g = Nt(r),
    s = g
      ? u
        ? Rr
        : Rr.filter(function (h) {
            return Nt(h) === g;
          })
      : Ht,
    c = s.filter(function (h) {
      return d.indexOf(h) >= 0;
    });
  c.length === 0 && (c = s);
  var l = c.reduce(function (h, _) {
    return (
      (h[_] = Mt(e, { placement: _, boundary: i, rootBoundary: o, padding: a })[
        $e(_)
      ]),
      h
    );
  }, {});
  return Object.keys(l).sort(function (h, _) {
    return l[h] - l[_];
  });
}
function bf(e) {
  if ($e(e) === Un) return [];
  var t = On(e);
  return [ws(e), t, ws(t)];
}
function Ef(e) {
  var t = e.state,
    n = e.options,
    r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (
      var i = n.mainAxis,
        o = i === void 0 ? !0 : i,
        a = n.altAxis,
        u = a === void 0 ? !0 : a,
        f = n.fallbackPlacements,
        d = n.padding,
        g = n.boundary,
        s = n.rootBoundary,
        c = n.altBoundary,
        l = n.flipVariations,
        h = l === void 0 ? !0 : l,
        _ = n.allowedAutoPlacements,
        p = t.options.placement,
        m = $e(p),
        E = m === p,
        O = f || (E || !h ? [On(p)] : bf(p)),
        D = [p].concat(O).reduce(function (K, G) {
          return K.concat(
            $e(G) === Un
              ? yf(t, {
                  placement: G,
                  boundary: g,
                  rootBoundary: s,
                  padding: d,
                  flipVariations: h,
                  allowedAutoPlacements: _,
                })
              : G
          );
        }, []),
        L = t.rects.reference,
        I = t.rects.popper,
        F = new Map(),
        j = !0,
        $ = D[0],
        N = 0;
      N < D.length;
      N++
    ) {
      var Y = D[N],
        Q = $e(Y),
        A = Nt(Y) === lt,
        b = [ae, pe].indexOf(Q) >= 0,
        v = b ? "width" : "height",
        T = Mt(t, {
          placement: Y,
          boundary: g,
          rootBoundary: s,
          altBoundary: c,
          padding: d,
        }),
        y = b ? (A ? _e : ce) : A ? pe : ae;
      L[v] > I[v] && (y = On(y));
      var x = On(y),
        S = [];
      if (
        (o && S.push(T[Q] <= 0),
        u && S.push(T[y] <= 0, T[x] <= 0),
        S.every(function (K) {
          return K;
        }))
      ) {
        ($ = Y), (j = !1);
        break;
      }
      F.set(Y, S);
    }
    if (j)
      for (
        var k = h ? 3 : 1,
          B = function (G) {
            var re = D.find(function (se) {
              var z = F.get(se);
              if (z)
                return z.slice(0, G).every(function (W) {
                  return W;
                });
            });
            if (re) return ($ = re), "break";
          },
          R = k;
        R > 0;
        R--
      ) {
        var V = B(R);
        if (V === "break") break;
      }
    t.placement !== $ &&
      ((t.modifiersData[r]._skip = !0), (t.placement = $), (t.reset = !0));
  }
}
const ga = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Ef,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function Ts(e, t, n) {
  return (
    n === void 0 && (n = { x: 0, y: 0 }),
    {
      top: e.top - t.height - n.y,
      right: e.right - t.width + n.x,
      bottom: e.bottom - t.height + n.y,
      left: e.left - t.width - n.x,
    }
  );
}
function Ss(e) {
  return [ae, _e, pe, ce].some(function (t) {
    return e[t] >= 0;
  });
}
function wf(e) {
  var t = e.state,
    n = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    o = t.modifiersData.preventOverflow,
    a = Mt(t, { elementContext: "reference" }),
    u = Mt(t, { altBoundary: !0 }),
    f = Ts(a, r),
    d = Ts(u, i, o),
    g = Ss(f),
    s = Ss(d);
  (t.modifiersData[n] = {
    referenceClippingOffsets: f,
    popperEscapeOffsets: d,
    isReferenceHidden: g,
    hasPopperEscaped: s,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": g,
      "data-popper-escaped": s,
    }));
}
const va = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: wf,
};
function Af(e, t, n) {
  var r = $e(e),
    i = [ce, ae].indexOf(r) >= 0 ? -1 : 1,
    o = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n,
    a = o[0],
    u = o[1];
  return (
    (a = a || 0),
    (u = (u || 0) * i),
    [ce, _e].indexOf(r) >= 0 ? { x: u, y: a } : { x: a, y: u }
  );
}
function Tf(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    i = n.offset,
    o = i === void 0 ? [0, 0] : i,
    a = Ei.reduce(function (g, s) {
      return (g[s] = Af(s, t.rects, o)), g;
    }, {}),
    u = a[t.placement],
    f = u.x,
    d = u.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += f),
    (t.modifiersData.popperOffsets.y += d)),
    (t.modifiersData[r] = a);
}
const ya = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Tf,
};
function Sf(e) {
  var t = e.state,
    n = e.name;
  t.modifiersData[n] = ma({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement,
  });
}
const Ni = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Sf,
  data: {},
};
function Of(e) {
  return e === "x" ? "y" : "x";
}
function xf(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    i = n.mainAxis,
    o = i === void 0 ? !0 : i,
    a = n.altAxis,
    u = a === void 0 ? !1 : a,
    f = n.boundary,
    d = n.rootBoundary,
    g = n.altBoundary,
    s = n.padding,
    c = n.tether,
    l = c === void 0 ? !0 : c,
    h = n.tetherOffset,
    _ = h === void 0 ? 0 : h,
    p = Mt(t, { boundary: f, rootBoundary: d, padding: s, altBoundary: g }),
    m = $e(t.placement),
    E = Nt(t.placement),
    O = !E,
    D = Si(m),
    L = Of(D),
    I = t.modifiersData.popperOffsets,
    F = t.rects.reference,
    j = t.rects.popper,
    $ =
      typeof _ == "function"
        ? _(Object.assign({}, t.rects, { placement: t.placement }))
        : _,
    N =
      typeof $ == "number"
        ? { mainAxis: $, altAxis: $ }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, $),
    Y = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    Q = { x: 0, y: 0 };
  if (!!I) {
    if (o) {
      var A,
        b = D === "y" ? ae : ce,
        v = D === "y" ? pe : _e,
        T = D === "y" ? "height" : "width",
        y = I[D],
        x = y + p[b],
        S = y - p[v],
        k = l ? -j[T] / 2 : 0,
        B = E === lt ? F[T] : j[T],
        R = E === lt ? -j[T] : -F[T],
        V = t.elements.arrow,
        K = l && V ? Ti(V) : { width: 0, height: 0 },
        G = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : fa(),
        re = G[b],
        se = G[v],
        z = qt(0, F[T], K[T]),
        W = O ? F[T] / 2 - k - z - re - N.mainAxis : B - z - re - N.mainAxis,
        J = O ? -F[T] / 2 + k + z + se + N.mainAxis : R + z + se + N.mainAxis,
        be = t.elements.arrow && rn(t.elements.arrow),
        Ee = be ? (D === "y" ? be.clientTop || 0 : be.clientLeft || 0) : 0,
        ts = (A = Y == null ? void 0 : Y[D]) != null ? A : 0,
        cl = y + W - ts - Ee,
        ll = y + J - ts,
        ns = qt(l ? Mn(x, cl) : x, y, l ? it(S, ll) : S);
      (I[D] = ns), (Q[D] = ns - y);
    }
    if (u) {
      var rs,
        ul = D === "x" ? ae : ce,
        fl = D === "x" ? pe : _e,
        Ze = I[L],
        _n = L === "y" ? "height" : "width",
        is = Ze + p[ul],
        ss = Ze - p[fl],
        dr = [ae, ce].indexOf(m) !== -1,
        os = (rs = Y == null ? void 0 : Y[L]) != null ? rs : 0,
        as = dr ? is : Ze - F[_n] - j[_n] - os + N.altAxis,
        cs = dr ? Ze + F[_n] + j[_n] - os - N.altAxis : ss,
        ls = l && dr ? rf(as, Ze, cs) : qt(l ? as : is, Ze, l ? cs : ss);
      (I[L] = ls), (Q[L] = ls - Ze);
    }
    t.modifiersData[r] = Q;
  }
}
const ba = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: xf,
  requiresIfExists: ["offset"],
};
function $f(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function Cf(e) {
  return e === Te(e) || !me(e) ? $i(e) : $f(e);
}
function Df(e) {
  var t = e.getBoundingClientRect(),
    n = Ct(t.width) / e.offsetWidth || 1,
    r = Ct(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Nf(e, t, n) {
  n === void 0 && (n = !1);
  var r = me(t),
    i = me(t) && Df(t),
    o = Xe(t),
    a = Dt(e, i),
    u = { scrollLeft: 0, scrollTop: 0 },
    f = { x: 0, y: 0 };
  return (
    (r || (!r && !n)) &&
      ((Ne(t) !== "body" || Di(o)) && (u = Cf(t)),
      me(t)
        ? ((f = Dt(t, !0)), (f.x += t.clientLeft), (f.y += t.clientTop))
        : o && (f.x = Ci(o))),
    {
      x: a.left + u.scrollLeft - f.x,
      y: a.top + u.scrollTop - f.y,
      width: a.width,
      height: a.height,
    }
  );
}
function Mf(e) {
  var t = new Map(),
    n = new Set(),
    r = [];
  e.forEach(function (o) {
    t.set(o.name, o);
  });
  function i(o) {
    n.add(o.name);
    var a = [].concat(o.requires || [], o.requiresIfExists || []);
    a.forEach(function (u) {
      if (!n.has(u)) {
        var f = t.get(u);
        f && i(f);
      }
    }),
      r.push(o);
  }
  return (
    e.forEach(function (o) {
      n.has(o.name) || i(o);
    }),
    r
  );
}
function Lf(e) {
  var t = Mf(e);
  return la.reduce(function (n, r) {
    return n.concat(
      t.filter(function (i) {
        return i.phase === r;
      })
    );
  }, []);
}
function If(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (n) {
          Promise.resolve().then(function () {
            (t = void 0), n(e());
          });
        })),
      t
    );
  };
}
function kf(e) {
  var t = e.reduce(function (n, r) {
    var i = n[r.name];
    return (
      (n[r.name] = i
        ? Object.assign({}, i, r, {
            options: Object.assign({}, i.options, r.options),
            data: Object.assign({}, i.data, r.data),
          })
        : r),
      n
    );
  }, {});
  return Object.keys(t).map(function (n) {
    return t[n];
  });
}
var Os = { placement: "bottom", modifiers: [], strategy: "absolute" };
function xs() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function zn(e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.defaultModifiers,
    r = n === void 0 ? [] : n,
    i = t.defaultOptions,
    o = i === void 0 ? Os : i;
  return function (u, f, d) {
    d === void 0 && (d = o);
    var g = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Os, o),
        modifiersData: {},
        elements: { reference: u, popper: f },
        attributes: {},
        styles: {},
      },
      s = [],
      c = !1,
      l = {
        state: g,
        setOptions: function (m) {
          var E = typeof m == "function" ? m(g.options) : m;
          _(),
            (g.options = Object.assign({}, o, g.options, E)),
            (g.scrollParents = {
              reference: $t(u)
                ? zt(u)
                : u.contextElement
                ? zt(u.contextElement)
                : [],
              popper: zt(f),
            });
          var O = Lf(kf([].concat(r, g.options.modifiers)));
          return (
            (g.orderedModifiers = O.filter(function (D) {
              return D.enabled;
            })),
            h(),
            l.update()
          );
        },
        forceUpdate: function () {
          if (!c) {
            var m = g.elements,
              E = m.reference,
              O = m.popper;
            if (!!xs(E, O)) {
              (g.rects = {
                reference: Nf(E, rn(O), g.options.strategy === "fixed"),
                popper: Ti(O),
              }),
                (g.reset = !1),
                (g.placement = g.options.placement),
                g.orderedModifiers.forEach(function (N) {
                  return (g.modifiersData[N.name] = Object.assign({}, N.data));
                });
              for (var D = 0; D < g.orderedModifiers.length; D++) {
                if (g.reset === !0) {
                  (g.reset = !1), (D = -1);
                  continue;
                }
                var L = g.orderedModifiers[D],
                  I = L.fn,
                  F = L.options,
                  j = F === void 0 ? {} : F,
                  $ = L.name;
                typeof I == "function" &&
                  (g = I({ state: g, options: j, name: $, instance: l }) || g);
              }
            }
          }
        },
        update: If(function () {
          return new Promise(function (p) {
            l.forceUpdate(), p(g);
          });
        }),
        destroy: function () {
          _(), (c = !0);
        },
      };
    if (!xs(u, f)) return l;
    l.setOptions(d).then(function (p) {
      !c && d.onFirstUpdate && d.onFirstUpdate(p);
    });
    function h() {
      g.orderedModifiers.forEach(function (p) {
        var m = p.name,
          E = p.options,
          O = E === void 0 ? {} : E,
          D = p.effect;
        if (typeof D == "function") {
          var L = D({ state: g, name: m, instance: l, options: O }),
            I = function () {};
          s.push(L || I);
        }
      });
    }
    function _() {
      s.forEach(function (p) {
        return p();
      }),
        (s = []);
    }
    return l;
  };
}
var Pf = zn(),
  Rf = [xi, Ni, Oi, Ai],
  Hf = zn({ defaultModifiers: Rf }),
  Bf = [xi, Ni, Oi, Ai, ya, ga, ba, pa, va],
  Mi = zn({ defaultModifiers: Bf });
const Ea = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      popperGenerator: zn,
      detectOverflow: Mt,
      createPopperBase: Pf,
      createPopper: Mi,
      createPopperLite: Hf,
      top: ae,
      bottom: pe,
      right: _e,
      left: ce,
      auto: Un,
      basePlacements: Ht,
      start: lt,
      end: xt,
      clippingParents: Jo,
      viewport: bi,
      popper: bt,
      reference: Zo,
      variationPlacements: Rr,
      placements: Ei,
      beforeRead: ea,
      read: ta,
      afterRead: na,
      beforeMain: ra,
      main: ia,
      afterMain: sa,
      beforeWrite: oa,
      write: aa,
      afterWrite: ca,
      modifierPhases: la,
      applyStyles: Ai,
      arrow: pa,
      computeStyles: Oi,
      eventListeners: xi,
      flip: ga,
      hide: va,
      offset: ya,
      popperOffsets: Ni,
      preventOverflow: ba,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
/*!
 * Bootstrap v5.3.3 (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ const Ve = new Map(),
  gr = {
    set(e, t, n) {
      Ve.has(e) || Ve.set(e, new Map());
      const r = Ve.get(e);
      if (!r.has(t) && r.size !== 0) {
        console.error(
          `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
            Array.from(r.keys())[0]
          }.`
        );
        return;
      }
      r.set(t, n);
    },
    get(e, t) {
      return (Ve.has(e) && Ve.get(e).get(t)) || null;
    },
    remove(e, t) {
      if (!Ve.has(e)) return;
      const n = Ve.get(e);
      n.delete(t), n.size === 0 && Ve.delete(e);
    },
  },
  Ff = 1e6,
  Vf = 1e3,
  Br = "transitionend",
  wa = (e) => (
    e &&
      window.CSS &&
      window.CSS.escape &&
      (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)),
    e
  ),
  jf = (e) =>
    e == null
      ? `${e}`
      : Object.prototype.toString
          .call(e)
          .match(/\s([a-z]+)/i)[1]
          .toLowerCase(),
  Wf = (e) => {
    do e += Math.floor(Math.random() * Ff);
    while (document.getElementById(e));
    return e;
  },
  Yf = (e) => {
    if (!e) return 0;
    let { transitionDuration: t, transitionDelay: n } =
      window.getComputedStyle(e);
    const r = Number.parseFloat(t),
      i = Number.parseFloat(n);
    return !r && !i
      ? 0
      : ((t = t.split(",")[0]),
        (n = n.split(",")[0]),
        (Number.parseFloat(t) + Number.parseFloat(n)) * Vf);
  },
  Aa = (e) => {
    e.dispatchEvent(new Event(Br));
  },
  Ie = (e) =>
    !e || typeof e != "object"
      ? !1
      : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"),
  We = (e) =>
    Ie(e)
      ? e.jquery
        ? e[0]
        : e
      : typeof e == "string" && e.length > 0
      ? document.querySelector(wa(e))
      : null,
  Bt = (e) => {
    if (!Ie(e) || e.getClientRects().length === 0) return !1;
    const t = getComputedStyle(e).getPropertyValue("visibility") === "visible",
      n = e.closest("details:not([open])");
    if (!n) return t;
    if (n !== e) {
      const r = e.closest("summary");
      if ((r && r.parentNode !== n) || r === null) return !1;
    }
    return t;
  },
  Ye = (e) =>
    !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled")
      ? !0
      : typeof e.disabled < "u"
      ? e.disabled
      : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false",
  Ta = (e) => {
    if (!document.documentElement.attachShadow) return null;
    if (typeof e.getRootNode == "function") {
      const t = e.getRootNode();
      return t instanceof ShadowRoot ? t : null;
    }
    return e instanceof ShadowRoot ? e : e.parentNode ? Ta(e.parentNode) : null;
  },
  Ln = () => {},
  sn = (e) => {
    e.offsetHeight;
  },
  Sa = () =>
    window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
      ? window.jQuery
      : null,
  vr = [],
  Gf = (e) => {
    document.readyState === "loading"
      ? (vr.length ||
          document.addEventListener("DOMContentLoaded", () => {
            for (const t of vr) t();
          }),
        vr.push(e))
      : e();
  },
  ge = () => document.documentElement.dir === "rtl",
  ye = (e) => {
    Gf(() => {
      const t = Sa();
      if (t) {
        const n = e.NAME,
          r = t.fn[n];
        (t.fn[n] = e.jQueryInterface),
          (t.fn[n].Constructor = e),
          (t.fn[n].noConflict = () => ((t.fn[n] = r), e.jQueryInterface));
      }
    });
  },
  fe = (e, t = [], n = e) => (typeof e == "function" ? e(...t) : n),
  Oa = (e, t, n = !0) => {
    if (!n) {
      fe(e);
      return;
    }
    const r = 5,
      i = Yf(t) + r;
    let o = !1;
    const a = ({ target: u }) => {
      u === t && ((o = !0), t.removeEventListener(Br, a), fe(e));
    };
    t.addEventListener(Br, a),
      setTimeout(() => {
        o || Aa(t);
      }, i);
  },
  Li = (e, t, n, r) => {
    const i = e.length;
    let o = e.indexOf(t);
    return o === -1
      ? !n && r
        ? e[i - 1]
        : e[0]
      : ((o += n ? 1 : -1),
        r && (o = (o + i) % i),
        e[Math.max(0, Math.min(o, i - 1))]);
  },
  Kf = /[^.]*(?=\..*)\.|.*/,
  Uf = /\..*/,
  qf = /::\d+$/,
  yr = {};
let $s = 1;
const xa = { mouseenter: "mouseover", mouseleave: "mouseout" },
  zf = new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll",
  ]);
function $a(e, t) {
  return (t && `${t}::${$s++}`) || e.uidEvent || $s++;
}
function Ca(e) {
  const t = $a(e);
  return (e.uidEvent = t), (yr[t] = yr[t] || {}), yr[t];
}
function Xf(e, t) {
  return function n(r) {
    return (
      Ii(r, { delegateTarget: e }),
      n.oneOff && w.off(e, r.type, t),
      t.apply(e, [r])
    );
  };
}
function Qf(e, t, n) {
  return function r(i) {
    const o = e.querySelectorAll(t);
    for (let { target: a } = i; a && a !== this; a = a.parentNode)
      for (const u of o)
        if (u === a)
          return (
            Ii(i, { delegateTarget: a }),
            r.oneOff && w.off(e, i.type, t, n),
            n.apply(a, [i])
          );
  };
}
function Da(e, t, n = null) {
  return Object.values(e).find(
    (r) => r.callable === t && r.delegationSelector === n
  );
}
function Na(e, t, n) {
  const r = typeof t == "string",
    i = r ? n : t || n;
  let o = Ma(e);
  return zf.has(o) || (o = e), [r, i, o];
}
function Cs(e, t, n, r, i) {
  if (typeof t != "string" || !e) return;
  let [o, a, u] = Na(t, n, r);
  t in xa &&
    (a = ((h) =>
      function (_) {
        if (
          !_.relatedTarget ||
          (_.relatedTarget !== _.delegateTarget &&
            !_.delegateTarget.contains(_.relatedTarget))
        )
          return h.call(this, _);
      })(a));
  const f = Ca(e),
    d = f[u] || (f[u] = {}),
    g = Da(d, a, o ? n : null);
  if (g) {
    g.oneOff = g.oneOff && i;
    return;
  }
  const s = $a(a, t.replace(Kf, "")),
    c = o ? Qf(e, n, a) : Xf(e, a);
  (c.delegationSelector = o ? n : null),
    (c.callable = a),
    (c.oneOff = i),
    (c.uidEvent = s),
    (d[s] = c),
    e.addEventListener(u, c, o);
}
function Fr(e, t, n, r, i) {
  const o = Da(t[n], r, i);
  !o || (e.removeEventListener(n, o, Boolean(i)), delete t[n][o.uidEvent]);
}
function Jf(e, t, n, r) {
  const i = t[n] || {};
  for (const [o, a] of Object.entries(i))
    o.includes(r) && Fr(e, t, n, a.callable, a.delegationSelector);
}
function Ma(e) {
  return (e = e.replace(Uf, "")), xa[e] || e;
}
const w = {
  on(e, t, n, r) {
    Cs(e, t, n, r, !1);
  },
  one(e, t, n, r) {
    Cs(e, t, n, r, !0);
  },
  off(e, t, n, r) {
    if (typeof t != "string" || !e) return;
    const [i, o, a] = Na(t, n, r),
      u = a !== t,
      f = Ca(e),
      d = f[a] || {},
      g = t.startsWith(".");
    if (typeof o < "u") {
      if (!Object.keys(d).length) return;
      Fr(e, f, a, o, i ? n : null);
      return;
    }
    if (g) for (const s of Object.keys(f)) Jf(e, f, s, t.slice(1));
    for (const [s, c] of Object.entries(d)) {
      const l = s.replace(qf, "");
      (!u || t.includes(l)) && Fr(e, f, a, c.callable, c.delegationSelector);
    }
  },
  trigger(e, t, n) {
    if (typeof t != "string" || !e) return null;
    const r = Sa(),
      i = Ma(t),
      o = t !== i;
    let a = null,
      u = !0,
      f = !0,
      d = !1;
    o &&
      r &&
      ((a = r.Event(t, n)),
      r(e).trigger(a),
      (u = !a.isPropagationStopped()),
      (f = !a.isImmediatePropagationStopped()),
      (d = a.isDefaultPrevented()));
    const g = Ii(new Event(t, { bubbles: u, cancelable: !0 }), n);
    return (
      d && g.preventDefault(),
      f && e.dispatchEvent(g),
      g.defaultPrevented && a && a.preventDefault(),
      g
    );
  },
};
function Ii(e, t = {}) {
  for (const [n, r] of Object.entries(t))
    try {
      e[n] = r;
    } catch {
      Object.defineProperty(e, n, {
        configurable: !0,
        get() {
          return r;
        },
      });
    }
  return e;
}
function Ds(e) {
  if (e === "true") return !0;
  if (e === "false") return !1;
  if (e === Number(e).toString()) return Number(e);
  if (e === "" || e === "null") return null;
  if (typeof e != "string") return e;
  try {
    return JSON.parse(decodeURIComponent(e));
  } catch {
    return e;
  }
}
function br(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const ke = {
  setDataAttribute(e, t, n) {
    e.setAttribute(`data-bs-${br(t)}`, n);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${br(t)}`);
  },
  getDataAttributes(e) {
    if (!e) return {};
    const t = {},
      n = Object.keys(e.dataset).filter(
        (r) => r.startsWith("bs") && !r.startsWith("bsConfig")
      );
    for (const r of n) {
      let i = r.replace(/^bs/, "");
      (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
        (t[i] = Ds(e.dataset[r]));
    }
    return t;
  },
  getDataAttribute(e, t) {
    return Ds(e.getAttribute(`data-bs-${br(t)}`));
  },
};
class on {
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error(
      'You have to implement the static method "NAME", for each component!'
    );
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, n) {
    const r = Ie(n) ? ke.getDataAttribute(n, "config") : {};
    return {
      ...this.constructor.Default,
      ...(typeof r == "object" ? r : {}),
      ...(Ie(n) ? ke.getDataAttributes(n) : {}),
      ...(typeof t == "object" ? t : {}),
    };
  }
  _typeCheckConfig(t, n = this.constructor.DefaultType) {
    for (const [r, i] of Object.entries(n)) {
      const o = t[r],
        a = Ie(o) ? "element" : jf(o);
      if (!new RegExp(i).test(a))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${a}" but expected type "${i}".`
        );
    }
  }
}
const Zf = "5.3.3";
class Se extends on {
  constructor(t, n) {
    super(),
      (t = We(t)),
      t &&
        ((this._element = t),
        (this._config = this._getConfig(n)),
        gr.set(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    gr.remove(this._element, this.constructor.DATA_KEY),
      w.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
  }
  _queueCallback(t, n, r = !0) {
    Oa(t, n, r);
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t, this._element)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  static getInstance(t) {
    return gr.get(We(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, n = {}) {
    return this.getInstance(t) || new this(t, typeof n == "object" ? n : null);
  }
  static get VERSION() {
    return Zf;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const Er = (e) => {
    let t = e.getAttribute("data-bs-target");
    if (!t || t === "#") {
      let n = e.getAttribute("href");
      if (!n || (!n.includes("#") && !n.startsWith("."))) return null;
      n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`),
        (t = n && n !== "#" ? n.trim() : null);
    }
    return t
      ? t
          .split(",")
          .map((n) => wa(n))
          .join(",")
      : null;
  },
  P = {
    find(e, t = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(t, e));
    },
    findOne(e, t = document.documentElement) {
      return Element.prototype.querySelector.call(t, e);
    },
    children(e, t) {
      return [].concat(...e.children).filter((n) => n.matches(t));
    },
    parents(e, t) {
      const n = [];
      let r = e.parentNode.closest(t);
      for (; r; ) n.push(r), (r = r.parentNode.closest(t));
      return n;
    },
    prev(e, t) {
      let n = e.previousElementSibling;
      for (; n; ) {
        if (n.matches(t)) return [n];
        n = n.previousElementSibling;
      }
      return [];
    },
    next(e, t) {
      let n = e.nextElementSibling;
      for (; n; ) {
        if (n.matches(t)) return [n];
        n = n.nextElementSibling;
      }
      return [];
    },
    focusableChildren(e) {
      const t = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "details",
        "[tabindex]",
        '[contenteditable="true"]',
      ]
        .map((n) => `${n}:not([tabindex^="-"])`)
        .join(",");
      return this.find(t, e).filter((n) => !Ye(n) && Bt(n));
    },
    getSelectorFromElement(e) {
      const t = Er(e);
      return t && P.findOne(t) ? t : null;
    },
    getElementFromSelector(e) {
      const t = Er(e);
      return t ? P.findOne(t) : null;
    },
    getMultipleElementsFromSelector(e) {
      const t = Er(e);
      return t ? P.find(t) : [];
    },
  },
  Xn = (e, t = "hide") => {
    const n = `click.dismiss${e.EVENT_KEY}`,
      r = e.NAME;
    w.on(document, n, `[data-bs-dismiss="${r}"]`, function (i) {
      if (
        (["A", "AREA"].includes(this.tagName) && i.preventDefault(), Ye(this))
      )
        return;
      const o = P.getElementFromSelector(this) || this.closest(`.${r}`);
      e.getOrCreateInstance(o)[t]();
    });
  },
  ed = "alert",
  td = "bs.alert",
  La = `.${td}`,
  nd = `close${La}`,
  rd = `closed${La}`,
  id = "fade",
  sd = "show";
class an extends Se {
  static get NAME() {
    return ed;
  }
  close() {
    if (w.trigger(this._element, nd).defaultPrevented) return;
    this._element.classList.remove(sd);
    const n = this._element.classList.contains(id);
    this._queueCallback(() => this._destroyElement(), this._element, n);
  }
  _destroyElement() {
    this._element.remove(), w.trigger(this._element, rd), this.dispose();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = an.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        n[t](this);
      }
    });
  }
}
Xn(an, "close");
ye(an);
const od = "button",
  ad = "bs.button",
  cd = `.${ad}`,
  ld = ".data-api",
  ud = "active",
  Ns = '[data-bs-toggle="button"]',
  fd = `click${cd}${ld}`;
class Qn extends Se {
  static get NAME() {
    return od;
  }
  toggle() {
    this._element.setAttribute(
      "aria-pressed",
      this._element.classList.toggle(ud)
    );
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Qn.getOrCreateInstance(this);
      t === "toggle" && n[t]();
    });
  }
}
w.on(document, fd, Ns, (e) => {
  e.preventDefault();
  const t = e.target.closest(Ns);
  Qn.getOrCreateInstance(t).toggle();
});
ye(Qn);
const dd = "swipe",
  Ft = ".bs.swipe",
  hd = `touchstart${Ft}`,
  pd = `touchmove${Ft}`,
  _d = `touchend${Ft}`,
  md = `pointerdown${Ft}`,
  gd = `pointerup${Ft}`,
  vd = "touch",
  yd = "pen",
  bd = "pointer-event",
  Ed = 40,
  wd = { endCallback: null, leftCallback: null, rightCallback: null },
  Ad = {
    endCallback: "(function|null)",
    leftCallback: "(function|null)",
    rightCallback: "(function|null)",
  };
class In extends on {
  constructor(t, n) {
    super(),
      (this._element = t),
      !(!t || !In.isSupported()) &&
        ((this._config = this._getConfig(n)),
        (this._deltaX = 0),
        (this._supportPointerEvents = Boolean(window.PointerEvent)),
        this._initEvents());
  }
  static get Default() {
    return wd;
  }
  static get DefaultType() {
    return Ad;
  }
  static get NAME() {
    return dd;
  }
  dispose() {
    w.off(this._element, Ft);
  }
  _start(t) {
    if (!this._supportPointerEvents) {
      this._deltaX = t.touches[0].clientX;
      return;
    }
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
  }
  _end(t) {
    this._eventIsPointerPenTouch(t) &&
      (this._deltaX = t.clientX - this._deltaX),
      this._handleSwipe(),
      fe(this._config.endCallback);
  }
  _move(t) {
    this._deltaX =
      t.touches && t.touches.length > 1
        ? 0
        : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= Ed) return;
    const n = t / this._deltaX;
    (this._deltaX = 0),
      n && fe(n > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents
      ? (w.on(this._element, md, (t) => this._start(t)),
        w.on(this._element, gd, (t) => this._end(t)),
        this._element.classList.add(bd))
      : (w.on(this._element, hd, (t) => this._start(t)),
        w.on(this._element, pd, (t) => this._move(t)),
        w.on(this._element, _d, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return (
      this._supportPointerEvents &&
      (t.pointerType === yd || t.pointerType === vd)
    );
  }
  static isSupported() {
    return (
      "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
    );
  }
}
const Td = "carousel",
  Sd = "bs.carousel",
  Qe = `.${Sd}`,
  Ia = ".data-api",
  Od = "ArrowLeft",
  xd = "ArrowRight",
  $d = 500,
  Wt = "next",
  gt = "prev",
  Et = "left",
  xn = "right",
  Cd = `slide${Qe}`,
  wr = `slid${Qe}`,
  Dd = `keydown${Qe}`,
  Nd = `mouseenter${Qe}`,
  Md = `mouseleave${Qe}`,
  Ld = `dragstart${Qe}`,
  Id = `load${Qe}${Ia}`,
  kd = `click${Qe}${Ia}`,
  ka = "carousel",
  gn = "active",
  Pd = "slide",
  Rd = "carousel-item-end",
  Hd = "carousel-item-start",
  Bd = "carousel-item-next",
  Fd = "carousel-item-prev",
  Pa = ".active",
  Ra = ".carousel-item",
  Vd = Pa + Ra,
  jd = ".carousel-item img",
  Wd = ".carousel-indicators",
  Yd = "[data-bs-slide], [data-bs-slide-to]",
  Gd = '[data-bs-ride="carousel"]',
  Kd = { [Od]: xn, [xd]: Et },
  Ud = {
    interval: 5e3,
    keyboard: !0,
    pause: "hover",
    ride: !1,
    touch: !0,
    wrap: !0,
  },
  qd = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    pause: "(string|boolean)",
    ride: "(boolean|string)",
    touch: "boolean",
    wrap: "boolean",
  };
class cn extends Se {
  constructor(t, n) {
    super(t, n),
      (this._interval = null),
      (this._activeElement = null),
      (this._isSliding = !1),
      (this.touchTimeout = null),
      (this._swipeHelper = null),
      (this._indicatorsElement = P.findOne(Wd, this._element)),
      this._addEventListeners(),
      this._config.ride === ka && this.cycle();
  }
  static get Default() {
    return Ud;
  }
  static get DefaultType() {
    return qd;
  }
  static get NAME() {
    return Td;
  }
  next() {
    this._slide(Wt);
  }
  nextWhenVisible() {
    !document.hidden && Bt(this._element) && this.next();
  }
  prev() {
    this._slide(gt);
  }
  pause() {
    this._isSliding && Aa(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(),
      this._updateInterval(),
      (this._interval = setInterval(
        () => this.nextWhenVisible(),
        this._config.interval
      ));
  }
  _maybeEnableCycle() {
    if (!!this._config.ride) {
      if (this._isSliding) {
        w.one(this._element, wr, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(t) {
    const n = this._getItems();
    if (t > n.length - 1 || t < 0) return;
    if (this._isSliding) {
      w.one(this._element, wr, () => this.to(t));
      return;
    }
    const r = this._getItemIndex(this._getActive());
    if (r === t) return;
    const i = t > r ? Wt : gt;
    this._slide(i, n[t]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  _configAfterMerge(t) {
    return (t.defaultInterval = t.interval), t;
  }
  _addEventListeners() {
    this._config.keyboard && w.on(this._element, Dd, (t) => this._keydown(t)),
      this._config.pause === "hover" &&
        (w.on(this._element, Nd, () => this.pause()),
        w.on(this._element, Md, () => this._maybeEnableCycle())),
      this._config.touch && In.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const r of P.find(jd, this._element))
      w.on(r, Ld, (i) => i.preventDefault());
    const n = {
      leftCallback: () => this._slide(this._directionToOrder(Et)),
      rightCallback: () => this._slide(this._directionToOrder(xn)),
      endCallback: () => {
        this._config.pause === "hover" &&
          (this.pause(),
          this.touchTimeout && clearTimeout(this.touchTimeout),
          (this.touchTimeout = setTimeout(
            () => this._maybeEnableCycle(),
            $d + this._config.interval
          )));
      },
    };
    this._swipeHelper = new In(this._element, n);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName)) return;
    const n = Kd[t.key];
    n && (t.preventDefault(), this._slide(this._directionToOrder(n)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement) return;
    const n = P.findOne(Pa, this._indicatorsElement);
    n.classList.remove(gn), n.removeAttribute("aria-current");
    const r = P.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    r && (r.classList.add(gn), r.setAttribute("aria-current", "true"));
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive();
    if (!t) return;
    const n = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
    this._config.interval = n || this._config.defaultInterval;
  }
  _slide(t, n = null) {
    if (this._isSliding) return;
    const r = this._getActive(),
      i = t === Wt,
      o = n || Li(this._getItems(), r, i, this._config.wrap);
    if (o === r) return;
    const a = this._getItemIndex(o),
      u = (l) =>
        w.trigger(this._element, l, {
          relatedTarget: o,
          direction: this._orderToDirection(t),
          from: this._getItemIndex(r),
          to: a,
        });
    if (u(Cd).defaultPrevented || !r || !o) return;
    const d = Boolean(this._interval);
    this.pause(),
      (this._isSliding = !0),
      this._setActiveIndicatorElement(a),
      (this._activeElement = o);
    const g = i ? Hd : Rd,
      s = i ? Bd : Fd;
    o.classList.add(s), sn(o), r.classList.add(g), o.classList.add(g);
    const c = () => {
      o.classList.remove(g, s),
        o.classList.add(gn),
        r.classList.remove(gn, s, g),
        (this._isSliding = !1),
        u(wr);
    };
    this._queueCallback(c, r, this._isAnimated()), d && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(Pd);
  }
  _getActive() {
    return P.findOne(Vd, this._element);
  }
  _getItems() {
    return P.find(Ra, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), (this._interval = null));
  }
  _directionToOrder(t) {
    return ge() ? (t === Et ? gt : Wt) : t === Et ? Wt : gt;
  }
  _orderToDirection(t) {
    return ge() ? (t === gt ? Et : xn) : t === gt ? xn : Et;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = cn.getOrCreateInstance(this, t);
      if (typeof t == "number") {
        n.to(t);
        return;
      }
      if (typeof t == "string") {
        if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
w.on(document, kd, Yd, function (e) {
  const t = P.getElementFromSelector(this);
  if (!t || !t.classList.contains(ka)) return;
  e.preventDefault();
  const n = cn.getOrCreateInstance(t),
    r = this.getAttribute("data-bs-slide-to");
  if (r) {
    n.to(r), n._maybeEnableCycle();
    return;
  }
  if (ke.getDataAttribute(this, "slide") === "next") {
    n.next(), n._maybeEnableCycle();
    return;
  }
  n.prev(), n._maybeEnableCycle();
});
w.on(window, Id, () => {
  const e = P.find(Gd);
  for (const t of e) cn.getOrCreateInstance(t);
});
ye(cn);
const zd = "collapse",
  Xd = "bs.collapse",
  ln = `.${Xd}`,
  Qd = ".data-api",
  Jd = `show${ln}`,
  Zd = `shown${ln}`,
  eh = `hide${ln}`,
  th = `hidden${ln}`,
  nh = `click${ln}${Qd}`,
  Ar = "show",
  At = "collapse",
  vn = "collapsing",
  rh = "collapsed",
  ih = `:scope .${At} .${At}`,
  sh = "collapse-horizontal",
  oh = "width",
  ah = "height",
  ch = ".collapse.show, .collapse.collapsing",
  Vr = '[data-bs-toggle="collapse"]',
  lh = { parent: null, toggle: !0 },
  uh = { parent: "(null|element)", toggle: "boolean" };
class Lt extends Se {
  constructor(t, n) {
    super(t, n), (this._isTransitioning = !1), (this._triggerArray = []);
    const r = P.find(Vr);
    for (const i of r) {
      const o = P.getSelectorFromElement(i),
        a = P.find(o).filter((u) => u === this._element);
      o !== null && a.length && this._triggerArray.push(i);
    }
    this._initializeChildren(),
      this._config.parent ||
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
      this._config.toggle && this.toggle();
  }
  static get Default() {
    return lh;
  }
  static get DefaultType() {
    return uh;
  }
  static get NAME() {
    return zd;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown()) return;
    let t = [];
    if (
      (this._config.parent &&
        (t = this._getFirstLevelChildren(ch)
          .filter((u) => u !== this._element)
          .map((u) => Lt.getOrCreateInstance(u, { toggle: !1 }))),
      (t.length && t[0]._isTransitioning) ||
        w.trigger(this._element, Jd).defaultPrevented)
    )
      return;
    for (const u of t) u.hide();
    const r = this._getDimension();
    this._element.classList.remove(At),
      this._element.classList.add(vn),
      (this._element.style[r] = 0),
      this._addAriaAndCollapsedClass(this._triggerArray, !0),
      (this._isTransitioning = !0);
    const i = () => {
        (this._isTransitioning = !1),
          this._element.classList.remove(vn),
          this._element.classList.add(At, Ar),
          (this._element.style[r] = ""),
          w.trigger(this._element, Zd);
      },
      a = `scroll${r[0].toUpperCase() + r.slice(1)}`;
    this._queueCallback(i, this._element, !0),
      (this._element.style[r] = `${this._element[a]}px`);
  }
  hide() {
    if (
      this._isTransitioning ||
      !this._isShown() ||
      w.trigger(this._element, eh).defaultPrevented
    )
      return;
    const n = this._getDimension();
    (this._element.style[n] = `${this._element.getBoundingClientRect()[n]}px`),
      sn(this._element),
      this._element.classList.add(vn),
      this._element.classList.remove(At, Ar);
    for (const i of this._triggerArray) {
      const o = P.getElementFromSelector(i);
      o && !this._isShown(o) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const r = () => {
      (this._isTransitioning = !1),
        this._element.classList.remove(vn),
        this._element.classList.add(At),
        w.trigger(this._element, th);
    };
    (this._element.style[n] = ""), this._queueCallback(r, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(Ar);
  }
  _configAfterMerge(t) {
    return (t.toggle = Boolean(t.toggle)), (t.parent = We(t.parent)), t;
  }
  _getDimension() {
    return this._element.classList.contains(sh) ? oh : ah;
  }
  _initializeChildren() {
    if (!this._config.parent) return;
    const t = this._getFirstLevelChildren(Vr);
    for (const n of t) {
      const r = P.getElementFromSelector(n);
      r && this._addAriaAndCollapsedClass([n], this._isShown(r));
    }
  }
  _getFirstLevelChildren(t) {
    const n = P.find(ih, this._config.parent);
    return P.find(t, this._config.parent).filter((r) => !n.includes(r));
  }
  _addAriaAndCollapsedClass(t, n) {
    if (!!t.length)
      for (const r of t)
        r.classList.toggle(rh, !n), r.setAttribute("aria-expanded", n);
  }
  static jQueryInterface(t) {
    const n = {};
    return (
      typeof t == "string" && /show|hide/.test(t) && (n.toggle = !1),
      this.each(function () {
        const r = Lt.getOrCreateInstance(this, n);
        if (typeof t == "string") {
          if (typeof r[t] > "u") throw new TypeError(`No method named "${t}"`);
          r[t]();
        }
      })
    );
  }
}
w.on(document, nh, Vr, function (e) {
  (e.target.tagName === "A" ||
    (e.delegateTarget && e.delegateTarget.tagName === "A")) &&
    e.preventDefault();
  for (const t of P.getMultipleElementsFromSelector(this))
    Lt.getOrCreateInstance(t, { toggle: !1 }).toggle();
});
ye(Lt);
const Ms = "dropdown",
  fh = "bs.dropdown",
  pt = `.${fh}`,
  ki = ".data-api",
  dh = "Escape",
  Ls = "Tab",
  hh = "ArrowUp",
  Is = "ArrowDown",
  ph = 2,
  _h = `hide${pt}`,
  mh = `hidden${pt}`,
  gh = `show${pt}`,
  vh = `shown${pt}`,
  Ha = `click${pt}${ki}`,
  Ba = `keydown${pt}${ki}`,
  yh = `keyup${pt}${ki}`,
  wt = "show",
  bh = "dropup",
  Eh = "dropend",
  wh = "dropstart",
  Ah = "dropup-center",
  Th = "dropdown-center",
  nt = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
  Sh = `${nt}.${wt}`,
  $n = ".dropdown-menu",
  Oh = ".navbar",
  xh = ".navbar-nav",
  $h = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
  Ch = ge() ? "top-end" : "top-start",
  Dh = ge() ? "top-start" : "top-end",
  Nh = ge() ? "bottom-end" : "bottom-start",
  Mh = ge() ? "bottom-start" : "bottom-end",
  Lh = ge() ? "left-start" : "right-start",
  Ih = ge() ? "right-start" : "left-start",
  kh = "top",
  Ph = "bottom",
  Rh = {
    autoClose: !0,
    boundary: "clippingParents",
    display: "dynamic",
    offset: [0, 2],
    popperConfig: null,
    reference: "toggle",
  },
  Hh = {
    autoClose: "(boolean|string)",
    boundary: "(string|element)",
    display: "string",
    offset: "(array|string|function)",
    popperConfig: "(null|object|function)",
    reference: "(string|element|object)",
  };
class Ce extends Se {
  constructor(t, n) {
    super(t, n),
      (this._popper = null),
      (this._parent = this._element.parentNode),
      (this._menu =
        P.next(this._element, $n)[0] ||
        P.prev(this._element, $n)[0] ||
        P.findOne($n, this._parent)),
      (this._inNavbar = this._detectNavbar());
  }
  static get Default() {
    return Rh;
  }
  static get DefaultType() {
    return Hh;
  }
  static get NAME() {
    return Ms;
  }
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (Ye(this._element) || this._isShown()) return;
    const t = { relatedTarget: this._element };
    if (!w.trigger(this._element, gh, t).defaultPrevented) {
      if (
        (this._createPopper(),
        "ontouchstart" in document.documentElement && !this._parent.closest(xh))
      )
        for (const r of [].concat(...document.body.children))
          w.on(r, "mouseover", Ln);
      this._element.focus(),
        this._element.setAttribute("aria-expanded", !0),
        this._menu.classList.add(wt),
        this._element.classList.add(wt),
        w.trigger(this._element, vh, t);
    }
  }
  hide() {
    if (Ye(this._element) || !this._isShown()) return;
    const t = { relatedTarget: this._element };
    this._completeHide(t);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    (this._inNavbar = this._detectNavbar()),
      this._popper && this._popper.update();
  }
  _completeHide(t) {
    if (!w.trigger(this._element, _h, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const r of [].concat(...document.body.children))
          w.off(r, "mouseover", Ln);
      this._popper && this._popper.destroy(),
        this._menu.classList.remove(wt),
        this._element.classList.remove(wt),
        this._element.setAttribute("aria-expanded", "false"),
        ke.removeDataAttribute(this._menu, "popper"),
        w.trigger(this._element, mh, t);
    }
  }
  _getConfig(t) {
    if (
      ((t = super._getConfig(t)),
      typeof t.reference == "object" &&
        !Ie(t.reference) &&
        typeof t.reference.getBoundingClientRect != "function")
    )
      throw new TypeError(
        `${Ms.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
      );
    return t;
  }
  _createPopper() {
    if (typeof Ea > "u")
      throw new TypeError(
        "Bootstrap's dropdowns require Popper (https://popper.js.org)"
      );
    let t = this._element;
    this._config.reference === "parent"
      ? (t = this._parent)
      : Ie(this._config.reference)
      ? (t = We(this._config.reference))
      : typeof this._config.reference == "object" &&
        (t = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = Mi(t, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(wt);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Eh)) return Lh;
    if (t.classList.contains(wh)) return Ih;
    if (t.classList.contains(Ah)) return kh;
    if (t.classList.contains(Th)) return Ph;
    const n =
      getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() ===
      "end";
    return t.classList.contains(bh) ? (n ? Dh : Ch) : n ? Mh : Nh;
  }
  _detectNavbar() {
    return this._element.closest(Oh) !== null;
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string"
      ? t.split(",").map((n) => Number.parseInt(n, 10))
      : typeof t == "function"
      ? (n) => t(n, this._element)
      : t;
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        { name: "offset", options: { offset: this._getOffset() } },
      ],
    };
    return (
      (this._inNavbar || this._config.display === "static") &&
        (ke.setDataAttribute(this._menu, "popper", "static"),
        (t.modifiers = [{ name: "applyStyles", enabled: !1 }])),
      { ...t, ...fe(this._config.popperConfig, [t]) }
    );
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = P.find($h, this._menu).filter((i) => Bt(i));
    !r.length || Li(r, n, t === Is, !r.includes(n)).focus();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Ce.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === ph || (t.type === "keyup" && t.key !== Ls)) return;
    const n = P.find(Sh);
    for (const r of n) {
      const i = Ce.getInstance(r);
      if (!i || i._config.autoClose === !1) continue;
      const o = t.composedPath(),
        a = o.includes(i._menu);
      if (
        o.includes(i._element) ||
        (i._config.autoClose === "inside" && !a) ||
        (i._config.autoClose === "outside" && a) ||
        (i._menu.contains(t.target) &&
          ((t.type === "keyup" && t.key === Ls) ||
            /input|select|option|textarea|form/i.test(t.target.tagName)))
      )
        continue;
      const u = { relatedTarget: i._element };
      t.type === "click" && (u.clickEvent = t), i._completeHide(u);
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName),
      r = t.key === dh,
      i = [hh, Is].includes(t.key);
    if ((!i && !r) || (n && !r)) return;
    t.preventDefault();
    const o = this.matches(nt)
        ? this
        : P.prev(this, nt)[0] ||
          P.next(this, nt)[0] ||
          P.findOne(nt, t.delegateTarget.parentNode),
      a = Ce.getOrCreateInstance(o);
    if (i) {
      t.stopPropagation(), a.show(), a._selectMenuItem(t);
      return;
    }
    a._isShown() && (t.stopPropagation(), a.hide(), o.focus());
  }
}
w.on(document, Ba, nt, Ce.dataApiKeydownHandler);
w.on(document, Ba, $n, Ce.dataApiKeydownHandler);
w.on(document, Ha, Ce.clearMenus);
w.on(document, yh, Ce.clearMenus);
w.on(document, Ha, nt, function (e) {
  e.preventDefault(), Ce.getOrCreateInstance(this).toggle();
});
ye(Ce);
const Fa = "backdrop",
  Bh = "fade",
  ks = "show",
  Ps = `mousedown.bs.${Fa}`,
  Fh = {
    className: "modal-backdrop",
    clickCallback: null,
    isAnimated: !1,
    isVisible: !0,
    rootElement: "body",
  },
  Vh = {
    className: "string",
    clickCallback: "(function|null)",
    isAnimated: "boolean",
    isVisible: "boolean",
    rootElement: "(element|string)",
  };
class Va extends on {
  constructor(t) {
    super(),
      (this._config = this._getConfig(t)),
      (this._isAppended = !1),
      (this._element = null);
  }
  static get Default() {
    return Fh;
  }
  static get DefaultType() {
    return Vh;
  }
  static get NAME() {
    return Fa;
  }
  show(t) {
    if (!this._config.isVisible) {
      fe(t);
      return;
    }
    this._append();
    const n = this._getElement();
    this._config.isAnimated && sn(n),
      n.classList.add(ks),
      this._emulateAnimation(() => {
        fe(t);
      });
  }
  hide(t) {
    if (!this._config.isVisible) {
      fe(t);
      return;
    }
    this._getElement().classList.remove(ks),
      this._emulateAnimation(() => {
        this.dispose(), fe(t);
      });
  }
  dispose() {
    !this._isAppended ||
      (w.off(this._element, Ps),
      this._element.remove(),
      (this._isAppended = !1));
  }
  _getElement() {
    if (!this._element) {
      const t = document.createElement("div");
      (t.className = this._config.className),
        this._config.isAnimated && t.classList.add(Bh),
        (this._element = t);
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return (t.rootElement = We(t.rootElement)), t;
  }
  _append() {
    if (this._isAppended) return;
    const t = this._getElement();
    this._config.rootElement.append(t),
      w.on(t, Ps, () => {
        fe(this._config.clickCallback);
      }),
      (this._isAppended = !0);
  }
  _emulateAnimation(t) {
    Oa(t, this._getElement(), this._config.isAnimated);
  }
}
const jh = "focustrap",
  Wh = "bs.focustrap",
  kn = `.${Wh}`,
  Yh = `focusin${kn}`,
  Gh = `keydown.tab${kn}`,
  Kh = "Tab",
  Uh = "forward",
  Rs = "backward",
  qh = { autofocus: !0, trapElement: null },
  zh = { autofocus: "boolean", trapElement: "element" };
class ja extends on {
  constructor(t) {
    super(),
      (this._config = this._getConfig(t)),
      (this._isActive = !1),
      (this._lastTabNavDirection = null);
  }
  static get Default() {
    return qh;
  }
  static get DefaultType() {
    return zh;
  }
  static get NAME() {
    return jh;
  }
  activate() {
    this._isActive ||
      (this._config.autofocus && this._config.trapElement.focus(),
      w.off(document, kn),
      w.on(document, Yh, (t) => this._handleFocusin(t)),
      w.on(document, Gh, (t) => this._handleKeydown(t)),
      (this._isActive = !0));
  }
  deactivate() {
    !this._isActive || ((this._isActive = !1), w.off(document, kn));
  }
  _handleFocusin(t) {
    const { trapElement: n } = this._config;
    if (t.target === document || t.target === n || n.contains(t.target)) return;
    const r = P.focusableChildren(n);
    r.length === 0
      ? n.focus()
      : this._lastTabNavDirection === Rs
      ? r[r.length - 1].focus()
      : r[0].focus();
  }
  _handleKeydown(t) {
    t.key === Kh && (this._lastTabNavDirection = t.shiftKey ? Rs : Uh);
  }
}
const Hs = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
  Bs = ".sticky-top",
  yn = "padding-right",
  Fs = "margin-right";
class jr {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow(),
      this._setElementAttributes(this._element, yn, (n) => n + t),
      this._setElementAttributes(Hs, yn, (n) => n + t),
      this._setElementAttributes(Bs, Fs, (n) => n - t);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"),
      this._resetElementAttributes(this._element, yn),
      this._resetElementAttributes(Hs, yn),
      this._resetElementAttributes(Bs, Fs);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"),
      (this._element.style.overflow = "hidden");
  }
  _setElementAttributes(t, n, r) {
    const i = this.getWidth(),
      o = (a) => {
        if (a !== this._element && window.innerWidth > a.clientWidth + i)
          return;
        this._saveInitialAttribute(a, n);
        const u = window.getComputedStyle(a).getPropertyValue(n);
        a.style.setProperty(n, `${r(Number.parseFloat(u))}px`);
      };
    this._applyManipulationCallback(t, o);
  }
  _saveInitialAttribute(t, n) {
    const r = t.style.getPropertyValue(n);
    r && ke.setDataAttribute(t, n, r);
  }
  _resetElementAttributes(t, n) {
    const r = (i) => {
      const o = ke.getDataAttribute(i, n);
      if (o === null) {
        i.style.removeProperty(n);
        return;
      }
      ke.removeDataAttribute(i, n), i.style.setProperty(n, o);
    };
    this._applyManipulationCallback(t, r);
  }
  _applyManipulationCallback(t, n) {
    if (Ie(t)) {
      n(t);
      return;
    }
    for (const r of P.find(t, this._element)) n(r);
  }
}
const Xh = "modal",
  Qh = "bs.modal",
  ve = `.${Qh}`,
  Jh = ".data-api",
  Zh = "Escape",
  ep = `hide${ve}`,
  tp = `hidePrevented${ve}`,
  Wa = `hidden${ve}`,
  Ya = `show${ve}`,
  np = `shown${ve}`,
  rp = `resize${ve}`,
  ip = `click.dismiss${ve}`,
  sp = `mousedown.dismiss${ve}`,
  op = `keydown.dismiss${ve}`,
  ap = `click${ve}${Jh}`,
  Vs = "modal-open",
  cp = "fade",
  js = "show",
  Tr = "modal-static",
  lp = ".modal.show",
  up = ".modal-dialog",
  fp = ".modal-body",
  dp = '[data-bs-toggle="modal"]',
  hp = { backdrop: !0, focus: !0, keyboard: !0 },
  pp = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
class ut extends Se {
  constructor(t, n) {
    super(t, n),
      (this._dialog = P.findOne(up, this._element)),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      (this._isShown = !1),
      (this._isTransitioning = !1),
      (this._scrollBar = new jr()),
      this._addEventListeners();
  }
  static get Default() {
    return hp;
  }
  static get DefaultType() {
    return pp;
  }
  static get NAME() {
    return Xh;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown ||
      this._isTransitioning ||
      w.trigger(this._element, Ya, { relatedTarget: t }).defaultPrevented ||
      ((this._isShown = !0),
      (this._isTransitioning = !0),
      this._scrollBar.hide(),
      document.body.classList.add(Vs),
      this._adjustDialog(),
      this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown ||
      this._isTransitioning ||
      w.trigger(this._element, ep).defaultPrevented ||
      ((this._isShown = !1),
      (this._isTransitioning = !0),
      this._focustrap.deactivate(),
      this._element.classList.remove(js),
      this._queueCallback(
        () => this._hideModal(),
        this._element,
        this._isAnimated()
      ));
  }
  dispose() {
    w.off(window, ve),
      w.off(this._dialog, ve),
      this._backdrop.dispose(),
      this._focustrap.deactivate(),
      super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  _initializeBackDrop() {
    return new Va({
      isVisible: Boolean(this._config.backdrop),
      isAnimated: this._isAnimated(),
    });
  }
  _initializeFocusTrap() {
    return new ja({ trapElement: this._element });
  }
  _showElement(t) {
    document.body.contains(this._element) ||
      document.body.append(this._element),
      (this._element.style.display = "block"),
      this._element.removeAttribute("aria-hidden"),
      this._element.setAttribute("aria-modal", !0),
      this._element.setAttribute("role", "dialog"),
      (this._element.scrollTop = 0);
    const n = P.findOne(fp, this._dialog);
    n && (n.scrollTop = 0), sn(this._element), this._element.classList.add(js);
    const r = () => {
      this._config.focus && this._focustrap.activate(),
        (this._isTransitioning = !1),
        w.trigger(this._element, np, { relatedTarget: t });
    };
    this._queueCallback(r, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    w.on(this._element, op, (t) => {
      if (t.key === Zh) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }),
      w.on(window, rp, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog();
      }),
      w.on(this._element, sp, (t) => {
        w.one(this._element, ip, (n) => {
          if (!(this._element !== t.target || this._element !== n.target)) {
            if (this._config.backdrop === "static") {
              this._triggerBackdropTransition();
              return;
            }
            this._config.backdrop && this.hide();
          }
        });
      });
  }
  _hideModal() {
    (this._element.style.display = "none"),
      this._element.setAttribute("aria-hidden", !0),
      this._element.removeAttribute("aria-modal"),
      this._element.removeAttribute("role"),
      (this._isTransitioning = !1),
      this._backdrop.hide(() => {
        document.body.classList.remove(Vs),
          this._resetAdjustments(),
          this._scrollBar.reset(),
          w.trigger(this._element, Wa);
      });
  }
  _isAnimated() {
    return this._element.classList.contains(cp);
  }
  _triggerBackdropTransition() {
    if (w.trigger(this._element, tp).defaultPrevented) return;
    const n =
        this._element.scrollHeight > document.documentElement.clientHeight,
      r = this._element.style.overflowY;
    r === "hidden" ||
      this._element.classList.contains(Tr) ||
      (n || (this._element.style.overflowY = "hidden"),
      this._element.classList.add(Tr),
      this._queueCallback(() => {
        this._element.classList.remove(Tr),
          this._queueCallback(() => {
            this._element.style.overflowY = r;
          }, this._dialog);
      }, this._dialog),
      this._element.focus());
  }
  _adjustDialog() {
    const t =
        this._element.scrollHeight > document.documentElement.clientHeight,
      n = this._scrollBar.getWidth(),
      r = n > 0;
    if (r && !t) {
      const i = ge() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${n}px`;
    }
    if (!r && t) {
      const i = ge() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${n}px`;
    }
  }
  _resetAdjustments() {
    (this._element.style.paddingLeft = ""),
      (this._element.style.paddingRight = "");
  }
  static jQueryInterface(t, n) {
    return this.each(function () {
      const r = ut.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof r[t] > "u") throw new TypeError(`No method named "${t}"`);
        r[t](n);
      }
    });
  }
}
w.on(document, ap, dp, function (e) {
  const t = P.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
    w.one(t, Ya, (i) => {
      i.defaultPrevented ||
        w.one(t, Wa, () => {
          Bt(this) && this.focus();
        });
    });
  const n = P.findOne(lp);
  n && ut.getInstance(n).hide(), ut.getOrCreateInstance(t).toggle(this);
});
Xn(ut);
ye(ut);
const _p = "offcanvas",
  mp = "bs.offcanvas",
  Fe = `.${mp}`,
  Ga = ".data-api",
  gp = `load${Fe}${Ga}`,
  vp = "Escape",
  Ws = "show",
  Ys = "showing",
  Gs = "hiding",
  yp = "offcanvas-backdrop",
  Ka = ".offcanvas.show",
  bp = `show${Fe}`,
  Ep = `shown${Fe}`,
  wp = `hide${Fe}`,
  Ks = `hidePrevented${Fe}`,
  Ua = `hidden${Fe}`,
  Ap = `resize${Fe}`,
  Tp = `click${Fe}${Ga}`,
  Sp = `keydown.dismiss${Fe}`,
  Op = '[data-bs-toggle="offcanvas"]',
  xp = { backdrop: !0, keyboard: !0, scroll: !1 },
  $p = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
class Ge extends Se {
  constructor(t, n) {
    super(t, n),
      (this._isShown = !1),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      this._addEventListeners();
  }
  static get Default() {
    return xp;
  }
  static get DefaultType() {
    return $p;
  }
  static get NAME() {
    return _p;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (
      this._isShown ||
      w.trigger(this._element, bp, { relatedTarget: t }).defaultPrevented
    )
      return;
    (this._isShown = !0),
      this._backdrop.show(),
      this._config.scroll || new jr().hide(),
      this._element.setAttribute("aria-modal", !0),
      this._element.setAttribute("role", "dialog"),
      this._element.classList.add(Ys);
    const r = () => {
      (!this._config.scroll || this._config.backdrop) &&
        this._focustrap.activate(),
        this._element.classList.add(Ws),
        this._element.classList.remove(Ys),
        w.trigger(this._element, Ep, { relatedTarget: t });
    };
    this._queueCallback(r, this._element, !0);
  }
  hide() {
    if (!this._isShown || w.trigger(this._element, wp).defaultPrevented) return;
    this._focustrap.deactivate(),
      this._element.blur(),
      (this._isShown = !1),
      this._element.classList.add(Gs),
      this._backdrop.hide();
    const n = () => {
      this._element.classList.remove(Ws, Gs),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        this._config.scroll || new jr().reset(),
        w.trigger(this._element, Ua);
    };
    this._queueCallback(n, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  _initializeBackDrop() {
    const t = () => {
        if (this._config.backdrop === "static") {
          w.trigger(this._element, Ks);
          return;
        }
        this.hide();
      },
      n = Boolean(this._config.backdrop);
    return new Va({
      className: yp,
      isVisible: n,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: n ? t : null,
    });
  }
  _initializeFocusTrap() {
    return new ja({ trapElement: this._element });
  }
  _addEventListeners() {
    w.on(this._element, Sp, (t) => {
      if (t.key === vp) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        w.trigger(this._element, Ks);
      }
    });
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Ge.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        n[t](this);
      }
    });
  }
}
w.on(document, Tp, Op, function (e) {
  const t = P.getElementFromSelector(this);
  if ((["A", "AREA"].includes(this.tagName) && e.preventDefault(), Ye(this)))
    return;
  w.one(t, Ua, () => {
    Bt(this) && this.focus();
  });
  const n = P.findOne(Ka);
  n && n !== t && Ge.getInstance(n).hide(),
    Ge.getOrCreateInstance(t).toggle(this);
});
w.on(window, gp, () => {
  for (const e of P.find(Ka)) Ge.getOrCreateInstance(e).show();
});
w.on(window, Ap, () => {
  for (const e of P.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(e).position !== "fixed" &&
      Ge.getOrCreateInstance(e).hide();
});
Xn(Ge);
ye(Ge);
const Cp = /^aria-[\w-]*$/i,
  qa = {
    "*": ["class", "dir", "id", "lang", "role", Cp],
    a: ["target", "href", "title", "rel"],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    dd: [],
    div: [],
    dl: [],
    dt: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ["src", "srcset", "alt", "title", "width", "height"],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: [],
  },
  Dp = new Set([
    "background",
    "cite",
    "href",
    "itemtype",
    "longdesc",
    "poster",
    "src",
    "xlink:href",
  ]),
  Np = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
  Mp = (e, t) => {
    const n = e.nodeName.toLowerCase();
    return t.includes(n)
      ? Dp.has(n)
        ? Boolean(Np.test(e.nodeValue))
        : !0
      : t.filter((r) => r instanceof RegExp).some((r) => r.test(n));
  };
function Lp(e, t, n) {
  if (!e.length) return e;
  if (n && typeof n == "function") return n(e);
  const i = new window.DOMParser().parseFromString(e, "text/html"),
    o = [].concat(...i.body.querySelectorAll("*"));
  for (const a of o) {
    const u = a.nodeName.toLowerCase();
    if (!Object.keys(t).includes(u)) {
      a.remove();
      continue;
    }
    const f = [].concat(...a.attributes),
      d = [].concat(t["*"] || [], t[u] || []);
    for (const g of f) Mp(g, d) || a.removeAttribute(g.nodeName);
  }
  return i.body.innerHTML;
}
const Ip = "TemplateFactory",
  kp = {
    allowList: qa,
    content: {},
    extraClass: "",
    html: !1,
    sanitize: !0,
    sanitizeFn: null,
    template: "<div></div>",
  },
  Pp = {
    allowList: "object",
    content: "object",
    extraClass: "(string|function)",
    html: "boolean",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    template: "string",
  },
  Rp = {
    entry: "(string|element|function|null)",
    selector: "(string|element)",
  };
class Hp extends on {
  constructor(t) {
    super(), (this._config = this._getConfig(t));
  }
  static get Default() {
    return kp;
  }
  static get DefaultType() {
    return Pp;
  }
  static get NAME() {
    return Ip;
  }
  getContent() {
    return Object.values(this._config.content)
      .map((t) => this._resolvePossibleFunction(t))
      .filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(t) {
    return (
      this._checkContent(t),
      (this._config.content = { ...this._config.content, ...t }),
      this
    );
  }
  toHtml() {
    const t = document.createElement("div");
    t.innerHTML = this._maybeSanitize(this._config.template);
    for (const [i, o] of Object.entries(this._config.content))
      this._setContent(t, o, i);
    const n = t.children[0],
      r = this._resolvePossibleFunction(this._config.extraClass);
    return r && n.classList.add(...r.split(" ")), n;
  }
  _typeCheckConfig(t) {
    super._typeCheckConfig(t), this._checkContent(t.content);
  }
  _checkContent(t) {
    for (const [n, r] of Object.entries(t))
      super._typeCheckConfig({ selector: n, entry: r }, Rp);
  }
  _setContent(t, n, r) {
    const i = P.findOne(r, t);
    if (!!i) {
      if (((n = this._resolvePossibleFunction(n)), !n)) {
        i.remove();
        return;
      }
      if (Ie(n)) {
        this._putElementInTemplate(We(n), i);
        return;
      }
      if (this._config.html) {
        i.innerHTML = this._maybeSanitize(n);
        return;
      }
      i.textContent = n;
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize
      ? Lp(t, this._config.allowList, this._config.sanitizeFn)
      : t;
  }
  _resolvePossibleFunction(t) {
    return fe(t, [this]);
  }
  _putElementInTemplate(t, n) {
    if (this._config.html) {
      (n.innerHTML = ""), n.append(t);
      return;
    }
    n.textContent = t.textContent;
  }
}
const Bp = "tooltip",
  Fp = new Set(["sanitize", "allowList", "sanitizeFn"]),
  Sr = "fade",
  Vp = "modal",
  bn = "show",
  jp = ".tooltip-inner",
  Us = `.${Vp}`,
  qs = "hide.bs.modal",
  Yt = "hover",
  Or = "focus",
  Wp = "click",
  Yp = "manual",
  Gp = "hide",
  Kp = "hidden",
  Up = "show",
  qp = "shown",
  zp = "inserted",
  Xp = "click",
  Qp = "focusin",
  Jp = "focusout",
  Zp = "mouseenter",
  e_ = "mouseleave",
  t_ = {
    AUTO: "auto",
    TOP: "top",
    RIGHT: ge() ? "left" : "right",
    BOTTOM: "bottom",
    LEFT: ge() ? "right" : "left",
  },
  n_ = {
    allowList: qa,
    animation: !0,
    boundary: "clippingParents",
    container: !1,
    customClass: "",
    delay: 0,
    fallbackPlacements: ["top", "right", "bottom", "left"],
    html: !1,
    offset: [0, 6],
    placement: "top",
    popperConfig: null,
    sanitize: !0,
    sanitizeFn: null,
    selector: !1,
    template:
      '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: "",
    trigger: "hover focus",
  },
  r_ = {
    allowList: "object",
    animation: "boolean",
    boundary: "(string|element)",
    container: "(string|element|boolean)",
    customClass: "(string|function)",
    delay: "(number|object)",
    fallbackPlacements: "array",
    html: "boolean",
    offset: "(array|string|function)",
    placement: "(string|function)",
    popperConfig: "(null|object|function)",
    sanitize: "boolean",
    sanitizeFn: "(null|function)",
    selector: "(string|boolean)",
    template: "string",
    title: "(string|element|function)",
    trigger: "string",
  };
class _t extends Se {
  constructor(t, n) {
    if (typeof Ea > "u")
      throw new TypeError(
        "Bootstrap's tooltips require Popper (https://popper.js.org)"
      );
    super(t, n),
      (this._isEnabled = !0),
      (this._timeout = 0),
      (this._isHovered = null),
      (this._activeTrigger = {}),
      (this._popper = null),
      (this._templateFactory = null),
      (this._newContent = null),
      (this.tip = null),
      this._setListeners(),
      this._config.selector || this._fixTitle();
  }
  static get Default() {
    return n_;
  }
  static get DefaultType() {
    return r_;
  }
  static get NAME() {
    return Bp;
  }
  enable() {
    this._isEnabled = !0;
  }
  disable() {
    this._isEnabled = !1;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (!!this._isEnabled) {
      if (
        ((this._activeTrigger.click = !this._activeTrigger.click),
        this._isShown())
      ) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout),
      w.off(this._element.closest(Us), qs, this._hideModalHandler),
      this._element.getAttribute("data-bs-original-title") &&
        this._element.setAttribute(
          "title",
          this._element.getAttribute("data-bs-original-title")
        ),
      this._disposePopper(),
      super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled)) return;
    const t = w.trigger(this._element, this.constructor.eventName(Up)),
      r = (
        Ta(this._element) || this._element.ownerDocument.documentElement
      ).contains(this._element);
    if (t.defaultPrevented || !r) return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const { container: o } = this._config;
    if (
      (this._element.ownerDocument.documentElement.contains(this.tip) ||
        (o.append(i), w.trigger(this._element, this.constructor.eventName(zp))),
      (this._popper = this._createPopper(i)),
      i.classList.add(bn),
      "ontouchstart" in document.documentElement)
    )
      for (const u of [].concat(...document.body.children))
        w.on(u, "mouseover", Ln);
    const a = () => {
      w.trigger(this._element, this.constructor.eventName(qp)),
        this._isHovered === !1 && this._leave(),
        (this._isHovered = !1);
    };
    this._queueCallback(a, this.tip, this._isAnimated());
  }
  hide() {
    if (
      !this._isShown() ||
      w.trigger(this._element, this.constructor.eventName(Gp)).defaultPrevented
    )
      return;
    if (
      (this._getTipElement().classList.remove(bn),
      "ontouchstart" in document.documentElement)
    )
      for (const i of [].concat(...document.body.children))
        w.off(i, "mouseover", Ln);
    (this._activeTrigger[Wp] = !1),
      (this._activeTrigger[Or] = !1),
      (this._activeTrigger[Yt] = !1),
      (this._isHovered = null);
    const r = () => {
      this._isWithActiveTrigger() ||
        (this._isHovered || this._disposePopper(),
        this._element.removeAttribute("aria-describedby"),
        w.trigger(this._element, this.constructor.eventName(Kp)));
    };
    this._queueCallback(r, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    return (
      this.tip ||
        (this.tip = this._createTipElement(
          this._newContent || this._getContentForTemplate()
        )),
      this.tip
    );
  }
  _createTipElement(t) {
    const n = this._getTemplateFactory(t).toHtml();
    if (!n) return null;
    n.classList.remove(Sr, bn),
      n.classList.add(`bs-${this.constructor.NAME}-auto`);
    const r = Wf(this.constructor.NAME).toString();
    return (
      n.setAttribute("id", r), this._isAnimated() && n.classList.add(Sr), n
    );
  }
  setContent(t) {
    (this._newContent = t),
      this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return (
      this._templateFactory
        ? this._templateFactory.changeContent(t)
        : (this._templateFactory = new Hp({
            ...this._config,
            content: t,
            extraClass: this._resolvePossibleFunction(this._config.customClass),
          })),
      this._templateFactory
    );
  }
  _getContentForTemplate() {
    return { [jp]: this._getTitle() };
  }
  _getTitle() {
    return (
      this._resolvePossibleFunction(this._config.title) ||
      this._element.getAttribute("data-bs-original-title")
    );
  }
  _initializeOnDelegatedTarget(t) {
    return this.constructor.getOrCreateInstance(
      t.delegateTarget,
      this._getDelegateConfig()
    );
  }
  _isAnimated() {
    return (
      this._config.animation || (this.tip && this.tip.classList.contains(Sr))
    );
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(bn);
  }
  _createPopper(t) {
    const n = fe(this._config.placement, [this, t, this._element]),
      r = t_[n.toUpperCase()];
    return Mi(this._element, t, this._getPopperConfig(r));
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string"
      ? t.split(",").map((n) => Number.parseInt(n, 10))
      : typeof t == "function"
      ? (n) => t(n, this._element)
      : t;
  }
  _resolvePossibleFunction(t) {
    return fe(t, [this._element]);
  }
  _getPopperConfig(t) {
    const n = {
      placement: t,
      modifiers: [
        {
          name: "flip",
          options: { fallbackPlacements: this._config.fallbackPlacements },
        },
        { name: "offset", options: { offset: this._getOffset() } },
        {
          name: "preventOverflow",
          options: { boundary: this._config.boundary },
        },
        {
          name: "arrow",
          options: { element: `.${this.constructor.NAME}-arrow` },
        },
        {
          name: "preSetPlacement",
          enabled: !0,
          phase: "beforeMain",
          fn: (r) => {
            this._getTipElement().setAttribute(
              "data-popper-placement",
              r.state.placement
            );
          },
        },
      ],
    };
    return { ...n, ...fe(this._config.popperConfig, [n]) };
  }
  _setListeners() {
    const t = this._config.trigger.split(" ");
    for (const n of t)
      if (n === "click")
        w.on(
          this._element,
          this.constructor.eventName(Xp),
          this._config.selector,
          (r) => {
            this._initializeOnDelegatedTarget(r).toggle();
          }
        );
      else if (n !== Yp) {
        const r =
            n === Yt
              ? this.constructor.eventName(Zp)
              : this.constructor.eventName(Qp),
          i =
            n === Yt
              ? this.constructor.eventName(e_)
              : this.constructor.eventName(Jp);
        w.on(this._element, r, this._config.selector, (o) => {
          const a = this._initializeOnDelegatedTarget(o);
          (a._activeTrigger[o.type === "focusin" ? Or : Yt] = !0), a._enter();
        }),
          w.on(this._element, i, this._config.selector, (o) => {
            const a = this._initializeOnDelegatedTarget(o);
            (a._activeTrigger[o.type === "focusout" ? Or : Yt] =
              a._element.contains(o.relatedTarget)),
              a._leave();
          });
      }
    (this._hideModalHandler = () => {
      this._element && this.hide();
    }),
      w.on(this._element.closest(Us), qs, this._hideModalHandler);
  }
  _fixTitle() {
    const t = this._element.getAttribute("title");
    !t ||
      (!this._element.getAttribute("aria-label") &&
        !this._element.textContent.trim() &&
        this._element.setAttribute("aria-label", t),
      this._element.setAttribute("data-bs-original-title", t),
      this._element.removeAttribute("title"));
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0;
      return;
    }
    (this._isHovered = !0),
      this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show);
  }
  _leave() {
    this._isWithActiveTrigger() ||
      ((this._isHovered = !1),
      this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide));
  }
  _setTimeout(t, n) {
    clearTimeout(this._timeout), (this._timeout = setTimeout(t, n));
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(t) {
    const n = ke.getDataAttributes(this._element);
    for (const r of Object.keys(n)) Fp.has(r) && delete n[r];
    return (
      (t = { ...n, ...(typeof t == "object" && t ? t : {}) }),
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  _configAfterMerge(t) {
    return (
      (t.container = t.container === !1 ? document.body : We(t.container)),
      typeof t.delay == "number" &&
        (t.delay = { show: t.delay, hide: t.delay }),
      typeof t.title == "number" && (t.title = t.title.toString()),
      typeof t.content == "number" && (t.content = t.content.toString()),
      t
    );
  }
  _getDelegateConfig() {
    const t = {};
    for (const [n, r] of Object.entries(this._config))
      this.constructor.Default[n] !== r && (t[n] = r);
    return (t.selector = !1), (t.trigger = "manual"), t;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), (this._popper = null)),
      this.tip && (this.tip.remove(), (this.tip = null));
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = _t.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
ye(_t);
const i_ = "popover",
  s_ = ".popover-header",
  o_ = ".popover-body",
  a_ = {
    ..._t.Default,
    content: "",
    offset: [0, 8],
    placement: "right",
    template:
      '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    trigger: "click",
  },
  c_ = { ..._t.DefaultType, content: "(null|string|element|function)" };
class Pi extends _t {
  static get Default() {
    return a_;
  }
  static get DefaultType() {
    return c_;
  }
  static get NAME() {
    return i_;
  }
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  _getContentForTemplate() {
    return { [s_]: this._getTitle(), [o_]: this._getContent() };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Pi.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
ye(Pi);
const l_ = "scrollspy",
  u_ = "bs.scrollspy",
  Ri = `.${u_}`,
  f_ = ".data-api",
  d_ = `activate${Ri}`,
  zs = `click${Ri}`,
  h_ = `load${Ri}${f_}`,
  p_ = "dropdown-item",
  vt = "active",
  __ = '[data-bs-spy="scroll"]',
  xr = "[href]",
  m_ = ".nav, .list-group",
  Xs = ".nav-link",
  g_ = ".nav-item",
  v_ = ".list-group-item",
  y_ = `${Xs}, ${g_} > ${Xs}, ${v_}`,
  b_ = ".dropdown",
  E_ = ".dropdown-toggle",
  w_ = {
    offset: null,
    rootMargin: "0px 0px -25%",
    smoothScroll: !1,
    target: null,
    threshold: [0.1, 0.5, 1],
  },
  A_ = {
    offset: "(number|null)",
    rootMargin: "string",
    smoothScroll: "boolean",
    target: "element",
    threshold: "array",
  };
class Jn extends Se {
  constructor(t, n) {
    super(t, n),
      (this._targetLinks = new Map()),
      (this._observableSections = new Map()),
      (this._rootElement =
        getComputedStyle(this._element).overflowY === "visible"
          ? null
          : this._element),
      (this._activeTarget = null),
      (this._observer = null),
      (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
      this.refresh();
  }
  static get Default() {
    return w_;
  }
  static get DefaultType() {
    return A_;
  }
  static get NAME() {
    return l_;
  }
  refresh() {
    this._initializeTargetsAndObservables(),
      this._maybeEnableSmoothScroll(),
      this._observer
        ? this._observer.disconnect()
        : (this._observer = this._getNewObserver());
    for (const t of this._observableSections.values())
      this._observer.observe(t);
  }
  dispose() {
    this._observer.disconnect(), super.dispose();
  }
  _configAfterMerge(t) {
    return (
      (t.target = We(t.target) || document.body),
      (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
      typeof t.threshold == "string" &&
        (t.threshold = t.threshold.split(",").map((n) => Number.parseFloat(n))),
      t
    );
  }
  _maybeEnableSmoothScroll() {
    !this._config.smoothScroll ||
      (w.off(this._config.target, zs),
      w.on(this._config.target, zs, xr, (t) => {
        const n = this._observableSections.get(t.target.hash);
        if (n) {
          t.preventDefault();
          const r = this._rootElement || window,
            i = n.offsetTop - this._element.offsetTop;
          if (r.scrollTo) {
            r.scrollTo({ top: i, behavior: "smooth" });
            return;
          }
          r.scrollTop = i;
        }
      }));
  }
  _getNewObserver() {
    const t = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin,
    };
    return new IntersectionObserver((n) => this._observerCallback(n), t);
  }
  _observerCallback(t) {
    const n = (a) => this._targetLinks.get(`#${a.target.id}`),
      r = (a) => {
        (this._previousScrollData.visibleEntryTop = a.target.offsetTop),
          this._process(n(a));
      },
      i = (this._rootElement || document.documentElement).scrollTop,
      o = i >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = i;
    for (const a of t) {
      if (!a.isIntersecting) {
        (this._activeTarget = null), this._clearActiveClass(n(a));
        continue;
      }
      const u = a.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (o && u) {
        if ((r(a), !i)) return;
        continue;
      }
      !o && !u && r(a);
    }
  }
  _initializeTargetsAndObservables() {
    (this._targetLinks = new Map()), (this._observableSections = new Map());
    const t = P.find(xr, this._config.target);
    for (const n of t) {
      if (!n.hash || Ye(n)) continue;
      const r = P.findOne(decodeURI(n.hash), this._element);
      Bt(r) &&
        (this._targetLinks.set(decodeURI(n.hash), n),
        this._observableSections.set(n.hash, r));
    }
  }
  _process(t) {
    this._activeTarget !== t &&
      (this._clearActiveClass(this._config.target),
      (this._activeTarget = t),
      t.classList.add(vt),
      this._activateParents(t),
      w.trigger(this._element, d_, { relatedTarget: t }));
  }
  _activateParents(t) {
    if (t.classList.contains(p_)) {
      P.findOne(E_, t.closest(b_)).classList.add(vt);
      return;
    }
    for (const n of P.parents(t, m_))
      for (const r of P.prev(n, y_)) r.classList.add(vt);
  }
  _clearActiveClass(t) {
    t.classList.remove(vt);
    const n = P.find(`${xr}.${vt}`, t);
    for (const r of n) r.classList.remove(vt);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Jn.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
w.on(window, h_, () => {
  for (const e of P.find(__)) Jn.getOrCreateInstance(e);
});
ye(Jn);
const T_ = "tab",
  S_ = "bs.tab",
  mt = `.${S_}`,
  O_ = `hide${mt}`,
  x_ = `hidden${mt}`,
  $_ = `show${mt}`,
  C_ = `shown${mt}`,
  D_ = `click${mt}`,
  N_ = `keydown${mt}`,
  M_ = `load${mt}`,
  L_ = "ArrowLeft",
  Qs = "ArrowRight",
  I_ = "ArrowUp",
  Js = "ArrowDown",
  $r = "Home",
  Zs = "End",
  rt = "active",
  eo = "fade",
  Cr = "show",
  k_ = "dropdown",
  za = ".dropdown-toggle",
  P_ = ".dropdown-menu",
  Dr = `:not(${za})`,
  R_ = '.list-group, .nav, [role="tablist"]',
  H_ = ".nav-item, .list-group-item",
  B_ = `.nav-link${Dr}, .list-group-item${Dr}, [role="tab"]${Dr}`,
  Xa =
    '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
  Nr = `${B_}, ${Xa}`,
  F_ = `.${rt}[data-bs-toggle="tab"], .${rt}[data-bs-toggle="pill"], .${rt}[data-bs-toggle="list"]`;
class It extends Se {
  constructor(t) {
    super(t),
      (this._parent = this._element.closest(R_)),
      this._parent &&
        (this._setInitialAttributes(this._parent, this._getChildren()),
        w.on(this._element, N_, (n) => this._keydown(n)));
  }
  static get NAME() {
    return T_;
  }
  show() {
    const t = this._element;
    if (this._elemIsActive(t)) return;
    const n = this._getActiveElem(),
      r = n ? w.trigger(n, O_, { relatedTarget: t }) : null;
    w.trigger(t, $_, { relatedTarget: n }).defaultPrevented ||
      (r && r.defaultPrevented) ||
      (this._deactivate(n, t), this._activate(t, n));
  }
  _activate(t, n) {
    if (!t) return;
    t.classList.add(rt), this._activate(P.getElementFromSelector(t));
    const r = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.add(Cr);
        return;
      }
      t.removeAttribute("tabindex"),
        t.setAttribute("aria-selected", !0),
        this._toggleDropDown(t, !0),
        w.trigger(t, C_, { relatedTarget: n });
    };
    this._queueCallback(r, t, t.classList.contains(eo));
  }
  _deactivate(t, n) {
    if (!t) return;
    t.classList.remove(rt),
      t.blur(),
      this._deactivate(P.getElementFromSelector(t));
    const r = () => {
      if (t.getAttribute("role") !== "tab") {
        t.classList.remove(Cr);
        return;
      }
      t.setAttribute("aria-selected", !1),
        t.setAttribute("tabindex", "-1"),
        this._toggleDropDown(t, !1),
        w.trigger(t, x_, { relatedTarget: n });
    };
    this._queueCallback(r, t, t.classList.contains(eo));
  }
  _keydown(t) {
    if (![L_, Qs, I_, Js, $r, Zs].includes(t.key)) return;
    t.stopPropagation(), t.preventDefault();
    const n = this._getChildren().filter((i) => !Ye(i));
    let r;
    if ([$r, Zs].includes(t.key)) r = n[t.key === $r ? 0 : n.length - 1];
    else {
      const i = [Qs, Js].includes(t.key);
      r = Li(n, t.target, i, !0);
    }
    r && (r.focus({ preventScroll: !0 }), It.getOrCreateInstance(r).show());
  }
  _getChildren() {
    return P.find(Nr, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null;
  }
  _setInitialAttributes(t, n) {
    this._setAttributeIfNotExists(t, "role", "tablist");
    for (const r of n) this._setInitialAttributesOnChild(r);
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t);
    const n = this._elemIsActive(t),
      r = this._getOuterElement(t);
    t.setAttribute("aria-selected", n),
      r !== t && this._setAttributeIfNotExists(r, "role", "presentation"),
      n || t.setAttribute("tabindex", "-1"),
      this._setAttributeIfNotExists(t, "role", "tab"),
      this._setInitialAttributesOnTargetPanel(t);
  }
  _setInitialAttributesOnTargetPanel(t) {
    const n = P.getElementFromSelector(t);
    !n ||
      (this._setAttributeIfNotExists(n, "role", "tabpanel"),
      t.id && this._setAttributeIfNotExists(n, "aria-labelledby", `${t.id}`));
  }
  _toggleDropDown(t, n) {
    const r = this._getOuterElement(t);
    if (!r.classList.contains(k_)) return;
    const i = (o, a) => {
      const u = P.findOne(o, r);
      u && u.classList.toggle(a, n);
    };
    i(za, rt), i(P_, Cr), r.setAttribute("aria-expanded", n);
  }
  _setAttributeIfNotExists(t, n, r) {
    t.hasAttribute(n) || t.setAttribute(n, r);
  }
  _elemIsActive(t) {
    return t.classList.contains(rt);
  }
  _getInnerElement(t) {
    return t.matches(Nr) ? t : P.findOne(Nr, t);
  }
  _getOuterElement(t) {
    return t.closest(H_) || t;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = It.getOrCreateInstance(this);
      if (typeof t == "string") {
        if (n[t] === void 0 || t.startsWith("_") || t === "constructor")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
w.on(document, D_, Xa, function (e) {
  ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
    !Ye(this) && It.getOrCreateInstance(this).show();
});
w.on(window, M_, () => {
  for (const e of P.find(F_)) It.getOrCreateInstance(e);
});
ye(It);
const V_ = "toast",
  j_ = "bs.toast",
  Je = `.${j_}`,
  W_ = `mouseover${Je}`,
  Y_ = `mouseout${Je}`,
  G_ = `focusin${Je}`,
  K_ = `focusout${Je}`,
  U_ = `hide${Je}`,
  q_ = `hidden${Je}`,
  z_ = `show${Je}`,
  X_ = `shown${Je}`,
  Q_ = "fade",
  to = "hide",
  En = "show",
  wn = "showing",
  J_ = { animation: "boolean", autohide: "boolean", delay: "number" },
  Z_ = { animation: !0, autohide: !0, delay: 5e3 };
class un extends Se {
  constructor(t, n) {
    super(t, n),
      (this._timeout = null),
      (this._hasMouseInteraction = !1),
      (this._hasKeyboardInteraction = !1),
      this._setListeners();
  }
  static get Default() {
    return Z_;
  }
  static get DefaultType() {
    return J_;
  }
  static get NAME() {
    return V_;
  }
  show() {
    if (w.trigger(this._element, z_).defaultPrevented) return;
    this._clearTimeout(),
      this._config.animation && this._element.classList.add(Q_);
    const n = () => {
      this._element.classList.remove(wn),
        w.trigger(this._element, X_),
        this._maybeScheduleHide();
    };
    this._element.classList.remove(to),
      sn(this._element),
      this._element.classList.add(En, wn),
      this._queueCallback(n, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || w.trigger(this._element, U_).defaultPrevented)
      return;
    const n = () => {
      this._element.classList.add(to),
        this._element.classList.remove(wn, En),
        w.trigger(this._element, q_);
    };
    this._element.classList.add(wn),
      this._queueCallback(n, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(),
      this.isShown() && this._element.classList.remove(En),
      super.dispose();
  }
  isShown() {
    return this._element.classList.contains(En);
  }
  _maybeScheduleHide() {
    !this._config.autohide ||
      this._hasMouseInteraction ||
      this._hasKeyboardInteraction ||
      (this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay));
  }
  _onInteraction(t, n) {
    switch (t.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = n;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = n;
        break;
      }
    }
    if (n) {
      this._clearTimeout();
      return;
    }
    const r = t.relatedTarget;
    this._element === r ||
      this._element.contains(r) ||
      this._maybeScheduleHide();
  }
  _setListeners() {
    w.on(this._element, W_, (t) => this._onInteraction(t, !0)),
      w.on(this._element, Y_, (t) => this._onInteraction(t, !1)),
      w.on(this._element, G_, (t) => this._onInteraction(t, !0)),
      w.on(this._element, K_, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), (this._timeout = null);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = un.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
        n[t](this);
      }
    });
  }
}
Xn(un);
ye(un);
const em = () => {
    [].slice.call(document.querySelectorAll(".alert")).map(function (t) {
      return new an(t);
    });
  },
  tm = () => {
    [].slice
      .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .map((t) => new _t(t));
  },
  nm = () => {
    [].slice
      .call(document.querySelectorAll(".collapse"))
      .map((t) => new Lt(t, { toggle: !1 }));
  };
var Wr = !1,
  Yr = !1,
  st = [];
function rm(e) {
  im(e);
}
function im(e) {
  st.includes(e) || st.push(e), sm();
}
function Qa(e) {
  let t = st.indexOf(e);
  t !== -1 && st.splice(t, 1);
}
function sm() {
  !Yr && !Wr && ((Wr = !0), queueMicrotask(om));
}
function om() {
  (Wr = !1), (Yr = !0);
  for (let e = 0; e < st.length; e++) st[e]();
  (st.length = 0), (Yr = !1);
}
var Vt,
  fn,
  Zn,
  Ja,
  Gr = !0;
function am(e) {
  (Gr = !1), e(), (Gr = !0);
}
function cm(e) {
  (Vt = e.reactive),
    (Zn = e.release),
    (fn = (t) =>
      e.effect(t, {
        scheduler: (n) => {
          Gr ? rm(n) : n();
        },
      })),
    (Ja = e.raw);
}
function no(e) {
  fn = e;
}
function lm(e) {
  let t = () => {};
  return [
    (r) => {
      let i = fn(r);
      return (
        e._x_effects ||
          ((e._x_effects = new Set()),
          (e._x_runEffects = () => {
            e._x_effects.forEach((o) => o());
          })),
        e._x_effects.add(i),
        (t = () => {
          i !== void 0 && (e._x_effects.delete(i), Zn(i));
        }),
        i
      );
    },
    () => {
      t();
    },
  ];
}
var Za = [],
  ec = [],
  tc = [];
function um(e) {
  tc.push(e);
}
function nc(e, t) {
  typeof t == "function"
    ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
    : ((t = e), ec.push(t));
}
function fm(e) {
  Za.push(e);
}
function dm(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}),
    e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
    e._x_attributeCleanups[t].push(n);
}
function rc(e, t) {
  !e._x_attributeCleanups ||
    Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
      (t === void 0 || t.includes(n)) &&
        (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
    });
}
var Hi = new MutationObserver(Vi),
  Bi = !1;
function ic() {
  Hi.observe(document, {
    subtree: !0,
    childList: !0,
    attributes: !0,
    attributeOldValue: !0,
  }),
    (Bi = !0);
}
function hm() {
  pm(), Hi.disconnect(), (Bi = !1);
}
var Xt = [],
  Mr = !1;
function pm() {
  (Xt = Xt.concat(Hi.takeRecords())),
    Xt.length &&
      !Mr &&
      ((Mr = !0),
      queueMicrotask(() => {
        _m(), (Mr = !1);
      }));
}
function _m() {
  Vi(Xt), (Xt.length = 0);
}
function te(e) {
  if (!Bi) return e();
  hm();
  let t = e();
  return ic(), t;
}
var Fi = !1,
  Pn = [];
function mm() {
  Fi = !0;
}
function gm() {
  (Fi = !1), Vi(Pn), (Pn = []);
}
function Vi(e) {
  if (Fi) {
    Pn = Pn.concat(e);
    return;
  }
  let t = [],
    n = [],
    r = new Map(),
    i = new Map();
  for (let o = 0; o < e.length; o++)
    if (
      !e[o].target._x_ignoreMutationObserver &&
      (e[o].type === "childList" &&
        (e[o].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)),
        e[o].removedNodes.forEach((a) => a.nodeType === 1 && n.push(a))),
      e[o].type === "attributes")
    ) {
      let a = e[o].target,
        u = e[o].attributeName,
        f = e[o].oldValue,
        d = () => {
          r.has(a) || r.set(a, []),
            r.get(a).push({ name: u, value: a.getAttribute(u) });
        },
        g = () => {
          i.has(a) || i.set(a, []), i.get(a).push(u);
        };
      a.hasAttribute(u) && f === null
        ? d()
        : a.hasAttribute(u)
        ? (g(), d())
        : g();
    }
  i.forEach((o, a) => {
    rc(a, o);
  }),
    r.forEach((o, a) => {
      Za.forEach((u) => u(a, o));
    });
  for (let o of n)
    if (!t.includes(o) && (ec.forEach((a) => a(o)), o._x_cleanups))
      for (; o._x_cleanups.length; ) o._x_cleanups.pop()();
  t.forEach((o) => {
    (o._x_ignoreSelf = !0), (o._x_ignore = !0);
  });
  for (let o of t)
    n.includes(o) ||
      !o.isConnected ||
      (delete o._x_ignoreSelf,
      delete o._x_ignore,
      tc.forEach((a) => a(o)),
      (o._x_ignore = !0),
      (o._x_ignoreSelf = !0));
  t.forEach((o) => {
    delete o._x_ignoreSelf, delete o._x_ignore;
  }),
    (t = null),
    (n = null),
    (r = null),
    (i = null);
}
function sc(e) {
  return hn(kt(e));
}
function dn(e, t, n) {
  return (
    (e._x_dataStack = [t, ...kt(n || e)]),
    () => {
      e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
    }
  );
}
function ro(e, t) {
  let n = e._x_dataStack[0];
  Object.entries(t).forEach(([r, i]) => {
    n[r] = i;
  });
}
function kt(e) {
  return e._x_dataStack
    ? e._x_dataStack
    : typeof ShadowRoot == "function" && e instanceof ShadowRoot
    ? kt(e.host)
    : e.parentNode
    ? kt(e.parentNode)
    : [];
}
function hn(e) {
  let t = new Proxy(
    {},
    {
      ownKeys: () => Array.from(new Set(e.flatMap((n) => Object.keys(n)))),
      has: (n, r) => e.some((i) => i.hasOwnProperty(r)),
      get: (n, r) =>
        (e.find((i) => {
          if (i.hasOwnProperty(r)) {
            let o = Object.getOwnPropertyDescriptor(i, r);
            if (
              (o.get && o.get._x_alreadyBound) ||
              (o.set && o.set._x_alreadyBound)
            )
              return !0;
            if ((o.get || o.set) && o.enumerable) {
              let a = o.get,
                u = o.set,
                f = o;
              (a = a && a.bind(t)),
                (u = u && u.bind(t)),
                a && (a._x_alreadyBound = !0),
                u && (u._x_alreadyBound = !0),
                Object.defineProperty(i, r, { ...f, get: a, set: u });
            }
            return !0;
          }
          return !1;
        }) || {})[r],
      set: (n, r, i) => {
        let o = e.find((a) => a.hasOwnProperty(r));
        return o ? (o[r] = i) : (e[e.length - 1][r] = i), !0;
      },
    }
  );
  return t;
}
function oc(e) {
  let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null,
    n = (r, i = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(
        ([o, { value: a, enumerable: u }]) => {
          if (u === !1 || a === void 0) return;
          let f = i === "" ? o : `${i}.${o}`;
          typeof a == "object" && a !== null && a._x_interceptor
            ? (r[o] = a.initialize(e, f, o))
            : t(a) && a !== r && !(a instanceof Element) && n(a, f);
        }
      );
    };
  return n(e);
}
function ac(e, t = () => {}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, o) {
      return e(
        this.initialValue,
        () => vm(r, i),
        (a) => Kr(r, i, a),
        i,
        o
      );
    },
  };
  return (
    t(n),
    (r) => {
      if (typeof r == "object" && r !== null && r._x_interceptor) {
        let i = n.initialize.bind(n);
        n.initialize = (o, a, u) => {
          let f = r.initialize(o, a, u);
          return (n.initialValue = f), i(o, a, u);
        };
      } else n.initialValue = r;
      return n;
    }
  );
}
function vm(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function Kr(e, t, n) {
  if ((typeof t == "string" && (t = t.split(".")), t.length === 1)) e[t[0]] = n;
  else {
    if (t.length === 0) throw error;
    return e[t[0]] || (e[t[0]] = {}), Kr(e[t[0]], t.slice(1), n);
  }
}
var cc = {};
function Le(e, t) {
  cc[e] = t;
}
function Ur(e, t) {
  return (
    Object.entries(cc).forEach(([n, r]) => {
      Object.defineProperty(e, `$${n}`, {
        get() {
          let [i, o] = hc(t);
          return (i = { interceptor: ac, ...i }), nc(t, o), r(t, i);
        },
        enumerable: !1,
      });
    }),
    e
  );
}
function ym(e, t, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    en(i, e, t);
  }
}
function en(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }),
    console.warn(
      `Alpine Expression Error: ${e.message}

${
  n
    ? 'Expression: "' +
      n +
      `"

`
    : ""
}`,
      t
    ),
    setTimeout(() => {
      throw e;
    }, 0);
}
function Tt(e, t, n = {}) {
  let r;
  return le(e, t)((i) => (r = i), n), r;
}
function le(...e) {
  return lc(...e);
}
var lc = uc;
function bm(e) {
  lc = e;
}
function uc(e, t) {
  let n = {};
  Ur(n, e);
  let r = [n, ...kt(e)];
  if (typeof t == "function") return Em(r, t);
  let i = Am(r, t, e);
  return ym.bind(null, e, t, i);
}
function Em(e, t) {
  return (n = () => {}, { scope: r = {}, params: i = [] } = {}) => {
    let o = t.apply(hn([r, ...e]), i);
    Rn(n, o);
  };
}
var Lr = {};
function wm(e, t) {
  if (Lr[e]) return Lr[e];
  let n = Object.getPrototypeOf(async function () {}).constructor,
    r =
      /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
        ? `(() => { ${e} })()`
        : e,
    o = (() => {
      try {
        return new n(
          ["__self", "scope"],
          `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
        );
      } catch (a) {
        return en(a, t, e), Promise.resolve();
      }
    })();
  return (Lr[e] = o), o;
}
function Am(e, t, n) {
  let r = wm(t, n);
  return (i = () => {}, { scope: o = {}, params: a = [] } = {}) => {
    (r.result = void 0), (r.finished = !1);
    let u = hn([o, ...e]);
    if (typeof r == "function") {
      let f = r(r, u).catch((d) => en(d, n, t));
      r.finished
        ? (Rn(i, r.result, u, a, n), (r.result = void 0))
        : f
            .then((d) => {
              Rn(i, d, u, a, n);
            })
            .catch((d) => en(d, n, t))
            .finally(() => (r.result = void 0));
    }
  };
}
function Rn(e, t, n, r, i) {
  if (typeof t == "function") {
    let o = t.apply(n, r);
    o instanceof Promise
      ? o.then((a) => Rn(e, a, n, r)).catch((a) => en(a, i, t))
      : e(o);
  } else e(t);
}
var ji = "x-";
function jt(e = "") {
  return ji + e;
}
function Tm(e) {
  ji = e;
}
var fc = {};
function ee(e, t) {
  fc[e] = t;
}
function Wi(e, t, n) {
  let r = {};
  return Array.from(t)
    .map(mc((o, a) => (r[o] = a)))
    .filter(vc)
    .map($m(r, n))
    .sort(Cm)
    .map((o) => xm(e, o));
}
function Sm(e) {
  return Array.from(e)
    .map(mc())
    .filter((t) => !vc(t));
}
var qr = !1,
  Ut = new Map(),
  dc = Symbol();
function Om(e) {
  qr = !0;
  let t = Symbol();
  (dc = t), Ut.set(t, []);
  let n = () => {
      for (; Ut.get(t).length; ) Ut.get(t).shift()();
      Ut.delete(t);
    },
    r = () => {
      (qr = !1), n();
    };
  e(n), r();
}
function hc(e) {
  let t = [],
    n = (u) => t.push(u),
    [r, i] = lm(e);
  return (
    t.push(i),
    [
      {
        Alpine: pn,
        effect: r,
        cleanup: n,
        evaluateLater: le.bind(le, e),
        evaluate: Tt.bind(Tt, e),
      },
      () => t.forEach((u) => u()),
    ]
  );
}
function xm(e, t) {
  let n = () => {},
    r = fc[t.type] || n,
    [i, o] = hc(e);
  dm(e, t.original, o);
  let a = () => {
    e._x_ignore ||
      e._x_ignoreSelf ||
      (r.inline && r.inline(e, t, i),
      (r = r.bind(r, e, t, i)),
      qr ? Ut.get(dc).push(r) : r());
  };
  return (a.runCleanups = o), a;
}
var pc =
    (e, t) =>
    ({ name: n, value: r }) => (
      n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }
    ),
  _c = (e) => e;
function mc(e = () => {}) {
  return ({ name: t, value: n }) => {
    let { name: r, value: i } = gc.reduce((o, a) => a(o), {
      name: t,
      value: n,
    });
    return r !== t && e(r, t), { name: r, value: i };
  };
}
var gc = [];
function Yi(e) {
  gc.push(e);
}
function vc({ name: e }) {
  return yc().test(e);
}
var yc = () => new RegExp(`^${ji}([^:^.]+)\\b`);
function $m(e, t) {
  return ({ name: n, value: r }) => {
    let i = n.match(yc()),
      o = n.match(/:([a-zA-Z0-9\-:]+)/),
      a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
      u = t || e[n] || n;
    return {
      type: i ? i[1] : null,
      value: o ? o[1] : null,
      modifiers: a.map((f) => f.replace(".", "")),
      expression: r,
      original: u,
    };
  };
}
var zr = "DEFAULT",
  An = [
    "ignore",
    "ref",
    "data",
    "id",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    zr,
    "teleport",
    "element",
  ];
function Cm(e, t) {
  let n = An.indexOf(e.type) === -1 ? zr : e.type,
    r = An.indexOf(t.type) === -1 ? zr : t.type;
  return An.indexOf(n) - An.indexOf(r);
}
function Qt(e, t, n = {}) {
  e.dispatchEvent(
    new CustomEvent(t, { detail: n, bubbles: !0, composed: !0, cancelable: !0 })
  );
}
var Xr = [],
  Gi = !1;
function bc(e) {
  Xr.push(e),
    queueMicrotask(() => {
      Gi ||
        setTimeout(() => {
          Qr();
        });
    });
}
function Qr() {
  for (Gi = !1; Xr.length; ) Xr.shift()();
}
function Dm() {
  Gi = !0;
}
function ft(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => ft(i, t));
    return;
  }
  let n = !1;
  if ((t(e, () => (n = !0)), n)) return;
  let r = e.firstElementChild;
  for (; r; ) ft(r, t), (r = r.nextElementSibling);
}
function Hn(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function Nm() {
  document.body ||
    Hn(
      "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
    ),
    Qt(document, "alpine:init"),
    Qt(document, "alpine:initializing"),
    ic(),
    um((t) => Ke(t, ft)),
    nc((t) => Lm(t)),
    fm((t, n) => {
      Wi(t, n).forEach((r) => r());
    });
  let e = (t) => !er(t.parentElement, !0);
  Array.from(document.querySelectorAll(Ac()))
    .filter(e)
    .forEach((t) => {
      Ke(t);
    }),
    Qt(document, "alpine:initialized");
}
var Ki = [],
  Ec = [];
function wc() {
  return Ki.map((e) => e());
}
function Ac() {
  return Ki.concat(Ec).map((e) => e());
}
function Tc(e) {
  Ki.push(e);
}
function Sc(e) {
  Ec.push(e);
}
function er(e, t = !1) {
  return tr(e, (n) => {
    if ((t ? Ac() : wc()).some((i) => n.matches(i))) return !0;
  });
}
function tr(e, t) {
  if (!!e) {
    if (t(e)) return e;
    if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
      return tr(e.parentElement, t);
  }
}
function Mm(e) {
  return wc().some((t) => e.matches(t));
}
function Ke(e, t = ft) {
  Om(() => {
    t(e, (n, r) => {
      Wi(n, n.attributes).forEach((i) => i()), n._x_ignore && r();
    });
  });
}
function Lm(e) {
  ft(e, (t) => rc(t));
}
function Ui(e, t) {
  return Array.isArray(t)
    ? io(e, t.join(" "))
    : typeof t == "object" && t !== null
    ? Im(e, t)
    : typeof t == "function"
    ? Ui(e, t())
    : io(e, t);
}
function io(e, t) {
  let n = (i) =>
      i
        .split(" ")
        .filter((o) => !e.classList.contains(o))
        .filter(Boolean),
    r = (i) => (
      e.classList.add(...i),
      () => {
        e.classList.remove(...i);
      }
    );
  return (t = t === !0 ? (t = "") : t || ""), r(n(t));
}
function Im(e, t) {
  let n = (u) => u.split(" ").filter(Boolean),
    r = Object.entries(t)
      .flatMap(([u, f]) => (f ? n(u) : !1))
      .filter(Boolean),
    i = Object.entries(t)
      .flatMap(([u, f]) => (f ? !1 : n(u)))
      .filter(Boolean),
    o = [],
    a = [];
  return (
    i.forEach((u) => {
      e.classList.contains(u) && (e.classList.remove(u), a.push(u));
    }),
    r.forEach((u) => {
      e.classList.contains(u) || (e.classList.add(u), o.push(u));
    }),
    () => {
      a.forEach((u) => e.classList.add(u)),
        o.forEach((u) => e.classList.remove(u));
    }
  );
}
function nr(e, t) {
  return typeof t == "object" && t !== null ? km(e, t) : Pm(e, t);
}
function km(e, t) {
  let n = {};
  return (
    Object.entries(t).forEach(([r, i]) => {
      (n[r] = e.style[r]),
        r.startsWith("--") || (r = Rm(r)),
        e.style.setProperty(r, i);
    }),
    setTimeout(() => {
      e.style.length === 0 && e.removeAttribute("style");
    }),
    () => {
      nr(e, n);
    }
  );
}
function Pm(e, t) {
  let n = e.getAttribute("style", t);
  return (
    e.setAttribute("style", t),
    () => {
      e.setAttribute("style", n || "");
    }
  );
}
function Rm(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function Jr(e, t = () => {}) {
  let n = !1;
  return function () {
    n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
  };
}
ee(
  "transition",
  (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
    typeof r == "function" && (r = i(r)), r ? Hm(e, r, t) : Bm(e, n, t);
  }
);
function Hm(e, t, n) {
  Oc(e, Ui, ""),
    {
      enter: (i) => {
        e._x_transition.enter.during = i;
      },
      "enter-start": (i) => {
        e._x_transition.enter.start = i;
      },
      "enter-end": (i) => {
        e._x_transition.enter.end = i;
      },
      leave: (i) => {
        e._x_transition.leave.during = i;
      },
      "leave-start": (i) => {
        e._x_transition.leave.start = i;
      },
      "leave-end": (i) => {
        e._x_transition.leave.end = i;
      },
    }[n](t);
}
function Bm(e, t, n) {
  Oc(e, nr);
  let r = !t.includes("in") && !t.includes("out") && !n,
    i = r || t.includes("in") || ["enter"].includes(n),
    o = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((m, E) => E < t.indexOf("out"))),
    t.includes("out") && !r && (t = t.filter((m, E) => E > t.indexOf("out")));
  let a = !t.includes("opacity") && !t.includes("scale"),
    u = a || t.includes("opacity"),
    f = a || t.includes("scale"),
    d = u ? 0 : 1,
    g = f ? Gt(t, "scale", 95) / 100 : 1,
    s = Gt(t, "delay", 0),
    c = Gt(t, "origin", "center"),
    l = "opacity, transform",
    h = Gt(t, "duration", 150) / 1e3,
    _ = Gt(t, "duration", 75) / 1e3,
    p = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i &&
    ((e._x_transition.enter.during = {
      transformOrigin: c,
      transitionDelay: s,
      transitionProperty: l,
      transitionDuration: `${h}s`,
      transitionTimingFunction: p,
    }),
    (e._x_transition.enter.start = { opacity: d, transform: `scale(${g})` }),
    (e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
    o &&
      ((e._x_transition.leave.during = {
        transformOrigin: c,
        transitionDelay: s,
        transitionProperty: l,
        transitionDuration: `${_}s`,
        transitionTimingFunction: p,
      }),
      (e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }),
      (e._x_transition.leave.end = { opacity: d, transform: `scale(${g})` }));
}
function Oc(e, t, n = {}) {
  e._x_transition ||
    (e._x_transition = {
      enter: { during: n, start: n, end: n },
      leave: { during: n, start: n, end: n },
      in(r = () => {}, i = () => {}) {
        Zr(
          e,
          t,
          {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end,
          },
          r,
          i
        );
      },
      out(r = () => {}, i = () => {}) {
        Zr(
          e,
          t,
          {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end,
          },
          r,
          i
        );
      },
    });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
  e,
  t,
  n,
  r
) {
  let i = () => {
    document.visibilityState === "visible"
      ? requestAnimationFrame(n)
      : setTimeout(n);
  };
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave)
      ? e._x_transition.enter &&
        (Object.entries(e._x_transition.enter.during).length ||
          Object.entries(e._x_transition.enter.start).length ||
          Object.entries(e._x_transition.enter.end).length)
        ? e._x_transition.in(n)
        : i()
      : e._x_transition
      ? e._x_transition.in(n)
      : i();
    return;
  }
  (e._x_hidePromise = e._x_transition
    ? new Promise((o, a) => {
        e._x_transition.out(
          () => {},
          () => o(r)
        ),
          e._x_transitioning.beforeCancel(() =>
            a({ isFromCancelledTransition: !0 })
          );
      })
    : Promise.resolve(r)),
    queueMicrotask(() => {
      let o = xc(e);
      o
        ? (o._x_hideChildren || (o._x_hideChildren = []),
          o._x_hideChildren.push(e))
        : queueMicrotask(() => {
            let a = (u) => {
              let f = Promise.all([
                u._x_hidePromise,
                ...(u._x_hideChildren || []).map(a),
              ]).then(([d]) => d());
              return delete u._x_hidePromise, delete u._x_hideChildren, f;
            };
            a(e).catch((u) => {
              if (!u.isFromCancelledTransition) throw u;
            });
          });
    });
};
function xc(e) {
  let t = e.parentNode;
  if (!!t) return t._x_hidePromise ? t : xc(t);
}
function Zr(
  e,
  t,
  { during: n, start: r, end: i } = {},
  o = () => {},
  a = () => {}
) {
  if (
    (e._x_transitioning && e._x_transitioning.cancel(),
    Object.keys(n).length === 0 &&
      Object.keys(r).length === 0 &&
      Object.keys(i).length === 0)
  ) {
    o(), a();
    return;
  }
  let u, f, d;
  Fm(e, {
    start() {
      u = t(e, r);
    },
    during() {
      f = t(e, n);
    },
    before: o,
    end() {
      u(), (d = t(e, i));
    },
    after: a,
    cleanup() {
      f(), d();
    },
  });
}
function Fm(e, t) {
  let n,
    r,
    i,
    o = Jr(() => {
      te(() => {
        (n = !0),
          r || t.before(),
          i || (t.end(), Qr()),
          t.after(),
          e.isConnected && t.cleanup(),
          delete e._x_transitioning;
      });
    });
  (e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: Jr(function () {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      o();
    }),
    finish: o,
  }),
    te(() => {
      t.start(), t.during();
    }),
    Dm(),
    requestAnimationFrame(() => {
      if (n) return;
      let a =
          Number(
            getComputedStyle(e)
              .transitionDuration.replace(/,.*/, "")
              .replace("s", "")
          ) * 1e3,
        u =
          Number(
            getComputedStyle(e)
              .transitionDelay.replace(/,.*/, "")
              .replace("s", "")
          ) * 1e3;
      a === 0 &&
        (a =
          Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3),
        te(() => {
          t.before();
        }),
        (r = !0),
        requestAnimationFrame(() => {
          n ||
            (te(() => {
              t.end();
            }),
            Qr(),
            setTimeout(e._x_transitioning.finish, a + u),
            (i = !0));
        });
    });
}
function Gt(e, t, n) {
  if (e.indexOf(t) === -1) return n;
  const r = e[e.indexOf(t) + 1];
  if (!r || (t === "scale" && isNaN(r))) return n;
  if (t === "duration") {
    let i = r.match(/([0-9]+)ms/);
    if (i) return i[1];
  }
  return t === "origin" &&
    ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2])
    ? [r, e[e.indexOf(t) + 2]].join(" ")
    : r;
}
var ei = !1;
function rr(e, t = () => {}) {
  return (...n) => (ei ? t(...n) : e(...n));
}
function Vm(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack),
    (ei = !0),
    Wm(() => {
      jm(t);
    }),
    (ei = !1);
}
function jm(e) {
  let t = !1;
  Ke(e, (r, i) => {
    ft(r, (o, a) => {
      if (t && Mm(o)) return a();
      (t = !0), i(o, a);
    });
  });
}
function Wm(e) {
  let t = fn;
  no((n, r) => {
    let i = t(n);
    return Zn(i), () => {};
  }),
    e(),
    no(t);
}
function $c(e, t, n, r = []) {
  switch (
    (e._x_bindings || (e._x_bindings = Vt({})),
    (e._x_bindings[t] = n),
    (t = r.includes("camel") ? Xm(t) : t),
    t)
  ) {
    case "value":
      Ym(e, n);
      break;
    case "style":
      Km(e, n);
      break;
    case "class":
      Gm(e, n);
      break;
    default:
      Um(e, t, n);
      break;
  }
}
function Ym(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t),
      window.fromModel && (e.checked = so(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t)
      ? (e.value = t)
      : !Number.isInteger(t) &&
        !Array.isArray(t) &&
        typeof t != "boolean" &&
        ![null, void 0].includes(t)
      ? (e.value = String(t))
      : Array.isArray(t)
      ? (e.checked = t.some((n) => so(n, e.value)))
      : (e.checked = !!t);
  else if (e.tagName === "SELECT") zm(e, t);
  else {
    if (e.value === t) return;
    e.value = t;
  }
}
function Gm(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(),
    (e._x_undoAddedClasses = Ui(e, t));
}
function Km(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(),
    (e._x_undoAddedStyles = nr(e, t));
}
function Um(e, t, n) {
  [null, void 0, !1].includes(n) && Qm(t)
    ? e.removeAttribute(t)
    : (Cc(t) && (n = t), qm(e, t, n));
}
function qm(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function zm(e, t) {
  const n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function Xm(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function so(e, t) {
  return e == t;
}
function Cc(e) {
  return [
    "disabled",
    "checked",
    "required",
    "readonly",
    "hidden",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule",
  ].includes(e);
}
function Qm(e) {
  return ![
    "aria-pressed",
    "aria-checked",
    "aria-expanded",
    "aria-selected",
  ].includes(e);
}
function Jm(e, t, n) {
  if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
  let r = e.getAttribute(t);
  return r === null
    ? typeof n == "function"
      ? n()
      : n
    : Cc(t)
    ? !![t, "true"].includes(r)
    : r === ""
    ? !0
    : r;
}
function Dc(e, t) {
  var n;
  return function () {
    var r = this,
      i = arguments,
      o = function () {
        (n = null), e.apply(r, i);
      };
    clearTimeout(n), (n = setTimeout(o, t));
  };
}
function Nc(e, t) {
  let n;
  return function () {
    let r = this,
      i = arguments;
    n || (e.apply(r, i), (n = !0), setTimeout(() => (n = !1), t));
  };
}
function Zm(e) {
  e(pn);
}
var et = {},
  oo = !1;
function eg(e, t) {
  if ((oo || ((et = Vt(et)), (oo = !0)), t === void 0)) return et[e];
  (et[e] = t),
    typeof t == "object" &&
      t !== null &&
      t.hasOwnProperty("init") &&
      typeof t.init == "function" &&
      et[e].init(),
    oc(et[e]);
}
function tg() {
  return et;
}
var Mc = {};
function ng(e, t) {
  Mc[e] = typeof t != "function" ? () => t : t;
}
function rg(e) {
  return (
    Object.entries(Mc).forEach(([t, n]) => {
      Object.defineProperty(e, t, {
        get() {
          return (...r) => n(...r);
        },
      });
    }),
    e
  );
}
var Lc = {};
function ig(e, t) {
  Lc[e] = t;
}
function sg(e, t) {
  return (
    Object.entries(Lc).forEach(([n, r]) => {
      Object.defineProperty(e, n, {
        get() {
          return (...i) => r.bind(t)(...i);
        },
        enumerable: !1,
      });
    }),
    e
  );
}
var og = {
    get reactive() {
      return Vt;
    },
    get release() {
      return Zn;
    },
    get effect() {
      return fn;
    },
    get raw() {
      return Ja;
    },
    version: "3.9.5",
    flushAndStopDeferringMutations: gm,
    disableEffectScheduling: am,
    setReactivityEngine: cm,
    closestDataStack: kt,
    skipDuringClone: rr,
    addRootSelector: Tc,
    addInitSelector: Sc,
    addScopeToNode: dn,
    deferMutations: mm,
    mapAttributes: Yi,
    evaluateLater: le,
    setEvaluator: bm,
    mergeProxies: hn,
    findClosest: tr,
    closestRoot: er,
    interceptor: ac,
    transition: Zr,
    setStyles: nr,
    mutateDom: te,
    directive: ee,
    throttle: Nc,
    debounce: Dc,
    evaluate: Tt,
    initTree: Ke,
    nextTick: bc,
    prefixed: jt,
    prefix: Tm,
    plugin: Zm,
    magic: Le,
    store: eg,
    start: Nm,
    clone: Vm,
    bound: Jm,
    $data: sc,
    data: ig,
    bind: ng,
  },
  pn = og;
function ag(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let i = 0; i < r.length; i++) n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var cg = Object.freeze({});
Object.freeze([]);
var Ic = Object.assign,
  lg = Object.prototype.hasOwnProperty,
  ir = (e, t) => lg.call(e, t),
  ot = Array.isArray,
  Jt = (e) => kc(e) === "[object Map]",
  ug = (e) => typeof e == "string",
  qi = (e) => typeof e == "symbol",
  sr = (e) => e !== null && typeof e == "object",
  fg = Object.prototype.toString,
  kc = (e) => fg.call(e),
  Pc = (e) => kc(e).slice(8, -1),
  zi = (e) =>
    ug(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  dg = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  hg = dg((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Rc = (e, t) => e !== t && (e === e || t === t),
  ti = new WeakMap(),
  Kt = [],
  Oe,
  at = Symbol("iterate"),
  ni = Symbol("Map key iterate");
function pg(e) {
  return e && e._isEffect === !0;
}
function _g(e, t = cg) {
  pg(e) && (e = e.raw);
  const n = vg(e, t);
  return t.lazy || n(), n;
}
function mg(e) {
  e.active && (Hc(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var gg = 0;
function vg(e, t) {
  const n = function () {
    if (!n.active) return e();
    if (!Kt.includes(n)) {
      Hc(n);
      try {
        return bg(), Kt.push(n), (Oe = n), e();
      } finally {
        Kt.pop(), Bc(), (Oe = Kt[Kt.length - 1]);
      }
    }
  };
  return (
    (n.id = gg++),
    (n.allowRecurse = !!t.allowRecurse),
    (n._isEffect = !0),
    (n.active = !0),
    (n.raw = e),
    (n.deps = []),
    (n.options = t),
    n
  );
}
function Hc(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
var Pt = !0,
  Xi = [];
function yg() {
  Xi.push(Pt), (Pt = !1);
}
function bg() {
  Xi.push(Pt), (Pt = !0);
}
function Bc() {
  const e = Xi.pop();
  Pt = e === void 0 ? !0 : e;
}
function Ae(e, t, n) {
  if (!Pt || Oe === void 0) return;
  let r = ti.get(e);
  r || ti.set(e, (r = new Map()));
  let i = r.get(n);
  i || r.set(n, (i = new Set())),
    i.has(Oe) ||
      (i.add(Oe),
      Oe.deps.push(i),
      Oe.options.onTrack &&
        Oe.options.onTrack({ effect: Oe, target: e, type: t, key: n }));
}
function Ue(e, t, n, r, i, o) {
  const a = ti.get(e);
  if (!a) return;
  const u = new Set(),
    f = (g) => {
      g &&
        g.forEach((s) => {
          (s !== Oe || s.allowRecurse) && u.add(s);
        });
    };
  if (t === "clear") a.forEach(f);
  else if (n === "length" && ot(e))
    a.forEach((g, s) => {
      (s === "length" || s >= r) && f(g);
    });
  else
    switch ((n !== void 0 && f(a.get(n)), t)) {
      case "add":
        ot(e)
          ? zi(n) && f(a.get("length"))
          : (f(a.get(at)), Jt(e) && f(a.get(ni)));
        break;
      case "delete":
        ot(e) || (f(a.get(at)), Jt(e) && f(a.get(ni)));
        break;
      case "set":
        Jt(e) && f(a.get(at));
        break;
    }
  const d = (g) => {
    g.options.onTrigger &&
      g.options.onTrigger({
        effect: g,
        target: e,
        key: n,
        type: t,
        newValue: r,
        oldValue: i,
        oldTarget: o,
      }),
      g.options.scheduler ? g.options.scheduler(g) : g();
  };
  u.forEach(d);
}
var Eg = ag("__proto__,__v_isRef,__isVue"),
  Fc = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(qi)
  ),
  wg = or(),
  Ag = or(!1, !0),
  Tg = or(!0),
  Sg = or(!0, !0),
  Bn = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  const t = Array.prototype[e];
  Bn[e] = function (...n) {
    const r = U(this);
    for (let o = 0, a = this.length; o < a; o++) Ae(r, "get", o + "");
    const i = t.apply(r, n);
    return i === -1 || i === !1 ? t.apply(r, n.map(U)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  const t = Array.prototype[e];
  Bn[e] = function (...n) {
    yg();
    const r = t.apply(this, n);
    return Bc(), r;
  };
});
function or(e = !1, t = !1) {
  return function (r, i, o) {
    if (i === "__v_isReactive") return !e;
    if (i === "__v_isReadonly") return e;
    if (i === "__v_raw" && o === (e ? (t ? kg : tl) : t ? Ig : el).get(r))
      return r;
    const a = ot(r);
    if (!e && a && ir(Bn, i)) return Reflect.get(Bn, i, o);
    const u = Reflect.get(r, i, o);
    return (qi(i) ? Fc.has(i) : Eg(i)) || (e || Ae(r, "get", i), t)
      ? u
      : ri(u)
      ? !a || !zi(i)
        ? u.value
        : u
      : sr(u)
      ? e
        ? nl(u)
        : es(u)
      : u;
  };
}
var Og = Vc(),
  xg = Vc(!0);
function Vc(e = !1) {
  return function (n, r, i, o) {
    let a = n[r];
    if (!e && ((i = U(i)), (a = U(a)), !ot(n) && ri(a) && !ri(i)))
      return (a.value = i), !0;
    const u = ot(n) && zi(r) ? Number(r) < n.length : ir(n, r),
      f = Reflect.set(n, r, i, o);
    return (
      n === U(o) &&
        (u ? Rc(i, a) && Ue(n, "set", r, i, a) : Ue(n, "add", r, i)),
      f
    );
  };
}
function $g(e, t) {
  const n = ir(e, t),
    r = e[t],
    i = Reflect.deleteProperty(e, t);
  return i && n && Ue(e, "delete", t, void 0, r), i;
}
function Cg(e, t) {
  const n = Reflect.has(e, t);
  return (!qi(t) || !Fc.has(t)) && Ae(e, "has", t), n;
}
function Dg(e) {
  return Ae(e, "iterate", ot(e) ? "length" : at), Reflect.ownKeys(e);
}
var jc = { get: wg, set: Og, deleteProperty: $g, has: Cg, ownKeys: Dg },
  Wc = {
    get: Tg,
    set(e, t) {
      return (
        console.warn(
          `Set operation on key "${String(t)}" failed: target is readonly.`,
          e
        ),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        console.warn(
          `Delete operation on key "${String(t)}" failed: target is readonly.`,
          e
        ),
        !0
      );
    },
  };
Ic({}, jc, { get: Ag, set: xg });
Ic({}, Wc, { get: Sg });
var Qi = (e) => (sr(e) ? es(e) : e),
  Ji = (e) => (sr(e) ? nl(e) : e),
  Zi = (e) => e,
  ar = (e) => Reflect.getPrototypeOf(e);
function cr(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = U(e),
    o = U(t);
  t !== o && !n && Ae(i, "get", t), !n && Ae(i, "get", o);
  const { has: a } = ar(i),
    u = r ? Zi : n ? Ji : Qi;
  if (a.call(i, t)) return u(e.get(t));
  if (a.call(i, o)) return u(e.get(o));
  e !== i && e.get(t);
}
function lr(e, t = !1) {
  const n = this.__v_raw,
    r = U(n),
    i = U(e);
  return (
    e !== i && !t && Ae(r, "has", e),
    !t && Ae(r, "has", i),
    e === i ? n.has(e) : n.has(e) || n.has(i)
  );
}
function ur(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Ae(U(e), "iterate", at), Reflect.get(e, "size", e)
  );
}
function Yc(e) {
  e = U(e);
  const t = U(this);
  return ar(t).has.call(t, e) || (t.add(e), Ue(t, "add", e, e)), this;
}
function Gc(e, t) {
  t = U(t);
  const n = U(this),
    { has: r, get: i } = ar(n);
  let o = r.call(n, e);
  o ? Zc(n, r, e) : ((e = U(e)), (o = r.call(n, e)));
  const a = i.call(n, e);
  return (
    n.set(e, t),
    o ? Rc(t, a) && Ue(n, "set", e, t, a) : Ue(n, "add", e, t),
    this
  );
}
function Kc(e) {
  const t = U(this),
    { has: n, get: r } = ar(t);
  let i = n.call(t, e);
  i ? Zc(t, n, e) : ((e = U(e)), (i = n.call(t, e)));
  const o = r ? r.call(t, e) : void 0,
    a = t.delete(e);
  return i && Ue(t, "delete", e, void 0, o), a;
}
function Uc() {
  const e = U(this),
    t = e.size !== 0,
    n = Jt(e) ? new Map(e) : new Set(e),
    r = e.clear();
  return t && Ue(e, "clear", void 0, void 0, n), r;
}
function fr(e, t) {
  return function (r, i) {
    const o = this,
      a = o.__v_raw,
      u = U(a),
      f = t ? Zi : e ? Ji : Qi;
    return (
      !e && Ae(u, "iterate", at), a.forEach((d, g) => r.call(i, f(d), f(g), o))
    );
  };
}
function Tn(e, t, n) {
  return function (...r) {
    const i = this.__v_raw,
      o = U(i),
      a = Jt(o),
      u = e === "entries" || (e === Symbol.iterator && a),
      f = e === "keys" && a,
      d = i[e](...r),
      g = n ? Zi : t ? Ji : Qi;
    return (
      !t && Ae(o, "iterate", f ? ni : at),
      {
        next() {
          const { value: s, done: c } = d.next();
          return c
            ? { value: s, done: c }
            : { value: u ? [g(s[0]), g(s[1])] : g(s), done: c };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function je(e) {
  return function (...t) {
    {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${hg(e)} operation ${n}failed: target is readonly.`,
        U(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
var qc = {
    get(e) {
      return cr(this, e);
    },
    get size() {
      return ur(this);
    },
    has: lr,
    add: Yc,
    set: Gc,
    delete: Kc,
    clear: Uc,
    forEach: fr(!1, !1),
  },
  zc = {
    get(e) {
      return cr(this, e, !1, !0);
    },
    get size() {
      return ur(this);
    },
    has: lr,
    add: Yc,
    set: Gc,
    delete: Kc,
    clear: Uc,
    forEach: fr(!1, !0),
  },
  Xc = {
    get(e) {
      return cr(this, e, !0);
    },
    get size() {
      return ur(this, !0);
    },
    has(e) {
      return lr.call(this, e, !0);
    },
    add: je("add"),
    set: je("set"),
    delete: je("delete"),
    clear: je("clear"),
    forEach: fr(!0, !1),
  },
  Qc = {
    get(e) {
      return cr(this, e, !0, !0);
    },
    get size() {
      return ur(this, !0);
    },
    has(e) {
      return lr.call(this, e, !0);
    },
    add: je("add"),
    set: je("set"),
    delete: je("delete"),
    clear: je("clear"),
    forEach: fr(!0, !0),
  },
  Ng = ["keys", "values", "entries", Symbol.iterator];
Ng.forEach((e) => {
  (qc[e] = Tn(e, !1, !1)),
    (Xc[e] = Tn(e, !0, !1)),
    (zc[e] = Tn(e, !1, !0)),
    (Qc[e] = Tn(e, !0, !0));
});
function Jc(e, t) {
  const n = t ? (e ? Qc : zc) : e ? Xc : qc;
  return (r, i, o) =>
    i === "__v_isReactive"
      ? !e
      : i === "__v_isReadonly"
      ? e
      : i === "__v_raw"
      ? r
      : Reflect.get(ir(n, i) && i in r ? n : r, i, o);
}
var Mg = { get: Jc(!1, !1) },
  Lg = { get: Jc(!0, !1) };
function Zc(e, t, n) {
  const r = U(n);
  if (r !== n && t.call(e, r)) {
    const i = Pc(e);
    console.warn(
      `Reactive ${i} contains both the raw and reactive versions of the same object${
        i === "Map" ? " as keys" : ""
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
var el = new WeakMap(),
  Ig = new WeakMap(),
  tl = new WeakMap(),
  kg = new WeakMap();
function Pg(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Rg(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Pg(Pc(e));
}
function es(e) {
  return e && e.__v_isReadonly ? e : rl(e, !1, jc, Mg, el);
}
function nl(e) {
  return rl(e, !0, Wc, Lg, tl);
}
function rl(e, t, n, r, i) {
  if (!sr(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive)) return e;
  const o = i.get(e);
  if (o) return o;
  const a = Rg(e);
  if (a === 0) return e;
  const u = new Proxy(e, a === 2 ? r : n);
  return i.set(e, u), u;
}
function U(e) {
  return (e && U(e.__v_raw)) || e;
}
function ri(e) {
  return Boolean(e && e.__v_isRef === !0);
}
Le("nextTick", () => bc);
Le("dispatch", (e) => Qt.bind(Qt, e));
Le("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let o = t(r),
    a = !0,
    u,
    f = n(() =>
      o((d) => {
        JSON.stringify(d),
          a
            ? (u = d)
            : queueMicrotask(() => {
                i(d, u), (u = d);
              }),
          (a = !1);
      })
    );
  e._x_effects.delete(f);
});
Le("store", tg);
Le("data", (e) => sc(e));
Le("root", (e) => er(e));
Le(
  "refs",
  (e) => (e._x_refs_proxy || (e._x_refs_proxy = hn(Hg(e))), e._x_refs_proxy)
);
function Hg(e) {
  let t = [],
    n = e;
  for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
  return t;
}
var Ir = {};
function il(e) {
  return Ir[e] || (Ir[e] = 0), ++Ir[e];
}
function Bg(e, t) {
  return tr(e, (n) => {
    if (n._x_ids && n._x_ids[t]) return !0;
  });
}
function Fg(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = il(t));
}
Le("id", (e) => (t, n = null) => {
  let r = Bg(e, t),
    i = r ? r._x_ids[t] : il(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
Le("el", (e) => e);
ee("modelable", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t),
    o = () => {
      let d;
      return i((g) => (d = g)), d;
    },
    a = r(`${t} = __placeholder`),
    u = (d) => a(() => {}, { scope: { __placeholder: d } }),
    f = o();
  u(f),
    queueMicrotask(() => {
      if (!e._x_model) return;
      e._x_removeModelListeners.default();
      let d = e._x_model.get,
        g = e._x_model.set;
      n(() => u(d())), n(() => g(o()));
    });
});
ee("teleport", (e, { expression: t }, { cleanup: n }) => {
  e.tagName.toLowerCase() !== "template" &&
    Hn("x-teleport can only be used on a <template> tag", e);
  let r = document.querySelector(t);
  r || Hn(`Cannot find x-teleport element for selector: "${t}"`);
  let i = e.content.cloneNode(!0).firstElementChild;
  (e._x_teleport = i),
    (i._x_teleportBack = e),
    e._x_forwardEvents &&
      e._x_forwardEvents.forEach((o) => {
        i.addEventListener(o, (a) => {
          a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
        });
      }),
    dn(i, {}, e),
    te(() => {
      r.appendChild(i), Ke(i), (i._x_ignore = !0);
    }),
    n(() => i.remove());
});
var sl = () => {};
sl.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
    n(() => {
      t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
    });
};
ee("ignore", sl);
ee("effect", (e, { expression: t }, { effect: n }) => n(le(e, t)));
function ol(e, t, n, r) {
  let i = e,
    o = (f) => r(f),
    a = {},
    u = (f, d) => (g) => d(f, g);
  if (
    (n.includes("dot") && (t = Vg(t)),
    n.includes("camel") && (t = jg(t)),
    n.includes("passive") && (a.passive = !0),
    n.includes("capture") && (a.capture = !0),
    n.includes("window") && (i = window),
    n.includes("document") && (i = document),
    n.includes("prevent") &&
      (o = u(o, (f, d) => {
        d.preventDefault(), f(d);
      })),
    n.includes("stop") &&
      (o = u(o, (f, d) => {
        d.stopPropagation(), f(d);
      })),
    n.includes("self") &&
      (o = u(o, (f, d) => {
        d.target === e && f(d);
      })),
    (n.includes("away") || n.includes("outside")) &&
      ((i = document),
      (o = u(o, (f, d) => {
        e.contains(d.target) ||
          (d.target.isConnected !== !1 &&
            ((e.offsetWidth < 1 && e.offsetHeight < 1) ||
              (e._x_isShown !== !1 && f(d))));
      }))),
    n.includes("once") &&
      (o = u(o, (f, d) => {
        f(d), i.removeEventListener(t, o, a);
      })),
    (o = u(o, (f, d) => {
      (Yg(t) && Gg(d, n)) || f(d);
    })),
    n.includes("debounce"))
  ) {
    let f = n[n.indexOf("debounce") + 1] || "invalid-wait",
      d = ii(f.split("ms")[0]) ? Number(f.split("ms")[0]) : 250;
    o = Dc(o, d);
  }
  if (n.includes("throttle")) {
    let f = n[n.indexOf("throttle") + 1] || "invalid-wait",
      d = ii(f.split("ms")[0]) ? Number(f.split("ms")[0]) : 250;
    o = Nc(o, d);
  }
  return (
    i.addEventListener(t, o, a),
    () => {
      i.removeEventListener(t, o, a);
    }
  );
}
function Vg(e) {
  return e.replace(/-/g, ".");
}
function jg(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function ii(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Wg(e) {
  return e
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]/, "-")
    .toLowerCase();
}
function Yg(e) {
  return ["keydown", "keyup"].includes(e);
}
function Gg(e, t) {
  let n = t.filter(
    (o) => !["window", "document", "prevent", "stop", "once"].includes(o)
  );
  if (n.includes("debounce")) {
    let o = n.indexOf("debounce");
    n.splice(o, ii((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || (n.length === 1 && ao(e.key).includes(n[0]))) return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) =>
    n.includes(o)
  );
  return (
    (n = n.filter((o) => !i.includes(o))),
    !(
      i.length > 0 &&
      i.filter(
        (a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])
      ).length === i.length &&
      ao(e.key).includes(n[0])
    )
  );
}
function ao(e) {
  if (!e) return [];
  e = Wg(e);
  let t = {
    ctrl: "control",
    slash: "/",
    space: "-",
    spacebar: "-",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    equal: "=",
  };
  return (
    (t[e] = e),
    Object.keys(t)
      .map((n) => {
        if (t[n] === e) return n;
      })
      .filter((n) => n)
  );
}
ee("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let o = le(e, n),
    a = `${n} = rightSideOfExpression($event, ${n})`,
    u = le(e, a);
  var f =
    e.tagName.toLowerCase() === "select" ||
    ["checkbox", "radio"].includes(e.type) ||
    t.includes("lazy")
      ? "change"
      : "input";
  let d = Kg(e, t, n),
    g = ol(e, f, t, (c) => {
      u(() => {}, { scope: { $event: c, rightSideOfExpression: d } });
    });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}),
    (e._x_removeModelListeners.default = g),
    i(() => e._x_removeModelListeners.default());
  let s = le(e, `${n} = __placeholder`);
  (e._x_model = {
    get() {
      let c;
      return o((l) => (c = l)), c;
    },
    set(c) {
      s(() => {}, { scope: { __placeholder: c } });
    },
  }),
    (e._x_forceModelUpdate = () => {
      o((c) => {
        c === void 0 && n.match(/\./) && (c = ""),
          (window.fromModel = !0),
          te(() => $c(e, "value", c)),
          delete window.fromModel;
      });
    }),
    r(() => {
      (t.includes("unintrusive") && document.activeElement.isSameNode(e)) ||
        e._x_forceModelUpdate();
    });
});
function Kg(e, t, n) {
  return (
    e.type === "radio" &&
      te(() => {
        e.hasAttribute("name") || e.setAttribute("name", n);
      }),
    (r, i) =>
      te(() => {
        if (r instanceof CustomEvent && r.detail !== void 0)
          return r.detail || r.target.value;
        if (e.type === "checkbox")
          if (Array.isArray(i)) {
            let o = t.includes("number") ? kr(r.target.value) : r.target.value;
            return r.target.checked
              ? i.concat([o])
              : i.filter((a) => !Ug(a, o));
          } else return r.target.checked;
        else {
          if (e.tagName.toLowerCase() === "select" && e.multiple)
            return t.includes("number")
              ? Array.from(r.target.selectedOptions).map((o) => {
                  let a = o.value || o.text;
                  return kr(a);
                })
              : Array.from(r.target.selectedOptions).map(
                  (o) => o.value || o.text
                );
          {
            let o = r.target.value;
            return t.includes("number")
              ? kr(o)
              : t.includes("trim")
              ? o.trim()
              : o;
          }
        }
      })
  );
}
function kr(e) {
  let t = e ? parseFloat(e) : null;
  return qg(t) ? t : e;
}
function Ug(e, t) {
  return e == t;
}
function qg(e) {
  return !Array.isArray(e) && !isNaN(e);
}
ee("cloak", (e) =>
  queueMicrotask(() => te(() => e.removeAttribute(jt("cloak"))))
);
Sc(() => `[${jt("init")}]`);
ee(
  "init",
  rr((e, { expression: t }, { evaluate: n }) =>
    typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)
  )
);
ee("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((o) => {
      te(() => {
        e.textContent = o;
      });
    });
  });
});
ee("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
    i((o) => {
      te(() => {
        (e.innerHTML = o),
          (e._x_ignoreSelf = !0),
          Ke(e),
          delete e._x_ignoreSelf;
      });
    });
  });
});
Yi(pc(":", _c(jt("bind:"))));
ee(
  "bind",
  (
    e,
    { value: t, modifiers: n, expression: r, original: i },
    { effect: o }
  ) => {
    if (!t) return zg(e, r, i);
    if (t === "key") return Xg(e, r);
    let a = le(e, r);
    o(() =>
      a((u) => {
        u === void 0 && r.match(/\./) && (u = ""), te(() => $c(e, t, u, n));
      })
    );
  }
);
function zg(e, t, n, r) {
  let i = {};
  rg(i);
  let o = le(e, t),
    a = [];
  for (; a.length; ) a.pop()();
  o(
    (u) => {
      let f = Object.entries(u).map(([g, s]) => ({ name: g, value: s })),
        d = Sm(f);
      (f = f.map((g) =>
        d.find((s) => s.name === g.name)
          ? { name: `x-bind:${g.name}`, value: `"${g.value}"` }
          : g
      )),
        Wi(e, f, n).map((g) => {
          a.push(g.runCleanups), g();
        });
    },
    { scope: i }
  );
}
function Xg(e, t) {
  e._x_keyExpression = t;
}
Tc(() => `[${jt("data")}]`);
ee(
  "data",
  rr((e, { expression: t }, { cleanup: n }) => {
    t = t === "" ? "{}" : t;
    let r = {};
    Ur(r, e);
    let i = {};
    sg(i, r);
    let o = Tt(e, t, { scope: i });
    o === void 0 && (o = {}), Ur(o, e);
    let a = Vt(o);
    oc(a);
    let u = dn(e, a);
    a.init && Tt(e, a.init),
      n(() => {
        a.destroy && Tt(e, a.destroy), u();
      });
  })
);
ee("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = le(e, n),
    o = () =>
      te(() => {
        (e.style.display = "none"), (e._x_isShown = !1);
      }),
    a = () =>
      te(() => {
        e.style.length === 1 && e.style.display === "none"
          ? e.removeAttribute("style")
          : e.style.removeProperty("display"),
          (e._x_isShown = !0);
      }),
    u = () => setTimeout(a),
    f = Jr(
      (s) => (s ? a() : o()),
      (s) => {
        typeof e._x_toggleAndCascadeWithTransitions == "function"
          ? e._x_toggleAndCascadeWithTransitions(e, s, a, o)
          : s
          ? u()
          : o();
      }
    ),
    d,
    g = !0;
  r(() =>
    i((s) => {
      (!g && s === d) ||
        (t.includes("immediate") && (s ? u() : o()), f(s), (d = s), (g = !1));
    })
  );
});
ee("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = Jg(t),
    o = le(e, i.items),
    a = le(e, e._x_keyExpression || "index");
  (e._x_prevKeys = []),
    (e._x_lookup = {}),
    n(() => Qg(e, i, o, a)),
    r(() => {
      Object.values(e._x_lookup).forEach((u) => u.remove()),
        delete e._x_prevKeys,
        delete e._x_lookup;
    });
});
function Qg(e, t, n, r) {
  let i = (a) => typeof a == "object" && !Array.isArray(a),
    o = e;
  n((a) => {
    Zg(a) && a >= 0 && (a = Array.from(Array(a).keys(), (p) => p + 1)),
      a === void 0 && (a = []);
    let u = e._x_lookup,
      f = e._x_prevKeys,
      d = [],
      g = [];
    if (i(a))
      a = Object.entries(a).map(([p, m]) => {
        let E = co(t, m, p, a);
        r((O) => g.push(O), { scope: { index: p, ...E } }), d.push(E);
      });
    else
      for (let p = 0; p < a.length; p++) {
        let m = co(t, a[p], p, a);
        r((E) => g.push(E), { scope: { index: p, ...m } }), d.push(m);
      }
    let s = [],
      c = [],
      l = [],
      h = [];
    for (let p = 0; p < f.length; p++) {
      let m = f[p];
      g.indexOf(m) === -1 && l.push(m);
    }
    f = f.filter((p) => !l.includes(p));
    let _ = "template";
    for (let p = 0; p < g.length; p++) {
      let m = g[p],
        E = f.indexOf(m);
      if (E === -1) f.splice(p, 0, m), s.push([_, p]);
      else if (E !== p) {
        let O = f.splice(p, 1)[0],
          D = f.splice(E - 1, 1)[0];
        f.splice(p, 0, D), f.splice(E, 0, O), c.push([O, D]);
      } else h.push(m);
      _ = m;
    }
    for (let p = 0; p < l.length; p++) {
      let m = l[p];
      u[m]._x_effects && u[m]._x_effects.forEach(Qa),
        u[m].remove(),
        (u[m] = null),
        delete u[m];
    }
    for (let p = 0; p < c.length; p++) {
      let [m, E] = c[p],
        O = u[m],
        D = u[E],
        L = document.createElement("div");
      te(() => {
        D.after(L),
          O.after(D),
          D._x_currentIfEl && D.after(D._x_currentIfEl),
          L.before(O),
          O._x_currentIfEl && O.after(O._x_currentIfEl),
          L.remove();
      }),
        ro(D, d[g.indexOf(E)]);
    }
    for (let p = 0; p < s.length; p++) {
      let [m, E] = s[p],
        O = m === "template" ? o : u[m];
      O._x_currentIfEl && (O = O._x_currentIfEl);
      let D = d[E],
        L = g[E],
        I = document.importNode(o.content, !0).firstElementChild;
      dn(I, Vt(D), o),
        te(() => {
          O.after(I), Ke(I);
        }),
        typeof L == "object" &&
          Hn(
            "x-for key cannot be an object, it must be a string or an integer",
            o
          ),
        (u[L] = I);
    }
    for (let p = 0; p < h.length; p++) ro(u[h[p]], d[g.indexOf(h[p])]);
    o._x_prevKeys = g;
  });
}
function Jg(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    n = /^\s*\(|\)\s*$/g,
    r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    i = e.match(r);
  if (!i) return;
  let o = {};
  o.items = i[2].trim();
  let a = i[1].replace(n, "").trim(),
    u = a.match(t);
  return (
    u
      ? ((o.item = a.replace(t, "").trim()),
        (o.index = u[1].trim()),
        u[2] && (o.collection = u[2].trim()))
      : (o.item = a),
    o
  );
}
function co(e, t, n, r) {
  let i = {};
  return (
    /^\[.*\]$/.test(e.item) && Array.isArray(t)
      ? e.item
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((a) => a.trim())
          .forEach((a, u) => {
            i[a] = t[u];
          })
      : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object"
      ? e.item
          .replace("{", "")
          .replace("}", "")
          .split(",")
          .map((a) => a.trim())
          .forEach((a) => {
            i[a] = t[a];
          })
      : (i[e.item] = t),
    e.index && (i[e.index] = n),
    e.collection && (i[e.collection] = r),
    i
  );
}
function Zg(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function al() {}
al.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = er(e);
  r._x_refs || (r._x_refs = {}),
    (r._x_refs[t] = e),
    n(() => delete r._x_refs[t]);
};
ee("ref", al);
ee("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = le(e, t),
    o = () => {
      if (e._x_currentIfEl) return e._x_currentIfEl;
      let u = e.content.cloneNode(!0).firstElementChild;
      return (
        dn(u, {}, e),
        te(() => {
          e.after(u), Ke(u);
        }),
        (e._x_currentIfEl = u),
        (e._x_undoIf = () => {
          ft(u, (f) => {
            f._x_effects && f._x_effects.forEach(Qa);
          }),
            u.remove(),
            delete e._x_currentIfEl;
        }),
        u
      );
    },
    a = () => {
      !e._x_undoIf || (e._x_undoIf(), delete e._x_undoIf);
    };
  n(() =>
    i((u) => {
      u ? o() : a();
    })
  ),
    r(() => e._x_undoIf && e._x_undoIf());
});
ee("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => Fg(e, i));
});
Yi(pc("@", _c(jt("on:"))));
ee(
  "on",
  rr((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
    let o = r ? le(e, r) : () => {};
    e.tagName.toLowerCase() === "template" &&
      (e._x_forwardEvents || (e._x_forwardEvents = []),
      e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
    let a = ol(e, t, n, (u) => {
      o(() => {}, { scope: { $event: u }, params: [u] });
    });
    i(() => a());
  })
);
pn.setEvaluator(uc);
pn.setReactivityEngine({ reactive: es, effect: _g, release: mg, raw: U });
var ev = pn,
  Rt = ev;
const tv = () => {
    Rt.store("modal", { title: "", html: "" }),
      (M._functions.events.eventAlert = (e) => {
        Rt.store("modal", e);
        let t = new ut(document.querySelector("[x-ref='modal']"));
        t._element.addEventListener(
          "hidden.bs.modal",
          (n) => {
            M._functions.events.eventRead(e.id);
          },
          { once: !0 }
        ),
          t.show();
      });
  },
  nv = () => {
    Rt.store("toast", { title: "", html: "" }),
      (M._functions.events.eventToast = (e) => {
        Rt.store("toast", e);
        let t = new un(document.querySelector("[x-ref='toast']")),
          n = t._element.querySelector("[data-bs-dismiss='toast']"),
          r = (i) => {
            M._functions.events.eventRead(e.id);
          };
        n.addEventListener("click", r, { once: !0 }),
          t._element.addEventListener(
            "hidden.bs.toast",
            (i) => {
              n.removeEventListener("click", r);
            },
            { once: !0 }
          ),
          t.show();
      });
  },
  rv = () => {
    (M._functions.events.eventCount = (e) => {
      Rt.store("unread_count", e);
    }),
      (M._functions.events.eventRead = (e) => {
        M.events.counter.read.add(e);
        let t = M.events.counter.unread.getAll().length;
        M.events.controller.broadcast("counter", { count: t }),
          Rt.store("unread_count", t);
      }),
      document.addEventListener("alpine:init", () => {
        M._functions.events.eventCount(M.events.counter.unread.getAll().length);
      });
  };
yi.extend(Xo);
M.init(window.init);
Xu(), zu(), Ju(), em(), tm(), nm(), rv(), tv(), nv();
export {
  M as C,
  ut as M,
  It as T,
  _t as a,
  _u as c,
  yi as d,
  Ju as h,
  Rt as m,
};
