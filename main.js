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

// Called on slider change
function updateArraySize(val) {
	document.getElementById("array-size-label").textContent = "Array Size: " + val;
	array_size = val;
	generate_array();
}

// Called when input type (radio) is changed
function toggleInputMethod() {
	const selected = document.querySelector('input[name="inputType"]:checked').value;
	document.getElementById('slider-section').style.display = selected === 'random' ? 'block' : 'none';
	document.getElementById('custom-array-section').style.display = selected === 'custom' ? 'block' : 'none';
}


function generate_array() {
	cont.innerHTML = "";

	const selectedInput = document.querySelector('input[name="inputType"]:checked').value;

	if (selectedInput === 'custom') {
			const input = document.getElementById("customArrayInput").value.trim();
			if (!input) {
					alert("Please enter a valid array!");
					return;
			}

			const values = input.split(",").map(num => parseInt(num.trim(), 10));

			if (values.some(isNaN)) {
					alert("Please enter only valid integers separated by commas.");
					return;
			}

			div_sizes = values;
			array_size = div_sizes.length;
	} else {
			// Random array from slider
			div_sizes = [];
			for (let i = 0; i < array_size; i++) {
					div_sizes[i] = Math.floor(Math.random() * 0.5 * (inp_asize.max - inp_asize.min)) + 10;
			}
	}

	// Create bars
	for (let i = 0; i < array_size; i++) {
			// divs[i] = document.createElement('div');
			// cont.appendChild(divs[i]);
			// margin_size = 0.1;

			// divs[i].style = "margin:0% " + margin_size + "%; background-color:blue; width:" +
			// 		(100 / array_size) + "%; height:" + div_sizes[i] + "%;";
			
		divs[i] = document.createElement('div');
    // Add a span element to display the number
    const numberSpan = document.createElement('span');
    numberSpan.textContent = div_sizes[i];
    divs[i].appendChild(numberSpan);

    cont.appendChild(divs[i]);
    margin_size = 0.1;
    divs[i].style = "margin:0% " + margin_size + "%; background-color:blue; width:" +
        (100 / array_size) + "%; height:" + div_sizes[i] + "%;";
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
	updateComplexityInfo(this.innerHTML);
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

const complexities = {
    "Bubble": {
        time: "Best: O(n), Average: O(n²), Worst: O(n²)",
        space: "O(1)",
        steps: [
            "1. <span class='color-label' style='background:yellow'></span>Yellow: Compare adjacent elements",
            "2. <span class='color-label' style='background:red'></span>Red: Swap if needed",
            "3. <span class='color-label' style='background:blue'></span>Blue: Reset after comparison",
            "4. <span class='color-label' style='background:black; border:1px solid var(--text-color)'></span>Black: Mark sorted elements",
            "Repeatedly swaps adjacent elements until sorted"
        ]
    },
    "Selection": {
        time: "Best: O(n²), Average: O(n²), Worst: O(n²)",
        space: "O(1)",
        steps: [
            "1. <span class='color-label' style='background:purple'></span>Purple: Current element",
            "2. <span class='color-label' style='background:yellow'></span>Yellow: Scanning for minimum",
            "3. <span class='color-label' style='background:red'></span>Red: New minimum found",
            "4. <span class='color-label' style='background:blue'></span>Blue: Reset after comparison",
            "5. <span class='color-label' style='background:black; border:1px solid var(--text-color)'></span>Black: Sorted elements"
        ]
    },
    "Insertion": {
        time: "Best: O(n), Average: O(n²), Worst: O(n²)",
        space: "O(1)",
        steps: [
            "1. <span class='color-label' style='background:yellow'></span>Yellow: Current key element",
            "2. <span class='color-label' style='background:red'></span>Red: Comparing/shifting elements",
            "3. <span class='color-label' style='background:blue'></span>Blue: Reset after shifting",
            "4. <span class='color-label' style='background:green'></span>Green: Sorted portion"
        ]
    },
    "Merge": {
        time: "Best: O(n log n), Average: O(n log n), Worst: O(n log n)",
        space: "O(n)",
        steps: [
            "1. <span class='color-label' style='background:yellow'></span>Yellow: Midpoint",
            "2. <span class='color-label' style='background:red'></span>Red: Merging elements",
            "3. <span class='color-label' style='background:black; border:1px solid var(--text-color)'></span>Black: Merged position"
        ]
    },
    "Quick": {
        time: "Best: O(n log n), Average: O(n log n), Worst: O(n²)",
        space: "O(log n)",
        steps: [
            "1. <span class='color-label' style='background:yellow'></span>Yellow: Pivot element",
            "2. <span class='color-label' style='background:red'></span>Red: Swapping elements",
            "3. <span class='color-label' style='background:blue'></span>Blue: Reset after comparison",
            "4. <span class='color-label' style='background:black; border:1px solid var(--text-color)'></span>Black: Final pivot position"
        ]
    }
};

function updateComplexityInfo(algo) {
	const infoBox = document.getElementById("Info_Cont1");
	const complexity = complexities[algo];
	infoBox.innerHTML = `
        <p><strong>${algo} Sort</strong></p>
        <p>Time Complexity: ${complexity.time}</p>
        <p>Space Complexity: ${complexity.space}</p>
        <div style="margin-top: 15px; border-top: 2px solid var(--text-color); padding-top: 10px;">
            <strong>Algorithm Steps:</strong>
            <ul style="margin-top: 10px; padding-left: 20px;">
                ${complexity.steps.map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}
            </ul>
        </div>
    `;
}

const API_BASE = "http://localhost:3000/api/auth";

function register() {
  const username = document.getElementById("auth-username").value;
  const password = document.getElementById("auth-password").value;

  fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  }).then(res => res.json())
    .then(data => {
      document.getElementById("auth-message").textContent = data.message || data.error;
    });
}

function login() {
  const username = document.getElementById("auth-username").value;
  const password = document.getElementById("auth-password").value;

  fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  }).then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        loadApp();
      } else {
        document.getElementById("auth-message").textContent = data.error;
      }
    });
}

function loadApp() {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch(`${API_BASE}/protected`, {
    headers: { "Authorization": "Bearer " + token }
  }).then(res => res.json())
    .then(data => {
      if (data.message) {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("app").style.display = "block";
      }
    });
}

// Auto-load if already logged in
window.onload = function () {
  loadApp();
}

function logout() {
  localStorage.removeItem("token");
  document.getElementById("app").style.display = "none";
  document.getElementById("auth-container").style.display = "block";
  document.getElementById("auth-message").textContent = "You have been logged out.";
}

