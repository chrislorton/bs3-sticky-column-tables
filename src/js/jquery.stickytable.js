(function($){
	$.fn.stickyTable = function(options){
		var settings = $.extend({
            scrollIndicator: 'true'
		}, options );

		var tables = this;

		var width = $(window).width();
		$(window).resize(function(){
			if ($(window).width()==width) return;
			width = $(window).width();
			tables.each(function(){
				onResize($(this));
			});
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
			var $mainTable = $tableInstance[0];
			var $tableWidth = $mainTable.scrollWidth;
			var $tableWrapper = $tableInstance.parent().parent('.table-sticky-col-wrapper');
			var $stickyColumnWidth = $tableWrapper.find('.fixed-column').width();
			$tableInstance.parent().scroll(function(){
				$(this).parent().removeClass('willScroll').addClass('hasScrolled');
			});
			if(settings.scrollIndicator === 'true' && $tableWidth > $availableWidth) {
				$tableWrapper.addClass('willScroll');
			}
			else {
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
