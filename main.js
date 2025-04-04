var inp_asize = document.getElementById('a_size'),array_size = inp_asize.value;
var inp_gen = document.getElementById('a_generate');
var inp_aspeed = document.getElementById('a_speed');
var stop = document.getElementById('reload');

stop.addEventListener('click',reloadPage);


var butts_algos = document.querySelectorAll(".algos button");

var div_sizes = [];
var divs = [];
var margin_size ;
var cont = document.getElementById('array_container');

cont.style = "flex-direction:row";

var info_cont1 = document.getElementById('Info_Cont1');

//Array Generation and updation

inp_gen.addEventListener('click',generate_array);
inp_asize.addEventListener('input',update_array_size);

function generate_array(){
	cont.innerHTML = "";
	for(var i =0;i<array_size;i++){
		
		div_sizes[i] = Math.floor(Math.random()*0.5*(inp_asize.max-inp_asize.min))+10;
		divs[i] = document.createElement('div')		;
		cont.appendChild(divs[i]);
		margin_size = 0.1;
		divs[i].style = "margin:0%"+margin_size+"%; background-color:blue ;width:"+(100/array_size/*-(2*margin_size)*/)+"%; height:" + (div_sizes[i]) + "%;"
	}
}

function update_array_size(){
	array_size = inp_asize.value;
	generate_array();
}

window.onload = update_array_size();

//Running the associated algorithm with the Button clicked

for(var i=0;i<butts_algos.length;i++){
	butts_algos[i].addEventListener("click",runalgo);
}

function disable_buttons(){
	for(var i=0;i<butts_algos.length;i++){
		butts_algos[i].classList = [];
		butts_algos[i].disabled = true;

		butts_algos[i].classList.add('butt_locked');

		

	}
	inp_asize.disabled = true;
	inp_gen.disabled = true;
	inp_aspeed.disabled = true;
}


function runalgo(){
	stop.style.display = 'inline';
	disable_buttons();

	this.classList.add("butt_selected");
	display_info(this.innerHTML);
	switch(this.innerText){
		case "Bubble":
			Bubble();
			break;
		case "Insertion":
			Insertion();
			break;

		case "Selection":
			selection_sort();
			break;
		case "Merge":
			Merge();
			break;
		case "Quick":
			Quick();
			break;
						
	}
}

function reloadPage(){
	window.location.reload();
}

function display_info(sortingType)
{
	switch(sortingType)
	{
		case "Bubble":
			info_cont1.innerHTML = "Worst/Average Case Time Complexity:O(n*n)"
			+" Best Case Time Complexity:O(n)";
			break;
		case "Insertion":
			info_cont1.innerHTML = "Worst/Average Case Time Complexity:O(n*n)"
			+" Best Case Time Complexity:O(n)";
			break;

		case "Selection":
			info_cont1.innerHTML = "Worst/Average Case Time Complexity:O(n*n)"
			+" Best Case Time Complexity:O(n*n)";
			break;
		case "Merge":
			info_cont1.innerHTML = "Worst/Average Case Time Complexity:O(n*log n)"
			+" Best Case Time Complexity:O(n*log n)";
			break;
		case "Quick":
			info_cont1.innerHTML = "Best/Average Case Time Complexity:O(n*log n)"
			+" Worst Case Time Complexity:O(n*n)";
			break;

	}
}

const darkModeToggle = document.getElementById("darkModeToggle");

// Check for saved theme in localStorage
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        darkModeToggle.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        darkModeToggle.textContent = "🌙 Dark Mode";
    }
});
