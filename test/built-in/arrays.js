const { describe, it } = require('mocha');
const assert = require('assert');
const esEval = require('../..');

describe('Built-in array features', function () {

  it('indexed access', function () {
    assert.deepStrictEqual(esEval('["a", "b"][1]'), 'b');
    assert.deepStrictEqual(esEval('["a", "b"][-1]'), void 0);
    assert.deepStrictEqual(esEval('["a", "b"][2]'), void 0);
    assert.deepStrictEqual(esEval('[][5]'), void 0);
    assert.deepStrictEqual(esEval('[123]["0"]'), 123);
    assert.deepStrictEqual(esEval('[123]["string key"]'), void 0);
    assert.deepStrictEqual(esEval('[][null]'), void 0);
  });

  it('length', function () {
    assert.deepStrictEqual(esEval('[].length'), 0);
    assert.deepStrictEqual(esEval('[6, 6, 6, 6].length'), 4);
    assert.deepStrictEqual(esEval('(() => { const a = [3, 4]; a.length = 8; return a.length; })()'), 8);
  });

  it('push', function () {
    // @todo add tests running methods on values like null (ex: 'null.push(5)') or getting props like null.length
    assert.deepStrictEqual(esEval('[].push(5)'), 1);
    assert.deepStrictEqual(esEval('[undefined].push(5)'), 2);
    assert.deepStrictEqual(esEval('[].push(6, 5, 4, 3, 2, 1)'), 6);
    assert.deepStrictEqual(esEval('[8, 7].push(6, 5, 4, 3, 2, 1)'), 8);
    assert.deepStrictEqual(esEval('(() => { const a = [7, 6]; const count = a.push(5); return { array: a, count: count }; })()'), { array: [7, 6, 5], count: 3 });
    assert.deepStrictEqual(esEval('(() => { const a = []; a.push(null, undefined, NaN, Infinity); return a; })()'), [null, void 0, NaN, Infinity]);
  });

  it('map', function () {
    // @todo add tests for the thisArg parameter when supported (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
    assert.deepStrictEqual(esEval('[].map(x => x)'), []);
    assert.deepStrictEqual(esEval('[3, 4, 5].map(x => x)'), [3, 4, 5]);
    assert.deepStrictEqual(esEval('[3, 4, 5].map(x => 2 * x)'), [6, 8, 10]);
    assert.deepStrictEqual(esEval('(() => { const a = [2, 4, 6]; const b = a.map(x => x / 2); return { a: a, b: b }; })()'), { a: [2, 4, 6], b: [1, 2, 3] });
    assert.deepStrictEqual(esEval('(() => { const fn = x => "[" + x + "]"; return [[1, 2, 3].map(fn), [undefined, "a", "b"].map(fn)]; })()'), [["[1]", "[2]", "[3]"], ["[undefined]", "[a]", "[b]"]]);
  });

  it('reduce', function () {
    assert.deepStrictEqual(esEval('[1, 2, 3, 4].reduce((acc, elem) => acc + elem, 1000)'), 1000 + 1 + 2 + 3 + 4);
    assert.deepStrictEqual(esEval('[1, 2, 3, 4].reduce((acc, elem) => acc + elem)'), 1 + 2 + 3 + 4);
    assert.deepStrictEqual(esEval('[1, 2, 3, 4].reduce((acc, elem) => acc + elem, undefined)'), NaN);
    assert.deepStrictEqual(esEval('["A", "B", "C"].reduce((acc, elem, ix) => { acc.push(elem + " at " + ix); return acc; }, [])'), ['A at 0', 'B at 1', 'C at 2']);
    assert.deepStrictEqual(esEval('["A", "B", "C"].reduce((acc, elem, i, array) => { if (i === 1) array.push("?"); acc.push(array.length); return acc; }, [])'), [3, 4, 4]);
  });
});
