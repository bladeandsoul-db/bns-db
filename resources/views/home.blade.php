@extends("app")

@section("content")
    <div class="section welcome">
        <div class="container">
            <div class="row">
                <div class="one-half column welcome-message">
                    <h3>Welcome to</h3>
                    <img class="logo u-max-full-width" src="{{ asset("img/bns-logo.png") }}">
                    <h3>Database</h3>
                </div>
                <div class="one-half column">
                    <img class="figure-1" src="{{ asset("img/figure-1.png")  }}">
                </div>
            </div>
        </div>
    </div>
    <div class="section background-4">
        <div class="container sample">
            <h2>Sample Text </h2>
        </div>
    </div>
@stop
