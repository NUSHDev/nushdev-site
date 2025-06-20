document.getElementById("body").onscroll = function myFunction() {  
    var scrolltotop = document.scrollingElement.scrollTop;
    var target = document.getElementById("main1");
    var xvalue = "center";
    var factor = 0.5;
    var yvalue = scrolltotop * factor;
    target.style.backgroundPosition = xvalue + " " + yvalue + "px";
}

document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.1, // Element is 10% visible
    rootMargin: "0px 0px -50px 0px" // Start animating slightly before it's fully in view
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        const targetElement = entry.target;
        const delay = parseFloat(targetElement.style.getPropertyValue('--delay')) || 0; // Get custom delay
        
        // Apply 'appear' class after the calculated delay
        setTimeout(() => {
          targetElement.classList.add('appear');
        }, delay * 1000); // Convert seconds to milliseconds

        appearOnScroll.unobserve(targetElement); // Stop observing once it has appeared
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
