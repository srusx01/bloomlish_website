
// Animasi Navbar

const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    // Kalau di paling atas halaman → tampilkan navbar
    if (window.scrollY === 0) {
      navbar.classList.remove('hidden');
    } else {
      // Kalau sudah scroll, tetap sembunyikan navbar
      navbar.classList.add('hidden');
    }
  });

  document.addEventListener('mousemove', (e) => {
    // Kalau kursor di atas layar (misal < 60px), tampilkan navbar
    if (e.clientY < 60) {
      navbar.classList.remove('hidden');
    } else {
      // Tapi kalau lagi scroll, dan kursor bukan di atas → sembunyikan
      if (window.scrollY > 0) {
        navbar.classList.add('hidden');
      }
    }
  });
}

// Animasi-TextBergerak-Slogan2

const rotatorText = document.querySelector('.rotator-text');
let rotatorItems = [];
let index = 0;

if (rotatorText) {
  rotatorItems = Array.from(rotatorText.children);
  setInterval(() => {
    index++;
    if (index >= rotatorItems.length) index = 0;
    const offset = -index * 30; // harus cocok dengan height di .rotator-container
    rotatorText.style.transform = `translateY(${offset}px)`;
  }, 3000); // Ganti teks setiap 3 detik
}

// Slider
// --- Logic rotasi posisi ---
  const gallery = document.getElementById('gallery');
  const cards = gallery ? Array.from(gallery.querySelectorAll('.card')) : [];
    const order = ['left','center','right']; // urutan siklik

    function applyPositions() {
      if (!cards.length) return;
      // bersihkan kelas posisi dulu
      cards.forEach(el => el.classList.remove('pos-left','pos-center','pos-right'));
      // set ulang berdasar atribut data-pos
      cards.forEach(el => {
        const p = el.dataset.pos;
        if (p) el.classList.add('pos-' + p);
      });
    }

    function rotate(dir = 1) { // dir: 1 kanan, -1 kiri
      if (!cards.length) return;
      cards.forEach(el => {
        const idx = order.indexOf(el.dataset.pos);
        let next = (idx + dir + order.length) % order.length;
        el.dataset.pos = order[next];
      });
      applyPositions();
    }

    // Klik kiri/kanan untuk bawa ke depan (center)
    cards.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.pos; // left/center/right
        if (target === 'left') rotate(1);       // geser kanan sekali
        else if (target === 'right') rotate(-1); // geser kiri sekali
        // kalau sudah center, tidak diapa-apain
      });
    });

  // Auto slide setiap 4 detik
  if (cards.length) setInterval(() => rotate(1), 4000);

  applyPositions();