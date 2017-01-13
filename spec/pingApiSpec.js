var request = require("request");

var base_url = "http://localhost:3000/"

describe("Ping API Server", function() {
  describe("GET /v1/ping/8.8.8.8", function() {
    it("returns status code 200", function(done) {
      request.get(base_url+'/v1/ping/8.8.8.8', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns address 8.8.8.8", function(done) {
      request.get(base_url+'/v1/ping/8.8.8.8', function(error, response, body) {
        let responseJSON  = JSON.decode(response);
        let address = response.address;
        expect(address).toBe("8.8.8.8");
        done();
      });
    });
  });
});
