/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var CF, PT, isAry = Array.isArray,
  absUrlRgx = /^(?:[\w\-]+:|)\//;


function isStr(x, no) { return (((typeof x) === 'string') || no); }
function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }


function anonFileCounter() {
  // Deliberately not using maxuniqid: Even if you do have enough
  // RAM for MAX_SAFE_INT installFuncs, just don't.
  var n = (anonFileCounter.n || 0);
  anonFileCounter.n = n + 1;
  return n;
}


CF = function PlugList() {
  if (!(this instanceof CF)) { return new CF(); }
  /*jslint nomen:true */
  if (CF.super_) { CF.super_.apply(this, arguments); }
  /*jslint nomen:false */
  this.plugs = [];
  this.plugs.bySrcUrl = {};
  this.plugConfigs = {};
};
// util.inherits(CF, events.EventEmitter);
PT = CF.prototype;


PT.toString = function () {
  return '['.concat(this.constructor.name, ' ', this.name, ']');
};


PT.has = function (plug) {
  var srcUrl = plug.srcUrl, pHave = this.plugs,
    has = pHave.bySrcUrl[srcUrl];
  if (!isStr(srcUrl)) { throw new TypeError('srcUrl must be a string'); }
  if (!absUrlRgx.exec(srcUrl)) {
    throw new Error('srcUrl must be absolute');
  }
  return (has || false);
};


PT.add = function (pAdd) { return this.addWithConfig(null, pAdd); };


PT.addWithConfig = function awc(plugCfg, pAdd) {
  if (!pAdd) { throw new Error('Expected a(n Array of) plugin(s)'); }
  if (isAry(pAdd)) { return pAdd.forEach(awc.bind(this, plugCfg)); }
  var has = this.has(pAdd), pHave = this.plugs;
  if (has) {
    if (has !== pAdd) { throw new Error('srcUrl already occupied'); }
    return this;
  }
  pHave.push(pAdd);
  pHave.bySrcUrl[pAdd.srcUrl] = pAdd;
  if (plugCfg) { this.plugConfigs[pAdd.srcUrl] = plugCfg; }
  return this;
};


PT.installAllOnto = function (app, appCfg) {
  var cfgs = this.plugConfigs;
  this.plugs.forEach(function (plug) {
    plug.install(app, (cfgs[plug.srcUrl] || appCfg), appCfg);
  });
  return this;
};












module.exports = CF;
