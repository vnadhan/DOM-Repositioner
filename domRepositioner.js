// Functions to help re-position certain DOM elements on page zoom in/out

function rePositionMarquee(newWindowWidth) {
	var marqueeObj = $('marquee');
	marqCont = marqueeObj.parent();
	if (!marqueeObj.is(':hidden')) {
		calc = 0.5 * parseInt(newWindowWidth) - 570;
		marqCont.offset({
			left : calc
		});
	}
}

function rePositionDialogs(newWindowWidth) {
	var dialog = $('.ui-dialog');
	if (dialog.length != 0) {
		//if(!dialog.is(':hidden')){
		calc = 0.5 * parseInt(newWindowWidth) - 570;
		dialog.offset({
			left : calc
		});
		//}
	}
}

function rePositionWindows(newWindowWidth) {
	var windowList = [];
	var windowLeftPosList = [];

	if (uID == "Michael_Coller") {
		windowList = [ "storageReport", "marketWL", "newsFeedsPhys",
				"bidweekstats", "rigcounts", "transData" ];
	} else {
		windowList = [ "watchList", "marketFeeds", "newsFeeds", "topLosers",
				"topGainers", "exchangeFees" ];
	}
	$.each(windowList, function(intIndex, objValue) {
		var windowId = "#" + objValue + "_window";
		windowLeftPosList.push(parseInt($(windowId).closest('.k-window')
				.offset().left));
	});
	windowLeftPosList.sort(sortmyway);

	$.each($(document).find('.k-window'), function(intIndex, objValue) {
		//if($(this).find('div:eq(1)').prop('id') != "marketFeedsFS_window"){
		var calc = 0;
		var windowLeft = parseInt($(this).offset().left);
		//console.log("windowposleft :  " + windowLeftPosList[0]);
		console.log("window :  " + $(this).find('.k-content').prop('id')
				+ " - " + windowLeft);
		if (windowLeft >= windowLeftPosList[0]
				&& windowLeft < windowLeftPosList[2]) {
			calc = 0.5 * parseInt(newWindowWidth) - 570; // mx - c
			$(this).offset({
				left : calc
			});
		} else if (windowLeft >= windowLeftPosList[2]
				&& windowLeft < windowLeftPosList[4]) {
			calc = 0.5 * parseInt(newWindowWidth) - 190; // mx - c
			$(this).offset({
				left : calc
			});
		} else if (windowLeft >= windowLeftPosList[4]) {
			calc = 0.5 * parseInt(newWindowWidth) + 200; // mx + 208.5
			$(this).offset({
				left : calc
			});
		} else if (windowLeft < windowLeftPosList[0]) {
			console.log("Window found :  " + windowLeft);
			console.log("windowposleft :  " + windowLeftPosList[0]);
			calc = 0.5 * parseInt(newWindowWidth) - 650; // mx - c
			$(this).offset({
				left : calc
			});
		}
		//}
	});
}

function isPageZoomed(window, windowZoomLevel){
	var newWindowZoomLevel = (window.outerWidth - 8) / window.innerWidth;
	if (parseFloat(newWindowZoomLevel) != parseFloat(windowZoomLevel)) {
		return true;
	}
	return false;
}

function findWindowZoomLevel(window){
	var newWindowZoomLevel = (window.outerWidth - 8) / window.innerWidth;
	return newWindowZoomLevel;
}

function findWindowWidth(window){
	var defaultWindowWidth = window.document.body.clientWidth;
	return defaultWindowWidth;
}
