let display = document.querySelector('.image-grid');
let loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

let initialCount = 15;

const apiKey = 'bT6jYtW_8bb5kD4rbD0d_i_zIkFk4MywVq1fHySMZY4';
// const apiKey = '4lJgQrVyPAuNO_e6zCsUFAb8srFvnxVObw3_NKhjCsA';
// const apiKey ='ZNEWcXmSSa5HDEWVLAzjNU_zwB10I5LqakQN_q8Sva4';

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIUrlWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

//Function for loader
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((data) => {
    const imgAndDescription = document.createElement('div');
    const img = document.createElement('img');
    const info = document.createElement('div');
    const info1 = document.createElement('div')
    const info11 = document.createElement('div');
    const info12 = document.createElement('div');
    const info2 = document.createElement('div');

    imgAndDescription.id = "imgAndDescription";

    display.appendChild(imgAndDescription)
    imgAndDescription.appendChild(img);
    imgAndDescription.appendChild(info);
    info.appendChild(info1);
    info.appendChild(info2);
    info1.appendChild(info11)
    info1.appendChild(info12);

    //IMG
    img.id = "mainPhoto"
    img.className = "zoom-img";
    img.src = data.urls.small;
    // img.alt = data.alt_description; //???
    img.addEventListener('load', imageLoaded);

    info.id = "info";

    //info11 - avatar and username
    info1.id = "info1";
    info11.id = "info11";

    const avatar = document.createElement('img');
    info11.appendChild(avatar);
    avatar.src = data.user.profile_image.small;
    avatar.id = "avatar";
    const username = document.createElement('p');
    info11.appendChild(username);
    username.innerHTML = data.user.username;
    username.id = "username";

    //info12 - likes and downloads
    info12.id = "info12";
    const likesImg = document.createElement('img');
    const likesNum = document.createElement('p');
    info12.appendChild(likesImg);
    info12.appendChild(likesNum);
    likesImg.src = 'img/like.png';
    likesImg.id = "likesImg";
    likesNum.innerText = data.likes;
    likesNum.id = "likesNum";
    const downloadsImg = document.createElement('img');
    const downloadsNum = document.createElement('p');
    info12.appendChild(downloadsImg);
    info12.appendChild(downloadsNum);
    downloadsImg.src = 'img/download.png';
    downloadsImg.id = "downloadsImg";
    downloadsNum.innerText = data.downloads;
    downloadsNum.id = "downloadsNum";

    
    //info2 for social 
    //Instagram
    info2.id = "info2";
    const instagram = document.createElement('a');
    const instagramImg = document.createElement('img');
    instagram.id = "instagram";
    info2.appendChild(instagram);
    instagram.appendChild(instagramImg);
    instagramImg.id = "instagramImg";
    instagramImg.src = 'img/instagram.png';
    if(data.user.instagram_username != null){
    instagram.href = "https://www.instagram.com/"+ data.user.instagram_username;
    }
    else{
        instagramImg.style.opacity = "0.5";
    }
    //Twitter
    const twitter = document.createElement('a');
    const twitterImg = document.createElement('img');
    twitter.id = "twitter";
    info2.appendChild(twitter);
    twitter.appendChild(twitterImg);
    twitterImg.src = 'img/twitter.png';
    twitterImg.id = "twitterImg";
    if(data.user.twitter_username != null){
        twitter.href = "https://www.twitter.com/"+ data.user.twitter_username;
    }
    else{
        twitterImg.style.opacity = "0.5";
    }

    //Portfolio
    const portfolio = document.createElement('a');
    const portfolioImg = document.createElement('img');
    portfolio.id = "portfolio";
    info2.appendChild(portfolio);
    portfolio.appendChild(portfolioImg);
    portfolioImg.src = 'img/portfolio.png';
    portfolioImg.id = "portfolioImg";
    if(data.user.portfolio_url != null){
        portfolio.href =  data.user.portfolio_url;
    }
    else{
        portfolioImg.style.opacity = "0.5";
    }

    //Unsplash
    const unsplash = document.createElement('a');
    const unsplashImg = document.createElement('img');
    unsplash.id = "unsplash";
    info2.appendChild(unsplash);
    unsplash.appendChild(unsplashImg);
    unsplashImg.src = 'img/unsplash.png';
    unsplashImg.id = "unsplashImg";
    if(data.user.username != null){
        unsplash.href = "https://unsplash.com/"+ data.user.username;
    }
    else{
        unsplashImg.style.opacity = "0.5";
    }
  });
}

// Get photos from unsplash api
async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIUrlWithNewCount(10);
      isInitialLoad = false;
    }
  } catch (err) {
    console.log(err);
  }
//Function for lightbox
const lightBoxBg = document.createElement('div');
lightBoxBg.id = "lightBoxBg";
document.body.appendChild(lightBoxBg);

const images = document.querySelectorAll(".zoom-img");
  images.forEach(image => {
    function lightBoxAdd(e){
      lightBoxBg.classList.add('active');
      const lightBoxImg = document.createElement('img');
      lightBoxImg.src = image.src;
      lightBoxImg.id = "lightBoxImg";
      //Only one picture
      while(lightBoxBg.firstChild){
          lightBoxBg.removeChild(lightBoxBg.firstChild);
      }
      lightBoxBg.appendChild(lightBoxImg)
    }
      image.addEventListener('click',lightBoxAdd);
  });

  function lightBoxRemove(e){
    lightBoxBg.classList.remove("active");
  }
  lightBoxBg.addEventListener("click", lightBoxRemove);
}

//Function for scroll
function scroll(){
  if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1000 && ready){
    ready = false;
    getPhotos();
  }
}
window.addEventListener("scroll",scroll);

// On Load
getPhotos();

//Dark theme
let darkBtn = document.getElementById("dark-btn");
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }
darkBtn.addEventListener("click",darkMode);

//Change icon (dark theme)
function changeMode() {
    const modeImg = document.getElementById("moon-sun");

    if (modeImg.src.match("img/icon-moon.svg")) {
        modeImg.src = "img/icon-sun.svg";
    }
    else {
        modeImg.src = "img/icon-moon.svg";
    }
}
darkBtn.addEventListener("click",changeMode);


//Grid view
let gridBtn = document.getElementById("grid-btn");
function changeGrid() {
    var element = document.body;
    element.classList.toggle("grid-mode");
 }
 gridBtn.addEventListener("click",changeGrid);
//Change icon (grid view)
function changeGridPhoto() {
    const gridImg = document.getElementById("grid-column");

    if (gridImg.src.match("img/column.png")) {
        gridImg.src = "img/grid.png";
    }
    else {
        gridImg.src = "img/column.png";
    }
}
gridBtn.addEventListener("click",changeGridPhoto);


//Function for header fixed
// var header = document.getElementById("myHeader");
// var sticky = header.offsetTop;

// function scrollHeader() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }
// window.addEventListener("scroll",scrollHeader);
