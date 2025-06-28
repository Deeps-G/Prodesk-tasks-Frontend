const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const stepIndicators = document.querySelectorAll(".step");

let current = 0;

function updateSteps() {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === current);
    stepIndicators[index].classList.toggle("active", index === current);
  });
}


function validateStep(stepIndex) {
  const currentStep = steps[stepIndex];
  const inputs = currentStep.querySelectorAll("input, select, textarea");

  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity(); 
      return false;
    }
  }
  return true;
}

// Next Button
nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (validateStep(current)) {
      if (current < steps.length - 1) {
        current++;
        updateSteps();
      }
    }
  });
});

// Previous Button
prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      updateSteps();
    }
  });
});

// Final submission
document.getElementById("multiStepForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form submitted!");
});
