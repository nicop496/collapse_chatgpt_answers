let chatDiv = null;

setInterval(() => {
  // Find the div that contains the chat messages
  const foundChatDiv = document.querySelector("main > div > div > div > div");

  if (
    !foundChatDiv ||
    foundChatDiv === chatDiv || // Is it a different chat?
    foundChatDiv.firstChild.tagName !== "HEADER" // Are there any messages?
  )
    return;

  chatDiv = foundChatDiv;

  // Add collapse buttons to current messages
  addCollapseButtons(chatDiv.children);

  // Add collapse buttons to future messages
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        addCollapseButtons(mutation.addedNodes);
      }
    }
  }).observe(chatDiv, { childList: true, subtree: true });
}, 3000);

const arrowUpSvgIcon = `<svg class="h-4 w-4"  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>`;
const arrowDownSvgIcon = `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`;
const buttonsClass = `p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible`;

function addCollapseButtons(chatElements) {
  Array.from(chatElements)
    .filter(
      (element) =>
        element.classList.contains("group") && // Is a message?
        element.querySelector("img") // Is the message from the user?
    )
    .forEach((userMessage) => {
      const editButton = userMessage.getElementsByClassName(buttonsClass)[0];
      const buttonsDiv = editButton.parentElement;
      const collapseButton = createCollapseButton(userMessage.nextSibling);
      buttonsDiv.appendChild(collapseButton);
    });
}

function createCollapseButton(answer) {
  const btn = document.createElement("button");
  btn.className = buttonsClass;
  btn.innerHTML = arrowDownSvgIcon;
  btn.addEventListener("click", () => {
    // Is the answer hidden?
    if (answer.classList.contains("hidden")) {
      // Show it
      answer.classList.remove("hidden");
      btn.innerHTML = arrowDownSvgIcon;
    } else {
      // Hide it
      answer.classList.add("hidden");
      btn.innerHTML = arrowUpSvgIcon;
    }
  });
  return btn;
}
