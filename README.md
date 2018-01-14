
<!--#echo json="package.json" key="name" underline="=" -->
plugmgr1801-pmb
===============
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Yet another plugin mechanism.
<!--/#echo -->


Usage
-----

from [test/foo-app.js](test/foo-app.js):

<!--#include file="test/foo-app.js" outdent="  " code="javascript"
  start="  // #BEGIN# usage demo" stop="  // #ENDOF# usage demo" -->
<!--#verbatim lncnt="11" -->
```javascript
var app = { name: 'Foo App', config: { fooSlot: 'qux' } },
  fooPlugin = require('./foo-plug'),
  plugMgr = require('plugmgr1801-pmb');

plugMgr.makePlugList().add([
  fooPlugin,
]).installAllOnto(app, app.config);

console.log(app.qux());   // prints "bar @ Foo App"
```
<!--/include-->

from [test/foo-plug.js](test/foo-plug.js):

<!--#include file="test/foo-plug.js" outdent="  " code="javascript"
  start="  // #BEGIN# usage demo" stop="  // #ENDOF# usage demo" -->
<!--#verbatim lncnt="17" -->
```javascript
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
```
<!--/include-->








Plugin Lists API
----------------


### plugList = plugMgr.makePlugList()

Prepare a new empty plugin list.


### plugList.add(plug)

Add a plugin, or multiple if an array of them is given.


### plugList.addWithConfig(config, plug)

Add one or more plugins with a custom `config` for all of them.


### plugList.installAllOnto(app[, appConfig])

Install all plugins in the list onto your `app`.
You may share your app's config with them if you like.





Plugin API
----------

### plug.srcUrl

A unique identifier string that looks like an URL or an absolute path.
Will be set by `plugify`.


### plug.name

Optional. Authors: How about a string?


### plug.apiVersion

Optional. Authors: How about a number? Then people can compare it with `>=`.


### plug.install(app, plugCfg, appCfg)

* `plugCfg` should default appCfg if no specific config was given.
* Plugins can expect safe property lookup on `plugCfg` and `appCfg`,
  i.e. neither of them is allowd to be `null` nor `undefined`.
  Usually they should be either an object or `false`.





<!--#toc stop="scan" -->


Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
