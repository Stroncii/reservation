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
          console.log (" Дата сменилась сама:   " + currentDate);
        //  currentDate.setDate(currentDate.getDate() + 2);
          
          updatetable();

       	 });

         $('#button').click(function() {
         
          if (Client){
            var j = 0, quantity, days;
            var flag = false;
            var i;
            
            
            if ($('#checkBox').is(':checked')){
              quantity = $( "#slidercount" ).slider( "values", 0 );
              days = $( "#sliderday" ).slider( "values", 0 );
            } else {
              quantity = 1;
              days = 0;
            }
            alert (quantity + "    " + days);
            for (j; j < quantity; j++) {
              console.log ( "Текущая дата в начале цикла " + currentDate);
              console.log("шаг цикла номер: " + j);
              flag = false;
              i = 0;
              Book = new reservation ( new Date(currentDate), $( "#slider" ).slider( "values", 0 ),$( "#slider" ).slider( "values", 1 ), Client.name);
              for (i; i < reservations.length; i++){
                if ((reservations[i].date - Book.date == 0) && ((reservations[i].start >= Book.start && reservations[i].start < Book.end) || (reservations[i].end > Book.start && reservations[i].end <= Book.end) || (reservations[i].start >= Book.start && reservations[i].end <= Book.end)))
                {
                  flag = true;
                  console.log(flag + " почему он стал правдой: дата бронировки: " + Book.date + "  дата существующего резерва  " + reservations[i].date);
                  break;
                }  
                }
                if (!flag) {        
                  reservations.push(Book);
                  alert ("Вы " + reservations[reservations.length-1].name + " забронировали зал " + reservations[reservations.length-1].date + " c " + reservations[reservations.length-1].start + ":00 по " + reservations[reservations.length-1].end + ":00" ); 
       //       } // end of cycle
           //   updatePB (Book.date, Book.start, Book.end);             
                } else {
                  alert ("К сожалению вы не можете заказать зал на это время");
                } 

              console.log(" Прибавили дни ");
              currentDate.setDate(currentDate.getDate() + days);
                             // currentDate.setDate(currentDate.getDate() + days);
                console.log ( "Текущая дата в конце цикла" + currentDate);
              }
              } else {
              alert ("Пожалуйста авторизуйтесь");
              }
          updatetable();
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
          var t=0;
          console.log(reservations.length);
          for (t; t<reservations.length; t++){
       //     console.log ("мы до ветвления шаг" + i);
        //    console.log ( currentDate == reservations[i].date);
            console.log ("нынешняя дата " + $("#datepicker").datepicker("getDate") + "        дата существующей резервации " +  reservations[t].date );
            if( $("#datepicker").datepicker("getDate") - reservations[t].date == 0 ){
              $(".table > tbody").append('<tr class="warning"><td>'+t+'</td><td>'+reservations[t].start+'</td><td>'+reservations[t].end+'</td><td>Button</td></tr>' );
      //        console.log ("тут должна была вывестись таблица");
          } else {
       //     console.log ("мы в ветвлении цикла");
          }
         }
       }
});