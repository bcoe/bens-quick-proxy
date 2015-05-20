var _ = require('lodash'),
  http = require('http'),
  request = require('request');

// a proxy that can use a corporate proxy for
// individual requests, but is not configured itself
// to use the corporate proxy
function QuickProxy(opts) {
  _.extend(this, {
    port: 8081, // what port should we run the proxy on.
    proxy: null, // URL of corporate proxy.
    proxyTo: null, // URL to proxy to.
    host: '127.0.0.1'
  }, opts)
};

QuickProxy.prototype.start = function() {
  var _this = this;

  var server = http.createServer(function(req, res) {
    var opts = {
      url: _this.proxyTo + req.url,
      method: req.method,
      headers: _.extend({}, req.headers)
    }

    if (_this.proxy) opts.proxy = _this.proxy;

    request(opts).pipe(res);
    console.log(_this.proxyTo, req.url);
  });

  console.log('listen on ', this.host + ':' + this.port, ' proxy through = ', this.proxy, ' proxy to = ', this.proxyTo);
  server.listen(this.port, this.host);
};

module.exports = QuickProxy;
