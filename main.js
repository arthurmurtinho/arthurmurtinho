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


        // const bg = document.getElementById('bg');
        // window.addEventListener("scroll", function () {
        //     const scrollY = window.scrollY;
        //     const maxScroll = 400; // fade distance
        //     const opacity = 1 - scrollY / maxScroll;
        //     bg.style.opacity = opacity < 0 ? 0 : opacity;
        // });