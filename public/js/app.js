var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server');
});

socket.on('message', function (message){
	var momentTimestamp = moment.utc(message.timestamp);



	console.log('new message: ');
	console.log(message.text);

	jQuery('.messages').append('<p><strong>'+momentTimestamp.local().format('h:mm a')+': </strong> '+message.text+'</p>');
});

//Submit new messages

var $form = jQuery('#message-form');

$form.on('submit', function (event){
	event.preventDefault();

	socket.emit('message', {
		text: $form.find('input[name=message]').val()
	});
	
	$form.find('input[name=message]').val('')
	

});