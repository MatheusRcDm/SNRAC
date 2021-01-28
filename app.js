const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

// mongoose.connect('mongodb://localhost/snrac')
mongoose.connect(config.database, {
    useNewUrlParser: true
});
let db = mongoose.connection

// Checar conexão
db.once('open', function(){
	console.log('Connected to MongoDB');
});

// Checar a existência de erros no DB
db.on('error', function(err){
	console.log(err);
});

// Iniciar o app
const app = express()

const port = 3000

// Trazer os models
let Analise = require('./models/analise');

// Carregar o View Engine
app.set('views', path.join(__dirname, 'views'))
// app.locals.basedir = app.get('views');
app.set('view engine', 'pug')

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Definir a pasta public
app.use(express.static(path.join(__dirname, 'public')))

// Express Session Middleware
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
	res.locals.messages = require('express-messages')(req, res);
	next();
});

// Express Validator Middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root    = namespace.shift()
		, formParam = root;
  
		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));

// Passport Config
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
	res.locals.user = req.user || null;
	next();
});

app.use('/favicon.ico', express.static('views/favicon.ico'));

// Rota da página profile
app.get('/analises/profile', function(req, res){
	Analise.find({}, function(err, analises){
		if(err){
			console.log(err)
		} else {
			res.render('profile', {
				title:'Analises',
				analises: analises
			})
		}
	})
})

// Rota da página inicial
app.get('/', function(req, res){
	res.render('index')
})

// // Rota da página inicial
// app.get('/', function(req, res){
// 	Analise.find({}, function(err, analises){
// 		if(err){
// 			console.log(err)
// 		} else {
// 			res.render('index', {
// 				title:'Analises',
// 				analises: analises
// 			})
// 		}
// 	})
// })

// Arquivos de rotas
let analises = require('./routes/analisesRoute')
let users = require('./routes/usersRoute')
app.use('/analises', analises)
app.use('/users', users)

// Iniciar servidor
app.listen(port, function(){
	console.log(`app listening at http://localhost:${port}`)
})