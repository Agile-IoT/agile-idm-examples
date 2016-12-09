var commandLineArgs = require('command-line-args');
var getUsage = require('command-line-usage');
var request = require('request');
/*
Usage examples:
node authenticateClient.js  --client MyAgileClient2  --secret Ultrasecretstuff
node authenticateClient.js  --client MyAgileClient2  --secret Ultrasecretstuff --host 127.0.0.1 --protocol http -- port 3000

*/

var sections = [{
  header: 'AGILE IDM Oauth2 Client Authentication Script',
  content: 'Authenticates a client and requests client and user info'
}, {
  header: 'Client info',
  optionList: [{
    name: 'client',
    alias: 'c',
    typeLabel: '[underline]{String}',
    description: 'client identifier.'
  }, {
    name: 'secret',
    alias: 's',
    typeLabel: '[underline]{String}',
    description: 'Secret for the client'
  }, {
    name: 'host',
    alias: 'h',
    typeLabel: '[underline]{String}',
    description: 'host where AGILE IDM runs (default to localhost)'
  }, {
    name: 'port',
    alias: 'p',
    typeLabel: '[underline]{String}',
    description: 'port AGILE IDM runs (default to 3000)'
  }, {
    name: 'protocol',
    alias: 'x',
    typeLabel: '[underline]{String}',
    description: 'protocol for IDM (http or https)'
  }]
}, {
  header: "Help",
  optionList: [{
    name: 'help',
    alias: 'h',
    description: 'Print this usage guide.'
  }]
}];

var optionDefinitions = [{
  name: 'client',
  alias: 'c',
  type: String
}, {
  name: 'secret',
  alias: 's',
  type: String
}, {
  name: 'host',
  alias: 'h',
  type: String
}, {
  name: 'port',
  alias: 'p',
  type: String
}, {
  name: 'protocol',
  alias: 'x',
  type: String
}];


function getInfo(protocol,host,port,token,type){
  request({
        method : "GET",
        url : protocol+"://"+host+":"+port+"/oauth2/api/"+type+"Info",
        headers : {
          "Authorization" : "bearer "+token
       }
  },
  function (error, response, body) {
        if(error)
          throw new Error(error);
        console.log("your "+type+" info is: "+body);

  });
}

function getUserInfo(protocol,host,port,token){

}


function authenticateClient(protocol,host,port,client,secret) {

  var auth = "Basic " + new Buffer(client + ":" + secret).toString("base64");
  request({
        method : "POST",
        url : protocol+"://"+host+":"+port+"/oauth2/token",
        form: {
          grant_type:'client_credentials'
        },
        headers : {
          "Authorization" : auth
       }
  },
  function (error, response, body) {
        if(error)
          throw new Error(error);
        var result = JSON.parse(body);
        var token = result.access_token;
        var type  = result.token_type;
        console.log("kind of token obtained: "+type);
        console.log("token obtained: "+token);
        getInfo(protocol,host,port,token,"client");
        getInfo(protocol,host,port,token,"user");
  });
}


function help() {
  console.log(getUsage(sections));
}

try {
  var host = "localhost";
  var port = 3000;
  var protocol = "http";
  args = commandLineArgs(optionDefinitions);
  if (args.hasOwnProperty("help"))
    help();
  else {
    if (args.client && args.secret) {
       if(args.protocol){
         protocol = args.protocol;
       }
       if(args.host){
         host = args.host;
       }
       if(args.port){
         port = args.port;
       }
       authenticateClient(protocol, host, port, args.client, args.secret);
    } else {
      help();
    }
  }
} catch (err) {
  console.log(err);
  console.log(getUsage(sections));
}
