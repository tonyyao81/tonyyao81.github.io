// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

//Add support for older jQuery for on() and off()
(function($){
	if(!$.fn.on){
		$.fn.on = function(){
			return $.fn.bind.apply(this, arguments);
		};
	}
	if(!$.fn.off){
		$.fn.off = function(){
			return $.fn.unbind.apply(this, arguments);
		};
	}
})( jQuery );

/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);


/*! http://tinynav.viljamis.com v1.1 by @viljamis - edited by SKudirka (FXDP-639) */
(function(a,i,g){a.fn.tinyNav=function(j){var b=a.extend({active:"selected",header:"",label:"",onChange:null},j);return this.each(function(){g++;var h=a(this),d="tinynav"+g,f=".l_"+d,e=a("<select/>").attr("id",d).addClass("tinynav "+d);if(h.is("ul,ol")){""!==b.header&&e.append(a("<option/>").text(b.header));var c="";h.addClass("l_"+d).find("a").each(function(){c+='<option value="'+a(this).attr("href")+'">';var b;for(b=0;b<a(this).parents("ul, ol").length-1;b++)c+="- ";c+=a(this).text()+"</option>"});e.append(c);
b.header||e.find(":eq("+a(f+" li").index(a(f+" li."+b.active))+")").attr("selected",!0);e.change(b.onChange || function(){i.location.href=a(this).val()});a(f).after(e);b.label&&e.before(a("<label/>").attr("for",d).addClass("tinynav_label "+d+"_label").append(b.label))}})}})(jQuery,this,0);


/**
 * ZURB's Responsive Tables
 * Foundation v2.1.4 http://foundation.zurb.com
 * Artfully masterminded by ZURB
 **/
$(document).ready(function(){var e=false;var b=function(){if(($(window).width()<767)&&!e){e=true;$("table.responsive").each(function(g,f){c($(f))});return true}else{if(e&&($(window).width()>767)){e=false;$("table.responsive").each(function(g,f){d($(f))})}}};$(window).load(b);$(window).on("redraw",function(){e=false;b()});$(window).on("resize",b);function c(f){f.wrap("<div class='table-wrapper' />");var g=f.clone();g.find("td:not(:first-child), th:not(:first-child)").css("display","none");g.removeClass("responsive");f.closest(".table-wrapper").append(g);g.wrap("<div class='pinned' />");f.wrap("<div class='scrollable' />");a(f,g)}function d(f){f.closest(".table-wrapper").find(".pinned").remove();f.unwrap();f.unwrap()}function a(g,j){var i=g.find("tr"),f=j.find("tr"),h=[];i.each(function(m){var l=$(this),k=l.find("th, td");k.each(function(){var n=$(this).outerHeight(true);h[m]=h[m]||0;if(n>h[m]){h[m]=n}})});f.each(function(k){$(this).height(h[k])})}});


