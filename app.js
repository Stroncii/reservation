
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var jf = require('jsonfile');
var reservations = new Array ();
var clients = new Array();

var clientsFile = "./clients.json";
var reservationsFile = "./reservations.json";


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// function for booking
app.get('/booking', function(req, res){
	// new booking
  	var reservations = jf.readFileSync(reservationsFile);

  	res.header('Content-Length');
  	var date = new Date (req.query.book.date);
  	var i = 0;
  	flag = false;
  	for (i; i < reservations.length; i++){
  	// если текущая бронь совпадает с пришедшей по дате и пересекается с ней по времени - поднять флаг.               
 		if (( new Date(reservations[i].date) - date == 0 ) && ((+reservations[i].start >= +req.query.book.start && +reservations[i].start < +req.query.book.end) || (+reservations[i].end > +req.query.book.start && +reservations[i].end <= +req.query.book.end) || (+reservations[i].start >= +req.query.book.start && +reservations[i].end <= +req.query.book.end)))
 		{
   			flag = true;
    		break;
 		}  
  	}
  	console.log ("Флаг на сервере равен " + flag);
  	// if everythin' is good new reservation will be created
  	if (!flag) {        
    	reservations.push(req.query.book); 
     	console.log("Количество элементов после проверки " + reservations.length);
   	}
  	res.send({ flag: flag, reservations: reservations });  
  	res.end();
  	jf.writeFileSync(reservationsFile, reservations);
});

//function for check Clients
app.get('/check', function(req, res){
  	var clients = jf.readFileSync(clientsFile);
	res.header('Content-Length');
	var i;
	var clientFlag = false;
    for (i=0; i< clients.length; i++) {
    	//проход по списку зарегистрированных клиентов. Если емейл и пароль совпадают - всё хорошо
        if (clients[i].name == req.query.client.name && clients[i].password == req.query.client.password){
            clientFlag = true;                
            break;
        }
    }
    res.send({ flag: clientFlag });  
    res.end();
});

//function for registration
app.get('/registration', function(req, res){
  	var clients = jf.readFileSync(clientsFile);
  	res.header('Content-Length');
  	var i;
  	var regFlag = true;
    for (i=0; i< clients.length; i++) {
        if (clients[i].name == req.query.user.name){ //если такой пользователь уже имеется в базе
            regFlag = false;                
            break;
        }
    }
    if (regFlag){ // если нет - пдобавляем нового пользователя.
        clients.push(req.query.user);
        jf.writeFileSync(clientsFile, clients);
    }
    res.send({ flag: regFlag });  
    res.end();
});




//function for delete 
app.get('/delete', function(req, res){
  	var reservations = jf.readFileSync(reservationsFile);
	var deleteFlag = false;
	//если удалящий является создателем - удаляем заказ
	if (req.query.name == reservations[+req.query.index].name){
		reservations.splice(+req.query.index, 1);
        console.log(reservations.length);
        deleteFlag = true;        
	}
	res.send({ deleteFlag: deleteFlag, reservations: reservations});
  	res.end();
  	jf.writeFileSync(reservationsFile, reservations);
});

//Функция передаёт заказы из базы для начальной отрисовки интерфейса
app.get('/getres', function(req, res){
 	var reservations = jf.readFileSync(reservationsFile);
  	res.header('Content-Length');
  	res.send({ reservations: reservations });  
  	res.end();
});

app.listen(3000);
