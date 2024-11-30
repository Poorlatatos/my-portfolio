
// Grab elements
const selectElement = selector => {
    const element = document.querySelector(selector)
    if(element) return element;
    throw new Error(`Something went, make sure that ${selector} exists or is typed correctly`);
};

// Nav styles on scroll
const scrollHeader = () => {
    const headerElement = selectElement('#header');
    if(this.scrollY >= 15){
        headerElement.classList.add('activated');
    }else{
        headerElement.classList.remove('activated');
    }
};

window.addEventListener('scroll' , scrollHeader);

// Open menu & search pops-up
const menuToggleIcon = selectElement('#menu-toggle-icon');

const toggleMenu = () => {
    const mobileMenu = selectElement('#menu');
    mobileMenu.classList.toggle('activated');
    menuToggleIcon.classList.toggle('activated');
};



menuToggleIcon.addEventListener('click', toggleMenu);

// Open/close search form group
const formOpenBtn = selectElement('#search-icon');
const formCloseBtn = selectElement('#form-close-btn');
const searchFormContainer = selectElement('#search-form-container');

formOpenBtn.addEventListener('click' , () => searchFormContainer.classList.add('activated'));

formCloseBtn.addEventListener('click' , () => searchFormContainer.classList.remove('activated'));
// -- Close the search button with escape key
window.addEventListener('keyup', event => {
    if(event.key === 'Escape') searchFormContainer.classList.remove('activated')
});

// Switch theme/add to local storage
const bodyElement = document.body;
const themeToggleBtn = selectElement('#theme-toggle-btn');
const currentTheme = localStorage.getItem('currentTheme');

if('currentTheme'){
    bodyElement.classList.add('light-theme');
}


themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('light-theme');

    if(bodyElement.classList.contains('light-theme')){
        localStorage.setItem('currentTheme','themeActive');
    }
    else{
        localStorage.setItem('currentTheme');        
    }
});

//Swiper

// Mock data for blog posts with tags
const blogPosts = [
    {
        title: "A new project being released!",
        tags: ["project", "update", "release"],
        link: "./welcomepost1.html"
    },
    {
        title: "Welcome to my first ever proper blog post!",
        tags: ["introduction", "dev-blog", "welcome"],
        link: "./welcomepost1.html"
    },
    {
        title: "I just started on this project assignment and I'm very tired.",
        tags: ["project", "assignment", "personal"],
        link: "./welcomepost1.html"
    }
];

// Search for tags and update results
const tagSearchInput = document.getElementById("tag-search-input");
const tagResults = document.getElementById("tag-results");

tagSearchInput.addEventListener("input", () => {
    const searchQuery = tagSearchInput.value.toLowerCase().trim();
    tagResults.innerHTML = ""; // Clear previous results

    if (searchQuery) {
        const filteredPosts = blogPosts.filter(post =>
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
        );

        if (filteredPosts.length) {
            filteredPosts.forEach(post => {
                const li = document.createElement("li");
                li.textContent = post.title;
                li.addEventListener("click", () => {
                    window.location.href = post.link; // Navigate to the blog post
                });
                tagResults.appendChild(li);
            });
        } else {
            tagResults.innerHTML = "<li>No posts found.</li>";
        }
    }
});
