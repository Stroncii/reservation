    var Client;
    var Book;
    var progressBar = {};
    var currentDate;
    var logIn = true; // true - for log, false for exit;

    function deleteTag (index) {
      $.ajax({
        url:"/delete",
        data: { index: index, name: Client.name },
        method: 'GET',
        success: function (data){
          if (data.deleteFlag){
            reservations = data.reservations;
            console.log("успех в удалении");
            updatetable(); // updating table
            updatePB ($("#datepicker").datepicker("getDate"));
          } else {
            alert ("У вас нет прав для удаления данной резервации");
          }
      }    
      });
    };


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
            if( $("#datepicker").datepicker("getDate") - new Date(reservations[t].date) == 0 ){
              if (reservations[t].name == Client.name){
                $(".table > tbody").append('<tr class="warning"><td>'+t+'</td><td>'+reservations[t].start+'</td><td>'+reservations[t].end+'</td><td><button type="button" class="btn btn-small btn-primary" onclick="deleteTag(' + t + ')">Удалить</button></td></tr>' );
            } else {
                $(".table > tbody").append('<tr class="warning"><td>'+t+'</td><td>'+reservations[t].start+'</td><td>'+reservations[t].end+'</td><td></td></tr>' );
            }
          }
      }
  };
    

$(document).ready(function(){
  $.ajax({
    url:"/getres",
    data: { book: Book },
    method: 'GET',
    success: function (data){
      reservations = data.reservations;
      updatePB ($("#datepicker").datepicker("getDate"));
     } 
  });   

		$('#repeatin').hide();
		$('#table').hide();
    currentDate = new Date($("#datepicker").datepicker("getDate"));

    // for email checking
    var regExp = new RegExp("^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$");
		// drawing progressbar
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
          if (Client){
            updatetable();
          }
          updatePB($("#datepicker").datepicker("getDate"));

       	 });

         $('#button').click(function() {
         // Create new reservation
          console.log (" А кто у нас хочет бронировать? " + Client);
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

            // Many times reserving
            for (j; j < quantity; j++) {
              console.log ( "Текущая дата в начале цикла " + currentDate);
              console.log("шаг цикла номер: " + j);
              flag = false;
              i = 0;
              Book = new reservation ( new Date(currentDate), $( "#slider" ).slider( "values", 0 ),$( "#slider" ).slider( "values", 1 ), Client.name);
              //new querry!
              $.ajax({
                  url:"/booking",
                  data: { book: Book },
                  method: 'GET',
                  success: function (data){
                    console.log("успех " + data.flag + " "  );
                    if (!data.flag) {
                        reservations = data.reservations;
                        updatetable();
                        updatePB ($("#datepicker").datepicker("getDate"));
                       } else {
                        alert ('Вы не можете забронировать это время');
                       }
                 }
                });   
            currentDate.setDate(currentDate.getDate() + days);
            console.log ( "Текущая дата в конце цикла" + currentDate);
            }
            
            
            } else {
                alert ("Пожалуйста авторизуйтесь");
              }
        });

         // Log in function
         $('#logButton').click(function() {
            var user = $('#username').val();
            var password = $('#password').val();
          if (logIn == true) { // if that's logIn
     /*     if (!regExp.test($('#username').val()) && $('#username').val()) {
            alert ('Введите ваш email');
          }*/
         

          if ( user && password ) {
            Client = new username( user, password );
              $.ajax({
                url:'/check',
                data: { client: Client },
                method: 'GET',
                success: function (data){
                  console.log("успех " + data.flag + " "  );
                  if (!data.flag) {
                    alert ("Пользователь с подобными данными не обнаружен. Зарегистрируйтесь или введите правильный логин и пароль.");
                    Client = null;
                    } else {
                      logIn = false;
                      alert ("Здравствуйте, " + Client.name); 
                      $('#logButton').text('Выйти');
                      $('#table').show();
                      updatetable();
                      $('#fields').hide();
                    }
                 }
              });
          } else {
            alert ('Введите Ваши данные');
          };
        } else { // if it's log out
          logIn = true;
          $('#logButton').text('Войти');
          $('#fields').show();
        }
        }); 
});

    function updatePB (date) {
        var i;
        $('.progress-bar').remove();
        var percents = new Array();
        for (i=0; i<reservations.length; i++){
          if (new Date(reservations[i].date) - new Date(date) == 0 ){
            percents.push((reservations[i].start - 8)*10);  // beginin'
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