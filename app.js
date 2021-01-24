$(document).ready(function() {
	$(window).keydown(function(event){
	  if(event.keyCode == 13) {
		event.preventDefault();
		return false;
	  }
	});
  });


/*gibbrish function*/
const detect= (s)=>{
	let onlyvowels = !(/[^aeiou]/).test(s)	
	return onlyvowels
}


//the image switcher

const images = document.querySelectorAll('.img');
const mainimage = document.querySelector('.mainimage');


images.forEach(e => {
    e.onclick = ()=>{
        let img = e.getAttribute('img-data')
        mainimage.src = img
    }
    
});
for (var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    });
  }



/*tabs*/
const labels = document.querySelectorAll(".accordion-item__label");
const tabs = document.querySelectorAll(".accordion-tab");

function toggleShow() {
	const target = this;
	const item = target.classList.contains("accordion-tab")
		? target
		: target.parentElement;
	const group = item.dataset.actabGroup;
	const id = item.dataset.actabId;

	tabs.forEach(function(tab) {
		if (tab.dataset.actabGroup === group) {
			if (tab.dataset.actabId === id) {
				tab.classList.add("accordion-active");
			} else {
				tab.classList.remove("accordion-active");
			}
		}
	});

	labels.forEach(function(label) {
		const tabItem = label.parentElement;

		if (tabItem.dataset.actabGroup === group) {
			if (tabItem.dataset.actabId === id) {
				tabItem.classList.add("accordion-active");
			} else {
				tabItem.classList.remove("accordion-active");
			}
		}
	});
}

labels.forEach(function(label) {
	label.addEventListener("click", toggleShow);
});

tabs.forEach(function(tab) {
	tab.addEventListener("click", toggleShow);
});




//submit data
const submit = $('#submit')
const form = document.querySelector('form');
const offer = $('#offer')
const nameinput = $('#name')
const phone = $('#phone')
const email = $('#email')
const checkinputname = $('i#checkinputname')
const checkinputphone = $('i#checkinputphone')
const checkinputemail = $('i#checkinputemail')
let checkname, checkemail, checkphone, checkoffer= false




/*offer input*/

offer.on('input', e=>{
	val = e.target.value
	if (val != '0'){
		offer.css('border', '3px solid green')
		checkoffer = true
	}else {
		offer.css('border', '3px solid red')
		checkoffer = false	
	}
})

/*end offer*/

/*name input*/
nameinput.on('input', e=>{
	v = e.target.value
	
	/*console.log(gibberish.detect(v.split(' ')[0]), gibberish.detect(v.split(' ')[1]))*/
	split = v.split(' ')
	if (v.length>3 && v.split(' ').length >= 2 && split[1].length>=3 && !detect(split[1]) && !detect(split[0])){
		checkinputname.removeClass('fa-spinner fa-spin')
		checkinputname.addClass('fa-check-circle')
		checkinputname.css('color', 'green')
		checkinputname.prev().css('border-color','green')
		checkname = true
		
	}
	else {
		checkinputname.addClass('fa-spinner fa-spin')
		checkinputname.prev().css('border-color','red')
		checkinputname.css('color', 'red')
		checkname = false
		

	}
})




/*end name input*/

/*phone input*/
function onlyNumberKey(evt) { 
          
	// Only ASCII charactar in that range allowed 
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
	if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
		return false; 
	return true; 
} 

phone.on('input', e=>{
	v = e.target.value
	if ((v.slice(0, 2) == '06' || v.slice(0, 2) == '07') && v.length == 10){
		checkinputphone.removeClass('fa-spinner fa-spin')
		checkinputphone.addClass('fa-check-circle')
		checkinputphone.css('color', 'green')
		checkinputphone.prev().css('border-color','green')
		checkphone = true
	}
	else {
		checkinputphone.addClass('fa-spinner fa-spin')
		checkinputphone.prev().css('border-color','red')
		checkinputphone.css('color', 'red')
		checkphone = false
		

	}
})
/*end phone input*/

/*email input*/
email.on('input', e=>{
	val = e.target.value
	var re = /.+@(gmail|yahoo|outlook|)\.com$/;
    if (re.test(val)){
		checkinputemail.removeClass('fa-spinner fa-spin')
		checkinputemail.addClass('fa-check-circle')
		checkinputemail.css('color', 'green')
		checkinputemail.prev().css('border-color','green')
		checkemail = true
	}
	else {
		checkinputemail.addClass('fa-spinner fa-spin')
		checkinputemail.prev().css('border-color','red')
		checkinputemail.css('color', 'red')
		checkemail = false
		

	}
})

