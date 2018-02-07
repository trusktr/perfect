
perfect
-----------------

Run simple performance tests.

#### `npm install perfect --save`

With **perf**ect you can run simple **perf**ormance tests to see which
variations of a piece of code (f.e. different algos to achieve the same thing)
are the fastest.

Requirements
============

- The source is not transpiled for older browsers (yet)0 so you may have to
  transpile this in your own build setup.

Basic Usage
===========

Basically:

```js
import { performanceTest } from 'perfect'

performanceTests({

    // describe the test
    description: 'compare sorting algorithms',

    iterations: 100000, // optional, default is 500000

    // define a test case
    'merge sort': {

        // setup anything you need for the test on `this`, which persists for
        // every iteration of the test. Called only once, before all iterations
        setup() {},

        // called before each iteration
        before() {},

        // The code to test. Called for each iteration. Receives start and end
        // markers. Wrap the specific part of the functionality you are testing
        // with start() and end() calls.
        test(start, end) {},

        // called after each iteration
        after() {},

        // called only once, after all iterations
        cleanup() {},
    },

    // define another test case
    'quick sort': {
        // ...
    },

    // ...define any number of test cases to compare performance of...
)
```

See [examples](./examples/tests.js).
