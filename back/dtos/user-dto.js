module.exports = class UserDTO {
	email;
	name;
	phone;
	isActivated;
	id;
	
	constructor(model) {
		this.email = model.email;
		this.name = model.name;
		this.phone = model.phone;
		this.isActivated = model.isActivated;
		this.id = model.id;
	}
}