/*end email input*/


form.addEventListener('input', e=>{
	
	if (checkname && checkphone && checkemail &&checkoffer){
	submit.removeAttr('disabled')
	submit.css({
		'background': '#CF052D',
		'color': 'white'
	})
} else{
	submit.attr('disabled', 'true')
	submit.css({
		'background': 'black',
		'color': 'gray'
	})
}
})

nameinput.on('change', (e=>{
	let v = e.target.value
	sessionStorage.setItem('name', v)
}))




const scriptURL = 'https://script.google.com/macros/s/AKfycbwudXGTJIEOMpxAVR1-L1Qf2u27kf6-gO6kE4xhF66xxG3TMB-Cg8b1/exec'

submit.on('click', e=>{
	thespan = submit.children();
	thespan.addClass('fa fa-spinner fa-spin')
	
	fetch(scriptURL, { method: 'POST', body: new FormData(form)})
	
		.then(res => 
			
			setTimeout(
				form.submit(),
				form.reset()					
			,7000),
		)
		
		.catch(error => console.error('Error!', error.message))	

})








// const scriptURL = 'https://script.google.com/macros/s/AKfycbwudXGTJIEOMpxAVR1-L1Qf2u27kf6-gO6kE4xhF66xxG3TMB-Cg8b1/exec'
// form.addEventListener('submit', e => {

// fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    
//     .then(response => console.log('Success!', response))
//     .catch(error => console.error('Error!', error.message))
// })


//the countdown

const countdown = document.querySelector('.countdown')
// const days = document.querySelector('.days')
// const hours = document.querySelector('.hours')
// const minutes = document.querySelector('.minutes')
// const seconds = document.querySelector('.seconds')
const second = 1000,
minute = second * 60,
hour = minute * 60,
day = hour * 24;
let final = "Jan 15, 2021 01:00:00",
countDown = new Date(final).getTime(),
x = setInterval(function() {    

  	let now = new Date().getTime(),
	distance = countDown - now;
	countdown.innerHTML = (`
	<div>${Math.floor(distance / (day))}<span>DAYS</span></div>
	<div>${Math.floor((distance % (day)) / (hour))} <span>HOURS</span></div>
	<div>${Math.floor((distance % (hour)) / (minute))} <span>MINUTES</span></div>
	<div>${Math.floor((distance % (minute)) / second)} <span>SECONDS</span></div>
	`)

  	// days.innerText = Math.floor(distance / (day)),
	// hours.innerText = Math.floor((distance % (day)) / (hour)),
	// minutes.innerText = Math.floor((distance % (hour)) / (minute)),
	// seconds.innerText = Math.floor((distance % (minute)) / second)
})

//pay

let price = parseFloat($('#price').text())

//qtty

const value = $('.value')
const plus = $('.plus')
const minus = $('.minus')
const total = $('.totalprice')
const discount = $('.discountprice')


let currentvalue = parseInt(value.text())
let currentprice = price
total.text(price)


plus.click((e)=>{
	if (currentvalue == 4) return
	currentvalue ++;
	value.text(currentvalue)


	if (currentvalue>2){
		currentprice=price-10
		document.documentElement.style
    .setProperty('--colorsign', '#9cef9c');
	}else{
		currentprice=price
		document.documentElement.style
    .setProperty('--colorsign', 'white');
	}
	/*
	currentvalue>2?currentprice=price-10:currentprice=price
	*/
	currentvalue >= 3?discount.text('10-'):discount.text('')

	currentvalue >1? minus.removeAttr('disabled'): minus.attr('disabled')
	total.text(currentprice*currentvalue)
})
minus.click((e)=>{
	if (currentvalue == 2){
		minus.attr('disabled', true); 
	}
	currentvalue --;
	value.text(currentvalue)

	if (currentvalue>2){
		currentprice=price-10
		document.documentElement.style
    .setProperty('--colorsign', '#9cef9c');
	}else{
		currentprice=price
		document.documentElement.style
    .setProperty('--colorsign', 'white');
	}
	
	currentvalue >= 3?discount.text('10-'):discount.text('')

	total.text(currentprice*currentvalue)
})





