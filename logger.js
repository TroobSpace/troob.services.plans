const Sentry = require('@sentry/node');

const logLevels = {
  DIAGNOSTIC: 'DIAGNOSTIC',
  ERROR: 'ERROR',
};
exports.LogInfo = function LogInfo(message) {
  if (process.env.LOG_LEVEL == logLevels.DIAGNOSTIC) {
    if (process.env.LOG_CRITERIA !== '') {
      if (message.includes(process.env.LOG_CRITERIA)) {
        console.log(`[DIAGNOSTIC] ${message}`);
      }
    } else {
      console.log(`[DIAGNOSTIC] ${message}`);
    }
  }
};

exports.LogError = function LogError(message, exception) {
  Sentry.captureException(exception);
  if (
    process.env.LOG_CRITERIA !== '' &&
    process.env.LOG_CRITERIA !== undefined
  ) {
    if (message.includes(process.env.LOG_CRITERIA)) {
      console.log(`[ERROR] ${message}`, exception);
    }
  } else {
    console.error(`[ERROR] ${message}`, exception);
  }
};

exports.BeginTransaction = function BeginTransaction(op, name) {
  return Sentry.startTransaction({
    op: op,
    name: `[BEGIN] ${name}`,
  });
};

