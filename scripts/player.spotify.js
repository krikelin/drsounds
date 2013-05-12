var sprequire = require || false;
if(require) {
	require([
		'$api/models',
		'sp://drsounds/scripts/player.abstract#Player',
		'$api/models#Context'],
		function(models, IPlayer, Context) {
			exports.Player = function (data) {

				var self = this;
				self.data = data;
				console.log("data", self.data);
				models.player.addEventListener('change', function (e) {
					console.log(e);
					var uri = e.data.track.uri;
					// Get the object
					for(var key in data.nodes) {

						var node = data.nodes[key];
						console.log('PLAY', node);
						node.playing = node.link == uri;
					}
				});
				
			};
			exports.Player.prototype = new IPlayer;
			exports.Player.prototype.play = function (nodeName) {
					var context = this.getContext(nodeName);
					models.player.playContext(context);

			}
			exports.Player.prototype.getContext = function (nodeName) {
				var edges = this.getRelatives(nodeName);
				var uri = ['spotify', 'trackset', nodeName];
				console.log('edges.length', edges.length);
				var tracks = [];
				for(var key in edges) {
					var edge = edges[key];
					console.log(edge);
					tracks.push(edge.link.split(':')[2]);
					console.log("URI", uri.join(':'));
				}
				uri.push(tracks.join(','))
				var context = Context.fromURI(uri.join(':'));
				return context;
			};
			


	});
}