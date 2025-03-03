 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  	});

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	var partialHeight = function() {

		$('.js-partialheight').css('height', $(window).height() * 0.5);
		$(window).resize(function(){
			$('.js-partialheight').css('height', $(window).height() * 0.5);
		});

	};
	partialHeight();

	// -------------------------------------------
    // Dynamic Projects Loading Function
    // -------------------------------------------
    document.addEventListener("DOMContentLoaded", function () {
        console.log("DOM fully loaded. Attempting to load projects.json...");
        fetch("../projects.json")
          .then(response => {
            console.log("Fetch response:", response);
            if (!response.ok) {
              throw new Error("Failed to fetch projects.json");
            }
            return response.json();
          })
          .then(data => {
            console.log("Projects data loaded:", data);
            let projects = data.projects;
            if (!projects) {
                console.error("No 'projects' property found in JSON");
                return;
            }
            // Sort projects in descending order by project.number
            projects.sort((a, b) => b.number - a.number);
            // Get the container element
            const container = document.getElementById("projects-container");
            if (!container) {
                console.error("projects-container not found in DOM");
                return;
            }
            // Group projects into sets of 3 and create a row for each set
            for (let i = 0; i < projects.length; i += 3) {
                const group = projects.slice(i, i + 3);
                const rowDiv = document.createElement("div");
                rowDiv.className = "row d-flex";
                group.forEach(project => {
                    // Column div
                    const colDiv = document.createElement("div");
                    colDiv.className = "col-md-4 d-flex ftco-animate fadeInUp ftco-animated";
                    // Blog entry
                    const blogEntryDiv = document.createElement("div");
                    blogEntryDiv.className = "blog-entry justify-content-end";
                    // Project source anchor (image)
                    const projectSrcA = document.createElement("a");
                    projectSrcA.className = "block-20 project-src";
                    projectSrcA.setAttribute("project-number", project.number);
                    projectSrcA.href = project.src;
                    projectSrcA.style.backgroundImage = "url('images/" + project.image + "')";
                    // Text container
                    const textDiv = document.createElement("div");
                    textDiv.className = "text mt-3 float-right d-block";
                    // Meta div (date and GitHub)
                    const metaDiv = document.createElement("div");
                    metaDiv.className = "d-flex align-items-center mb-2 meta";
                    const pMeta = document.createElement("p");
                    pMeta.className = "mb-0";
					const githubRepo = project.githubRepo
					const githubOrg = project.githubOrg
					const githubAnchor = document.createElement("a");
					githubAnchor.className = "meta-chat github-repo";
					githubAnchor.setAttribute("project-number", project.number);
					if (githubRepo) {
						githubAnchor.href = `https://github.com/${githubRepo}`;
						githubAnchor.target = '_blank';
						githubAnchor.rel = 'noopener noreferrer';
						githubAnchor.innerHTML = `<img class="github-stars" src="https://img.shields.io/github/stars/${githubRepo}"> <img class="github-forks" src="https://img.shields.io/github/forks/${githubRepo}">`;
						pMeta.appendChild(githubAnchor);
					} else if (githubOrg) {
						githubAnchor.href = `https://github.com/${githubOrg}`;
						githubAnchor.target = '_blank';
						githubAnchor.rel = 'noopener noreferrer';
						githubAnchor.innerHTML = `<img class="github-followers" src="https://img.shields.io/github/followers/${githubOrg}">`;
						pMeta.appendChild(githubAnchor);
					}
                    metaDiv.appendChild(pMeta);
                    // Heading for title
                    const h3 = document.createElement("h3");
                    h3.className = "heading";
                    const titleAnchor = document.createElement("a");
                    titleAnchor.className = "project-title project-src";
                    titleAnchor.setAttribute("project-number", project.number);
                    titleAnchor.href = project.src;
                    titleAnchor.textContent = project.title;
                    h3.appendChild(titleAnchor);
                    // Description
                    const pDesc = document.createElement("p");
                    pDesc.textContent = project.description || "";
                    // Tech stack container
                    const techStackDiv = document.createElement("div");
                    techStackDiv.className = "tagcloud project-stack";
                    techStackDiv.setAttribute("project-number", project.number);
                    if (project.techStack && project.techStack.length > 0) {
                        project.techStack.forEach(tech => {
                            const techTag = document.createElement("a");
                            techTag.className = "tag-cloud-link";
                            techTag.textContent = tech;
                            techStackDiv.appendChild(techTag);
                        });
                    }
                    // Assemble text container
                    textDiv.appendChild(h3);
                    textDiv.appendChild(metaDiv);
                    textDiv.appendChild(pDesc);
                    textDiv.appendChild(techStackDiv);
                    // Assemble blog entry
                    blogEntryDiv.appendChild(projectSrcA);
                    blogEntryDiv.appendChild(textDiv);
                    // Append blog entry to column, and column to row
                    colDiv.appendChild(blogEntryDiv);
                    rowDiv.appendChild(colDiv);
                });
                container.appendChild(rowDiv);
            }
          })
          .catch(error => console.error("Error loading projects.json:", error));
    });

	const creditsHTML = `Copyright &copy; ${new Date().getFullYear()} All rights reserved | Made with <i class="icon-heart color-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>`;

	// Function to fill in copyright credits
	var fillCredits = function() {
		const creditElements = document.querySelectorAll('.credits');
		creditElements.forEach(element => {
		  element.innerHTML = creditsHTML;
		});
	}
	fillCredits();

	const projectNavbar = `<ul class="navbar-nav nav ml-auto">
								<li class="nav-item"><a href="../index.html#home-section" class="nav-link"><span>Home</span></a></li>
								<li class="nav-item"><a href="../index.html#about-section" class="nav-link"><span>About</span></a></li>
								<li class="nav-item"><a href="../index.html#education-section" class="nav-link"><span>Education</span></a></li>
								<li class="nav-item"><a href="../index.html#skills-section" class="nav-link"><span>Skills</span></a></li>
								<!--<li class="nav-item"><a href="../index.html#skills-section" class="nav-link"><span>Skills</span></a></li>-->
								<li class="nav-item"><a href="../index.html#projects-section" class="nav-link"><span>Projects</span></a></li>
								<li class="nav-item"><a href="../index.html#achievements-section" class="nav-link"><span>Achievements</span></a></li>
								<li class="nav-item"><a href="../index.html#contact-section" class="nav-link"><span>Contact</span></a></li>
							</ul>`;

	// Function to fill in projects navbar
	var fillProjectNavbar = function() {
	const navbarElements = document.querySelectorAll('.project-navbar');
		navbarElements.forEach(element => {
		  element.innerHTML = projectNavbar;
		});
	}
	fillProjectNavbar();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			event.preventDefault();
			if ( $('#ftco-nav').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}			
		});

	};
	burgerMenu();


	var onePageClick = function() {

		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top
	    }, 500, function() {
	    	// window.location.hash = href;
			$('.navbar-collapse').collapse('hide'); // Close the navbar if it is open
	    });
		});

	};
	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
		autoplayTimeout: 6000,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
		touchDrag: false, // Disable touch dragging
    	mouseDrag: false, // Optional: Disable mouse dragging
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		$('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

})(jQuery);
