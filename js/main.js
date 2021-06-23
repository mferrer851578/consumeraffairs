function updateYomValue(val) {
	document.getElementById('yomvalue').value = val;
}

function updateRoiValue(val) {
	document.getElementById('roivalue').value = val;
}

(() => {

	//results
	const pai = document.querySelector("#pai");
	const tax = document.querySelector("#tax");
	const ins = document.querySelector("#ins");
	const tmp = document.querySelector("#tmp");
	const form = document.querySelector("#my-form");

	//fields
	const yom = document.querySelector('#yom');
	const roi = document.querySelector('#roi');
	const loan = document.querySelector('#loan');
	const atax = document.querySelector('#atax');
	const ains = document.querySelector('#ains');

	const btn = document.querySelector('#btn');
	const errorMsg = 'Mandatory field';
	const loanError = document.querySelector('#loan-error');
	const ataxError = document.querySelector('#atax-error');
	const ainsError = document.querySelector('#ains-error');
	const results = document.querySelector('#results-container');

	const inputs = [loan, atax, ains];
	const errors = [loanError, ataxError, ainsError];


	function eValidation() {

		let eCheck = true;

		for (var i = 0; i < 3; i++) {
			if (inputs[i].value === '') {
				errors[i].innerHTML = `${errorMsg}`;
				inputs[i].classList.add('missing-input');
				eCheck = false;
			}
			else {
				inputs[i].classList.remove('missing-input');
			}
		}

		return eCheck;
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		loanError.innerHTML = '';
		ataxError.innerHTML = '';
		ainsError.innerHTML = '';
		updateYomValue(yom.value);
		if (eValidation()) {
			pai.innerHTML = `$ ${mInterest().toFixed(2)}`;
			tax.innerHTML = `$ ${mTax().toFixed(2)}`;
			ins.innerHTML = `$ ${mInsurance().toFixed(2)}`;
			tmp.innerHTML = `$ ${mTotal().toFixed(2)}`;
			pai.classList.add('result-final');
			tax.classList.add('result-final');
			ins.classList.add('result-final');
			tmp.classList.add('result-final');
			results.classList.add('visible');
		}
	});


	let mInterest = () => ((roi.value / 100) / 12) * loan.value /
		(1 - Math.pow((1 + ((roi.value / 100) / 12)), -yom.value * 12));

	let mTax = () => (atax.value / 12);

	let mInsurance = () => (ains.value / 12);

	let mTotal = () => (mInterest() + mTax() + mInsurance());

})();


document.getElementById("yom").oninput = function () {
	var value = (this.value - this.min) / (this.max - this.min) * 100
	this.style.background = 'linear-gradient(to right, #1B3979 0%, #1B3979 ' + value + '%, #DDDDDD ' + value + '%, #DDDDDD 100%)'
};

document.getElementById("roi").oninput = function () {
	var value = (this.value - this.min) / (this.max - this.min) * 100
	this.style.background = 'linear-gradient(to right, #1B3979 0%, #1B3979 ' + value + '%, #DDDDDD ' + value + '%, #DDDDDD 100%)'
};



