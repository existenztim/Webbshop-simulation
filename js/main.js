/* Kategorier:
chocolate
filled
apple
cinnamon
glazed
lemon
powdered
blueberry
strawberry
*/

// Bilder tagna från https://github.com/aaronfrost/DonutsApi/tree/main/static/images

const donutsArray = [
	{
		id: 1,
		name: 'Chokladmunk med vaniljfyllning',
		price: 23,
		categories: ['chocolate', 'filled'],
		images: [
			'img/chocolate-iced-custard-filled-banner.jpeg',
			'img/chocolate-iced-custard-filled.jpeg',
		],
		rating: 5,
	},
	{
		id: 2,
		name: 'Chokladmunk',
		price: 18,
		categories: ['chocolate'],
		images: [
			'img/chocolate-iced-glazed-banner.jpeg',
			'img/chocolate-iced-glazed.jpeg',
		],
		rating: 4.5,
	},
	{
		id: 3,
		name: 'Kanelpudrad munk med äppelfyllning',
		price: 25,
		categories: ['filled', 'apple', 'cinnamon', 'powdered'],
		images: [
			'img/cinnamon-apple-filled-banner.jpeg',
			'img/cinnamon-apple-filled.jpeg',
		],
		rating: 4.5,
	},
	{
		id: 4,
		name: 'Glaserad kanelmunk',
		price: 13,
		categories: ['glazed', 'cinnamon'],
		images: ['img/glazed-cinnamon-banner.jpeg', 'img/glazed-cinnamon.jpeg'],
		rating: 5,
	},
	{
		id: 5,
		name: 'Glaserad munk med citronfyllning',
		price: 23,
		categories: ['glazed', 'lemon'],
		images: [
			'img/glazed-lemon-filled-banner.jpeg',
			'img/glazed-lemon-filled.jpeg',
		],
		rating: 4,
	},
	{
		id: 6,
		name: 'Munk med chokladfyllning',
		price: 16,
		categories: ['chocolate', 'filled'],
		images: [
			'img/original-filled-chocolate-kreme™-banner.jpeg',
			'img/original-filled-chocolate-kreme™.jpeg',
		],
		rating: 4,
	},
	{
		id: 7,
		name: 'Glaserad munk',
		price: 7,
		categories: ['glazed'],
		images: [
			'img/original-glazed-doughnut-banner.jpeg',
			'img/original-glazed-doughnut.jpeg',
		],
		rating: 5,
	},
	{
		id: 8,
		name: 'Pudrad munk med blåbärsfyllning',
		price: 25,
		categories: ['powdered', 'blueberry'],
		images: [
			'img/powdered-blueberry-filled-banner.jpeg',
			'img/powdered-blueberry-filled.jpeg',
		],
		rating: 4.5,
	},
	{
		id: 9,
		name: 'Pudrad munk med jordgubbsfyllning',
		price: 25,
		categories: ['powdered', 'strawberry'],
		images: [
			'img/powdered-strawberry-filled-banner.jpeg',
			'img/powdered-strawberry-filled.jpeg',
		],
		rating: 4,
	},
	{
		id: 10,
		name: 'Jordgubbsmunk',
		price: 11,
		categories: ['strawberry'],
		images: ['img/strawberry-iced-banner.jpeg', 'img/strawberry-iced.jpeg'],
		rating: 5,
	},
];

const donutsArrayLucia = [
	//placeholder, add 1 to basket free of charge 13/12
	{
		id: 11,
		name: 'Luciamunk',
		price: 0,
		categories: ['chocolate', 'filled'],
		images: [
			'img/chocolate-iced-custard-filled-banner.jpeg',
			'img/chocolate-iced-custard-filled.jpeg',
		],
		rating: 5,
	},
];

const thisDate = new Date();

const countWeekNumber = () => {
    startDate = new Date(thisDate.getFullYear(), 0, 1);
    const days = Math.floor((thisDate - startDate) /
        (24 * 60 * 60 * 1000));  
    const weekNumber = Math.ceil(days / 7);
    printWeekNumber(days,weekNumber);
};

const printWeekNumber = (days, weekNumber) => {
    console.log(weekNumber);
    console.log(days);
}

