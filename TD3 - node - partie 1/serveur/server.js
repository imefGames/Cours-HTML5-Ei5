var http = require('http');

httpServer = http.createServer(function(req,res) {
  console.log('une nouvelle connexion');
  res.end('Bienvenue');
});

httpServer.listen(8080);


var myUsers = new Array; //variable globale qui contiendra l'ensemble des utilisateurs

var io = require('socket.io').listen(httpServer);

// Nouvelle fonction permettant de supprimer un élément dans un tableau
Array.prototype.unset = function(val){
var index = this.indexOf(val)
  if(index > -1){
    this.splice(index,1)
  }
}

var myUsers = new Array;
var prevMessages = [undefined, undefined, undefined];
var nextMessageIndex = 0;

io.sockets.on('connection',function(socket) {
  var me=false;

  console.log('Nouveau utilisateur');

  for(var i=0 ; i < myUsers.length ; i++ ){
    socket.emit('newusr',myUsers[i]);
  }
  
  for(var i=0 ; i < 3 ; i++ ){
	socket.emit('newmsg',prevMessages[(nextMessageIndex+i)%3]);
  }

  socket.on('newmsg', function(message){
    message.user = me; //on va ajouter le nom de l'user au message
    date = new Date(); //on va ajouter l'heure du message
    message.h = date.getHours();  //heure
    message.m = date.getMinutes(); //minutes
    io.sockets.emit('newmsg',message); //on emet un message 'newmsg' à destination des clients
	prevMessages[nextMessageIndex] = message;
	nextMessageIndex = (nextMessageIndex + 1) %3;
  });

  socket.on('login',function(user){
    me = user;
    me.id = user.mail.replace('@','-').replace('.','-');
    socket.emit('logged');
    
    myUsers.push(me);
    
    io.sockets.emit('newusr',me);
  })

  //on détecte une déconnexion
  socket.on('disconnect', function(){
    if(!me){
      return false;
    }
    myUsers.unset(me); //on supprime l'utilisateur du tableau
    io.sockets.emit('disusr',me); //on émet le signal disusr au client pour qu'il puisse enlever l'utilisateur de la liste
  });
  
});