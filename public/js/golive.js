
let notifyMember = false;
let scheduleSession = false;
let isFree = false;

$('.live-button-wrapper').click(function(){
    var ID = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return Math.random().toString(36).substr(2, 3)+'-'+Math.random().toString(36).substr(2, 3)+'-'+Math.random().toString(36).substr(2, 3);
      };
    var url  = window.location.origin+'/meet/preview/'+ID();
    window.open(url,'_blank');
});

$('.share-perosnal-live-session-button').click(function (){
    var url  = window.location.origin+'/gotopage';
    navigator.clipboard.writeText().then(function () {
        alert('It worked! Do a CTRL - V to paste')
    }, function () {
        alert('Failure to copy. Check permissions for clipboard')
    });
});
$('#scheduleLiveSessionNotifyMember').click(function(){
    notifyMember=!notifyMember;
});

$('#scheduleLiveSessionSelectedGroup').click(function(){
    scheduleSession=!scheduleSession;
});

$('.schedule-session-button').click(function (){
    var url = window.location.origin+'/api/admin/session/createSession';
    
    if(document.querySelector('input[name=repeatSession]:checked'))
    {
        var body = {
            sessionTitle:document.getElementsByName('Schedule-Live-Session-Title')[0].value,
            sessionDescription:document.getElementsByName('Schedule-Live-Session-Description')[0].value,
            startDate:document.getElementsByName('Live-Session-Start-Date')[0].value,
            startTime:document.getElementsByName('Live-Session-Start-Time')[0].value,
            timeZone:document.getElementsByName('Time-Zone')[0].value,
            duration:{
                hours:document.getElementsByName('Appointment-Time-2')[0].value,
                minutes:document.getElementsByName('Appointment-Time-2')[1].value,
            },
            repeatFrequency:document.querySelector('input[name=repeatSession]:checked').value,
            notifyMember:notifyMember,
            scheduleSession:scheduleSession,
        }
        axios.post(url,body);
    }
});

$('#editEventNotifyEmail').click(function(){
    notifyMember=!notifyMember;
});

$('.event-free-switch').click(function(){
    isFree=!isFree;
});

$('.paid-event-switch').click(function(){

});

$('.schedule-event-button').click(async function(){
    var url = window.location.origin+"/api/admin/event/createEvent";
    var eventThumbnailUrl;
    if($('.fileUpload')[0].files[0]){
        eventThumbnailUrl = await uploadImageAndGetUrl($('.fileUpload')[0].files[0]);
    }
    var body={  
        eventTitle:document.getElementsByName('Schedule-Live-Event-Title')[0].value,
        eventDescription:document.getElementsByName('Schedule-Live-Event-Description')[0].value,
        eventThumbnail:eventThumbnailUrl,
        startDate:document.getElementsByName('Live-Event-Start-Date')[0].value,
        endDate:document.getElementsByName('Live-Event-End-Date')[0].value,
        endTime:document.getElementsByName('Live-Event-Start-Time')[0].value,
        startTime:document.getElementsByName('Live-Event-End-Time')[0].value,
        timeZone:document.getElementsByName('Time-Zone-2')[0].value,
        price:document.getElementsByName('Paid-Event-Price')[0].value,
        currency:document.getElementsByName('Price-Currency')[0].value,
        notifyMemberViaEmail:true,
        isPaid:true,
    }
    var data = await axios.post(url,body);
    if(data.status==201){
        window.location.reload();
    }else{
        console.log(data.data);
    }
});


//Events 
$('.upload-course-thumbnail-button-wrapper').click(function(){
    $('.fileUpload').trigger('click');
    $('.fileUpload').change(function(){
      var file = $('.fileUpload')[0].files[0];
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
            const srcEncoded = ctx.canvas.toDataURL(e.target,'image/jgeg');
            $('.upload-course-thumbnail-button-wrapper').find('img').attr('src',srcEncoded);
            var block = srcEncoded.split(";");
            var contentType = block[0].split(":")[1];// In this case "image/gif"
            var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
            var blob = b64toBlob(realData, contentType);
            $('.fileUpload').attr('value',blob);
            $('.text-block-49').hide();
        }
    }
    });
});

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
  
async function uploadImageAndGetUrl(file){
    var url = window.location.origin+"/api/admin/resource/getFileUploadLink/"+file.name;
    try {
        var registerURL = (await axios.get(url)).data;
        await axios.put(registerURL,file);
        await axios.post(window.location.origin+"/api/admin/resource/registerUploadedFile",{
            fileName:file.name,
            fileSize:file.size,
            fileType:file.type,
            fileUrl:registerURL.split('?')[0]
        });
        return registerURL.split('?')[0];
    } catch (error) {
        console.log(error);
    }
  }