ICON_SIZE = 50;

// TODO: it would be smart to move this to json files for different games, or something.
HEX_TYPES =
	[
		{
			"name" 		: "water",
			"color" 	: "#83C6F2",
			"isPassable": false,
			"moveCost" 	: 0
		},
		{
			"name" 		: "grassland",
			"color" 	: "#7DBF50",
			"isPassable": true,
			"moveCost" 	: 1
		},
		{
			"name" 		: "hill",
			"color" 	: "#B0A03C",
			"isPassable": true,
			"moveCost" 	: 2
		},
		{
			"name" 		: "mountain",
			"color" 	: "#634B15",
			"isPassable": false,
			"moveCost" 	: 0
		}
	];



function Hex (row, col, type, polygon, svgCanvas) {
	this.row = row;
	this.col = col;
	this.type = type;
    this.polygon = polygon.fill(HEX_TYPES[type].color);
    this.svgCanvas = svgCanvas;
}

Hex.prototype.addImage = function() {
	this.image = this.svgCanvas.image('images/game-icons.net/robe.svg')
					 .size(ICON_SIZE, ICON_SIZE)
					 .center(this.polygon.cx(), this.polygon.cy());
}