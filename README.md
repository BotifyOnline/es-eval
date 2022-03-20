# es-eval

Evaluate JavaScript expressions safely.
No more being afraid of what the users enter!

:game_die: [Playground](https://danielduarte.github.io/es-eval-playground/) ([last release](https://www.npmjs.com/package/es-eval))

## Installation

```bash
npm i es-eval
```

## Usage

```js
// Simple expression
const esEval = require('es-eval');

const result = esEval('1 + 2');
console.log(result); // Output: 3
```

```js
// User values
const esEval = require('es-eval');

const result = esEval('1 + x', { x: 4 });
console.log(result); // Output: 5
```

Or more complex examples:

```js
// IIFE example
const esEval = require('es-eval');

const exp = `(() => {
  const out = [];

  const callback = () => {
    out.push('callback() called');
  };

  const main = function (param, cb) {
    out.push('main() started with param = "' + param + '"');
    cb();
    out.push('main() finished');
  };

  main('My value', callback);

  return out;
})()`;

console.log(esEval(exp));
// Output: [
//   'main() called with My value',
//   'Callback called!',
//   'main() finished'
// ]
```

```js
// Hangup protection in infinite loop
const esEval = require('es-eval');

try {
  esEval(`(() => {
    while (true) {}
  })()`);
} catch (err) {
  console.log(err.message); // Output: 'Evaluation timeout'
}
```

# Features

| Feature | Notes |
|---------|-------|
| Primitive values | `number`, `string`, `boolean` and `undefined` values. |
| Objects | `{ key: 'value' }`, `null` |
| Arrays | `[1, 2, 3]`, built-in properties and methods: `length`, `push`, `map`, `filter`, `reduce`, `includes` |
| Arrow function expressions | `(x, y) => x + y` |
| Standard function expressions | `function () { return 'value'; }` |
| Nested expressions | `(a < (b + 1) && a - (a < ([1, 2].map(x => 1 + x)).length))`  |
| Callbacks | `cb => { cb(); return 1; }` |
| Mathematical operations | `+`, `-`, `/`, `*`, `%`, `**` |
| Comparators | `===`, `!==`, `==`, `!=`, `<`, `>`, `<=`, `>=` |
| Logical operations | `&&`, <code>&#124;&#124;</code>, `!` |
| Bitwise operations | `&`, <code>&#124;</code>, `^` |
| Ternary operator | `... ? ... : ...` |
| Nullish operator | `??` |
| Variables | `const` and `let` declarations. Assignments. |
| Conditional | [`if` / `else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statement. |
| Loops | [`while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while) statement. |
| [`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) | `JSON.parse()` and `JSON.stringify()`. |
| Hangup protection | The execution of any user inputs is protected against intentional or unintentional hangups. Since it is mathematically proven that the [halting problem](https://en.wikipedia.org/wiki/Halting_problem) is undecidable, hence it cannot be automatically computed, this protection is based on a configurable timeout. |

# Coming soon...

| Status | Feature | Notes |
|--------|---------|-------|
| :sweat: In Progress | [Spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (`...`) | Spread syntax for arrays, objects, and parameters. |
| :hourglass_flowing_sand: To-Do | `Object` static methods | Static functionality provided by `Object` class. |
| :hourglass_flowing_sand: To-Do | `String.prototype.trim` | String trim method. |
| :hourglass_flowing_sand: To-Do | [`parseFloat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) | Global function to convert a value into a floating point number. |
| :hourglass_flowing_sand: To-Do | [`parseInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) | Global function to convert a value into an integer number. |
| :hourglass_flowing_sand: To-Do | [`Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) | JavaScript random number generator. |
| :hourglass_flowing_sand: To-Do | [`Math.min()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min) | Minimum calculation. |
| :hourglass_flowing_sand: To-Do | [`Math.max()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) | Maximum calculation. |
| :hourglass_flowing_sand: To-Do | [`Math.floor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) | Returns the largest integer less than or equal to a given number. |

# Future features

:incoming_envelope: [Vote](http://etc.ch/YzCv) what's coming on! :bulb: or [Suggest](https://github.com/danielduarte/es-eval/issues/new) your ideas.

| Feature | Notes |
|---------|-------|
| Browser support | |
| `for of` loop | |
| `for in` loop | |
| `for (;;)` loop | |
| `do ... while` loop | |
| *And a lot more!...* | |

# How it works?

- It never executes user code passing it to JS engine (no `eval()`, no `new Function(...)`, no `vm`, no other third party engines), making sure the evaluation is safe.
- No access to require/import modules.
- No access to OS features like file system, network, etc.
- No access to global objects.
- All user code is parsed to an AST and analyzed step by step, representing the code statements and functions in own components. No native `function`s are created with the user input.
- All access to global objects is emulated and there's no real access to natives.
- All standard ECMAScript features are implemented and not delegated to the underlying engine.

# What is this for

:white_check_mark: Evaluate user input expressions safely

:white_check_mark: Easily provide a way to enter and evaluate custom conditions 

:white_check_mark: Embed JS expressions in template engines

:white_check_mark: Parse custom JS functions once and evaluate them many times

:white_check_mark: Create expressions with context values, including objects and arrays


# What is this **NOT** for

:no_entry: Create entire applications

:no_entry: Replace V8, or other JS engines
