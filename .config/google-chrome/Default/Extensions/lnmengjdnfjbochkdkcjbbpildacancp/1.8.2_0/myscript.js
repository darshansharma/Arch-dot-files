if (document.location.hostname != 'marker.to' || typeof TMmode == 'undefined') {
	_oldMouseUp = document.onmouseup;
	document.onmouseup = _mouseUp;
}
if (document.location.hostname == 'marker.to'){
	var isInstalledNode = document.createElement('div');
	isInstalledNode.id = 'marker-to-is-installed';
	document.body.appendChild(isInstalledNode);
}


//Ask from background.js is we have highlighting Disabled or NOT and send it as a message to the Page?
chrome.extension.sendRequest({
	method : "getLocalStorage"
}, function(response) {
	var isInstantHighlightingDisabled = true;
	var extLocalStorage = response.data;

	if ((typeof extLocalStorage.instantHighlighterDisabled != 'undefined'	// Is present
		&& extLocalStorage.instantHighlighterDisabled === 'false')) {     //
		isInstantHighlightingDisabled = false;
	}

	//Send message to WebPage, about instant marker state
	postMessage({ type: "FROM_MARKERTO_EXT", text: "Loaded, ready whenever you are!", isInstantHighlightingDisabled: isInstantHighlightingDisabled }, '*');

});

 // Create proxy between Page and Extension for settings
window.addEventListener("message", function(event) {
	// We only accept messages from ourselves
	if (event.source != window)
		return;

	var eventData = event.data.data;
	if (event.data.type && (event.data.type == "FROM_MARKERTO_PAGE")) {

		// Send request to extension and proxy dataForExtension as the data
		if ((typeof eventData.dataForExtension != 'undefined')){
			chrome.extension.sendRequest(eventData.dataForExtension,function(response) {
				event.source.postMessage({ type: "FROM_MARKERTO_EXT", response: response },  event.origin);
			});
		}
	}
}, false);


var disableMouseUp = false;
function _mouseUp(e) {
	jQuery('#tmloading').find('.tm-chrome-share-selection-container').remove();
	var rightclick = false;
	e = e || window.event;
	if (e.which) {
		rightclick = (e.which == 3);
	} else if (e.button) {
		rightclick = (e.button == 2);
	}
	if (disableMouseUp) {
		return false;
	}
	if (rightclick) {
		return false;
	}
	if (e.target) {
		targ = e.target;
	} else if (e.srcElement) {
		targ = e.srcElement;
	}
	if (['textarea', 'input'].indexOf(targ.nodeName.toLowerCase()) != -1){
		return false;
	}
	
	do {
		if (targ.id == 'tmloading') {
//			jQuery('#tmloading').find('.tm-chrome-share-selection-container').hide();
			return false;
		}
	} while (targ = targ.parentNode);

	chrome.extension.sendRequest({
		method : "getLocalStorage"
	}, function(response) {
		if ((typeof response.data.instantHighlighterDisabled != 'undefined'
			&& response.data.instantHighlighterDisabled === 'false')) {
			_showBubbleButton(e);
			return;
		}
		typeof _oldMouseUp == 'function' && _oldMouseUp(e);
	});
	return true;
}

function _showBubbleButton(e) {
	if (document.location.protocol != 'http:'){
		return false; //Enabled only http pages
	}
	var _selectionText = jQuery.trim(window.getSelection().toString());
	if (_selectionText.length < 1) {
		return false;
	}
	if (!$('#tmloading').get(0)) {
		jQuery('body').append('<div id="tmloading"></div>');
	}
	var tt = document.createElement('div');
	tt.className = "tm-chrome-share-selection-container";
	jQuery(tt).append('<div class="tm-chrome-share-selection-btn">' +
	'<div class="instant_button tm-marker tm-share" title="Start Highlighter" data-share-source=""/>' +
	'<div class="instant_button tm-facebook tm-share" title="Highlight and share in Facebook" data-share-source="-fb"/>' +
		'<div class="instant_button tm-twitter tm-share" title="Highlight and share in Twitter" data-share-source="-tw"/>' +
	'<div class="instant_button tm-my" title="My Highlighter Pages and Settings"/>' +
	'</div>' +
	// disable popup '<div class="tm-chrome-disable-quick-start"><h1>Highlight and Share</h1><span><a>Disable</a> this feature.</span></div>' +
	'');
	
	jQuery('#tmloading').append(tt);

	// Show diable popup
	//jQuery('#tmloading .tm-chrome-disable-quick-start a').mousedown(function(event){
	//	event.preventDefault();
	//	TM_disable_quick_start();
	//});

	// Start highlighter
	jQuery('#tmloading .tm-chrome-share-selection-btn .tm-share').mousedown(function(e) {
		disableMouseUp = true;
		var share = jQuery(this).attr('data-share-source');
		jQuery('#tmloading .tm-chrome-share-selection-container').remove();
		jQuery('#tmloading').append('<script>window.markerLoader = "chrome-quickstart'+share+'"</script>');
		loadScript('//marker.to/js/l.js');
		return false;
	});

	// Open my marker page
	jQuery('#tmloading .tm-chrome-share-selection-btn .tm-my').mousedown(function(e) {
		//disableMouseUp = true;
		window.open('http://marker.to/my');
		return false;
	});

	//jQuery(tt).hover(function() {
	//	jQuery(this).addClass('hasFocus');
	//	jQuery(this).stop(true);
	//	jQuery(this).animate({
	//		"opacity" : 1
	//	});
	//	//setTimeout(function(){
	//	//	var button = jQuery('.tm-chrome-share-selection-container');
	//	//	if (button.hasClass('hasFocus')) {
	//	//		jQuery('.tm-chrome-disable-quick-start').css({left : 10, top : 30, display:'block'});
	//	//	}
	//	//}, 1000);
	//}, function() {
	//	//jQuery(this).removeClass('hasFocus');
	//	//jQuery(this).fadeOut(2000, function() {
	//	//	jQuery(this).remove();
	//	//
	//	// }
	//	//);
	//});
//	jQuery(tt).fadeOut(2000, function() {
//		jQuery('.tm-chrome-disable-quick-start').css({display:'none'});
//		jQuery(this).remove();
//	});	

	var instantContainerHeight = 285;
	var left = e.pageX - 26, top = e.pageY - 26, relativeTop = e.pageY - window.pageYOffset - 70;

	//Will panel hit the bottom ?
	if ((relativeTop + instantContainerHeight) > jQuery(window).height()){
		relativeTop = jQuery(window).height() - instantContainerHeight - 25;
	}
	jQuery(tt).css({
		left : 10, //left > 0 ? left : 0,
		top : relativeTop > 0 ? relativeTop : 10,
		position : 'fixed'


	});
}
function TM_disable_quick_start(){
	chrome.extension.sendRequest({
		method : "disableQuickStart"
	}, function(response) {
		jQuery('.tm-chrome-share-selection-container').remove();
	});
	jQuery('#tmloading').append('<div style="display: none;"><iframe width="0" height="0" src="//marker.to/quickstart/disable.tt"></iframe></div>');
}

function loadScript(url) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	document.getElementById('tmloading').appendChild(script);
}