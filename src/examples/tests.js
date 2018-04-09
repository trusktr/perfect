import { performanceTest } from '../src/index.js'

performanceTest({
    description: "Conditionally adding to a Set with and without checking .has(), assuming the Set already contains the item.",

    iterations: 500000,

    testCases: {

        // define a test case
        'with .has()': {

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

                // we will not include the time it takes to track the creation of
                // these variables in the result.
                const {s, obj} = this

                start() // starts tracking time

                // this is the code we are timing
                if (!s.has(obj))
                    s.add(obj)

                end() // stops tracking time
            },
        },

        // define another test case.
        'without .has()': {
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
        },

        // ...define any number of test cases that we want to compare performance of...
    },
})

performanceTest({
    description: "Appending a node with or without first checking if the node is appended, and assuming the node is already connected.",

    testCases: {
        'with check': {
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
        },
        'without check': {
            setup() {
                this.a = document.createElement('div')
                this.b = document.createElement('div')
            },
            test(start, end) {
                const {a, b} = this

                start()

                a.appendChild(b)

                end()
            },
        },
    },
})
