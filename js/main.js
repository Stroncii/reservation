$(document).ready(function(){

		$('#repeatin').hide();
		$('#table').hide();
		var dateObject = $("#datepicker").datepicker("getDate");
		var dateString = $.datepicker.formatDate("dd-mm-yy", dateObject);
    var clients = new Array ();

    var Client;
    function username(name, password) { 
      this.name = name;
      this.password = password;
   }





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
            Client = new username($('#username').val(), $('#password').val())
            clients.push(Client);
            alert ('Your name = ' + clients[clients.length].username);
          } else {
            alert ('Введите логин и пароль');
          }

        });

});