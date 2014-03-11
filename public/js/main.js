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


	function username(name, password) { // объект пользователя
	    this.name = name;
	    this.password = password;
	}

	function reservation (reservationdate, start, end, clientname) { // объект резервации - имя, время начала, время конца, имя клиента
	    this.date = reservationdate;
	    this.start = start;
	    this.end = end;
	    this.name = clientname;
	}

	var reservations = new Array ();

	function updatetable(){ // функция обновления таблицы заказов
		$(".table > tbody > tr").remove();
		var t=0;
		for (t; t<reservations.length; t++){
			date = new Date(reservations[t].date);
		  	    if (reservations[t].name == Client.name){ // если очередная резервация создана текущим клиентом поле будет иметь кнопку удалить
				    $(".table > tbody").append('<tr class="warning"><td>' + date.getDate() + "/" + (date.getMonth()+1) + "/" + (date.getYear()+1900)+'</td><td>'+reservations[t].start+':00</td><td>'+reservations[t].end+':00</td><td><button type="button" class="btn btn-small btn-primary" onclick="deleteTag(' + t + ')">Удалить</button></td></tr>' );
			    } else { // иначе - не будет
					$(".table > tbody").append('<tr class="warning"><td>' + date.getDate() + "/" + (date.getMonth()+1) + "/" + (date.getYear()+1900)+'</td><td>'+reservations[t].start+':00</td><td>'+reservations[t].end+':00</td><td></td></tr>' );
				}
	  	}
    };
	

