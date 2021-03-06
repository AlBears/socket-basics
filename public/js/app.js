var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

console.log(name+' joined '+room);


jQuery('.room-title').text(room);

socket.on('connect', function(){
	console.log('Connected to socket.io server');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});

});

socket.on('message', function (message){
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages  = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');


	console.log('new message: ');
	console.log(message.text);


	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
});

//Submit new messages

var $form = jQuery('#message-form');

$form.on('submit', function (event){
	event.preventDefault();

	socket.emit('message', {
		name: name,
		text: $form.find('input[name=message]').val()
	});
	
	$form.find('input[name=message]').val('')
	

});