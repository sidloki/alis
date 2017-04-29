const bs = require('browser-sync').create();

function start() {
  return new Promise((resolve, reject) => {
    bs.init({
      online: false,
      open: false,
      port: 9000,
      https: true,
      server: {
        baseDir: ['.'],
        middleware: (req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }
      }
    }, resolve);
  });
};

module.exports = {
  start: start,
  reload: bs.reload,
  watch: bs.watch
};