/*! Overthrow v.0.1.0. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function(k,d){var i=k.document,c=i.documentElement,b="overthrow-enabled",n="ontouchmove" in i,e="WebkitOverflowScrolling" in c.style||(!n&&k.screen.width>1200)||(function(){var p=k.navigator.userAgent,o=p.match(/AppleWebKit\/([0-9]+)/),r=o&&o[1],q=o&&r>=534;return(p.match(/Android ([0-9]+)/)&&RegExp.$1>=3&&q||p.match(/ Version\/([0-9]+)/)&&RegExp.$1>=0&&k.blackberry&&q||p.indexOf(/PlayBook/)>-1&&RegExp.$1>=0&&q||p.match(/Fennec\/([0-9]+)/)&&RegExp.$1>=4||p.match(/wOSBrowser\/([0-9]+)/)&&RegExp.$1>=233&&q||p.match(/NokiaBrowser\/([0-9\.]+)/)&&parseFloat(RegExp.$1)===7.3&&o&&r>=533)})(),j=function(p,o,r,q){return r*((p=p/q-1)*p*p+1)+o},h=false,g,m=function(r,x){var t=0,v=r.scrollLeft,w=r.scrollTop,q={top:"+0",left:"+0",duration:100,easing:k.overthrow.easing},u,p;if(x){for(var s in q){if(x[s]!==d){q[s]=x[s]}}}if(typeof q.left==="string"){q.left=parseFloat(q.left);u=q.left+v}else{u=q.left;q.left=q.left-v}if(typeof q.top==="string"){q.top=parseFloat(q.top);p=q.top+w}else{p=q.top;q.top=q.top-w}g=setInterval(function(){if(t++<q.duration){r.scrollLeft=q.easing(t,v,q.left,q.duration);r.scrollTop=q.easing(t,w,q.top,q.duration)}else{if(u!==r.scrollLeft){r.scrollLeft=u}if(p!==r.scrollTop){r.scrollTop=p}l()}},1);return{top:p,left:u,duration:q.duration,easing:q.easing}},a=function(p,o){return !o&&p.className&&p.className.indexOf("overthrow")>-1&&p||a(p.parentNode)},l=function(){clearInterval(g)},f=function(){if(h){return}h=true;if(e||n){c.className+=" "+b}k.overthrow.forget=function(){c.className=c.className.replace(b,"");if(i.removeEventListener){i.removeEventListener("touchstart",p,false)}k.overthrow.easing=j;h=false};if(e||!n){return}var s,w=[],o=[],v,y,x=function(){w=[];v=null},t=function(){o=[];y=null},r=function(){var C=(w[0]-w[w.length-1])*8,B=(o[0]-o[o.length-1])*8,A=Math.max(Math.abs(B),Math.abs(C))/8;C=(C>0?"+":"")+C;B=(B>0?"+":"")+B;if(!isNaN(A)&&A>0&&(Math.abs(B)>80||Math.abs(C)>80)){m(s,{left:B,top:C,duration:A})}},u,q=function(C){u=s.querySelectorAll("textarea, input");for(var B=0,A=u.length;B<A;B++){u[B].style.pointerEvents=C}},z=function(B,C){if(i.createEvent){var D=(!C||C===d)&&s.parentNode||s.touchchild||s,A;if(D!==s){A=i.createEvent("HTMLEvents");A.initEvent("touchend",true,true);s.dispatchEvent(A);D.touchchild=s;s=D;D.dispatchEvent(B)}}},p=function(I){l();x();t();s=a(I.target);if(!s||s===c||I.touches.length>1){return}q("none");var J=I,A=s.scrollTop,E=s.scrollLeft,K=s.offsetHeight,B=s.offsetWidth,F=I.touches[0].pageY,H=I.touches[0].pageX,L=s.scrollHeight,G=s.scrollWidth,C=function(P){var M=A+F-P.touches[0].pageY,N=E+H-P.touches[0].pageX,Q=M>=(w.length?w[0]:0),O=N>=(o.length?o[0]:0);if((M>0&&M<L-K)||(N>0&&N<G-B)){P.preventDefault()}else{z(J)}if(v&&Q!==v){x()}if(y&&O!==y){t()}v=Q;y=O;s.scrollTop=M;s.scrollLeft=N;w.unshift(M);o.unshift(N);if(w.length>3){w.pop()}if(o.length>3){o.pop()}},D=function(M){r();q("auto");setTimeout(function(){q("none")},450);s.removeEventListener("touchmove",C,false);s.removeEventListener("touchend",D,false)};s.addEventListener("touchmove",C,false);s.addEventListener("touchend",D,false)};i.addEventListener("touchstart",p,false)};k.overthrow={set:f,forget:function(){},easing:j,toss:m,intercept:l,closest:a,support:e?"native":n&&"polyfilled"||"none"};f()})(this);


/**
 * Debounce function
 * 
 * @description 
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * 
 * @param func - reference to original function that we want to call
 * @param wait - time value in milliseconds
 * @param immediate - trigger the function on the leading edge, instead of the trailing.
 * @returns {Function}
 */
(function($, A){
	EP.Util.Debounce = EP.Util.Debounce || function (func, wait, immediate) {
		var timeout;
		return function() {
			var context = this,
				args = arguments;
	
			var later = function() {
				timeout = null;
				if (!immediate) { func.apply(context, args); }
			};
	
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) { func.apply(context, args); }
		};
	};
})( jQuery, AUI() );


/*
 *	EP Image Lazy Loader
 *
 *	Extended from YUI's Image Loader, but also pays attention to responsive changes in layout 
 *	and checks if an image is now visible because of media queries. Can also trigger 'ep-imgloadgroup-refresh' from window to manually check for changes (ie. tabs).
 *
 *	Author: Steve Kudirka
 *	Date: 1/7/2015
 *	Updated: 2/4/2016
 *	LAKANA
 */
