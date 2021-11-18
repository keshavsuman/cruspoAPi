let moduleHTML = (id) => `<div class="module-stepwrapper" id="module-${id}">
<div class="cancel-button-wrapper">
  <div class="cancel-button another-video" id="module-cancel-${id}">
    <div class="text-block-22">Remove Module</div><img src="/images/cancel-button.svg" loading="lazy" width="23" alt="">
  </div>
  </div>
<h3>Course Content - Module</h3>
<div class="w-form">
  <form >
  <input type="text" class="module-title w-input" maxlength="256" name="module-title" data-name="module title" placeholder="Give your module a title" id="module-title" required="">
    <textarea placeholder="Describe Module" maxlength="5000" id="module-description" name="module-description" data-name="module description" class="w-input"></textarea>
  </form>
</div>
<div class="add-lesson-button-wrapper">
  <div class="add-lesson-dropdown">
    <div class="add-lesson-drop-header" id="addLesson-${id}">
      <h4 class="heading-7">Add Lesson</h4><img src="/images/add-member.svg" loading="lazy" alt="">
    </div>
  </div>
</div>
</div>`;

let lessonHTML = (moduleId, lessonId) => `<div class="video-lesson-step-wrapper" id="video-lesson-${moduleId}-${lessonId}">
<div data-w-id="52393347-28e3-dd40-f1dc-e655c33f3d59" class="cancel-button-wrapper">
  <div class="cancel-button" id="lesson-cancel-${moduleId}-${lessonId}">
    <div class="text-block-22">Cancel</div><img src="/images/cancel-button.svg" loading="lazy" width="23" alt="">
  </div>
</div>
<div class="form-block-2 w-form">
  <form id="lesson-form-${moduleId}-${lessonId}" >
    <input type="text" class="lesson-title w-input" maxlength="256" name="lesson-title" data-name="lesson title" placeholder="Enter a title for the lesson" id="lesson-title">
    <textarea placeholder="Describe Lesson" maxlength="5000" id="Lesson-Description" name="lesson-description" data-name="Lesson Description" class="w-input"></textarea>
    <div class="w-layout-grid video-lesson-grid">
    <input type="file" id="videolesson-file-${moduleId}-${lessonId}" style="display:none" >
      <div class="video-lesson-video-wrapper" id="videoLesson-${moduleId}-${lessonId}">
        <div class="text-block-112">Upload your video here</div>
        <div data-hover="" data-delay="0" class="upload-dropdown w-dropdown">
          <div class="upload-toggle w-dropdown-toggle">
            <!-- <div class="w-icon-dropdown-toggle"></div> -->
            <div>Upload</div>
          </div>
          <nav class="upload-list w-dropdown-list">
            <a href="#" class="upload-device w-dropdown-link">Upload from device</a>
            <a href="#" data-w-id="1d06786d-7d38-277f-a920-3d9b88b7a8c8" class="resource-upload link w-dropdown-link">Upload from resources</a>
          </nav>
        </div>
        <div class="video-lesson-cover-wrapper">
          <div id="courseVideo" class="course-video w-video w-embed"></div>
        </div>
      </div>
      <div class="video-lesson-attachment-wrapper">
        <div class="text-block-112">Upload video attachments</div>
        <div data-hover="" data-delay="0" class="upload-dropdown w-dropdown">
          <div class="upload-toggle w-dropdown-toggle">
          <!-- <div class="w-icon-dropdown-toggle"></div> -->
            <div>Upload</div>
            <input type="file" id="file-${moduleId}-${lessonId}" style="display:none">

          </div>
          <nav class="upload-list w-dropdown-list">
            <a href="#" class="upload-device w-dropdown-link">Upload from device</a>
            <a href="#" data-w-id="9f0fa6d0-d2e8-9322-69ad-764193f6041d" class="resource-upload link w-dropdown-link">Upload from resources</a>
          </nav>
        </div>
        <div class="view-video-lesson-resource-wrapper creator-end">
          <div class="attachment-title">Attachment Name</div>
          <div class="attachment-type">
            <div class="attachment-type">attachment type</div>
          </div><img src="/images/attachment.svg" loading="lazy" alt="">
          <div class="cancel-button attachment"><img src="/images/cancel-button.svg" loading="lazy" width="14" alt=""></div>
        </div>
      </div>
      <div id="w-node-a4a13837-23ab-9a3f-4381-9b72200081ef-b68ddb7d" class="video-lesson-video-description">
      <textarea placeholder="Describe your course video" maxlength="5000" id="videoDescription" name="videoDescription" data-name="videoDescription" class="w-input"></textarea>
      </div>
    </div>
    
  </form>
</div>
</div>
`;

