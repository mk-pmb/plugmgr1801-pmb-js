/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }

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
  if (!ifFun(installFunc)) {
    throw new TypeError('installFunc must be a function, not ' + installFunc);
  }

  var plug = Object.assign({ jsModule: jsModule, install: installFunc }, meta);
  if (!plug.srcUrl) {
    plug.srcUrl = (module.filename || ('/?#' + anonFileCounter())
      ).replace(/^file:\/+/, '/');
  }

  return plug;
};




module.exports = EX;
