// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  setTimeout(() => {
    document.querySelector(".preloader").classList.add("hidden")
  }, 1500)

  // Header scroll effect
  const header = document.getElementById("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      })

      // Set active class
      navLinks.forEach((link) => link.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Intersection Observer for scroll animations
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    observer.observe(element)
  })

  // Products Carousel
  const carouselTrack = document.querySelector(".carousel-track")
  const products = document.querySelectorAll(".product-card")
  const prevButton = document.querySelector(".carousel-prev")
  const nextButton = document.querySelector(".carousel-next")
  const dotsContainer = document.querySelector(".carousel-dots")

  let productWidth = products[0].offsetWidth + 20 // Including margin
  let currentIndex = 0
  let productsPerView = getProductsPerView()
  let maxIndex = products.length - productsPerView

  function getProductsPerView() {
    if (window.innerWidth >= 1024) {
      return 3
    } else if (window.innerWidth >= 768) {
      return 2
    } else {
      return 1
    }
  }

  // Create dots
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement("div")
    dot.classList.add("carousel-dot")
    if (i === 0) dot.classList.add("active")
    dot.addEventListener("click", () => {
      goToSlide(i)
    })
    dotsContainer.appendChild(dot)
  }

  const dots = document.querySelectorAll(".carousel-dot")

  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * productWidth}px)`

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex)
    })
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex))
    updateCarousel()
  }

  prevButton.addEventListener("click", () => {
    goToSlide(currentIndex - 1)
  })

  nextButton.addEventListener("click", () => {
    goToSlide(currentIndex + 1)
  })

  // Auto slide for products
  let productInterval = setInterval(() => {
    if (currentIndex >= maxIndex) {
      goToSlide(0)
    } else {
      goToSlide(currentIndex + 1)
    }
  }, 5000)

  carouselTrack.addEventListener("mouseenter", () => {
    clearInterval(productInterval)
  })

  carouselTrack.addEventListener("mouseleave", () => {
    productInterval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        goToSlide(0)
      } else {
        goToSlide(currentIndex + 1)
      }
    }, 5000)
  })

  // Testimonial Carousel
  const testimonialTrack = document.querySelector(".testimonial-track")
  const testimonials = document.querySelectorAll(".testimonial-card")
  const testimonialDotsContainer = document.querySelector(".testimonial-dots")

  let currentTestimonialIndex = 0

  // Create testimonial dots
  for (let i = 0; i < testimonials.length; i++) {
    const dot = document.createElement("div")
    dot.classList.add("testimonial-dot")
    if (i === 0) dot.classList.add("active")
    dot.addEventListener("click", () => {
      goToTestimonial(i)
    })
    testimonialDotsContainer.appendChild(dot)
  }

  const testimonialDots = document.querySelectorAll(".testimonial-dot")

  function updateTestimonialCarousel() {
    testimonialTrack.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`

    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentTestimonialIndex)
    })
  }

  function goToTestimonial(index) {
    currentTestimonialIndex = index
    updateTestimonialCarousel()
  }

  // Auto slide for testimonials
  setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length
    updateTestimonialCarousel()
  }, 6000)

  // Contact Form
  const contactForm = document.getElementById("contactForm")
  const formSuccess = document.getElementById("formSuccess")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate form submission
      setTimeout(() => {
        formSuccess.classList.add("active")

        // Reset form
        contactForm.reset()

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.remove("active")
        }, 5000)
      }, 1000)
    })
  }

  // Dark Mode Toggle
  const darkModeToggle = document.querySelector(".dark-mode-toggle")

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")

    // Save preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled")
    } else {
      localStorage.setItem("darkMode", "disabled")
    }
  })

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode")
  }

  // Window resize handler
  window.addEventListener("resize", () => {
    productWidth = products[0].offsetWidth + 20
    productsPerView = getProductsPerView()
    maxIndex = products.length - productsPerView

    // Update dots
    while (dotsContainer.firstChild) {
      dotsContainer.removeChild(dotsContainer.firstChild)
    }

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("div")
      dot.classList.add("carousel-dot")
      if (i === currentIndex) dot.classList.add("active")
      dot.addEventListener("click", () => {
        goToSlide(i)
      })
      dotsContainer.appendChild(dot)
    }

    // Update current position
    currentIndex = Math.min(currentIndex, maxIndex)
    updateCarousel()
  })
})

