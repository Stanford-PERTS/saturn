// Returns `true` if run within a Jest test.
// https://stackoverflow.com/questions/50940640/how-to-determine-if-jest-is-running-the-code-or-not

function isTesting(): Boolean {
  return process.env.JEST_WORKER_ID === undefined;
}

export default isTesting;
