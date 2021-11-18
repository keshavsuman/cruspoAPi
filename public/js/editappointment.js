const MonthList = ['January','Feburary','March','April','May','June','July','August','September','Octomber','November','December'];
const daysList = ['Monday','Tuesday','Wednesday','Thrusday','Friday','saturday','sunday'];

var isAppliedToAllDays = false;

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

$('.save-edit-appointment-button').on('click',async function(){

    var appointmentTitle= $('[name="appointmentTitle"]').val();
    var appointmentDescription= $('[name="appointmentDescription"]').val();
    var currency= $('[name="currency"]').val();
    var appointmentPrice = $('[name="appointmentPrice"]').val();
    var hoursValue = $('[name="hoursValue"]').val();
    var minsValue = $('[name="minsValue"]').val();
    var timeZone = $('[name="timeZone"]').val();
    var appointmentThumbnail = $('.upload-appointment-thumbnail-button-wrapper').find('img').attr('src');

    var data={
      'appointmentId':window.location.pathname.split('/').pop(),
      'appointmentTitle':appointmentTitle,
      'appointmentDescription':appointmentDescription,
      'appointmentPrice':appointmentPrice,
      'appointmentThumbnail':appointmentThumbnail,
      'currency':currency,
      'hoursValue':hoursValue,
      'minsValue':minsValue,
      'timeZone':timeZone
    }
    const url  = window.location.origin+'/admin/appointment/edit/save/'+window.location.pathname.split('/').pop();
    var response  = await fetch(url,{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(await response.text());
});

 
$(document).ready(function() {
      initCalendar();
      $('.select-appointment-month').change(function(e){
        reDrawCalendar($('.select-appointment-month').val(),$('.select-appointment-year').val());
      });
});

$('.next-appointment-button').click(function(){
  $('#email-form').submit();
});

function initCalendar(date = new Date()){

  $('.select-appointment-month').children().remove();
  $('.select-appointment-year').children().remove();

  let dateHTML = (date,description) => `<div data-w-id="cb30ad1e-c524-7b14-23cf-7295ee4bcd23" class="appointment-date">
          <div class="appointment-date-text">${date}</div>
          <div class="appointment-time-text" id="description-${date}">${description}</div>
        </div>`;

  let monthOptionHTML =(month,selected)=> `<option value="${month}" ${selected!=null?selected:''}>${month}</option>`;
      MonthList.forEach(month=>{
        if(month==MonthList[date.getMonth()])
        {
          $('.select-appointment-month').append(monthOptionHTML(month,'selected'));
        }else{
          $('.select-appointment-month').append(monthOptionHTML(month,null));
        }
      });
      for (var i=0;i<5;i++)
      {
          var year = date.getFullYear()+i;
          $('.select-appointment-year').append('<option value="'+year+'" >'+year+'</option>')
      }
      function monthDays(){
        var d= new Date(date.getFullYear(), date.getMonth()+1, 0);
        return d.getDate();
      }
    var lastDateInTheMonth= new Date(date.getFullYear(), date.getMonth(), 1);

    for(var i=0;i<lastDateInTheMonth.getDay();i++)
    { 
      $('.appointment-date-wrapper').append(dateHTML('',''));
    }

    for(var i=1;i<=monthDays();i++)
    {
      $('.appointment-date-wrapper').append(dateHTML(i,'Not available'));
    }
}



function reDrawCalendar(month,year){

  var daysRow = `<div class="appointment-calendar-day">
          <div>SUN</div>
        </div>
        <div class="appointment-calendar-day monday">
          <div>MON</div>
        </div>
        <div class="appointment-calendar-day tuesday">
          <div>TUE</div>
        </div>
        <div class="appointment-calendar-day wednesday">
          <div>WED</div>
        </div>
        <div class="appointment-calendar-day thursday">
          <div>THU</div>
        </div>
        <div class="appointment-calendar-day friday">
          <div>FRI</div>
        </div>
        <div class="appointment-calendar-day saturday">
          <div>SAT</div>
        </div>`;
  $('.appointment-date-wrapper').children().remove();
  $('.appointment-date-wrapper').append(daysRow);
  initCalendar(new Date(year,MonthList.indexOf(month)));
}

$('.add-appointment-time-button-wrapper').on('click',()=>{
  addTimeSlot();
});

$('.appointment-calendar-next-button').click(function(){
  console.log('next button');
});

$('.appointment-calendar-previous-button').click(function(){
  console.log('previous button');
});

$(document).on('click','.appointment-delete-button-wrapper',(e)=>{
  $(e.currentTarget).parent().remove();
});

$(document).on('click', '.appointment-date', (e) => {

  var clickedDate = $(e.currentTarget).find('.appointment-date-text').html();
  var selectedMonth = $('.select-appointment-month').val();
  var selectedYear = $('.select-appointment-year').val();
  var date = new Date(selectedYear,MonthList.indexOf(selectedMonth),clickedDate);
  $('[name="clickedDate"]').attr('value',date.toString());
  if(clickedDate!=''){
    $('#hiddenHelper').click();
    $('.appointment-apply-day-wrapper').html(daysList[date.getDay()]);
    if($('.appointment-time').find('.appointment-time-form-wrapper').length==0)
    {
      addTimeSlot();
    }
    $('.appointment-time-box').show();
  }
});

$('#apply').click(()=>{
  
  var timeSlots = new Map();
  var startTimeSlotList = $('.appointment-time').children().find('.from-wrapper');
  var endTimeSlotList = $('.appointment-time').children().find('.end-wrapper'); 
  var selectedDate = $('[name="clickedDate"]').val();
  var d= new Date(selectedDate);
  console.log(selectedDate);
  console.log(d.getDate());

  for(var i=0;i<startTimeSlotList.length;i++)
  {
    timeSlots.set(i,{
      'startTime':$(startTimeSlotList[i]).find('input').val(),
      'endTime':$(endTimeSlotList[i]).find('input').val()
    });
  }
  // console.log(timeSlots);
  if(validate(timeSlots))
  {
    for(i=1;i<=d.getDate();i++)
    {
      if(i==d.getDate()){
        var time='';
        timeSlots.forEach((value,key)=>{
          time= time+ value['startTime']+'-'+value['endTime']+'<br>';
        });
        $('#description-'+i).html(time);
      }
    }
  }
});


$('#applyTo').click(()=>{
  
  var timeSlots = new Map();
  var startTimeSlotList = $('.appointment-time').children().find('.from-wrapper');
  var endTimeSlotList = $('.appointment-time').children().find('.end-wrapper'); 
  for(var i=0;i<startTimeSlotList.length;i++)
  {
    timeSlots.set(i,{
      'startTime':$(startTimeSlotList[i]).find('input').val(),
      'endTime':$(endTimeSlotList[i]).find('input').val()
    });
  }
  // console.log(timeSlots);
  if(validate(timeSlots)){
    var selectedMonth = $('.select-appointment-month').val();
    var selectedYear = $('.select-appointment-year').val();
    var d= new Date(selectedYear,MonthList.indexOf(selectedMonth)+1, 0);
    
    for(i=1;i<=d.getDate();i++)
    {
      if(d.getDay())
      {
        var time='';
        timeSlots.forEach((value,key)=>{
          time= time+ value['startTime']+'-'+value['endTime']+'<br>';
        });
        $('#description-'+i).html(time);
      }
    }
    // console.log(timeSlots);
  }
});

$('#applyToAllDays').click(()=>{

  var timeSlots = new Map();

  var startTimeSlotList = $('.appointment-time').children().find('.from-wrapper');
  var endTimeSlotList = $('.appointment-time').children().find('.end-wrapper'); 
  for(var i=0;i<startTimeSlotList.length;i++)
  {
    timeSlots.set(i,{
      'startTime':$(startTimeSlotList[i]).find('input').val(),
      'endTime':$(endTimeSlotList[i]).find('input').val()
    });
  }
  if(validate(timeSlots))
  {
    var selectedMonth = $('.select-appointment-month').val();
    var selectedYear = $('.select-appointment-year').val();
    var d= new Date(selectedYear,MonthList.indexOf(selectedMonth)+1, 0);
  
  // console.log(d.getDate());
  
  for(i=1;i<=d.getDate();i++)
  {
    var time='';
    timeSlots.forEach((value,key)=>{
      time= time+ value['startTime']+'-'+value['endTime']+'<br>';
    });
    $('#description-'+i).html(time);
  }
}
});

function addTimeSlot(){

  var buttonTemplate =`<div class="appointment-time-form-wrapper">
  <div class="appointment-time-form-block w-form">
    <form data-name="Email Form 3" class="appointment-time-form">
      <div class="from-wrapper">
        <input type="time" class="end-time w-select" >
        <!-- <select id="startTime" name="startTime" data-name="startTime" class="start-time w-select">
          <option value="">Select one.</option>
          <option value="First">First Choice</option>
          <option value="Second">Second Choice</option>
          <option value="Third">Third Choice</option>
        </select>
        <div class="colon-wrapper">
          <div class="colon"></div>
          <div class="colon"></div>
        </div><select id="startTimeMin" name="startTimeMin" data-name="startTimeMin"  class="start-time w-select">
          <option value="">Select one.</option>
          <option value="First">First Choice</option>
          <option value="Second">Second Choice</option>
          <option value="Third">Third Choice</option>
        </select><select id="Time-AM-PM-2" name="Time-AM-PM" data-name="Time AM PM" class="time-am-pm w-select">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select> -->
      </div>
      <div class="div-block-25"></div>

      <div class="end-wrapper">
        <input type="time" class="end-time w-select" >

        <!-- <select id="endTime" name="endTime" data-name="endTime"  class="start-time w-select">
          <option value="">Select one.</option>
          <option value="First">First Choice</option>
          <option value="Second">Second Choice</option>
          <option value="Third">Third Choice</option>
        </select>
        <div class="colon-wrapper">
          <div class="colon"></div>
          <div class="colon"></div>
        </div><select id="endTimeMin" name="endTimeMin" data-name="endTimeMin"  class="start-time w-select">
          <option value="">Select one.</option>
          <option value="First">First Choice</option>
          <option value="Second">Second Choice</option>
          <option value="Third">Third Choice</option>
        </select><select id="Time-AM-PM-3" name="Time-AM-PM-3" data-name="Time AM PM 3"  class="time-am-pm w-select">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select> -->
      </div>
    </form>
  </div>
  <div data-w-id="ddb8034a-176d-b08f-d741-0b793a8a94bc" class="appointment-delete-button-wrapper"><img src="/images/delete.svg" loading="lazy" alt=""></div>
</div>
`;
$('.appointment-time').append(buttonTemplate);
}

function getValues()
{
  var appointmentTitle= $('[name="appointmentTitle"]').val();
    var appointmentDescription= $('[name="appointmentDescription"]').val();
    var currency= $('[name="currency"]').val();
    var appointmentPrice = $('[name="appointmentPrice"]').val();
    var hoursValue = $('[name="hoursValue"]').val();
    var minsValue = $('[name="minsValue"]').val();
    var timeZone = $('[name="timeZone"]').val();
    var appointmentThumbnail = $('.upload-appointment-thumbnail-button-wrapper').find('img').attr('src');

    var data={
      'appointmentId':window.location.pathname.split('/').pop(),
      'appointmentTitle':appointmentTitle,
      'appointmentDescription':appointmentDescription,
      'appointmentPrice':appointmentPrice,
      'appointmentThumbnail':appointmentThumbnail,
      'currency':currency,
      'hoursValue':hoursValue,
      'minsValue':minsValue,
      'timeZone':timeZone
    }
    return data;
}

function validate(timeSlots){
  console.log(timeSlots);
  isValid=false;
  timeSlots.forEach((value,key)=>{
    if(value['startTime']!='' && value['endTime'])
    {
      isValid=true;
    }else{
      isValid=false;
    } 
  });
  if(isValid)
  {
    $('.error').html('');  
  }else{
    $('.error').html('Please select valid time duration');
  }
  return isValid;
}

function isCorrectFormat(startTime,endTime)
{
  console.log(isValid);
}

