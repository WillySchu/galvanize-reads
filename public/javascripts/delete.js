$('.confirm-delete-modal').on('click', e => {
  e.preventDefault();
  $('#modal-delete').modal('show');
});

$('.modal-delete-cancel').on('click', e => {
  $('#modal-delete').modal('hide');
})
