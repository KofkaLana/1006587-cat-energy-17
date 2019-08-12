// Слайдер

var btnBefore = document.querySelector('.toggle-before');
var btnAfter = document.querySelector('.toggle-after');
var slider = document.querySelector('.slider__list');
var catBefore = slider.querySelector('.slide--before');
var catAfter = slider.querySelector('.slide--after');

btnBefore.addEventListener('click', function(){
  catAfter.classList.remove('slide--show')
  catBefore.classList.add('slide--show');
});

btnAfter.addEventListener('click', function(){
  catBefore.classList.remove('slide--show')
  catAfter.classList.add('slide--show');
});
