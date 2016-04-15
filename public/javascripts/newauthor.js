$('.add-book-form').on('keyup keypress', e => {
  if (e.which == 13) {
    return false;
  }
});

$('.add-book-form').keypress(e => {
  if (e.which == 13) {
    e.preventDefault();
    e.stopPropagation();
    console.log('enter');
    $('.added-books').append($('<option>' + $(e.target).val() + '</option>'));
    $(e.target).val("");
  }
});

$('.add-book-button').click(e => {
  $('.added-books').append($('<option>' + $('.add-book-form').val() + '</option>'));
  $('.add-book-form').val("");
});

$('.added-books').dblclick(e => {
  $(e.target).remove();
});

$('form').submit(e => {
  if ($('.added-books option').val()) {
    $('.added-books option').prop('selected', true);
  }
});
