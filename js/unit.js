UNIT_ICON_SIZE = 30;

function Unit (name, image, hex, map) {
	this.name = name;
	this.hex = hex;

	this.map = map;
	this.unitGroup = this.map.mapGroup.group().draggable();

	this.setImage(image);

	this.unitGroup.on("click", this.click.bind(this));
	this.unitGroup.on("dragend", this.dragend.bind(this));
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

	return this;
}

Unit.prototype.snapTo = function(destinationHex) {
	dx = destinationHex.getPolygon().cx() - this.unitGroup.cx();
	dy = destinationHex.getPolygon().cy() - this.unitGroup.cy();

	this.hex = destinationHex;

	this.unitGroup.dmove(dx, dy);

	return this;
}

// ==================== event handlers ====================

Unit.prototype.click = function(event) {
	// console.log(event);
	// console.log("UNIT CLICK: " + this.cx() + "," + this.cy());

	// this.unitGroup.get(0).toggleClass("selectedHex");
}

// (0*65)+32.5

// this is how to tell if a unit is in a hexm given it's row/col... but we want to go backwards. Given x,y coords, what hex am I in?
// map.hexMap[1][0].hexGroup.inside(map.units[0].unitGroup.cx(), map.units[0].unitGroup.cy()) 

Unit.prototype.dragend = function(event) {
	// console.log(event);
	console.log(this);

	// (col % 2 ? 32.5 : 0)

	col = Math.floor(this.unitGroup.cx() / 56.25);
	row = Math.floor((this.unitGroup.cy() - (col % 2 ? 32.5 : 0)) / 65);

	destinationHex = this.map.hexMap[row][col];

	console.log("UNIT DRAGEND: (" + this.unitGroup.cx() + "," + this.unitGroup.cy() + ") => (" + row + "," + col + ")");

	this.snapTo(destinationHex);
}