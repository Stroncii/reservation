    var Client;
    var Book;
    var clients = new Array();
    var progressBar = {};
    var currentDate;
    function deleteTag (index) {

      if (Client.name = reservations[index].name) {
        reservations.splice(index, 1);
        console.log(reservations.length);
        updatetable(); // updating table
        updatePB ($("#datepicker").datepicker("getDate"));
      } else {
        alert ("У вас нет прав для уаления данной резервации");
      }
    }


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

     function updatetable(){
          $(".table > tbody > tr").remove();
          var t=0;
          console.log(reservations.length);
          for (t; t<reservations.length; t++){
            console.log ("нынешняя дата " + $("#datepicker").datepicker("getDate") + "        дата существующей резервации " +  reservations[t].date );
            if( $("#datepicker").datepicker("getDate") - reservations[t].date == 0 ){
              $(".table > tbody").append('<tr class="warning"><td>'+t+'</td><td>'+reservations[t].start+'</td><td>'+reservations[t].end+'</td><td><button type="button" class="btn btn-small btn-primary" onclick="deleteTag(' + t + ')">Удалить</button></td></tr>' );
            } else {
            }
          }
      }
    

$(document).ready(function(){

		$('#repeatin').hide();
		$('#table').hide();
    currentDate = new Date($("#datepicker").datepicker("getDate"));
		
    $(".progress").append('<div class="progress-bar progress-bar-success" style="width: 100%"><span class="sr-only"></span></div>');




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
          updatePB (new Date(currentDate));

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
          updatePB ($("#datepicker").datepicker("getDate"));
        });

         $('#logButton').click(function() {
          var i;
          var clientFlag = true;
          if ($('#username').val() && $('#password').val()){
            Client = new username($('#username').val(), $('#password').val());
            for (i=0; i< clients.length; i++){
              if (clients[i].name = Client.name && clients[i].password != Client.password){
                clientFlag = false;
                alert ("  Введите правильный логин и пароль.");
                Client = null;
                break;
              }
            }
            if (clientFlag){
              clients.push(Client);
              alert ('Здравствуйте ' + clients[clients.length-1].name);
              $('#table').show();
            }
          } else {
            alert ('Введите логин и пароль');
          };

        }); 
});

    function updatePB (date) {
        var i;
        $('.progress-bar').remove();
        var percents = new Array();
        for (i=0; i<reservations.length; i++){
          if (reservations[i].date - date == 0 ){
            percents.push((reservations[i].start-8)*10);  // beginin'
            percents.push((reservations[i].end - 8)*10); // width
          }
        }
        percents.sort(function(a,b){return a - b});
        console.log(percents);
        if (percents.length) {
            $('.progress').append ('<div class="progress-bar progress-bar-success" style="width:' + percents[0] + '%"><span class="sr-only"></span></div>');
            console.log("  Нарисовали первую зелёную область ");
            for (i=0; i<percents.length; i+=2){
              $('.progress').append ('<div class="progress-bar progress-bar-danger" style="width:' + (percents[i+1]-percents[i]) + '%"><span class="sr-only"></span></div>');
              console.log("  Нарисовали красную область ");

              if (percents[i+2]) {
                console.log ("i+2 существует - рисуем следующую зелёнку");
                $('.progress').append ('<div class="progress-bar progress-bar-success" style="width:' + (percents[i+2]-percents[i+1]) + '%"><span class="sr-only"></span></div>');
                } 
            }      
            $('.progress').append ('<div class="progress-bar progress-bar-success" style="width:' + (100-percents[percents.length-1]) + '%"><span class="sr-only"></span></div>');     
        } else $('.progress').append ('<div class="progress-bar progress-bar-success" style="width:100%"><span class="sr-only"></span></div>');
      }