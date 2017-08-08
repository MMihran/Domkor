$(document).ready(function () {
	//HEADER-SLIDER
	$(".header-slider").slick({
		arrows:true,
		slidesToShow: 1,
		swipeToSlide: true,
		touchThreshold: 30,
		nextArrow: ".header-slider-wrap .slick-next",
		prevArrow: ".header-slider-wrap .slick-prev"

	});
	if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
	    skrollr.init({
	        forceHeight: false
	    });
	}
	

	/*header submenu function*/
	(function(){
		var counter;

		function submenuPos(obj){
			if(!(obj.length) || obj.parent().hasClass("submenu-fluid")) return; 
			var o = obj;
			obj.css("margin-right", 0);
			obj.css("margin-left", 0);
			var c = $(".navbar-default .container");
			// Left position
			var cPosL = c.offset().left;
			var objPosL = obj.offset().left - (obj.width()/2) + 25;
			// Right position
			var cPosR = c.offset().left + c.width();
			var objPosR = obj.offset().left + obj.width() + 25;
			
			
			if(cPosR < objPosR){
				$(obj).css("margin-right", (2*(+objPosR - +cPosR) + 25) + "px");

			} 
			if(cPosL > objPosL){
				$(obj).css("margin-left", (2*(+cPosL - +objPosL) + 25) + "px");

			}
		}
		
		function headSubmenus(){

			if ($(".jquery-check-sm").is(":hidden") && $(".jquery-check-xs").is(":hidden")) {
				$(".submenu-toggle").off("click");
				$('.submenu').removeAttr('style');
				
				$(".submenu-toggle").on("click", function(e){
					e.preventDefault();
					if($(this).siblings(".submenu").hasClass("submenu-active")) return;
					$('.submenu').removeClass('submenu-active');
					$(this).siblings(".submenu").addClass('submenu-active');
					// submenuPos($(this).siblings(".submenu").children("ul"));
				});
				
				
            	$(".submenu>ul").each(function(){
					submenuPos($(this));
				});
				return;
			}else{
				$(".submenu-toggle").off("click");
				$(".submenu").hide();

				$(".submenu>ul").removeAttr("style");
				$('.submenu-active').removeClass('submenu-active');
				$('#bs-example-navbar-collapse-1').on('hidden.bs.collapse', function () {
					$('.submenu-active').removeClass('submenu-active');
					$(".submenu").hide();
				});
				$(".submenu-toggle").on("click", function(e){
					e.preventDefault();
					if ($(this).siblings(".submenu").hasClass('submenu-active')) return;
					$('.submenu-active').removeClass('submenu-active');

					$(".submenu").hide();
					$(this).siblings(".submenu").addClass('submenu-active').slideDown(400);
				});
				return;
			}			
		}
		headSubmenus();
		$(".submenu>ul").each(function(){
			submenuPos($(this));
		});
		$(window).resize(function() {
            clearTimeout(counter);
            counter = setTimeout(function(){
            	headSubmenus();

            }, 150);
        }); 
	})();


	/*
	* SHOW MORE PAGINATION
	*/
	var magazineShowMore = function(e){
		e.preventDefault();
		var clone = $(this).clone();
		var parentElem = $(this).parent();
		var list = parentElem.children("li");
		var lastItem = +$(list[(list.length - 2)]).text();
		var minYear = 2010;
		var toAddYear = lastItem - 1;
		if (toAddYear>=minYear) {
			$(this).detach();
			parentElem.append("<li><a href='#'>" + toAddYear + "</a></li>").append(clone);
			$("#show-more").on("click", magazineShowMore);	
		}else{
			$(this).detach();
		}
	}

	var mediaShowMore = function(e){
		e.preventDefault();
		var clone = $(this).clone();
		var parentElem = $(this).parent();
		var list = parentElem.children("li");
		var lastItem = +$(list[(list.length - 2)]).text();
		var maxPage = 11;
		var toAddItem = lastItem + 1;
		if (toAddItem<=maxPage) {
			$(this).detach();
			parentElem.append("<li><a href='#'>" + toAddItem + "</a></li>").append(clone);
			if (toAddItem+1<=maxPage) {
				parentElem.append("<li><a href='#'>" + (toAddItem + 1) + "</a></li>").append(clone);
			}
			$("#show-more").on("click", mediaShowMore);	
		}else{
			$(this).detach();
		}
	}
	$(".m-filter #show-more").on("click", magazineShowMore);
	$(".media-content #show-more").on("click", mediaShowMore);

	/**
	*
	*	INDEX SCRIPTS
	*
	*/
	(function(){
		// function hoverChange(){
		// 	if(!($(this).hasClass("object-long-top"))) {
		// 		$(".object").off('mouseenter', hoverChange);
		// 	}else{
		// 		return;
		// 	}
		// 	var className = ($(this).attr("class")).split(" ")[1];
		// 	$(this).parents(".objects-wrap").children(".object-long-top").removeClass().addClass("object " + className);
		// 	$(this).removeClass().addClass("object object-long-top");
		// 	setTimeout(function(){
		//         $('.object').on('mouseenter', hoverChange);
		//     }, 1000);
		// }
		// $('.object').on('mouseenter', hoverChange);
		$(".object").hover(function(e){
			$(".object").css("z-index", 5);
			$(this).css("z-index", 8);
		}, function(e){
			var self = this;
			setTimeout(function(){$(self).attr("style", "")}, 1000);
		});

		var respTimeout;

		var indexMobile = function(){
			if($(".objects-wrap").hasClass("slick-slider")) $(".objects-wrap").slick("unslick");
			$(".objects-wrap").slick({
				responsive:[
				{
	              breakpoint: 9999,
	              settings: "unslick"
	            },
	            {
	              breakpoint: 1012,
	              settings: {
	              	variableWidth: true,
	                arrows: true,
	                swipeToSlide: true, touchThreshold: 30
	              }
	            },
	            {
	              breakpoint: 600,
	              settings: {
	              	variableWidth: true,
	                arrows: true,
	                swipeToSlide: true, touchThreshold: 30
	              }
	            }
				]
			});
			// if (($(".jquery-check-sm").is(":visible")) || ($(".jquery-check-xs").is(":visible"))) {
			// 	$(".object").off('mouseenter', hoverChange);
			// }else{
			// 	$('.object').on('mouseenter', hoverChange);
			// }

		}

		function objNavDrop(){
			var toggle = $(".obj-nav-toggle");
			function changeText(){
				var text = toggle.siblings(".nav-tabs").find(".active a span").text();
				toggle.text(text);
			}
			changeText();
			$(".index-objects-wrap .nav-tabs li").click(function(){
				var text = $(this).find("a span").text();
				toggle.text(text);
				if (toggle.is(":visible")) {
					toggle.siblings(".nav-tabs").removeClass("nav-height");
				}
			});
			toggle.click(function(){
				toggle.siblings(".nav-tabs").toggleClass("nav-height");

			});
		}

		objNavDrop();

		indexMobile();

        $(window).resize(function() {
            clearTimeout(respTimeout);
            respTimeout = setTimeout(indexMobile, 500);
        });


	})();


	

	/**
	*
	*	GALLERY PAGE SCRIPTS
	*
	*/
	$("#video-gallery .gallery-item").click(function(e){
		$('#gallery-video-modal iframe').addClass("hidden");
		$('#gallery-video-modal iframe').attr("src", "");
		var vidElem = $('#gallery-video-modal iframe[data-destination=' + $(this).data("target") + ']');
		vidElem.removeClass("hidden");
		vidElem.attr("src", vidElem.attr("data-src") + "?rel=0&autoplay=1");
		// console.log(vidElem.attr("data-src"));
		// console.log(vide);
		$('#gallery-video-modal').modal('show');
	});
	$('#gallery-video-modal').on('show.bs.modal', function (e) {
		$(this).addClass("modal-flex");
	});
	$('#gallery-video-modal').on('hidden.bs.modal', function (e) {
		$('#gallery-video-modal iframe').attr("src", "");
		$(this).removeClass("modal-flex");
	});



	$("#photo-gallery .gallery-item").click(function(e){
		$('#gallery-photo-modal').modal('show');
	});


	gallerySlick();
	$('#gallery-photo-modal').on('show.bs.modal', function (e) {
			$(this).addClass("modal-flex");
		
			$(".gallery-modal .thumbs-wrap").get(0).slick.setPosition();
		setTimeout(function(){
			$(".gallery-modal .thumbs-wrap").get(0).slick.setPosition();
			$(".gallery-modal .prime-pic-wrap").get(0).slick.setPosition();
		}, 200);
	});
	$('#gallery-photo-modal').on('hidden.bs.modal', function (e) {
		$(this).removeClass("modal-flex");
	});
	function gallerySlick(){
		$(".gallery-modal .thumbs-wrap").slick({
			asNavFor: ".gallery-modal .prime-pic-wrap",
			variableWidth: true,
			focusOnSelect: true,
			useTransform: false,
			infinite: false,
			arrows: false,
			swipeToSlide: true, touchThreshold: 30,
			responsive: [
			{
				breakpoint: 1012,
				settings: {
					useTransform: true,
					infinite: true,
					slidesToShow: 3,
					variableWidth: false,
					swipeToSlide: true, touchThreshold: 30
				}
			},
			{
				breakpoint: 768,
				settings: {
					useTransform: true,
					variableWidth: false,
					slidesToShow: 2,
					infinite: true,
					swipeToSlide: true, touchThreshold: 30,
				}
			}
			]
		});
		$(".gallery-modal .prime-pic-wrap").slick({
			asNavFor: ".gallery-modal .thumbs-wrap",
			slidesToShow: 1,
			fade: true
		});
	}

	//GALLERY THUMBNAILS
	// function videoThumb(){
	// 	$("#gallery-video-modal video").each(function(){
	// 		var time = 6;
	//         var scale = 1;
	//         var vid = $(this).get(0);
	//         var imgTarget = $(this).data("destination");
	//         var video_obj = null;
	// 	    	vid.addEventListener('loadedmetadata', loadedmeta, false);
	//         	vid.addEventListener('loadeddata', loadeddata, false);
	       
	//         if (vid.readyState >= 2) {
	// 	      loadedmeta();
	// 	      loadeddata();
	// 	    }
	//         function loadedmeta(){
	//         	vid.currentTime = time;
	//         }
	//         function loadeddata(){
	//         	vid.addEventListener('timeupdate', func, false);

	// 	     	var func = setTimeout(function(){
	//         		if (vid.currentTime == 0) {
	//         			vid.currentTime = time;
	//         			return;
	//         		}
	//             	var canvas = document.createElement("canvas");
	// 	            canvas.width = vid.videoWidth;
	// 	            canvas.height = vid.videoHeight;
	// 	            canvas.getContext('2d').drawImage(vid, 0, 0, canvas.width, canvas.height);
	// 	            var img = document.createElement("img");
	// 	            $(img).addClass("gallery-img");
	// 	            img.src = canvas.toDataURL();
	// 	            $.when($("#video-gallery .gallery-item[data-target="+ imgTarget +"]").append(img)).then(function(){
	// 	            	vid.removeEventListener('timeupdate', func);
	// 	            	vid.currentTime = 0;
	// 	            });
	//             }, 500);

	//         }

	// 	});
	// };

	// if ($("#gallery-video-modal").attr("id") == "gallery-video-modal") {
	// 	videoThumb();
	// }





	/**
	*
	*	FILTER CHOOSE YEAR
	*
	*/
	(function chooseYear(){
		var prev = $(".filter-prime .choose-year .prev");
		var next = $(".filter-prime .choose-year .next");
		var input = $(".filter-prime .choose-year input");
		/*max-year*/
		var max = (new Date()).getFullYear() >= 2017 ? (new Date()).getFullYear() : 2017;
		/*min-year*/
		var min = 2000;
		prev.click(function(){
			$('.choose-month input:checkbox').removeAttr('checked');
			if (input.val() == min) {
				input.val(max);
				return;
			}
			input.val(+input.val() - 1);
		});
		next.click(function(){
			$('.choose-month input:checkbox').removeAttr('checked');
			if (input.val() == max) {
				input.val(min);
				return;
			}
			input.val(+input.val() + 1);
		});
	})();



	/**
	*
	*	FILTER COLLAPSE MOBILE
	*
	*/
	(function(){
		var counter;
		function filterCollapse(){
			if (($(".jquery-check-sm").is(":visible")) || ($(".jquery-check-xs").is(":visible"))) {
				$(".filter-content.collapse.in").collapse("hide");			
			}else{
				$(".filter-content.collapse").not(".in").collapse("show");
			}
		}
		filterCollapse();
		$(window).resize(function() {
            clearTimeout(counter);
            counter = setTimeout(filterCollapse, 50);
        });
	})();


	/**
	*
	*	HONOR PAGE SCRIPTS
	*
	*/
	$(".honor .img-wrap").click(function (e) {
		e.preventDefault();
		var src  = $(this).children("img").attr("src");

		$('#honorPic img').attr("src", src);
	    $('#honorPic').modal('show'); 
	  });

	$('#honorPic').on('show.bs.modal', function (e) {
		$(".honor-modal").addClass("modal-flex");
	});
	$('#honorPic').on('hidden.bs.modal', function (e) {
		$(".honor-modal").removeClass("modal-flex");
	});



	/**
	*
	*	NEWS PAGE SCRIPTS
	*
	*/
	$(".news-single .similar-items").slick({
		slidesToShow: 3,
		arrows: false,
		adaptiveHeight: true,
		swipeToSlide: true, touchThreshold: 30,
		responsive: [
		{
			breakpoint: 1340,
			settings: {
				slidesToShow: 2,
				arrows: true,
				swipeToSlide: true, touchThreshold: 30
			} 
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				arrows: true,
				swipeToSlide: true, touchThreshold: 30
			} 
		},
		]
	});





	/*
 * jQuery liLanding v 2.1
 *
 * Copyright 2013, Linnik Yura | LI MASS CODE | http://masscode.ru
 * Free to use
 *
 * Last Update: 19.06.2016
 */
