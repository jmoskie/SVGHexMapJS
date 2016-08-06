ICON_SIZE = 50;

// TODO: it would be smart to move this to json files for different games, or something.
HEX_TYPES =
	[
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
			"image" 	: "hills",
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



function Hex (row, col, type, svgCanvas) {
	this.row = row;
	this.col = col;
	this.type = type;
	this.svgCanvas = svgCanvas;

	dx = 56.25 * col;
	dy = 65 * row + (col % 2 ? 32.5 : 0);

	points = [[75+dx,32.5+dy], [56.25+dx,65+dy], [18.75+dx,65+dy], [0+dx,32.5+dy], [18.75+dx,0+dy], [56.25+dx,0+dy]];

	this.group = this.svgCanvas.group();

	polygon = this.svgCanvas.polygon().addClass("hex").fill("#E6E6E6").stroke({color: '#303030', width: 0.5}).plot(points).fill(HEX_TYPES[type].color);;
	this.group.add(polygon);

	// add background image, if this hex type has one
	this.setBackgroundImage(HEX_TYPES[type].image, 0.30);

	// TODO: Move this out of the loop...
	this.group.on('click', this.hexGroupClick);

	this.group.mouseover(function() {
		this.get(0).addClass("hoveredHex");
		this.front();
	});

	this.group.mouseout(function() {
		this.get(0).removeClass("hoveredHex");
		this.front();
	});
}

Hex.prototype.getPolygon = function() {
	return this.group.get(0);
}

Hex.prototype.getBackgroundImage = function() {
	return this.group.get(1);
}

Hex.prototype.setBackgroundImage = function(image, opacity) {
	if(image) {
		image = this.svgCanvas.image('images/game-icons.net/' + image + '.svg')
						 .size(ICON_SIZE, ICON_SIZE)
						 .center(this.getPolygon().cx(), this.getPolygon().cy())
						 .opacity(opacity);

		this.group.add(image);
	}
}

Hex.prototype.hexGroupClick = function(event) {
	this.get(0).toggleClass("selectedHex");

	if(this.get(0).hasClass("selectedHex")) {
		// selected
	} else {
		// deselected
	}
}