

$('.upload-button').click(function(){
    $('.uploadFile').trigger('click');
});

// Resources

$('.upload-option').click(function(){
    $('.fileUpload').trigger('click');
});


function copy(){
    /* Get the text field */
    var copyText = $('share-appointment-session-button-cop w-inline-block');
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}

db.createUser({
    user: "keshavsuman",
    pwd: "#TonyStark3000",
    roles: [
              { role: "userAdminAnyDatabase", db: "admin" },
              { role: "readWriteAnyDatabase", db: "admin" },
              { role: "dbAdminAnyDatabase",   db: "admin" }
           ]
});