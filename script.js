// document.getElementById("hamburger-toggle").addEventListener("click", () => {
//   document.getElementById("hamburger-menu").style.maxHeight = "30rem";
//   document.getElementById("hamburger-menu").style.padding = "2rem";
// });

const hamburgerToggle = document.getElementById("hamburger-toggle");
hamburgerToggle.addEventListener("click", function () {
  document
    .getElementById("hamburger-menu")
    .classList.toggle("hamburger-menu--active");
});

// prevent the form from submitting when you press enter

document.getElementById("shorten-link-form").addEventListener("submit", (e) => {
  e.preventDefault();
  shortenLink();
});

function shortenLink() {
  const xhr = new XMLHttpRequest();
  console.log(xhr);

  const inputLink = document.getElementById("inputLink").value;
  console.log(inputLink);

  xhr.open("GET", `https://api.shrtco.de/v2/shorten?url=${inputLink}`, true);

  // xhr.open("GET", "https://api.shrtco.de/v2/shorten");

  xhr.onload = function () {
    console.log(this.readyState);
    if (this.status == 201) {
      const responseObj = JSON.parse(this.responseText);
      console.log(responseObj);

      document.getElementById("shortened-links-list").innerHTML += `
      <li class="shortened-links__link-container container">
        <a href="${responseObj.result.original_link}" class="shortened-links__original-state"> ${responseObj.result.original_link}</a
        >
        <div>
          <a href="${responseObj.result.full_short_link}" class="shortened-links__shortened-state" >${responseObj.result.full_short_link}</a><button type="button" class="btn btn--tertiary copy-shortened-link" id="">copy</button>
        </div>
      </li>
      `;
    }
  };

  xhr.send();

  xhr.onloadend = function () {
    let copyShrtLinkBtns = document.getElementsByClassName(
      "copy-shortened-link"
    );

    for (let i = 0; i < copyShrtLinkBtns.length; i++) {
      console.log("conviction over convenience");
      copyShrtLinkBtns[i].addEventListener("click", () => {
        copyToClipboard(copyShrtLinkBtns[i].previousElementSibling);
      });
    }
  };
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

function copyToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

// let copyShrtLinkBtns = document.getElementsByClassName("copy-shortened-link");

// for (let i = 0; i < copyShrtLinkBtns.length; i++) {
//   console.log("conviction over convenience");
//   copyShrtLinkBtns[i].addEventListener("click", copyToClipboard);
// }
