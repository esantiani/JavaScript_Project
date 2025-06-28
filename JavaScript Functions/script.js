
/*feedback storage */

let feedback = [];                                      /* empty Array for storage */

function addFeedback(message) {                        /* pushes user mesasge to array */
  feedback.push(message);
  console.log("Feedback Submitted:", message);
  return feedback;
}

document.getElementById("feedbackForm").addEventListener("submit", function (e) {  /*prevents the page reload */
  e.preventDefault()
  const message = document.getElementById("feedback").value.trim();  /*checks to see feedback is not empty */
  if (message) {
    addFeedback(message);
    this.reset();                                    /* clears form */
  }
});




/* Total Price Calculartor for dog Adoption */

const prices = [399.99, 99.99, 49.99];                       /* adoption fee, Fixed Fee and License Fee */

function getTotalPrice() {
  return prices.reduce((total, price) => total + price, 0);  /* adds the total price for each item */
}
console.log(`Total price: $${getTotalPrice()}`);


/* email verification*/

const form = document.querySelector(".needs-validation");

form.addEventListener("submit", function (e) {
  e.preventDefault();                                         /* Prevent the default form submission */

  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("feedback");

  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  const isValidEmail = email.includes("@") && email.includes(".");
  const isValidMessage = message.length > 0;


  if (!isValidEmail) {
    emailInput.classList.add("is-invalid");                  /* Email validation styling */
  } else {
    emailInput.classList.remove("is-invalid");
  }


  if (!isValidMessage) {
    messageInput.classList.add("is-invalid");               /* Message textarea validation styling */
  } else {
    messageInput.classList.remove("is-invalid");
  }

  if (isValidEmail && isValidMessage) {
    
    console.log("Email:", email);                            
    console.log("Feedback:", message);

    
    form.reset();                                          /* Clear the form */
  }
});


/* Chatbot */

const chats = ["Chat 1", "Chat 2", "Chat 3", "Chat 4"];   /*4 static responses set */
const botReplies = [
  "Hello there!",
  "How can I help today?",
  "Thanks for reaching out!",
];
let chatHistory = [];                                      /* Will store { sender: "user"|"assistant", text: "..." } */


const chatList = document.querySelector(".chat-list");     /*DOM elements */
const chatContent = document.querySelector(".chat-content");
const inputBox = document.querySelector(".chat-input");
const sendButton = document.querySelector(".send-button");


function renderSidebar() {                                /* Populate sidebar on page load and loops thru chats*/
  chatList.innerHTML = ""; 
  chats.forEach((chatName) => {
    const li = document.createElement("li");
    li.textContent = chatName;
    chatList.appendChild(li);
  });
}


function getRandomReply() {                                /* Generate a random bot reply */
  const index = Math.floor(Math.random() * botReplies.length);
  return botReplies[index];
}


function renderBubble(sender, message) {                    /* makes a chat bubble */
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", sender);
  bubble.textContent = message;
  chatContent.appendChild(bubble);
  chatContent.scrollTop = chatContent.scrollHeight;
}


function handleSend() {                                      /* handles user sending message */
  const userMessage = inputBox.value.trim();      
  if (userMessage === "") return;                            /* Do nothing if empty */
  chatHistory.push({ sender: "user", text: userMessage });   /* pushes user reply if not empty */
  renderBubble("user", userMessage);
  inputBox.value = "";                                       /* reset */

  
  setTimeout(() => {                                         /*Bot reply */
    const reply = getRandomReply();
    chatHistory.push({ sender: "assistant", text: reply });  
    renderBubble("assistant", reply);
  }, 500);
}


sendButton.addEventListener("click", handleSend);            /* supports input by clicking button or pressing enter */
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});


document.addEventListener("DOMContentLoaded", () => {        /* on page load populates sidebar and displays welcome message*/
  renderSidebar();
  renderBubble("assistant", "Welcome! Type a message to begin."); 
});


