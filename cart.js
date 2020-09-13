function Cart() {
	this.products  = []; 
}

Cart.prototype.displayCart = function displayCart() {
	// Checks if products were previously stored
	if(localStorage.getItem("products") !== null) {
		this.products = JSON.parse(localStorage.products);
	} else {
		this.products = [];
	}

	// Populates Cart
	let cartDOM = document.getElementById("cart");
	cartDOM.innerHTML = "";
	for(let i = 0; i < this.products.length; i++) {
		console.log("printing products", this.products);
	    let currItem = this.products[i];
	    let product = document.createElement("li");
	    product.innerHTML = currItem;
	    product.className = "title";
		cartDOM.appendChild(product);
	}

	// Appending Delete Button if cart has products
	if(this.isEmpty()) {
		let deleteBtn = document.createElement("button");
		deleteBtn.innerHTML = "Empty Cart";
		deleteBtn.className = "delete";

		let myCart = this;
		// when calling method on deleteBtn, 'this' becomes deleteBtn and we lose the context of myCart
		// this is why we save a reference to myCart as 'this'
		deleteBtn.addEventListener("click", function() {
			myCart.clearCart();
		});
		cartDOM.appendChild(deleteBtn);
	}

};

Cart.prototype.isEmpty = function() {
	if(this.products.length) {
		return true;
	} else {
		return false;
	}
};

Cart.prototype.clearCart = function() {
	localStorage.clear();
	this.displayCart();
};

Cart.prototype.addToCart = function(productName) {
	this.products.push(productName);
	localStorage.setItem("products", JSON.stringify(this.products));
	console.log(localStorage.products);
	this.displayCart();
};



// Instantiating our JS Cart
let myCart = new Cart();
myCart.displayCart();

// The JS for our shop
let productArr = [];
productArr = document.getElementsByClassName("product");

for(let i = 0 ; i < productArr.length; i ++) {
	productArr[i].addEventListener("click", function(e) {
		console.log(e);
		myCart.addToCart(e.target.id);
	});
}
