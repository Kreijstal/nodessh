function BufferToStringStream () {                                                                        //let count = 0            
	return new require('stream').Transform({
		objectMode: true,
		transform: function(data, _, done)  {
			done(null, data.toString("utf8")); 
		} 
	});
};



module.exports=BufferToStringStream
