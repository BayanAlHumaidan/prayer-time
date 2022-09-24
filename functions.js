const queryBtn = document.getElementById("queryBtn");
queryBtn.addEventListener('click', getData);

const today = new Date;
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();


async function getData(e) {
  e.preventDefault();

  const city = document.getElementById("cityName").value;
  console.log(city);
  const aURL = "https://api.aladhan.com/v1/calendarByCity?city=" + city + "&country=sa&year=" + year + "&month=" + month;

  if ($("li")) clear();

  await fetch(aURL).then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      setPrayerTime(data, city);
        });
}

function setPrayerTime(data, city) {
  if (data.code === 200) {

    setDate(data);

    document.getElementById("cardTitle").innerHTML = "مواقيت الصلاة لمدينة " + city;

    const fajerTime = data.data[day].timings.Fajr.slice(0,5);
    const eshragTime = data.data[day].timings.Sunrise.slice(0,5);
    const duhurTime = data.data[day].timings.Dhuhr.slice(0,5);
    const asrTime = data.data[day].timings.Asr.slice(0,5);
    const maghribTime = data.data[day].timings.Maghrib.slice(0,5);
    const ishaTime = data.data[day].timings.Isha.slice(0,5);

    const fajerPrayer = document.createElement("li");
    fajerPrayer.classList.add("list-group-item",);
    fajerPrayer.setAttribute("id","fajer");
    fajerPrayer.innerHTML = "الفجر: " + formatTime(fajerTime).toArabicDigits();
    document.getElementById("prayer-list").appendChild(fajerPrayer);

    const eshragPrayer = document.createElement("li");
    eshragPrayer.classList.add("list-group-item");
    eshragPrayer.setAttribute("id","eshraq");
    eshragPrayer.innerHTML = "الاشراق: " + formatTime(eshragTime).toArabicDigits();
    document.getElementById("prayer-list").appendChild(eshragPrayer);

    const duhurPrayer = document.createElement("li");
    duhurPrayer.classList.add("list-group-item");
    duhurPrayer.setAttribute("id","duhur");
    duhurPrayer.innerHTML = "الظهر: " + formatTime(duhurTime).toArabicDigits();
    document.getElementById("prayer-list").appendChild(duhurPrayer);

    const asrPrayer = document.createElement("li");
    asrPrayer.classList.add("list-group-item");
    asrPrayer.setAttribute("id","asr");
    asrPrayer.innerHTML = "العصر: " + formatTime(asrTime).toArabicDigits();
    document.getElementById("prayer-list").appendChild(asrPrayer);

    const maghribPrayer = document.createElement("li");
    maghribPrayer.classList.add("list-group-item");
    maghribPrayer.setAttribute("id","maghrib");
    maghribPrayer.innerHTML = "المغرب: " + formatTime(maghribTime).toArabicDigits();
    document.getElementById("prayer-list").appendChild(maghribPrayer);

    const ishaPrayer = document.createElement("li");
    ishaPrayer.classList.add("list-group-item");
    fajerPrayer.setAttribute("id","isha");
    ishaPrayer.innerHTML = "العشاء: " + formatTime(ishaTime).toArabicDigits();
    document.getElementById("prayer-list").appendChild(ishaPrayer);

    setNextPrayer(fajerTime,eshragTime,duhurTime,asrTime,maghribTime,ishaTime);

  } else alert("الرجاد ادخال اسم صحيح للمدينة.")

}

function clear() {

  var e = document.querySelector("ul");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  // document.querySelector("dateHeader").remove();
  // $("dateHeader").remove();

}

function setDate(data) {
  if (document.body.contains(document.getElementById('dateHeader'))) return;
  else {
    const dateHeader = document.createElement("div");
    dateHeader.classList.add("card-header");
    dateHeader.setAttribute("id", "dateHeader");
    var arDay =  data.data[day].date.hijri.weekday.ar;
    var hijri =data.data[day].date.hijri.day.toArabicDigits()+" / "+data.data[0].date.hijri.month.ar+" / "+data.data[0].date.hijri.year.toArabicDigits();
  //  var date =
    dateHeader.innerHTML = arDay +"\n"+hijri;
    $(dateHeader).insertAfter(document.getElementById("card-header"));
  }
}

function setNextPrayer(fajerTime,eshragTime,duhurTime,asrTime,maghribTime,ishaTime){

  var currentTime = today.getHours() +":"+today.getMinutes();
  console.log(currentTime);
  var nextPrayer;

  if(currentTime<=fajerTime) nextPrayer = "fajr";
  else if(currentTime<=eshragTime) nextPrayer = "eshrag";
  else if(currentTime<=duhurTime) nextPrayer = "duhur";
  else if(currentTime<=asrTime) nextPrayer = "asr";
  else if(currentTime<=maghribTime) nextPrayer = "maghrib";
  else nextPrayer = "isha";

  console.log(nextPrayer);
  document.getElementById(nextPrayer).classList.add("nextPrayer");

}


String.prototype.toArabicDigits= function(){
 var id= ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']
 return this.replace(/[0-9]/g, function(w){
  return id[+w]
 });
}

function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " صباحًا" : " مساءً" );
}
