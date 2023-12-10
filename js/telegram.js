import { promoSum, promoObject } from './calcCartPrice.js'

//данные моего телеграм бота
let TOKEN
let CHAT_ID
let url_api = `https://api.telegram.org/bot${TOKEN}/sendMessage`

async function tokens() {
    // Получаем данные из products.json
    const response = await fetch('./js/data-tg.json');
    // Парсим данные из JSON формата в JS
    let dataToken = await response.json();
    TOKEN = dataToken[0].TOKEN
    CHAT_ID = dataToken[0].CHAT_ID
    url_api = `https://api.telegram.org/bot${TOKEN}/sendMessage`
}

tokens()

// обозначил инпут
const input = document.querySelector('#inputPhone');
const input2 = document.querySelector('#inputAdress');

// разрешил вводить только цифры, не больше 11
input.addEventListener('input', () => {
    const value = input.value.replace(/\D/g, '');
    input.value = value.slice(0, 11);
})


//импут окрашивается красным без введёных данных
input.addEventListener('blur', () => {
    if (input.value === '') {
        input.style.border = '2px solid red';
    }
    if (input.value !== '') {
        input.style.border = '2px solid green';
    }
});

input2.addEventListener('blur', () => {
    if (input2.value === '') {
        input2.style.border = '2px solid red';
    }
    if (input2.value !== '') {
        input2.style.border = '2px solid green';
    }
});


let zakzText


function myFunc() {
    const divs = document.querySelectorAll('.cart-item');
    let res = ""
    divs.forEach(div => {
        const roll = div.querySelector('.cart-item__title').innerHTML;
        const howMuch = div.querySelector('.items__current').innerHTML;
        res = res + roll + ' - ' + howMuch + 'шт, ' + '\n'
    });
    const dostavka = document.querySelector('.delivery-cost').innerHTML;

    const totalPrice = document.querySelector('.total-price').innerHTML;

    zakzText = (`Состав:\n${res}\nДоставка: ${dostavka} рублей.\nИспользован промо-код на сумму: ${promoSum ? -promoSum + ' рублей' : 'отсутствует'}\nПо поводу:${promoObject ? promoObject.description : ' отсутствует'} \n\nСумма всего заказа: ${totalPrice} рублей`)
}

let howMuchClick = 0

document.getElementById('tg').addEventListener('submit', function (e) {
    //соберём дату заказа
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Месяцы в JavaScript нумеруются с 0, поэтому добавляем 1
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let formattedDate = day + '.' + month + '.' + year + ' в ' + hours + ':' + minutes;

    //если инпут не пустой
    if (input.value !== '' && input2.value !== '') {
        howMuchClick++
        if (howMuchClick === 4) {
            location.reload()

        }
        e.preventDefault();
        myFunc()
        let message = `${formattedDate} \nпоступил заказ: \n\n${zakzText} \n\nНомер клиента: ${this.text.value} \nАдрес клиента: ${this.adress.value} `
        axios.post(url_api, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })

        document.querySelector('#popup').classList.remove('none');
        document.querySelector('#cart').classList.add('none');

        document.querySelector('#close').addEventListener('click', () => {
            cart.classList.add('none');
        })

        //перегрузка страницы в случае нажатия больше 3 раз

    }
    else {
        e.preventDefault();
    }
})