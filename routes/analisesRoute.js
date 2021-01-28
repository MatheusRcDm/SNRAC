const express = require('express');
const router = express.Router();

// Analise Model
let Analise = require('../models/analise');

// User Model
let User = require('../models/user');

// Adicionar rota
router.get('/add', ensureAuthenticated, function(req, res){
	res.render('add_analise', {
		title:'Add Analise'
	});
});

router.get('/profile', ensureAuthenticated, function(req, res){
	res.render('profile', {
		title:'Profile'
	});
});

// Adicionar a rota do Submit POST
router.post('/add', function(req, res){
	req.checkBody('title','Title is required').notEmpty();

	// Get Errors
	let errors = req.validationErrors();

	if(errors){
		res.render('add_analise', {
			title:'Add Analise',
			errors: errors
		});
	} else {
		let analise = new Analise();

		analise.title = req.body.title;
		analise.type = req.body.type;
		analise.author = req.user._id;

		if (analise.type == 'folha') {
			// Macro Nutrientes Folha
			analise.valorCalcio_f = req.body.valorCalcio_f;
			analise.valorEnxofre_f = req.body.valorEnxofre_f;
			analise.valorFosforo_f = req.body.valorFosforo_f;
			analise.valorMagnesio_f = req.body.valorMagnesio_f;
			analise.valorNitrogenio_f = req.body.valorNitrogenio_f;
			analise.valorPotassio_f = req.body.valorPotassio_f;

			// Micro Nutrientes Folha
			analise.valorBoro_f = req.body.valorBoro_f;
			analise.valorFerro_f = req.body.valorFerro_f;
			analise.valorManganes_f = req.body.valorManganes_f;
			analise.valorOrganica_f = req.body.valorOrganica_f;
			analise.valorCobre_f = req.body.valorCobre_f;
			analise.valorZinco_f = req.body.valorZinco_f;
		} else if (analise.type == 'solo') {
			// Macro Nutrientes Solo
			analise.valorCalcio_s = req.body.valorCalcio_s;
			analise.valorEnxofre_s = req.body.valorEnxofre_s;
			analise.valorFosforo_s = req.body.valorFosforo_s;
			analise.valorMagnesio_s = req.body.valorMagnesio_s;
			analise.valorPotassio_s = req.body.valorPotassio_s;

			// Micro Nutrientes Solo
			analise.valorBoro_s = req.body.valorBoro_s;
			analise.valorAcidez_s = req.body.valorAcidez_s;
			analise.valorManganes_s = req.body.valorManganes_s;
			analise.valorOrganica_s = req.body.valorOrganica_s;
			analise.valorCobre_s = req.body.valorCobre_s;
			analise.valorZinco_s = req.body.valorZinco_s;
		}
		
		analise.save(function(err){
			if(err){
				console.log(err);
				return;
			} else {
				req.flash('success','Analise adicionada');
				res.redirect('/analises/profile');
			}
		});
		console.log(analise.author);
	}
});

// Deletar análise - antigo
router.delete('/:id', function(req, res){
	if(!req.user._id){
		res.status(500).send();
	}

	let query = {_id:req.params.id}

	Analise.findById(req.params.id, function(err, analise){
		if(analise.author != req.user._id){
			res.status(500).send();
		} else {
			Analise.remove(query, function(err){
				if(err){
					console.log(err);
				}
				res.send('Success');
			});
		}
	});
  });

// Deletar análise - antigo ajustado
// router.delete('/:id', function(req, res){
// 	// if(!req.user._id) {
// 	// 	res.status(500).send();
// 	// }

// 	let query = {_id:req.params.id}

// 	const analise = Analise.findById(req.params.id)

// 	Analise.findById(req.params.id, function(err, analise) {
// 		if(analise.author != req.user._id) {
// 			res.status(500).send();
// 		} else {
// 			Analise.remove(query, function(err){
// 				if(err){
// 					console.log(err);
// 				}
// 				res.send('Success');
// 			});
// 		}
// 	});
// });

// Deletar análise
// router.delete('/:id', function(req, res){
// 	if(!req.user._id) {
// 		res.status(500).send();
// 	}

// 	let query = {_id:req.params.id}

// 	const analise = Analise.findById(req.params.id);

// 	if(analise.author != req.user._id) {
// 		res.status(500).send();
// 	} else {
// 		remove = Analise.findByIdAndRemove(query);
// 		if(remove) {
// 			res.send('Success');
// 		}
// 	};
// });

// Trazer uma única análise - antigo
router.get('/:id', function(req, res){
	Analise.findById(req.params.id, function(err, analise){
		User.findById(analise.author, function(err, user){
			res.render('analise_result', {
				analise: analise,
				author: user.name
			});
		});
	});
});

// // Trazer uma única análise 
// router.get('/:id', function(req, res){
// 	const analise = Analise.findById(req.params.id);
// 	const user = User.findById(analise.author);
// 	if (user) {
// 		res.render('analise_result', {
// 			analise: analise,
// 			author: user.name
// 		});
// 	}
// });

// Access Control
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	  	return next();
	} else {
		req.flash('danger', 'Necessário fazer login');
		res.redirect('/users/login');
	}
}

module.exports = router;