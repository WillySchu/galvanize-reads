$('#moreAuthor').click((e) => {
  e.preventDefault();
  $('#secondAuthor').empty()
  $('#secondAuthor').append($('<label for="author2" class="control-label">Second Author' +
  '<div class="controls">' +
    '<select id="author2" type="text" name="author2" placeholder="Albert Camus" class="form-control input-lg">' +
      '<option val="">stuff</option>' +
    '</select>' +
    '<p class="help-block">Please select an author</p>' +
  '</div>' +
'</label>' +
'<div id="secondAuthor" class="control-group">' +
  '<div class="controls">' +
    '<button id="moreAuthor2" type="submit" class="btn btn-default">Add Second Author</button>' +
  '</div>' +
'</div>'
))
})
