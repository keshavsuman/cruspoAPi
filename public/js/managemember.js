
$('.member-button').click(function(){ 
    var url  = window.location.origin+'/api/admin/member/addMember';
    var body = {
        group:document.getElementsByName('group')[0].value,
        firstName:document.getElementsByName('firstName')[0].value,
        lastName:document.getElementsByName('lastName')[0].value,
        email:document.getElementsByName('email')[0].value,
        contactNumber:document.getElementsByName('contact')[0].value
    };
    axios.post(url,body).then(response=>{
        if(response.status==201)
        {
            window.location.reload();
        }
    }).catch(error=>{
        console.log(error);
    });
});


$('.group-create-button').click(function (){
    var url = window.location.origin+'/api/admin/member/createGroup/manual'; 
    var body={
        groupName:document.getElementsByName('Group-Title')[0].value,
        fromExistingGroup:document.getElementsByName('Add-Member-Existing-Group')[0].value
    }
    axios.post(url,body).then(response=>{
        window.location.reload();
    }).catch(error=>{
        console.log(error);
    });
});