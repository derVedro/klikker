const DEFAULT_DATA = [
    {id: 1, label: 'A', value: 0},
    {id: 2, label: 'B', value: 0},
    {id: 3, label: 'C', value: 0},
    {id: 4, label: 'D', value: 0},
    {id: 5, label: 'E', value: 0},
    {id: 6, label: 'F', value: 0},
];
let counters = JSON.parse(JSON.stringify(DEFAULT_DATA));

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
});

function renderGrid() {
    const grid = document.getElementById('grid-container');
    grid.innerHTML = '';
    counters.forEach(counter => {
        const btn = document.createElement('button');
        btn.className = 'counter-btn';
        btn.innerHTML = `<span class="counter-label">${counter.label}</span><span class="counter-value">${counter.value}</span>`;
        btn.addEventListener('click', () => {
            counter.value++;
            btn.querySelector('.counter-value').innerText = counter.value;
        });
        grid.appendChild(btn);
    });
}