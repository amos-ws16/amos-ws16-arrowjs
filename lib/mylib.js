/** Promise based setTimeout wrapper */
function timeout (delay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

/** Traditional asynchronous function that takes a callback */
function traditionalAsyncTask (done) {
  let error = null
  let result = 42
  setTimeout(() => { done(error, result) }, 100)
}

/** ES7 asynchronous function that is awaitable and returns a promise. */
async function awaitableAsyncTask () {
  await timeout(100)
  return 42
}

module.exports = { wisdom: true, traditionalAsyncTask, awaitableAsyncTask }
