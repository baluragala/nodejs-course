var Category = require('../models/category');


var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../app');
chai.use(chaiHttp);


describe('Categories', function () {

	beforeEach(function (done) {
		Category.remove({}, function (err) {
			done();
		})
	});

	it('/GET categories should GET all categories', function (done) {
		chai.request(app)
			.get('/api/categories')
			.end(function (err, res) {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			})
	})

	it('/POST categories should save catetgory', function (done) {
		let category = {
			name: 'Computers'
		};

		chai.request(app)
			.post('/api/categories')
			.send(category)
			.end(function (err, res) {
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.should.have.property('name');
				res.body.should.have.property('name').eql('computers');
				done();
			})
	})

	it('/POST categories should throw error', function (done) {
		let category = {
		};

		chai.request(app)
			.post('/api/categories')
			.send(category)
			.end(function (err, res) {
				res.should.have.status(500);
				res.body.should.be.a('object');
				res.body.should.have.property('errors');
				res.body.errors.should.have.property('name');
				done();
			})
	})
});