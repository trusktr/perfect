export function performanceTest({description, iterations, testCases}) {
    iterations = iterations || 500000
    const results = []

    console.log(` --- PERFORMANCE TEST: "${description}"`)
    console.log('   -- RUNNING... ')

    for (const test in testCases) {
        results.push( runTestCase( test, iterations, testCases[test] ) )
    }

    let slowest = results[0]
    let fastest = results[0]

    for (const result of results) {
        if (result.averageTime > slowest.averageTime)
            slowest = result
        if (result.averageTime < fastest.averageTime)
            fastest = result
    }

    console.log('   -- DONE! Results: ')
    console.log(`     -- SLOWEST: "${slowest.name}"`)
    console.log(`       - total time: ${slowest.totalTime}`)
    console.log(`       - average time: ${slowest.averageTime}`)
    console.log(`     -- FASTEST: "${fastest.name}"`)
    console.log(`       - total time: ${fastest.totalTime}`)
    console.log(`       - average time: ${fastest.averageTime}`)
}

function runTestCase(name, iterations, {setup, before, test, after, cleanup}) {
    if (!test) throw new Error('Um, you need a test.')

    const context = {}

    let totalTime = 0
    let averageTime
    let startTime
    let endTime

    console.log(`     -- TEST CASE: "${name}" -- `)

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

    console.log(`       - total time: ${totalTime}`)
    console.log(`       - average time: ${averageTime}`)

    return {name, totalTime, averageTime}
}
