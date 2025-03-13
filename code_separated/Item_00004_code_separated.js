document.addEventListener("DOMContentLoaded", (event) => {
  const regexInput = document.getElementById("regex");
  const regexCopyBtn = document.getElementById("regex-copy");
  const textInput = document.getElementById("text");
  const output = document.getElementById("output");
  const copyTooltip = document.getElementById("copy-tooltip");
  const initialOutputDescription = document.getElementById(
    "initial-output-description"
  );
  const regexError = document.getElementById("regex-error");
  const flagG = document.getElementById("flag-g");
  const flagI = document.getElementById("flag-i");
  const flagM = document.getElementById("flag-m");

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function updateOutput() {
    const regexValue = regexInput.value;
    const text = textInput.value;
    let resultHTML = "";
    let lastIndex = 0;
    let isValidRegex = true;
    let errorMessage = "";
    try {
      // Check if the regex is valid
      new RegExp(regexValue);
      regexError.classList.remove("block"); // Hide error message if valid
      regexError.classList.add("hidden");
      regexInput.classList.replace("border-red-500", "border-gray-300");
    } catch (e) {
      isValidRegex = false;
      // More descriptive error messages
      if (regexValue.trim() === "") {
        errorMessage = "Please enter a regular expression.";
      } else if (e instanceof SyntaxError) {
        errorMessage = "Invalid regular expression syntax.";
      } else {
        errorMessage = "Invalid regular expression."; // Generic error
      }
      regexError.textContent = errorMessage;
      regexError.classList.remove("hidden");
      regexError.classList.add("block"); // Show error message if invalid
      regexInput.classList.replace("border-gray-300", "border-red-500");
    }
    if (!regexValue.trim() || !text.trim() || !isValidRegex) {
      output.classList.add("empty");
      output.innerHTML = `<p id="initial-output-description" class="text-gray-400 italic text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-9/10">
      Please enter a valid regular expression and text to see the results.
    </p>`;
      return;
    } else {
      output.classList.remove("empty");
      if (initialOutputDescription) {
        initialOutputDescription.remove();
      }
    }
    let flags = "";
    if (flagG.checked) flags += "g";
    if (flagI.checked) flags += "i";
    if (flagM.checked) flags += "m";
    try {
      const regex = new RegExp(regexValue, flags);
      if (regex.global) {
        // handle global
        let match;
        while ((match = regex.exec(text)) !== null) {
          const matchText = escapeHTML(match[0]);
          const matchIndex = match.index;
          const matchLength = matchText.length;
          resultHTML += escapeHTML(text.substring(lastIndex, matchIndex));
          resultHTML += `<span class="text-(--color-highlight-text) bg-(--color-highlight-bg) px-1 rounded">${matchText}</span>`;
          lastIndex = matchIndex + matchLength;
        }
        resultHTML += escapeHTML(text.substring(lastIndex));
        output.innerHTML = resultHTML || "No matches found.";
      } else {
        // handle non-global
        const match = regex.exec(text);
        if (match) {
          const matchText = escapeHTML(match[0]);
          const matchIndex = match.index;
          const matchLength = matchText.length;
          resultHTML += escapeHTML(text.substring(0, matchIndex));
          resultHTML += `<span class="text-(--color-highlight-text) bg-(--color-highlight-bg) px-1 rounded">${matchText}</span>`;
          resultHTML += escapeHTML(text.substring(matchIndex + matchLength));
          output.innerHTML = resultHTML;
        } else {
          output.innerHTML = "No matches found.";
        }
      }
    } catch (e) {
      output.innerHTML = `Error: ${e.message}`;
    }
  }

  function copyText() {
    regexInput.select();
    regexInput.setSelectionRange(0, 99999);
    document.execCommand("copy");

    copyTooltip.classList.add("visible");
    copyTooltip.classList.add("opacity-100");
    copyTooltip.innerText = "Copied!";

    setTimeout(() => {
      copyTooltip.classList.remove("visible");
      copyTooltip.classList.remove("opacity-100");
      copyTooltip.classList.add("invisible");
      copyTooltip.classList.add("opacity-0");
      copyTooltip.innerText = "Copy";
    }, 1000);
  }

  regexInput.addEventListener("input", updateOutput);
  textInput.addEventListener("input", updateOutput);
  regexCopyBtn.addEventListener("click", copyText);
  flagG.addEventListener("change", updateOutput);
  flagI.addEventListener("change", updateOutput);
  flagM.addEventListener("change", updateOutput);
  // Initial update
  updateOutput();
});
