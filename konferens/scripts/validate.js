window.onload = attachValidation;

var validObjects = {};
var radioSelector = {};

validObjects.firstName = {
  fieldName:'field_firstname',
  fieldText:'Förnamn',
  missing:true
};

validObjects.lastName = {
  fieldName:'field_lastname',
  fieldText:'Efternamn',
  missing:true
};

validObjects.organisation = {
  fieldName:'field_organisation',
  fieldText:'Organisation',
  missing:true
};

validObjects.email = {
  fieldName:'field_email',
  fieldText:'E-mail',
  missing:true
};

validObjects.title = {
  fieldName:'field_pres_title',
  fieltText:'Presentation Title',
  missing:true
};

validObjects.description = {
  fieldName:'field_message',
  fieldText:'Description',
  missing:true
};

radioSelector.lecture = {
  fieldName:'pres_type_1',
  fieldText:'Lecture'
};

radioSelector.seminar = {
  fieldName:'pres_type_1',
  fieldText:'Seminar'
};

radioSelector.discussion = {
  fieldName:'pres_type_3',
  fieldTxt:'Discussion'
};



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
  var missingInput = Array();
  var missingInputMsg = '';

  for(var key in validObjects){
    if(!entryExists(validObjects[key])) {
      event.preventDefault();
      validationOk = false;
      missingInput.push(validObjects[key].fieldText);
    }
  }
  if (!validationOk) {
    missingInputMsg = 'Du måste fylla i:\n';
    for (var i = 0; i < missingInput.length; i++) {
      if (i < missingInput.length - 1){
        missingInputMsg = missingInputMsg + missingInput[i] + ', ';
      } else {
        missingInputMsg = missingInputMsg + missingInput[i] + '.';
      }
    }
  }

  if(entryExists(validObjects.email)){
    email = document.getElementById(validObjects.email.fieldName).value;
    if(!checkEmail(email)){
      event.preventDefault();
      validationOk = false;
      if(missingInputMsg.length == 0){
        missingInputMsg = 'Fel i email adress formatet.'
      } else {
        missingInputMsg =
          missingInputMsg + '\n\n' + 'Fel i email adress formatet.'
      }
    }
  }

  if(entryExists(validObjects.description)){
    if(!checkMessageLength()){
      event.preventDefault();
      validationOk = false;
      if(missingInputMsg.length == 0){
        missingInputMsg = 'Meddelandet ska maximalt vara 200 tecken.'
      } else {
        missingInputMsg =
          missingInputMsg + '\n\n' + 'Meddelandet ska maximalt vara 200 tecken.'
      }
    }
  }

  if(document.getElementById(radioSelector.lecture.fieldName).checked ||
    document.getElementById(radioSelector.seminar.fieldName).checked){

      if(!entryExists(validObjects.title) || !entryExists(validObjects.description)){
        event.preventDefault();
        validationOk = false;
        if(missingInputMsg.length == 0){
          missingInputMsg = 'Om du väljer Föreläsning eller Seminar,' +
            ' så måste du ange titel och meddelandet.'
        } else {
          missingInputMsg =
            missingInputMsg + '\n\n' + 'Om du väljer Föreläsning eller Seminar,' +
            ' så måste du ange titel och meddelandet.'
        }

      }

  }


  if(!validationOk){
    alert(missingInputMsg);

  }
}

function entryExists(validObj){

  var field = document.getElementById(validObj.fieldName).value;
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

function checkMessageLength(){
  return document.getElementById('field_message').value.length < 200;
}
