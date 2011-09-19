ig.module(
	'weltmeister.config'
)
.defines(function(){

wm.config = {
	project: {
		'modulePath': 'lib/',
		'entityFiles': 'lib/game/entities/*.js',
		'levelPath': 'lib/game/levels/',
		'outputFormat': 'json', // 'module' or 'json'
		'prettyPrint': false
	},
	
	'layerDefaults': {
		'width': 30,
		'height': 20,
		'tilesize': 64
	},
	
	'askBeforeClose': true,
	'loadLastLevel': true,
	
	'entityGrid': 4,
	'undoLevels': 50,
	
	'binds': {
		'MOUSE1': 'draw',
		'MOUSE2': 'drag',
		'SHIFT': 'select',
		'CTRL': 'drag',
		'SPACE': 'menu',
		'DELETE': 'delete',
		'BACKSPACE': 'delete',
		'G': 'grid',
		'C': 'clone',
		'Z': 'undo',
		'Y': 'redo'
	},
	
	'view': {
		'zoom': 1,
		'drawGrid': false,
	},
	
	'labels': {
		'draw': true,
		'step': 32,
		'font': '10px Bitstream Vera Sans Mono, Monaco, sans-serif'
	},
	
	'colors': {
		'clear': '#000000',
		'highlight': '#ceff36',
		'primary': '#ffffff',
		'secondary': '#555555',
		'selection': '#ff9933'
	},
	
	'api': {
		'save': 'wm/save',
		'browse': 'wm/browse',
		'glob': 'wm/glob'
	}
};

});
