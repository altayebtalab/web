'use strict';
const btnScroll = document.querySelector('.btn-scroll-to');
const btnLogin = document.querySelector('.btn-login');
const btnCloseModal = document.querySelector('.btn-close-modal');
const btnForm = document.querySelector('.btn-form');

const nav = document.querySelector('.nav');
const navMenu = document.querySelector('.nav-menu');
const mobileBtn = document.querySelector('.btn-mobile-nav');
const headerNav = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overly = document.querySelector('.overlay');

//////////////////////////////////////////
//////////////////////////////////////////
// Learn more btn
btnScroll.addEventListener('click', function (e) {
	e.preventDefault();
	const id = e.target.getAttribute('href');
	document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	console.log(e.target);
});

//////////////////////////////////////////
//////////////////////////////////////////
// Login btn
btnLogin.addEventListener('click', function (e) {
	e.preventDefault();
	modal.classList.remove('modal-hidden');
	overly.classList.remove('overlay-hidden');
});

btnCloseModal.addEventListener('click', function () {
	modal.classList.add('modal-hidden');
	overly.classList.add('overlay-hidden');
});

overly.addEventListener('click', function () {
	modal.classList.add('modal-hidden');
	overly.classList.add('overlay-hidden');
});

//////////////////////////////////////////
//////////////////////////////////////////
// Navigation scroll
navMenu.addEventListener('click', function (e) {
	e.preventDefault();
	const id = e.target.getAttribute('href');
	document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	// console.log(e.target);
	mobileBtn.classList.toggle('nav-logo-open'); //to toggle mobile-nav-logo
	nav.classList.toggle('mobile-nav'); //to close phone nav after clicked
});

document.querySelector('.btn-register').addEventListener('click', function (e) {
	e.preventDefault();
	const id = e.target.getAttribute('href');
	document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	// console.log(e.target);
	mobileBtn.classList.toggle('nav-open');
	nav.classList.toggle('mobile-nav');
});

//////////////////////////////////////////
//////////////////////////////////////////
// Mobile Navigation
mobileBtn.addEventListener('click', function () {
	// it'll toggle the hidden class into nav element
	nav.classList.toggle('mobile-nav');
	// it'll toggle the hidden nav-logo-open into mobile button element
	mobileBtn.classList.toggle('nav-logo-open');
	// icon bug fix
	// overly.classList.toggle('hidden');
});

//////////////////////////////////////////
//////////////////////////////////////////
// Mouser over to hide Navigations
const mouseover = function (e, opacity) {
	if (e.target.classList.contains('nav-link')) {
		const link = e.target;
		const otherNav = link.closest('nav').querySelectorAll('.nav-link');
		const logo = link.closest('.header').querySelector('img');
		// const navBtns = link.closest('.');
		otherNav.forEach((el) => {
			if (el != link) {
				el.style.opacity = this;
			}
			logo.style.opacity = this;
		});
	}
};

nav.addEventListener('mouseover', mouseover.bind(0.5));
nav.addEventListener('mouseout', mouseover.bind(1));

//////////////////////////////////////////
//////////////////////////////////////////
// Adding sticky navigation bar
const section1 = document.querySelector('#section-1');
const section2 = document.querySelector('#section-2');
const initialCoords = section1.getBoundingClientRect();
const navHeight = headerNav.getBoundingClientRect().height;

// console.log(initialCoords);
// window.addEventListener('scroll', function () {
// 	// console.log(window.scrollY);
// 	if (window.scrollY > initialCoords.top) {
// 		headerNav.classList.add('sticky');
// 	} else {
// 		headerNav.classList.remove('sticky');
// 	}
// });

const stickynav = function (entries, observer) {
	entries.forEach((entry) => {
		// console.log(entry);
		if (!entry.isIntersecting) headerNav.classList.add('sticky');
		else headerNav.classList.remove('sticky');
	});
};
const observer = new IntersectionObserver(stickynav, {
	root: null,
	threshold: 0,
	rootMargin: '20px',
});
observer.observe(document.querySelector('header'));
// console.log(document.querySelector('header'));
// console.log(document.querySelector('.container'));
//********************************
// using dataset for data- attribute
// const dataTest = document.querySelector('.data-test');
// console.log(dataTest.dataset.name);

//////////////////////////////////////////////////
// Revealing Sections

const allSections = document.querySelectorAll('.section');
// allSections.forEach((sec) => console.log(sec));

// convert from nodelist prototype to array
const allSecArr = [];
allSections.forEach((sec) => allSecArr.push(sec));
console.log(allSecArr);

const secBack = function (entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) return;
	entry.target.classList.remove('section-hidden');
	observer.unobserve(entry.target);
};

const secObserver = new IntersectionObserver(secBack, {
	root: null,
	threshold: 0.1,
});
allSections.forEach(function (section) {
	section.classList.add('section-hidden');
	secObserver.observe(section);
});

//////////////////////////////////////////////////
// Revealing Images
const imgTarget = document.querySelectorAll('.image');

const loadImg = function (entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) return;
	entry.target.classList.remove('lazy-img');
	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: '-100px',
});
imgTarget.forEach((img) => imgObserver.observe(img));

//////////////////////////////////////////////////
// Button up Icon
const btnUp = document.querySelector('.btn-up');
const btnUpShow = function (entries, btnObserver) {
	const [entry] = entries;
	if (!entry.isIntersecting) btnUp.classList.remove('btn-hidden');
	else {
		btnUp.classList.add('btn-hidden');
	}
};
const btnObserver = new IntersectionObserver(btnUpShow, {
	root: null,
	threshold: 0,
	threeshold: '300px',
});

btnObserver.observe(document.querySelector('header'));