(function($, A){
	var modId = 'ep-imageloader',
		/* Trigger a refresh */
		EVENT_REFRESH = 'ep-imgloadgroup-refresh',
		/* Triggered when element is in view and lazy-load called */
		EVENT_LOAD = 'ep-imgloadgroup-load';
       
	/*ensure not already defined*/
	if( !A.Env._loader.moduleInfo[modId] ){
		var isMediaQueryOn = function($node){
			return $node.is(':visible');
		};
		var generateUniqueId = function(prefix){
			var test;
			do {
				test = A.guid(prefix);
			} while ( document.getElementById(test) );
			return test;
		};
		
		AUI.add(modId, function(A) {
			var CustomImgLoadGroup = function() {
				CustomImgLoadGroup.superclass.constructor.apply(this, arguments);
			};
		 
			CustomImgLoadGroup.NAME = 'EP_' + A.ImgLoadGroup.NAME;
			
			CustomImgLoadGroup.ATTRS = A.mix(A.ImgLoadGroup.ATTRS, {
				
				/**
				 * Class name that will identify images belonging to the group. This class name will be removed from each element in order to fetch images.
				 * This class should have, in its CSS style definition, "<code>background:none !important;</code>".
				 * @attribute className
				 * @type String
				 */
				className: {
					value: null,
					setter: function(name) {
						var instance = this;
						instance._className = name;
						var refreshCheck = instance['_refreshCheck'];
						refreshCheck ? refreshCheck() : instance._setFoldTriggers();
						return name;
					},
					lazyAdd: false
				},
				
				/**
				 * Class name that will identify images or iframes belonging to the group. The elements should have a "data-src" attribute that will be transferred to the "src"
				 * attribute when within viewport.
				 * @attribute srcClassName
				 * @type String
				 */
				srcClassName: {
					value: null,
					setter: function(name) {
						var instance = this;
						instance._srcClassName = name;
						var refreshCheck = instance['_refreshCheck'];
						refreshCheck ? refreshCheck() : instance._setFoldTriggers();
						return name;
					},
					lazyAdd: false
				},
				
				/**
				 * Class name that will be applied to "srcClassName" elements once in view. Use this instead of applying an inline visibility style.
				 * @attribute srcRevealClassName
				 * @type String
				 */
				srcRevealClassName: {
					value: 'reveal'
				},
				
				/**
				 * Millisecond interval used to debounce resize, scroll, and load calls.
				 * @attribute debounceInterval
				 * @type Number
				 */
				debounceInterval: {
					value: 75,
					writeOnce: true,
					validator: function(val) {
						return A.Lang.isNumber(val);
					}
				}
				
			}, true);
			
			var imgGroupProto = {
				
				/**
				 * Initialize all private members needed for the group.
				 * @method _init
				 * @private
				 */
				_init: function() {
					var instance = this;
					
					instance._wrappedScrollCheck = null;
					instance._areRefreshTriggersSet = false;
					instance._refreshCheck = null;
					instance._wrappedRefreshCheck = null;
					instance._srcClassName = null;
					instance._foundSrcElements = false;
					
					CustomImgLoadGroup.superclass._init.apply(instance, arguments);
				},
				
				/**
				 * Performs necessary setup at domready time.
				 * Initiates time limit for group; executes the fold check for the images.
				 * @method _onloadTasks
				 * @private
				 */
				_onloadTasks: function() {
					var instance = this;
					
					instance._domReady = true;
					
					CustomImgLoadGroup.superclass._onloadTasks.apply(instance, arguments);
					instance._setRefreshTriggers();
				},
				
				_setFoldTriggers: function() {
					var instance = this;
					if (instance._areFoldTriggersSet) {
						return;
					}
					/*A.log('setting window scroll and resize events for group: ' + this.get('name'), 'info', 'imageloader');*/
					var wrappedFoldCheck = new EP.Util.Debounce(function(e) {
						instance._foldCheck.apply(instance, []);
					}, instance.get('debounceInterval'));
					instance._wrappedScrollCheck = wrappedFoldCheck;
					
					$(window).bind('scroll', wrappedFoldCheck);
					instance._areFoldTriggersSet = true;
					instance._setRefreshTriggers();
				},
				_setRefreshTriggers: function() {
					var instance = this;
					if (instance._areRefreshTriggersSet) {
						return;
					}
					/* Content or viewport has changed so reset, listen to scroll, and scan DOM. */
					var refreshCheck = function(e){
						instance._setFoldTriggers();
						instance._classImageEls = null;
						instance._maxKnownHLimit = 0;
						instance._foldCheck(true);
					};
					var debouncedRefreshCheck = new EP.Util.Debounce(function(e) {
						refreshCheck.apply(instance, [e]);
					}, instance.get('debounceInterval'));
					
					$(window).bind(EVENT_REFRESH, refreshCheck).bind('load resize', debouncedRefreshCheck);
					instance._refreshCheck = refreshCheck;
					instance._wrappedRefreshCheck = debouncedRefreshCheck;
					instance._areRefreshTriggersSet = true;
					
					$(document).ready(function(){
						if(	instance._areRefreshTriggersSet ){
							refreshCheck('ready');
						}
					});
				},
				_clearTriggers: function() {
					var instance = this;
					CustomImgLoadGroup.superclass._clearTriggers.apply(instance, arguments);
					if( instance._wrappedScrollCheck ){
						$(window).unbind('scroll', instance._wrappedScrollCheck);
						instance._wrappedScrollCheck = null;
					}
					instance._areFoldTriggersSet = false;
					instance._triggers = []
				},
				_clearRefreshTriggers: function() {
					var instance = this;
					if(instance._wrappedRefreshCheck){
						$(window).unbind(EVENT_REFRESH, instance._refreshCheck).unbind('load resize', instance._wrappedRefreshCheck);
						instance._refreshCheck = instance._wrappedRefreshCheck = null;
					}
					
					instance._areRefreshTriggersSet = false;
				},
				registerImage: function() {
					var domId = arguments[0].domId;
					if (! domId) {
						return null;
					}
					/*A.log('adding image with id: ' + domId + ' to group: ' + this.get('name'), 'info', 'imageloader');*/
					this._imgObjs[domId] = new CustomImgLoadImgObj(arguments[0]);
					return this._imgObjs[domId];
				},
				_findSrcElements: function(){
					var instance = this,
						srcClass = this._srcClassName;
					
					$('img.'+srcClass+'[data-src], iframe.'+srcClass+'[data-src]').each(function(idx, img) {
						var $img = $(img);
						var id = $img.attr('id');
						var src = $img.attr('data-src');
						if((src!==null && $.trim(src)!=='')){
							if((id==null || $.trim(id)==='')){
								//generateUniqueId
								var groupName = instance.get('name') || CustomImgLoadGroup.NAME,
									sep = '-';
								id = generateUniqueId(groupName+sep+idx+sep);
								$img.attr('id', id);
							}
							if( !instance._imgObjs[id] ){
								$img.one(EVENT_LOAD, function(e){
									var reveal = instance.get('srcRevealClassName');
									if(reveal!==null){
										$img.addClass(reveal);
									}
								});
								instance.registerImage({ domId: id, srcUrl: src, setVisible: false });
							}
						}
					});
					instance._foundSrcElements = true;
				},
				_foldCheck: function(mediaChange) {
					/*A.log('Checking for images above the fold in group: "' + this.get('name') + '"', 'info', 'imageloader');*/
	
					var allFetched = true,
						viewReg = A.DOM.viewportRegion(),
						hLimit = viewReg.bottom + this.get('foldDistance'),
						id, imgFetched, els, i, len;
					
					// unless we've uncovered new frontiers, there's no need to continue
					if (hLimit <= this._maxKnownHLimit && !mediaChange) {
						return;
					}
					this._maxKnownHLimit = hLimit;
					
					if(this._srcClassName && (!this._foundSrcElements || mediaChange)){
						this._findSrcElements();
					}
					
					for (id in this._imgObjs) {
						if (this._imgObjs.hasOwnProperty(id)) {
							var imgObj = this._imgObjs[id],
								wasFetched = imgObj._fetched;
							imgFetched = imgObj.fetch(hLimit, mediaChange);
							if(!wasFetched && imgFetched){
								$(imgObj._getImgEl().getDOMNode()).trigger( EVENT_LOAD );
							}
							allFetched = allFetched && imgFetched;
						}
					}
					
					// and by class
					if (this._className) {
						if (this._classImageEls === null) {
							// get all the relevant elements and store them
							this._classImageEls = [];
							els = A.all('.' + this._className);
							els.each(function(node) {
								this._classImageEls.push({
									el: node,
									y: node.getY(),
									displaying: isMediaQueryOn( $(node.getDOMNode()) ),
									fetched: false
								});
							}, this);
						}
						els = this._classImageEls;
						for (i = 0, len = els.length; i < len; i++) {
							var obj = els[i];
							if (obj.fetched) {
								continue;
							}
							var objEl = obj.el;
							if(mediaChange){
								obj.displaying = isMediaQueryOn( $(objEl.getDOMNode()) );
								obj.y = objEl.getY();
							}
							if (obj.y && obj.y <= hLimit && obj.displaying) {
								var wasFetched = obj.fetched;
								this._updateNodeClassName(objEl);
								obj.fetched = true;
								if( !wasFetched ){
									$(objEl.getDOMNode()).trigger( EVENT_LOAD );
								}
								/*A.log('Image with id "' + objEl.get('id') + '" is within distance of the fold. Fetching image. (Image registered by class name with the group - may not have an id.)', 'info', 'imageloader');*/
							} else {
								allFetched = false;
							}
						}
					}
					
					// if allFetched, remove listeners
					if (allFetched) {
						/*A.log('All images fetched; removing listeners for group: "' + this.get('name') + '"', 'info', 'imageloader');*/
						this._clearTriggers();
					}
				},
				destroy: function(){
					this._clearRefreshTriggers();
					this._clearTriggers();
					this._triggers = this._imgObjs = this._classImageEls = null;
					CustomImgLoadGroup.superclass.destroy.apply(this, arguments);
				}
			};
			A.extend(CustomImgLoadGroup, A.ImgLoadGroup, imgGroupProto);
			
			var CustomImgLoadImgObj = function() {
				CustomImgLoadImgObj.superclass.constructor.apply(this, arguments);
			};
		 
			CustomImgLoadImgObj.NAME = 'EP_' + A.ImgLoadImgObj.NAME;
			CustomImgLoadImgObj.ATTRS = A.ImgLoadImgObj.ATTRS;
			var imgProto = {
				_init: function() {
					this._checkedMediaQuery = false;
					this._displaying = false;
					CustomImgLoadImgObj.superclass._init.apply(this, arguments);
				},
				fetch: function(withinY, mediaChange) {
					if (this._fetched) {
						return true;
					}
					var el = this._getImgEl().getDOMNode();
					if( !this._checkedMediaQuery || mediaChange){
						this._displaying = isMediaQueryOn( $(el) );
						this._checkedMediaQuery = true;
					}
					if( !this._displaying ){
						return false;
					}
					return CustomImgLoadImgObj.superclass.fetch.apply(this, arguments);
				},
				_getYPos: function() {
					return this._getImgEl().getY();
				}
			};
			A.extend(CustomImgLoadImgObj, A.ImgLoadImgObj, imgProto);
			
			EP.Util.ImgLoadGroup = CustomImgLoadGroup;
			
		}, '', {requires: ['imageloader']});
	}
})( jQuery, AUI() );
// end: EP Lazy Image Loader

 /*
 *	EP Visibility Handler
 *	Author: Steve Kudirka
 *	Date: 4/3/2015
 *	LAKANA
 */
