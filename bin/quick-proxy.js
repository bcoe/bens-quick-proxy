#!/usr/bin/env node

var yargs = require('yargs')
    .option('o', {
      alias: 'port',
      default: 8081,
      description: 'port to bind HTTP server on'
    })
    .option('p', {
      alias: 'proxy',
      description: 'corporate proxy url'
    })
    .option('t', {
      alias: 'proxy-to',
      description: 'address to proxy to through corporate proxy'
    })
    .option('h', {
      alias: 'help'
    })
    .demand('proxy-to'),
  QuickProxy = require('../');

if (yargs.argv.help) {
  console.log(yargs.help());
} else {
  var quickProxy = new QuickProxy(yargs.argv);
  quickProxy.start();
}
