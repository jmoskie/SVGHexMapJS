function Map (canvasId, height, width) {
    this.map = new Array(new Array());
    this.selectedHexes = new Array();

    // TODO: all of these values are coded-coded for expediency. more effort should be put into this later.
    this.svgCanvas = SVG(canvasId).size(56.25 * width + 25, 65 * height + 50);

    this.generateMap(height, width);
    // this.preloadImages();
}

Map.prototype.generateMap = function(height, width) {
	for(row=0; row<height; row++) {
		this.map[row] = Array();

		for(col=0; col<width; col++) {
			dx = 56.25 * col;
			dy = 65 * row + (col % 2 ? 32.5 : 0);

			points = [[75+dx,32.5+dy], [56.25+dx,65+dy], [18.75+dx,65+dy], [0+dx,32.5+dy], [18.75+dx,0+dy], [56.25+dx,0+dy]];
			polygon = this.svgCanvas.polygon().addClass("hex").fill("#E6E6E6").stroke({color: '#303030', width: 0.5}).plot(points);

			// TODO: Move this out of the loop...
			polygon.click(function() {
				this.toggleClass("selectedHex");	// .front() blocks icons. need a group!

				if(this.hasClass("selectedHex")) {
					// selected
				} else {
					// deselected
				}
			});

			polygon.mouseover(function() {
				this.addClass("hoveredHex").front();
			});

			polygon.mouseout(function() {
				this.removeClass("hoveredHex").front();
			});

			// give the hex a random type, based on the values defined in HEX_TYPES
			var type = Math.floor(Math.random() * HEX_TYPES.length);

			this.map[row][col] = new Hex(row, col, type, polygon, this.svgCanvas);
		}
	}
}

Map.prototype.preloadImages = function() {
	this.svgCanvas.image('images/game-icons.net/blood.svg').hide();
	this.svgCanvas.image('images/game-icons.net/robe.svg').hide();
}