UNIT_ICON_SIZE = 30;

function Unit (name, image, hex, mapGroup) {
	this.name = name;
	this.hex = hex;

	this.mapGroup = mapGroup;
	this.unitGroup = this.mapGroup.group().draggable();

	this.setImage(image);

	this.unitGroup.on('click', this.unitClick);
}

Unit.prototype.getCircle = function() {
	return this.unitGroup.get(0);
}

Unit.prototype.getImage = function() {
	return this.unitGroup.get(1);
}

Unit.prototype.setImage = function(image="blank", opacity) {
	// if this is the first unit, draw the background disc
	if(!this.unitGroup.get(0)) {
		this.unitGroup.circle(40)
			     .fill("#FFFFFF")
			     .stroke({color: '#000000', width: 1.0})
			     .center(this.hex.getPolygon().cx(), this.hex.getPolygon().cy());

	}

	image = this.unitGroup.image('images/game-icons.net/' + image + '.svg')
				 .size(UNIT_ICON_SIZE, UNIT_ICON_SIZE)
				 .center(this.hex.getPolygon().cx(), this.hex.getPolygon().cy())
				 .opacity(opacity);

	if(this.image) {
		this.getImage().replace(image);
	}
	this.image = image;

	return this.unitGroup;
}

// ==================== helpers ====================
Unit.prototype.moveTo = function(destinationHex) {
	dx = destinationHex.getPolygon().cx() - this.hex.getPolygon().cx();
	dy = destinationHex.getPolygon().cy() - this.hex.getPolygon().cy();

	console.log("hex: (" + this.hex.getPolygon().cx() + "," + this.hex.getPolygon().cy() + "), dest: (" + destinationHex.getPolygon().cx() + "," + destinationHex.getPolygon().cy() + ")");

	console.log("Moving to (" + destinationHex.row + "," + destinationHex.col + "): " + dx + "," + dy);

	this.hex = destinationHex;

	this.unitGroup.animate().dmove(dx, dy);
}

// ==================== event handlers ====================

Unit.prototype.unitClick = function(event) {
	console.log(event);
	console.log(this.cx() + "," + this.cy());

	// this.unitGroup.get(0).toggleClass("selectedHex");
}

Unit.prototype.dragmove = function(event) {
	console.log(event);
	console.log(this.cx() + "," + this.cy());
}

Unit.prototype.dragmove = function(event) {
	console.log(event);
	console.log(this.cx() + "," + this.cy());
}