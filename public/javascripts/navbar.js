$(document).ready($(function(){
  const path = window.location.pathname;
  const all = /.*/;
  $('.nav li a[href=\''+ path + all + '\']').parents('li').addClass('active');

  $('.search-authors').click((e) => {
    e.preventDefault();
    $('#search-form').removeAttr('action');
    $('#search-input').removeAttr('placeholder');
    $('#search-form').attr('action', '/authors/search');
    $('#search-input').attr('placeholder', 'Search Authors');
  });
  $('.search-books').click((e) => {
    e.preventDefault();
    $('#search-form').removeAttr('action');
    $('#search-input').removeAttr('placeholder');
    $('#search-form').attr('action', '/books/search');
    $('#search-input').attr('placeholder', 'Search Books');
  });
}));
