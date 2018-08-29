'use strict';

function Feedback(name, email, birthdate, text) {
  this.name = name;
  this.email = email;
  this.birthdate = birthdate;
  this.text = text;
}

Feedback.prototype.empty = function () {
  this.name = '';
  this.email = '';
  this.birthdate = '';
  this.text = '';
}

Feedback.prototype.send = function () {
  fetch("/review/add", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(this)
  })
  .then(function(res) { console.log(res) })
  .catch(function(res) { console.log(res) });
}
