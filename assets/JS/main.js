document.addEventListener('DOMContentLoaded', function () {
    const imgs = document.querySelectorAll('.banner-imgs .banner-img');
    let current = 0;

    function showNextImage() {
        imgs[current].classList.remove('active');
        let next = (current + 1) % imgs.length;
        imgs[next].classList.add('active');
        current = next;
    }

    setInterval(showNextImage, 3500);
});
