
var isCoursePaid = false;

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

$('.paid-course-switch').click(function(){
    isCoursePaid = !isCoursePaid;
    console.log(isCoursePaid);
});

$('.next-course-button-wrapper').click(async function(){
    try{
        var url = window.location.origin+'/api/admin/course/createcourse';
        var courseCategory;
        var newCourseCategory;
        if(document.getElementsByName('newCourseCategory')[0].value){
            newCourseCategory = document.getElementsByName('newCourseCategory')[0].value;

        }else{
            courseCategory = document.getElementsByName('courseCategory')[0]?document.getElementsByName('courseCategory')[0].value:null;
        }
        var body = {
            courseTitle:document.getElementsByName('courseTitle')[0].value,
            courseDescription:document.getElementsByName('courseDescription')[0].value,
            typeOfCourse:document.getElementsByName('typeOfCourse')[0].value,
            newCourseCategory:newCourseCategory,
            courseCategory:courseCategory
        }
        if(isCoursePaid)
        {
            body.courseExpiryDate=document.getElementsByName('courseExpiryDate')[0].value;
            body.price=document.getElementsByName('coursePrice')[0].value;
            body.currency=JSON.parse(document.getElementsByName('currency')[0]?document.getElementsByName('currency')[0].value:'');
            if(document.querySelector('input[name="feeCollectionPeriod"]:checked')){
                body.feeCollectionDuration=document.querySelector('input[name="feeCollectionPeriod"]:checked').value;
                if(document.querySelector('input[name="feeCollectionPeriod"]:checked').value=='custom'){
                    body.courseFeeCustomPeriod = document.getElementsByName('collectionPeriod')[0].value;
                    body.courseFeeCustomUnit = document.getElementsByName('courseFeeCustomDropdown')[0].value;
                }
            }
        }
        console.log(body);
        if(courseValidationBeforeUploading(body)==false)
        {
            var response = await axios.post(url,body);
            console.log(response.data.courseId);
            window.location = window.location.origin+'/admin/programs/edit/'+response.data.curseType+'/'+response.data.courseId;
        }else{
            showMessage(courseValidationBeforeUploading(body));
        }   
    }catch(e){
        console.log(e);
    }
});

$('.create-new-category').click(function(){
    $('.no-existing-category').hide();
});

$('.existing-course-category').click(function(){
    $('.no-existing-category').show();
});

$('.delete-course').click(function(){
    // alertify.confirm('closableByDimmer: false').set({'closableByDimmer': false}); 
    alertify.alert()
    .setting({
      'label':'Delete',
      'message': 'This course will  be delete: ' + (closable ? ' ' : ' not ') + 'closable.' ,
      'onok': function(){ alertify.success('Great');}
    }).show();}) 

$('.share-course-button').click(function(e){
    var url = window.location.origin+"/programs/"+e.currentTarget.id;
    navigator.clipboard.writeText(url).then(function () {
        alertify.notify('copied to clipboard',"success");
    }, function () {
        alert('Failure to copy. Check permissions for clipboard')
    });
});

$('.upload-course-thumbnail-button-wrapper').click(function(){
    
    $('.fileUpload').trigger('click');
    $('.fileUpload').change(function(){
        var file = $('.fileUpload')[0].files[0];
        if(!file){
            console.log('Not a file');
            return ;
        } 
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event)=>{
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            imgElement.onload = (e)=>{

                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 400;
                const scaleSize = MAX_WIDTH/e.target.width;
                canvas.width = MAX_WIDTH;
                canvas.height = e.target.height * scaleSize;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(e.target,0,0,canvas.width,canvas.height);
                const srcEncoded = ctx.canvas.toDataURL(e.target,'image/jpeg');
                $('.thumbnail-image').attr('src',srcEncoded);
                var block = srcEncoded.split(";");
                var contentType = block[0].split(":")[1];// In this case "image/gif"
                var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
                var blob = b64toBlob(realData, contentType);
                $('.fileUpload').attr('value',blob);
                $('.image-32').hide();
                $('.text-block-49').hide();
            }
        }
    });
});

function courseValidationBeforeUploading(body){
    if(!body.courseTitle){
        return "Please Enter CourseTitle";
    }
    if(!body.courseDescription){
        return "Please Enter courseDescription";
    }
    return false;
}