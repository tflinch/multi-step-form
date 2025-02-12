// my idea is to first check the current values of my input boxes
const form = document.getElementById('multStepForm');
const button = document.getElementById('button');
let mockSteps = [
  { title: 'Register', name: '', email: '' },
  {
    title: 'Which topics are you interested in?',
    choices: ['Software Developement', 'User Experience', 'Graphic Design'],
  },
  { title: 'Summary', name: '', email: '', topcis: [''] },
];

let currentStep = 1;

function showStep(setp) {
  updateLabels(setp);
  updateInput();
}

function nextStep() {
  checkInputs();
  currentStep++;
  showStep();

  //handle next step function
}

function prevStep() {
  //handles previous step function
}

function checkInputs() {
  const items = document.querySelectorAll('.input');
  let isValid = true;

  const stepData = {};

  items.forEach((element) => {
    if (element.value.trim() === '') {
      console.log(`${element.name} cannot be blank`);
      element.classList.add('error');
      isValid = false;
    }
    element.classList.remove('error');
    //update state
    stepData[element.name] = element.value;
  });

  if (isValid) {
    Object.assign(mockSteps[currentStep - 1], stepData);
    console.log('Updated Step Data:', mockSteps[currentStep - 1]);
  }

  // for (const item of items){
  //   console.log(item.value)
  // }
}

function updateLabels(setp) {
  const inputBox = document.querySelector('.input-box');
  const labels = document.querySelectorAll('.label');
  switch (setp) {
    case 1:
      const title = document.getElementById('title');
      title.innerHTML = mockSteps[setp - 1].title;
      const newLabel = document.createElement('label');
      newLabel.setAttribute('for', 'name');
      newLabel.textContent = 'Your name';

      const newInput = document.createElement('input');
      newInput.setAttribute('type', 'text');
      newInput.setAttribute('name', 'name');
      newInput.placeholder = 'Enter your name';
      newInput.classList.add('input');

      const newLabel2 = document.createElement('label');
      newLabel2.setAttribute('for', 'email');
      newLabel2.textContent = 'Your email';

      const newInput2 = document.createElement('input');
      newInput2.setAttribute('type', 'email');
      newInput2.setAttribute('name', 'email');
      newInput2.placeholder = 'Enter your email';
      newInput2.classList.add('input');

      inputBox.append(newLabel, newInput, newLabel2, newInput2);
    case 2:
      for (const label of labels) {
        label.remove();
      }

    default:
      break;
  }
}
function updateInput() {
  const inputs = document.querySelectorAll('.input');
  const inputBox = document.querySelector('.input-box');

  switch (currentStep) {
    case 1:
      console.log('step 1');
      break;
    case 2:
      inputBox.innerHTML = '';
      const selector = document.createElement('select');
      selector.setAttribute('multiple', 'multiple');
      inputBox.append(selector);

      for (var i = 0; i < mockSteps[1].choices.length; i++) {
        var option = document.createElement('option');
        option.value = mockSteps[1].choices[i];
        option.text = mockSteps[1].choices[i];
        selector.appendChild(option);
      }
      updateDot();

    default:
      break;
  }
}

function updateDot() {
  const dots = document.querySelectorAll('.dot');
  dots[currentStep - 1].classList.add('active');
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  alert('Sucess!');
});

button.addEventListener('click', function (event) {
  event.preventDefault();
  nextStep();
});

showStep(currentStep);

// let circle = document.getElementById('step').appendChild();
