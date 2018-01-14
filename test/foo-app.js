/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var equal = require('assert').deepStrictEqual, cons = [];
cons.log = cons.push;

(function readmeDemo(console) {
  // #BEGIN# usage demo
  var app = { name: 'Foo App', config: { fooSlot: 'qux' } },
    fooPlugin = require('./foo-plug'),
    plugMgr = require('plugmgr1801-pmb');

  plugMgr.makePlugList().add([
    fooPlugin,
  ]).installAllOnto(app, app.config);

  console.log(app.qux());   // prints "bar @ Foo App"
  // #ENDOF# usage demo

  equal(fooPlugin.srcUrl, fooPlugin.jsModule.filename);
  equal(fooPlugin.srcUrl.slice(-17), '/test/foo-plug.js');
  equal(console.slice(), [ 'bar @ Foo App' ]);
}(cons));




console.log("+OK usage demo test passed.");   //= "+OK usage demo test passed."
