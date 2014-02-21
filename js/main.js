    var Client;
    function username(name, password) { 
      this.name = name;
      this.password = password;
    }

$(document).ready(function(){

		$('#repeatin').hide();
		$('#table').hide();
		var dateObject = $("#datepicker").datepicker("getDate");
		var dateString = $.datepicker.formatDate("dd-mm-yy", dateObject);
    var clients = new Array();

    





		$('#checkBox').click(function() {
       	 if (!$(this).is(':checked')) {
          	  $('#repeatin').hide(); 
         	   } else{
            	$('#repeatin').show();
          	  }
       	});

       	 var date;
       	 $(document).on('change','#datepicker',function(){
       	 	date = $(datepicker).datepicker({ dateFormat: 'dd-mm-yy' }).val();
       	 	console.log(date);
       	 });

         $('#button').click(function() {
          alert ('HOLA');
        });

         $('#logButton').click(function() {
          if ($('#username').val() && $('#password').val()){
            Client = new username($('#username').val(), $('#password').val());
            clients.push(Client);
            alert ('Здравствуйте' + clients[clients.length-1].name + ' ' + clients[clients.length-1].password);
            $('#table').show();
          } else {
            alert ('Введите логин и пароль');
          };

        });
});