let residents = [];
let currentSlide = 0;
const slidesContainer = document.getElementById('residents-container');
const indicatorsContainer = document.getElementById('carousel-indicators');

// Fetch resident data
fetch('./data/residents.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data loaded:', data); // Debug log
        residents = data;
        createResidentCards();
        createIndicators();
        showSlide(currentSlide);
    })
    .catch(error => {
        console.error('Error loading resident data:', error);
        slidesContainer.innerHTML = '<p>Error loading resident data. Please try again later.</p>';
    });

function createResidentCards() {
    residents.forEach((resident, index) => {
        const card = document.createElement('div');
        card.className = 'resident-card';
        card.innerHTML = `
            <img src="images/residents/${resident.image}" alt="${resident.name}">
            <h3>${resident.name}</h3>
            <p>${resident.role}</p>
            <p><strong>Major:</strong> ${resident.major.join(', ')}</p>
            <p><strong>Year:</strong> ${resident.year}</p>
            <p><strong>Hometown:</strong> ${resident.hometown}</p>
            <p>${resident.bio}</p>
            <p><strong>Interests:</strong> ${resident.interests.join(', ')}</p>
        `;
        slidesContainer.appendChild(card);
    });
}

function createIndicators() {
    residents.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        indicator.onclick = () => showSlide(index);
        indicatorsContainer.appendChild(indicator);
    });
}

function showSlide(n) {
    const slides = document.querySelectorAll('.resident-card');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach(slide => slide.style.display = 'none');
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].style.display = 'block';
    indicators[currentSlide].classList.add('active');
}

document.getElementById('prev').addEventListener('click', () => showSlide(currentSlide - 1));
document.getElementById('next').addEventListener('click', () => showSlide(currentSlide + 1));

// Initial setup
window.onload = () => {
    if (residents.length > 0) {
        createResidentCards();
        createIndicators();
        showSlide(currentSlide);
    }
};