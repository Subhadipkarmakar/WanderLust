// Add animations and interactive effects to category icons
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter elements
    const filters = document.querySelectorAll('.filter');
    const filtersContainer = document.getElementById('filters');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    
    // Add staggered animation on page load
    filters.forEach((filter, index) => {
        // Add a slight delay for each filter to create a staggered effect
        setTimeout(() => {
            filter.style.opacity = '1';
            filter.style.transform = 'translateY(0)';
        }, 50 * index);
    });
    
    // Add hover effects
    filters.forEach(filter => {
        filter.addEventListener('mouseenter', function() {
            // Add a subtle bounce effect
            this.classList.add('bounce');
            
            // Highlight nearby filters slightly
            const filterIndex = Array.from(filters).indexOf(this);
            
            if (filterIndex > 0) {
                filters[filterIndex - 1].classList.add('neighbor-hover');
            }
            
            if (filterIndex < filters.length - 1) {
                filters[filterIndex + 1].classList.add('neighbor-hover');
            }
        });
        
        filter.addEventListener('mouseleave', function() {
            // Remove the bounce effect
            this.classList.remove('bounce');
            
            // Remove highlight from nearby filters
            filters.forEach(f => {
                f.classList.remove('neighbor-hover');
            });
        });
    });
    
    // Scroll buttons functionality
    scrollLeftBtn.addEventListener('click', function() {
        filtersContainer.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    scrollRightBtn.addEventListener('click', function() {
        filtersContainer.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll buttons based on scroll position
    function updateScrollButtons() {
        // Hide left button if at the start
        if (filtersContainer.scrollLeft <= 10) {
            scrollLeftBtn.style.opacity = '0.5';
            scrollLeftBtn.style.pointerEvents = 'none';
        } else {
            scrollLeftBtn.style.opacity = '1';
            scrollLeftBtn.style.pointerEvents = 'auto';
        }
        
        // Hide right button if at the end
        const maxScrollLeft = filtersContainer.scrollWidth - filtersContainer.clientWidth - 10;
        if (filtersContainer.scrollLeft >= maxScrollLeft) {
            scrollRightBtn.style.opacity = '0.5';
            scrollRightBtn.style.pointerEvents = 'none';
        } else {
            scrollRightBtn.style.opacity = '1';
            scrollRightBtn.style.pointerEvents = 'auto';
        }
    }
    
    // Initial update
    updateScrollButtons();
    
    // Update on scroll
    filtersContainer.addEventListener('scroll', updateScrollButtons);
    
    // Update on window resize
    window.addEventListener('resize', updateScrollButtons);
});