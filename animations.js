var speed = 1000;
inp_aspeed.addEventListener("input",vis_speed);


function vis_speed(){
	var array_speed = inp_aspeed.value;
	switch(parseInt(array_speed)){
		case 1:
			speed = 1;
			break;
		case 2:
			speed = 10;
			break;
		case 3:
			speed = 100;
			break;
		case 4:
			speed = 1000;
			break;
		case 5:
			speed = 10000;
			break;
	}
	delay_time = 10000/(Math.floor(array_size/10)*speed);
}

var delay_time = 10000/(Math.floor(array_size/10)*speed);

var c_delay = 0;

function div_update(cont,height,color){
	window.setTimeout(function () {
        cont.style = "margin:0%" + margin_size + "%; width:" + (100 / array_size) + "%; height:" + height + "%; background-color:" + color + ";";
        // Update the number text
        const span = cont.querySelector('span');
        if (span) {
            span.textContent = height;
        }
    }, c_delay += delay_time);
}

function enable_buttons(){
	window.setTimeout(function(){
		for(var i=0;i<butts_algos.length;i++){
		butts_algos[i].classList = [];
		butts_algos[i].disabled = false;		
	}
	inp_aspeed.disabled = false;
	inp_asize.disabled = false;
	inp_gen.disabled = false;
	stop.style.display = "none";
},c_delay+=delay_time);
}