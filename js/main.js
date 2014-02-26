    var Client;
    var Book;
    var clients = new Array();
    var progressBar = {};
    var currentDate;


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

    var progressBar = {};
    function updatePB (date, start, end) {
      if (!progressBar[date]){
        var a;
        progressBar[date] = a;
      } 
      progressBar[date].a.push((start-8)*10);
      progressBar[date].a.push((end-start)*10);
      alert(progressBar[date].a[0] + "  " + progressBar[date].a[1]);
    }

$(document).ready(function(){

		$('#repeatin').hide();
		$('#table').hide();
    currentDate = new Date($("#datepicker").datepicker("getDate"));
		
	//	var dateString = $.datepicker.formatDate("dd-mm-yy", dateObject);
    

    





		$('#checkBox').click(function() {
       	 if (!$(this).is(':checked')) {
          	  $('#repeatin').hide(); 
         	   } else{
            	$('#repeatin').show();
          	  }
       	});

       	 var date;
       	 $(document).on('change','#datepicker',function(){
       	// 	date = $(datepicker).datepicker().val();
          currentDate = new Date($("#datepicker").datepicker("getDate"));
          console.log (currentDate);
        //  currentDate.setDate(currentDate.getDate() + 2);
          
          updatetable();

       	 });

         $('#button').click(function() {
         
          if (Client){
            var j;
            for ()
            var flag = false;
            var i = 0;
            Book = new reservation ( currentDate, $( "#slider" ).slider( "values", 0 ),$( "#slider" ).slider( "values", 1 ), Client.name);
            for (i; i < reservations.length; i++){
              if ((reservations[i].date - Book.date == 0) && ((reservations[i].start >= Book.start && reservations[i].start < Book.end) || (reservations[i].end > Book.start && reservations[i].end <= Book.end) || (reservations[i].start >= Book.start && reservations[i].end <= Book.end)))
                flag = true;
                break;
            }  
            if (!flag) {        
              reservations.push(Book);
              alert ("Вы " + reservations[reservations.length-1].name + " забронировали зал " + reservations[reservations.length-1].date + " c " + reservations[reservations.length-1].start + ":00 по " + reservations[reservations.length-1].end + ":00" );
         //   updatePB (Book.date, Book.start, Book.end);
            updatetable();
          } else {
            alert ("К сожалению вы не можете заказать зал на это время");
          }
          } else {
            alert ("Пожалуйста авторизуйтесь");
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

         function updatetable(){
          $(".table > tbody > tr").remove();
          var i=0;
          console.log(reservations.length);
          for (i; i<reservations.length; i++){
       //     console.log ("мы до ветвления шаг" + i);
        //    console.log ( currentDate == reservations[i].date);
            console.log ("нынешняя дата " + currentDate.getDate() + "        дата существующей резервации " +  reservations[i].date );
            if( currentDate - reservations[i].date ==0 ){
              $(".table > tbody").append('<tr class="warning"><td>'+i+'</td><td>'+reservations[i].start+'</td><td>'+reservations[i].end+'</td><td>Button</td></tr>' );
              console.log ("тут должна была вывестись таблица");
          } else {
            console.log ("мы в ветвлении цикла");
          }
         }
       }
});