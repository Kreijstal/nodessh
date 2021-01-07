var spawn=require('child_process').spawn;
function sshCmd(sshStream){
	var StringDecoder = require('string_decoder').StringDecoder;
	var decoder = require('./BuffString.js')();
	fixNewLines=require("./fixnewlines.js")();
	fixNewLines.pipe(sshStream);
	
	
	var childProcess = spawn('cmd',[]);
	childProcess.stdout.pipe(sshStream.stdout);
//	this.t=childProcess
	sshStream.stdin.pipe(decoder)
	decoder.pipe(fixNewLines)
	//fixNewLines.pipe(childProcess.stdin)
	fixNewLines.pipe(new require('stream').Writable({
    objectMode: true,
    write: function(data, _, done)  {
	console.log(JSON.stringify(data))
	childProcess.stdin.write(data.replace("\r","\r\n"))
      done();
    }
  }))
	//sshStream.stdin.
		    /*{stdio: [sshStream.stdin, sshStream.stdout, sshStream.stderr]});*/ 

    /*var rpl=repl.start({prompt:"> ",input:sshStream,output:fixNewLines,terminal:true,useColors:true,eval:function(cmd, context, filename, callback) {

      callback(null, 1);

    }});
      rpl.on('exit', () => {
	      sshStream.write("Have a nice day!\r\n");
	      sshStream.exit(0);
	      sshStream.end();
      });*/
	  
 
}

module.exports=sshCmd
