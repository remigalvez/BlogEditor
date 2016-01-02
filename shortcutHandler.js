console.log('Shortcuts required');

var shortcutListener = function (e) {
	// console.log(e.keyCode);

	if (e.keyCode == 17 && e.keyCode == 83) {
		console.log('sweet');
	}

	if (e.ctrlKey && e.keyCode == 83) {
		console.log('sweet');
	}

	switch (e) {
		case e.ctrlKey && e.keyCode == 83:
			console.log('cool');
			break;
	}

};

document.onkeydown = shortcutListener;