    $.getJSON("json/Assassin.json", function(json) {
        createSimulator("Assassin",json);
        console.log(json);
        //activate first entry
        $(".skill-list .list .skill")[0].click();

    });


$.fn.getFirstNode = function()
{
    var toReturn;
    this.each(function(){
        for(var y = 1; y < 6; y++){
            for(var x = 1; x < 4; x++){
                var xClass = "x"+ x,
                    yClass = "y"+ y,
                    xyClass= xClass + " " + yClass;
                if($(this).hasClass(xyClass))
                {
                    toReturn = $(this);
                    return false;
                }
            }
        }
    });
    return toReturn;
};
$.fn.changeClass = function(newClass){
    if(this.hasClass(newClass))
        return;
    if(this.hasClass("active"))
        this.removeClass("active");

    if(this.hasClass("available"))
        this.removeClass("available");

    if(this.hasClass("unavailable"))
        this.removeClass("unavailable");

    if(this.hasClass("disabled"))
        this.removeClass("disabled");

    this.addClass(newClass);
};
$.fn.getNodePosition = function()
{
    var classes = this.attr("class"),
        rx = new RegExp("[x][1-3]","i"),
        ry = new RegExp("[y][1-5]", "i"), // short regex to get the current y-value
        x = classes.match(rx)[0],
        y = classes.match(ry)[0],
        xNum = Number(x[1]),
        yNum = Number(y[1]);
    return {"X":xNum, "Y":yNum, "fullX": x, "fullY":y, "both": x+" "+y};
};
$.fn.getNodeSiblings = function()
{
    var position = this.getNodePosition(),
        siblings = $(".node."+position.fullY+":not(."+position.fullX+")");
    return siblings;
};
$.fn.getNodeChildren = function()
{
    var pos = this.getNodePosition(),
        maxX = 3,
        maxY = 5;
    return this.getNodeSiblings();
};
$.fn.disableChildNodes = function()
{
    var pos = this.getNodePosition();

};
$.fn.clickNode = function(){
    if(this.hasClass("active")){
        console.log("is active");
    }

    if(this.hasClass("available")){
        $(".node.available").each(function(){
           $(this).changeClass("disabled");
        });
        this.changeClass("active");

        var classes = this.attr("class"),
            re = new RegExp("[y][1-5]", "i"), // short regex to get the current y-value
            y = classes.match(re)[0],
            newY = y[0]+(Number(y[1])+1),   // Splitting,incrementing, and joining the old Y-class ( y1 => y2 )
            siblings = $(".node."+y),
            children = $(".node."+newY);

        if(children.length > 1)
            console.log("multiple children: "+ children.length);
        if(siblings.length > 1){
            console.log("multiple siblings: "+ siblings.length);
            this.disableChildNodes();

        }


        children.each(function()
        {
            $(this).changeClass("available");
        });

    }

    if(this.hasClass("unavailable")){
        console.log("is unavailable");
    }
    if(this.hasClass("disabled")){
        console.log("is disabled");
    }
};



nodeInfo = {
    storage:[],
    pull: function(){

    },
    push: function(){

    },
    generate:function(){

    }
}
skillTree = {
    storage:[],
    activeTree:undefined,
    pull: function(skillName)
    {
        skillTree.activeTree = skillName;
        $(".skill-grid").html(skillTree.storage[skillName].html());
        //return skillTree.storage[skillName].html();
    },
    push: function()
    {
        skillTree.storage[skillTree.activeTree].html($(".skill-grid").html());
    },
    generate: function(skill){
        var nodeBag = $("<skill/>");
        skill.Nodes.forEach(function(node, nodeIndex, nodeAr) {
            if (node.Position)
            {
                if (!node.Icon)
                    node.Icon = skill.Icon;

                var htmlNode = $("<div/>", {
                    "class": "node " + node.Position + " unavailable",
                    "html": [
                        $("<div/>", {
                            "class": "icon",
                            "html": $("<img/>", {"src": node.Icon})
                        }),
                        $("<div/>", {
                            "class": "frame"
                        })
                    ]
                });
                nodeBag.append(htmlNode);
            }
            else
                console.log("Error. No position given.")
        });
        $(nodeBag).children().getFirstNode().changeClass("available")
        skillTree.storage[skill.Name] = nodeBag;
    }
};
function createSimulator(className, skillData)
{
    var availableKeys = [
        "LB",
        "RB",
        "F",
        "TAB",
        "1",
        "2",
        "3",
        "4",
        "Z",
        "X",
        "C",
        "V",
        "Q",
        "E",
        "S"
    ];
    availableKeys.forEach(function(key, keyIndex, keyAr){
        if(skillData[key])
        {
            // Create Key Entry and append it to the list
            var keyEntry = $("<li/>",{
                "class":"key",
                "html":key
            });
            $(".skill-list .inner .list").append(keyEntry);
            skillData[key].forEach(function(skill, index, ar){

                // Create skill list
                //-------------------------------------------
                var skillEntry = generateSkillListEntry(skill);
                $(".skill-list .inner .list").append(skillEntry);

                // Create Nodes
                //-------------------------------------------
                if(skill.Nodes){
                    skillTree.generate(skill);
                }

            });
        }
        else
            console.log("No entries for Key '"+key+"'");

    });
}

function generateSkillListEntry(skillObj)
{
    var skillEntry = $("<li/>", {
        "class": "skill",
        "title": skillObj.Name,
        "html": [
            $("<div/>",{
                "class":"thumb",
                "html": $("<img/>", {"src":skillObj.Icon})
            }),
            $("<div/>",{
                "class":"name",
                "html":skillObj.Name
            })
        ]
    });

    $(skillEntry).click(function(){

        //return if already active
        if($(this).hasClass("active"))
            return;

        $(".skill-list .skill").removeClass("active");
        $(this).addClass("active");

        //Add Skill Description
        /*
            Herausfinden welche Node aktiv ist
            Information zu dieser Node in Info-Box anzeigen
            Wenn keine Node aktiv -> defaultNode Data laden

        */

        //$(".skill-description .inner").html("");
        if(skillObj.Name)
        {
            var descInfo = $("<span/>", {
                "class":"name",
                "html":skillObj.Name
            });
            //Append
        }
        if(skillObj.Resource)
        {
            var descResource = $("<p/>",{
                "class":"resource",
                "html": "Generates 1 Chi"
            });
        }
        if(skillObj.pointCost)
        {
            var descPointCost = $("<p/>",{
                "class":"point-cost",
                "html": "Requires 2 Points"
            });
        }




        $(".skill-grid").html("");

        if(skillObj.hasOwnProperty("Nodes") && skillObj.Nodes.length){

            $(".noTree").hide();
            skillTree.pull(skillObj.Name);

            //Build new Events for Nodes after Pulling it from storage
            $(".node").click(function(){
                $(this).clickNode();
                //$(this).toggleClass("active");
                skillTree.push()
            });
        }
        else{
            $(".noTree").html("<b style='color:#ff3300;'>"+skillObj.Name+"</b> does not have a skill tree");
            $(".noTree").show();
        }
    });
    return skillEntry;
}


function getFirstNode()
{
    var nodes = $(".node"),
        toReturn;
    nodes.each(function(){
        for(var y = 1; y < 6; y++){
            for(var x = 1; x < 4; x++){
                var xClass = "x"+ x,
                    yClass = "y"+ y,
                    xyClass= xClass + " " + yClass;
                if($(this).hasClass(xyClass))
                {
                    toReturn = $(this);
                    return false;
                }
            }
        }
    });
    return toReturn;
}

