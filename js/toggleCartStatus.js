function toggleCartStatus() {

    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');
    const orderForm = document.querySelector('#order-form');
    const cartIcon = document.querySelector('#cart-icon');
    const cartTotal = document.querySelector('#cart-total');
    const cart = document.querySelector('#cart');
    const close = document.querySelector('#close');

    if (cartWrapper.children.length > 0) {
        cartEmptyBadge.classList.add('none');
        orderForm.classList.remove('none');
        cartIcon.classList.remove('none');
        cartTotal.classList.remove('none');
        document.getElementById('inputPhone').focus()
    } else {
        cartIcon.classList.add('none');
        cartTotal.classList.add('none');
        cartEmptyBadge.classList.remove('none');
        orderForm.classList.add('none');
        cart.classList.add('none');
    }
    
    cartIcon.addEventListener('click', ()=>{
        if (cartWrapper.children.length > 0) {
            cart.classList.remove('none');
        }
        else{
            cart.classList.add('none');
        }
    })
    close.addEventListener('click', ()=>{
        cart.classList.add('none');
    })

}