$(document).ready(function(){
    $.ajax({ // запрос для первоначальной отрисовки прогрессбара
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
	$('#registration').hide();
	//for cancelled old reservations
	var today = new Date($("#datepicker").datepicker("getDate"));
	currentDate = new Date($("#datepicker").datepicker("getDate"));

	// for email checking
	var regExp = new RegExp("^[-._a-zA-Z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$");
		// drawing progressbar
	$(".progress").append('<div class="progress-bar progress-bar-success" style="width: 100%"><span class="sr-only"></span></div>');
	//скрытие блока регистрации
	$('#cancel').click(function() {
		$('#registration').hide("slow");
		$('#email').val('');
	    $('#regpassword').val('');
	});

	//Открытие формы резервации
	$('#callReg').click( function(event){
	    event.preventDefault();
	    $('#registration').show("slow");
	});

	// registration
	$('#regButton').click(function(){
	    var email = $('#email').val();
	    var pass = $('#regpassword').val();
	    if (email && pass) {
			if (!regExp.test(email)) { //have to be email
				alert ('Введите email');
			} else { //email is checked
		   		var newUser = new username (email, pass);
		    $.ajax({
				url:"/registration",
				data: { user: newUser },
				method: 'GET',
				success: function (data){
					console.log("успех в регистрации" + data.flag + " "  );
					if (data.flag) {
						alert ('Вы успешно зарегистрировались. Войдите, чтобы продолжить работу');
						$('#registration').hide("slow");
						$('#email').val('');
						$('#regpassword').val('');
					} else {
						alert ('Такой пользователь уже существует');
					}
				}
			}); // end of request  
		}
	  } else { // fields are empty
			alert ("Введите данные");
	  }
	});




	// click on checkbox
	$('#checkBox').click(function() {
		if (!$(this).is(':checked')) {
			$('#repeatin').hide(); 
		} else{
			$('#repeatin').show();
		}
	});

	var date;
	// Изменение даты
	$(document).on('change','#datepicker',function(){
		currentDate = new Date($("#datepicker").datepicker("getDate"));
		console.log (" Дата сменилась сама:   " + currentDate);
		if (Client){
			updatetable();
		}
		updatePB($("#datepicker").datepicker("getDate"));
	});

	// Создание бронировок
	$('#button').click(function() {	
		console.log (" А кто у нас хочет бронировать? " + Client);
		if (Client){ // если есть авторизованный пользователь
			var j = 0, quantity, days;
			var flag = false;
			var i;
			
			if ($('#checkBox').is(':checked')) { // если chexbox активирован - считать количество повторений и период
			    quantity = $( "#slidercount" ).slider( "values", 0 );
			    days = $( "#sliderday" ).slider( "values", 0 );
			} else { // иначе - 1 повторение
			    quantity = 1;
			    days = 0;
			}

			// Many times reserving
			for (j; j < quantity; j++) { // каждое резервирование объявляется в цикле
			    flag = false;
			    i = 0;
			    if ((new Date(currentDate) - new Date(today) ) >= 0) { // защита от бронировок на прошедшее время
			  		Book = new reservation ( new Date(currentDate), $( "#slider" ).slider( "values", 0 ),$( "#slider" ).slider( "values", 1 ), Client.name);
			  		//new querry!
			  		$.ajax({
				   		url:"/booking",
				    	data: { book: Book }, // передаём данные на сервер для сравнения 
				 		method: 'GET',
				  		success: function (data){
							console.log("успех " + data.flag + " "  );
							if (!data.flag) { // если false - резервация создана
								reservations = data.reservations;
								updatetable();
								updatePB ($("#datepicker").datepicker("getDate"));
					   		} else {
								alert ('Вы не можете забронировать это время');
					   		}
				 		}
					});   
					currentDate.setDate(currentDate.getDate() + days); // увеличиваем дни
				} else {
			  		alert ('Вы не можете забронировать на эту дату, потому что она уже прошла.');
				}
		  	} // конец цикла
		} else { // необходимо авторизоваться
				alert ("Пожалуйста авторизуйтесь");
		}
	}); // end of reservin function

		 // Log in function
		$('#logButton').click(function() {
			var user = $('#username').val();
			var password = $('#password').val();
		  	if (logIn == true) { // Если в данный момент происходит ВХОД
				if (!regExp.test(user)) { // если содержимое поля email
			  		alert ('Введите ваш email');
				} else {
					if ( user && password ) { // если поля заполнены правильно
			  		Client = new username( user, password ); // создаём нового клиента
					$.ajax({ // запрос на сервер
				  		url:'/check',
				  		data: { client: Client },
				  		method: 'GET',
				 		success: function (data){
							if (!data.flag) { // такого пользователя нет или неправильный пароль. Для конфиденциальности сообщение в обоих случаях одинаковое
					  			alert ("Пользователь с подобными данными не обнаружен. Зарегистрируйтесь или введите правильне данные.");
					  			Client = null;
					  		} else { // такой пользователь есть - дорисовка интерфейса
								logIn = false;
								alert ("Здравствуйте, " + Client.name); 
								$('#logButton').text('Выйти');
								$('#table').show();
								updatetable();
								$('#fields').hide("slow");
					  		}
				   		}
					});
					} else {
			  			alert ('Введите Ваши данные');
					};
		  		}
			} else { // если это выход - скидывается клиент, перерисовывается интерфейс
		  		logIn = true;
		  		updatetable();
		  		$('#table').hide();
		  		$('#logButton').text('Войти');
		  		$('#fields').show("slow");
		  		$('#username').val('');
		  		$('#password').val('');
		  		Client = null;
			}
		}); // end of Log in/out function
}); // end of codument.ready

	function updatePB (date) { // функция для отрисовки progressbar
		var i;
		$('.progress-bar').remove();
		var percents = new Array();
		for (i=0; i<reservations.length; i++){ // создаётся массив формата [%start, %end, %start, %end, ...] так как прогрессбар зависит от процентов
		  	if (new Date(reservations[i].date) - new Date(date) == 0 ){
				percents.push((reservations[i].start - 8)*10);  // beginin'
				percents.push((reservations[i].end - 8)*10); // width
		  	}
		}
		percents.sort(function(a,b){return a - b});
		// как отрисовывается прогрессбар - подряд идут элементы в процентах - начало занятой области, конец занятой области. до первого элемента и после последнего - отрисовывается зеленая область
		if (percents.length) {
			$('.progress').append ('<div class="progress-bar progress-bar-success" style="width:' + percents[0] + '%"><span class="sr-only"></span></div>');
			// отрисована первая красная область (от 0% до 0-го элемента)
			for (i=0; i<percents.length; i+=2){
			 	$('.progress').append ('<div class="progress-bar progress-bar-danger" style="width:' + (percents[i+1]-percents[i]) + '%"><span class="sr-only"></span></div>');
			  	//рисуется очередная занятая область

			  	if (percents[i+2]) {
					//рисуется следующая зелёная область, так как текущая занятая облать не последняя
					$('.progress').append ('<div class="progress-bar progress-bar-success" style="width:' + (percents[i+2]-percents[i+1]) + '%"><span class="sr-only"></span></div>');
				} 
			}      
			$('.progress').append ('<div class="progress-bar progress-bar-success" style="width:' + (100-percents[percents.length-1]) + '%"><span class="sr-only"></span></div>');     
		} else $('.progress').append ('<div class="progress-bar progress-bar-success" style="width:100%"><span class="sr-only"></span></div>');
		//если нет заказов в этот день - рисуется 100% зелёная область
	} // end of function