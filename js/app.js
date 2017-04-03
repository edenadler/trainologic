var contacts = [
    {
        id:1,
        name: "Friends",
        type: "Group",
        contacts: [
            {id:2, name: "Udi", type: "Contact"},
            {id:3, name: "Tommy", type: "Contact"},
            {
                id:6,
                name: "Old Friends",
                type: "Group",
                contacts: [
                    {id:7, name: "Itay", type: "Contact"}
                ]
            }
        ]
    },
    {
        id:4,
        name: "Family",
        type: "Group",
        contacts: [
            {id:5, name: "Roni", type: "Contact"}
        ]
    },
    {id: 8, name: "Ori", type: "Contact"}
];

var isDropdown = [false, false, false, false, false, false, false, false];

$( document ).ready(function() {

    var expandList = function(e){
        e.stopPropagation();
        var id = e.data.id;
        var dropdown = isDropdown[contacts[id].id];
        if (!dropdown){
            $("#"+contacts[id].id).after($("<div></div>").attr("class","col-md-12 dropdown-container"+contacts[id].id));
            for (var i = 0; i< contacts[id].contacts.length; i++) {
                if (contacts[id].contacts[i].type === "Group"){
                    $(".dropdown-container"+contacts[id].id).append($("<div></div>").attr("id", contacts[id].contacts[i].id).attr("class","dropdown-element group-title").text(contacts[id].contacts[i].name));
                    $("#"+contacts[id].contacts[i].id).on("click",{"id": id, "innerId": i},expandInnerList);
                    $("#"+contacts[id].contacts[i].id).hover(function(e) {
                        $(this).css("background-color",e.type === "mouseenter"? "#aec2e2" : "transparent")
                    });
                }
                else{
                    $(".dropdown-container"+contacts[id].id).append($("<div></div>").attr("id", contacts[id].contacts[i].id).attr("class", "dropdown-element").text(contacts[id].contacts[i].name));
                }
            }
            isDropdown[contacts[id].id] = true;
        }
        else{
            $("#"+contacts[id].id).next(".dropdown-container"+contacts[id].id).remove();
            isDropdown[contacts[id].id] = false;
        }
    };

    var expandInnerList = function(e){
        e.stopPropagation();
        var id = e.data.id;
        var innerId = e.data.innerId;
        var dropdown = isDropdown[contacts[id].contacts[innerId].id];
        if (!dropdown){
            $("#"+contacts[id].contacts[innerId].id).after($("<div></div>").attr("class","col-md-12 dropdown-container"+contacts[id].contacts[innerId].id));
            for (var i = 0; i< contacts[id].contacts[innerId].contacts.length; i++) {
                $(".dropdown-container"+contacts[id].contacts[innerId].id).append($("<div></div>").attr("id", contacts[id].contacts[innerId].contacts[i].id).attr("class", "dropdown-element").text(contacts[id].contacts[innerId].contacts[i].name));
            }
            isDropdown[contacts[id].contacts[innerId].id] = true;
        }
        else{
            $("#"+contacts[id].contacts[innerId].id).next(".dropdown-container"+contacts[id].contacts[innerId].id).remove();
            isDropdown[contacts[id].contacts[innerId].id] = false;
        }
    };

    for (var i =0; i<contacts.length; i++){
        $(".main").append($("<div></div>").attr("id",contacts[i].id).attr("class","row"));
        $("#"+contacts[i].id).append($("<div></div>").attr("class","group-title").text(contacts[i].name));
        if (contacts[i].type === "Group"){
            $("#"+contacts[i].id).on("click",{"id": i},expandList);
            $("#"+contacts[i].id).hover(function(e) {
                $(this).css("background-color",e.type === "mouseenter"? "#aec2e2" : "transparent")
            });
        }
    }
});