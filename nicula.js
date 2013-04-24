showPopup = function(thumb) {
    hidePopup();

    var content = $("#modal-content");

    /* Copy everything alongside the thumbnail element */
    $(content).html(thumb.parent().children().clone());

    /* Set the width of modal-content to the width of its image */
    $(content).css("width", thumb.width());

    /* And center the modal */
    $("#modal").css("margin-left", -$("#modal").outerWidth()/2);

    $("#shade").show();
    $("#modal").show();
};

hidePopup = function(thumbnails) {
    $("#shade").hide();
    $("#modal").hide();
};

function mailTo() {
  var acct = "elisabeth";
  var host = "wingedanddangerous.com";
  var email = acct + "@" + host;
  
  var mailto = $("<a>").attr("href", "mailto:" + email);
  mailto.html(email);
  
  $("#mailTo").append($(mailto));
  
  /*
  if (!document.getElementById("mailTo")) return false;
  
  var spanobj = document.getElementById("mailTo");
  var anch = document.createElement("a");
  var mailto = "mailto:" + email;
  anch.setAttribute("href",mailto);
  spanobj.appendChild(anch);
  var txt = document.createTextNode(email);
  anch.appendChild(txt);
  */
}

$(document).ready(function() {
    $(".thumbnail").click(
        function() {
            showPopup($(this));
        });

    /* Place the modal at the top edge of the thumbnails list */
    var pos = $(".thumbnails").offset();
    if (pos) {
        $("#modal").css("top", pos.top);

        $("#modal").click(function() { hidePopup(); });
        $("#shade").click(function() { hidePopup(); });
    }
    
    mailTo();
});
