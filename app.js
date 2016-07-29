var express = require('express');
var cors = require('cors');
var app = express();
var exec = require('child_process').exec;

var successful = function(req, res, json){
  res.status(200).json(json);
}
var unsuccessful = function(req, res){
  res.status(500).json({error: "Internal server error"});
}

app.use(cors());

app.get('/v1/ping/:address', function (req, res) {
  var address = req.params.address;
  pingCommand(req, res, address, 1, successful, unsuccessful);
});

app.get('/v1/ping/:address/:count', function (req, res) {
  var address = req.params.address;
  var count = req.params.count;
  pingCommand(req, res, address, count, successful, unsuccessful);
});

app.get('*', function(req, res){
  res.status(404).send({error: 'Sorry, endpoind not found'});
});

app.listen(5000, function () {
  console.log('ping api: http://localhost:5000/v1/ping/:address/:count');
});

function pingCommand(req, res, address, count, successful, unsuccessful){
  var command = 'ping -c '+count+' '+address;
  console.log(command);
  exec(command, function(error, stdout, stderr) {
    if(error !== null){
      unsuccessful(req, res);
    } else {
      var json = parsePing(stdout);
      if(json)
        successful(req, res, json);
      else
        unsuccessful(req, res);
    }

  });
}

function parsePing(pingString) {
  if(!pingString.includes('packet'))
    return null;

  var matched,
      regex,
      address,
      statistics = {},
      packets = [],
      pingJSON = {};

  // extract address
  regex = /\((.+)\)/;
  matched = regex.exec(pingString)
  address = matched[1];

  // extract packets
  regex = /icmp_seq=(\d+) ttl=(\d+) time=([\d\.]+) ms/g;
  while(matched = regex.exec(pingString)){
    packets.push({
      seq: matched[1],
      ttl: matched[2],
      time: matched[3]
    });
  }

  // extract statistics
  regex = /(\d+) packets transmitted, (\d+) packets received, ([\d\.]+%) packet loss/
  matched = regex.exec(pingString);
  statistics.transmitted = matched[1];
  statistics.received = matched[2];
  statistics.losted = matched[3];

  regex = /min\/avg\/max\/stddev = ([\d\.]+)\/([\d\.]+)\/([\d\.]+)\/([\d\.]+) ms/
  matched = regex.exec(pingString);
  statistics.min = matched[1];
  statistics.avg = matched[2];
  statistics.max = matched[3];
  statistics.stddev = matched[4];

  // build pingJSON
  pingJSON.address = address;
  pingJSON.packets = packets;
  pingJSON.statistics = statistics;

  return pingJSON;
}
