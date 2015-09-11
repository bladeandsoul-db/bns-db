var hashids = new Hashids("this is my salt", 4, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
$.getJSON("json/Assassin.json", function(json) {
    createSimulator("Assassin",json);
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

$.fn.clickNode = function(){
    if(this.hasClass("active")){
        console.log("is active");
    }

    if(this.hasClass("available")){
        $(this).changeClass("active");
        var children = skillTree.getId("nextChildren", $(this));
        $(children).each(function(){
            $(this).changeClass("available");
        });

        var self = skillTree.getId("self", $(this));
        var siblings = skillTree.getId("self", {"skill":"current", "y":self.y})
        if(siblings.length>1)
        {
            $.each(siblings, function(key, val){
                if(val.id != self.id)
                {
                    var children = skillTree.getId("children", {"skill":"current", "x":val.x,"y":val.y});
                    $("#"+val.id).changeClass("disabled");
                    $.each(children, function(key, val)
                    {
                        $("#"+val.id).changeClass("disabled");
                    });
                }
            });
        }
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
        $(".skill-grid").html(skillTree.storage[skillName]);
    },
    push: function()
    {
        skillTree.storage[skillTree.activeTree] = $(".skill-grid").children();
    },

    getId: function(type,options)
    {

        if(options instanceof jQuery)
        {
            if(!options.attr("id"))
                return false;
            var jqueryObj = options,
                cords = hashids.decode(jqueryObj.attr("id"));
            options = {"skill":skillTree.activeTree, "x":cords[0], "y":cords[1]};

        }


        /* Helper Functions
         ------------------------------------------- */
        this.getIdByCords = function(cords){

            if("x" in cords & "y" in cords)
                var func = "xy";
            else if("x" in cords)
                var func = "x";
            else if("y" in cords)
                var func = "y";
            else
                return false;

            if(func == "xy")
            {
                var returnValue = "";
                $.each(skillTree.nodes[cords.skill], function(index, data) {
                    if(data.x == cords.x & data.y == cords.y)
                    {
                        returnValue = data;
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
                $.each(skillTree.nodes[cords.skill], function(index, data) {
                    if(data.x == cords.x)
                        returnValue.push(data);
                });
                if(!returnValue.length)
                    returnValue = false;
                return returnValue;
            }
            else if(func == "y")
            {
                var returnValue = [];
                $.each(skillTree.nodes[cords.skill], function(index, data) {
                    if(data.y == cords.y)
                        returnValue.push(data);
                });
                if(!returnValue.length)
                    returnValue = false;
                return returnValue;
            }
        };


        /* Normal Code
        ------------------------------------------- */


        var type = type || "self",
            validType = [
                "self",
                "children",
                "nextChildren",
                "parent",
                "parents"
            ];
        if(validType.indexOf(type) < 0)
            return false;

        if(!options.skill)
            return false;
        else if(options.skill == "current")
            options.skill = skillTree.activeTree;

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
            return this.getIdByCords(options);
        }
        if(type == "children")
        {
            var node = this.getIdByCords(options),
                currentChildren = [],
                allChildren = [];

            if(!node.children || !node.children.length)
                return false;
            else
                var nodeChildren = node.children;

            recursiveFunction = function(key, val)
            {
                var x = val.x,
                    y = val.y,
                    node =  skillTree.getIdByCords({"skill":skillTree.activeTree,"x":x, "y":y});
                allChildren.push(node);
                if(!node.children || !node.children.length)
                    return false;
                else
                    var nextChild = node.children;
                $.each(nextChild, function(key2,val2) {
                    recursiveFunction(key2, val2)
                });
            };
            $.each(nodeChildren, function(key, val) {
                recursiveFunction(key, val)
            });
            return allChildren;
        }
        if(type == "nextChildren")
        {
            var node = this.getIdByCords(options),
                children = [];
            if(!node.children || !node.children.length)
                return false;

            $.each(node.children, function(nodeIndex, nodeContent){
                    var x = nodeContent.x,
                        y = nodeContent.y;
                    var child = skillTree.getIdByCords({"skill":skillTree.activeTree,"x":x, "y":y})
                    children.push($("#"+child.id));
            });
            return children;
        }
        if(type == "parent")
        {
            var node = this.getIdByCords(options),
                nodes = skillTree.nodes[skillTree.activeTree],
                parent;
            $.each(nodes, function(index, content)
            {
                if(content.children)
                {
                    $.each(content.children, function(i, c){
                        if(c.x == node.x & c.y == node.y)
                        {
                            parent = content;
                            return false;
                        }
                    })
                }else
                    return false
            });
            if(parent)
                return parent;
            else
                return false;
        }

    },
    generate: function(skill){
        var nodeBag = $();
        skillTree.nodes[skill.Name] = [];
        skill.Nodes.forEach(function(node, nodeIndex, nodeAr) {
            if (node.Position)
            {
                if (!node.Icon)
                    node.Icon = skill.Icon;
                var x = node.Position.x,
                    y = node.Position.y,
                    id = hashids.encode([x,y]);
                var htmlNode = $("<div/>", {
                    "class": "node "+"x"+x+" y"+y+" unavailable",
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
                skillTree.nodes[skill.Name].push({"id":id, "x":x, "y":y, "children":node.Children});
            }
            else
                console.log("Error. No position given.")
        });
        console.log(nodeBag.length);
        $(nodeBag).getFirstNode().changeClass("available");
        skillTree.storage[skill.Name] = nodeBag;
    }
};
function createSimulator(className, skillData)
{
    $("#class-name").html(className); //Set Classname

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


        if(skillObj.Name)
        {
            var descInfo = $("<span/>", {
                "class":"name",
                "html":skillObj.Name
            });
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
