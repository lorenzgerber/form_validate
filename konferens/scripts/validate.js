window.onload = attachValidation;

var validObjects = Array();
validObjects[0] = {fieldName:'field_firstname', fieldText:'First name', missing:true};
validObjects[1] = {fieldName:'field_lastname', fieldText:'Last name', missing:true};
validObjects[2] = {fieldName:'field_organisation', fieldText:'Organisation', missing:true};


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
      if(i == validObjects.length -1){
        missingInput = missingInput + validObjects[i].fieldText + '.';
      } else {
        missingInput = missingInput + validObjects[i].fieldText + ', ';
      }
    }
  }
  if(!validationOk){
    alert("Please enter the following missing values\n" + missingInput);

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