countWeekNumber();

const day = thisDate.getDay();
const hour = thisDate.getHours();
const month = thisDate.getMonth();
const date = thisDate.getDate();

/*********************************************************
 * Page load rules
 **********************************************************/

/*Christmas rule*/
const christmasCheck = () => {
    if (month === 11 && date == 24) {
        document.body.style.backgroundImage = "url('/img/christmasbg.webp')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
    }
}

/*********************************************************
 * Adding to Cart
 **********************************************************/
const cartItems = [];
const donutListEl = document.querySelector('.donuts');

const fetchDonut = (id) => {
	for (const donut of donutsArray) {
		if (donut.id === id) {
			return donut;
		}
	}
};

const donutIncreaseCount = (id) => {
	const donutEl = document.querySelector(`[data-id="${id}"]`);
	const currentCountEl = donutEl.querySelector('.donuts__item_quantity input');
	// const currentCount = Number(currentCountEl.value) + 1;
	if (currentCountEl.value >= 99) {
		currentCountEl.value = currentCountEl.value.slice(0, 2); //remove 3rd digit
	} else {
		currentCountEl.value++;
		const donutObj = fetchDonut(id);
		const currentPriceText = donutEl.querySelector(
			'.donuts__item_addcart span'
		);
		currentPriceText.innerText = donutObj.price * currentCountEl.value;
	}
	for (const donut of cartItems) {
		if (donut.id === id) {
			donut.count++;
			donut.totPrice = donut.count * donut.price;
			console.log(cartItems);
			renderCart();
		}
	}
};
const donutDecreaseCount = (id) => {
	const donutEl = document.querySelector(`[data-id="${id}"]`);
	const currentCountEl = donutEl.querySelector('.donuts__item_quantity input');
	// const currentCount = Number(currentCountEl.value) - 1;

	if (currentCountEl.value != 0) {
		currentCountEl.value--;
		const donutObj = fetchDonut(id);
		const currentPriceText = donutEl.querySelector(
			'.donuts__item_addcart span'
		);
		currentPriceText.innerText = donutObj.price * currentCountEl.value;
	}

	for (const donut of cartItems) {
		if (donut.id === id && donut.count > 0) {
			donut.count--;
			donut.totPrice = donut.count * donut.price;
			console.log(cartItems);
			renderCart();
		}
	}
};

const donutAddToCart = (id) => {
	const currentCount = Number(
		document.querySelector(`[data-id="${id}"] .donuts__item_quantity input`)
			.value
	);
	let totalCartSum = cartItems.reduce((accumulator, donut) => accumulator + donut.totPrice, 0) 
	let donutsCost;
	for (const donut of donutsArray) {
		if (donut.id === id) {
			donutsCost = donut.price * currentCount;
		}
	}
	console.log(totalCartSum, donutsCost);
	if (totalCartSum + donutsCost > 2000) {
		alert('Du kan inte beställa för mer än 2000kr')
		return;
	}
	// if (currentCount > 0 && cartItems.length > 0) {
	if (currentCount > 0) {
		for (const item of cartItems) {
			if (item.id === id) {
				item.count = item.count + currentCount;
				item.totPrice = item.totPrice + currentCount * item.price;
				updateCartDOM();
				renderCart();
				return;
			}
		}

		for (const donut of donutsArray) {
			if (donut.id === id) {
				cartItems.push({
					...donut,
					count: currentCount,
					totPrice: currentCount * donut.price,
				});
				console.log(cartItems);
				updateCartDOM();
				renderCart();
				return;
			}
		}
	}
};

const renderCart = () => {
	let cartItemsToRender = '';
	for (const donut of cartItems) {
		let donutElement = /*html*/ `
		<li data-id="cart-${donut.id}">
		<div className="name">
			<img src=${donut.images[1]} width="30" height="30"/>
			<p>${donut.name}</p>
		</div>
		<div className="donuts__item_quantity">			
			<button class="button button--background" onclick="donutDecreaseCount(${donut.id});updateCartInputValue('input-cart-${donut.id}', ${donut.count})">-</button>
			<input type="number" value="${donut.count}" data-id="input-cart-${donut.id}"/>
			<button class="button button--background" onclick="donutIncreaseCount(${donut.id});updateCartInputValue('input-cart-${donut.id}', ${donut.count})">+</button>
			<p>${donut.totPrice} kr</p>
		</div>
		</li>`
		cartItemsToRender = cartItemsToRender + donutElement
	}
	document.querySelector('#cart article ul').innerHTML = cartItemsToRender;
	updateCartDOM();
}

