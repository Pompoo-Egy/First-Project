    const profileImg = document.getElementById('profileImg');
    const imageModal = document.getElementById('imageModal');
    const fullImg = document.getElementById('fullImg');
    const closeModal = document.getElementById('closeModal');

    profileImg.addEventListener('click', function() {
        imageModal.style.display = 'flex';
        fullImg.src = this.src;
    });

    closeModal.addEventListener('click', () => imageModal.style.display = 'none');

    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) imageModal.style.display = 'none';
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.style.display === 'flex') {
            imageModal.style.display = 'none';
        }
    });
