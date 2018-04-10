// detect the global (see https://stackoverflow.com/questions/3277182)
// We do it this way because it works in strict mode AND in browsers that block
// eval with CSP.
//
// We need to do this because of Jest, it doesn't provide a normal global
// context.
let _global
try {
    _global = ( 42, eval )( 'this' )
}
catch(e) {
    // best guess
    _global = typeof window === 'object' ? window : global || {};
}

// in case the `performance` global isn't available (f.e. in Jest):
const performance =
    typeof _global.performance !== 'undefined' && _global.performance.now ?
    _global.performance :
    { now: Date.now.bind( Date ) }

export function performanceTest({ description, testCases, iterations, logResults }) {
    iterations = iterations || 500000
    const results = []

    if ( logResults ) {
        console.log(` --- PERFORMANCE TEST: "${description}"`)
        console.log('   -- RUNNING... ')
    }

    for (const test in testCases) {
        results.push( runTestCase( test, iterations, logResults, testCases[test] ) )
    }

    let slowest = results[0]
    let fastest = results[0]

    for (const result of results) {
        if (result.averageTime > slowest.averageTime)
            slowest = result
        if (result.averageTime < fastest.averageTime)
            fastest = result
    }

    if ( logResults ) {
        console.log('   -- DONE! Results: ')
        console.log(`     -- SLOWEST: "${slowest.name}"`)
        console.log(`       - total time: ${slowest.totalTime}`)
        console.log(`       - average time: ${slowest.averageTime}`)
        console.log(`     -- FASTEST: "${fastest.name}"`)
        console.log(`       - total time: ${fastest.totalTime}`)
        console.log(`       - average time: ${fastest.averageTime}`)
    }

    return {
        slowest,
        fastest,
    }
}

function runTestCase(name, iterations, logResults, {setup, before, test, after, cleanup}) {
    if (!test) throw new Error('Um, you need a test.')

    const context = {}

    let totalTime = 0
    let averageTime
    let startTime
    let endTime

    if ( logResults ) {
        console.log(`     -- TEST CASE: "${name}" -- `)
    }

    if (setup) setup.call(context, context)

    for (let i=0; i<iterations; i+=1) {
        if (before) before.call(context, context)

        const start = () => startTime = performance.now()
        const end = () => endTime = performance.now()

        const fallbackStartTime = performance.now()

        test.call(context, start, end, context)

        endTime = endTime || performance.now()
        startTime = startTime || fallbackStartTime

        totalTime += endTime - startTime

        if (after) after.call(context, context)
    }

    if (cleanup) cleanup.call(context, context)

    averageTime = totalTime/iterations

    if ( logResults ) {
        console.log(`       - total time: ${totalTime}`)
        console.log(`       - average time: ${averageTime}`)
    }

    return {name, totalTime, averageTime}
}

export const version = '1.1.0'
