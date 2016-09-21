// Find all the table instances
var $tableInstances = $('.table-sticky-col-wrapper');

// Functions to run on page load
$(function(){
	processTables($tableInstances);
	setStickyWidths($tableInstances);
	scrollIndicator($tableInstances);
});

// Functions to run on resize
$(window).on('resize', function(){
	setStickyWidths($tableInstances);
	scrollIndicator($tableInstances);
});

// Clone the table, remove all but the first column from the clone
function processTables(tableArray){
	tableArray.each(function(){
		var $table = $(this).find('table');
		var $fixedColTable = $table.clone();
		$fixedColTable.find('th:not(:first-child),td:not(:first-child)').remove();
		$fixedColTable.addClass('fixed-column').removeClass('table-sticky-col');
		$fixedColTable.insertBefore($table.parent());
	});
}

// Add the scroll indicator if table is too wide for container
function scrollIndicator(tableArray){
	var $padding = parseInt($('.container').css('padding-left')) * 2;
	var $availableWidth = $('.container').innerWidth() - $padding;
	tableArray.each(function(){
		var $mainTable = $(this).find('.table-sticky-col');
		var tableWidth = $mainTable[0].scrollWidth;
		var $stickyColumnWidth = $(this).find('.fixed-column').width();
		if(tableWidth > $availableWidth) {
			$(this).addClass('willScroll');
		} else {
			$(this).removeClass('willScroll');
		}
	});
} 

// Set the sticky column widths
function setStickyWidths(tableArray){
	tableArray.each(function(){
		var $stickyWidth = $(this).children('.table-sticky-col-outer').find('td').first().outerWidth();
		$(this).children('.fixed-column').find('td').first().outerWidth($stickyWidth);
	});
}

// Remove the scroll indicator when table is scrolled
$('.table-sticky-col-outer').scroll(function(){
	$(this).parent('.table-sticky-col-wrapper').removeClass('willScroll');
});
