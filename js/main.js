const saveListEl = document.getElementById('save-list');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');

let saves = [];

fetch('saves.json')
  .then(res => res.json())
  .then(data => {
    saves = data;
    renderSaves(saves);
  });

function renderSaves(list) {
  saveListEl.innerHTML = '';

  // Sort by date
  const sorted = [...list].sort((a, b) => {
    if (sortSelect.value === 'newest') return new Date(b.date) - new Date(a.date);
    else return new Date(a.date) - new Date(b.date);
  });

  sorted.forEach(save => {
    const div = document.createElement('div');
    div.className = 'save-card';
    div.innerHTML = `
      <h3>${save.game} - ${save.title}</h3>
      <p>Platform: ${save.platform} | Region: ${save.region}</p>
      <p>Tags: ${save.tags}</p>
      <p>Date: ${save.date}</p>
      <button onclick="startOGAds('${save.file_path}')">Download</button>
    `;
    saveListEl.appendChild(div);
  });
}

// Search
searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = saves.filter(s => 
    s.game.toLowerCase().includes(query) || 
    s.title.toLowerCase().includes(query) ||
    s.tags.toLowerCase().includes(query)
  );
  renderSaves(filtered);
});

// Sort change
sortSelect.addEventListener('change', () => renderSaves(saves));

function startOGAds(link) {
  alert('OGAds locker would start here before redirecting to the link.');
}