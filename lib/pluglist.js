/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var CF, PT, isAry = Array.isArray,
  dare = require('./dare'),
  chkPlug = require('./chkplug');


function isStr(x, no) { return (((typeof x) === 'string') || no); }
function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }


CF = function PlugList() {
  if (!(this instanceof CF)) { return new CF(); }
  /*jslint nomen:true */
  if (CF.super_) { CF.super_.apply(this, arguments); }
  /*jslint nomen:false */
  var pList = this;
  pList.plugs = [];
  pList.plugs.bySrcUrl = {};
  pList.plugConfigs = {};
};
// util.inherits(CF, events.EventEmitter);
PT = CF.prototype;


PT.toString = function () {
  return '['.concat(this.constructor.name, ' ', this.name, ']');
};


PT.add = function (pAdd) { return this.addWithConfig(null, pAdd); };


PT.addWithConfig = function awc(plugCfg, pAdd) {
  var pList = this, pHave = pList.plugs, srcUrl, has;
  if (!pAdd) { throw new Error('Expected a(n Array of) plugin(s)'); }
  if (isAry(pAdd)) {
    pAdd.forEach(dare.each('pluginsToBeAdded', awc.bind(pList, plugCfg)));
    return pList;
  }
  chkPlug.validatePlug(pAdd);
  srcUrl = pAdd.srcUrl;
  has = pHave.bySrcUrl[srcUrl];
  if (has) {
    if (has !== pAdd) { throw new Error('srcUrl already occupied'); }
    return pList;
  }
  pHave.push(pAdd);
  pHave.bySrcUrl[srcUrl] = pAdd;
  if (plugCfg) { pList.plugConfigs[srcUrl] = plugCfg; }
  return pList;
};


PT.installAllOnto = function (app, appCfg) {
  var pList = this, cfgs = pList.plugConfigs;
  pList.plugs.forEach(dare.each('pluginsToBeInstalled', function (plug) {
    plug.install(app,
      (cfgs[plug.srcUrl] || appCfg || false),
      (appCfg || false));
  }));
  return pList;
};


PT.loadStages = function (stages, overrides) {
  var pList = this;
  if (!overrides) { overrides = false; }
  stages.forEach(dare.each('pluginStage', function (stName) {
    pList.add(overrides[stName] || stages[stName]);
  }));
  return pList;
};











module.exports = CF;
