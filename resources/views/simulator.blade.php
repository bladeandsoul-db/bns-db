@extends("app")
@section("css")
    <link rel="stylesheet" href="{{asset("/css/simulator.css")}}"/>
@stop
@section("content")
    <div class="section simulator-section">
        <div class="container u-full-width simulator-window">
            <div class="lg-seven sm-twelve columns">
                <div class="skill-list">
                    <div class="inner">
                        <ul class="list">

                            {{--<li class="key">LB</li>--}}
                            {{--<li class="skill" title="Mist Slash">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="key">RB</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}
                            {{--<li class="skill">--}}
                                {{--<div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="name">Mist Slash</div>--}}
                            {{--</li>--}}

                        </ul>
                    </div>
                </div>
                <div class="skill-tree">
                    <div class="inner">
                        <div class="noTree"></div>
                        <div class="skill-grid">
                            {{--<div class="node x1 y1">--}}
                                {{--<div class="icon"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="frame"></div>--}}
                            {{--</div>--}}

                            {{--<div class="node x1 y2">--}}
                                {{--<div class="icon"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="frame"></div>--}}
                            {{--</div>--}}

                            {{--<div class="node x1 y3">--}}
                                {{--<div class="icon"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="frame"></div>--}}
                            {{--</div>--}}

                            {{--<div class="node x2 y3">--}}
                                {{--<div class="icon"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="frame"></div>--}}
                            {{--</div>--}}

                            {{--<div class="node x1 y4">--}}
                                {{--<div class="icon"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="frame"></div>--}}
                            {{--</div>--}}

                            {{--<div class="node x2 y4">--}}
                                {{--<div class="icon"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="frame"></div>--}}
                            {{--</div>--}}

                            {{--<div class="node x1 y5">--}}
                                {{--<div class="icon"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="frame"></div>--}}
                            {{--</div>--}}

                            {{--<div class="node x2 y5">--}}
                                {{--<div class="icon"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                                {{--<div class="frame"></div>--}}
                            {{--</div>--}}

                        </div>
                    </div>
                </div>
            </div>
            <div class="lg-five sm-twelve columns">
                <div class="skill-description">
                    <div class="inner">

                        {{--<span class="name">Mist Slash</span>--}}
                        <div class="right-box">
                            {{--<p class="resource">Generates 1 Chi</p>--}}
                            {{--<p class="point-cost">Requires 2 Points</p>--}}
                        </div>
                        <div class="icon">
                            {{--<div class="skill"><img src="img/simulator/skill_assassin_mistSlash.png"></div>--}}
                            {{--<div class="frame"></div>--}}
                        </div>
                        {{--<div class="info">Deals X-Y Damage</div>--}}
                        {{--<div class="u-cf"></div>--}}
                        {{--<div class="sub-info">--}}
                            {{--<ul>--}}
                                {{--<li class="add">Stuns the Target</li>--}}
                                {{--<li class="add">Stuns the Target</li>--}}
                                {{--<li class="remove">Stuns the Target</li>--}}
                                {{--<li>Stuns the Target</li>--}}
                            {{--</ul>--}}
                        {{--</div>--}}

                        {{--<div class="info-table">--}}
                            {{--<ul>--}}
                                {{--<li class="range">--}}
                                    {{--<div class="head">Range</div>--}}
                                    {{--<div class="body">3m</div>--}}
                                {{--</li>--}}
                                {{--<li class="area">--}}
                                    {{--<div class="head">Area</div>--}}
                                    {{--<div class="body">Target</div>--}}
                                {{--</li>--}}
                                {{--<li class="cast">--}}
                                    {{--<div class="head">Cast Time</div>--}}
                                    {{--<div class="body">Instant</div>--}}
                                {{--</li>--}}
                                {{--<li class="cooldown">--}}
                                    {{--<div class="head">Cooldown</div>--}}
                                    {{--<div class="body">Instant</div>--}}
                                {{--</li>--}}
                            {{--</ul>--}}
                        {{--</div>--}}
                        {{--<div class="skill-requirements">--}}
                            {{--<p class="fat">Activation Requirement</p>--}}
                            {{--<p>Disruption stance</p>--}}
                            {{--<p class="fat">Obtained from</p>--}}
                            {{--<p>Spiral Labyrinth</p>--}}
                        {{--</div>--}}



                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
@section("js")
    <script src="{{ asset("/js/simulator.js") }}"></script>

@stop

