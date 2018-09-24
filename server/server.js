'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var IncomingForm = require('formidable').IncomingForm;
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec

var app = module.exports = loopback();
app.use(bodyParser.urlencoded({extended: true}));
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

function readFile(srcPath) {
  return new Promise(function (resolve, reject) {
      fs.readFile(srcPath, 'utf8', function (err, data) {
          if (err) {
              reject(err)
          } else {
              resolve(data);
          }
      });
  })
}

function writeFile(savPath, data) {
  return new Promise(function (resolve, reject) {
      fs.writeFile(savPath, data, function (err) {
          if (err) {
              reject(err)
          } else {
              resolve();
          }
      });
  })
}

app.route('/api/jobs/fileupload').post(function(req,res){
  var form = new IncomingForm();
  form.parse(req,function(err,fields,files){
      if (err) throw err;
      var data = JSON.stringify(files.file)
      var b = JSON.parse(data)
      var oldpath = b.path
      var newpath = `${__dirname}/data/${req.query.id}.csv`
      readFile(oldpath).then(function(results){
        return writeFile(newpath,results);
      }).then(function(){
        //done writing file, can do other things
     })
  })
})

app.route('/download/:id').get(function(req, res){
    // var file = `${__dirname}/data/${req.query.name}`;
    var file = `${__dirname}/data/${req.params.id}`;
    res.download(file); // Set disposition and send it.
});

app.route('/api/run/:id').get(function(req, res) {
    // var staticCommand =`spark-submit`
    var staticCommand =`spark-submit --class Main ./server/data/config/SparkTest-assembly-1.0.jar load`
    var dynamicCommand = `${staticCommand} ${req.params.id}`
    console.log(dynamicCommand)
    // exec(`${staticCommand}`,["--class Main"] ,{cwd:`./server/data/config/SparkTest-assembly-1.0.jar ${req.params.id} load`},function(err,stdout,stderr){
    
       var child = exec(`${staticCommand} ${req.params.id}`);
        child.stdout.on('data', function(data) {
            console.log('stdout: ' + data);
        }),
        child.stderr.on('data', function(data) {
            console.log('stdout: ' + data);
            // res.json({"status":"error"})
        })
        child.on('close', function(code) {
            console.log('closing code: ' + code);
        })
        res.json({"status":"success"})
    // exec(`${staticCommand} ${req.params.id}`,function(err,stdout,stderr){
    //     if (err){
    //         console.error(err)
    //     }
    //     if (stderr){
    //         console.log(stderr)
    //     }
    //     console.log(stdout)
    //     console.timeEnd(stdout)

    // })
    // res.json({"status":"success"});
  });