const updateCartInputValue = (id, donutCount) => {
	const cartDonutInput = document.querySelector(`input[data-id="${id}"]`);
	console.log(cartDonutInput.value);
	cartDonutInput.value = donutCount;
	renderCart();
}

const updateCartDOM = () => {
	/*To get total price of cart*/
	const cartSum = cartItems.reduce((accumulator, object) => {
		return accumulator + object.totPrice;
	}, 0);
	/*To check if there is more than 15 donuts in total in cart*/
	const cartCount = cartItems.reduce((accumulator, object) => {
		return accumulator + object.count;
	}, 0);

	const cartCounterDisplay = document.querySelector('#cart-counter');
	const cartCounter = cartCount;
	cartCounterDisplay.textContent = cartCounter;

	checkForSpecialRules(cartSum, cartCount);
};

/*********************************************************
 * Special Rules
 **********************************************************/

const checkForSpecialRules = (cartSum, cartCount) => {

	let freightSum = Math.round(25 + cartSum * 0.1); // 25 kr standard fee + 10% of total
	const freightSumDisplay = document.getElementById('freight-sum');
	const cartSumDisplay = document.getElementById('cart-sum');
	const deliveryTime = document.getElementById('delivery-time');
	const checkDiscountCode = document.querySelector('[name="discount-code"]');
	checkDiscountCode.addEventListener('keyup', updateCartDOM);
	let cartSumAndFreightSum = cartSum + freightSum;

	cartSumDisplay.textContent = `Totalpris: ${cartSumAndFreightSum} kr.`;
	freightSumDisplay.textContent = `Frakt: ${freightSum} kr.`;
	deliveryTime.textContent = "Beställningen skickas 30 minuter efter orderläggning.";

	/*No invoice alternative above 800kr rule*/
	if (cartSum >= 800) {
		document.getElementById('invoice-radio').disabled = true;
	} else {
		document.getElementById('invoice-radio').disabled = false;
	}

	/*Lucia donut rule*/
	const lucia = {
		month: 11, //month/date index start at 0, so 11 = 12.
		date: 13,
	};

	if (month == lucia.month && date == lucia.date && cartItems.length >=1) {
		cartItems.push(...donutsArrayLucia);
		donutsArrayLucia.pop();
	}

	/*Monday before 10:00 rule*/
	if (day === 1 && hour <= 10) {
		cartSumAndFreightSum = Math.round(cartSumAndFreightSum * 0.9); //10 % discount
		cartSumDisplay.textContent = `Totalpris: Måndagsrabatt: 10 % på hela beställningen ${cartSumAndFreightSum} kr.`;
	} else {
		cartSumDisplay.textContent = `Totalpris: ${cartSumAndFreightSum} kr.`;
	}

	/*More than 15 donuts in total rule*/
	if (cartCount >= 15) {
		cartSumAndFreightSum = cartSum; //no freight cost added
		cartSumDisplay.textContent = `Totalpris: ${cartSumAndFreightSum} kr.`;
		freightSumDisplay.textContent = `Fraktfritt.`
	} else {
		cartSumAndFreightSum = cartSum + freightSum;
		freightSumDisplay.textContent = `Frakt: ${freightSum} kr.`;
	}

	/*Free order with coupon rule*/
	if (checkDiscountCode.value === "a_damn_fine-cup_of-coffee") {
		cartSumAndFreightSum = 0;
		cartSumDisplay.textContent = `Din beställning är kostnadsfri!`;
		freightSumDisplay.textContent = `Fraktfritt.`
	} else {
		cartSumAndFreightSum = cartSum + freightSum;
	}

	/*Fixa ihop fraktidsregler nedan senare*/
	/*Weekend deliver time rule*/
	if (day === 6 || day === 7) {
		deliveryTime.textContent = "Beställningen skickas 90 minuter efter orderläggning.";
	}

	/*Night deliver time rule*/
	if (hour >= 0 && hour <= 4) {
		deliveryTime.textContent = "Beställningen skickas 45 minuter efter orderläggning.";
	}

	/*friday 11-13 rule*/

};

