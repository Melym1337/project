import { renderTable } from './table.js';
import { initSearch } from './search.js';
import { openModal } from './modal.js';
import { initMenu } from './menu.js';

export const App = {
    students: [],
    currentStudent: null,

    async init() {
        const res = await fetch('./students.json');
        this.students = await res.json();
        this.students.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

        renderTable(this.students, (student) =>
            openModal(student, (s) => this.currentStudent = s)
        );

        initSearch(this.students, (list) =>
            renderTable(list, (student) =>
                openModal(student, (s) => this.currentStudent = s)
            )
        );

        initMenu();
    }
};