(function($){

  var socket = io.connect('http://localhost:8080');
  
  $('#users').hide();
  $('#messages').hide();
  $('#form').hide();
  $('#chat').hide();

  $('#loginform').submit(function(event){
    event.preventDefault();
    socket.emit('login', {
      username  : $('#username').val(),
      mail    : $('#password').val()
    });
  })
  
  socket.on('newusr', function(user) {
    $('#listusers').append('<li id=' +user.id +'>'+ user.username + '</li>'); //on modifie le code de la liste en ajoutant un id pour la suppression
  });

  socket.on('disusr', function(user) {
    $('#' + user.id).remove(); //on supprime l'utilisateur de la liste
  });
  
  socket.on('logged',function(){
    $('#login').fadeOut();
    $('#message').focus(); //met le focus pour la saisie du message
	$('#users').show();
	$('#messages').show();
	$('#form').show();
	$('#chat').show();
  });

  socket.on('newmsg', function(message){
	if(message == undefined) {
	  return;
	}
    var msgtpl = $('#msgtpl').html();
    $('#messages').append('<div class="message">' + Mustache.render(msgtpl,message) + '</div>');
  });
  
  $('#form').submit(function(event) {
    event.preventDefault();
	if($('#message').val() == "") {
		return;
	}
    socket.emit('newmsg', {message: $('#message').val()});
    $('#message').val(''); //pour éviter le flood...
    $('#message').focus(); //pour remettre le focus
  });
  
})(jQuery); 