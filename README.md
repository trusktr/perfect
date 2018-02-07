
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

```js
import { performanceTest, testCase } from 'perfect'

// describe the test
performanceTest("Conditionally adding to a Set with and without checking .has(), assuming the Set already contains the item.",

    // define a test case
    testCase('with .has()', {

        // setup anything you need for the test on `this`, which persists for
        // every iteration of the test. Called only once.
        setup() {
            this.s = new Set
            this.obj = {}
            this.s.add(this.obj)
        },

        // The code to test. Called for each iteration. Receives start and end
        // markers. Wrap the specific part of the functionality you are testing
        // with start() and end() calls.
        test(start, end) {
            const {s, obj} = this

            start() // starts tracking time

            // this is the code we're trying to test
            if (!s.has(obj))
                s.add(obj)

            end() // stops tracking time
        },
    }),

    // define another test case.
    testCase('without .has()', {
        setup() {
            this.s = new Set
            this.obj = {}
            this.s.add(this.obj)
        },
        test(start, end) {
            const {s, obj} = this

            start()
            s.add(obj)
            end()
        },
    })

    // ...define any number of test cases to compare performance of...
)
```
