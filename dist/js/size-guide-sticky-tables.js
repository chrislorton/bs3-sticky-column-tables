$(function(){

	var $tableInstances = $('.table-sticky-col-wrapper');
	console.log($tableInstances);

	$tableInstances.each(function(){
		var $table = $(this).find('table');
		var $fixedColTable = $table.clone();
		$fixedColTable.find('th:not(:first-child),td:not(:first-child)').remove();
		$fixedColTable.addClass('fixed-column').removeClass('table-sticky-col');
		$fixedColTable.insertBefore($table.parent());
		// setStickyWidths();
		// scrollIndicator(tableWrapper);
	});

});

// function scrollIndicator(currentTable){
// 	var availableWidth = $('body').innerWidth();
// 	var tableInner = $(currentTable).find('.table-sticky-col-inner');
// 	// For some reason 'scrollWidth' doesn't seem to calculate padding. Adding it here as a variable to remove it in the next step
// 	var tabPadding = parseInt($('body').css('padding'));
// 	tableInner.each(function(){
// 		if(this.scrollWidth > availableWidth - (tabPadding * 2)){
// 			var wrapper = $(this).parent().addClass('willScroll');
// 			$(this).scroll(function(){
// 				wrapper.addClass('scrolled').removeClass('willScroll');
// 			});
// 		}
// 	});
// }
//
// function stickyTables(tableWrapper){
// 	var $singleTableWrapper = $(tableWrapper);
// 	$singleTableWrapper.each(function(){
// 		var $table = $(this).find('table');
// 		var $fixedColTable = $table.clone();
// 		$fixedColTable.find('th:not(:first-child),td:not(:first-child)').remove();
// 		$fixedColTable.addClass('fixed-column').removeClass('table-sticky-col');
// 		$fixedColTable.insertBefore($table.parent());
// 		setStickyWidths();
// 		scrollIndicator(tableWrapper);
// 	});
// }
//
// function setStickyWidths(){
// 	var $tables = $('.table-sticky-col-wrapper .fixed-column');
// 	$tables.each(function(){
// 		$(this).find('td').first().outerWidth(getColSize(this));
// 	});
// }
//
// function getColSize(table){
// 	return $(table).parent().find('.table-sticky-col td').first().outerWidth();
// }
