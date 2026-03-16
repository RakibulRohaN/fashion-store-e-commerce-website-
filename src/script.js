gsap.registerPlugin(ScrollTrigger);

// LOGO + NAV ITEMS ANIMATION

window.addEventListener("load", () => {
  const aniForLogo = document.querySelector(".animation-on-nav-logo");
  const aniForLi1 = document.querySelector(".animation-on-nav-li1");
  const aniForLi2 = document.querySelector(".animation-on-nav-li2");
  const aniForLi3 = document.querySelector(".animation-on-nav-li3");
  const aniForLi4 = document.querySelector(".animation-on-nav-li4");
  const aniForLi5 = document.querySelector(".animation-on-nav-li5");

  const navElements = [aniForLogo, aniForLi1, aniForLi2, aniForLi3, aniForLi4, aniForLi5].filter(el => el);

  if (navElements.length > 0) {
    gsap.killTweensOf(navElements);

    gsap.set(navElements, {
      opacity: 0,
      x: -120,
      scale: 0.95,
      filter: "blur(8px)"
    });

    gsap.to(navElements, {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.2,
      delay: 0.3
    });
  }
});



// NAVBAR SCROLL HIDE / SHOW

let lastScroll = 0;
const navbar = document.querySelector(".page1");

if (navbar) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }

    lastScroll = currentScroll;
  });
}



// HERO TEXT + BUTTON ANIMATION

window.addEventListener("load", () => {
  const imgText = document.querySelector("#img-text-p");
  const btn1 = document.querySelector(".img-btn1");
  const btn2 = document.querySelector(".img-btn2");

  const heroElements = [imgText, btn1, btn2].filter(el => el);

  if (heroElements.length > 0) {
    gsap.killTweensOf(heroElements);

    gsap.set(heroElements, {
      opacity: 0,
      x: -120,
      scale: 0.95,
      filter: "blur(8px)"
    });

    gsap.to(heroElements, {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.2,
      delay: 0.3
    });
  }
});




// 2nd page animation



gsap.from("#page2", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "expo.out",
    scrollTrigger: {
        trigger: "#page2",
        start: "top 85%",
        toggleActions: "play none none none"
    }
});

const brandImgs = gsap.utils.toArray([
    ".brand-img-animation1",
    ".brand-img-animation2",
    ".brand-img-animation3"
]);

if (brandImgs.length > 0) {
    gsap.set(brandImgs, {
        opacity: 0,
        x: -120,
        scale: 0.95,
        filter: "blur(8px)"
    });

    gsap.to(brandImgs, {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.2,
        delay: 0.5,
        scrollTrigger: {
            trigger: "#page2",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
}



// BRAND IMAGE HOVER ANIMATION

const imgs = document.querySelectorAll(".brand-imgs img");

if (imgs.length > 0) {
  imgs.forEach(img => {
    img.style.transformOrigin = "center center";

    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        duration: 1,
        scale: 1.21,
        ease: "power3.out"
      });
    });

    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        duration: 1,
        scale: 1,
        ease: "power3.out"
      });
    });
  });
}



// PRODUCTS SCROLL ANIMATION
const products = gsap.utils.toArray([
  ".product-list-1",
  ".product-list-2",
  ".product-list-3",
  ".product-list-4",
  ".product-list-5",
  ".product-list-6",
  ".product-list-7",
  ".product-list-8"
]);

if (products.length > 0 && document.querySelector(".men-section1")) {
  gsap.set(products, {
    opacity: 0,
    scale: 0.6,
    y: 120,
    filter: "blur(10px)"
  });

  gsap.to(products, {
    scrollTrigger: {
      trigger: ".men-section1",
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none none reverse"
    },
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1.3,
    ease: "expo.out",
    stagger: 0.18
  });
}




 



