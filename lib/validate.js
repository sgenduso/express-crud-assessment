module.exports = {

formValidate: function (title, excerpt, body) {
  var errors = [];
  if (title === '') {
    errors.push('Must add title');
  }
  if (excerpt === '') {
    errors.push('Must add excerpt');
  }
  if (body === '') {
    errors.push('Must add body');
  }
  return errors;
}

};
