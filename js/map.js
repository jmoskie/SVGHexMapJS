// TODO: all of these values are coded-coded for expediency. more effort should be put into this later.
function Map (canvasId, rows, cols, type, height=75 * rows, width=59 * cols + 25) {
    this.map = new Array(new Array());
    this.selectedHexes = new Array();

    boxHeight = 75 * rows;
    boxWidth  = 59 * cols + 25;

    this.svgCanvas = SVG(canvasId).size(width, height);

    dragConstraints = {minX: -boxWidth/2, minY: -boxHeight/2, maxX: boxWidth, maxY: boxHeight};

    this.mapGroup = this.svgCanvas.group().draggable(dragConstraints).on('dragmove', this.dragmove).on('dragend', this.dragend);

    switch(type) {
		case "symmetric":
			this.generateSymmetricMap(rows, cols);
			break;
		case "random":
			default:
			this.generateTestMap(rows, cols);
			break;
    }

    // center the map
    this.mapGroup.center(this.svgCanvas.cx(), this.svgCanvas.cy());

    // add some units!
    rndRow = Math.floor(Math.random() * rows);
    rndCol = Math.floor(Math.random() * cols);
	this.map[rndRow][rndCol].setUnitImage("barbarian", 0.8);

	rndRow = Math.floor(Math.random() * rows);
    rndCol = Math.floor(Math.random() * cols);
	this.map[rndRow][rndCol].setUnitImage("orc-head", 0.8);
}

Map.prototype.dragmove = function(event) {
	// console.log(event);
}

Map.prototype.dragend = function(event) {
	// console.log("=======END=======");
	// console.log(event);
}

Map.prototype.generateTestMap = function(rows, cols) {
	for(row=0; row<rows; row++) {
		this.map[row] = Array();

		for(col=0; col<cols; col++) {
			// give the hex a random type, based on the values defined in HEX_TYPES
			var type = Math.floor(Math.random() * HEX_TYPES.length);

			this.map[row][col] = new Hex(row, col, type, this.mapGroup);
		}
	}
}

// this needs to be called with an even-numbered width
Map.prototype.generateSymmetricMap = function(rows, cols) {
	for(row=0; row<rows; row++) {
		this.map[row] = Array();
		for(col=0; col<cols/2; col++) {
			// console.log(row + "," + col + "height: " + height + ", height-row=" + (height - row));

			// give the hex a random type, based on the values defined in HEX_TYPES
			var type = Math.floor(Math.random() * HEX_TYPES.length);

			this.map[row][col] = new Hex(row, col, type, this.mapGroup);
			this.map[row][cols - col] = new Hex(row, cols - col, type, this.mapGroup);
		}

		// the middle, joining column
		var type = Math.floor(Math.random() * HEX_TYPES.length);
		this.map[row][col] = new Hex(row, col, type, this.mapGroup);
	}
}