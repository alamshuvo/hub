document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".testimonial-slider");
  const slides = document.querySelectorAll(".testimonial-card");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 1; // Start at the first real slide
  let slideWidth;

  // Clone first and last slides for seamless looping
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slides[0]);

  // Update slides array after cloning
  const allSlides = document.querySelectorAll(".testimonial-card");

  // Calculate slide width dynamically
  const updateSlideWidth = () => {
    slideWidth = document.querySelector(".testimonial-section").offsetWidth;
    allSlides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  // Set initial slide widths
  updateSlideWidth();

  // Adjust slide width on window resize
  window.addEventListener("resize", updateSlideWidth);

  // Update slider position
  const updateSlider = () => {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Handle infinite looping with clones
    slider.addEventListener("transitionend", () => {
      if (currentIndex === 0) {
        slider.style.transition = "none";
        currentIndex = slides.length;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }
      if (currentIndex === slides.length + 1) {
        slider.style.transition = "none";
        currentIndex = 1;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === (currentIndex - 1) % slides.length);
    });
  };

  // Move to the previous slide
  const moveToPrevious = () => {
    currentIndex = (currentIndex - 1 + slides.length + 2) % (slides.length + 2);
    updateSlider();
  };

  // Move to the next slide
  const moveToNext = () => {
    currentIndex = (currentIndex + 1) % (slides.length + 2);
    updateSlider();
  };

  // Add event listeners for arrows
  leftArrow.addEventListener("click", moveToPrevious);
  rightArrow.addEventListener("click", moveToNext);

  // Add event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index + 1; // Offset by 1 to match the actual slide
      updateSlider();
    });
  });

  // Auto-slide functionality (optional)
  const autoSlide = setInterval(moveToNext, 5000);

  // Pause auto-slide on interaction
  [leftArrow, rightArrow, ...dots].forEach((element) => {
    element.addEventListener("mouseover", () => clearInterval(autoSlide));
    element.addEventListener("mouseout", () => setInterval(moveToNext, 5000));
  });
});



// Select the element with class 'a'
const gradientBar = document.querySelector('.a');

// Function to add and remove the 'shake' class
const addShakeEffect = () => {
    gradientBar.classList.add('shake'); // Add shake class
    setTimeout(() => {
        gradientBar.classList.remove('shake'); // Remove shake class after animation
    }, 300); // Match the shake animation duration
};

// Add scroll event listener to trigger the shake effect
window.addEventListener('scroll', () => {
    addShakeEffect();
});



// nav bar show
// Get references to the toggle button and card
const navbar = document.getElementById("toogle");
const navCard = document.getElementById("navCard");
const cross=document.getElementById("cross");


// Add a click event listener to the navbar
// Add a click event listener to the navbar
navbar.addEventListener("click", () => {
  if (navCard.classList.contains("large-hidden")) {
    // Show the card: Remove the hidden class, add active for transition
    navCard.classList.remove("large-hidden");
    setTimeout(() => {
      navCard.classList.add("active");
    }, 10); // Delay to ensure smooth transition
  } else {
    // Hide the card: Remove active for transition, then hide fully
    navCard.classList.remove("active");
    setTimeout(() => {
      navCard.classList.add("large-hidden");
    }, 500); // Match the CSS transition duration
  }
});


function handleResize() {
  const viewportWidth = window.innerWidth; // Get actual viewport width
  if (viewportWidth > 768) {
    // If screen width is greater than 768px, ensure navCard is hidden
    navCard.classList.remove("active");
    navCard.classList.add("large-hidden");
  }
}

// Attach the resize event listener
window.addEventListener("resize", handleResize);

// Run the function on page load to handle initial state
handleResize();


