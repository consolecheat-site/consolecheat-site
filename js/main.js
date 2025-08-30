const saveListEl = document.getElementById('save-list');
const searchInput = document.getElementById('search');

let saves = [];

fetch('saves.json')
  .then(res => res.json())
  .then(data => {
    saves = data;
    renderSaves(saves);
  });

function renderSaves(list) {
  saveListEl.innerHTML = '';
  list.forEach(save => {
    const div = document.createElement('div');
    div.className = 'save-card';
    div.innerHTML = `
      <h3>${save.game} - ${save.title}</h3>
      <p>Plattform: ${save.platform} | Region: ${save.region}</p>
      <p>Tags: ${save.tags}</p>
      <button onclick="startOGAds('${save.file_path}')">Download</button>
    `;
    saveListEl.appendChild(div);
  });
}

searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = saves.filter(s => 
    s.game.toLowerCase().includes(query) || 
    s.title.toLowerCase().includes(query) ||
    s.tags.toLowerCase().includes(query)
  );
  renderSaves(filtered);
});

function startOGAds(link) {
  alert('Hier würde der OGAds-Locker starten und danach zum Link weiterleiten.');
}
