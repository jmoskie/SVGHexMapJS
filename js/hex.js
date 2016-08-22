BACKGROUND_ICON_SIZE = 50;

// TODO: it would be smart to move this to json files for different games, or something.
HEX_TYPES =[
	{
		"name" 		: "water",
		"color" 	: "#1A6ABA",
		"image" 	: "at-sea",
		"isPassable": false,
		"moveCost" 	: 0
	},
	{
		"name" 		: "grassland",
		"color" 	: "#7DBF50",
		"image" 	: "high-grass",
		"isPassable": true,
		"moveCost" 	: 1
	},
	{
		"name" 		: "desert",
		"color" 	: "#B0A03C",
		"image" 	: "palm-tree",
		"isPassable": true,
		"moveCost" 	: 2
	},
	{
		"name" 		: "mountain",
		"color" 	: "#634B15",
		"image" 	: "peaks",
		"isPassable": false,
		"moveCost" 	: 0
	},
	{
		"name" 		: "forest",
		"color" 	: "#117D44",
		"image"		: "forest",
		"isPassable": true,
		"moveCost" 	: 0
	}
];

HEX_GROUP_BACKGROUND	= 0;
HEX_GROUP_MIDDLEGROUND	= 1;
HEX_GROUP_FOREGROUND	= 2;	// TODO: foreground needs to go in its own layer, above units.

function Hex (row, col, type, mapGroup) {
	this.row = row;
	this.col = col;
	this.mapGroup = mapGroup;
	this.hexGroup = mapGroup.group();

	dx = 56.25 * col;
	dy = 65 * row + (col % 2 ? 32.5 : 0);

	points = [[75+dx,32.5+dy], [56.25+dx,65+dy], [18.75+dx,65+dy], [0+dx,32.5+dy], [18.75+dx,0+dy], [56.25+dx,0+dy]];

	// create three groups
	backgroundGroup   = this.hexGroup.group();
	middlegroundGroup = this.hexGroup.group();
	foregroundGroup   = this.hexGroup.group();

	backgroundGroup.polygon().addClass("hex").fill("#E6E6E6").stroke({color: '#303030', width: 0.5}).plot(points);
	foregroundGroup.polygon().fill("none").stroke("none").plot(points);

	// add background image, if this hex type has one
	this.setType(type);

	// TODO: Move this out of the loop...
	this.hexGroup.on("click", this.hexGroupClick);
	this.hexGroup.on("mousedown", this.mousedown);
	this.hexGroup.on("mouseup", this.mouseup);

	this.hexGroup.mouseover(function() {
		this.get(HEX_GROUP_FOREGROUND).get(0).addClass("hoveredHex");
	});

	this.hexGroup.mouseout(function() {
		this.get(HEX_GROUP_FOREGROUND).get(0).removeClass("hoveredHex");
	});
}

Hex.prototype.setType = function(type) {
	this.type = type;

	this.getPolygon().fill(HEX_TYPES[type].color);
	this.setBackgroundImage(HEX_TYPES[type].image, 0.30);
}

// background tile groups get sepcial helper functions for the their polygon and icon
Hex.prototype.getPolygon = function() {
	return this.hexGroup.get(HEX_GROUP_BACKGROUND).get(0);
}

Hex.prototype.getBackgroundImage = function() {
	return this.hexGroup.get(HEX_GROUP_BACKGROUND).get(1);
}

Hex.prototype.setBackgroundImage = function(image="blank", opacity) {
	image = this.hexGroup.image('images/game-icons.net/' + image + '.svg')
						 .size(BACKGROUND_ICON_SIZE, BACKGROUND_ICON_SIZE)
						 .center(this.getPolygon().cx(), this.getPolygon().cy())
						 .opacity(opacity);

	if(!this.getBackgroundImage()) {
		this.hexGroup.get(HEX_GROUP_BACKGROUND).add(image);
	} else {
		this.getBackgroundImage().replace(image);
	}
}

// ==================== event handlers ====================

Hex.prototype.hexGroupClick = function(event) {
	console.log("HEX CLICK: " + this.cx() + "," + this.cy());

	this.get(HEX_GROUP_FOREGROUND).get(0).toggleClass("selectedHex");

	if(this.get(HEX_GROUP_FOREGROUND).get(0).hasClass("selectedHex")) {
		// selected
	} else {
		// deselected
	}
}

Hex.prototype.mouseup = function(event) {
	// console.log(event);
}

Hex.prototype.mousedown = function(event) {
	// console.log(event);
}