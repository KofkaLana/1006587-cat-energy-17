// Навигация

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


// Валидность полей формы

var btnSubmit = document.querySelector('.form__button');
var form = document.querySelector('.form');
var row = form.querySelectorAll('.form__field-row--required');
var field = form.querySelectorAll('.form__text-field:required');

form.addEventListener('input', function() {
  for (var i=0; i<=field.length-1; i++) {
    if(field[i].validity.valid) {
      row[i].classList.remove('form__field-row--error');
    }
  }
});

btnSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();
  for (var i=0; i<=field.length-1; i++) {
    if (!field[i].validity.valid) {
      row[i].classList.add('form__field-row--error');
    }
  }
});
