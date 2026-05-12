const STORAGE_KEY = 'klikker_data';
const COLORS = [
    '#D4AF37', '#FF007F', '#0000FF', '#556B2F',
    '#8B0000', '#9932CC', '#FF4500', '#00CED1',
    '#FFD700', '#708090', '#2E8B57', '#DC143C',
    '#000000', '#FFFFFF', '#800080', '#008080',
];
const DEFAULT_DATA = [
    {id: 1, label: 'A', value: 0, color: COLORS[0]},
    {id: 2, label: 'B', value: 0, color: COLORS[1]},
    {id: 3, label: 'C', value: 0, color: COLORS[2]},
    {id: 4, label: 'D', value: 0, color: COLORS[3]},
    {id: 5, label: 'E', value: 0, color: COLORS[4]},
    {id: 6, label: 'F', value: 0, color: COLORS[5]},
];
let counters = [];
let longPressTimer = null;
let isLongPressDetected = false;

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

function triggerFlash() {
    const overlay = document.getElementById('flash-overlay');
    overlay.classList.add('active');
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => overlay.classList.remove('active'), 100);
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
            if (isLongPressDetected) {
                isLongPressDetected = false;
                return;
            }
            counter.value++;
            saveState();
            btn.querySelector('.counter-value').innerText = counter.value;
            btn.classList.add('tap-swell');
            setTimeout(() => btn.classList.remove('tap-swell'), 100);
        });
        btn.addEventListener('mousedown', () => startLongPress(btn, counter));
        btn.addEventListener('touchstart', () => startLongPress(btn, counter), {passive: true});
        btn.addEventListener('mouseup', () => endLongPress(btn));
        btn.addEventListener('mouseleave', () => endLongPress(btn));
        btn.addEventListener('touchend', () => endLongPress(btn));
        grid.appendChild(btn);
    });
}

function startLongPress(btn, counter) {
    isLongPressDetected = false;
    longPressTimer = setTimeout(() => {
        isLongPressDetected = true;
        if (counter.value > 0) {
            btn.classList.add('long-press-active');
            counter.value--;
            saveState();
            btn.querySelector('.counter-value').innerText = counter.value;
            triggerFlash();
        }
    }, 400);
}

function endLongPress(btn) {
    clearTimeout(longPressTimer);
    if (btn) btn.classList.remove('long-press-active');
}

function toggleSettings(show) {
    const modal = document.getElementById('modal-settings');
    if (show) {
        modal.classList.remove('hidden');
        renderSettings();
    } else {
        modal.classList.add('hidden');
    }
}

function renderSettings() {
    const list = document.getElementById('settings-list');
    list.innerHTML = '';
    counters.forEach((counter, index) => {
        const row = document.createElement('div');
        row.className = 'config-row';
        const labelInput = document.createElement('input');
        labelInput.type = 'text';
        labelInput.value = counter.label;
        labelInput.addEventListener('input', (e) => {
            counter.label = e.target.value;
            saveState();
            renderGrid();
        });
        const delBtn = document.createElement('button');
        delBtn.textContent = '⨯';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', () => {
            if (counters.length > 1) {
                counters.splice(index, 1);
                saveState();
                renderSettings();
                renderGrid();
            }
        });
        row.appendChild(labelInput);
        row.appendChild(delBtn);
        list.appendChild(row);
    });
    const addBtn = document.createElement('button');
    addBtn.textContent = '+ Add Button';
    addBtn.className = 'action-btn add';
    addBtn.addEventListener('click', () => {
        const newId = counters.length > 0 ? Math.max(...counters.map(c => c.id)) + 1 : 1;
        counters.push({id: newId, label: 'NEW', value: 0, color: COLORS[newId % COLORS.length]});
        saveState();
        renderSettings();
        renderGrid();
    });
    list.appendChild(addBtn);
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset All';
    resetBtn.className = 'action-btn reset';
    resetBtn.addEventListener('click', () => {
        if (confirm('Reset all counters?')) {
            counters.forEach(c => c.value = 0);
            saveState();
            renderGrid();
            toggleSettings(false);
        }
    });
    list.appendChild(resetBtn);
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.className = 'action-btn close';
    closeBtn.addEventListener('click', () => toggleSettings(false));
    list.appendChild(closeBtn);
}

function setupListeners() {
    document.getElementById('btn-settings').addEventListener('click', () => toggleSettings(true));
    document.getElementById('btn-share').addEventListener('click', () => alert('Share feature coming soon'));
}
