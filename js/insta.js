var _device = {};

// 즉시실행 IIFE
(function ($) {

	_device = {
		isMobile: false,
		isAndroid: false,
		isiOS: false,
		hasNotch: false,
		isiOSChrome: false,
		isChrome: false,
		isEdge: false,
		isEdgeChromium: false,
		isFirefox: false,
		isIE: false,
		isOpera: false,
		isSafari: false,
		winW: 0,
		winH: 0
	}

	// platform & browser detection
	var ua = navigator.userAgent.toLowerCase();
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) ||
		/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4))) {
		_device.isMobile = true;
		_device.isAndroid = ua.indexOf("android") > -1;
		_device.isiOS = /iPhone/.test(navigator.userAgent) && !window.MSStream;
		var aspect = window.screen.width / window.screen.height;
		_device.hasNotch = (_device.isiOS && aspect.toFixed(3) === "0.462");
		_device.isiOSChrome = navigator.userAgent.match("CriOS");
	} else {
		_device.isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
		_device.isEdge = !_device.isIE && !!window.StyleMedia;
		_device.isEdgeChromium = _device.isChrome && (navigator.userAgent.indexOf("Edg") != -1);
		_device.isFirefox = typeof InstallTrigger !== "undefined";
		_device.isIE = /*@cc_on!@*/ false || !!document.documentMode;
		_device.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
		_device.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
			return p.toString() === "[object SafariRemoteNotification]";
		})(!window["safari"] || (typeof safari !== "undefined" && safari.pushNotification));
	}

	// custom event triggering
	$(document).on("keyup", function (e) {
		if (e.which == 13) $(e.target).trigger("enter");
	});

})(jQuery);

