document.addEventListener('DOMContentLoaded', () => {
    let residents = [];
    let currentSlide = 0;
    const slidesContainer = document.getElementById('residents-container');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Fetch resident data
    async function fetchResidents() {
        try {
            const response = await fetch('./data/residents.json');
            if (!response.ok) {
                throw new Error(`Error al cargar los datos: ${response.status}`);
            }
            residents = await response.json();
            console.log('Datos cargados:', residents); // Debug log
            createResidentCards();
            createIndicators();
            showSlide(currentSlide);
        } catch (error) {
            console.error('Error al cargar datos de residentes:', error);
            slidesContainer.innerHTML = '<p>Error al cargar los datos de los residentes. Por favor, inténtelo de nuevo más tarde.</p>';
        }
    }

    function createResidentCards() {
        residents.forEach((resident, index) => {
            const card = document.createElement('div');
            card.className = 'resident-card';
            card.innerHTML = `
                <img src="images/residents/${resident.image}" alt="Foto de ${resident.name}">
                <h3>${resident.name}</h3>
                <p>${resident.role}</p>
                <p><strong>Especialidad:</strong> ${resident.major.join(', ')}</p>
                <p><strong>Año:</strong> ${resident.year}</p>
                <p><strong>Natal:</strong> ${resident.hometown}</p>
                <p><strong>Intereses:</strong> ${resident.interests.join(', ')}</p>
                <p>${resident.bio}</p>
            `;
            slidesContainer.appendChild(card);
        });
    }

    function createIndicators() {
        residents.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = 'indicator';
            indicator.setAttribute('aria-label', `Mostrar residente ${index + 1}`);
            indicator.onclick = () => showSlide(index);
            indicatorsContainer.appendChild(indicator);
        });
    }

    function showSlide(n) {
        const slides = document.querySelectorAll('.resident-card');
        const indicators = document.querySelectorAll('.indicator');
        
        if (slides.length === 0) return;

        slides.forEach(slide => slide.style.display = 'none');
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].style.display = 'block';
        indicators[currentSlide].classList.add('active');
    }

    // Event listeners for navigation buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
        nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    // Initial setup
    fetchResidents();
});