// declaring array as variables	
let titleArr = [];
let imgArr = [];
let priceArr = [];
let quantityArr = [];
// total
let grandFinal;

// function for buy now button
function buy(){
		
	var form = document.createElement("form");
	let orderedProductsList = "";
	for (let i = 0; i < titleArr.length; i++) {
		let eachItemName = titleArr[i];
		let eachItemQuantity = quantityArr[i];
		orderedProductsList = orderedProductsList + `${eachItemName}*${eachItemQuantity} \n`;
	}
	
	form.classList.add("popup-box")
	console.log(orderedProductsList);
  form.innerHTML = `
			
			<div class="popup-input-div">
				<h2 class="p-h">Enter your details</h2>
				<div class="name-ipart">
				<label class="namei-l" for="name">Name</label>
				<input class="namei-i" type="text" name="name" id="" placeholder="Your Name" required>
				</div>
				<div class="address-ipart">
				<label class="addressi-l" for="address">Address</label>
				<input class="addressi-i" type="text" name="address" id="" placeholder="Your Address" required>
				</div>
				<div class="email-ipart">
				<label class="emaili-l" for="address">Address</label>
				<input class="emaili-i" type="text" name="address" id="" placeholder="Your Address" required>
				</div>
				<div class="orders-part" style="display:none">
				<label class="address-l" for="address">Orders</label>
				<input class="address-i" id="" placeholder="" value="${orderedProductsList}" required>
				</div>
				
			</div>
          `;
		  	
			swal({
				content: form,
				buttons: {
				cancel: "Cancel",
				catch: {
					text: "Create",
				},
				}
          })
		  .then((createInv) => {
			if(createInv){
				let nameI = document.querySelector('.namei-i').value;
				let addressI = document.querySelector('.addressi-i').value;
				let emailI = document.querySelector('.emaili-i').value;
				if(nameI == "" || addressI == "" || emailI == ""){
					console.log("not")
					alert("Complete the form...")
					return false
				}
				else{
					console.log("deleted")
				// let tbody = document.querySelector(".tbody");
				// tbody.textContent ='';
				// grandFinal.textContent ='';

				// titleArr.splice(0,titleArr.length);
				// quantityArr.splice(0,quantityArr.length);
				// priceArr.splice(0,priceArr.length);
				// imgArr.splice(0,imgArr.length);

				// let addingText = document.querySelector(".adding-text");
				// addingText.style.cssText = "display: block;"
				// setLocalStorage();
				}
			}else{
				return;
			}
            //console.log(val);
          });

		//-------------------------
	// swal({
	// 	title: "Done!",
	// 	text: "Your order is placed!",
	// 	icon: "success",
	// 	button: "Ok!",
	//   });
	// let tbody = document.querySelector(".tbody");
	// tbody.textContent ='';
	// grandFinal.textContent ='';

	// titleArr.splice(0,titleArr.length);
	// quantityArr.splice(0,quantityArr.length);
	// priceArr.splice(0,priceArr.length);
	// imgArr.splice(0,imgArr.length);

	// let addingText = document.querySelector(".adding-text");
	// addingText.style.cssText = "display: block;"

	// cartNumber();

	// setLocalStorage();
	
}

if(document.readyState == "loading"){
	window.addEventListener("DOMContentLoaded", onload);
}else{
	onload();
}
// function for remove item in cart
function removeItem(event){
	swal({
		title: "Remove!",
		text: "Are you sure to remove this item from cart?",
		icon: "warning",
		closeOnClickOutside: true,
		closeOnEsc: true,
		buttons: true,
	  })
	  .then((willDelete) => {
		if (willDelete){
			let removePro = event.target;

			let removeParentTR = removePro.parentElement.parentElement;
			console.log(titleArr)
			let productname = removeParentTR.querySelector(".cart-product-details").innerHTML;
		
			let index = titleArr.indexOf(productname);
		
			quantityArr.splice(index,1);
			priceArr.splice(index,1);
			titleArr.splice(index,1);
			imgArr.splice(index,1);
		
			setLocalStorage();
			removeParentTR.remove();
			total();
			if(titleArr.length == 0){
				grandFinal.remove();
				let addingText = document.querySelector(".adding-text");
				addingText.style.cssText = "display: block;"
			}
			cartNumber();
		} else {
		  return;
		}
	  });
	// let removePro = event.target;

	// let removeParentTR = removePro.parentElement.parentElement;
	// console.log(titleArr)
	// let productname = removeParentTR.querySelector(".cart-product-details").innerHTML;

	// let index = titleArr.indexOf(productname);

	// quantityArr.splice(index,1);
	// priceArr.splice(index,1);
	// titleArr.splice(index,1);
	// imgArr.splice(index,1);

	// setLocalStorage();
	// removeParentTR.remove();
	// total();
	// if(titleArr.length == 0){
	// 	grandFinal.remove();
	// }
}
function setLocalStorage(event){
	localStorage.setItem("productName", JSON.stringify(titleArr));
	localStorage.setItem("productPrice", JSON.stringify(priceArr));
	localStorage.setItem("productQuantity", JSON.stringify(quantityArr));
	localStorage.setItem("productImage", JSON.stringify(imgArr));
	total();
}
function getLocalStorage(){
	if(localStorage.getItem("productName")){
		titleArr = JSON.parse(localStorage.getItem("productName"));
		priceArr = JSON.parse(localStorage.getItem("productPrice"));
		quantityArr = JSON.parse(localStorage.getItem("productQuantity"));
		imgArr = JSON.parse(localStorage.getItem("productImage"));
		buildStructure();
	}
}
getLocalStorage();
function total(){
	Tprice = 0;
	for(let i = 0; i < titleArr.length; i++) {
		let Eachtitle = titleArr[i]
		 
		let totalPrice = quantityArr[i]*priceArr[i];

		Tprice = Tprice + totalPrice;
		
		console.log(Tprice);
	}
	let grandTotal = document.querySelector(".grand-total");
	grandTotal.innerHTML = Tprice;
	let todayDate = new Date();
	let todayDay = todayDate.getDay();
	console.log(`day code is ${todayDay}`);
	let discountRate;
	if(todayDay == 5){
		discountRate = 15;
	}else{
		discountRate = 5;
	}

	let discountRatePercent = document.querySelector(".discount-rate");
	discountRatePercent.innerHTML = `${discountRate}%`;
	let gT = document.querySelector(".GT");
	gT.innerHTML = parseFloat(Tprice*(100-discountRate)/100).toFixed(2);
}

