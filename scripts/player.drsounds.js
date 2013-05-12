define(['scripts/player.abstract'], function (abstract) {
	var exports = {};
	console.log(abstract);
	exports.Player = function (data) {
		this.data = data;
	};
	exports.Player.prototype = new abstract.Player();
	console.log(new exports.Player());
	exports.Player.prototype.play = function (nodeName) {
		var node = this.getRelatives(nodeName);
		var context = this.getContext(nodeName);
		console.log("Context", context);
	};
	exports.Player.prototype.getContext = function (nodeName) {
		var edges = this.getRelatives(nodeName);

		// Currently we only support first song
		var firstTrack = edges[0];
		console.log(firstTrack);
		if(firstTrack.youtube != null) {
			document.querySelector('#component').innerHTML = "";

			var iframe = document.createElement('iframe');
			iframe.src = "http://www.youtube.com/embed/" + firstTrack.youtube;
			iframe.frameborder = 0;
			iframe.width =320;
			iframe.height = 315;
			document.querySelector('#component').innerHTML = "<iframe src=\"" + iframe.src + "\" frameborder=\"0\" width=\"320\" height=\"315\"></iframe";
			
		}
	};
	return exports;
});