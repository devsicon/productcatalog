// Selector
const filterInput = document.querySelector("#filter");
const productListUl = document.querySelector(".collection");
const nameInput = document.querySelector(".product-name");
const priceInput = document.querySelector(".product-price");
const addBtn = document.querySelector(".add-product");
const deleteBtn = document.querySelector(".delete-btn");
const msg = document.querySelector('.msg');


// data /state
let productData = [];

function getData(productList){
    if(productData.length > 0){  
        msg.innerHTML = '';      
        productList.forEach(product => {
            let li = document.createElement('li');
            li.className = 'list-group-item collection-item';
            li.id = `product-${product.id}`;
            li.innerHTML = `<strong>${product.name}</strong>- <span class="price">${product.price}</span>
            <i class="fa fa-trash float-right delete-btn"></i>`;
            productListUl.appendChild(li);
        });
    }else{
        msg.innerHTML = "No Product to Show"
    }
    
}
getData(productData);


addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const price = priceInput.value;
    let id;
    if(productData.length === 0){
        id = 0;
    }else{
        id = productData[productData.length - 1].id + 1;
    }
    if(name === '' || price === ''){
        alert('Please fill out the all field')
    }else{
        productData.push({
            id,
            name,
            price
        })
        productListUl.innerHTML = '';
        getData(productData);
        nameInput.value = '';
        priceInput.value = '';
    }
});


// Deleting Item from UL
productListUl.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-btn')){
        // Remove data from UI
        const target = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target);

        // Remove data from storage
        const id = parseInt(target.id.split('-')[1]);
        // return result array
        let result = productData.filter(product => {
            return product.id !== id;
        });
        productData = result;
    }  
});


// Data Search
filterInput.addEventListener('keyup', e => {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection .collection-item').forEach(item => {
        const productName = item.firstElementChild.textContent.toLowerCase();
        if(productName.indexOf(text) === -1){
            msg.innerHTML = 'No Item to Show';
            item.style.display = 'none';
        }else{
            msg.innerHTML = '';
            item.style.display = 'block';
        }
    })
});

