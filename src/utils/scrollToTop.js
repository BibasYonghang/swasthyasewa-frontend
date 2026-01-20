export const scrollToTop = () => {
  const container = document.getElementById("home-scroll-container");

  if (container) {
    container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    // fallback for other pages
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};
