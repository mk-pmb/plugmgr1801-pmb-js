/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

(function readmeDemo() {
  // #BEGIN# usage demo
  var dfltCfg = { slot: 'foo' },
    meta = { defaultConfig: dfltCfg,
      descr: 'A nice foo for your app.',
      apiVersion: 1,
      };

  function install(app, plugCfg, appCfg) {
    if (plugCfg === appCfg) { plugCfg = false; }
    var slot = (plugCfg.slot
      || appCfg.fooSlot   // <-- that's why we checked above
      || dfltCfg.slot);
    app[slot] = function () { return 'bar @ ' + app.name; };
  }

  module.exports = require('plugmgr1801-pmb/plugify')(module, meta, install);
  // #ENDOF# usage demo
}());
