var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactlist', ['contactlist']);
var bodyParser=require('body-parser');
//app.get('/', function(req, res){
//	res.send("Hello from server.js");
//});

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.get('/contactlist1', function(req, res){
//	console.log("I received a GET Request");
//	person1={
//			name: 'Gokkul',
//			email: 'agn253@nyu.edu',
//			number: '929-240-5611'
//	};
//	person2={
//			name: 'Gokkul1',
//			email: '1agn253@nyu.edu',
//			number: '1929-240-5611'
//	};
//	person3={
//			name: 'Gokkul2',
//			email: '2agn253@nyu.edu',
//			number: '2929-240-5611'
//	};
//	var contactlist=[person1, person2, person3];
//	res.json(contactlist);
	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});	
});
app.post('/contactlist1', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/contactlist1/:id', function(req, res){
	var id=req.params.id;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});
app.get('/contactlist1/:id', function(req, res){
	var id=req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});
app.put('/contactlist1/:id', function(req, res){
	var id=req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
	query: {_id: mongojs.ObjectId(id)}, 
	update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
	new: true}, function(err, doc){
		res.json(doc);
	});
	});

app.listen(3000);
console.log("Server Running on Port 3000");
