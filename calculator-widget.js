import Ea, { useState as tp } from "react";
import Q1 from "react-dom";
function PS(R) {
  return R && R.__esModule && Object.prototype.hasOwnProperty.call(R, "default") ? R.default : R;
}
var lv = { exports: {} }, lp = {}, av = { exports: {} }, Mg = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var M1;
function e2() {
  return M1 || (M1 = 1, (function(R) {
    function L(z, Q) {
      var $ = z.length;
      z.push(Q);
      e: for (; 0 < $; ) {
        var fe = $ - 1 >>> 1, _ = z[fe];
        if (0 < k(_, Q))
          z[fe] = Q, z[$] = _, $ = fe;
        else break e;
      }
    }
    function J(z) {
      return z.length === 0 ? null : z[0];
    }
    function g(z) {
      if (z.length === 0) return null;
      var Q = z[0], $ = z.pop();
      if ($ !== Q) {
        z[0] = $;
        e: for (var fe = 0, _ = z.length, le = _ >>> 1; fe < le; ) {
          var F = 2 * (fe + 1) - 1, he = z[F], Ue = F + 1, Ke = z[Ue];
          if (0 > k(he, $))
            Ue < _ && 0 > k(Ke, he) ? (z[fe] = Ke, z[Ue] = $, fe = Ue) : (z[fe] = he, z[F] = $, fe = F);
          else if (Ue < _ && 0 > k(Ke, $))
            z[fe] = Ke, z[Ue] = $, fe = Ue;
          else break e;
        }
      }
      return Q;
    }
    function k(z, Q) {
      var $ = z.sortIndex - Q.sortIndex;
      return $ !== 0 ? $ : z.id - Q.id;
    }
    if (R.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var ie = performance;
      R.unstable_now = function() {
        return ie.now();
      };
    } else {
      var Xe = Date, De = Xe.now();
      R.unstable_now = function() {
        return Xe.now() - De;
      };
    }
    var Z = [], Qe = [], be = 1, P = null, ee = 3, de = !1, Se = !1, bt = !1, $e = !1, Je = typeof setTimeout == "function" ? setTimeout : null, sl = typeof clearTimeout == "function" ? clearTimeout : null, ft = typeof setImmediate < "u" ? setImmediate : null;
    function it(z) {
      for (var Q = J(Qe); Q !== null; ) {
        if (Q.callback === null) g(Qe);
        else if (Q.startTime <= z)
          g(Qe), Q.sortIndex = Q.expirationTime, L(Z, Q);
        else break;
        Q = J(Qe);
      }
    }
    function Qt(z) {
      if (bt = !1, it(z), !Se)
        if (J(Z) !== null)
          Se = !0, Ie || (Ie = !0, pe());
        else {
          var Q = J(Qe);
          Q !== null && St(Qt, Q.startTime - z);
        }
    }
    var Ie = !1, Be = -1, Yt = 5, ce = -1;
    function yt() {
      return $e ? !0 : !(R.unstable_now() - ce < Yt);
    }
    function We() {
      if ($e = !1, Ie) {
        var z = R.unstable_now();
        ce = z;
        var Q = !0;
        try {
          e: {
            Se = !1, bt && (bt = !1, sl(Be), Be = -1), de = !0;
            var $ = ee;
            try {
              t: {
                for (it(z), P = J(Z); P !== null && !(P.expirationTime > z && yt()); ) {
                  var fe = P.callback;
                  if (typeof fe == "function") {
                    P.callback = null, ee = P.priorityLevel;
                    var _ = fe(
                      P.expirationTime <= z
                    );
                    if (z = R.unstable_now(), typeof _ == "function") {
                      P.callback = _, it(z), Q = !0;
                      break t;
                    }
                    P === J(Z) && g(Z), it(z);
                  } else g(Z);
                  P = J(Z);
                }
                if (P !== null) Q = !0;
                else {
                  var le = J(Qe);
                  le !== null && St(
                    Qt,
                    le.startTime - z
                  ), Q = !1;
                }
              }
              break e;
            } finally {
              P = null, ee = $, de = !1;
            }
            Q = void 0;
          }
        } finally {
          Q ? pe() : Ie = !1;
        }
      }
    }
    var pe;
    if (typeof ft == "function")
      pe = function() {
        ft(We);
      };
    else if (typeof MessageChannel < "u") {
      var Mt = new MessageChannel(), Lt = Mt.port2;
      Mt.port1.onmessage = We, pe = function() {
        Lt.postMessage(null);
      };
    } else
      pe = function() {
        Je(We, 0);
      };
    function St(z, Q) {
      Be = Je(function() {
        z(R.unstable_now());
      }, Q);
    }
    R.unstable_IdlePriority = 5, R.unstable_ImmediatePriority = 1, R.unstable_LowPriority = 4, R.unstable_NormalPriority = 3, R.unstable_Profiling = null, R.unstable_UserBlockingPriority = 2, R.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, R.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Yt = 0 < z ? Math.floor(1e3 / z) : 5;
    }, R.unstable_getCurrentPriorityLevel = function() {
      return ee;
    }, R.unstable_next = function(z) {
      switch (ee) {
        case 1:
        case 2:
        case 3:
          var Q = 3;
          break;
        default:
          Q = ee;
      }
      var $ = ee;
      ee = Q;
      try {
        return z();
      } finally {
        ee = $;
      }
    }, R.unstable_requestPaint = function() {
      $e = !0;
    }, R.unstable_runWithPriority = function(z, Q) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var $ = ee;
      ee = z;
      try {
        return Q();
      } finally {
        ee = $;
      }
    }, R.unstable_scheduleCallback = function(z, Q, $) {
      var fe = R.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? fe + $ : fe) : $ = fe, z) {
        case 1:
          var _ = -1;
          break;
        case 2:
          _ = 250;
          break;
        case 5:
          _ = 1073741823;
          break;
        case 4:
          _ = 1e4;
          break;
        default:
          _ = 5e3;
      }
      return _ = $ + _, z = {
        id: be++,
        callback: Q,
        priorityLevel: z,
        startTime: $,
        expirationTime: _,
        sortIndex: -1
      }, $ > fe ? (z.sortIndex = $, L(Qe, z), J(Z) === null && z === J(Qe) && (bt ? (sl(Be), Be = -1) : bt = !0, St(Qt, $ - fe))) : (z.sortIndex = _, L(Z, z), Se || de || (Se = !0, Ie || (Ie = !0, pe()))), z;
    }, R.unstable_shouldYield = yt, R.unstable_wrapCallback = function(z) {
      var Q = ee;
      return function() {
        var $ = ee;
        ee = Q;
        try {
          return z.apply(this, arguments);
        } finally {
          ee = $;
        }
      };
    };
  })(Mg)), Mg;
}
var Ug = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var U1;
function t2() {
  return U1 || (U1 = 1, (function(R) {
    process.env.NODE_ENV !== "production" && (function() {
      function L() {
        if (Qt = !1, ce) {
          var z = R.unstable_now();
          pe = z;
          var Q = !0;
          try {
            e: {
              ft = !1, it && (it = !1, Be(yt), yt = -1), sl = !0;
              var $ = Je;
              try {
                t: {
                  for (Xe(z), $e = g(de); $e !== null && !($e.expirationTime > z && Z()); ) {
                    var fe = $e.callback;
                    if (typeof fe == "function") {
                      $e.callback = null, Je = $e.priorityLevel;
                      var _ = fe(
                        $e.expirationTime <= z
                      );
                      if (z = R.unstable_now(), typeof _ == "function") {
                        $e.callback = _, Xe(z), Q = !0;
                        break t;
                      }
                      $e === g(de) && k(de), Xe(z);
                    } else k(de);
                    $e = g(de);
                  }
                  if ($e !== null) Q = !0;
                  else {
                    var le = g(Se);
                    le !== null && Qe(
                      De,
                      le.startTime - z
                    ), Q = !1;
                  }
                }
                break e;
              } finally {
                $e = null, Je = $, sl = !1;
              }
              Q = void 0;
            }
          } finally {
            Q ? Mt() : ce = !1;
          }
        }
      }
      function J(z, Q) {
        var $ = z.length;
        z.push(Q);
        e: for (; 0 < $; ) {
          var fe = $ - 1 >>> 1, _ = z[fe];
          if (0 < ie(_, Q))
            z[fe] = Q, z[$] = _, $ = fe;
          else break e;
        }
      }
      function g(z) {
        return z.length === 0 ? null : z[0];
      }
      function k(z) {
        if (z.length === 0) return null;
        var Q = z[0], $ = z.pop();
        if ($ !== Q) {
          z[0] = $;
          e: for (var fe = 0, _ = z.length, le = _ >>> 1; fe < le; ) {
            var F = 2 * (fe + 1) - 1, he = z[F], Ue = F + 1, Ke = z[Ue];
            if (0 > ie(he, $))
              Ue < _ && 0 > ie(Ke, he) ? (z[fe] = Ke, z[Ue] = $, fe = Ue) : (z[fe] = he, z[F] = $, fe = F);
            else if (Ue < _ && 0 > ie(Ke, $))
              z[fe] = Ke, z[Ue] = $, fe = Ue;
            else break e;
          }
        }
        return Q;
      }
      function ie(z, Q) {
        var $ = z.sortIndex - Q.sortIndex;
        return $ !== 0 ? $ : z.id - Q.id;
      }
      function Xe(z) {
        for (var Q = g(Se); Q !== null; ) {
          if (Q.callback === null) k(Se);
          else if (Q.startTime <= z)
            k(Se), Q.sortIndex = Q.expirationTime, J(de, Q);
          else break;
          Q = g(Se);
        }
      }
      function De(z) {
        if (it = !1, Xe(z), !ft)
          if (g(de) !== null)
            ft = !0, ce || (ce = !0, Mt());
          else {
            var Q = g(Se);
            Q !== null && Qe(
              De,
              Q.startTime - z
            );
          }
      }
      function Z() {
        return Qt ? !0 : !(R.unstable_now() - pe < We);
      }
      function Qe(z, Q) {
        yt = Ie(function() {
          z(R.unstable_now());
        }, Q);
      }
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), R.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var be = performance;
        R.unstable_now = function() {
          return be.now();
        };
      } else {
        var P = Date, ee = P.now();
        R.unstable_now = function() {
          return P.now() - ee;
        };
      }
      var de = [], Se = [], bt = 1, $e = null, Je = 3, sl = !1, ft = !1, it = !1, Qt = !1, Ie = typeof setTimeout == "function" ? setTimeout : null, Be = typeof clearTimeout == "function" ? clearTimeout : null, Yt = typeof setImmediate < "u" ? setImmediate : null, ce = !1, yt = -1, We = 5, pe = -1;
      if (typeof Yt == "function")
        var Mt = function() {
          Yt(L);
        };
      else if (typeof MessageChannel < "u") {
        var Lt = new MessageChannel(), St = Lt.port2;
        Lt.port1.onmessage = L, Mt = function() {
          St.postMessage(null);
        };
      } else
        Mt = function() {
          Ie(L, 0);
        };
      R.unstable_IdlePriority = 5, R.unstable_ImmediatePriority = 1, R.unstable_LowPriority = 4, R.unstable_NormalPriority = 3, R.unstable_Profiling = null, R.unstable_UserBlockingPriority = 2, R.unstable_cancelCallback = function(z) {
        z.callback = null;
      }, R.unstable_forceFrameRate = function(z) {
        0 > z || 125 < z ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : We = 0 < z ? Math.floor(1e3 / z) : 5;
      }, R.unstable_getCurrentPriorityLevel = function() {
        return Je;
      }, R.unstable_next = function(z) {
        switch (Je) {
          case 1:
          case 2:
          case 3:
            var Q = 3;
            break;
          default:
            Q = Je;
        }
        var $ = Je;
        Je = Q;
        try {
          return z();
        } finally {
          Je = $;
        }
      }, R.unstable_requestPaint = function() {
        Qt = !0;
      }, R.unstable_runWithPriority = function(z, Q) {
        switch (z) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            z = 3;
        }
        var $ = Je;
        Je = z;
        try {
          return Q();
        } finally {
          Je = $;
        }
      }, R.unstable_scheduleCallback = function(z, Q, $) {
        var fe = R.unstable_now();
        switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? fe + $ : fe) : $ = fe, z) {
          case 1:
            var _ = -1;
            break;
          case 2:
            _ = 250;
            break;
          case 5:
            _ = 1073741823;
            break;
          case 4:
            _ = 1e4;
            break;
          default:
            _ = 5e3;
        }
        return _ = $ + _, z = {
          id: bt++,
          callback: Q,
          priorityLevel: z,
          startTime: $,
          expirationTime: _,
          sortIndex: -1
        }, $ > fe ? (z.sortIndex = $, J(Se, z), g(de) === null && z === g(Se) && (it ? (Be(yt), yt = -1) : it = !0, Qe(De, $ - fe))) : (z.sortIndex = _, J(de, z), ft || sl || (ft = !0, ce || (ce = !0, Mt()))), z;
      }, R.unstable_shouldYield = Z, R.unstable_wrapCallback = function(z) {
        var Q = Je;
        return function() {
          var $ = Je;
          Je = Q;
          try {
            return z.apply(this, arguments);
          } finally {
            Je = $;
          }
        };
      }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  })(Ug)), Ug;
}
var C1;
function L1() {
  return C1 || (C1 = 1, process.env.NODE_ENV === "production" ? av.exports = e2() : av.exports = t2()), av.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var H1;
function l2() {
  if (H1) return lp;
  H1 = 1;
  var R = L1(), L = Ea, J = Q1;
  function g(l) {
    var n = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        n += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function k(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function ie(l) {
    var n = l, u = l;
    if (l.alternate) for (; n.return; ) n = n.return;
    else {
      l = n;
      do
        n = l, (n.flags & 4098) !== 0 && (u = n.return), l = n.return;
      while (l);
    }
    return n.tag === 3 ? u : null;
  }
  function Xe(l) {
    if (l.tag === 13) {
      var n = l.memoizedState;
      if (n === null && (l = l.alternate, l !== null && (n = l.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function De(l) {
    if (ie(l) !== l)
      throw Error(g(188));
  }
  function Z(l) {
    var n = l.alternate;
    if (!n) {
      if (n = ie(l), n === null) throw Error(g(188));
      return n !== l ? null : l;
    }
    for (var u = l, c = n; ; ) {
      var s = u.return;
      if (s === null) break;
      var r = s.alternate;
      if (r === null) {
        if (c = s.return, c !== null) {
          u = c;
          continue;
        }
        break;
      }
      if (s.child === r.child) {
        for (r = s.child; r; ) {
          if (r === u) return De(s), l;
          if (r === c) return De(s), n;
          r = r.sibling;
        }
        throw Error(g(188));
      }
      if (u.return !== c.return) u = s, c = r;
      else {
        for (var m = !1, y = s.child; y; ) {
          if (y === u) {
            m = !0, u = s, c = r;
            break;
          }
          if (y === c) {
            m = !0, c = s, u = r;
            break;
          }
          y = y.sibling;
        }
        if (!m) {
          for (y = r.child; y; ) {
            if (y === u) {
              m = !0, u = r, c = s;
              break;
            }
            if (y === c) {
              m = !0, c = r, u = s;
              break;
            }
            y = y.sibling;
          }
          if (!m) throw Error(g(189));
        }
      }
      if (u.alternate !== c) throw Error(g(190));
    }
    if (u.tag !== 3) throw Error(g(188));
    return u.stateNode.current === u ? l : n;
  }
  function Qe(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l;
    for (l = l.child; l !== null; ) {
      if (n = Qe(l), n !== null) return n;
      l = l.sibling;
    }
    return null;
  }
  var be = Object.assign, P = Symbol.for("react.element"), ee = Symbol.for("react.transitional.element"), de = Symbol.for("react.portal"), Se = Symbol.for("react.fragment"), bt = Symbol.for("react.strict_mode"), $e = Symbol.for("react.profiler"), Je = Symbol.for("react.provider"), sl = Symbol.for("react.consumer"), ft = Symbol.for("react.context"), it = Symbol.for("react.forward_ref"), Qt = Symbol.for("react.suspense"), Ie = Symbol.for("react.suspense_list"), Be = Symbol.for("react.memo"), Yt = Symbol.for("react.lazy"), ce = Symbol.for("react.activity"), yt = Symbol.for("react.memo_cache_sentinel"), We = Symbol.iterator;
  function pe(l) {
    return l === null || typeof l != "object" ? null : (l = We && l[We] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Mt = Symbol.for("react.client.reference");
  function Lt(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Mt ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Se:
        return "Fragment";
      case $e:
        return "Profiler";
      case bt:
        return "StrictMode";
      case Qt:
        return "Suspense";
      case Ie:
        return "SuspenseList";
      case ce:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case de:
          return "Portal";
        case ft:
          return (l.displayName || "Context") + ".Provider";
        case sl:
          return (l._context.displayName || "Context") + ".Consumer";
        case it:
          var n = l.render;
          return l = l.displayName, l || (l = n.displayName || n.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Be:
          return n = l.displayName || null, n !== null ? n : Lt(l.type) || "Memo";
        case Yt:
          n = l._payload, l = l._init;
          try {
            return Lt(l(n));
          } catch {
          }
      }
    return null;
  }
  var St = Array.isArray, z = L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = J.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, fe = [], _ = -1;
  function le(l) {
    return { current: l };
  }
  function F(l) {
    0 > _ || (l.current = fe[_], fe[_] = null, _--);
  }
  function he(l, n) {
    _++, fe[_] = l.current, l.current = n;
  }
  var Ue = le(null), Ke = le(null), qe = le(null), fn = le(null);
  function Tt(l, n) {
    switch (he(qe, n), he(Ke, l), he(Ue, null), n.nodeType) {
      case 9:
      case 11:
        l = (l = n.documentElement) && (l = l.namespaceURI) ? Au(l) : 0;
        break;
      default:
        if (l = n.tagName, n = n.namespaceURI)
          n = Au(n), l = Uo(n, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    F(Ue), he(Ue, l);
  }
  function Zt() {
    F(Ue), F(Ke), F(qe);
  }
  function Xl(l) {
    l.memoizedState !== null && he(fn, l);
    var n = Ue.current, u = Uo(n, l.type);
    n !== u && (he(Ke, l), he(Ue, u));
  }
  function eu(l) {
    Ke.current === l && (F(Ue), F(Ke)), fn.current === l && (F(fn), aa._currentValue = $);
  }
  var Di = Object.prototype.hasOwnProperty, Oe = R.unstable_scheduleCallback, Xa = R.unstable_cancelCallback, ov = R.unstable_shouldYield, Oi = R.unstable_requestPaint, ua = R.unstable_now, ef = R.unstable_getCurrentPriorityLevel, cp = R.unstable_ImmediatePriority, sh = R.unstable_UserBlockingPriority, tf = R.unstable_NormalPriority, rh = R.unstable_LowPriority, Bc = R.unstable_IdlePriority, fv = R.log, op = R.unstable_setDisableYieldValue, qc = null, Cl = null;
  function tu(l) {
    if (typeof fv == "function" && op(l), Cl && typeof Cl.setStrictMode == "function")
      try {
        Cl.setStrictMode(qc, l);
      } catch {
      }
  }
  var Ql = Math.clz32 ? Math.clz32 : sv, dh = Math.log, fp = Math.LN2;
  function sv(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (dh(l) / fp | 0) | 0;
  }
  var Yc = 256, lu = 4194304;
  function ia(l) {
    var n = l & 42;
    if (n !== 0) return n;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function _u(l, n, u) {
    var c = l.pendingLanes;
    if (c === 0) return 0;
    var s = 0, r = l.suspendedLanes, m = l.pingedLanes;
    l = l.warmLanes;
    var y = c & 134217727;
    return y !== 0 ? (c = y & ~r, c !== 0 ? s = ia(c) : (m &= y, m !== 0 ? s = ia(m) : u || (u = y & ~l, u !== 0 && (s = ia(u))))) : (y = c & ~r, y !== 0 ? s = ia(y) : m !== 0 ? s = ia(m) : u || (u = c & ~l, u !== 0 && (s = ia(u)))), s === 0 ? 0 : n !== 0 && n !== s && (n & r) === 0 && (r = s & -s, u = n & -n, r >= u || r === 32 && (u & 4194048) !== 0) ? n : s;
  }
  function sn(l, n) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & n) === 0;
  }
  function tl(l, n) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Bu() {
    var l = Yc;
    return Yc <<= 1, (Yc & 4194048) === 0 && (Yc = 256), l;
  }
  function Mi() {
    var l = lu;
    return lu <<= 1, (lu & 62914560) === 0 && (lu = 4194304), l;
  }
  function qu(l) {
    for (var n = [], u = 0; 31 > u; u++) n.push(l);
    return n;
  }
  function Ui(l, n) {
    l.pendingLanes |= n, n !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function sp(l, n, u, c, s, r) {
    var m = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var y = l.entanglements, b = l.expirationTimes, M = l.hiddenUpdates;
    for (u = m & ~u; 0 < u; ) {
      var G = 31 - Ql(u), X = 1 << G;
      y[G] = 0, b[G] = -1;
      var C = M[G];
      if (C !== null)
        for (M[G] = null, G = 0; G < C.length; G++) {
          var N = C[G];
          N !== null && (N.lane &= -536870913);
        }
      u &= ~X;
    }
    c !== 0 && lf(l, c, 0), r !== 0 && s === 0 && l.tag !== 0 && (l.suspendedLanes |= r & ~(m & ~n));
  }
  function lf(l, n, u) {
    l.pendingLanes |= n, l.suspendedLanes &= ~n;
    var c = 31 - Ql(n);
    l.entangledLanes |= n, l.entanglements[c] = l.entanglements[c] | 1073741824 | u & 4194090;
  }
  function af(l, n) {
    var u = l.entangledLanes |= n;
    for (l = l.entanglements; u; ) {
      var c = 31 - Ql(u), s = 1 << c;
      s & n | l[c] & n && (l[c] |= n), u &= ~s;
    }
  }
  function Qa(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Xs(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function rp() {
    var l = Q.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : py(l.type));
  }
  function rv(l, n) {
    var u = Q.p;
    try {
      return Q.p = l, n();
    } finally {
      Q.p = u;
    }
  }
  var Jt = Math.random().toString(36).slice(2), ll = "__reactFiber$" + Jt, Hl = "__reactProps$" + Jt, wc = "__reactContainer$" + Jt, Qs = "__reactEvents$" + Jt, dp = "__reactListeners$" + Jt, Ls = "__reactHandles$" + Jt, hp = "__reactResources$" + Jt, ae = "__reactMarker$" + Jt;
  function nf(l) {
    delete l[ll], delete l[Hl], delete l[Qs], delete l[dp], delete l[Ls];
  }
  function rl(l) {
    var n = l[ll];
    if (n) return n;
    for (var u = l.parentNode; u; ) {
      if (n = u[wc] || u[ll]) {
        if (u = n.alternate, n.child !== null || u !== null && u.child !== null)
          for (l = gl(l); l !== null; ) {
            if (u = l[ll]) return u;
            l = gl(l);
          }
        return n;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function Ci(l) {
    if (l = l[ll] || l[wc]) {
      var n = l.tag;
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3)
        return l;
    }
    return null;
  }
  function uf(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l.stateNode;
    throw Error(g(33));
  }
  function au(l) {
    var n = l[hp];
    return n || (n = l[hp] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Kt(l) {
    l[ae] = !0;
  }
  var cf = /* @__PURE__ */ new Set(), ca = {};
  function Yu(l, n) {
    wu(l, n), wu(l + "Capture", n);
  }
  function wu(l, n) {
    for (ca[l] = n, l = 0; l < n.length; l++)
      cf.add(n[l]);
  }
  var mp = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Zs = {}, hh = {};
  function yp(l) {
    return Di.call(hh, l) ? !0 : Di.call(Zs, l) ? !1 : mp.test(l) ? hh[l] = !0 : (Zs[l] = !0, !1);
  }
  function nu(l, n, u) {
    if (yp(n))
      if (u === null) l.removeAttribute(n);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(n);
            return;
          case "boolean":
            var c = n.toLowerCase().slice(0, 5);
            if (c !== "data-" && c !== "aria-") {
              l.removeAttribute(n);
              return;
            }
        }
        l.setAttribute(n, "" + u);
      }
  }
  function of(l, n, u) {
    if (u === null) l.removeAttribute(n);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(n);
          return;
      }
      l.setAttribute(n, "" + u);
    }
  }
  function rn(l, n, u, c) {
    if (c === null) l.removeAttribute(u);
    else {
      switch (typeof c) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(n, u, "" + c);
    }
  }
  var Js, mh;
  function Hi(l) {
    if (Js === void 0)
      try {
        throw Error();
      } catch (u) {
        var n = u.stack.trim().match(/\n( *(at )?)/);
        Js = n && n[1] || "", mh = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Js + l + mh;
  }
  var Nl = !1;
  function Gu(l, n) {
    if (!l || Nl) return "";
    Nl = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var c = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var X = function() {
                throw Error();
              };
              if (Object.defineProperty(X.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(X, []);
                } catch (N) {
                  var C = N;
                }
                Reflect.construct(l, [], X);
              } else {
                try {
                  X.call();
                } catch (N) {
                  C = N;
                }
                l.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                C = N;
              }
              (X = l()) && typeof X.catch == "function" && X.catch(function() {
              });
            }
          } catch (N) {
            if (N && C && typeof N.stack == "string")
              return [N.stack, C.stack];
          }
          return [null, null];
        }
      };
      c.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        c.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        c.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var r = c.DetermineComponentFrameRoot(), m = r[0], y = r[1];
      if (m && y) {
        var b = m.split(`
`), M = y.split(`
`);
        for (s = c = 0; c < b.length && !b[c].includes("DetermineComponentFrameRoot"); )
          c++;
        for (; s < M.length && !M[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (c === b.length || s === M.length)
          for (c = b.length - 1, s = M.length - 1; 1 <= c && 0 <= s && b[c] !== M[s]; )
            s--;
        for (; 1 <= c && 0 <= s; c--, s--)
          if (b[c] !== M[s]) {
            if (c !== 1 || s !== 1)
              do
                if (c--, s--, 0 > s || b[c] !== M[s]) {
                  var G = `
` + b[c].replace(" at new ", " at ");
                  return l.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", l.displayName)), G;
                }
              while (1 <= c && 0 <= s);
            break;
          }
      }
    } finally {
      Nl = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? Hi(u) : "";
  }
  function Ni(l) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Hi(l.type);
      case 16:
        return Hi("Lazy");
      case 13:
        return Hi("Suspense");
      case 19:
        return Hi("SuspenseList");
      case 0:
      case 15:
        return Gu(l.type, !1);
      case 11:
        return Gu(l.type.render, !1);
      case 1:
        return Gu(l.type, !0);
      case 31:
        return Hi("Activity");
      default:
        return "";
    }
  }
  function yh(l) {
    try {
      var n = "";
      do
        n += Ni(l), l = l.return;
      while (l);
      return n;
    } catch (u) {
      return `
Error generating stack: ` + u.message + `
` + u.stack;
    }
  }
  function xl(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function ff(l) {
    var n = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function ph(l) {
    var n = ff(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      n
    ), c = "" + l[n];
    if (!l.hasOwnProperty(n) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var s = u.get, r = u.set;
      return Object.defineProperty(l, n, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(m) {
          c = "" + m, r.call(this, m);
        }
      }), Object.defineProperty(l, n, {
        enumerable: u.enumerable
      }), {
        getValue: function() {
          return c;
        },
        setValue: function(m) {
          c = "" + m;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[n];
        }
      };
    }
  }
  function Vu(l) {
    l._valueTracker || (l._valueTracker = ph(l));
  }
  function ji(l) {
    if (!l) return !1;
    var n = l._valueTracker;
    if (!n) return !0;
    var u = n.getValue(), c = "";
    return l && (c = ff(l) ? l.checked ? "true" : "false" : l.value), l = c, l !== u ? (n.setValue(l), !0) : !1;
  }
  function Gc(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var dv = /[\n"\\]/g;
  function xa(l) {
    return l.replace(
      dv,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ks(l, n, u, c, s, r, m, y) {
    l.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? l.type = m : l.removeAttribute("type"), n != null ? m === "number" ? (n === 0 && l.value === "" || l.value != n) && (l.value = "" + xl(n)) : l.value !== "" + xl(n) && (l.value = "" + xl(n)) : m !== "submit" && m !== "reset" || l.removeAttribute("value"), n != null ? sf(l, m, xl(n)) : u != null ? sf(l, m, xl(u)) : c != null && l.removeAttribute("value"), s == null && r != null && (l.defaultChecked = !!r), s != null && (l.checked = s && typeof s != "function" && typeof s != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? l.name = "" + xl(y) : l.removeAttribute("name");
  }
  function ks(l, n, u, c, s, r, m, y) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (l.type = r), n != null || u != null) {
      if (!(r !== "submit" && r !== "reset" || n != null))
        return;
      u = u != null ? "" + xl(u) : "", n = n != null ? "" + xl(n) : u, y || n === l.value || (l.value = n), l.defaultValue = n;
    }
    c = c ?? s, c = typeof c != "function" && typeof c != "symbol" && !!c, l.checked = y ? l.checked : !!c, l.defaultChecked = !!c, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (l.name = m);
  }
  function sf(l, n, u) {
    n === "number" && Gc(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function _i(l, n, u, c) {
    if (l = l.options, n) {
      n = {};
      for (var s = 0; s < u.length; s++)
        n["$" + u[s]] = !0;
      for (u = 0; u < l.length; u++)
        s = n.hasOwnProperty("$" + l[u].value), l[u].selected !== s && (l[u].selected = s), s && c && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + xl(u), n = null, s = 0; s < l.length; s++) {
        if (l[s].value === u) {
          l[s].selected = !0, c && (l[s].defaultSelected = !0);
          return;
        }
        n !== null || l[s].disabled || (n = l[s]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function vh(l, n, u) {
    if (n != null && (n = "" + xl(n), n !== l.value && (l.value = n), u == null)) {
      l.defaultValue !== n && (l.defaultValue = n);
      return;
    }
    l.defaultValue = u != null ? "" + xl(u) : "";
  }
  function gh(l, n, u, c) {
    if (n == null) {
      if (c != null) {
        if (u != null) throw Error(g(92));
        if (St(c)) {
          if (1 < c.length) throw Error(g(93));
          c = c[0];
        }
        u = c;
      }
      u == null && (u = ""), n = u;
    }
    u = xl(n), l.defaultValue = u, c = l.textContent, c === u && c !== "" && c !== null && (l.value = c);
  }
  function Vc(l, n) {
    if (n) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = n;
        return;
      }
    }
    l.textContent = n;
  }
  var pp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function $s(l, n, u) {
    var c = n.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? c ? l.setProperty(n, "") : n === "float" ? l.cssFloat = "" : l[n] = "" : c ? l.setProperty(n, u) : typeof u != "number" || u === 0 || pp.has(n) ? n === "float" ? l.cssFloat = u : l[n] = ("" + u).trim() : l[n] = u + "px";
  }
  function rf(l, n, u) {
    if (n != null && typeof n != "object")
      throw Error(g(62));
    if (l = l.style, u != null) {
      for (var c in u)
        !u.hasOwnProperty(c) || n != null && n.hasOwnProperty(c) || (c.indexOf("--") === 0 ? l.setProperty(c, "") : c === "float" ? l.cssFloat = "" : l[c] = "");
      for (var s in n)
        c = n[s], n.hasOwnProperty(s) && u[s] !== c && $s(l, s, c);
    } else
      for (var r in n)
        n.hasOwnProperty(r) && $s(l, r, n[r]);
  }
  function Bi(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var hv = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), vp = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function df(l) {
    return vp.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  var qi = null;
  function Ws(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Xc = null, Qc = null;
  function gp(l) {
    var n = Ci(l);
    if (n && (l = n.stateNode)) {
      var u = l[Hl] || null;
      e: switch (l = n.stateNode, n.type) {
        case "input":
          if (Ks(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), n = u.name, u.type === "radio" && n != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + xa(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < u.length; n++) {
              var c = u[n];
              if (c !== l && c.form === l.form) {
                var s = c[Hl] || null;
                if (!s) throw Error(g(90));
                Ks(
                  c,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (n = 0; n < u.length; n++)
              c = u[n], c.form === l.form && ji(c);
          }
          break e;
        case "textarea":
          vh(l, u.value, u.defaultValue);
          break e;
        case "select":
          n = u.value, n != null && _i(l, !!u.multiple, n, !1);
      }
    }
  }
  var bh = !1;
  function Lc(l, n, u) {
    if (bh) return l(n, u);
    bh = !0;
    try {
      var c = l(n);
      return c;
    } finally {
      if (bh = !1, (Xc !== null || Qc !== null) && (yc(), Xc && (n = Xc, l = Qc, Qc = Xc = null, gp(n), l)))
        for (n = 0; n < l.length; n++) gp(l[n]);
    }
  }
  function Yi(l, n) {
    var u = l.stateNode;
    if (u === null) return null;
    var c = u[Hl] || null;
    if (c === null) return null;
    u = c[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (c = !c.disabled) || (l = l.type, c = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !c;
        break e;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function")
      throw Error(
        g(231, n, typeof u)
      );
    return u;
  }
  var dn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Fs = !1;
  if (dn)
    try {
      var uu = {};
      Object.defineProperty(uu, "passive", {
        get: function() {
          Fs = !0;
        }
      }), window.addEventListener("test", uu, uu), window.removeEventListener("test", uu, uu);
    } catch {
      Fs = !1;
    }
  var iu = null, Zc = null, wi = null;
  function Sh() {
    if (wi) return wi;
    var l, n = Zc, u = n.length, c, s = "value" in iu ? iu.value : iu.textContent, r = s.length;
    for (l = 0; l < u && n[l] === s[l]; l++) ;
    var m = u - l;
    for (c = 1; c <= m && n[u - c] === s[r - c]; c++) ;
    return wi = s.slice(l, 1 < c ? 1 - c : void 0);
  }
  function dl(l) {
    var n = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && n === 13 && (l = 13)) : l = n, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Is() {
    return !0;
  }
  function Ps() {
    return !1;
  }
  function jl(l) {
    function n(u, c, s, r, m) {
      this._reactName = u, this._targetInst = s, this.type = c, this.nativeEvent = r, this.target = m, this.currentTarget = null;
      for (var y in l)
        l.hasOwnProperty(y) && (u = l[y], this[y] = u ? u(r) : r[y]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Is : Ps, this.isPropagationStopped = Ps, this;
    }
    return be(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Is);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Is);
      },
      persist: function() {
      },
      isPersistent: Is
    }), n;
  }
  var Xu = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, er = jl(Xu), hf = be({}, Xu, { view: 0, detail: 0 }), bp = jl(hf), Th, tr, mf, Gi = be({}, hf, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: cu,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== mf && (mf && l.type === "mousemove" ? (Th = l.screenX - mf.screenX, tr = l.screenY - mf.screenY) : tr = Th = 0, mf = l), Th);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : tr;
    }
  }), Eh = jl(Gi), Sp = be({}, Gi, { dataTransfer: 0 }), Tp = jl(Sp), mv = be({}, hf, { relatedTarget: 0 }), xh = jl(mv), yv = be({}, Xu, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pv = jl(yv), vv = be({}, Xu, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), yf = jl(vv), Ep = be({}, Xu, { data: 0 }), Ah = jl(Ep), xp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Ap = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Rh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Rp(l) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(l) : (l = Rh[l]) ? !!n[l] : !1;
  }
  function cu() {
    return Rp;
  }
  var Vi = be({}, hf, {
    key: function(l) {
      if (l.key) {
        var n = xp[l.key] || l.key;
        if (n !== "Unidentified") return n;
      }
      return l.type === "keypress" ? (l = dl(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Ap[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: cu,
    charCode: function(l) {
      return l.type === "keypress" ? dl(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? dl(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), La = jl(Vi), oa = be({}, Gi, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), pf = jl(oa), lr = be({}, hf, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: cu
  }), zh = jl(lr), Ll = be({}, Xu, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), zp = jl(Ll), ar = be({}, Gi, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Xi = jl(ar), Dh = be({}, Xu, {
    newState: 0,
    oldState: 0
  }), Dp = jl(Dh), Op = [9, 13, 27, 32], vf = dn && "CompositionEvent" in window, gf = null;
  dn && "documentMode" in document && (gf = document.documentMode);
  var Oh = dn && "TextEvent" in window && !gf, hn = dn && (!vf || gf && 8 < gf && 11 >= gf), Mh = " ", nr = !1;
  function bf(l, n) {
    switch (l) {
      case "keyup":
        return Op.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Qu(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Lu = !1;
  function Uh(l, n) {
    switch (l) {
      case "compositionend":
        return Qu(n);
      case "keypress":
        return n.which !== 32 ? null : (nr = !0, Mh);
      case "textInput":
        return l = n.data, l === Mh && nr ? null : l;
      default:
        return null;
    }
  }
  function Qi(l, n) {
    if (Lu)
      return l === "compositionend" || !vf && bf(l, n) ? (l = Sh(), wi = Zc = iu = null, Lu = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return hn && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var Mp = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function ur(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n === "input" ? !!Mp[l.type] : n === "textarea";
  }
  function ir(l, n, u, c) {
    Xc ? Qc ? Qc.push(c) : Qc = [c] : Xc = c, n = Mo(n, "onChange"), 0 < n.length && (u = new er(
      "onChange",
      "change",
      null,
      u,
      c
    ), l.push({ event: u, listeners: n }));
  }
  var Za = null, Ja = null;
  function Ch(l) {
    bc(l, 0);
  }
  function mn(l) {
    var n = uf(l);
    if (ji(n)) return l;
  }
  function Hh(l, n) {
    if (l === "change") return n;
  }
  var Nh = !1;
  if (dn) {
    var Li;
    if (dn) {
      var Zi = "oninput" in document;
      if (!Zi) {
        var jh = document.createElement("div");
        jh.setAttribute("oninput", "return;"), Zi = typeof jh.oninput == "function";
      }
      Li = Zi;
    } else Li = !1;
    Nh = Li && (!document.documentMode || 9 < document.documentMode);
  }
  function Jc() {
    Za && (Za.detachEvent("onpropertychange", _h), Ja = Za = null);
  }
  function _h(l) {
    if (l.propertyName === "value" && mn(Ja)) {
      var n = [];
      ir(
        n,
        Ja,
        l,
        Ws(l)
      ), Lc(Ch, n);
    }
  }
  function cr(l, n, u) {
    l === "focusin" ? (Jc(), Za = n, Ja = u, Za.attachEvent("onpropertychange", _h)) : l === "focusout" && Jc();
  }
  function Zu(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return mn(Ja);
  }
  function ou(l, n) {
    if (l === "click") return mn(n);
  }
  function Bh(l, n) {
    if (l === "input" || l === "change")
      return mn(n);
  }
  function qh(l, n) {
    return l === n && (l !== 0 || 1 / l === 1 / n) || l !== l && n !== n;
  }
  var hl = typeof Object.is == "function" ? Object.is : qh;
  function Ju(l, n) {
    if (hl(l, n)) return !0;
    if (typeof l != "object" || l === null || typeof n != "object" || n === null)
      return !1;
    var u = Object.keys(l), c = Object.keys(n);
    if (u.length !== c.length) return !1;
    for (c = 0; c < u.length; c++) {
      var s = u[c];
      if (!Di.call(n, s) || !hl(l[s], n[s]))
        return !1;
    }
    return !0;
  }
  function Ku(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function pt(l, n) {
    var u = Ku(l);
    l = 0;
    for (var c; u; ) {
      if (u.nodeType === 3) {
        if (c = l + u.textContent.length, l <= n && c >= n)
          return { node: u, offset: n - l };
        l = c;
      }
      e: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = Ku(u);
    }
  }
  function Sf(l, n) {
    return l && n ? l === n ? !0 : l && l.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Sf(l, n.parentNode) : "contains" in l ? l.contains(n) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Yh(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var n = Gc(l.document); n instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof n.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = n.contentWindow;
      else break;
      n = Gc(l.document);
    }
    return n;
  }
  function Tf(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n && (n === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || n === "textarea" || l.contentEditable === "true");
  }
  var Ji = dn && "documentMode" in document && 11 >= document.documentMode, yn = null, Ka = null, ku = null, Ki = !1;
  function or(l, n, u) {
    var c = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Ki || yn == null || yn !== Gc(c) || (c = yn, "selectionStart" in c && Tf(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
      anchorNode: c.anchorNode,
      anchorOffset: c.anchorOffset,
      focusNode: c.focusNode,
      focusOffset: c.focusOffset
    }), ku && Ju(ku, c) || (ku = c, c = Mo(Ka, "onSelect"), 0 < c.length && (n = new er(
      "onSelect",
      "select",
      null,
      n,
      u
    ), l.push({ event: n, listeners: c }), n.target = yn)));
  }
  function fu(l, n) {
    var u = {};
    return u[l.toLowerCase()] = n.toLowerCase(), u["Webkit" + l] = "webkit" + n, u["Moz" + l] = "moz" + n, u;
  }
  var ki = {
    animationend: fu("Animation", "AnimationEnd"),
    animationiteration: fu("Animation", "AnimationIteration"),
    animationstart: fu("Animation", "AnimationStart"),
    transitionrun: fu("Transition", "TransitionRun"),
    transitionstart: fu("Transition", "TransitionStart"),
    transitioncancel: fu("Transition", "TransitionCancel"),
    transitionend: fu("Transition", "TransitionEnd")
  }, Aa = {}, ka = {};
  dn && (ka = document.createElement("div").style, "AnimationEvent" in window || (delete ki.animationend.animation, delete ki.animationiteration.animation, delete ki.animationstart.animation), "TransitionEvent" in window || delete ki.transitionend.transition);
  function pn(l) {
    if (Aa[l]) return Aa[l];
    if (!ki[l]) return l;
    var n = ki[l], u;
    for (u in n)
      if (n.hasOwnProperty(u) && u in ka)
        return Aa[l] = n[u];
    return l;
  }
  var Up = pn("animationend"), wh = pn("animationiteration"), Cp = pn("animationstart"), Gh = pn("transitionrun"), fr = pn("transitionstart"), Hp = pn("transitioncancel"), Vh = pn("transitionend"), Xh = /* @__PURE__ */ new Map(), Kc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Kc.push("scrollEnd");
  function Ra(l, n) {
    Xh.set(l, n), Yu(n, [l]);
  }
  var Qh = /* @__PURE__ */ new WeakMap();
  function fa(l, n) {
    if (typeof l == "object" && l !== null) {
      var u = Qh.get(l);
      return u !== void 0 ? u : (n = {
        value: l,
        source: n,
        stack: yh(n)
      }, Qh.set(l, n), n);
    }
    return {
      value: l,
      source: n,
      stack: yh(n)
    };
  }
  var Zl = [], $u = 0, vn = 0;
  function $a() {
    for (var l = $u, n = vn = $u = 0; n < l; ) {
      var u = Zl[n];
      Zl[n++] = null;
      var c = Zl[n];
      Zl[n++] = null;
      var s = Zl[n];
      Zl[n++] = null;
      var r = Zl[n];
      if (Zl[n++] = null, c !== null && s !== null) {
        var m = c.pending;
        m === null ? s.next = s : (s.next = m.next, m.next = s), c.pending = s;
      }
      r !== 0 && $c(u, s, r);
    }
  }
  function Wu(l, n, u, c) {
    Zl[$u++] = l, Zl[$u++] = n, Zl[$u++] = u, Zl[$u++] = c, vn |= c, l.lanes |= c, l = l.alternate, l !== null && (l.lanes |= c);
  }
  function kc(l, n, u, c) {
    return Wu(l, n, u, c), Ef(l);
  }
  function gn(l, n) {
    return Wu(l, null, null, n), Ef(l);
  }
  function $c(l, n, u) {
    l.lanes |= u;
    var c = l.alternate;
    c !== null && (c.lanes |= u);
    for (var s = !1, r = l.return; r !== null; )
      r.childLanes |= u, c = r.alternate, c !== null && (c.childLanes |= u), r.tag === 22 && (l = r.stateNode, l === null || l._visibility & 1 || (s = !0)), l = r, r = r.return;
    return l.tag === 3 ? (r = l.stateNode, s && n !== null && (s = 31 - Ql(u), l = r.hiddenUpdates, c = l[s], c === null ? l[s] = [n] : c.push(n), n.lane = u | 536870912), r) : null;
  }
  function Ef(l) {
    if (50 < xo)
      throw xo = 0, Qm = null, Error(g(185));
    for (var n = l.return; n !== null; )
      l = n, n = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Wc = {};
  function Np(l, n, u, c) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Jl(l, n, u, c) {
    return new Np(l, n, u, c);
  }
  function xf(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Wa(l, n) {
    var u = l.alternate;
    return u === null ? (u = Jl(
      l.tag,
      n,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = n, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, n = l.dependencies, u.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function He(l, n) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = n, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, n = u.dependencies, l.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), l;
  }
  function K(l, n, u, c, s, r) {
    var m = 0;
    if (c = l, typeof l == "function") xf(l) && (m = 1);
    else if (typeof l == "string")
      m = h0(
        l,
        u,
        Ue.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      e: switch (l) {
        case ce:
          return l = Jl(31, u, n, s), l.elementType = ce, l.lanes = r, l;
        case Se:
          return za(u.children, s, r, n);
        case bt:
          m = 8, s |= 24;
          break;
        case $e:
          return l = Jl(12, u, n, s | 2), l.elementType = $e, l.lanes = r, l;
        case Qt:
          return l = Jl(13, u, n, s), l.elementType = Qt, l.lanes = r, l;
        case Ie:
          return l = Jl(19, u, n, s), l.elementType = Ie, l.lanes = r, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Je:
              case ft:
                m = 10;
                break e;
              case sl:
                m = 9;
                break e;
              case it:
                m = 11;
                break e;
              case Be:
                m = 14;
                break e;
              case Yt:
                m = 16, c = null;
                break e;
            }
          m = 29, u = Error(
            g(130, l === null ? "null" : typeof l, "")
          ), c = null;
      }
    return n = Jl(m, u, n, s), n.elementType = l, n.type = c, n.lanes = r, n;
  }
  function za(l, n, u, c) {
    return l = Jl(7, l, c, n), l.lanes = u, l;
  }
  function Fc(l, n, u) {
    return l = Jl(6, l, null, n), l.lanes = u, l;
  }
  function zt(l, n, u) {
    return n = Jl(
      4,
      l.children !== null ? l.children : [],
      l.key,
      n
    ), n.lanes = u, n.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, n;
  }
  var Fu = [], Iu = 0, Af = null, Ic = 0, Da = [], Kl = 0, su = null, Fa = 1, Ut = "";
  function Le(l, n) {
    Fu[Iu++] = Ic, Fu[Iu++] = Af, Af = l, Ic = n;
  }
  function sr(l, n, u) {
    Da[Kl++] = Fa, Da[Kl++] = Ut, Da[Kl++] = su, su = l;
    var c = Fa;
    l = Ut;
    var s = 32 - Ql(c) - 1;
    c &= ~(1 << s), u += 1;
    var r = 32 - Ql(n) + s;
    if (30 < r) {
      var m = s - s % 5;
      r = (c & (1 << m) - 1).toString(32), c >>= m, s -= m, Fa = 1 << 32 - Ql(n) + s | u << s | c, Ut = r + l;
    } else
      Fa = 1 << r | u << s | c, Ut = l;
  }
  function $i(l) {
    l.return !== null && (Le(l, 1), sr(l, 1, 0));
  }
  function bn(l) {
    for (; l === Af; )
      Af = Fu[--Iu], Fu[Iu] = null, Ic = Fu[--Iu], Fu[Iu] = null;
    for (; l === su; )
      su = Da[--Kl], Da[Kl] = null, Ut = Da[--Kl], Da[Kl] = null, Fa = Da[--Kl], Da[Kl] = null;
  }
  var wt = null, Pe = null, Fe = !1, Oa = null, Ma = !1, Wi = Error(g(519));
  function ru(l) {
    var n = Error(g(418, ""));
    throw to(fa(n, l)), Wi;
  }
  function Rf(l) {
    var n = l.stateNode, u = l.type, c = l.memoizedProps;
    switch (n[ll] = l, n[Hl] = c, u) {
      case "dialog":
        Ae("cancel", n), Ae("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ae("load", n);
        break;
      case "video":
      case "audio":
        for (u = 0; u < ss.length; u++)
          Ae(ss[u], n);
        break;
      case "source":
        Ae("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ae("error", n), Ae("load", n);
        break;
      case "details":
        Ae("toggle", n);
        break;
      case "input":
        Ae("invalid", n), ks(
          n,
          c.value,
          c.defaultValue,
          c.checked,
          c.defaultChecked,
          c.type,
          c.name,
          !0
        ), Vu(n);
        break;
      case "select":
        Ae("invalid", n);
        break;
      case "textarea":
        Ae("invalid", n), gh(n, c.value, c.defaultValue, c.children), Vu(n);
    }
    u = c.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || n.textContent === "" + u || c.suppressHydrationWarning === !0 || ay(n.textContent, u) ? (c.popover != null && (Ae("beforetoggle", n), Ae("toggle", n)), c.onScroll != null && Ae("scroll", n), c.onScrollEnd != null && Ae("scrollend", n), c.onClick != null && (n.onclick = Sd), n = !0) : n = !1, n || ru(l);
  }
  function Lh(l) {
    for (wt = l.return; wt; )
      switch (wt.tag) {
        case 5:
        case 13:
          Ma = !1;
          return;
        case 27:
        case 3:
          Ma = !0;
          return;
        default:
          wt = wt.return;
      }
  }
  function Pc(l) {
    if (l !== wt) return !1;
    if (!Fe) return Lh(l), Fe = !0, !1;
    var n = l.tag, u;
    if ((u = n !== 3 && n !== 27) && ((u = n === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || wn(l.type, l.memoizedProps)), u = !u), u && Pe && ru(l), Lh(l), n === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(g(317));
      e: {
        for (l = l.nextSibling, n = 0; l; ) {
          if (l.nodeType === 8)
            if (u = l.data, u === "/$") {
              if (n === 0) {
                Pe = an(l.nextSibling);
                break e;
              }
              n--;
            } else
              u !== "$" && u !== "$!" && u !== "$?" || n++;
          l = l.nextSibling;
        }
        Pe = null;
      }
    } else
      n === 27 ? (n = Pe, pi(l.type) ? (l = vi, vi = null, Pe = l) : Pe = n) : Pe = wt ? an(l.stateNode.nextSibling) : null;
    return !0;
  }
  function eo() {
    Pe = wt = null, Fe = !1;
  }
  function Zh() {
    var l = Oa;
    return l !== null && (Pl === null ? Pl = l : Pl.push.apply(
      Pl,
      l
    ), Oa = null), l;
  }
  function to(l) {
    Oa === null ? Oa = [l] : Oa.push(l);
  }
  var zf = le(null), du = null, Ia = null;
  function hu(l, n, u) {
    he(zf, n._currentValue), n._currentValue = u;
  }
  function Sn(l) {
    l._currentValue = zf.current, F(zf);
  }
  function rr(l, n, u) {
    for (; l !== null; ) {
      var c = l.alternate;
      if ((l.childLanes & n) !== n ? (l.childLanes |= n, c !== null && (c.childLanes |= n)) : c !== null && (c.childLanes & n) !== n && (c.childLanes |= n), l === u) break;
      l = l.return;
    }
  }
  function Jh(l, n, u, c) {
    var s = l.child;
    for (s !== null && (s.return = l); s !== null; ) {
      var r = s.dependencies;
      if (r !== null) {
        var m = s.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var y = r;
          r = s;
          for (var b = 0; b < n.length; b++)
            if (y.context === n[b]) {
              r.lanes |= u, y = r.alternate, y !== null && (y.lanes |= u), rr(
                r.return,
                u,
                l
              ), c || (m = null);
              break e;
            }
          r = y.next;
        }
      } else if (s.tag === 18) {
        if (m = s.return, m === null) throw Error(g(341));
        m.lanes |= u, r = m.alternate, r !== null && (r.lanes |= u), rr(m, u, l), m = null;
      } else m = s.child;
      if (m !== null) m.return = s;
      else
        for (m = s; m !== null; ) {
          if (m === l) {
            m = null;
            break;
          }
          if (s = m.sibling, s !== null) {
            s.return = m.return, m = s;
            break;
          }
          m = m.return;
        }
      s = m;
    }
  }
  function lo(l, n, u, c) {
    l = null;
    for (var s = n, r = !1; s !== null; ) {
      if (!r) {
        if ((s.flags & 524288) !== 0) r = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var m = s.alternate;
        if (m === null) throw Error(g(387));
        if (m = m.memoizedProps, m !== null) {
          var y = s.type;
          hl(s.pendingProps.value, m.value) || (l !== null ? l.push(y) : l = [y]);
        }
      } else if (s === fn.current) {
        if (m = s.alternate, m === null) throw Error(g(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState && (l !== null ? l.push(aa) : l = [aa]);
      }
      s = s.return;
    }
    l !== null && Jh(
      n,
      l,
      u,
      c
    ), n.flags |= 262144;
  }
  function Df(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!hl(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Pu(l) {
    du = l, Ia = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function al(l) {
    return Kh(du, l);
  }
  function Of(l, n) {
    return du === null && Pu(l), Kh(l, n);
  }
  function Kh(l, n) {
    var u = n._currentValue;
    if (n = { context: n, memoizedValue: u, next: null }, Ia === null) {
      if (l === null) throw Error(g(308));
      Ia = n, l.dependencies = { lanes: 0, firstContext: n }, l.flags |= 524288;
    } else Ia = Ia.next = n;
    return u;
  }
  var ao = typeof AbortController < "u" ? AbortController : function() {
    var l = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(u, c) {
        l.push(c);
      }
    };
    this.abort = function() {
      n.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, dr = R.unstable_scheduleCallback, jp = R.unstable_NormalPriority, kt = {
    $$typeof: ft,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function no() {
    return {
      controller: new ao(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Tn(l) {
    l.refCount--, l.refCount === 0 && dr(jp, function() {
      l.controller.abort();
    });
  }
  var ei = null, Mf = 0, Ua = 0, $t = null;
  function hr(l, n) {
    if (ei === null) {
      var u = ei = [];
      Mf = 0, Ua = gc(), $t = {
        status: "pending",
        value: void 0,
        then: function(c) {
          u.push(c);
        }
      };
    }
    return Mf++, n.then(mr, mr), n;
  }
  function mr() {
    if (--Mf === 0 && ei !== null) {
      $t !== null && ($t.status = "fulfilled");
      var l = ei;
      ei = null, Ua = 0, $t = null;
      for (var n = 0; n < l.length; n++) (0, l[n])();
    }
  }
  function _p(l, n) {
    var u = [], c = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        u.push(s);
      }
    };
    return l.then(
      function() {
        c.status = "fulfilled", c.value = n;
        for (var s = 0; s < u.length; s++) (0, u[s])(n);
      },
      function(s) {
        for (c.status = "rejected", c.reason = s, s = 0; s < u.length; s++)
          (0, u[s])(void 0);
      }
    ), c;
  }
  var yr = z.S;
  z.S = function(l, n) {
    typeof n == "object" && n !== null && typeof n.then == "function" && hr(l, n), yr !== null && yr(l, n);
  };
  var En = le(null);
  function Uf() {
    var l = En.current;
    return l !== null ? l : ht.pooledCache;
  }
  function Fi(l, n) {
    n === null ? he(En, En.current) : he(En, n.pool);
  }
  function pr() {
    var l = Uf();
    return l === null ? null : { parent: kt._currentValue, pool: l };
  }
  var ti = Error(g(460)), vr = Error(g(474)), Cf = Error(g(542)), gr = { then: function() {
  } };
  function br(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Hf() {
  }
  function kh(l, n, u) {
    switch (u = l[u], u === void 0 ? l.push(n) : u !== n && (n.then(Hf, Hf), n = u), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw l = n.reason, Wh(l), l;
      default:
        if (typeof n.status == "string") n.then(Hf, Hf);
        else {
          if (l = ht, l !== null && 100 < l.shellSuspendCounter)
            throw Error(g(482));
          l = n, l.status = "pending", l.then(
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "fulfilled", s.value = c;
              }
            },
            function(c) {
              if (n.status === "pending") {
                var s = n;
                s.status = "rejected", s.reason = c;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw l = n.reason, Wh(l), l;
        }
        throw Ii = n, ti;
    }
  }
  var Ii = null;
  function $h() {
    if (Ii === null) throw Error(g(459));
    var l = Ii;
    return Ii = null, l;
  }
  function Wh(l) {
    if (l === ti || l === Cf)
      throw Error(g(483));
  }
  var xn = !1;
  function Sr(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Tr(l, n) {
    l = l.updateQueue, n.updateQueue === l && (n.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function kl(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function An(l, n, u) {
    var c = l.updateQueue;
    if (c === null) return null;
    if (c = c.shared, (nt & 2) !== 0) {
      var s = c.pending;
      return s === null ? n.next = n : (n.next = s.next, s.next = n), c.pending = n, n = Ef(l), $c(l, null, u), n;
    }
    return Wu(l, c, n, u), Ef(l);
  }
  function Pi(l, n, u) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (u & 4194048) !== 0)) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, af(l, u);
    }
  }
  function Fh(l, n) {
    var u = l.updateQueue, c = l.alternate;
    if (c !== null && (c = c.updateQueue, u === c)) {
      var s = null, r = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var m = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          r === null ? s = r = m : r = r.next = m, u = u.next;
        } while (u !== null);
        r === null ? s = r = n : r = r.next = n;
      } else s = r = n;
      u = {
        baseState: c.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: r,
        shared: c.shared,
        callbacks: c.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = n : l.next = n, u.lastBaseUpdate = n;
  }
  var Ih = !1;
  function uo() {
    if (Ih) {
      var l = $t;
      if (l !== null) throw l;
    }
  }
  function mu(l, n, u, c) {
    Ih = !1;
    var s = l.updateQueue;
    xn = !1;
    var r = s.firstBaseUpdate, m = s.lastBaseUpdate, y = s.shared.pending;
    if (y !== null) {
      s.shared.pending = null;
      var b = y, M = b.next;
      b.next = null, m === null ? r = M : m.next = M, m = b;
      var G = l.alternate;
      G !== null && (G = G.updateQueue, y = G.lastBaseUpdate, y !== m && (y === null ? G.firstBaseUpdate = M : y.next = M, G.lastBaseUpdate = b));
    }
    if (r !== null) {
      var X = s.baseState;
      m = 0, G = M = b = null, y = r;
      do {
        var C = y.lane & -536870913, N = C !== y.lane;
        if (N ? (we & C) === C : (c & C) === C) {
          C !== 0 && C === Ua && (Ih = !0), G !== null && (G = G.next = {
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: null,
            next: null
          });
          e: {
            var se = l, re = y;
            C = n;
            var tt = u;
            switch (re.tag) {
              case 1:
                if (se = re.payload, typeof se == "function") {
                  X = se.call(tt, X, C);
                  break e;
                }
                X = se;
                break e;
              case 3:
                se.flags = se.flags & -65537 | 128;
              case 0:
                if (se = re.payload, C = typeof se == "function" ? se.call(tt, X, C) : se, C == null) break e;
                X = be({}, X, C);
                break e;
              case 2:
                xn = !0;
            }
          }
          C = y.callback, C !== null && (l.flags |= 64, N && (l.flags |= 8192), N = s.callbacks, N === null ? s.callbacks = [C] : N.push(C));
        } else
          N = {
            lane: C,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          }, G === null ? (M = G = N, b = X) : G = G.next = N, m |= C;
        if (y = y.next, y === null) {
          if (y = s.shared.pending, y === null)
            break;
          N = y, y = N.next, N.next = null, s.lastBaseUpdate = N, s.shared.pending = null;
        }
      } while (!0);
      G === null && (b = X), s.baseState = b, s.firstBaseUpdate = M, s.lastBaseUpdate = G, r === null && (s.shared.lanes = 0), Tu |= m, l.lanes = m, l.memoizedState = X;
    }
  }
  function Er(l, n) {
    if (typeof l != "function")
      throw Error(g(191, l));
    l.call(n);
  }
  function Nf(l, n) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        Er(u[l], n);
  }
  var ec = le(null), jf = le(0);
  function nl(l, n) {
    l = Su, he(jf, l), he(ec, n), Su = l | n.baseLanes;
  }
  function io() {
    he(jf, Su), he(ec, ec.current);
  }
  function co() {
    Su = jf.current, F(ec), F(jf);
  }
  var Ca = 0, xe = null, at = null, Dt = null, _f = !1, sa = !1, li = !1, Pa = 0, ra = 0, yu = null, Ph = 0;
  function Ot() {
    throw Error(g(321));
  }
  function xr(l, n) {
    if (n === null) return !1;
    for (var u = 0; u < n.length && u < l.length; u++)
      if (!hl(l[u], n[u])) return !1;
    return !0;
  }
  function Ar(l, n, u, c, s, r) {
    return Ca = r, xe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, z.H = l === null || l.memoizedState === null ? mm : ym, li = !1, r = u(c, s), li = !1, sa && (r = em(
      n,
      u,
      c,
      s
    )), ai(l), r;
  }
  function ai(l) {
    z.H = Vr;
    var n = at !== null && at.next !== null;
    if (Ca = 0, Dt = at = xe = null, _f = !1, ra = 0, yu = null, n) throw Error(g(300));
    l === null || Wt || (l = l.dependencies, l !== null && Df(l) && (Wt = !0));
  }
  function em(l, n, u, c) {
    xe = l;
    var s = 0;
    do {
      if (sa && (yu = null), ra = 0, sa = !1, 25 <= s) throw Error(g(301));
      if (s += 1, Dt = at = null, l.updateQueue != null) {
        var r = l.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      z.H = pu, r = n(u, c);
    } while (sa);
    return r;
  }
  function Bp() {
    var l = z.H, n = l.useState()[0];
    return n = typeof n.then == "function" ? qf(n) : n, l = l.useState()[0], (at !== null ? at.memoizedState : null) !== l && (xe.flags |= 1024), n;
  }
  function Rr() {
    var l = Pa !== 0;
    return Pa = 0, l;
  }
  function oo(l, n, u) {
    n.updateQueue = l.updateQueue, n.flags &= -2053, l.lanes &= ~u;
  }
  function zr(l) {
    if (_f) {
      for (l = l.memoizedState; l !== null; ) {
        var n = l.queue;
        n !== null && (n.pending = null), l = l.next;
      }
      _f = !1;
    }
    Ca = 0, Dt = at = xe = null, sa = !1, ra = Pa = 0, yu = null;
  }
  function Al() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Dt === null ? xe.memoizedState = Dt = l : Dt = Dt.next = l, Dt;
  }
  function Ct() {
    if (at === null) {
      var l = xe.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = at.next;
    var n = Dt === null ? xe.memoizedState : Dt.next;
    if (n !== null)
      Dt = n, at = l;
    else {
      if (l === null)
        throw xe.alternate === null ? Error(g(467)) : Error(g(310));
      at = l, l = {
        memoizedState: at.memoizedState,
        baseState: at.baseState,
        baseQueue: at.baseQueue,
        queue: at.queue,
        next: null
      }, Dt === null ? xe.memoizedState = Dt = l : Dt = Dt.next = l;
    }
    return Dt;
  }
  function Bf() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function qf(l) {
    var n = ra;
    return ra += 1, yu === null && (yu = []), l = kh(yu, l, n), n = xe, (Dt === null ? n.memoizedState : Dt.next) === null && (n = n.alternate, z.H = n === null || n.memoizedState === null ? mm : ym), l;
  }
  function Gt(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return qf(l);
      if (l.$$typeof === ft) return al(l);
    }
    throw Error(g(438, String(l)));
  }
  function Dr(l) {
    var n = null, u = xe.updateQueue;
    if (u !== null && (n = u.memoCache), n == null) {
      var c = xe.alternate;
      c !== null && (c = c.updateQueue, c !== null && (c = c.memoCache, c != null && (n = {
        data: c.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), u === null && (u = Bf(), xe.updateQueue = u), u.memoCache = n, u = n.data[n.index], u === void 0)
      for (u = n.data[n.index] = Array(l), c = 0; c < l; c++)
        u[c] = yt;
    return n.index++, u;
  }
  function Rn(l, n) {
    return typeof n == "function" ? n(l) : n;
  }
  function Yf(l) {
    var n = Ct();
    return Or(n, at, l);
  }
  function Or(l, n, u) {
    var c = l.queue;
    if (c === null) throw Error(g(311));
    c.lastRenderedReducer = u;
    var s = l.baseQueue, r = c.pending;
    if (r !== null) {
      if (s !== null) {
        var m = s.next;
        s.next = r.next, r.next = m;
      }
      n.baseQueue = s = r, c.pending = null;
    }
    if (r = l.baseState, s === null) l.memoizedState = r;
    else {
      n = s.next;
      var y = m = null, b = null, M = n, G = !1;
      do {
        var X = M.lane & -536870913;
        if (X !== M.lane ? (we & X) === X : (Ca & X) === X) {
          var C = M.revertLane;
          if (C === 0)
            b !== null && (b = b.next = {
              lane: 0,
              revertLane: 0,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }), X === Ua && (G = !0);
          else if ((Ca & C) === C) {
            M = M.next, C === Ua && (G = !0);
            continue;
          } else
            X = {
              lane: 0,
              revertLane: M.revertLane,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }, b === null ? (y = b = X, m = r) : b = b.next = X, xe.lanes |= C, Tu |= C;
          X = M.action, li && u(r, X), r = M.hasEagerState ? M.eagerState : u(r, X);
        } else
          C = {
            lane: X,
            revertLane: M.revertLane,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null
          }, b === null ? (y = b = C, m = r) : b = b.next = C, xe.lanes |= X, Tu |= X;
        M = M.next;
      } while (M !== null && M !== n);
      if (b === null ? m = r : b.next = y, !hl(r, l.memoizedState) && (Wt = !0, G && (u = $t, u !== null)))
        throw u;
      l.memoizedState = r, l.baseState = m, l.baseQueue = b, c.lastRenderedState = r;
    }
    return s === null && (c.lanes = 0), [l.memoizedState, c.dispatch];
  }
  function Mr(l) {
    var n = Ct(), u = n.queue;
    if (u === null) throw Error(g(311));
    u.lastRenderedReducer = l;
    var c = u.dispatch, s = u.pending, r = n.memoizedState;
    if (s !== null) {
      u.pending = null;
      var m = s = s.next;
      do
        r = l(r, m.action), m = m.next;
      while (m !== s);
      hl(r, n.memoizedState) || (Wt = !0), n.memoizedState = r, n.baseQueue === null && (n.baseState = r), u.lastRenderedState = r;
    }
    return [r, c];
  }
  function wf(l, n, u) {
    var c = xe, s = Ct(), r = Fe;
    if (r) {
      if (u === void 0) throw Error(g(407));
      u = u();
    } else u = n();
    var m = !hl(
      (at || s).memoizedState,
      u
    );
    m && (s.memoizedState = u, Wt = !0), s = s.queue;
    var y = lm.bind(null, c, s, l);
    if (st(2048, 8, y, [l]), s.getSnapshot !== n || m || Dt !== null && Dt.memoizedState.tag & 1) {
      if (c.flags |= 2048, $l(
        9,
        Xf(),
        tm.bind(
          null,
          c,
          s,
          u,
          n
        ),
        null
      ), ht === null) throw Error(g(349));
      r || (Ca & 124) !== 0 || Ur(c, n, u);
    }
    return u;
  }
  function Ur(l, n, u) {
    l.flags |= 16384, l = { getSnapshot: n, value: u }, n = xe.updateQueue, n === null ? (n = Bf(), xe.updateQueue = n, n.stores = [l]) : (u = n.stores, u === null ? n.stores = [l] : u.push(l));
  }
  function tm(l, n, u, c) {
    n.value = u, n.getSnapshot = c, am(n) && Cr(l);
  }
  function lm(l, n, u) {
    return u(function() {
      am(n) && Cr(l);
    });
  }
  function am(l) {
    var n = l.getSnapshot;
    l = l.value;
    try {
      var u = n();
      return !hl(l, u);
    } catch {
      return !0;
    }
  }
  function Cr(l) {
    var n = gn(l, 2);
    n !== null && ma(n, l, 2);
  }
  function Gf(l) {
    var n = Al();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), li) {
        tu(!0);
        try {
          u();
        } finally {
          tu(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = l, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Rn,
      lastRenderedState: l
    }, n;
  }
  function Hr(l, n, u, c) {
    return l.baseState = u, Or(
      l,
      at,
      typeof c == "function" ? c : Rn
    );
  }
  function qp(l, n, u, c, s) {
    if (nc(l)) throw Error(g(485));
    if (l = n.action, l !== null) {
      var r = {
        payload: s,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          r.listeners.push(m);
        }
      };
      z.T !== null ? u(!0) : r.isTransition = !1, c(r), u = n.pending, u === null ? (r.next = n.pending = r, Nr(n, r)) : (r.next = u.next, n.pending = u.next = r);
    }
  }
  function Nr(l, n) {
    var u = n.action, c = n.payload, s = l.state;
    if (n.isTransition) {
      var r = z.T, m = {};
      z.T = m;
      try {
        var y = u(s, c), b = z.S;
        b !== null && b(m, y), Vf(l, n, y);
      } catch (M) {
        _r(l, n, M);
      } finally {
        z.T = r;
      }
    } else
      try {
        r = u(s, c), Vf(l, n, r);
      } catch (M) {
        _r(l, n, M);
      }
  }
  function Vf(l, n, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(c) {
        jr(l, n, c);
      },
      function(c) {
        return _r(l, n, c);
      }
    ) : jr(l, n, u);
  }
  function jr(l, n, u) {
    n.status = "fulfilled", n.value = u, nm(n), l.state = u, n = l.pending, n !== null && (u = n.next, u === n ? l.pending = null : (u = u.next, n.next = u, Nr(l, u)));
  }
  function _r(l, n, u) {
    var c = l.pending;
    if (l.pending = null, c !== null) {
      c = c.next;
      do
        n.status = "rejected", n.reason = u, nm(n), n = n.next;
      while (n !== c);
    }
    l.action = null;
  }
  function nm(l) {
    l = l.listeners;
    for (var n = 0; n < l.length; n++) (0, l[n])();
  }
  function Br(l, n) {
    return n;
  }
  function um(l, n) {
    if (Fe) {
      var u = ht.formState;
      if (u !== null) {
        e: {
          var c = xe;
          if (Fe) {
            if (Pe) {
              t: {
                for (var s = Pe, r = Ma; s.nodeType !== 8; ) {
                  if (!r) {
                    s = null;
                    break t;
                  }
                  if (s = an(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                r = s.data, s = r === "F!" || r === "F" ? s : null;
              }
              if (s) {
                Pe = an(
                  s.nextSibling
                ), c = s.data === "F!";
                break e;
              }
            }
            ru(c);
          }
          c = !1;
        }
        c && (n = u[0]);
      }
    }
    return u = Al(), u.memoizedState = u.baseState = n, c = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Br,
      lastRenderedState: n
    }, u.queue = c, u = dm.bind(
      null,
      xe,
      c
    ), c.dispatch = u, c = Gf(!1), r = Zf.bind(
      null,
      xe,
      !1,
      c.queue
    ), c = Al(), s = {
      state: n,
      dispatch: null,
      action: l,
      pending: null
    }, c.queue = s, u = qp.bind(
      null,
      xe,
      s,
      r,
      u
    ), s.dispatch = u, c.memoizedState = l, [n, u, !1];
  }
  function zn(l) {
    var n = Ct();
    return qr(n, at, l);
  }
  function qr(l, n, u) {
    if (n = Or(
      l,
      n,
      Br
    )[0], l = Yf(Rn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var c = qf(n);
      } catch (m) {
        throw m === ti ? Cf : m;
      }
    else c = n;
    n = Ct();
    var s = n.queue, r = s.dispatch;
    return u !== n.memoizedState && (xe.flags |= 2048, $l(
      9,
      Xf(),
      gv.bind(null, s, u),
      null
    )), [c, r, l];
  }
  function gv(l, n) {
    l.action = n;
  }
  function Yr(l) {
    var n = Ct(), u = at;
    if (u !== null)
      return qr(n, u, l);
    Ct(), n = n.memoizedState, u = Ct();
    var c = u.queue.dispatch;
    return u.memoizedState = l, [n, c, !1];
  }
  function $l(l, n, u, c) {
    return l = { tag: l, create: u, deps: c, inst: n, next: null }, n = xe.updateQueue, n === null && (n = Bf(), xe.updateQueue = n), u = n.lastEffect, u === null ? n.lastEffect = l.next = l : (c = u.next, u.next = l, l.next = c, n.lastEffect = l), l;
  }
  function Xf() {
    return { destroy: void 0, resource: void 0 };
  }
  function Qf() {
    return Ct().memoizedState;
  }
  function ni(l, n, u, c) {
    var s = Al();
    c = c === void 0 ? null : c, xe.flags |= l, s.memoizedState = $l(
      1 | n,
      Xf(),
      u,
      c
    );
  }
  function st(l, n, u, c) {
    var s = Ct();
    c = c === void 0 ? null : c;
    var r = s.memoizedState.inst;
    at !== null && c !== null && xr(c, at.memoizedState.deps) ? s.memoizedState = $l(n, r, u, c) : (xe.flags |= l, s.memoizedState = $l(
      1 | n,
      r,
      u,
      c
    ));
  }
  function Yp(l, n) {
    ni(8390656, 8, l, n);
  }
  function wp(l, n) {
    st(2048, 8, l, n);
  }
  function im(l, n) {
    return st(4, 2, l, n);
  }
  function en(l, n) {
    return st(4, 4, l, n);
  }
  function cm(l, n) {
    if (typeof n == "function") {
      l = l();
      var u = n(l);
      return function() {
        typeof u == "function" ? u() : n(null);
      };
    }
    if (n != null)
      return l = l(), n.current = l, function() {
        n.current = null;
      };
  }
  function wr(l, n, u) {
    u = u != null ? u.concat([l]) : null, st(4, 4, cm.bind(null, n, l), u);
  }
  function tc() {
  }
  function lc(l, n) {
    var u = Ct();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    return n !== null && xr(n, c[1]) ? c[0] : (u.memoizedState = [l, n], l);
  }
  function om(l, n) {
    var u = Ct();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    if (n !== null && xr(n, c[1]))
      return c[0];
    if (c = l(), li) {
      tu(!0);
      try {
        l();
      } finally {
        tu(!1);
      }
    }
    return u.memoizedState = [c, n], c;
  }
  function Lf(l, n, u) {
    return u === void 0 || (Ca & 1073741824) !== 0 ? l.memoizedState = n : (l.memoizedState = u, l = Lm(), xe.lanes |= l, Tu |= l, u);
  }
  function fm(l, n, u, c) {
    return hl(u, n) ? u : ec.current !== null ? (l = Lf(l, u, c), hl(l, n) || (Wt = !0), l) : (Ca & 42) === 0 ? (Wt = !0, l.memoizedState = u) : (l = Lm(), xe.lanes |= l, Tu |= l, n);
  }
  function Gp(l, n, u, c, s) {
    var r = Q.p;
    Q.p = r !== 0 && 8 > r ? r : 8;
    var m = z.T, y = {};
    z.T = y, Zf(l, !1, n, u);
    try {
      var b = s(), M = z.S;
      if (M !== null && M(y, b), b !== null && typeof b == "object" && typeof b.then == "function") {
        var G = _p(
          b,
          c
        );
        ac(
          l,
          n,
          G,
          ha(l)
        );
      } else
        ac(
          l,
          n,
          c,
          ha(l)
        );
    } catch (X) {
      ac(
        l,
        n,
        { then: function() {
        }, status: "rejected", reason: X },
        ha()
      );
    } finally {
      Q.p = r, z.T = m;
    }
  }
  function bv() {
  }
  function Gr(l, n, u, c) {
    if (l.tag !== 5) throw Error(g(476));
    var s = Vp(l).queue;
    Gp(
      l,
      s,
      n,
      $,
      u === null ? bv : function() {
        return fo(l), u(c);
      }
    );
  }
  function Vp(l) {
    var n = l.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Rn,
        lastRenderedState: $
      },
      next: null
    };
    var u = {};
    return n.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Rn,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = n, l = l.alternate, l !== null && (l.memoizedState = n), n;
  }
  function fo(l) {
    var n = Vp(l).next.queue;
    ac(l, n, {}, ha());
  }
  function Ha() {
    return al(aa);
  }
  function sm() {
    return Ct().memoizedState;
  }
  function Xp() {
    return Ct().memoizedState;
  }
  function Qp(l) {
    for (var n = l.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var u = ha();
          l = kl(u);
          var c = An(n, l, u);
          c !== null && (ma(c, n, u), Pi(c, n, u)), n = { cache: no() }, l.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function rm(l, n, u) {
    var c = ha();
    u = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, nc(l) ? Lp(n, u) : (u = kc(l, n, u, c), u !== null && (ma(u, l, c), hm(u, n, c)));
  }
  function dm(l, n, u) {
    var c = ha();
    ac(l, n, u, c);
  }
  function ac(l, n, u, c) {
    var s = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (nc(l)) Lp(n, s);
    else {
      var r = l.alternate;
      if (l.lanes === 0 && (r === null || r.lanes === 0) && (r = n.lastRenderedReducer, r !== null))
        try {
          var m = n.lastRenderedState, y = r(m, u);
          if (s.hasEagerState = !0, s.eagerState = y, hl(y, m))
            return Wu(l, n, s, 0), ht === null && $a(), !1;
        } catch {
        } finally {
        }
      if (u = kc(l, n, s, c), u !== null)
        return ma(u, l, c), hm(u, n, c), !0;
    }
    return !1;
  }
  function Zf(l, n, u, c) {
    if (c = {
      lane: 2,
      revertLane: gc(),
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, nc(l)) {
      if (n) throw Error(g(479));
    } else
      n = kc(
        l,
        u,
        c,
        2
      ), n !== null && ma(n, l, 2);
  }
  function nc(l) {
    var n = l.alternate;
    return l === xe || n !== null && n === xe;
  }
  function Lp(l, n) {
    sa = _f = !0;
    var u = l.pending;
    u === null ? n.next = n : (n.next = u.next, u.next = n), l.pending = n;
  }
  function hm(l, n, u) {
    if ((u & 4194048) !== 0) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, af(l, u);
    }
  }
  var Vr = {
    readContext: al,
    use: Gt,
    useCallback: Ot,
    useContext: Ot,
    useEffect: Ot,
    useImperativeHandle: Ot,
    useLayoutEffect: Ot,
    useInsertionEffect: Ot,
    useMemo: Ot,
    useReducer: Ot,
    useRef: Ot,
    useState: Ot,
    useDebugValue: Ot,
    useDeferredValue: Ot,
    useTransition: Ot,
    useSyncExternalStore: Ot,
    useId: Ot,
    useHostTransitionStatus: Ot,
    useFormState: Ot,
    useActionState: Ot,
    useOptimistic: Ot,
    useMemoCache: Ot,
    useCacheRefresh: Ot
  }, mm = {
    readContext: al,
    use: Gt,
    useCallback: function(l, n) {
      return Al().memoizedState = [
        l,
        n === void 0 ? null : n
      ], l;
    },
    useContext: al,
    useEffect: Yp,
    useImperativeHandle: function(l, n, u) {
      u = u != null ? u.concat([l]) : null, ni(
        4194308,
        4,
        cm.bind(null, n, l),
        u
      );
    },
    useLayoutEffect: function(l, n) {
      return ni(4194308, 4, l, n);
    },
    useInsertionEffect: function(l, n) {
      ni(4, 2, l, n);
    },
    useMemo: function(l, n) {
      var u = Al();
      n = n === void 0 ? null : n;
      var c = l();
      if (li) {
        tu(!0);
        try {
          l();
        } finally {
          tu(!1);
        }
      }
      return u.memoizedState = [c, n], c;
    },
    useReducer: function(l, n, u) {
      var c = Al();
      if (u !== void 0) {
        var s = u(n);
        if (li) {
          tu(!0);
          try {
            u(n);
          } finally {
            tu(!1);
          }
        }
      } else s = n;
      return c.memoizedState = c.baseState = s, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: s
      }, c.queue = l, l = l.dispatch = rm.bind(
        null,
        xe,
        l
      ), [c.memoizedState, l];
    },
    useRef: function(l) {
      var n = Al();
      return l = { current: l }, n.memoizedState = l;
    },
    useState: function(l) {
      l = Gf(l);
      var n = l.queue, u = dm.bind(null, xe, n);
      return n.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: tc,
    useDeferredValue: function(l, n) {
      var u = Al();
      return Lf(u, l, n);
    },
    useTransition: function() {
      var l = Gf(!1);
      return l = Gp.bind(
        null,
        xe,
        l.queue,
        !0,
        !1
      ), Al().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, n, u) {
      var c = xe, s = Al();
      if (Fe) {
        if (u === void 0)
          throw Error(g(407));
        u = u();
      } else {
        if (u = n(), ht === null)
          throw Error(g(349));
        (we & 124) !== 0 || Ur(c, n, u);
      }
      s.memoizedState = u;
      var r = { value: u, getSnapshot: n };
      return s.queue = r, Yp(lm.bind(null, c, r, l), [
        l
      ]), c.flags |= 2048, $l(
        9,
        Xf(),
        tm.bind(
          null,
          c,
          r,
          u,
          n
        ),
        null
      ), u;
    },
    useId: function() {
      var l = Al(), n = ht.identifierPrefix;
      if (Fe) {
        var u = Ut, c = Fa;
        u = (c & ~(1 << 32 - Ql(c) - 1)).toString(32) + u, n = "«" + n + "R" + u, u = Pa++, 0 < u && (n += "H" + u.toString(32)), n += "»";
      } else
        u = Ph++, n = "«" + n + "r" + u.toString(32) + "»";
      return l.memoizedState = n;
    },
    useHostTransitionStatus: Ha,
    useFormState: um,
    useActionState: um,
    useOptimistic: function(l) {
      var n = Al();
      n.memoizedState = n.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = u, n = Zf.bind(
        null,
        xe,
        !0,
        u
      ), u.dispatch = n, [l, n];
    },
    useMemoCache: Dr,
    useCacheRefresh: function() {
      return Al().memoizedState = Qp.bind(
        null,
        xe
      );
    }
  }, ym = {
    readContext: al,
    use: Gt,
    useCallback: lc,
    useContext: al,
    useEffect: wp,
    useImperativeHandle: wr,
    useInsertionEffect: im,
    useLayoutEffect: en,
    useMemo: om,
    useReducer: Yf,
    useRef: Qf,
    useState: function() {
      return Yf(Rn);
    },
    useDebugValue: tc,
    useDeferredValue: function(l, n) {
      var u = Ct();
      return fm(
        u,
        at.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Yf(Rn)[0], n = Ct().memoizedState;
      return [
        typeof l == "boolean" ? l : qf(l),
        n
      ];
    },
    useSyncExternalStore: wf,
    useId: sm,
    useHostTransitionStatus: Ha,
    useFormState: zn,
    useActionState: zn,
    useOptimistic: function(l, n) {
      var u = Ct();
      return Hr(u, at, l, n);
    },
    useMemoCache: Dr,
    useCacheRefresh: Xp
  }, pu = {
    readContext: al,
    use: Gt,
    useCallback: lc,
    useContext: al,
    useEffect: wp,
    useImperativeHandle: wr,
    useInsertionEffect: im,
    useLayoutEffect: en,
    useMemo: om,
    useReducer: Mr,
    useRef: Qf,
    useState: function() {
      return Mr(Rn);
    },
    useDebugValue: tc,
    useDeferredValue: function(l, n) {
      var u = Ct();
      return at === null ? Lf(u, l, n) : fm(
        u,
        at.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Mr(Rn)[0], n = Ct().memoizedState;
      return [
        typeof l == "boolean" ? l : qf(l),
        n
      ];
    },
    useSyncExternalStore: wf,
    useId: sm,
    useHostTransitionStatus: Ha,
    useFormState: Yr,
    useActionState: Yr,
    useOptimistic: function(l, n) {
      var u = Ct();
      return at !== null ? Hr(u, at, l, n) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Dr,
    useCacheRefresh: Xp
  }, uc = null, so = 0;
  function Xr(l) {
    var n = so;
    return so += 1, uc === null && (uc = []), kh(uc, l, n);
  }
  function ic(l, n) {
    n = n.props.ref, l.ref = n !== void 0 ? n : null;
  }
  function Rl(l, n) {
    throw n.$$typeof === P ? Error(g(525)) : (l = Object.prototype.toString.call(n), Error(
      g(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l
      )
    ));
  }
  function pm(l) {
    var n = l._init;
    return n(l._payload);
  }
  function Wl(l) {
    function n(D, A) {
      if (l) {
        var O = D.deletions;
        O === null ? (D.deletions = [A], D.flags |= 16) : O.push(A);
      }
    }
    function u(D, A) {
      if (!l) return null;
      for (; A !== null; )
        n(D, A), A = A.sibling;
      return null;
    }
    function c(D) {
      for (var A = /* @__PURE__ */ new Map(); D !== null; )
        D.key !== null ? A.set(D.key, D) : A.set(D.index, D), D = D.sibling;
      return A;
    }
    function s(D, A) {
      return D = Wa(D, A), D.index = 0, D.sibling = null, D;
    }
    function r(D, A, O) {
      return D.index = O, l ? (O = D.alternate, O !== null ? (O = O.index, O < A ? (D.flags |= 67108866, A) : O) : (D.flags |= 67108866, A)) : (D.flags |= 1048576, A);
    }
    function m(D) {
      return l && D.alternate === null && (D.flags |= 67108866), D;
    }
    function y(D, A, O, V) {
      return A === null || A.tag !== 6 ? (A = Fc(O, D.mode, V), A.return = D, A) : (A = s(A, O), A.return = D, A);
    }
    function b(D, A, O, V) {
      var te = O.type;
      return te === Se ? G(
        D,
        A,
        O.props.children,
        V,
        O.key
      ) : A !== null && (A.elementType === te || typeof te == "object" && te !== null && te.$$typeof === Yt && pm(te) === A.type) ? (A = s(A, O.props), ic(A, O), A.return = D, A) : (A = K(
        O.type,
        O.key,
        O.props,
        null,
        D.mode,
        V
      ), ic(A, O), A.return = D, A);
    }
    function M(D, A, O, V) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== O.containerInfo || A.stateNode.implementation !== O.implementation ? (A = zt(O, D.mode, V), A.return = D, A) : (A = s(A, O.children || []), A.return = D, A);
    }
    function G(D, A, O, V, te) {
      return A === null || A.tag !== 7 ? (A = za(
        O,
        D.mode,
        V,
        te
      ), A.return = D, A) : (A = s(A, O), A.return = D, A);
    }
    function X(D, A, O) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = Fc(
          "" + A,
          D.mode,
          O
        ), A.return = D, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case ee:
            return O = K(
              A.type,
              A.key,
              A.props,
              null,
              D.mode,
              O
            ), ic(O, A), O.return = D, O;
          case de:
            return A = zt(
              A,
              D.mode,
              O
            ), A.return = D, A;
          case Yt:
            var V = A._init;
            return A = V(A._payload), X(D, A, O);
        }
        if (St(A) || pe(A))
          return A = za(
            A,
            D.mode,
            O,
            null
          ), A.return = D, A;
        if (typeof A.then == "function")
          return X(D, Xr(A), O);
        if (A.$$typeof === ft)
          return X(
            D,
            Of(D, A),
            O
          );
        Rl(D, A);
      }
      return null;
    }
    function C(D, A, O, V) {
      var te = A !== null ? A.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return te !== null ? null : y(D, A, "" + O, V);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ee:
            return O.key === te ? b(D, A, O, V) : null;
          case de:
            return O.key === te ? M(D, A, O, V) : null;
          case Yt:
            return te = O._init, O = te(O._payload), C(D, A, O, V);
        }
        if (St(O) || pe(O))
          return te !== null ? null : G(D, A, O, V, null);
        if (typeof O.then == "function")
          return C(
            D,
            A,
            Xr(O),
            V
          );
        if (O.$$typeof === ft)
          return C(
            D,
            A,
            Of(D, O),
            V
          );
        Rl(D, O);
      }
      return null;
    }
    function N(D, A, O, V, te) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return D = D.get(O) || null, y(A, D, "" + V, te);
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case ee:
            return D = D.get(
              V.key === null ? O : V.key
            ) || null, b(A, D, V, te);
          case de:
            return D = D.get(
              V.key === null ? O : V.key
            ) || null, M(A, D, V, te);
          case Yt:
            var Ne = V._init;
            return V = Ne(V._payload), N(
              D,
              A,
              O,
              V,
              te
            );
        }
        if (St(V) || pe(V))
          return D = D.get(O) || null, G(A, D, V, te, null);
        if (typeof V.then == "function")
          return N(
            D,
            A,
            O,
            Xr(V),
            te
          );
        if (V.$$typeof === ft)
          return N(
            D,
            A,
            O,
            Of(A, V),
            te
          );
        Rl(A, V);
      }
      return null;
    }
    function se(D, A, O, V) {
      for (var te = null, Ne = null, oe = A, ye = A = 0, cl = null; oe !== null && ye < O.length; ye++) {
        oe.index > ye ? (cl = oe, oe = null) : cl = oe.sibling;
        var ke = C(
          D,
          oe,
          O[ye],
          V
        );
        if (ke === null) {
          oe === null && (oe = cl);
          break;
        }
        l && oe && ke.alternate === null && n(D, oe), A = r(ke, A, ye), Ne === null ? te = ke : Ne.sibling = ke, Ne = ke, oe = cl;
      }
      if (ye === O.length)
        return u(D, oe), Fe && Le(D, ye), te;
      if (oe === null) {
        for (; ye < O.length; ye++)
          oe = X(D, O[ye], V), oe !== null && (A = r(
            oe,
            A,
            ye
          ), Ne === null ? te = oe : Ne.sibling = oe, Ne = oe);
        return Fe && Le(D, ye), te;
      }
      for (oe = c(oe); ye < O.length; ye++)
        cl = N(
          oe,
          D,
          ye,
          O[ye],
          V
        ), cl !== null && (l && cl.alternate !== null && oe.delete(
          cl.key === null ? ye : cl.key
        ), A = r(
          cl,
          A,
          ye
        ), Ne === null ? te = cl : Ne.sibling = cl, Ne = cl);
      return l && oe.forEach(function(Ei) {
        return n(D, Ei);
      }), Fe && Le(D, ye), te;
    }
    function re(D, A, O, V) {
      if (O == null) throw Error(g(151));
      for (var te = null, Ne = null, oe = A, ye = A = 0, cl = null, ke = O.next(); oe !== null && !ke.done; ye++, ke = O.next()) {
        oe.index > ye ? (cl = oe, oe = null) : cl = oe.sibling;
        var Ei = C(D, oe, ke.value, V);
        if (Ei === null) {
          oe === null && (oe = cl);
          break;
        }
        l && oe && Ei.alternate === null && n(D, oe), A = r(Ei, A, ye), Ne === null ? te = Ei : Ne.sibling = Ei, Ne = Ei, oe = cl;
      }
      if (ke.done)
        return u(D, oe), Fe && Le(D, ye), te;
      if (oe === null) {
        for (; !ke.done; ye++, ke = O.next())
          ke = X(D, ke.value, V), ke !== null && (A = r(ke, A, ye), Ne === null ? te = ke : Ne.sibling = ke, Ne = ke);
        return Fe && Le(D, ye), te;
      }
      for (oe = c(oe); !ke.done; ye++, ke = O.next())
        ke = N(oe, D, ye, ke.value, V), ke !== null && (l && ke.alternate !== null && oe.delete(ke.key === null ? ye : ke.key), A = r(ke, A, ye), Ne === null ? te = ke : Ne.sibling = ke, Ne = ke);
      return l && oe.forEach(function(Cv) {
        return n(D, Cv);
      }), Fe && Le(D, ye), te;
    }
    function tt(D, A, O, V) {
      if (typeof O == "object" && O !== null && O.type === Se && O.key === null && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ee:
            e: {
              for (var te = O.key; A !== null; ) {
                if (A.key === te) {
                  if (te = O.type, te === Se) {
                    if (A.tag === 7) {
                      u(
                        D,
                        A.sibling
                      ), V = s(
                        A,
                        O.props.children
                      ), V.return = D, D = V;
                      break e;
                    }
                  } else if (A.elementType === te || typeof te == "object" && te !== null && te.$$typeof === Yt && pm(te) === A.type) {
                    u(
                      D,
                      A.sibling
                    ), V = s(A, O.props), ic(V, O), V.return = D, D = V;
                    break e;
                  }
                  u(D, A);
                  break;
                } else n(D, A);
                A = A.sibling;
              }
              O.type === Se ? (V = za(
                O.props.children,
                D.mode,
                V,
                O.key
              ), V.return = D, D = V) : (V = K(
                O.type,
                O.key,
                O.props,
                null,
                D.mode,
                V
              ), ic(V, O), V.return = D, D = V);
            }
            return m(D);
          case de:
            e: {
              for (te = O.key; A !== null; ) {
                if (A.key === te)
                  if (A.tag === 4 && A.stateNode.containerInfo === O.containerInfo && A.stateNode.implementation === O.implementation) {
                    u(
                      D,
                      A.sibling
                    ), V = s(A, O.children || []), V.return = D, D = V;
                    break e;
                  } else {
                    u(D, A);
                    break;
                  }
                else n(D, A);
                A = A.sibling;
              }
              V = zt(O, D.mode, V), V.return = D, D = V;
            }
            return m(D);
          case Yt:
            return te = O._init, O = te(O._payload), tt(
              D,
              A,
              O,
              V
            );
        }
        if (St(O))
          return se(
            D,
            A,
            O,
            V
          );
        if (pe(O)) {
          if (te = pe(O), typeof te != "function") throw Error(g(150));
          return O = te.call(O), re(
            D,
            A,
            O,
            V
          );
        }
        if (typeof O.then == "function")
          return tt(
            D,
            A,
            Xr(O),
            V
          );
        if (O.$$typeof === ft)
          return tt(
            D,
            A,
            Of(D, O),
            V
          );
        Rl(D, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint" ? (O = "" + O, A !== null && A.tag === 6 ? (u(D, A.sibling), V = s(A, O), V.return = D, D = V) : (u(D, A), V = Fc(O, D.mode, V), V.return = D, D = V), m(D)) : u(D, A);
    }
    return function(D, A, O, V) {
      try {
        so = 0;
        var te = tt(
          D,
          A,
          O,
          V
        );
        return uc = null, te;
      } catch (oe) {
        if (oe === ti || oe === Cf) throw oe;
        var Ne = Jl(29, oe, null, D.mode);
        return Ne.lanes = V, Ne.return = D, Ne;
      } finally {
      }
    };
  }
  var cc = Wl(!0), Dn = Wl(!1), da = le(null), zl = null;
  function vu(l) {
    var n = l.alternate;
    he(rt, rt.current & 1), he(da, l), zl === null && (n === null || ec.current !== null || n.memoizedState !== null) && (zl = l);
  }
  function On(l) {
    if (l.tag === 22) {
      if (he(rt, rt.current), he(da, l), zl === null) {
        var n = l.alternate;
        n !== null && n.memoizedState !== null && (zl = l);
      }
    } else Mn();
  }
  function Mn() {
    he(rt, rt.current), he(da, da.current);
  }
  function tn(l) {
    F(da), zl === l && (zl = null), F(rt);
  }
  var rt = le(0);
  function Jf(l) {
    for (var n = l; n !== null; ) {
      if (n.tag === 13) {
        var u = n.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || ys(u)))
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === l) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === l) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  function ui(l, n, u, c) {
    n = l.memoizedState, u = u(c, n), u = u == null ? n : be({}, n, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var Qr = {
    enqueueSetState: function(l, n, u) {
      l = l._reactInternals;
      var c = ha(), s = kl(c);
      s.payload = n, u != null && (s.callback = u), n = An(l, s, c), n !== null && (ma(n, l, c), Pi(n, l, c));
    },
    enqueueReplaceState: function(l, n, u) {
      l = l._reactInternals;
      var c = ha(), s = kl(c);
      s.tag = 1, s.payload = n, u != null && (s.callback = u), n = An(l, s, c), n !== null && (ma(n, l, c), Pi(n, l, c));
    },
    enqueueForceUpdate: function(l, n) {
      l = l._reactInternals;
      var u = ha(), c = kl(u);
      c.tag = 2, n != null && (c.callback = n), n = An(l, c, u), n !== null && (ma(n, l, u), Pi(n, l, u));
    }
  };
  function ro(l, n, u, c, s, r, m) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(c, r, m) : n.prototype && n.prototype.isPureReactComponent ? !Ju(u, c) || !Ju(s, r) : !0;
  }
  function oc(l, n, u, c) {
    l = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(u, c), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(u, c), n.state !== l && Qr.enqueueReplaceState(n, n.state, null);
  }
  function ii(l, n) {
    var u = n;
    if ("ref" in n) {
      u = {};
      for (var c in n)
        c !== "ref" && (u[c] = n[c]);
    }
    if (l = l.defaultProps) {
      u === n && (u = be({}, u));
      for (var s in l)
        u[s] === void 0 && (u[s] = l[s]);
    }
    return u;
  }
  var Kf = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  };
  function ho(l) {
    Kf(l);
  }
  function vm(l) {
    console.error(l);
  }
  function kf(l) {
    Kf(l);
  }
  function $f(l, n) {
    try {
      var u = l.onUncaughtError;
      u(n.value, { componentStack: n.stack });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function gm(l, n, u) {
    try {
      var c = l.onCaughtError;
      c(u.value, {
        componentStack: u.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function bm(l, n, u) {
    return u = kl(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      $f(l, n);
    }, u;
  }
  function Sm(l) {
    return l = kl(l), l.tag = 3, l;
  }
  function Fl(l, n, u, c) {
    var s = u.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var r = c.value;
      l.payload = function() {
        return s(r);
      }, l.callback = function() {
        gm(n, u, c);
      };
    }
    var m = u.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (l.callback = function() {
      gm(n, u, c), typeof s != "function" && (si === null ? si = /* @__PURE__ */ new Set([this]) : si.add(this));
      var y = c.stack;
      this.componentDidCatch(c.value, {
        componentStack: y !== null ? y : ""
      });
    });
  }
  function Zp(l, n, u, c, s) {
    if (u.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
      if (n = u.alternate, n !== null && lo(
        n,
        u,
        s,
        !0
      ), u = da.current, u !== null) {
        switch (u.tag) {
          case 13:
            return zl === null ? vc() : u.alternate === null && _t === 0 && (_t = 3), u.flags &= -257, u.flags |= 65536, u.lanes = s, c === gr ? u.flags |= 16384 : (n = u.updateQueue, n === null ? u.updateQueue = /* @__PURE__ */ new Set([c]) : n.add(c), yd(l, c, s)), !1;
          case 22:
            return u.flags |= 65536, c === gr ? u.flags |= 16384 : (n = u.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([c])
            }, u.updateQueue = n) : (u = n.retryQueue, u === null ? n.retryQueue = /* @__PURE__ */ new Set([c]) : u.add(c)), yd(l, c, s)), !1;
        }
        throw Error(g(435, u.tag));
      }
      return yd(l, c, s), vc(), !1;
    }
    if (Fe)
      return n = da.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = s, c !== Wi && (l = Error(g(422), { cause: c }), to(fa(l, u)))) : (c !== Wi && (n = Error(g(423), {
        cause: c
      }), to(
        fa(n, u)
      )), l = l.current.alternate, l.flags |= 65536, s &= -s, l.lanes |= s, c = fa(c, u), s = bm(
        l.stateNode,
        c,
        s
      ), Fh(l, s), _t !== 4 && (_t = 2)), !1;
    var r = Error(g(520), { cause: c });
    if (r = fa(r, u), So === null ? So = [r] : So.push(r), _t !== 4 && (_t = 2), n === null) return !0;
    c = fa(c, u), u = n;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = s & -s, u.lanes |= l, l = bm(u.stateNode, c, l), Fh(u, l), !1;
        case 1:
          if (n = u.type, r = u.stateNode, (u.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (si === null || !si.has(r))))
            return u.flags |= 65536, s &= -s, u.lanes |= s, s = Sm(s), Fl(
              s,
              l,
              u,
              c
            ), Fh(u, s), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var Ht = Error(g(461)), Wt = !1;
  function ul(l, n, u, c) {
    n.child = l === null ? Dn(n, null, u, c) : cc(
      n,
      l.child,
      u,
      c
    );
  }
  function Jp(l, n, u, c, s) {
    u = u.render;
    var r = n.ref;
    if ("ref" in c) {
      var m = {};
      for (var y in c)
        y !== "ref" && (m[y] = c[y]);
    } else m = c;
    return Pu(n), c = Ar(
      l,
      n,
      u,
      m,
      r,
      s
    ), y = Rr(), l !== null && !Wt ? (oo(l, n, s), Un(l, n, s)) : (Fe && y && $i(n), n.flags |= 1, ul(l, n, c, s), n.child);
  }
  function gu(l, n, u, c, s) {
    if (l === null) {
      var r = u.type;
      return typeof r == "function" && !xf(r) && r.defaultProps === void 0 && u.compare === null ? (n.tag = 15, n.type = r, fc(
        l,
        n,
        r,
        c,
        s
      )) : (l = K(
        u.type,
        null,
        c,
        n,
        n.mode,
        s
      ), l.ref = n.ref, l.return = n, n.child = l);
    }
    if (r = l.child, !Pr(l, s)) {
      var m = r.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Ju, u(m, c) && l.ref === n.ref)
        return Un(l, n, s);
    }
    return n.flags |= 1, l = Wa(r, c), l.ref = n.ref, l.return = n, n.child = l;
  }
  function fc(l, n, u, c, s) {
    if (l !== null) {
      var r = l.memoizedProps;
      if (Ju(r, c) && l.ref === n.ref)
        if (Wt = !1, n.pendingProps = c = r, Pr(l, s))
          (l.flags & 131072) !== 0 && (Wt = !0);
        else
          return n.lanes = l.lanes, Un(l, n, s);
    }
    return Zr(
      l,
      n,
      u,
      c,
      s
    );
  }
  function Lr(l, n, u) {
    var c = n.pendingProps, s = c.children, r = l !== null ? l.memoizedState : null;
    if (c.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (c = r !== null ? r.baseLanes | u : u, l !== null) {
          for (s = n.child = l.child, r = 0; s !== null; )
            r = r | s.lanes | s.childLanes, s = s.sibling;
          n.childLanes = r & ~c;
        } else n.childLanes = 0, n.child = null;
        return sc(
          l,
          n,
          c,
          u
        );
      }
      if ((u & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Fi(
          n,
          r !== null ? r.cachePool : null
        ), r !== null ? nl(n, r) : io(), On(n);
      else
        return n.lanes = n.childLanes = 536870912, sc(
          l,
          n,
          r !== null ? r.baseLanes | u : u,
          u
        );
    } else
      r !== null ? (Fi(n, r.cachePool), nl(n, r), Mn(), n.memoizedState = null) : (l !== null && Fi(n, null), io(), Mn());
    return ul(l, n, s, u), n.child;
  }
  function sc(l, n, u, c) {
    var s = Uf();
    return s = s === null ? null : { parent: kt._currentValue, pool: s }, n.memoizedState = {
      baseLanes: u,
      cachePool: s
    }, l !== null && Fi(n, null), io(), On(n), l !== null && lo(l, n, c, !0), null;
  }
  function Wf(l, n) {
    var u = n.ref;
    if (u === null)
      l !== null && l.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(g(284));
      (l === null || l.ref !== u) && (n.flags |= 4194816);
    }
  }
  function Zr(l, n, u, c, s) {
    return Pu(n), u = Ar(
      l,
      n,
      u,
      c,
      void 0,
      s
    ), c = Rr(), l !== null && !Wt ? (oo(l, n, s), Un(l, n, s)) : (Fe && c && $i(n), n.flags |= 1, ul(l, n, u, s), n.child);
  }
  function Tm(l, n, u, c, s, r) {
    return Pu(n), n.updateQueue = null, u = em(
      n,
      c,
      u,
      s
    ), ai(l), c = Rr(), l !== null && !Wt ? (oo(l, n, r), Un(l, n, r)) : (Fe && c && $i(n), n.flags |= 1, ul(l, n, u, r), n.child);
  }
  function Jr(l, n, u, c, s) {
    if (Pu(n), n.stateNode === null) {
      var r = Wc, m = u.contextType;
      typeof m == "object" && m !== null && (r = al(m)), r = new u(c, r), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Qr, n.stateNode = r, r._reactInternals = n, r = n.stateNode, r.props = c, r.state = n.memoizedState, r.refs = {}, Sr(n), m = u.contextType, r.context = typeof m == "object" && m !== null ? al(m) : Wc, r.state = n.memoizedState, m = u.getDerivedStateFromProps, typeof m == "function" && (ui(
        n,
        u,
        m,
        c
      ), r.state = n.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (m = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), m !== r.state && Qr.enqueueReplaceState(r, r.state, null), mu(n, c, r, s), uo(), r.state = n.memoizedState), typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !0;
    } else if (l === null) {
      r = n.stateNode;
      var y = n.memoizedProps, b = ii(u, y);
      r.props = b;
      var M = r.context, G = u.contextType;
      m = Wc, typeof G == "object" && G !== null && (m = al(G));
      var X = u.getDerivedStateFromProps;
      G = typeof X == "function" || typeof r.getSnapshotBeforeUpdate == "function", y = n.pendingProps !== y, G || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (y || M !== m) && oc(
        n,
        r,
        c,
        m
      ), xn = !1;
      var C = n.memoizedState;
      r.state = C, mu(n, c, r, s), uo(), M = n.memoizedState, y || C !== M || xn ? (typeof X == "function" && (ui(
        n,
        u,
        X,
        c
      ), M = n.memoizedState), (b = xn || ro(
        n,
        u,
        b,
        c,
        C,
        M,
        m
      )) ? (G || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = c, n.memoizedState = M), r.props = c, r.state = M, r.context = m, c = b) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), c = !1);
    } else {
      r = n.stateNode, Tr(l, n), m = n.memoizedProps, G = ii(u, m), r.props = G, X = n.pendingProps, C = r.context, M = u.contextType, b = Wc, typeof M == "object" && M !== null && (b = al(M)), y = u.getDerivedStateFromProps, (M = typeof y == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (m !== X || C !== b) && oc(
        n,
        r,
        c,
        b
      ), xn = !1, C = n.memoizedState, r.state = C, mu(n, c, r, s), uo();
      var N = n.memoizedState;
      m !== X || C !== N || xn || l !== null && l.dependencies !== null && Df(l.dependencies) ? (typeof y == "function" && (ui(
        n,
        u,
        y,
        c
      ), N = n.memoizedState), (G = xn || ro(
        n,
        u,
        G,
        c,
        C,
        N,
        b
      ) || l !== null && l.dependencies !== null && Df(l.dependencies)) ? (M || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(c, N, b), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        c,
        N,
        b
      )), typeof r.componentDidUpdate == "function" && (n.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || m === l.memoizedProps && C === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || m === l.memoizedProps && C === l.memoizedState || (n.flags |= 1024), n.memoizedProps = c, n.memoizedState = N), r.props = c, r.state = N, r.context = b, c = G) : (typeof r.componentDidUpdate != "function" || m === l.memoizedProps && C === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || m === l.memoizedProps && C === l.memoizedState || (n.flags |= 1024), c = !1);
    }
    return r = c, Wf(l, n), c = (n.flags & 128) !== 0, r || c ? (r = n.stateNode, u = c && typeof u.getDerivedStateFromError != "function" ? null : r.render(), n.flags |= 1, l !== null && c ? (n.child = cc(
      n,
      l.child,
      null,
      s
    ), n.child = cc(
      n,
      null,
      u,
      s
    )) : ul(l, n, u, s), n.memoizedState = r.state, l = n.child) : l = Un(
      l,
      n,
      s
    ), l;
  }
  function Kr(l, n, u, c) {
    return eo(), n.flags |= 256, ul(l, n, u, c), n.child;
  }
  var kr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Em(l) {
    return { baseLanes: l, cachePool: pr() };
  }
  function xm(l, n, u) {
    return l = l !== null ? l.childLanes & ~u : 0, n && (l |= _a), l;
  }
  function Am(l, n, u) {
    var c = n.pendingProps, s = !1, r = (n.flags & 128) !== 0, m;
    if ((m = r) || (m = l !== null && l.memoizedState === null ? !1 : (rt.current & 2) !== 0), m && (s = !0, n.flags &= -129), m = (n.flags & 32) !== 0, n.flags &= -33, l === null) {
      if (Fe) {
        if (s ? vu(n) : Mn(), Fe) {
          var y = Pe, b;
          if (b = y) {
            e: {
              for (b = y, y = Ma; b.nodeType !== 8; ) {
                if (!y) {
                  y = null;
                  break e;
                }
                if (b = an(
                  b.nextSibling
                ), b === null) {
                  y = null;
                  break e;
                }
              }
              y = b;
            }
            y !== null ? (n.memoizedState = {
              dehydrated: y,
              treeContext: su !== null ? { id: Fa, overflow: Ut } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, b = Jl(
              18,
              null,
              null,
              0
            ), b.stateNode = y, b.return = n, n.child = b, wt = n, Pe = null, b = !0) : b = !1;
          }
          b || ru(n);
        }
        if (y = n.memoizedState, y !== null && (y = y.dehydrated, y !== null))
          return ys(y) ? n.lanes = 32 : n.lanes = 536870912, null;
        tn(n);
      }
      return y = c.children, c = c.fallback, s ? (Mn(), s = n.mode, y = Wr(
        { mode: "hidden", children: y },
        s
      ), c = za(
        c,
        s,
        u,
        null
      ), y.return = n, c.return = n, y.sibling = c, n.child = y, s = n.child, s.memoizedState = Em(u), s.childLanes = xm(
        l,
        m,
        u
      ), n.memoizedState = kr, c) : (vu(n), $r(n, y));
    }
    if (b = l.memoizedState, b !== null && (y = b.dehydrated, y !== null)) {
      if (r)
        n.flags & 256 ? (vu(n), n.flags &= -257, n = ci(
          l,
          n,
          u
        )) : n.memoizedState !== null ? (Mn(), n.child = l.child, n.flags |= 128, n = null) : (Mn(), s = c.fallback, y = n.mode, c = Wr(
          { mode: "visible", children: c.children },
          y
        ), s = za(
          s,
          y,
          u,
          null
        ), s.flags |= 2, c.return = n, s.return = n, c.sibling = s, n.child = c, cc(
          n,
          l.child,
          null,
          u
        ), c = n.child, c.memoizedState = Em(u), c.childLanes = xm(
          l,
          m,
          u
        ), n.memoizedState = kr, n = s);
      else if (vu(n), ys(y)) {
        if (m = y.nextSibling && y.nextSibling.dataset, m) var M = m.dgst;
        m = M, c = Error(g(419)), c.stack = "", c.digest = m, to({ value: c, source: null, stack: null }), n = ci(
          l,
          n,
          u
        );
      } else if (Wt || lo(l, n, u, !1), m = (u & l.childLanes) !== 0, Wt || m) {
        if (m = ht, m !== null && (c = u & -u, c = (c & 42) !== 0 ? 1 : Qa(c), c = (c & (m.suspendedLanes | u)) !== 0 ? 0 : c, c !== 0 && c !== b.retryLane))
          throw b.retryLane = c, gn(l, c), ma(m, l, c), Ht;
        y.data === "$?" || vc(), n = ci(
          l,
          n,
          u
        );
      } else
        y.data === "$?" ? (n.flags |= 192, n.child = l.child, n = null) : (l = b.treeContext, Pe = an(
          y.nextSibling
        ), wt = n, Fe = !0, Oa = null, Ma = !1, l !== null && (Da[Kl++] = Fa, Da[Kl++] = Ut, Da[Kl++] = su, Fa = l.id, Ut = l.overflow, su = n), n = $r(
          n,
          c.children
        ), n.flags |= 4096);
      return n;
    }
    return s ? (Mn(), s = c.fallback, y = n.mode, b = l.child, M = b.sibling, c = Wa(b, {
      mode: "hidden",
      children: c.children
    }), c.subtreeFlags = b.subtreeFlags & 65011712, M !== null ? s = Wa(M, s) : (s = za(
      s,
      y,
      u,
      null
    ), s.flags |= 2), s.return = n, c.return = n, c.sibling = s, n.child = c, c = s, s = n.child, y = l.child.memoizedState, y === null ? y = Em(u) : (b = y.cachePool, b !== null ? (M = kt._currentValue, b = b.parent !== M ? { parent: M, pool: M } : b) : b = pr(), y = {
      baseLanes: y.baseLanes | u,
      cachePool: b
    }), s.memoizedState = y, s.childLanes = xm(
      l,
      m,
      u
    ), n.memoizedState = kr, c) : (vu(n), u = l.child, l = u.sibling, u = Wa(u, {
      mode: "visible",
      children: c.children
    }), u.return = n, u.sibling = null, l !== null && (m = n.deletions, m === null ? (n.deletions = [l], n.flags |= 16) : m.push(l)), n.child = u, n.memoizedState = null, u);
  }
  function $r(l, n) {
    return n = Wr(
      { mode: "visible", children: n },
      l.mode
    ), n.return = l, l.child = n;
  }
  function Wr(l, n) {
    return l = Jl(22, l, null, n), l.lanes = 0, l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, l;
  }
  function ci(l, n, u) {
    return cc(n, l.child, null, u), l = $r(
      n,
      n.pendingProps.children
    ), l.flags |= 2, n.memoizedState = null, l;
  }
  function Ff(l, n, u) {
    l.lanes |= n;
    var c = l.alternate;
    c !== null && (c.lanes |= n), rr(l.return, n, u);
  }
  function Fr(l, n, u, c, s) {
    var r = l.memoizedState;
    r === null ? l.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: c,
      tail: u,
      tailMode: s
    } : (r.isBackwards = n, r.rendering = null, r.renderingStartTime = 0, r.last = c, r.tail = u, r.tailMode = s);
  }
  function Ir(l, n, u) {
    var c = n.pendingProps, s = c.revealOrder, r = c.tail;
    if (ul(l, n, c.children, u), c = rt.current, (c & 2) !== 0)
      c = c & 1 | 2, n.flags |= 128;
    else {
      if (l !== null && (l.flags & 128) !== 0)
        e: for (l = n.child; l !== null; ) {
          if (l.tag === 13)
            l.memoizedState !== null && Ff(l, u, n);
          else if (l.tag === 19)
            Ff(l, u, n);
          else if (l.child !== null) {
            l.child.return = l, l = l.child;
            continue;
          }
          if (l === n) break e;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === n)
              break e;
            l = l.return;
          }
          l.sibling.return = l.return, l = l.sibling;
        }
      c &= 1;
    }
    switch (he(rt, c), s) {
      case "forwards":
        for (u = n.child, s = null; u !== null; )
          l = u.alternate, l !== null && Jf(l) === null && (s = u), u = u.sibling;
        u = s, u === null ? (s = n.child, n.child = null) : (s = u.sibling, u.sibling = null), Fr(
          n,
          !1,
          s,
          u,
          r
        );
        break;
      case "backwards":
        for (u = null, s = n.child, n.child = null; s !== null; ) {
          if (l = s.alternate, l !== null && Jf(l) === null) {
            n.child = s;
            break;
          }
          l = s.sibling, s.sibling = u, u = s, s = l;
        }
        Fr(
          n,
          !0,
          u,
          null,
          r
        );
        break;
      case "together":
        Fr(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Un(l, n, u) {
    if (l !== null && (n.dependencies = l.dependencies), Tu |= n.lanes, (u & n.childLanes) === 0)
      if (l !== null) {
        if (lo(
          l,
          n,
          u,
          !1
        ), (u & n.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && n.child !== l.child)
      throw Error(g(153));
    if (n.child !== null) {
      for (l = n.child, u = Wa(l, l.pendingProps), n.child = u, u.return = n; l.sibling !== null; )
        l = l.sibling, u = u.sibling = Wa(l, l.pendingProps), u.return = n;
      u.sibling = null;
    }
    return n.child;
  }
  function Pr(l, n) {
    return (l.lanes & n) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Df(l)));
  }
  function Kp(l, n, u) {
    switch (n.tag) {
      case 3:
        Tt(n, n.stateNode.containerInfo), hu(n, kt, l.memoizedState.cache), eo();
        break;
      case 27:
      case 5:
        Xl(n);
        break;
      case 4:
        Tt(n, n.stateNode.containerInfo);
        break;
      case 10:
        hu(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 13:
        var c = n.memoizedState;
        if (c !== null)
          return c.dehydrated !== null ? (vu(n), n.flags |= 128, null) : (u & n.child.childLanes) !== 0 ? Am(l, n, u) : (vu(n), l = Un(
            l,
            n,
            u
          ), l !== null ? l.sibling : null);
        vu(n);
        break;
      case 19:
        var s = (l.flags & 128) !== 0;
        if (c = (u & n.childLanes) !== 0, c || (lo(
          l,
          n,
          u,
          !1
        ), c = (u & n.childLanes) !== 0), s) {
          if (c)
            return Ir(
              l,
              n,
              u
            );
          n.flags |= 128;
        }
        if (s = n.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), he(rt, rt.current), c) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, Lr(l, n, u);
      case 24:
        hu(n, kt, l.memoizedState.cache);
    }
    return Un(l, n, u);
  }
  function kp(l, n, u) {
    if (l !== null)
      if (l.memoizedProps !== n.pendingProps)
        Wt = !0;
      else {
        if (!Pr(l, u) && (n.flags & 128) === 0)
          return Wt = !1, Kp(
            l,
            n,
            u
          );
        Wt = (l.flags & 131072) !== 0;
      }
    else
      Wt = !1, Fe && (n.flags & 1048576) !== 0 && sr(n, Ic, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          l = n.pendingProps;
          var c = n.elementType, s = c._init;
          if (c = s(c._payload), n.type = c, typeof c == "function")
            xf(c) ? (l = ii(c, l), n.tag = 1, n = Jr(
              null,
              n,
              c,
              l,
              u
            )) : (n.tag = 0, n = Zr(
              null,
              n,
              c,
              l,
              u
            ));
          else {
            if (c != null) {
              if (s = c.$$typeof, s === it) {
                n.tag = 11, n = Jp(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              } else if (s === Be) {
                n.tag = 14, n = gu(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              }
            }
            throw n = Lt(c) || c, Error(g(306, n, ""));
          }
        }
        return n;
      case 0:
        return Zr(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 1:
        return c = n.type, s = ii(
          c,
          n.pendingProps
        ), Jr(
          l,
          n,
          c,
          s,
          u
        );
      case 3:
        e: {
          if (Tt(
            n,
            n.stateNode.containerInfo
          ), l === null) throw Error(g(387));
          c = n.pendingProps;
          var r = n.memoizedState;
          s = r.element, Tr(l, n), mu(n, c, null, u);
          var m = n.memoizedState;
          if (c = m.cache, hu(n, kt, c), c !== r.cache && Jh(
            n,
            [kt],
            u,
            !0
          ), uo(), c = m.element, r.isDehydrated)
            if (r = {
              element: c,
              isDehydrated: !1,
              cache: m.cache
            }, n.updateQueue.baseState = r, n.memoizedState = r, n.flags & 256) {
              n = Kr(
                l,
                n,
                c,
                u
              );
              break e;
            } else if (c !== s) {
              s = fa(
                Error(g(424)),
                n
              ), to(s), n = Kr(
                l,
                n,
                c,
                u
              );
              break e;
            } else {
              switch (l = n.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (Pe = an(l.firstChild), wt = n, Fe = !0, Oa = null, Ma = !0, u = Dn(
                n,
                null,
                c,
                u
              ), n.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
            }
          else {
            if (eo(), c === s) {
              n = Un(
                l,
                n,
                u
              );
              break e;
            }
            ul(
              l,
              n,
              c,
              u
            );
          }
          n = n.child;
        }
        return n;
      case 26:
        return Wf(l, n), l === null ? (u = s0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = u : Fe || (u = n.type, l = n.pendingProps, c = qa(
          qe.current
        ).createElement(u), c[ll] = n, c[Hl] = l, ve(c, u, l), Kt(c), n.stateNode = c) : n.memoizedState = s0(
          n.type,
          l.memoizedProps,
          n.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Xl(n), l === null && Fe && (c = n.stateNode = I(
          n.type,
          n.pendingProps,
          qe.current
        ), wt = n, Ma = !0, s = Pe, pi(n.type) ? (vi = s, Pe = an(
          c.firstChild
        )) : Pe = s), ul(
          l,
          n,
          n.pendingProps.children,
          u
        ), Wf(l, n), l === null && (n.flags |= 4194304), n.child;
      case 5:
        return l === null && Fe && ((s = c = Pe) && (c = Ho(
          c,
          n.type,
          n.pendingProps,
          Ma
        ), c !== null ? (n.stateNode = c, wt = n, Pe = an(
          c.firstChild
        ), Ma = !1, s = !0) : s = !1), s || ru(n)), Xl(n), s = n.type, r = n.pendingProps, m = l !== null ? l.memoizedProps : null, c = r.children, wn(s, r) ? c = null : m !== null && wn(s, m) && (n.flags |= 32), n.memoizedState !== null && (s = Ar(
          l,
          n,
          Bp,
          null,
          null,
          u
        ), aa._currentValue = s), Wf(l, n), ul(l, n, c, u), n.child;
      case 6:
        return l === null && Fe && ((l = u = Pe) && (u = Ov(
          u,
          n.pendingProps,
          Ma
        ), u !== null ? (n.stateNode = u, wt = n, Pe = null, l = !0) : l = !1), l || ru(n)), null;
      case 13:
        return Am(l, n, u);
      case 4:
        return Tt(
          n,
          n.stateNode.containerInfo
        ), c = n.pendingProps, l === null ? n.child = cc(
          n,
          null,
          c,
          u
        ) : ul(
          l,
          n,
          c,
          u
        ), n.child;
      case 11:
        return Jp(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 7:
        return ul(
          l,
          n,
          n.pendingProps,
          u
        ), n.child;
      case 8:
        return ul(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 12:
        return ul(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 10:
        return c = n.pendingProps, hu(n, n.type, c.value), ul(
          l,
          n,
          c.children,
          u
        ), n.child;
      case 9:
        return s = n.type._context, c = n.pendingProps.children, Pu(n), s = al(s), c = c(s), n.flags |= 1, ul(l, n, c, u), n.child;
      case 14:
        return gu(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 15:
        return fc(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 19:
        return Ir(l, n, u);
      case 31:
        return c = n.pendingProps, u = n.mode, c = {
          mode: c.mode,
          children: c.children
        }, l === null ? (u = Wr(
          c,
          u
        ), u.ref = n.ref, n.child = u, u.return = n, n = u) : (u = Wa(l.child, c), u.ref = n.ref, n.child = u, u.return = n, n = u), n;
      case 22:
        return Lr(l, n, u);
      case 24:
        return Pu(n), c = al(kt), l === null ? (s = Uf(), s === null && (s = ht, r = no(), s.pooledCache = r, r.refCount++, r !== null && (s.pooledCacheLanes |= u), s = r), n.memoizedState = {
          parent: c,
          cache: s
        }, Sr(n), hu(n, kt, s)) : ((l.lanes & u) !== 0 && (Tr(l, n), mu(n, null, null, u), uo()), s = l.memoizedState, r = n.memoizedState, s.parent !== c ? (s = { parent: c, cache: c }, n.memoizedState = s, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = s), hu(n, kt, c)) : (c = r.cache, hu(n, kt, c), c !== s.cache && Jh(
          n,
          [kt],
          u,
          !0
        ))), ul(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(g(156, n.tag));
  }
  function Cn(l) {
    l.flags |= 4;
  }
  function mo(l, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !cy(n)) {
      if (n = da.current, n !== null && ((we & 4194048) === we ? zl !== null : (we & 62914560) !== we && (we & 536870912) === 0 || n !== zl))
        throw Ii = gr, vr;
      l.flags |= 8192;
    }
  }
  function If(l, n) {
    n !== null && (l.flags |= 4), l.flags & 16384 && (n = l.tag !== 22 ? Mi() : 536870912, l.lanes |= n, bo |= n);
  }
  function yo(l, n) {
    if (!Fe)
      switch (l.tailMode) {
        case "hidden":
          n = l.tail;
          for (var u = null; n !== null; )
            n.alternate !== null && (u = n), n = n.sibling;
          u === null ? l.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = l.tail;
          for (var c = null; u !== null; )
            u.alternate !== null && (c = u), u = u.sibling;
          c === null ? n || l.tail === null ? l.tail = null : l.tail.sibling = null : c.sibling = null;
      }
  }
  function me(l) {
    var n = l.alternate !== null && l.alternate.child === l.child, u = 0, c = 0;
    if (n)
      for (var s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags & 65011712, c |= s.flags & 65011712, s.return = l, s = s.sibling;
    else
      for (s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, c |= s.subtreeFlags, c |= s.flags, s.return = l, s = s.sibling;
    return l.subtreeFlags |= c, l.childLanes = u, n;
  }
  function Rm(l, n, u) {
    var c = n.pendingProps;
    switch (bn(n), n.tag) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return me(n), null;
      case 1:
        return me(n), null;
      case 3:
        return u = n.stateNode, c = null, l !== null && (c = l.memoizedState.cache), n.memoizedState.cache !== c && (n.flags |= 2048), Sn(kt), Zt(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (Pc(n) ? Cn(n) : l === null || l.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Zh())), me(n), null;
      case 26:
        return u = n.memoizedState, l === null ? (Cn(n), u !== null ? (me(n), mo(n, u)) : (me(n), n.flags &= -16777217)) : u ? u !== l.memoizedState ? (Cn(n), me(n), mo(n, u)) : (me(n), n.flags &= -16777217) : (l.memoizedProps !== c && Cn(n), me(n), n.flags &= -16777217), null;
      case 27:
        eu(n), u = qe.current;
        var s = n.type;
        if (l !== null && n.stateNode != null)
          l.memoizedProps !== c && Cn(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(g(166));
            return me(n), null;
          }
          l = Ue.current, Pc(n) ? Rf(n) : (l = I(s, c, u), n.stateNode = l, Cn(n));
        }
        return me(n), null;
      case 5:
        if (eu(n), u = n.type, l !== null && n.stateNode != null)
          l.memoizedProps !== c && Cn(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(g(166));
            return me(n), null;
          }
          if (l = Ue.current, Pc(n))
            Rf(n);
          else {
            switch (s = qa(
              qe.current
            ), l) {
              case 1:
                l = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                l = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    l = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    l = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    l = s.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                    break;
                  case "select":
                    l = typeof c.is == "string" ? s.createElement("select", { is: c.is }) : s.createElement("select"), c.multiple ? l.multiple = !0 : c.size && (l.size = c.size);
                    break;
                  default:
                    l = typeof c.is == "string" ? s.createElement(u, { is: c.is }) : s.createElement(u);
                }
            }
            l[ll] = n, l[Hl] = c;
            e: for (s = n.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                l.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === n) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === n)
                  break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            n.stateNode = l;
            e: switch (ve(l, u, c), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!c.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && Cn(n);
          }
        }
        return me(n), n.flags &= -16777217, null;
      case 6:
        if (l && n.stateNode != null)
          l.memoizedProps !== c && Cn(n);
        else {
          if (typeof c != "string" && n.stateNode === null)
            throw Error(g(166));
          if (l = qe.current, Pc(n)) {
            if (l = n.stateNode, u = n.memoizedProps, c = null, s = wt, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  c = s.memoizedProps;
              }
            l[ll] = n, l = !!(l.nodeValue === u || c !== null && c.suppressHydrationWarning === !0 || ay(l.nodeValue, u)), l || ru(n);
          } else
            l = qa(l).createTextNode(
              c
            ), l[ll] = n, n.stateNode = l;
        }
        return me(n), null;
      case 13:
        if (c = n.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (s = Pc(n), c !== null && c.dehydrated !== null) {
            if (l === null) {
              if (!s) throw Error(g(318));
              if (s = n.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(g(317));
              s[ll] = n;
            } else
              eo(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            me(n), s = !1;
          } else
            s = Zh(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return n.flags & 256 ? (tn(n), n) : (tn(n), null);
        }
        if (tn(n), (n.flags & 128) !== 0)
          return n.lanes = u, n;
        if (u = c !== null, l = l !== null && l.memoizedState !== null, u) {
          c = n.child, s = null, c.alternate !== null && c.alternate.memoizedState !== null && c.alternate.memoizedState.cachePool !== null && (s = c.alternate.memoizedState.cachePool.pool);
          var r = null;
          c.memoizedState !== null && c.memoizedState.cachePool !== null && (r = c.memoizedState.cachePool.pool), r !== s && (c.flags |= 2048);
        }
        return u !== l && u && (n.child.flags |= 8192), If(n, n.updateQueue), me(n), null;
      case 4:
        return Zt(), l === null && ty(n.stateNode.containerInfo), me(n), null;
      case 10:
        return Sn(n.type), me(n), null;
      case 19:
        if (F(rt), s = n.memoizedState, s === null) return me(n), null;
        if (c = (n.flags & 128) !== 0, r = s.rendering, r === null)
          if (c) yo(s, !1);
          else {
            if (_t !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = n.child; l !== null; ) {
                if (r = Jf(l), r !== null) {
                  for (n.flags |= 128, yo(s, !1), l = r.updateQueue, n.updateQueue = l, If(n, l), n.subtreeFlags = 0, l = u, u = n.child; u !== null; )
                    He(u, l), u = u.sibling;
                  return he(
                    rt,
                    rt.current & 1 | 2
                  ), n.child;
                }
                l = l.sibling;
              }
            s.tail !== null && ua() > od && (n.flags |= 128, c = !0, yo(s, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (l = Jf(r), l !== null) {
              if (n.flags |= 128, c = !0, l = l.updateQueue, n.updateQueue = l, If(n, l), yo(s, !0), s.tail === null && s.tailMode === "hidden" && !r.alternate && !Fe)
                return me(n), null;
            } else
              2 * ua() - s.renderingStartTime > od && u !== 536870912 && (n.flags |= 128, c = !0, yo(s, !1), n.lanes = 4194304);
          s.isBackwards ? (r.sibling = n.child, n.child = r) : (l = s.last, l !== null ? l.sibling = r : n.child = r, s.last = r);
        }
        return s.tail !== null ? (n = s.tail, s.rendering = n, s.tail = n.sibling, s.renderingStartTime = ua(), n.sibling = null, l = rt.current, he(rt, c ? l & 1 | 2 : l & 1), n) : (me(n), null);
      case 22:
      case 23:
        return tn(n), co(), c = n.memoizedState !== null, l !== null ? l.memoizedState !== null !== c && (n.flags |= 8192) : c && (n.flags |= 8192), c ? (u & 536870912) !== 0 && (n.flags & 128) === 0 && (me(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : me(n), u = n.updateQueue, u !== null && If(n, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), c = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (c = n.memoizedState.cachePool.pool), c !== u && (n.flags |= 2048), l !== null && F(En), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), n.memoizedState.cache !== u && (n.flags |= 2048), Sn(kt), me(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(g(156, n.tag));
  }
  function Sv(l, n) {
    switch (bn(n), n.tag) {
      case 1:
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 3:
        return Sn(kt), Zt(), l = n.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (n.flags = l & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return eu(n), null;
      case 13:
        if (tn(n), l = n.memoizedState, l !== null && l.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(g(340));
          eo();
        }
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 19:
        return F(rt), null;
      case 4:
        return Zt(), null;
      case 10:
        return Sn(n.type), null;
      case 22:
      case 23:
        return tn(n), co(), l !== null && F(En), l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 24:
        return Sn(kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function zm(l, n) {
    switch (bn(n), n.tag) {
      case 3:
        Sn(kt), Zt();
        break;
      case 26:
      case 27:
      case 5:
        eu(n);
        break;
      case 4:
        Zt();
        break;
      case 13:
        tn(n);
        break;
      case 19:
        F(rt);
        break;
      case 10:
        Sn(n.type);
        break;
      case 22:
      case 23:
        tn(n), co(), l !== null && F(En);
        break;
      case 24:
        Sn(kt);
    }
  }
  function Pf(l, n) {
    try {
      var u = n.updateQueue, c = u !== null ? u.lastEffect : null;
      if (c !== null) {
        var s = c.next;
        u = s;
        do {
          if ((u.tag & l) === l) {
            c = void 0;
            var r = u.create, m = u.inst;
            c = r(), m.destroy = c;
          }
          u = u.next;
        } while (u !== s);
      }
    } catch (y) {
      ct(n, n.return, y);
    }
  }
  function oi(l, n, u) {
    try {
      var c = n.updateQueue, s = c !== null ? c.lastEffect : null;
      if (s !== null) {
        var r = s.next;
        c = r;
        do {
          if ((c.tag & l) === l) {
            var m = c.inst, y = m.destroy;
            if (y !== void 0) {
              m.destroy = void 0, s = n;
              var b = u, M = y;
              try {
                M();
              } catch (G) {
                ct(
                  s,
                  b,
                  G
                );
              }
            }
          }
          c = c.next;
        } while (c !== r);
      }
    } catch (G) {
      ct(n, n.return, G);
    }
  }
  function ed(l) {
    var n = l.updateQueue;
    if (n !== null) {
      var u = l.stateNode;
      try {
        Nf(n, u);
      } catch (c) {
        ct(l, l.return, c);
      }
    }
  }
  function Dm(l, n, u) {
    u.props = ii(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (c) {
      ct(l, n, c);
    }
  }
  function po(l, n) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var c = l.stateNode;
            break;
          case 30:
            c = l.stateNode;
            break;
          default:
            c = l.stateNode;
        }
        typeof u == "function" ? l.refCleanup = u(c) : u.current = c;
      }
    } catch (s) {
      ct(l, n, s);
    }
  }
  function ln(l, n) {
    var u = l.ref, c = l.refCleanup;
    if (u !== null)
      if (typeof c == "function")
        try {
          c();
        } catch (s) {
          ct(l, n, s);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (s) {
          ct(l, n, s);
        }
      else u.current = null;
  }
  function vo(l) {
    var n = l.type, u = l.memoizedProps, c = l.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && c.focus();
          break e;
        case "img":
          u.src ? c.src = u.src : u.srcSet && (c.srcset = u.srcSet);
      }
    } catch (s) {
      ct(l, l.return, s);
    }
  }
  function Om(l, n, u) {
    try {
      var c = l.stateNode;
      Rv(c, l.type, u, n), c[Hl] = n;
    } catch (s) {
      ct(l, l.return, s);
    }
  }
  function $p(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && pi(l.type) || l.tag === 4;
  }
  function Na(l) {
    e: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || $p(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && pi(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue e;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function rc(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, n) : (n = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, n.appendChild(l), u = u._reactRootContainer, u != null || n.onclick !== null || (n.onclick = Sd));
    else if (c !== 4 && (c === 27 && pi(l.type) && (u = l.stateNode, n = null), l = l.child, l !== null))
      for (rc(l, n, u), l = l.sibling; l !== null; )
        rc(l, n, u), l = l.sibling;
  }
  function td(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? u.insertBefore(l, n) : u.appendChild(l);
    else if (c !== 4 && (c === 27 && pi(l.type) && (u = l.stateNode), l = l.child, l !== null))
      for (td(l, n, u), l = l.sibling; l !== null; )
        td(l, n, u), l = l.sibling;
  }
  function ld(l) {
    var n = l.stateNode, u = l.memoizedProps;
    try {
      for (var c = l.type, s = n.attributes; s.length; )
        n.removeAttributeNode(s[0]);
      ve(n, c, u), n[ll] = l, n[Hl] = u;
    } catch (r) {
      ct(l, l.return, r);
    }
  }
  var Hn = !1, Nt = !1, ad = !1, nd = typeof WeakSet == "function" ? WeakSet : Set, Ft = null;
  function Mm(l, n) {
    if (l = l.containerInfo, ds = gs, l = Yh(l), Tf(l)) {
      if ("selectionStart" in l)
        var u = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        e: {
          u = (u = l.ownerDocument) && u.defaultView || window;
          var c = u.getSelection && u.getSelection();
          if (c && c.rangeCount !== 0) {
            u = c.anchorNode;
            var s = c.anchorOffset, r = c.focusNode;
            c = c.focusOffset;
            try {
              u.nodeType, r.nodeType;
            } catch {
              u = null;
              break e;
            }
            var m = 0, y = -1, b = -1, M = 0, G = 0, X = l, C = null;
            t: for (; ; ) {
              for (var N; X !== u || s !== 0 && X.nodeType !== 3 || (y = m + s), X !== r || c !== 0 && X.nodeType !== 3 || (b = m + c), X.nodeType === 3 && (m += X.nodeValue.length), (N = X.firstChild) !== null; )
                C = X, X = N;
              for (; ; ) {
                if (X === l) break t;
                if (C === u && ++M === s && (y = m), C === r && ++G === c && (b = m), (N = X.nextSibling) !== null) break;
                X = C, C = X.parentNode;
              }
              X = N;
            }
            u = y === -1 || b === -1 ? null : { start: y, end: b };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (hs = { focusedElem: l, selectionRange: u }, gs = !1, Ft = n; Ft !== null; )
      if (n = Ft, l = n.child, (n.subtreeFlags & 1024) !== 0 && l !== null)
        l.return = n, Ft = l;
      else
        for (; Ft !== null; ) {
          switch (n = Ft, r = n.alternate, l = n.flags, n.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && r !== null) {
                l = void 0, u = n, s = r.memoizedProps, r = r.memoizedState, c = u.stateNode;
                try {
                  var se = ii(
                    u.type,
                    s,
                    u.elementType === u.type
                  );
                  l = c.getSnapshotBeforeUpdate(
                    se,
                    r
                  ), c.__reactInternalSnapshotBeforeUpdate = l;
                } catch (re) {
                  ct(
                    u,
                    u.return,
                    re
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = n.stateNode.containerInfo, u = l.nodeType, u === 9)
                  ms(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ms(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(g(163));
          }
          if (l = n.sibling, l !== null) {
            l.return = n.return, Ft = l;
            break;
          }
          Ft = n.return;
        }
  }
  function Um(l, n, u) {
    var c = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        jn(l, u), c & 4 && Pf(5, u);
        break;
      case 1:
        if (jn(l, u), c & 4)
          if (l = u.stateNode, n === null)
            try {
              l.componentDidMount();
            } catch (m) {
              ct(u, u.return, m);
            }
          else {
            var s = ii(
              u.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              l.componentDidUpdate(
                s,
                n,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              ct(
                u,
                u.return,
                m
              );
            }
          }
        c & 64 && ed(u), c & 512 && po(u, u.return);
        break;
      case 3:
        if (jn(l, u), c & 64 && (l = u.updateQueue, l !== null)) {
          if (n = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                n = u.child.stateNode;
                break;
              case 1:
                n = u.child.stateNode;
            }
          try {
            Nf(l, n);
          } catch (m) {
            ct(u, u.return, m);
          }
        }
        break;
      case 27:
        n === null && c & 4 && ld(u);
      case 26:
      case 5:
        jn(l, u), n === null && c & 4 && vo(u), c & 512 && po(u, u.return);
        break;
      case 12:
        jn(l, u);
        break;
      case 13:
        jn(l, u), c & 4 && ud(l, u), c & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = Tv.bind(
          null,
          u
        ), Mv(l, u))));
        break;
      case 22:
        if (c = u.memoizedState !== null || Hn, !c) {
          n = n !== null && n.memoizedState !== null || Nt, s = Hn;
          var r = Nt;
          Hn = c, (Nt = n) && !r ? fi(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : jn(l, u), Hn = s, Nt = r;
        }
        break;
      case 30:
        break;
      default:
        jn(l, u);
    }
  }
  function Cm(l) {
    var n = l.alternate;
    n !== null && (l.alternate = null, Cm(n)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (n = l.stateNode, n !== null && nf(n)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Et = null, ml = !1;
  function Nn(l, n, u) {
    for (u = u.child; u !== null; )
      _e(l, n, u), u = u.sibling;
  }
  function _e(l, n, u) {
    if (Cl && typeof Cl.onCommitFiberUnmount == "function")
      try {
        Cl.onCommitFiberUnmount(qc, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        Nt || ln(u, n), Nn(
          l,
          n,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        Nt || ln(u, n);
        var c = Et, s = ml;
        pi(u.type) && (Et = u.stateNode, ml = !1), Nn(
          l,
          n,
          u
        ), ta(u.stateNode), Et = c, ml = s;
        break;
      case 5:
        Nt || ln(u, n);
      case 6:
        if (c = Et, s = ml, Et = null, Nn(
          l,
          n,
          u
        ), Et = c, ml = s, Et !== null)
          if (ml)
            try {
              (Et.nodeType === 9 ? Et.body : Et.nodeName === "HTML" ? Et.ownerDocument.body : Et).removeChild(u.stateNode);
            } catch (r) {
              ct(
                u,
                n,
                r
              );
            }
          else
            try {
              Et.removeChild(u.stateNode);
            } catch (r) {
              ct(
                u,
                n,
                r
              );
            }
        break;
      case 18:
        Et !== null && (ml ? (l = Et, Ed(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), Xn(l)) : Ed(Et, u.stateNode));
        break;
      case 4:
        c = Et, s = ml, Et = u.stateNode.containerInfo, ml = !0, Nn(
          l,
          n,
          u
        ), Et = c, ml = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Nt || oi(2, u, n), Nt || oi(4, u, n), Nn(
          l,
          n,
          u
        );
        break;
      case 1:
        Nt || (ln(u, n), c = u.stateNode, typeof c.componentWillUnmount == "function" && Dm(
          u,
          n,
          c
        )), Nn(
          l,
          n,
          u
        );
        break;
      case 21:
        Nn(
          l,
          n,
          u
        );
        break;
      case 22:
        Nt = (c = Nt) || u.memoizedState !== null, Nn(
          l,
          n,
          u
        ), Nt = c;
        break;
      default:
        Nn(
          l,
          n,
          u
        );
    }
  }
  function ud(l, n) {
    if (n.memoizedState === null && (l = n.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Xn(l);
      } catch (u) {
        ct(n, n.return, u);
      }
  }
  function Hm(l) {
    switch (l.tag) {
      case 13:
      case 19:
        var n = l.stateNode;
        return n === null && (n = l.stateNode = new nd()), n;
      case 22:
        return l = l.stateNode, n = l._retryCache, n === null && (n = l._retryCache = new nd()), n;
      default:
        throw Error(g(435, l.tag));
    }
  }
  function id(l, n) {
    var u = Hm(l);
    n.forEach(function(c) {
      var s = Ev.bind(null, l, c);
      u.has(c) || (u.add(c), c.then(s, s));
    });
  }
  function _l(l, n) {
    var u = n.deletions;
    if (u !== null)
      for (var c = 0; c < u.length; c++) {
        var s = u[c], r = l, m = n, y = m;
        e: for (; y !== null; ) {
          switch (y.tag) {
            case 27:
              if (pi(y.type)) {
                Et = y.stateNode, ml = !1;
                break e;
              }
              break;
            case 5:
              Et = y.stateNode, ml = !1;
              break e;
            case 3:
            case 4:
              Et = y.stateNode.containerInfo, ml = !0;
              break e;
          }
          y = y.return;
        }
        if (Et === null) throw Error(g(160));
        _e(r, m, s), Et = null, ml = !1, r = s.alternate, r !== null && (r.return = null), s.return = null;
      }
    if (n.subtreeFlags & 13878)
      for (n = n.child; n !== null; )
        es(n, l), n = n.sibling;
  }
  var Bl = null;
  function es(l, n) {
    var u = l.alternate, c = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        _l(n, l), il(l), c & 4 && (oi(3, l, l.return), Pf(3, l), oi(5, l, l.return));
        break;
      case 1:
        _l(n, l), il(l), c & 512 && (Nt || u === null || ln(u, u.return)), c & 64 && Hn && (l = l.updateQueue, l !== null && (c = l.callbacks, c !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? c : u.concat(c))));
        break;
      case 26:
        var s = Bl;
        if (_l(n, l), il(l), c & 512 && (Nt || u === null || ln(u, u.return)), c & 4) {
          var r = u !== null ? u.memoizedState : null;
          if (c = l.memoizedState, u === null)
            if (c === null)
              if (l.stateNode === null) {
                e: {
                  c = l.type, u = l.memoizedProps, s = s.ownerDocument || s;
                  t: switch (c) {
                    case "title":
                      r = s.getElementsByTagName("title")[0], (!r || r[ae] || r[ll] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = s.createElement(c), s.head.insertBefore(
                        r,
                        s.querySelector("head > title")
                      )), ve(r, c, u), r[ll] = l, Kt(r), c = r;
                      break e;
                    case "link":
                      var m = uy(
                        "link",
                        "href",
                        s
                      ).get(c + (u.href || ""));
                      if (m) {
                        for (var y = 0; y < m.length; y++)
                          if (r = m[y], r.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && r.getAttribute("rel") === (u.rel == null ? null : u.rel) && r.getAttribute("title") === (u.title == null ? null : u.title) && r.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                            m.splice(y, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), ve(r, c, u), s.head.appendChild(r);
                      break;
                    case "meta":
                      if (m = uy(
                        "meta",
                        "content",
                        s
                      ).get(c + (u.content || ""))) {
                        for (y = 0; y < m.length; y++)
                          if (r = m[y], r.getAttribute("content") === (u.content == null ? null : "" + u.content) && r.getAttribute("name") === (u.name == null ? null : u.name) && r.getAttribute("property") === (u.property == null ? null : u.property) && r.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && r.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                            m.splice(y, 1);
                            break t;
                          }
                      }
                      r = s.createElement(c), ve(r, c, u), s.head.appendChild(r);
                      break;
                    default:
                      throw Error(g(468, c));
                  }
                  r[ll] = l, Kt(r), c = r;
                }
                l.stateNode = c;
              } else
                iy(
                  s,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = d0(
                s,
                c,
                l.memoizedProps
              );
          else
            r !== c ? (r === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : r.count--, c === null ? iy(
              s,
              l.type,
              l.stateNode
            ) : d0(
              s,
              c,
              l.memoizedProps
            )) : c === null && l.stateNode !== null && Om(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        _l(n, l), il(l), c & 512 && (Nt || u === null || ln(u, u.return)), u !== null && c & 4 && Om(
          l,
          l.memoizedProps,
          u.memoizedProps
        );
        break;
      case 5:
        if (_l(n, l), il(l), c & 512 && (Nt || u === null || ln(u, u.return)), l.flags & 32) {
          s = l.stateNode;
          try {
            Vc(s, "");
          } catch (N) {
            ct(l, l.return, N);
          }
        }
        c & 4 && l.stateNode != null && (s = l.memoizedProps, Om(
          l,
          s,
          u !== null ? u.memoizedProps : s
        )), c & 1024 && (ad = !0);
        break;
      case 6:
        if (_l(n, l), il(l), c & 4) {
          if (l.stateNode === null)
            throw Error(g(162));
          c = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = c;
          } catch (N) {
            ct(l, l.return, N);
          }
        }
        break;
      case 3:
        if (Si = null, s = Bl, Bl = xd(n.containerInfo), _l(n, l), Bl = s, il(l), c & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            Xn(n.containerInfo);
          } catch (N) {
            ct(l, l.return, N);
          }
        ad && (ad = !1, Nm(l));
        break;
      case 4:
        c = Bl, Bl = xd(
          l.stateNode.containerInfo
        ), _l(n, l), il(l), Bl = c;
        break;
      case 12:
        _l(n, l), il(l);
        break;
      case 13:
        _l(n, l), il(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (Vm = ua()), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, id(l, c)));
        break;
      case 22:
        s = l.memoizedState !== null;
        var b = u !== null && u.memoizedState !== null, M = Hn, G = Nt;
        if (Hn = M || s, Nt = G || b, _l(n, l), Nt = G, Hn = M, il(l), c & 8192)
          e: for (n = l.stateNode, n._visibility = s ? n._visibility & -2 : n._visibility | 1, s && (u === null || b || Hn || Nt || xt(l)), u = null, n = l; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (u === null) {
                b = u = n;
                try {
                  if (r = b.stateNode, s)
                    m = r.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    y = b.stateNode;
                    var X = b.memoizedProps.style, C = X != null && X.hasOwnProperty("display") ? X.display : null;
                    y.style.display = C == null || typeof C == "boolean" ? "" : ("" + C).trim();
                  }
                } catch (N) {
                  ct(b, b.return, N);
                }
              }
            } else if (n.tag === 6) {
              if (u === null) {
                b = n;
                try {
                  b.stateNode.nodeValue = s ? "" : b.memoizedProps;
                } catch (N) {
                  ct(b, b.return, N);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === l) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === l) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === l) break e;
              u === n && (u = null), n = n.return;
            }
            u === n && (u = null), n.sibling.return = n.return, n = n.sibling;
          }
        c & 4 && (c = l.updateQueue, c !== null && (u = c.retryQueue, u !== null && (c.retryQueue = null, id(l, u))));
        break;
      case 19:
        _l(n, l), il(l), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, id(l, c)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        _l(n, l), il(l);
    }
  }
  function il(l) {
    var n = l.flags;
    if (n & 2) {
      try {
        for (var u, c = l.return; c !== null; ) {
          if ($p(c)) {
            u = c;
            break;
          }
          c = c.return;
        }
        if (u == null) throw Error(g(160));
        switch (u.tag) {
          case 27:
            var s = u.stateNode, r = Na(l);
            td(l, r, s);
            break;
          case 5:
            var m = u.stateNode;
            u.flags & 32 && (Vc(m, ""), u.flags &= -33);
            var y = Na(l);
            td(l, y, m);
            break;
          case 3:
          case 4:
            var b = u.stateNode.containerInfo, M = Na(l);
            rc(
              l,
              M,
              b
            );
            break;
          default:
            throw Error(g(161));
        }
      } catch (G) {
        ct(l, l.return, G);
      }
      l.flags &= -3;
    }
    n & 4096 && (l.flags &= -4097);
  }
  function Nm(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var n = l;
        Nm(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), l = l.sibling;
      }
  }
  function jn(l, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Um(l, n.alternate, n), n = n.sibling;
  }
  function xt(l) {
    for (l = l.child; l !== null; ) {
      var n = l;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oi(4, n, n.return), xt(n);
          break;
        case 1:
          ln(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && Dm(
            n,
            n.return,
            u
          ), xt(n);
          break;
        case 27:
          ta(n.stateNode);
        case 26:
        case 5:
          ln(n, n.return), xt(n);
          break;
        case 22:
          n.memoizedState === null && xt(n);
          break;
        case 30:
          xt(n);
          break;
        default:
          xt(n);
      }
      l = l.sibling;
    }
  }
  function fi(l, n, u) {
    for (u = u && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var c = n.alternate, s = l, r = n, m = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          fi(
            s,
            r,
            u
          ), Pf(4, r);
          break;
        case 1:
          if (fi(
            s,
            r,
            u
          ), c = r, s = c.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (M) {
              ct(c, c.return, M);
            }
          if (c = r, s = c.updateQueue, s !== null) {
            var y = c.stateNode;
            try {
              var b = s.shared.hiddenCallbacks;
              if (b !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < b.length; s++)
                  Er(b[s], y);
            } catch (M) {
              ct(c, c.return, M);
            }
          }
          u && m & 64 && ed(r), po(r, r.return);
          break;
        case 27:
          ld(r);
        case 26:
        case 5:
          fi(
            s,
            r,
            u
          ), u && c === null && m & 4 && vo(r), po(r, r.return);
          break;
        case 12:
          fi(
            s,
            r,
            u
          );
          break;
        case 13:
          fi(
            s,
            r,
            u
          ), u && m & 4 && ud(s, r);
          break;
        case 22:
          r.memoizedState === null && fi(
            s,
            r,
            u
          ), po(r, r.return);
          break;
        case 30:
          break;
        default:
          fi(
            s,
            r,
            u
          );
      }
      n = n.sibling;
    }
  }
  function ja(l, n) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Tn(u));
  }
  function cd(l, n) {
    l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && Tn(l));
  }
  function yl(l, n, u, c) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        jm(
          l,
          n,
          u,
          c
        ), n = n.sibling;
  }
  function jm(l, n, u, c) {
    var s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        yl(
          l,
          n,
          u,
          c
        ), s & 2048 && Pf(9, n);
        break;
      case 1:
        yl(
          l,
          n,
          u,
          c
        );
        break;
      case 3:
        yl(
          l,
          n,
          u,
          c
        ), s & 2048 && (l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && Tn(l)));
        break;
      case 12:
        if (s & 2048) {
          yl(
            l,
            n,
            u,
            c
          ), l = n.stateNode;
          try {
            var r = n.memoizedProps, m = r.id, y = r.onPostCommit;
            typeof y == "function" && y(
              m,
              n.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (b) {
            ct(n, n.return, b);
          }
        } else
          yl(
            l,
            n,
            u,
            c
          );
        break;
      case 13:
        yl(
          l,
          n,
          u,
          c
        );
        break;
      case 23:
        break;
      case 22:
        r = n.stateNode, m = n.alternate, n.memoizedState !== null ? r._visibility & 2 ? yl(
          l,
          n,
          u,
          c
        ) : et(l, n) : r._visibility & 2 ? yl(
          l,
          n,
          u,
          c
        ) : (r._visibility |= 2, bu(
          l,
          n,
          u,
          c,
          (n.subtreeFlags & 10256) !== 0
        )), s & 2048 && ja(m, n);
        break;
      case 24:
        yl(
          l,
          n,
          u,
          c
        ), s & 2048 && cd(n.alternate, n);
        break;
      default:
        yl(
          l,
          n,
          u,
          c
        );
    }
  }
  function bu(l, n, u, c, s) {
    for (s = s && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null; ) {
      var r = l, m = n, y = u, b = c, M = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          bu(
            r,
            m,
            y,
            b,
            s
          ), Pf(8, m);
          break;
        case 23:
          break;
        case 22:
          var G = m.stateNode;
          m.memoizedState !== null ? G._visibility & 2 ? bu(
            r,
            m,
            y,
            b,
            s
          ) : et(
            r,
            m
          ) : (G._visibility |= 2, bu(
            r,
            m,
            y,
            b,
            s
          )), s && M & 2048 && ja(
            m.alternate,
            m
          );
          break;
        case 24:
          bu(
            r,
            m,
            y,
            b,
            s
          ), s && M & 2048 && cd(m.alternate, m);
          break;
        default:
          bu(
            r,
            m,
            y,
            b,
            s
          );
      }
      n = n.sibling;
    }
  }
  function et(l, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var u = l, c = n, s = c.flags;
        switch (c.tag) {
          case 22:
            et(u, c), s & 2048 && ja(
              c.alternate,
              c
            );
            break;
          case 24:
            et(u, c), s & 2048 && cd(c.alternate, c);
            break;
          default:
            et(u, c);
        }
        n = n.sibling;
      }
  }
  var dc = 8192;
  function jt(l) {
    if (l.subtreeFlags & dc)
      for (l = l.child; l !== null; )
        Wp(l), l = l.sibling;
  }
  function Wp(l) {
    switch (l.tag) {
      case 26:
        jt(l), l.flags & dc && l.memoizedState !== null && y0(
          Bl,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        jt(l);
        break;
      case 3:
      case 4:
        var n = Bl;
        Bl = xd(l.stateNode.containerInfo), jt(l), Bl = n;
        break;
      case 22:
        l.memoizedState === null && (n = l.alternate, n !== null && n.memoizedState !== null ? (n = dc, dc = 16777216, jt(l), dc = n) : jt(l));
        break;
      default:
        jt(l);
    }
  }
  function _m(l) {
    var n = l.alternate;
    if (n !== null && (l = n.child, l !== null)) {
      n.child = null;
      do
        n = l.sibling, l.sibling = null, l = n;
      while (l !== null);
    }
  }
  function hc(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          Ft = c, qm(
            c,
            l
          );
        }
      _m(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Bm(l), l = l.sibling;
  }
  function Bm(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        hc(l), l.flags & 2048 && oi(9, l, l.return);
        break;
      case 3:
        hc(l);
        break;
      case 12:
        hc(l);
        break;
      case 22:
        var n = l.stateNode;
        l.memoizedState !== null && n._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (n._visibility &= -3, ql(l)) : hc(l);
        break;
      default:
        hc(l);
    }
  }
  function ql(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          Ft = c, qm(
            c,
            l
          );
        }
      _m(l);
    }
    for (l = l.child; l !== null; ) {
      switch (n = l, n.tag) {
        case 0:
        case 11:
        case 15:
          oi(8, n, n.return), ql(n);
          break;
        case 22:
          u = n.stateNode, u._visibility & 2 && (u._visibility &= -3, ql(n));
          break;
        default:
          ql(n);
      }
      l = l.sibling;
    }
  }
  function qm(l, n) {
    for (; Ft !== null; ) {
      var u = Ft;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          oi(8, u, n);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var c = u.memoizedState.cachePool.pool;
            c != null && c.refCount++;
          }
          break;
        case 24:
          Tn(u.memoizedState.cache);
      }
      if (c = u.child, c !== null) c.return = u, Ft = c;
      else
        e: for (u = l; Ft !== null; ) {
          c = Ft;
          var s = c.sibling, r = c.return;
          if (Cm(c), c === u) {
            Ft = null;
            break e;
          }
          if (s !== null) {
            s.return = r, Ft = s;
            break e;
          }
          Ft = r;
        }
    }
  }
  var Ym = {
    getCacheForType: function(l) {
      var n = al(kt), u = n.data.get(l);
      return u === void 0 && (u = l(), n.data.set(l, u)), u;
    }
  }, Fp = typeof WeakMap == "function" ? WeakMap : Map, nt = 0, ht = null, Ye = null, we = 0, ut = 0, Il = null, _n = !1, go = !1, wm = !1, Su = 0, _t = 0, Tu = 0, mc = 0, Bn = 0, _a = 0, bo = 0, So = null, Pl = null, Gm = !1, Vm = 0, od = 1 / 0, To = null, si = null, pl = 0, qn = null, Eo = null, vl = 0, fd = 0, sd = null, Xm = null, xo = 0, Qm = null;
  function ha() {
    if ((nt & 2) !== 0 && we !== 0)
      return we & -we;
    if (z.T !== null) {
      var l = Ua;
      return l !== 0 ? l : gc();
    }
    return rp();
  }
  function Lm() {
    _a === 0 && (_a = (we & 536870912) === 0 || Fe ? Bu() : 536870912);
    var l = da.current;
    return l !== null && (l.flags |= 32), _a;
  }
  function ma(l, n, u) {
    (l === ht && (ut === 2 || ut === 9) || l.cancelPendingCommit !== null) && (Yn(l, 0), Eu(
      l,
      we,
      _a,
      !1
    )), Ui(l, u), ((nt & 2) === 0 || l !== ht) && (l === ht && ((nt & 2) === 0 && (mc |= u), _t === 4 && Eu(
      l,
      we,
      _a,
      !1
    )), ea(l));
  }
  function Ao(l, n, u) {
    if ((nt & 6) !== 0) throw Error(g(327));
    var c = !u && (n & 124) === 0 && (n & l.expiredLanes) === 0 || sn(l, n), s = c ? Jm(l, n) : rd(l, n, !0), r = c;
    do {
      if (s === 0) {
        go && !c && Eu(l, n, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, r && !Ip(u)) {
          s = rd(l, n, !1), r = !1;
          continue;
        }
        if (s === 2) {
          if (r = n, l.errorRecoveryDisabledLanes & r)
            var m = 0;
          else
            m = l.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            n = m;
            e: {
              var y = l;
              s = So;
              var b = y.current.memoizedState.isDehydrated;
              if (b && (Yn(y, m).flags |= 256), m = rd(
                y,
                m,
                !1
              ), m !== 2) {
                if (wm && !b) {
                  y.errorRecoveryDisabledLanes |= r, mc |= r, s = 4;
                  break e;
                }
                r = Pl, Pl = s, r !== null && (Pl === null ? Pl = r : Pl.push.apply(
                  Pl,
                  r
                ));
              }
              s = m;
            }
            if (r = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Yn(l, 0), Eu(l, n, 0, !0);
          break;
        }
        e: {
          switch (c = l, r = s, r) {
            case 0:
            case 1:
              throw Error(g(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Eu(
                c,
                n,
                _a,
                !_n
              );
              break e;
            case 2:
              Pl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(g(329));
          }
          if ((n & 62914560) === n && (s = Vm + 300 - ua(), 10 < s)) {
            if (Eu(
              c,
              n,
              _a,
              !_n
            ), _u(c, 0, !0) !== 0) break e;
            c.timeoutHandle = Td(
              ts.bind(
                null,
                c,
                u,
                Pl,
                To,
                Gm,
                n,
                _a,
                mc,
                bo,
                _n,
                r,
                2,
                -0,
                0
              ),
              s
            );
            break e;
          }
          ts(
            c,
            u,
            Pl,
            To,
            Gm,
            n,
            _a,
            mc,
            bo,
            _n,
            r,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ea(l);
  }
  function ts(l, n, u, c, s, r, m, y, b, M, G, X, C, N) {
    if (l.timeoutHandle = -1, X = n.subtreeFlags, (X & 8192 || (X & 16785408) === 16785408) && (Bo = { stylesheets: null, count: 0, unsuspend: m0 }, Wp(n), X = oy(), X !== null)) {
      l.cancelPendingCommit = X(
        t0.bind(
          null,
          l,
          n,
          r,
          u,
          c,
          s,
          m,
          y,
          b,
          G,
          1,
          C,
          N
        )
      ), Eu(l, r, m, !M);
      return;
    }
    t0(
      l,
      n,
      r,
      u,
      c,
      s,
      m,
      y,
      b
    );
  }
  function Ip(l) {
    for (var n = l; ; ) {
      var u = n.tag;
      if ((u === 0 || u === 11 || u === 15) && n.flags & 16384 && (u = n.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var c = 0; c < u.length; c++) {
          var s = u[c], r = s.getSnapshot;
          s = s.value;
          try {
            if (!hl(r(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = n.child, n.subtreeFlags & 16384 && u !== null)
        u.return = n, n = u;
      else {
        if (n === l) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === l) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function Eu(l, n, u, c) {
    n &= ~Bn, n &= ~mc, l.suspendedLanes |= n, l.pingedLanes &= ~n, c && (l.warmLanes |= n), c = l.expirationTimes;
    for (var s = n; 0 < s; ) {
      var r = 31 - Ql(s), m = 1 << r;
      c[r] = -1, s &= ~m;
    }
    u !== 0 && lf(l, u, n);
  }
  function yc() {
    return (nt & 6) === 0 ? (us(0), !1) : !0;
  }
  function ri() {
    if (Ye !== null) {
      if (ut === 0)
        var l = Ye.return;
      else
        l = Ye, Ia = du = null, zr(l), uc = null, so = 0, l = Ye;
      for (; l !== null; )
        zm(l.alternate, l), l = l.return;
      Ye = null;
    }
  }
  function Yn(l, n) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, zv(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), ri(), ht = l, Ye = u = Wa(l.current, null), we = n, ut = 0, Il = null, _n = !1, go = sn(l, n), wm = !1, bo = _a = Bn = mc = Tu = _t = 0, Pl = So = null, Gm = !1, (n & 8) !== 0 && (n |= n & 32);
    var c = l.entangledLanes;
    if (c !== 0)
      for (l = l.entanglements, c &= n; 0 < c; ) {
        var s = 31 - Ql(c), r = 1 << s;
        n |= l[s], c &= ~r;
      }
    return Su = n, $a(), u;
  }
  function Zm(l, n) {
    xe = null, z.H = Vr, n === ti || n === Cf ? (n = $h(), ut = 3) : n === vr ? (n = $h(), ut = 4) : ut = n === Ht ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Il = n, Ye === null && (_t = 1, $f(
      l,
      fa(n, l.current)
    ));
  }
  function Pp() {
    var l = z.H;
    return z.H = Vr, l === null ? Vr : l;
  }
  function pc() {
    var l = z.A;
    return z.A = Ym, l;
  }
  function vc() {
    _t = 4, _n || (we & 4194048) !== we && da.current !== null || (go = !0), (Tu & 134217727) === 0 && (mc & 134217727) === 0 || ht === null || Eu(
      ht,
      we,
      _a,
      !1
    );
  }
  function rd(l, n, u) {
    var c = nt;
    nt |= 2;
    var s = Pp(), r = pc();
    (ht !== l || we !== n) && (To = null, Yn(l, n)), n = !1;
    var m = _t;
    e: do
      try {
        if (ut !== 0 && Ye !== null) {
          var y = Ye, b = Il;
          switch (ut) {
            case 8:
              ri(), m = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              da.current === null && (n = !0);
              var M = ut;
              if (ut = 0, Il = null, Ro(l, y, b, M), u && go) {
                m = 0;
                break e;
              }
              break;
            default:
              M = ut, ut = 0, Il = null, Ro(l, y, b, M);
          }
        }
        dd(), m = _t;
        break;
      } catch (G) {
        Zm(l, G);
      }
    while (!0);
    return n && l.shellSuspendCounter++, Ia = du = null, nt = c, z.H = s, z.A = r, Ye === null && (ht = null, we = 0, $a()), m;
  }
  function dd() {
    for (; Ye !== null; ) km(Ye);
  }
  function Jm(l, n) {
    var u = nt;
    nt |= 2;
    var c = Pp(), s = pc();
    ht !== l || we !== n ? (To = null, od = ua() + 500, Yn(l, n)) : go = sn(
      l,
      n
    );
    e: do
      try {
        if (ut !== 0 && Ye !== null) {
          n = Ye;
          var r = Il;
          t: switch (ut) {
            case 1:
              ut = 0, Il = null, Ro(l, n, r, 1);
              break;
            case 2:
            case 9:
              if (br(r)) {
                ut = 0, Il = null, $m(n);
                break;
              }
              n = function() {
                ut !== 2 && ut !== 9 || ht !== l || (ut = 7), ea(l);
              }, r.then(n, n);
              break e;
            case 3:
              ut = 7;
              break e;
            case 4:
              ut = 5;
              break e;
            case 7:
              br(r) ? (ut = 0, Il = null, $m(n)) : (ut = 0, Il = null, Ro(l, n, r, 7));
              break;
            case 5:
              var m = null;
              switch (Ye.tag) {
                case 26:
                  m = Ye.memoizedState;
                case 5:
                case 27:
                  var y = Ye;
                  if (!m || cy(m)) {
                    ut = 0, Il = null;
                    var b = y.sibling;
                    if (b !== null) Ye = b;
                    else {
                      var M = y.return;
                      M !== null ? (Ye = M, ls(M)) : Ye = null;
                    }
                    break t;
                  }
              }
              ut = 0, Il = null, Ro(l, n, r, 5);
              break;
            case 6:
              ut = 0, Il = null, Ro(l, n, r, 6);
              break;
            case 8:
              ri(), _t = 6;
              break e;
            default:
              throw Error(g(462));
          }
        }
        Km();
        break;
      } catch (G) {
        Zm(l, G);
      }
    while (!0);
    return Ia = du = null, z.H = c, z.A = s, nt = u, Ye !== null ? 0 : (ht = null, we = 0, $a(), _t);
  }
  function Km() {
    for (; Ye !== null && !ov(); )
      km(Ye);
  }
  function km(l) {
    var n = kp(l.alternate, l, Su);
    l.memoizedProps = l.pendingProps, n === null ? ls(l) : Ye = n;
  }
  function $m(l) {
    var n = l, u = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = Tm(
          u,
          n,
          n.pendingProps,
          n.type,
          void 0,
          we
        );
        break;
      case 11:
        n = Tm(
          u,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          we
        );
        break;
      case 5:
        zr(n);
      default:
        zm(u, n), n = Ye = He(n, Su), n = kp(u, n, Su);
    }
    l.memoizedProps = l.pendingProps, n === null ? ls(l) : Ye = n;
  }
  function Ro(l, n, u, c) {
    Ia = du = null, zr(n), uc = null, so = 0;
    var s = n.return;
    try {
      if (Zp(
        l,
        s,
        n,
        u,
        we
      )) {
        _t = 1, $f(
          l,
          fa(u, l.current)
        ), Ye = null;
        return;
      }
    } catch (r) {
      if (s !== null) throw Ye = s, r;
      _t = 1, $f(
        l,
        fa(u, l.current)
      ), Ye = null;
      return;
    }
    n.flags & 32768 ? (Fe || c === 1 ? l = !0 : go || (we & 536870912) !== 0 ? l = !1 : (_n = l = !0, (c === 2 || c === 9 || c === 3 || c === 6) && (c = da.current, c !== null && c.tag === 13 && (c.flags |= 16384))), e0(n, l)) : ls(n);
  }
  function ls(l) {
    var n = l;
    do {
      if ((n.flags & 32768) !== 0) {
        e0(
          n,
          _n
        );
        return;
      }
      l = n.return;
      var u = Rm(
        n.alternate,
        n,
        Su
      );
      if (u !== null) {
        Ye = u;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ye = n;
        return;
      }
      Ye = n = l;
    } while (n !== null);
    _t === 0 && (_t = 5);
  }
  function e0(l, n) {
    do {
      var u = Sv(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, Ye = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !n && (l = l.sibling, l !== null)) {
        Ye = l;
        return;
      }
      Ye = l = u;
    } while (l !== null);
    _t = 6, Ye = null;
  }
  function t0(l, n, u, c, s, r, m, y, b) {
    l.cancelPendingCommit = null;
    do
      md();
    while (pl !== 0);
    if ((nt & 6) !== 0) throw Error(g(327));
    if (n !== null) {
      if (n === l.current) throw Error(g(177));
      if (r = n.lanes | n.childLanes, r |= vn, sp(
        l,
        u,
        r,
        m,
        y,
        b
      ), l === ht && (Ye = ht = null, we = 0), Eo = n, qn = l, vl = u, fd = r, sd = s, Xm = c, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, xv(tf, function() {
        return Wm(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), c = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || c) {
        c = z.T, z.T = null, s = Q.p, Q.p = 2, m = nt, nt |= 4;
        try {
          Mm(l, n, u);
        } finally {
          nt = m, Q.p = s, z.T = c;
        }
      }
      pl = 1, l0(), as(), hd();
    }
  }
  function l0() {
    if (pl === 1) {
      pl = 0;
      var l = qn, n = Eo, u = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || u) {
        u = z.T, z.T = null;
        var c = Q.p;
        Q.p = 2;
        var s = nt;
        nt |= 4;
        try {
          es(n, l);
          var r = hs, m = Yh(l.containerInfo), y = r.focusedElem, b = r.selectionRange;
          if (m !== y && y && y.ownerDocument && Sf(
            y.ownerDocument.documentElement,
            y
          )) {
            if (b !== null && Tf(y)) {
              var M = b.start, G = b.end;
              if (G === void 0 && (G = M), "selectionStart" in y)
                y.selectionStart = M, y.selectionEnd = Math.min(
                  G,
                  y.value.length
                );
              else {
                var X = y.ownerDocument || document, C = X && X.defaultView || window;
                if (C.getSelection) {
                  var N = C.getSelection(), se = y.textContent.length, re = Math.min(b.start, se), tt = b.end === void 0 ? re : Math.min(b.end, se);
                  !N.extend && re > tt && (m = tt, tt = re, re = m);
                  var D = pt(
                    y,
                    re
                  ), A = pt(
                    y,
                    tt
                  );
                  if (D && A && (N.rangeCount !== 1 || N.anchorNode !== D.node || N.anchorOffset !== D.offset || N.focusNode !== A.node || N.focusOffset !== A.offset)) {
                    var O = X.createRange();
                    O.setStart(D.node, D.offset), N.removeAllRanges(), re > tt ? (N.addRange(O), N.extend(A.node, A.offset)) : (O.setEnd(A.node, A.offset), N.addRange(O));
                  }
                }
              }
            }
            for (X = [], N = y; N = N.parentNode; )
              N.nodeType === 1 && X.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof y.focus == "function" && y.focus(), y = 0; y < X.length; y++) {
              var V = X[y];
              V.element.scrollLeft = V.left, V.element.scrollTop = V.top;
            }
          }
          gs = !!ds, hs = ds = null;
        } finally {
          nt = s, Q.p = c, z.T = u;
        }
      }
      l.current = n, pl = 2;
    }
  }
  function as() {
    if (pl === 2) {
      pl = 0;
      var l = qn, n = Eo, u = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || u) {
        u = z.T, z.T = null;
        var c = Q.p;
        Q.p = 2;
        var s = nt;
        nt |= 4;
        try {
          Um(l, n.alternate, n);
        } finally {
          nt = s, Q.p = c, z.T = u;
        }
      }
      pl = 3;
    }
  }
  function hd() {
    if (pl === 4 || pl === 3) {
      pl = 0, Oi();
      var l = qn, n = Eo, u = vl, c = Xm;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? pl = 5 : (pl = 0, Eo = qn = null, a0(l, l.pendingLanes));
      var s = l.pendingLanes;
      if (s === 0 && (si = null), Xs(u), n = n.stateNode, Cl && typeof Cl.onCommitFiberRoot == "function")
        try {
          Cl.onCommitFiberRoot(
            qc,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (c !== null) {
        n = z.T, s = Q.p, Q.p = 2, z.T = null;
        try {
          for (var r = l.onRecoverableError, m = 0; m < c.length; m++) {
            var y = c[m];
            r(y.value, {
              componentStack: y.stack
            });
          }
        } finally {
          z.T = n, Q.p = s;
        }
      }
      (vl & 3) !== 0 && md(), ea(l), s = l.pendingLanes, (u & 4194090) !== 0 && (s & 42) !== 0 ? l === Qm ? xo++ : (xo = 0, Qm = l) : xo = 0, us(0);
    }
  }
  function a0(l, n) {
    (l.pooledCacheLanes &= n) === 0 && (n = l.pooledCache, n != null && (l.pooledCache = null, Tn(n)));
  }
  function md(l) {
    return l0(), as(), hd(), Wm();
  }
  function Wm() {
    if (pl !== 5) return !1;
    var l = qn, n = fd;
    fd = 0;
    var u = Xs(vl), c = z.T, s = Q.p;
    try {
      Q.p = 32 > u ? 32 : u, z.T = null, u = sd, sd = null;
      var r = qn, m = vl;
      if (pl = 0, Eo = qn = null, vl = 0, (nt & 6) !== 0) throw Error(g(331));
      var y = nt;
      if (nt |= 4, Bm(r.current), jm(
        r,
        r.current,
        m,
        u
      ), nt = y, us(0, !1), Cl && typeof Cl.onPostCommitFiberRoot == "function")
        try {
          Cl.onPostCommitFiberRoot(qc, r);
        } catch {
        }
      return !0;
    } finally {
      Q.p = s, z.T = c, a0(l, n);
    }
  }
  function Fm(l, n, u) {
    n = fa(u, n), n = bm(l.stateNode, n, 2), l = An(l, n, 2), l !== null && (Ui(l, 2), ea(l));
  }
  function ct(l, n, u) {
    if (l.tag === 3)
      Fm(l, l, u);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Fm(
            n,
            l,
            u
          );
          break;
        } else if (n.tag === 1) {
          var c = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (si === null || !si.has(c))) {
            l = fa(u, l), u = Sm(2), c = An(n, u, 2), c !== null && (Fl(
              u,
              c,
              n,
              l
            ), Ui(c, 2), ea(c));
            break;
          }
        }
        n = n.return;
      }
  }
  function yd(l, n, u) {
    var c = l.pingCache;
    if (c === null) {
      c = l.pingCache = new Fp();
      var s = /* @__PURE__ */ new Set();
      c.set(n, s);
    } else
      s = c.get(n), s === void 0 && (s = /* @__PURE__ */ new Set(), c.set(n, s));
    s.has(u) || (wm = !0, s.add(u), l = Im.bind(null, l, n, u), n.then(l, l));
  }
  function Im(l, n, u) {
    var c = l.pingCache;
    c !== null && c.delete(n), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, ht === l && (we & u) === u && (_t === 4 || _t === 3 && (we & 62914560) === we && 300 > ua() - Vm ? (nt & 2) === 0 && Yn(l, 0) : Bn |= u, bo === we && (bo = 0)), ea(l);
  }
  function Pm(l, n) {
    n === 0 && (n = Mi()), l = gn(l, n), l !== null && (Ui(l, n), ea(l));
  }
  function Tv(l) {
    var n = l.memoizedState, u = 0;
    n !== null && (u = n.retryLane), Pm(l, u);
  }
  function Ev(l, n) {
    var u = 0;
    switch (l.tag) {
      case 13:
        var c = l.stateNode, s = l.memoizedState;
        s !== null && (u = s.retryLane);
        break;
      case 19:
        c = l.stateNode;
        break;
      case 22:
        c = l.stateNode._retryCache;
        break;
      default:
        throw Error(g(314));
    }
    c !== null && c.delete(n), Pm(l, u);
  }
  function xv(l, n) {
    return Oe(l, n);
  }
  var pd = null, di = null, ns = !1, zo = !1, vd = !1, hi = 0;
  function ea(l) {
    l !== di && l.next === null && (di === null ? pd = di = l : di = di.next = l), zo = !0, ns || (ns = !0, i0());
  }
  function us(l, n) {
    if (!vd && zo) {
      vd = !0;
      do
        for (var u = !1, c = pd; c !== null; ) {
          if (l !== 0) {
            var s = c.pendingLanes;
            if (s === 0) var r = 0;
            else {
              var m = c.suspendedLanes, y = c.pingedLanes;
              r = (1 << 31 - Ql(42 | l) + 1) - 1, r &= s & ~(m & ~y), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (u = !0, cs(c, r));
          } else
            r = we, r = _u(
              c,
              c === ht ? r : 0,
              c.cancelPendingCommit !== null || c.timeoutHandle !== -1
            ), (r & 3) === 0 || sn(c, r) || (u = !0, cs(c, r));
          c = c.next;
        }
      while (u);
      vd = !1;
    }
  }
  function n0() {
    is();
  }
  function is() {
    zo = ns = !1;
    var l = 0;
    hi !== 0 && (Ru() && (l = hi), hi = 0);
    for (var n = ua(), u = null, c = pd; c !== null; ) {
      var s = c.next, r = ey(c, n);
      r === 0 ? (c.next = null, u === null ? pd = s : u.next = s, s === null && (di = u)) : (u = c, (l !== 0 || (r & 3) !== 0) && (zo = !0)), c = s;
    }
    us(l);
  }
  function ey(l, n) {
    for (var u = l.suspendedLanes, c = l.pingedLanes, s = l.expirationTimes, r = l.pendingLanes & -62914561; 0 < r; ) {
      var m = 31 - Ql(r), y = 1 << m, b = s[m];
      b === -1 ? ((y & u) === 0 || (y & c) !== 0) && (s[m] = tl(y, n)) : b <= n && (l.expiredLanes |= y), r &= ~y;
    }
    if (n = ht, u = we, u = _u(
      l,
      l === n ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c = l.callbackNode, u === 0 || l === n && (ut === 2 || ut === 9) || l.cancelPendingCommit !== null)
      return c !== null && c !== null && Xa(c), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || sn(l, u)) {
      if (n = u & -u, n === l.callbackPriority) return n;
      switch (c !== null && Xa(c), Xs(u)) {
        case 2:
        case 8:
          u = sh;
          break;
        case 32:
          u = tf;
          break;
        case 268435456:
          u = Bc;
          break;
        default:
          u = tf;
      }
      return c = u0.bind(null, l), u = Oe(u, c), l.callbackPriority = n, l.callbackNode = u, n;
    }
    return c !== null && c !== null && Xa(c), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function u0(l, n) {
    if (pl !== 0 && pl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (md() && l.callbackNode !== u)
      return null;
    var c = we;
    return c = _u(
      l,
      l === ht ? c : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c === 0 ? null : (Ao(l, c, n), ey(l, ua()), l.callbackNode != null && l.callbackNode === u ? u0.bind(null, l) : null);
  }
  function cs(l, n) {
    if (md()) return null;
    Ao(l, n, !0);
  }
  function i0() {
    Dv(function() {
      (nt & 6) !== 0 ? Oe(
        cp,
        n0
      ) : is();
    });
  }
  function gc() {
    return hi === 0 && (hi = Bu()), hi;
  }
  function gd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : df("" + l);
  }
  function os(l, n) {
    var u = n.ownerDocument.createElement("input");
    return u.name = n.name, u.value = n.value, l.id && u.setAttribute("form", l.id), n.parentNode.insertBefore(u, n), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function c0(l, n, u, c, s) {
    if (n === "submit" && u && u.stateNode === s) {
      var r = gd(
        (s[Hl] || null).action
      ), m = c.submitter;
      m && (n = (n = m[Hl] || null) ? gd(n.formAction) : m.getAttribute("formAction"), n !== null && (r = n, m = null));
      var y = new er(
        "action",
        "action",
        null,
        c,
        s
      );
      l.push({
        event: y,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (c.defaultPrevented) {
                if (hi !== 0) {
                  var b = m ? os(s, m) : new FormData(s);
                  Gr(
                    u,
                    {
                      pending: !0,
                      data: b,
                      method: s.method,
                      action: r
                    },
                    null,
                    b
                  );
                }
              } else
                typeof r == "function" && (y.preventDefault(), b = m ? os(s, m) : new FormData(s), Gr(
                  u,
                  {
                    pending: !0,
                    data: b,
                    method: s.method,
                    action: r
                  },
                  r,
                  b
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var Bt = 0; Bt < Kc.length; Bt++) {
    var fs = Kc[Bt], Av = fs.toLowerCase(), Ce = fs[0].toUpperCase() + fs.slice(1);
    Ra(
      Av,
      "on" + Ce
    );
  }
  Ra(Up, "onAnimationEnd"), Ra(wh, "onAnimationIteration"), Ra(Cp, "onAnimationStart"), Ra("dblclick", "onDoubleClick"), Ra("focusin", "onFocus"), Ra("focusout", "onBlur"), Ra(Gh, "onTransitionRun"), Ra(fr, "onTransitionStart"), Ra(Hp, "onTransitionCancel"), Ra(Vh, "onTransitionEnd"), wu("onMouseEnter", ["mouseout", "mouseover"]), wu("onMouseLeave", ["mouseout", "mouseover"]), wu("onPointerEnter", ["pointerout", "pointerover"]), wu("onPointerLeave", ["pointerout", "pointerover"]), Yu(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Yu(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Yu("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Yu(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Yu(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Yu(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ss = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), mi = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ss)
  );
  function bc(l, n) {
    n = (n & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var c = l[u], s = c.event;
      c = c.listeners;
      e: {
        var r = void 0;
        if (n)
          for (var m = c.length - 1; 0 <= m; m--) {
            var y = c[m], b = y.instance, M = y.currentTarget;
            if (y = y.listener, b !== r && s.isPropagationStopped())
              break e;
            r = y, s.currentTarget = M;
            try {
              r(s);
            } catch (G) {
              Kf(G);
            }
            s.currentTarget = null, r = b;
          }
        else
          for (m = 0; m < c.length; m++) {
            if (y = c[m], b = y.instance, M = y.currentTarget, y = y.listener, b !== r && s.isPropagationStopped())
              break e;
            r = y, s.currentTarget = M;
            try {
              r(s);
            } catch (G) {
              Kf(G);
            }
            s.currentTarget = null, r = b;
          }
      }
    }
  }
  function Ae(l, n) {
    var u = n[Qs];
    u === void 0 && (u = n[Qs] = /* @__PURE__ */ new Set());
    var c = l + "__bubble";
    u.has(c) || (bd(n, l, 2, !1), u.add(c));
  }
  function Do(l, n, u) {
    var c = 0;
    n && (c |= 4), bd(
      u,
      l,
      c,
      n
    );
  }
  var Oo = "_reactListening" + Math.random().toString(36).slice(2);
  function ty(l) {
    if (!l[Oo]) {
      l[Oo] = !0, cf.forEach(function(u) {
        u !== "selectionchange" && (mi.has(u) || Do(u, !1, l), Do(u, !0, l));
      });
      var n = l.nodeType === 9 ? l : l.ownerDocument;
      n === null || n[Oo] || (n[Oo] = !0, Do("selectionchange", !1, n));
    }
  }
  function bd(l, n, u, c) {
    switch (py(n)) {
      case 2:
        var s = p0;
        break;
      case 8:
        s = v0;
        break;
      default:
        s = my;
    }
    u = s.bind(
      null,
      n,
      u,
      l
    ), s = void 0, !Fs || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (s = !0), c ? s !== void 0 ? l.addEventListener(n, u, {
      capture: !0,
      passive: s
    }) : l.addEventListener(n, u, !0) : s !== void 0 ? l.addEventListener(n, u, {
      passive: s
    }) : l.addEventListener(n, u, !1);
  }
  function Ba(l, n, u, c, s) {
    var r = c;
    if ((n & 1) === 0 && (n & 2) === 0 && c !== null)
      e: for (; ; ) {
        if (c === null) return;
        var m = c.tag;
        if (m === 3 || m === 4) {
          var y = c.stateNode.containerInfo;
          if (y === s) break;
          if (m === 4)
            for (m = c.return; m !== null; ) {
              var b = m.tag;
              if ((b === 3 || b === 4) && m.stateNode.containerInfo === s)
                return;
              m = m.return;
            }
          for (; y !== null; ) {
            if (m = rl(y), m === null) return;
            if (b = m.tag, b === 5 || b === 6 || b === 26 || b === 27) {
              c = r = m;
              continue e;
            }
            y = y.parentNode;
          }
        }
        c = c.return;
      }
    Lc(function() {
      var M = r, G = Ws(u), X = [];
      e: {
        var C = Xh.get(l);
        if (C !== void 0) {
          var N = er, se = l;
          switch (l) {
            case "keypress":
              if (dl(u) === 0) break e;
            case "keydown":
            case "keyup":
              N = La;
              break;
            case "focusin":
              se = "focus", N = xh;
              break;
            case "focusout":
              se = "blur", N = xh;
              break;
            case "beforeblur":
            case "afterblur":
              N = xh;
              break;
            case "click":
              if (u.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = Eh;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = Tp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = zh;
              break;
            case Up:
            case wh:
            case Cp:
              N = pv;
              break;
            case Vh:
              N = zp;
              break;
            case "scroll":
            case "scrollend":
              N = bp;
              break;
            case "wheel":
              N = Xi;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = yf;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = pf;
              break;
            case "toggle":
            case "beforetoggle":
              N = Dp;
          }
          var re = (n & 4) !== 0, tt = !re && (l === "scroll" || l === "scrollend"), D = re ? C !== null ? C + "Capture" : null : C;
          re = [];
          for (var A = M, O; A !== null; ) {
            var V = A;
            if (O = V.stateNode, V = V.tag, V !== 5 && V !== 26 && V !== 27 || O === null || D === null || (V = Yi(A, D), V != null && re.push(
              xu(A, V, O)
            )), tt) break;
            A = A.return;
          }
          0 < re.length && (C = new N(
            C,
            se,
            null,
            u,
            G
          ), X.push({ event: C, listeners: re }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (C = l === "mouseover" || l === "pointerover", N = l === "mouseout" || l === "pointerout", C && u !== qi && (se = u.relatedTarget || u.fromElement) && (rl(se) || se[wc]))
            break e;
          if ((N || C) && (C = G.window === G ? G : (C = G.ownerDocument) ? C.defaultView || C.parentWindow : window, N ? (se = u.relatedTarget || u.toElement, N = M, se = se ? rl(se) : null, se !== null && (tt = ie(se), re = se.tag, se !== tt || re !== 5 && re !== 27 && re !== 6) && (se = null)) : (N = null, se = M), N !== se)) {
            if (re = Eh, V = "onMouseLeave", D = "onMouseEnter", A = "mouse", (l === "pointerout" || l === "pointerover") && (re = pf, V = "onPointerLeave", D = "onPointerEnter", A = "pointer"), tt = N == null ? C : uf(N), O = se == null ? C : uf(se), C = new re(
              V,
              A + "leave",
              N,
              u,
              G
            ), C.target = tt, C.relatedTarget = O, V = null, rl(G) === M && (re = new re(
              D,
              A + "enter",
              se,
              u,
              G
            ), re.target = O, re.relatedTarget = tt, V = re), tt = V, N && se)
              t: {
                for (re = N, D = se, A = 0, O = re; O; O = yi(O))
                  A++;
                for (O = 0, V = D; V; V = yi(V))
                  O++;
                for (; 0 < A - O; )
                  re = yi(re), A--;
                for (; 0 < O - A; )
                  D = yi(D), O--;
                for (; A--; ) {
                  if (re === D || D !== null && re === D.alternate)
                    break t;
                  re = yi(re), D = yi(D);
                }
                re = null;
              }
            else re = null;
            N !== null && rs(
              X,
              C,
              N,
              re,
              !1
            ), se !== null && tt !== null && rs(
              X,
              tt,
              se,
              re,
              !0
            );
          }
        }
        e: {
          if (C = M ? uf(M) : window, N = C.nodeName && C.nodeName.toLowerCase(), N === "select" || N === "input" && C.type === "file")
            var te = Hh;
          else if (ur(C))
            if (Nh)
              te = Bh;
            else {
              te = Zu;
              var Ne = cr;
            }
          else
            N = C.nodeName, !N || N.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? M && Bi(M.elementType) && (te = Hh) : te = ou;
          if (te && (te = te(l, M))) {
            ir(
              X,
              te,
              u,
              G
            );
            break e;
          }
          Ne && Ne(l, C, M), l === "focusout" && M && C.type === "number" && M.memoizedProps.value != null && sf(C, "number", C.value);
        }
        switch (Ne = M ? uf(M) : window, l) {
          case "focusin":
            (ur(Ne) || Ne.contentEditable === "true") && (yn = Ne, Ka = M, ku = null);
            break;
          case "focusout":
            ku = Ka = yn = null;
            break;
          case "mousedown":
            Ki = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ki = !1, or(X, u, G);
            break;
          case "selectionchange":
            if (Ji) break;
          case "keydown":
          case "keyup":
            or(X, u, G);
        }
        var oe;
        if (vf)
          e: {
            switch (l) {
              case "compositionstart":
                var ye = "onCompositionStart";
                break e;
              case "compositionend":
                ye = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ye = "onCompositionUpdate";
                break e;
            }
            ye = void 0;
          }
        else
          Lu ? bf(l, u) && (ye = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (ye = "onCompositionStart");
        ye && (hn && u.locale !== "ko" && (Lu || ye !== "onCompositionStart" ? ye === "onCompositionEnd" && Lu && (oe = Sh()) : (iu = G, Zc = "value" in iu ? iu.value : iu.textContent, Lu = !0)), Ne = Mo(M, ye), 0 < Ne.length && (ye = new Ah(
          ye,
          l,
          null,
          u,
          G
        ), X.push({ event: ye, listeners: Ne }), oe ? ye.data = oe : (oe = Qu(u), oe !== null && (ye.data = oe)))), (oe = Oh ? Uh(l, u) : Qi(l, u)) && (ye = Mo(M, "onBeforeInput"), 0 < ye.length && (Ne = new Ah(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          G
        ), X.push({
          event: Ne,
          listeners: ye
        }), Ne.data = oe)), c0(
          X,
          l,
          M,
          u,
          G
        );
      }
      bc(X, n);
    });
  }
  function xu(l, n, u) {
    return {
      instance: l,
      listener: n,
      currentTarget: u
    };
  }
  function Mo(l, n) {
    for (var u = n + "Capture", c = []; l !== null; ) {
      var s = l, r = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || r === null || (s = Yi(l, u), s != null && c.unshift(
        xu(l, s, r)
      ), s = Yi(l, n), s != null && c.push(
        xu(l, s, r)
      )), l.tag === 3) return c;
      l = l.return;
    }
    return [];
  }
  function yi(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function rs(l, n, u, c, s) {
    for (var r = n._reactName, m = []; u !== null && u !== c; ) {
      var y = u, b = y.alternate, M = y.stateNode;
      if (y = y.tag, b !== null && b === c) break;
      y !== 5 && y !== 26 && y !== 27 || M === null || (b = M, s ? (M = Yi(u, r), M != null && m.unshift(
        xu(u, M, b)
      )) : s || (M = Yi(u, r), M != null && m.push(
        xu(u, M, b)
      ))), u = u.return;
    }
    m.length !== 0 && l.push({ event: n, listeners: m });
  }
  var ya = /\r\n?/g, ly = /\u0000|\uFFFD/g;
  function o0(l) {
    return (typeof l == "string" ? l : "" + l).replace(ya, `
`).replace(ly, "");
  }
  function ay(l, n) {
    return n = o0(n), o0(l) === n;
  }
  function Sd() {
  }
  function Te(l, n, u, c, s, r) {
    switch (u) {
      case "children":
        typeof c == "string" ? n === "body" || n === "textarea" && c === "" || Vc(l, c) : (typeof c == "number" || typeof c == "bigint") && n !== "body" && Vc(l, "" + c);
        break;
      case "className":
        of(l, "class", c);
        break;
      case "tabIndex":
        of(l, "tabindex", c);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        of(l, u, c);
        break;
      case "style":
        rf(l, c, r);
        break;
      case "data":
        if (n !== "object") {
          of(l, "data", c);
          break;
        }
      case "src":
      case "href":
        if (c === "" && (n !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (c == null || typeof c == "function" || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = df("" + c), l.setAttribute(u, c);
        break;
      case "action":
      case "formAction":
        if (typeof c == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" && (u === "formAction" ? (n !== "input" && Te(l, n, "name", s.name, s, null), Te(
            l,
            n,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Te(
            l,
            n,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Te(
            l,
            n,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Te(l, n, "encType", s.encType, s, null), Te(l, n, "method", s.method, s, null), Te(l, n, "target", s.target, s, null)));
        if (c == null || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = df("" + c), l.setAttribute(u, c);
        break;
      case "onClick":
        c != null && (l.onclick = Sd);
        break;
      case "onScroll":
        c != null && Ae("scroll", l);
        break;
      case "onScrollEnd":
        c != null && Ae("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(g(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(g(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "muted":
        l.muted = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (c == null || typeof c == "function" || typeof c == "boolean" || typeof c == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = df("" + c), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          u
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "" + c) : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        c && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        c === !0 ? l.setAttribute(u, "") : c !== !1 && c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        c != null && typeof c != "function" && typeof c != "symbol" && !isNaN(c) && 1 <= c ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        c == null || typeof c == "function" || typeof c == "symbol" || isNaN(c) ? l.removeAttribute(u) : l.setAttribute(u, c);
        break;
      case "popover":
        Ae("beforetoggle", l), Ae("toggle", l), nu(l, "popover", c);
        break;
      case "xlinkActuate":
        rn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          c
        );
        break;
      case "xlinkArcrole":
        rn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          c
        );
        break;
      case "xlinkRole":
        rn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          c
        );
        break;
      case "xlinkShow":
        rn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          c
        );
        break;
      case "xlinkTitle":
        rn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          c
        );
        break;
      case "xlinkType":
        rn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          c
        );
        break;
      case "xmlBase":
        rn(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          c
        );
        break;
      case "xmlLang":
        rn(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          c
        );
        break;
      case "xmlSpace":
        rn(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          c
        );
        break;
      case "is":
        nu(l, "is", c);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = hv.get(u) || u, nu(l, u, c));
    }
  }
  function j(l, n, u, c, s, r) {
    switch (u) {
      case "style":
        rf(l, c, r);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(g(61));
          if (u = c.__html, u != null) {
            if (s.children != null) throw Error(g(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof c == "string" ? Vc(l, c) : (typeof c == "number" || typeof c == "bigint") && Vc(l, "" + c);
        break;
      case "onScroll":
        c != null && Ae("scroll", l);
        break;
      case "onScrollEnd":
        c != null && Ae("scrollend", l);
        break;
      case "onClick":
        c != null && (l.onclick = Sd);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!ca.hasOwnProperty(u))
          e: {
            if (u[0] === "o" && u[1] === "n" && (s = u.endsWith("Capture"), n = u.slice(2, s ? u.length - 7 : void 0), r = l[Hl] || null, r = r != null ? r[u] : null, typeof r == "function" && l.removeEventListener(n, r, s), typeof c == "function")) {
              typeof r != "function" && r !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(n, c, s);
              break e;
            }
            u in l ? l[u] = c : c === !0 ? l.setAttribute(u, "") : nu(l, u, c);
          }
    }
  }
  function ve(l, n, u) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Ae("error", l), Ae("load", l);
        var c = !1, s = !1, r;
        for (r in u)
          if (u.hasOwnProperty(r)) {
            var m = u[r];
            if (m != null)
              switch (r) {
                case "src":
                  c = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(g(137, n));
                default:
                  Te(l, n, r, m, u, null);
              }
          }
        s && Te(l, n, "srcSet", u.srcSet, u, null), c && Te(l, n, "src", u.src, u, null);
        return;
      case "input":
        Ae("invalid", l);
        var y = r = m = s = null, b = null, M = null;
        for (c in u)
          if (u.hasOwnProperty(c)) {
            var G = u[c];
            if (G != null)
              switch (c) {
                case "name":
                  s = G;
                  break;
                case "type":
                  m = G;
                  break;
                case "checked":
                  b = G;
                  break;
                case "defaultChecked":
                  M = G;
                  break;
                case "value":
                  r = G;
                  break;
                case "defaultValue":
                  y = G;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (G != null)
                    throw Error(g(137, n));
                  break;
                default:
                  Te(l, n, c, G, u, null);
              }
          }
        ks(
          l,
          r,
          y,
          b,
          M,
          m,
          s,
          !1
        ), Vu(l);
        return;
      case "select":
        Ae("invalid", l), c = m = r = null;
        for (s in u)
          if (u.hasOwnProperty(s) && (y = u[s], y != null))
            switch (s) {
              case "value":
                r = y;
                break;
              case "defaultValue":
                m = y;
                break;
              case "multiple":
                c = y;
              default:
                Te(l, n, s, y, u, null);
            }
        n = r, u = m, l.multiple = !!c, n != null ? _i(l, !!c, n, !1) : u != null && _i(l, !!c, u, !0);
        return;
      case "textarea":
        Ae("invalid", l), r = s = c = null;
        for (m in u)
          if (u.hasOwnProperty(m) && (y = u[m], y != null))
            switch (m) {
              case "value":
                c = y;
                break;
              case "defaultValue":
                s = y;
                break;
              case "children":
                r = y;
                break;
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(g(91));
                break;
              default:
                Te(l, n, m, y, u, null);
            }
        gh(l, c, s, r), Vu(l);
        return;
      case "option":
        for (b in u)
          if (u.hasOwnProperty(b) && (c = u[b], c != null))
            switch (b) {
              case "selected":
                l.selected = c && typeof c != "function" && typeof c != "symbol";
                break;
              default:
                Te(l, n, b, c, u, null);
            }
        return;
      case "dialog":
        Ae("beforetoggle", l), Ae("toggle", l), Ae("cancel", l), Ae("close", l);
        break;
      case "iframe":
      case "object":
        Ae("load", l);
        break;
      case "video":
      case "audio":
        for (c = 0; c < ss.length; c++)
          Ae(ss[c], l);
        break;
      case "image":
        Ae("error", l), Ae("load", l);
        break;
      case "details":
        Ae("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        Ae("error", l), Ae("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (M in u)
          if (u.hasOwnProperty(M) && (c = u[M], c != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(g(137, n));
              default:
                Te(l, n, M, c, u, null);
            }
        return;
      default:
        if (Bi(n)) {
          for (G in u)
            u.hasOwnProperty(G) && (c = u[G], c !== void 0 && j(
              l,
              n,
              G,
              c,
              u,
              void 0
            ));
          return;
        }
    }
    for (y in u)
      u.hasOwnProperty(y) && (c = u[y], c != null && Te(l, n, y, c, u, null));
  }
  function Rv(l, n, u, c) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, r = null, m = null, y = null, b = null, M = null, G = null;
        for (N in u) {
          var X = u[N];
          if (u.hasOwnProperty(N) && X != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                b = X;
              default:
                c.hasOwnProperty(N) || Te(l, n, N, null, c, X);
            }
        }
        for (var C in c) {
          var N = c[C];
          if (X = u[C], c.hasOwnProperty(C) && (N != null || X != null))
            switch (C) {
              case "type":
                r = N;
                break;
              case "name":
                s = N;
                break;
              case "checked":
                M = N;
                break;
              case "defaultChecked":
                G = N;
                break;
              case "value":
                m = N;
                break;
              case "defaultValue":
                y = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(g(137, n));
                break;
              default:
                N !== X && Te(
                  l,
                  n,
                  C,
                  N,
                  c,
                  X
                );
            }
        }
        Ks(
          l,
          m,
          y,
          b,
          M,
          G,
          r,
          s
        );
        return;
      case "select":
        N = m = y = C = null;
        for (r in u)
          if (b = u[r], u.hasOwnProperty(r) && b != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                N = b;
              default:
                c.hasOwnProperty(r) || Te(
                  l,
                  n,
                  r,
                  null,
                  c,
                  b
                );
            }
        for (s in c)
          if (r = c[s], b = u[s], c.hasOwnProperty(s) && (r != null || b != null))
            switch (s) {
              case "value":
                C = r;
                break;
              case "defaultValue":
                y = r;
                break;
              case "multiple":
                m = r;
              default:
                r !== b && Te(
                  l,
                  n,
                  s,
                  r,
                  c,
                  b
                );
            }
        n = y, u = m, c = N, C != null ? _i(l, !!u, C, !1) : !!c != !!u && (n != null ? _i(l, !!u, n, !0) : _i(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        N = C = null;
        for (y in u)
          if (s = u[y], u.hasOwnProperty(y) && s != null && !c.hasOwnProperty(y))
            switch (y) {
              case "value":
                break;
              case "children":
                break;
              default:
                Te(l, n, y, null, c, s);
            }
        for (m in c)
          if (s = c[m], r = u[m], c.hasOwnProperty(m) && (s != null || r != null))
            switch (m) {
              case "value":
                C = s;
                break;
              case "defaultValue":
                N = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(g(91));
                break;
              default:
                s !== r && Te(l, n, m, s, c, r);
            }
        vh(l, C, N);
        return;
      case "option":
        for (var se in u)
          if (C = u[se], u.hasOwnProperty(se) && C != null && !c.hasOwnProperty(se))
            switch (se) {
              case "selected":
                l.selected = !1;
                break;
              default:
                Te(
                  l,
                  n,
                  se,
                  null,
                  c,
                  C
                );
            }
        for (b in c)
          if (C = c[b], N = u[b], c.hasOwnProperty(b) && C !== N && (C != null || N != null))
            switch (b) {
              case "selected":
                l.selected = C && typeof C != "function" && typeof C != "symbol";
                break;
              default:
                Te(
                  l,
                  n,
                  b,
                  C,
                  c,
                  N
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var re in u)
          C = u[re], u.hasOwnProperty(re) && C != null && !c.hasOwnProperty(re) && Te(l, n, re, null, c, C);
        for (M in c)
          if (C = c[M], N = u[M], c.hasOwnProperty(M) && C !== N && (C != null || N != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(g(137, n));
                break;
              default:
                Te(
                  l,
                  n,
                  M,
                  C,
                  c,
                  N
                );
            }
        return;
      default:
        if (Bi(n)) {
          for (var tt in u)
            C = u[tt], u.hasOwnProperty(tt) && C !== void 0 && !c.hasOwnProperty(tt) && j(
              l,
              n,
              tt,
              void 0,
              c,
              C
            );
          for (G in c)
            C = c[G], N = u[G], !c.hasOwnProperty(G) || C === N || C === void 0 && N === void 0 || j(
              l,
              n,
              G,
              C,
              c,
              N
            );
          return;
        }
    }
    for (var D in u)
      C = u[D], u.hasOwnProperty(D) && C != null && !c.hasOwnProperty(D) && Te(l, n, D, null, c, C);
    for (X in c)
      C = c[X], N = u[X], !c.hasOwnProperty(X) || C === N || C == null && N == null || Te(l, n, X, C, c, N);
  }
  var ds = null, hs = null;
  function qa(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Au(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Uo(l, n) {
    if (l === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && n === "foreignObject" ? 0 : l;
  }
  function wn(l, n) {
    return l === "textarea" || l === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Co = null;
  function Ru() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Co ? !1 : (Co = l, !0) : (Co = null, !1);
  }
  var Td = typeof setTimeout == "function" ? setTimeout : void 0, zv = typeof clearTimeout == "function" ? clearTimeout : void 0, f0 = typeof Promise == "function" ? Promise : void 0, Dv = typeof queueMicrotask == "function" ? queueMicrotask : typeof f0 < "u" ? function(l) {
    return f0.resolve(null).then(l).catch(Gn);
  } : Td;
  function Gn(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function pi(l) {
    return l === "head";
  }
  function Ed(l, n) {
    var u = n, c = 0, s = 0;
    do {
      var r = u.nextSibling;
      if (l.removeChild(u), r && r.nodeType === 8)
        if (u = r.data, u === "/$") {
          if (0 < c && 8 > c) {
            u = c;
            var m = l.ownerDocument;
            if (u & 1 && ta(m.documentElement), u & 2 && ta(m.body), u & 4)
              for (u = m.head, ta(u), m = u.firstChild; m; ) {
                var y = m.nextSibling, b = m.nodeName;
                m[ae] || b === "SCRIPT" || b === "STYLE" || b === "LINK" && m.rel.toLowerCase() === "stylesheet" || u.removeChild(m), m = y;
              }
          }
          if (s === 0) {
            l.removeChild(r), Xn(n);
            return;
          }
          s--;
        } else
          u === "$" || u === "$?" || u === "$!" ? s++ : c = u.charCodeAt(0) - 48;
      else c = 0;
      u = r;
    } while (u);
    Xn(n);
  }
  function ms(l) {
    var n = l.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var u = n;
      switch (n = n.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ms(u), nf(u);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function Ho(l, n, u, c) {
    for (; l.nodeType === 1; ) {
      var s = u;
      if (l.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!c && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (c) {
        if (!l[ae])
          switch (n) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (r = l.getAttribute("rel"), r === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (r !== s.rel || l.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || l.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (r = l.getAttribute("src"), (r !== (s.src == null ? null : s.src) || l.getAttribute("type") !== (s.type == null ? null : s.type) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && r && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (n === "input" && l.type === "hidden") {
        var r = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && l.getAttribute("name") === r)
          return l;
      } else return l;
      if (l = an(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Ov(l, n, u) {
    if (n === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = an(l.nextSibling), l === null)) return null;
    return l;
  }
  function ys(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
  }
  function Mv(l, n) {
    var u = l.ownerDocument;
    if (l.data !== "$?" || u.readyState === "complete")
      n();
    else {
      var c = function() {
        n(), u.removeEventListener("DOMContentLoaded", c);
      };
      u.addEventListener("DOMContentLoaded", c), l._reactRetry = c;
    }
  }
  function an(l) {
    for (; l != null; l = l.nextSibling) {
      var n = l.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = l.data, n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F")
          break;
        if (n === "/$") return null;
      }
    }
    return l;
  }
  var vi = null;
  function gl(l) {
    l = l.previousSibling;
    for (var n = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (n === 0) return l;
          n--;
        } else u === "/$" && n++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function I(l, n, u) {
    switch (n = qa(u), l) {
      case "html":
        if (l = n.documentElement, !l) throw Error(g(452));
        return l;
      case "head":
        if (l = n.head, !l) throw Error(g(453));
        return l;
      case "body":
        if (l = n.body, !l) throw Error(g(454));
        return l;
      default:
        throw Error(g(451));
    }
  }
  function ta(l) {
    for (var n = l.attributes; n.length; )
      l.removeAttributeNode(n[0]);
    nf(l);
  }
  var qt = /* @__PURE__ */ new Map(), Dl = /* @__PURE__ */ new Set();
  function xd(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var zu = Q.d;
  Q.d = {
    f: Ad,
    r: Rd,
    D: Du,
    C: zd,
    L: gi,
    m: Ol,
    X: bi,
    S: la,
    M: ny
  };
  function Ad() {
    var l = zu.f(), n = yc();
    return l || n;
  }
  function Rd(l) {
    var n = Ci(l);
    n !== null && n.tag === 5 && n.type === "form" ? fo(n) : zu.r(l);
  }
  var bl = typeof document > "u" ? null : document;
  function nn(l, n, u) {
    var c = bl;
    if (c && typeof n == "string" && n) {
      var s = xa(n);
      s = 'link[rel="' + l + '"][href="' + s + '"]', typeof u == "string" && (s += '[crossorigin="' + u + '"]'), Dl.has(s) || (Dl.add(s), l = { rel: l, crossOrigin: u, href: n }, c.querySelector(s) === null && (n = c.createElement("link"), ve(n, "link", l), Kt(n), c.head.appendChild(n)));
    }
  }
  function Du(l) {
    zu.D(l), nn("dns-prefetch", l, null);
  }
  function zd(l, n) {
    zu.C(l, n), nn("preconnect", l, n);
  }
  function gi(l, n, u) {
    zu.L(l, n, u);
    var c = bl;
    if (c && l && n) {
      var s = 'link[rel="preload"][as="' + xa(n) + '"]';
      n === "image" && u && u.imageSrcSet ? (s += '[imagesrcset="' + xa(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (s += '[imagesizes="' + xa(
        u.imageSizes
      ) + '"]')) : s += '[href="' + xa(l) + '"]';
      var r = s;
      switch (n) {
        case "style":
          r = No(l);
          break;
        case "script":
          r = Ya(l);
      }
      qt.has(r) || (l = be(
        {
          rel: "preload",
          href: n === "image" && u && u.imageSrcSet ? void 0 : l,
          as: n
        },
        u
      ), qt.set(r, l), c.querySelector(s) !== null || n === "style" && c.querySelector(jo(r)) || n === "script" && c.querySelector(Sc(r)) || (n = c.createElement("link"), ve(n, "link", l), Kt(n), c.head.appendChild(n)));
    }
  }
  function Ol(l, n) {
    zu.m(l, n);
    var u = bl;
    if (u && l) {
      var c = n && typeof n.as == "string" ? n.as : "script", s = 'link[rel="modulepreload"][as="' + xa(c) + '"][href="' + xa(l) + '"]', r = s;
      switch (c) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = Ya(l);
      }
      if (!qt.has(r) && (l = be({ rel: "modulepreload", href: l }, n), qt.set(r, l), u.querySelector(s) === null)) {
        switch (c) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(Sc(r)))
              return;
        }
        c = u.createElement("link"), ve(c, "link", l), Kt(c), u.head.appendChild(c);
      }
    }
  }
  function la(l, n, u) {
    zu.S(l, n, u);
    var c = bl;
    if (c && l) {
      var s = au(c).hoistableStyles, r = No(l);
      n = n || "default";
      var m = s.get(r);
      if (!m) {
        var y = { loading: 0, preload: null };
        if (m = c.querySelector(
          jo(r)
        ))
          y.loading = 5;
        else {
          l = be(
            { rel: "stylesheet", href: l, "data-precedence": n },
            u
          ), (u = qt.get(r)) && Od(l, u);
          var b = m = c.createElement("link");
          Kt(b), ve(b, "link", l), b._p = new Promise(function(M, G) {
            b.onload = M, b.onerror = G;
          }), b.addEventListener("load", function() {
            y.loading |= 1;
          }), b.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, Dd(m, n, c);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: y
        }, s.set(r, m);
      }
    }
  }
  function bi(l, n) {
    zu.X(l, n);
    var u = bl;
    if (u && l) {
      var c = au(u).hoistableScripts, s = Ya(l), r = c.get(s);
      r || (r = u.querySelector(Sc(s)), r || (l = be({ src: l, async: !0 }, n), (n = qt.get(s)) && Md(l, n), r = u.createElement("script"), Kt(r), ve(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function ny(l, n) {
    zu.M(l, n);
    var u = bl;
    if (u && l) {
      var c = au(u).hoistableScripts, s = Ya(l), r = c.get(s);
      r || (r = u.querySelector(Sc(s)), r || (l = be({ src: l, async: !0, type: "module" }, n), (n = qt.get(s)) && Md(l, n), r = u.createElement("script"), Kt(r), ve(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, c.set(s, r));
    }
  }
  function s0(l, n, u, c) {
    var s = (s = qe.current) ? xd(s) : null;
    if (!s) throw Error(g(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (n = No(u.href), u = au(
          s
        ).hoistableStyles, c = u.get(n), c || (c = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = No(u.href);
          var r = au(
            s
          ).hoistableStyles, m = r.get(l);
          if (m || (s = s.ownerDocument || s, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(l, m), (r = s.querySelector(
            jo(l)
          )) && !r._p && (m.instance = r, m.state.loading = 5), qt.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, qt.set(l, u), r || r0(
            s,
            l,
            u,
            m.state
          ))), n && c === null)
            throw Error(g(528, ""));
          return m;
        }
        if (n && c !== null)
          throw Error(g(529, ""));
        return null;
      case "script":
        return n = u.async, u = u.src, typeof u == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Ya(u), u = au(
          s
        ).hoistableScripts, c = u.get(n), c || (c = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(g(444, l));
    }
  }
  function No(l) {
    return 'href="' + xa(l) + '"';
  }
  function jo(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function _o(l) {
    return be({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function r0(l, n, u, c) {
    l.querySelector('link[rel="preload"][as="style"][' + n + "]") ? c.loading = 1 : (n = l.createElement("link"), c.preload = n, n.addEventListener("load", function() {
      return c.loading |= 1;
    }), n.addEventListener("error", function() {
      return c.loading |= 2;
    }), ve(n, "link", u), Kt(n), l.head.appendChild(n));
  }
  function Ya(l) {
    return '[src="' + xa(l) + '"]';
  }
  function Sc(l) {
    return "script[async]" + l;
  }
  function d0(l, n, u) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var c = l.querySelector(
            'style[data-href~="' + xa(u.href) + '"]'
          );
          if (c)
            return n.instance = c, Kt(c), c;
          var s = be({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return c = (l.ownerDocument || l).createElement(
            "style"
          ), Kt(c), ve(c, "style", s), Dd(c, u.precedence, l), n.instance = c;
        case "stylesheet":
          s = No(u.href);
          var r = l.querySelector(
            jo(s)
          );
          if (r)
            return n.state.loading |= 4, n.instance = r, Kt(r), r;
          c = _o(u), (s = qt.get(s)) && Od(c, s), r = (l.ownerDocument || l).createElement("link"), Kt(r);
          var m = r;
          return m._p = new Promise(function(y, b) {
            m.onload = y, m.onerror = b;
          }), ve(r, "link", c), n.state.loading |= 4, Dd(r, u.precedence, l), n.instance = r;
        case "script":
          return r = Ya(u.src), (s = l.querySelector(
            Sc(r)
          )) ? (n.instance = s, Kt(s), s) : (c = u, (s = qt.get(r)) && (c = be({}, u), Md(c, s)), l = l.ownerDocument || l, s = l.createElement("script"), Kt(s), ve(s, "link", c), l.head.appendChild(s), n.instance = s);
        case "void":
          return null;
        default:
          throw Error(g(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (c = n.instance, n.state.loading |= 4, Dd(c, u.precedence, l));
    return n.instance;
  }
  function Dd(l, n, u) {
    for (var c = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = c.length ? c[c.length - 1] : null, r = s, m = 0; m < c.length; m++) {
      var y = c[m];
      if (y.dataset.precedence === n) r = y;
      else if (r !== s) break;
    }
    r ? r.parentNode.insertBefore(l, r.nextSibling) : (n = u.nodeType === 9 ? u.head : u, n.insertBefore(l, n.firstChild));
  }
  function Od(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.title == null && (l.title = n.title);
  }
  function Md(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.integrity == null && (l.integrity = n.integrity);
  }
  var Si = null;
  function uy(l, n, u) {
    if (Si === null) {
      var c = /* @__PURE__ */ new Map(), s = Si = /* @__PURE__ */ new Map();
      s.set(u, c);
    } else
      s = Si, c = s.get(u), c || (c = /* @__PURE__ */ new Map(), s.set(u, c));
    if (c.has(l)) return c;
    for (c.set(l, null), u = u.getElementsByTagName(l), s = 0; s < u.length; s++) {
      var r = u[s];
      if (!(r[ae] || r[ll] || l === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = r.getAttribute(n) || "";
        m = l + m;
        var y = c.get(m);
        y ? y.push(r) : c.set(m, [r]);
      }
    }
    return c;
  }
  function iy(l, n, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      n === "title" ? l.querySelector("head > title") : null
    );
  }
  function h0(l, n, u) {
    if (u === 1 || n.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return l = n.disabled, typeof n.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function cy(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  var Bo = null;
  function m0() {
  }
  function y0(l, n, u) {
    if (Bo === null) throw Error(g(475));
    var c = Bo;
    if (n.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = No(u.href), r = l.querySelector(
          jo(s)
        );
        if (r) {
          l = r._p, l !== null && typeof l == "object" && typeof l.then == "function" && (c.count++, c = ps.bind(c), l.then(c, c)), n.state.loading |= 4, n.instance = r, Kt(r);
          return;
        }
        r = l.ownerDocument || l, u = _o(u), (s = qt.get(s)) && Od(u, s), r = r.createElement("link"), Kt(r);
        var m = r;
        m._p = new Promise(function(y, b) {
          m.onload = y, m.onerror = b;
        }), ve(r, "link", u), n.instance = r;
      }
      c.stylesheets === null && (c.stylesheets = /* @__PURE__ */ new Map()), c.stylesheets.set(n, l), (l = n.state.preload) && (n.state.loading & 3) === 0 && (c.count++, n = ps.bind(c), l.addEventListener("load", n), l.addEventListener("error", n));
    }
  }
  function oy() {
    if (Bo === null) throw Error(g(475));
    var l = Bo;
    return l.stylesheets && l.count === 0 && vs(l, l.stylesheets), 0 < l.count ? function(n) {
      var u = setTimeout(function() {
        if (l.stylesheets && vs(l, l.stylesheets), l.unsuspend) {
          var c = l.unsuspend;
          l.unsuspend = null, c();
        }
      }, 6e4);
      return l.unsuspend = n, function() {
        l.unsuspend = null, clearTimeout(u);
      };
    } : null;
  }
  function ps() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) vs(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var qo = null;
  function vs(l, n) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, qo = /* @__PURE__ */ new Map(), n.forEach(pa, l), qo = null, ps.call(l));
  }
  function pa(l, n) {
    if (!(n.state.loading & 4)) {
      var u = qo.get(l);
      if (u) var c = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), qo.set(l, u);
        for (var s = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < s.length; r++) {
          var m = s[r];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (u.set(m.dataset.precedence, m), c = m);
        }
        c && u.set(null, c);
      }
      s = n.instance, m = s.getAttribute("data-precedence"), r = u.get(m) || c, r === c && u.set(null, s), u.set(m, s), this.count++, c = ps.bind(this), s.addEventListener("load", c), s.addEventListener("error", c), r ? r.parentNode.insertBefore(s, r.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(s, l.firstChild)), n.state.loading |= 4;
    }
  }
  var aa = {
    $$typeof: ft,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function Uv(l, n, u, c, s, r, m, y) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = qu(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qu(0), this.hiddenUpdates = qu(null), this.identifierPrefix = c, this.onUncaughtError = s, this.onCaughtError = r, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function fy(l, n, u, c, s, r, m, y, b, M, G, X) {
    return l = new Uv(
      l,
      n,
      u,
      m,
      y,
      b,
      M,
      X
    ), n = 1, r === !0 && (n |= 24), r = Jl(3, null, null, n), l.current = r, r.stateNode = l, n = no(), n.refCount++, l.pooledCache = n, n.refCount++, r.memoizedState = {
      element: c,
      isDehydrated: u,
      cache: n
    }, Sr(r), l;
  }
  function sy(l) {
    return l ? (l = Wc, l) : Wc;
  }
  function ry(l, n, u, c, s, r) {
    s = sy(s), c.context === null ? c.context = s : c.pendingContext = s, c = kl(n), c.payload = { element: u }, r = r === void 0 ? null : r, r !== null && (c.callback = r), u = An(l, c, n), u !== null && (ma(u, l, n), Pi(u, l, n));
  }
  function dy(l, n) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < n ? u : n;
    }
  }
  function Ud(l, n) {
    dy(l, n), (l = l.alternate) && dy(l, n);
  }
  function hy(l) {
    if (l.tag === 13) {
      var n = gn(l, 67108864);
      n !== null && ma(n, l, 67108864), Ud(l, 67108864);
    }
  }
  var gs = !0;
  function p0(l, n, u, c) {
    var s = z.T;
    z.T = null;
    var r = Q.p;
    try {
      Q.p = 2, my(l, n, u, c);
    } finally {
      Q.p = r, z.T = s;
    }
  }
  function v0(l, n, u, c) {
    var s = z.T;
    z.T = null;
    var r = Q.p;
    try {
      Q.p = 8, my(l, n, u, c);
    } finally {
      Q.p = r, z.T = s;
    }
  }
  function my(l, n, u, c) {
    if (gs) {
      var s = Cd(c);
      if (s === null)
        Ba(
          l,
          n,
          c,
          Hd,
          u
        ), Tc(l, c);
      else if (b0(
        s,
        l,
        n,
        u,
        c
      ))
        c.stopPropagation();
      else if (Tc(l, c), n & 4 && -1 < g0.indexOf(l)) {
        for (; s !== null; ) {
          var r = Ci(s);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var m = ia(r.pendingLanes);
                  if (m !== 0) {
                    var y = r;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; m; ) {
                      var b = 1 << 31 - Ql(m);
                      y.entanglements[1] |= b, m &= ~b;
                    }
                    ea(r), (nt & 6) === 0 && (od = ua() + 500, us(0));
                  }
                }
                break;
              case 13:
                y = gn(r, 2), y !== null && ma(y, r, 2), yc(), Ud(r, 2);
            }
          if (r = Cd(c), r === null && Ba(
            l,
            n,
            c,
            Hd,
            u
          ), r === s) break;
          s = r;
        }
        s !== null && c.stopPropagation();
      } else
        Ba(
          l,
          n,
          c,
          null,
          u
        );
    }
  }
  function Cd(l) {
    return l = Ws(l), yy(l);
  }
  var Hd = null;
  function yy(l) {
    if (Hd = null, l = rl(l), l !== null) {
      var n = ie(l);
      if (n === null) l = null;
      else {
        var u = n.tag;
        if (u === 13) {
          if (l = Xe(n), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          l = null;
        } else n !== l && (l = null);
      }
    }
    return Hd = l, null;
  }
  function py(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (ef()) {
          case cp:
            return 2;
          case sh:
            return 8;
          case tf:
          case rh:
            return 32;
          case Bc:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Yo = !1, Vn = null, Ou = null, Mu = null, bs = /* @__PURE__ */ new Map(), Ss = /* @__PURE__ */ new Map(), Ti = [], g0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Tc(l, n) {
    switch (l) {
      case "focusin":
      case "focusout":
        Vn = null;
        break;
      case "dragenter":
      case "dragleave":
        Ou = null;
        break;
      case "mouseover":
      case "mouseout":
        Mu = null;
        break;
      case "pointerover":
      case "pointerout":
        bs.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ss.delete(n.pointerId);
    }
  }
  function Ec(l, n, u, c, s, r) {
    return l === null || l.nativeEvent !== r ? (l = {
      blockedOn: n,
      domEventName: u,
      eventSystemFlags: c,
      nativeEvent: r,
      targetContainers: [s]
    }, n !== null && (n = Ci(n), n !== null && hy(n)), l) : (l.eventSystemFlags |= c, n = l.targetContainers, s !== null && n.indexOf(s) === -1 && n.push(s), l);
  }
  function b0(l, n, u, c, s) {
    switch (n) {
      case "focusin":
        return Vn = Ec(
          Vn,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "dragenter":
        return Ou = Ec(
          Ou,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "mouseover":
        return Mu = Ec(
          Mu,
          l,
          n,
          u,
          c,
          s
        ), !0;
      case "pointerover":
        var r = s.pointerId;
        return bs.set(
          r,
          Ec(
            bs.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
      case "gotpointercapture":
        return r = s.pointerId, Ss.set(
          r,
          Ec(
            Ss.get(r) || null,
            l,
            n,
            u,
            c,
            s
          )
        ), !0;
    }
    return !1;
  }
  function vy(l) {
    var n = rl(l.target);
    if (n !== null) {
      var u = ie(n);
      if (u !== null) {
        if (n = u.tag, n === 13) {
          if (n = Xe(u), n !== null) {
            l.blockedOn = n, rv(l.priority, function() {
              if (u.tag === 13) {
                var c = ha();
                c = Qa(c);
                var s = gn(u, c);
                s !== null && ma(s, u, c), Ud(u, c);
              }
            });
            return;
          }
        } else if (n === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Ts(l) {
    if (l.blockedOn !== null) return !1;
    for (var n = l.targetContainers; 0 < n.length; ) {
      var u = Cd(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var c = new u.constructor(
          u.type,
          u
        );
        qi = c, u.target.dispatchEvent(c), qi = null;
      } else
        return n = Ci(u), n !== null && hy(n), l.blockedOn = u, !1;
      n.shift();
    }
    return !0;
  }
  function Es(l, n, u) {
    Ts(l) && u.delete(n);
  }
  function wo() {
    Yo = !1, Vn !== null && Ts(Vn) && (Vn = null), Ou !== null && Ts(Ou) && (Ou = null), Mu !== null && Ts(Mu) && (Mu = null), bs.forEach(Es), Ss.forEach(Es);
  }
  function Nd(l, n) {
    l.blockedOn === n && (l.blockedOn = null, Yo || (Yo = !0, R.unstable_scheduleCallback(
      R.unstable_NormalPriority,
      wo
    )));
  }
  var xc = null;
  function gy(l) {
    xc !== l && (xc = l, R.unstable_scheduleCallback(
      R.unstable_NormalPriority,
      function() {
        xc === l && (xc = null);
        for (var n = 0; n < l.length; n += 3) {
          var u = l[n], c = l[n + 1], s = l[n + 2];
          if (typeof c != "function") {
            if (yy(c || u) === null)
              continue;
            break;
          }
          var r = Ci(u);
          r !== null && (l.splice(n, 3), n -= 3, Gr(
            r,
            {
              pending: !0,
              data: s,
              method: u.method,
              action: c
            },
            c,
            s
          ));
        }
      }
    ));
  }
  function Xn(l) {
    function n(b) {
      return Nd(b, l);
    }
    Vn !== null && Nd(Vn, l), Ou !== null && Nd(Ou, l), Mu !== null && Nd(Mu, l), bs.forEach(n), Ss.forEach(n);
    for (var u = 0; u < Ti.length; u++) {
      var c = Ti[u];
      c.blockedOn === l && (c.blockedOn = null);
    }
    for (; 0 < Ti.length && (u = Ti[0], u.blockedOn === null); )
      vy(u), u.blockedOn === null && Ti.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (c = 0; c < u.length; c += 3) {
        var s = u[c], r = u[c + 1], m = s[Hl] || null;
        if (typeof r == "function")
          m || gy(u);
        else if (m) {
          var y = null;
          if (r && r.hasAttribute("formAction")) {
            if (s = r, m = r[Hl] || null)
              y = m.formAction;
            else if (yy(s) !== null) continue;
          } else y = m.action;
          typeof y == "function" ? u[c + 1] = y : (u.splice(c, 3), c -= 3), gy(u);
        }
      }
  }
  function by(l) {
    this._internalRoot = l;
  }
  jd.prototype.render = by.prototype.render = function(l) {
    var n = this._internalRoot;
    if (n === null) throw Error(g(409));
    var u = n.current, c = ha();
    ry(u, c, l, n, null, null);
  }, jd.prototype.unmount = by.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var n = l.containerInfo;
      ry(l.current, 2, null, l, null, null), yc(), n[wc] = null;
    }
  };
  function jd(l) {
    this._internalRoot = l;
  }
  jd.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var n = rp();
      l = { blockedOn: null, target: l, priority: n };
      for (var u = 0; u < Ti.length && n !== 0 && n < Ti[u].priority; u++) ;
      Ti.splice(u, 0, l), u === 0 && vy(l);
    }
  };
  var Sy = L.version;
  if (Sy !== "19.1.1")
    throw Error(
      g(
        527,
        Sy,
        "19.1.1"
      )
    );
  Q.findDOMNode = function(l) {
    var n = l._reactInternals;
    if (n === void 0)
      throw typeof l.render == "function" ? Error(g(188)) : (l = Object.keys(l).join(","), Error(g(268, l)));
    return l = Z(n), l = l !== null ? Qe(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Yl = {
    bundleType: 0,
    version: "19.1.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.1.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var xs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!xs.isDisabled && xs.supportsFiber)
      try {
        qc = xs.inject(
          Yl
        ), Cl = xs;
      } catch {
      }
  }
  return lp.createRoot = function(l, n) {
    if (!k(l)) throw Error(g(299));
    var u = !1, c = "", s = ho, r = vm, m = kf, y = null;
    return n != null && (n.unstable_strictMode === !0 && (u = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (r = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (y = n.unstable_transitionCallbacks)), n = fy(
      l,
      1,
      !1,
      null,
      null,
      u,
      c,
      s,
      r,
      m,
      y,
      null
    ), l[wc] = n.current, ty(l), new by(n);
  }, lp.hydrateRoot = function(l, n, u) {
    if (!k(l)) throw Error(g(299));
    var c = !1, s = "", r = ho, m = vm, y = kf, b = null, M = null;
    return u != null && (u.unstable_strictMode === !0 && (c = !0), u.identifierPrefix !== void 0 && (s = u.identifierPrefix), u.onUncaughtError !== void 0 && (r = u.onUncaughtError), u.onCaughtError !== void 0 && (m = u.onCaughtError), u.onRecoverableError !== void 0 && (y = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (b = u.unstable_transitionCallbacks), u.formState !== void 0 && (M = u.formState)), n = fy(
      l,
      1,
      !0,
      n,
      u ?? null,
      c,
      s,
      r,
      m,
      y,
      b,
      M
    ), n.context = sy(null), u = n.current, c = ha(), c = Qa(c), s = kl(c), s.callback = null, An(u, s, c), u = c, n.current.lanes = u, Ui(n, u), ea(n), l[wc] = n.current, ty(l), new jd(n);
  }, lp.version = "19.1.1", lp;
}
var ap = {};
/**
 * @license React
 * react-dom-client.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var N1;
function a2() {
  return N1 || (N1 = 1, process.env.NODE_ENV !== "production" && (function() {
    function R(e, t) {
      for (e = e.memoizedState; e !== null && 0 < t; )
        e = e.next, t--;
      return e;
    }
    function L(e, t, a, i) {
      if (a >= t.length) return i;
      var o = t[a], f = Te(e) ? e.slice() : Ce({}, e);
      return f[o] = L(e[o], t, a + 1, i), f;
    }
    function J(e, t, a) {
      if (t.length !== a.length)
        console.warn("copyWithRename() expects paths of the same length");
      else {
        for (var i = 0; i < a.length - 1; i++)
          if (t[i] !== a[i]) {
            console.warn(
              "copyWithRename() expects paths to be the same except for the deepest key"
            );
            return;
          }
        return g(e, t, a, 0);
      }
    }
    function g(e, t, a, i) {
      var o = t[i], f = Te(e) ? e.slice() : Ce({}, e);
      return i + 1 === t.length ? (f[a[i]] = f[o], Te(f) ? f.splice(o, 1) : delete f[o]) : f[o] = g(
        e[o],
        t,
        a,
        i + 1
      ), f;
    }
    function k(e, t, a) {
      var i = t[a], o = Te(e) ? e.slice() : Ce({}, e);
      return a + 1 === t.length ? (Te(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = k(e[i], t, a + 1), o);
    }
    function ie() {
      return !1;
    }
    function Xe() {
      return null;
    }
    function De() {
    }
    function Z() {
      console.error(
        "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
      );
    }
    function Qe() {
      console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      );
    }
    function be() {
    }
    function P(e) {
      var t = [];
      return e.forEach(function(a) {
        t.push(a);
      }), t.sort().join(", ");
    }
    function ee(e, t, a, i) {
      return new gf(e, t, a, i);
    }
    function de(e, t) {
      e.context === Go && (ct(e.current, 2, t, e, null, null), fc());
    }
    function Se(e, t) {
      if (Ln !== null) {
        var a = t.staleFamilies;
        t = t.updatedFamilies, mo(), vf(
          e.current,
          t,
          a
        ), fc();
      }
    }
    function bt(e) {
      Ln = e;
    }
    function $e(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function Je(e) {
      var t = e, a = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? a : null;
    }
    function sl(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function ft(e) {
      if (Je(e) !== e)
        throw Error("Unable to find node on an unmounted component.");
    }
    function it(e) {
      var t = e.alternate;
      if (!t) {
        if (t = Je(e), t === null)
          throw Error("Unable to find node on an unmounted component.");
        return t !== e ? null : e;
      }
      for (var a = e, i = t; ; ) {
        var o = a.return;
        if (o === null) break;
        var f = o.alternate;
        if (f === null) {
          if (i = o.return, i !== null) {
            a = i;
            continue;
          }
          break;
        }
        if (o.child === f.child) {
          for (f = o.child; f; ) {
            if (f === a) return ft(o), e;
            if (f === i) return ft(o), t;
            f = f.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (a.return !== i.return) a = o, i = f;
        else {
          for (var d = !1, h = o.child; h; ) {
            if (h === a) {
              d = !0, a = o, i = f;
              break;
            }
            if (h === i) {
              d = !0, i = o, a = f;
              break;
            }
            h = h.sibling;
          }
          if (!d) {
            for (h = f.child; h; ) {
              if (h === a) {
                d = !0, a = f, i = o;
                break;
              }
              if (h === i) {
                d = !0, i = f, a = o;
                break;
              }
              h = h.sibling;
            }
            if (!d)
              throw Error(
                "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
              );
          }
        }
        if (a.alternate !== i)
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
      }
      if (a.tag !== 3)
        throw Error("Unable to find node on an unmounted component.");
      return a.stateNode.current === a ? e : t;
    }
    function Qt(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = Qt(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    function Ie(e) {
      return e === null || typeof e != "object" ? null : (e = ay && e[ay] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function Be(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Sd ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case Ae:
          return "Fragment";
        case Oo:
          return "Profiler";
        case Do:
          return "StrictMode";
        case Mo:
          return "Suspense";
        case yi:
          return "SuspenseList";
        case ly:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case bc:
            return "Portal";
          case Ba:
            return (e.displayName || "Context") + ".Provider";
          case bd:
            return (e._context.displayName || "Context") + ".Consumer";
          case xu:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case rs:
            return t = e.displayName || null, t !== null ? t : Be(e.type) || "Memo";
          case ya:
            t = e._payload, e = e._init;
            try {
              return Be(e(t));
            } catch {
            }
        }
      return null;
    }
    function Yt(e) {
      return typeof e.tag == "number" ? ce(e) : typeof e.name == "string" ? e.name : null;
    }
    function ce(e) {
      var t = e.type;
      switch (e.tag) {
        case 31:
          return "Activity";
        case 24:
          return "Cache";
        case 9:
          return (t._context.displayName || "Context") + ".Consumer";
        case 10:
          return (t.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 26:
        case 27:
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Be(t);
        case 8:
          return t === Do ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 14:
        case 15:
          if (typeof t == "function")
            return t.displayName || t.name || null;
          if (typeof t == "string") return t;
          break;
        case 29:
          if (t = e._debugInfo, t != null) {
            for (var a = t.length - 1; 0 <= a; a--)
              if (typeof t[a].name == "string") return t[a].name;
          }
          if (e.return !== null)
            return ce(e.return);
      }
      return null;
    }
    function yt(e) {
      return { current: e };
    }
    function We(e, t) {
      0 > qa ? console.error("Unexpected pop.") : (t !== hs[qa] && console.error("Unexpected Fiber popped."), e.current = ds[qa], ds[qa] = null, hs[qa] = null, qa--);
    }
    function pe(e, t, a) {
      qa++, ds[qa] = e.current, hs[qa] = a, e.current = t;
    }
    function Mt(e) {
      return e === null && console.error(
        "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
      ), e;
    }
    function Lt(e, t) {
      pe(wn, t, e), pe(Uo, e, e), pe(Au, null, e);
      var a = t.nodeType;
      switch (a) {
        case 9:
        case 11:
          a = a === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? ut(t) : Nc;
          break;
        default:
          if (a = t.tagName, t = t.namespaceURI)
            t = ut(t), t = Il(
              t,
              a
            );
          else
            switch (a) {
              case "svg":
                t = oh;
                break;
              case "math":
                t = $0;
                break;
              default:
                t = Nc;
            }
      }
      a = a.toLowerCase(), a = vh(null, a), a = {
        context: t,
        ancestorInfo: a
      }, We(Au, e), pe(Au, a, e);
    }
    function St(e) {
      We(Au, e), We(Uo, e), We(wn, e);
    }
    function z() {
      return Mt(Au.current);
    }
    function Q(e) {
      e.memoizedState !== null && pe(Co, e, e);
      var t = Mt(Au.current), a = e.type, i = Il(t.context, a);
      a = vh(t.ancestorInfo, a), i = { context: i, ancestorInfo: a }, t !== i && (pe(Uo, e, e), pe(Au, i, e));
    }
    function $(e) {
      Uo.current === e && (We(Au, e), We(Uo, e)), Co.current === e && (We(Co, e), Iy._currentValue = Vs);
    }
    function fe(e) {
      return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
    }
    function _(e) {
      try {
        return le(e), !1;
      } catch {
        return !0;
      }
    }
    function le(e) {
      return "" + e;
    }
    function F(e, t) {
      if (_(e))
        return console.error(
          "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          fe(e)
        ), le(e);
    }
    function he(e, t) {
      if (_(e))
        return console.error(
          "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          fe(e)
        ), le(e);
    }
    function Ue(e) {
      if (_(e))
        return console.error(
          "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
          fe(e)
        ), le(e);
    }
    function Ke(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled) return !0;
      if (!t.supportsFiber)
        return console.error(
          "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
        ), !0;
      try {
        vi = t.inject(e), gl = t;
      } catch (a) {
        console.error("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function qe(e) {
      if (typeof Mv == "function" && an(e), gl && typeof gl.setStrictMode == "function")
        try {
          gl.setStrictMode(vi, e);
        } catch (t) {
          ta || (ta = !0, console.error(
            "React instrumentation encountered an error: %s",
            t
          ));
        }
    }
    function fn(e) {
      I = e;
    }
    function Tt() {
      I !== null && typeof I.markCommitStopped == "function" && I.markCommitStopped();
    }
    function Zt(e) {
      I !== null && typeof I.markComponentRenderStarted == "function" && I.markComponentRenderStarted(e);
    }
    function Xl() {
      I !== null && typeof I.markComponentRenderStopped == "function" && I.markComponentRenderStopped();
    }
    function eu(e) {
      I !== null && typeof I.markRenderStarted == "function" && I.markRenderStarted(e);
    }
    function Di() {
      I !== null && typeof I.markRenderStopped == "function" && I.markRenderStopped();
    }
    function Oe(e, t) {
      I !== null && typeof I.markStateUpdateScheduled == "function" && I.markStateUpdateScheduled(e, t);
    }
    function Xa(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (xd(e) / zu | 0) | 0;
    }
    function ov(e) {
      if (e & 1) return "SyncHydrationLane";
      if (e & 2) return "Sync";
      if (e & 4) return "InputContinuousHydration";
      if (e & 8) return "InputContinuous";
      if (e & 16) return "DefaultHydration";
      if (e & 32) return "Default";
      if (e & 128) return "TransitionHydration";
      if (e & 4194048) return "Transition";
      if (e & 62914560) return "Retry";
      if (e & 67108864) return "SelectiveHydration";
      if (e & 134217728) return "IdleHydration";
      if (e & 268435456) return "Idle";
      if (e & 536870912) return "Offscreen";
      if (e & 1073741824) return "Deferred";
    }
    function Oi(e) {
      var t = e & 42;
      if (t !== 0) return t;
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194048;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), e;
      }
    }
    function ua(e, t, a) {
      var i = e.pendingLanes;
      if (i === 0) return 0;
      var o = 0, f = e.suspendedLanes, d = e.pingedLanes;
      e = e.warmLanes;
      var h = i & 134217727;
      return h !== 0 ? (i = h & ~f, i !== 0 ? o = Oi(i) : (d &= h, d !== 0 ? o = Oi(d) : a || (a = h & ~e, a !== 0 && (o = Oi(a))))) : (h = i & ~f, h !== 0 ? o = Oi(h) : d !== 0 ? o = Oi(d) : a || (a = i & ~e, a !== 0 && (o = Oi(a)))), o === 0 ? 0 : t !== 0 && t !== o && (t & f) === 0 && (f = o & -o, a = t & -t, f >= a || f === 32 && (a & 4194048) !== 0) ? t : o;
    }
    function ef(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function cp(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), -1;
      }
    }
    function sh() {
      var e = Ad;
      return Ad <<= 1, (Ad & 4194048) === 0 && (Ad = 256), e;
    }
    function tf() {
      var e = Rd;
      return Rd <<= 1, (Rd & 62914560) === 0 && (Rd = 4194304), e;
    }
    function rh(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function Bc(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function fv(e, t, a, i, o, f) {
      var d = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var h = e.entanglements, p = e.expirationTimes, v = e.hiddenUpdates;
      for (a = d & ~a; 0 < a; ) {
        var H = 31 - Dl(a), q = 1 << H;
        h[H] = 0, p[H] = -1;
        var U = v[H];
        if (U !== null)
          for (v[H] = null, H = 0; H < U.length; H++) {
            var Y = U[H];
            Y !== null && (Y.lane &= -536870913);
          }
        a &= ~q;
      }
      i !== 0 && op(e, i, 0), f !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(d & ~t));
    }
    function op(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var i = 31 - Dl(t);
      e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | a & 4194090;
    }
    function qc(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var i = 31 - Dl(a), o = 1 << i;
        o & t | e[i] & t && (e[i] |= t), a &= ~o;
      }
    }
    function Cl(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function tu(e, t, a) {
      if (qt)
        for (e = e.pendingUpdatersLaneMap; 0 < a; ) {
          var i = 31 - Dl(a), o = 1 << i;
          e[i].add(t), a &= ~o;
        }
    }
    function Ql(e, t) {
      if (qt)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; 0 < t; ) {
          var o = 31 - Dl(t);
          e = 1 << o, o = a[o], 0 < o.size && (o.forEach(function(f) {
            var d = f.alternate;
            d !== null && i.has(d) || i.add(f);
          }), o.clear()), t &= ~e;
        }
    }
    function dh(e) {
      return e &= -e, bl < e ? nn < e ? (e & 134217727) !== 0 ? Du : zd : nn : bl;
    }
    function fp() {
      var e = ve.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? Du : vd(e.type));
    }
    function sv(e, t) {
      var a = ve.p;
      try {
        return ve.p = e, t();
      } finally {
        ve.p = a;
      }
    }
    function Yc(e) {
      delete e[Ol], delete e[la], delete e[ny], delete e[s0], delete e[No];
    }
    function lu(e) {
      var t = e[Ol];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[bi] || a[Ol]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
            for (e = xo(e); e !== null; ) {
              if (a = e[Ol])
                return a;
              e = xo(e);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function ia(e) {
      if (e = e[Ol] || e[bi]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
          return e;
      }
      return null;
    }
    function _u(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6)
        return e.stateNode;
      throw Error("getNodeFromInstance: Invalid argument.");
    }
    function sn(e) {
      var t = e[jo];
      return t || (t = e[jo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
    }
    function tl(e) {
      e[_o] = !0;
    }
    function Bu(e, t) {
      Mi(e, t), Mi(e + "Capture", t);
    }
    function Mi(e, t) {
      Ya[e] && console.error(
        "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
        e
      ), Ya[e] = t;
      var a = e.toLowerCase();
      for (Sc[a] = e, e === "onDoubleClick" && (Sc.ondblclick = e), e = 0; e < t.length; e++)
        r0.add(t[e]);
    }
    function qu(e, t) {
      d0[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(
        e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
      ), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error(
        "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
      );
    }
    function Ui(e) {
      return Ru.call(Md, e) ? !0 : Ru.call(Od, e) ? !1 : Dd.test(e) ? Md[e] = !0 : (Od[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
    }
    function sp(e, t, a) {
      if (Ui(t)) {
        if (!e.hasAttribute(t)) {
          switch (typeof a) {
            case "symbol":
            case "object":
              return a;
            case "function":
              return a;
            case "boolean":
              if (a === !1) return a;
          }
          return a === void 0 ? void 0 : null;
        }
        return e = e.getAttribute(t), e === "" && a === !0 ? !0 : (F(a, t), e === "" + a ? a : e);
      }
    }
    function lf(e, t, a) {
      if (Ui(t))
        if (a === null) e.removeAttribute(t);
        else {
          switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
              e.removeAttribute(t);
              return;
            case "boolean":
              var i = t.toLowerCase().slice(0, 5);
              if (i !== "data-" && i !== "aria-") {
                e.removeAttribute(t);
                return;
              }
          }
          F(a, t), e.setAttribute(t, "" + a);
        }
    }
    function af(e, t, a) {
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        F(a, t), e.setAttribute(t, "" + a);
      }
    }
    function Qa(e, t, a, i) {
      if (i === null) e.removeAttribute(a);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(a);
            return;
        }
        F(i, a), e.setAttributeNS(t, a, "" + i);
      }
    }
    function Xs() {
    }
    function rp() {
      if (Si === 0) {
        uy = console.log, iy = console.info, h0 = console.warn, cy = console.error, Bo = console.group, m0 = console.groupCollapsed, y0 = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: Xs,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      Si++;
    }
    function rv() {
      if (Si--, Si === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: Ce({}, e, { value: uy }),
          info: Ce({}, e, { value: iy }),
          warn: Ce({}, e, { value: h0 }),
          error: Ce({}, e, { value: cy }),
          group: Ce({}, e, { value: Bo }),
          groupCollapsed: Ce({}, e, { value: m0 }),
          groupEnd: Ce({}, e, { value: y0 })
        });
      }
      0 > Si && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function Jt(e) {
      if (oy === void 0)
        try {
          throw Error();
        } catch (a) {
          var t = a.stack.trim().match(/\n( *(at )?)/);
          oy = t && t[1] || "", ps = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + oy + e + ps;
    }
    function ll(e, t) {
      if (!e || qo) return "";
      var a = vs.get(e);
      if (a !== void 0) return a;
      qo = !0, a = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var i = null;
      i = j.H, j.H = null, rp();
      try {
        var o = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var U = function() {
                  throw Error();
                };
                if (Object.defineProperty(U.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(U, []);
                  } catch (ne) {
                    var Y = ne;
                  }
                  Reflect.construct(e, [], U);
                } else {
                  try {
                    U.call();
                  } catch (ne) {
                    Y = ne;
                  }
                  e.call(U.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (ne) {
                  Y = ne;
                }
                (U = e()) && typeof U.catch == "function" && U.catch(function() {
                });
              }
            } catch (ne) {
              if (ne && Y && typeof ne.stack == "string")
                return [ne.stack, Y.stack];
            }
            return [null, null];
          }
        };
        o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var f = Object.getOwnPropertyDescriptor(
          o.DetermineComponentFrameRoot,
          "name"
        );
        f && f.configurable && Object.defineProperty(
          o.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var d = o.DetermineComponentFrameRoot(), h = d[0], p = d[1];
        if (h && p) {
          var v = h.split(`
`), H = p.split(`
`);
          for (d = f = 0; f < v.length && !v[f].includes(
            "DetermineComponentFrameRoot"
          ); )
            f++;
          for (; d < H.length && !H[d].includes(
            "DetermineComponentFrameRoot"
          ); )
            d++;
          if (f === v.length || d === H.length)
            for (f = v.length - 1, d = H.length - 1; 1 <= f && 0 <= d && v[f] !== H[d]; )
              d--;
          for (; 1 <= f && 0 <= d; f--, d--)
            if (v[f] !== H[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, 0 > d || v[f] !== H[d]) {
                    var q = `
` + v[f].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", e.displayName)), typeof e == "function" && vs.set(e, q), q;
                  }
                while (1 <= f && 0 <= d);
              break;
            }
        }
      } finally {
        qo = !1, j.H = i, rv(), Error.prepareStackTrace = a;
      }
      return v = (v = e ? e.displayName || e.name : "") ? Jt(v) : "", typeof e == "function" && vs.set(e, v), v;
    }
    function Hl(e) {
      var t = Error.prepareStackTrace;
      if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith(`Error: react-stack-top-frame
`) && (e = e.slice(29)), t = e.indexOf(`
`), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf(
        `
`,
        t
      )), t !== -1)
        e = e.slice(0, t);
      else return "";
      return e;
    }
    function wc(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return Jt(e.type);
        case 16:
          return Jt("Lazy");
        case 13:
          return Jt("Suspense");
        case 19:
          return Jt("SuspenseList");
        case 0:
        case 15:
          return ll(e.type, !1);
        case 11:
          return ll(e.type.render, !1);
        case 1:
          return ll(e.type, !0);
        case 31:
          return Jt("Activity");
        default:
          return "";
      }
    }
    function Qs(e) {
      try {
        var t = "";
        do {
          t += wc(e);
          var a = e._debugInfo;
          if (a)
            for (var i = a.length - 1; 0 <= i; i--) {
              var o = a[i];
              if (typeof o.name == "string") {
                var f = t, d = o.env, h = Jt(
                  o.name + (d ? " [" + d + "]" : "")
                );
                t = f + h;
              }
            }
          e = e.return;
        } while (e);
        return t;
      } catch (p) {
        return `
Error generating stack: ` + p.message + `
` + p.stack;
      }
    }
    function dp(e) {
      return (e = e ? e.displayName || e.name : "") ? Jt(e) : "";
    }
    function Ls() {
      if (pa === null) return null;
      var e = pa._debugOwner;
      return e != null ? Yt(e) : null;
    }
    function hp() {
      if (pa === null) return "";
      var e = pa;
      try {
        var t = "";
        switch (e.tag === 6 && (e = e.return), e.tag) {
          case 26:
          case 27:
          case 5:
            t += Jt(e.type);
            break;
          case 13:
            t += Jt("Suspense");
            break;
          case 19:
            t += Jt("SuspenseList");
            break;
          case 31:
            t += Jt("Activity");
            break;
          case 30:
          case 0:
          case 15:
          case 1:
            e._debugOwner || t !== "" || (t += dp(
              e.type
            ));
            break;
          case 11:
            e._debugOwner || t !== "" || (t += dp(
              e.type.render
            ));
        }
        for (; e; )
          if (typeof e.tag == "number") {
            var a = e;
            e = a._debugOwner;
            var i = a._debugStack;
            e && i && (typeof i != "string" && (a._debugStack = i = Hl(i)), i !== "" && (t += `
` + i));
          } else if (e.debugStack != null) {
            var o = e.debugStack;
            (e = e.owner) && o && (t += `
` + Hl(o));
          } else break;
        var f = t;
      } catch (d) {
        f = `
Error generating stack: ` + d.message + `
` + d.stack;
      }
      return f;
    }
    function ae(e, t, a, i, o, f, d) {
      var h = pa;
      nf(e);
      try {
        return e !== null && e._debugTask ? e._debugTask.run(
          t.bind(null, a, i, o, f, d)
        ) : t(a, i, o, f, d);
      } finally {
        nf(h);
      }
      throw Error(
        "runWithFiberInDEV should never be called in production. This is a bug in React."
      );
    }
    function nf(e) {
      j.getCurrentStack = e === null ? null : hp, aa = !1, pa = e;
    }
    function rl(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Ue(e), e;
        default:
          return "";
      }
    }
    function Ci(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function uf(e) {
      var t = Ci(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
        e.constructor.prototype,
        t
      );
      Ue(e[t]);
      var i = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
        var o = a.get, f = a.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(d) {
            Ue(d), i = "" + d, f.call(this, d);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        }), {
          getValue: function() {
            return i;
          },
          setValue: function(d) {
            Ue(d), i = "" + d;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function au(e) {
      e._valueTracker || (e._valueTracker = uf(e));
    }
    function Kt(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var a = t.getValue(), i = "";
      return e && (i = Ci(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== a ? (t.setValue(e), !0) : !1;
    }
    function cf(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function ca(e) {
      return e.replace(
        Uv,
        function(t) {
          return "\\" + t.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function Yu(e, t) {
      t.checked === void 0 || t.defaultChecked === void 0 || sy || (console.error(
        "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Ls() || "A component",
        t.type
      ), sy = !0), t.value === void 0 || t.defaultValue === void 0 || fy || (console.error(
        "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Ls() || "A component",
        t.type
      ), fy = !0);
    }
    function wu(e, t, a, i, o, f, d, h) {
      e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? (F(d, "type"), e.type = d) : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + rl(t)) : e.value !== "" + rl(t) && (e.value = "" + rl(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? Zs(e, d, rl(t)) : a != null ? Zs(e, d, rl(a)) : i != null && e.removeAttribute("value"), o == null && f != null && (e.defaultChecked = !!f), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? (F(h, "name"), e.name = "" + rl(h)) : e.removeAttribute("name");
    }
    function mp(e, t, a, i, o, f, d, h) {
      if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (F(f, "type"), e.type = f), t != null || a != null) {
        if (!(f !== "submit" && f !== "reset" || t != null))
          return;
        a = a != null ? "" + rl(a) : "", t = t != null ? "" + rl(t) : a, h || t === e.value || (e.value = t), e.defaultValue = t;
      }
      i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = h ? e.checked : !!i, e.defaultChecked = !!i, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (F(d, "name"), e.name = d);
    }
    function Zs(e, t, a) {
      t === "number" && cf(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function hh(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? fs.Children.forEach(t.children, function(a) {
        a == null || typeof a == "string" || typeof a == "number" || typeof a == "bigint" || dy || (dy = !0, console.error(
          "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
        ));
      }) : t.dangerouslySetInnerHTML == null || Ud || (Ud = !0, console.error(
        "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
      ))), t.selected == null || ry || (console.error(
        "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
      ), ry = !0);
    }
    function yp() {
      var e = Ls();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    function nu(e, t, a, i) {
      if (e = e.options, t) {
        t = {};
        for (var o = 0; o < a.length; o++)
          t["$" + a[o]] = !0;
        for (a = 0; a < e.length; a++)
          o = t.hasOwnProperty("$" + e[a].value), e[a].selected !== o && (e[a].selected = o), o && i && (e[a].defaultSelected = !0);
      } else {
        for (a = "" + rl(a), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === a) {
            e[o].selected = !0, i && (e[o].defaultSelected = !0);
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function of(e, t) {
      for (e = 0; e < gs.length; e++) {
        var a = gs[e];
        if (t[a] != null) {
          var i = Te(t[a]);
          t.multiple && !i ? console.error(
            "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
            a,
            yp()
          ) : !t.multiple && i && console.error(
            "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
            a,
            yp()
          );
        }
      }
      t.value === void 0 || t.defaultValue === void 0 || hy || (console.error(
        "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
      ), hy = !0);
    }
    function rn(e, t) {
      t.value === void 0 || t.defaultValue === void 0 || p0 || (console.error(
        "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
        Ls() || "A component"
      ), p0 = !0), t.children != null && t.value == null && console.error(
        "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
      );
    }
    function Js(e, t, a) {
      if (t != null && (t = "" + rl(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + rl(a) : "";
    }
    function mh(e, t, a, i) {
      if (t == null) {
        if (i != null) {
          if (a != null)
            throw Error(
              "If you supply `defaultValue` on a <textarea>, do not pass children."
            );
          if (Te(i)) {
            if (1 < i.length)
              throw Error("<textarea> can only have at most one child.");
            i = i[0];
          }
          a = i;
        }
        a == null && (a = ""), t = a;
      }
      a = rl(t), e.defaultValue = a, i = e.textContent, i === a && i !== "" && i !== null && (e.value = i);
    }
    function Hi(e, t) {
      return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? Hi(e.children[0], t) : e;
    }
    function Nl(e) {
      return "  " + "  ".repeat(e);
    }
    function Gu(e) {
      return "+ " + "  ".repeat(e);
    }
    function Ni(e) {
      return "- " + "  ".repeat(e);
    }
    function yh(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return e.type;
        case 16:
          return "Lazy";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 0:
        case 15:
          return e = e.type, e.displayName || e.name || null;
        case 11:
          return e = e.type.render, e.displayName || e.name || null;
        case 1:
          return e = e.type, e.displayName || e.name || null;
        default:
          return null;
      }
    }
    function xl(e, t) {
      return v0.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? '{"..."}' : "{" + e.slice(0, t - 7) + '..."}' : "{" + e + "}") : e.length > t ? 5 > t ? '{"..."}' : e.slice(0, t - 3) + "..." : e;
    }
    function ff(e, t, a) {
      var i = 120 - 2 * a;
      if (t === null)
        return Gu(a) + xl(e, i) + `
`;
      if (typeof t == "string") {
        for (var o = 0; o < t.length && o < e.length && t.charCodeAt(o) === e.charCodeAt(o); o++) ;
        return o > i - 8 && 10 < o && (e = "..." + e.slice(o - 8), t = "..." + t.slice(o - 8)), Gu(a) + xl(e, i) + `
` + Ni(a) + xl(t, i) + `
`;
      }
      return Nl(a) + xl(e, i) + `
`;
    }
    function ph(e) {
      return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(t, a) {
        return a;
      });
    }
    function Vu(e, t) {
      switch (typeof e) {
        case "string":
          return e = JSON.stringify(e), e.length > t ? 5 > t ? '"..."' : e.slice(0, t - 4) + '..."' : e;
        case "object":
          if (e === null) return "null";
          if (Te(e)) return "[...]";
          if (e.$$typeof === mi)
            return (t = Be(e.type)) ? "<" + t + ">" : "<...>";
          var a = ph(e);
          if (a === "Object") {
            a = "", t -= 2;
            for (var i in e)
              if (e.hasOwnProperty(i)) {
                var o = JSON.stringify(i);
                if (o !== '"' + i + '"' && (i = o), t -= i.length - 2, o = Vu(
                  e[i],
                  15 > t ? t : 15
                ), t -= o.length, 0 > t) {
                  a += a === "" ? "..." : ", ...";
                  break;
                }
                a += (a === "" ? "" : ",") + i + ":" + o;
              }
            return "{" + a + "}";
          }
          return a;
        case "function":
          return (t = e.displayName || e.name) ? "function " + t : "function";
        default:
          return String(e);
      }
    }
    function ji(e, t) {
      return typeof e != "string" || v0.test(e) ? "{" + Vu(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? '"..."' : '"' + e.slice(0, t - 5) + '..."' : '"' + e + '"';
    }
    function Gc(e, t, a) {
      var i = 120 - a.length - e.length, o = [], f;
      for (f in t)
        if (t.hasOwnProperty(f) && f !== "children") {
          var d = ji(
            t[f],
            120 - a.length - f.length - 1
          );
          i -= f.length + d.length + 2, o.push(f + "=" + d);
        }
      return o.length === 0 ? a + "<" + e + `>
` : 0 < i ? a + "<" + e + " " + o.join(" ") + `>
` : a + "<" + e + `
` + a + "  " + o.join(`
` + a + "  ") + `
` + a + `>
`;
    }
    function dv(e, t, a) {
      var i = "", o = Ce({}, t), f;
      for (f in e)
        if (e.hasOwnProperty(f)) {
          delete o[f];
          var d = 120 - 2 * a - f.length - 2, h = Vu(e[f], d);
          t.hasOwnProperty(f) ? (d = Vu(t[f], d), i += Gu(a) + f + ": " + h + `
`, i += Ni(a) + f + ": " + d + `
`) : i += Gu(a) + f + ": " + h + `
`;
        }
      for (var p in o)
        o.hasOwnProperty(p) && (e = Vu(
          o[p],
          120 - 2 * a - p.length - 2
        ), i += Ni(a) + p + ": " + e + `
`);
      return i;
    }
    function xa(e, t, a, i) {
      var o = "", f = /* @__PURE__ */ new Map();
      for (v in a)
        a.hasOwnProperty(v) && f.set(
          v.toLowerCase(),
          v
        );
      if (f.size === 1 && f.has("children"))
        o += Gc(
          e,
          t,
          Nl(i)
        );
      else {
        for (var d in t)
          if (t.hasOwnProperty(d) && d !== "children") {
            var h = 120 - 2 * (i + 1) - d.length - 1, p = f.get(d.toLowerCase());
            if (p !== void 0) {
              f.delete(d.toLowerCase());
              var v = t[d];
              p = a[p];
              var H = ji(
                v,
                h
              );
              h = ji(
                p,
                h
              ), typeof v == "object" && v !== null && typeof p == "object" && p !== null && ph(v) === "Object" && ph(p) === "Object" && (2 < Object.keys(v).length || 2 < Object.keys(p).length || -1 < H.indexOf("...") || -1 < h.indexOf("...")) ? o += Nl(i + 1) + d + `={{
` + dv(
                v,
                p,
                i + 2
              ) + Nl(i + 1) + `}}
` : (o += Gu(i + 1) + d + "=" + H + `
`, o += Ni(i + 1) + d + "=" + h + `
`);
            } else
              o += Nl(i + 1) + d + "=" + ji(t[d], h) + `
`;
          }
        f.forEach(function(q) {
          if (q !== "children") {
            var U = 120 - 2 * (i + 1) - q.length - 1;
            o += Ni(i + 1) + q + "=" + ji(a[q], U) + `
`;
          }
        }), o = o === "" ? Nl(i) + "<" + e + `>
` : Nl(i) + "<" + e + `
` + o + Nl(i) + `>
`;
      }
      return e = a.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (f = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (f = "" + t), o += ff(f, "" + e, i + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (o = e == null ? o + ff("" + t, null, i + 1) : o + ff("" + t, void 0, i + 1)), o;
    }
    function Ks(e, t) {
      var a = yh(e);
      if (a === null) {
        for (a = "", e = e.child; e; )
          a += Ks(e, t), e = e.sibling;
        return a;
      }
      return Nl(t) + "<" + a + `>
`;
    }
    function ks(e, t) {
      var a = Hi(e, t);
      if (a !== e && (e.children.length !== 1 || e.children[0] !== a))
        return Nl(t) + `...
` + ks(a, t + 1);
      a = "";
      var i = e.fiber._debugInfo;
      if (i)
        for (var o = 0; o < i.length; o++) {
          var f = i[o].name;
          typeof f == "string" && (a += Nl(t) + "<" + f + `>
`, t++);
        }
      if (i = "", o = e.fiber.pendingProps, e.fiber.tag === 6)
        i = ff(o, e.serverProps, t), t++;
      else if (f = yh(e.fiber), f !== null)
        if (e.serverProps === void 0) {
          i = t;
          var d = 120 - 2 * i - f.length - 2, h = "";
          for (v in o)
            if (o.hasOwnProperty(v) && v !== "children") {
              var p = ji(o[v], 15);
              if (d -= v.length + p.length + 2, 0 > d) {
                h += " ...";
                break;
              }
              h += " " + v + "=" + p;
            }
          i = Nl(i) + "<" + f + h + `>
`, t++;
        } else
          e.serverProps === null ? (i = Gc(
            f,
            o,
            Gu(t)
          ), t++) : typeof e.serverProps == "string" ? console.error(
            "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
          ) : (i = xa(
            f,
            o,
            e.serverProps,
            t
          ), t++);
      var v = "";
      for (o = e.fiber.child, f = 0; o && f < e.children.length; )
        d = e.children[f], d.fiber === o ? (v += ks(d, t), f++) : v += Ks(o, t), o = o.sibling;
      for (o && 0 < e.children.length && (v += Nl(t) + `...
`), o = e.serverTail, e.serverProps === null && t--, e = 0; e < o.length; e++)
        f = o[e], v = typeof f == "string" ? v + (Ni(t) + xl(f, 120 - 2 * t) + `
`) : v + Gc(
          f.type,
          f.props,
          Ni(t)
        );
      return a + i + v;
    }
    function sf(e) {
      try {
        return `

` + ks(e, 0);
      } catch {
        return "";
      }
    }
    function _i(e, t, a) {
      for (var i = t, o = null, f = 0; i; )
        i === e && (f = 0), o = {
          fiber: i,
          children: o !== null ? [o] : [],
          serverProps: i === t ? a : i === e ? null : void 0,
          serverTail: [],
          distanceFromLeaf: f
        }, f++, i = i.return;
      return o !== null ? sf(o).replaceAll(/^[+-]/gm, ">") : "";
    }
    function vh(e, t) {
      var a = Ce({}, e || py), i = { tag: t };
      return Cd.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), Hd.indexOf(t) !== -1 && (a.pTagInButtonScope = null), my.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), t === "#document" || t === "html" ? a.containerTagInScope = null : a.containerTagInScope || (a.containerTagInScope = i), e !== null || t !== "#document" && t !== "html" && t !== "body" ? a.implicitRootScope === !0 && (a.implicitRootScope = !1) : a.implicitRootScope = !0, a;
    }
    function gh(e, t, a) {
      switch (t) {
        case "select":
          return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
        case "optgroup":
          return e === "option" || e === "#text";
        case "option":
          return e === "#text";
        case "tr":
          return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return e === "tr" || e === "style" || e === "script" || e === "template";
        case "colgroup":
          return e === "col" || e === "template";
        case "table":
          return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
        case "head":
          return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
        case "html":
          if (a) break;
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          if (!a) return e === "html";
      }
      switch (e) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
        case "rp":
        case "rt":
          return yy.indexOf(t) === -1;
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return t == null;
        case "head":
          return a || t === null;
        case "html":
          return a && t === "#document" || t === null;
        case "body":
          return a && (t === "#document" || t === "html") || t === null;
      }
      return !0;
    }
    function Vc(e, t) {
      switch (e) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t.pTagInButtonScope;
        case "form":
          return t.formTag || t.pTagInButtonScope;
        case "li":
          return t.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return t.dlItemTagAutoclosing;
        case "button":
          return t.buttonTagInScope;
        case "a":
          return t.aTagInScope;
        case "nobr":
          return t.nobrTagInScope;
      }
      return null;
    }
    function pp(e, t) {
      for (; e; ) {
        switch (e.tag) {
          case 5:
          case 26:
          case 27:
            if (e.type === t) return e;
        }
        e = e.return;
      }
      return null;
    }
    function $s(e, t) {
      t = t || py;
      var a = t.current;
      if (t = (a = gh(
        e,
        a && a.tag,
        t.implicitRootScope
      ) ? null : a) ? null : Vc(e, t), t = a || t, !t) return !0;
      var i = t.tag;
      if (t = String(!!a) + "|" + e + "|" + i, Yo[t]) return !1;
      Yo[t] = !0;
      var o = (t = pa) ? pp(t.return, i) : null, f = t !== null && o !== null ? _i(o, t, null) : "", d = "<" + e + ">";
      return a ? (a = "", i === "table" && e === "tr" && (a += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
        `In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,
        d,
        i,
        a,
        f
      )) : console.error(
        `In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,
        d,
        i,
        f
      ), t && (e = t.return, o === null || e === null || o === e && e._debugOwner === t._debugOwner || ae(o, function() {
        console.error(
          `<%s> cannot contain a nested %s.
See this log for the ancestor stack trace.`,
          i,
          d
        );
      })), !1;
    }
    function rf(e, t, a) {
      if (a || gh("#text", t, !1))
        return !0;
      if (a = "#text|" + t, Yo[a]) return !1;
      Yo[a] = !0;
      var i = (a = pa) ? pp(a, t) : null;
      return a = a !== null && i !== null ? _i(
        i,
        a,
        a.tag !== 6 ? { children: null } : null
      ) : "", /\S/.test(e) ? console.error(
        `In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,
        t,
        a
      ) : console.error(
        `In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,
        t,
        a
      ), !1;
    }
    function Bi(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === 3) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    function hv(e) {
      return e.replace(Ti, function(t, a) {
        return a.toUpperCase();
      });
    }
    function vp(e, t, a) {
      var i = t.indexOf("--") === 0;
      i || (-1 < t.indexOf("-") ? Tc.hasOwnProperty(t) && Tc[t] || (Tc[t] = !0, console.error(
        "Unsupported style property %s. Did you mean %s?",
        t,
        hv(t.replace(Ss, "ms-"))
      )) : bs.test(t) ? Tc.hasOwnProperty(t) && Tc[t] || (Tc[t] = !0, console.error(
        "Unsupported vendor-prefixed style property %s. Did you mean %s?",
        t,
        t.charAt(0).toUpperCase() + t.slice(1)
      )) : !g0.test(a) || Ec.hasOwnProperty(a) && Ec[a] || (Ec[a] = !0, console.error(
        `Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,
        t,
        a.replace(g0, "")
      )), typeof a == "number" && (isNaN(a) ? b0 || (b0 = !0, console.error(
        "`NaN` is an invalid value for the `%s` css style property.",
        t
      )) : isFinite(a) || vy || (vy = !0, console.error(
        "`Infinity` is an invalid value for the `%s` css style property.",
        t
      )))), a == null || typeof a == "boolean" || a === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Ts.has(t) ? t === "float" ? e.cssFloat = a : (he(a, t), e[t] = ("" + a).trim()) : e[t] = a + "px";
    }
    function df(e, t, a) {
      if (t != null && typeof t != "object")
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      if (t && Object.freeze(t), e = e.style, a != null) {
        if (t) {
          var i = {};
          if (a) {
            for (var o in a)
              if (a.hasOwnProperty(o) && !t.hasOwnProperty(o))
                for (var f = Vn[o] || [o], d = 0; d < f.length; d++)
                  i[f[d]] = o;
          }
          for (var h in t)
            if (t.hasOwnProperty(h) && (!a || a[h] !== t[h]))
              for (o = Vn[h] || [h], f = 0; f < o.length; f++)
                i[o[f]] = h;
          h = {};
          for (var p in t)
            for (o = Vn[p] || [p], f = 0; f < o.length; f++)
              h[o[f]] = p;
          p = {};
          for (var v in i)
            if (o = i[v], (f = h[v]) && o !== f && (d = o + "," + f, !p[d])) {
              p[d] = !0, d = console;
              var H = t[o];
              d.error.call(
                d,
                "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                H == null || typeof H == "boolean" || H === "" ? "Removing" : "Updating",
                o,
                f
              );
            }
        }
        for (var q in a)
          !a.hasOwnProperty(q) || t != null && t.hasOwnProperty(q) || (q.indexOf("--") === 0 ? e.setProperty(q, "") : q === "float" ? e.cssFloat = "" : e[q] = "");
        for (var U in t)
          v = t[U], t.hasOwnProperty(U) && a[U] !== v && vp(e, U, v);
      } else
        for (i in t)
          t.hasOwnProperty(i) && vp(e, i, t[i]);
    }
    function qi(e) {
      if (e.indexOf("-") === -1) return !1;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    function Ws(e) {
      return Nd.get(e) || e;
    }
    function Xc(e, t) {
      if (Ru.call(Xn, t) && Xn[t])
        return !0;
      if (jd.test(t)) {
        if (e = "aria-" + t.slice(4).toLowerCase(), e = gy.hasOwnProperty(e) ? e : null, e == null)
          return console.error(
            "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
            t
          ), Xn[t] = !0;
        if (t !== e)
          return console.error(
            "Invalid ARIA attribute `%s`. Did you mean `%s`?",
            t,
            e
          ), Xn[t] = !0;
      }
      if (by.test(t)) {
        if (e = t.toLowerCase(), e = gy.hasOwnProperty(e) ? e : null, e == null) return Xn[t] = !0, !1;
        t !== e && (console.error(
          "Unknown ARIA attribute `%s`. Did you mean `%s`?",
          t,
          e
        ), Xn[t] = !0);
      }
      return !0;
    }
    function Qc(e, t) {
      var a = [], i;
      for (i in t)
        Xc(e, i) || a.push(i);
      t = a.map(function(o) {
        return "`" + o + "`";
      }).join(", "), a.length === 1 ? console.error(
        "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      ) : 1 < a.length && console.error(
        "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      );
    }
    function gp(e, t, a, i) {
      if (Ru.call(Yl, t) && Yl[t])
        return !0;
      var o = t.toLowerCase();
      if (o === "onfocusin" || o === "onfocusout")
        return console.error(
          "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
        ), Yl[t] = !0;
      if (typeof a == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction"))
        return !0;
      if (i != null) {
        if (e = i.possibleRegistrationNames, i.registrationNameDependencies.hasOwnProperty(t))
          return !0;
        if (i = e.hasOwnProperty(o) ? e[o] : null, i != null)
          return console.error(
            "Invalid event handler property `%s`. Did you mean `%s`?",
            t,
            i
          ), Yl[t] = !0;
        if (xs.test(t))
          return console.error(
            "Unknown event handler property `%s`. It will be ignored.",
            t
          ), Yl[t] = !0;
      } else if (xs.test(t))
        return l.test(t) && console.error(
          "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
          t
        ), Yl[t] = !0;
      if (n.test(t) || u.test(t)) return !0;
      if (o === "innerhtml")
        return console.error(
          "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
        ), Yl[t] = !0;
      if (o === "aria")
        return console.error(
          "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
        ), Yl[t] = !0;
      if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
        return console.error(
          "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
          typeof a
        ), Yl[t] = !0;
      if (typeof a == "number" && isNaN(a))
        return console.error(
          "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
          t
        ), Yl[t] = !0;
      if (xc.hasOwnProperty(o)) {
        if (o = xc[o], o !== t)
          return console.error(
            "Invalid DOM property `%s`. Did you mean `%s`?",
            t,
            o
          ), Yl[t] = !0;
      } else if (t !== o)
        return console.error(
          "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
          t,
          o
        ), Yl[t] = !0;
      switch (t) {
        case "dangerouslySetInnerHTML":
        case "children":
        case "style":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          return !0;
        case "innerText":
        case "textContent":
          return !0;
      }
      switch (typeof a) {
        case "boolean":
          switch (t) {
            case "autoFocus":
            case "checked":
            case "multiple":
            case "muted":
            case "selected":
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
            case "capture":
            case "download":
            case "inert":
              return !0;
            default:
              return o = t.toLowerCase().slice(0, 5), o === "data-" || o === "aria-" ? !0 : (a ? console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                a,
                t,
                t,
                a,
                t
              ) : console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                a,
                t,
                t,
                a,
                t,
                t,
                t
              ), Yl[t] = !0);
          }
        case "function":
        case "symbol":
          return Yl[t] = !0, !1;
        case "string":
          if (a === "false" || a === "true") {
            switch (t) {
              case "checked":
              case "selected":
              case "multiple":
              case "muted":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
              case "inert":
                break;
              default:
                return !0;
            }
            console.error(
              "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
              a,
              t,
              a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
              t,
              a
            ), Yl[t] = !0;
          }
      }
      return !0;
    }
    function bh(e, t, a) {
      var i = [], o;
      for (o in t)
        gp(e, o, t[o], a) || i.push(o);
      t = i.map(function(f) {
        return "`" + f + "`";
      }).join(", "), i.length === 1 ? console.error(
        "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      ) : 1 < i.length && console.error(
        "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      );
    }
    function Lc(e) {
      return c.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function Yi(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    function dn(e) {
      var t = ia(e);
      if (t && (e = t.stateNode)) {
        var a = e[la] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (wu(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (F(t, "name"), a = a.querySelectorAll(
                'input[name="' + ca(
                  "" + t
                ) + '"][type="radio"]'
              ), t = 0; t < a.length; t++) {
                var i = a[t];
                if (i !== e && i.form === e.form) {
                  var o = i[la] || null;
                  if (!o)
                    throw Error(
                      "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                    );
                  wu(
                    i,
                    o.value,
                    o.defaultValue,
                    o.defaultValue,
                    o.checked,
                    o.defaultChecked,
                    o.type,
                    o.name
                  );
                }
              }
              for (t = 0; t < a.length; t++)
                i = a[t], i.form === e.form && Kt(i);
            }
            break e;
          case "textarea":
            Js(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && nu(e, !!a.multiple, t, !1);
        }
      }
    }
    function Fs(e, t, a) {
      if (y) return e(t, a);
      y = !0;
      try {
        var i = e(t);
        return i;
      } finally {
        if (y = !1, (r !== null || m !== null) && (fc(), r && (t = r, e = m, m = r = null, dn(t), e)))
          for (t = 0; t < e.length; t++) dn(e[t]);
      }
    }
    function uu(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var i = a[la] || null;
      if (i === null) return null;
      a = i[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (a && typeof a != "function")
        throw Error(
          "Expected `" + t + "` listener to be a function, instead got a value of `" + typeof a + "` type."
        );
      return a;
    }
    function iu() {
      if (N) return N;
      var e, t = C, a = t.length, i, o = "value" in X ? X.value : X.textContent, f = o.length;
      for (e = 0; e < a && t[e] === o[e]; e++) ;
      var d = a - e;
      for (i = 1; i <= d && t[a - i] === o[f - i]; i++) ;
      return N = o.slice(e, 1 < i ? 1 - i : void 0);
    }
    function Zc(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function wi() {
      return !0;
    }
    function Sh() {
      return !1;
    }
    function dl(e) {
      function t(a, i, o, f, d) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = f, this.target = d, this.currentTarget = null;
        for (var h in e)
          e.hasOwnProperty(h) && (a = e[h], this[h] = a ? a(f) : f[h]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? wi : Sh, this.isPropagationStopped = Sh, this;
      }
      return Ce(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = wi);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = wi);
        },
        persist: function() {
        },
        isPersistent: wi
      }), t;
    }
    function Is(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = eS[e]) ? !!t[e] : !1;
    }
    function Ps() {
      return Is;
    }
    function jl(e, t) {
      switch (e) {
        case "keyup":
          return dS.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Ng;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Xu(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    function er(e, t) {
      switch (e) {
        case "compositionend":
          return Xu(t);
        case "keypress":
          return t.which !== _g ? null : (qg = !0, Bg);
        case "textInput":
          return e = t.data, e === Bg && qg ? null : e;
        default:
          return null;
      }
    }
    function hf(e, t) {
      if (_d)
        return e === "compositionend" || !Hv && jl(e, t) ? (e = iu(), N = C = X = null, _d = !1, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return jg && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    function bp(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!mS[e.type] : t === "textarea";
    }
    function Th(e) {
      if (!b) return !1;
      e = "on" + e;
      var t = e in document;
      return t || (t = document.createElement("div"), t.setAttribute(e, "return;"), t = typeof t[e] == "function"), t;
    }
    function tr(e, t, a, i) {
      r ? m ? m.push(i) : m = [i] : r = i, t = es(t, "onChange"), 0 < t.length && (a = new re(
        "onChange",
        "change",
        null,
        a,
        i
      ), e.push({ event: a, listeners: t }));
    }
    function mf(e) {
      Nn(e, 0);
    }
    function Gi(e) {
      var t = _u(e);
      if (Kt(t)) return e;
    }
    function Eh(e, t) {
      if (e === "change") return t;
    }
    function Sp() {
      Ey && (Ey.detachEvent("onpropertychange", Tp), xy = Ey = null);
    }
    function Tp(e) {
      if (e.propertyName === "value" && Gi(xy)) {
        var t = [];
        tr(
          t,
          xy,
          e,
          Yi(e)
        ), Fs(mf, t);
      }
    }
    function mv(e, t, a) {
      e === "focusin" ? (Sp(), Ey = t, xy = a, Ey.attachEvent("onpropertychange", Tp)) : e === "focusout" && Sp();
    }
    function xh(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Gi(xy);
    }
    function yv(e, t) {
      if (e === "click") return Gi(t);
    }
    function pv(e, t) {
      if (e === "input" || e === "change")
        return Gi(t);
    }
    function vv(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    function yf(e, t) {
      if (va(e, t)) return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length) return !1;
      for (i = 0; i < a.length; i++) {
        var o = a[i];
        if (!Ru.call(t, o) || !va(e[o], t[o]))
          return !1;
      }
      return !0;
    }
    function Ep(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Ah(e, t) {
      var a = Ep(e);
      e = 0;
      for (var i; a; ) {
        if (a.nodeType === 3) {
          if (i = e + a.textContent.length, e <= t && i >= t)
            return { node: a, offset: t - e };
          e = i;
        }
        e: {
          for (; a; ) {
            if (a.nextSibling) {
              a = a.nextSibling;
              break e;
            }
            a = a.parentNode;
          }
          a = void 0;
        }
        a = Ep(a);
      }
    }
    function xp(e, t) {
      return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? xp(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
    }
    function Ap(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = cf(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = !1;
        }
        if (a) e = t.contentWindow;
        else break;
        t = cf(e.document);
      }
      return t;
    }
    function Rh(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function Rp(e, t, a) {
      var i = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      jv || Bd == null || Bd !== cf(i) || (i = Bd, "selectionStart" in i && Rh(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      }), Ay && yf(Ay, i) || (Ay = i, i = es(Nv, "onSelect"), 0 < i.length && (t = new re(
        "onSelect",
        "select",
        null,
        t,
        a
      ), e.push({ event: t, listeners: i }), t.target = Bd)));
    }
    function cu(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    function Vi(e) {
      if (_v[e]) return _v[e];
      if (!qd[e]) return e;
      var t = qd[e], a;
      for (a in t)
        if (t.hasOwnProperty(a) && a in wg)
          return _v[e] = t[a];
      return e;
    }
    function La(e, t) {
      Lg.set(e, t), Bu(t, [e]);
    }
    function oa(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = qv.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: Qs(t)
        }, qv.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: Qs(t)
      };
    }
    function pf() {
      for (var e = Yd, t = Yv = Yd = 0; t < e; ) {
        var a = Qn[t];
        Qn[t++] = null;
        var i = Qn[t];
        Qn[t++] = null;
        var o = Qn[t];
        Qn[t++] = null;
        var f = Qn[t];
        if (Qn[t++] = null, i !== null && o !== null) {
          var d = i.pending;
          d === null ? o.next = o : (o.next = d.next, d.next = o), i.pending = o;
        }
        f !== 0 && zp(a, o, f);
      }
    }
    function lr(e, t, a, i) {
      Qn[Yd++] = e, Qn[Yd++] = t, Qn[Yd++] = a, Qn[Yd++] = i, Yv |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
    }
    function zh(e, t, a, i) {
      return lr(e, t, a, i), ar(e);
    }
    function Ll(e, t) {
      return lr(e, null, null, t), ar(e);
    }
    function zp(e, t, a) {
      e.lanes |= a;
      var i = e.alternate;
      i !== null && (i.lanes |= a);
      for (var o = !1, f = e.return; f !== null; )
        f.childLanes |= a, i = f.alternate, i !== null && (i.childLanes |= a), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & S0 || (o = !0)), e = f, f = f.return;
      return e.tag === 3 ? (f = e.stateNode, o && t !== null && (o = 31 - Dl(a), e = f.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = a | 536870912), f) : null;
    }
    function ar(e) {
      if (Jy > qS)
        throw Bs = Jy = 0, Ky = mg = null, Error(
          "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
        );
      Bs > YS && (Bs = 0, Ky = null, console.error(
        "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
      )), e.alternate === null && (e.flags & 4098) !== 0 && ln(e);
      for (var t = e, a = t.return; a !== null; )
        t.alternate === null && (t.flags & 4098) !== 0 && ln(e), t = a, a = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    function Xi(e) {
      if (Ln === null) return e;
      var t = Ln(e);
      return t === void 0 ? e : t.current;
    }
    function Dh(e) {
      if (Ln === null) return e;
      var t = Ln(e);
      return t === void 0 ? e != null && typeof e.render == "function" && (t = Xi(e.render), e.render !== t) ? (t = { $$typeof: xu, render: t }, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
    }
    function Dp(e, t) {
      if (Ln === null) return !1;
      var a = e.elementType;
      t = t.type;
      var i = !1, o = typeof t == "object" && t !== null ? t.$$typeof : null;
      switch (e.tag) {
        case 1:
          typeof t == "function" && (i = !0);
          break;
        case 0:
          (typeof t == "function" || o === ya) && (i = !0);
          break;
        case 11:
          (o === xu || o === ya) && (i = !0);
          break;
        case 14:
        case 15:
          (o === rs || o === ya) && (i = !0);
          break;
        default:
          return !1;
      }
      return !!(i && (e = Ln(a), e !== void 0 && e === Ln(t)));
    }
    function Op(e) {
      Ln !== null && typeof WeakSet == "function" && (wd === null && (wd = /* @__PURE__ */ new WeakSet()), wd.add(e));
    }
    function vf(e, t, a) {
      var i = e.alternate, o = e.child, f = e.sibling, d = e.tag, h = e.type, p = null;
      switch (d) {
        case 0:
        case 15:
        case 1:
          p = h;
          break;
        case 11:
          p = h.render;
      }
      if (Ln === null)
        throw Error("Expected resolveFamily to be set during hot reload.");
      var v = !1;
      h = !1, p !== null && (p = Ln(p), p !== void 0 && (a.has(p) ? h = !0 : t.has(p) && (d === 1 ? h = !0 : v = !0))), wd !== null && (wd.has(e) || i !== null && wd.has(i)) && (h = !0), h && (e._debugNeedsRemount = !0), (h || v) && (i = Ll(e, 2), i !== null && Ht(i, e, 2)), o === null || h || vf(
        o,
        t,
        a
      ), f !== null && vf(
        f,
        t,
        a
      );
    }
    function gf(e, t, a, i) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Jg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
    }
    function Oh(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function hn(e, t) {
      var a = e.alternate;
      switch (a === null ? (a = ee(
        e.tag,
        t,
        e.key,
        e.mode
      ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugOwner = e._debugOwner, a._debugStack = e._debugStack, a._debugTask = e._debugTask, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null, a.actualDuration = -0, a.actualStartTime = -1.1), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugInfo = e._debugInfo, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case 0:
        case 15:
          a.type = Xi(e.type);
          break;
        case 1:
          a.type = Xi(e.type);
          break;
        case 11:
          a.type = Dh(e.type);
      }
      return a;
    }
    function Mh(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration), e;
    }
    function nr(e, t, a, i, o, f) {
      var d = 0, h = e;
      if (typeof e == "function")
        Oh(e) && (d = 1), h = Xi(h);
      else if (typeof e == "string")
        d = z(), d = Ro(e, a, d) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else
        e: switch (e) {
          case ly:
            return t = ee(31, a, t, o), t.elementType = ly, t.lanes = f, t;
          case Ae:
            return Qu(
              a.children,
              o,
              f,
              t
            );
          case Do:
            d = 8, o |= na, o |= Uu;
            break;
          case Oo:
            return e = a, i = o, typeof e.id != "string" && console.error(
              'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
              typeof e.id
            ), t = ee(12, e, t, i | wl), t.elementType = Oo, t.lanes = f, t.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, t;
          case Mo:
            return t = ee(13, a, t, o), t.elementType = Mo, t.lanes = f, t;
          case yi:
            return t = ee(19, a, t, o), t.elementType = yi, t.lanes = f, t;
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case ty:
                case Ba:
                  d = 10;
                  break e;
                case bd:
                  d = 9;
                  break e;
                case xu:
                  d = 11, h = Dh(h);
                  break e;
                case rs:
                  d = 14;
                  break e;
                case ya:
                  d = 16, h = null;
                  break e;
              }
            h = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? a = "null" : Te(e) ? a = "array" : e !== void 0 && e.$$typeof === mi ? (a = "<" + (Be(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : a = typeof e, (d = i ? Yt(i) : null) && (h += `

Check the render method of \`` + d + "`."), d = 29, a = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (a + "." + h)
            ), h = null;
        }
      return t = ee(d, a, t, o), t.elementType = e, t.type = h, t.lanes = f, t._debugOwner = i, t;
    }
    function bf(e, t, a) {
      return t = nr(
        e.type,
        e.key,
        e.props,
        e._owner,
        t,
        a
      ), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
    }
    function Qu(e, t, a, i) {
      return e = ee(7, e, i, t), e.lanes = a, e;
    }
    function Lu(e, t, a) {
      return e = ee(6, e, null, t), e.lanes = a, e;
    }
    function Uh(e, t, a) {
      return t = ee(
        4,
        e.children !== null ? e.children : [],
        e.key,
        t
      ), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function Qi(e, t) {
      Za(), Gd[Vd++] = E0, Gd[Vd++] = T0, T0 = e, E0 = t;
    }
    function Mp(e, t, a) {
      Za(), Zn[Jn++] = Rc, Zn[Jn++] = zc, Zn[Jn++] = As, As = e;
      var i = Rc;
      e = zc;
      var o = 32 - Dl(i) - 1;
      i &= ~(1 << o), a += 1;
      var f = 32 - Dl(t) + o;
      if (30 < f) {
        var d = o - o % 5;
        f = (i & (1 << d) - 1).toString(32), i >>= d, o -= d, Rc = 1 << 32 - Dl(t) + o | a << o | i, zc = f + e;
      } else
        Rc = 1 << f | a << o | i, zc = e;
    }
    function ur(e) {
      Za(), e.return !== null && (Qi(e, 1), Mp(e, 1, 0));
    }
    function ir(e) {
      for (; e === T0; )
        T0 = Gd[--Vd], Gd[Vd] = null, E0 = Gd[--Vd], Gd[Vd] = null;
      for (; e === As; )
        As = Zn[--Jn], Zn[Jn] = null, zc = Zn[--Jn], Zn[Jn] = null, Rc = Zn[--Jn], Zn[Jn] = null;
    }
    function Za() {
      lt || console.error(
        "Expected to be hydrating. This is a bug in React. Please file an issue."
      );
    }
    function Ja(e, t) {
      if (e.return === null) {
        if (Kn === null)
          Kn = {
            fiber: e,
            children: [],
            serverProps: void 0,
            serverTail: [],
            distanceFromLeaf: t
          };
        else {
          if (Kn.fiber !== e)
            throw Error(
              "Saw multiple hydration diff roots in a pass. This is a bug in React."
            );
          Kn.distanceFromLeaf > t && (Kn.distanceFromLeaf = t);
        }
        return Kn;
      }
      var a = Ja(
        e.return,
        t + 1
      ).children;
      return 0 < a.length && a[a.length - 1].fiber === e ? (a = a[a.length - 1], a.distanceFromLeaf > t && (a.distanceFromLeaf = t), a) : (t = {
        fiber: e,
        children: [],
        serverProps: void 0,
        serverTail: [],
        distanceFromLeaf: t
      }, a.push(t), t);
    }
    function Ch(e, t) {
      Dc || (e = Ja(e, 0), e.serverProps = null, t !== null && (t = fd(t), e.serverTail.push(t)));
    }
    function mn(e) {
      var t = "", a = Kn;
      throw a !== null && (Kn = null, t = sf(a)), Jc(
        oa(
          Error(
            `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch` + t
          ),
          e
        )
      ), wv;
    }
    function Hh(e) {
      var t = e.stateNode, a = e.type, i = e.memoizedProps;
      switch (t[Ol] = e, t[la] = i, jn(a, i), a) {
        case "dialog":
          _e("cancel", t), _e("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          _e("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < ky.length; a++)
            _e(ky[a], t);
          break;
        case "source":
          _e("error", t);
          break;
        case "img":
        case "image":
        case "link":
          _e("error", t), _e("load", t);
          break;
        case "details":
          _e("toggle", t);
          break;
        case "input":
          qu("input", i), _e("invalid", t), Yu(t, i), mp(
            t,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0
          ), au(t);
          break;
        case "option":
          hh(t, i);
          break;
        case "select":
          qu("select", i), _e("invalid", t), of(t, i);
          break;
        case "textarea":
          qu("textarea", i), _e("invalid", t), rn(t, i), mh(
            t,
            i.value,
            i.defaultValue,
            i.children
          ), au(t);
      }
      a = i.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || i.suppressHydrationWarning === !0 || jm(t.textContent, a) ? (i.popover != null && (_e("beforetoggle", t), _e("toggle", t)), i.onScroll != null && _e("scroll", t), i.onScrollEnd != null && _e("scrollend", t), i.onClick != null && (t.onclick = bu), t = !0) : t = !1, t || mn(e);
    }
    function Nh(e) {
      for (ga = e.return; ga; )
        switch (ga.tag) {
          case 5:
          case 13:
            xi = !1;
            return;
          case 27:
          case 3:
            xi = !0;
            return;
          default:
            ga = ga.return;
        }
    }
    function Li(e) {
      if (e !== ga) return !1;
      if (!lt)
        return Nh(e), lt = !0, !1;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || _n(e.type, e.memoizedProps)), a = !a), a && Vt) {
        for (a = Vt; a; ) {
          var i = Ja(e, 0), o = fd(a);
          i.serverTail.push(o), a = o.type === "Suspense" ? Xm(a) : vl(a.nextSibling);
        }
        mn(e);
      }
      if (Nh(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        Vt = Xm(e);
      } else
        t === 27 ? (t = Vt, Bn(e.type) ? (e = zg, zg = null, Vt = e) : Vt = t) : Vt = ga ? vl(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Zi() {
      Vt = ga = null, Dc = lt = !1;
    }
    function jh() {
      var e = Rs;
      return e !== null && (Ta === null ? Ta = e : Ta.push.apply(
        Ta,
        e
      ), Rs = null), e;
    }
    function Jc(e) {
      Rs === null ? Rs = [e] : Rs.push(e);
    }
    function _h() {
      var e = Kn;
      if (e !== null) {
        Kn = null;
        for (var t = sf(e); 0 < e.children.length; )
          e = e.children[0];
        ae(e.fiber, function() {
          console.error(
            `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s`,
            "https://react.dev/link/hydration-mismatch",
            t
          );
        });
      }
    }
    function cr() {
      Xd = x0 = null, Qd = !1;
    }
    function Zu(e, t, a) {
      pe(Gv, t._currentValue, e), t._currentValue = a, pe(Vv, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Wg && console.error(
        "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
      ), t._currentRenderer = Wg;
    }
    function ou(e, t) {
      e._currentValue = Gv.current;
      var a = Vv.current;
      We(Vv, t), e._currentRenderer = a, We(Gv, t);
    }
    function Bh(e, t, a) {
      for (; e !== null; ) {
        var i = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === a) break;
        e = e.return;
      }
      e !== a && console.error(
        "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function qh(e, t, a, i) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var f = o.dependencies;
        if (f !== null) {
          var d = o.child;
          f = f.firstContext;
          e: for (; f !== null; ) {
            var h = f;
            f = o;
            for (var p = 0; p < t.length; p++)
              if (h.context === t[p]) {
                f.lanes |= a, h = f.alternate, h !== null && (h.lanes |= a), Bh(
                  f.return,
                  a,
                  e
                ), i || (d = null);
                break e;
              }
            f = h.next;
          }
        } else if (o.tag === 18) {
          if (d = o.return, d === null)
            throw Error(
              "We just came from a parent so we must have had a parent. This is a bug in React."
            );
          d.lanes |= a, f = d.alternate, f !== null && (f.lanes |= a), Bh(
            d,
            a,
            e
          ), d = null;
        } else d = o.child;
        if (d !== null) d.return = o;
        else
          for (d = o; d !== null; ) {
            if (d === e) {
              d = null;
              break;
            }
            if (o = d.sibling, o !== null) {
              o.return = d.return, d = o;
              break;
            }
            d = d.return;
          }
        o = d;
      }
    }
    function hl(e, t, a, i) {
      e = null;
      for (var o = t, f = !1; o !== null; ) {
        if (!f) {
          if ((o.flags & 524288) !== 0) f = !0;
          else if ((o.flags & 262144) !== 0) break;
        }
        if (o.tag === 10) {
          var d = o.alternate;
          if (d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          if (d = d.memoizedProps, d !== null) {
            var h = o.type;
            va(o.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
          }
        } else if (o === Co.current) {
          if (d = o.alternate, d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          d.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(Iy) : e = [Iy]);
        }
        o = o.return;
      }
      e !== null && qh(
        t,
        e,
        a,
        i
      ), t.flags |= 262144;
    }
    function Ju(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!va(
          e.context._currentValue,
          e.memoizedValue
        ))
          return !0;
        e = e.next;
      }
      return !1;
    }
    function Ku(e) {
      x0 = e, Xd = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function pt(e) {
      return Qd && console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      ), Yh(x0, e);
    }
    function Sf(e, t) {
      return x0 === null && Ku(e), Yh(e, t);
    }
    function Yh(e, t) {
      var a = t._currentValue;
      if (t = { context: t, memoizedValue: a, next: null }, Xd === null) {
        if (e === null)
          throw Error(
            "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
          );
        Xd = t, e.dependencies = {
          lanes: 0,
          firstContext: t,
          _debugThenableState: null
        }, e.flags |= 524288;
      } else Xd = Xd.next = t;
      return a;
    }
    function Tf() {
      return {
        controller: new ES(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function Ji(e) {
      e.controller.signal.aborted && console.warn(
        "A cache instance was retained after it was already freed. This likely indicates a bug in React."
      ), e.refCount++;
    }
    function yn(e) {
      e.refCount--, 0 > e.refCount && console.warn(
        "A cache instance was released after it was already freed. This likely indicates a bug in React."
      ), e.refCount === 0 && xS(AS, function() {
        e.controller.abort();
      });
    }
    function Ka() {
      var e = zs;
      return zs = 0, e;
    }
    function ku(e) {
      var t = zs;
      return zs = e, t;
    }
    function Ki(e) {
      var t = zs;
      return zs += e, t;
    }
    function or(e) {
      wa = Ld(), 0 > e.actualStartTime && (e.actualStartTime = wa);
    }
    function fu(e) {
      if (0 <= wa) {
        var t = Ld() - wa;
        e.actualDuration += t, e.selfBaseDuration = t, wa = -1;
      }
    }
    function ki(e) {
      if (0 <= wa) {
        var t = Ld() - wa;
        e.actualDuration += t, wa = -1;
      }
    }
    function Aa() {
      if (0 <= wa) {
        var e = Ld() - wa;
        wa = -1, zs += e;
      }
    }
    function ka() {
      wa = Ld();
    }
    function pn(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Up(e, t) {
      if (Ry === null) {
        var a = Ry = [];
        Xv = 0, Ds = Mm(), Zd = {
          status: "pending",
          value: void 0,
          then: function(i) {
            a.push(i);
          }
        };
      }
      return Xv++, t.then(wh, wh), t;
    }
    function wh() {
      if (--Xv === 0 && Ry !== null) {
        Zd !== null && (Zd.status = "fulfilled");
        var e = Ry;
        Ry = null, Ds = 0, Zd = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function Cp(e, t) {
      var a = [], i = {
        status: "pending",
        value: null,
        reason: null,
        then: function(o) {
          a.push(o);
        }
      };
      return e.then(
        function() {
          i.status = "fulfilled", i.value = t;
          for (var o = 0; o < a.length; o++) (0, a[o])(t);
        },
        function(o) {
          for (i.status = "rejected", i.reason = o, o = 0; o < a.length; o++)
            (0, a[o])(void 0);
        }
      ), i;
    }
    function Gh() {
      var e = Os.current;
      return e !== null ? e : vt.pooledCache;
    }
    function fr(e, t) {
      t === null ? pe(Os, Os.current, e) : pe(Os, t.pool, e);
    }
    function Hp() {
      var e = Gh();
      return e === null ? null : { parent: Sl._currentValue, pool: e };
    }
    function Vh() {
      return { didWarnAboutUncachedPromise: !1, thenables: [] };
    }
    function Xh(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function Kc() {
    }
    function Ra(e, t, a) {
      j.actQueue !== null && (j.didUsePromise = !0);
      var i = e.thenables;
      switch (a = i[a], a === void 0 ? i.push(t) : a !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error(
        "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
      )), t.then(Kc, Kc), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, fa(e), e;
        default:
          if (typeof t.status == "string")
            t.then(Kc, Kc);
          else {
            if (e = vt, e !== null && 100 < e.shellSuspendCounter)
              throw Error(
                "An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
              );
            e = t, e.status = "pending", e.then(
              function(o) {
                if (t.status === "pending") {
                  var f = t;
                  f.status = "fulfilled", f.value = o;
                }
              },
              function(o) {
                if (t.status === "pending") {
                  var f = t;
                  f.status = "rejected", f.reason = o;
                }
              }
            );
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, fa(e), e;
          }
          throw Ny = t, M0 = !0, Hy;
      }
    }
    function Qh() {
      if (Ny === null)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var e = Ny;
      return Ny = null, M0 = !1, e;
    }
    function fa(e) {
      if (e === Hy || e === O0)
        throw Error(
          "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
        );
    }
    function Zl(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function $u(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function vn(e) {
      return {
        lane: e,
        tag: tb,
        payload: null,
        callback: null,
        next: null
      };
    }
    function $a(e, t, a) {
      var i = e.updateQueue;
      if (i === null) return null;
      if (i = i.shared, Zv === i && !nb) {
        var o = ce(e);
        console.error(
          `An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,
          o
        ), nb = !0;
      }
      return (ot & Sa) !== un ? (o = i.pending, o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = ar(e), zp(e, null, a), t) : (lr(e, i, t, a), ar(e));
    }
    function Wu(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, qc(e, a);
      }
    }
    function kc(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null && (i = i.updateQueue, a === i)) {
        var o = null, f = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var d = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            f === null ? o = f = d : f = f.next = d, a = a.next;
          } while (a !== null);
          f === null ? o = f = t : f = f.next = t;
        } else o = f = t;
        a = {
          baseState: i.baseState,
          firstBaseUpdate: o,
          lastBaseUpdate: f,
          shared: i.shared,
          callbacks: i.callbacks
        }, e.updateQueue = a;
        return;
      }
      e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
    }
    function gn() {
      if (Jv) {
        var e = Zd;
        if (e !== null) throw e;
      }
    }
    function $c(e, t, a, i) {
      Jv = !1;
      var o = e.updateQueue;
      Vo = !1, Zv = o.shared;
      var f = o.firstBaseUpdate, d = o.lastBaseUpdate, h = o.shared.pending;
      if (h !== null) {
        o.shared.pending = null;
        var p = h, v = p.next;
        p.next = null, d === null ? f = v : d.next = v, d = p;
        var H = e.alternate;
        H !== null && (H = H.updateQueue, h = H.lastBaseUpdate, h !== d && (h === null ? H.firstBaseUpdate = v : h.next = v, H.lastBaseUpdate = p));
      }
      if (f !== null) {
        var q = o.baseState;
        d = 0, H = v = p = null, h = f;
        do {
          var U = h.lane & -536870913, Y = U !== h.lane;
          if (Y ? (Ve & U) === U : (i & U) === U) {
            U !== 0 && U === Ds && (Jv = !0), H !== null && (H = H.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            e: {
              U = e;
              var ne = h, ge = t, gt = a;
              switch (ne.tag) {
                case lb:
                  if (ne = ne.payload, typeof ne == "function") {
                    Qd = !0;
                    var Ze = ne.call(
                      gt,
                      q,
                      ge
                    );
                    if (U.mode & na) {
                      qe(!0);
                      try {
                        ne.call(gt, q, ge);
                      } finally {
                        qe(!1);
                      }
                    }
                    Qd = !1, q = Ze;
                    break e;
                  }
                  q = ne;
                  break e;
                case Lv:
                  U.flags = U.flags & -65537 | 128;
                case tb:
                  if (Ze = ne.payload, typeof Ze == "function") {
                    if (Qd = !0, ne = Ze.call(
                      gt,
                      q,
                      ge
                    ), U.mode & na) {
                      qe(!0);
                      try {
                        Ze.call(gt, q, ge);
                      } finally {
                        qe(!1);
                      }
                    }
                    Qd = !1;
                  } else ne = Ze;
                  if (ne == null) break e;
                  q = Ce({}, q, ne);
                  break e;
                case ab:
                  Vo = !0;
              }
            }
            U = h.callback, U !== null && (e.flags |= 64, Y && (e.flags |= 8192), Y = o.callbacks, Y === null ? o.callbacks = [U] : Y.push(U));
          } else
            Y = {
              lane: U,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            }, H === null ? (v = H = Y, p = q) : H = H.next = Y, d |= U;
          if (h = h.next, h === null) {
            if (h = o.shared.pending, h === null)
              break;
            Y = h, h = Y.next, Y.next = null, o.lastBaseUpdate = Y, o.shared.pending = null;
          }
        } while (!0);
        H === null && (p = q), o.baseState = p, o.firstBaseUpdate = v, o.lastBaseUpdate = H, f === null && (o.shared.lanes = 0), Zo |= d, e.lanes = d, e.memoizedState = q;
      }
      Zv = null;
    }
    function Ef(e, t) {
      if (typeof e != "function")
        throw Error(
          "Invalid argument passed as callback. Expected a function. Instead received: " + e
        );
      e.call(t);
    }
    function Wc(e, t) {
      var a = e.shared.hiddenCallbacks;
      if (a !== null)
        for (e.shared.hiddenCallbacks = null, e = 0; e < a.length; e++)
          Ef(a[e], t);
    }
    function Np(e, t) {
      var a = e.callbacks;
      if (a !== null)
        for (e.callbacks = null, e = 0; e < a.length; e++)
          Ef(a[e], t);
    }
    function Jl(e, t) {
      var a = zi;
      pe(U0, a, e), pe(Jd, t, e), zi = a | t.baseLanes;
    }
    function xf(e) {
      pe(U0, zi, e), pe(
        Jd,
        Jd.current,
        e
      );
    }
    function Wa(e) {
      zi = U0.current, We(Jd, e), We(U0, e);
    }
    function He() {
      var e = B;
      Wn === null ? Wn = [e] : Wn.push(e);
    }
    function K() {
      var e = B;
      if (Wn !== null && (Mc++, Wn[Mc] !== e)) {
        var t = ce(Ee);
        if (!ub.has(t) && (ub.add(t), Wn !== null)) {
          for (var a = "", i = 0; i <= Mc; i++) {
            var o = Wn[i], f = i === Mc ? e : o;
            for (o = i + 1 + ". " + o; 30 > o.length; )
              o += " ";
            o += f + `
`, a += o;
          }
          console.error(
            `React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,
            t,
            a
          );
        }
      }
    }
    function za(e) {
      e == null || Te(e) || console.error(
        "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
        B,
        typeof e
      );
    }
    function Fc() {
      var e = ce(Ee);
      cb.has(e) || (cb.add(e), console.error(
        "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
        e
      ));
    }
    function zt() {
      throw Error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      );
    }
    function Fu(e, t) {
      if (_y) return !1;
      if (t === null)
        return console.error(
          "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
          B
        ), !1;
      e.length !== t.length && console.error(
        `The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,
        B,
        "[" + t.join(", ") + "]",
        "[" + e.join(", ") + "]"
      );
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!va(e[a], t[a])) return !1;
      return !0;
    }
    function Iu(e, t, a, i, o, f) {
      Xo = f, Ee = t, Wn = e !== null ? e._debugHookTypes : null, Mc = -1, _y = e !== null && e.type !== t.type, (Object.prototype.toString.call(a) === "[object AsyncFunction]" || Object.prototype.toString.call(a) === "[object AsyncGeneratorFunction]") && (f = ce(Ee), Kv.has(f) || (Kv.add(f), console.error(
        "%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",
        f === null ? "An unknown Component" : "<" + f + ">"
      ))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, j.H = e !== null && e.memoizedState !== null ? $v : Wn !== null ? ob : kv, Us = f = (t.mode & na) !== At;
      var d = Wv(a, i, o);
      if (Us = !1, kd && (d = Ic(
        t,
        a,
        i,
        o
      )), f) {
        qe(!0);
        try {
          d = Ic(
            t,
            a,
            i,
            o
          );
        } finally {
          qe(!1);
        }
      }
      return Af(e, t), d;
    }
    function Af(e, t) {
      t._debugHookTypes = Wn, t.dependencies === null ? Oc !== null && (t.dependencies = {
        lanes: 0,
        firstContext: null,
        _debugThenableState: Oc
      }) : t.dependencies._debugThenableState = Oc, j.H = N0;
      var a = mt !== null && mt.next !== null;
      if (Xo = 0, Wn = B = ol = mt = Ee = null, Mc = -1, e !== null && (e.flags & 65011712) !== (t.flags & 65011712) && console.error(
        "Internal React error: Expected static flag was missing. Please notify the React team."
      ), C0 = !1, jy = 0, Oc = null, a)
        throw Error(
          "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
        );
      e === null || Ml || (e = e.dependencies, e !== null && Ju(e) && (Ml = !0)), M0 ? (M0 = !1, e = !0) : e = !1, e && (t = ce(t) || "Unknown", ib.has(t) || Kv.has(t) || (ib.add(t), console.error(
        "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
      )));
    }
    function Ic(e, t, a, i) {
      Ee = e;
      var o = 0;
      do {
        if (kd && (Oc = null), jy = 0, kd = !1, o >= zS)
          throw Error(
            "Too many re-renders. React limits the number of renders to prevent an infinite loop."
          );
        if (o += 1, _y = !1, ol = mt = null, e.updateQueue != null) {
          var f = e.updateQueue;
          f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
        }
        Mc = -1, j.H = fb, f = Wv(t, a, i);
      } while (kd);
      return f;
    }
    function Da() {
      var e = j.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? $i(t) : t, e = e.useState()[0], (mt !== null ? mt.memoizedState : null) !== e && (Ee.flags |= 1024), t;
    }
    function Kl() {
      var e = H0 !== 0;
      return H0 = 0, e;
    }
    function su(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags = (t.mode & Uu) !== At ? t.flags & -402655237 : t.flags & -2053, e.lanes &= ~a;
    }
    function Fa(e) {
      if (C0) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        C0 = !1;
      }
      Xo = 0, Wn = ol = mt = Ee = null, Mc = -1, B = null, kd = !1, jy = H0 = 0, Oc = null;
    }
    function Ut() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return ol === null ? Ee.memoizedState = ol = e : ol = ol.next = e, ol;
    }
    function Le() {
      if (mt === null) {
        var e = Ee.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = mt.next;
      var t = ol === null ? Ee.memoizedState : ol.next;
      if (t !== null)
        ol = t, mt = e;
      else {
        if (e === null)
          throw Ee.alternate === null ? Error(
            "Update hook called on initial render. This is likely a bug in React. Please file an issue."
          ) : Error("Rendered more hooks than during the previous render.");
        mt = e, e = {
          memoizedState: mt.memoizedState,
          baseState: mt.baseState,
          baseQueue: mt.baseQueue,
          queue: mt.queue,
          next: null
        }, ol === null ? Ee.memoizedState = ol = e : ol = ol.next = e;
      }
      return ol;
    }
    function sr() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function $i(e) {
      var t = jy;
      return jy += 1, Oc === null && (Oc = Vh()), e = Ra(Oc, e, t), t = Ee, (ol === null ? t.memoizedState : ol.next) === null && (t = t.alternate, j.H = t !== null && t.memoizedState !== null ? $v : kv), e;
    }
    function bn(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return $i(e);
        if (e.$$typeof === Ba) return pt(e);
      }
      throw Error("An unsupported type was passed to use(): " + String(e));
    }
    function wt(e) {
      var t = null, a = Ee.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var i = Ee.alternate;
        i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
          data: i.data.map(function(o) {
            return o.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = { data: [], index: 0 }), a === null && (a = sr(), Ee.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0 || _y)
        for (a = t.data[t.index] = Array(e), i = 0; i < e; i++)
          a[i] = o0;
      else
        a.length !== e && console.error(
          "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
          a.length,
          e
        );
      return t.index++, a;
    }
    function Pe(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Fe(e, t, a) {
      var i = Ut();
      if (a !== void 0) {
        var o = a(t);
        if (Us) {
          qe(!0);
          try {
            a(t);
          } finally {
            qe(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = Ih.bind(
        null,
        Ee,
        e
      ), [i.memoizedState, e];
    }
    function Oa(e) {
      var t = Le();
      return Ma(t, mt, e);
    }
    function Ma(e, t, a) {
      var i = e.queue;
      if (i === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      i.lastRenderedReducer = a;
      var o = e.baseQueue, f = i.pending;
      if (f !== null) {
        if (o !== null) {
          var d = o.next;
          o.next = f.next, f.next = d;
        }
        t.baseQueue !== o && console.error(
          "Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."
        ), t.baseQueue = o = f, i.pending = null;
      }
      if (f = e.baseState, o === null) e.memoizedState = f;
      else {
        t = o.next;
        var h = d = null, p = null, v = t, H = !1;
        do {
          var q = v.lane & -536870913;
          if (q !== v.lane ? (Ve & q) === q : (Xo & q) === q) {
            var U = v.revertLane;
            if (U === 0)
              p !== null && (p = p.next = {
                lane: 0,
                revertLane: 0,
                action: v.action,
                hasEagerState: v.hasEagerState,
                eagerState: v.eagerState,
                next: null
              }), q === Ds && (H = !0);
            else if ((Xo & U) === U) {
              v = v.next, U === Ds && (H = !0);
              continue;
            } else
              q = {
                lane: 0,
                revertLane: v.revertLane,
                action: v.action,
                hasEagerState: v.hasEagerState,
                eagerState: v.eagerState,
                next: null
              }, p === null ? (h = p = q, d = f) : p = p.next = q, Ee.lanes |= U, Zo |= U;
            q = v.action, Us && a(f, q), f = v.hasEagerState ? v.eagerState : a(f, q);
          } else
            U = {
              lane: q,
              revertLane: v.revertLane,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }, p === null ? (h = p = U, d = f) : p = p.next = U, Ee.lanes |= q, Zo |= q;
          v = v.next;
        } while (v !== null && v !== t);
        if (p === null ? d = f : p.next = h, !va(f, e.memoizedState) && (Ml = !0, H && (a = Zd, a !== null)))
          throw a;
        e.memoizedState = f, e.baseState = d, e.baseQueue = p, i.lastRenderedState = f;
      }
      return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
    }
    function Wi(e) {
      var t = Le(), a = t.queue;
      if (a === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      a.lastRenderedReducer = e;
      var i = a.dispatch, o = a.pending, f = t.memoizedState;
      if (o !== null) {
        a.pending = null;
        var d = o = o.next;
        do
          f = e(f, d.action), d = d.next;
        while (d !== o);
        va(f, t.memoizedState) || (Ml = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), a.lastRenderedState = f;
      }
      return [f, i];
    }
    function ru(e, t, a) {
      var i = Ee, o = Ut();
      if (lt) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        var f = a();
        Kd || f === a() || (console.error(
          "The result of getServerSnapshot should be cached to avoid an infinite loop"
        ), Kd = !0);
      } else {
        if (f = t(), Kd || (a = t(), va(f, a) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Kd = !0)), vt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        (Ve & 124) !== 0 || Lh(i, t, f);
      }
      return o.memoizedState = f, a = { value: f, getSnapshot: t }, o.queue = a, hr(
        eo.bind(null, i, a, e),
        [e]
      ), i.flags |= 2048, Tn(
        $n | Tl,
        ei(),
        Pc.bind(
          null,
          i,
          a,
          f,
          t
        ),
        null
      ), f;
    }
    function Rf(e, t, a) {
      var i = Ee, o = Le(), f = lt;
      if (f) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        a = a();
      } else if (a = t(), !Kd) {
        var d = t();
        va(a, d) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Kd = !0);
      }
      (d = !va(
        (mt || o).memoizedState,
        a
      )) && (o.memoizedState = a, Ml = !0), o = o.queue;
      var h = eo.bind(null, i, o, e);
      if ($t(2048, Tl, h, [e]), o.getSnapshot !== t || d || ol !== null && ol.memoizedState.tag & $n) {
        if (i.flags |= 2048, Tn(
          $n | Tl,
          ei(),
          Pc.bind(
            null,
            i,
            o,
            a,
            t
          ),
          null
        ), vt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        f || (Xo & 124) !== 0 || Lh(i, t, a);
      }
      return a;
    }
    function Lh(e, t, a) {
      e.flags |= 16384, e = { getSnapshot: t, value: a }, t = Ee.updateQueue, t === null ? (t = sr(), Ee.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
    }
    function Pc(e, t, a, i) {
      t.value = a, t.getSnapshot = i, Zh(t) && to(e);
    }
    function eo(e, t, a) {
      return a(function() {
        Zh(t) && to(e);
      });
    }
    function Zh(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !va(e, a);
      } catch {
        return !0;
      }
    }
    function to(e) {
      var t = Ll(e, 2);
      t !== null && Ht(t, e, 2);
    }
    function zf(e) {
      var t = Ut();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), Us) {
          qe(!0);
          try {
            a();
          } finally {
            qe(!1);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pe,
        lastRenderedState: e
      }, t;
    }
    function du(e) {
      e = zf(e);
      var t = e.queue, a = uo.bind(null, Ee, t);
      return t.dispatch = a, [e.memoizedState, a];
    }
    function Ia(e) {
      var t = Ut();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Er.bind(
        null,
        Ee,
        !0,
        a
      ), a.dispatch = t, [e, t];
    }
    function hu(e, t) {
      var a = Le();
      return Sn(a, mt, e, t);
    }
    function Sn(e, t, a, i) {
      return e.baseState = a, Ma(
        e,
        mt,
        typeof i == "function" ? i : Pe
      );
    }
    function rr(e, t) {
      var a = Le();
      return mt !== null ? Sn(a, mt, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    }
    function Jh(e, t, a, i, o) {
      if (Nf(e))
        throw Error("Cannot update form state while rendering.");
      if (e = t.action, e !== null) {
        var f = {
          payload: o,
          action: e,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(d) {
            f.listeners.push(d);
          }
        };
        j.T !== null ? a(!0) : f.isTransition = !1, i(f), a = t.pending, a === null ? (f.next = t.pending = f, lo(t, f)) : (f.next = a.next, t.pending = a.next = f);
      }
    }
    function lo(e, t) {
      var a = t.action, i = t.payload, o = e.state;
      if (t.isTransition) {
        var f = j.T, d = {};
        j.T = d, j.T._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var h = a(o, i), p = j.S;
          p !== null && p(d, h), Df(e, t, h);
        } catch (v) {
          al(e, t, v);
        } finally {
          j.T = f, f === null && d._updatedFibers && (e = d._updatedFibers.size, d._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          ));
        }
      } else
        try {
          d = a(o, i), Df(e, t, d);
        } catch (v) {
          al(e, t, v);
        }
    }
    function Df(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? (a.then(
        function(i) {
          Pu(e, t, i);
        },
        function(i) {
          return al(e, t, i);
        }
      ), t.isTransition || console.error(
        "An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop."
      )) : Pu(e, t, a);
    }
    function Pu(e, t, a) {
      t.status = "fulfilled", t.value = a, Of(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, lo(e, a)));
    }
    function al(e, t, a) {
      var i = e.pending;
      if (e.pending = null, i !== null) {
        i = i.next;
        do
          t.status = "rejected", t.reason = a, Of(t), t = t.next;
        while (t !== i);
      }
      e.action = null;
    }
    function Of(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function Kh(e, t) {
      return t;
    }
    function ao(e, t) {
      if (lt) {
        var a = vt.formState;
        if (a !== null) {
          e: {
            var i = Ee;
            if (lt) {
              if (Vt) {
                t: {
                  for (var o = Vt, f = xi; o.nodeType !== 8; ) {
                    if (!f) {
                      o = null;
                      break t;
                    }
                    if (o = vl(
                      o.nextSibling
                    ), o === null) {
                      o = null;
                      break t;
                    }
                  }
                  f = o.data, o = f === Eg || f === c1 ? o : null;
                }
                if (o) {
                  Vt = vl(
                    o.nextSibling
                  ), i = o.data === Eg;
                  break e;
                }
              }
              mn(i);
            }
            i = !1;
          }
          i && (t = a[0]);
        }
      }
      return a = Ut(), a.memoizedState = a.baseState = t, i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kh,
        lastRenderedState: t
      }, a.queue = i, a = uo.bind(
        null,
        Ee,
        i
      ), i.dispatch = a, i = zf(!1), f = Er.bind(
        null,
        Ee,
        !1,
        i.queue
      ), i = Ut(), o = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, i.queue = o, a = Jh.bind(
        null,
        Ee,
        o,
        f,
        a
      ), o.dispatch = a, i.memoizedState = e, [t, a, !1];
    }
    function dr(e) {
      var t = Le();
      return jp(t, mt, e);
    }
    function jp(e, t, a) {
      if (t = Ma(
        e,
        t,
        Kh
      )[0], e = Oa(Pe)[0], typeof t == "object" && t !== null && typeof t.then == "function")
        try {
          var i = $i(t);
        } catch (d) {
          throw d === Hy ? O0 : d;
        }
      else i = t;
      t = Le();
      var o = t.queue, f = o.dispatch;
      return a !== t.memoizedState && (Ee.flags |= 2048, Tn(
        $n | Tl,
        ei(),
        kt.bind(null, o, a),
        null
      )), [i, f, e];
    }
    function kt(e, t) {
      e.action = t;
    }
    function no(e) {
      var t = Le(), a = mt;
      if (a !== null)
        return jp(t, a, e);
      Le(), t = t.memoizedState, a = Le();
      var i = a.queue.dispatch;
      return a.memoizedState = e, [t, i, !1];
    }
    function Tn(e, t, a, i) {
      return e = {
        tag: e,
        create: a,
        deps: i,
        inst: t,
        next: null
      }, t = Ee.updateQueue, t === null && (t = sr(), Ee.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (i = a.next, a.next = e, e.next = i, t.lastEffect = e), e;
    }
    function ei() {
      return { destroy: void 0, resource: void 0 };
    }
    function Mf(e) {
      var t = Ut();
      return e = { current: e }, t.memoizedState = e;
    }
    function Ua(e, t, a, i) {
      var o = Ut();
      i = i === void 0 ? null : i, Ee.flags |= e, o.memoizedState = Tn(
        $n | t,
        ei(),
        a,
        i
      );
    }
    function $t(e, t, a, i) {
      var o = Le();
      i = i === void 0 ? null : i;
      var f = o.memoizedState.inst;
      mt !== null && i !== null && Fu(i, mt.memoizedState.deps) ? o.memoizedState = Tn(t, f, a, i) : (Ee.flags |= e, o.memoizedState = Tn(
        $n | t,
        f,
        a,
        i
      ));
    }
    function hr(e, t) {
      (Ee.mode & Uu) !== At && (Ee.mode & Zg) === At ? Ua(276826112, Tl, e, t) : Ua(8390656, Tl, e, t);
    }
    function mr(e, t) {
      var a = 4194308;
      return (Ee.mode & Uu) !== At && (a |= 134217728), Ua(a, Gl, e, t);
    }
    function _p(e, t) {
      if (typeof t == "function") {
        e = e();
        var a = t(e);
        return function() {
          typeof a == "function" ? a() : t(null);
        };
      }
      if (t != null)
        return t.hasOwnProperty("current") || console.error(
          "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.",
          "an object with keys {" + Object.keys(t).join(", ") + "}"
        ), e = e(), t.current = e, function() {
          t.current = null;
        };
    }
    function yr(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null;
      var i = 4194308;
      (Ee.mode & Uu) !== At && (i |= 134217728), Ua(
        i,
        Gl,
        _p.bind(null, t, e),
        a
      );
    }
    function En(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null, $t(
        4,
        Gl,
        _p.bind(null, t, e),
        a
      );
    }
    function Uf(e, t) {
      return Ut().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    }
    function Fi(e, t) {
      var a = Le();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      return t !== null && Fu(t, i[1]) ? i[0] : (a.memoizedState = [e, t], e);
    }
    function pr(e, t) {
      var a = Ut();
      t = t === void 0 ? null : t;
      var i = e();
      if (Us) {
        qe(!0);
        try {
          e();
        } finally {
          qe(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function ti(e, t) {
      var a = Le();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      if (t !== null && Fu(t, i[1]))
        return i[0];
      if (i = e(), Us) {
        qe(!0);
        try {
          e();
        } finally {
          qe(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function vr(e, t) {
      var a = Ut();
      return br(a, e, t);
    }
    function Cf(e, t) {
      var a = Le();
      return Hf(
        a,
        mt.memoizedState,
        e,
        t
      );
    }
    function gr(e, t) {
      var a = Le();
      return mt === null ? br(a, e, t) : Hf(
        a,
        mt.memoizedState,
        e,
        t
      );
    }
    function br(e, t, a) {
      return a === void 0 || (Xo & 1073741824) !== 0 ? e.memoizedState = t : (e.memoizedState = a, e = Zp(), Ee.lanes |= e, Zo |= e, a);
    }
    function Hf(e, t, a, i) {
      return va(a, t) ? a : Jd.current !== null ? (e = br(e, a, i), va(e, t) || (Ml = !0), e) : (Xo & 42) === 0 ? (Ml = !0, e.memoizedState = a) : (e = Zp(), Ee.lanes |= e, Zo |= e, t);
    }
    function kh(e, t, a, i, o) {
      var f = ve.p;
      ve.p = f !== 0 && f < nn ? f : nn;
      var d = j.T, h = {};
      j.T = h, Er(e, !1, t, a), h._updatedFibers = /* @__PURE__ */ new Set();
      try {
        var p = o(), v = j.S;
        if (v !== null && v(h, p), p !== null && typeof p == "object" && typeof p.then == "function") {
          var H = Cp(
            p,
            i
          );
          mu(
            e,
            t,
            H,
            Fl(e)
          );
        } else
          mu(
            e,
            t,
            i,
            Fl(e)
          );
      } catch (q) {
        mu(
          e,
          t,
          { then: function() {
          }, status: "rejected", reason: q },
          Fl(e)
        );
      } finally {
        ve.p = f, j.T = d, d === null && h._updatedFibers && (e = h._updatedFibers.size, h._updatedFibers.clear(), 10 < e && console.warn(
          "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
        ));
      }
    }
    function Ii(e, t, a, i) {
      if (e.tag !== 5)
        throw Error(
          "Expected the form instance to be a HostComponent. This is a bug in React."
        );
      var o = $h(e).queue;
      kh(
        e,
        o,
        t,
        Vs,
        a === null ? be : function() {
          return Wh(e), a(i);
        }
      );
    }
    function $h(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: Vs,
        baseState: Vs,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Pe,
          lastRenderedState: Vs
        },
        next: null
      };
      var a = {};
      return t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Pe,
          lastRenderedState: a
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function Wh(e) {
      j.T === null && console.error(
        "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
      );
      var t = $h(e).next.queue;
      mu(
        e,
        t,
        {},
        Fl(e)
      );
    }
    function xn() {
      var e = zf(!1);
      return e = kh.bind(
        null,
        Ee,
        e.queue,
        !0,
        !1
      ), Ut().memoizedState = e, [!1, e];
    }
    function Sr() {
      var e = Oa(Pe)[0], t = Le().memoizedState;
      return [
        typeof e == "boolean" ? e : $i(e),
        t
      ];
    }
    function Tr() {
      var e = Wi(Pe)[0], t = Le().memoizedState;
      return [
        typeof e == "boolean" ? e : $i(e),
        t
      ];
    }
    function kl() {
      return pt(Iy);
    }
    function An() {
      var e = Ut(), t = vt.identifierPrefix;
      if (lt) {
        var a = zc, i = Rc;
        a = (i & ~(1 << 32 - Dl(i) - 1)).toString(32) + a, t = "«" + t + "R" + a, a = H0++, 0 < a && (t += "H" + a.toString(32)), t += "»";
      } else
        a = RS++, t = "«" + t + "r" + a.toString(32) + "»";
      return e.memoizedState = t;
    }
    function Pi() {
      return Ut().memoizedState = Fh.bind(
        null,
        Ee
      );
    }
    function Fh(e, t) {
      for (var a = e.return; a !== null; ) {
        switch (a.tag) {
          case 24:
          case 3:
            var i = Fl(a);
            e = vn(i);
            var o = $a(a, e, i);
            o !== null && (Ht(o, a, i), Wu(o, a, i)), a = Tf(), t != null && o !== null && console.error(
              "The seed argument is not enabled outside experimental channels."
            ), e.payload = { cache: a };
            return;
        }
        a = a.return;
      }
    }
    function Ih(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = Fl(e);
      var o = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      Nf(e) ? ec(t, o) : (o = zh(e, t, o, i), o !== null && (Ht(o, e, i), jf(o, t, i))), Oe(e, i);
    }
    function uo(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = Fl(e), mu(e, t, a, i), Oe(e, i);
    }
    function mu(e, t, a, i) {
      var o = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (Nf(e)) ec(t, o);
      else {
        var f = e.alternate;
        if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null)) {
          var d = j.H;
          j.H = Hu;
          try {
            var h = t.lastRenderedState, p = f(h, a);
            if (o.hasEagerState = !0, o.eagerState = p, va(p, h))
              return lr(e, t, o, 0), vt === null && pf(), !1;
          } catch {
          } finally {
            j.H = d;
          }
        }
        if (a = zh(e, t, o, i), a !== null)
          return Ht(a, e, i), jf(a, t, i), !0;
      }
      return !1;
    }
    function Er(e, t, a, i) {
      if (j.T === null && Ds === 0 && console.error(
        "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
      ), i = {
        lane: 2,
        revertLane: Mm(),
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, Nf(e)) {
        if (t)
          throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else
        t = zh(
          e,
          a,
          i,
          2
        ), t !== null && Ht(t, e, 2);
      Oe(e, 2);
    }
    function Nf(e) {
      var t = e.alternate;
      return e === Ee || t !== null && t === Ee;
    }
    function ec(e, t) {
      kd = C0 = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function jf(e, t, a) {
      if ((a & 4194048) !== 0) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, qc(e, a);
      }
    }
    function nl(e) {
      var t = je;
      return e != null && (je = t === null ? e : t.concat(e)), t;
    }
    function io(e, t, a) {
      for (var i = Object.keys(e.props), o = 0; o < i.length; o++) {
        var f = i[o];
        if (f !== "children" && f !== "key") {
          t === null && (t = bf(e, a.mode, 0), t._debugInfo = je, t.return = a), ae(
            t,
            function(d) {
              console.error(
                "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                d
              );
            },
            f
          );
          break;
        }
      }
    }
    function co(e) {
      var t = By;
      return By += 1, $d === null && ($d = Vh()), Ra($d, e, t);
    }
    function Ca(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function xe(e, t) {
      throw t.$$typeof === ss ? Error(
        `A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`
      ) : (e = Object.prototype.toString.call(t), Error(
        "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
      ));
    }
    function at(e, t) {
      var a = ce(e) || "Component";
      Ab[a] || (Ab[a] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  root.render(%s)`,
        t,
        t,
        t
      ) : console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  <%s>{%s}</%s>`,
        t,
        t,
        a,
        t,
        a
      ));
    }
    function Dt(e, t) {
      var a = ce(e) || "Component";
      Rb[a] || (Rb[a] = !0, t = String(t), e.tag === 3 ? console.error(
        `Symbols are not valid as a React child.
  root.render(%s)`,
        t
      ) : console.error(
        `Symbols are not valid as a React child.
  <%s>%s</%s>`,
        a,
        t,
        a
      ));
    }
    function _f(e) {
      function t(S, T) {
        if (e) {
          var x = S.deletions;
          x === null ? (S.deletions = [T], S.flags |= 16) : x.push(T);
        }
      }
      function a(S, T) {
        if (!e) return null;
        for (; T !== null; )
          t(S, T), T = T.sibling;
        return null;
      }
      function i(S) {
        for (var T = /* @__PURE__ */ new Map(); S !== null; )
          S.key !== null ? T.set(S.key, S) : T.set(S.index, S), S = S.sibling;
        return T;
      }
      function o(S, T) {
        return S = hn(S, T), S.index = 0, S.sibling = null, S;
      }
      function f(S, T, x) {
        return S.index = x, e ? (x = S.alternate, x !== null ? (x = x.index, x < T ? (S.flags |= 67108866, T) : x) : (S.flags |= 67108866, T)) : (S.flags |= 1048576, T);
      }
      function d(S) {
        return e && S.alternate === null && (S.flags |= 67108866), S;
      }
      function h(S, T, x, w) {
        return T === null || T.tag !== 6 ? (T = Lu(
          x,
          S.mode,
          w
        ), T.return = S, T._debugOwner = S, T._debugTask = S._debugTask, T._debugInfo = je, T) : (T = o(T, x), T.return = S, T._debugInfo = je, T);
      }
      function p(S, T, x, w) {
        var W = x.type;
        return W === Ae ? (T = H(
          S,
          T,
          x.props.children,
          w,
          x.key
        ), io(x, T, S), T) : T !== null && (T.elementType === W || Dp(T, x) || typeof W == "object" && W !== null && W.$$typeof === ya && Qo(W) === T.type) ? (T = o(T, x.props), Ca(T, x), T.return = S, T._debugOwner = x._owner, T._debugInfo = je, T) : (T = bf(x, S.mode, w), Ca(T, x), T.return = S, T._debugInfo = je, T);
      }
      function v(S, T, x, w) {
        return T === null || T.tag !== 4 || T.stateNode.containerInfo !== x.containerInfo || T.stateNode.implementation !== x.implementation ? (T = Uh(x, S.mode, w), T.return = S, T._debugInfo = je, T) : (T = o(T, x.children || []), T.return = S, T._debugInfo = je, T);
      }
      function H(S, T, x, w, W) {
        return T === null || T.tag !== 7 ? (T = Qu(
          x,
          S.mode,
          w,
          W
        ), T.return = S, T._debugOwner = S, T._debugTask = S._debugTask, T._debugInfo = je, T) : (T = o(T, x), T.return = S, T._debugInfo = je, T);
      }
      function q(S, T, x) {
        if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
          return T = Lu(
            "" + T,
            S.mode,
            x
          ), T.return = S, T._debugOwner = S, T._debugTask = S._debugTask, T._debugInfo = je, T;
        if (typeof T == "object" && T !== null) {
          switch (T.$$typeof) {
            case mi:
              return x = bf(
                T,
                S.mode,
                x
              ), Ca(x, T), x.return = S, S = nl(T._debugInfo), x._debugInfo = je, je = S, x;
            case bc:
              return T = Uh(
                T,
                S.mode,
                x
              ), T.return = S, T._debugInfo = je, T;
            case ya:
              var w = nl(T._debugInfo);
              return T = Qo(T), S = q(S, T, x), je = w, S;
          }
          if (Te(T) || Ie(T))
            return x = Qu(
              T,
              S.mode,
              x,
              null
            ), x.return = S, x._debugOwner = S, x._debugTask = S._debugTask, S = nl(T._debugInfo), x._debugInfo = je, je = S, x;
          if (typeof T.then == "function")
            return w = nl(T._debugInfo), S = q(
              S,
              co(T),
              x
            ), je = w, S;
          if (T.$$typeof === Ba)
            return q(
              S,
              Sf(S, T),
              x
            );
          xe(S, T);
        }
        return typeof T == "function" && at(S, T), typeof T == "symbol" && Dt(S, T), null;
      }
      function U(S, T, x, w) {
        var W = T !== null ? T.key : null;
        if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
          return W !== null ? null : h(S, T, "" + x, w);
        if (typeof x == "object" && x !== null) {
          switch (x.$$typeof) {
            case mi:
              return x.key === W ? (W = nl(x._debugInfo), S = p(
                S,
                T,
                x,
                w
              ), je = W, S) : null;
            case bc:
              return x.key === W ? v(S, T, x, w) : null;
            case ya:
              return W = nl(x._debugInfo), x = Qo(x), S = U(
                S,
                T,
                x,
                w
              ), je = W, S;
          }
          if (Te(x) || Ie(x))
            return W !== null ? null : (W = nl(x._debugInfo), S = H(
              S,
              T,
              x,
              w,
              null
            ), je = W, S);
          if (typeof x.then == "function")
            return W = nl(x._debugInfo), S = U(
              S,
              T,
              co(x),
              w
            ), je = W, S;
          if (x.$$typeof === Ba)
            return U(
              S,
              T,
              Sf(S, x),
              w
            );
          xe(S, x);
        }
        return typeof x == "function" && at(S, x), typeof x == "symbol" && Dt(S, x), null;
      }
      function Y(S, T, x, w, W) {
        if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
          return S = S.get(x) || null, h(T, S, "" + w, W);
        if (typeof w == "object" && w !== null) {
          switch (w.$$typeof) {
            case mi:
              return x = S.get(
                w.key === null ? x : w.key
              ) || null, S = nl(w._debugInfo), T = p(
                T,
                x,
                w,
                W
              ), je = S, T;
            case bc:
              return S = S.get(
                w.key === null ? x : w.key
              ) || null, v(T, S, w, W);
            case ya:
              var Re = nl(w._debugInfo);
              return w = Qo(w), T = Y(
                S,
                T,
                x,
                w,
                W
              ), je = Re, T;
          }
          if (Te(w) || Ie(w))
            return x = S.get(x) || null, S = nl(w._debugInfo), T = H(
              T,
              x,
              w,
              W,
              null
            ), je = S, T;
          if (typeof w.then == "function")
            return Re = nl(w._debugInfo), T = Y(
              S,
              T,
              x,
              co(w),
              W
            ), je = Re, T;
          if (w.$$typeof === Ba)
            return Y(
              S,
              T,
              x,
              Sf(T, w),
              W
            );
          xe(T, w);
        }
        return typeof w == "function" && at(T, w), typeof w == "symbol" && Dt(T, w), null;
      }
      function ne(S, T, x, w) {
        if (typeof x != "object" || x === null) return w;
        switch (x.$$typeof) {
          case mi:
          case bc:
            De(S, T, x);
            var W = x.key;
            if (typeof W != "string") break;
            if (w === null) {
              w = /* @__PURE__ */ new Set(), w.add(W);
              break;
            }
            if (!w.has(W)) {
              w.add(W);
              break;
            }
            ae(T, function() {
              console.error(
                "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
                W
              );
            });
            break;
          case ya:
            x = Qo(x), ne(S, T, x, w);
        }
        return w;
      }
      function ge(S, T, x, w) {
        for (var W = null, Re = null, ue = null, ze = T, Me = T = 0, Rt = null; ze !== null && Me < x.length; Me++) {
          ze.index > Me ? (Rt = ze, ze = null) : Rt = ze.sibling;
          var Pt = U(
            S,
            ze,
            x[Me],
            w
          );
          if (Pt === null) {
            ze === null && (ze = Rt);
            break;
          }
          W = ne(
            S,
            Pt,
            x[Me],
            W
          ), e && ze && Pt.alternate === null && t(S, ze), T = f(Pt, T, Me), ue === null ? Re = Pt : ue.sibling = Pt, ue = Pt, ze = Rt;
        }
        if (Me === x.length)
          return a(S, ze), lt && Qi(S, Me), Re;
        if (ze === null) {
          for (; Me < x.length; Me++)
            ze = q(S, x[Me], w), ze !== null && (W = ne(
              S,
              ze,
              x[Me],
              W
            ), T = f(
              ze,
              T,
              Me
            ), ue === null ? Re = ze : ue.sibling = ze, ue = ze);
          return lt && Qi(S, Me), Re;
        }
        for (ze = i(ze); Me < x.length; Me++)
          Rt = Y(
            ze,
            S,
            Me,
            x[Me],
            w
          ), Rt !== null && (W = ne(
            S,
            Rt,
            x[Me],
            W
          ), e && Rt.alternate !== null && ze.delete(
            Rt.key === null ? Me : Rt.key
          ), T = f(
            Rt,
            T,
            Me
          ), ue === null ? Re = Rt : ue.sibling = Rt, ue = Rt);
        return e && ze.forEach(function(_c) {
          return t(S, _c);
        }), lt && Qi(S, Me), Re;
      }
      function gt(S, T, x, w) {
        if (x == null)
          throw Error("An iterable object provided no iterator.");
        for (var W = null, Re = null, ue = T, ze = T = 0, Me = null, Rt = null, Pt = x.next(); ue !== null && !Pt.done; ze++, Pt = x.next()) {
          ue.index > ze ? (Me = ue, ue = null) : Me = ue.sibling;
          var _c = U(S, ue, Pt.value, w);
          if (_c === null) {
            ue === null && (ue = Me);
            break;
          }
          Rt = ne(
            S,
            _c,
            Pt.value,
            Rt
          ), e && ue && _c.alternate === null && t(S, ue), T = f(_c, T, ze), Re === null ? W = _c : Re.sibling = _c, Re = _c, ue = Me;
        }
        if (Pt.done)
          return a(S, ue), lt && Qi(S, ze), W;
        if (ue === null) {
          for (; !Pt.done; ze++, Pt = x.next())
            ue = q(S, Pt.value, w), ue !== null && (Rt = ne(
              S,
              ue,
              Pt.value,
              Rt
            ), T = f(
              ue,
              T,
              ze
            ), Re === null ? W = ue : Re.sibling = ue, Re = ue);
          return lt && Qi(S, ze), W;
        }
        for (ue = i(ue); !Pt.done; ze++, Pt = x.next())
          Me = Y(
            ue,
            S,
            ze,
            Pt.value,
            w
          ), Me !== null && (Rt = ne(
            S,
            Me,
            Pt.value,
            Rt
          ), e && Me.alternate !== null && ue.delete(
            Me.key === null ? ze : Me.key
          ), T = f(
            Me,
            T,
            ze
          ), Re === null ? W = Me : Re.sibling = Me, Re = Me);
        return e && ue.forEach(function(IS) {
          return t(S, IS);
        }), lt && Qi(S, ze), W;
      }
      function Ze(S, T, x, w) {
        if (typeof x == "object" && x !== null && x.type === Ae && x.key === null && (io(x, null, S), x = x.props.children), typeof x == "object" && x !== null) {
          switch (x.$$typeof) {
            case mi:
              var W = nl(x._debugInfo);
              e: {
                for (var Re = x.key; T !== null; ) {
                  if (T.key === Re) {
                    if (Re = x.type, Re === Ae) {
                      if (T.tag === 7) {
                        a(
                          S,
                          T.sibling
                        ), w = o(
                          T,
                          x.props.children
                        ), w.return = S, w._debugOwner = x._owner, w._debugInfo = je, io(x, w, S), S = w;
                        break e;
                      }
                    } else if (T.elementType === Re || Dp(
                      T,
                      x
                    ) || typeof Re == "object" && Re !== null && Re.$$typeof === ya && Qo(Re) === T.type) {
                      a(
                        S,
                        T.sibling
                      ), w = o(T, x.props), Ca(w, x), w.return = S, w._debugOwner = x._owner, w._debugInfo = je, S = w;
                      break e;
                    }
                    a(S, T);
                    break;
                  } else t(S, T);
                  T = T.sibling;
                }
                x.type === Ae ? (w = Qu(
                  x.props.children,
                  S.mode,
                  w,
                  x.key
                ), w.return = S, w._debugOwner = S, w._debugTask = S._debugTask, w._debugInfo = je, io(x, w, S), S = w) : (w = bf(
                  x,
                  S.mode,
                  w
                ), Ca(w, x), w.return = S, w._debugInfo = je, S = w);
              }
              return S = d(S), je = W, S;
            case bc:
              e: {
                for (W = x, x = W.key; T !== null; ) {
                  if (T.key === x)
                    if (T.tag === 4 && T.stateNode.containerInfo === W.containerInfo && T.stateNode.implementation === W.implementation) {
                      a(
                        S,
                        T.sibling
                      ), w = o(
                        T,
                        W.children || []
                      ), w.return = S, S = w;
                      break e;
                    } else {
                      a(S, T);
                      break;
                    }
                  else t(S, T);
                  T = T.sibling;
                }
                w = Uh(
                  W,
                  S.mode,
                  w
                ), w.return = S, S = w;
              }
              return d(S);
            case ya:
              return W = nl(x._debugInfo), x = Qo(x), S = Ze(
                S,
                T,
                x,
                w
              ), je = W, S;
          }
          if (Te(x))
            return W = nl(x._debugInfo), S = ge(
              S,
              T,
              x,
              w
            ), je = W, S;
          if (Ie(x)) {
            if (W = nl(x._debugInfo), Re = Ie(x), typeof Re != "function")
              throw Error(
                "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
              );
            var ue = Re.call(x);
            return ue === x ? (S.tag !== 0 || Object.prototype.toString.call(S.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(ue) !== "[object Generator]") && (Eb || console.error(
              "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
            ), Eb = !0) : x.entries !== Re || Iv || (console.error(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), Iv = !0), S = gt(
              S,
              T,
              ue,
              w
            ), je = W, S;
          }
          if (typeof x.then == "function")
            return W = nl(x._debugInfo), S = Ze(
              S,
              T,
              co(x),
              w
            ), je = W, S;
          if (x.$$typeof === Ba)
            return Ze(
              S,
              T,
              Sf(S, x),
              w
            );
          xe(S, x);
        }
        return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (W = "" + x, T !== null && T.tag === 6 ? (a(
          S,
          T.sibling
        ), w = o(T, W), w.return = S, S = w) : (a(S, T), w = Lu(
          W,
          S.mode,
          w
        ), w.return = S, w._debugOwner = S, w._debugTask = S._debugTask, w._debugInfo = je, S = w), d(S)) : (typeof x == "function" && at(S, x), typeof x == "symbol" && Dt(S, x), a(S, T));
      }
      return function(S, T, x, w) {
        var W = je;
        je = null;
        try {
          By = 0;
          var Re = Ze(
            S,
            T,
            x,
            w
          );
          return $d = null, Re;
        } catch (Rt) {
          if (Rt === Hy || Rt === O0) throw Rt;
          var ue = ee(29, Rt, null, S.mode);
          ue.lanes = w, ue.return = S;
          var ze = ue._debugInfo = je;
          if (ue._debugOwner = S._debugOwner, ue._debugTask = S._debugTask, ze != null) {
            for (var Me = ze.length - 1; 0 <= Me; Me--)
              if (typeof ze[Me].stack == "string") {
                ue._debugOwner = ze[Me], ue._debugTask = ze[Me].debugTask;
                break;
              }
          }
          return ue;
        } finally {
          je = W;
        }
      };
    }
    function sa(e) {
      var t = e.alternate;
      pe(
        El,
        El.current & Fd,
        e
      ), pe(Fn, e, e), Ri === null && (t === null || Jd.current !== null || t.memoizedState !== null) && (Ri = e);
    }
    function li(e) {
      if (e.tag === 22) {
        if (pe(El, El.current, e), pe(Fn, e, e), Ri === null) {
          var t = e.alternate;
          t !== null && t.memoizedState !== null && (Ri = e);
        }
      } else Pa(e);
    }
    function Pa(e) {
      pe(El, El.current, e), pe(
        Fn,
        Fn.current,
        e
      );
    }
    function ra(e) {
      We(Fn, e), Ri === e && (Ri = null), We(El, e);
    }
    function yu(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || a.data === Hc || qn(a)))
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    function Ph(e) {
      if (e !== null && typeof e != "function") {
        var t = String(e);
        qb.has(t) || (qb.add(t), console.error(
          "Expected the last optional `callback` argument to be a function. Instead received: %s.",
          e
        ));
      }
    }
    function Ot(e, t, a, i) {
      var o = e.memoizedState, f = a(i, o);
      if (e.mode & na) {
        qe(!0);
        try {
          f = a(i, o);
        } finally {
          qe(!1);
        }
      }
      f === void 0 && (t = Be(t) || "Component", Nb.has(t) || (Nb.add(t), console.error(
        "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
        t
      ))), o = f == null ? o : Ce({}, o, f), e.memoizedState = o, e.lanes === 0 && (e.updateQueue.baseState = o);
    }
    function xr(e, t, a, i, o, f, d) {
      var h = e.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        if (a = h.shouldComponentUpdate(
          i,
          f,
          d
        ), e.mode & na) {
          qe(!0);
          try {
            a = h.shouldComponentUpdate(
              i,
              f,
              d
            );
          } finally {
            qe(!1);
          }
        }
        return a === void 0 && console.error(
          "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
          Be(t) || "Component"
        ), a;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !yf(a, i) || !yf(o, f) : !0;
    }
    function Ar(e, t, a, i) {
      var o = t.state;
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o && (e = ce(e) || "Component", Ob.has(e) || (Ob.add(e), console.error(
        "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
        e
      )), Pv.enqueueReplaceState(
        t,
        t.state,
        null
      ));
    }
    function ai(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var i in t)
          i !== "ref" && (a[i] = t[i]);
      }
      if (e = e.defaultProps) {
        a === t && (a = Ce({}, a));
        for (var o in e)
          a[o] === void 0 && (a[o] = e[o]);
      }
      return a;
    }
    function em(e) {
      eg(e), console.warn(
        `%s

%s
`,
        Id ? "An error occurred in the <" + Id + "> component." : "An error occurred in one of your React components.",
        `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`
      );
    }
    function Bp(e) {
      var t = Id ? "The above error occurred in the <" + Id + "> component." : "The above error occurred in one of your React components.", a = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((tg || "Anonymous") + ".");
      if (typeof e == "object" && e !== null && typeof e.environmentName == "string") {
        var i = e.environmentName;
        e = [
          `%o

%s

%s
`,
          e,
          t,
          a
        ].slice(0), typeof e[0] == "string" ? e.splice(
          0,
          1,
          y1 + e[0],
          p1,
          I0 + i + I0,
          v1
        ) : e.splice(
          0,
          0,
          y1,
          p1,
          I0 + i + I0,
          v1
        ), e.unshift(console), i = WS.apply(console.error, e), i();
      } else
        console.error(
          `%o

%s

%s
`,
          e,
          t,
          a
        );
    }
    function Rr(e) {
      eg(e);
    }
    function oo(e, t) {
      try {
        Id = t.source ? ce(t.source) : null, tg = null;
        var a = t.value;
        if (j.actQueue !== null)
          j.thrownErrors.push(a);
        else {
          var i = e.onUncaughtError;
          i(a, { componentStack: t.stack });
        }
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function zr(e, t, a) {
      try {
        Id = a.source ? ce(a.source) : null, tg = ce(t);
        var i = e.onCaughtError;
        i(a.value, {
          componentStack: a.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function Al(e, t, a) {
      return a = vn(a), a.tag = Lv, a.payload = { element: null }, a.callback = function() {
        ae(t.source, oo, e, t);
      }, a;
    }
    function Ct(e) {
      return e = vn(e), e.tag = Lv, e;
    }
    function Bf(e, t, a, i) {
      var o = a.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var f = i.value;
        e.payload = function() {
          return o(f);
        }, e.callback = function() {
          Op(a), ae(
            i.source,
            zr,
            t,
            a,
            i
          );
        };
      }
      var d = a.stateNode;
      d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
        Op(a), ae(
          i.source,
          zr,
          t,
          a,
          i
        ), typeof o != "function" && (Ko === null ? Ko = /* @__PURE__ */ new Set([this]) : Ko.add(this)), DS(this, i), typeof o == "function" || (a.lanes & 2) === 0 && console.error(
          "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
          ce(a) || "Unknown"
        );
      });
    }
    function qf(e, t, a, i, o) {
      if (a.flags |= 32768, qt && vo(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        if (t = a.alternate, t !== null && hl(
          t,
          a,
          o,
          !0
        ), lt && (Dc = !0), a = Fn.current, a !== null) {
          switch (a.tag) {
            case 13:
              return Ri === null ? Jr() : a.alternate === null && Xt === Cc && (Xt = ug), a.flags &= -257, a.flags |= 65536, a.lanes = o, i === Qv ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), Rm(e, i, o)), !1;
            case 22:
              return a.flags |= 65536, i === Qv ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([i])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : a.add(i)), Rm(e, i, o)), !1;
          }
          throw Error(
            "Unexpected Suspense handler tag (" + a.tag + "). This is a bug in React."
          );
        }
        return Rm(e, i, o), Jr(), !1;
      }
      if (lt)
        return Dc = !0, t = Fn.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== wv && Jc(
          oa(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
              { cause: i }
            ),
            a
          )
        )) : (i !== wv && Jc(
          oa(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
              { cause: i }
            ),
            a
          )
        ), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = oa(i, a), o = Al(
          e.stateNode,
          i,
          o
        ), kc(e, o), Xt !== Cs && (Xt = lh)), !1;
      var f = oa(
        Error(
          "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
          { cause: i }
        ),
        a
      );
      if (Ly === null ? Ly = [f] : Ly.push(f), Xt !== Cs && (Xt = lh), t === null) return !0;
      i = oa(i, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = o & -o, a.lanes |= e, e = Al(
              a.stateNode,
              i,
              e
            ), kc(a, e), !1;
          case 1:
            if (t = a.type, f = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Ko === null || !Ko.has(f))))
              return a.flags |= 65536, o &= -o, a.lanes |= o, o = Ct(o), Bf(
                o,
                e,
                a,
                i
              ), kc(a, o), !1;
        }
        a = a.return;
      } while (a !== null);
      return !1;
    }
    function Gt(e, t, a, i) {
      t.child = e === null ? zb(t, null, a, i) : Wd(
        t,
        e.child,
        a,
        i
      );
    }
    function Dr(e, t, a, i, o) {
      a = a.render;
      var f = t.ref;
      if ("ref" in i) {
        var d = {};
        for (var h in i)
          h !== "ref" && (d[h] = i[h]);
      } else d = i;
      return Ku(t), Zt(t), i = Iu(
        e,
        t,
        a,
        d,
        f,
        o
      ), h = Kl(), Xl(), e !== null && !Ml ? (su(e, t, o), zn(e, t, o)) : (lt && h && ur(t), t.flags |= 1, Gt(e, t, i, o), t.child);
    }
    function Rn(e, t, a, i, o) {
      if (e === null) {
        var f = a.type;
        return typeof f == "function" && !Oh(f) && f.defaultProps === void 0 && a.compare === null ? (a = Xi(f), t.tag = 15, t.type = a, Cr(t, f), Yf(
          e,
          t,
          a,
          i,
          o
        )) : (e = nr(
          a.type,
          null,
          i,
          t,
          t.mode,
          o
        ), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (f = e.child, !qr(e, o)) {
        var d = f.memoizedProps;
        if (a = a.compare, a = a !== null ? a : yf, a(d, i) && e.ref === t.ref)
          return zn(
            e,
            t,
            o
          );
      }
      return t.flags |= 1, e = hn(f, i), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Yf(e, t, a, i, o) {
      if (e !== null) {
        var f = e.memoizedProps;
        if (yf(f, i) && e.ref === t.ref && t.type === e.type)
          if (Ml = !1, t.pendingProps = i = f, qr(e, o))
            (e.flags & 131072) !== 0 && (Ml = !0);
          else
            return t.lanes = e.lanes, zn(e, t, o);
      }
      return Ur(
        e,
        t,
        a,
        i,
        o
      );
    }
    function Or(e, t, a) {
      var i = t.pendingProps, o = i.children, f = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (i = f !== null ? f.baseLanes | a : a, e !== null) {
            for (o = t.child = e.child, f = 0; o !== null; )
              f = f | o.lanes | o.childLanes, o = o.sibling;
            t.childLanes = f & ~i;
          } else t.childLanes = 0, t.child = null;
          return Mr(
            e,
            t,
            i,
            a
          );
        }
        if ((a & 536870912) !== 0)
          t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && fr(
            t,
            f !== null ? f.cachePool : null
          ), f !== null ? Jl(t, f) : xf(t), li(t);
        else
          return t.lanes = t.childLanes = 536870912, Mr(
            e,
            t,
            f !== null ? f.baseLanes | a : a,
            a
          );
      } else
        f !== null ? (fr(t, f.cachePool), Jl(t, f), Pa(t), t.memoizedState = null) : (e !== null && fr(t, null), xf(t), Pa(t));
      return Gt(e, t, o, a), t.child;
    }
    function Mr(e, t, a, i) {
      var o = Gh();
      return o = o === null ? null : {
        parent: Sl._currentValue,
        pool: o
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: o
      }, e !== null && fr(t, null), xf(t), li(t), e !== null && hl(e, t, i, !0), null;
    }
    function wf(e, t) {
      var a = t.ref;
      if (a === null)
        e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object")
          throw Error(
            "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
          );
        (e === null || e.ref !== a) && (t.flags |= 4194816);
      }
    }
    function Ur(e, t, a, i, o) {
      if (a.prototype && typeof a.prototype.render == "function") {
        var f = Be(a) || "Unknown";
        wb[f] || (console.error(
          "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
          f,
          f
        ), wb[f] = !0);
      }
      return t.mode & na && Cu.recordLegacyContextWarning(
        t,
        null
      ), e === null && (Cr(t, t.type), a.contextTypes && (f = Be(a) || "Unknown", Vb[f] || (Vb[f] = !0, console.error(
        "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
        f
      )))), Ku(t), Zt(t), a = Iu(
        e,
        t,
        a,
        i,
        void 0,
        o
      ), i = Kl(), Xl(), e !== null && !Ml ? (su(e, t, o), zn(e, t, o)) : (lt && i && ur(t), t.flags |= 1, Gt(e, t, a, o), t.child);
    }
    function tm(e, t, a, i, o, f) {
      return Ku(t), Zt(t), Mc = -1, _y = e !== null && e.type !== t.type, t.updateQueue = null, a = Ic(
        t,
        i,
        a,
        o
      ), Af(e, t), i = Kl(), Xl(), e !== null && !Ml ? (su(e, t, f), zn(e, t, f)) : (lt && i && ur(t), t.flags |= 1, Gt(e, t, a, f), t.child);
    }
    function lm(e, t, a, i, o) {
      switch (Xe(t)) {
        case !1:
          var f = t.stateNode, d = new t.type(
            t.memoizedProps,
            f.context
          ).state;
          f.updater.enqueueSetState(f, d, null);
          break;
        case !0:
          t.flags |= 128, t.flags |= 65536, f = Error("Simulated error coming from DevTools");
          var h = o & -o;
          if (t.lanes |= h, d = vt, d === null)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          h = Ct(h), Bf(
            h,
            d,
            t,
            oa(f, t)
          ), kc(t, h);
      }
      if (Ku(t), t.stateNode === null) {
        if (d = Go, f = a.contextType, "contextType" in a && f !== null && (f === void 0 || f.$$typeof !== Ba) && !Bb.has(a) && (Bb.add(a), h = f === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? " However, it is set to a " + typeof f + "." : f.$$typeof === bd ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", console.error(
          "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
          Be(a) || "Component",
          h
        )), typeof f == "object" && f !== null && (d = pt(f)), f = new a(i, d), t.mode & na) {
          qe(!0);
          try {
            f = new a(i, d);
          } finally {
            qe(!1);
          }
        }
        if (d = t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Pv, t.stateNode = f, f._reactInternals = t, f._reactInternalInstance = Db, typeof a.getDerivedStateFromProps == "function" && d === null && (d = Be(a) || "Component", Mb.has(d) || (Mb.add(d), console.error(
          "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
          d,
          f.state === null ? "null" : "undefined",
          d
        ))), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function") {
          var p = h = d = null;
          if (typeof f.componentWillMount == "function" && f.componentWillMount.__suppressDeprecationWarning !== !0 ? d = "componentWillMount" : typeof f.UNSAFE_componentWillMount == "function" && (d = "UNSAFE_componentWillMount"), typeof f.componentWillReceiveProps == "function" && f.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? h = "componentWillReceiveProps" : typeof f.UNSAFE_componentWillReceiveProps == "function" && (h = "UNSAFE_componentWillReceiveProps"), typeof f.componentWillUpdate == "function" && f.componentWillUpdate.__suppressDeprecationWarning !== !0 ? p = "componentWillUpdate" : typeof f.UNSAFE_componentWillUpdate == "function" && (p = "UNSAFE_componentWillUpdate"), d !== null || h !== null || p !== null) {
            f = Be(a) || "Component";
            var v = typeof a.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            Cb.has(f) || (Cb.add(f), console.error(
              `Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://react.dev/link/unsafe-component-lifecycles`,
              f,
              v,
              d !== null ? `
  ` + d : "",
              h !== null ? `
  ` + h : "",
              p !== null ? `
  ` + p : ""
            ));
          }
        }
        f = t.stateNode, d = Be(a) || "Component", f.render || (a.prototype && typeof a.prototype.render == "function" ? console.error(
          "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
          d
        ) : console.error(
          "No `render` method found on the %s instance: you may have forgotten to define `render`.",
          d
        )), !f.getInitialState || f.getInitialState.isReactClassApproved || f.state || console.error(
          "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
          d
        ), f.getDefaultProps && !f.getDefaultProps.isReactClassApproved && console.error(
          "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
          d
        ), f.contextType && console.error(
          "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
          d
        ), a.childContextTypes && !_b.has(a) && (_b.add(a), console.error(
          "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
          d
        )), a.contextTypes && !jb.has(a) && (jb.add(a), console.error(
          "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
          d
        )), typeof f.componentShouldUpdate == "function" && console.error(
          "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
          d
        ), a.prototype && a.prototype.isPureReactComponent && typeof f.shouldComponentUpdate < "u" && console.error(
          "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
          Be(a) || "A pure component"
        ), typeof f.componentDidUnmount == "function" && console.error(
          "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
          d
        ), typeof f.componentDidReceiveProps == "function" && console.error(
          "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
          d
        ), typeof f.componentWillRecieveProps == "function" && console.error(
          "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
          d
        ), typeof f.UNSAFE_componentWillRecieveProps == "function" && console.error(
          "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
          d
        ), h = f.props !== i, f.props !== void 0 && h && console.error(
          "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
          d
        ), f.defaultProps && console.error(
          "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
          d,
          d
        ), typeof f.getSnapshotBeforeUpdate != "function" || typeof f.componentDidUpdate == "function" || Ub.has(a) || (Ub.add(a), console.error(
          "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
          Be(a)
        )), typeof f.getDerivedStateFromProps == "function" && console.error(
          "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof f.getDerivedStateFromError == "function" && console.error(
          "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof a.getSnapshotBeforeUpdate == "function" && console.error(
          "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
          d
        ), (h = f.state) && (typeof h != "object" || Te(h)) && console.error("%s.state: must be set to an object or null", d), typeof f.getChildContext == "function" && typeof a.childContextTypes != "object" && console.error(
          "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
          d
        ), f = t.stateNode, f.props = i, f.state = t.memoizedState, f.refs = {}, Zl(t), d = a.contextType, f.context = typeof d == "object" && d !== null ? pt(d) : Go, f.state === i && (d = Be(a) || "Component", Hb.has(d) || (Hb.add(d), console.error(
          "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
          d
        ))), t.mode & na && Cu.recordLegacyContextWarning(
          t,
          f
        ), Cu.recordUnsafeLifecycleWarnings(
          t,
          f
        ), f.state = t.memoizedState, d = a.getDerivedStateFromProps, typeof d == "function" && (Ot(
          t,
          a,
          d,
          i
        ), f.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (d = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), d !== f.state && (console.error(
          "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
          ce(t) || "Component"
        ), Pv.enqueueReplaceState(
          f,
          f.state,
          null
        )), $c(t, i, f, o), gn(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Uu) !== At && (t.flags |= 134217728), f = !0;
      } else if (e === null) {
        f = t.stateNode;
        var H = t.memoizedProps;
        h = ai(a, H), f.props = h;
        var q = f.context;
        p = a.contextType, d = Go, typeof p == "object" && p !== null && (d = pt(p)), v = a.getDerivedStateFromProps, p = typeof v == "function" || typeof f.getSnapshotBeforeUpdate == "function", H = t.pendingProps !== H, p || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (H || q !== d) && Ar(
          t,
          f,
          i,
          d
        ), Vo = !1;
        var U = t.memoizedState;
        f.state = U, $c(t, i, f, o), gn(), q = t.memoizedState, H || U !== q || Vo ? (typeof v == "function" && (Ot(
          t,
          a,
          v,
          i
        ), q = t.memoizedState), (h = Vo || xr(
          t,
          a,
          h,
          i,
          U,
          q,
          d
        )) ? (p || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Uu) !== At && (t.flags |= 134217728)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Uu) !== At && (t.flags |= 134217728), t.memoizedProps = i, t.memoizedState = q), f.props = i, f.state = q, f.context = d, f = h) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Uu) !== At && (t.flags |= 134217728), f = !1);
      } else {
        f = t.stateNode, $u(e, t), d = t.memoizedProps, p = ai(a, d), f.props = p, v = t.pendingProps, U = f.context, q = a.contextType, h = Go, typeof q == "object" && q !== null && (h = pt(q)), H = a.getDerivedStateFromProps, (q = typeof H == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (d !== v || U !== h) && Ar(
          t,
          f,
          i,
          h
        ), Vo = !1, U = t.memoizedState, f.state = U, $c(t, i, f, o), gn();
        var Y = t.memoizedState;
        d !== v || U !== Y || Vo || e !== null && e.dependencies !== null && Ju(e.dependencies) ? (typeof H == "function" && (Ot(
          t,
          a,
          H,
          i
        ), Y = t.memoizedState), (p = Vo || xr(
          t,
          a,
          p,
          i,
          U,
          Y,
          h
        ) || e !== null && e.dependencies !== null && Ju(e.dependencies)) ? (q || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(i, Y, h), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
          i,
          Y,
          h
        )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && U === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && U === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = Y), f.props = i, f.state = Y, f.context = h, f = p) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && U === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && U === e.memoizedState || (t.flags |= 1024), f = !1);
      }
      if (h = f, wf(e, t), d = (t.flags & 128) !== 0, h || d) {
        if (h = t.stateNode, nf(t), d && typeof a.getDerivedStateFromError != "function")
          a = null, wa = -1;
        else {
          if (Zt(t), a = db(h), t.mode & na) {
            qe(!0);
            try {
              db(h);
            } finally {
              qe(!1);
            }
          }
          Xl();
        }
        t.flags |= 1, e !== null && d ? (t.child = Wd(
          t,
          e.child,
          null,
          o
        ), t.child = Wd(
          t,
          null,
          a,
          o
        )) : Gt(e, t, a, o), t.memoizedState = h.state, e = t.child;
      } else
        e = zn(
          e,
          t,
          o
        );
      return o = t.stateNode, f && o.props !== i && (Pd || console.error(
        "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
        ce(t) || "a component"
      ), Pd = !0), e;
    }
    function am(e, t, a, i) {
      return Zi(), t.flags |= 256, Gt(e, t, a, i), t.child;
    }
    function Cr(e, t) {
      t && t.childContextTypes && console.error(
        `childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,
        t.displayName || t.name || "Component"
      ), typeof t.getDerivedStateFromProps == "function" && (e = Be(t) || "Unknown", Xb[e] || (console.error(
        "%s: Function components do not support getDerivedStateFromProps.",
        e
      ), Xb[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = Be(t) || "Unknown", Gb[t] || (console.error(
        "%s: Function components do not support contextType.",
        t
      ), Gb[t] = !0));
    }
    function Gf(e) {
      return { baseLanes: e, cachePool: Hp() };
    }
    function Hr(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= on), e;
    }
    function qp(e, t, a) {
      var i, o = t.pendingProps;
      ie(t) && (t.flags |= 128);
      var f = !1, d = (t.flags & 128) !== 0;
      if ((i = d) || (i = e !== null && e.memoizedState === null ? !1 : (El.current & qy) !== 0), i && (f = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (lt) {
          if (f ? sa(t) : Pa(t), lt) {
            var h = Vt, p;
            if (!(p = !h)) {
              e: {
                var v = h;
                for (p = xi; v.nodeType !== 8; ) {
                  if (!p) {
                    p = null;
                    break e;
                  }
                  if (v = vl(v.nextSibling), v === null) {
                    p = null;
                    break e;
                  }
                }
                p = v;
              }
              p !== null ? (Za(), t.memoizedState = {
                dehydrated: p,
                treeContext: As !== null ? { id: Rc, overflow: zc } : null,
                retryLane: 536870912,
                hydrationErrors: null
              }, v = ee(18, null, null, At), v.stateNode = p, v.return = t, t.child = v, ga = t, Vt = null, p = !0) : p = !1, p = !p;
            }
            p && (Ch(
              t,
              h
            ), mn(t));
          }
          if (h = t.memoizedState, h !== null && (h = h.dehydrated, h !== null))
            return qn(h) ? t.lanes = 32 : t.lanes = 536870912, null;
          ra(t);
        }
        return h = o.children, o = o.fallback, f ? (Pa(t), f = t.mode, h = Vf(
          {
            mode: "hidden",
            children: h
          },
          f
        ), o = Qu(
          o,
          f,
          a,
          null
        ), h.return = t, o.return = t, h.sibling = o, t.child = h, f = t.child, f.memoizedState = Gf(a), f.childLanes = Hr(
          e,
          i,
          a
        ), t.memoizedState = ag, o) : (sa(t), Nr(
          t,
          h
        ));
      }
      var H = e.memoizedState;
      if (H !== null && (h = H.dehydrated, h !== null)) {
        if (d)
          t.flags & 256 ? (sa(t), t.flags &= -257, t = jr(
            e,
            t,
            a
          )) : t.memoizedState !== null ? (Pa(t), t.child = e.child, t.flags |= 128, t = null) : (Pa(t), f = o.fallback, h = t.mode, o = Vf(
            {
              mode: "visible",
              children: o.children
            },
            h
          ), f = Qu(
            f,
            h,
            a,
            null
          ), f.flags |= 2, o.return = t, f.return = t, o.sibling = f, t.child = o, Wd(
            t,
            e.child,
            null,
            a
          ), o = t.child, o.memoizedState = Gf(a), o.childLanes = Hr(
            e,
            i,
            a
          ), t.memoizedState = ag, t = f);
        else if (sa(t), lt && console.error(
          "We should not be hydrating here. This is a bug in React. Please file a bug."
        ), qn(h)) {
          if (i = h.nextSibling && h.nextSibling.dataset, i) {
            p = i.dgst;
            var q = i.msg;
            v = i.stck;
            var U = i.cstck;
          }
          h = q, i = p, o = v, p = f = U, f = Error(h || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), f.stack = o || "", f.digest = i, i = p === void 0 ? null : p, o = {
            value: f,
            source: null,
            stack: i
          }, typeof i == "string" && qv.set(
            f,
            o
          ), Jc(o), t = jr(
            e,
            t,
            a
          );
        } else if (Ml || hl(
          e,
          t,
          a,
          !1
        ), i = (a & e.childLanes) !== 0, Ml || i) {
          if (i = vt, i !== null && (o = a & -a, o = (o & 42) !== 0 ? 1 : Cl(
            o
          ), o = (o & (i.suspendedLanes | a)) !== 0 ? 0 : o, o !== 0 && o !== H.retryLane))
            throw H.retryLane = o, Ll(
              e,
              o
            ), Ht(
              i,
              e,
              o
            ), Yb;
          h.data === Hc || Jr(), t = jr(
            e,
            t,
            a
          );
        } else
          h.data === Hc ? (t.flags |= 192, t.child = e.child, t = null) : (e = H.treeContext, Vt = vl(
            h.nextSibling
          ), ga = t, lt = !0, Rs = null, Dc = !1, Kn = null, xi = !1, e !== null && (Za(), Zn[Jn++] = Rc, Zn[Jn++] = zc, Zn[Jn++] = As, Rc = e.id, zc = e.overflow, As = t), t = Nr(
            t,
            o.children
          ), t.flags |= 4096);
        return t;
      }
      return f ? (Pa(t), f = o.fallback, h = t.mode, p = e.child, v = p.sibling, o = hn(
        p,
        {
          mode: "hidden",
          children: o.children
        }
      ), o.subtreeFlags = p.subtreeFlags & 65011712, v !== null ? f = hn(
        v,
        f
      ) : (f = Qu(
        f,
        h,
        a,
        null
      ), f.flags |= 2), f.return = t, o.return = t, o.sibling = f, t.child = o, o = f, f = t.child, h = e.child.memoizedState, h === null ? h = Gf(a) : (p = h.cachePool, p !== null ? (v = Sl._currentValue, p = p.parent !== v ? { parent: v, pool: v } : p) : p = Hp(), h = {
        baseLanes: h.baseLanes | a,
        cachePool: p
      }), f.memoizedState = h, f.childLanes = Hr(
        e,
        i,
        a
      ), t.memoizedState = ag, o) : (sa(t), a = e.child, e = a.sibling, a = hn(a, {
        mode: "visible",
        children: o.children
      }), a.return = t, a.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function Nr(e, t) {
      return t = Vf(
        { mode: "visible", children: t },
        e.mode
      ), t.return = e, e.child = t;
    }
    function Vf(e, t) {
      return e = ee(22, e, null, t), e.lanes = 0, e.stateNode = {
        _visibility: S0,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }, e;
    }
    function jr(e, t, a) {
      return Wd(t, e.child, null, a), e = Nr(
        t,
        t.pendingProps.children
      ), e.flags |= 2, t.memoizedState = null, e;
    }
    function _r(e, t, a) {
      e.lanes |= t;
      var i = e.alternate;
      i !== null && (i.lanes |= t), Bh(
        e.return,
        t,
        a
      );
    }
    function nm(e, t) {
      var a = Te(e);
      return e = !a && typeof Ie(e) == "function", a || e ? (a = a ? "array" : "iterable", console.error(
        "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
        a,
        t,
        a
      ), !1) : !0;
    }
    function Br(e, t, a, i, o) {
      var f = e.memoizedState;
      f === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: o
      } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = a, f.tailMode = o);
    }
    function um(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, f = i.tail;
      if (i = i.children, o !== void 0 && o !== "forwards" && o !== "backwards" && o !== "together" && !Qb[o])
        if (Qb[o] = !0, typeof o == "string")
          switch (o.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',
                o,
                o.toLowerCase()
              );
              break;
            case "forward":
            case "backward":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',
                o,
                o.toLowerCase()
              );
              break;
            default:
              console.error(
                '"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
                o
              );
          }
        else
          console.error(
            '%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
            o
          );
      f === void 0 || lg[f] || (f !== "collapsed" && f !== "hidden" ? (lg[f] = !0, console.error(
        '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',
        f
      )) : o !== "forwards" && o !== "backwards" && (lg[f] = !0, console.error(
        '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
        f
      )));
      e: if ((o === "forwards" || o === "backwards") && i !== void 0 && i !== null && i !== !1)
        if (Te(i)) {
          for (var d = 0; d < i.length; d++)
            if (!nm(i[d], d)) break e;
        } else if (d = Ie(i), typeof d == "function") {
          if (d = d.call(i))
            for (var h = d.next(), p = 0; !h.done; h = d.next()) {
              if (!nm(h.value, p)) break e;
              p++;
            }
        } else
          console.error(
            'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
            o
          );
      if (Gt(e, t, i, a), i = El.current, (i & qy) !== 0)
        i = i & Fd | qy, t.flags |= 128;
      else {
        if (e !== null && (e.flags & 128) !== 0)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && _r(
                e,
                a,
                t
              );
            else if (e.tag === 19)
              _r(e, a, t);
            else if (e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break e;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
        i &= Fd;
      }
      switch (pe(El, i, t), o) {
        case "forwards":
          for (a = t.child, o = null; a !== null; )
            e = a.alternate, e !== null && yu(e) === null && (o = a), a = a.sibling;
          a = o, a === null ? (o = t.child, t.child = null) : (o = a.sibling, a.sibling = null), Br(
            t,
            !1,
            o,
            a,
            f
          );
          break;
        case "backwards":
          for (a = null, o = t.child, t.child = null; o !== null; ) {
            if (e = o.alternate, e !== null && yu(e) === null) {
              t.child = o;
              break;
            }
            e = o.sibling, o.sibling = a, a = o, o = e;
          }
          Br(
            t,
            !0,
            a,
            null,
            f
          );
          break;
        case "together":
          Br(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function zn(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), wa = -1, Zo |= t.lanes, (a & t.childLanes) === 0)
        if (e !== null) {
          if (hl(
            e,
            t,
            a,
            !1
          ), (a & t.childLanes) === 0)
            return null;
        } else return null;
      if (e !== null && t.child !== e.child)
        throw Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        for (e = t.child, a = hn(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
          e = e.sibling, a = a.sibling = hn(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function qr(e, t) {
      return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ju(e)));
    }
    function gv(e, t, a) {
      switch (t.tag) {
        case 3:
          Lt(
            t,
            t.stateNode.containerInfo
          ), Zu(
            t,
            Sl,
            e.memoizedState.cache
          ), Zi();
          break;
        case 27:
        case 5:
          Q(t);
          break;
        case 4:
          Lt(
            t,
            t.stateNode.containerInfo
          );
          break;
        case 10:
          Zu(
            t,
            t.type,
            t.memoizedProps.value
          );
          break;
        case 12:
          (a & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
          var i = t.stateNode;
          i.effectDuration = -0, i.passiveEffectDuration = -0;
          break;
        case 13:
          if (i = t.memoizedState, i !== null)
            return i.dehydrated !== null ? (sa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? qp(
              e,
              t,
              a
            ) : (sa(t), e = zn(
              e,
              t,
              a
            ), e !== null ? e.sibling : null);
          sa(t);
          break;
        case 19:
          var o = (e.flags & 128) !== 0;
          if (i = (a & t.childLanes) !== 0, i || (hl(
            e,
            t,
            a,
            !1
          ), i = (a & t.childLanes) !== 0), o) {
            if (i)
              return um(
                e,
                t,
                a
              );
            t.flags |= 128;
          }
          if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), pe(
            El,
            El.current,
            t
          ), i) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, Or(e, t, a);
        case 24:
          Zu(
            t,
            Sl,
            e.memoizedState.cache
          );
      }
      return zn(e, t, a);
    }
    function Yr(e, t, a) {
      if (t._debugNeedsRemount && e !== null) {
        a = nr(
          t.type,
          t.key,
          t.pendingProps,
          t._debugOwner || null,
          t.mode,
          t.lanes
        ), a._debugStack = t._debugStack, a._debugTask = t._debugTask;
        var i = t.return;
        if (i === null) throw Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, a._debugInfo = t._debugInfo, t === i.child)
          i.child = a;
        else {
          var o = i.child;
          if (o === null)
            throw Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        return t = i.deletions, t === null ? (i.deletions = [e], i.flags |= 16) : t.push(e), a.flags |= 2, a;
      }
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || t.type !== e.type)
          Ml = !0;
        else {
          if (!qr(e, a) && (t.flags & 128) === 0)
            return Ml = !1, gv(
              e,
              t,
              a
            );
          Ml = (e.flags & 131072) !== 0;
        }
      else
        Ml = !1, (i = lt) && (Za(), i = (t.flags & 1048576) !== 0), i && (i = t.index, Za(), Mp(t, E0, i));
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: if (i = t.pendingProps, e = Qo(t.elementType), t.type = e, typeof e == "function")
            Oh(e) ? (i = ai(
              e,
              i
            ), t.tag = 1, t.type = e = Xi(e), t = lm(
              null,
              t,
              e,
              i,
              a
            )) : (t.tag = 0, Cr(t, e), t.type = e = Xi(e), t = Ur(
              null,
              t,
              e,
              i,
              a
            ));
          else {
            if (e != null) {
              if (o = e.$$typeof, o === xu) {
                t.tag = 11, t.type = e = Dh(e), t = Dr(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              } else if (o === rs) {
                t.tag = 14, t = Rn(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              }
            }
            throw t = "", e !== null && typeof e == "object" && e.$$typeof === ya && (t = " Did you wrap a component in React.lazy() more than once?"), e = Be(e) || e, Error(
              "Element type is invalid. Received a promise that resolves to: " + e + ". Lazy element type must resolve to a class or function." + t
            );
          }
          return t;
        case 0:
          return Ur(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 1:
          return i = t.type, o = ai(
            i,
            t.pendingProps
          ), lm(
            e,
            t,
            i,
            o,
            a
          );
        case 3:
          e: {
            if (Lt(
              t,
              t.stateNode.containerInfo
            ), e === null)
              throw Error(
                "Should have a current fiber. This is a bug in React."
              );
            i = t.pendingProps;
            var f = t.memoizedState;
            o = f.element, $u(e, t), $c(t, i, null, a);
            var d = t.memoizedState;
            if (i = d.cache, Zu(t, Sl, i), i !== f.cache && qh(
              t,
              [Sl],
              a,
              !0
            ), gn(), i = d.element, f.isDehydrated)
              if (f = {
                element: i,
                isDehydrated: !1,
                cache: d.cache
              }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
                t = am(
                  e,
                  t,
                  i,
                  a
                );
                break e;
              } else if (i !== o) {
                o = oa(
                  Error(
                    "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                  ),
                  t
                ), Jc(o), t = am(
                  e,
                  t,
                  i,
                  a
                );
                break e;
              } else {
                switch (e = t.stateNode.containerInfo, e.nodeType) {
                  case 9:
                    e = e.body;
                    break;
                  default:
                    e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
                }
                for (Vt = vl(e.firstChild), ga = t, lt = !0, Rs = null, Dc = !1, Kn = null, xi = !0, e = zb(
                  t,
                  null,
                  i,
                  a
                ), t.child = e; e; )
                  e.flags = e.flags & -3 | 4096, e = e.sibling;
              }
            else {
              if (Zi(), i === o) {
                t = zn(
                  e,
                  t,
                  a
                );
                break e;
              }
              Gt(
                e,
                t,
                i,
                a
              );
            }
            t = t.child;
          }
          return t;
        case 26:
          return wf(e, t), e === null ? (e = Eu(
            t.type,
            null,
            t.pendingProps,
            null
          )) ? t.memoizedState = e : lt || (e = t.type, a = t.pendingProps, i = Mt(
            wn.current
          ), i = we(
            i
          ).createElement(e), i[Ol] = t, i[la] = a, jt(i, e, a), tl(i), t.stateNode = i) : t.memoizedState = Eu(
            t.type,
            e.memoizedProps,
            t.pendingProps,
            e.memoizedState
          ), null;
        case 27:
          return Q(t), e === null && lt && (i = Mt(wn.current), o = z(), i = t.stateNode = Lm(
            t.type,
            t.pendingProps,
            i,
            o,
            !1
          ), Dc || (o = ht(
            i,
            t.type,
            t.pendingProps,
            o
          ), o !== null && (Ja(t, 0).serverProps = o)), ga = t, xi = !0, o = Vt, Bn(t.type) ? (zg = o, Vt = vl(
            i.firstChild
          )) : Vt = o), Gt(
            e,
            t,
            t.pendingProps.children,
            a
          ), wf(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && lt && (f = z(), i = $s(
            t.type,
            f.ancestorInfo
          ), o = Vt, (d = !o) || (d = si(
            o,
            t.type,
            t.pendingProps,
            xi
          ), d !== null ? (t.stateNode = d, Dc || (f = ht(
            d,
            t.type,
            t.pendingProps,
            f
          ), f !== null && (Ja(t, 0).serverProps = f)), ga = t, Vt = vl(
            d.firstChild
          ), xi = !1, f = !0) : f = !1, d = !f), d && (i && Ch(t, o), mn(t))), Q(t), o = t.type, f = t.pendingProps, d = e !== null ? e.memoizedProps : null, i = f.children, _n(o, f) ? i = null : d !== null && _n(o, d) && (t.flags |= 32), t.memoizedState !== null && (o = Iu(
            e,
            t,
            Da,
            null,
            null,
            a
          ), Iy._currentValue = o), wf(e, t), Gt(
            e,
            t,
            i,
            a
          ), t.child;
        case 6:
          return e === null && lt && (e = t.pendingProps, a = z(), i = a.ancestorInfo.current, e = i != null ? rf(
            e,
            i.tag,
            a.ancestorInfo.implicitRootScope
          ) : !0, a = Vt, (i = !a) || (i = pl(
            a,
            t.pendingProps,
            xi
          ), i !== null ? (t.stateNode = i, ga = t, Vt = null, i = !0) : i = !1, i = !i), i && (e && Ch(t, a), mn(t))), null;
        case 13:
          return qp(e, t, a);
        case 4:
          return Lt(
            t,
            t.stateNode.containerInfo
          ), i = t.pendingProps, e === null ? t.child = Wd(
            t,
            null,
            i,
            a
          ) : Gt(
            e,
            t,
            i,
            a
          ), t.child;
        case 11:
          return Dr(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 7:
          return Gt(
            e,
            t,
            t.pendingProps,
            a
          ), t.child;
        case 8:
          return Gt(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 12:
          return t.flags |= 4, t.flags |= 2048, i = t.stateNode, i.effectDuration = -0, i.passiveEffectDuration = -0, Gt(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 10:
          return i = t.type, o = t.pendingProps, f = o.value, "value" in o || Lb || (Lb = !0, console.error(
            "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
          )), Zu(t, i, f), Gt(
            e,
            t,
            o.children,
            a
          ), t.child;
        case 9:
          return o = t.type._context, i = t.pendingProps.children, typeof i != "function" && console.error(
            "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
          ), Ku(t), o = pt(o), Zt(t), i = Wv(
            i,
            o,
            void 0
          ), Xl(), t.flags |= 1, Gt(
            e,
            t,
            i,
            a
          ), t.child;
        case 14:
          return Rn(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 15:
          return Yf(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 19:
          return um(
            e,
            t,
            a
          );
        case 31:
          return i = t.pendingProps, a = t.mode, i = {
            mode: i.mode,
            children: i.children
          }, e === null ? (e = Vf(
            i,
            a
          ), e.ref = t.ref, t.child = e, e.return = t, t = e) : (e = hn(e.child, i), e.ref = t.ref, t.child = e, e.return = t, t = e), t;
        case 22:
          return Or(e, t, a);
        case 24:
          return Ku(t), i = pt(Sl), e === null ? (o = Gh(), o === null && (o = vt, f = Tf(), o.pooledCache = f, Ji(f), f !== null && (o.pooledCacheLanes |= a), o = f), t.memoizedState = {
            parent: i,
            cache: o
          }, Zl(t), Zu(t, Sl, o)) : ((e.lanes & a) !== 0 && ($u(e, t), $c(t, null, null, a), gn()), o = e.memoizedState, f = t.memoizedState, o.parent !== i ? (o = {
            parent: i,
            cache: i
          }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), Zu(t, Sl, i)) : (i = f.cache, Zu(t, Sl, i), i !== o.cache && qh(
            t,
            [Sl],
            a,
            !0
          ))), Gt(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function $l(e) {
      e.flags |= 4;
    }
    function Xf(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & In) !== Gs)
        e.flags &= -16777217;
      else if (e.flags |= 16777216, !ls(t)) {
        if (t = Fn.current, t !== null && ((Ve & 4194048) === Ve ? Ri !== null : (Ve & 62914560) !== Ve && (Ve & 536870912) === 0 || t !== Ri))
          throw Ny = Qv, eb;
        e.flags |= 8192;
      }
    }
    function Qf(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? tf() : 536870912, e.lanes |= t, js |= t);
    }
    function ni(e, t) {
      if (!lt)
        switch (e.tailMode) {
          case "hidden":
            t = e.tail;
            for (var a = null; t !== null; )
              t.alternate !== null && (a = t), t = t.sibling;
            a === null ? e.tail = null : a.sibling = null;
            break;
          case "collapsed":
            a = e.tail;
            for (var i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
        }
    }
    function st(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = 0, i = 0;
      if (t)
        if ((e.mode & wl) !== At) {
          for (var o = e.selfBaseDuration, f = e.child; f !== null; )
            a |= f.lanes | f.childLanes, i |= f.subtreeFlags & 65011712, i |= f.flags & 65011712, o += f.treeBaseDuration, f = f.sibling;
          e.treeBaseDuration = o;
        } else
          for (o = e.child; o !== null; )
            a |= o.lanes | o.childLanes, i |= o.subtreeFlags & 65011712, i |= o.flags & 65011712, o.return = e, o = o.sibling;
      else if ((e.mode & wl) !== At) {
        o = e.actualDuration, f = e.selfBaseDuration;
        for (var d = e.child; d !== null; )
          a |= d.lanes | d.childLanes, i |= d.subtreeFlags, i |= d.flags, o += d.actualDuration, f += d.treeBaseDuration, d = d.sibling;
        e.actualDuration = o, e.treeBaseDuration = f;
      } else
        for (o = e.child; o !== null; )
          a |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
      return e.subtreeFlags |= i, e.childLanes = a, t;
    }
    function Yp(e, t, a) {
      var i = t.pendingProps;
      switch (ir(t), t.tag) {
        case 31:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return st(t), null;
        case 1:
          return st(t), null;
        case 3:
          return a = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), ou(Sl, t), St(t), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Li(t) ? (_h(), $l(t)) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, jh())), st(t), null;
        case 26:
          return a = t.memoizedState, e === null ? ($l(t), a !== null ? (st(t), Xf(
            t,
            a
          )) : (st(t), t.flags &= -16777217)) : a ? a !== e.memoizedState ? ($l(t), st(t), Xf(
            t,
            a
          )) : (st(t), t.flags &= -16777217) : (e.memoizedProps !== i && $l(t), st(t), t.flags &= -16777217), null;
        case 27:
          $(t), a = Mt(wn.current);
          var o = t.type;
          if (e !== null && t.stateNode != null)
            e.memoizedProps !== i && $l(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return st(t), null;
            }
            e = z(), Li(t) ? Hh(t) : (e = Lm(
              o,
              i,
              a,
              e,
              !0
            ), t.stateNode = e, $l(t));
          }
          return st(t), null;
        case 5:
          if ($(t), a = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== i && $l(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return st(t), null;
            }
            if (o = z(), Li(t))
              Hh(t);
            else {
              switch (e = Mt(wn.current), $s(a, o.ancestorInfo), o = o.context, e = we(e), o) {
                case oh:
                  e = e.createElementNS(wo, a);
                  break;
                case $0:
                  e = e.createElementNS(
                    Es,
                    a
                  );
                  break;
                default:
                  switch (a) {
                    case "svg":
                      e = e.createElementNS(
                        wo,
                        a
                      );
                      break;
                    case "math":
                      e = e.createElementNS(
                        Es,
                        a
                      );
                      break;
                    case "script":
                      e = e.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                      break;
                    case "select":
                      e = typeof i.is == "string" ? e.createElement("select", { is: i.is }) : e.createElement("select"), i.multiple ? e.multiple = !0 : i.size && (e.size = i.size);
                      break;
                    default:
                      e = typeof i.is == "string" ? e.createElement(a, {
                        is: i.is
                      }) : e.createElement(a), a.indexOf("-") === -1 && (a !== a.toLowerCase() && console.error(
                        "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                        a
                      ), Object.prototype.toString.call(e) !== "[object HTMLUnknownElement]" || Ru.call(
                        f1,
                        a
                      ) || (f1[a] = !0, console.error(
                        "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                        a
                      )));
                  }
              }
              e[Ol] = t, e[la] = i;
              e: for (o = t.child; o !== null; ) {
                if (o.tag === 5 || o.tag === 6)
                  e.appendChild(o.stateNode);
                else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                  o.child.return = o, o = o.child;
                  continue;
                }
                if (o === t) break e;
                for (; o.sibling === null; ) {
                  if (o.return === null || o.return === t)
                    break e;
                  o = o.return;
                }
                o.sibling.return = o.return, o = o.sibling;
              }
              t.stateNode = e;
              e: switch (jt(e, a, i), a) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  e = !!i.autoFocus;
                  break e;
                case "img":
                  e = !0;
                  break e;
                default:
                  e = !1;
              }
              e && $l(t);
            }
          }
          return st(t), t.flags &= -16777217, null;
        case 6:
          if (e && t.stateNode != null)
            e.memoizedProps !== i && $l(t);
          else {
            if (typeof i != "string" && t.stateNode === null)
              throw Error(
                "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
              );
            if (e = Mt(wn.current), a = z(), Li(t)) {
              e = t.stateNode, a = t.memoizedProps, o = !Dc, i = null;
              var f = ga;
              if (f !== null)
                switch (f.tag) {
                  case 3:
                    o && (o = sd(
                      e,
                      a,
                      i
                    ), o !== null && (Ja(t, 0).serverProps = o));
                    break;
                  case 27:
                  case 5:
                    i = f.memoizedProps, o && (o = sd(
                      e,
                      a,
                      i
                    ), o !== null && (Ja(
                      t,
                      0
                    ).serverProps = o));
                }
              e[Ol] = t, e = !!(e.nodeValue === a || i !== null && i.suppressHydrationWarning === !0 || jm(e.nodeValue, a)), e || mn(t);
            } else
              o = a.ancestorInfo.current, o != null && rf(
                i,
                o.tag,
                a.ancestorInfo.implicitRootScope
              ), e = we(e).createTextNode(
                i
              ), e[Ol] = t, t.stateNode = e;
          }
          return st(t), null;
        case 13:
          if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (o = Li(t), i !== null && i.dehydrated !== null) {
              if (e === null) {
                if (!o)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
                  throw Error(
                    "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                o[Ol] = t, st(t), (t.mode & wl) !== At && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              } else
                _h(), Zi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4, st(t), (t.mode & wl) !== At && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              o = !1;
            } else
              o = jh(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
            if (!o)
              return t.flags & 256 ? (ra(t), t) : (ra(t), null);
          }
          return ra(t), (t.flags & 128) !== 0 ? (t.lanes = a, (t.mode & wl) !== At && pn(t), t) : (a = i !== null, e = e !== null && e.memoizedState !== null, a && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), f = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (f = i.memoizedState.cachePool.pool), f !== o && (i.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Qf(t, t.updateQueue), st(t), (t.mode & wl) !== At && a && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
        case 4:
          return St(t), e === null && Hm(
            t.stateNode.containerInfo
          ), st(t), null;
        case 10:
          return ou(t.type, t), st(t), null;
        case 19:
          if (We(El, t), o = t.memoizedState, o === null) return st(t), null;
          if (i = (t.flags & 128) !== 0, f = o.rendering, f === null)
            if (i) ni(o, !1);
            else {
              if (Xt !== Cc || e !== null && (e.flags & 128) !== 0)
                for (e = t.child; e !== null; ) {
                  if (f = yu(e), f !== null) {
                    for (t.flags |= 128, ni(o, !1), e = f.updateQueue, t.updateQueue = e, Qf(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                      Mh(a, e), a = a.sibling;
                    return pe(
                      El,
                      El.current & Fd | qy,
                      t
                    ), t.child;
                  }
                  e = e.sibling;
                }
              o.tail !== null && Gn() > q0 && (t.flags |= 128, i = !0, ni(o, !1), t.lanes = 4194304);
            }
          else {
            if (!i)
              if (e = yu(f), e !== null) {
                if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Qf(t, e), ni(o, !0), o.tail === null && o.tailMode === "hidden" && !f.alternate && !lt)
                  return st(t), null;
              } else
                2 * Gn() - o.renderingStartTime > q0 && a !== 536870912 && (t.flags |= 128, i = !0, ni(o, !1), t.lanes = 4194304);
            o.isBackwards ? (f.sibling = t.child, t.child = f) : (e = o.last, e !== null ? e.sibling = f : t.child = f, o.last = f);
          }
          return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = Gn(), e.sibling = null, a = El.current, a = i ? a & Fd | qy : a & Fd, pe(El, a, t), e) : (st(t), null);
        case 22:
        case 23:
          return ra(t), Wa(t), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (st(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : st(t), a = t.updateQueue, a !== null && Qf(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== a && (t.flags |= 2048), e !== null && We(Os, t), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ou(Sl, t), st(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function wp(e, t) {
      switch (ir(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & wl) !== At && pn(t), t) : null;
        case 3:
          return ou(Sl, t), St(t), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return $(t), null;
        case 13:
          if (ra(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            Zi();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & wl) !== At && pn(t), t) : null;
        case 19:
          return We(El, t), null;
        case 4:
          return St(t), null;
        case 10:
          return ou(t.type, t), null;
        case 22:
        case 23:
          return ra(t), Wa(t), e !== null && We(Os, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & wl) !== At && pn(t), t) : null;
        case 24:
          return ou(Sl, t), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function im(e, t) {
      switch (ir(t), t.tag) {
        case 3:
          ou(Sl, t), St(t);
          break;
        case 26:
        case 27:
        case 5:
          $(t);
          break;
        case 4:
          St(t);
          break;
        case 13:
          ra(t);
          break;
        case 19:
          We(El, t);
          break;
        case 10:
          ou(t.type, t);
          break;
        case 22:
        case 23:
          ra(t), Wa(t), e !== null && We(Os, t);
          break;
        case 24:
          ou(Sl, t);
      }
    }
    function en(e) {
      return (e.mode & wl) !== At;
    }
    function cm(e, t) {
      en(e) ? (ka(), tc(t, e), Aa()) : tc(t, e);
    }
    function wr(e, t, a) {
      en(e) ? (ka(), lc(
        a,
        e,
        t
      ), Aa()) : lc(
        a,
        e,
        t
      );
    }
    function tc(e, t) {
      try {
        var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
        if (i !== null) {
          var o = i.next;
          a = o;
          do {
            if ((a.tag & e) === e && ((e & Tl) !== kn ? I !== null && typeof I.markComponentPassiveEffectMountStarted == "function" && I.markComponentPassiveEffectMountStarted(
              t
            ) : (e & Gl) !== kn && I !== null && typeof I.markComponentLayoutEffectMountStarted == "function" && I.markComponentLayoutEffectMountStarted(
              t
            ), i = void 0, (e & ba) !== kn && (ih = !0), i = ae(
              t,
              OS,
              a
            ), (e & ba) !== kn && (ih = !1), (e & Tl) !== kn ? I !== null && typeof I.markComponentPassiveEffectMountStopped == "function" && I.markComponentPassiveEffectMountStopped() : (e & Gl) !== kn && I !== null && typeof I.markComponentLayoutEffectMountStopped == "function" && I.markComponentLayoutEffectMountStopped(), i !== void 0 && typeof i != "function")) {
              var f = void 0;
              f = (a.tag & Gl) !== 0 ? "useLayoutEffect" : (a.tag & ba) !== 0 ? "useInsertionEffect" : "useEffect";
              var d = void 0;
              d = i === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof i.then == "function" ? `

It looks like you wrote ` + f + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + f + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching` : " You returned: " + i, ae(
                t,
                function(h, p) {
                  console.error(
                    "%s must not return anything besides a function, which is used for clean-up.%s",
                    h,
                    p
                  );
                },
                f,
                d
              );
            }
            a = a.next;
          } while (a !== o);
        }
      } catch (h) {
        me(t, t.return, h);
      }
    }
    function lc(e, t, a) {
      try {
        var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
        if (o !== null) {
          var f = o.next;
          i = f;
          do {
            if ((i.tag & e) === e) {
              var d = i.inst, h = d.destroy;
              h !== void 0 && (d.destroy = void 0, (e & Tl) !== kn ? I !== null && typeof I.markComponentPassiveEffectUnmountStarted == "function" && I.markComponentPassiveEffectUnmountStarted(
                t
              ) : (e & Gl) !== kn && I !== null && typeof I.markComponentLayoutEffectUnmountStarted == "function" && I.markComponentLayoutEffectUnmountStarted(
                t
              ), (e & ba) !== kn && (ih = !0), o = t, ae(
                o,
                MS,
                o,
                a,
                h
              ), (e & ba) !== kn && (ih = !1), (e & Tl) !== kn ? I !== null && typeof I.markComponentPassiveEffectUnmountStopped == "function" && I.markComponentPassiveEffectUnmountStopped() : (e & Gl) !== kn && I !== null && typeof I.markComponentLayoutEffectUnmountStopped == "function" && I.markComponentLayoutEffectUnmountStopped());
            }
            i = i.next;
          } while (i !== f);
        }
      } catch (p) {
        me(t, t.return, p);
      }
    }
    function om(e, t) {
      en(e) ? (ka(), tc(t, e), Aa()) : tc(t, e);
    }
    function Lf(e, t, a) {
      en(e) ? (ka(), lc(
        a,
        e,
        t
      ), Aa()) : lc(
        a,
        e,
        t
      );
    }
    function fm(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        e.type.defaultProps || "ref" in e.memoizedProps || Pd || (a.props !== e.memoizedProps && console.error(
          "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
          ce(e) || "instance"
        ), a.state !== e.memoizedState && console.error(
          "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
          ce(e) || "instance"
        ));
        try {
          ae(
            e,
            Np,
            t,
            a
          );
        } catch (i) {
          me(e, e.return, i);
        }
      }
    }
    function Gp(e, t, a) {
      return e.getSnapshotBeforeUpdate(t, a);
    }
    function bv(e, t) {
      var a = t.memoizedProps, i = t.memoizedState;
      t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || Pd || (t.props !== e.memoizedProps && console.error(
        "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
        ce(e) || "instance"
      ), t.state !== e.memoizedState && console.error(
        "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
        ce(e) || "instance"
      ));
      try {
        var o = ai(
          e.type,
          a,
          e.elementType === e.type
        ), f = ae(
          e,
          Gp,
          t,
          o,
          i
        );
        a = Zb, f !== void 0 || a.has(e.type) || (a.add(e.type), ae(e, function() {
          console.error(
            "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
            ce(e)
          );
        })), t.__reactInternalSnapshotBeforeUpdate = f;
      } catch (d) {
        me(e, e.return, d);
      }
    }
    function Gr(e, t, a) {
      a.props = ai(
        e.type,
        e.memoizedProps
      ), a.state = e.memoizedState, en(e) ? (ka(), ae(
        e,
        gb,
        e,
        t,
        a
      ), Aa()) : ae(
        e,
        gb,
        e,
        t,
        a
      );
    }
    function Vp(e) {
      var t = e.ref;
      if (t !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        if (typeof t == "function")
          if (en(e))
            try {
              ka(), e.refCleanup = t(a);
            } finally {
              Aa();
            }
          else e.refCleanup = t(a);
        else
          typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error(
            "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
            ce(e)
          ), t.current = a;
      }
    }
    function fo(e, t) {
      try {
        ae(e, Vp, e);
      } catch (a) {
        me(e, t, a);
      }
    }
    function Ha(e, t) {
      var a = e.ref, i = e.refCleanup;
      if (a !== null)
        if (typeof i == "function")
          try {
            if (en(e))
              try {
                ka(), ae(e, i);
              } finally {
                Aa(e);
              }
            else ae(e, i);
          } catch (o) {
            me(e, t, o);
          } finally {
            e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
          }
        else if (typeof a == "function")
          try {
            if (en(e))
              try {
                ka(), ae(e, a, null);
              } finally {
                Aa(e);
              }
            else ae(e, a, null);
          } catch (o) {
            me(e, t, o);
          }
        else a.current = null;
    }
    function sm(e, t, a, i) {
      var o = e.memoizedProps, f = o.id, d = o.onCommit;
      o = o.onRender, t = t === null ? "mount" : "update", R0 && (t = "nested-update"), typeof o == "function" && o(
        f,
        t,
        e.actualDuration,
        e.treeBaseDuration,
        e.actualStartTime,
        a
      ), typeof d == "function" && d(
        e.memoizedProps.id,
        t,
        i,
        a
      );
    }
    function Xp(e, t, a, i) {
      var o = e.memoizedProps;
      e = o.id, o = o.onPostCommit, t = t === null ? "mount" : "update", R0 && (t = "nested-update"), typeof o == "function" && o(
        e,
        t,
        i,
        a
      );
    }
    function Qp(e) {
      var t = e.type, a = e.memoizedProps, i = e.stateNode;
      try {
        ae(
          e,
          Su,
          i,
          t,
          a,
          e
        );
      } catch (o) {
        me(e, e.return, o);
      }
    }
    function rm(e, t, a) {
      try {
        ae(
          e,
          _t,
          e.stateNode,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        me(e, e.return, i);
      }
    }
    function dm(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Bn(e.type) || e.tag === 4;
    }
    function ac(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || dm(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && Bn(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Zf(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = bu));
      else if (i !== 4 && (i === 27 && Bn(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
        for (Zf(e, t, a), e = e.sibling; e !== null; )
          Zf(e, t, a), e = e.sibling;
    }
    function nc(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (i !== 4 && (i === 27 && Bn(e.type) && (a = e.stateNode), e = e.child, e !== null))
        for (nc(e, t, a), e = e.sibling; e !== null; )
          nc(e, t, a), e = e.sibling;
    }
    function Lp(e) {
      for (var t, a = e.return; a !== null; ) {
        if (dm(a)) {
          t = a;
          break;
        }
        a = a.return;
      }
      if (t == null)
        throw Error(
          "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
        );
      switch (t.tag) {
        case 27:
          t = t.stateNode, a = ac(e), nc(
            e,
            a,
            t
          );
          break;
        case 5:
          a = t.stateNode, t.flags & 32 && (Tu(a), t.flags &= -33), t = ac(e), nc(
            e,
            t,
            a
          );
          break;
        case 3:
        case 4:
          t = t.stateNode.containerInfo, a = ac(e), Zf(
            e,
            a,
            t
          );
          break;
        default:
          throw Error(
            "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
          );
      }
    }
    function hm(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        ae(
          e,
          ma,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        me(e, e.return, i);
      }
    }
    function Vr(e, t) {
      if (e = e.containerInfo, xg = P0, e = Ap(e), Rh(e)) {
        if ("selectionStart" in e)
          var a = {
            start: e.selectionStart,
            end: e.selectionEnd
          };
        else
          e: {
            a = (a = e.ownerDocument) && a.defaultView || window;
            var i = a.getSelection && a.getSelection();
            if (i && i.rangeCount !== 0) {
              a = i.anchorNode;
              var o = i.anchorOffset, f = i.focusNode;
              i = i.focusOffset;
              try {
                a.nodeType, f.nodeType;
              } catch {
                a = null;
                break e;
              }
              var d = 0, h = -1, p = -1, v = 0, H = 0, q = e, U = null;
              t: for (; ; ) {
                for (var Y; q !== a || o !== 0 && q.nodeType !== 3 || (h = d + o), q !== f || i !== 0 && q.nodeType !== 3 || (p = d + i), q.nodeType === 3 && (d += q.nodeValue.length), (Y = q.firstChild) !== null; )
                  U = q, q = Y;
                for (; ; ) {
                  if (q === e) break t;
                  if (U === a && ++v === o && (h = d), U === f && ++H === i && (p = d), (Y = q.nextSibling) !== null) break;
                  q = U, U = q.parentNode;
                }
                q = Y;
              }
              a = h === -1 || p === -1 ? null : { start: h, end: p };
            } else a = null;
          }
        a = a || { start: 0, end: 0 };
      } else a = null;
      for (Ag = {
        focusedElem: e,
        selectionRange: a
      }, P0 = !1, Ul = t; Ul !== null; )
        if (t = Ul, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null)
          e.return = t, Ul = e;
        else
          for (; Ul !== null; ) {
            switch (e = t = Ul, a = e.alternate, o = e.flags, e.tag) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                (o & 1024) !== 0 && a !== null && bv(e, a);
                break;
              case 3:
                if ((o & 1024) !== 0) {
                  if (e = e.stateNode.containerInfo, a = e.nodeType, a === 9)
                    To(e);
                  else if (a === 1)
                    switch (e.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        To(e);
                        break;
                      default:
                        e.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((o & 1024) !== 0)
                  throw Error(
                    "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."
                  );
            }
            if (e = t.sibling, e !== null) {
              e.return = t.return, Ul = e;
              break;
            }
            Ul = t.return;
          }
    }
    function mm(e, t, a) {
      var i = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Dn(e, a), i & 4 && cm(a, Gl | $n);
          break;
        case 1:
          if (Dn(e, a), i & 4)
            if (e = a.stateNode, t === null)
              a.type.defaultProps || "ref" in a.memoizedProps || Pd || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                ce(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                ce(a) || "instance"
              )), en(a) ? (ka(), ae(
                a,
                Fv,
                a,
                e
              ), Aa()) : ae(
                a,
                Fv,
                a,
                e
              );
            else {
              var o = ai(
                a.type,
                t.memoizedProps
              );
              t = t.memoizedState, a.type.defaultProps || "ref" in a.memoizedProps || Pd || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                ce(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                ce(a) || "instance"
              )), en(a) ? (ka(), ae(
                a,
                yb,
                a,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              ), Aa()) : ae(
                a,
                yb,
                a,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            }
          i & 64 && fm(a), i & 512 && fo(a, a.return);
          break;
        case 3:
          if (t = Ka(), Dn(e, a), i & 64 && (i = a.updateQueue, i !== null)) {
            if (o = null, a.child !== null)
              switch (a.child.tag) {
                case 27:
                case 5:
                  o = a.child.stateNode;
                  break;
                case 1:
                  o = a.child.stateNode;
              }
            try {
              ae(
                a,
                Np,
                i,
                o
              );
            } catch (d) {
              me(a, a.return, d);
            }
          }
          e.effectDuration += ku(t);
          break;
        case 27:
          t === null && i & 4 && hm(a);
        case 26:
        case 5:
          Dn(e, a), t === null && i & 4 && Qp(a), i & 512 && fo(a, a.return);
          break;
        case 12:
          if (i & 4) {
            i = Ka(), Dn(e, a), e = a.stateNode, e.effectDuration += Ki(i);
            try {
              ae(
                a,
                sm,
                a,
                t,
                A0,
                e.effectDuration
              );
            } catch (d) {
              me(a, a.return, d);
            }
          } else Dn(e, a);
          break;
        case 13:
          Dn(e, a), i & 4 && so(e, a), i & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Pf.bind(
            null,
            a
          ), Eo(e, a))));
          break;
        case 22:
          if (i = a.memoizedState !== null || Uc, !i) {
            t = t !== null && t.memoizedState !== null || It, o = Uc;
            var f = It;
            Uc = i, (It = t) && !f ? On(
              e,
              a,
              (a.subtreeFlags & 8772) !== 0
            ) : Dn(e, a), Uc = o, It = f;
          }
          break;
        case 30:
          break;
        default:
          Dn(e, a);
      }
    }
    function ym(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, ym(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Yc(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function pu(e, t, a) {
      for (a = a.child; a !== null; )
        uc(
          e,
          t,
          a
        ), a = a.sibling;
    }
    function uc(e, t, a) {
      if (gl && typeof gl.onCommitFiberUnmount == "function")
        try {
          gl.onCommitFiberUnmount(vi, a);
        } catch (f) {
          ta || (ta = !0, console.error(
            "React instrumentation encountered an error: %s",
            f
          ));
        }
      switch (a.tag) {
        case 26:
          It || Ha(a, t), pu(
            e,
            t,
            a
          ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          It || Ha(a, t);
          var i = fl, o = Ga;
          Bn(a.type) && (fl = a.stateNode, Ga = !1), pu(
            e,
            t,
            a
          ), ae(
            a,
            Ao,
            a.stateNode
          ), fl = i, Ga = o;
          break;
        case 5:
          It || Ha(a, t);
        case 6:
          if (i = fl, o = Ga, fl = null, pu(
            e,
            t,
            a
          ), fl = i, Ga = o, fl !== null)
            if (Ga)
              try {
                ae(
                  a,
                  bo,
                  fl,
                  a.stateNode
                );
              } catch (f) {
                me(
                  a,
                  t,
                  f
                );
              }
            else
              try {
                ae(
                  a,
                  _a,
                  fl,
                  a.stateNode
                );
              } catch (f) {
                me(
                  a,
                  t,
                  f
                );
              }
          break;
        case 18:
          fl !== null && (Ga ? (e = fl, So(
            e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
            a.stateNode
          ), gc(e)) : So(fl, a.stateNode));
          break;
        case 4:
          i = fl, o = Ga, fl = a.stateNode.containerInfo, Ga = !0, pu(
            e,
            t,
            a
          ), fl = i, Ga = o;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          It || lc(
            ba,
            a,
            t
          ), It || wr(
            a,
            t,
            Gl
          ), pu(
            e,
            t,
            a
          );
          break;
        case 1:
          It || (Ha(a, t), i = a.stateNode, typeof i.componentWillUnmount == "function" && Gr(
            a,
            t,
            i
          )), pu(
            e,
            t,
            a
          );
          break;
        case 21:
          pu(
            e,
            t,
            a
          );
          break;
        case 22:
          It = (i = It) || a.memoizedState !== null, pu(
            e,
            t,
            a
          ), It = i;
          break;
        default:
          pu(
            e,
            t,
            a
          );
      }
    }
    function so(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
        try {
          ae(
            t,
            ha,
            e
          );
        } catch (a) {
          me(t, t.return, a);
        }
    }
    function Xr(e) {
      switch (e.tag) {
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new Jb()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Jb()), t;
        default:
          throw Error(
            "Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React."
          );
      }
    }
    function ic(e, t) {
      var a = Xr(e);
      t.forEach(function(i) {
        var o = oi.bind(null, e, i);
        if (!a.has(i)) {
          if (a.add(i), qt)
            if (eh !== null && th !== null)
              vo(th, eh);
            else
              throw Error(
                "Expected finished root and lanes to be set. This is a bug in React."
              );
          i.then(o, o);
        }
      });
    }
    function Rl(e, t) {
      var a = t.deletions;
      if (a !== null)
        for (var i = 0; i < a.length; i++) {
          var o = e, f = t, d = a[i], h = f;
          e: for (; h !== null; ) {
            switch (h.tag) {
              case 27:
                if (Bn(h.type)) {
                  fl = h.stateNode, Ga = !1;
                  break e;
                }
                break;
              case 5:
                fl = h.stateNode, Ga = !1;
                break e;
              case 3:
              case 4:
                fl = h.stateNode.containerInfo, Ga = !0;
                break e;
            }
            h = h.return;
          }
          if (fl === null)
            throw Error(
              "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
            );
          uc(o, f, d), fl = null, Ga = !1, o = d, f = o.alternate, f !== null && (f.return = null), o.return = null;
        }
      if (t.subtreeFlags & 13878)
        for (t = t.child; t !== null; )
          pm(t, e), t = t.sibling;
    }
    function pm(e, t) {
      var a = e.alternate, i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Rl(t, e), Wl(e), i & 4 && (lc(
            ba | $n,
            e,
            e.return
          ), tc(ba | $n, e), wr(
            e,
            e.return,
            Gl | $n
          ));
          break;
        case 1:
          Rl(t, e), Wl(e), i & 512 && (It || a === null || Ha(a, a.return)), i & 64 && Uc && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? i : a.concat(i))));
          break;
        case 26:
          var o = Nu;
          if (Rl(t, e), Wl(e), i & 512 && (It || a === null || Ha(a, a.return)), i & 4)
            if (t = a !== null ? a.memoizedState : null, i = e.memoizedState, a === null)
              if (i === null)
                if (e.stateNode === null) {
                  e: {
                    i = e.type, a = e.memoizedProps, t = o.ownerDocument || o;
                    t: switch (i) {
                      case "title":
                        o = t.getElementsByTagName("title")[0], (!o || o[_o] || o[Ol] || o.namespaceURI === wo || o.hasAttribute("itemprop")) && (o = t.createElement(i), t.head.insertBefore(
                          o,
                          t.querySelector("head > title")
                        )), jt(o, i, a), o[Ol] = e, tl(o), i = o;
                        break e;
                      case "link":
                        var f = km(
                          "link",
                          "href",
                          t
                        ).get(i + (a.href || ""));
                        if (f) {
                          for (var d = 0; d < f.length; d++)
                            if (o = f[d], o.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && o.getAttribute("rel") === (a.rel == null ? null : a.rel) && o.getAttribute("title") === (a.title == null ? null : a.title) && o.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), jt(o, i, a), t.head.appendChild(o);
                        break;
                      case "meta":
                        if (f = km(
                          "meta",
                          "content",
                          t
                        ).get(i + (a.content || ""))) {
                          for (d = 0; d < f.length; d++)
                            if (o = f[d], F(
                              a.content,
                              "content"
                            ), o.getAttribute("content") === (a.content == null ? null : "" + a.content) && o.getAttribute("name") === (a.name == null ? null : a.name) && o.getAttribute("property") === (a.property == null ? null : a.property) && o.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && o.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), jt(o, i, a), t.head.appendChild(o);
                        break;
                      default:
                        throw Error(
                          'getNodesForType encountered a type it did not expect: "' + i + '". This is a bug in React.'
                        );
                    }
                    o[Ol] = e, tl(o), i = o;
                  }
                  e.stateNode = i;
                } else
                  $m(
                    o,
                    e.type,
                    e.stateNode
                  );
              else
                e.stateNode = rd(
                  o,
                  i,
                  e.memoizedProps
                );
            else
              t !== i ? (t === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : t.count--, i === null ? $m(
                o,
                e.type,
                e.stateNode
              ) : rd(
                o,
                i,
                e.memoizedProps
              )) : i === null && e.stateNode !== null && rm(
                e,
                e.memoizedProps,
                a.memoizedProps
              );
          break;
        case 27:
          Rl(t, e), Wl(e), i & 512 && (It || a === null || Ha(a, a.return)), a !== null && i & 4 && rm(
            e,
            e.memoizedProps,
            a.memoizedProps
          );
          break;
        case 5:
          if (Rl(t, e), Wl(e), i & 512 && (It || a === null || Ha(a, a.return)), e.flags & 32) {
            t = e.stateNode;
            try {
              ae(e, Tu, t);
            } catch (H) {
              me(e, e.return, H);
            }
          }
          i & 4 && e.stateNode != null && (t = e.memoizedProps, rm(
            e,
            t,
            a !== null ? a.memoizedProps : t
          )), i & 1024 && (ng = !0, e.type !== "form" && console.error(
            "Unexpected host component type. Expected a form. This is a bug in React."
          ));
          break;
        case 6:
          if (Rl(t, e), Wl(e), i & 4) {
            if (e.stateNode === null)
              throw Error(
                "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
              );
            i = e.memoizedProps, a = a !== null ? a.memoizedProps : i, t = e.stateNode;
            try {
              ae(
                e,
                mc,
                t,
                a,
                i
              );
            } catch (H) {
              me(e, e.return, H);
            }
          }
          break;
        case 3:
          if (o = Ka(), W0 = null, f = Nu, Nu = ts(t.containerInfo), Rl(t, e), Nu = f, Wl(e), i & 4 && a !== null && a.memoizedState.isDehydrated)
            try {
              ae(
                e,
                Qm,
                t.containerInfo
              );
            } catch (H) {
              me(e, e.return, H);
            }
          ng && (ng = !1, cc(e)), t.effectDuration += ku(o);
          break;
        case 4:
          i = Nu, Nu = ts(
            e.stateNode.containerInfo
          ), Rl(t, e), Wl(e), Nu = i;
          break;
        case 12:
          i = Ka(), Rl(t, e), Wl(e), e.stateNode.effectDuration += Ki(i);
          break;
        case 13:
          Rl(t, e), Wl(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (sg = Gn()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ic(e, i)));
          break;
        case 22:
          o = e.memoizedState !== null;
          var h = a !== null && a.memoizedState !== null, p = Uc, v = It;
          if (Uc = p || o, It = v || h, Rl(t, e), It = v, Uc = p, Wl(e), i & 8192)
            e: for (t = e.stateNode, t._visibility = o ? t._visibility & ~S0 : t._visibility | S0, o && (a === null || h || Uc || It || zl(e)), a = null, t = e; ; ) {
              if (t.tag === 5 || t.tag === 26) {
                if (a === null) {
                  h = a = t;
                  try {
                    f = h.stateNode, o ? ae(h, Pl, f) : ae(
                      h,
                      Vm,
                      h.stateNode,
                      h.memoizedProps
                    );
                  } catch (H) {
                    me(h, h.return, H);
                  }
                }
              } else if (t.tag === 6) {
                if (a === null) {
                  h = t;
                  try {
                    d = h.stateNode, o ? ae(h, Gm, d) : ae(
                      h,
                      od,
                      d,
                      h.memoizedProps
                    );
                  } catch (H) {
                    me(h, h.return, H);
                  }
                }
              } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
              }
              if (t === e) break e;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                  break e;
                a === t && (a = null), t = t.return;
              }
              a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
            }
          i & 4 && (i = e.updateQueue, i !== null && (a = i.retryQueue, a !== null && (i.retryQueue = null, ic(e, a))));
          break;
        case 19:
          Rl(t, e), Wl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ic(e, i)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          Rl(t, e), Wl(e);
      }
    }
    function Wl(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          ae(e, Lp, e);
        } catch (a) {
          me(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function cc(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          cc(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
        }
    }
    function Dn(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          mm(e, t.alternate, t), t = t.sibling;
    }
    function da(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          wr(
            e,
            e.return,
            Gl
          ), zl(e);
          break;
        case 1:
          Ha(e, e.return);
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && Gr(
            e,
            e.return,
            t
          ), zl(e);
          break;
        case 27:
          ae(
            e,
            Ao,
            e.stateNode
          );
        case 26:
        case 5:
          Ha(e, e.return), zl(e);
          break;
        case 22:
          e.memoizedState === null && zl(e);
          break;
        case 30:
          zl(e);
          break;
        default:
          zl(e);
      }
    }
    function zl(e) {
      for (e = e.child; e !== null; )
        da(e), e = e.sibling;
    }
    function vu(e, t, a, i) {
      var o = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          On(
            e,
            a,
            i
          ), cm(a, Gl);
          break;
        case 1:
          if (On(
            e,
            a,
            i
          ), t = a.stateNode, typeof t.componentDidMount == "function" && ae(
            a,
            Fv,
            a,
            t
          ), t = a.updateQueue, t !== null) {
            e = a.stateNode;
            try {
              ae(
                a,
                Wc,
                t,
                e
              );
            } catch (f) {
              me(a, a.return, f);
            }
          }
          i && o & 64 && fm(a), fo(a, a.return);
          break;
        case 27:
          hm(a);
        case 26:
        case 5:
          On(
            e,
            a,
            i
          ), i && t === null && o & 4 && Qp(a), fo(a, a.return);
          break;
        case 12:
          if (i && o & 4) {
            o = Ka(), On(
              e,
              a,
              i
            ), i = a.stateNode, i.effectDuration += Ki(o);
            try {
              ae(
                a,
                sm,
                a,
                t,
                A0,
                i.effectDuration
              );
            } catch (f) {
              me(a, a.return, f);
            }
          } else
            On(
              e,
              a,
              i
            );
          break;
        case 13:
          On(
            e,
            a,
            i
          ), i && o & 4 && so(e, a);
          break;
        case 22:
          a.memoizedState === null && On(
            e,
            a,
            i
          ), fo(a, a.return);
          break;
        case 30:
          break;
        default:
          On(
            e,
            a,
            i
          );
      }
    }
    function On(e, t, a) {
      for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; )
        vu(
          e,
          t.alternate,
          t,
          a
        ), t = t.sibling;
    }
    function Mn(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && Ji(e), a != null && yn(a));
    }
    function tn(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (Ji(t), e != null && yn(e));
    }
    function rt(e, t, a, i) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; )
          Jf(
            e,
            t,
            a,
            i
          ), t = t.sibling;
    }
    function Jf(e, t, a, i) {
      var o = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          rt(
            e,
            t,
            a,
            i
          ), o & 2048 && om(t, Tl | $n);
          break;
        case 1:
          rt(
            e,
            t,
            a,
            i
          );
          break;
        case 3:
          var f = Ka();
          rt(
            e,
            t,
            a,
            i
          ), o & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (Ji(t), a != null && yn(a))), e.passiveEffectDuration += ku(f);
          break;
        case 12:
          if (o & 2048) {
            o = Ka(), rt(
              e,
              t,
              a,
              i
            ), e = t.stateNode, e.passiveEffectDuration += Ki(o);
            try {
              ae(
                t,
                Xp,
                t,
                t.alternate,
                A0,
                e.passiveEffectDuration
              );
            } catch (h) {
              me(t, t.return, h);
            }
          } else
            rt(
              e,
              t,
              a,
              i
            );
          break;
        case 13:
          rt(
            e,
            t,
            a,
            i
          );
          break;
        case 23:
          break;
        case 22:
          f = t.stateNode;
          var d = t.alternate;
          t.memoizedState !== null ? f._visibility & Ac ? rt(
            e,
            t,
            a,
            i
          ) : ro(
            e,
            t
          ) : f._visibility & Ac ? rt(
            e,
            t,
            a,
            i
          ) : (f._visibility |= Ac, ui(
            e,
            t,
            a,
            i,
            (t.subtreeFlags & 10256) !== 0
          )), o & 2048 && Mn(d, t);
          break;
        case 24:
          rt(
            e,
            t,
            a,
            i
          ), o & 2048 && tn(t.alternate, t);
          break;
        default:
          rt(
            e,
            t,
            a,
            i
          );
      }
    }
    function ui(e, t, a, i, o) {
      for (o = o && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; )
        Qr(
          e,
          t,
          a,
          i,
          o
        ), t = t.sibling;
    }
    function Qr(e, t, a, i, o) {
      var f = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ui(
            e,
            t,
            a,
            i,
            o
          ), om(t, Tl);
          break;
        case 23:
          break;
        case 22:
          var d = t.stateNode;
          t.memoizedState !== null ? d._visibility & Ac ? ui(
            e,
            t,
            a,
            i,
            o
          ) : ro(
            e,
            t
          ) : (d._visibility |= Ac, ui(
            e,
            t,
            a,
            i,
            o
          )), o && f & 2048 && Mn(
            t.alternate,
            t
          );
          break;
        case 24:
          ui(
            e,
            t,
            a,
            i,
            o
          ), o && f & 2048 && tn(t.alternate, t);
          break;
        default:
          ui(
            e,
            t,
            a,
            i,
            o
          );
      }
    }
    function ro(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var a = e, i = t, o = i.flags;
          switch (i.tag) {
            case 22:
              ro(
                a,
                i
              ), o & 2048 && Mn(
                i.alternate,
                i
              );
              break;
            case 24:
              ro(
                a,
                i
              ), o & 2048 && tn(
                i.alternate,
                i
              );
              break;
            default:
              ro(
                a,
                i
              );
          }
          t = t.sibling;
        }
    }
    function oc(e) {
      if (e.subtreeFlags & Yy)
        for (e = e.child; e !== null; )
          ii(e), e = e.sibling;
    }
    function ii(e) {
      switch (e.tag) {
        case 26:
          oc(e), e.flags & Yy && e.memoizedState !== null && t0(
            Nu,
            e.memoizedState,
            e.memoizedProps
          );
          break;
        case 5:
          oc(e);
          break;
        case 3:
        case 4:
          var t = Nu;
          Nu = ts(
            e.stateNode.containerInfo
          ), oc(e), Nu = t;
          break;
        case 22:
          e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = Yy, Yy = 16777216, oc(e), Yy = t) : oc(e));
          break;
        default:
          oc(e);
      }
    }
    function Kf(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function ho(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Ul = i, gm(
              i,
              e
            );
          }
        Kf(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; )
          vm(e), e = e.sibling;
    }
    function vm(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          ho(e), e.flags & 2048 && Lf(
            e,
            e.return,
            Tl | $n
          );
          break;
        case 3:
          var t = Ka();
          ho(e), e.stateNode.passiveEffectDuration += ku(t);
          break;
        case 12:
          t = Ka(), ho(e), e.stateNode.passiveEffectDuration += Ki(t);
          break;
        case 22:
          t = e.stateNode, e.memoizedState !== null && t._visibility & Ac && (e.return === null || e.return.tag !== 13) ? (t._visibility &= ~Ac, kf(e)) : ho(e);
          break;
        default:
          ho(e);
      }
    }
    function kf(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Ul = i, gm(
              i,
              e
            );
          }
        Kf(e);
      }
      for (e = e.child; e !== null; )
        $f(e), e = e.sibling;
    }
    function $f(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Lf(
            e,
            e.return,
            Tl
          ), kf(e);
          break;
        case 22:
          var t = e.stateNode;
          t._visibility & Ac && (t._visibility &= ~Ac, kf(e));
          break;
        default:
          kf(e);
      }
    }
    function gm(e, t) {
      for (; Ul !== null; ) {
        var a = Ul, i = a;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            Lf(
              i,
              t,
              Tl
            );
            break;
          case 23:
          case 22:
            i.memoizedState !== null && i.memoizedState.cachePool !== null && (i = i.memoizedState.cachePool.pool, i != null && Ji(i));
            break;
          case 24:
            yn(i.memoizedState.cache);
        }
        if (i = a.child, i !== null) i.return = a, Ul = i;
        else
          e: for (a = e; Ul !== null; ) {
            i = Ul;
            var o = i.sibling, f = i.return;
            if (ym(i), i === a) {
              Ul = null;
              break e;
            }
            if (o !== null) {
              o.return = f, Ul = o;
              break e;
            }
            Ul = f;
          }
      }
    }
    function bm() {
      CS.forEach(function(e) {
        return e();
      });
    }
    function Sm() {
      var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
      return e || j.actQueue === null || console.error(
        "The current testing environment is not configured to support act(...)"
      ), e;
    }
    function Fl(e) {
      if ((ot & Sa) !== un && Ve !== 0)
        return Ve & -Ve;
      var t = j.T;
      return t !== null ? (t._updatedFibers || (t._updatedFibers = /* @__PURE__ */ new Set()), t._updatedFibers.add(e), e = Ds, e !== 0 ? e : Mm()) : fp();
    }
    function Zp() {
      on === 0 && (on = (Ve & 536870912) === 0 || lt ? sh() : 536870912);
      var e = Fn.current;
      return e !== null && (e.flags |= 32), on;
    }
    function Ht(e, t, a) {
      if (ih && console.error("useInsertionEffect must not schedule updates."), yg && (Y0 = !0), (e === vt && (dt === Hs || dt === Ns) || e.cancelPendingCommit !== null) && (sc(e, 0), gu(
        e,
        Ve,
        on,
        !1
      )), Bc(e, a), (ot & Sa) !== 0 && e === vt) {
        if (aa)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              e = Ge && ce(Ge) || "Unknown", l1.has(e) || (l1.add(e), t = ce(t) || "Unknown", console.error(
                "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                t,
                e,
                e
              ));
              break;
            case 1:
              t1 || (console.error(
                "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
              ), t1 = !0);
          }
      } else
        qt && tu(e, t, a), $p(t), e === vt && ((ot & Sa) === un && (Jo |= a), Xt === Cs && gu(
          e,
          Ve,
          on,
          !1
        )), Na(e);
    }
    function Wt(e, t, a) {
      if ((ot & (Sa | ju)) !== un)
        throw Error("Should not already be working.");
      var i = !a && (t & 124) === 0 && (t & e.expiredLanes) === 0 || ef(e, t), o = i ? Em(e, t) : Kr(e, t, !0), f = i;
      do {
        if (o === Cc) {
          nh && !i && gu(e, t, 0, !1);
          break;
        } else {
          if (a = e.current.alternate, f && !Jp(a)) {
            o = Kr(e, t, !1), f = !1;
            continue;
          }
          if (o === lh) {
            if (f = t, e.errorRecoveryDisabledLanes & f)
              var d = 0;
            else
              d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
            if (d !== 0) {
              t = d;
              e: {
                o = e;
                var h = d;
                d = Ly;
                var p = o.current.memoizedState.isDehydrated;
                if (p && (sc(
                  o,
                  h
                ).flags |= 256), h = Kr(
                  o,
                  h,
                  !1
                ), h !== lh) {
                  if (og && !p) {
                    o.errorRecoveryDisabledLanes |= f, Jo |= f, o = Cs;
                    break e;
                  }
                  o = Ta, Ta = d, o !== null && (Ta === null ? Ta = o : Ta.push.apply(
                    Ta,
                    o
                  ));
                }
                o = h;
              }
              if (f = !1, o !== lh) continue;
            }
          }
          if (o === Gy) {
            sc(e, 0), gu(e, t, 0, !0);
            break;
          }
          e: {
            switch (i = e, o) {
              case Cc:
              case Gy:
                throw Error("Root did not complete. This is a bug in React.");
              case Cs:
                if ((t & 4194048) !== t) break;
              case _0:
                gu(
                  i,
                  t,
                  on,
                  !Lo
                );
                break e;
              case lh:
                Ta = null;
                break;
              case ug:
              case Kb:
                break;
              default:
                throw Error("Unknown root exit status.");
            }
            if (j.actQueue !== null)
              Ir(
                i,
                a,
                t,
                Ta,
                Zy,
                B0,
                on,
                Jo,
                js
              );
            else {
              if ((t & 62914560) === t && (f = sg + $b - Gn(), 10 < f)) {
                if (gu(
                  i,
                  t,
                  on,
                  !Lo
                ), ua(i, 0, !0) !== 0) break e;
                i.timeoutHandle = s1(
                  ul.bind(
                    null,
                    i,
                    a,
                    Ta,
                    Zy,
                    B0,
                    t,
                    on,
                    Jo,
                    js,
                    Lo,
                    o,
                    _S,
                    Fg,
                    0
                  ),
                  f
                );
                break e;
              }
              ul(
                i,
                a,
                Ta,
                Zy,
                B0,
                t,
                on,
                Jo,
                js,
                Lo,
                o,
                NS,
                Fg,
                0
              );
            }
          }
        }
        break;
      } while (!0);
      Na(e);
    }
    function ul(e, t, a, i, o, f, d, h, p, v, H, q, U, Y) {
      if (e.timeoutHandle = ws, q = t.subtreeFlags, (q & 8192 || (q & 16785408) === 16785408) && (Fy = { stylesheets: null, count: 0, unsuspend: e0 }, ii(t), q = l0(), q !== null)) {
        e.cancelPendingCommit = q(
          Ir.bind(
            null,
            e,
            t,
            f,
            a,
            i,
            o,
            d,
            h,
            p,
            H,
            jS,
            U,
            Y
          )
        ), gu(
          e,
          f,
          d,
          !v
        );
        return;
      }
      Ir(
        e,
        t,
        f,
        a,
        i,
        o,
        d,
        h,
        p
      );
    }
    function Jp(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
          for (var i = 0; i < a.length; i++) {
            var o = a[i], f = o.getSnapshot;
            o = o.value;
            try {
              if (!va(f(), o)) return !1;
            } catch {
              return !1;
            }
          }
        if (a = t.child, t.subtreeFlags & 16384 && a !== null)
          a.return = t, t = a;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return !0;
    }
    function gu(e, t, a, i) {
      t &= ~fg, t &= ~Jo, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
      for (var o = t; 0 < o; ) {
        var f = 31 - Dl(o), d = 1 << f;
        i[f] = -1, o &= ~d;
      }
      a !== 0 && op(e, a, t);
    }
    function fc() {
      return (ot & (Sa | ju)) === un ? (rc(0), !1) : !0;
    }
    function Lr() {
      if (Ge !== null) {
        if (dt === Va)
          var e = Ge.return;
        else
          e = Ge, cr(), Fa(e), $d = null, By = 0, e = Ge;
        for (; e !== null; )
          im(e.alternate, e), e = e.return;
        Ge = null;
      }
    }
    function sc(e, t) {
      var a = e.timeoutHandle;
      a !== ws && (e.timeoutHandle = ws, kS(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Lr(), vt = e, Ge = a = hn(e.current, null), Ve = t, dt = Va, cn = null, Lo = !1, nh = ef(e, t), og = !1, Xt = Cc, js = on = fg = Jo = Zo = 0, Ta = Ly = null, B0 = !1, (t & 8) !== 0 && (t |= t & 32);
      var i = e.entangledLanes;
      if (i !== 0)
        for (e = e.entanglements, i &= t; 0 < i; ) {
          var o = 31 - Dl(i), f = 1 << o;
          t |= e[o], i &= ~f;
        }
      return zi = t, pf(), t = $g(), 1e3 < t - kg && (j.recentlyCreatedOwnerStacks = 0, kg = t), Cu.discardPendingWarnings(), a;
    }
    function Wf(e, t) {
      Ee = null, j.H = N0, j.getCurrentStack = null, aa = !1, pa = null, t === Hy || t === O0 ? (t = Qh(), dt = Xy) : t === eb ? (t = Qh(), dt = kb) : dt = t === Yb ? cg : t !== null && typeof t == "object" && typeof t.then == "function" ? ah : Vy, cn = t;
      var a = Ge;
      if (a === null)
        Xt = Gy, oo(
          e,
          oa(t, e.current)
        );
      else
        switch (a.mode & wl && fu(a), Xl(), dt) {
          case Vy:
            I !== null && typeof I.markComponentErrored == "function" && I.markComponentErrored(
              a,
              t,
              Ve
            );
            break;
          case Hs:
          case Ns:
          case Xy:
          case ah:
          case Qy:
            I !== null && typeof I.markComponentSuspended == "function" && I.markComponentSuspended(
              a,
              t,
              Ve
            );
        }
    }
    function Zr() {
      var e = j.H;
      return j.H = N0, e === null ? N0 : e;
    }
    function Tm() {
      var e = j.A;
      return j.A = US, e;
    }
    function Jr() {
      Xt = Cs, Lo || (Ve & 4194048) !== Ve && Fn.current !== null || (nh = !0), (Zo & 134217727) === 0 && (Jo & 134217727) === 0 || vt === null || gu(
        vt,
        Ve,
        on,
        !1
      );
    }
    function Kr(e, t, a) {
      var i = ot;
      ot |= Sa;
      var o = Zr(), f = Tm();
      if (vt !== e || Ve !== t) {
        if (qt) {
          var d = e.memoizedUpdaters;
          0 < d.size && (vo(e, Ve), d.clear()), Ql(e, t);
        }
        Zy = null, sc(e, t);
      }
      eu(t), t = !1, d = Xt;
      e: do
        try {
          if (dt !== Va && Ge !== null) {
            var h = Ge, p = cn;
            switch (dt) {
              case cg:
                Lr(), d = _0;
                break e;
              case Xy:
              case Hs:
              case Ns:
              case ah:
                Fn.current === null && (t = !0);
                var v = dt;
                if (dt = Va, cn = null, ci(e, h, p, v), a && nh) {
                  d = Cc;
                  break e;
                }
                break;
              default:
                v = dt, dt = Va, cn = null, ci(e, h, p, v);
            }
          }
          kr(), d = Xt;
          break;
        } catch (H) {
          Wf(e, H);
        }
      while (!0);
      return t && e.shellSuspendCounter++, cr(), ot = i, j.H = o, j.A = f, Di(), Ge === null && (vt = null, Ve = 0, pf()), d;
    }
    function kr() {
      for (; Ge !== null; ) Am(Ge);
    }
    function Em(e, t) {
      var a = ot;
      ot |= Sa;
      var i = Zr(), o = Tm();
      if (vt !== e || Ve !== t) {
        if (qt) {
          var f = e.memoizedUpdaters;
          0 < f.size && (vo(e, Ve), f.clear()), Ql(e, t);
        }
        Zy = null, q0 = Gn() + Wb, sc(e, t);
      } else
        nh = ef(
          e,
          t
        );
      eu(t);
      e: do
        try {
          if (dt !== Va && Ge !== null)
            t: switch (t = Ge, f = cn, dt) {
              case Vy:
                dt = Va, cn = null, ci(
                  e,
                  t,
                  f,
                  Vy
                );
                break;
              case Hs:
              case Ns:
                if (Xh(f)) {
                  dt = Va, cn = null, $r(t);
                  break;
                }
                t = function() {
                  dt !== Hs && dt !== Ns || vt !== e || (dt = Qy), Na(e);
                }, f.then(t, t);
                break e;
              case Xy:
                dt = Qy;
                break e;
              case kb:
                dt = ig;
                break e;
              case Qy:
                Xh(f) ? (dt = Va, cn = null, $r(t)) : (dt = Va, cn = null, ci(
                  e,
                  t,
                  f,
                  Qy
                ));
                break;
              case ig:
                var d = null;
                switch (Ge.tag) {
                  case 26:
                    d = Ge.memoizedState;
                  case 5:
                  case 27:
                    var h = Ge;
                    if (!d || ls(d)) {
                      dt = Va, cn = null;
                      var p = h.sibling;
                      if (p !== null) Ge = p;
                      else {
                        var v = h.return;
                        v !== null ? (Ge = v, Ff(v)) : Ge = null;
                      }
                      break t;
                    }
                    break;
                  default:
                    console.error(
                      "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                    );
                }
                dt = Va, cn = null, ci(
                  e,
                  t,
                  f,
                  ig
                );
                break;
              case ah:
                dt = Va, cn = null, ci(
                  e,
                  t,
                  f,
                  ah
                );
                break;
              case cg:
                Lr(), Xt = _0;
                break e;
              default:
                throw Error(
                  "Unexpected SuspendedReason. This is a bug in React."
                );
            }
          j.actQueue !== null ? kr() : xm();
          break;
        } catch (H) {
          Wf(e, H);
        }
      while (!0);
      return cr(), j.H = i, j.A = o, ot = a, Ge !== null ? (I !== null && typeof I.markRenderYielded == "function" && I.markRenderYielded(), Cc) : (Di(), vt = null, Ve = 0, pf(), Xt);
    }
    function xm() {
      for (; Ge !== null && !f0(); )
        Am(Ge);
    }
    function Am(e) {
      var t = e.alternate;
      (e.mode & wl) !== At ? (or(e), t = ae(
        e,
        Yr,
        t,
        e,
        zi
      ), fu(e)) : t = ae(
        e,
        Yr,
        t,
        e,
        zi
      ), e.memoizedProps = e.pendingProps, t === null ? Ff(e) : Ge = t;
    }
    function $r(e) {
      var t = ae(e, Wr, e);
      e.memoizedProps = e.pendingProps, t === null ? Ff(e) : Ge = t;
    }
    function Wr(e) {
      var t = e.alternate, a = (e.mode & wl) !== At;
      switch (a && or(e), e.tag) {
        case 15:
        case 0:
          t = tm(
            t,
            e,
            e.pendingProps,
            e.type,
            void 0,
            Ve
          );
          break;
        case 11:
          t = tm(
            t,
            e,
            e.pendingProps,
            e.type.render,
            e.ref,
            Ve
          );
          break;
        case 5:
          Fa(e);
        default:
          im(t, e), e = Ge = Mh(e, zi), t = Yr(t, e, zi);
      }
      return a && fu(e), t;
    }
    function ci(e, t, a, i) {
      cr(), Fa(t), $d = null, By = 0;
      var o = t.return;
      try {
        if (qf(
          e,
          o,
          t,
          a,
          Ve
        )) {
          Xt = Gy, oo(
            e,
            oa(a, e.current)
          ), Ge = null;
          return;
        }
      } catch (f) {
        if (o !== null) throw Ge = o, f;
        Xt = Gy, oo(
          e,
          oa(a, e.current)
        ), Ge = null;
        return;
      }
      t.flags & 32768 ? (lt || i === Vy ? e = !0 : nh || (Ve & 536870912) !== 0 ? e = !1 : (Lo = e = !0, (i === Hs || i === Ns || i === Xy || i === ah) && (i = Fn.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Fr(t, e)) : Ff(t);
    }
    function Ff(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          Fr(
            t,
            Lo
          );
          return;
        }
        var a = t.alternate;
        if (e = t.return, or(t), a = ae(
          t,
          Yp,
          a,
          t,
          zi
        ), (t.mode & wl) !== At && ki(t), a !== null) {
          Ge = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          Ge = t;
          return;
        }
        Ge = t = e;
      } while (t !== null);
      Xt === Cc && (Xt = Kb);
    }
    function Fr(e, t) {
      do {
        var a = wp(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, Ge = a;
          return;
        }
        if ((e.mode & wl) !== At) {
          ki(e), a = e.actualDuration;
          for (var i = e.child; i !== null; )
            a += i.actualDuration, i = i.sibling;
          e.actualDuration = a;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          Ge = e;
          return;
        }
        Ge = e = a;
      } while (e !== null);
      Xt = _0, Ge = null;
    }
    function Ir(e, t, a, i, o, f, d, h, p) {
      e.cancelPendingCommit = null;
      do
        mo();
      while (Vl !== _s);
      if (Cu.flushLegacyContextWarning(), Cu.flushPendingUnsafeLifecycleWarnings(), (ot & (Sa | ju)) !== un)
        throw Error("Should not already be working.");
      if (I !== null && typeof I.markCommitStarted == "function" && I.markCommitStarted(a), t === null) Tt();
      else {
        if (a === 0 && console.error(
          "finishedLanes should not be empty during a commit. This is a bug in React."
        ), t === e.current)
          throw Error(
            "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
          );
        if (f = t.lanes | t.childLanes, f |= Yv, fv(
          e,
          a,
          f,
          d,
          h,
          p
        ), e === vt && (Ge = vt = null, Ve = 0), uh = t, ko = e, $o = a, dg = f, hg = o, e1 = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Om(Ho, function() {
          return If(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), A0 = Ld(), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
          i = j.T, j.T = null, o = ve.p, ve.p = bl, d = ot, ot |= ju;
          try {
            Vr(e, t, a);
          } finally {
            ot = d, ve.p = o, j.T = i;
          }
        }
        Vl = Fb, Un(), Pr(), Kp();
      }
    }
    function Un() {
      if (Vl === Fb) {
        Vl = _s;
        var e = ko, t = uh, a = $o, i = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || i) {
          i = j.T, j.T = null;
          var o = ve.p;
          ve.p = bl;
          var f = ot;
          ot |= ju;
          try {
            eh = a, th = e, pm(t, e), th = eh = null, a = Ag;
            var d = Ap(e.containerInfo), h = a.focusedElem, p = a.selectionRange;
            if (d !== h && h && h.ownerDocument && xp(
              h.ownerDocument.documentElement,
              h
            )) {
              if (p !== null && Rh(h)) {
                var v = p.start, H = p.end;
                if (H === void 0 && (H = v), "selectionStart" in h)
                  h.selectionStart = v, h.selectionEnd = Math.min(
                    H,
                    h.value.length
                  );
                else {
                  var q = h.ownerDocument || document, U = q && q.defaultView || window;
                  if (U.getSelection) {
                    var Y = U.getSelection(), ne = h.textContent.length, ge = Math.min(
                      p.start,
                      ne
                    ), gt = p.end === void 0 ? ge : Math.min(p.end, ne);
                    !Y.extend && ge > gt && (d = gt, gt = ge, ge = d);
                    var Ze = Ah(
                      h,
                      ge
                    ), S = Ah(
                      h,
                      gt
                    );
                    if (Ze && S && (Y.rangeCount !== 1 || Y.anchorNode !== Ze.node || Y.anchorOffset !== Ze.offset || Y.focusNode !== S.node || Y.focusOffset !== S.offset)) {
                      var T = q.createRange();
                      T.setStart(Ze.node, Ze.offset), Y.removeAllRanges(), ge > gt ? (Y.addRange(T), Y.extend(S.node, S.offset)) : (T.setEnd(S.node, S.offset), Y.addRange(T));
                    }
                  }
                }
              }
              for (q = [], Y = h; Y = Y.parentNode; )
                Y.nodeType === 1 && q.push({
                  element: Y,
                  left: Y.scrollLeft,
                  top: Y.scrollTop
                });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < q.length; h++) {
                var x = q[h];
                x.element.scrollLeft = x.left, x.element.scrollTop = x.top;
              }
            }
            P0 = !!xg, Ag = xg = null;
          } finally {
            ot = f, ve.p = o, j.T = i;
          }
        }
        e.current = t, Vl = Ib;
      }
    }
    function Pr() {
      if (Vl === Ib) {
        Vl = _s;
        var e = ko, t = uh, a = $o, i = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || i) {
          i = j.T, j.T = null;
          var o = ve.p;
          ve.p = bl;
          var f = ot;
          ot |= ju;
          try {
            I !== null && typeof I.markLayoutEffectsStarted == "function" && I.markLayoutEffectsStarted(a), eh = a, th = e, mm(
              e,
              t.alternate,
              t
            ), th = eh = null, I !== null && typeof I.markLayoutEffectsStopped == "function" && I.markLayoutEffectsStopped();
          } finally {
            ot = f, ve.p = o, j.T = i;
          }
        }
        Vl = Pb;
      }
    }
    function Kp() {
      if (Vl === BS || Vl === Pb) {
        Vl = _s, Dv();
        var e = ko, t = uh, a = $o, i = e1, o = (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0;
        o ? Vl = rg : (Vl = _s, uh = ko = null, Cn(e, e.pendingLanes), Bs = 0, Ky = null);
        var f = e.pendingLanes;
        if (f === 0 && (Ko = null), o || po(e), o = dh(a), t = t.stateNode, gl && typeof gl.onCommitFiberRoot == "function")
          try {
            var d = (t.current.flags & 128) === 128;
            switch (o) {
              case bl:
                var h = Ed;
                break;
              case nn:
                h = ms;
                break;
              case Du:
                h = Ho;
                break;
              case zd:
                h = ys;
                break;
              default:
                h = Ho;
            }
            gl.onCommitFiberRoot(
              vi,
              t,
              h,
              d
            );
          } catch (q) {
            ta || (ta = !0, console.error(
              "React instrumentation encountered an error: %s",
              q
            ));
          }
        if (qt && e.memoizedUpdaters.clear(), bm(), i !== null) {
          d = j.T, h = ve.p, ve.p = bl, j.T = null;
          try {
            var p = e.onRecoverableError;
            for (t = 0; t < i.length; t++) {
              var v = i[t], H = kp(v.stack);
              ae(
                v.source,
                p,
                v.value,
                H
              );
            }
          } finally {
            j.T = d, ve.p = h;
          }
        }
        ($o & 3) !== 0 && mo(), Na(e), f = e.pendingLanes, (a & 4194090) !== 0 && (f & 42) !== 0 ? (z0 = !0, e === mg ? Jy++ : (Jy = 0, mg = e)) : Jy = 0, rc(0), Tt();
      }
    }
    function kp(e) {
      return e = { componentStack: e }, Object.defineProperty(e, "digest", {
        get: function() {
          console.error(
            'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
          );
        }
      }), e;
    }
    function Cn(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, yn(t)));
    }
    function mo(e) {
      return Un(), Pr(), Kp(), If();
    }
    function If() {
      if (Vl !== rg) return !1;
      var e = ko, t = dg;
      dg = 0;
      var a = dh($o), i = Du > a ? Du : a;
      a = j.T;
      var o = ve.p;
      try {
        ve.p = i, j.T = null, i = hg, hg = null;
        var f = ko, d = $o;
        if (Vl = _s, uh = ko = null, $o = 0, (ot & (Sa | ju)) !== un)
          throw Error("Cannot flush passive effects while already rendering.");
        yg = !0, Y0 = !1, I !== null && typeof I.markPassiveEffectsStarted == "function" && I.markPassiveEffectsStarted(d);
        var h = ot;
        if (ot |= ju, vm(f.current), Jf(
          f,
          f.current,
          d,
          i
        ), I !== null && typeof I.markPassiveEffectsStopped == "function" && I.markPassiveEffectsStopped(), po(f), ot = h, rc(0, !1), Y0 ? f === Ky ? Bs++ : (Bs = 0, Ky = f) : Bs = 0, Y0 = yg = !1, gl && typeof gl.onPostCommitFiberRoot == "function")
          try {
            gl.onPostCommitFiberRoot(vi, f);
          } catch (v) {
            ta || (ta = !0, console.error(
              "React instrumentation encountered an error: %s",
              v
            ));
          }
        var p = f.current.stateNode;
        return p.effectDuration = 0, p.passiveEffectDuration = 0, !0;
      } finally {
        ve.p = o, j.T = a, Cn(e, t);
      }
    }
    function yo(e, t, a) {
      t = oa(a, t), t = Al(e.stateNode, t, 2), e = $a(e, t, 2), e !== null && (Bc(e, 2), Na(e));
    }
    function me(e, t, a) {
      if (ih = !1, e.tag === 3)
        yo(e, e, a);
      else {
        for (; t !== null; ) {
          if (t.tag === 3) {
            yo(
              t,
              e,
              a
            );
            return;
          }
          if (t.tag === 1) {
            var i = t.stateNode;
            if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Ko === null || !Ko.has(i))) {
              e = oa(a, e), a = Ct(2), i = $a(t, a, 2), i !== null && (Bf(
                a,
                i,
                t,
                e
              ), Bc(i, 2), Na(i));
              return;
            }
          }
          t = t.return;
        }
        console.error(
          `Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,
          a
        );
      }
    }
    function Rm(e, t, a) {
      var i = e.pingCache;
      if (i === null) {
        i = e.pingCache = new HS();
        var o = /* @__PURE__ */ new Set();
        i.set(t, o);
      } else
        o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
      o.has(a) || (og = !0, o.add(a), i = Sv.bind(null, e, t, a), qt && vo(e, a), t.then(i, i));
    }
    function Sv(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Sm() && j.actQueue === null && console.error(
        `A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`
      ), vt === e && (Ve & a) === a && (Xt === Cs || Xt === ug && (Ve & 62914560) === Ve && Gn() - sg < $b ? (ot & Sa) === un && sc(e, 0) : fg |= a, js === Ve && (js = 0)), Na(e);
    }
    function zm(e, t) {
      t === 0 && (t = tf()), e = Ll(e, t), e !== null && (Bc(e, t), Na(e));
    }
    function Pf(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), zm(e, a);
    }
    function oi(e, t) {
      var a = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode, o = e.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        case 22:
          i = e.stateNode._retryCache;
          break;
        default:
          throw Error(
            "Pinged unknown suspense boundary type. This is probably a bug in React."
          );
      }
      i !== null && i.delete(t), zm(e, a);
    }
    function ed(e, t, a) {
      if ((t.subtreeFlags & 67117056) !== 0)
        for (t = t.child; t !== null; ) {
          var i = e, o = t, f = o.type === Do;
          f = a || f, o.tag !== 22 ? o.flags & 67108864 ? f && ae(
            o,
            Dm,
            i,
            o,
            (o.mode & Zg) === At
          ) : ed(
            i,
            o,
            f
          ) : o.memoizedState === null && (f && o.flags & 8192 ? ae(
            o,
            Dm,
            i,
            o
          ) : o.subtreeFlags & 67108864 && ae(
            o,
            ed,
            i,
            o,
            f
          )), t = t.sibling;
        }
    }
    function Dm(e, t) {
      var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : !0;
      qe(!0);
      try {
        da(t), a && $f(t), vu(e, t.alternate, t, !1), a && Qr(e, t, 0, null, !1, 0);
      } finally {
        qe(!1);
      }
    }
    function po(e) {
      var t = !0;
      e.current.mode & (na | Uu) || (t = !1), ed(
        e,
        e.current,
        t
      );
    }
    function ln(e) {
      if ((ot & Sa) === un) {
        var t = e.tag;
        if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
          if (t = ce(e) || "ReactComponent", w0 !== null) {
            if (w0.has(t)) return;
            w0.add(t);
          } else w0 = /* @__PURE__ */ new Set([t]);
          ae(e, function() {
            console.error(
              "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead."
            );
          });
        }
      }
    }
    function vo(e, t) {
      qt && e.memoizedUpdaters.forEach(function(a) {
        tu(e, a, t);
      });
    }
    function Om(e, t) {
      var a = j.actQueue;
      return a !== null ? (a.push(t), wS) : Td(e, t);
    }
    function $p(e) {
      Sm() && j.actQueue === null && ae(e, function() {
        console.error(
          `An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`,
          ce(e)
        );
      });
    }
    function Na(e) {
      e !== ch && e.next === null && (ch === null ? G0 = ch = e : ch = ch.next = e), V0 = !0, j.actQueue !== null ? vg || (vg = !0, Ft()) : pg || (pg = !0, Ft());
    }
    function rc(e, t) {
      if (!gg && V0) {
        gg = !0;
        do
          for (var a = !1, i = G0; i !== null; ) {
            if (e !== 0) {
              var o = i.pendingLanes;
              if (o === 0) var f = 0;
              else {
                var d = i.suspendedLanes, h = i.pingedLanes;
                f = (1 << 31 - Dl(42 | e) + 1) - 1, f &= o & ~(d & ~h), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
              }
              f !== 0 && (a = !0, ad(i, f));
            } else
              f = Ve, f = ua(
                i,
                i === vt ? f : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== ws
              ), (f & 3) === 0 || ef(i, f) || (a = !0, ad(i, f));
            i = i.next;
          }
        while (a);
        gg = !1;
      }
    }
    function td() {
      ld();
    }
    function ld() {
      V0 = vg = pg = !1;
      var e = 0;
      qs !== 0 && (go() && (e = qs), qs = 0);
      for (var t = Gn(), a = null, i = G0; i !== null; ) {
        var o = i.next, f = Hn(i, t);
        f === 0 ? (i.next = null, a === null ? G0 = o : a.next = o, o === null && (ch = a)) : (a = i, (e !== 0 || (f & 3) !== 0) && (V0 = !0)), i = o;
      }
      rc(e);
    }
    function Hn(e, t) {
      for (var a = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
        var d = 31 - Dl(f), h = 1 << d, p = o[d];
        p === -1 ? ((h & a) === 0 || (h & i) !== 0) && (o[d] = cp(h, t)) : p <= t && (e.expiredLanes |= h), f &= ~h;
      }
      if (t = vt, a = Ve, a = ua(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== ws
      ), i = e.callbackNode, a === 0 || e === t && (dt === Hs || dt === Ns) || e.cancelPendingCommit !== null)
        return i !== null && nd(i), e.callbackNode = null, e.callbackPriority = 0;
      if ((a & 3) === 0 || ef(e, a)) {
        if (t = a & -a, t !== e.callbackPriority || j.actQueue !== null && i !== bg)
          nd(i);
        else return t;
        switch (dh(a)) {
          case bl:
          case nn:
            a = ms;
            break;
          case Du:
            a = Ho;
            break;
          case zd:
            a = ys;
            break;
          default:
            a = Ho;
        }
        return i = Nt.bind(null, e), j.actQueue !== null ? (j.actQueue.push(i), a = bg) : a = Td(a, i), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return i !== null && nd(i), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function Nt(e, t) {
      if (z0 = R0 = !1, Vl !== _s && Vl !== rg)
        return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (mo() && e.callbackNode !== a)
        return null;
      var i = Ve;
      return i = ua(
        e,
        e === vt ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== ws
      ), i === 0 ? null : (Wt(
        e,
        i,
        t
      ), Hn(e, Gn()), e.callbackNode != null && e.callbackNode === a ? Nt.bind(null, e) : null);
    }
    function ad(e, t) {
      if (mo()) return null;
      R0 = z0, z0 = !1, Wt(e, t, !0);
    }
    function nd(e) {
      e !== bg && e !== null && zv(e);
    }
    function Ft() {
      j.actQueue !== null && j.actQueue.push(function() {
        return ld(), null;
      }), $S(function() {
        (ot & (Sa | ju)) !== un ? Td(
          Ed,
          td
        ) : ld();
      });
    }
    function Mm() {
      return qs === 0 && (qs = sh()), qs;
    }
    function Um(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (F(e, "action"), Lc("" + e));
    }
    function Cm(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function Et(e, t, a, i, o) {
      if (t === "submit" && a && a.stateNode === o) {
        var f = Um(
          (o[la] || null).action
        ), d = i.submitter;
        d && (t = (t = d[la] || null) ? Um(t.formAction) : d.getAttribute("formAction"), t !== null && (f = t, d = null));
        var h = new re(
          "action",
          "action",
          null,
          i,
          o
        );
        e.push({
          event: h,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (i.defaultPrevented) {
                  if (qs !== 0) {
                    var p = d ? Cm(
                      o,
                      d
                    ) : new FormData(o), v = {
                      pending: !0,
                      data: p,
                      method: o.method,
                      action: f
                    };
                    Object.freeze(v), Ii(
                      a,
                      v,
                      null,
                      p
                    );
                  }
                } else
                  typeof f == "function" && (h.preventDefault(), p = d ? Cm(
                    o,
                    d
                  ) : new FormData(o), v = {
                    pending: !0,
                    data: p,
                    method: o.method,
                    action: f
                  }, Object.freeze(v), Ii(
                    a,
                    v,
                    f,
                    p
                  ));
              },
              currentTarget: o
            }
          ]
        });
      }
    }
    function ml(e, t, a) {
      e.currentTarget = a;
      try {
        t(e);
      } catch (i) {
        eg(i);
      }
      e.currentTarget = null;
    }
    function Nn(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        e: {
          var o = void 0, f = i.event;
          if (i = i.listeners, t)
            for (var d = i.length - 1; 0 <= d; d--) {
              var h = i[d], p = h.instance, v = h.currentTarget;
              if (h = h.listener, p !== o && f.isPropagationStopped())
                break e;
              p !== null ? ae(
                p,
                ml,
                f,
                h,
                v
              ) : ml(f, h, v), o = p;
            }
          else
            for (d = 0; d < i.length; d++) {
              if (h = i[d], p = h.instance, v = h.currentTarget, h = h.listener, p !== o && f.isPropagationStopped())
                break e;
              p !== null ? ae(
                p,
                ml,
                f,
                h,
                v
              ) : ml(f, h, v), o = p;
            }
        }
      }
    }
    function _e(e, t) {
      Sg.has(e) || console.error(
        'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
        e
      );
      var a = t[ny];
      a === void 0 && (a = t[ny] = /* @__PURE__ */ new Set());
      var i = e + "__bubble";
      a.has(i) || (id(t, e, 2, !1), a.add(i));
    }
    function ud(e, t, a) {
      Sg.has(e) && !t && console.error(
        'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
        e
      );
      var i = 0;
      t && (i |= 4), id(
        a,
        e,
        i,
        t
      );
    }
    function Hm(e) {
      if (!e[X0]) {
        e[X0] = !0, r0.forEach(function(a) {
          a !== "selectionchange" && (Sg.has(a) || ud(a, !1, e), ud(a, !0, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[X0] || (t[X0] = !0, ud("selectionchange", !1, t));
      }
    }
    function id(e, t, a, i) {
      switch (vd(t)) {
        case bl:
          var o = xv;
          break;
        case nn:
          o = pd;
          break;
        default:
          o = di;
      }
      a = o.bind(
        null,
        t,
        a,
        e
      ), o = void 0, !M || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, a, {
        capture: !0,
        passive: o
      }) : e.addEventListener(t, a, !0) : o !== void 0 ? e.addEventListener(t, a, {
        passive: o
      }) : e.addEventListener(
        t,
        a,
        !1
      );
    }
    function _l(e, t, a, i, o) {
      var f = i;
      if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
        e: for (; ; ) {
          if (i === null) return;
          var d = i.tag;
          if (d === 3 || d === 4) {
            var h = i.stateNode.containerInfo;
            if (h === o) break;
            if (d === 4)
              for (d = i.return; d !== null; ) {
                var p = d.tag;
                if ((p === 3 || p === 4) && d.stateNode.containerInfo === o)
                  return;
                d = d.return;
              }
            for (; h !== null; ) {
              if (d = lu(h), d === null) return;
              if (p = d.tag, p === 5 || p === 6 || p === 26 || p === 27) {
                i = f = d;
                continue e;
              }
              h = h.parentNode;
            }
          }
          i = i.return;
        }
      Fs(function() {
        var v = f, H = Yi(a), q = [];
        e: {
          var U = Lg.get(e);
          if (U !== void 0) {
            var Y = re, ne = e;
            switch (e) {
              case "keypress":
                if (Zc(a) === 0) break e;
              case "keydown":
              case "keyup":
                Y = lS;
                break;
              case "focusin":
                ne = "focus", Y = ke;
                break;
              case "focusout":
                ne = "blur", Y = ke;
                break;
              case "beforeblur":
              case "afterblur":
                Y = ke;
                break;
              case "click":
                if (a.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                Y = Ne;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                Y = ye;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                Y = uS;
                break;
              case Gg:
              case Vg:
              case Xg:
                Y = Cv;
                break;
              case Qg:
                Y = cS;
                break;
              case "scroll":
              case "scrollend":
                Y = D;
                break;
              case "wheel":
                Y = fS;
                break;
              case "copy":
              case "cut":
              case "paste":
                Y = $1;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                Y = Hg;
                break;
              case "toggle":
              case "beforetoggle":
                Y = rS;
            }
            var ge = (t & 4) !== 0, gt = !ge && (e === "scroll" || e === "scrollend"), Ze = ge ? U !== null ? U + "Capture" : null : U;
            ge = [];
            for (var S = v, T; S !== null; ) {
              var x = S;
              if (T = x.stateNode, x = x.tag, x !== 5 && x !== 26 && x !== 27 || T === null || Ze === null || (x = uu(S, Ze), x != null && ge.push(
                Bl(
                  S,
                  x,
                  T
                )
              )), gt) break;
              S = S.return;
            }
            0 < ge.length && (U = new Y(
              U,
              ne,
              null,
              a,
              H
            ), q.push({
              event: U,
              listeners: ge
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (U = e === "mouseover" || e === "pointerover", Y = e === "mouseout" || e === "pointerout", U && a !== s && (ne = a.relatedTarget || a.fromElement) && (lu(ne) || ne[bi]))
              break e;
            if ((Y || U) && (U = H.window === H ? H : (U = H.ownerDocument) ? U.defaultView || U.parentWindow : window, Y ? (ne = a.relatedTarget || a.toElement, Y = v, ne = ne ? lu(ne) : null, ne !== null && (gt = Je(ne), ge = ne.tag, ne !== gt || ge !== 5 && ge !== 27 && ge !== 6) && (ne = null)) : (Y = null, ne = v), Y !== ne)) {
              if (ge = Ne, x = "onMouseLeave", Ze = "onMouseEnter", S = "mouse", (e === "pointerout" || e === "pointerover") && (ge = Hg, x = "onPointerLeave", Ze = "onPointerEnter", S = "pointer"), gt = Y == null ? U : _u(Y), T = ne == null ? U : _u(ne), U = new ge(
                x,
                S + "leave",
                Y,
                a,
                H
              ), U.target = gt, U.relatedTarget = T, x = null, lu(H) === v && (ge = new ge(
                Ze,
                S + "enter",
                ne,
                a,
                H
              ), ge.target = T, ge.relatedTarget = gt, x = ge), gt = x, Y && ne)
                t: {
                  for (ge = Y, Ze = ne, S = 0, T = ge; T; T = il(T))
                    S++;
                  for (T = 0, x = Ze; x; x = il(x))
                    T++;
                  for (; 0 < S - T; )
                    ge = il(ge), S--;
                  for (; 0 < T - S; )
                    Ze = il(Ze), T--;
                  for (; S--; ) {
                    if (ge === Ze || Ze !== null && ge === Ze.alternate)
                      break t;
                    ge = il(ge), Ze = il(Ze);
                  }
                  ge = null;
                }
              else ge = null;
              Y !== null && Nm(
                q,
                U,
                Y,
                ge,
                !1
              ), ne !== null && gt !== null && Nm(
                q,
                gt,
                ne,
                ge,
                !0
              );
            }
          }
          e: {
            if (U = v ? _u(v) : window, Y = U.nodeName && U.nodeName.toLowerCase(), Y === "select" || Y === "input" && U.type === "file")
              var w = Eh;
            else if (bp(U))
              if (Yg)
                w = pv;
              else {
                w = xh;
                var W = mv;
              }
            else
              Y = U.nodeName, !Y || Y.toLowerCase() !== "input" || U.type !== "checkbox" && U.type !== "radio" ? v && qi(v.elementType) && (w = Eh) : w = yv;
            if (w && (w = w(e, v))) {
              tr(
                q,
                w,
                a,
                H
              );
              break e;
            }
            W && W(e, U, v), e === "focusout" && v && U.type === "number" && v.memoizedProps.value != null && Zs(U, "number", U.value);
          }
          switch (W = v ? _u(v) : window, e) {
            case "focusin":
              (bp(W) || W.contentEditable === "true") && (Bd = W, Nv = v, Ay = null);
              break;
            case "focusout":
              Ay = Nv = Bd = null;
              break;
            case "mousedown":
              jv = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              jv = !1, Rp(
                q,
                a,
                H
              );
              break;
            case "selectionchange":
              if (yS) break;
            case "keydown":
            case "keyup":
              Rp(
                q,
                a,
                H
              );
          }
          var Re;
          if (Hv)
            e: {
              switch (e) {
                case "compositionstart":
                  var ue = "onCompositionStart";
                  break e;
                case "compositionend":
                  ue = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  ue = "onCompositionUpdate";
                  break e;
              }
              ue = void 0;
            }
          else
            _d ? jl(e, a) && (ue = "onCompositionEnd") : e === "keydown" && a.keyCode === Ng && (ue = "onCompositionStart");
          ue && (jg && a.locale !== "ko" && (_d || ue !== "onCompositionStart" ? ue === "onCompositionEnd" && _d && (Re = iu()) : (X = H, C = "value" in X ? X.value : X.textContent, _d = !0)), W = es(
            v,
            ue
          ), 0 < W.length && (ue = new Cg(
            ue,
            e,
            null,
            a,
            H
          ), q.push({
            event: ue,
            listeners: W
          }), Re ? ue.data = Re : (Re = Xu(a), Re !== null && (ue.data = Re)))), (Re = hS ? er(e, a) : hf(e, a)) && (ue = es(
            v,
            "onBeforeInput"
          ), 0 < ue.length && (W = new F1(
            "onBeforeInput",
            "beforeinput",
            null,
            a,
            H
          ), q.push({
            event: W,
            listeners: ue
          }), W.data = Re)), Et(
            q,
            e,
            v,
            a,
            H
          );
        }
        Nn(q, t);
      });
    }
    function Bl(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function es(e, t) {
      for (var a = t + "Capture", i = []; e !== null; ) {
        var o = e, f = o.stateNode;
        if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || f === null || (o = uu(e, a), o != null && i.unshift(
          Bl(e, o, f)
        ), o = uu(e, t), o != null && i.push(
          Bl(e, o, f)
        )), e.tag === 3) return i;
        e = e.return;
      }
      return [];
    }
    function il(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Nm(e, t, a, i, o) {
      for (var f = t._reactName, d = []; a !== null && a !== i; ) {
        var h = a, p = h.alternate, v = h.stateNode;
        if (h = h.tag, p !== null && p === i) break;
        h !== 5 && h !== 26 && h !== 27 || v === null || (p = v, o ? (v = uu(a, f), v != null && d.unshift(
          Bl(a, v, p)
        )) : o || (v = uu(a, f), v != null && d.push(
          Bl(a, v, p)
        ))), a = a.return;
      }
      d.length !== 0 && e.push({ event: t, listeners: d });
    }
    function jn(e, t) {
      Qc(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Sy || (Sy = !0, e === "select" && t.multiple ? console.error(
        "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
        e
      ) : console.error(
        "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
        e
      ));
      var a = {
        registrationNameDependencies: Ya,
        possibleRegistrationNames: Sc
      };
      qi(e) || typeof t.is == "string" || bh(e, t, a), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error(
        "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
      );
    }
    function xt(e, t, a, i) {
      t !== a && (a = yl(a), yl(t) !== a && (i[e] = t));
    }
    function fi(e, t, a) {
      t.forEach(function(i) {
        a[_m(i)] = i === "style" ? hc(e) : e.getAttribute(i);
      });
    }
    function ja(e, t) {
      t === !1 ? console.error(
        "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",
        e,
        e,
        e
      ) : console.error(
        "Expected `%s` listener to be a function, instead got a value of `%s` type.",
        e,
        typeof t
      );
    }
    function cd(e, t) {
      return e = e.namespaceURI === Es || e.namespaceURI === wo ? e.ownerDocument.createElementNS(
        e.namespaceURI,
        e.tagName
      ) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
    }
    function yl(e) {
      return _(e) && (console.error(
        "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
        fe(e)
      ), le(e)), (typeof e == "string" ? e : "" + e).replace(GS, `
`).replace(VS, "");
    }
    function jm(e, t) {
      return t = yl(t), yl(e) === t;
    }
    function bu() {
    }
    function et(e, t, a, i, o, f) {
      switch (a) {
        case "children":
          typeof i == "string" ? (rf(i, t, !1), t === "body" || t === "textarea" && i === "" || Bi(e, i)) : (typeof i == "number" || typeof i == "bigint") && (rf("" + i, t, !1), t !== "body" && Bi(e, "" + i));
          break;
        case "className":
          af(e, "class", i);
          break;
        case "tabIndex":
          af(e, "tabindex", i);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          af(e, a, i);
          break;
        case "style":
          df(e, i, f);
          break;
        case "data":
          if (t !== "object") {
            af(e, "data", i);
            break;
          }
        case "src":
        case "href":
          if (i === "" && (t !== "a" || a !== "href")) {
            console.error(
              a === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
              a,
              a
            ), e.removeAttribute(a);
            break;
          }
          if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          F(i, a), i = Lc("" + i), e.setAttribute(a, i);
          break;
        case "action":
        case "formAction":
          if (i != null && (t === "form" ? a === "formAction" ? console.error(
            "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
          ) : typeof i == "function" && (o.encType == null && o.method == null || Z0 || (Z0 = !0, console.error(
            "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
          )), o.target == null || L0 || (L0 = !0, console.error(
            "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
          ))) : t === "input" || t === "button" ? a === "action" ? console.error(
            "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
          ) : t !== "input" || o.type === "submit" || o.type === "image" || Q0 ? t !== "button" || o.type == null || o.type === "submit" || Q0 ? typeof i == "function" && (o.name == null || u1 || (u1 = !0, console.error(
            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
          )), o.formEncType == null && o.formMethod == null || Z0 || (Z0 = !0, console.error(
            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
          )), o.formTarget == null || L0 || (L0 = !0, console.error(
            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
          ))) : (Q0 = !0, console.error(
            'A button can only specify a formAction along with type="submit" or no type.'
          )) : (Q0 = !0, console.error(
            'An input can only specify a formAction along with type="submit" or type="image".'
          )) : console.error(
            a === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>."
          )), typeof i == "function") {
            e.setAttribute(
              a,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof f == "function" && (a === "formAction" ? (t !== "input" && et(e, t, "name", o.name, o, null), et(
              e,
              t,
              "formEncType",
              o.formEncType,
              o,
              null
            ), et(
              e,
              t,
              "formMethod",
              o.formMethod,
              o,
              null
            ), et(
              e,
              t,
              "formTarget",
              o.formTarget,
              o,
              null
            )) : (et(
              e,
              t,
              "encType",
              o.encType,
              o,
              null
            ), et(e, t, "method", o.method, o, null), et(
              e,
              t,
              "target",
              o.target,
              o,
              null
            )));
          if (i == null || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          F(i, a), i = Lc("" + i), e.setAttribute(a, i);
          break;
        case "onClick":
          i != null && (typeof i != "function" && ja(a, i), e.onclick = bu);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && ja(a, i), _e("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && ja(a, i), _e("scrollend", e));
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "multiple":
          e.multiple = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "muted":
          e.muted = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
            e.removeAttribute("xlink:href");
            break;
          }
          F(i, a), a = Lc("" + i), e.setAttributeNS(Ys, "xlink:href", a);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          i != null && typeof i != "function" && typeof i != "symbol" ? (F(i, a), e.setAttribute(a, "" + i)) : e.removeAttribute(a);
          break;
        case "inert":
          i !== "" || J0[a] || (J0[a] = !0, console.error(
            "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
            a
          ));
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
          break;
        case "capture":
        case "download":
          i === !0 ? e.setAttribute(a, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? (F(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? (F(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "rowSpan":
        case "start":
          i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(a) : (F(i, a), e.setAttribute(a, i));
          break;
        case "popover":
          _e("beforetoggle", e), _e("toggle", e), lf(e, "popover", i);
          break;
        case "xlinkActuate":
          Qa(
            e,
            Ys,
            "xlink:actuate",
            i
          );
          break;
        case "xlinkArcrole":
          Qa(
            e,
            Ys,
            "xlink:arcrole",
            i
          );
          break;
        case "xlinkRole":
          Qa(
            e,
            Ys,
            "xlink:role",
            i
          );
          break;
        case "xlinkShow":
          Qa(
            e,
            Ys,
            "xlink:show",
            i
          );
          break;
        case "xlinkTitle":
          Qa(
            e,
            Ys,
            "xlink:title",
            i
          );
          break;
        case "xlinkType":
          Qa(
            e,
            Ys,
            "xlink:type",
            i
          );
          break;
        case "xmlBase":
          Qa(
            e,
            Tg,
            "xml:base",
            i
          );
          break;
        case "xmlLang":
          Qa(
            e,
            Tg,
            "xml:lang",
            i
          );
          break;
        case "xmlSpace":
          Qa(
            e,
            Tg,
            "xml:space",
            i
          );
          break;
        case "is":
          f != null && console.error(
            'Cannot update the "is" prop after it has been initialized.'
          ), lf(e, "is", i);
          break;
        case "innerText":
        case "textContent":
          break;
        case "popoverTarget":
          i1 || i == null || typeof i != "object" || (i1 = !0, console.error(
            "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
            i
          ));
        default:
          !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N" ? (a = Ws(a), lf(e, a, i)) : Ya.hasOwnProperty(a) && i != null && typeof i != "function" && ja(a, i);
      }
    }
    function dc(e, t, a, i, o, f) {
      switch (a) {
        case "style":
          df(e, i, f);
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "children":
          typeof i == "string" ? Bi(e, i) : (typeof i == "number" || typeof i == "bigint") && Bi(e, "" + i);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && ja(a, i), _e("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && ja(a, i), _e("scrollend", e));
          break;
        case "onClick":
          i != null && (typeof i != "function" && ja(a, i), e.onclick = bu);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (Ya.hasOwnProperty(a))
            i != null && typeof i != "function" && ja(a, i);
          else
            e: {
              if (a[0] === "o" && a[1] === "n" && (o = a.endsWith("Capture"), t = a.slice(2, o ? a.length - 7 : void 0), f = e[la] || null, f = f != null ? f[a] : null, typeof f == "function" && e.removeEventListener(t, f, o), typeof i == "function")) {
                typeof f != "function" && f !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, i, o);
                break e;
              }
              a in e ? e[a] = i : i === !0 ? e.setAttribute(a, "") : lf(e, a, i);
            }
      }
    }
    function jt(e, t, a) {
      switch (jn(t, a), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          _e("error", e), _e("load", e);
          var i = !1, o = !1, f;
          for (f in a)
            if (a.hasOwnProperty(f)) {
              var d = a[f];
              if (d != null)
                switch (f) {
                  case "src":
                    i = !0;
                    break;
                  case "srcSet":
                    o = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    et(e, t, f, d, a, null);
                }
            }
          o && et(e, t, "srcSet", a.srcSet, a, null), i && et(e, t, "src", a.src, a, null);
          return;
        case "input":
          qu("input", a), _e("invalid", e);
          var h = f = d = o = null, p = null, v = null;
          for (i in a)
            if (a.hasOwnProperty(i)) {
              var H = a[i];
              if (H != null)
                switch (i) {
                  case "name":
                    o = H;
                    break;
                  case "type":
                    d = H;
                    break;
                  case "checked":
                    p = H;
                    break;
                  case "defaultChecked":
                    v = H;
                    break;
                  case "value":
                    f = H;
                    break;
                  case "defaultValue":
                    h = H;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (H != null)
                      throw Error(
                        t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    et(e, t, i, H, a, null);
                }
            }
          Yu(e, a), mp(
            e,
            f,
            h,
            p,
            v,
            d,
            o,
            !1
          ), au(e);
          return;
        case "select":
          qu("select", a), _e("invalid", e), i = d = f = null;
          for (o in a)
            if (a.hasOwnProperty(o) && (h = a[o], h != null))
              switch (o) {
                case "value":
                  f = h;
                  break;
                case "defaultValue":
                  d = h;
                  break;
                case "multiple":
                  i = h;
                default:
                  et(
                    e,
                    t,
                    o,
                    h,
                    a,
                    null
                  );
              }
          of(e, a), t = f, a = d, e.multiple = !!i, t != null ? nu(e, !!i, t, !1) : a != null && nu(e, !!i, a, !0);
          return;
        case "textarea":
          qu("textarea", a), _e("invalid", e), f = o = i = null;
          for (d in a)
            if (a.hasOwnProperty(d) && (h = a[d], h != null))
              switch (d) {
                case "value":
                  i = h;
                  break;
                case "defaultValue":
                  o = h;
                  break;
                case "children":
                  f = h;
                  break;
                case "dangerouslySetInnerHTML":
                  if (h != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  et(
                    e,
                    t,
                    d,
                    h,
                    a,
                    null
                  );
              }
          rn(e, a), mh(e, i, o, f), au(e);
          return;
        case "option":
          hh(e, a);
          for (p in a)
            if (a.hasOwnProperty(p) && (i = a[p], i != null))
              switch (p) {
                case "selected":
                  e.selected = i && typeof i != "function" && typeof i != "symbol";
                  break;
                default:
                  et(e, t, p, i, a, null);
              }
          return;
        case "dialog":
          _e("beforetoggle", e), _e("toggle", e), _e("cancel", e), _e("close", e);
          break;
        case "iframe":
        case "object":
          _e("load", e);
          break;
        case "video":
        case "audio":
          for (i = 0; i < ky.length; i++)
            _e(ky[i], e);
          break;
        case "image":
          _e("error", e), _e("load", e);
          break;
        case "details":
          _e("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          _e("error", e), _e("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (v in a)
            if (a.hasOwnProperty(v) && (i = a[v], i != null))
              switch (v) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  et(e, t, v, i, a, null);
              }
          return;
        default:
          if (qi(t)) {
            for (H in a)
              a.hasOwnProperty(H) && (i = a[H], i !== void 0 && dc(
                e,
                t,
                H,
                i,
                a,
                void 0
              ));
            return;
          }
      }
      for (h in a)
        a.hasOwnProperty(h) && (i = a[h], i != null && et(e, t, h, i, a, null));
    }
    function Wp(e, t, a, i) {
      switch (jn(t, i), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var o = null, f = null, d = null, h = null, p = null, v = null, H = null;
          for (Y in a) {
            var q = a[Y];
            if (a.hasOwnProperty(Y) && q != null)
              switch (Y) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  p = q;
                default:
                  i.hasOwnProperty(Y) || et(
                    e,
                    t,
                    Y,
                    null,
                    i,
                    q
                  );
              }
          }
          for (var U in i) {
            var Y = i[U];
            if (q = a[U], i.hasOwnProperty(U) && (Y != null || q != null))
              switch (U) {
                case "type":
                  f = Y;
                  break;
                case "name":
                  o = Y;
                  break;
                case "checked":
                  v = Y;
                  break;
                case "defaultChecked":
                  H = Y;
                  break;
                case "value":
                  d = Y;
                  break;
                case "defaultValue":
                  h = Y;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Y != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  Y !== q && et(
                    e,
                    t,
                    U,
                    Y,
                    i,
                    q
                  );
              }
          }
          t = a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null, i = i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null, t || !i || n1 || (console.error(
            "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), n1 = !0), !t || i || a1 || (console.error(
            "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), a1 = !0), wu(
            e,
            d,
            h,
            p,
            v,
            H,
            f,
            o
          );
          return;
        case "select":
          Y = d = h = U = null;
          for (f in a)
            if (p = a[f], a.hasOwnProperty(f) && p != null)
              switch (f) {
                case "value":
                  break;
                case "multiple":
                  Y = p;
                default:
                  i.hasOwnProperty(f) || et(
                    e,
                    t,
                    f,
                    null,
                    i,
                    p
                  );
              }
          for (o in i)
            if (f = i[o], p = a[o], i.hasOwnProperty(o) && (f != null || p != null))
              switch (o) {
                case "value":
                  U = f;
                  break;
                case "defaultValue":
                  h = f;
                  break;
                case "multiple":
                  d = f;
                default:
                  f !== p && et(
                    e,
                    t,
                    o,
                    f,
                    i,
                    p
                  );
              }
          i = h, t = d, a = Y, U != null ? nu(e, !!t, U, !1) : !!a != !!t && (i != null ? nu(e, !!t, i, !0) : nu(e, !!t, t ? [] : "", !1));
          return;
        case "textarea":
          Y = U = null;
          for (h in a)
            if (o = a[h], a.hasOwnProperty(h) && o != null && !i.hasOwnProperty(h))
              switch (h) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  et(e, t, h, null, i, o);
              }
          for (d in i)
            if (o = i[d], f = a[d], i.hasOwnProperty(d) && (o != null || f != null))
              switch (d) {
                case "value":
                  U = o;
                  break;
                case "defaultValue":
                  Y = o;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (o != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  o !== f && et(e, t, d, o, i, f);
              }
          Js(e, U, Y);
          return;
        case "option":
          for (var ne in a)
            if (U = a[ne], a.hasOwnProperty(ne) && U != null && !i.hasOwnProperty(ne))
              switch (ne) {
                case "selected":
                  e.selected = !1;
                  break;
                default:
                  et(
                    e,
                    t,
                    ne,
                    null,
                    i,
                    U
                  );
              }
          for (p in i)
            if (U = i[p], Y = a[p], i.hasOwnProperty(p) && U !== Y && (U != null || Y != null))
              switch (p) {
                case "selected":
                  e.selected = U && typeof U != "function" && typeof U != "symbol";
                  break;
                default:
                  et(
                    e,
                    t,
                    p,
                    U,
                    i,
                    Y
                  );
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var ge in a)
            U = a[ge], a.hasOwnProperty(ge) && U != null && !i.hasOwnProperty(ge) && et(
              e,
              t,
              ge,
              null,
              i,
              U
            );
          for (v in i)
            if (U = i[v], Y = a[v], i.hasOwnProperty(v) && U !== Y && (U != null || Y != null))
              switch (v) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (U != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  et(
                    e,
                    t,
                    v,
                    U,
                    i,
                    Y
                  );
              }
          return;
        default:
          if (qi(t)) {
            for (var gt in a)
              U = a[gt], a.hasOwnProperty(gt) && U !== void 0 && !i.hasOwnProperty(gt) && dc(
                e,
                t,
                gt,
                void 0,
                i,
                U
              );
            for (H in i)
              U = i[H], Y = a[H], !i.hasOwnProperty(H) || U === Y || U === void 0 && Y === void 0 || dc(
                e,
                t,
                H,
                U,
                i,
                Y
              );
            return;
          }
      }
      for (var Ze in a)
        U = a[Ze], a.hasOwnProperty(Ze) && U != null && !i.hasOwnProperty(Ze) && et(e, t, Ze, null, i, U);
      for (q in i)
        U = i[q], Y = a[q], !i.hasOwnProperty(q) || U === Y || U == null && Y == null || et(e, t, q, U, i, Y);
    }
    function _m(e) {
      switch (e) {
        case "class":
          return "className";
        case "for":
          return "htmlFor";
        default:
          return e;
      }
    }
    function hc(e) {
      var t = {};
      e = e.style;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        t[i] = e.getPropertyValue(i);
      }
      return t;
    }
    function Bm(e, t, a) {
      if (t != null && typeof t != "object")
        console.error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      else {
        var i, o = i = "", f;
        for (f in t)
          if (t.hasOwnProperty(f)) {
            var d = t[f];
            d != null && typeof d != "boolean" && d !== "" && (f.indexOf("--") === 0 ? (he(d, f), i += o + f + ":" + ("" + d).trim()) : typeof d != "number" || d === 0 || Ts.has(f) ? (he(d, f), i += o + f.replace(Ou, "-$1").toLowerCase().replace(Mu, "-ms-") + ":" + ("" + d).trim()) : i += o + f.replace(Ou, "-$1").toLowerCase().replace(Mu, "-ms-") + ":" + d + "px", o = ";");
          }
        i = i || null, t = e.getAttribute("style"), t !== i && (i = yl(i), yl(t) !== i && (a.style = hc(e)));
      }
    }
    function ql(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (F(i, t), e === "" + i)
              return;
        }
      xt(t, e, i, f);
    }
    function qm(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null) {
        switch (typeof i) {
          case "function":
          case "symbol":
            return;
        }
        if (!i) return;
      } else
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (i) return;
        }
      xt(t, e, i, f);
    }
    function Ym(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (F(i, a), e === "" + i)
              return;
        }
      xt(t, e, i, f);
    }
    function Fp(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
          default:
            if (isNaN(i)) return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (!isNaN(i) && (F(i, t), e === "" + i))
              return;
        }
      xt(t, e, i, f);
    }
    function nt(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (F(i, t), a = Lc("" + i), e === a)
              return;
        }
      xt(t, e, i, f);
    }
    function ht(e, t, a, i) {
      for (var o = {}, f = /* @__PURE__ */ new Set(), d = e.attributes, h = 0; h < d.length; h++)
        switch (d[h].name.toLowerCase()) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            f.add(d[h].name);
        }
      if (qi(t)) {
        for (var p in a)
          if (a.hasOwnProperty(p)) {
            var v = a[p];
            if (v != null) {
              if (Ya.hasOwnProperty(p))
                typeof v != "function" && ja(p, v);
              else if (a.suppressHydrationWarning !== !0)
                switch (p) {
                  case "children":
                    typeof v != "string" && typeof v != "number" || xt(
                      "children",
                      e.textContent,
                      v,
                      o
                    );
                    continue;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "defaultValue":
                  case "defaultChecked":
                  case "innerHTML":
                  case "ref":
                    continue;
                  case "dangerouslySetInnerHTML":
                    d = e.innerHTML, v = v ? v.__html : void 0, v != null && (v = cd(e, v), xt(
                      p,
                      d,
                      v,
                      o
                    ));
                    continue;
                  case "style":
                    f.delete(p), Bm(e, v, o);
                    continue;
                  case "offsetParent":
                  case "offsetTop":
                  case "offsetLeft":
                  case "offsetWidth":
                  case "offsetHeight":
                  case "isContentEditable":
                  case "outerText":
                  case "outerHTML":
                    f.delete(p.toLowerCase()), console.error(
                      "Assignment to read-only property will result in a no-op: `%s`",
                      p
                    );
                    continue;
                  case "className":
                    f.delete("class"), d = sp(
                      e,
                      "class",
                      v
                    ), xt(
                      "className",
                      d,
                      v,
                      o
                    );
                    continue;
                  default:
                    i.context === Nc && t !== "svg" && t !== "math" ? f.delete(p.toLowerCase()) : f.delete(p), d = sp(
                      e,
                      p,
                      v
                    ), xt(
                      p,
                      d,
                      v,
                      o
                    );
                }
            }
          }
      } else
        for (v in a)
          if (a.hasOwnProperty(v) && (p = a[v], p != null)) {
            if (Ya.hasOwnProperty(v))
              typeof p != "function" && ja(v, p);
            else if (a.suppressHydrationWarning !== !0)
              switch (v) {
                case "children":
                  typeof p != "string" && typeof p != "number" || xt(
                    "children",
                    e.textContent,
                    p,
                    o
                  );
                  continue;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "value":
                case "checked":
                case "selected":
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "ref":
                  continue;
                case "dangerouslySetInnerHTML":
                  d = e.innerHTML, p = p ? p.__html : void 0, p != null && (p = cd(e, p), d !== p && (o[v] = { __html: d }));
                  continue;
                case "className":
                  ql(
                    e,
                    v,
                    "class",
                    p,
                    f,
                    o
                  );
                  continue;
                case "tabIndex":
                  ql(
                    e,
                    v,
                    "tabindex",
                    p,
                    f,
                    o
                  );
                  continue;
                case "style":
                  f.delete(v), Bm(e, p, o);
                  continue;
                case "multiple":
                  f.delete(v), xt(
                    v,
                    e.multiple,
                    p,
                    o
                  );
                  continue;
                case "muted":
                  f.delete(v), xt(
                    v,
                    e.muted,
                    p,
                    o
                  );
                  continue;
                case "autoFocus":
                  f.delete("autofocus"), xt(
                    v,
                    e.autofocus,
                    p,
                    o
                  );
                  continue;
                case "data":
                  if (t !== "object") {
                    f.delete(v), d = e.getAttribute("data"), xt(
                      v,
                      d,
                      p,
                      o
                    );
                    continue;
                  }
                case "src":
                case "href":
                  if (!(p !== "" || t === "a" && v === "href" || t === "object" && v === "data")) {
                    console.error(
                      v === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                      v,
                      v
                    );
                    continue;
                  }
                  nt(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                case "action":
                case "formAction":
                  if (d = e.getAttribute(v), typeof p == "function") {
                    f.delete(v.toLowerCase()), v === "formAction" ? (f.delete("name"), f.delete("formenctype"), f.delete("formmethod"), f.delete("formtarget")) : (f.delete("enctype"), f.delete("method"), f.delete("target"));
                    continue;
                  } else if (d === XS) {
                    f.delete(v.toLowerCase()), xt(
                      v,
                      "function",
                      p,
                      o
                    );
                    continue;
                  }
                  nt(
                    e,
                    v,
                    v.toLowerCase(),
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkHref":
                  nt(
                    e,
                    v,
                    "xlink:href",
                    p,
                    f,
                    o
                  );
                  continue;
                case "contentEditable":
                  Ym(
                    e,
                    v,
                    "contenteditable",
                    p,
                    f,
                    o
                  );
                  continue;
                case "spellCheck":
                  Ym(
                    e,
                    v,
                    "spellcheck",
                    p,
                    f,
                    o
                  );
                  continue;
                case "draggable":
                case "autoReverse":
                case "externalResourcesRequired":
                case "focusable":
                case "preserveAlpha":
                  Ym(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                case "allowFullScreen":
                case "async":
                case "autoPlay":
                case "controls":
                case "default":
                case "defer":
                case "disabled":
                case "disablePictureInPicture":
                case "disableRemotePlayback":
                case "formNoValidate":
                case "hidden":
                case "loop":
                case "noModule":
                case "noValidate":
                case "open":
                case "playsInline":
                case "readOnly":
                case "required":
                case "reversed":
                case "scoped":
                case "seamless":
                case "itemScope":
                  qm(
                    e,
                    v,
                    v.toLowerCase(),
                    p,
                    f,
                    o
                  );
                  continue;
                case "capture":
                case "download":
                  e: {
                    h = e;
                    var H = d = v, q = o;
                    if (f.delete(H), h = h.getAttribute(H), h === null)
                      switch (typeof p) {
                        case "undefined":
                        case "function":
                        case "symbol":
                          break e;
                        default:
                          if (p === !1) break e;
                      }
                    else if (p != null)
                      switch (typeof p) {
                        case "function":
                        case "symbol":
                          break;
                        case "boolean":
                          if (p === !0 && h === "") break e;
                          break;
                        default:
                          if (F(p, d), h === "" + p)
                            break e;
                      }
                    xt(
                      d,
                      h,
                      p,
                      q
                    );
                  }
                  continue;
                case "cols":
                case "rows":
                case "size":
                case "span":
                  e: {
                    if (h = e, H = d = v, q = o, f.delete(H), h = h.getAttribute(H), h === null)
                      switch (typeof p) {
                        case "undefined":
                        case "function":
                        case "symbol":
                        case "boolean":
                          break e;
                        default:
                          if (isNaN(p) || 1 > p) break e;
                      }
                    else if (p != null)
                      switch (typeof p) {
                        case "function":
                        case "symbol":
                        case "boolean":
                          break;
                        default:
                          if (!(isNaN(p) || 1 > p) && (F(p, d), h === "" + p))
                            break e;
                      }
                    xt(
                      d,
                      h,
                      p,
                      q
                    );
                  }
                  continue;
                case "rowSpan":
                  Fp(
                    e,
                    v,
                    "rowspan",
                    p,
                    f,
                    o
                  );
                  continue;
                case "start":
                  Fp(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                case "xHeight":
                  ql(
                    e,
                    v,
                    "x-height",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkActuate":
                  ql(
                    e,
                    v,
                    "xlink:actuate",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkArcrole":
                  ql(
                    e,
                    v,
                    "xlink:arcrole",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkRole":
                  ql(
                    e,
                    v,
                    "xlink:role",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkShow":
                  ql(
                    e,
                    v,
                    "xlink:show",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkTitle":
                  ql(
                    e,
                    v,
                    "xlink:title",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xlinkType":
                  ql(
                    e,
                    v,
                    "xlink:type",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xmlBase":
                  ql(
                    e,
                    v,
                    "xml:base",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xmlLang":
                  ql(
                    e,
                    v,
                    "xml:lang",
                    p,
                    f,
                    o
                  );
                  continue;
                case "xmlSpace":
                  ql(
                    e,
                    v,
                    "xml:space",
                    p,
                    f,
                    o
                  );
                  continue;
                case "inert":
                  p !== "" || J0[v] || (J0[v] = !0, console.error(
                    "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                    v
                  )), qm(
                    e,
                    v,
                    v,
                    p,
                    f,
                    o
                  );
                  continue;
                default:
                  if (!(2 < v.length) || v[0] !== "o" && v[0] !== "O" || v[1] !== "n" && v[1] !== "N") {
                    h = Ws(v), d = !1, i.context === Nc && t !== "svg" && t !== "math" ? f.delete(h.toLowerCase()) : (H = v.toLowerCase(), H = xc.hasOwnProperty(
                      H
                    ) && xc[H] || null, H !== null && H !== v && (d = !0, f.delete(H)), f.delete(h));
                    e: if (H = e, q = h, h = p, Ui(q))
                      if (H.hasAttribute(q))
                        H = H.getAttribute(
                          q
                        ), F(
                          h,
                          q
                        ), h = H === "" + h ? h : H;
                      else {
                        switch (typeof h) {
                          case "function":
                          case "symbol":
                            break e;
                          case "boolean":
                            if (H = q.toLowerCase().slice(0, 5), H !== "data-" && H !== "aria-")
                              break e;
                        }
                        h = h === void 0 ? void 0 : null;
                      }
                    else h = void 0;
                    d || xt(
                      v,
                      h,
                      p,
                      o
                    );
                  }
              }
          }
      return 0 < f.size && a.suppressHydrationWarning !== !0 && fi(e, f, o), Object.keys(o).length === 0 ? null : o;
    }
    function Ye(e, t) {
      switch (e.length) {
        case 0:
          return "";
        case 1:
          return e[0];
        case 2:
          return e[0] + " " + t + " " + e[1];
        default:
          return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
      }
    }
    function we(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function ut(e) {
      switch (e) {
        case wo:
          return oh;
        case Es:
          return $0;
        default:
          return Nc;
      }
    }
    function Il(e, t) {
      if (e === Nc)
        switch (t) {
          case "svg":
            return oh;
          case "math":
            return $0;
          default:
            return Nc;
        }
      return e === oh && t === "foreignObject" ? Nc : e;
    }
    function _n(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function go() {
      var e = window.event;
      return e && e.type === "popstate" ? e === Rg ? !1 : (Rg = e, !0) : (Rg = null, !1);
    }
    function wm(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Su(e, t, a) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    }
    function _t(e, t, a, i) {
      Wp(e, t, a, i), e[la] = i;
    }
    function Tu(e) {
      Bi(e, "");
    }
    function mc(e, t, a) {
      e.nodeValue = a;
    }
    function Bn(e) {
      return e === "head";
    }
    function _a(e, t) {
      e.removeChild(t);
    }
    function bo(e, t) {
      (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
    }
    function So(e, t) {
      var a = t, i = 0, o = 0;
      do {
        var f = a.nextSibling;
        if (e.removeChild(a), f && f.nodeType === 8)
          if (a = f.data, a === k0) {
            if (0 < i && 8 > i) {
              a = i;
              var d = e.ownerDocument;
              if (a & LS && Ao(d.documentElement), a & ZS && Ao(d.body), a & JS)
                for (a = d.head, Ao(a), d = a.firstChild; d; ) {
                  var h = d.nextSibling, p = d.nodeName;
                  d[_o] || p === "SCRIPT" || p === "STYLE" || p === "LINK" && d.rel.toLowerCase() === "stylesheet" || a.removeChild(d), d = h;
                }
            }
            if (o === 0) {
              e.removeChild(f), gc(t);
              return;
            }
            o--;
          } else
            a === K0 || a === Hc || a === $y ? o++ : i = a.charCodeAt(0) - 48;
        else i = 0;
        a = f;
      } while (a);
      gc(t);
    }
    function Pl(e) {
      e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
    }
    function Gm(e) {
      e.nodeValue = "";
    }
    function Vm(e, t) {
      t = t[KS], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
    }
    function od(e, t) {
      e.nodeValue = t;
    }
    function To(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            To(a), Yc(a);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (a.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(a);
      }
    }
    function si(e, t, a, i) {
      for (; e.nodeType === 1; ) {
        var o = a;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
            break;
        } else if (i) {
          if (!e[_o])
            switch (t) {
              case "meta":
                if (!e.hasAttribute("itemprop")) break;
                return e;
              case "link":
                if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                  break;
                if (f !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title))
                  break;
                return e;
              case "style":
                if (e.hasAttribute("data-precedence")) break;
                return e;
              case "script":
                if (f = e.getAttribute("src"), (f !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                  break;
                return e;
              default:
                return e;
            }
        } else if (t === "input" && e.type === "hidden") {
          F(o.name, "name");
          var f = o.name == null ? null : "" + o.name;
          if (o.type === "hidden" && e.getAttribute("name") === f)
            return e;
        } else return e;
        if (e = vl(e.nextSibling), e === null) break;
      }
      return null;
    }
    function pl(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; )
        if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = vl(e.nextSibling), e === null)) return null;
      return e;
    }
    function qn(e) {
      return e.data === $y || e.data === Hc && e.ownerDocument.readyState === o1;
    }
    function Eo(e, t) {
      var a = e.ownerDocument;
      if (e.data !== Hc || a.readyState === o1)
        t();
      else {
        var i = function() {
          t(), a.removeEventListener("DOMContentLoaded", i);
        };
        a.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
      }
    }
    function vl(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === K0 || t === $y || t === Hc || t === Eg || t === c1)
            break;
          if (t === k0) return null;
        }
      }
      return e;
    }
    function fd(e) {
      if (e.nodeType === 1) {
        for (var t = e.nodeName.toLowerCase(), a = {}, i = e.attributes, o = 0; o < i.length; o++) {
          var f = i[o];
          a[_m(f.name)] = f.name.toLowerCase() === "style" ? hc(e) : f.value;
        }
        return { type: t, props: a };
      }
      return e.nodeType === 8 ? { type: "Suspense", props: {} } : e.nodeValue;
    }
    function sd(e, t, a) {
      return a === null || a[QS] !== !0 ? (e.nodeValue === t ? e = null : (t = yl(t), e = yl(e.nodeValue) === t ? null : e.nodeValue), e) : null;
    }
    function Xm(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === k0) {
            if (t === 0)
              return vl(e.nextSibling);
            t--;
          } else
            a !== K0 && a !== $y && a !== Hc || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function xo(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === K0 || a === $y || a === Hc) {
            if (t === 0) return e;
            t--;
          } else a === k0 && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function Qm(e) {
      gc(e);
    }
    function ha(e) {
      gc(e);
    }
    function Lm(e, t, a, i, o) {
      switch (o && $s(e, i.ancestorInfo), t = we(a), e) {
        case "html":
          if (e = t.documentElement, !e)
            throw Error(
              "React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "head":
          if (e = t.head, !e)
            throw Error(
              "React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "body":
          if (e = t.body, !e)
            throw Error(
              "React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        default:
          throw Error(
            "resolveSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
    }
    function ma(e, t, a, i) {
      if (!a[bi] && ia(a)) {
        var o = a.tagName.toLowerCase();
        console.error(
          "You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",
          o,
          o,
          o
        );
      }
      switch (e) {
        case "html":
        case "head":
        case "body":
          break;
        default:
          console.error(
            "acquireSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
      for (o = a.attributes; o.length; )
        a.removeAttributeNode(o[0]);
      jt(a, e, t), a[Ol] = i, a[la] = t;
    }
    function Ao(e) {
      for (var t = e.attributes; t.length; )
        e.removeAttributeNode(t[0]);
      Yc(e);
    }
    function ts(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    function Ip(e, t, a) {
      var i = fh;
      if (i && typeof t == "string" && t) {
        var o = ca(t);
        o = 'link[rel="' + e + '"][href="' + o + '"]', typeof a == "string" && (o += '[crossorigin="' + a + '"]'), m1.has(o) || (m1.add(o), e = { rel: e, crossOrigin: a, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), jt(t, "link", e), tl(t), i.head.appendChild(t)));
      }
    }
    function Eu(e, t, a, i) {
      var o = (o = wn.current) ? ts(o) : null;
      if (!o)
        throw Error(
          '"resourceRoot" was expected to exist. This is a bug in React.'
        );
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (a = ri(a.href), t = sn(o).hoistableStyles, i = t.get(a), i || (i = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
            e = ri(a.href);
            var f = sn(o).hoistableStyles, d = f.get(e);
            if (!d && (o = o.ownerDocument || o, d = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: Gs, preload: null }
            }, f.set(e, d), (f = o.querySelector(
              Yn(e)
            )) && !f._p && (d.instance = f, d.state.loading = Wy | In), !Pn.has(e))) {
              var h = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy
              };
              Pn.set(e, h), f || Pp(
                o,
                e,
                h,
                d.state
              );
            }
            if (t && i === null)
              throw a = `

  - ` + yc(t) + `
  + ` + yc(a), Error(
                "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
              );
            return d;
          }
          if (t && i !== null)
            throw a = `

  - ` + yc(t) + `
  + ` + yc(a), Error(
              "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
            );
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = pc(a), t = sn(o).hoistableScripts, i = t.get(a), i || (i = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(
            'getResource encountered a type it did not expect: "' + e + '". this is a bug in React.'
          );
      }
    }
    function yc(e) {
      var t = 0, a = "<link";
      return typeof e.rel == "string" ? (t++, a += ' rel="' + e.rel + '"') : Ru.call(e, "rel") && (t++, a += ' rel="' + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + '"'), typeof e.href == "string" ? (t++, a += ' href="' + e.href + '"') : Ru.call(e, "href") && (t++, a += ' href="' + (e.href === null ? "null" : "invalid type " + typeof e.href) + '"'), typeof e.precedence == "string" ? (t++, a += ' precedence="' + e.precedence + '"') : Ru.call(e, "precedence") && (t++, a += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (a += " ..."), a + " />";
    }
    function ri(e) {
      return 'href="' + ca(e) + '"';
    }
    function Yn(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function Zm(e) {
      return Ce({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function Pp(e, t, a, i) {
      e.querySelector(
        'link[rel="preload"][as="style"][' + t + "]"
      ) ? i.loading = Wy : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
        return i.loading |= Wy;
      }), t.addEventListener("error", function() {
        return i.loading |= d1;
      }), jt(t, "link", a), tl(t), e.head.appendChild(t));
    }
    function pc(e) {
      return '[src="' + ca(e) + '"]';
    }
    function vc(e) {
      return "script[async]" + e;
    }
    function rd(e, t, a) {
      if (t.count++, t.instance === null)
        switch (t.type) {
          case "style":
            var i = e.querySelector(
              'style[data-href~="' + ca(a.href) + '"]'
            );
            if (i)
              return t.instance = i, tl(i), i;
            var o = Ce({}, a, {
              "data-href": a.href,
              "data-precedence": a.precedence,
              href: null,
              precedence: null
            });
            return i = (e.ownerDocument || e).createElement("style"), tl(i), jt(i, "style", o), dd(i, a.precedence, e), t.instance = i;
          case "stylesheet":
            o = ri(a.href);
            var f = e.querySelector(
              Yn(o)
            );
            if (f)
              return t.state.loading |= In, t.instance = f, tl(f), f;
            i = Zm(a), (o = Pn.get(o)) && Jm(i, o), f = (e.ownerDocument || e).createElement("link"), tl(f);
            var d = f;
            return d._p = new Promise(function(h, p) {
              d.onload = h, d.onerror = p;
            }), jt(f, "link", i), t.state.loading |= In, dd(f, a.precedence, e), t.instance = f;
          case "script":
            return f = pc(a.src), (o = e.querySelector(
              vc(f)
            )) ? (t.instance = o, tl(o), o) : (i = a, (o = Pn.get(f)) && (i = Ce({}, a), Km(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), tl(o), jt(o, "link", i), e.head.appendChild(o), t.instance = o);
          case "void":
            return null;
          default:
            throw Error(
              'acquireResource encountered a resource type it did not expect: "' + t.type + '". this is a bug in React.'
            );
        }
      else
        t.type === "stylesheet" && (t.state.loading & In) === Gs && (i = t.instance, t.state.loading |= In, dd(i, a.precedence, e));
      return t.instance;
    }
    function dd(e, t, a) {
      for (var i = a.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), o = i.length ? i[i.length - 1] : null, f = o, d = 0; d < i.length; d++) {
        var h = i[d];
        if (h.dataset.precedence === t) f = h;
        else if (f !== o) break;
      }
      f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function Jm(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function Km(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    function km(e, t, a) {
      if (W0 === null) {
        var i = /* @__PURE__ */ new Map(), o = W0 = /* @__PURE__ */ new Map();
        o.set(a, i);
      } else
        o = W0, i = o.get(a), i || (i = /* @__PURE__ */ new Map(), o.set(a, i));
      if (i.has(e)) return i;
      for (i.set(e, null), a = a.getElementsByTagName(e), o = 0; o < a.length; o++) {
        var f = a[o];
        if (!(f[_o] || f[Ol] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== wo) {
          var d = f.getAttribute(t) || "";
          d = e + d;
          var h = i.get(d);
          h ? h.push(f) : i.set(d, [f]);
        }
      }
      return i;
    }
    function $m(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
    }
    function Ro(e, t, a) {
      var i = !a.ancestorInfo.containerTagInScope;
      if (a.context === oh || t.itemProp != null)
        return !i || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error(
          "Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",
          e,
          e
        ), !1;
      switch (e) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
            i && console.error(
              'Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.'
            );
            break;
          }
          return !0;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
            if (t.rel === "stylesheet" && typeof t.precedence == "string") {
              e = t.href;
              var o = t.onError, f = t.disabled;
              a = [], t.onLoad && a.push("`onLoad`"), o && a.push("`onError`"), f != null && a.push("`disabled`"), o = Ye(a, "and"), o += a.length === 1 ? " prop" : " props", f = a.length === 1 ? "an " + o : "the " + o, a.length && console.error(
                'React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                e,
                f,
                o
              );
            }
            i && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error(
              "Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"
            ) : (t.onError || t.onLoad) && console.error(
              "Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ));
            break;
          }
          switch (t.rel) {
            case "stylesheet":
              return e = t.precedence, t = t.disabled, typeof e != "string" && i && console.error(
                'Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'
              ), typeof e == "string" && t == null;
            default:
              return !0;
          }
        case "script":
          if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
            i && (e ? t.onLoad || t.onError ? console.error(
              "Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              "Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              'Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'
            ));
            break;
          }
          return !0;
        case "noscript":
        case "template":
          i && console.error(
            "Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",
            e
          );
      }
      return !1;
    }
    function ls(e) {
      return !(e.type === "stylesheet" && (e.state.loading & h1) === Gs);
    }
    function e0() {
    }
    function t0(e, t, a) {
      if (Fy === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var i = Fy;
      if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (t.state.loading & In) === Gs) {
        if (t.instance === null) {
          var o = ri(a.href), f = e.querySelector(
            Yn(o)
          );
          if (f) {
            e = f._p, e !== null && typeof e == "object" && typeof e.then == "function" && (i.count++, i = as.bind(i), e.then(i, i)), t.state.loading |= In, t.instance = f, tl(f);
            return;
          }
          f = e.ownerDocument || e, a = Zm(a), (o = Pn.get(o)) && Jm(a, o), f = f.createElement("link"), tl(f);
          var d = f;
          d._p = new Promise(function(h, p) {
            d.onload = h, d.onerror = p;
          }), jt(f, "link", a), t.instance = f;
        }
        i.stylesheets === null && (i.stylesheets = /* @__PURE__ */ new Map()), i.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & h1) === Gs && (i.count++, t = as.bind(i), e.addEventListener("load", t), e.addEventListener("error", t));
      }
    }
    function l0() {
      if (Fy === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var e = Fy;
      return e.stylesheets && e.count === 0 && hd(e, e.stylesheets), 0 < e.count ? function(t) {
        var a = setTimeout(function() {
          if (e.stylesheets && hd(e, e.stylesheets), e.unsuspend) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, 6e4);
        return e.unsuspend = t, function() {
          e.unsuspend = null, clearTimeout(a);
        };
      } : null;
    }
    function as() {
      if (this.count--, this.count === 0) {
        if (this.stylesheets)
          hd(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    function hd(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, F0 = /* @__PURE__ */ new Map(), t.forEach(a0, e), F0 = null, as.call(e));
    }
    function a0(e, t) {
      if (!(t.state.loading & In)) {
        var a = F0.get(e);
        if (a) var i = a.get(Dg);
        else {
          a = /* @__PURE__ */ new Map(), F0.set(e, a);
          for (var o = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), f = 0; f < o.length; f++) {
            var d = o[f];
            (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (a.set(d.dataset.precedence, d), i = d);
          }
          i && a.set(Dg, i);
        }
        o = t.instance, d = o.getAttribute("data-precedence"), f = a.get(d) || i, f === i && a.set(Dg, o), a.set(d, o), this.count++, i = as.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), f ? f.parentNode.insertBefore(o, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= In;
      }
    }
    function md(e, t, a, i, o, f, d, h) {
      for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = ws, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = rh(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = rh(0), this.hiddenUpdates = rh(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = f, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
      this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
    }
    function Wm(e, t, a, i, o, f, d, h, p, v, H, q) {
      return e = new md(
        e,
        t,
        a,
        d,
        h,
        p,
        v,
        q
      ), t = bS, f === !0 && (t |= na | Uu), qt && (t |= wl), f = ee(3, null, null, t), e.current = f, f.stateNode = e, t = Tf(), Ji(t), e.pooledCache = t, Ji(t), f.memoizedState = {
        element: i,
        isDehydrated: a,
        cache: t
      }, Zl(f), e;
    }
    function Fm(e) {
      return e ? (e = Go, e) : Go;
    }
    function ct(e, t, a, i, o, f) {
      if (gl && typeof gl.onScheduleFiberRoot == "function")
        try {
          gl.onScheduleFiberRoot(vi, i, a);
        } catch (d) {
          ta || (ta = !0, console.error(
            "React instrumentation encountered an error: %s",
            d
          ));
        }
      I !== null && typeof I.markRenderScheduled == "function" && I.markRenderScheduled(t), o = Fm(o), i.context === null ? i.context = o : i.pendingContext = o, aa && pa !== null && !g1 && (g1 = !0, console.error(
        `Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,
        ce(pa) || "Unknown"
      )), i = vn(t), i.payload = { element: a }, f = f === void 0 ? null : f, f !== null && (typeof f != "function" && console.error(
        "Expected the last optional `callback` argument to be a function. Instead received: %s.",
        f
      ), i.callback = f), a = $a(e, i, t), a !== null && (Ht(a, e, t), Wu(a, e, t));
    }
    function yd(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function Im(e, t) {
      yd(e, t), (e = e.alternate) && yd(e, t);
    }
    function Pm(e) {
      if (e.tag === 13) {
        var t = Ll(e, 67108864);
        t !== null && Ht(t, e, 67108864), Im(e, 67108864);
      }
    }
    function Tv() {
      return pa;
    }
    function Ev() {
      for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; 31 > a; a++) {
        var i = ov(t);
        e.set(t, i), t *= 2;
      }
      return e;
    }
    function xv(e, t, a, i) {
      var o = j.T;
      j.T = null;
      var f = ve.p;
      try {
        ve.p = bl, di(e, t, a, i);
      } finally {
        ve.p = f, j.T = o;
      }
    }
    function pd(e, t, a, i) {
      var o = j.T;
      j.T = null;
      var f = ve.p;
      try {
        ve.p = nn, di(e, t, a, i);
      } finally {
        ve.p = f, j.T = o;
      }
    }
    function di(e, t, a, i) {
      if (P0) {
        var o = ns(i);
        if (o === null)
          _l(
            e,
            t,
            i,
            ev,
            a
          ), hi(e, i);
        else if (us(
          o,
          e,
          t,
          a,
          i
        ))
          i.stopPropagation();
        else if (hi(e, i), t & 4 && -1 < FS.indexOf(e)) {
          for (; o !== null; ) {
            var f = ia(o);
            if (f !== null)
              switch (f.tag) {
                case 3:
                  if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                    var d = Oi(f.pendingLanes);
                    if (d !== 0) {
                      var h = f;
                      for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                        var p = 1 << 31 - Dl(d);
                        h.entanglements[1] |= p, d &= ~p;
                      }
                      Na(f), (ot & (Sa | ju)) === un && (q0 = Gn() + Wb, rc(0));
                    }
                  }
                  break;
                case 13:
                  h = Ll(f, 2), h !== null && Ht(h, f, 2), fc(), Im(f, 2);
              }
            if (f = ns(i), f === null && _l(
              e,
              t,
              i,
              ev,
              a
            ), f === o) break;
            o = f;
          }
          o !== null && i.stopPropagation();
        } else
          _l(
            e,
            t,
            i,
            null,
            a
          );
      }
    }
    function ns(e) {
      return e = Yi(e), zo(e);
    }
    function zo(e) {
      if (ev = null, e = lu(e), e !== null) {
        var t = Je(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = sl(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return ev = e, null;
    }
    function vd(e) {
      switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return bl;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return nn;
        case "message":
          switch (pi()) {
            case Ed:
              return bl;
            case ms:
              return nn;
            case Ho:
            case Ov:
              return Du;
            case ys:
              return zd;
            default:
              return Du;
          }
        default:
          return Du;
      }
    }
    function hi(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Wo = null;
          break;
        case "dragenter":
        case "dragleave":
          Fo = null;
          break;
        case "mouseover":
        case "mouseout":
          Io = null;
          break;
        case "pointerover":
        case "pointerout":
          Py.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          ep.delete(t.pointerId);
      }
    }
    function ea(e, t, a, i, o, f) {
      return e === null || e.nativeEvent !== f ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: i,
        nativeEvent: f,
        targetContainers: [o]
      }, t !== null && (t = ia(t), t !== null && Pm(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
    }
    function us(e, t, a, i, o) {
      switch (t) {
        case "focusin":
          return Wo = ea(
            Wo,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "dragenter":
          return Fo = ea(
            Fo,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "mouseover":
          return Io = ea(
            Io,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "pointerover":
          var f = o.pointerId;
          return Py.set(
            f,
            ea(
              Py.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
        case "gotpointercapture":
          return f = o.pointerId, ep.set(
            f,
            ea(
              ep.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
      }
      return !1;
    }
    function n0(e) {
      var t = lu(e.target);
      if (t !== null) {
        var a = Je(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = sl(a), t !== null) {
              e.blockedOn = t, sv(e.priority, function() {
                if (a.tag === 13) {
                  var i = Fl(a);
                  i = Cl(i);
                  var o = Ll(
                    a,
                    i
                  );
                  o !== null && Ht(o, a, i), Im(a, i);
                }
              });
              return;
            }
          } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function is(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = ns(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var i = new a.constructor(
            a.type,
            a
          ), o = i;
          s !== null && console.error(
            "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = o, a.target.dispatchEvent(i), s === null && console.error(
            "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = null;
        } else
          return t = ia(a), t !== null && Pm(t), e.blockedOn = a, !1;
        t.shift();
      }
      return !0;
    }
    function ey(e, t, a) {
      is(e) && a.delete(t);
    }
    function u0() {
      Og = !1, Wo !== null && is(Wo) && (Wo = null), Fo !== null && is(Fo) && (Fo = null), Io !== null && is(Io) && (Io = null), Py.forEach(ey), ep.forEach(ey);
    }
    function cs(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Og || (Og = !0, Bt.unstable_scheduleCallback(
        Bt.unstable_NormalPriority,
        u0
      )));
    }
    function i0(e) {
      tv !== e && (tv = e, Bt.unstable_scheduleCallback(
        Bt.unstable_NormalPriority,
        function() {
          tv === e && (tv = null);
          for (var t = 0; t < e.length; t += 3) {
            var a = e[t], i = e[t + 1], o = e[t + 2];
            if (typeof i != "function") {
              if (zo(i || a) === null)
                continue;
              break;
            }
            var f = ia(a);
            f !== null && (e.splice(t, 3), t -= 3, a = {
              pending: !0,
              data: o,
              method: a.method,
              action: i
            }, Object.freeze(a), Ii(
              f,
              a,
              i,
              o
            ));
          }
        }
      ));
    }
    function gc(e) {
      function t(p) {
        return cs(p, e);
      }
      Wo !== null && cs(Wo, e), Fo !== null && cs(Fo, e), Io !== null && cs(Io, e), Py.forEach(t), ep.forEach(t);
      for (var a = 0; a < Po.length; a++) {
        var i = Po[a];
        i.blockedOn === e && (i.blockedOn = null);
      }
      for (; 0 < Po.length && (a = Po[0], a.blockedOn === null); )
        n0(a), a.blockedOn === null && Po.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
        for (i = 0; i < a.length; i += 3) {
          var o = a[i], f = a[i + 1], d = o[la] || null;
          if (typeof f == "function")
            d || i0(a);
          else if (d) {
            var h = null;
            if (f && f.hasAttribute("formAction")) {
              if (o = f, d = f[la] || null)
                h = d.formAction;
              else if (zo(o) !== null) continue;
            } else h = d.action;
            typeof h == "function" ? a[i + 1] = h : (a.splice(i, 3), i -= 3), i0(a);
          }
        }
    }
    function gd(e) {
      this._internalRoot = e;
    }
    function os(e) {
      this._internalRoot = e;
    }
    function c0(e) {
      e[bi] && (e._reactRootContainer ? console.error(
        "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
      ) : console.error(
        "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
      ));
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var Bt = L1(), fs = Ea, Av = Q1, Ce = Object.assign, ss = Symbol.for("react.element"), mi = Symbol.for("react.transitional.element"), bc = Symbol.for("react.portal"), Ae = Symbol.for("react.fragment"), Do = Symbol.for("react.strict_mode"), Oo = Symbol.for("react.profiler"), ty = Symbol.for("react.provider"), bd = Symbol.for("react.consumer"), Ba = Symbol.for("react.context"), xu = Symbol.for("react.forward_ref"), Mo = Symbol.for("react.suspense"), yi = Symbol.for("react.suspense_list"), rs = Symbol.for("react.memo"), ya = Symbol.for("react.lazy"), ly = Symbol.for("react.activity"), o0 = Symbol.for("react.memo_cache_sentinel"), ay = Symbol.iterator, Sd = Symbol.for("react.client.reference"), Te = Array.isArray, j = fs.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ve = Av.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Rv = Object.freeze({
      pending: !1,
      data: null,
      method: null,
      action: null
    }), ds = [], hs = [], qa = -1, Au = yt(null), Uo = yt(null), wn = yt(null), Co = yt(null), Ru = Object.prototype.hasOwnProperty, Td = Bt.unstable_scheduleCallback, zv = Bt.unstable_cancelCallback, f0 = Bt.unstable_shouldYield, Dv = Bt.unstable_requestPaint, Gn = Bt.unstable_now, pi = Bt.unstable_getCurrentPriorityLevel, Ed = Bt.unstable_ImmediatePriority, ms = Bt.unstable_UserBlockingPriority, Ho = Bt.unstable_NormalPriority, Ov = Bt.unstable_LowPriority, ys = Bt.unstable_IdlePriority, Mv = Bt.log, an = Bt.unstable_setDisableYieldValue, vi = null, gl = null, I = null, ta = !1, qt = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Dl = Math.clz32 ? Math.clz32 : Xa, xd = Math.log, zu = Math.LN2, Ad = 256, Rd = 4194304, bl = 2, nn = 8, Du = 32, zd = 268435456, gi = Math.random().toString(36).slice(2), Ol = "__reactFiber$" + gi, la = "__reactProps$" + gi, bi = "__reactContainer$" + gi, ny = "__reactEvents$" + gi, s0 = "__reactListeners$" + gi, No = "__reactHandles$" + gi, jo = "__reactResources$" + gi, _o = "__reactMarker$" + gi, r0 = /* @__PURE__ */ new Set(), Ya = {}, Sc = {}, d0 = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    }, Dd = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Od = {}, Md = {}, Si = 0, uy, iy, h0, cy, Bo, m0, y0;
    Xs.__reactDisabledLog = !0;
    var oy, ps, qo = !1, vs = new (typeof WeakMap == "function" ? WeakMap : Map)(), pa = null, aa = !1, Uv = /[\n"\\]/g, fy = !1, sy = !1, ry = !1, dy = !1, Ud = !1, hy = !1, gs = ["value", "defaultValue"], p0 = !1, v0 = /["'&<>\n\t]|^\s|\s$/, my = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
      " "
    ), Cd = "applet caption html table td th marquee object template foreignObject desc title".split(
      " "
    ), Hd = Cd.concat(["button"]), yy = "dd dt li option optgroup p rp rt".split(" "), py = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null,
      containerTagInScope: null,
      implicitRootScope: !1
    }, Yo = {}, Vn = {
      animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(
        " "
      ),
      background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(
        " "
      ),
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(
        " "
      ),
      borderBlockEnd: [
        "borderBlockEndColor",
        "borderBlockEndStyle",
        "borderBlockEndWidth"
      ],
      borderBlockStart: [
        "borderBlockStartColor",
        "borderBlockStartStyle",
        "borderBlockStartWidth"
      ],
      borderBottom: [
        "borderBottomColor",
        "borderBottomStyle",
        "borderBottomWidth"
      ],
      borderColor: [
        "borderBottomColor",
        "borderLeftColor",
        "borderRightColor",
        "borderTopColor"
      ],
      borderImage: [
        "borderImageOutset",
        "borderImageRepeat",
        "borderImageSlice",
        "borderImageSource",
        "borderImageWidth"
      ],
      borderInlineEnd: [
        "borderInlineEndColor",
        "borderInlineEndStyle",
        "borderInlineEndWidth"
      ],
      borderInlineStart: [
        "borderInlineStartColor",
        "borderInlineStartStyle",
        "borderInlineStartWidth"
      ],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: [
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
        "borderTopLeftRadius",
        "borderTopRightRadius"
      ],
      borderRight: [
        "borderRightColor",
        "borderRightStyle",
        "borderRightWidth"
      ],
      borderStyle: [
        "borderBottomStyle",
        "borderLeftStyle",
        "borderRightStyle",
        "borderTopStyle"
      ],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: [
        "borderBottomWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth"
      ],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(
        " "
      ),
      fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(
        " "
      ),
      gap: ["columnGap", "rowGap"],
      grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(
        " "
      ),
      gridArea: [
        "gridColumnEnd",
        "gridColumnStart",
        "gridRowEnd",
        "gridRowStart"
      ],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: [
        "gridTemplateAreas",
        "gridTemplateColumns",
        "gridTemplateRows"
      ],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(
        " "
      ),
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: [
        "textDecorationColor",
        "textDecorationLine",
        "textDecorationStyle"
      ],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: [
        "transitionDelay",
        "transitionDuration",
        "transitionProperty",
        "transitionTimingFunction"
      ],
      wordWrap: ["overflowWrap"]
    }, Ou = /([A-Z])/g, Mu = /^ms-/, bs = /^(?:webkit|moz|o)[A-Z]/, Ss = /^-ms-/, Ti = /-(.)/g, g0 = /;\s*$/, Tc = {}, Ec = {}, b0 = !1, vy = !1, Ts = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    ), Es = "http://www.w3.org/1998/Math/MathML", wo = "http://www.w3.org/2000/svg", Nd = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]), xc = {
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      fetchpriority: "fetchPriority",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      inert: "inert",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      popover: "popover",
      popovertarget: "popoverTarget",
      popovertargetaction: "popoverTargetAction",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      transformorigin: "transformOrigin",
      "transform-origin": "transformOrigin",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, gy = {
      "aria-current": 0,
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      "aria-hidden": 0,
      "aria-invalid": 0,
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, Xn = {}, by = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), jd = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Sy = !1, Yl = {}, xs = /^on./, l = /^on[^A-Z]/, n = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), u = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), c = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, s = null, r = null, m = null, y = !1, b = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), M = !1;
    if (b)
      try {
        var G = {};
        Object.defineProperty(G, "passive", {
          get: function() {
            M = !0;
          }
        }), window.addEventListener("test", G, G), window.removeEventListener("test", G, G);
      } catch {
        M = !1;
      }
    var X = null, C = null, N = null, se = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, re = dl(se), tt = Ce({}, se, { view: 0, detail: 0 }), D = dl(tt), A, O, V, te = Ce({}, tt, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ps,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== V && (V && e.type === "mousemove" ? (A = e.screenX - V.screenX, O = e.screenY - V.screenY) : O = A = 0, V = e), A);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : O;
      }
    }), Ne = dl(te), oe = Ce({}, te, { dataTransfer: 0 }), ye = dl(oe), cl = Ce({}, tt, { relatedTarget: 0 }), ke = dl(cl), Ei = Ce({}, se, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Cv = dl(Ei), k1 = Ce({}, se, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), $1 = dl(k1), W1 = Ce({}, se, { data: 0 }), Cg = dl(
      W1
    ), F1 = Cg, I1 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, P1 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, eS = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    }, tS = Ce({}, tt, {
      key: function(e) {
        if (e.key) {
          var t = I1[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = Zc(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? P1[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ps,
      charCode: function(e) {
        return e.type === "keypress" ? Zc(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Zc(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), lS = dl(tS), aS = Ce({}, te, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Hg = dl(aS), nS = Ce({}, tt, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ps
    }), uS = dl(nS), iS = Ce({}, se, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), cS = dl(iS), oS = Ce({}, te, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), fS = dl(oS), sS = Ce({}, se, {
      newState: 0,
      oldState: 0
    }), rS = dl(sS), dS = [9, 13, 27, 32], Ng = 229, Hv = b && "CompositionEvent" in window, Ty = null;
    b && "documentMode" in document && (Ty = document.documentMode);
    var hS = b && "TextEvent" in window && !Ty, jg = b && (!Hv || Ty && 8 < Ty && 11 >= Ty), _g = 32, Bg = String.fromCharCode(_g), qg = !1, _d = !1, mS = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    }, Ey = null, xy = null, Yg = !1;
    b && (Yg = Th("input") && (!document.documentMode || 9 < document.documentMode));
    var va = typeof Object.is == "function" ? Object.is : vv, yS = b && "documentMode" in document && 11 >= document.documentMode, Bd = null, Nv = null, Ay = null, jv = !1, qd = {
      animationend: cu("Animation", "AnimationEnd"),
      animationiteration: cu("Animation", "AnimationIteration"),
      animationstart: cu("Animation", "AnimationStart"),
      transitionrun: cu("Transition", "TransitionRun"),
      transitionstart: cu("Transition", "TransitionStart"),
      transitioncancel: cu("Transition", "TransitionCancel"),
      transitionend: cu("Transition", "TransitionEnd")
    }, _v = {}, wg = {};
    b && (wg = document.createElement("div").style, "AnimationEvent" in window || (delete qd.animationend.animation, delete qd.animationiteration.animation, delete qd.animationstart.animation), "TransitionEvent" in window || delete qd.transitionend.transition);
    var Gg = Vi("animationend"), Vg = Vi("animationiteration"), Xg = Vi("animationstart"), pS = Vi("transitionrun"), vS = Vi("transitionstart"), gS = Vi("transitioncancel"), Qg = Vi("transitionend"), Lg = /* @__PURE__ */ new Map(), Bv = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
    Bv.push("scrollEnd");
    var qv = /* @__PURE__ */ new WeakMap(), S0 = 1, Ac = 2, Qn = [], Yd = 0, Yv = 0, Go = {};
    Object.freeze(Go);
    var Ln = null, wd = null, At = 0, bS = 1, wl = 2, na = 8, Uu = 16, Zg = 64, Jg = !1;
    try {
      var Kg = Object.preventExtensions({});
    } catch {
      Jg = !0;
    }
    var Gd = [], Vd = 0, T0 = null, E0 = 0, Zn = [], Jn = 0, As = null, Rc = 1, zc = "", ga = null, Vt = null, lt = !1, Dc = !1, Kn = null, Rs = null, xi = !1, wv = Error(
      "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), kg = 0;
    if (typeof performance == "object" && typeof performance.now == "function")
      var SS = performance, $g = function() {
        return SS.now();
      };
    else {
      var TS = Date;
      $g = function() {
        return TS.now();
      };
    }
    var Gv = yt(null), Vv = yt(null), Wg = {}, x0 = null, Xd = null, Qd = !1, ES = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = {
        aborted: !1,
        addEventListener: function(a, i) {
          e.push(i);
        }
      };
      this.abort = function() {
        t.aborted = !0, e.forEach(function(a) {
          return a();
        });
      };
    }, xS = Bt.unstable_scheduleCallback, AS = Bt.unstable_NormalPriority, Sl = {
      $$typeof: Ba,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
      _currentRenderer: null,
      _currentRenderer2: null
    }, Ld = Bt.unstable_now, Fg = -0, A0 = -0, wa = -1.1, zs = -0, R0 = !1, z0 = !1, Ry = null, Xv = 0, Ds = 0, Zd = null, Ig = j.S;
    j.S = function(e, t) {
      typeof t == "object" && t !== null && typeof t.then == "function" && Up(e, t), Ig !== null && Ig(e, t);
    };
    var Os = yt(null), Cu = {
      recordUnsafeLifecycleWarnings: function() {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function() {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    }, zy = [], Dy = [], Oy = [], My = [], Uy = [], Cy = [], Ms = /* @__PURE__ */ new Set();
    Cu.recordUnsafeLifecycleWarnings = function(e, t) {
      Ms.has(e.type) || (typeof t.componentWillMount == "function" && t.componentWillMount.__suppressDeprecationWarning !== !0 && zy.push(e), e.mode & na && typeof t.UNSAFE_componentWillMount == "function" && Dy.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Oy.push(e), e.mode & na && typeof t.UNSAFE_componentWillReceiveProps == "function" && My.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Uy.push(e), e.mode & na && typeof t.UNSAFE_componentWillUpdate == "function" && Cy.push(e));
    }, Cu.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      0 < zy.length && (zy.forEach(function(h) {
        e.add(
          ce(h) || "Component"
        ), Ms.add(h.type);
      }), zy = []);
      var t = /* @__PURE__ */ new Set();
      0 < Dy.length && (Dy.forEach(function(h) {
        t.add(
          ce(h) || "Component"
        ), Ms.add(h.type);
      }), Dy = []);
      var a = /* @__PURE__ */ new Set();
      0 < Oy.length && (Oy.forEach(function(h) {
        a.add(
          ce(h) || "Component"
        ), Ms.add(h.type);
      }), Oy = []);
      var i = /* @__PURE__ */ new Set();
      0 < My.length && (My.forEach(
        function(h) {
          i.add(
            ce(h) || "Component"
          ), Ms.add(h.type);
        }
      ), My = []);
      var o = /* @__PURE__ */ new Set();
      0 < Uy.length && (Uy.forEach(function(h) {
        o.add(
          ce(h) || "Component"
        ), Ms.add(h.type);
      }), Uy = []);
      var f = /* @__PURE__ */ new Set();
      if (0 < Cy.length && (Cy.forEach(function(h) {
        f.add(
          ce(h) || "Component"
        ), Ms.add(h.type);
      }), Cy = []), 0 < t.size) {
        var d = P(
          t
        );
        console.error(
          `Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,
          d
        );
      }
      0 < i.size && (d = P(
        i
      ), console.error(
        `Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,
        d
      )), 0 < f.size && (d = P(
        f
      ), console.error(
        `Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,
        d
      )), 0 < e.size && (d = P(e), console.warn(
        `componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < a.size && (d = P(
        a
      ), console.warn(
        `componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < o.size && (d = P(o), console.warn(
        `componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      ));
    };
    var D0 = /* @__PURE__ */ new Map(), Pg = /* @__PURE__ */ new Set();
    Cu.recordLegacyContextWarning = function(e, t) {
      for (var a = null, i = e; i !== null; )
        i.mode & na && (a = i), i = i.return;
      a === null ? console.error(
        "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
      ) : !Pg.has(e.type) && (i = D0.get(a), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], D0.set(a, i)), i.push(e));
    }, Cu.flushLegacyContextWarning = function() {
      D0.forEach(function(e) {
        if (e.length !== 0) {
          var t = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(o) {
            a.add(ce(o) || "Component"), Pg.add(o.type);
          });
          var i = P(a);
          ae(t, function() {
            console.error(
              `Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://react.dev/link/legacy-context`,
              i
            );
          });
        }
      });
    }, Cu.discardPendingWarnings = function() {
      zy = [], Dy = [], Oy = [], My = [], Uy = [], Cy = [], D0 = /* @__PURE__ */ new Map();
    };
    var Hy = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    ), eb = Error(
      "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), O0 = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."
    ), Qv = {
      then: function() {
        console.error(
          'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
        );
      }
    }, Ny = null, M0 = !1, kn = 0, $n = 1, ba = 2, Gl = 4, Tl = 8, tb = 0, lb = 1, ab = 2, Lv = 3, Vo = !1, nb = !1, Zv = null, Jv = !1, Jd = yt(null), U0 = yt(0), Kd, ub = /* @__PURE__ */ new Set(), ib = /* @__PURE__ */ new Set(), Kv = /* @__PURE__ */ new Set(), cb = /* @__PURE__ */ new Set(), Xo = 0, Ee = null, mt = null, ol = null, C0 = !1, kd = !1, Us = !1, H0 = 0, jy = 0, Oc = null, RS = 0, zS = 25, B = null, Wn = null, Mc = -1, _y = !1, N0 = {
      readContext: pt,
      use: bn,
      useCallback: zt,
      useContext: zt,
      useEffect: zt,
      useImperativeHandle: zt,
      useLayoutEffect: zt,
      useInsertionEffect: zt,
      useMemo: zt,
      useReducer: zt,
      useRef: zt,
      useState: zt,
      useDebugValue: zt,
      useDeferredValue: zt,
      useTransition: zt,
      useSyncExternalStore: zt,
      useId: zt,
      useHostTransitionStatus: zt,
      useFormState: zt,
      useActionState: zt,
      useOptimistic: zt,
      useMemoCache: zt,
      useCacheRefresh: zt
    }, kv = null, ob = null, $v = null, fb = null, Ai = null, Hu = null, j0 = null;
    kv = {
      readContext: function(e) {
        return pt(e);
      },
      use: bn,
      useCallback: function(e, t) {
        return B = "useCallback", He(), za(t), Uf(e, t);
      },
      useContext: function(e) {
        return B = "useContext", He(), pt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", He(), za(t), hr(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return B = "useImperativeHandle", He(), za(a), yr(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        B = "useInsertionEffect", He(), za(t), Ua(4, ba, e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", He(), za(t), mr(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", He(), za(t);
        var a = j.H;
        j.H = Ai;
        try {
          return pr(e, t);
        } finally {
          j.H = a;
        }
      },
      useReducer: function(e, t, a) {
        B = "useReducer", He();
        var i = j.H;
        j.H = Ai;
        try {
          return Fe(e, t, a);
        } finally {
          j.H = i;
        }
      },
      useRef: function(e) {
        return B = "useRef", He(), Mf(e);
      },
      useState: function(e) {
        B = "useState", He();
        var t = j.H;
        j.H = Ai;
        try {
          return du(e);
        } finally {
          j.H = t;
        }
      },
      useDebugValue: function() {
        B = "useDebugValue", He();
      },
      useDeferredValue: function(e, t) {
        return B = "useDeferredValue", He(), vr(e, t);
      },
      useTransition: function() {
        return B = "useTransition", He(), xn();
      },
      useSyncExternalStore: function(e, t, a) {
        return B = "useSyncExternalStore", He(), ru(
          e,
          t,
          a
        );
      },
      useId: function() {
        return B = "useId", He(), An();
      },
      useFormState: function(e, t) {
        return B = "useFormState", He(), Fc(), ao(e, t);
      },
      useActionState: function(e, t) {
        return B = "useActionState", He(), ao(e, t);
      },
      useOptimistic: function(e) {
        return B = "useOptimistic", He(), Ia(e);
      },
      useHostTransitionStatus: kl,
      useMemoCache: wt,
      useCacheRefresh: function() {
        return B = "useCacheRefresh", He(), Pi();
      }
    }, ob = {
      readContext: function(e) {
        return pt(e);
      },
      use: bn,
      useCallback: function(e, t) {
        return B = "useCallback", K(), Uf(e, t);
      },
      useContext: function(e) {
        return B = "useContext", K(), pt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", K(), hr(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return B = "useImperativeHandle", K(), yr(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        B = "useInsertionEffect", K(), Ua(4, ba, e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", K(), mr(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", K();
        var a = j.H;
        j.H = Ai;
        try {
          return pr(e, t);
        } finally {
          j.H = a;
        }
      },
      useReducer: function(e, t, a) {
        B = "useReducer", K();
        var i = j.H;
        j.H = Ai;
        try {
          return Fe(e, t, a);
        } finally {
          j.H = i;
        }
      },
      useRef: function(e) {
        return B = "useRef", K(), Mf(e);
      },
      useState: function(e) {
        B = "useState", K();
        var t = j.H;
        j.H = Ai;
        try {
          return du(e);
        } finally {
          j.H = t;
        }
      },
      useDebugValue: function() {
        B = "useDebugValue", K();
      },
      useDeferredValue: function(e, t) {
        return B = "useDeferredValue", K(), vr(e, t);
      },
      useTransition: function() {
        return B = "useTransition", K(), xn();
      },
      useSyncExternalStore: function(e, t, a) {
        return B = "useSyncExternalStore", K(), ru(
          e,
          t,
          a
        );
      },
      useId: function() {
        return B = "useId", K(), An();
      },
      useActionState: function(e, t) {
        return B = "useActionState", K(), ao(e, t);
      },
      useFormState: function(e, t) {
        return B = "useFormState", K(), Fc(), ao(e, t);
      },
      useOptimistic: function(e) {
        return B = "useOptimistic", K(), Ia(e);
      },
      useHostTransitionStatus: kl,
      useMemoCache: wt,
      useCacheRefresh: function() {
        return B = "useCacheRefresh", K(), Pi();
      }
    }, $v = {
      readContext: function(e) {
        return pt(e);
      },
      use: bn,
      useCallback: function(e, t) {
        return B = "useCallback", K(), Fi(e, t);
      },
      useContext: function(e) {
        return B = "useContext", K(), pt(e);
      },
      useEffect: function(e, t) {
        B = "useEffect", K(), $t(2048, Tl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return B = "useImperativeHandle", K(), En(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", K(), $t(4, ba, e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", K(), $t(4, Gl, e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", K();
        var a = j.H;
        j.H = Hu;
        try {
          return ti(e, t);
        } finally {
          j.H = a;
        }
      },
      useReducer: function(e, t, a) {
        B = "useReducer", K();
        var i = j.H;
        j.H = Hu;
        try {
          return Oa(e, t, a);
        } finally {
          j.H = i;
        }
      },
      useRef: function() {
        return B = "useRef", K(), Le().memoizedState;
      },
      useState: function() {
        B = "useState", K();
        var e = j.H;
        j.H = Hu;
        try {
          return Oa(Pe);
        } finally {
          j.H = e;
        }
      },
      useDebugValue: function() {
        B = "useDebugValue", K();
      },
      useDeferredValue: function(e, t) {
        return B = "useDeferredValue", K(), Cf(e, t);
      },
      useTransition: function() {
        return B = "useTransition", K(), Sr();
      },
      useSyncExternalStore: function(e, t, a) {
        return B = "useSyncExternalStore", K(), Rf(
          e,
          t,
          a
        );
      },
      useId: function() {
        return B = "useId", K(), Le().memoizedState;
      },
      useFormState: function(e) {
        return B = "useFormState", K(), Fc(), dr(e);
      },
      useActionState: function(e) {
        return B = "useActionState", K(), dr(e);
      },
      useOptimistic: function(e, t) {
        return B = "useOptimistic", K(), hu(e, t);
      },
      useHostTransitionStatus: kl,
      useMemoCache: wt,
      useCacheRefresh: function() {
        return B = "useCacheRefresh", K(), Le().memoizedState;
      }
    }, fb = {
      readContext: function(e) {
        return pt(e);
      },
      use: bn,
      useCallback: function(e, t) {
        return B = "useCallback", K(), Fi(e, t);
      },
      useContext: function(e) {
        return B = "useContext", K(), pt(e);
      },
      useEffect: function(e, t) {
        B = "useEffect", K(), $t(2048, Tl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return B = "useImperativeHandle", K(), En(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", K(), $t(4, ba, e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", K(), $t(4, Gl, e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", K();
        var a = j.H;
        j.H = j0;
        try {
          return ti(e, t);
        } finally {
          j.H = a;
        }
      },
      useReducer: function(e, t, a) {
        B = "useReducer", K();
        var i = j.H;
        j.H = j0;
        try {
          return Wi(e, t, a);
        } finally {
          j.H = i;
        }
      },
      useRef: function() {
        return B = "useRef", K(), Le().memoizedState;
      },
      useState: function() {
        B = "useState", K();
        var e = j.H;
        j.H = j0;
        try {
          return Wi(Pe);
        } finally {
          j.H = e;
        }
      },
      useDebugValue: function() {
        B = "useDebugValue", K();
      },
      useDeferredValue: function(e, t) {
        return B = "useDeferredValue", K(), gr(e, t);
      },
      useTransition: function() {
        return B = "useTransition", K(), Tr();
      },
      useSyncExternalStore: function(e, t, a) {
        return B = "useSyncExternalStore", K(), Rf(
          e,
          t,
          a
        );
      },
      useId: function() {
        return B = "useId", K(), Le().memoizedState;
      },
      useFormState: function(e) {
        return B = "useFormState", K(), Fc(), no(e);
      },
      useActionState: function(e) {
        return B = "useActionState", K(), no(e);
      },
      useOptimistic: function(e, t) {
        return B = "useOptimistic", K(), rr(e, t);
      },
      useHostTransitionStatus: kl,
      useMemoCache: wt,
      useCacheRefresh: function() {
        return B = "useCacheRefresh", K(), Le().memoizedState;
      }
    }, Ai = {
      readContext: function(e) {
        return Qe(), pt(e);
      },
      use: function(e) {
        return Z(), bn(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Z(), He(), Uf(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Z(), He(), pt(e);
      },
      useEffect: function(e, t) {
        return B = "useEffect", Z(), He(), hr(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return B = "useImperativeHandle", Z(), He(), yr(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        B = "useInsertionEffect", Z(), He(), Ua(4, ba, e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Z(), He(), mr(e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Z(), He();
        var a = j.H;
        j.H = Ai;
        try {
          return pr(e, t);
        } finally {
          j.H = a;
        }
      },
      useReducer: function(e, t, a) {
        B = "useReducer", Z(), He();
        var i = j.H;
        j.H = Ai;
        try {
          return Fe(e, t, a);
        } finally {
          j.H = i;
        }
      },
      useRef: function(e) {
        return B = "useRef", Z(), He(), Mf(e);
      },
      useState: function(e) {
        B = "useState", Z(), He();
        var t = j.H;
        j.H = Ai;
        try {
          return du(e);
        } finally {
          j.H = t;
        }
      },
      useDebugValue: function() {
        B = "useDebugValue", Z(), He();
      },
      useDeferredValue: function(e, t) {
        return B = "useDeferredValue", Z(), He(), vr(e, t);
      },
      useTransition: function() {
        return B = "useTransition", Z(), He(), xn();
      },
      useSyncExternalStore: function(e, t, a) {
        return B = "useSyncExternalStore", Z(), He(), ru(
          e,
          t,
          a
        );
      },
      useId: function() {
        return B = "useId", Z(), He(), An();
      },
      useFormState: function(e, t) {
        return B = "useFormState", Z(), He(), ao(e, t);
      },
      useActionState: function(e, t) {
        return B = "useActionState", Z(), He(), ao(e, t);
      },
      useOptimistic: function(e) {
        return B = "useOptimistic", Z(), He(), Ia(e);
      },
      useMemoCache: function(e) {
        return Z(), wt(e);
      },
      useHostTransitionStatus: kl,
      useCacheRefresh: function() {
        return B = "useCacheRefresh", He(), Pi();
      }
    }, Hu = {
      readContext: function(e) {
        return Qe(), pt(e);
      },
      use: function(e) {
        return Z(), bn(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Z(), K(), Fi(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Z(), K(), pt(e);
      },
      useEffect: function(e, t) {
        B = "useEffect", Z(), K(), $t(2048, Tl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return B = "useImperativeHandle", Z(), K(), En(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Z(), K(), $t(4, ba, e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Z(), K(), $t(4, Gl, e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Z(), K();
        var a = j.H;
        j.H = Hu;
        try {
          return ti(e, t);
        } finally {
          j.H = a;
        }
      },
      useReducer: function(e, t, a) {
        B = "useReducer", Z(), K();
        var i = j.H;
        j.H = Hu;
        try {
          return Oa(e, t, a);
        } finally {
          j.H = i;
        }
      },
      useRef: function() {
        return B = "useRef", Z(), K(), Le().memoizedState;
      },
      useState: function() {
        B = "useState", Z(), K();
        var e = j.H;
        j.H = Hu;
        try {
          return Oa(Pe);
        } finally {
          j.H = e;
        }
      },
      useDebugValue: function() {
        B = "useDebugValue", Z(), K();
      },
      useDeferredValue: function(e, t) {
        return B = "useDeferredValue", Z(), K(), Cf(e, t);
      },
      useTransition: function() {
        return B = "useTransition", Z(), K(), Sr();
      },
      useSyncExternalStore: function(e, t, a) {
        return B = "useSyncExternalStore", Z(), K(), Rf(
          e,
          t,
          a
        );
      },
      useId: function() {
        return B = "useId", Z(), K(), Le().memoizedState;
      },
      useFormState: function(e) {
        return B = "useFormState", Z(), K(), dr(e);
      },
      useActionState: function(e) {
        return B = "useActionState", Z(), K(), dr(e);
      },
      useOptimistic: function(e, t) {
        return B = "useOptimistic", Z(), K(), hu(e, t);
      },
      useMemoCache: function(e) {
        return Z(), wt(e);
      },
      useHostTransitionStatus: kl,
      useCacheRefresh: function() {
        return B = "useCacheRefresh", K(), Le().memoizedState;
      }
    }, j0 = {
      readContext: function(e) {
        return Qe(), pt(e);
      },
      use: function(e) {
        return Z(), bn(e);
      },
      useCallback: function(e, t) {
        return B = "useCallback", Z(), K(), Fi(e, t);
      },
      useContext: function(e) {
        return B = "useContext", Z(), K(), pt(e);
      },
      useEffect: function(e, t) {
        B = "useEffect", Z(), K(), $t(2048, Tl, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return B = "useImperativeHandle", Z(), K(), En(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return B = "useInsertionEffect", Z(), K(), $t(4, ba, e, t);
      },
      useLayoutEffect: function(e, t) {
        return B = "useLayoutEffect", Z(), K(), $t(4, Gl, e, t);
      },
      useMemo: function(e, t) {
        B = "useMemo", Z(), K();
        var a = j.H;
        j.H = Hu;
        try {
          return ti(e, t);
        } finally {
          j.H = a;
        }
      },
      useReducer: function(e, t, a) {
        B = "useReducer", Z(), K();
        var i = j.H;
        j.H = Hu;
        try {
          return Wi(e, t, a);
        } finally {
          j.H = i;
        }
      },
      useRef: function() {
        return B = "useRef", Z(), K(), Le().memoizedState;
      },
      useState: function() {
        B = "useState", Z(), K();
        var e = j.H;
        j.H = Hu;
        try {
          return Wi(Pe);
        } finally {
          j.H = e;
        }
      },
      useDebugValue: function() {
        B = "useDebugValue", Z(), K();
      },
      useDeferredValue: function(e, t) {
        return B = "useDeferredValue", Z(), K(), gr(e, t);
      },
      useTransition: function() {
        return B = "useTransition", Z(), K(), Tr();
      },
      useSyncExternalStore: function(e, t, a) {
        return B = "useSyncExternalStore", Z(), K(), Rf(
          e,
          t,
          a
        );
      },
      useId: function() {
        return B = "useId", Z(), K(), Le().memoizedState;
      },
      useFormState: function(e) {
        return B = "useFormState", Z(), K(), no(e);
      },
      useActionState: function(e) {
        return B = "useActionState", Z(), K(), no(e);
      },
      useOptimistic: function(e, t) {
        return B = "useOptimistic", Z(), K(), rr(e, t);
      },
      useMemoCache: function(e) {
        return Z(), wt(e);
      },
      useHostTransitionStatus: kl,
      useCacheRefresh: function() {
        return B = "useCacheRefresh", K(), Le().memoizedState;
      }
    };
    var sb = {
      react_stack_bottom_frame: function(e, t, a) {
        var i = aa;
        aa = !0;
        try {
          return e(t, a);
        } finally {
          aa = i;
        }
      }
    }, Wv = sb.react_stack_bottom_frame.bind(sb), rb = {
      react_stack_bottom_frame: function(e) {
        var t = aa;
        aa = !0;
        try {
          return e.render();
        } finally {
          aa = t;
        }
      }
    }, db = rb.react_stack_bottom_frame.bind(rb), hb = {
      react_stack_bottom_frame: function(e, t) {
        try {
          t.componentDidMount();
        } catch (a) {
          me(e, e.return, a);
        }
      }
    }, Fv = hb.react_stack_bottom_frame.bind(
      hb
    ), mb = {
      react_stack_bottom_frame: function(e, t, a, i, o) {
        try {
          t.componentDidUpdate(a, i, o);
        } catch (f) {
          me(e, e.return, f);
        }
      }
    }, yb = mb.react_stack_bottom_frame.bind(
      mb
    ), pb = {
      react_stack_bottom_frame: function(e, t) {
        var a = t.stack;
        e.componentDidCatch(t.value, {
          componentStack: a !== null ? a : ""
        });
      }
    }, DS = pb.react_stack_bottom_frame.bind(
      pb
    ), vb = {
      react_stack_bottom_frame: function(e, t, a) {
        try {
          a.componentWillUnmount();
        } catch (i) {
          me(e, t, i);
        }
      }
    }, gb = vb.react_stack_bottom_frame.bind(
      vb
    ), bb = {
      react_stack_bottom_frame: function(e) {
        e.resourceKind != null && console.error(
          "Expected only SimpleEffects when enableUseEffectCRUDOverload is disabled, got %s",
          e.resourceKind
        );
        var t = e.create;
        return e = e.inst, t = t(), e.destroy = t;
      }
    }, OS = bb.react_stack_bottom_frame.bind(bb), Sb = {
      react_stack_bottom_frame: function(e, t, a) {
        try {
          a();
        } catch (i) {
          me(e, t, i);
        }
      }
    }, MS = Sb.react_stack_bottom_frame.bind(Sb), Tb = {
      react_stack_bottom_frame: function(e) {
        var t = e._init;
        return t(e._payload);
      }
    }, Qo = Tb.react_stack_bottom_frame.bind(Tb), $d = null, By = 0, je = null, Iv, Eb = Iv = !1, xb = {}, Ab = {}, Rb = {};
    De = function(e, t, a) {
      if (a !== null && typeof a == "object" && a._store && (!a._store.validated && a.key == null || a._store.validated === 2)) {
        if (typeof a._store != "object")
          throw Error(
            "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
          );
        a._store.validated = 1;
        var i = ce(e), o = i || "null";
        if (!xb[o]) {
          xb[o] = !0, a = a._owner, e = e._debugOwner;
          var f = "";
          e && typeof e.tag == "number" && (o = ce(e)) && (f = `

Check the render method of \`` + o + "`."), f || i && (f = `

Check the top-level render call using <` + i + ">.");
          var d = "";
          a != null && e !== a && (i = null, typeof a.tag == "number" ? i = ce(a) : typeof a.name == "string" && (i = a.name), i && (d = " It was passed a child from " + i + ".")), ae(t, function() {
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              f,
              d
            );
          });
        }
      }
    };
    var Wd = _f(!0), zb = _f(!1), Fn = yt(null), Ri = null, Fd = 1, qy = 2, El = yt(0), Db = {}, Ob = /* @__PURE__ */ new Set(), Mb = /* @__PURE__ */ new Set(), Ub = /* @__PURE__ */ new Set(), Cb = /* @__PURE__ */ new Set(), Hb = /* @__PURE__ */ new Set(), Nb = /* @__PURE__ */ new Set(), jb = /* @__PURE__ */ new Set(), _b = /* @__PURE__ */ new Set(), Bb = /* @__PURE__ */ new Set(), qb = /* @__PURE__ */ new Set();
    Object.freeze(Db);
    var Pv = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var i = Fl(e), o = vn(i);
        o.payload = t, a != null && (Ph(a), o.callback = a), t = $a(e, o, i), t !== null && (Ht(t, e, i), Wu(t, e, i)), Oe(e, i);
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var i = Fl(e), o = vn(i);
        o.tag = lb, o.payload = t, a != null && (Ph(a), o.callback = a), t = $a(e, o, i), t !== null && (Ht(t, e, i), Wu(t, e, i)), Oe(e, i);
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = Fl(e), i = vn(a);
        i.tag = ab, t != null && (Ph(t), i.callback = t), t = $a(e, i, a), t !== null && (Ht(t, e, a), Wu(t, e, a)), I !== null && typeof I.markForceUpdateScheduled == "function" && I.markForceUpdateScheduled(e, a);
      }
    }, eg = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    }, Id = null, tg = null, Yb = Error(
      "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
    ), Ml = !1, wb = {}, Gb = {}, Vb = {}, Xb = {}, Pd = !1, Qb = {}, lg = {}, ag = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    }, Lb = !1, Zb = null;
    Zb = /* @__PURE__ */ new Set();
    var Uc = !1, It = !1, ng = !1, Jb = typeof WeakSet == "function" ? WeakSet : Set, Ul = null, eh = null, th = null, fl = null, Ga = !1, Nu = null, Yy = 8192, US = {
      getCacheForType: function(e) {
        var t = pt(Sl), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      getOwner: function() {
        return pa;
      }
    };
    if (typeof Symbol == "function" && Symbol.for) {
      var wy = Symbol.for;
      wy("selector.component"), wy("selector.has_pseudo_class"), wy("selector.role"), wy("selector.test_id"), wy("selector.text");
    }
    var CS = [], HS = typeof WeakMap == "function" ? WeakMap : Map, un = 0, Sa = 2, ju = 4, Cc = 0, Gy = 1, lh = 2, ug = 3, Cs = 4, _0 = 6, Kb = 5, ot = un, vt = null, Ge = null, Ve = 0, Va = 0, Vy = 1, Hs = 2, Xy = 3, kb = 4, ig = 5, ah = 6, Qy = 7, cg = 8, Ns = 9, dt = Va, cn = null, Lo = !1, nh = !1, og = !1, zi = 0, Xt = Cc, Zo = 0, Jo = 0, fg = 0, on = 0, js = 0, Ly = null, Ta = null, B0 = !1, sg = 0, $b = 300, q0 = 1 / 0, Wb = 500, Zy = null, Ko = null, NS = 0, jS = 1, _S = 2, _s = 0, Fb = 1, Ib = 2, Pb = 3, BS = 4, rg = 5, Vl = 0, ko = null, uh = null, $o = 0, dg = 0, hg = null, e1 = null, qS = 50, Jy = 0, mg = null, yg = !1, Y0 = !1, YS = 50, Bs = 0, Ky = null, ih = !1, w0 = null, t1 = !1, l1 = /* @__PURE__ */ new Set(), wS = {}, G0 = null, ch = null, pg = !1, vg = !1, V0 = !1, gg = !1, qs = 0, bg = {};
    (function() {
      for (var e = 0; e < Bv.length; e++) {
        var t = Bv[e], a = t.toLowerCase();
        t = t[0].toUpperCase() + t.slice(1), La(a, "on" + t);
      }
      La(Gg, "onAnimationEnd"), La(Vg, "onAnimationIteration"), La(Xg, "onAnimationStart"), La("dblclick", "onDoubleClick"), La("focusin", "onFocus"), La("focusout", "onBlur"), La(pS, "onTransitionRun"), La(vS, "onTransitionStart"), La(gS, "onTransitionCancel"), La(Qg, "onTransitionEnd");
    })(), Mi("onMouseEnter", ["mouseout", "mouseover"]), Mi("onMouseLeave", ["mouseout", "mouseover"]), Mi("onPointerEnter", ["pointerout", "pointerover"]), Mi("onPointerLeave", ["pointerout", "pointerover"]), Bu(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ), Bu(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ), Bu("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), Bu(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ), Bu(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ), Bu(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var ky = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), Sg = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ky)
    ), X0 = "_reactListening" + Math.random().toString(36).slice(2), a1 = !1, n1 = !1, Q0 = !1, u1 = !1, L0 = !1, Z0 = !1, i1 = !1, J0 = {}, GS = /\r\n?/g, VS = /\u0000|\uFFFD/g, Ys = "http://www.w3.org/1999/xlink", Tg = "http://www.w3.org/XML/1998/namespace", XS = "javascript:throw new Error('React form unexpectedly submitted.')", QS = "suppressHydrationWarning", K0 = "$", k0 = "/$", Hc = "$?", $y = "$!", LS = 1, ZS = 2, JS = 4, Eg = "F!", c1 = "F", o1 = "complete", KS = "style", Nc = 0, oh = 1, $0 = 2, xg = null, Ag = null, f1 = { dialog: !0, webview: !0 }, Rg = null, s1 = typeof setTimeout == "function" ? setTimeout : void 0, kS = typeof clearTimeout == "function" ? clearTimeout : void 0, ws = -1, r1 = typeof Promise == "function" ? Promise : void 0, $S = typeof queueMicrotask == "function" ? queueMicrotask : typeof r1 < "u" ? function(e) {
      return r1.resolve(null).then(e).catch(wm);
    } : s1, zg = null, Gs = 0, Wy = 1, d1 = 2, h1 = 3, In = 4, Pn = /* @__PURE__ */ new Map(), m1 = /* @__PURE__ */ new Set(), jc = ve.d;
    ve.d = {
      f: function() {
        var e = jc.f(), t = fc();
        return e || t;
      },
      r: function(e) {
        var t = ia(e);
        t !== null && t.tag === 5 && t.type === "form" ? Wh(t) : jc.r(e);
      },
      D: function(e) {
        jc.D(e), Ip("dns-prefetch", e, null);
      },
      C: function(e, t) {
        jc.C(e, t), Ip("preconnect", e, t);
      },
      L: function(e, t, a) {
        jc.L(e, t, a);
        var i = fh;
        if (i && e && t) {
          var o = 'link[rel="preload"][as="' + ca(t) + '"]';
          t === "image" && a && a.imageSrcSet ? (o += '[imagesrcset="' + ca(
            a.imageSrcSet
          ) + '"]', typeof a.imageSizes == "string" && (o += '[imagesizes="' + ca(
            a.imageSizes
          ) + '"]')) : o += '[href="' + ca(e) + '"]';
          var f = o;
          switch (t) {
            case "style":
              f = ri(e);
              break;
            case "script":
              f = pc(e);
          }
          Pn.has(f) || (e = Ce(
            {
              rel: "preload",
              href: t === "image" && a && a.imageSrcSet ? void 0 : e,
              as: t
            },
            a
          ), Pn.set(f, e), i.querySelector(o) !== null || t === "style" && i.querySelector(
            Yn(f)
          ) || t === "script" && i.querySelector(vc(f)) || (t = i.createElement("link"), jt(t, "link", e), tl(t), i.head.appendChild(t)));
        }
      },
      m: function(e, t) {
        jc.m(e, t);
        var a = fh;
        if (a && e) {
          var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + ca(i) + '"][href="' + ca(e) + '"]', f = o;
          switch (i) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              f = pc(e);
          }
          if (!Pn.has(f) && (e = Ce({ rel: "modulepreload", href: e }, t), Pn.set(f, e), a.querySelector(o) === null)) {
            switch (i) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (a.querySelector(vc(f)))
                  return;
            }
            i = a.createElement("link"), jt(i, "link", e), tl(i), a.head.appendChild(i);
          }
        }
      },
      X: function(e, t) {
        jc.X(e, t);
        var a = fh;
        if (a && e) {
          var i = sn(a).hoistableScripts, o = pc(e), f = i.get(o);
          f || (f = a.querySelector(
            vc(o)
          ), f || (e = Ce({ src: e, async: !0 }, t), (t = Pn.get(o)) && Km(e, t), f = a.createElement("script"), tl(f), jt(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      },
      S: function(e, t, a) {
        jc.S(e, t, a);
        var i = fh;
        if (i && e) {
          var o = sn(i).hoistableStyles, f = ri(e);
          t = t || "default";
          var d = o.get(f);
          if (!d) {
            var h = { loading: Gs, preload: null };
            if (d = i.querySelector(
              Yn(f)
            ))
              h.loading = Wy | In;
            else {
              e = Ce(
                {
                  rel: "stylesheet",
                  href: e,
                  "data-precedence": t
                },
                a
              ), (a = Pn.get(f)) && Jm(e, a);
              var p = d = i.createElement("link");
              tl(p), jt(p, "link", e), p._p = new Promise(function(v, H) {
                p.onload = v, p.onerror = H;
              }), p.addEventListener("load", function() {
                h.loading |= Wy;
              }), p.addEventListener("error", function() {
                h.loading |= d1;
              }), h.loading |= In, dd(d, t, i);
            }
            d = {
              type: "stylesheet",
              instance: d,
              count: 1,
              state: h
            }, o.set(f, d);
          }
        }
      },
      M: function(e, t) {
        jc.M(e, t);
        var a = fh;
        if (a && e) {
          var i = sn(a).hoistableScripts, o = pc(e), f = i.get(o);
          f || (f = a.querySelector(
            vc(o)
          ), f || (e = Ce({ src: e, async: !0, type: "module" }, t), (t = Pn.get(o)) && Km(e, t), f = a.createElement("script"), tl(f), jt(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      }
    };
    var fh = typeof document > "u" ? null : document, W0 = null, Fy = null, Dg = null, F0 = null, Vs = Rv, Iy = {
      $$typeof: Ba,
      Provider: null,
      Consumer: null,
      _currentValue: Vs,
      _currentValue2: Vs,
      _threadCount: 0
    }, y1 = "%c%s%c ", p1 = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", v1 = "", I0 = " ", WS = Function.prototype.bind, g1 = !1, b1 = null, S1 = null, T1 = null, E1 = null, x1 = null, A1 = null, R1 = null, z1 = null, D1 = null;
    b1 = function(e, t, a, i) {
      t = R(e, t), t !== null && (a = L(t.memoizedState, a, 0, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = Ce({}, e.memoizedProps), a = Ll(e, 2), a !== null && Ht(a, e, 2));
    }, S1 = function(e, t, a) {
      t = R(e, t), t !== null && (a = k(t.memoizedState, a, 0), t.memoizedState = a, t.baseState = a, e.memoizedProps = Ce({}, e.memoizedProps), a = Ll(e, 2), a !== null && Ht(a, e, 2));
    }, T1 = function(e, t, a, i) {
      t = R(e, t), t !== null && (a = J(t.memoizedState, a, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = Ce({}, e.memoizedProps), a = Ll(e, 2), a !== null && Ht(a, e, 2));
    }, E1 = function(e, t, a) {
      e.pendingProps = L(e.memoizedProps, t, 0, a), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Ll(e, 2), t !== null && Ht(t, e, 2);
    }, x1 = function(e, t) {
      e.pendingProps = k(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Ll(e, 2), t !== null && Ht(t, e, 2);
    }, A1 = function(e, t, a) {
      e.pendingProps = J(
        e.memoizedProps,
        t,
        a
      ), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = Ll(e, 2), t !== null && Ht(t, e, 2);
    }, R1 = function(e) {
      var t = Ll(e, 2);
      t !== null && Ht(t, e, 2);
    }, z1 = function(e) {
      Xe = e;
    }, D1 = function(e) {
      ie = e;
    };
    var P0 = !0, ev = null, Og = !1, Wo = null, Fo = null, Io = null, Py = /* @__PURE__ */ new Map(), ep = /* @__PURE__ */ new Map(), Po = [], FS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    ), tv = null;
    if (os.prototype.render = gd.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error("Cannot update an unmounted root.");
      var a = arguments;
      typeof a[1] == "function" ? console.error(
        "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ) : $e(a[1]) ? console.error(
        "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
      ) : typeof a[1] < "u" && console.error(
        "You passed a second argument to root.render(...) but it only accepts one argument."
      ), a = e;
      var i = t.current, o = Fl(i);
      ct(i, o, a, t, null, null);
    }, os.prototype.unmount = gd.prototype.unmount = function() {
      var e = arguments;
      if (typeof e[0] == "function" && console.error(
        "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ), e = this._internalRoot, e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (ot & (Sa | ju)) !== un && console.error(
          "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
        ), ct(e.current, 2, null, e, null, null), fc(), t[bi] = null;
      }
    }, os.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = fp();
        e = { blockedOn: null, target: e, priority: t };
        for (var a = 0; a < Po.length && t !== 0 && t < Po[a].priority; a++) ;
        Po.splice(a, 0, e), a === 0 && n0(e);
      }
    }, (function() {
      var e = fs.version;
      if (e !== "19.1.1")
        throw Error(
          `Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (e + `
  - react-dom:  19.1.1
Learn more: https://react.dev/warnings/version-mismatch`)
        );
    })(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
    ), ve.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error(
          "Argument appears to not be a ReactComponent. Keys: " + e
        ));
      return e = it(t), e = e !== null ? Qt(e) : null, e = e === null ? null : e.stateNode, e;
    }, !(function() {
      var e = {
        bundleType: 1,
        version: "19.1.1",
        rendererPackageName: "react-dom",
        currentDispatcherRef: j,
        reconcilerVersion: "19.1.1"
      };
      return e.overrideHookState = b1, e.overrideHookStateDeletePath = S1, e.overrideHookStateRenamePath = T1, e.overrideProps = E1, e.overridePropsDeletePath = x1, e.overridePropsRenamePath = A1, e.scheduleUpdate = R1, e.setErrorHandler = z1, e.setSuspenseHandler = D1, e.scheduleRefresh = Se, e.scheduleRoot = de, e.setRefreshHandler = bt, e.getCurrentFiber = Tv, e.getLaneLabelMap = Ev, e.injectProfilingHooks = fn, Ke(e);
    })() && b && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
      var O1 = window.location.protocol;
      /^(https?|file):$/.test(O1) && console.info(
        "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (O1 === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq` : ""),
        "font-weight:bold"
      );
    }
    ap.createRoot = function(e, t) {
      if (!$e(e))
        throw Error("Target container is not a DOM element.");
      c0(e);
      var a = !1, i = "", o = em, f = Bp, d = Rr, h = null;
      return t != null && (t.hydrate ? console.warn(
        "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
      ) : typeof t == "object" && t !== null && t.$$typeof === mi && console.error(
        `You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`
      ), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (h = t.unstable_transitionCallbacks)), t = Wm(
        e,
        1,
        !1,
        null,
        null,
        a,
        i,
        o,
        f,
        d,
        h,
        null
      ), e[bi] = t.current, Hm(e), new gd(t);
    }, ap.hydrateRoot = function(e, t, a) {
      if (!$e(e))
        throw Error("Target container is not a DOM element.");
      c0(e), t === void 0 && console.error(
        "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
      );
      var i = !1, o = "", f = em, d = Bp, h = Rr, p = null, v = null;
      return a != null && (a.unstable_strictMode === !0 && (i = !0), a.identifierPrefix !== void 0 && (o = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (d = a.onCaughtError), a.onRecoverableError !== void 0 && (h = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (p = a.unstable_transitionCallbacks), a.formState !== void 0 && (v = a.formState)), t = Wm(
        e,
        1,
        !0,
        t,
        a ?? null,
        i,
        o,
        f,
        d,
        h,
        p,
        v
      ), t.context = Fm(null), a = t.current, i = Fl(a), i = Cl(i), o = vn(i), o.callback = null, $a(a, o, i), a = i, t.current.lanes = a, Bc(t, a), Na(t), e[bi] = t.current, Hm(e), new os(t);
    }, ap.version = "19.1.1", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), ap;
}
var j1;
function n2() {
  if (j1) return lv.exports;
  j1 = 1;
  function R() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(R);
      } catch (L) {
        console.error(L);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (R(), lv.exports = l2()) : lv.exports = a2(), lv.exports;
}
var u2 = n2();
const i2 = /* @__PURE__ */ PS(u2);
var nv = { exports: {} }, np = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _1;
function c2() {
  if (_1) return np;
  _1 = 1;
  var R = Symbol.for("react.transitional.element"), L = Symbol.for("react.fragment");
  function J(g, k, ie) {
    var Xe = null;
    if (ie !== void 0 && (Xe = "" + ie), k.key !== void 0 && (Xe = "" + k.key), "key" in k) {
      ie = {};
      for (var De in k)
        De !== "key" && (ie[De] = k[De]);
    } else ie = k;
    return k = ie.ref, {
      $$typeof: R,
      type: g,
      key: Xe,
      ref: k !== void 0 ? k : null,
      props: ie
    };
  }
  return np.Fragment = L, np.jsx = J, np.jsxs = J, np;
}
var up = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var B1;
function o2() {
  return B1 || (B1 = 1, process.env.NODE_ENV !== "production" && (function() {
    function R(_) {
      if (_ == null) return null;
      if (typeof _ == "function")
        return _.$$typeof === yt ? null : _.displayName || _.name || null;
      if (typeof _ == "string") return _;
      switch (_) {
        case bt:
          return "Fragment";
        case Je:
          return "Profiler";
        case $e:
          return "StrictMode";
        case Qt:
          return "Suspense";
        case Ie:
          return "SuspenseList";
        case ce:
          return "Activity";
      }
      if (typeof _ == "object")
        switch (typeof _.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), _.$$typeof) {
          case Se:
            return "Portal";
          case ft:
            return (_.displayName || "Context") + ".Provider";
          case sl:
            return (_._context.displayName || "Context") + ".Consumer";
          case it:
            var le = _.render;
            return _ = _.displayName, _ || (_ = le.displayName || le.name || "", _ = _ !== "" ? "ForwardRef(" + _ + ")" : "ForwardRef"), _;
          case Be:
            return le = _.displayName || null, le !== null ? le : R(_.type) || "Memo";
          case Yt:
            le = _._payload, _ = _._init;
            try {
              return R(_(le));
            } catch {
            }
        }
      return null;
    }
    function L(_) {
      return "" + _;
    }
    function J(_) {
      try {
        L(_);
        var le = !1;
      } catch {
        le = !0;
      }
      if (le) {
        le = console;
        var F = le.error, he = typeof Symbol == "function" && Symbol.toStringTag && _[Symbol.toStringTag] || _.constructor.name || "Object";
        return F.call(
          le,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          he
        ), L(_);
      }
    }
    function g(_) {
      if (_ === bt) return "<>";
      if (typeof _ == "object" && _ !== null && _.$$typeof === Yt)
        return "<...>";
      try {
        var le = R(_);
        return le ? "<" + le + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function k() {
      var _ = We.A;
      return _ === null ? null : _.getOwner();
    }
    function ie() {
      return Error("react-stack-top-frame");
    }
    function Xe(_) {
      if (pe.call(_, "key")) {
        var le = Object.getOwnPropertyDescriptor(_, "key").get;
        if (le && le.isReactWarning) return !1;
      }
      return _.key !== void 0;
    }
    function De(_, le) {
      function F() {
        St || (St = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          le
        ));
      }
      F.isReactWarning = !0, Object.defineProperty(_, "key", {
        get: F,
        configurable: !0
      });
    }
    function Z() {
      var _ = R(this.type);
      return z[_] || (z[_] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), _ = this.props.ref, _ !== void 0 ? _ : null;
    }
    function Qe(_, le, F, he, Ue, Ke, qe, fn) {
      return F = Ke.ref, _ = {
        $$typeof: de,
        type: _,
        key: le,
        props: Ke,
        _owner: Ue
      }, (F !== void 0 ? F : null) !== null ? Object.defineProperty(_, "ref", {
        enumerable: !1,
        get: Z
      }) : Object.defineProperty(_, "ref", { enumerable: !1, value: null }), _._store = {}, Object.defineProperty(_._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(_, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(_, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: qe
      }), Object.defineProperty(_, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: fn
      }), Object.freeze && (Object.freeze(_.props), Object.freeze(_)), _;
    }
    function be(_, le, F, he, Ue, Ke, qe, fn) {
      var Tt = le.children;
      if (Tt !== void 0)
        if (he)
          if (Mt(Tt)) {
            for (he = 0; he < Tt.length; he++)
              P(Tt[he]);
            Object.freeze && Object.freeze(Tt);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else P(Tt);
      if (pe.call(le, "key")) {
        Tt = R(_);
        var Zt = Object.keys(le).filter(function(eu) {
          return eu !== "key";
        });
        he = 0 < Zt.length ? "{key: someKey, " + Zt.join(": ..., ") + ": ...}" : "{key: someKey}", fe[Tt + he] || (Zt = 0 < Zt.length ? "{" + Zt.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          he,
          Tt,
          Zt,
          Tt
        ), fe[Tt + he] = !0);
      }
      if (Tt = null, F !== void 0 && (J(F), Tt = "" + F), Xe(le) && (J(le.key), Tt = "" + le.key), "key" in le) {
        F = {};
        for (var Xl in le)
          Xl !== "key" && (F[Xl] = le[Xl]);
      } else F = le;
      return Tt && De(
        F,
        typeof _ == "function" ? _.displayName || _.name || "Unknown" : _
      ), Qe(
        _,
        Tt,
        Ke,
        Ue,
        k(),
        F,
        qe,
        fn
      );
    }
    function P(_) {
      typeof _ == "object" && _ !== null && _.$$typeof === de && _._store && (_._store.validated = 1);
    }
    var ee = Ea, de = Symbol.for("react.transitional.element"), Se = Symbol.for("react.portal"), bt = Symbol.for("react.fragment"), $e = Symbol.for("react.strict_mode"), Je = Symbol.for("react.profiler"), sl = Symbol.for("react.consumer"), ft = Symbol.for("react.context"), it = Symbol.for("react.forward_ref"), Qt = Symbol.for("react.suspense"), Ie = Symbol.for("react.suspense_list"), Be = Symbol.for("react.memo"), Yt = Symbol.for("react.lazy"), ce = Symbol.for("react.activity"), yt = Symbol.for("react.client.reference"), We = ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, pe = Object.prototype.hasOwnProperty, Mt = Array.isArray, Lt = console.createTask ? console.createTask : function() {
      return null;
    };
    ee = {
      react_stack_bottom_frame: function(_) {
        return _();
      }
    };
    var St, z = {}, Q = ee.react_stack_bottom_frame.bind(
      ee,
      ie
    )(), $ = Lt(g(ie)), fe = {};
    up.Fragment = bt, up.jsx = function(_, le, F, he, Ue) {
      var Ke = 1e4 > We.recentlyCreatedOwnerStacks++;
      return be(
        _,
        le,
        F,
        !1,
        he,
        Ue,
        Ke ? Error("react-stack-top-frame") : Q,
        Ke ? Lt(g(_)) : $
      );
    }, up.jsxs = function(_, le, F, he, Ue) {
      var Ke = 1e4 > We.recentlyCreatedOwnerStacks++;
      return be(
        _,
        le,
        F,
        !0,
        he,
        Ue,
        Ke ? Error("react-stack-top-frame") : Q,
        Ke ? Lt(g(_)) : $
      );
    };
  })()), up;
}
var q1;
function f2() {
  return q1 || (q1 = 1, process.env.NODE_ENV === "production" ? nv.exports = c2() : nv.exports = o2()), nv.exports;
}
var E = f2();
const Y1 = (R) => {
  let L;
  const J = /* @__PURE__ */ new Set(), g = (Qe, be) => {
    const P = typeof Qe == "function" ? Qe(L) : Qe;
    if (!Object.is(P, L)) {
      const ee = L;
      L = be ?? (typeof P != "object" || P === null) ? P : Object.assign({}, L, P), J.forEach((de) => de(L, ee));
    }
  }, k = () => L, De = { setState: g, getState: k, getInitialState: () => Z, subscribe: (Qe) => (J.add(Qe), () => J.delete(Qe)) }, Z = L = R(g, k, De);
  return De;
}, s2 = ((R) => R ? Y1(R) : Y1), r2 = (R) => R;
function d2(R, L = r2) {
  const J = Ea.useSyncExternalStore(
    R.subscribe,
    Ea.useCallback(() => L(R.getState()), [R, L]),
    Ea.useCallback(() => L(R.getInitialState()), [R, L])
  );
  return Ea.useDebugValue(J), J;
}
const w1 = (R) => {
  const L = s2(R), J = (g) => d2(L, g);
  return Object.assign(J, L), J;
}, h2 = ((R) => R ? w1(R) : w1), el = {
  currency: "RUB",
  vatRateDefault: 20,
  sku: {
    transmitter: { sku: "TX", name: "Передатчик", unitPrice: 1e4 },
    receiver: { sku: "RX", name: "Приёмник", unitPrice: 3e3 },
    microphone: { sku: "MIC", name: "Микрофон", unitPrice: 2e3 },
    headphones: {
      in_ear: { sku: "HP-IN", name: "Наушники (вкладыши)", unitPrice: 700 },
      on_ear: { sku: "HP-ON", name: "Наушники (накладные)", unitPrice: 1200 },
      over_ear: { sku: "HP-OV", name: "Наушники (полноразмерные)", unitPrice: 2e3 }
    },
    charger: {
      10: { sku: "CH-10", name: "Зарядное устройство на 10", unitPrice: 8e3 },
      20: { sku: "CH-20", name: "Зарядное устройство на 20", unitPrice: 15e3 },
      30: { sku: "CH-30", name: "Зарядное устройство на 30", unitPrice: 21e3 }
    }
  },
  volumeDiscounts: [
    { thresholdQty: 20, percentage: 5 },
    { thresholdQty: 50, percentage: 10 },
    { thresholdQty: 100, percentage: 15 }
  ],
  shipping: {
    moscow: 0,
    rf: 1500,
    world: 4e3
  },
  promos: [
    { code: "WELCOME10", type: "percentage", value: 10, stackWithVolume: !0 },
    { code: "FIX5000", type: "fixed", value: 5e3, minAmount: 3e4, stackWithVolume: !1 }
  ]
}, m2 = async (R, L) => {
  try {
    const J = await fetch(R, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Calculator-Widget/1.0"
      },
      body: JSON.stringify(L)
    });
    if (!J.ok)
      throw new Error(`HTTP error! status: ${J.status}`);
    return !0;
  } catch (J) {
    return console.error("Webhook error:", J), !1;
  }
}, y2 = h2((R, L) => {
  const J = {
    // Устаревшие поля
    selectedProducts: [],
    shipping: null,
    discount: null,
    subtotal: 0,
    volumeDiscountAmount: 0,
    promoDiscountAmount: 0,
    discountAmount: 0,
    vatAmount: 0,
    shippingCost: 0,
    // Новые поля
    select_delivery: "moscow",
    input_tr: 0,
    input_rc: 0,
    input_mic: 0,
    select_headphones: null,
    qty_headphones: 0,
    select_charger: null,
    promo: "",
    vatIncluded: !1,
    vatRate: 20,
    bundles: 1,
    total: 0,
    // Сеттеры с вычислением в реальном времени
    setDelivery: (g) => {
      R({ select_delivery: g }), L().calculateTotal();
    },
    setTransmitters: (g) => {
      R({ input_tr: g }), L().calculateTotal();
    },
    setReceivers: (g) => {
      R({ input_rc: g }), L().calculateTotal();
    },
    setMicrophones: (g) => {
      R({ input_mic: g }), L().calculateTotal();
    },
    setHeadphonesType: (g) => {
      R({ select_headphones: g }), L().calculateTotal();
    },
    setHeadphonesQty: (g) => {
      R({ qty_headphones: g }), L().calculateTotal();
    },
    setCharger: (g) => {
      R({ select_charger: g }), L().calculateTotal();
    },
    setPromo: (g) => {
      R({ promo: g }), L().calculateTotal();
    },
    setVatIncluded: (g) => {
      R({ vatIncluded: g }), L().calculateTotal();
    },
    setVatRate: (g) => {
      R({ vatRate: g }), L().calculateTotal();
    },
    setBundles: (g) => {
      R({ bundles: g }), L().calculateTotal();
    },
    // Устаревшие действия
    addProduct: (g, k = 1) => {
      const { selectedProducts: ie } = L(), Xe = ie.find((De) => De.product.id === g.id);
      R(Xe ? {
        selectedProducts: ie.map(
          (De) => De.product.id === g.id ? { ...De, quantity: De.quantity + k } : De
        )
      } : {
        selectedProducts: [...ie, { product: g, quantity: k }]
      });
    },
    removeProduct: (g) => {
      const { selectedProducts: k } = L();
      R({
        selectedProducts: k.filter((ie) => ie.product.id !== g)
      });
    },
    updateQuantity: (g, k) => {
      const { selectedProducts: ie } = L();
      R({
        selectedProducts: ie.map(
          (Xe) => Xe.product.id === g ? { ...Xe, quantity: k } : Xe
        )
      });
    },
    setShipping: (g) => R({ shipping: g }),
    setDiscount: (g) => R({ discount: g }),
    // Новые действия
    calculateTotal: () => {
      const g = L(), { input_rc: k, input_tr: ie, input_mic: Xe, qty_headphones: De, select_charger: Z, bundles: Qe, vatIncluded: be, vatRate: P } = g;
      let ee = 0;
      ee += ie * el.sku.transmitter.unitPrice, ee += k * el.sku.receiver.unitPrice, ee += Xe * el.sku.microphone.unitPrice, g.select_headphones && (ee += De * el.sku.headphones[g.select_headphones].unitPrice), Z && (ee += el.sku.charger[Z].unitPrice), ee *= Qe;
      const de = el.shipping[g.select_delivery], Se = k + ie + Xe + De;
      let bt = 0;
      for (const Ie of el.volumeDiscounts)
        Se >= Ie.thresholdQty && (bt = Math.max(bt, Ie.percentage));
      const $e = ee * bt / 100;
      let Je = 0;
      if (g.promo) {
        const Ie = el.promos.find((Be) => Be.code === g.promo);
        Ie && ee >= (Ie.minAmount || 0) && (Ie.type === "percentage" ? Je = ee * Ie.value / 100 : Je = Ie.value);
      }
      const sl = $e + Je, ft = ee - sl;
      let it = 0;
      be ? it = ft * P / (100 + P) : it = ft * P / 100;
      const Qt = ft + de + (be ? 0 : it);
      R({
        subtotal: ee,
        volumeDiscountAmount: $e,
        promoDiscountAmount: Je,
        discountAmount: sl,
        vatAmount: it,
        shippingCost: de,
        total: Qt
      });
    },
    addToCart: () => {
      const g = L();
      g.calculateTotal();
      const k = [];
      return g.input_tr > 0 && k.push({
        product: {
          id: "transmitter",
          name: "Передатчик",
          price: el.sku.transmitter.unitPrice,
          category: "radioguide"
        },
        quantity: g.input_tr
      }), g.input_rc > 0 && k.push({
        product: {
          id: "receiver",
          name: "Приёмник",
          price: el.sku.receiver.unitPrice,
          category: "radioguide"
        },
        quantity: g.input_rc
      }), g.input_mic > 0 && k.push({
        product: {
          id: "microphone",
          name: "Микрофон",
          price: el.sku.microphone.unitPrice,
          category: "radioguide"
        },
        quantity: g.input_mic
      }), g.select_headphones && g.qty_headphones > 0 && k.push({
        product: {
          id: "headphones",
          name: `Наушники (${el.sku.headphones[g.select_headphones].name})`,
          price: el.sku.headphones[g.select_headphones].unitPrice,
          category: "accessory"
        },
        quantity: g.qty_headphones
      }), g.select_charger && k.push({
        product: {
          id: "charger",
          name: `Зарядное устройство на ${g.select_charger}`,
          price: el.sku.charger[g.select_charger].unitPrice,
          category: "accessory"
        },
        quantity: 1
      }), console.log("Добавлено в корзину:", k), !0;
    },
    // Очистка корзины
    clearCart: () => {
      R({
        selectedProducts: [],
        input_tr: 0,
        input_rc: 0,
        input_mic: 0,
        select_headphones: null,
        qty_headphones: 0,
        select_charger: null,
        promo: "",
        bundles: 1,
        subtotal: 0,
        volumeDiscountAmount: 0,
        promoDiscountAmount: 0,
        discountAmount: 0,
        vatAmount: 0,
        shippingCost: 0,
        total: 0
      });
    },
    sendToWebhook: async (g) => {
      const k = L();
      k.calculateTotal();
      const ie = {
        delivery: k.select_delivery,
        receivers: k.input_rc,
        transmitters: k.input_tr,
        microphones: k.input_mic,
        headphones: {
          type: k.select_headphones,
          quantity: k.qty_headphones
        },
        charger: k.select_charger,
        promo: k.promo,
        vatIncluded: k.vatIncluded,
        vatRate: k.vatRate,
        bundles: k.bundles,
        total: k.total,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      return await m2(g, ie);
    }
  };
  return setTimeout(() => {
    J.calculateTotal();
  }, 0), J;
});
var Z1 = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, G1 = Ea.createContext && /* @__PURE__ */ Ea.createContext(Z1), p2 = ["attr", "size", "title"];
function v2(R, L) {
  if (R == null) return {};
  var J = g2(R, L), g, k;
  if (Object.getOwnPropertySymbols) {
    var ie = Object.getOwnPropertySymbols(R);
    for (k = 0; k < ie.length; k++)
      g = ie[k], !(L.indexOf(g) >= 0) && Object.prototype.propertyIsEnumerable.call(R, g) && (J[g] = R[g]);
  }
  return J;
}
function g2(R, L) {
  if (R == null) return {};
  var J = {};
  for (var g in R)
    if (Object.prototype.hasOwnProperty.call(R, g)) {
      if (L.indexOf(g) >= 0) continue;
      J[g] = R[g];
    }
  return J;
}
function uv() {
  return uv = Object.assign ? Object.assign.bind() : function(R) {
    for (var L = 1; L < arguments.length; L++) {
      var J = arguments[L];
      for (var g in J)
        Object.prototype.hasOwnProperty.call(J, g) && (R[g] = J[g]);
    }
    return R;
  }, uv.apply(this, arguments);
}
function V1(R, L) {
  var J = Object.keys(R);
  if (Object.getOwnPropertySymbols) {
    var g = Object.getOwnPropertySymbols(R);
    L && (g = g.filter(function(k) {
      return Object.getOwnPropertyDescriptor(R, k).enumerable;
    })), J.push.apply(J, g);
  }
  return J;
}
function iv(R) {
  for (var L = 1; L < arguments.length; L++) {
    var J = arguments[L] != null ? arguments[L] : {};
    L % 2 ? V1(Object(J), !0).forEach(function(g) {
      b2(R, g, J[g]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(R, Object.getOwnPropertyDescriptors(J)) : V1(Object(J)).forEach(function(g) {
      Object.defineProperty(R, g, Object.getOwnPropertyDescriptor(J, g));
    });
  }
  return R;
}
function b2(R, L, J) {
  return L = S2(L), L in R ? Object.defineProperty(R, L, { value: J, enumerable: !0, configurable: !0, writable: !0 }) : R[L] = J, R;
}
function S2(R) {
  var L = T2(R, "string");
  return typeof L == "symbol" ? L : L + "";
}
function T2(R, L) {
  if (typeof R != "object" || !R) return R;
  var J = R[Symbol.toPrimitive];
  if (J !== void 0) {
    var g = J.call(R, L);
    if (typeof g != "object") return g;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (L === "string" ? String : Number)(R);
}
function J1(R) {
  return R && R.map((L, J) => /* @__PURE__ */ Ea.createElement(L.tag, iv({
    key: J
  }, L.attr), J1(L.child)));
}
function cv(R) {
  return (L) => /* @__PURE__ */ Ea.createElement(E2, uv({
    attr: iv({}, R.attr)
  }, L), J1(R.child));
}
function E2(R) {
  var L = (J) => {
    var {
      attr: g,
      size: k,
      title: ie
    } = R, Xe = v2(R, p2), De = k || J.size || "1em", Z;
    return J.className && (Z = J.className), R.className && (Z = (Z ? Z + " " : "") + R.className), /* @__PURE__ */ Ea.createElement("svg", uv({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, J.attr, g, Xe, {
      className: Z,
      style: iv(iv({
        color: R.color || J.color
      }, J.style), R.style),
      height: De,
      width: De,
      xmlns: "http://www.w3.org/2000/svg"
    }), ie && /* @__PURE__ */ Ea.createElement("title", null, ie), R.children);
  };
  return G1 !== void 0 ? /* @__PURE__ */ Ea.createElement(G1.Consumer, null, (J) => L(J)) : L(Z1);
}
function ip(R) {
  return cv({ attr: { version: "1.2", baseProfile: "tiny", viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { d: "M5.8 9.7l6.2 6.3 6.2-6.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-11c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7s.1.5.3.7z" }, child: [] }] })(R);
}
const x2 = ({
  input_rc: R,
  input_tr: L,
  input_mic: J,
  select_headphones: g,
  qty_headphones: k,
  select_charger: ie,
  setReceivers: Xe,
  setTransmitters: De,
  setMicrophones: Z,
  setHeadphonesType: Qe,
  setHeadphonesQty: be,
  setCharger: P,
  calculatorConfig: ee
}) => /* @__PURE__ */ E.jsxs("div", { className: "space-y-6", children: [
  /* @__PURE__ */ E.jsx("div", { children: /* @__PURE__ */ E.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5", children: [
    /* @__PURE__ */ E.jsxs("div", { children: [
      /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Приёмники" }),
      /* @__PURE__ */ E.jsx("div", { className: "flex h-12 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ E.jsx(
        "input",
        {
          type: "text",
          value: R === 0 ? "" : R,
          onChange: (de) => {
            const Se = de.target.value;
            /^\d*$/.test(Se) && Xe(Number(Se));
          },
          className: "flex-1 px-5 border-none outline-none",
          placeholder: "0"
        }
      ) })
    ] }),
    /* @__PURE__ */ E.jsxs("div", { children: [
      /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Передатчики" }),
      /* @__PURE__ */ E.jsx("div", { className: "flex h-12 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ E.jsx(
        "input",
        {
          type: "text",
          value: L === 0 ? "" : L,
          onChange: (de) => {
            const Se = de.target.value;
            /^\d*$/.test(Se) && De(Number(Se));
          },
          className: "flex-1 px-5 border-none outline-none",
          placeholder: "0"
        }
      ) })
    ] }),
    /* @__PURE__ */ E.jsxs("div", { children: [
      /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Микрофон" }),
      /* @__PURE__ */ E.jsx("div", { className: "flex h-12 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ E.jsx(
        "input",
        {
          type: "text",
          value: J === 0 ? "" : J,
          onChange: (de) => {
            const Se = de.target.value;
            /^\d*$/.test(Se) && Z(Number(Se));
          },
          className: "flex-1 border-none outline-none px-5",
          placeholder: "0"
        }
      ) })
    ] })
  ] }) }),
  /* @__PURE__ */ E.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5", children: [
    /* @__PURE__ */ E.jsxs("div", { children: [
      /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Наушники" }),
      /* @__PURE__ */ E.jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ E.jsxs(
          "select",
          {
            value: g ?? "",
            onChange: (de) => Qe(de.target.value ? de.target.value : null),
            className: "w-full h-12 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
            children: [
              /* @__PURE__ */ E.jsx("option", { value: "", children: "Не выбрано" }),
              /* @__PURE__ */ E.jsx("option", { value: "in_ear", children: "Вкладыши" }),
              /* @__PURE__ */ E.jsx("option", { value: "on_ear", children: "Накладные" }),
              /* @__PURE__ */ E.jsx("option", { value: "over_ear", children: "Полноразмерные" })
            ]
          }
        ),
        /* @__PURE__ */ E.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ E.jsx(ip, {}) })
      ] }),
      g && /* @__PURE__ */ E.jsx("div", { className: "flex h-12 items-center border border-black rounded-lg overflow-hidden mt-2", children: /* @__PURE__ */ E.jsx(
        "input",
        {
          type: "text",
          value: k === 0 ? "" : k,
          onChange: (de) => {
            const Se = de.target.value;
            /^\d*$/.test(Se) && be(Number(de.target.value));
          },
          className: "flex-1 border-none outline-none px-5",
          placeholder: "0"
        }
      ) })
    ] }),
    /* @__PURE__ */ E.jsxs("div", { children: [
      /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Зарядное устройство" }),
      /* @__PURE__ */ E.jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ E.jsxs(
          "select",
          {
            value: ie ?? "",
            onChange: (de) => P(de.target.value ? Number(de.target.value) : null),
            className: "w-full h-12 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
            children: [
              /* @__PURE__ */ E.jsx("option", { value: "", children: "Не выбрано" }),
              Object.keys(ee.sku.charger).map((de) => /* @__PURE__ */ E.jsx("option", { value: de, children: ee.sku.charger[Number(de)].name }, de))
            ]
          }
        ),
        /* @__PURE__ */ E.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ E.jsx(ip, {}) })
      ] })
    ] })
  ] })
] }), A2 = ({
  input_rc: R,
  select_headphones: L,
  setReceivers: J,
  setHeadphonesType: g
}) => /* @__PURE__ */ E.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ E.jsx("div", { children: /* @__PURE__ */ E.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
  /* @__PURE__ */ E.jsxs("div", { children: [
    /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Количество аудиогидов" }),
    /* @__PURE__ */ E.jsx("div", { className: "flex h-12 items-center border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ E.jsx(
      "input",
      {
        type: "text",
        value: R === 0 ? "" : R,
        onChange: (k) => {
          const ie = k.target.value;
          /^\d*$/.test(ie) && J(Number(ie));
        },
        className: "flex-1 border-none outline-none px-5",
        placeholder: "0"
      }
    ) })
  ] }),
  /* @__PURE__ */ E.jsxs("div", { children: [
    /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Наушники" }),
    /* @__PURE__ */ E.jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ E.jsxs(
        "select",
        {
          value: L ?? "",
          onChange: (k) => g(k.target.value ? k.target.value : null),
          className: "w-full h-12 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
          children: [
            /* @__PURE__ */ E.jsx("option", { value: "", children: "Не выбрано" }),
            /* @__PURE__ */ E.jsx("option", { value: "in_ear", children: "Вкладыши" }),
            /* @__PURE__ */ E.jsx("option", { value: "on_ear", children: "Накладные" }),
            /* @__PURE__ */ E.jsx("option", { value: "over_ear", children: "Полноразмерные" })
          ]
        }
      ),
      /* @__PURE__ */ E.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ E.jsx(ip, {}) })
    ] })
  ] })
] }) }) }), R2 = ({
  select_headphones: R,
  qty_headphones: L,
  setHeadphonesType: J,
  setHeadphonesQty: g
}) => /* @__PURE__ */ E.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ E.jsx("div", { children: /* @__PURE__ */ E.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
  /* @__PURE__ */ E.jsxs("div", { children: [
    /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Тип наушников" }),
    /* @__PURE__ */ E.jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ E.jsxs(
        "select",
        {
          value: R ?? "",
          onChange: (k) => J(k.target.value ? k.target.value : null),
          className: "w-full h-12 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
          children: [
            /* @__PURE__ */ E.jsx("option", { value: "", children: "Не выбрано" }),
            /* @__PURE__ */ E.jsx("option", { value: "in_ear", children: "Вкладыши" }),
            /* @__PURE__ */ E.jsx("option", { value: "on_ear", children: "Накладные" }),
            /* @__PURE__ */ E.jsx("option", { value: "over_ear", children: "Полноразмерные" })
          ]
        }
      ),
      /* @__PURE__ */ E.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ E.jsx(ip, {}) })
    ] })
  ] }),
  /* @__PURE__ */ E.jsxs("div", { children: [
    /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Количество" }),
    /* @__PURE__ */ E.jsx("div", { className: "flex items-center h-12 border border-black rounded-lg overflow-hidden", children: /* @__PURE__ */ E.jsx(
      "input",
      {
        type: "text",
        value: L === 0 ? "" : L,
        onChange: (k) => {
          const ie = k.target.value;
          /^\d*$/.test(ie) && g(Number(k.target.value));
        },
        className: "flex-1 border-none outline-none px-5",
        placeholder: "0"
      }
    ) })
  ] })
] }) }) });
function X1(R) {
  return cv({ attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z" }, child: [] }] })(R);
}
function z2(R) {
  return cv({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" }, child: [] }] })(R);
}
function D2(R) {
  return cv({ attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" }, child: [] }] })(R);
}
const O2 = ({
  isOpen: R,
  onClose: L,
  orderItems: J,
  userInfo: g,
  onUserInfoChange: k,
  onUpdateQuantity: ie,
  onRemoveItem: Xe,
  onSubmit: De,
  formatPrice: Z
}) => {
  if (!R) return null;
  const Qe = () => J.reduce((P, ee) => P + ee.price * ee.quantity, 0), be = () => {
    L(), k({ name: "", email: "", phone: "+7" });
  };
  return /* @__PURE__ */ E.jsx(
    "div",
    {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      onClick: be,
      children: /* @__PURE__ */ E.jsxs(
        "div",
        {
          className: "bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto",
          onClick: (P) => P.stopPropagation(),
          children: [
            /* @__PURE__ */ E.jsxs("div", { className: "flex justify-between items-center p-6 border-b", children: [
              /* @__PURE__ */ E.jsx("h2", { className: "text-2xl font-bold", children: "Ваш заказ:" }),
              /* @__PURE__ */ E.jsx(
                "button",
                {
                  onClick: be,
                  className: "text-gray-500 hover:text-gray-700",
                  children: /* @__PURE__ */ E.jsx(X1, { size: 24 })
                }
              )
            ] }),
            /* @__PURE__ */ E.jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ E.jsxs("div", { className: "space-y-4", children: [
                J.map((P) => /* @__PURE__ */ E.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between p-4 border rounded-lg",
                    children: [
                      /* @__PURE__ */ E.jsxs("div", { className: "flex items-center space-x-4", children: [
                        /* @__PURE__ */ E.jsx("div", { className: "w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xl", children: P.image }),
                        /* @__PURE__ */ E.jsxs("div", { children: [
                          /* @__PURE__ */ E.jsx("h4", { className: "font-semibold", children: P.name }),
                          /* @__PURE__ */ E.jsxs("p", { className: "text-sm text-gray-600", children: [
                            "(",
                            P.sku,
                            ")"
                          ] }),
                          /* @__PURE__ */ E.jsxs("p", { className: "text-sm text-gray-500", children: [
                            Z(P.price),
                            " за шт."
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ E.jsxs("div", { className: "flex items-center space-x-3", children: [
                        /* @__PURE__ */ E.jsxs("div", { className: "flex items-center border border-black rounded-lg overflow-hidden", children: [
                          /* @__PURE__ */ E.jsx(
                            "button",
                            {
                              className: "p-2 hover:bg-gray-100 disabled:opacity-50",
                              onClick: () => ie(P.id, P.quantity - 1),
                              disabled: P.quantity <= 1,
                              children: /* @__PURE__ */ E.jsx(z2, { size: 12 })
                            }
                          ),
                          /* @__PURE__ */ E.jsx("span", { className: "px-3 py-1 min-w-[2rem] text-center", children: P.quantity }),
                          /* @__PURE__ */ E.jsx(
                            "button",
                            {
                              className: "p-2 hover:bg-gray-100",
                              onClick: () => ie(P.id, P.quantity + 1),
                              children: /* @__PURE__ */ E.jsx(D2, { size: 12 })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ E.jsx("div", { className: "text-right min-w-[4rem]", children: /* @__PURE__ */ E.jsx("p", { className: "font-semibold", children: Z(P.price * P.quantity) }) }),
                        /* @__PURE__ */ E.jsx(
                          "button",
                          {
                            className: "text-red-500 hover:text-red-700 p-2",
                            onClick: () => Xe(P.id),
                            children: /* @__PURE__ */ E.jsx(X1, { size: 16 })
                          }
                        )
                      ] })
                    ]
                  },
                  P.id
                )),
                J.length === 0 && /* @__PURE__ */ E.jsxs("div", { className: "text-center py-8 text-gray-500", children: [
                  /* @__PURE__ */ E.jsx("p", { children: "Корзина пуста" }),
                  /* @__PURE__ */ E.jsx("p", { className: "text-sm", children: "Добавьте товары для оформления заказа" })
                ] })
              ] }),
              J.length > 0 && /* @__PURE__ */ E.jsx("div", { className: "mt-6 p-4 bg-gray-50 rounded-lg", children: /* @__PURE__ */ E.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ E.jsx("span", { className: "font-semibold", children: "Подытог заказа:" }),
                /* @__PURE__ */ E.jsx("span", { className: "font-bold text-lg", children: Z(Qe()) })
              ] }) })
            ] }),
            /* @__PURE__ */ E.jsxs("div", { className: "p-6 border-t", children: [
              /* @__PURE__ */ E.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Контактная информация" }),
              /* @__PURE__ */ E.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ E.jsxs("div", { children: [
                  /* @__PURE__ */ E.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Ваше имя" }),
                  /* @__PURE__ */ E.jsx(
                    "input",
                    {
                      type: "text",
                      value: g.name,
                      onChange: (P) => k({ ...g, name: P.target.value }),
                      placeholder: "Введите имя",
                      className: "w-full h-12 rounded-lg outline-none border border-black px-3"
                    }
                  )
                ] }),
                /* @__PURE__ */ E.jsxs("div", { children: [
                  /* @__PURE__ */ E.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Ваш Email" }),
                  /* @__PURE__ */ E.jsx(
                    "input",
                    {
                      type: "email",
                      value: g.email,
                      onChange: (P) => k({ ...g, email: P.target.value }),
                      placeholder: "Введите Email",
                      className: "w-full h-12 rounded-lg outline-none border border-black px-3"
                    }
                  )
                ] }),
                /* @__PURE__ */ E.jsxs("div", { children: [
                  /* @__PURE__ */ E.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Ваш телефон" }),
                  /* @__PURE__ */ E.jsxs("div", { className: "flex", children: [
                    /* @__PURE__ */ E.jsxs("div", { className: "flex items-center border border-black rounded-l-lg px-3 bg-gray-50", children: [
                      /* @__PURE__ */ E.jsx("span", { className: "text-sm", children: "🇷🇺" }),
                      /* @__PURE__ */ E.jsxs(
                        "select",
                        {
                          className: "ml-2 bg-transparent border-none outline-none",
                          value: g.phone.startsWith("+7") ? "+7" : g.phone.startsWith("+998") ? "+998" : "+1",
                          onChange: (P) => {
                            const ee = P.target.value, de = g.phone.replace(/^\+\d+/, "");
                            k({
                              ...g,
                              phone: ee + de
                            });
                          },
                          children: [
                            /* @__PURE__ */ E.jsx("option", { value: "+7", children: "+7" }),
                            /* @__PURE__ */ E.jsx("option", { value: "+998", children: "+998" }),
                            /* @__PURE__ */ E.jsx("option", { value: "+1", children: "+1" })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ E.jsx(
                      "input",
                      {
                        type: "tel",
                        value: g.phone.replace(/^\+\d+/, ""),
                        onChange: (P) => {
                          const ee = g.phone.startsWith("+7") ? "+7" : g.phone.startsWith("+998") ? "+998" : "+1";
                          k({
                            ...g,
                            phone: ee + P.target.value
                          });
                        },
                        placeholder: "(000) 000-00-00",
                        className: "flex-1 h-12 border border-black border-l-0 rounded-r-lg px-3 outline-none"
                      }
                    )
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ E.jsx("div", { className: "p-6 border-t", children: /* @__PURE__ */ E.jsx(
              "button",
              {
                onClick: De,
                disabled: J.length === 0,
                className: "w-full h-14 bg-custom-gradient cursor-pointer text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed",
                children: J.length === 0 ? "Корзина пуста" : "Заказать"
              }
            ) })
          ]
        }
      )
    }
  );
}, M2 = ({
  isOpen: R,
  onClose: L,
  webhookUrl: J,
  onWebhookUrlChange: g,
  onSubmit: k
}) => R ? /* @__PURE__ */ E.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ E.jsxs("div", { className: "bg-white p-6 rounded-lg max-w-md w-full mx-4", children: [
  /* @__PURE__ */ E.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Отправить заявку" }),
  /* @__PURE__ */ E.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ E.jsxs("div", { children: [
      /* @__PURE__ */ E.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "URL Webhook (CRM/Bitrix24)" }),
      /* @__PURE__ */ E.jsx(
        "input",
        {
          type: "url",
          value: J,
          onChange: (ie) => g(ie.target.value),
          placeholder: "https://your-domain.com/webhook",
          className: "w-full h-12 rounded-lg outline-none border border-black px-3"
        }
      )
    ] }),
    /* @__PURE__ */ E.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ E.jsx(
        "button",
        {
          onClick: k,
          className: "flex-1 h-12 px-6 rounded-lg bg-custom-gradient cursor-pointer text-white",
          children: "Отправить"
        }
      ),
      /* @__PURE__ */ E.jsx(
        "button",
        {
          onClick: L,
          className: "flex-1 h-12 px-6 rounded-lg border border-black hover:bg-gray-50",
          children: "Отмена"
        }
      )
    ] })
  ] })
] }) }) : null, U2 = () => {
  const [R, L] = tp(0), [J, g] = tp(""), [k, ie] = tp(!1), [Xe, De] = tp(!1), [Z, Qe] = tp({
    name: "",
    email: "",
    phone: "+7"
  }), {
    // inputs
    select_delivery: be,
    input_rc: P,
    input_tr: ee,
    input_mic: de,
    select_headphones: Se,
    qty_headphones: bt,
    select_charger: $e,
    promo: Je,
    vatIncluded: sl,
    vatRate: ft,
    bundles: it,
    // totals
    total: Qt,
    subtotal: Ie,
    volumeDiscountAmount: Be,
    promoDiscountAmount: Yt,
    shippingCost: ce,
    vatAmount: yt,
    // setters
    setDelivery: We,
    setReceivers: pe,
    setTransmitters: Mt,
    setMicrophones: Lt,
    setHeadphonesType: St,
    setHeadphonesQty: z,
    setCharger: Q,
    setPromo: $,
    setVatIncluded: fe,
    setVatRate: _,
    setBundles: le,
    // actions
    clearCart: F,
    sendToWebhook: he,
    addToCart: Ue
  } = y2(), Ke = (Oe) => new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB"
  }).format(Oe), qe = async () => {
    if (!J.trim()) {
      alert("Пожалуйста, введите URL webhook");
      return;
    }
    try {
      await he(J), alert("Заявка успешно отправлена!"), ie(!1), g("");
    } catch (Oe) {
      console.error("Webhook error:", Oe), alert("Произошла ошибка при отправке заявки.");
    }
  }, fn = () => {
    if (!Z.name.trim()) {
      alert("Пожалуйста, введите ваше имя");
      return;
    }
    if (!Z.email.trim() || !Z.email.includes("@")) {
      alert("Пожалуйста, введите корректный email");
      return;
    }
    if (Z.phone.replace(/^\+\d+/, "").length < 10) {
      alert("Пожалуйста, введите корректный номер телефона");
      return;
    }
    console.log("Order submitted:", {
      userInfo: Z,
      order: {
        delivery: be,
        receivers: P,
        transmitters: ee,
        microphones: de,
        headphones: { type: Se, quantity: bt },
        charger: $e,
        total: Qt,
        bundles: it
      }
    }), alert("Заказ успешно оформлен!"), De(!1), Qe({ name: "", email: "", phone: "+7" });
  }, Tt = () => {
    try {
      Ue(), De(!0);
    } catch (Oe) {
      console.error("Ошибка корзины:", Oe), alert("Произошла ошибка при добавлении в корзину");
    }
  }, Zt = () => {
    const Oe = [];
    return ee > 0 && Oe.push({
      id: "transmitter",
      name: "Передатчик",
      sku: "radiosync-x",
      quantity: ee,
      price: el.sku.transmitter.unitPrice,
      image: "🔴"
    }), P > 0 && Oe.push({
      id: "receiver",
      name: "Приёмник",
      sku: "radiosync-r",
      quantity: P,
      price: el.sku.receiver.unitPrice,
      image: "🔵"
    }), de > 0 && Oe.push({
      id: "microphone",
      name: "Микрофон",
      sku: "radiosync-m",
      quantity: de,
      price: el.sku.microphone.unitPrice,
      image: "🎤"
    }), Se && bt > 0 && Oe.push({
      id: "headphones",
      name: `Наушники (${el.sku.headphones[Se].name})`,
      sku: "radiosync-h",
      quantity: bt,
      price: el.sku.headphones[Se].unitPrice,
      image: "🎧"
    }), $e && Oe.push({
      id: "charger",
      name: `Зарядное устройство на ${$e}`,
      sku: "radiosync-c",
      quantity: 1,
      price: el.sku.charger[$e].unitPrice,
      image: "🔌"
    }), Oe;
  }, Xl = (Oe, Xa) => {
    if (!(Xa < 0))
      switch (Oe) {
        case "transmitter":
          Mt(Xa);
          break;
        case "receiver":
          pe(Xa);
          break;
        case "microphone":
          Lt(Xa);
          break;
        case "headphones":
          z(Xa);
          break;
      }
  }, eu = (Oe) => {
    switch (Oe) {
      case "transmitter":
        Mt(0);
        break;
      case "receiver":
        pe(0);
        break;
      case "microphone":
        Lt(0);
        break;
      case "headphones":
        z(0), St(null);
        break;
      case "charger":
        Q(null);
        break;
    }
  }, Di = [
    {
      id: 0,
      name: "Радиогид",
      component: /* @__PURE__ */ E.jsx(
        x2,
        {
          input_rc: P,
          input_tr: ee,
          input_mic: de,
          select_headphones: Se,
          qty_headphones: bt,
          select_charger: $e,
          setReceivers: pe,
          setTransmitters: Mt,
          setMicrophones: Lt,
          setHeadphonesType: St,
          setHeadphonesQty: z,
          setCharger: Q,
          calculatorConfig: el
        }
      )
    },
    {
      id: 1,
      name: "Аудиогид",
      component: /* @__PURE__ */ E.jsx(
        A2,
        {
          input_rc: P,
          select_headphones: Se,
          setReceivers: pe,
          setHeadphonesType: St
        }
      )
    },
    {
      id: 2,
      name: "Наушники",
      component: /* @__PURE__ */ E.jsx(
        R2,
        {
          select_headphones: Se,
          qty_headphones: bt,
          setHeadphonesType: St,
          setHeadphonesQty: z
        }
      )
    }
  ];
  return /* @__PURE__ */ E.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 py-6", children: [
    /* @__PURE__ */ E.jsx("div", { className: "flex justify-center items-center md:max-w-2xl mx-auto", children: /* @__PURE__ */ E.jsx("h1", { className: "text-2xl md:text-3xl lg:text-5xl font-semibold mb-8 text-center", children: "Соберите свой комплект оборудования" }) }),
    /* @__PURE__ */ E.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ E.jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ E.jsxs("div", { children: [
          /* @__PURE__ */ E.jsx("h2", { className: "text-xl md:text-2xl font-semibold mb-4", children: "Выберите продукт" }),
          /* @__PURE__ */ E.jsx("nav", { className: "flex items-center justify-center sm:justify-start gap-2 flex-wrap", children: Di.map((Oe) => /* @__PURE__ */ E.jsx(
            "button",
            {
              onClick: () => L(Oe.id),
              className: `py-2 px-1 font-medium text-sm h-14 w-full xxs:max-w-[199px] rounded-2xl cursor-pointer ${R === Oe.id ? "bg-custom-gradient text-white" : "bg-[#e5ebee]"}`,
              children: Oe.name
            },
            Oe.id
          )) }),
          /* @__PURE__ */ E.jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ E.jsxs("div", { className: " mb-3", children: [
              /* @__PURE__ */ E.jsx("h3", { className: "md:text-lg font-semibold mb-3", children: "Доставка" }),
              /* @__PURE__ */ E.jsxs("div", { className: "relative w-full", children: [
                /* @__PURE__ */ E.jsxs(
                  "select",
                  {
                    value: be,
                    onChange: (Oe) => We(Oe.target.value),
                    className: "w-full h-12 rounded-lg outline-none border border-black px-3 appearance-none pr-10",
                    children: [
                      /* @__PURE__ */ E.jsx("option", { value: "moscow", children: "Москва" }),
                      /* @__PURE__ */ E.jsx("option", { value: "rf", children: "Другая РФ" }),
                      /* @__PURE__ */ E.jsx("option", { value: "world", children: "Другая страна" })
                    ]
                  }
                ),
                /* @__PURE__ */ E.jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none", children: /* @__PURE__ */ E.jsx(ip, {}) })
              ] })
            ] }),
            Di[R].component
          ] })
        ] }),
        /* @__PURE__ */ E.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ E.jsxs("div", { children: [
            /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Промокод" }),
            /* @__PURE__ */ E.jsx("div", { className: "flex h-12 items-center border border-black rounded-lg overflow-hidden mt-2", children: /* @__PURE__ */ E.jsx(
              "input",
              {
                type: "text",
                value: Je,
                onChange: (Oe) => $(Oe.target.value),
                className: "flex-1 border-none outline-none px-5",
                placeholder: "0"
              }
            ) })
          ] }),
          /* @__PURE__ */ E.jsxs("div", { children: [
            /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "НДС" }),
            /* @__PURE__ */ E.jsxs("div", { className: "flex items-center h-10 gap-3", children: [
              /* @__PURE__ */ E.jsxs("label", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ E.jsx("input", { type: "checkbox", checked: sl, onChange: (Oe) => fe(Oe.target.checked) }),
                /* @__PURE__ */ E.jsx("span", { className: "text-sm", children: "цены с НДС" })
              ] }),
              /* @__PURE__ */ E.jsx("input", { type: "number", min: 0, max: 100, step: 0.1, value: ft, onChange: (Oe) => _(Number(Oe.target.value)), className: "w-24 h-10 rounded-lg border border-black px-2" }),
              /* @__PURE__ */ E.jsx("span", { className: "text-sm", children: "%" })
            ] })
          ] }),
          /* @__PURE__ */ E.jsxs("div", { children: [
            /* @__PURE__ */ E.jsx("div", { className: "md:text-lg font-semibold mb-1", children: "Кол-во комплектов" }),
            /* @__PURE__ */ E.jsx("div", { className: "flex h-12 items-center border border-black rounded-lg overflow-hidden mt-2", children: /* @__PURE__ */ E.jsx(
              "input",
              {
                type: "text",
                value: it === 0 ? "" : it,
                onChange: (Oe) => {
                  const Xa = Oe.target.value;
                  /^\d*$/.test(Xa) && le(Number(Oe.target.value));
                },
                className: "flex-1 border-none outline-none px-5",
                placeholder: "0"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ E.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
          /* @__PURE__ */ E.jsx("button", { onClick: () => De(!0), className: "h-12 px-6 rounded-lg bg-primary-600 text-white hover:bg-primary-700", children: "Оформить заказ" }),
          /* @__PURE__ */ E.jsx("button", { onClick: () => ie(!0), className: "h-12 px-6 rounded-lg bg-custom-gradient cursor-pointer text-white ", children: "Отправить заявку" }),
          /* @__PURE__ */ E.jsx("button", { onClick: F, className: "h-12 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer", children: "Сбросить" })
        ] }),
        /* @__PURE__ */ E.jsx(
          M2,
          {
            isOpen: k,
            onClose: () => ie(!1),
            webhookUrl: J,
            onWebhookUrlChange: g,
            onSubmit: qe
          }
        ),
        /* @__PURE__ */ E.jsx(
          O2,
          {
            isOpen: Xe,
            onClose: () => De(!1),
            orderItems: Zt(),
            userInfo: Z,
            onUserInfoChange: Qe,
            onUpdateQuantity: Xl,
            onRemoveItem: eu,
            onSubmit: fn,
            formatPrice: Ke
          }
        )
      ] }),
      /* @__PURE__ */ E.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ E.jsxs("div", { className: "lg:sticky lg:top-6 border border-gray-200 rounded-xl p-6 bg-white shadow-sm", children: [
        /* @__PURE__ */ E.jsx("div", { className: "text-xl font-semibold mb-6 text-gray-800", children: "Итого" }),
        /* @__PURE__ */ E.jsxs("div", { className: "space-y-3 mb-6", children: [
          /* @__PURE__ */ E.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
            /* @__PURE__ */ E.jsx("span", { children: "Подытог:" }),
            /* @__PURE__ */ E.jsx("span", { children: Ke(Ie || 0) })
          ] }),
          Be > 0 && /* @__PURE__ */ E.jsxs("div", { className: "flex justify-between text-sm text-green-600", children: [
            /* @__PURE__ */ E.jsx("span", { children: "Скидка за объём:" }),
            /* @__PURE__ */ E.jsxs("span", { children: [
              "-",
              Ke(Be)
            ] })
          ] }),
          Yt > 0 && /* @__PURE__ */ E.jsxs("div", { className: "flex justify-between text-sm text-green-600", children: [
            /* @__PURE__ */ E.jsx("span", { children: "Промокод:" }),
            /* @__PURE__ */ E.jsxs("span", { children: [
              "-",
              Ke(Yt)
            ] })
          ] }),
          ce > 0 && /* @__PURE__ */ E.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
            /* @__PURE__ */ E.jsx("span", { children: "Доставка:" }),
            /* @__PURE__ */ E.jsx("span", { children: Ke(ce) })
          ] }),
          yt > 0 && /* @__PURE__ */ E.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
            /* @__PURE__ */ E.jsxs("span", { children: [
              "НДС (",
              ft,
              "%):"
            ] }),
            /* @__PURE__ */ E.jsx("span", { children: Ke(yt) })
          ] }),
          /* @__PURE__ */ E.jsx("hr", { className: "border-gray-200" })
        ] }),
        /* @__PURE__ */ E.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ E.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ E.jsx("span", { className: "text-lg font-medium text-gray-800", children: "Итого" }),
            /* @__PURE__ */ E.jsx("span", { className: "text-3xl font-bold text-primary-600", children: Ke(Qt) })
          ] }),
          it > 1 && /* @__PURE__ */ E.jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
            "За ",
            it,
            " комплект",
            it > 1 ? it > 4 ? "ов" : "а" : ""
          ] })
        ] }),
        /* @__PURE__ */ E.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ E.jsx(
            "button",
            {
              onClick: () => De(!0),
              className: "w-full h-12 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors",
              children: "ОФОРМИТЬ ЗАКАЗ"
            }
          ),
          /* @__PURE__ */ E.jsx(
            "button",
            {
              onClick: Tt,
              className: "w-full h-10 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors",
              children: "В корзину"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
};
class K1 extends HTMLElement {
  root = null;
  container = null;
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.init();
  }
  disconnectedCallback() {
    this.root && this.root.unmount();
  }
  async init() {
    try {
      this.container = document.createElement("div"), this.container.id = "calculator-widget-container", this.shadowRoot.appendChild(this.container);
      const L = document.createElement("style");
      L.textContent = this.getWidgetStyles(), this.shadowRoot.appendChild(L), this.root = i2.createRoot(this.container), this.root.render(Ea.createElement(U2));
    } catch (L) {
      console.error("Calculator widget initialization error:", L), this.showError();
    }
  }
  getWidgetStyles() {
    return `
      /* Reset styles for widget */
      #calculator-widget-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        line-height: 1.5;
        color: #333;
        box-sizing: border-box;
      }

      #calculator-widget-container *,
      #calculator-widget-container *::before,
      #calculator-widget-container *::after {
        box-sizing: border-box;
      }

      /* Widget specific styles */
      #calculator-widget-container {
        max-width: 100%;
        margin: 0 auto;
        padding: 0;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        #calculator-widget-container {
          padding: 0 10px;
        }
      }
    `;
  }
  showError() {
    this.container && (this.container.innerHTML = `
        <div style="
          padding: 20px;
          text-align: center;
          color: #e53e3e;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          background: #fef5f5;
        ">
          <h3>Ошибка загрузки калькулятора</h3>
          <p>Пожалуйста, обновите страницу или попробуйте позже.</p>
        </div>
      `);
  }
}
customElements.get("calculator-widget") || customElements.define("calculator-widget", K1);
window.CalculatorWidget = K1;
typeof window < "u" && (window.CalculatorWidget = window.CalculatorWidget || {});
export {
  K1 as CalculatorWidget
};
