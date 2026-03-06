const bg = document.getElementById("bg");
const pageContent = document.getElementById("page-content");

// Fade out function
function fadeOut(e) {
    // e.preventDefault();
    const link = e.currentTarget.href;
    if (!link || e.currentTarget.target === "_blank") return;
    e.preventDefault();
    
    const overlay = document.createElement("div");
    overlay.className = "fade-overlay";
    document.body.appendChild(overlay);
    // if (bg) bg.style.opacity = 0;
    // if (pageContent) pageContent.style.opacity = 0;
    requestAnimationFrame(() => {
        overlay.style.opacity = 1;
        if (pageContent) pageContent.style.opacity = 0;
        if (bg) bg.style.opacity = 0;
    });  
    setTimeout(() => {
        window.location = link;
    }, 300);
}

// Fade in on page load
window.addEventListener("load", () => {
    // if (bg) bg.style.opacity = 0;
    // if (pageContent) pageContent.style.opacity = 0;

    requestAnimationFrame(() => {
        if (bg) bg.style.opacity = 1;
        if (pageContent) pageContent.style.opacity = 1;
    });
});

// Automatically attach fade to all links
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", fadeOut);
});

const workImages = document.querySelectorAll('.work-image img');
const collabImages = document.querySelectorAll('.collab-image img');

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, {
    threshold: 0.1
});

workImages.forEach((img, i) => {
    img.style.transitionDelay = `${i * 0.05}s`; // 0.2s between each
    observer.observe(img);
});

collabImages.forEach((img, i) => {
    img.style.transitionDelay = `${i * 0.05}s`; // 0.2s between each
    observer.observe(img);
});

const textSections = document.querySelectorAll('.work-description > div');
const textSections2 = document.querySelectorAll('.collab-description > div');
const textObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

textSections.forEach(div => textObserver.observe(div));
textSections2.forEach(div => textObserver.observe(div));
// workImages.forEach(img => observer.observe(img));


// const bg = document.getElementById('bg');
// window.addEventListener("scroll", function () {
//     const scrollY = window.scrollY;
//     const maxScroll = 400; // fade distance
//     const opacity = 1 - scrollY / maxScroll;
//     bg.style.opacity = opacity < 0 ? 0 : opacity;
// });

function loadHTML(targetId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${filePath}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(targetId).innerHTML = data;
        })
        .catch(err => console.error(err));
}