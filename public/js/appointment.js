$('.next-appointment-button-wrapper').click(async function(){
    var url = window.location.origin+'/api/admin/appointment/createAppointment';
    var body = {
        appointmentTitle:document.getElementsByName('appointmentTitle')[0].value,
        appointmentDescription:document.getElementsByName('appointmentDescription')[0].value,
        currency:document.getElementsByName('currency')[0]?JSON.parse(document.getElementsByName('currency')[0].value):'',
        price:document.getElementsByName('appointmentPrice')[0].value
    }
    var file = $('.fileUpload')[0].files[0];
    if(file)
    {
        body.appointmentThumbnail = await uploadAndGetFileUrl(file);
    }
    try{
        var response = await axios.post(url,body);
        window.location.reload();
    }catch(e){
        console.log(e.message);
    }   
});

async function uploadAndGetFileUrl(file) {
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

$('.upload-appointment-thumbnail-button-wrapper').click(function(){
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
                const srcEncoded = ctx.canvas.toDataURL(e.target,'image/jgeg');
                $('.upload-appointment-thumbnail-button-wrapper').find('img').attr('src',srcEncoded);
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
  