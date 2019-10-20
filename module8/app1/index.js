const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=>{
    console.log('+++ a user has connected +++');
    socket.on('disconnect', ()=>{
        console.log('--- a user has disconnected ---');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', (getFormattedTimestamp() + " " + msg));
    });       
});

function getFormattedTimestamp(){
    var timeStamp = new Date(Date.now());
    var hours = timeStamp.getHours() ; // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var minutes = timeStamp.getMinutes() ;
    var finalTime = hours + ":" + minutes + AmOrPm;
    return finalTime;
};

http.listen(3000, function(){
  console.log('listening on *:3000');
});