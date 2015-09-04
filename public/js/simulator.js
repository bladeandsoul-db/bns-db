$.getJSON("json/Assassin.json", function(json) {
    createSimulator("Assassin",json);

    //activate first entry
    $(".skill-list .list .skill")[0].click()

});
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
        skill.Nodes.forEach(function(node, nodeIndex, nodeAr){
            if(!node.Icon)
                node.Icon = skill.Icon;

            var htmlNode = $("<div/>",{
               "class":"node "+node.Position,
                "html": [
                    $("<div/>",{
                        "class":"icon",
                        "html":$("<img/>", {"src":node.Icon})
                    }),
                    $("<div/>",{
                        "class":"frame"
                    })
                ]
            });
            nodeBag.append(htmlNode);
        });
        skillTree.storage[skill.Name] = nodeBag;
    }
};
function createSimulator(className, skillData)
{
    var availableKeys = [
        "LB",
        //"RB",
        //"F",
        //"TAB",
        //"1",
        //"2",
        //"3",
        //"4",
        //"Z",
        //"X",
        //"C",
        //"V",
        //"Q",
        //"E",
        //"S"
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
                if(skill.Nodes)
                    skillTree.generate(skill);
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

        $(".skill-list .skill").removeClass("active");
        $(this).addClass("active");

        $(".skill-grid").html("");
        if(skillObj.Nodes.length){

            $(".noTree").hide();
            skillTree.pull(skillObj.Name);

            //Build new Events for Nodes after Pulling it from storage
            $(".node").click(function(){
                $(this).toggleClass("active");
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