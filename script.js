const palData = [
    { id: "No. 111", name: "Jetragon", elements: ["Dragon"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Jetragon.png", source: "https://palworld.fandom.com/wiki/Jetragon/Gallery", skill: "Aerial Missile (Missile launcher mount)", work: ["Gathering Lv.3"] },
    { id: "No. 110", name: "Frostallion", elements: ["Ice"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Frostallion.png", source: "https://palworld.fandom.com/wiki/Frostallion/Gallery", skill: "Ice Pegasus (Converts player damage to Ice)", work: ["Cooling Lv.4"] },
    { id: "No. 108", name: "Paladius", elements: ["Neutral"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Paladius.png", source: "https://palworld.fandom.com/wiki/Paladius/Gallery", skill: "Holy Knight (Triple jump mount)", work: ["Lumbering Lv.2", "Mining Lv.2"] },
    { id: "No. 109", name: "Necromus", elements: ["Dark"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Necromus.png", source: "https://palworld.fandom.com/wiki/Necromus/Gallery", skill: "Dark Knight (Double jump mount)", work: ["Lumbering Lv.2", "Mining Lv.2"] },
    { id: "No. 074B", name: "Jormuntide Ignis", elements: ["Fire", "Dragon"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Jormuntide_Ignis.png", source: "https://palworld.fandom.com/wiki/Jormuntide_Ignis/Gallery", skill: "Stormbringer Lava Dragon", work: ["Kindling Lv.4"] },
    { id: "No. 113", name: "Bellanoir Libero", elements: ["Dark"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Bellanoir_Libero.png", source: "https://palworld.fandom.com/wiki/Bellanoir_Libero/Gallery", skill: "Nightmare Siren (Beam Attack)", work: ["Handiwork Lv.4", "Medicine Lv.4", "Transport Lv.2"] },
    { id: "No. 096", name: "Blazamut", elements: ["Fire"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Blazamut.png", source: "https://palworld.fandom.com/wiki/Blazamut/Gallery", skill: "Magma Kaiser (Boosts Fire attacks)", work: ["Kindling Lv.3", "Mining Lv.4"] },
    { id: "No. 107", name: "Shadowbeak", elements: ["Dark"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Shadowbeak.png", source: "https://palworld.fandom.com/wiki/Shadowbeak/Gallery", skill: "Modified DNA (Divine Disaster attack)", work: ["Gathering Lv.1"] },
    { id: "No. 100", name: "Anubis", elements: ["Ground"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Anubis.png", source: "https://palworld.fandom.com/wiki/Anubis/Gallery", skill: "Guardian Deity (Auto-dodges attacks)", work: ["Handiwork Lv.4", "Transport Lv.2", "Mining Lv.3"] },
    { id: "No. 099", name: "Knocklem", elements: ["Ground"], img: "https://raw.githubusercontent.com/mlg98/palworld-pals/main/images/Knocklem.png", source: "https://palworld.fandom.com/wiki/Knocklem/Gallery", skill: "Steel Guardian (Massive Combat Buff)", work: ["Handiwork Lv.4", "Transport Lv.3", "Mining Lv.4"] }
];

const palGrid = document.getElementById('palGrid');
const modal = document.getElementById('palModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

function getElementColor(type) {
    const key = type.toLowerCase();
    return `var(--${key}-color)`;
}

// Helper to generate a dynamic, animated CSS background based on the Pal's elements
function generateAnimatedLogoHtml(name, elements) {
    const insignia = name.substring(0, 2).toUpperCase();
    const primaryColor = getElementColor(elements[0]);
    // If dual type, mix colors; otherwise, mix primary with a dark shade
    const secondaryColor = elements[1] ? getElementColor(elements[1]) : 'rgba(0,0,0,0.4)'; 

    return `
        <div class="pal-animated-logo" style="--primary-el: ${primaryColor}; --secondary-el: ${secondaryColor};">
            <div class="logo-pulse-ring"></div>
            <span class="logo-text">${insignia}</span>
        </div>
    `;
}

// Render Main Dashboard Layout Grid
palData.forEach((pal, idx) => {
    const card = document.createElement('div');
    card.classList.add('pal-card');
    
    const elementBadges = pal.elements.map(el => 
        `<span class="tag-el" style="color: ${getElementColor(el)}">${el}</span>`
    ).join('');

    // Dynamic animated logo generation replaces standard <img> layout
    const logoMarkup = generateAnimatedLogoHtml(pal.name, pal.elements);

    card.innerHTML = `
        <div class="pal-id">${pal.id}</div>
        <div class="pal-img-frame">
            ${logoMarkup}
        </div>
        <div class="pal-name">${pal.name}</div>
        <div class="type-container">${elementBadges}</div>
    `;
    
    card.addEventListener('click', () => triggerModal(idx));
    palGrid.appendChild(card);
});

// Structural injection for detailed overlay modules
function triggerModal(idx) {
    const pal = palData[idx];
    
    const elementBadges = pal.elements.map(el => 
        `<span class="tag-el" style="background: rgba(255,255,255,0.04); color: ${getElementColor(el)}">${el}</span>`
    ).join('');

    const workChips = pal.work.map(task => 
        `<span class="suitability-chip">${task}</span>`
    ).join('');

    const logoMarkup = generateAnimatedLogoHtml(pal.name, pal.elements);

    modalBody.innerHTML = `
        <div class="modal-display-head">
            <div class="pal-img-frame" style="width: 140px; height: 140px; margin: 0 auto 1rem;">
                ${logoMarkup}
            </div>
            <h2>${pal.name}</h2>
            <div class="pal-id" style="margin-top: 0.25rem;">${pal.id}</div>
        </div>
        <div class="panel-block">
            <h4>Elemental Affinity</h4>
            <div class="type-container" style="justify-content: flex-start; margin-top: 0.25rem;">${elementBadges}</div>
        </div>
        <div class="panel-block">
            <h4>Unique Partner Trait</h4>
            <p>${pal.skill}</p>
        </div>
        <div class="panel-block">
            <h4>Base Labor Work Suitability</h4>
            <div class="suitability-grid">${workChips}</div>
        </div>
        <div class="panel-block" style="text-align: center; border: none; background: transparent; margin-top: 1.5rem;">
            <a href="${pal.source}" target="_blank" rel="noopener noreferrer" class="wiki-action-btn">
                🌐 View Official Wiki Gallery
            </a>
        </div>
    `;
    modal.style.display = 'flex';
}

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});