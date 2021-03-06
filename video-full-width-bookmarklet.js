javascript:(function () {

	'use strict';

	/*
		Netflix/Prime Video/HBO Nordic full width bookmarklet version 1.1.0 by Andreas Viklund.
		https://github.com/kritvit/netflix-full-width-bookmarklet
	*/

	var isOn = false,
		offset = 0,
		namespace = 'nf-fw',
		id = namespace+'-controls',
		video = document.querySelector('video'),
		appendTo = '';

	if (window.location.host.indexOf('hbonordic.com') > -1) {

		appendTo = '.vjs-control-bar';

	}

	if (window.location.host.indexOf('netflix.com') > -1) {

		appendTo = '.PlayerControlsNeo__bottom-controls';

	}

	if (window.location.host.indexOf('primevideo.com') > -1) {

		appendTo = '.seekBar';

	}

	if (!document.getElementById(id)) {
		addControls();
	}

	function getButton (name) {
		var button = document.createElement('p');

		button.innerHTML 				= name;
		button.style.cursor 			= 'pointer';
		button.style.backgroundColor 	= '#262626';
		button.style.borderBottom 		= 'solid 2px #000';
		button.style.padding 			= '8px 16px';
		button.style.borderRadius 		= '5px';
		button.style.margin 			= '2px 0';
		button.style.whiteSpace 		= 'nowrap';
		button.style.transition 		= 'background-color 250ms ease-out';

		button.addEventListener('mouseover', function () {
			button.style.backgroundColor = '#464646';
		});
		button.addEventListener('mouseout', function () {
			button.style.backgroundColor = '#262626';
		});

		return button;
	}

	function updateOffsetDisplay () {
		var node = document.querySelector('#'+namespace+'-offset');
		if (0 === offset) {
			node.innerHTML = '';
		} else {
			node.innerHTML = offset+'px';
		}
	}

	function setVideoPosition () {
		video.style.height = 'initial';
		video.style.top = '50%';
		video.style.marginTop = '-'+(offset+Math.round(video.offsetHeight/2))+'px';
	}

	function addControls () {
		var controls 	= document.createElement('div'),
			add 		= getButton('Full Width'),
			reset 		= getButton('Reset'),
			up 			= getButton('Move Up'),
			down 		= getButton('Move Down');

		controls.id = id;
		controls.innerHTML = '<div id="'+namespace+'-offset" style="padding: 8px 16px;"></div>';
		
		controls.style.position 	= 'absolute';
		controls.style.right 		= '1rem';
		controls.style.bottom 		= '100%';
		controls.style.zIndex 		= 9999999;
		controls.style.textAlign 	= 'center';
		controls.style.fontSize 	= '.8rem';
		controls.style.textShadow 	= '0px 1px #000';

		controls.appendChild(add);
		controls.appendChild(reset);
		controls.appendChild(up);
		controls.appendChild(down);

		add.addEventListener('click', function () {
			isOn = true;
			setVideoPosition();
		}, false);
		reset.addEventListener('click', function () {
			isOn = false;
			video.style.height = '100%';
			video.style.top = 'inherit';
			video.style.marginTop = 0;
			offset = 0;
			updateOffsetDisplay();
		}, false);
		up.addEventListener('click', function () {
			offset++;
			setVideoPosition();
			updateOffsetDisplay();
		}, false);
		down.addEventListener('click', function () {
			offset--;
			setVideoPosition();
			updateOffsetDisplay();
		}, false);
		 window.addEventListener('resize', function () {
		 	if (isOn) {
				setVideoPosition();
			}
		 }, false);

		document.querySelector(appendTo).appendChild(controls);
	}

})();