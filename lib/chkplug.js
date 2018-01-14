/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = {}, dare = require('./dare'), prvw = dare.str.preview,
  absUrlOrPathRgx = /^(?:[\w\-]+:|)\//;

function isStr(x, no) { return (((typeof x) === 'string') || no); }
function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }


EX.validateSrcUrl = function (srcUrl) {
  if (!isStr(srcUrl)) { throw new TypeError('srcUrl must be a string'); }
  if (!absUrlOrPathRgx.exec(srcUrl)) {
    throw new Error('srcUrl must be absolute');
  }
  return srcUrl;
};


EX.validatePlug = function (plug) {
  if (!plug) {
    throw new TypeError('plug must be an Object, not ' + plug);
  }
  if (!ifFun(plug.install)) {
    throw new TypeError('installFunc must be a function, not ' + plug.install);
  }
  return plug;
};











module.exports = EX;
