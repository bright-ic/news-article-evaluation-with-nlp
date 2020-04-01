let isSubmitting = false;
function handleSubmit(event) {
    event.preventDefault()
    console.log("is submiting is " + isSubmitting.toString())

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    const url = Client.checkForName(formText);
    if(url === "EMPTY") {
        alert("Please enter text or blog url.");
        return;
    }
     // ensure that multiple form submission is avoided
    if(isSubmitting) {
        return;
    }
    isSubmitting = true;
    console.log("is submiting is " + isSubmitting.toString())
    console.log("::: Form Submittion in Progress :::");
    fetch(`${url}?q=${encodeURIComponent(formText)}`)
    .then(res => res.json())
    .then(function(response) {
        console.log(response);
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
            const result =  document.getElementById('results');
            result.innerHTML = "";
            result.appendChild(docFrag);
        }
        else {
            throw new Error(response.message || "Error occured");
        }
        //enable form submittion
        isSubmitting = false;
    })
    .catch(err => { 
        alert(err.message);
        //enable form submittion
        isSubmitting = false;
    })
}

export { handleSubmit }
