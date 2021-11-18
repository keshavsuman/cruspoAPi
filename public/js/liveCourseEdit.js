  // let date = new Date;
  // aryIannaTimeZones.forEach((timeZone) => {
  //     $('.select-time-zone').append('<option value="'+timeZone+'">'+timeZone+'</option>')
  //   // let strTime = date.toLocaleString("en-US", {
  //   //   timeZone: `${timeZone}`
  //   // });
  //   // console.log(timeZone, strTime);
  // });

  $('.add-batch-time').click(function(e){
    $('input[name="addBatchId"]').val(e.currentTarget.id);
  })

  $('.create-new-category').click(function () {
    $('.no-existing-category').hide();
  });
  $('.existing-course-category').click(function () {
    $('.no-existing-category').show();
  });

  $(document).ready(function () {
    let isPaid = $('.isPaid').val();
    $('.add-batch-time-form-wrapper').hide();
    if (isPaid == 'true') {
      $('.yes').trigger('click');
    }
  });
  
  $(document).ready(function (){
    let feeCollectionPeriod = $('.feeCollectionPeriodValue').val();
    $('input[name="feeCollectionPeriod"]').each((index,radioButton)=>{
      if(radioButton.value==feeCollectionPeriod)
      {
        radioButton.click();
      }
    });
  });

//   $(document).ready(function(){
//       $('#editLiveCourse').attr('method','post');
//       $('#editLiveCourse').attr('action','/admin/courses/edit/live/'+window.location.href.split('/').pop());
//   });
  $('.save-pre-course-button').click(function(){
    var courseTitle = document.getElementsByName('courseTitle')[0].value;
    var courseDescription = document.getElementsByName('courseDescription')[0].value;
    var courseCategory = document.getElementsByName('courseCategory')[0].value;
    // var courseSubCategory = document.getElementsByName('courseCategory-2')[0].value;
    var price = document.getElementsByName('price')[0].value;
    var currency = document.getElementsByName('currency')[0].value;
    var courseFeeCollectionPeriod = document.querySelector('input[name="feeCollectionPeriod"]:checked');
    var isPaid = document.querySelector('input[name="paidCourse"]:checked');     
    var courseValidTill = document.getElementsByName('courseExpiryDate')[0].value;
    var durationOfLiveCourse =document.getElementsByName('durationUnitValue')[0].value;
    var durationUnit = document.getElementsByName('durationUnit')[0].value;
    var courseFeeCustomPeriod = document.getElementsByName('courseFeeCustomPeriod')[0].value;
    var courseFeeCustomDropdown = document.getElementsByName('courseFeeCustomDropdown')[0].value;
    if(courseFeeCollectionPeriod){
      var body = {
        status:'PUBLISHED',
        courseTitle:courseTitle,
        courseDescription:courseDescription,
        courseCategory:courseCategory,
        // courseSubCategory:courseSubCategory,
        isPaid:isPaid.value,
        duration:{
          durationValue:durationOfLiveCourse,
          durationUnit:durationUnit
        },
        feeDetails:{
          price:price,
          currency:currency,
          collectionDuration:courseFeeCustomPeriod,  
          collectionDurationUnit:courseFeeCustomDropdown,
          feeCollectionPeriod:courseFeeCollectionPeriod.value
        },
        courseValidTill:courseValidTill,
      }
    }
  var url = window.location.origin+'/api/admin/program/updateCourse/'+window.location.href.split('/').pop();
    axios.patch(url,body).then((response)=>{
      if(response.status==201){
        location.reload();
      }else{
        console.log(response.data);
      }
    }).catch((error)=>{
      console.log(error.message);
    });
  });

$(document).on('click', '.edit-batch-button', function(event){
  var batchId = event.currentTarget.id
  document.getElementsByName('batchId')[0].value = batchId;
  $('#wrapper'+batchId).find('.batch-title').html();
  $('.edit-batch-form').find('#Batch-Name-2').attr('value',$('#wrapper'+batchId).find('.batch-title').html());
  $('.edit-batch-form').find('#Batch-Description-2').val($('#wrapper'+batchId).find('.batch-description').html());
});

$(document).on('click','.delete-batch',function (e){
  $('input[name="deleteBatchId"]').val(e.currentTarget.id);
});

$(document).on('click','.delete.yes',function (e){
  var batchId = document.getElementsByName('deleteBatchId')[0].value;
  var url = window.location.origin+'/api/admin/program/'+window.location.href.split('/').pop().replace('#','')+'/deleteBatch/'+batchId;
  axios.delete(url).then((response)=>{
    if(response.status==201)
    {
      location.reload();
    }
  }).catch((error)=>{
    console.log(error.message);
  });
});
$(document).on('click','.save-batch-form-button',function(){
  var batchId = $('.edit-batch-form').find('[name="batchId"]').val();
  if(batchId){
    var url = window.location.origin+'/api/admin/program/'+window.location.href.split('/').pop()+'/updateBatch/'+batchId;
    axios.patch(url,{
      batchTitle:$('.edit-batch-form').find('#Batch-Name-2').val(),
      batchDescription:$('.edit-batch-form').find('#Batch-Description-2').val()
    }).then((response)=>{
      if(response.status==201)
      {
        location.reload();
      }
    }).catch((error)=>{
      console.log(error);
    });
  } 
});

document.getElementsByClassName("create-batch-form-button")[0].onclick = async function (){
  
  var batchName = document.getElementsByName("Batch-Name")[0].value;
  var batchDescription = document.getElementsByName("Batch-Description")[0].value;

  if(batchName){
    
  }else if (batchDescription){

  }

  var url = window.location.origin+'/api/admin/program/'+window.location.href.split('/').pop().replace('#','')+'/createBatch';

  var body = {
        batchTitle: batchName,
        batchDescription: batchDescription
    } 

      axios({
          method: 'post',
          url: url,
          data: body
      })
      .then(function (response) {
          if(response.status==201){
            window.location.reload();
          }else{
          console.log(response.data);
          }
      })
      .catch(function (error) {
          console.log(error);
      });

}

$(document).on('click','.schedule-session-button',function(){
  var customRepetationArray = [];
  var batchId = document.getElementsByName('addBatchId')[0].value;
  var timingTitle = document.getElementsByName('sessionTitle')[0].value;
  var startDate = document.getElementsByName('startDate')[0].value;
  var startTime = document.getElementsByName('startTime')[0].value;
  var timeZone  = document.getElementsByName('timeZone')[0].value;
  var durationhours = document.getElementsByName('durationhours')[0].value;
  var durationminutes = document.getElementsByName('durationminutes')[0].value;

  var body ={
    timingTitle:timingTitle,
    startDate:startDate,
    startTime:startTime,
    timeZone:timeZone,
    durationhours:durationhours,
    durationminutes:durationminutes,
  }
  var url = window.location.origin+"/api/admin/program/"+window.location.href.split('/').pop().replace('#','')+'/updateBatch/'+batchId;
  axios.patch(url,body).then((response)=>{
    if(response.status==201)
    {
      location.reload();
    }
  }).catch((error)=>{
    console.log(error)
  });
  console.log(body);
});