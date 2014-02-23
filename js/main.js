    var Client;
    var Book;
    var clients = new Array();
    function username(name, password) { 
      this.name = name;
      this.password = password;
    }

    function reservation (reservationdate, start, end, clientname) {

      this.date = reservationdate;
      this.start = start;
      this.end = end;
      this.name = clientname;
    }
     var reservations = new Array ();

$(document).ready(function(){

		$('#repeatin').hide();
		$('#table').hide();
		var dateObject = $("#datepicker").datepicker("getDate");
		var dateString = $.datepicker.formatDate("dd-mm-yy", dateObject);
    

    





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
          if (1){
            console.log("Дата: " + $(datepicker).datepicker({ dateFormat: 'dd-mm-yy' }).val());
            console.log("Время: " + $( "#slider" ).slider( "values", 0 ));
            console.log("Конец: " + $( "#slider" ).slider( "values", 1 ));
            console.log("Клиент: " + Client.name);
            Book = new reservation ($(datepicker).datepicker({ dateFormat: 'dd-mm-yy' }).val(),$( "#slider" ).slider( "values", 0 ),$( "#slider" ).slider( "values", 1 ), Client.name);
           reservations.push(Book);
            alert ("Вы " + reservations[reservations.length-1].name + " забронировали зал " + reservations[reservations.length-1].date + " c " + reservations[reservations.length-1].start + ":00 по " + reservations[reservations.length-1].end + ":00" );
          }
          
        });

         $('#logButton').click(function() {
          if ($('#username').val() && $('#password').val()){
            Client = new username($('#username').val(), $('#password').val());
            clients.push(Client);
            alert ('Здравствуйте ' + clients[clients.length-1].name);
            $('#table').show();
          } else {
            alert ('Введите логин и пароль');
          };

        });
});