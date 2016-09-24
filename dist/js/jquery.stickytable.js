(function($){
	$.fn.stickyTable = function(options){
		var settings = $.extend({
            scrollIndicator: true
		}, options );

		var tables = this;

		console.log(this);

		$(window).on('resize', function(){
			tables.each(function(){
				onResize($(this));
			});
		});

		// Remove the scroll indicator when table is scrolled
		this.find('.table-sticky-col-outer').scroll(function(){
			console.log(this);
			$(this).parent().removeClass('willScroll');
		});


		// Functions to run on resize
		function onResize($elem){
			setStickyWidths($elem);
			scrollIndicator($elem);
		};

		function createTable($elem){
			processTables($elem);
			setStickyWidths($elem);
			scrollIndicator($elem);
		};

		return this.each(function(){
			createTable($(this));
		});

		// Wrap, clone and process the table
		function processTables($tableInstance){
			// Wrap
			$tableInstance.wrap('<div class="table-sticky-col-wrapper"><div class="table-sticky-col-outer"></div></div>')
			// Clone
			var $fixedColTable = $tableInstance.clone();
			// Process
			$fixedColTable.find('th:not(:first-child),td:not(:first-child)').remove();
			$fixedColTable.addClass('fixed-column').removeClass('table-sticky-col');
			$fixedColTable.insertBefore($tableInstance.parent());
		};

		function scrollIndicator($tableInstance){
			// Width and padding variables
			var $padding = parseInt($('div[class*="col-"]').css('padding-left')) * 2;
			var $availableWidth = $('.row').innerWidth() - $padding;

			// Add the scroll indicator if table is too wide for container
			var $mainTable = $($tableInstance);
			var $tableWidth = $mainTable[0].scrollWidth;
			var $tableWrapper = $tableInstance.parent().parent();
			var $stickyColumnWidth = $tableWrapper.find('.fixed-column').width();
			if($tableWidth > $availableWidth) {
				$tableWrapper.addClass('willScroll');
			} else {
				$tableWrapper.removeClass('willScroll');
			}
		};

		// Set the sticky column widths
		function setStickyWidths($tableInstance) {
			var $stickyWidth = $tableInstance.parent().find('td').first().outerWidth();
			var test = $tableInstance.parent().siblings('.fixed-column').find('td').first().outerWidth($stickyWidth);
		};

	};
}( jQuery ));
