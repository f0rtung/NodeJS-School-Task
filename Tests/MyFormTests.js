describe("Check MyForm when all fields are corrct:", function(){
	it("Check valid params", function(){
		let MyForm = new Form();
		const correctData = {
			"fio": "Попоп Василий Александрович",
			"email": "zadov.vasya@ya.ru",
			"phone": "+7(111)222-33-11"
		};
		const correctValidateResult = { isValid: true, errorFields: [] };
		MyForm.setData(correctData);

		assert.equal(JSON.stringify(MyForm.getData()),
					 JSON.stringify(correctData));

		assert.equal(JSON.stringify(MyForm.validate()), 
			         JSON.stringify(correctValidateResult));
	})
});

describe("Check MyForm when some field is incorrect:", function(){
	let MyForm = new Form();
	const correctData = {
			"fio": "Попоп Василий Александрович",
			"email": "zadov.vasya@ya.ru",
			"phone": "+7(111)222-33-11"
	};
	it("Incorrect fio field", function(){
		MyForm.setData(correctData);
		MyForm.setData({"fio": "Попоп      Василий"});
		const validateResult = { isValid: false, errorFields: ["fio"] };
		assert.equal(JSON.stringify(MyForm.validate()), 
			         JSON.stringify(validateResult));
	});
	it("Incorrect email field", function(){
		MyForm.setData(correctData);
		MyForm.setData({"email": "zadov.vasya@gmail.com"});
		const validateResult = { isValid: false, errorFields: ["email"] };
		assert.equal(JSON.stringify(MyForm.validate()), 
			         JSON.stringify(validateResult));
	});
	it("Incorrect phone field (format)", function(){
		MyForm.setData(correctData);
		MyForm.setData({"phone": "89213600048"});
		const validateResult = { isValid: false, errorFields: ["phone"] };
		assert.equal(JSON.stringify(MyForm.validate()), 
			         JSON.stringify(validateResult));
	});
	it("Incorrect phone field (nums)", function(){
		MyForm.setData(correctData);
		MyForm.setData({"phone": "+7(921)360-00-48"});
		const validateResult = { isValid: false, errorFields: ["phone"] };
		assert.equal(JSON.stringify(MyForm.validate()), 
			         JSON.stringify(validateResult));
	});
});

