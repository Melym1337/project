import { formatDate } from './utils.js';

export function renderTable(students, onDownloadClick) {
    const table = document.getElementById("studentsTable");
    if (!table) return;

    table.innerHTML = `
        <tr>
            <th>№</th>
            <th>Имя ученика</th>
            <th>Предмет</th>
            <th>Дата</th>
            <th>Сертификат</th>
        </tr>
    `;

    students.forEach((student, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.subject}</td>
            <td>${formatDate(student.date)}</td>
            <td><a href="#" class="download-btn">Скачать</a></td>
        `;

        row.querySelector('.download-btn').onclick = (e) => {
            e.preventDefault();
            onDownloadClick(student);
        };
    });
}