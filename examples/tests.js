import { performanceTests, testCase } from '../src/index.js'

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

    // ...define any number of test cases that we want to compare performance of...
)

performanceTests("Appending a node with or without first checking if the node is appended, and assuming the node is already connected.",
    testCase('with check', {
        setup() {
            this.a = document.createElement('div')
            this.b = document.createElement('div')
            this.a.appendChild(this.b)
        },
        test(start, end) {
            const {a, b} = this

            start()

            if (a !== b.parentNode)
                a.appendChild(b)

            end()
        },
    }),
    testCase('without check', {
        setup() {
            this.a = window.a
            this.b = window.b
        },
        test(start, end) {
            const {a, b} = this

            start()

            a.appendChild(b)

            end()
        },
    })
)
