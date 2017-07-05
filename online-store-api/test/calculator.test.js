var Calculator = require('../calculator');
var should = require('chai').should();


describe('Calculator', function () {
	it('should return 4 for add of 2,2', function () {
		var result = Calculator.add(2, 2);
		result.should.be.eql(4);
	})
});