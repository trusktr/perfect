
perfect
-----------------

Run simple performance tests.

#### `npm install perfect --save`

With **perf**ect you can run simple **perf**ormance tests to see which
variations of a piece of code (f.e. different algos to achieve the same thing)
are the fastest.

Requirements
============

- The source is not transpiled for older browsers (yet) so you may have to
  transpile this in your own build setup.

Basic Usage
===========

See the [examples](./examples/tests.js).

The API looks like this:

```js
import { performanceTest } from 'perfect'

performanceTest({

    // describe the test (similar to describe() in other testing frameworks)
    description: 'compare sorting algorithms',

    iterations: 100000, // optional, default is 500000

    testCases: {

        // define a test case. The property key is the name of the test
        // (similar to it() in other test frameworks)
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
    },
)
```

The `performanceTest` function will start a performance test right away
(synchronously). Async tests are not supported yet (they will be good for
testing async functionality like worker responses or network conditions).

Each test in `testCases` will be executed as many times as specified by
`iterations`, which defaults to `500000`.

The `test` function of each test case is what the performance test is
interested in timing. Inside a `test` function, call `start()` and `end()` to
specify exactly which part of the `test` function we care about timing. If
`start()` and `end()` are not called, then the performance test will time the
entire execution of the `test` function. Calling `start()` or `end()` are
completely optional, but you may like to use them to get best results. If you
omit `start()`, then the timer will start from the beginning of the execution
of the `test` function. Likewise, if you omit `end()`, then timing ends after
the `test` has returned.

The `setup()` function is called once, at the beginning of a testCase, before
any iterations call the `test` function. In all functions, `this` is a context
that you can use throughout all invocations of any functions.  Use this in
`setup()` to set up anything that you may across all iterations of the `test`
function.

`before` and `after` are called during each iteration, before and after the
`test` function is called. This useful for resetting state, incrementing
variables, etc.

Finally, `cleanup` is called once after interation has finished. Use this to
cleanup anything you no longer need, for example in case your tests are part of
a long running application and you don't want things to be left over in memory.
Plus, it can be nice to reset the playing field for each test case, if you need
to.

