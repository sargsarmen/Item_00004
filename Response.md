Okay, I've created a regular expressions testing page using HTML, CSS, and Javascript.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Regex Tester</title>
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/lucide-static@latest/font/lucide.css" />
    <style>
      :root{
        --text-4xl--line-height: calc(2.5 / 2);
        --checkbox-size: 18px;
        --default-font-family: 'Inter', sans-serif;
        --color-highlight-text: #184afb;
        --color-highlight-bg: #e6efff;
        --color-result-border: #e5e5e5;
        --color-result-bg: #fafafa;
        --color-info-icon: #838383;
      }
    </style>
  </head>
  <body class="bg-gray-100 p-6 font-(family-name: 'Inter') min-w-[320px]">
    <div class="container max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <div class="flex items-center justify-between flex-col sm:flex-row mb-8 ">
        <h1 class="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Regex Tester</h1>
        <p class="text-gray-400">Test your regex in real-time</p>
      </div>
      <div class="mb-6">
        <label for="regex" class="block text-gray-700 text-sm font-bold mb-2">Regular Expression</label>
        <div class="flex relative">
          <input type="text" id="regex" placeholder="Enter your regex here" class="border-1 border-gray-300 rounded-md px-3 py-2 text-gray-700 w-full focus-visible:outline-(--color-highlight-text) placeholder:font-[300] [&.border-red-500]:focus-visible:outline-none" />
          <button id="regex-copy" type="button" aria-label="Copy pattern" class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-gray-100 absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-1 text-muted-foreground hover:text-foreground transition-all duration-200">
            <span class="icon-copy text-gray-500" ></span>
          </button>
        </div>
        <div id="regex-error" class="text-red-600 text-sm mt-2 hidden"></div>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Flags</label>
        <div class="flex space-x-4">
          <label class="flex items-center relative bg-(--color-result-bg) p-1 pr-2 pl-2 rounded-sm">
            <input type="checkbox" id="flag-g" class="mr-2 rounded cursor-pointer size-(--checkbox-size)" checked />
            <span class="sm:hidden font-semibold text-gray-700 text-sm select-none mr-1">
              G
            </span>
            <span class="hidden sm:inline text-gray-700 text-sm select-none">Global</span>
            <div class="ml-1 group flex items-center">
              <span class="icon-info text-(--color-info-icon) cursor-help"></span>
              <span class="absolute z-10 invisible w-52 bg-white text-gray-700 text-sm shadow-sm rounded-md py-2 px-3 bottom-full left-1 opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300">
                Global: Retain the lastIndex property, allowing iterative searching. Example: /abc/g
              </span>
            </div>
          </label>
          <label class="flex items-center relative bg-(--color-result-bg) p-1 pr-2 pl-2 rounded-sm">
            <input type="checkbox" id="flag-i" class="mr-2 rounded cursor-pointer size-(--checkbox-size)" />
            <span class="sm:hidden font-semibold text-gray-700 text-sm select-none mr-1">
              I
            </span>
            <span class="hidden sm:inline text-gray-700 text-sm select-none">Case Insensitive</span>
            <div class="ml-1 group flex items-center">
              <span class="icon-info text-(--color-info-icon) cursor-help" ></span>
              <span class="absolute z-10 invisible w-52 bg-white text-gray-700 text-sm shadow-sm rounded-md py-2 px-3 bottom-full left-13 opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300">
                Case Insensitive: Perform case-insensitive matching. Example: /abc/i
              </span>
            </div>
          </label>
          <label class="flex items-center relative bg-(--color-result-bg) p-1 pr-2 pl-2 rounded-sm">
            <input type="checkbox" id="flag-m" class="mr-2 rounded cursor-pointer size-(--checkbox-size)" />
            <span class="sm:hidden font-semibold text-gray-700 text-sm select-none mr-1">
              M
            </span>
            <span class="hidden sm:inline text-gray-700 text-sm select-none">Multiline</span>
            <div class="ml-1 group flex items-center">
              <span class="icon-info text-(--color-info-icon) cursor-help"></span>
              <span class="absolute z-10 invisible w-52 bg-white text-gray-700 text-sm shadow-sm rounded-md py-2 px-3 bottom-full left-1 opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300">
                Multiline: Control the behavior of ^ and $ anchors. Example: /abc$/m
              </span>
            </div>
          </label>
        </div>
      </div>
      <div class="mb-6">
        <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Test Text</label>
        <textarea id="text" placeholder="Enter your text here" class="border-1 border-gray-300 rounded-md px-3 py-2 text-gray-700 w-full min-h-[100px] resize-y focus-visible:outline-(--color-highlight-text) placeholder:font-[300]"></textarea>
      </div>
      <div>
        <label for="output" class="block text-gray-700 text-sm font-bold mb-2">Results</label>
        <div id="output" class="bg-(--color-result-bg) border-(--color-result-border) border-1 rounded-md p-6 min-h-[80px] relative">
          <p id="initial-output-description" class="text-gray-400 italic text-base absolute top-1/2 left-1 -translate-x-1/2 -translate-y-1/2 text-center w-9/10">
            Please enter a valid regular expression and text to see the results.
          </p>
        </div>
      </div>
    </div>
    <script>
      document.addEventListener("DOMContentLoaded", (event) => {
        const regexInput = document.getElementById("regex");
        const regexCopyBtn = document.getElementById("regex-copy");
        const textInput = document.getElementById("text");
        const output = document.getElementById("output");
        const initialOutputDescription = document.getElementById("initial-output-description");
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
            if (regex.global) { // handle global
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
            } else { // handle non-global
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
    </script>
  </body>
</html>
```
This code implements a web page for testing regular expressions using HTML, CSS, JavaScript, and Tailwind CSS for styling. The page allows users to write regular expressions and input text to test them against. Every matched character is highlighted in the result section.
Let me know if you'd like to add new features, such as real-time match count.
