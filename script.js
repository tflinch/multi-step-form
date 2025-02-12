// my idea is to first check the current values of my input boxes
const form = document.getElementById('multStepForm')
const button = document.getElementById('button')
let mockSteps = [{ 'title': 'Register', 'name': '', 'email': '' }, { 'title': 'Which topics are you interested in?', 'choices': ['Software Developement', 'User Experience', 'Graphic Design'] }, { 'title': 'Summary', 'name': '', 'email': '', 'topcis': [''] }]

let currentStep = 1;

function showStep(setp) {
  //display current setp in the UI

}

function nextStep() {
  currentStep++;
  updateInput();

  //handle next step function

}

function prevStep() {
  //handles previous step function
}

function checkInputs() {
  const items = document.querySelectorAll('.input');
  items.forEach(element => {
    if (element.value == "") {
      console.log('can not be blank');
      element.classList.add('error');
    }
    nextStep();
    console.log(element.value);
  });

  // for (const item of items){
  //   console.log(item.value)
  // }
}

function updateLabels() {
  const labels = document.querySelectorAll('.label')

  switch (currentStep) {
    case 1:
      console.log("step 1")
      break;
    case 2:
      for (const label of labels) {
        label.remove()
      }

    default:
      break;
  }

}
function updateInput() {
  const inputs = document.querySelectorAll('.input')

  switch (currentStep) {
    case 1:
      console.log("step 1")
      break;
    case 2:
      for (const input of inputs) {
        const selector = document.createElement("select", mockSteps[2].choices)
        input.parentElement.append(selector)

        for (var i = 0; i < mockSteps[2].choices; i++) {
          var option = document.createElement('option')
          option.value = mockSteps[2].choices[i]
          option.text = mockSteps[2].choices[i]
          selector.appendChild(option)
        }
      }

    default:
      break;
  }

}



form.addEventListener('submit', function (event) {
  event.preventDefault();
  alert('Sucess!');
});

button.addEventListener('click', function (event) {
  event.preventDefault();
  checkInputs();

})

showStep(currentStep);



// let circle = document.getElementById('step').appendChild();