let videoHTML = (moduleId, lessonId, videoId) => `<div class="another-video-wrapper" id="another-video-${moduleId}-${lessonId}-${videoId}">
<div class="cancel-button-wrapper">
  <div class="cancel-button another-video" id="video-cancel-${moduleId}-${lessonId}-${videoId}">
    <div class="text-block-22">Remove Video</div><img src="/images/cancel-button.svg" loading="lazy" width="23" alt="">
  </div>
</div>
<div class="w-layout-grid video-lesson-grid ">
  <div class="video-lesson-video-wrapper" id="video-${moduleId}-${lessonId}-${videoId}">
    <div class="text-block-112">Upload your video here</div>
    <div data-hover="" data-delay="0" class="upload-dropdown w-dropdown">
      <div class="upload-toggle w-dropdown-toggle" id="w-dropdown-toggle-3" aria-controls="w-dropdown-list-3" aria-haspopup="menu" aria-expanded="false" role="button" tabindex="0">
        <div>Upload</div>
      <input type="file" id="file-${moduleId}-${lessonId}-${videoId}" style="display:none">
      </div>
      <nav class="upload-list w-dropdown-list" id="w-dropdown-list-3" aria-labelledby="w-dropdown-toggle-3">
        <a href="#" class="upload-device w-dropdown-link" tabindex="0">Upload from device</a>
        <a href="#" class="resource-upload link w-dropdown-link" tabindex="0">Upload from resources</a>
      </nav>
    </div>
  </div>
  <div class="video-lesson-attachment-wrapper">
    <div class="text-block-112">Upload video attachments</div>
    <div data-hover="" data-delay="0" class="upload-dropdown w-dropdown">
      <div class="upload-toggle w-dropdown-toggle" id="w-dropdown-toggle-4" aria-controls="w-dropdown-list-4" aria-haspopup="menu" aria-expanded="false" role="button" tabindex="0">
         <!-- <div class="w-icon-dropdown-toggle"></div> -->
        <div>Upload</div>
      </div>
      <input type="file" id="file-${moduleId}-${lessonId}-${videoId}" style="display:none">
      <nav class="upload-list w-dropdown-list" id="w-dropdown-list-4" aria-labelledby="w-dropdown-toggle-4">
        <a href="#" class="upload-device w-dropdown-link" tabindex="0">Upload from device</a>
        <a href="#" data-w-id="67ac83c9-3ea1-ac1e-379b-9726c7d2101e" class="resource-upload link w-dropdown-link" tabindex="0">Upload from resources</a>
      </nav>
    </div>
  </div>
  <div id="w-node-_3a02fcd8-c545-cf71-e602-a366b18b307f-b68ddb7d" class="video-lesson-video-description">
  <textarea placeholder="Describe your course video" maxlength="5000" name="videoDescription" data-name="Video Description 2" class="w-input"></textarea></div>
</div>
</div>`;

let addAnotherVideoHTML = (moduleId, id) => `<div class="add-another-video-button-wrapper" id="add-another-video-${moduleId}-${id}">
<div class="add-another-video-button">
  <div>Add Another Video Inside Lesson</div><img src="/images/add-member.svg" loading="lazy" alt="" class="image-14">
</div>
</div>`;


let videoUploading = (moduleId, lessonId)=>`<div  class="video-lesson-video-wrapper" id="video-uploading-${moduleId}-${lessonId}">
<div class="text-block-112">video is uploading</div>
<div data-hover="" data-delay="0" class="upload-dropdown w-dropdown">
  <div >
    <div id="uploadingPercentage"></div>
  </div>
</div>
<div class="video-lesson-cover-wrapper">
  <div id="courseVideo" class="course-video w-video w-embed"></div>
</div>
</div>
`;
let videoUploaded = (url)=>`
<div  class="video-lesson-video-wrapper" id="video-uploaded">
<div class="text-block-112">video is uploaded successfully</div>
<div class="video-lesson-cover-wrapper">
  <video id="courseVideo" class="course-video w-video w-embed" src=${url} playsinline muted>
  </video>
</div>
</div>
`;


