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
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    // Gestion des miniatures
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            // Désactiver l'autoplay temporairement
            swiper.autoplay.stop();
            
            // Naviguer vers l'image correspondante
            swiper.slideToLoop(index, 800);
            
            // Mettre à jour la miniature active
            updateActiveThumbnail(index);
            
            // Réactiver l'autoplay après un court délai
            setTimeout(() => {
                swiper.autoplay.start();
            }, 2000);
        });
    });

    function updateActiveThumbnail(index) {
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
    }

    // Mettre à jour la miniature active lors du changement de slide
    swiper.on('slideChange', () => {
        updateActiveThumbnail(swiper.realIndex);
    });
});
