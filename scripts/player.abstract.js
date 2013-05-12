var __space = (function (c) {
	c.Player = function (data) {
		var self = this;
		self.data = data;
		
		/**
		 * Get relatives
		 * @function
		 * @abstract
		 */
		
		
	};
	c.Player.prototype.findEdges = function (edgeName) {
		console.log(edgeName);
			var edges = [];
			var currentKey = edgeName;
			console.log(this.data);
			edges.push(this.data.nodes[edgeName]);
			for(var key in this.data.edges) {
				console.log(key);
				console.log(this.data.edges[key]);
				for(var key2 in this.data.edges[key]) {
						console.log(key2);
					if(key == currentKey) {
						console.log(key);
						edges.push(this.data.nodes[key2]);
						currentKey = key2;
					}
					
				}
			}
		
			return edges;
	};
	c.Player.prototype.getRelatives = function (edgeName) {
			// TODO add getcontext
			var edges = this.findEdges(edgeName);
			console.log('edges', edges);
			return edges;


	};
	c.Player.prototype.play = function (uri) {

	};
});
if(exports) {
	__space(exports);
} else {
	__space(this);
}