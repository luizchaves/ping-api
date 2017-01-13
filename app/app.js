var exec = require('child_process').exec;
var app = require('express')();
var bodyParser = require('body-parser');
var bodyParserJsonError = require('express-body-parser-json-error');
var cors = require('cors');
var port = process.env.PORT || 5000;

var successful = function(req, res, json){
  res.status(200).json(json);
}
var unsuccessful = function(req, res){
  res.status(500).json({error: "Internal server error"});
}

app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(bodyParserJsonError());
app.use(cors());

app.get('/v1/ping/:address', function (req, res) {
  let address = req.params.address;
  pingCommand(req, res, address, 1, successful, unsuccessful);
});

app.post('/v1/ping', function (req, res) {
  let address = req.body.address;
  pingCommand(req, res, address, 1, successful, unsuccessful);
});

app.get('/v1/ping/:address/:count', function (req, res) {
  let address = req.params.address;
  let count = req.params.count;
  pingCommand(req, res, address, count, successful, unsuccessful);
});

app.get('*', function(req, res){
  res.status(404).send({error: 'Sorry, endpoind not found'});
});

app.listen(port, function () {
  console.log('ping api: http://localhost:'+port+'/v1/ping/:address/:count');
});

function pingCommand(req, res, address, count, successful, unsuccessful){
  let command = 'ping -c '+count+' '+address;
  console.log(command);
  exec(command, function(error, stdout, stderr) {
    if(error !== null){
      unsuccessful(req, res);
    } else {
      let json = parsePing(stdout);
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

  let matched,
      regex,
      address,
      statistics = {},
      packets = [],
      pingJSON = {};

  // extract address
  regex = /\(([\d\.]+)\)/;
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
  regex = /(\d+) packets transmitted, (\d+) (packets )?received, ([\d\.]+%) packet loss/
  matched = regex.exec(pingString);
  statistics.transmitted = matched[1];
  statistics.received = matched[2];
  statistics.losted = matched[3];

  regex = /min\/avg\/max\/(stddev|mdev) = ([\d\.]+)\/([\d\.]+)\/([\d\.]+)\/([\d\.]+) ms/
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
