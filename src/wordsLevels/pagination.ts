const prevBtn = document.querySelector(".prev");
export function element(totalPages: number, page: number) {
    const ulTag = document.querySelector("ul");
   
    

    let liTag = "";
    let activeLi;
    let beforePages = page - 1;
    let afterPages = page + 1;
    if (page > 1) {
      liTag += `<li class="prev btn"><span><i class="fas fa-angel-left">Prev</i></span></li>`;
    }
    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
      if (page == pageLength) {
        activeLi = "active";
      } else {
        activeLi = "";
      }
      liTag += `<li class="numb ${activeLi}"><span>${pageLength}</span></li>`;
    }
    if (page < totalPages) {
      liTag += `<li class="btn next"><span><i class="fas fa-angel-right">Next</i></span></li>`;
    }
    if (ulTag != undefined) {
      ulTag.innerHTML = liTag;
    }


  }
  function prevElement () {

}
  prevBtn?.addEventListener('click', prevElement);