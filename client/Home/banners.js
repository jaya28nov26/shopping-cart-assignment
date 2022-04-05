fetch("http://localhost:5000/banners")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Something went wrong !");
      // return Promise.reject("Something went wrong !");
    }
  })
  .then((bannerdata) => {
    console.log(bannerdata);
    showBannerData(bannerdata);
  })
  .catch(function (err) {
    console.log(err);
  });
function showBannerData(bannerdata) {
  let bannerData = '<div class="slideshow-container"> ';
  let bannerData2 = `<div class="carousel-dot"> `;
  for (let j = 0; j < bannerdata.length; j++) {
    bannerData += `<div class="mySlides"><img src="..${bannerdata[j].bannerImageUrl}"  alt="${bannerdata[j].bannerImageAlt}" style="width: 100%"/>`;

    bannerData2 += `<span class="dot" onclick="currentSlide(${j + 1})"></span>`;

    bannerData += "</div>";
  }
  bannerData += ` <a class="prev" onclick="plusSlides(-1)">PREV</a>
  <a class="next" onclick="plusSlides(1)">NEXT</a>`;
  bannerData2 += "</div>";

  bannerData += bannerData2 + "</div>";
  // Setting innerHTML as bannerData
  document.getElementById("banners_page").innerHTML = bannerData;
  showSlides(slideIndex);
}

let slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", " ");
  }
  slides[slideIndex - 1].style.display = "block";
  // let index = (slideIndex - 1) * 5 + (slideIndex - 1);
  dots[slideIndex - 1].className += " active";
  // console.log(slides[slideIndex - 1].querySelectorAll("dot"));
}
