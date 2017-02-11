/**
 * Created by moksha on 04/02/17.
 */
var logger = {

  config: {},

  log: function (moduleName, functionName, logType, payload) {
    var payloadString = '';
    for (var key in payload) {
      if (payload.hasOwnProperty(key))
        payloadString = payloadString + "," + key + ":" + payload[key];
    }

    console.log(new Date() + " " + logType + " : [" + moduleName + "." + functionName + "] { " + payloadString.substring(1) + " }");
  },

  /*log1: function (moduleName, functionName, logType, payload) {
   var payloadString = '';
   for (var key in payload) {
   if (payload.hasOwnProperty(key))
   payloadString = payloadString + "," + key + ":" + payload[key];
   }

   console.log(new Date() + " " + logType + " : [" + moduleName + "." + functionName + "] { " + payloadString.substring(1) + " }");
   }*/
};


function internalLogger() {


}


function internalLogger1() {

}

module.exports = {
  logger: logger,
  internalLogger: internalLogger
};

