document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".testimonial-slider");
    const slides = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".dot");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
  
    let currentIndex = 1; // Start at the first slide (adjusted for cloning)
    const slideWidth = slides[0].offsetWidth;
    console.log(slideWidth);
    
  
    // Clone first and last slides
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
  
    // Add clones to slider
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);
  
    // Adjust the slider to show the first actual slide
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  
    // Function to update the slider position
    const updateSlider = () => {
      slider.style.transition = "transform 0.4s ease-in-out";
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  
      // Reset the transition for clones
      slider.addEventListener("transitionend", () => {
        if (currentIndex === 0) {
          slider.style.transition = "none"; // Disable transition
          currentIndex = slides.length; // Jump to the last real slide
          slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
        if (currentIndex === slides.length + 1) {
          slider.style.transition = "none"; // Disable transition
          currentIndex = 1; // Jump to the first real slide
          slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
      });
  
      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === (currentIndex - 1) % slides.length);
      });
    };
  
    // Left arrow functionality
    leftArrow.addEventListener("click", () => {
      currentIndex = (currentIndex - 1) % (slides.length + 2);
      if (currentIndex < 0) currentIndex += slides.length + 2;
      updateSlider();
    });
  
    // Right arrow functionality
    rightArrow.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % (slides.length + 2);
      updateSlider();
    });
  
    // Dot functionality
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index + 1; // Account for clone offset
        updateSlider();
      });
    });
  
    // Auto-slide functionality (5 seconds interval)
    setInterval(() => {
      currentIndex = (currentIndex + 1) % (slides.length + 2);
      updateSlider();
    }, 5000);
  });
  