/*********************************************************
 * Create HTML output
 **********************************************************/

const generateStarRating = (rating) => {
	const starIcon = '<i class="fa-solid fa-star"></i>';
	const starHalfIcon = '<i class="fa-solid fa-star-half"></i>';

	const splitPoints = rating.toString().split('.');
	const fullPoints = splitPoints[0];
	const halfPoint = splitPoints.length > 1 ? splitPoints[1] : 0;

	let ratingEl = '';

	for (let i = 0; i < Number(fullPoints); i++) {
		ratingEl += starIcon;
	}

	if (halfPoint) {
		ratingEl += starHalfIcon;
	}

	return ratingEl;
};
const generateDonuts = () => {
	let donuts = [];
	for (const donut of donutsArray) {
		donuts += /*html*/ `
      <article class="donuts__item" data-id=${donut.id}>
        <h2>${donut.name}</h2>
        <div class="donuts__item_image">
          <img
            src="${donut.images[1]}"
            alt="A picture of a donut"
          />
        </div>
                <div class="donuts__item_info">
                    <p>${donut.price} kr</p>
                    <p>${generateStarRating(donut.rating)}</p>
                </div>
       
        <div class="donuts__item_quantity">
          <button class="button button--background" onclick="donutDecreaseCount(${donut.id
			})"><i class="fa-solid fa-minus" title="Decrease count"></i></button>
          <input type="number" value="0"  min="0" max="99" oninput="this.value = !!this.value && Math.abs(this.value)
          >= 0 ? Math.abs(this.value) : null"/> <!--No negative number or letters allowed-->
          <button class="button button--background" onclick="donutIncreaseCount(${donut.id
			})"><i class="fa-solid fa-plus" title="Increase count"></i></button>
        </div>
        <button class="donuts__item_addcart button button--background" onclick="donutAddToCart(${donut.id
			})">Lägg till för <span>${donut.price}</span> kr</button>
      </article>
    `;
	}
	donutListEl.innerHTML = donuts;
};

generateDonuts();

/*********************************************************
 * Input field validation
 **********************************************************/

const inputForm = document.querySelector('form');

const nameInputField = document.querySelector('[name="name"]');
const addressInputField = document.querySelector('[name="address"]');
const postCodeInputField = document.querySelector('[name="post-code"]');
const cityInputField = document.querySelector('[name="city"]');
const telInputField = document.querySelector('[name="tel"]');
const emailInputField = document.querySelector('[name="email"]');
const cardNumberInputField = document.querySelector('[name="card-number"]');
const cardExpirationInputField = document.querySelector('[name="date"]')
const cvcInputField = document.querySelector('[name="cvc"]');
const socialSecurityInputField = document.querySelector('[name="social-security-number"]');


const cardRadioInput = document.querySelector('#card-radio');
const invoiceRadioInput = document.querySelector('#invoice-radio');

const paymentOptionRadios = Array.from(document.querySelectorAll('[name="payment-method"]'));

const orderButton = document.querySelector('#order-btn');

const cardForm = document.querySelector('#card-payment-form');
const invoiceForm = document.querySelector('#invoice-payment-form');

let formValidation = {
	name: false,
	address: false,
	postCode: false,
	city: false,
	tel: false,
	email: false,
	payment: false
};

let cardPaymentValidation = {
	cardNumber: false,
	expirationDate: false,
	cvc: false
}

nameInputField.addEventListener('keyup', () => {
	formValidation.name = nameInputField.value.indexOf(' ') > 0;
	activateOrderButton();
});

addressInputField.addEventListener('keyup', () => {
	formValidation.address = /\d/.test(addressInputField.value) ? /[A-Za-zÅåÄäÖö]/.test(addressInputField.value) : false;
	activateOrderButton();
});

postCodeInputField.addEventListener('keyup', () => {
	formValidation.postCode = postCodeInputField.value.length === 5;
	activateOrderButton();
});

