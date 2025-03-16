document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/') {
        // Homepage logic
        fetch('http://localhost:5000/api/testimonials')
            .then(response => response.json())
            .then(data => {
                const testimonialList = document.getElementById('testimonial-list');
                data.forEach(testimonial => {
                    const testimonialItem = document.createElement('div');
                    testimonialItem.className = 'testimonial-item';
                    testimonialItem.innerHTML = `
                        <img src="${testimonial.image}" alt="${testimonial.name}">
                        <p>"${testimonial.message}"</p>
                        <h4>— ${testimonial.name}, ${testimonial.role}</h4>
                    `;
                    testimonialList.appendChild(testimonialItem);
                });
            })
            .catch(error => console.error('Error fetching testimonials:', error));
    }

    if (path.includes('portfolio.html')) {
        // Portfolio page logic
        fetch('http://localhost:5000/api/portfolio')
            .then(response => response.json())
            .then(data => {
                const portfolioGrid = document.getElementById('portfolio-grid');
                data.forEach(portfolioItem => {
                    const portfolioCard = document.createElement('div');
                    portfolioCard.className = 'portfolio-item';
                    portfolioCard.innerHTML = `
                        <img src="${portfolioItem.image}" alt="${portfolioItem.title}">
                        <div class="portfolio-overlay">
                            <h3>${portfolioItem.title}</h3>
                            <p>${portfolioItem.description}</p>
                            <a href="${portfolioItem.link}" class="portfolio-link">View Project</a>
                        </div>
                    `;
                    portfolioGrid.appendChild(portfolioCard);
                });
            })
            .catch(error => console.error('Error fetching portfolio items:', error));
    }

    if (path.includes('contact.html')) {
        // Contact page logic
        const contactForm = document.getElementById('contact-form');

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the form from submitting normally

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
            };

            // Send POST request to the backend
            fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                alert('Thank you for contacting us! We will get back to you soon.');
                contactForm.reset(); // Clear the form
            })
            .catch(error => console.error('Error submitting form:', error));
        });
    }
});