(function($, A){
	/////////////////////////////////////////
	// main visibility API function 
	// check if current tab is active or not
	var vis = (function () {
		var stateKey,
		eventKey,
		keys = {
			hidden: "visibilitychange",
			webkitHidden: "webkitvisibilitychange",
			mozHidden: "mozvisibilitychange",
			msHidden: "msvisibilitychange"
		};
		for (stateKey in keys) {
			if (stateKey in document) {
				eventKey = keys[stateKey];
				break;
			}
		}
		return function (c) {
			if (document.addEventListener && c) document.addEventListener(eventKey, c);
			return !document[stateKey];
		}
	})();
	
	var $win = $(window);
	var handler = {
		tabFocus: function () {
			//Tab Focus
			$win.trigger('ep.tab.focus');
		},
		tabBlur: function () {
			//Tab blur
			$win.trigger('ep.tab.blur');
		},
		windowFocus: function () {
			//Window Focus
			$win.trigger('ep.window.focus');
		},
		windowBlur: function () {
			//Window Blur
			$win.trigger('ep.window.blur');
		}
	};
	
	/////////////////////////////////////////
	// check if current tab is active or not
	vis(function () {
		if (vis()) {
	
			// the setTimeout() is used due to a delay 
			// before the tab gains focus again, very important!
			setTimeout(handler.tabFocus, 300);
	
		} else {
			handler.tabBlur();
		}
	});
	
	
	/////////////////////////////////////////
	// check if browser window has focus		
	var notIE = (document.documentMode === undefined),
		isChromium = window.chrome;
	
	if (notIE && !isChromium) {
	
		// checks for Firefox and other  NON IE Chrome versions
		$win.on("focusin", function () {
			setTimeout(handler.windowFocus, 300);
		}).on("focusout", handler.windowBlur);
	
	} else {
	
		// checks for IE and Chromium versions
		if (window.addEventListener) {
	
			// bind focus event
			window.addEventListener("focus", function (event) {
				setTimeout(handler.windowFocus, 300);
			}, false);
	
			// bind blur event
			window.addEventListener("blur", function (event) {
				handler.windowBlur();
			}, false);
	
		} else {
	
			// bind focus event
			window.attachEvent("focus", function (event) {
				setTimeout(handler.windowFocus, 300);
			});
	
			// bind focus event
			window.attachEvent("blur", function (event) {
				handler.windowBlur();
			});
		}
	} 
})( jQuery, AUI() );