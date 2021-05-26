"use strict"

const lazyImages = document.querySelectorAll('img[data-src],source[data-srcset]');
const loadMapBlock = document.querySelector('._load-map');
const windowHeight = document.documentElement.clientHeight;

let LazyImagesPositions = [];
if (lazyImages.length > 0) {
	lazyImages.forEach(img => {
		if (img.dataset.src || img.dataset.srcset) {
			LazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
			lazyScrollCheck();
		}
	});
}

const posBlocks = () => {
	for (let i = 0; i < $('.header__list').children().length; i++) {
		let link = $('.header__list a').eq(i);
		let href = link.attr('href').replace('#', '');
		let block = $(`section[class="${href}"]`);
		if (block.length > 0) {
			let posY = block.offset().top;
			let posEnd = posY + block.height();
			let posCenter = pageYOffset + (document.documentElement.clientHeight / 2);
			if (posCenter >= posY && posCenter <= posEnd) {
				link.addClass('active');
				$('.header__list a').not($('.header__list a').eq(i)).removeClass('active');
				pointTransfer(link);
				break;
			}
		}
	}
}
const pointTransfer = (link) => {
	console.log(link.width() / 2);
}
window.addEventListener('scroll', lazyScroll);
function lazyScroll() {
	posBlocks();
	if (document.querySelectorAll('img[data-src]').length > 0) {
		lazyScrollCheck();
	}
}

function lazyScrollCheck() {
	let imgIndex = LazyImagesPositions.findIndex(
		item => pageYOffset > item - windowHeight
	);
	if (imgIndex >= 0) {
		if (lazyImages[imgIndex].dataset.src) {
			lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
			lazyImages[imgIndex].removeAttribute('data-src');
		}
		else if (lazyImages[imgIndex].dataset.srcset) {
			lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
			lazyImages[imgIndex].removeAttribute('data-srcset');
		}
		delete LazyImagesPositions[imgIndex];
	}
}

const menuClose = () => {
	$('.header__burger,.header__menu').toggleClass('active');
	$('body').toggleClass('lock');
	$('.header__gray').toggleClass('active');
};
$(document).ready(function () {
	posBlocks();
	$('.header__link').click(function () {
		let href = $(this).attr('href').replace('#', '');
		let block = $(`section[class="${href}"]`);
		if (block.length > 0) {
			let posY = block.offset().top - 200;
			if (posY < 0) {
				posY == 0
			}
			// $('html').scrollTop(posY);
			$('html, body').animate({
				scrollTop: posY
			}, 1000);
		}
		return false;
	});
	$('.pointer').click(function () {
		let block = $('section').eq(1);
		if (block.length > 0) {
			let posY = block.offset().top - 200;
			if (posY < 0) {
				posY == 0
			}
			// $('html').scrollTop(posY);
			$('html, body').animate({
				scrollTop: posY
			}, 1000);
		}
		return false;
	});

	$('.tel').click(function () {
		$(this).toggleClass('active');
	});
	$('.header__burger').click(function (event) {
		menuClose();
	});
	$('.header__gray').click(function () {
		menuClose();
	});
	$('.header__menu a').click(function () {
		if ($('.header__menu').hasClass('active')) {
			menuClose();
		}
	});
	let sliderCount = $('.DIY-slider__wrapper').children('.DIY-slider__slide').length;
	$('.DIY-slider__wrapper').children().eq(0).addClass('active');
	if (sliderCount > 1) {
		$('.DIY-slider__wrapper').children().eq(1).addClass('next-active');
		$('.DIY-slider-btn-next').addClass('active');
	}
	$('.DIY-slider-btn-next').click(function () {
		let nextActiveInd = $('.DIY-slider__slide.next-active').index();
		$('.DIY-slider__slide').removeClass('active');
		$('.DIY-slider__slide').removeClass('next-active');
		$('.DIY-slider__wrapper').children().eq(nextActiveInd).addClass('active');
		if (nextActiveInd + 1 >= sliderCount) {
			$('.DIY-slider__wrapper').children().eq(0).addClass('next-active');
		}
		else {
			$('.DIY-slider__wrapper').children().eq(nextActiveInd + 1).addClass('next-active');
		}
	});
	$('.image-slider__slide').append('<div class="img-slider-btn-next"></div>');

	let myImageSlider = new Swiper('.image-slider', {
		// Стрелки
		navigation: {
			nextEl: '.img-slider-btn-next',
		},
		slideToClickedSlide: false,
		slidesPerView: 3,
		spaceBetween: 40,
		loop: true,
		initialSlide: 1,
		loopedSlides: 0,
		preloadImages: false,
		// Lazy Loading
		// (подгрузка картинок)
		lazy: {
			// Подгружать на старте
			// переключения слайда
			loadOnTransitionStart: false,
			// Подгрузить предыдущую
			// и следующую картинки
			loadPrevNext: false,
		},
		// Слежка за видимыми слайдами
		watchSlidesProgress: true,
		// Добавление класса видимым слайдам
		watchSlidesVisibility: true,

		breakpoints: {
			320: {
				spaceBetween: 15,
				slidesPerView: 2,
			},
			480: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 25,
			},
			992: {
				spaceBetween: 40,
			}
		},
		observer: true,
	});

});
