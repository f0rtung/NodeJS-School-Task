function Validator(){

	this.validateUserName = function(userName){
		const namePartCount = 3;
		const trimUserName = userName.trim();
		const splitUserNameResult = trimUserName.split(" ");
		return namePartCount == splitUserNameResult.length;
	}

	this.validateEmail = function(email){
		// крайне просторе регулярное выражение без дополнительных проверок
		const emailRE = new RegExp("^\\w+[\.\\w]+@((yandex.(ru|ua|by|kz|com))|(ya.ru))", "i");
		return null != email.match(emailRE);
	}

	this.validatePhone = function(phone){
		const phoneRE = new RegExp("^\\+7\\(\\d{3}\\)(\\d{3})(-\\d{2}){2}");
		const maxNumSum = 30;
		if(null != phone.match(phoneRE)){
			return maxNumSum >= this.getPhomeNumSum(phone);
		}
		return false;
	}

	this.getPhomeNumSum = function(phone){
		let sum = 0;
		for(let idx = 0; idx < phone.length; ++idx){
			const num = Number.parseInt(phone[idx]);
			if(Number.isInteger(num)){
				sum += num;
			}
		}
		return sum;
	}
}