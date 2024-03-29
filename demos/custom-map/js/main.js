var MainView = Backbone.View.extend({
	initialize: function() {
		this.snapElem = Snap("#store-map");
		window.sElem = this.snapElem;
		this.allDataPoints = this.sampleDataset();
		this.render();
	},

	delegateEvents: function() {
		$('body').on('click', '#addInputToSvg', _.bind(this.addHeatPoint, this));
	},

	undelegateEvents: function() {
		$('body').off('click');
	},

	render: function() {
		var self = this;
		_.each(window.sElem.selectAll('circle'), function(circleElem) { circleElem.remove(); });
		_.each(this.allDataPoints, function(dataPoint) {
			self.drawHeatPoint(dataPoint);
		});
	},

	drawHeatPoint: function(dataPoint) {
		this.snapElem.circle(dataPoint.x, dataPoint.y, 30).animate({r: dataPoint.value}, 300);
	},

	addHeatPoint: function() {
		var x = $('#xcoord').val();
		var y = $('#ycoord').val();
		var value = $('#crowdValue').val();
		console.log('adding data point - x: ' + x + ' y: ' + y + ' value: ' + value);
		this.allDataPoints.push(this.dataPoint(x,y,value));
		this.render();
	},

	sampleDataset: function() {
		var datasetObj = [];
		datasetObj.push(this.dataPoint(100,100,5));
		datasetObj.push(this.dataPoint(100,150,3));
		datasetObj.push(this.dataPoint(200,100,3));
		datasetObj.push(this.dataPoint(300,100,10));
		return datasetObj;
	},

	dataPoint(x,y,value) {
		return {
			'x': x,
			'y': y,
			'value': value
		}
	}
});

var main = new MainView();

// var MainView = Backbone.View.extend({
//     initialize: function () {
	
// 		var i;
			
//         // Math.seedrandom('fish');

// 		this.state = 0;
// 		this.dots = [];
// 		this.animals = [];
// 		this.trees = [];
// 		this.treeFaces = [];
// 		this.s = Snap(document.getElementsByTagName('svg')[0]);
		
// 		//dot animals
// 		dotGroup = this.s.select('#dots');
// 		this.dots = dotGroup.selectAll('*');
		
// 		for (i = 0; i < this.dots.length; i += 1) {
// 			animal = new PathAnimal({s: this.s, dot: this.dots[i]});
// 			this.animals.push(animal);
// 		}
		
// 		//sort depth
// 		for (i = 0; i < this.animals.length; i += 1) {
// 			if (i > 0) {
// 				var a = this.animals[i - 1].el,
// 					b = this.animals[i].el;
				
// 				if (a.matrix.split().dy > b.matrix.split().dy) {
// 					a.before(b);
// 				}
// 			}
// 		}
		
// 		//trees
// 		this.trees = this.s.selectAll('.tree');
// 		for (i = 0; i < this.trees.length; i += 1) {
// 			var tree = new TreeFace({s: this.s, tree: this.trees[i]});
// 			this.treeFaces.push(tree);
// 		}
		
// 		this.cube = document.getElementById('cube');
// 		var $cubeHitArea = document.getElementById('cube-hitarea');
// 		$cubeHitArea.addEventListener('click', this.handle_ROLL.bind(this));
		
// 		setTimeout(this.animate.bind(this), 3000);
//     },

// 	handle_ROLL: function () {
// 		this.number = Math.ceil(Math.random() * 6);
// 		if (this.number == 6) {
// 			rx = 45;
// 			ry = 180;
// 			rz = -45;
// 		} else if (this.number == 5) {
// 			rx = 50;
// 			ry = 0;
// 			rz = 50;			
// 		} else if (this.number == 4) {
// 			rx = -45;
// 			ry = 50;
// 			rz = 90;
// 		} else if (this.number == 3) {
// 			rx = -45;
// 			ry = 225;
// 			rz = -90;
// 		} else if (this.number == 2) {
// 			rx = -45;
// 			ry = 50;
// 			rz = 0;
// 		} else if (this.number == 1) {
// 			rx = 145;
// 			ry = -45;
// 			rz = 0;
// 		} else {
// 			rx = -90;
// 			ry = 0;
// 			rz = 0;
// 		}
		
// 		this.cube.style['webkitTransform'] = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)';
// 		this.cube.style['MozTransform'] = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)';		
// 	},
	
// 	trigger: function () {
// 		this.state += 1;//this.number;
// 		var animal = this.animals[this.state];
// 		animal.handle_MOUSEOVER();
		
// 	},

// 	animate: function () {
// 		var tree = this.treeFaces[Math.floor(Math.random() * this.treeFaces.length)];
// 		tree.handle_MOUSEOVER();
		
// 		setTimeout(function () {
// 			tree.handle_MOUSEOUT();
// 		}.bind(this), 3000);
		
// 		setTimeout(this.animate.bind(this), 3000);
// 	}
// });

// var main = new MainView();