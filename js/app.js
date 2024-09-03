
// smooth scroll
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  scroller: '[data-scroll-container]',
  markers: false
});

function runForWider() {
  if (window.innerWidth >= 768) {
    
    var scroll = new LocomotiveScroll( {
      el: document.querySelector( '[data-scroll-container]' ),
      smooth: true,
      multiplier: 1.2,
      getDirection: true,
      mobile: {
          breakpoint: 0,
          smooth: false,
          smoothMobile: false,
        },
        tablet: {
          breakpoint: 0,
          smooth: true,
          multiplier: 2,
          gestureDirection: 'vertical',
        },
    });

    // Update body height when DOM elements change height
    new ResizeObserver(() => scroll.update()).observe(
      document.querySelector("[data-scroll-container]")
    );

    // Smooth Scroll after click nav link
    const anchorLinks = document.querySelectorAll('a[href^=\\#]:not([href$=\\#])');

    anchorLinks.forEach((anchorLink) => {
      let hashval = anchorLink.getAttribute('href');
      let target = document.querySelector(hashval);

      anchorLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        scroll.scrollTo(target);
      });
    });

    // Update scroll position
    scroll.on( 'scroll', ( instance ) => {
      ScrollTrigger.update();
      document.documentElement.setAttribute( 'data-scrolling', instance.direction );
    });

    // Scroll position for ScrollTrigger
    ScrollTrigger.scrollerProxy( '[data-scroll-container]', {
      scrollTop( value ) {
          return arguments.length ? scroll.scrollTo( value, 0, 0 ) : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.querySelector( '[data-scroll-container]' ).style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener( 'refresh', () => scroll.update() );
    ScrollTrigger.refresh();

  }
  else {

  };

};

runForWider();

window.addEventListener('resize', function() {
  runForWider();
});
  




// Carousel
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.slide');
  const progressBar = document.querySelector('#progress_bar');
  const currentNumber = document.querySelector('#current_number');
  let index = 0;
  let isPaused = false;

  // Function to update the progress bar width and numbers
  function updateProgressBar() {
      const visibleSlides = slides.length - 2; // Adjust for stopping early
      const progress = ((index + 1) / visibleSlides) * 100;
      const width = Math.min(progress, 100); // Ensure the width doesn't exceed 100%
      progressBar.style.width = `${width}px`; // Set progress bar width

      // Update the progress numbers
      let visibleNumber = Math.min(index + 3, slides.length);
      currentNumber.textContent = `${visibleNumber < 10 ? '0' + visibleNumber : visibleNumber}`;
  }

  function updateCarousel() {
      if (isPaused) return;

      // Calculate the total width to translate by summing the widths of all previous slides
      let translateX = 0;
      for (let i = 0; i < index; i++) {
          translateX -= (slides[i].offsetWidth + 16) / window.innerWidth * 100; // Include the 10px gap in the calculation
      }

      carousel.style.transform = `translateX(${translateX}vw)`;

      // Update the progress bar and numbers
      updateProgressBar();

      // Stop when the third-to-last slide is in view
      if (index === slides.length - 3) {
          isPaused = true;
          setTimeout(() => {
              index = 0; // Reset index to start over
              isPaused = false; // Restart the carousel
              updateCarousel();
          }, 3000); // Adjust the pause duration as needed
      } else {
          index++;
      }
  }

  // Initialize the progress bar and numbers when the page loads
  updateProgressBar();

  // Automatic sliding every 3 seconds
  setInterval(updateCarousel, 3000);




// Checkout Button
function checkout() {
  const selectedItems = document.querySelectorAll('input[name="donation"]:checked');
  const selectedValues = [];
  selectedItems.forEach((item) => {
      selectedValues.push(item.value);
  });
  console.log('Selected Donation Items:', selectedValues);
  // Redirect or pass the selectedValues to another page or process it as needed
}



// Menu
const navMenu = () => {

  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const body = document.querySelector('body');
  const menuLinks = document.querySelectorAll('nav ul li a');

  burger.addEventListener('click', () => {
      nav.classList.toggle('nav_active');
      burger.classList.toggle('togglemenu');
      body.classList.toggle('no_overflow');
  });

  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', () => {
        nav.classList.remove('nav_active');
        burger.classList.remove('togglemenu');
        body.classList.remove('no_overflow');
    })
  });

}

navMenu();
