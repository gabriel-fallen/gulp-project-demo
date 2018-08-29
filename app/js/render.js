'use strict';

/* global $, Feedback */

var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/**
 * 
 * @param {Feedback} model
 */
function render(model) {
  // assumes valid Feedback model
  $('#name').val(model.name);
  $('#email').val(model.email);
  $('#birthdate').datepicker('setDate', model.birthdate);
  $('#text').val(model.text);
}

/**
 * @returns {Feedback}
 */
function validate() {
  var name = $('#name').val(),
      email = $('#email').val(),
      birthdate = $('#birthdate').datepicker('getDate'),
      text = $('#text').val();

  // name shouldn't contain digits
  if (name.match(/\d/g)) {
    $('#name').addClass('invalid');
    return undefined;
  }
  $('#name').removeClass('invalid');

  if (!email.match(emailRegex)) {
    $('#email').addClass('invalid');
    return undefined;
  }
  $('#email').removeClass('invalid');

  if (!birthdate) {
    $('#birthdate').addClass('invalid');
    return undefined;
  }
  $('#birthdate').removeClass('invalid');

  // text could be anything
  return new Feedback(name, email, birthdate, text);
}

$(function () {
  $('#birthdate').datepicker();
  $('#feedback').on('submit', function (e) {
    var model = validate();
    if (model) {
      model.send();
      model.empty();
      render(model);
    }

    e.preventDefault();
    return false;
  });
});
