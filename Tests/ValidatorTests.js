describe("validateUserName", function(){
	const validator = new Validator();

	it("Check short user name (Попоп Василий)", function(){
		assert.isFalse(validator.validateUserName("Попоп Василий"));
	})
	it("Check long user name (Попоп Василий Александрович Петровский)", function(){
		assert.isFalse(validator.validateUserName("Попоп Василий"));
	})
	it("Check user name with spaces (  Попоп     Василий   )", function(){
		assert.isFalse(validator.validateUserName("  Попоп      Василий   "));
	})
	it("Check correct user name(Попоп Василий Александрович)", function(){
		assert.isTrue(validator.validateUserName("Попоп Василий Александрович"));
	})
});

describe("validateEmail", function(){
	const validator = new Validator();

	it("Check known email domains", function(){
		assert.isTrue(validator.validateEmail("vasya.zadov@ya.ru"));
		assert.isTrue(validator.validateEmail("vasya.zadov@yandex.ru"));
		assert.isTrue(validator.validateEmail("vasya.zadov@yandex.ua"));
		assert.isTrue(validator.validateEmail("vasya.zadov@yandex.by"));
		assert.isTrue(validator.validateEmail("vasya.zadov@yandex.kz"));
		assert.isTrue(validator.validateEmail("vasya.zadov@yandex.com"));
	})
	it("Check unknown email domains", function(){
		assert.isFalse(validator.validateEmail("vasya.zadov@gmail.com"));
		assert.isFalse(validator.validateEmail("vasya.zadov@mail.ru"));
	})
});

describe("getPhomeNumSum", function(){
	const validator = new Validator();

	it("Check phone +7(111)222-33-11", function(){
		assert.equal(validator.getPhomeNumSum("+7(111)222-33-11"), 24);
	});
	it("Check phone +7(111)222-33-44", function(){
		assert.equal(validator.getPhomeNumSum("+7(111)222-33-44"), 30);
	});
	it("Check phone +7(111)222-33-119", function(){
		assert.equal(validator.getPhomeNumSum("+7(111)222-33-119"), 33);
	});
	it("Check phone +7(222)444-55-66", function(){
		assert.equal(validator.getPhomeNumSum("+7(222)444-55-66"), 47);
	});
});

describe("validatePhone", function(){
	const validator = new Validator();

	it("Check phone +7(111)222-33-11", function(){
		assert.isTrue(validator.validatePhone("+7(111)222-33-11"));
	});
	it("Check phone +7(111)222-33-119", function(){
		assert.isFalse(validator.validatePhone("+7(111)222-33-119"));
	});
	it("Check phone +7(111)222-33-44", function(){
		assert.isTrue(validator.validatePhone("+7(111)222-33-44"));
	});
	it("Check phone +7(222)444-55-66", function(){
		assert.isFalse(validator.validatePhone("+7(222)444-55-66"));
	});
	it("Check phone +7(222)444-55-66", function(){
		assert.isFalse(validator.validatePhone("+7(222)444-55-66"));
	});
});