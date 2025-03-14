let AllProducts = JSON.parse(localStorage.getItem('ShopIT')) || [  
	{ id: 1, name: 'Nike Vaporfly 3 Road Racing Shoes', type: 'Nike', price: 260.00, image: "/images/Nike1.png", isFavorite: false },  
	{ id: 2, name: 'Nike Air Force 1 07', type: 'Nike', price: 130.00, image: "/images/Nike2.png", isFavorite: false },  
	{ id: 3, name: 'Nike Air Max Plus Drift', type: 'Nike', price: 180.90, image: "/images/Nike3.png", isFavorite: false },  
	{ id: 4, name: 'Nike Dunk Low Retro Premium', type: 'Nike', price: 125.00, image: "/images/Nike4.png", isFavorite: false },  
	{ id: 5, name: 'Oregon Nike Air Max Solo', type: 'Nike', price: 110.00, image: "/images/Nike5.png", isFavorite: false },  
	{ id: 6, name: 'Nike Alpha Huarache NXT', type: 'Nike', price: 160.00, image: "/images/Nike6.png", isFavorite: false },  
	{ id: 7, name: 'Speedcat OG', type: 'Puma', price: 100, image: "/images/Puma1.avif", isFavorite: false },  
	{ id: 8, name: 'Speedcat Midt', type: 'Puma', price: 120.00, image: "/images/Puma2.avif", isFavorite: false },  
	{ id: 9, name: 'Inverse Echo', type: 'Puma', price: 100.00, image: "/images/Puma3.avif", isFavorite: false },  
	{ id: 10, name: 'D.O.N. Issue 6 Shoes', type: 'Adidas', price: 130.30, image: "/images/Adidas1.avif", isFavorite: false },  
	{ id: 11, name: 'Superstar II Shoes', type: 'Adidas', price: 100.00, image: "/images/Adidas2.avif", isFavorite: false },  
	{ id: 12, name: 'Chrome Anthony Edwards Mid 1 Shoes', type: 'Adidas', price: 130.50, image: "/images/Adidas3.avif", isFavorite: false },  
	{ id: 13, name: 'Dame Certified 3 Shoes', type: 'Adidas', price: 60.99, image: "/images/Adidas4.avif", isFavorite: false },  
	{ id: 14, name: 'Forum 84 Low CL Shoes', type: 'Adidas', price: 120.00, image: "/images/Adidas5.avif", isFavorite: false },  
	{ id: 15, name: 'Adifom IIInfinity Mules', type: 'Adidas', price: 59.99, image: "/images/Adidas6.avif", isFavorite: false },  
	{ id: 16, name: 'MEN iS RUNNER GRADIENT SNEAKER IN BEIGE', type: 'Balenciaga', price: 150.90, image: "/images/Balenciaga1.avif", isFavorite: false },  
	{ id: 17, name: 'Women is Avenue 50mm Pump in Red', type: 'Balenciaga', price: 133.99, image: "/images/Balenciaga2.avif", isFavorite: false },  
	{ id: 18, name: 'Converse x Wonka CHUCK 70 "Oompa Loompa"', type: 'Converse', price: 399, image: "/images/Converse1.webp", isFavorite: false },  
	{ id: 19, name: 'Weapon', type: 'Converse', price: 455.90, image: "/images/Converse2.webp", isFavorite: false },  
	{ id: 20, name: 'One Star Pro', type: 'Converse', price: 566, image: "/images/Converse3.webp", isFavorite: false }, 
];  

// JSON.parse data  CONVERT to  STRING ALL DATA
// JSON.stringify property CONVERT to STRING
// 2. Save AllProducts to localStorage whenever it changes  
function saveProductsToLocalStorage() {  
	localStorage.setItem('ShopIT', JSON.stringify(AllProducts));  
}


// Check if elements exist before using them
var listProducts = document.getElementById('listProducts');
var countheart = document.getElementById('countheart');

// Update the favorite count only if the element exists
function updateFavoriteCount(){
    const favoriteCount = AllProducts.filter(allProduct => allProduct.isFavorite).length;
    localStorage.setItem('Favorite', JSON.stringify(favoriteCount));
    if (countheart) {
        countheart.innerText = favoriteCount;
    }
}

function toggleFarite(id){
	const product = AllProducts.find(allProduct => allProduct.id === id);
	if(product){
			product.isFavorite = !product.isFavorite;
			displayProducts(AllProducts);
			updateFavoriteCount();
			saveProductsToLocalStorage(); // Save the updated product list  
	}
}

document.addEventListener('DOMContentLoaded', function(){
	try {  
					const storedFavorite = JSON.parse(localStorage.getItem('Favorite')) || 0;
					if (countheart) {
									countheart.innerText = storedFavorite;
					}
	} catch (error) {  
					console.error("Error parsing Favorite from localStorage:", error);
					if (countheart) {
									countheart.innerText = 0;
					}
					localStorage.removeItem('Favorite');
	}

	updateFavoriteCount();
	
	// Only try to display products if the element exists
	if (listProducts) {
					displayProducts(AllProducts);
	}
	
	// Only call displayProductsDetails if we're on the product details page
	if (document.querySelector('.listProductDetails')) {
					displayProductsDetails();
	}
});

