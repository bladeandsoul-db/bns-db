$(document).ready(function(){

    //Copy navlinks into horizontal navbar
    $navlinks = $(".navbar-collapse .navbar-list .navbar-item").clone()
    $(".navbar-collapsed .navbar-list").html($navlinks);

    //Initializing Variables
    var navbarStatus = false,
        navbarTimeline = new TimelineMax({paused:true});
    //Configure Timeline ( animation )
    navbarTimeline.set($(".navbar-collapsed"), {display:"block"})
        .from($(".navbar-collapsed"), 0.3, {height: 0});

    var navbarToggle = function(){
        if(navbarStatus == false)
        {
            navbarTimeline.play()
            navbarStatus = true;
        }
        else
        {
            navbarTimeline.reverse();
            navbarStatus = false;
        }
    }
    //Configure click-Event
    $(".navbar-button").click(function(){
        navbarToggle();
    });

    $( window ).resize(function() {
        if(navbarStatus == true & window.innerWidth > 900)
        {
            navbarToggle();
        }
    });


    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'js/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });


});