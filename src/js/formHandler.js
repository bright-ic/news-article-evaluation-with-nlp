import {checkForName} from "./nameChecker";
let isSubmitting = false;
function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
     // ensure that multiple form submission is avoided
    if(isSubmitting) {
        return;
    }
    isSubmitting = true;
    console.log("::: Form Submittion in Progress :::");
    let submitButton = document.getElementById("submit");
    submitButton.textContent = "Submitting, please wait ...";
    document.getElementById('results').innerHTML = "";

    (async function func(){
        try {
            let response = await Client.submit(formText);
            if(response.message === "success" && response.data) {
                let polarity = document.createElement("div");
                let subjectivity = document.createElement("div");
                let text = document.createElement('div');

                polarity.classList.add("popularity");
                subjectivity.classList.add("subjectivity");
                text.classList.add("text");
                
                //updating the content of the created divs
                polarity.innerHTML = "<span class='label'>Polarity:</span> " + response.data.polarity;
                subjectivity.innerHTML = "<span class='label'>subjectivity:</span> " + response.data.subjectivity;
                text.innerHTML = "<span class='label'>Text:</span> " + response.data.text;

                //Update the ui
                const docFrag = document.createDocumentFragment();
                docFrag.appendChild(text);
                docFrag.appendChild(polarity);
                docFrag.appendChild(subjectivity);
                let result =  document.getElementById('results');
                result.innerHTML = "";
                result.appendChild(docFrag);
                result= ""
                
                //enable form submittion
                isSubmitting = false;
                submitButton.textContent = "Submit";
            }
            else {
                throw new Error(response.message || "Error occured");
            }
        }
        catch(err) {
            //enable form submittion
            isSubmitting = false;
            submitButton.textContent = "Submit";
            alert(err.message);
        }
    }());
    
}

const submit = async (text) => {
    try {
      const url = checkForName(text);
      if(url === "EMPTY") {
          throw new Error("Please enter text or blog url.");
      }
      let res = await fetch(`${url}?q=${encodeURIComponent(text)}`)
      let response = await res.json();
      return response;
    }
    catch(err) {
        let msg = err.message !== "Please enter text or blog url." ? "Failed! The server was not able to respond." : err.message;
      return {message: msg, data: null}
    }
}

export { handleSubmit, submit }