function buildTotalBar(Tprice){
	
	let finalTotal = document.createElement("div");
	grandFinal = document.querySelector(".grand-final");
	finalTotal.classList.add("final-total");
	if(titleArr.length >= 1){
		finalTotal.innerHTML =	`<div class="total-price">
								<table>
								<tr>
									<td class="total-title">Total</td>
									<td><i class="fa-solid fa-indian-rupee-sign total"></i> <b class="grand-total">${Tprice}</b></td>
								</tr>
								<tr>
									<td class="discount-rate-label">Discount Rate</td>
									<td class="discount-rate">%</td>
								</tr>
								<tr>
									<td class="grand-total-title">Grand Total</td>
									<td class="GT"></td>
								</tr>
								</table>
							</div>

							
							<div class="buynowlast">
								<a class="btn2 btn-buy">Buy Now</a>
							</div>`
		grandFinal.appendChild(finalTotal);
		total();
	}else{
		grandFinal.remove();
		let addingText = document.querySelector(".adding-text");
		addingText.style.cssText = "display: block;"
	}
}
function buildStructure(){

	titleArr.forEach((items) =>{
		console.log(items)
		let index = titleArr.indexOf(items)
		console.log(quantityArr[index])
		let tr = document.createElement("tr");
		tr.classList.add("tr");
		let tbody = document.querySelector(".tbody");
		tr.innerHTML = `
		<td class="imgandtt">
		  <div class="detail-box">
			<div class="cart-info">
			  <img src="${imgArr[index]}" class="cart-img">
			  <span class="cart-product-details">${items}</span>
			</div>
		  </div>
		</td>
		<td><i class="fa-solid fa-indian-rupee-sign cart-price"></i><b>${priceArr[index]}</b></td>
		<td><input type="number" name="" value="${quantityArr[index]}" min="1" class="cart-quantity quantity"></td>
		<td><i class="fa-regular fa-trash-can cart-remove" id="table"></i></td> `
		tbody.appendChild(tr);

		// console.log(tbody)
	})
}
function AddToCart(event){
	event.stopPropagation();
	let addBtn = event.target;

	let productCard = addBtn.parentElement;

	let productTitle = productCard.querySelector(".products-tt").innerHTML;
	let productImg = productCard.querySelector(".product-img").src;
	let productPrice = productCard.querySelector(".p-price").innerHTML;
	let quantity = 1;

	let index = titleArr.indexOf(productTitle);

	if(index == -1){
		console.log("permitted")
	}else{
		alert("This item is already added to cart");
		return;
	}

	quantityArr.push(quantity);
	titleArr.push(productTitle);
	imgArr.push(productImg);
	priceArr.push(productPrice);
	// console.log(titleArr);

	cartNumber();
	setLocalStorage();
}

function changeQuantity(event){
	btn = event.target;
	let inputValue = btn.value;
	if(isNaN(btn.value) || btn.value <= 0){
		inputValue = 1;
		btn.value = 1;
	}
	btnParentElement = btn.parentElement.parentElement;
	let productHeading = btnParentElement.querySelector(".cart-product-details").innerHTML;

	let index = titleArr.indexOf(productHeading);
	quantityArr.splice(index,1,inputValue)

	// console.log(quantityArr)
	// console.log(index)

	cartNumber();
	setLocalStorage();
}
function onload(){
	let cartBtns = document.getElementsByClassName('cart1');

	for (var i = 0; i < cartBtns.length; i++) {
		let cartBtn = cartBtns[i];

		cartBtn.addEventListener("click", AddToCart);
		
	}

	let quantityInputs = document.getElementsByClassName('cart-quantity');

	for (var i = 0; i < quantityInputs.length; i++) {
		let quantityInput = quantityInputs[i];

		quantityInput.addEventListener("change", changeQuantity);
		
	}

	let cartRemove = document.getElementsByClassName('cart-remove');

	for (var i = 0; i < cartRemove.length; i++) {
		let removeIcon = cartRemove[i];
		// console.log(removeIcon)
		removeIcon.addEventListener("click", removeItem);
		
	}
	cartNumber()

	let btnBuy = document.querySelector(".btn-buy");

	btnBuy.addEventListener("click", buy);
	
}
function cartNumber(){

	let numCart = document.querySelector(".num-item");
	if(titleArr.length > 0){
		var sum = 0;
		for (let i = 0; i < quantityArr.length; i++) {
			sum = sum + JSON.parse(quantityArr[i]);
			// console.log(sum)
		}
		numCart.classList.remove("none");
		numCart.innerHTML = sum;
		console.log("0 is not cart no")
	}
	else{
		numCart.classList.add("none");
		// console.log("0 is cart no")
	}
}
buildTotalBar();
cartNumber();





