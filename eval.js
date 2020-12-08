//Here we just eval that shit fuck yeah security holes
var repl=require("repl")
function sshEvallol(sshStream){
    fixNewLines=require("./fixnewlines.js")()
    fixNewLines.pipe(sshStream);
    var rpl=repl.start({prompt:"> ",input:sshStream,output:fixNewLines,terminal:true,useColors:true/*,eval:function(cmd, context, filename, callback) {
      
      callback(null, 1);
	  

    }/*/});
      rpl.on('exit', () => {
	      sshStream.write("Have a nice day!\r\n");
	      sshStream.exit(0);
	      sshStream.end();
      });
 
}

module.exports=sshEvallol
