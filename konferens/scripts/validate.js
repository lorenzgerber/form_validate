window.onload = attachValidation;

function attachValidation() {
  var form = document.getElementById('registration_form');
  if (form.attachEvent) {
      form.attachEvent('submit', validateForm);
  } else {
      form.addEventListener('submit', validateForm);
  }
}

function validateForm(event) {
  var firstName = document.forms['registration_form']['field_firstname'].value;
  var lastName = document.forms['registration_form']['field_lastname'].value;
  var organisation = document.forms['registration_form']['field_organisation'].value;
  if(firstName.length != 0){
    alert(firstName);
    return true;
  } else {
    alert('First Name is missing');
    event.preventDefault();
    return false;
  }
}
