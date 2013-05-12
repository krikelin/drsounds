
(function (c) {
	c._import = function (t) {
		var script = document.createElement('script');
		script.setAttribute('src', t);
		script.setAttribute('type', 'text/javascript');
		document.head.appendChild(script);
	}
	window.addEventListener('load', function () {
		if(typeof(_getSpotifyModule) == 'undefined') {
			console.log('a');
			// If in web mode
			c._import('scripts/require.js');
		}
		console.log(c);
		var sys = arbor.ParticleSystem(500, 600,.5);
		sys.parameters({gravity:true});
		sys.renderer = Renderer("#viewport") ;
		document.querySelector("#viewport").setAttribute("width", window.innerWidth);
		document.querySelector("#viewport").setAttribute("height", window.innerHeight);
		/*var data = {
			nodes:{
				evolution:{'color': 'black', 'shape': 'dot', 'label': 'Evolution'},
				krikelin:{'color': '#007700', 'shape': 'dot', 'label': 'Krikelin'},
				economics:{'color': '#007700', 'shape': 'dot', 'label': 'Economics'},
				aquasphere:{'color': '#888888', 'shape': 'dot', 'label': 'Aquasphere'},
				serenity:{'color': '#888888', 'shape': 'dot', 'label': 'Serenity'},
				
				beta: {'color': '#ff8888', 'shape': 'dot', 'label': 'Beta'},
				c6:{'color': 'blue', 'shape': 'dot', 'label': 'Sounds of Science'},
				bilateral: {'color': 'blue', 'shape': 'dot', 'label': 'Bilateral'},
				identity: {'color': '#003388', 'shape': 'dot', 'label': 'Identity'},
				campus:{'color':'orange', 'shape': 'dot', 'label': 'campus'},
				dk2808: {'color': 'orange', 'shape': 'dot', 'label': 'dk2808'},
				bungalow: {'color': 'orange', 'shape': 'dot', 'label': 'Bungalow'},
				serenade: {'color': 'orange', 'shape': 'dot', 'label': 'Serenade'},
				bungalow2: {'color': 'orange', 'shape': 'dot', 'label': 'Bungalow (EP)'},
				bungalow2: {'color': 'orange', 'shape': 'dot', 'label': 'Bungalow (EP)'},
				tmfm: {'color': '#330088', 'shape': 'dot', 'label': 'Touch Me Feel Me'},
				session: {'color': '#330088', 'shape': 'dot', 'label': 'Session'},
				oceanLove: {'color': '#ff8800', 'shape': 'dot', 'label': 'Ocean Love'}
				
			},
			edges:{
				krikelin: {economics:{}},
				aquasphere: {beta:{}},
				beta: {serenity: {}},
				c6: {campus:{}, tmfm:{}},
				tmfm: {session:{}},
				bilateral:{bungalow:{}, identity:{}},
				campus: {dk2808:{}},
				dk2808: {bungalow:{}},
				bungalow: {serenade:{}, bungalow2:{}},
				bungalow2: {oceanLove: {}}

			}
		};*/

		$.getJSON('http://127.2.1.28/data.php', function (data) {
			sys.graft(data);
				
			$('#viewport').dblclick(function(e){
	            var pos = $(this).offset();
	            var p = {x:e.pageX-pos.left, y:e.pageY-pos.top}
	            selected = nearest = dragged = sys.nearest(p);

	            console.log('selected', selected);

	            // Check if we are in Spotify apps environment or if we should initate
	            // web mode
	            if(typeof(_getSpotifyModule) !== 'undefined') {
	            	require(['sp://drsounds/scripts/player.spotify#Player'], function(Player) {
	            		console.log(data);
	            		var player = new Player(data);
	            		console.log(player);
	            		player.play(selected.node.name);
	            	});
	            } else {
	            	// In web mode, we must use the web player
	            	// self.location = selected.node.data.link;
	            }
	            return false;
	        });
		});
		
	});
})(this);