var publish = function () {
	var common = {
		init: function () {
			common.insta();
			common.toggleBtn();
		},
		toggleBtn: function () {
			$('.btn-menu').click(function () {
				let text = $('.lbl');
				$('.toggle').toggleClass('active');
				$('.overlay').toggleClass('open');
				if ($('.toggle').hasClass('active')) {
					text.html("CLOSE");
				} else {
					text.html("MENU");
				}
			});
		},
		insta: function () {
			var $placeholder = $(".instagram_placeholder"),
				placeholder = $placeholder.get(0),
				observe = true,
				len = [];
			const feed = new Instafeed({
				limit: 1000,
				accessToken: "IGQVJWYWhra2E3MGVtNW1WRm9vVTQ5NlVaTHZACUnJkZAnFVcTZAyd3NGRGZAlQUhIMHNIVk5fTEJOaUlIYlIyMHduVE1wMXBWeUF0Ml9QMFRNTFR0eW95eXd6NmFCd2owblZAqTl9hYXoxeDk5M29vOU1NbgZDZD",
				target: placeholder,
				template: "<a href=\"{{link}}\" class=\"item\">" +
					"<img title=\"{{caption}}\" src=\"{{image}}\"/>" +
					"<div class=\"desc\">{{caption}}</div>" +
					"</a>"
			});
			feed.run(function () {
				console.log("length", $(".swiper-slide").length);
			});
			len[0] = $(".item", $placeholder).length;
			var feedObserver = new MutationObserver(function (records) {
				len[1] = $(".item", $placeholder).length;
				if (observe && (len[0] !== len[1])) {
					observe = false;
					getSwiper();
				}
			});
			feedObserver.observe(placeholder, {
				childList: true,
				subtree: true
			});

			function getSwiper() {
				var $item = $(".item", $placeholder),
					$group = $(),
					feed = 8;
				console.log("$item.length", $item.length)
				$item.each(function (i) {
					$group = $group.add(this);
					if ((((i + 1) % feed) == 0) || (i == ($item.length - 1))) {
						$group.wrapAll("<li class=\"swiper-slide\"><div class=\"items\"></div></li>");
						$group = $();
					}
				});
				setSwiper();
			}

			function setSwiper() {
				swiper = new Swiper(".instafeed-swiper .swiper-container", {
					direction: "vertical",
					mousewheel: true,
					slidesPerView: 1,
					spaceBetween: 0,
					effect: "slide",
					speed: 400,
					autoHeight: true,
					autoplay: false,
					loop: false,
					pagination: {
						el: ".swiper-pagination",
						type: "bullets",
						clickable: true
					},
				});
			}
		},
		carousel: function () {
			var config = {
				ui: ".viewer-carousel",
				slidesPerView: 1,
				spaceBetween: 0,
				effect: "fade",
				speed: 400,
				autoplay: false,
				autoHeight: true,
				loop: true,
				parallax: true,
				simulateTouch: true,
				paginationType: "bullets"
			}
			carousel = setCarousel(config);

			function setCarousel(config) {
				var $html = $("html"),
					$ui = $(config.ui),
					swiper = false;
				$ui.each(function () {
					var $li = $(".swiper-slide", $ui),
						$control = $(".swiper-control", $ui),
						$navigation = $(".swiper-navigation", $control),
						$pagination = $(".swiper-pagination", $control),
						$operation = $(".swiper-operation", $control),
						container = $(".swiper-container", $ui).get(0);
					var $prev = $("<a href=\"#\" class=\"swiper-button prev\"><span class=\"icn\"></span><span class=\"lbl\">이전</span></a>").appendTo($navigation),
						$next = $("<a href=\"#\" class=\"swiper-button next\"><span class=\"icn\"></span><span class=\"lbl\">다음</span></a>").appendTo($navigation),
						$pp = $("<a href=\"#\" class=\"swiper-button pp\"><span class=\"icn\"></span><span class=\"lbl\"></span></a>").appendTo($operation);
					swiper = new Swiper(container, {
						slidesPerView: config.slidesPerView || 1,
						spaceBetween: config.spaceBetween || 0,
						effect: config.effect || "slide",
						speed: config.speed || 400,
						autoHeight: config.autoheight || true,
						autoplay: config.autoplay || false,
						loop: config.loop || false,
						parallax: config.parallax || false,
						simulateTouch: config.simulateTouch || false,
						watchSlidesVisibility: true,
						navigation: {
							prevEl: $prev[0],
							nextEl: $next[0]
						},
						pagination: {
							el: $pagination[0],
							type: config.paginationType || "bullets",
							clickable: true
						},
						on: {
							init: onInit,
							transitionEnd: onTransitionEnd
						}
					});

					function onInit() {
						setTimeout(function () {
							var $lbl = $(".lbl", $pp);
							if ($ui.hasClass("paused")) {
								swiper.autoplay.stop();
								$lbl.text("자동재생");
							} else {
								$lbl.text("일시정지");
							}
							$.merge($prev, $next).removeAttr("aria-label");
							$pp.off("click").on("click", function (e) {
								e.preventDefault();
								var state = $ui.hasClass("paused"),
									text = state ? "자동재생" : "일시정지";
								if (state) {
									swiper.autoplay.start();
								} else {
									swiper.autoplay.stop();
								}
								$ui.toggleClass("paused", !state);
								$lbl.text(text);
							});
							$ui.toggleClass("has-only-slide", ($li.length == 1));
						}, 100)
					}

					function onTransitionEnd() {
						var $slide = $(".swiper-slide", $ui),
							$active = $slide.filter(".swiper-slide-active"),
							$overlay = $(".overlay", $active);
						$html.toggleClass("bb-on", $active.hasClass("has-bb"));
						$html.toggleClass("guide-on", $active.hasClass("has-guide"));
						if ($overlay.length > 0) {
							var $btns = $("<div class=\"btns\"></div>").appendTo($control),
								$btn = $("<a href=\"#\" class=\"btn-sheet\"></a>").appendTo($btns);
							$btn.on("click", function () {
								$html.addClass("overlay-on");
							});
							var $sheet = $(".sheet", $overlay);
							if ($sheet.hasClass("has-second")) {
								var $btns2 = $("<div class=\"btns2\"></div>").appendTo($control),
									$btn2 = $("<a href=\"#\" class=\"btn-second\"></a>").appendTo($btns2);
								$btn2.on("click", function () {
									$sheet.addClass("second-on");
									$btns2.remove();
								});
							}
						} else {
							$html.removeClass("overlay-on");
							$(".btns", $control).remove();
						}
						$html.toggleClass("chat-on", $active.hasClass("has-chat"));
						if ($active.hasClass("has-chat")) {
							$(".ui-chat", $active).each(function () {
								var $ui = $(this),
									$dls = $("dl", $ui),
									$dt = $("dt", $ui);
								$dt.on("click", function () {
									var $dl = $(this).closest("dl"),
										$next = $dl.next("dl"),
										scrollT = 0;
									if ($dl.hasClass("done")) return false;
									$dl.addClass("done");
									if ($next.length) {
										scrollT = $next.offset().top - 100;
									}
									if ($dls.index($next) > 0) {
										$("html, body").delay(1200).animate({
											scrollTop: scrollT
										}, {
											duration: 600,
											queue: true,
											complete: function () {
												$next.addClass("on");
											}
										});
									} else {
										setTimeout(function () {
											$html.addClass("chat-done");
											swiper.slideNext();
										}, 800);
									}
								});
							});
						}
					}
				});
				return swiper;
			}
			return carousel;
		}
	};
	return common;
}();

$(function () {
	$.fn.hasClasses = function (selectors) {
		var self = this;
		for (var i in selectors) {
			if ($(self).hasClass(selectors[i])) return true;
		}
		return false;
	};
	$.fn.changeElementType = function (newType) {
		var newElements = [];
		$(this).each(function () {
			var attrs = {};
			$.each(this.attributes, function (idx, attr) {
				attrs[attr.nodeName] = attr.nodeValue;
			});
			var newElement = $("<" + newType + "/>", attrs).append($(this).contents());
			$(this).replaceWith(newElement);
			newElement.push(newElement);
		});
		return $(newElements);
	};
	$.fn.grandparent = function (recursion) {
		if (recursion == undefined) recursion = 2;
		if (typeof (recursion) == "number") {
			recursion = parseInt(recursion);
			if (recursion > 0) {
				grandsome = $(this);
				for (var i = 0; i < recursion; i++) {
					grandsome = grandsome.parent();
				}
				return grandsome;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};
	publish.init();
});