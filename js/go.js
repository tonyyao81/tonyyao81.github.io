(function($, win){
//EVENT CONSTANTS
var ON_BEFORE_SHOW = 'ep-go-before-show';
var ON_AFTER_SHOW = 'ep-go-after-show';

// Save selectors as variables to increase performance
var $doc = $(document);
var $win = $(window);
var $docHeight = $doc.height();
var $winHeight = $win.height();
var $docWidth = $doc.width();
var $winWidth = $win.width();

// begin: HIDE ADDRESS BAR ON MOBILE BROWSERS =====
var doc = win.document;
	
// If there's a hash, or addEventListener is undefined, stop here
if( !location.hash && win.addEventListener ){

	//scroll to 1
	window.scrollTo( 0, 1 );
	var scrollTop = 1,
		getScrollTop = function(){
			return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
		},
	
		//reset to 0 on bodyready, if needed
		bodycheck = setInterval(function(){
			if( doc.body ){
				clearInterval( bodycheck );
				scrollTop = getScrollTop();
				win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
			}	
		}, 15 );
	
	win.addEventListener( "load", function(){
		setTimeout(function(){
			//at load, if user hasn't scrolled more than 20 or so...
			if( getScrollTop() < 20 ){
				//reset to hide addr bar at onload
				win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
			}
		}, 0);
	} );
}
// end: HIDE ADDRESS BAR ON MOBILE BROWSERS =====


$(document).ready(function () {

	// begin: NAV MENU TOGGLE
    $('.nav-bar .toggle-menu').click(function(){
    	$(this).parents('.nav-bar').toggleClass('show-menu');
    	return false;
    });
    // end: NAV MENU TOGGLE
	
	var getFirst = function($collection){
		return $collection.length ? $collection.eq(0) : null;
	};

	// begin: TABS
    $('.mod-tabs .ui-tabs').each(function(idx, ul){
	    var $ul = $(ul);
		var ACTIVE = 'ui-tab-active';
		// For each set of tabs, we want to keep track of
	    // which tab is active and it's associated content
	    var $active, $content, $links = $ul.find('a');

	    var hash = location.hash;
		// If the location.hash matches one of the links, use that as the active tab.
	    // If no match is found, use the first link as the initial active tab.
		if(hash && $.trim(hash)!==''){
			$active = getFirst($links.filter('[href="'+hash+'"]')) || $([]);
		}
		if( !$active || !$active.length ){
	    	$active = getFirst($ul.find('.'+ACTIVE+' > a')) || getFirst($links) || $([]);
		}
	    $active.parent().addClass(ACTIVE);
	    $content = $($active.attr('href'));

	    // Hide the remaining content
	    $links.not($active).each(function () {
	        $($(this).attr('href')).hide();
	    });

	    // Bind the click event handler
	    $ul.find('a[href]').bind('click', function(e){
	        // Make the old tab inactive.
	        $active.parent().removeClass(ACTIVE);
	        $content.hide();

	        // Update the variables with the new link and content
	        $active = $(e.currentTarget);
	        $content = $($active.attr('href'));

	        // Make the tab active.
	        $active.parent().addClass(ACTIVE);
	        $content.trigger(ON_BEFORE_SHOW).show().trigger(ON_AFTER_SHOW);

	        // Prevent the anchor's default click action
	        e.preventDefault();
	    });
	});
    // end: TABS


    // begin: TABS LINK TOGGLE
    $('.ui-tabs .trigger-toggle').click(function(){
    	$(this).parents('.mod-wrapper').toggleClass('show-tab-toggle');
    	return false;
    });
    // end: TABS LINK TOGGLE


	// begin: VIDEO
	var $playList = $(".mod-video .playlist");
    var $matchHeightEl = $(".match-player-height");
    
    var adjustVideoPlaylist = function($modVideo){
    	// VIDEO PLAYER
    	$modVideo = $modVideo || $('.mod-video');
    	var $playerListHeight = $modVideo.innerHeight();
        if ($winWidth > 991) {
            $matchHeightEl.height($playerListHeight);
        }
        else {
            $matchHeightEl.css('height', 'auto');
        }
        if ($winWidth > 767) {
        	var $playerHeight = $modVideo.find('.now-playing').innerHeight();
        	$playList.height($playerHeight);
        }
        else {
            $playList.css('height', 'auto');
        }
    };

	// "LIGHT SWITCH" =====
    $('.light-switch').click(function(){
        $('body').toggleClass('dark');
        $(this).find('i').toggleClass('icon-ui-lightbulb-off').toggleClass('icon-fade');
        return false;
    });
    
    // VIDEO PLAYER "GO BIG" =====
    $('.trigger-go-big').click(function(){
        var $modVideo = $(this).parents('.mod-video');
    	var goingSmall = $modVideo.hasClass('go-big');
    	var txt = goingSmall ? 'Maximize' : 'Minimize';
        $(this).find('span').text(txt);
        $(this).find('i').toggleClass('icon-maximize').toggleClass('icon-minimize');
        $modVideo.toggleClass('go-big');
        if(goingSmall){
        	adjustVideoPlaylist($modVideo);
        }
        return false;
    });
    
    // VIDEO PLAYER PLAYLIST TOGGLE =====
    $('.trigger-playlist').click(function(){
        var txt = $(this).prev('.playlist').is(':visible') ? 'VIEW PLAYLIST' : 'HIDE PLAYLIST';
        $(this).find('span').text(txt);
        $(this).toggleClass('flip-arrow').prev('.playlist').slideToggle();
        return false;
    });
	// end: VIDEO


	// =====
    // Execute this JS after page content has loaded (images, videos, etc):
    // =====
    $win.bind("load", function() {
    	$winWidth = $win.width();
    	adjustVideoPlaylist();

    	$win.resize(function() {
        	$winWidth = $win.width();
        	adjustVideoPlaylist();
        });
    });
	
});

})( jQuery, this); //-- end jQuery
//EMDA-1834
(function($, A){
	var FormNavigatorScroller = function(){
		var f = this, ready=false, formReveal;
		var $nav, $cont;
		
		var getNodes = function(){
			var _$nav = $('.taglib-form-navigator .form-navigator:first');
			var _$cont = _$nav.length ? _$nav.parents('.lfr-top:first') : null;
			_$cont = (_$cont && !_$cont.length) ? _$nav.parents('.portlet-body:first') : _$cont;
			return {
				nav: _$nav,
				cont: _$cont
			};
		};
		var nodes = getNodes();
		$nav = nodes.nav;
		$cont = nodes.cont;
		
		if($nav.length && $cont && $cont.length){
			var $win = $(window);
			var navHeight, maxY, marginTop;
			var adjustFormNavigator = function(needsRefresh){
				var y = $win.scrollTop();
				var checkNavHeight = $nav.innerHeight();
				if(needsRefresh){
					marginTop = null;
				}
				needsRefresh = needsRefresh || checkNavHeight!=navHeight || y===0;
				if(needsRefresh){
					$nav.css({
						'marginTop' : '0px'
					});
					navHeight = checkNavHeight;
					maxY = $cont.height() - navHeight;
				}
				var newMargin = (y > 0) ? Math.max(0, Math.min(y, maxY)) : 0;
				if(newMargin != marginTop){
					$nav.css({
						'marginTop' : newMargin + 'px'
					});
				}
				marginTop = newMargin;
			};
			var adjustDelayed = function(){
				A.later( 50, f, adjustFormNavigator, [true] );
			};
			
			var init = function(){
				navHeight = $nav.innerHeight();
				maxY = $cont.height() - navHeight;
				
				$win.bind('load', adjustFormNavigator);
				$win.bind('scroll', adjustFormNavigator);
				$win.bind('resize', adjustFormNavigator);
				adjustFormNavigator();
				
				//Account for deep-linked section changes
				$cont.find('.form-section[id]:first').siblings('.form-section[id]').each(function(idx, el){
					formReveal = formReveal || [];
					Liferay.on('formNavigator:reveal' + el.id, adjustDelayed);
					formReveal.push(el.id);
				});
				ready = true;
			};
			init();
		}
		
		var destroy = function(){
			if(ready){
				$win.unbind('load', adjustFormNavigator);
				$win.unbind('scroll', adjustFormNavigator);
				$win.unbind('resize', adjustFormNavigator);
				if(formReveal){
					$.each(formReveal, function(idx, id){
						Liferay.detach('formNavigator:reveal' + id, adjustDelayed);
					});
					formReveal = null;
				}
			}
			$cont = $nav = marginTop = null;
			ready = false;
		};
		
		f.getContainer = function(){
			return $cont;
		};
		
		f.reset = function(){
			nodes = getNodes();
			if(nodes.nav.length && nodes.cont && nodes.cont.length){
				if(!ready || $nav.get(0)!=nodes.nav.get(0) || $cont.get(0)!=nodes.cont.get(0)){
					destroy();
					$nav = nodes.nav;
					$cont = nodes.cont;
					init();
				}
			} else {
				destroy();
			}
		};
	};
	
	$(function() {
		var scroller = new FormNavigatorScroller();
		var $cont = scroller.getContainer();
		if($cont && $cont.length){
			//AJAX content change
			Liferay.after("form:registered", function(){
				A.later( 50, this, scroller.reset, [] );
			});
		}
	});
})( jQuery, AUI() ); //-- end jQuery/AUI