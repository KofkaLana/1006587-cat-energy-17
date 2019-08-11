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
  for (var i=0; i<=field.length-1; i++) {
    if (!field[i].validity.valid) {
      row[i].classList.add('form__field-row--error');
      evt.preventDefault();
    }
  }
});
