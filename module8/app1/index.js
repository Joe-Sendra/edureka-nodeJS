const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

users = [];
io.on('connection', (socket)=>{
    let socketUsername;
    console.log('+++ a user has connected +++');
    socket.on('set username', (username) => {
        if((users.indexOf(username) == -1) && (username !== '')) {
            users.push(username);
            socket.emit('userSet', {username: username});
            socketUsername = username;
            console.log('>>> user set name to >>> ' + socketUsername);
         } else {
            socket.emit('userExists', 'Username ' + username + ' is taken! Try a different username.');
         }        
    });    
    socket.on('chat message', (msg) => {
        var timeUser = getFormattedTimestamp() + ' ' + socketUsername + ':  ';
        io.emit('chat message', ( {stamp: timeUser, message: msg} ));
    });
    socket.on('disconnect', ()=>{
        console.log('--- ' + socketUsername + ' has disconnected ---');
        delete users[users.indexOf(socketUsername)];
    });           
});

function getFormattedTimestamp(){
    var timeStamp = new Date(Date.now());
    var hours = timeStamp.getHours() ; // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    var minutes = (timeStamp.getMinutes() < 10 ? '0' : '') + timeStamp.getMinutes();
    var finalTime = hours + ":" + minutes + AmOrPm;
    return finalTime;
};

http.listen(3000, function(){
  console.log('listening on *:3000');
});