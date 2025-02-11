let currentStep = 1;

function showStep(setp) {
  //display current setp in the UI
}

function nextStep() {
  //handle next step function
}

function prevStep() {
  //handles previous step function
}

document
  .getElementById('multStepForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Sucess!');
  });

showStep(currentStep);

let circle = document.getElementById('step').appendChild();
