/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = {};

EX.str = function (x) {
  try {
    return String(x);
  } catch (err) {
    return '[cannot String(): ' + (err.message || err) + ']';
  }
};


EX.str.preview = function (x) {
  return EX.str(x).slice(0, 256).replace(/\s+/g, ' ').slice(0, 128);
};


EX.each = function (d, f) {
  return function (x, i, l) {
    try {
      return f(x, i, l);
    } catch (e) {
      e.message += ' at ' + d + '[' + i + '] = ' + EX.str.preview(x);
      throw e;
    }
  };
};








module.exports = EX;
