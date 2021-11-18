var uploadSuccessFull =(fileName,percentage)=>`<div class="file-uploading-wrapper file" id="${fileName}">
<div class="upload-type"><img src="/images/document-type.svg" loading="lazy" alt=""></div>
<div class="file-name">${fileName}</div>
<div class="upload-status">
  <div class="upload-percent">${percentage} %</div>
  <div class="upload-success"><img src="/images/lesson-complete.svg" loading="lazy" width="20" alt=""></div>
</div>
<div class="cancel-upload-button-wrapper">
  <div class="cancel-upload" id="${fileName}"><img src="/images/cancel-button.svg" loading="lazy" width="20" alt=""></div>
</div>
</div>`;

var progressbar = (fileName,Id)=>`<div class="upload-file-header" id="${'uploadBarWrapper'+Id}">
<div class="upload-numbers-wrapper">
  <div class="upload-numbers">${fileName}</div>
  <div class="cancel-all-uploads-button-wrapper">
  <div class="upload-percent" id="${Id}" ></div>
    <!-- <div class="cancel-all-upload"><img src="/images/cancel-button.svg" loading="lazy" width="20" alt=""></div> -->
  </div>
</div>
<div class="upload-indicator-wrapper">
  <progress class="upload-indicator" id="${'progressBar'+Id}"  max="100" style="width:300px;"></progress>
</div>
</div>`;

$('.upload-option').on('click',function(){
    $('.fileUpload').trigger('click');
    $('.fileUpload').on('change',function(){
        var ID = Math.random();
        console.log(ID);
        var url = window.location.origin+"/api/admin/resource/getFileUploadLink/"+this.value.split('\\').pop();
        var file = this.files[0];
        var _this = this;
        axios.get(url).then(response=>{
            var xhr = new XMLHttpRequest();
            xhr.open('PUT',response.data);
            xhr.upload.onprogress = function(e) {
                var done = e.position || e.loaded, total = e.totalSize || e.total;
                $('#'+ID).html((Math.floor(done/total*1000)/10));
                document.getElementById('progressBar'+ID).value = (Math.floor(done/total*1000)/10);
                document.getElementById(ID).innerHTML = `${(Math.floor(done/total*1000)/10)} %`;
                // console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done/total*1000)/10) + '%');
            };

            xhr.addEventListener('load',function(_this){
                var body = {
                    fileName:file.name,
                    fileSize:file.size,
                    fileType:file.type,
                    fileUrl:processURL(response.data)
                };
                document.getElementById('uploadBarWrapper'+ID).remove();
                fileUploadSuccessCallback(body);
            });
            $('.upload-files-wrapper').show();
            $('.upload-files-wrapper').append(progressbar(file.name,ID));
            xhr.send(file);
            }).catch(error=>{
                console.log(error.message);
        })
    });
});

$(document).on('click','.cancel-upload',function(e){
    document.getElementById(e.currentTarget.id).remove();
    if($('.upload-files-wrapper').children().length==0){
        $('.upload-files-wrapper').hide();
    }
});

$('.group-create-button').click(function(){
    $('form[name="folderForm"]').submit();
});

$('.group-cancel-button').click(function (){

});

function fileUploadSuccessCallback(fileBody){
    var url = window.location.origin+'/api/admin/resource/registerUploadedFile';
    axios.post(url,fileBody).then(response=>{
        $('.upload-files-wrapper').append(uploadSuccessFull(fileBody.fileName,100));
        // window.location.reload();
    }).catch(error=>{
        console.log(error);
    });
}

function processURL(url){
    return url.split('?')[0];
}
