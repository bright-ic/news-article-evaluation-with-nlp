import { checkForName } from './js/nameChecker';
import { handleSubmit, submit } from './js/formHandler';
import "./styles/base.css";
import "./styles/footer.css";
import "./styles/form.css";
import "./styles/header.css";
import "./styles/resets.css";
import "./styles/about.scss";


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


export {
  checkForName,
  handleSubmit,
  submit
}