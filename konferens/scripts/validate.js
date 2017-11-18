window.onload = attachValidation;

var validObjects = Array();

validObjects[0] = {
  fieldName:'field_firstname',
  fieldText:'Förnamn',
  missing:true};

validObjects[1] = {
  fieldName:'field_lastname',
  fieldText:'Efternamn',
  missing:true};

validObjects[2] = {
  fieldName:'field_organisation',
  fieldText:'Organisation',
  missing:true};

validObjects[3] = {
  fieldName:'field_email',
  fieltText:'E-mail',
  missing:true};

function attachValidation() {
  var form = document.getElementById('registration_form');
  if (form.attachEvent) {
      form.attachEvent('submit', validateForm);
  } else {
      form.addEventListener('submit', validateForm);
  }
}

function validateForm(event) {
  var validationOk = true;
  var missingInput ='';

  for(var i = 0; i < validObjects.length; i++){
    if(!entryExists(validObjects[i])){
      event.preventDefault();
      validationOk = false;
      if(i == validObjects.length-1){
        missingInput = missingInput + validObjects[i].fieldText + '.';
      } else {
        missingInput = missingInput + validObjects[i].fieldText + ', ';
      }
    }
  }
  if(!validationOk){
    missingInput = 'Du måste fylla i:\n' + missingInput;
  }

  if(entryExists(validObjects[3])){
    email = document.forms['registration_form'][validObjects[3].fieldName].value;
    if(!checkEmail(email)){
      event.preventDefault;
      validationOk = false;
      missingInput = missingInput + '\n\n' + 'Fel i email adress formatet.'
    }
  }


  if(!validationOk){
    alert(missingInput);

  }
}

function entryExists(validObj){

  var field = document.forms['registration_form'][validObj.fieldName].value;
  if(field.length != 0){
    validObj.missing = false;
    return true;
  }
  return false;
}

function checkEmail(email){
  var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
  return pattern.test(email);
}