$('.edit-thumbnail-pen-wrapper').click(() => {
  $('.fileToUpload').trigger('click');
});

$(document).ready(function () {
  let isPaid = $('.isPaid').val();
  if (isPaid == 'true') {
    $('.yes').trigger('click');
  }
  $('#w-dropdown-toggle-0').trigger('click');
  $('.existing-course-category').trigger('click');
  $('#email-form').trigger('click');
});

$('.course-radio.yes.w-radio').click(function(){
  $('.isPaid').attr('value',true);
});
$('.course-radio.no.w-radio').click(function(){
  $('.isPaid').attr('value',false);
});

$('.add-module-button').click(() => {
  $('.add-module-button-wrapper').before(moduleHTML($('.module-stepwrapper').length));
});

$(document).on('click', '.add-lesson-drop-header', (e) => {
  let moduleId = e.currentTarget.id.split('-').pop();
  let lessonID = $('#module-' + moduleId).find('.video-lesson-step-wrapper').last().attr("id");
  if (lessonID) {
    lessonID = Number(lessonID.split('-').pop()) + 1;
  } else {
    lessonID = 0
  }
  $('#module-' + moduleId).append(lessonHTML(moduleId, lessonID));
  $('#lesson-form-' + moduleId + '-' + lessonID).append(addAnotherVideoHTML(moduleId, lessonID));
});

$(document).on('click', '.add-another-video-button-wrapper', function (e) {
  let lessonID = e.currentTarget.id.split('-').pop();
  let moduleID = e.currentTarget.id.split('-')[e.currentTarget.id.split('-').length - 2];
  let videoID = $('#lesson-form-' + moduleID + '-' + lessonID).find('.another-video-wrapper').length;
  $('#add-another-video-' + moduleID + '-' + lessonID).before(videoHTML(moduleID, lessonID, videoID));
});

$(document).on('click', '.cancel-button', (e) => {
  let lessonId, moduleId, videoId;
  switch (e.currentTarget.id.split('-')[0]) {
    case 'lesson':
      moduleId = e.currentTarget.id.split('-')[e.currentTarget.id.split('-').length - 2];
      lessonId = e.currentTarget.id.split('-').pop();
      $('#video-lesson-' + moduleId + '-' + lessonId).remove();
      break;
    case 'video':
      videoId = e.currentTarget.id.split('-').pop();
      lessonId = e.currentTarget.id.split('-')[e.currentTarget.id.split('-').length - 2];
      moduleId = e.currentTarget.id.split('-')[e.currentTarget.id.split('-').length - 3];
      $('#another-video-' + moduleId + '-' + lessonId + '-' + videoId).remove();
      break;
    case 'module':
      moduleId = e.currentTarget.id.split('-').pop();
      $('#module-' + moduleId).remove();
      break;
  }
});

$(document).on('click', '.video-lesson-video-wrapper', function (e) {
  if(e.currentTarget.id.split('-')[1]!='uploading' && e.currentTarget.id.split('-')[1]!='uploaded'){
  let lessonId = e.currentTarget.id.split('-').pop();
  let moduleId = e.currentTarget.id.split('-')[e.currentTarget.id.split('-').length - 2];
  $('#videolesson-file-' + moduleId + '-' + lessonId).click();
  $(document).on('change', '#videolesson-file-' + moduleId + '-' + lessonId, function (e) {
    if (e.handled !== true) {
      e.handled = true;
      // Code starts here
      let url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/admin/programs/getUploadingSignedURL';
      let video = ($('#' + e.currentTarget.id)[0].files[0]);
      $('#videoLesson-' + moduleId + '-' + lessonId).hide();
      $('#videolesson-file-' + moduleId + '-' + lessonId).after(videoUploading(moduleId,lessonId));
      $.post(url, (data, status) => {
        let requestObject;
        if (window.XMLHttpRequest) {
          // code for modern browsers
          requestObject = new XMLHttpRequest();
        } else {
          // code for old IE browsers
          requestObject = new ActiveXObject("Microsoft.XMLHTTP");
        }
        requestObject.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log(requestObject.response);
            // document.getElementById("demo").innerHTML = requestObject.responseText;
          }
        };
        requestObject.upload.addEventListener("progress", (event) => {
          // var progressBar = document.getElementById("progressBar");  
          //  var percentageDiv = document.getElementById("percentageCalc");  
          if (event.lengthComputable) {
            $('#uploadingPercentage').html(Math.round(event.loaded / event.total * 100)+'%');
            //  progressBar.max = event.total;  
            //  progressBar.value = event.loaded;  
            //  percentageDiv.innerHTML = Math.round(event.loaded / event.total * 100) + "%";  
          }
        }, false);
        requestObject.upload.addEventListener('load',(event)=>{
          $('#video-uploading-' + moduleId + '-' + lessonId).hide();
          $('#videolesson-file-' + moduleId + '-' + lessonId).after(videoUploaded(sanitizeURL(data)));
          updateCourse();
        });
        requestObject.open("PUT", data, true);
        requestObject.send(video);
      });
      return;
    }
  });
}
});

