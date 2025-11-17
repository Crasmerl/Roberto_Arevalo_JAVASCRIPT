// galeria.js: genera una galería dinámica
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  // imágenes de ejemplo (puedes sustituirlas por tus propias imágenes)
  const images = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
    'images/photo6.jpg'
  ];

  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Imagen de galería';
    img.loading = 'lazy';
    gallery.appendChild(img);
  });

  // comportamiento de lightbox simple
  gallery.addEventListener('click', (e) => {
    if(e.target.tagName !== 'IMG') return;
    const overlay = document.createElement('div');
    overlay.style.position='fixed';
    overlay.style.inset=0;
    overlay.style.background='rgba(0,0,0,.8)';
    overlay.style.display='flex';
    overlay.style.alignItems='center';
    overlay.style.justifyContent='center';
    overlay.style.zIndex=2000;
    const big = document.createElement('img');
    big.src = e.target.src;
    big.style.maxWidth='90%';
    big.style.maxHeight='90%';
    overlay.appendChild(big);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});
