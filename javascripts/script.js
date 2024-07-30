function navigateTo(url) {
    window.location.href = url;
}

function showPopup(message) {
    alert(message);
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        highlightSection(section);
    }
}

function highlightSection(section) {
    section.classList.add('highlight');
    setTimeout(() => {
        section.classList.remove('highlight');
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    let bannerCurrentIndex = 0;
    const bannerItems = document.querySelectorAll('.banner-carousel-item');
    const bannerIndicators = document.querySelectorAll('.banner-indicator');
    const totalItems = bannerItems.length;

    function updateBannerCarousel() {
        bannerItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === bannerCurrentIndex) {
                item.classList.add('active');
            }
        });
        bannerIndicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === bannerCurrentIndex) {
                indicator.classList.add('active');
            }
        });
        const offset = -bannerCurrentIndex * 100;
        document.querySelector('.banner-carousel-inner').style.transform = `translateX(${offset}%)`;
    }

    function nextBannerSlide() {
        bannerCurrentIndex = (bannerCurrentIndex + 1) % totalItems;
        updateBannerCarousel();
    }

    function prevBannerSlide() {
        bannerCurrentIndex = (bannerCurrentIndex - 1 + totalItems) % totalItems;
        updateBannerCarousel();
    }

    function goToBannerSlide(index) {
        bannerCurrentIndex = index;
        updateBannerCarousel();
    }

    // Event listeners for indicators and controls
    bannerIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToBannerSlide(index));
    });

    document.querySelector('.banner-control.next').addEventListener('click', nextBannerSlide);
    document.querySelector('.banner-control.prev').addEventListener('click', prevBannerSlide);

    updateBannerCarousel(); // Initialize the carousel
    setInterval(nextBannerSlide, 5000); // Auto slide every 5 seconds

    // Review Carousel
    const reviews = [
        {
            image: "path/to/image1.jpg",
            title: "Person No.1",
            stars: "⭐⭐⭐⭐⭐",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus."
        },
        {
            image: "path/to/image2.jpg",
            title: "Person No.2",
            stars: "⭐⭐⭐⭐⭐",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus."
        },
        {
            image: "path/to/image3.jpg",
            title: "Person No.3",
            stars: "⭐⭐⭐⭐⭐",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus."
        }
    ];

    let currentReviewIndex = 0;
    const reviewContainer = document.querySelector('.review-container');

    function showReviews(index) {
        reviewContainer.style.opacity = 0;
        setTimeout(() => {
            reviewContainer.innerHTML = '';
            const prevIndex = (index - 1 + reviews.length) % reviews.length;
            const nextIndex = (index + 1) % reviews.length;

            const prevReview = createReviewCard(reviews[prevIndex], false);
            const currentReview = createReviewCard(reviews[index], true);
            const nextReview = createReviewCard(reviews[nextIndex], false);

            reviewContainer.appendChild(prevReview);
            reviewContainer.appendChild(currentReview);
            reviewContainer.appendChild(nextReview);

            reviewContainer.style.transform = 'translateX(20px)';
            reviewContainer.style.opacity = 1;
            setTimeout(() => {
                reviewContainer.style.transform = 'translateX(0)';
            }, 50);
        }, 500); 
    }

    function createReviewCard(review, isHighlighted) {
        const card = document.createElement('div');
        card.className = 'review-card transition';
        if (isHighlighted) {
            card.classList.add('highlight');
        }
        card.innerHTML = `
            <img src="${review.image}" alt="${review.title}" class="review-image">
            <p class="review-title">${review.title}</p>
            <p class="review-stars">${review.stars}</p>
            <p class="review-text">${review.text}</p>
        `;
        return card;
    }

    function nextReview() {
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        showReviews(currentReviewIndex);
    }

    setInterval(nextReview, 6000); // Change review every 6 seconds

    showReviews(currentReviewIndex);
});
