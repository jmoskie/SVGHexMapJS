// TODO: all of these values are coded-coded for expediency. more effort should be put into this later.
function Map (canvasId, rows, cols, type, height=75 * rows, width=59 * cols + 25) {
    this.hexMap = new Array(new Array());
    this.selectedHexes = new Array();

    this.units = new Array();
    this.unitGroup;

    boxHeight = 75 * rows;
    boxWidth  = 59 * cols + 25;

    this.svgCanvas = SVG(canvasId).size(width, height);
    this.mapGroup = this.svgCanvas.group();

    // only make the map draggable if it can't be shown in its viewbox
    if(height < boxHeight || width < boxWidth) {
		dragConstraints = {minX: -boxWidth/2, minY: -boxHeight/2, maxX: boxWidth, maxY: boxHeight};
		this.mapGroup.draggable(dragConstraints).on("dragmove", this.dragmove).on("dragend", this.dragend);
    }

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
	this.addUnit("Ghost", "haunting", 1, 0);
	this.addUnit("Impy", "imp-laugh", Math.floor(Math.random() * rows), Math.floor(Math.random() * cols));
	this.addUnit("BarbaryAnne", "barbarian", Math.floor(Math.random() * rows), Math.floor(Math.random() * cols));

	// TODO: don't forget this, it's handy: map.mapGroup.select(".selectedHex").fill("#00FF00")
}

// ==================== hex-related functions ====================
Map.prototype.getSelectedHexes = function() {
	return this.mapGroup.select(".selectedHex");
}


// ==================== unit-related functions ====================
Map.prototype.addUnit = function(name, image, row, col) {
	return this.units.push(new Unit(name, image, this.hexMap[row][col], this));
}

// ==================== event handlers ====================

Map.prototype.dragmove = function(event) {
	// console.log(event);
}

Map.prototype.dragend = function(event) {
	// console.log("=======END=======");
	// console.log(event);
}


// ==================== map generators ====================

Map.prototype.generateTestMap = function(rows, cols) {
	for(row=0; row<rows; row++) {
		this.hexMap[row] = Array();

		for(col=0; col<cols; col++) {
			// give the hex a random type, based on the values defined in HEX_TYPES
			var type = Math.floor(Math.random() * HEX_TYPES.length);

			this.hexMap[row][col] = new Hex(row, col, type, this.mapGroup);
		}
	}
}

// this needs to be called with an even-numbered width
Map.prototype.generateSymmetricMap = function(rows, cols) {
	for(row=0; row<rows; row++) {
		this.hexMap[row] = Array();
		for(col=0; col<cols/2; col++) {
			// console.log(row + "," + col + "height: " + height + ", height-row=" + (height - row));

			// give the hex a random type, based on the values defined in HEX_TYPES
			var type = Math.floor(Math.random() * HEX_TYPES.length);

			this.hexMap[row][col] = new Hex(row, col, type, this.mapGroup);
			this.hexMap[row][cols - col] = new Hex(row, cols - col, type, this.mapGroup);
		}

		// the middle, joining column
		var type = Math.floor(Math.random() * HEX_TYPES.length);
		this.hexMap[row][col] = new Hex(row, col, type, this.mapGroup);
	}
}