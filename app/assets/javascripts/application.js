// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .
function getLists(){
	$.ajax({
		url: '/lists.json',
		method: 'get',
		dataType: 'json',
		success: function(data){
			if(data){
				for(var i=0 ; i < data.length ; i++){
                $('.items').append('<li id="' + data[i].id + '">' + data[i].name + "<a href='JavaScript: deleteItem(" + data[i].id + ")' class='delete'>X</a>" +'</li>' );
				}
			}
			
		},
		error: function(x, status, error){
			alert('something went wrong');
		}

	});
}

function addList(){
	var name = $("#item").val();
	if( name !== ''){
		$("#warning").hide();
		$.ajax({
			url: '/lists.json',
			method: 'post',
			data: { list: {name: name}},
			dataType: 'json',
			success: function(data){
				$('.items').append('<li id="' + data.id + '">' + data.name + "<a href='JavaScript: deleteItem(" + data.id + ")' class='delete'>X</a>" +'</li>' );
				$("#item").val('');
			},
			error: function(x, status, error){
				alert('did not save');
			}
		});
	}
	else{
		$("#warning").text('Text box can not be empty.');
	}
}
function deleteItem(id){
	$.ajax({
		url: '/lists/' + id + '.json',
		method: 'delete',
		dataType: 'json',
		success: function(data){
			$("#" + id).remove();
		},
		error: function(x, status, error){
			alert('not deleted');
		}
	});
}

$( document ).ready(function() {
    console.log( "ready!" );
    getLists();	

});