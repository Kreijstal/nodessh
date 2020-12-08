var ssh2 = require('ssh2');
var OPEN_MODE = ssh2.SFTP_OPEN_MODE;
var STATUS_CODE = ssh2.SFTP_STATUS_CODE;


new ssh2.Server({
  hostKeys: [""]
}, function(client) {
  console.log('Client connected!');
client2=client
var auth;
  client.on('authentication', function(ctx) {
  auth=ctx
    if (ctx.method === 'password'
        // Note: Don't do this in production code, see
        // https://www.brendanlong.com/timing-attacks-and-usernames.html
        // In node v6.0.0+, you can use `crypto.timingSafeEqual()` to safely
        // compare two values.
        && ctx.username === 'foo'
        && ctx.password === 'bar')
      ctx.accept();
    else if (ctx.method === 'publickey'
             && ctx.key.algo === pubKey.fulltype
             && buffersEqual(ctx.key.data, pubKey.public)) {
      if (ctx.signature) {
        var verifier = crypto.createVerify(ctx.sigAlgo);
        verifier.update(ctx.blob);
        if (verifier.verify(pubKey.publicOrig, ctx.signature))
          ctx.accept();
        else
          ctx.reject();
      } else {
        // if no signature present, that means the client is just checking
        // the validity of the given public key
        ctx.accept();
      }
    } else if(ctx.method == "none"){
	//Not authentificated
	if(ctx.user=="rainbowdash")
    ctx.accept();
	else ctx.reject();

}else{
 
      ctx.reject();
  }
  }).on('ready', function() {
    console.log('Client authenticated!');
    client.on('session', function(accept, reject) {
	 
      var session = accept();
    session.on('pty', function(accept, reject, info) {
        //console.log('Pty event received: ' + require("util").inspect(info));
        var sshStream = accept();
      //  sshStream.exit(0);
      //  sshStream.end();
      });
    session.on('shell', function(accept, reject, info) {
        var sshStream = accept();
        //   console.dir(sshStream)
    sshStream.write("Welcome "+auth.user+" To Rainb's!!!\r\n")
        //sshStream.stderr.write('Oh no, the dreaded errors!\n');
    /*sshStream.on("data",function(data){
     sshStream.write(data);
    })*/
    //stream2=sshStream
    require("./eval.js")(sshStream)
    

      //  stream.write('Just kidding about the errors!\n');
      //  stream.exit(0);
      //  stream.end();
      });
      session.on('exec', function(accept, reject, info) {
//    console.log(1234)
        console.log('Client wants to execute: ' + require("util").inspect(info.command));
        var stream = accept();
        stream.stderr.write('Oh no, the dreaded errors!\n');
        stream.write('Just kidding about the errors!\n');
        stream.exit(0);
        stream.end();
      });
    });
  }).on('end', function() {
    console.log('Client disconnected');
  });
}).listen(11337, '0.0.0.0', function() {
  console.log('Listening on port ' + this.address().port);
});

