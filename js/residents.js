let currentSlide = 0;
const residents = document.querySelectorAll('.resident');
const totalSlides = residents.length;

document.getElementById('next').addEventListener('click', function() {
    goToNextSlide();
});

document.getElementById('prev').addEventListener('click', function() {
    goToPrevSlide();
});

function updateSlides() {
    residents.forEach((resident, index) => {
        if (index === currentSlide) {
            resident.classList.add('active');
        } else {
            resident.classList.remove('active');
        }
    });
}

function goToNextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
    } else {
        currentSlide = 0;  // Loop back to the first slide
    }
    updateSlides();
}

function goToPrevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = totalSlides - 1;  // Loop back to the last slide
    }
    updateSlides();
}

// Initialize the first slide
updateSlides();