// Only add the event listener if the element exists
if (listProducts) {
	listProducts.addEventListener('click', function(event) {
					if (event.target.closest('.card')) {
									console.log("Card was clicked!");
									const card = event.target.closest('.card');
									const productId = card.dataset.productId;
									localStorage.setItem('selectedProductId', productId);
									location.replace('productDetails.html');
					}
	});
}

// Event delegation for card clicks:  
document.getElementById('listProducts').addEventListener('click', function(event) {  
	if (event.target.closest('.card')) {  
		console.log("Card was clicked!");  
		const card = event.target.closest('.card');  
		const productId = card.dataset.productId;  
		localStorage.setItem('selectedProductId', productId);  
		location.replace('productDetails.html');  
	}  
});  

// Function to display product details
function displayProductsDetails() {
	let result = '';  
	
	// Retrieve the selected product ID from localStorage  
	const selectedProductId = localStorage.getItem('selectedProductId');
	
	// Get the products directly from AllProducts instead of a separate storage item
	if (selectedProductId) {  
		// Find the selected product in AllProducts
		const selectedProduct = AllProducts.find(e => e.id === parseInt(selectedProductId));  

		if (selectedProduct) {  
			result += `  
				<img class=" h-[70%] w-[100%] object-cover" src="${selectedProduct.image || '/image/default.png'}" alt="${selectedProduct.name}">  
				<div class="product-detail">  
					<h2 class=" text-3xl">${selectedProduct.name}</h2>  
					<p class=" text-[18px] text-gray-600">Price: $${selectedProduct.price.toFixed(2)}</p>  
					<p class=" text-[18px] text-gray-600">Type: ${selectedProduct.type}</p>
					<p class=" line-clamp-3 mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum asperiores provident reiciendis alias voluptatum consequatur, perspiciatis, sapiente minus at aspernatur facilis veritatis, laboriosam quaerat sunt deserunt inventore vel odit culpa.</p>
					<div class="flex justify-around w-[90%] bg-[#3fdff77e]  p-3  rounded-full mt-3">  
								<div class="flex flex-col">  
												<label class="text-white" for="size">Size</label>   
												<select id="size" class="mt-1 w-[45px]  rounded ">  
																<option value="43">43</option>  
																<option value="44">44</option>  
																<option value="45">45</option>  
												</select>  
								</div>  
								<div class="flex flex-col">  
												<label class="text-white" for="color">Color</label>  
												<input type="color" id="color" class="mt-1 w-[30px] h-[30px]  rounded-full" />  
								</div>  
								<div class="flex flex-col">  
												<label class="text-white" for="qty">QTY</label>  
												<input type="number" id="qty" value="1" min="1" class="mt-1 w-[40px]  rounded bg-white" />  
								</div>  
				</div>  
					<button class=" mt-5 w-[90%] bg-[#3FE0F7] p-3 text-white rounded-full">Add to Bag 	&emsp;<i class="fa-solid fa-cart-arrow-down"></i></button>
				</div>  
			`;  
		} else {  
			result = '<p>Product not found.</p>';  
		}  
		
		document.querySelector('.listProductDetails').innerHTML = result;  
	} else {  
		console.log("No product ID found in local storage.");  
	}  
}  

function displayProducts(products) {  
	let result = '';  
	products.forEach((product) => { 
		const heartClass = product.isFavorite 
			? 'fa-solid fa-heart text-red-600 cursor-pointer ' 
			: 'fa-regular fa-heart cursor-pointer';

		result += `  
		<div class="shadow-lg rounded-[25px] bg-white p-5 cursor-pointer card" data-product-id="${product.id}">
			<div class="setHeaderProduct flex justify-between">
				<p class="product-price text-[18px] font-bold"><span class="text-[#03E6F6]">$</span> ${product.price.toFixed(2)}</p>  
				<i onclick="toggleFarite(${product.id})" class="${heartClass} text-[18px]"></i>  
			</div>  
			<img class="rounded-lg object-cover m-auto w-[150px] md:h-[150px] h-[100px]" src="${product.image || '/image/default.png'}" alt="">  
			<p class="line-clamp-2 text-center mt-1">${product.name || 'No Name Available'}</p>  
		</div>`;  
	});  
	listProducts.innerHTML = result;  
}

// Display all products initially  
if(listProducts) {
	displayProducts(AllProducts);  
}

// Event handlers for navigation  
document.getElementById('Nike').onclick = function() {  
	displayProducts(AllProducts.filter(e => e.type === "Nike"));  
}

document.getElementById('Adidas').onclick = function() {  
	displayProducts(AllProducts.filter(e => e.type === "Adidas"));  
}  

document.getElementById('Puma').onclick = function() {  
	displayProducts(AllProducts.filter(e => e.type === "Puma"));  
}  

document.getElementById('Balenciaga').onclick = function() {  
	displayProducts(AllProducts.filter(e => e.type === "Balenciaga"));  
}  

document.getElementById('Converse').onclick = function() {  
	displayProducts(AllProducts.filter(e => e.type === "Converse"));  
}  

document.getElementById('heart').onclick = function() {  
	displayProducts(AllProducts.filter(e => e.isFavorite === true));   
}