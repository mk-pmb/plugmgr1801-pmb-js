/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var chkPlug = require('./lib/chkplug'),
  hasOwn = Object.prototype.hasOwnProperty;

function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }

function pluginToString() {
  return '[plugin '.concat(this.name || '(anonymous)', ' from ', this.srcUrl);
}

function anonFileCounter() {
  // Deliberately not using maxuniqid: Even if you do have enough
  // RAM for MAX_SAFE_INT installFuncs, just don't.
  var n = (anonFileCounter.n || 0);
  anonFileCounter.n = n + 1;
  return n;
}


var EX = function plugify(jsModule, meta, installFunc) {
  if ((!installFunc) && ifFun(meta)) {
    installFunc = meta;
    meta = null;
  }
  var plug = Object.assign({ jsModule: jsModule, install: installFunc }, meta);
  if (!hasOwn.call(plug, 'srcUrl')) {
    plug.srcUrl = (jsModule.filename || ('/?#' + anonFileCounter())
      ).replace(/^file:\/+/, '/');
  }
  if (!hasOwn.call(plug, 'toString')) { plug.toString = pluginToString; }

  chkPlug.validatePlug(plug);
  return plug;
};




module.exports = EX;
