
'use strict';
function initFilter() {
  const searchInput = document.getElementById('searchInput');
  const chips       = document.querySelectorAll('.chip');

  let activeSpec    = 'all';
  let searchQuery   = '';

  /* ── Apply both filters ── */
  function applyFilters() {
    let result = doctors; // from doctors.js

    // 1. Specialization filter
    if (activeSpec !== 'all') {
      result = result.filter(d =>
        d.specialization.toLowerCase() === activeSpec.toLowerCase()
      );
    }

    // 2. Name / hospital search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.hospital.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q)
      );
    }

    showDoctors(result); // from doctors.js
  }

  /* ── Chip click ── */
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeSpec = chip.dataset.spec;
      applyFilters();
    });
    chip.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        chip.click();
      }
    });
  });

  /* ── Search input ── */
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = searchInput.value;
        applyFilters();
      }, 260);
    });

    // clear on Escape
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchQuery = '';
        applyFilters();
      }
    });
  }
}
