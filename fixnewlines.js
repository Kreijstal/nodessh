function FixNewLines() {
  //let count = 0

  return new require('stream').Transform({
    objectMode: true,
    transform: function(data, _, done)  {
      done(null, data.replace(/\n/g,"\r\n"));
    }
  });
};

module.exports=FixNewLines

