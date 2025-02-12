// my idea is to first check the current values of my input boxes
//notes to self, as i built this out i wasnt sure what was the best way to render elements for the form on to the page. my reminder would be to always create static elments with html 1st. Then do apply styling 2nd. For components that need javascript manipulation. create the elements with javascript first then attach to the document 4. then create global state variables 5. then functions that update 6
let currentStep = 1;
let mockSteps = [
  { title: 'Register', name: '', email: '' },
  {
    title: 'Which topics are you interested in?',
    choices: ['Software Developement', 'User Experience', 'Graphic Design'],
  },
  { title: 'Summary', name: '', email: '', topcis: [''] },
];

let state = {};

const form = document.getElementById('multStepForm');
const button = document.getElementById('button');

const tracker = document.querySelector('.tracker');
const p = document.createElement('p');
p.innerHTML = `Step ${currentStep} of 3`;
tracker.append(p);
for (let i = 1; i < mockSteps.length + 1; i++) {
  const spanDot = document.createElement('span');
  spanDot.classList.add('dot');
  spanDot.dataset.step = i;
  tracker.append(spanDot);
}

const spanButtons = document.querySelectorAll('.dot');

function showStep(setp) {
  console.log(setp);
  updateLabels(setp);
  updateDot();
}

function nextStep() {
  //handle next step function
  if (currentStep < mockSteps.length) {
    checkInputs(currentStep);
    currentStep++;
    console.log('Current Step:', currentStep);
    updateDot();
    showStep(currentStep);
  }
}

function prevStep() {
  //handles previous step function
  if (currentStep > 1) {
    currentStep--;
    console.log('Current Step', currentStep);
    updateDot();
    showStep(currentStep);
  }
}

function checkInputs(setp) {
  switch (setp) {
    case 1:
      verifyInputs();
      break;
    case 2:
      verifySelection();
      break;
    case 3:

    default:
      break;
  }
}

function updateLabels(setp) {
  const inputBox = document.querySelector('.input-box');
  const labels = document.querySelectorAll('.label');
  const title = document.getElementById('title');
  switch (setp) {
    case 1:
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

      break;
    case 2:
      title.innerHTML = mockSteps[setp - 1].title;
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
      break;
    case 3:
      title.innerHTML = mockSteps[2].title;
      inputBox.innerHTML = '';
      const span = document.createElement('span');
      span.innerHTML = `Name: ${state.name}`;
      const span2 = document.createElement('span');
      span2.innerHTML = `Email: ${state.email}`;
      const span3 = document.createElement('span');
      span3.innerHTML = 'Topics';
      const list = document.createElement('ul');
      const listdata = state.topics.map((element) => {
        const item = document.createElement('li');
        item.innerHTML = element;
        return item;
      });
      listdata.forEach((item) => list.appendChild(item));
      inputBox.append(span, span2, span3, list);

    default:
      break;
  }
}
function verifyInputs() {
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
    Object.assign(state, stepData);
    console.log('Updated Step Data:', state);
  }
}

function verifySelection() {
  const selector = document.querySelector('select');
  let isValid = true;
  const stepData = {};
  // Map through the selector and check if any of the options are selected
  const selected = Array.from(selector.selectedOptions).map((option) => {
    return option.value;
  });

  // const selected = [];
  // for (let i = 0; i < selector.options.length; i++) {
  //   if (selector.options[i].selected) {
  //     selected.push(selector.options[i].value);
  //   }
  // }
  if (selected.length === 0) {
    console.log('Please select at least one option');
    isValid = false;
  } else {
    Object.assign(state, { topics: selected });
    console.log('Updated Step Data:', state);
  }
}

function updateDot() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((element) => {
    element.classList.remove('active');
    if (currentStep == element.dataset.step) {
      element.classList.add('active');
    }
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  alert('Sucess!');
});

button.addEventListener('click', function (event) {
  event.preventDefault();
  nextStep();
});

spanButtons.forEach((spanButton) => {
  spanButton.addEventListener('click', function (event) {
    event.preventDefault;
    let targetStep = parseInt(spanButton.dataset.step); //converst to a number
    if (targetStep < currentStep) {
      currentStep = targetStep;
      prevStep();
    } else if (targetStep > currentStep) {
      if (checkInputs(currentStep)) {
        currentStep = targetStep;
        nextStep();
      }
    }
  });
});

showStep(currentStep);

// let circle = document.getElementById('step').appendChild();
