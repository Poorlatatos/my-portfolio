// Like and Dislike Buttons
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");

// Define unique keys for this page based on the file path
const pagePath = window.location.pathname;
const likeKey = `likeCount_${pagePath}`;
const dislikeKey = `dislikeCount_${pagePath}`;
const userVoteKey = `userVote_${pagePath}`;

// Initialize counts
likeCount.textContent = localStorage.getItem(likeKey) || 0;
dislikeCount.textContent = localStorage.getItem(dislikeKey) || 0;

// Check if the user already voted for this page
const userVote = localStorage.getItem(userVoteKey);

if (userVote === "liked") {
    likeBtn.disabled = true;
} else if (userVote === "disliked") {
    dislikeBtn.disabled = true;
}

// Like button functionality
likeBtn.addEventListener("click", () => {
    if (!userVote) { // Only allow voting if the user hasn't voted yet
        let count = parseInt(localStorage.getItem(likeKey) || 0) + 1;
        localStorage.setItem(likeKey, count);
        likeCount.textContent = count;

        // Disable further votes and store the user vote
        localStorage.setItem(userVoteKey, "liked");
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
    }
});

// Dislike button functionality
dislikeBtn.addEventListener("click", () => {
    if (!userVote) { // Only allow voting if the user hasn't voted yet
        let count = parseInt(localStorage.getItem(dislikeKey) || 0) + 1;
        localStorage.setItem(dislikeKey, count);
        dislikeCount.textContent = count;

        // Disable further votes and store the user vote
        localStorage.setItem(userVoteKey, "disliked");
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const commentInput = document.getElementById("comment-input");
    const submitCommentBtn = document.getElementById("submit-comment");
    const commentList = document.getElementById("comment-list");

    // Define a unique key for this page
    const pageKey = `comments_${window.location.pathname}`;

    // Load existing comments for this page from localStorage
    const comments = JSON.parse(localStorage.getItem(pageKey)) || [];
    comments.forEach(comment => {
        displayComment(comment.text, comment.timestamp);
    });

    // Add a new comment
    submitCommentBtn.addEventListener("click", () => {
        const comment = commentInput.value.trim();
        if (comment) {
            const timestamp = formatDate(new Date()); // Get the formatted timestamp
            const newComment = { text: comment, timestamp: timestamp };

            comments.push(newComment); // Add the new comment with timestamp
            localStorage.setItem(pageKey, JSON.stringify(comments)); // Save comments to localStorage with pageKey
            displayComment(comment, timestamp); // Display the new comment
            commentInput.value = ""; // Clear the input field
        }
    });

    // Function to display a comment
    function displayComment(commentText, timestamp) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${commentText}</strong> <span class="timestamp">(${timestamp})</span>`;
        commentList.appendChild(li);
    }

    // Function to format the date as dd/mm/yyyy
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1) and pad
        const year = date.getFullYear(); // Get year
        const time = date.toLocaleTimeString(); // Get localized time
        return `${day}/${month}/${year} ${time}`; // Combine in dd/mm/yyyy hh:mm:ss format
    }
});