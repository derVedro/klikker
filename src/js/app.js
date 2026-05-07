const STORAGE_KEY = 'klikker_data';
const DEFAULT_DATA = [
    {id: 1, label: 'A', value: 0, color: '#D4AF37'},
    {id: 2, label: 'B', value: 0, color: '#FF007F'},
    {id: 3, label: 'C', value: 0, color: '#0000FF'},
    {id: 4, label: 'D', value: 0, color: '#556B2F'},
    {id: 5, label: 'E', value: 0, color: '#8B0000'},
    {id: 6, label: 'F', value: 0, color: '#9932CC'},
];
let counters = [];

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderGrid();
    setupListeners();
});

function loadState() {
    const stored = localStorage.getItem(STORAGE_KEY);
    counters = stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
}

function renderGrid() {
    const grid = document.getElementById('grid-container');
    grid.innerHTML = '';
    counters.forEach(counter => {
        const btn = document.createElement('button');
        btn.className = 'counter-btn';
        btn.style.backgroundColor = counter.color;
        btn.innerHTML = `<span class="counter-label">${counter.label}</span><span class="counter-value">${counter.value}</span>`;
        btn.addEventListener('click', () => {
            counter.value++;
            saveState();
            btn.querySelector('.counter-value').innerText = counter.value;
            btn.classList.add('tap-swell');
            setTimeout(() => btn.classList.remove('tap-swell'), 100);
        });
        grid.appendChild(btn);
    });
}

function setupListeners() {
    document.getElementById('btn-settings').addEventListener('click', () => {
        document.getElementById('modal-settings').classList.toggle('hidden');
    });
    document.getElementById('btn-share').addEventListener('click', () => alert('Share feature coming soon'));
}
