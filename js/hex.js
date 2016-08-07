BACKGROUND_ICON_SIZE = 50;
UNIT_ICON_SIZE = 40;

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
		"name" 		: "hill",
		"color" 	: "#B0A03C",
		// "image" 	: "hills",
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

HEX_GROUPS = {"background":0, "structure":1, "unit":2};


function Hex (row, col, type, mapGroup) {
	this.row = row;
	this.col = col;
	this.mapGroup = mapGroup;
	this.hexGroup = mapGroup.group();

	dx = 56.25 * col;
	dy = 65 * row + (col % 2 ? 32.5 : 0);

	points = [[75+dx,32.5+dy], [56.25+dx,65+dy], [18.75+dx,65+dy], [0+dx,32.5+dy], [18.75+dx,0+dy], [56.25+dx,0+dy]];

	groups = Array();
	groupCount = Object.keys(HEX_GROUPS).length;

	for(i=0; i<groupCount; i++)
		groups.push(this.hexGroup.group());

	// we're going to add some stuff to the background group to represent the base hex
	backgroundGroup = groups[0];
	structureGroup = groups[1];
	unitGroup = groups[2];

	polygon = backgroundGroup.polygon().addClass("hex").fill("#E6E6E6").stroke({color: '#303030', width: 0.5}).plot(points);

	// add background image, if this hex type has one
	this.setType(type);

	// TODO: Move this out of the loop...
	this.hexGroup.on('click',		this.hexGroupClick);
	this.hexGroup.on('mousedown',	this.mousedown);
	this.hexGroup.on('mouseup',	this.mouseup);

	this.hexGroup.mouseover(function() {
		this.get(HEX_GROUPS["background"]).get(0).addClass("hoveredHex");
	});

	this.hexGroup.mouseout(function() {
		this.get(HEX_GROUPS["background"]).get(0).removeClass("hoveredHex");
	});
}

Hex.prototype.setType = function(type) {
	this.type = type;

	this.getPolygon().fill(HEX_TYPES[type].color);
	this.setBackgroundImage(HEX_TYPES[type].image, 0.30);
}

// background tile groups get sepcial helper functions for the their polygon and icon
Hex.prototype.getPolygon = function() {
	return this.hexGroup.get(HEX_GROUPS["background"]).get(0);
}

Hex.prototype.getBackgroundImage = function() {
	return this.hexGroup.get(HEX_GROUPS["background"]).get(1);
}

Hex.prototype.setBackgroundImage = function(image="blank", opacity) {
	image = this.hexGroup.image('images/game-icons.net/' + image + '.svg')
						 .size(BACKGROUND_ICON_SIZE, BACKGROUND_ICON_SIZE)
						 .center(this.getPolygon().cx(), this.getPolygon().cy())
						 .opacity(opacity);

	if(!this.getBackgroundImage()) {
		this.hexGroup.get(HEX_GROUPS["background"]).add(image);
	} else {
		this.getBackgroundImage().replace(image);
	}
}

// TODO: this is getting too specific already. If this is supposed to be a general purpose library, I don't think I should be drawing units like this.
Hex.prototype.setUnitImage = function(image="blank", opacity) {
	unitGroup = this.hexGroup.get(HEX_GROUPS["unit"]).draggable();
	// if this is the first unit, draw the background disc
	if(!unitGroup.get(0)) {
		unitGroup.circle(40)
			     .fill("#FFFFFF")
			     .stroke({color: '#000000', width: 1.0})
			     .center(this.getPolygon().cx(), this.getPolygon().cy());

	}

	unitGroup.image('images/game-icons.net/' + image + '.svg')
			 .size(UNIT_ICON_SIZE, UNIT_ICON_SIZE)
			 .center(this.getPolygon().cx(), this.getPolygon().cy())
			 .opacity(opacity)
}


// other tile groups are more generic, and can contain multiple child items
Hex.prototype.getGroup = function(groupName) {
	return this.hexGroup.get(HEX_GROUPS[groupName]);
}


// events
Hex.prototype.hexGroupClick = function(event) {
	this.get(HEX_GROUPS["background"]).get(0).toggleClass("selectedHex");

	if(this.get(HEX_GROUPS["background"]).get(0).hasClass("selectedHex")) {
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