(function ($) {
	var methods = {
		init: function (options) {
			var p = {
				show: function (linkEl, landingItem) {}, 
				hide: function (linkEl, landingItem) {},
				topMargin: 0,
				speedFactor: 1,
				resp: false
			};
			if (options) {
				$.extend(p, options);
			}
			return this.each(function () {
				var el = $(this);
				var elPos = el.offset().top;
				var wHalf = $(window).height()/2
				var scrollId = function(){};
				
				//assign events only links with anchors
				$('a[href^=\\#]',el).on('click',function(e){
					e.preventDefault();
					if (p.resp === true && !($(".jquery-check-xs").is(":visible") || $(".jquery-check-sm").is(":visible"))) {
						return;
					}
					var linkItem = $(this);
					if(!linkItem.is('.cur')){
						var linkHref = linkItem.attr('href');
						var linkTarget = $(linkHref);
						var linkTargetPos = linkTarget.offset().top;
						var windowPos = $(window).scrollTop();
						var animDuration = linkTargetPos - windowPos
						if(animDuration < 0){
							animDuration = animDuration*-1	
						}
						//scroll the page to the desired block
						if(linkTarget.length){
							$('html, body').stop(true).animate({scrollTop:(linkTargetPos-parseFloat(p.topMargin))},animDuration*p.speedFactor,function(){
								$(window).trigger('scroll');
							});
						}
					}
					return false;
				})
				//stop the animation by scrolling
				var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
				if (document.attachEvent) //if IE (and Opera depending on user setting)
					document.attachEvent("on"+mousewheelevt, function(e){
						$('html, body').stop(true);		
					});
				else if (document.addEventListener) //WC3 browsers
					document.addEventListener(mousewheelevt, function(e){
						//e.detail //direction
						$('html, body').stop(true);
					}, false)
				//highlight the desired link in the menu by scrolling
				$(window).on('scroll',function(e){
					clearTimeout(scrollId);
					var windowPos = $(window).scrollTop();
					if(windowPos > elPos){
						el.addClass('landingFix');	
					}else{
						el.removeClass('landingFix');	
					}
					scrollId = setTimeout(function(){
						$('.landingItem').each(function(){
							var landingItem = $(this);
							var landingItemHeight = landingItem.height();
							var landingItemTop = landingItem.offset().top - wHalf;
							var linkHref = landingItem.attr('id');
							var linkEl = $('a[href="#'+linkHref+'"]',el);
							var status;

							if(windowPos > landingItemTop && windowPos < (landingItemTop + landingItemHeight)){
								if(!linkEl.is('.cur')){
									linkEl.addClass('cur');
									if (p.show !== undefined) {
										p.show(linkEl, landingItem);
									}
								}
							}else{
								if(linkEl.is('.cur')){
									linkEl.removeClass('cur');
									if (p.hide !== undefined) {
										p.hide(linkEl, landingItem);
									}
								}
							}
						});
					},100);
				})
				$(window).trigger('scroll');
			});
		}
	};
	$.fn.liLanding = function (method) {
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Метод ' + method + ' в jQuery.liLanding не существует');
		}
	};
})(jQuery);




	
	
	// $("video").click(function() {
	//   if (this.paused) {
	//     this.play();
	//   } else {
	//     this.pause();
	//     $(this).css("z-index", 2);
	//     $(this).siblings(".video__toggle").css("opacity", 1);
	//   }
	// });

	$('.video__toggle').click(function() {
		var iframe = $(this).siblings('iframe');
		iframe.attr("src", iframe.attr("data-src") + "?rel=0&autoplay=1&showinfo=0&controls=0").css("z-index", 6);
		$(this).css("opacity", 0);
	    $(this).css("z-index", 1);
	    $(this).siblings("img").css("z-index", 1);

	});

	$('.tabs__row li').click(function(e){

		e.stopPropagation(); 

		var id = $(this).data('id');

		var className = '.tabs__tabPane.t-'+id+'';

		var activeClassName  = 'tabs__tab_active';

		var lastLi = 0;

		

		if($(this).hasClass(activeClassName) && lastLi != id ) {


			$(this).removeClass(activeClassName);

			$(className).stop().slideUp();

			$('.tabs__triangle').hide();


		} else {

			$('.tabs__triangle').show();




			$(this).siblings().removeClass(activeClassName);


			$(this).addClass(activeClassName);

			$(className).siblings().stop().hide();
			$(className).stop().slideDown();

			


			lastLi = id;

		}
		
	});

	// Init slick slider

	
	$('.c-reviews__slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 1500,
	  arrows: false,
	  autoplaySpeed: 2000
	}); 

	$('.c-gallery__slider').slick({ 
	  infinite: true,
	  slidesToShow: 4,
	  slidesToScroll: 4,
	  prevArrow: $('.c-gallery__slideArrow_left'),
	  nextArrow: $('.c-gallery__slideArrow_right'),
	  responsive: [
	    {
	      breakpoint: 1340,
	      settings: {
	       	slidesToShow: 3,
	  		slidesToScroll: 3,
	      }
    	},

    	{
	      breakpoint: 1012,
	      settings: {
	       	slidesToShow: 2,
	  		slidesToScroll: 2,
	      }
    	},

    	{
	      breakpoint: 768,
	      settings: {
	       	variableWidth: true,
	  		swipeToSlide: true, touchThreshold: 30, 
	      }
    	}
      ]
	});

	
	$(document).click(function(){
	 // $('.tabs__tabPane').removeClass('tab-open'); 

	 $('.tabs__tabPane').slideUp(); 

	 $('.tabs__row li').removeClass('tabs__tab_active');
	 $('.tabs__triangle').hide();

	});

	$(".tabs__tabPane").click(function(e){
	  e.stopPropagation(); 
	});	



});

$(window).load(function(){
  $('.landingMenu').liLanding({
  	speedFactor: .3
  });
  $('.contacts .contact').liLanding({
  	speedFactor: .4
  });
  $('.contacts2 .contact').liLanding({
	speedFactor: .4,
	resp: true
  });
  $('.landingNav').liLanding({
		speedFactor: 0.3
	});
});

