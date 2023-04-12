export const setPageIndicator = () => {
  const pages = document.querySelectorAll(".nav__link");
  const page = document.title.toLowerCase();
  if(page === 'главная'){
    pages[0].classList.add("nav-link_active");
  }else if(page === 'викторина'){
    pages[1].classList.add("nav-link_active");
  }else {
    pages[2].classList.add("nav-link_active");
  }
};