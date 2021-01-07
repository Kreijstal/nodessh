var ssh2 = require('ssh2');
var OPEN_MODE = ssh2.SFTP_OPEN_MODE;
var STATUS_CODE = ssh2.SFTP_STATUS_CODE;


new ssh2.Server({
  hostKeys: ["-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAu0MBToNN8LtQOe07VuKNtTlh0RfcTKsPNxZvnsI1F+NgsaYUprgTvRVe\ncDciDqXDY/Vy+yay7+You5joq5nQdiBokyhyjNZghGr+qD5MyvnWXIjBITee3bODLvD0TIzF\n0tyHhR98RHjI1HJNN2jcffNHZzEWQebFn0bMXCRLlWI8Mczht1Hu9Kx6TOZ5rO+XUre7Lanr\nSxe27sjlRfTvZSKQ3SmZVDJYhfehbV7s2vCNL/pi5+7EMBlTgLtpAwoJO35AW6chB6yspGS1\nn3hWHBg2hn/qkivVDfRZhdw8blKSjEHjq+NxUs/FuVizAxpfyqbUR4YNi0N3dMWo17aiZwID\nAQABAoIBAFSbfRsmq0/hqelKPN3QRbuEPiRVVgVT4m9+1RbTY160LquFQN5k3BI59e3Ykyww\nC/x9WSKNhRpsEKpV94YU3IGKugUHKN5mO7yIhR+p6lNpF0e+yBfEhCRiJ5rNZmuxzO2tExP8\nOk7Ljd2i+S1YVQsZIIFIxegnptGEkO/uvDG1JziBJhdCv9BcuztVQY5oNMV5C+9aY8EScKfo\n6LDTXGCuR3lXdHQIYTOIptOdStJ8HujX/Flk1RxCZOfCSgTvGt5ObU0Nmplx0eX7T6dqop/r\nWcUp7YxaDH7WU/1Sqm/mhNDXOOI8/cz1NR/C1rfQAuFb6TK/w6usWDXRc9DmjdECgYEA5KlI\nddJyN2V2EpJeC4F0Y3m7+PI87xAPHmAyZca/TE3VCwjECXUljZelOEvJVtH0siO94DmiR7oS\nyglSOj7hJBHxxnlmyhvNrPtev2U/9SlXLMva8MDMePA6KraSoc0mmqBgiY6e21n4r2es1/Se\n7YhaO/H60jFkSjJ7VjTbEbECgYEA0aaXkPeSQ9MKgaXFSri3sJa8/P88mFOwaLWVTdfjBb/t\n4TMP6Fz92eJcrbJubkfChxhd9WQ3sG7jeTCX3c2CRURxTVeIpl199SupGTSaOGvvYG5hSsXN\nyonZtvwnBPpyR/WHRqzR+sr8/1JyBov/LWk4FlVfDJ4vSaq7W7lUI5cCgYEAjo8H8QUaVnU4\nTs3YOj4kbRxpWATWfok5k8uPwCpP++eOikmVxvu1RPildlqxlSJi92kXKSNljGhy7GkxTcUE\nIrPZU88+iYUaDt3NLXCXlmaGxhP2VSEumbvT1+tpsdywU7jnVvuHCOSoCduORDlrmFXpQ/RS\nVxeaGjQs9wsPBZECgYAYZgXfliBMimP/oJYsUwD1qSVHYEDiDWNLXE6K56QBCEwb2EByr1fP\noptcj5ZweSN3a2uL4mTkwJLyiKgz5PXTL9rrwFMj4V+GR9V/HHMSO+V42H+0Hv8LIi3XMNMt\nriPcogNjQzuQr0zwPd0NS/+ffk5LsxXDtykTrq3tR8018wKBgQCEgzYQ6k4B10A2hxc2ofq+\nUYIyznDWLk+m1LbfFezhLxyd51sCYnGYuRhIBwWsKcgUulYFHGWNFT86uqnJOAE3R8Ee4a4s\nYVUh2Hpd3D2Et/f1Bxfhu1qr0CK26KAox/0xaXkYLLWiANA5ajsNVgXkLgRHrH3wvkdRy/0h\n2zxXeg==\n-----END RSA PRIVATE KEY-----"]
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
        console.log('Pty event received: ' + require("util").inspect(info));
        var sshStream = accept();
      //  sshStream.exit(0);
      //  sshStream.end();
      });
	  session.on('window-change', function(accept, reject, info) {
        //var sshStream = accept();
		console.log("accept",accept)
		console.log("reject",reject)
        console.log("window-change has been changed")
		console.log(info)
      //  stream.end();
      });
    session.on('shell', function(accept, reject, info) {
        var sshStream = accept();
        //   console.dir(sshStream)
    sshStream.write("Welcome "+auth.user+" To Rainb's!!!\r\n")
        //sshStream.stderr.write('Oh no, the dreaded errors!\n');
    /*sshStream.on("data",function(data){
     sshStream.write(data);
    })*/
	session2=session
    stream2=sshStream
    //require("./sshTerminal.js")(sshStream)
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

