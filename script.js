document.addEventListener('DOMContentLoaded', function () {
  let currentStep = 1;
  let state = {
    name: '',
    email: '',
    topics: [],
  };

  const mockSteps = [
    { title: 'Register', fields: ['name', 'email'] },
    {
      title: 'Which topics are you interested in?',
      choices: ['Software Development', 'User Experience', 'Graphic Design'],
    },
    { title: 'Summary' },
  ];

  const form = document.getElementById('multStepForm');
  const button = document.getElementById('button');
  const inputBox = document.querySelector('.input-box');
  const title = document.getElementById('title');
  const tracker = document.querySelector('.tracker');

  /** ✅ Setup the Progress Dots */
  function setupDots() {
    tracker.innerHTML = `<p>Step ${currentStep} of ${mockSteps.length}</p>`;
    for (let i = 1; i <= mockSteps.length; i++) {
      const spanDot = document.createElement('span');
      spanDot.classList.add('dot');
      spanDot.dataset.step = i;
      if (i === currentStep) spanDot.classList.add('active');
      tracker.appendChild(spanDot);
    }
    attachDotEventListeners();
  }

  /** ✅ Attach click events to dots */
  function attachDotEventListeners() {
    document.querySelectorAll('.dot').forEach((dot) => {
      dot.addEventListener('click', function () {
        const targetStep = parseInt(dot.dataset.step);
        if (targetStep < currentStep || checkInputs()) {
          currentStep = targetStep;
          updateStep();
        }
      });
    });
  }

  /** ✅ Show current step */
  function updateStep() {
    title.textContent = mockSteps[currentStep - 1].title;
    inputBox.innerHTML = '';

    if (currentStep === 1) {
      mockSteps[0].fields.forEach((field) => {
        const label = document.createElement('label');
        label.textContent = `Your ${field}`;
        const input = document.createElement('input');
        input.type = field === 'email' ? 'email' : 'text';
        input.name = field;
        input.placeholder = `Enter your ${field}`;
        input.classList.add('input');
        input.value = state[field] || '';
        inputBox.append(label, input);
      });
    } else if (currentStep === 2) {
      const select = document.createElement('select');
      select.setAttribute('multiple', 'multiple');

      mockSteps[1].choices.forEach((choice) => {
        const option = document.createElement('option');
        option.value = choice;
        option.textContent = choice;
        if (state.topics.includes(choice)) option.selected = true;
        select.appendChild(option);
      });

      inputBox.appendChild(select);
    } else if (currentStep === 3) {
      inputBox.innerHTML = `
        <span>Name: ${state.name}</span>
        <span>Email: ${state.email}</span>
        <span>Topics: ${state.topics.join(', ') || 'None selected'}</span>
      `;
    }

    updateDots();
  }

  /** ✅ Validate inputs before proceeding */
  function checkInputs() {
    if (currentStep === 1) {
      const inputs = document.querySelectorAll('.input');
      let isValid = true;
      inputs.forEach((input) => {
        if (input.value.trim() === '') {
          console.log(`${input.name} cannot be blank`);
          input.classList.add('error');
          isValid = false;
        } else {
          state[input.name] = input.value.trim();
          input.classList.remove('error');
        }
      });
      return isValid;
    } else if (currentStep === 2) {
      const selectedOptions = Array.from(
        document.querySelector('select').selectedOptions
      ).map((opt) => opt.value);
      if (selectedOptions.length === 0) {
        console.log('Please select at least one topic');
        return false;
      }
      state.topics = selectedOptions;
      return true;
    }
    return true;
  }

  /** ✅ Move to next step */
  function nextStep() {
    if (currentStep < mockSteps.length && checkInputs()) {
      currentStep++;
      updateStep();
    }
  }

  /** ✅ Update the progress dots */
  function updateDots() {
    document.querySelectorAll('.dot').forEach((dot) => {
      dot.classList.toggle(
        'active',
        parseInt(dot.dataset.step) === currentStep
      );
    });
  }

  /** ✅ Form submission */
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Success!');
  });

  /** ✅ Button click event */
  button.addEventListener('click', function (event) {
    event.preventDefault();
    nextStep();
  });

  /** ✅ Initialize the tracker and first step */
  setupDots();
  updateStep();
});
