


// Save theme preference in local storage starts here dark light theme
$(document).ready(function() {
  // Load saved theme on page load
  if (localStorage.getItem('theme') === 'dark') {
    $('html').addClass('dark');
    $('.day-night span').text('wb_sunny');
  }

  $('.day-night').on('click', function() {
    $('html').toggleClass('dark');
    const icon = $(this).find('span');
    if (icon.text().trim() === 'moon_stars') {
      icon.text('wb_sunny');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.text('moon_stars');
      localStorage.setItem('theme', 'light');
    }
  });
});
// Save theme preference in local storage dark light theme ends here 



// rotating button on scroll start here
$(window).on("scroll", function () {
  // scroll value lo
  let scrollVal = $(window).scrollTop();

  // jitna scroll karega, utna rotate hoga
  $(".rotating-btn svg").css("transform", "rotate(" + (scrollVal / 3 ) + "deg)");
});
// rotating button on scroll end here 



// cards hover effect starts here
// mouse move → rotate
$(".gallery-item").on("mousemove", function (e) {
  let rect = this.getBoundingClientRect();
  let x = e.clientX - rect.left; // mouse X
  let y = e.clientY - rect.top;  // mouse Y
  let cx = rect.width / 2;
  let cy = rect.height / 2;

  // normalize mouse position (-1 to 1)
  let dx = (x - cx) / cx;
  let dy = (y - cy) / cy;

  // rotation values
  let rotateX = dy * 6; // tilt up/down
  let rotateY = dx * 6; // tilt left/right

  $(this)
    .find(".gallery-link")
    .css({
      transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: "transform 0.1s",
    });
});

// mouse leave → reset
$(".gallery-item").on("mouseleave", function () {
  $(this)
    .find(".gallery-link")
    .css({
      transform: "rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.5s ease",
    });
});

// cards hover effect
// mouse move → rotate end here



// jQuery 3D tilt + image push effect
$(document).ready(function () {
  $(".frontend-devel").on("mousemove", function (e) {
    let $card = $(this);
    let cardWidth = $card.outerWidth();
    let cardHeight = $card.outerHeight();
    let offset = $card.offset();
    
    // mouse position relative to card
    let relX = e.pageX - offset.left;
    let relY = e.pageY - offset.top;

    // map values (-15deg to 15deg tilt)
    let rotateY = ((relX / cardWidth) - 0.5) * 30;
    let rotateX = ((relY / cardHeight) - 0.5) * -30;

    // apply tilt
    $card.css("transform", `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

    // image push-in
    $card.find("img").css("transform", "scale(0.9) translateZ(-60px)");
  });

  // reset on mouse leave
  $(".frontend-devel").on("mouseleave", function () {
    $(this).css("transform", "rotateX(0deg) rotateY(0deg)");
    $(this).find("img").css("transform", "scale(1) translateZ(0)");
  });
});
  



$(document).ready(function() {
  $('.nav-1 ul li a').on('click', function() {
    // sab li se active class hatao
    $('.nav-1 ul li').removeClass('active');
    // jis li ke andar ye clicked a hai, us par active class lagao
    $(this).closest('li').addClass('active');
  });
});



$(document).ready(function() {

  // ✅ Smooth scroll on click
  $('.nav-1 ul li a').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var offsetTop = $(target).offset().top - 80; // adjust navbar height (change 80 if needed)
    
    $('html, body').animate({
      scrollTop: offsetTop
    }, 100); // smooth scroll duration
  });

  // ✅ Change active tab on scroll
  $(window).on('scroll', function() {
    var scrollPos = $(document).scrollTop();

    $('.nav-1 ul li a').each(function() {
      var currLink = $(this);
      var section = $(currLink.attr('href'));
      if (section.length) {
        var sectionTop = section.offset().top - 100; // adjust based on your navbar height
        var sectionBottom = sectionTop + section.outerHeight();

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          $('.nav-1 ul li').removeClass('active');
          currLink.closest('li').addClass('active');
        }
      }
    });
  });
});


$(document).ready(function () {
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    // Check if all required fields are filled
    var isValid = true;
    $(this).find('[required]').each(function () {
      if (!$(this).val()) {
        isValid = false;
        this.reportValidity(); // shows browser "Please fill out this field"
        return false; // break loop
      }
    });

    if (isValid) {
      // Hide form smoothly
      $('.form-wrapper').fadeOut(500, function () {
        // Show success message
        $('#successMessage').fadeIn(500);

        // After 5 seconds, revert back
        setTimeout(function () {
          $('#successMessage').fadeOut(500, function () {
            $('.form-wrapper').fadeIn(500);
            $('#contactForm')[0].reset(); // clear form
          });
        }, 5000);
      });
    }
  });
});












// Counting animation on scroll
$(document).ready(function () {
  function animateCount($el, target, duration) {
    let start = 0;
    let increment = target / (duration / 16);
    let timer = setInterval(function () {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      $el.text(Math.floor(start) + '+');
    }, 16);
  }

  let animated = false;

  $(window).on('scroll', function () {
    if (animated) return;

    let section = $('.abtme-cards');
    if (section.length === 0) return;

    let sectionTop = section.offset().top;
    let windowBottom = $(window).scrollTop() + $(window).height();

    if (windowBottom >= sectionTop + 100) {
      animated = true;

      $('.happy-nmber').each(function () {
        let text = $(this).text();
        let target = parseInt(text.replace('+', ''));
        animateCount($(this), target, 1500);
      });
    }
  });
});