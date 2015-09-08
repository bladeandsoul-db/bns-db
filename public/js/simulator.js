    $.getJSON("json/Assassin.json", function(json) {
        createSimulator("Assassin",json);
        console.log(json);
        //activate first entry
        $(".skill-list .list .skill")[3].click();

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
    if(!this.length)
        return;
    var classes = this.attr("class"),
        rx = new RegExp("[x][1-3]","i"),
        ry = new RegExp("[y][1-5]", "i"), // short regex to get the current y-value
        x = classes.match(rx)[0],
        y = classes.match(ry)[0],
        xNum = Number(x[1]),
        yNum = Number(y[1]);
    return {"X":xNum, "Y":yNum, "fullX": x, "fullY":y, "both": x+" "+y, "node":$(this)};
};
$.fn.getNodeSiblings = function()
{
    var position = this.getNodePosition(),
        siblings = $(".node."+position.fullY+":not(."+position.fullX+")");
    return siblings;
};
$.fn.getNodeSiblingsRight = function()
{
    var pos = this.getNodePosition(),
        rightSideNodes = [],
        toCheck = "";

    if(pos.X == 3)
        return false;
    if($(".node."+pos.fullY).length == 1)
        return false;

    for(var i = pos.X+1; i<4; i++)
    {
        if(i> pos.X+1)
        toCheck+=", ";
        toCheck+=".node.x"+i+"."+pos.fullY;
    }


    return $(toCheck)

    //var selector = $(".node."+pos.fullY+":not(."+pos.fullX+")");
    //if(selector.length)
    //    return selector;
    //if(pos.X == 3)
    //    return false;
};

$.fn.getNodeParent = function()
{
    var pos = this.getNodePosition();
    for(var i = pos.Y-1; i>0; i--) // all nodes above this one
    {
        var directParent = $(".node."+pos.fullX+".y"+i),
            oneOffsetParent = $(".node.x"+(pos.X-1)+".y"+i),
            twoOffsetParent = $(".node.x"+(pos.X-2)+".y"+i);
        if(directParent.length)
            return directParent;
        else if(oneOffsetParent.length)
            return oneOffsetParent;
        else if(twoOffsetParent.length)
            return twoOffsetParent;
        else
            return false;
    }
        return false;
};



$.fn.getNodeChildren = function()
{
    var pos = this.getNodePosition();

    if(pos.X == 1)
        console.log("1")
    else if(pos.X == 2)
        console.log("2")
    else if(pos.X == 3)
        console.log("3")
};
//$.fn.getNodeChildren = function()
//{
//    var pos = this.getNodePosition(),
//        maxX = 3,
//        maxY = 5,
//        siblings = this.getNodeSiblings(),
//        numSiblings = siblings.length,
//        siblingsPositions = [];
//
//    //for(var i = 0; i<numSiblings; i++)
//    //{
//    //    siblingsPositions.push({"sibling":siblings[i], "position":$(siblings[i]).getNodePosition()});
//    //}
//
//    if(pos.X == 1)
//    {
//
//    }
//    else if(pos.X == 2)
//    {
//
//    }
//    else if(pos.X == 3)
//    {
//        var children = ""   ;
//        for(var i = pos.Y; i<maxY; i++)
//        {
//
//            var selector = ".node.x"+pos.X+".y"+(i+1);
//            if($(selector))
//            {
//                if(i>pos.Y)
//                    children+=", ";
//                children+=selector;
//            }
//
//        }
//        return($(children));
//    }
//};
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
};



skillTree = {
    storage:[],
    nodes:[],
    activeTree:undefined,
    pull: function(skillName)
    {
        skillTree.activeTree = skillName;
        //nodes neu initialisieren
        $(".skill-grid").html(skillTree.storage[skillName]);
    },
    push: function()
    {
        skillTree.storage[skillTree.activeTree] = $(".skill-grid").children();
    },
    getId: function(type,options)
    {
        var type = type || "self",
            validType = [
                "self",
                "children",
                "parent",
                "parents"
            ];
        if(validType.indexOf(type) < 0)
            return "1";

        if(!options.skill)
            return "2";

        //console.log(x in options & y in options)
        if("x" in options & "y" in options)
            var func = "xy";
        else if("x" in options)
            var func = "x";
        else if("y" in options)
            var func = "y";
        else
            return false;
        /* Self Functions
        ------------------------------------------- */
        if(type == "self")
        {
            if(func == "xy")
            {
                var returnValue = "";
                $.each(skillTree.nodes[options.skill], function(index, data) {
                    if(data.x == options.x & data.y == options.y)
                    {
                        returnValue = data.id;
                        return false; // Break out of loop
                    }
                });
                if(returnValue == "")
                    returnValue = false;
                return returnValue;
            }
            else if(func == "x")
            {
                var returnValue = [];
                $.each(skillTree.nodes[options.skill], function(index, data) {
                    if(data.x == options.x)
                        returnValue.push(data.id);
                });
                if(!returnValue.length)
                    returnValue = false;
                return returnValue;
            }
            else if(func == "y")
            {
                var returnValue = [];
                $.each(skillTree.nodes[options.skill], function(index, data) {
                    if(data.y == options.y)
                        returnValue.push(data.id);
                });
                if(!returnValue.length)
                    returnValue = false;
                return returnValue;
            }
        }
        /* Children Functions
         ------------------------------------------- */

        /* Parent Functions
         ------------------------------------------- */

        /* Parents Functions
         ------------------------------------------- */




        //if(!param.skill || !skillTree.nodes.hasOwnProperty(param.skill))
        //{
        //    console.log("skill not found and/or declared")
        //    return false;
        //}
        //var returnValue = [];
        //$.each(skillTree.nodes[param.skill], function(index, data) {
        //    if(param.x & param.y)
        //    {
        //        if(data.x == param.x & data.y == param.y)
        //        {
        //            returnValue = data.id;
        //            return false;
        //        }
        //    }
        //    else if(param.x & !param.y)
        //    {
        //        console.log("x");
        //        if(data.x == param.x)
        //        {
        //            returnValue.push(data.id);
        //        }
        //    }
        //    else if(param.y & !param.x)
        //    {
        //        console.log(param.y, data.y);
        //        if(data.y == param.y)
        //        {
        //            returnValue.push(data.id);
        //        }
        //    }
        //    else
        //    {
        //        returnValue = false;
        //        return false;
        //    }
        //});
        //return returnValue;
    },
    generate: function(skill){
        var nodeBag = $();
        skillTree.nodes[skill.Name] = [];
        skill.Nodes.forEach(function(node, nodeIndex, nodeAr) {
            if (node.Position)
            {
                if (!node.Icon)
                    node.Icon = skill.Icon;
                var hashids = new Hashids("this is my salt", 4, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
                var x = Number(node.Position[1]),
                    y = Number(node.Position[4]),
                    id = hashids.encode([x,y]);
                var htmlNode = $("<div/>", {
                    "class": "node " + node.Position + " unavailable",
                    "id": id,
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
                nodeBag = nodeBag.add(htmlNode);
                skillTree.nodes[skill.Name].push({"id":id, "x":x, "y":y});
            }
            else
                console.log("Error. No position given.")
        });

        $(nodeBag).getFirstNode().changeClass("available")
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
                //$(this).clickNode();
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

