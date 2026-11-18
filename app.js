/* ===== إدارة الأوزان ===== */
const weightForm = document.querySelector('form');
const weightsTable = document.querySelector('table tbody') || createTbody();

weightForm.addEventListener('submit', e => {
  e.preventDefault();
  const [dateInput, weightInput, typeInput, notesInput, tagInput] = weightForm.querySelectorAll('input, select, textarea');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${dateInput.value || '—'}</td>
    <td>${weightInput.value || '—'}</td>
    <td>${typeInput.value || '—'}</td>
  `;
  weightsTable.appendChild(row);
  saveWeights();
  weightForm.reset();
});

function createTbody() {
  const table = document.querySelector('table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  return tbody;
}

function saveWeights() {
  const rows = [...weightsTable.rows].map(r => ({
    date: r.cells[0].textContent,
    weight: r.cells[1].textContent,
    type: r.cells[2].textContent
  }));
  localStorage.setItem('weights', JSON.stringify(rows));
}

function loadWeights() {
  const data = JSON.parse(localStorage.getItem('weights') || '[]');
  data.forEach(d => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${d.date}</td><td>${d.weight}</td><td>${d.type}</td>`;
    weightsTable.appendChild(row);
  });
}

/* ===== إدارة الأحداث (يمكن توسعتها لاحقاً) ===== */
console.log('🐑 تطبيق الحيوان جاهز — البيانات محفوظة في localStorage');

/* تحميل الأوزان المحفوظة عند فتح الصفحة */
document.addEventListener('DOMContentLoaded', loadWeights);