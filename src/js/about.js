document.querySelector(".close").addEventListener("click", function() {
  const about = document.getElementById('about');
  if(about.classList.contains("openModal")) {
    about.classList.remove("openModal");
  }
  about.classList.add("closeModal");
});

document.querySelector(".aboutLink").addEventListener("click", function() {
  const about = document.getElementById('about');
  if(about.classList.contains("closeModal")) {
    about.classList.remove("closeModal");
  }
  about.classList.add("openModal");
});
