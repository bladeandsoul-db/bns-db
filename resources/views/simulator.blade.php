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
                            <li class="key">LB</li>

                            <li class="skill">
                                <div class="thumb"><img src="img/simulator/skill_assassin_mistSlash.png"></div>
                                <div class="name">Mist Slash</div>
                            </li>

                            <li class="key">RB</li>
                            <li class="skill">
                                <div class="thumb"><img src=""></div>
                                <div class="name">Mist Slash</div>
                            </li>
                            <li class="skill">
                                <div class="thumb"><img src=""></div>
                                <div class="name">Test</div>
                            </li>
                            <li class="skill">
                                <div class="thumb"><img src=""></div>
                                <div class="name">Test</div>
                            </li>
                            <li class="skill">
                                <div class="thumb"><img src=""></div>
                                <div class="name">Test</div>
                            </li>
                            <li class="skill">
                                <div class="thumb"><img src=""></div>
                                <div class="name">Test</div>
                            </li>
                            <li class="skill">
                                <div class="thumb"><img src=""></div>
                                <div class="name">Test</div>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="skill-tree">
                    <div class="inner">
                        SkillTree
                    </div>
                </div>
            </div>
            <div class="lg-five sm-twelve columns">
                <div class="skill-description">
                    <div class="inner">
                        SkillDesc
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
@section("js")
    <script src="{{ asset("/js/simulator.js") }}"></script>

@stop

