let themeConverter = document.querySelector('.theme-converter');
let A4slide = document.querySelector('.a4-slide');
let darkMode = "darkMode";

function themeConversion(){
    if(document.body.classList.contains("dark-mode")){
        localStorage.removeItem("theme");
        themeConverter.classList.remove("fa-sun");
        themeConverter.classList.add("fa-moon");
        document.body.classList.remove("dark-mode")
        // A4slide.src = "Slide Honesty Shop a4.png";
    }else{
        localStorage.setItem("theme", darkMode);
        themeConverter.classList.remove("fa-moon");
        themeConverter.classList.add("fa-sun");
        document.body.classList.add("dark-mode")
        // A4slide.src = "slide honesty dark.png";
    } 
}
if(localStorage.getItem("theme")){
    document.body.classList.add("dark-mode");
    // A4slide.src = "slide honesty dark.png";
}else{
    // A4slide.src = "Slide Honesty Shop a4.png";
    themeConverter.classList.remove("fa-sun");
    themeConverter.classList.add("fa-moon");
}
themeConverter.addEventListener("click", themeConversion)
// console.log(themeConverter)