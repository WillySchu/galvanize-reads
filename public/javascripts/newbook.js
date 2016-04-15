'use strict';

$('#moreAuthor').click((e) => {
  console.log(1);
  e.preventDefault();
  $('#secondAuthor').empty();
  $.ajax({
    type: 'GET',
    url: '/api/authors'
  }).then(data => {
    let newSelect = '<label for="author2" class="control-label">Second Author' +
    '</label>' +
    '<div class="controls">' +
    '<select id="author2" type="text" name="author2" class="form-control input-lg">';
    for (var i = 0; i < data.length; i++) {
      let name = data[i].first_name + ' ' + data[i].last_name;
      newSelect += '<option val=' + name + '>' + name + '</option>';
    }
    newSelect += '</select>' +
    '<p class="help-block">Please select a second author</p>' +
    '</div>' +
    '<div id="thirdAuthor" class="control-group">' +
    '<div class="controls">' +
    '<button id="moreAuthor2" type="submit" class="btn btn-default">Add Third Author</button>' +
    '</div>' +
    '</div>';
    $('#secondAuthor').append($(newSelect));

    $('#moreAuthor2').click((e) => {
      console.log(2);
      e.preventDefault();
      $('#thirdAuthor').empty();
      $.ajax({
        type: 'GET',
        url: '/api/authors'
      }).then(data => {
        let newSelect = '<label for="author3" class="control-label">Second Author' +
        '</label>' +
        '<div class="controls">' +
        '<select id="author3" type="text" name="author3" class="form-control input-lg">';
        for (var i = 0; i < data.length; i++) {
          let name = data[i].first_name + ' ' + data[i].last_name;
          newSelect += '<option val=' + name + '>' + name + '</option>';
        }
        newSelect += '</select>' +
        '<p class="help-block">Please select a third author</p>' +
        '</div>'
        $('#thirdAuthor').append($(newSelect));
      });
    });
  });
});
