<!DOCTYPE html>
<html lang="de">
    <head>
        <!-- Basic Page Needs
        ------------------------------------------- -->
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="author" content="Rai">
        <title>Blade & Soul DB</title>

        <!-- Browser Support

        ------------------------------------------- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- IMPORTANT -->

        <!-- Mobile Specific Metas
        ------------------------------------------- -->
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- FONT
        ------------------------------------------- -->
        <link href='//fonts.googleapis.com/css?family=Roboto:400,300,600' rel='stylesheet' type='text/css'>

        <!-- CSS
        ------------------------------------------- -->
        <link rel="stylesheet" href="{{asset("/css/normalize.css")}}"/>
        <link rel="stylesheet" href="{{asset("/css/skeleton.css")}}"/>
        <link rel="stylesheet" href="{{asset("/css/style.css")}}"/>
        @yield("css")

        <!-- Favicon
        ------------------------------------------- -->
        <!-- <link rel="icon" type="image/png" href="images/favicon.png"> -->
    </head>


    <body>
        <!-- Main content
        ------------------------------------------- -->
        <nav class="navbar">
            <div class="container">
                <svg class="navbar-button">
                    <circle class="circle" r="20" cx="50%" cy="50%" fill="#ff3300"></circle>
                    <line class="upper"  stroke="#bbb" stroke-width="2px" x1="22" x2="43" y1="25" y2="25"></line>
                    <line class="middle" stroke="#bbb" stroke-width="2px" x1="22" x2="43" y1="33" y2="33"></line>
                    <line class="lower"  stroke="#bbb" stroke-width="2px" x1="22" x2="43" y1="41" y2="41"></line>

                </svg>
                <ul class="navbar-list">
                    <li class="navbar-item {{ isActive(["/", "home"]) }}"><a class="navbar-link" href="{{ action('MainController@index') }}">Home</a></li>
                </ul>
                <div class="navbar-collapse">
                    <ul class="navbar-list">
                        <li class="navbar-item {{ isActive(["simulator"]) }}"><a class="navbar-link" href="{{ action('MainController@simulator') }}">Skill Tree</a></li>
                        <li class="navbar-item"><a class="navbar-link" href="#Database">Database</a></li>
                        <li class="navbar-item"><a class="navbar-link" href="#Forum">Forum</a></li>
                    </ul>
                    <ul class="navbar-list navbar-right">

                    </ul>
                </div>
            </div>
        </nav>
        <nav class="navbar-collapsed">
            <div class="container">
                <ul class="navbar-list">

                </ul>
            </div>
        </nav>
        @yield("content")

        <!-- Scripts
        ------------------------------------------- -->

        <script src="{{asset("/js/TweenMax.min.js")}}"></script>
        <script src="{{asset("/js/jquery.min.js")}}"></script>
        <script src="{{asset("/js/particles.min.js")}}"></script>
        <script src="{{asset("/js/script.js")}}"></script>
        @yield("js")
    </body>
</html>