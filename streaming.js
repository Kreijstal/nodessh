var spawn=require('child_process').spawn;
function sshStreaming(sshStream){
	var StringDecoder = require('string_decoder').StringDecoder;
	var decoder = require('./BuffString.js')();
	fixNewLines=require("./fixnewlines.js")();
	fixNewLines.pipe(sshStream);
	decoder.pipe(fixNewLines)
	var childProcess = spawn('bash',[ "-c","tail -fn +1 ~/stream.rec | asciinema cat -"]);
	childProcess.stdout.pipe(decoder);

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

module.exports=sshStreaming
