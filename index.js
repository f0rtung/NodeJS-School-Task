function Form(){
	const self = this;
	const formID = "myForm";
	const submitBtnID = "submitButton";
	const inputErrorClassName = "error";
	const validator = new Validator();

	function onSubmit(event){
		const validateResult = self.validate();
		$("input[name]", self.form).removeClass(inputErrorClassName);
		if(!validateResult.isValid){
			prepareInvalidInputs(validateResult.errorFields);
		}
		else{
			$("#" + submitBtnID, self.form).attr("disabled", "disabled");
			ajaxQuery();
		}
		event.preventDefault();
	}

	function ajaxQuery(){
		$.ajax({
			url: self.form.attr("action"),
			data: self.getData(),
			type: self.form.attr("method"),
			success: function(response){
				processResponseResult(response);
			}
		});
	}

	function processResponseResult(response){
		const status = response.status;
		self.resultContainer.removeClass();
		self.resultContainer.addClass(status);
		switch(status){
			case "success":{
				processSuccessResponse(response);
				break;
			}
			case "error":{
				processErrorResponse(response);
				break;
			}
			case "progress":{
				processProgressResponse(response);
				break;
			}
		}
	}

	function processSuccessResponse(response){
		self.resultContainer.text("Success");
	}

	function processErrorResponse(response){
		self.resultContainer.text(response.reason);
	}

	function processProgressResponse(response){
		setTimeout(ajaxQuery, response.timeout);
	}

	function prepareInvalidInputs(inputNames){
		inputNames.forEach(function(name){
			const elem = $("input[name=\"" + name + "\"]", self.form);
			elem.addClass(inputErrorClassName);
		});
	}

	self.inputsOptions = {
		"fio": {
			tagOption: {
				type: "text",
				name: "fio",
				placeholder: "Full name"
			},
			validateInput: function(name){
				return validator.validateUserName(name);
			}
		},
		"email": {
			tagOption: {
				type: "text",
				name: "email",
				placeholder: "E-mail"
			},
			validateInput: function(email) {
				return validator.validateEmail(email);
			}
		},
		"phone": {
			tagOption: {
				type: "text",
				name: "phone",
				placeholder: "Phone"
			},
			validateInput: function(phone) {
				return validator.validatePhone(phone);
			}
		},
		"submitBtn": {
			tagOption: {
				type: "submit",
				id: submitBtnID,
				click: function(event){ 
					onSubmit(event);
				}
			}
		}
	}

	function createForm(inputs){
		let formObj = $("#" + formID);
		if(formObj.length == 0){
			formObj = $("<form/>", {
				id: formID,
				method: "post",
				action: "./fakeResponses/progress.json"
			});
			for(input in inputs){
				appEndInput(formObj, inputs[input].tagOption);
			}
			$("body").append(formObj);
			self.resultContainer = $("<div/>", {id: "resultContainer"});
			$("body").append(self.resultContainer);
		}
		self.form = formObj;
	}

	function appEndInput(formObj, inputOptions){
		const pTag = $("<p/>");
		pTag.append($("<input/>", inputOptions));
		formObj.append(pTag);
	}

	self.getData = function(){
		const dataArr = self.form.serializeArray();
		const data = {}
		for(let idx = 0; idx < dataArr.length; ++idx){
			const name = dataArr[idx].name;
			const value = dataArr[idx].value;
			data[name] = value;
		}
		return data;
	}

	self.setData = function(formOptions){
		let options = formOptions || {};
		for(let name in options){
			let input = $("input[name=\"" + name + "\"]", self.form);
			if(input.length != 0){
				input.val(options[name]);
			}
		}
	}

	self.validate = function(){
		const validateResult = { isValid: true, errorFields: [] };
		const inputs = self.getData();
		for(name in inputs){
			const value = inputs[name];
			if(!self.inputsOptions[name].validateInput(value))
			{
				validateResult.isValid = false;
				validateResult.errorFields.push(name);
			}
		}
		return validateResult;
	}
	
	self.submit = function(){
		$("#" + submitBtnID, self.form).click();
	}

	createForm(self.inputsOptions);
}