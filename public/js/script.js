$(document).ready(function(){

    //Copy navlinks into horizontal navbar
    $navlinks = $(".navbar-collapse .navbar-list .navbar-item").clone()
    $(".navbar-collapsed .navbar-list").html($navlinks);

    //Initializing Variables
    var navbarStatus = false,
        navbarTimeline = new TimelineMax({paused:true});
    //Configure Timeline ( animation )
    navbarTimeline.set($(".navbar-collapsed"), {display:"block"})
        .set($(".navbar-button .circle"), {transformOrigin: "0% 0%"})
        .from($(".navbar-button .circle"), 0.3, {attr:{r: 0}})
        .to($(".navbar-button line"), 0.3, {stroke: "#fff"}, "=-0.3")
        .from($(".navbar-collapsed"), 0.3, {height: 0}, "=-0.3");

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

    if($("#particles-js").length)
    {
        particlesJS.load('particles-js', 'js/particles.json');
    }



});