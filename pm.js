/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = function () { return EX.makePlugList(); };

EX.makePlugList = require('./lib/pluglist');
EX.definePlug = require('./plugify');

module.exports = EX;
