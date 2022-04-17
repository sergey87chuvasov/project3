'use strict';

// variables
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
//
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
//
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');
//
const nav = document.querySelector('.nav');

// modal wind open/close
const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button =>
  button.addEventListener('click', openModalWindow)
);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

// плавная прокрутка 1 способо олд скулл
// btnScrollTo.addEventListener('click', function (e) {
//   const section1Coords = section1.getBoundingClientRect();
//   console.log(section1Coords); // DOMRect {x: 0, y: 865, width: 1536, height: 1768.96875, top: 865, …}
//   console.log(e.target.getBoundingClientRect());
//   console.log(
//     'Текущее прокручивание: x, y',
//     window.pageXOffset,
//     window.pageYOffset
//   );
//   console.log(
//     'Ширина и высота viewport',
//     document.documentElement.clientWidth,
//     document.documentElement.clientHeight
//   );

//   // window.scrollTo(
//   //   section1Coords.left + window.pageXOffset,
//   //   section1Coords.top + window.pageYOffset
//   // );

//   // window.scrollTo({
//   //   left: section1Coords.left + window.pageXOffset,
//   //   top: section1Coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   // 2 способ
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// smooth page navigation (плавная навигация) - рабочий вариант но не оптимальный

// document.querySelectorAll('.nav__link').forEach(htmlEl => {
//   htmlEl.addEventListener('click', function (e) {
//     e.preventDefault(); // отмега стандарт поведения
//     const href = this.getAttribute('href');
//     console.log('click');
//     console.log(href); // section--1,2,3
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// ПРИ ПОМОЩИ ДЕЛЕГИРОВАНИЯ СОБЫТИЙ
// 1 добавляем event listenet для общего родителя
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2 определить target element, те элемент
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    // console.log('click');
    // console.log(href); // section--1,2,3
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// ВКЛАДКИ
// исп перемещение по dom - к общему родителю прикрепляем ивент лисенер этих баттанов 'operations__tab-container'
tabContainer.addEventListener('click', function (e) {
  // элем на котор кликнули
  const clickedButton = e.target.closest('.operations__tab');
  // console.log(clickedButton);
  // guard clause - пункт охраны
  if (!clickedButton) return;
  // активная вкладка
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');

    clickedButton.classList.add('operations__tab--active');

    // активный контент - получение значение атрибута
    // del
    tabContents.forEach(content => {
      content.classList.remove('operations__content--active');
    });
    //add
    document
      .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
      .classList.add('operations__content--active');
  });
});

// анимация потускнения (исп делегирование с общим родителем на слушателя ссылок) благодаря фазе всплытия события от таргет элементов

const naLinksHoverAnimations = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');
    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this; // el.style.opacity = opacity
    });
    logo.style.opacity = this; // logo.style.opacity = opacity;
    logoText.style.opacity = this; // logoText.style.opacity = opacity
  }
};

// nav.addEventListener('mouseover', function (e) {
//   naLinksHoverAnimations(e, 0.4);
// });

// nav.addEventListener('mouseout', function (e) {
//   naLinksHoverAnimations(e, 1);
// });

// работа с аргументами при помощи bind ()  / this
// улучшение при помощи метода bind - созд копию функции для которой этот метод вызван и этот метод устанавливает ключевое слово this в вызове этой функции в любое значение которое мы передадим в этот метод bind как аргумент
nav.addEventListener('mouseover', naLinksHoverAnimations.bind(0.4));
nav.addEventListener('mouseout', naLinksHoverAnimations.bind(1));

// STICKY NAVIGATION
// НА СОБЫТИЕ ПРОКРУЧИВАНИЕ ДЛЯ WINDOW

// const section1Coords = section1.getBoundingClientRect();
// // console.log(section1Coords); // получаем позицию y или нам подхолит значение top
// window.addEventListener('scroll', function () {
//   // console.log(e);
//   // console.log(window.scrollY);
//   if (window.scrollY > section1Coords.top) {
//     // nav наша переменная вверху
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// sticky navigation - intersection observer
// созд объект and callback func
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

// для проекта
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const getStickyNav = function (entries) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Появление частей сайтов
const allSections = document.querySelectorAll('.section');
const apperanceSection = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(apperanceSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// имплементация lazy loading для изображений
const lazyImages = document.querySelectorAll('img[data-src]');
// console.log(lazyImages); // NodeList(3)

const loadImages = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);
  // пункт охраны
  if (!entry.isIntersecting) return;

  // меня изобр на высоккое качкество
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  // снимаем обзервер
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.6,
  // rootMargin: '300px', // что бы изобр были сразу четкими
});
lazyImages.forEach(images => lazyImagesObserver.observe(images));

