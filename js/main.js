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

	const projectTitlesMap = {
		10: "TradeForecast",
		9: "Healthcare Analytics",
		8: "SRDB Analytics",
		7: "Event-Driven Alerts",
		6: "UniversityRankings",
		5: "SolarFlareNet xAI",
		4: "AlgoTrade-API",
		3: "eStore DB Design",
		2: "WebScrapping-R",
		1: "UnstructuredFVM"
	};

	const projectsMap = {
		10: {
			title: "TradeForecast",
			src: "project10.html",
			githubRepo: "vinay-ram1999/TradeForecast",
			reportLink: "https://linktoreport.com/tradeforecast",
			techStack: ["Python", "PyTorch", "Polars", "Transformers"]
		},
		9: {
			title: "Healthcare Analytics",
			src: "project9.html",
			githubRepo: "vinay-ram1999/Healthcare-Analytics",
			reportLink: "https://linktoreport.com/healthcareanalytics",
			techStack: ["MySQL", "Tableau"]
		},
		8: {
			title: "SRDB Analytics",
			src: "project8.html",
			githubRepo: "vinay-ram1999/SRDBv5-Analytics",
			reportLink: "https://linktoreport.com/srdbanalytics",
			techStack: ["MySQL", "Tableau", "R"]
		},
		7: {
			title: "Event-Driven Alerts",
			src: "project7.html",
			githubRepo: "vinay-ram1999/user_management",
			reportLink: "https://linktoreport.com/eventdrivenalerts",
			techStack: ["Python", "Celery", "Apache Kafka", "PostgreSQL"]
		},
		6: {
			title: "UniversityRankings",
			src: "project6.html",
			reportLink: "https://linktoreport.com/universityrankings",
			techStack: ["Tableau", "Excel"]
		},
		5: {
			title: "SolarFlareNet xAI",
			src: "project5.html",
			githubRepo: "vinay-ram1999/SolarFlareNet",
			paperLink: "https://linktopublication.com/solarflarenetxai", // Example placeholder link
			reportLink: "https://linktoreport.com/solarflarenetxai",
			techStack: ["Python", "Tensorflow", "LIME", "SHAP", "ALE"]
		},
		4: {
			title: "AlgoTrade-API",
			src: "project4.html",
			githubRepo: "vinay-ram1999/AlgoTrade-API",
			reportLink: "https://linktoreport.com/algotradeapi",
			techStack: ["Python", "Tensorflow", "yFinance"]
		},
		3: {
			title: "eStore DB Design",
			src: "project3.html",
			githubRepo: "vinay-ram1999/CS631-DMSD",
			reportLink: "https://linktoreport.com/estoredbdesign",
			techStack: ["Python", "MySQL", "Streamlit"]
		},
		2: {
			title: "WebScrapping-R",
			src: "project2.html",
			githubRepo: "vinay-ram1999/WebScraping-R",
			reportLink: "https://linktoreport.com/webscrappingr",
			techStack: ["R", "rvest", "ggplot"]
		},
		1: {
			title: "UnstructuredFVM",
			src: "project1.html",
			githubRepo: "UnstructuredFVM",
			paperLink: "https://linktopublication.com/unstructuredfvm", // Example placeholder link
			reportLink: "https://linktoreport.com/unstructuredfvm",
			techStack: ["Python", "OP2", "OpenMP", "CUDA", "C"]
		}
	};

	// Function to set project html source href
	var assignProjectSrc = function() {
		const projectSrcElements = document.querySelectorAll('.project-src');
		projectSrcElements.forEach(element => {
			const projectNumber = element.getAttribute('project-number');
			const projectData = projectsMap[projectNumber];
			element.href = projectData.src;
		});
	}
	assignProjectSrc();

	// Function to set project titles dynamically based on attribute
	var assignProjectTitles = function() {
		const projectElements = document.querySelectorAll('.project-title');
		projectElements.forEach(element => {
			const projectNumber = element.getAttribute('project-number');
			const projectData = projectsMap[projectNumber];
			element.innerText = projectData.title; // Set the project title
		});
	}
	assignProjectTitles();

	// Function to set project tech stack dynamically based on attribute
	var assignProjectTechStack = function() {
		const stackElements = document.querySelectorAll('.project-stack');
		stackElements.forEach(element => {
			const projectNumber = element.getAttribute('project-number');
			const projectData = projectsMap[projectNumber];
			const techStack = projectData.techStack;
			if (techStack) {
				techStack.forEach(tech => {
				const techTag = document.createElement('a');
				techTag.className = 'tag-cloud-link';
				techTag.innerText = tech;
				element.appendChild(techTag);
			  });
			}
		});
	}
	assignProjectTechStack();

	// Function to set github hrefs
	var assignGitRefs = function() {
		const githubElements = document.querySelectorAll('.github-repo');
		githubElements.forEach(element => {
			const projectNumber = element.getAttribute('project-number');
			const githubBadge = element.getAttribute('repo-badges');
			const projectData = projectsMap[projectNumber];
			const githubRepo = projectData.githubRepo;
			if (githubRepo) {
				element.href = `https://github.com/${githubRepo}`;
				element.target = '_blank';
				element.rel = 'noopener noreferrer';
				if (githubBadge) {
					element.innerHTML = `<img class="github-stars" src="https://img.shields.io/github/stars/${githubRepo}"> <img class="github-forks" src="https://img.shields.io/github/forks/${githubRepo}">`;
				}
			}
		});
	}
	assignGitRefs();

	// Function to set project sidebar links
	var assignProjectLinks = function() {
		const sidebarSocialElements = document.querySelectorAll('.project-sidebar-links');
		sidebarSocialElements.forEach(element => {
			const projectNumber = element.getAttribute('project-number');
			const projectData = projectsMap[projectNumber];
			const githubLink = element.querySelector('.github-link');
			const reportLink = element.querySelector('.report-link');
			const paperLink = element.querySelector('.paper-link');
			if (githubLink && projectData.githubRepo) {
				githubLink.href = `https://github.com/${projectData.githubRepo}`;
				githubLink.target = '_blank';
				githubLink.rel = 'noopener noreferrer';
				githubLink.innerHTML = '<span class="icon-github"></span>GitHub Repository';
			}
			if (reportLink && projectData.reportLink) {
				reportLink.href = projectData.reportLink;
				reportLink.target = '_blank';
				reportLink.rel = 'noopener noreferrer';
				reportLink.innerHTML = '<span class="fa fa-file-pdf-o" aria-hidden="true"></span>Project Report';
			}
			if (paperLink && projectData.paperLink) {
				paperLink.href = projectData.paperLink;
				paperLink.target = '_blank';
				paperLink.rel = 'noopener noreferrer';
				paperLink.innerHTML = '<span class="fas fa-file-alt"></span>Publication';
			}
		});
	}
	assignProjectLinks();

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