$('.create-new-category').click(function () {
  $('.no-existing-category').hide();
});
$('.existing-course-category').click(function () {
  $('.no-existing-category').show();
});

$('.save-pre-course-button').click(function () {
  updateCourse();
  // savechanges();
});
function sanitizeURL(url)
{
  var arraySplited = url.split('?');
  return arraySplited[0];
}

function updateCourse() {
  
  var modules = [];
  let totalModules = $('.module-stepwrapper').length;

  for (var i = 0; i < totalModules; i++) {
    let moduleTitle = $('#module-' + i).find('[name="module-title"]').last().val();
    let moduleDescription = $('#module-' + i).find('[name="module-description"]').last().val();
    let moduleID = $('#module-' + i).find('[name="moduleId"]').last().val();
    modules.push({
      moduleTitle:moduleTitle,
      moduleDescription:moduleDescription,
      moduleID:moduleID
    });
    modules[i]['lessons']=[];
    for (var j = 0; j < $('#module-' + i).find('.video-lesson-step-wrapper').length; j++) {
      let lessonId = $('#video-lesson-' + i + '-' + j).find('[name="lessonId"]').last().val();
      let lessonTitle = $('#video-lesson-' + i + '-' + j).find('[name="lesson-title"]').last().val();
      let lessonDescription = $('#video-lesson-' + i + '-' + j).find('[name="lesson-description"]').last().val();
      let videoURL = $('#video-lesson-' + i + '-' + j).find('[name="videoURL"]').last().val();
      modules[i]['lessons'].push(JSON.stringify({
        lessonId:lessonId,
        lessonTitle:lessonTitle,
        lessonDescription:lessonDescription,
        videoUrl:videoURL
      }));
      for (let k = 0; k; k++) {
        let anotherVideoDescription = $('#another-video--' + i + '-' + j+'-'+k).find('.videoDescription').last().val();
        modules[i]['lessons'][k]['anotherVideoDescription'] = anotherVideoDescription;
      }
    }
  }

  var data = {
    courseTitle: $('[name="courseTitle"]').val(),
    courseDescription: $('[name="courseDescription"]').val(),
    coursePrice: $('[name="coursePrice"]').val(),
    courseExpiryDate: $('[name="courseExpiryDate"]').val(),
    courseFeeCustomUnit: $('[name="courseFeeCustomUnit"]').val(),
    feeCollectionPeriod: $('[name="collectionPeriod"]').val(),
    courseFeeCustomPeriod: $('[name="courseFeeCustomPeriod"]').val(),
    courseThumbnail: $('.upload-course-thumbnail-button-wrapper').find('img').attr('src'),
    courseCategory: '',
    courseType: 'preRecordedCourse',
    isPaid: $('.isPaid').val(),
    status: $('.status').val(),
    feeDetails: {
      price: $('[name="coursePrice"]').val(),
      currency: $('[name="currency"]').val()
    },
    modules:modules,
    collectionDuration: null,
    collectionDurationUnit: ''
  };
  console.log(data);
  console.log(modules);

  let courseID = window.location.href.split('/').pop();
  let url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/admin/programs/edit/savePreRecordedCourse/' + courseID;
  $.ajaxSetup({
    headers:{
       'Content-Type': "application/json"
    }
 });
  $.post(url, data = JSON.stringify(data), (data, status) => {
  });

}


//course 
//website
//appointment
//resourceLibrary