cityInputField.addEventListener('keyup', () => {
	formValidation.city = cityInputField.value !== '';
	activateOrderButton;
})

telInputField.addEventListener('keyup', () => {
	formValidation.tel = cityInputField.value !== '';
	activateOrderButton;
})

emailInputField.addEventListener('keyup', () => {
	formValidation.email = cityInputField.value !== '';
	activateOrderButton;
})



paymentOptionRadios.map(radio => {
	radio.addEventListener('click', () => {
		activateOrderButton();
		switch (radio.value) {
			case 'card':
				cardForm.style.display = 'flex';
				invoiceForm.style.display = 'none';
				cardNumberInputField.setAttribute('required', '');
				cardExpirationInputField.setAttribute('required', '');
				cvcInputField.setAttribute('required', '');
				socialSecurityInputField.removeAttribute('required');

				break

			case 'invoice':
				cardForm.style.display = 'none'
				invoiceForm.style.display = 'flex'
				socialSecurityInputField.setAttribute('required', '');
				cardNumberInputField.removeAttribute('required');
				cardExpirationInputField.removeAttribute('required');
				cvcInputField.removeAttribute('required');

				break
		}
	})
})

cardNumberInputField.addEventListener('keyup', () => {
	cardPaymentValidation.cardNumber = /\d/.test(cardNumberInputField.value);
	console.log(/\d/.test(cardNumberInputField.value));
	activateOrderButton();
})

cardExpirationInputField.addEventListener('keyup', () => {
	cardPaymentValidation.expirationDate = cardExpirationInputField.value !== '';
	activateOrderButton();
})

cvcInputField.addEventListener('keyup', () => {
	cardPaymentValidation.cvc = cvcInputField.value !== '';
	activateOrderButton();
})

socialSecurityInputField.addEventListener('keyup', () => {
	formValidation.payment = /\d/.test(socialSecurityInputField.value);
	activateOrderButton();
})


const validateInput = validatedInputs => {
	for (const prop in validatedInputs) {
		if (!validatedInputs[prop]) {
			return false;
		}
	}
	return true;
};

const validatePaymentInputs = () => {
	if (cardRadioInput.checked) {
		for (const prop in cardPaymentValidation) {
			if (!cardPaymentValidation[prop]) {
				formValidation.payment = false;
				return;
			}
		}
		formValidation.payment = true;
	}
	else if (invoiceRadioInput.checked) {
		if (socialSecurityInputField.value === '') {
			formValidation.payment = false;
			return;
		}
		formValidation.payment = true;
	}
}

const activateOrderButton = () => {
	validatePaymentInputs();
	if (validateInput(formValidation)) {
		orderButton.removeAttribute('disabled');
		inputForm.setAttribute('onsubmit', 'submitOrder()');
	} else {
		orderButton.setAttribute('disabled', '');
		inputForm.removeAttribute('onsubmit');
	}
};

const submitOrder = () => {
	alert('Order lagd!');
	console.log('Order lagd!');
};

document.querySelector('form').addEventListener('reset', function (event) {
	//A warning text for accessibility
	if (!confirm('Är du säker att du vill återställa formuläret?')) {
		event.preventDefault();
	}
});


/*********************************************************
 * Filter/sorting Menu
 **********************************************************/

const filterButton = document.querySelector('.navbar__menu > button');
const filterElement = document.querySelector('#filterMenu');
let filterMenuVisible = false;

filterButton.addEventListener('click', () => {
	filterButton.setAttribute('aria-expanded', !filterMenuVisible);
	filterMenuVisible = JSON.parse(filterButton.getAttribute('aria-expanded'));

	if (filterMenuVisible) {
		filterElement.style.display = 'flex';
		window.setTimeout(() => {
			filterElement.style.opacity = 1;
			filterElement.style.transform = 'scale(1)';
		}, 0);
	} else {
		filterElement.style.opacity = 0;
		filterElement.style.transform = 'scale(0)';

		window.setTimeout(() => {
			filterElement.style.display = 'none';
		}, 200);
	}

	if (filterMenuVisible) filterElement.querySelector('select').focus();
});
