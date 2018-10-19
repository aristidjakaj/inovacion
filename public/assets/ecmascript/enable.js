if(window.location.href.includes(`/ib`)){

  let target = document.querySelectorAll(`.carousel-inner a`);
  let img = document.querySelectorAll(`.carousel-inner a img`)

  for (let i = 0; i < target.length; i++) {
    target[i].classList.remove(`disabled`);
    img[i].style.filter = "none";
  }
}
