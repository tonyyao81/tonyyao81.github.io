( function($){
	
	/*
	 * Tabbed Portlet Navigation
	 * @purpose toggles visible content containers for a portlet
	 * @requires portlet-tabbed-content to exist
	 */
	$('.portlet-nav li a').live('click', function(){
		var $this = $(this), //-- tab link
			$allLinks = $(this).parent().siblings('li').find('a');
			myTabName = $this.attr('name'), //-- tab name
			$allContent = $this.parents('.portlet-nav').siblings('.portlet-nav-content').find('section'), //-- associated content sections
			$myContent = $allContent.filter('[name=' + myTabName + ']');  //-- my section
			
		//-- execute click unless listed as disabled
		if( !$this.parent().hasClass('disabled') ){
			$allLinks.add( $allContent ).removeClass('selected');
			$this.add( $myContent ).addClass('selected');
		}

		//-- if visible, trigger event
		$this.filter(':visible').trigger('isVisible');

		$this.blur();
	});
	
})( jQuery );