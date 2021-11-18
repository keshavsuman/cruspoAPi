const MonthList = ['January','Feburary','March','April','May','June','July','August','September','Octomber','November','December'];
const daysList = ['Monday','Tuesday','Wednesday','Thrusday','Friday','saturday','sunday'];


let dateHTML = (date,remark) =>`<div data-w-id="dc847fc4-b550-8912-04cf-dc5f4cd61afc" class="book-appointment-date">
<div class="appointment-date-text">${date}</div>
<div class="appointment-time-text book">${remark}</div>
</div>`;

let date = new Date();
var currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
function monthDays(){
    var d= new Date(date.getFullYear(), date.getMonth()+1, 0);
    return d.getDate();
}
// for(var i=0;i<currentDate.getDay();i++){
//     $('.appointment-date-wrapper').append(dateHTML('',''));
// }
// for(var i=1;i<=monthDays();i++)
// {
//     $('.appointment-date-wrapper').append(dateHTML(i,'NA'));
// }
// for(var i=0;i<currentDate;i++)
// {
//     console.log('fdsg');
//    
// }

$(document).ready(function(){
    initCalendar();
    $('.select-appointment-month').change(function(e){
        reDrawCalendar($('.select-appointment-month').val(),$('.select-appointment-year').val());
    });
    $('.select-appointment-year').change(function(e){
        reDrawCalendar($('.select-appointment-month').val(),$('.select-appointment-year').val());
    })
});

$(document).on('click','.appointment-date',(e)=>{
    $('.book-appointment-time-wrapper').show();
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
        $('.appointment-date-wrapper').append(dateHTML(i,'available'));
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
  
  $('.appointment-calendar-next-button').click(function(){
    console.log('next button');
  });
  
  $('.appointment-calendar-previous-button').click(function(){
    console.log('previous button');
  });