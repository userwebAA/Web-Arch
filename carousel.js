document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        effect: 'creative',
        creativeEffect: {
            prev: {
                translate: ['-120%', 0, -500],
                rotate: [0, 0, -90],
                opacity: 0
            },
            next: {
                translate: ['120%', 0, -500],
                rotate: [0, 0, 90],
                opacity: 0
            }
        },
        grabCursor: true,
        speed: 1000,
        loop: true,
        parallax: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"><span class="bullet-text">' + (index + 1) + '</span></span>';
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
});