// создание слайдера - его изменение в сторону 1-0% 2-100% 3-200% 4-300%
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const slidesNumber = slides.length;
const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide = ${index}></button>`
    );
  });
};

createDots();

const activateCurrentDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateCurrentDot(0);
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(1300px)';
// slider.style.overflow = 'visible';

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};

moveToSlide(0);

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }

  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

slides.forEach(
  (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
);

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

// управление слайдером кнопками клавиатуры
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

// event deleg for dots
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});
///////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// //////////////////////////////////////////////////
// // выбор элементов
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// console.log(document.querySelector('.header'));

// const sections = document.querySelectorAll('.section');
// console.log(sections); // NodeList(4) [section#section--1.section....
// console.log(document.getElementById('section--1'));
// const buttons = document.getElementsByTagName('button');
// console.log(buttons); // HTMLCollection(9) [button.btn--text.btn--scroll-to...
// console.log(document.getElementsByClassName('btn')); // HTMLCollection(5) [button.btn.operat...

////////////////////////////////////////////////
// // создание и вставка элементов

// // insertAdjacentHTML()
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent =
// //   'Мы используем на этом сайте cookie для улучшения функциональности';
// message.innerHTML =
//   'Мы используем на этом сайте cookie для улучшения функциональности. <button class = "btn btn--close-cokie">Ok!</button>';
// // вставим элемент на стр - например в header
// const header = document.querySelector('.header');
// // header.prepend(message);
// header.append(message);
// //клонируем при помощи cloneNode - тк он может быть просто 1 раз только
// // header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message);

// // удаление элементов
// document
//   .querySelector('.btn--close-cokie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// message.style.backgroundColor = 'green';
// message.style.width = '120%';

// // css root
// document.documentElement.style.setProperty('--color-first', 'yellow');

// // атрибуты
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); // Лого Просто Банк
// console.log(logo.src); // file:///C:/Users/User/Desktop/JS%20Developer%20MC/season%2011/%D0%92%D0%B5%D0%B1%D1%81%D0%B0%D0%B9%D1%82%20%D0%9F%D1%80%D0%BE%D1%81%D1%82%D0%BE%20%D0%91%D0%B0%D0%BD%D0%BA/StarterCode/img/logo.png
// console.log(logo.className); // nav__logo
// logo.getAttribute('hi');
// logo.alt = 'Лого просто хороший банк';
// console.log(logo.alt); // Лого просто хороший банк
// logo.setAttribute('copyright', 'Master of Code');
// события

// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   console.log('test');
// });

// const mouseEnterEvent = function (e) {
//   console.log('test'); // будет один раз до обновления страницы
//   // и сразу удаляем
//   h1.removeEventListener('mouseenter', mouseEnterEvent);
// };

// const mouseEnterEvent = function (e) {
//   console.log('test');
// };

// h1.addEventListener('mouseenter', mouseEnterEvent);

// setTimeout(() => h1.removeEventListener('mouseenter', mouseEnterEvent), 3000);

// Event propagation
// rgb(123,56,78)
// получение случайного целого числа между двумя значениями

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);

//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const getRandomColor = () =>
//   `rgb(${getRandomIntInclusive(0, 255)},
//   ${getRandomIntInclusive(0, 255)},
//   ${getRandomIntInclusive(0, 255)})`;

// // console.log(getRandomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // console.log('TEST');
//   // this здесь указывает на document.querySelector('.nav__link')
//   this.style.backgroundColor = getRandomColor();
//   console.log('e', e.target, e.currentTarget);
//   console.log(this === e.currentTarget);
//   // stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   console.log('links', e.target, e.currentTarget);
//   console.log(this === e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = getRandomColor();
//     console.log('nav', e.target, e.currentTarget);
//     console.log(this === e.currentTarget);
//   }
//   //true
// );

// document.querySelector('body').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   console.log('body', e.target, e.currentTarget);
//   console.log(this === e.currentTarget);
// });

////////////////////
// DOM traversing (ПЕРЕМЕЩЕНИЯ ПО DOM)

// const h1 = document.querySelector('h1');
// // перемещение вниз к потомку
// console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight]

// console.log(h1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]

// console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]

// console.log(h1.firstElementChild); // получим первый спан с  текстом и ::after

// h1.firstElementChild.style.color = 'blue';
// h1.lastElementChild.style.color = 'orange';

// // перемещение вверх к родителям
// console.log(h1.parentNode); // одинаокво класс выше с родителем будет
// console.log(h1.parentElement); // одинаокво класс выше с родителем будет

//
// const h2 = document.querySelector('h2');
// h2.closest('.section').style.backgroundColor = 'red';

// // перемещение на одном уровне иеархии
// console.log(h2.previousElementSibling);
// console.log(h2.nextElementSibling);

// lifecycle dom events

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('test', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('test2', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault;
//   console.log(e);
//   e.returnValue = '';
// });
