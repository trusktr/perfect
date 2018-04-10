import { performanceTest } from '../src/index.js'

const NUMBER_OF_ITERATIONS = 500000

test('a basic perf test works', () => {
    let count = 0

    const result = performanceTest({
        description: "Conditionally adding to a Set with and without checking .has(), assuming the Set already contains the item.",

        iterations: NUMBER_OF_ITERATIONS,

        logResults: false, // default true

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
                    count++

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
                    count++

                    const {s, obj} = this

                    start()
                    s.add(obj)
                    end()
                },
            },

            // ...define any number of test cases that we want to compare performance of...
        },
    })

    expect( count ).toBe( 2 * NUMBER_OF_ITERATIONS )

    debugger

    expect( typeof result ).toBe( 'object' )

    expect( typeof result.fastest ).toBe( 'object' )
    expect( typeof result.fastest.name ).toBe( 'string' )
    expect( typeof result.fastest.totalTime ).toBe( 'number' )
    expect( typeof result.fastest.averageTime ).toBe( 'number' )

    expect( typeof result.slowest ).toBe( 'object' )
    expect( typeof result.slowest.name ).toBe( 'string' )
    expect( typeof result.slowest.totalTime ).toBe( 'number' )
    expect( typeof result.slowest.averageTime ).toBe( 'number' )

    expect( result.fastest.totalTime ).toBeLessThanOrEqual( result.slowest.totalTime )
    expect( result.fastest.averageTime ).toBeLessThanOrEqual( result.slowest.averageTime )
})
