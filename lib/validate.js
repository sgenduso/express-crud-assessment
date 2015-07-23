module.exports = {

formValidate: function (title, excerpt, body) {
  var errors = [];
  if (body === '') {
    errors.push('Must add Body');
  }
  if (excerpt === '') {
    errors.push('Must add Excerpt');
  }
  if (title === '') {
    errors.push('Must add Title');
  }
  return errors;
}

};
