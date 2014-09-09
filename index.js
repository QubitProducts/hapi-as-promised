'use strict';

exports.register = function (plugin, options, next) {

  plugin.ext('onPreResponse', function (request, reply) {
    var res = request.response;
    if (res.source && typeof res.source.then === 'function') {
      return res.source
        .then(function (value) {
          reply(value).type(res.headers['content-type']);
        })
        .catch(reply);
    }
    reply();
  });

  next();

};

exports.register.attributes = {
  pkg: require('./package.json')
}
