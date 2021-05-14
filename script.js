let body = document.querySelector('body')
let modal = document.querySelector('#modal');
let modalContent = document.querySelector('#modal .modal-content');
let backBtn = document.querySelector('#back-btn');
let appBtn = document.querySelector('#app-btn')
let appBtnWrapper = document.querySelector('#app-btn-wrapper')
let burger = document.querySelector('#burger-menu');
let burgerIcon = document.querySelector('#burger-icon');
let navMenu = document.querySelector('#nav-menu');
let mobileNavMenu = document.querySelector('#mobile-nav-menu');
let emailForm = document.querySelector('#email-form');
let submitBtn = document.querySelector('#submit-btn');
let scrollTopBtn = document.querySelector('#scroll-top');


window.addEventListener('load', (event) => {
  scrollPageToTop();
  initPageScroll();
  initBurgerMenu();
  initModal();
  initScrollTopButton();
  submitEmailForm();
  // resetFormOnSubmit();

  var target = document.getElementById('mce-success-response');

  // create an observer instance
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (target.innerHTML === "Thank you for subscribing!") {
        target.innerHTML = "Check your email!";
        console.log('e')
      } else {
        console.log('e')
      }
    });
  });

  // configuration of the observer:
  var config = {
    attributes: true,
    childList: true,
    characterData: true
  };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);
});

const initPageScroll = () => {
  "use strict";
  /*[pan and container CSS scrolls]*/
  var pnls = document.querySelectorAll('.section').length,
    scdir, hold = false;

  function _scrollY(obj) {

    if (window.innerWidth >= 1100 && modal.style.display != 'flex') {

      var slength, plength, pan, step = 100,
        vh = window.innerHeight / 100,
        vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
      if ((this !== undefined && this.id === 'container') || (obj !== undefined && obj.id === 'container')) {
        pan = this || obj;
        plength = parseInt(pan.offsetHeight / vh);
      }
      if (pan === undefined) {
        return;
      }
      plength = plength || parseInt(pan.offsetHeight / vmin);
      slength = parseInt(pan.style.transform.replace('translateY(', ''));
      if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls)) {
        slength = slength - step;
      } else if (scdir === 'down' && slength < 0) {
        slength = slength + step;
      } else if (scdir === 'top') {
        slength = 0;
      }
      if (hold === false) {
        hold = true;
        pan.style.transform = 'translateY(' + slength + 'vh)';
        setTimeout(function () {
          hold = false;
        }, 1000);
      }
    }
  }

  /*[assignments]*/
  var container = document.querySelector('.container');
  container.style.transform = 'translateY(0)';
  container.addEventListener('wheel', function (e) {
    if (window.innerWidth >= 1100) {
      if (e.deltaY < 0) {
        scdir = 'down';
      }
      if (e.deltaY > 0) {
        scdir = 'up';
      }
      e.stopPropagation();
    }
  });
  container.addEventListener('wheel', _scrollY);
}

const initModal = () => {
  if (modal && backBtn && appBtn) {
    appBtn.addEventListener('click', (e) => {
      modal.style.display = 'flex';
      if (window.innerWidth <= 1100) {
        modalContent.classList.add('modal-full-page');
        body.classList.add('stop-scroll');
      }
    })
    backBtn.addEventListener('click', (e) => {
      modal.style.display = 'none';
      if (window.innerWidth <= 1100) {
        body.classList.remove('stop-scroll');
      }
    })
    // close modal on blurry click
    modal.addEventListener('click', (e) => {
      if (window.innerWidth >= 1100) {
        if (e.target == modal) {
          modal.style.display = 'none';
        }
      }
    })
  }
}

const initBurgerMenu = () => {
  if (window.innerWidth >= 1100) {
    desktopToggleMenu();
  } else {
    mobileToggleMenu();
  }
}

const desktopToggleMenu = () => {
  if (burger) {
    burger.addEventListener('click', (e) => {
      if (burgerIcon.classList.contains('open')) {
        burgerIcon.classList.remove('open');
        // slight delay when bringing 'app' button back
        setTimeout(() => {
          appBtnWrapper.style.display = "";
        }, 150)

        navMenu.style.transform = "translateX(120%)";

      } else {
        burgerIcon.classList.add('open');
        appBtnWrapper.style.display = "none"
        navMenu.style.visibility = "visible";
        navMenu.style.transform = "translateX(0)";
      }
    })
  }
}

const mobileToggleMenu = () => {
  if (burger) {
    burger.addEventListener('touchstart', (e) => {
      if (burgerIcon.classList.contains('open')) {
        // close menu
        burgerIcon.classList.remove('open');
        // slight delay when bringing 'app' button back
        setTimeout(() => {
          appBtnWrapper.style.display = "";
        }, 100)
        body.classList.remove('stop-scroll');
        mobileNavMenu.style.transform = "translateY(-100%)";

      } else {
        // open menu
        burgerIcon.classList.add('open');
        appBtnWrapper.style.display = "none"
        // inhibit scroll
        body.classList.add('stop-scroll');
        mobileNavMenu.style.visibility = "visible";
        mobileNavMenu.style.transform = "translateY(0)";
      }
    })
  }
}


const scrollPageToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
};

// const resetFormOnSubmit = () => {
//   if (emailForm && submitBtn) {
//     submitBtn.addEventListener('click', () => {
//       setTimeout(() => {
//         emailForm.reset();
//       }, 1000)
//     })
//   }
// }

const submitEmailForm = () => {
  submitBtn.addEventListener('click', async (e) => {
    // emailForm.submit();
    let res = await fetch('https://finance.us7.list-manage.com/subscribe/post?u=1574c1720b8bccb0a7c06c9a4&amp;id=6ed13096dd', {
      method: 'POST',
    })
    let data = await res.json()
    console.log(data)
    e.preventDefault();
    return false;
  })
}

const initScrollTopButton = () => {
  container.addEventListener('wheel', () => {
    // if not on page 1
    setTimeout(() => {
      if (window.innerWidth >= 1100) {
        if (container.style.transform != 'translateY(0vh)') {
          scrollTopBtn.style.display = "block"
        } else {
          scrollTopBtn.style.display = "none"
        }
      }
    }, 200)
  })

  if (window.innerWidth >= 1100) {
    scrollTopBtn.addEventListener('click', () => {
      // scroll to top and remove button
      container.style.transform = 'translateY(0)';
      scrollTopBtn.style.display = "none"
    })
  }

}