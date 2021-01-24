const thanks = $('#thanks') 
thanks.html(`
    
<div class="thanksholder">
    <h1>شكرا <br>${sessionStorage.getItem('name')}</H1>

    <div class='icons'>
    <P>طلبيتك في طور المعالجة .. سنتصل بك في أقرب وقت</P>
    </div>
    </div>

    
    
    
`)