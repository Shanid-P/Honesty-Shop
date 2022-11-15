let selectedImg = document.querySelector(".s-product-img");
let optionImgs = document.getElementsByClassName("small-img");
let cartBtns = document.getElementsByClassName('btn1');


function changeImg(event){
    let img = event.target;
    selectedImg.src = img.src;
    let imgSrc = selectedImg.src;
}

for (let i = 0; i < optionImgs.length; i++) {
    let optionImg = optionImgs[i];
    optionImg.addEventListener("click", changeImg)
}
function AddToCartS(event){
	// event.stopPropagation();
	let addBtn = event.target;

	let productCard = addBtn.parentElement.parentElement;
    console.log(productCard);
	let productTitle = productCard.querySelector(".s-products-tt").innerHTML;
	let productImg = productCard.querySelector(".s-product-img").src;
	let productPrice = productCard.querySelector(".s-p-price").innerHTML;
	let quantity = productCard.querySelector(".quantityInp").value;

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


	console.log(titleArr);
	cartNumber();
	setLocalStorage();
}

for (var i = 0; i < cartBtns.length; i++) {
    let cartBtn = cartBtns[i];

    cartBtn.addEventListener("click", AddToCartS);
    
}




























// function changeImgSelection(){
//     selectedValue = selectionInp.value;
//     if(selectedValue == "black"){
//         selectedImg.src = "technotipblack.png";
//     }else{
//         selectedImg.src = "technotip_pen.png"; 
//     }
// }
// selectionInp.addEventListener("change", changeImgSelection)
