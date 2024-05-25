// TimeLine
(function ($) {
    $(function () {
        // Variables
        var $window = $(window),
            $timeline = $('.js-timeline'),
            $timelineLine = $('.js-timeline_line'),
            $timelineLineProgress = $('.js-timeline_line-progress'),
            $timelinePoint = $('.js-timeline-card_point-box'),
            $timelineItem = $('.js-timeline_item'),
            outerHeight = $window.outerHeight(),
            windowHeight = $window.height(),
            lastScrollY = -1,
            isUpdating = false;

        // Event listeners
        $window.on('scroll', fnOnScroll);
        $window.on('resize', fnOnResize);

        function fnOnScroll() {
            var scrollY = $window.scrollTop();
            if (lastScrollY !== scrollY) {
                lastScrollY = scrollY;
                fnUpdateFrame();
            }
        }

        function fnOnResize() {
            windowHeight = $window.height();
            fnUpdateFrame();
        }

        function fnUpdateFrame() {
            if (!isUpdating) {
                requestAnimationFrame(fnUpdateWindow);
                isUpdating = true;
            }
        }

        function fnUpdateWindow() {
            isUpdating = false;

            // Set the timeline line's top and bottom position
            var firstPointOffset = $timelineItem.first().find($timelinePoint).offset().top - $timelineItem.first().offset().top,
                lastPointOffset = $timeline.offset().top + $timeline.outerHeight() - $timelineItem.last().find($timelinePoint).offset().top;

            $timelineLine.css({
                top: firstPointOffset,
                bottom: lastPointOffset
            });

            fnUpdateProgress();
        }

        function fnUpdateProgress() {
            var lastItemTop = $timelineItem.last().find($timelinePoint).offset().top,
                scrollY = $window.scrollTop(),
                lineProgressOffsetTop = $timelineLineProgress.offset().top,
                progressHeight = scrollY - lineProgressOffsetTop + outerHeight / 2;

            if (lastItemTop <= scrollY + outerHeight / 2) {
                progressHeight = lastItemTop - lineProgressOffsetTop;
            }

            $timelineLineProgress.css({ height: progressHeight + "px" });

            // Update the active state of each timeline item
            $timelineItem.each(function () {
                var lastItemTop = $timelineItem.last().find($timelinePoint).offset().top,
                scrollY = $window.scrollTop(),
                lineProgressOffsetTop = $timelineLineProgress.offset().top;
                var itemTop = $(this).find($timelinePoint).offset().top;
                if ((itemTop - scrollY) < (lineProgressOffsetTop/2.7)) {
                    $(this).addClass('js-ag-active');
                } else {
                    $(this).removeClass('js-ag-active');
                }
            });
        }
    });
})(jQuery);

// Menu
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = ()=>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute;

        if(top >= offset && top < offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ' ]').classList.add('active')
            })
        }
    })
}

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});


const videos = document.getElementsByTagName('video');
Array.from(videos).forEach((v) => {
    v.addEventListener('click', function() {
        // Toggle the muted property
        v.muted = !v.muted;
    });
});

// FAQ
const buttons = document.querySelectorAll('button');

buttons.forEach( button =>{
    button.addEventListener('click',()=>{
        const faq = button.nextElementSibling;
        const icon = button.children[1];

        faq.classList.toggle('show');
        icon.classList.toggle('bx-plus');
        icon.classList.toggle('bx-minus');
    })
} )

var acc = document.getElementsByClassName("accordion");
var i;
var len = acc.length;
for (i = 0; i < len; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}