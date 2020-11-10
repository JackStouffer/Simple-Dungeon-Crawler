#! /bin/bash

npx babel src --out-dir test-dist -x .ts -x .js
grep -F -v 'use strict' test-dist/maps/durdwin_001.js > test-dist/maps/durdwin_001.js.tmp && mv test-dist/maps/durdwin_001.js.tmp test-dist/maps/durdwin_001.js
grep -F -v 'use strict' test-dist/maps/forrest_001.js > test-dist/maps/forrest_001.js.tmp && mv test-dist/maps/forrest_001.js.tmp test-dist/maps/forrest_001.js
grep -F -v 'use strict' test-dist/maps/dev_room.js > test-dist/maps/dev_room.js.tmp && mv test-dist/maps/dev_room.js.tmp test-dist/maps/dev_room.js
npx nyc mocha --require source-map-support/register tests/
npx eslint src/*.ts
