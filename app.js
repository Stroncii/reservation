
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
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
  res.header('Content-Length');
  console.log("Количество элементов " + reservations.length);
  var date = new Date (req.query.book.date);
  console.log(date);
  var i = 0;
  flag = false;
  for (i; i < reservations.length; i++){
  	console.log( "Разница дат на шаге номер " + i + " " + (new Date(reservations[i].date) - date ));
  // make new request                
 	if (( new Date(reservations[i].date) - date == 0 ) && ((+reservations[i].start >= +req.query.book.start && +reservations[i].start < +req.query.book.end) || (+reservations[i].end > +req.query.book.start && +reservations[i].end <= +req.query.book.end) || (+reservations[i].start >= +req.query.book.start && +reservations[i].end <= +req.query.book.end)))
 	{
   		 flag = true;
    	 break;
 	}  
  }
  console.log ("Флаг на сервере равен " + flag);
  // if everythin' is good we new reservation will be created
  if (!flag) {        
     reservations.push(req.query.book); 
     console.log("Количество элементов после проверки " + reservations.length);
   }
  res.send({ flag: flag, reservations: reservations });  
  res.end();
});

//function for check Clients
app.get('/check', function(req, res){
	console.log ("мы тут");
	res.header('Content-Length');
	var i;
	var clientFlag = true;
    for (i=0; i< clients.length; i++) {
        if (clients[i].name == req.query.client.name && clients[i].password != req.query.client.password){
            clientFlag = false;                
            break;
        }
    }
    if (clientFlag){
        clients.push(req.query.client);
    }
    res.send({ flag: clientFlag });  
    res.end();
});



//function for delete 
app.get('/delete', function(req, res){
	console.log ("запрос на удаление записи: " + req.query.index);
	var deleteFlag = false;
	if (req.query.name == reservations[+req.query.index].name){
		reservations.splice(+req.query.index, 1);
        console.log(reservations.length);
        deleteFlag = true;        
	}
	res.send({ deleteFlag: deleteFlag, reservations: reservations});
});

app.listen(3000);
