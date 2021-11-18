
var file;
$('.edit-cover-image-button').click(function(){
    $('.fileUpload').trigger('click');
    $('.fileUpload').change(function(){
        file = $('.fileUpload')[0].files[0];
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
                const MAX_WIDTH = 1080;
                const scaleSize = MAX_WIDTH/e.target.width;
                canvas.width = MAX_WIDTH;
                canvas.height = e.target.height * scaleSize;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(e.target,0,0,canvas.width,canvas.height);
                const srcEncoded = ctx.canvas.toDataURL(e.target,'image/jgeg');
                $('.go-to-page-cover-image').attr('src',srcEncoded);
                var block = srcEncoded.split(";");
                var contentType = block[0].split(":")[1];// In this case "image/gif"
                var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
                // var blob = b64toBlob(realData, contentType);
                $('.fileUpload').attr('value',blob);
                $('.text-block-49').hide();
            }
        }
    });
});

$('.submit-button-4').click(async function(){
    var url  = window.location.origin+'/api/admin/website/updateGoToPage';
    var body  = {
        about:document.getElementsByName('about')[0].value,
    }
    console.log(file);
    if(file)
    {
        body.bgImage = await uploadAndGetFileUrl(file); 
    }
    axios.post(url,body).then(response=>{
        console.log(response);
        window.location.reload();
    }).catch(error=>{
        console.log(error);
    });
    console.log(body);
});

$('.submit-button').click(function(){
    var url  = window.location.origin+'/api/admin/website/recommend';
    var body  ={
        recommendation:document.getElementsByName('Recommend-Field')[0].value,
        name:document.getElementsByName('recommendName')[0].value,
        email:document.getElementsByName('recommendEmail')[0].value,
        source:'GOTOPAGE',
    }
    axios.post(url,body).then(response=>{
        window.location.reload();
    }).catch(error=>{
        console.log(error);
    });
});

$('.layout-web-contact-button').click(function(){
    var url = window.location.origin+'/api/admin/website/contactUs';
    var body = {
        firstName:document.getElementsByName('Layout-Web-Contact-Name')[0].value,
        lastName:document.getElementsByName('Layout-Web-Last-Name')[0].value,
        email:document.getElementsByName('Layout-Web-Contact-Email')[0].value,
        contactNumber:document.getElementsByName('Layout-Web-Contact-Phone-Number')[0].value,
        message:document.getElementsByName('Layout-Web-Contact-Message')[0].value,
    }
    axios.post(url,body).then(response=>{
        window.location.reload();
    }).catch(error=>{
        console.log(error.message);
    });
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