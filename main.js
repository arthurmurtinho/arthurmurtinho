function fadeOut(e) {
    e.preventDefault();               // stop default link jump
    const link = e.currentTarget.href;
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = 0;  // fade out
    setTimeout(() => {
        window.location = link;       // go to new page after fade
    }, 300); // matches transition duration
}

// Optional: fade in on page load
window.onload = () => {
    document.body.style.opacity = 0;
    document.body.style.transition = "opacity 0.3s ease";
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 10);
};

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