﻿
// Dimitris Gardiklis
var TITLE = "Shadows";
  
function renderEntries(entries) {
    var s = '';
    $.each(entries, function(i, v) {
        s += '<li><data-entryid="'+i+'">' + v.title + '</a></li>';
    });
    $("#linksList").html(s);
    $("#linksList").listview("refresh");	
}
	
$("#mainPage").live("pageinit", function(event) {
var watchID = null;
$('#compass').bind( "change", function(event, ui) {
           if ($('#compass').val()==1) {
   
		navigator.compass.clearWatch(watchID);
		options = { frequency: 200 };
watchID = navigator.compass.watchHeading(onSuccess, onError, options);
		   }
		   else
		   {
		navigator.compass.clearWatch(watchID);
		options = { frequency: 200 };
watchID = navigator.compass.watchHeading(onStartSuccess, onError, options);		   
		   }
       });

   // onSuccess: Get the current heading
   function onStartSuccess(heading) {
   $("#comphead").val(heading.magneticHeading);
    }
   function onSuccess(heading) {
   $("#comphead").val(heading.magneticHeading);
   $("#ar").val($("#comphead").val());
   shfun(); // να το δοκιμάσω
    }
 
   // onError: Failed to get the heading
   function onError(compassError) {
       alert('Compass Error:');
   }


//gps//
function onSuccess1(position) {
$("#lat").val(position.coords.latitude);
$("#lon").val(position.coords.longitude);
shfun();
var options = { frequency: 200 };
watchID = navigator.compass.watchHeading(onStartSuccess, onError, options);
    }
    function onError1(error) {
$("#lat").val(38);
$("#lon").val(23.4);
shfun();
    }
navigator.geolocation.getCurrentPosition(onSuccess1, onError1);
var currentTime = new Date();
$("#month").val(currentTime.getMonth() + 1);
$("#day").val(currentTime.getDate());
$("#hour").val(currentTime.getHours());
var m   = Math;
//Radiation https://github.com/pingswept/pysolar/blob/f09e54e09291a428e7b5f35a72dcc02a9c07438e/radiation.py
// Calculate different kinds of radiation components via default values
	var sin = m.sin,
	    cos = m.cos,
		acos = m.acos;

function rad(degrees)
{
return degrees*m.PI / 180;
}

function deg(radian)
{
return radian* 180 / m.PI;
}

function getAirMassRatio(altitude_deg){	
if(rad(altitude_deg)==0) {return 0;} 
else {return (1/sin(rad(altitude_deg)))};
}

function getApparentExtraterrestrialFlux(day)
{
// from Masters, p. 412
return 1160 + (75 * sin(rad((360/365) * (day - 275))));
}

function getOpticalDepth(day)
{
// from Masters, p. 412
return 0.174 + (0.035 * sin(rad((360./365) * (day - 100))));
}

function get_time_difference(earlierDate,laterDate)
{
       var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
       var oDiff = new Object();
 
       oDiff.days = Math.floor(nTotalDiff/1000/60/60/24);
       nTotalDiff -= oDiff.days*1000*60*60*24;
 
       oDiff.hours = Math.floor(nTotalDiff/1000/60/60);
       nTotalDiff -= oDiff.hours*1000*60*60;
 
       oDiff.minutes = Math.floor(nTotalDiff/1000/60);
       nTotalDiff -= oDiff.minutes*1000*60;
 
       oDiff.seconds = Math.floor(nTotalDiff/1000);
 
       return oDiff;
 
}

function getRadiationDirect(day,altitude_deg)
{
// from Masters, p. 412
if(altitude_deg > 0)
{
var flux = getApparentExtraterrestrialFlux(day);
var optical_depth = getOpticalDepth(day);
var air_mass_ratio = getAirMassRatio(altitude_deg);
return flux * Math.exp(-1 * optical_depth * air_mass_ratio);
}
else
{return 0;}
}

function shfun()
{
var dd = new Date(currentTime.getFullYear(), $("#month").val()-1, $("#day").val(), $("#hour").val(), 0, 0, 0); 
var az1m = SunCalc.getPosition(dd, $("#lat").val(), $("#lon").val()).azimuth * 180 / Math.PI;
var altitud1 = SunCalc.getPosition(dd, $("#lat").val(), $("#lon").val()).altitude * 180 / Math.PI;
$("#azimuth").val(az1m);
$("#altitude").val(altitud1);
deltazim=$("#ar").val()-180-az1m;
shad = $("#ax").val()/m.cos(m.PI / 180*(deltazim))-$("#ay").val()/m.tan(m.PI / 180*altitud1);
if (deltazim <90 && deltazim >-90 && altitud1 >0){
$("#shadow").val(shad);} 
else {$("#shadow").val('0');}
var startyearDate = new Date(currentTime.getFullYear(), 0, 0, 0 , 0, 0, 0); 
var oDiff = get_time_difference(startyearDate, dd);
var day = oDiff.days;
var fluxrads = cos(rad(90-altitud1- (90-deg(acos(cos(rad(90-$("#incl").val()))*cos(rad(az1m-$("#ori1").val()))))) ))*getRadiationDirect(day, altitud1);
if (fluxrads > 0){
$("#flux").val(fluxrads+getRadiationDirect(day, altitud1)*0.15); //getRadiationDirect(day, altitud1)
}
else{
$("#flux").val(getRadiationDirect(day, altitud1)*0.15);
}
}

$('#lat').bind("change",function(){
shfun();});
$('#lon').bind("change",function(){
shfun();});
$('#month').bind("change",function(){
shfun();});
$('#day').bind("change",function(){
shfun();});
$('#hour').bind("change",function(){
shfun();});
$('#ar').bind("change",function(){
shfun();});
$('#ax').bind("change",function(){
shfun();});
$('#ay').bind("change",function(){
shfun();});
$('#incl').bind("change",function(){
shfun();});
$('#ori1').bind("change",function(){
shfun();});

$('#button2').click(function(){
var startyearDate = new Date(currentTime.getFullYear(), 0, 0, 0 , 0, 0, 0); 
entries = [];
var shad="";
var deltazim="";
var i_min=0,i_hour=0,i_day=0,i_month=0;
//for (i_min=0;i_min<=60;i_min++){
for (i_hour=0;i_hour<=23;i_hour++){
for (i_day=21;i_day<=21;i_day++){
for (i_month=1;i_month<=12;i_month++){
{
var dd = new Date(2012, i_month-1, i_day, i_hour, 0, 0, 0); 
var az1m = SunCalc.getPosition(dd, $("#lat").val(), $("#lon").val()).azimuth * 180 / Math.PI;
var altitud1 = SunCalc.getPosition(dd, $("#lat").val(), $("#lon").val()).altitude * 180 / Math.PI;
var times = SunCalc.getTimes(dd, $("#lat").val(), $("#lon").val());
deltazim=$("#ar").val()-180-az1m;
shad = $("#ax").val()/m.cos(m.PI / 180*(deltazim))-$("#ay").val()/m.tan(m.PI / 180*altitud1);
// deltazim εντός πεδίου για να μην απειρίζεται ο παρονομαστής, ώρα εντός της ηλιοφάνειας , σκίαση
var oDiff = get_time_difference(startyearDate, dd);
var day = oDiff.days;
var fluxrads = cos(rad(90-altitud1- (90-deg(acos(cos(rad(90-$("#incl").val()))*cos(rad(az1m-$("#ori1").val()))))) ))*getRadiationDirect(day, altitud1);
if (fluxrads > 0){
var fluxrads1=fluxrads+getRadiationDirect(day, altitud1)*0.15;
}
else{
var fluxrads1=getRadiationDirect(day, altitud1)*0.15;
}
if (deltazim <90 && deltazim >-90 && i_hour < times.sunset.getHours() && i_hour > times.sunrise.getHours() && shad<0)
{
entry = {title:"hour:"+i_hour+", day:"+i_day+", month"+i_month+", shadow length:"+ shad + ", CSGI:" + fluxrads1};entries.push(entry);
}
}}}}
renderEntries(entries);
});
});	
	
