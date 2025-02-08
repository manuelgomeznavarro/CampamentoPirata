document.addEventListener('DOMContentLoaded', () => {
    const stepsWrapper = document.querySelector('.steps-wrapper');
    const steps = Array.from(document.querySelectorAll('.step'));
    let currentStep = 0;

    function updateStepPosition() {
        stepsWrapper.style.transform = `translateX(-${currentStep * 100}%)`;
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target.matches('.siguiente')) {
            e.preventDefault();
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStepPosition();
            }
        }

        if (e.target.matches('.volver')) {
            e.preventDefault();
            if (currentStep > 0) {
                currentStep--;
                updateStepPosition();
            }
        }
    });
});