// Like and Dislike Buttons
const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");
const likeCount = document.getElementById("like-count");
const dislikeCount = document.getElementById("dislike-count");

// Initialize counts
likeCount.textContent = localStorage.getItem("likeCount") || 0;
dislikeCount.textContent = localStorage.getItem("dislikeCount") || 0;

// Check if the user already voted
const userVote = localStorage.getItem("userVote");

if (userVote === "liked") {
    likeBtn.disabled = true;
} else if (userVote === "disliked") {
    dislikeBtn.disabled = true;
}

likeBtn.addEventListener("click", () => {
    if (!userVote) { // Only allow voting if user hasn't voted yet
        let count = parseInt(localStorage.getItem("likeCount") || 0) + 1;
        localStorage.setItem("likeCount", count);
        likeCount.textContent = count;

        // Disable further votes and store the user vote
        localStorage.setItem("userVote", "liked");
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
    }
});

dislikeBtn.addEventListener("click", () => {
    if (!userVote) { // Only allow voting if user hasn't voted yet
        let count = parseInt(localStorage.getItem("dislikeCount") || 0) + 1;
        localStorage.setItem("dislikeCount", count);
        dislikeCount.textContent = count;

        // Disable further votes and store the user vote
        localStorage.setItem("userVote", "disliked");
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const commentInput = document.getElementById("comment-input");
    const submitCommentBtn = document.getElementById("submit-comment");
    const commentList = document.getElementById("comment-list");

    // Load existing comments from localStorage
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach(comment => {
        displayComment(comment.text, comment.timestamp);
    });

    // Add a new comment
    submitCommentBtn.addEventListener("click", () => {
        const comment = commentInput.value.trim();
        if (comment) {
            const timestamp = new Date().toLocaleString(); // Get the current timestamp
            const newComment = { text: comment, timestamp: timestamp };

            comments.push(newComment); // Add the new comment with timestamp
            localStorage.setItem("comments", JSON.stringify(comments)); // Save comments to localStorage
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
});