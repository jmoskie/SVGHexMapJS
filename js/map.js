function Map (canvasId, height, width) {
    this.map = new Array(new Array());
    this.selectedHexes = new Array();

    // TODO: all of these values are coded-coded for expediency. more effort should be put into this later.
    this.svgCanvas = SVG(canvasId).size(56.25 * width + 25, 65 * height + 50);

    this.generateTestMap(height, width);
    // this.preloadImages();
}

Map.prototype.generateTestMap = function(height, width) {
	for(row=0; row<height; row++) {
		this.map[row] = Array();

		for(col=0; col<width; col++) {
			// give the hex a random type, based on the values defined in HEX_TYPES
			var type = Math.floor(Math.random() * HEX_TYPES.length);

			this.map[row][col] = new Hex(row, col, type, this.svgCanvas);
		}
	}
}

Map.prototype.preloadImages = function() {
	this.svgCanvas.image('images/game-icons.net/blood.svg').hide();
	this.svgCanvas.image('images/game-icons.net/robe.svg').hide();
}