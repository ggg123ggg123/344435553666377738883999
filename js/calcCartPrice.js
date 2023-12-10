export let promoSum = 0
export let promoObject
let promos

const promoBtn = document.querySelector('#promo-btn')
const totalPrice = document.querySelector('#total-price2')
const promoForm = document.querySelector('#promo-form')


getPromocode()

async function getPromocode() {
	// Получаем данные из promo-code.json
	const response = await fetch('./js/promo-code.json');
	// Парсим данные из JSON формата в JS
	promos = await response.json();
}


promoBtn.addEventListener('click', () => {
	if (promoBtn.innerHTML === '+промокод') {
		promoBtn.innerHTML = '-промокод'
		promoForm.classList.toggle('none')
		totalPrice.classList.toggle('none')
		calcCartPriceAndDelivery()
	}
	else if (promoBtn.innerHTML === '-промокод') {
		promoBtn.innerHTML = '+промокод'
		promoForm.classList.toggle('none')
		totalPrice.classList.toggle('none')
		calcCartPriceAndDelivery()
	}
})

promoForm.addEventListener('change', () => {
	const promoValue = promoForm.value;
	findPromo(promoValue);
});

let findPromo = (promo) => {
	promoObject = promos.find(obj => obj.promo === promo);
	if (promoObject) {
		promoSum = promoObject.rubles;
		promoForm.style.border = '2px solid green';
		totalPrice.innerText = promoObject.promoText
		calcCartPriceAndDelivery()
	} else {
		promoSum = 0
		promoForm.style.border = '2px solid red';
		totalPrice.innerText = 'Введите ваш промо-код'
		calcCartPriceAndDelivery()
	}
}


export function calcCartPriceAndDelivery() {
	const cartWrapper = document.querySelector('.cart-wrapper');
	const priceElements = cartWrapper.querySelectorAll('.price__currency');
	const totalPriceEl = document.querySelector('.total-price');
	const deliveryCost = document.querySelector('.delivery-cost');
	const cartDelivery = document.querySelector('[data-cart-delivery]');

	// Общая стоимость товаров
	let priceTotal = 0;

	// Обходим все блоки с ценами в корзине
	priceElements.forEach(function (item) {
		// Находим количество товара
		const amountEl = item.closest('.cart-item').querySelector('[data-counter]');
		// Добавляем стоимость товара в общую стоимость (кол-во * цену)
		priceTotal += parseInt(item.innerText) * parseInt(amountEl.innerText);
	});

	// Отображаем цену на странице

	//cтоимость доставки
	const deliveryCostSum = 250

	totalPriceEl.innerText = priceTotal + deliveryCostSum + promoSum

	// Скрываем / Показываем блок со стоимостью доставки
	if (priceTotal > 0) {
		cartDelivery.classList.remove('none');
	} else {
		cartDelivery.classList.add('none');
	}

	// Указываем стоимость доставки
	if (priceTotal >= 1000) {
		deliveryCost.classList.add('free');
		deliveryCost.innerText = 'бесплатно';
		totalPriceEl.innerText = priceTotal + promoSum
	} else {
		deliveryCost.classList.remove('free');
		deliveryCost.innerText = deliveryCostSum + " ₽";
		totalPriceEl.innerText = priceTotal + deliveryCostSum + promoSum
	}
}