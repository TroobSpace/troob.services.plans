const connectToDatabase = require('./db');
const Plan = require('./models/Plan');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const errorResponse = require('./errorResponse');
//LOGGING
const { LogInfo, LogError, BeginTransaction } = require('./logger');
const className = 'troob.services.plan';
var ObjectId = require('mongodb').ObjectID;
////MIDDLE WARE
Sentry.init({
  dsn: process.env.SENTRY_KEY,
  tracesSampleRate: 1.0,
});
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  //Setup trans
  const transaction = BeginTransaction(className, 'createPlan');
  connectToDatabase().then(() => {
    LogInfo(`${className} [BEGIN]`);
    Plan.create(JSON.parse(event.body))
      .then((plan) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(plan),
        })
      )
      .catch(async (err) => {
        Sentry.captureException(err);
        LogError(className, err);
        err = await errorResponse(err); 
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err.message.toString() || 'Could not create the plan.',
        });
      })
      .finally(() => {
        LogInfo(`${className} [END]`);
      });
  });
};
module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Plan.findById(event.pathParameters.id)
      .then((plan) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(plan),
        })
      )
      .catch(async (err) =>{
        err = await errorResponse(err); 
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body:  err.message.toString() || `Could not fetch plan with id: <${event.pathParameters.id}>.`,
        })
      }
       
        
      );
  });
}
module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  connectToDatabase().then(() => {
    Plan.find()
      .then((plans) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(plans),
        })
      )
      .catch(async (err) =>{
        err = await errorResponse(err); 
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body:  err.message.toString() || `Could not fetch plans`,
        })
      }
       
        
      );
  });
};
