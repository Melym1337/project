/* ===================================================
   🚀 CORE APPLICATION OBJECT
=================================================== */
const App = {
    students: [],
    currentStudent: null,

    async init() {
        try {
            const response = await fetch('./students.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            this.students = await response.json();
            
            // Сортировка по алфавиту сразу при загрузке
            this.students.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

            this.initModules();
            this.initEventListeners();
            this.renderTable(this.students);
        } catch (err) {
            console.error("Критическая ошибка инициализации:", err);
        }
    },

    initModules() {
        this.initSearch();
        this.initMenu();
    },

    initEventListeners() {
        // Закрытие модалки
        document.getElementById("cancelModal").onclick = () => this.closeModal();
        window.onclick = (e) => {
            if (e.target === document.getElementById("passwordModal")) this.closeModal();
        };
        
        // Горячие клавиши
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.closeModal();
            if (e.key === "Enter" && this.currentStudent) this.handlePasswordSubmit();
        });

        // Кнопка подтверждения
        document.getElementById("confirmPassword").onclick = () => this.handlePasswordSubmit();

        // Переключатель видимости пароля
        this.initPasswordToggle();
    }
};

/* ===================================================
   📊 UI & TABLE MODULE
=================================================== */
App.renderTable = function(list) {
    const table = document.getElementById("studentsTable");
    if (!table) return;

    // Оставляем только шапку
    table.innerHTML = `
        <tr>
            <th>№</th>
            <th>Имя ученика</th>
            <th>Предмет</th>
            <th>Дата</th>
            <th>Сертификат</th>
        </tr>`;

        list.forEach((student, index) => {
            const row = table.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.subject}</td>
            <td>${this.formatDate(student.date)}</td>
            <td><a href="#" class="download-btn">Скачать</a></td>
            `;
            // <td>${new Date(student.date).toLocaleDateString('ru-RU')}</td>
            // const date = student.date ? new Date(student.date).toLocaleDateString('ru-RU') : "—";
            
            row.querySelector('.download-btn').onclick = (e) => {
                e.preventDefault();
                this.openModal(student);
            };
            
    });
};
App.formatDate = function(dateStr) {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return isNaN(date) ? dateStr : date.toLocaleDateString('ru-RU');
};
/* ===================================================
   🔐 MODAL & PASSWORD MODULE
=================================================== */
App.openModal = function(student) {
    this.currentStudent = student;
    document.getElementById("modalStudentName").textContent = student.name;
    const input = document.getElementById("modalPasswordInput");
    input.value = "";
    document.getElementById("passwordModal").style.display = "flex";
    setTimeout(() => input.focus(), 50);
};

App.closeModal = function() {
    document.getElementById("passwordModal").style.display = "none";
    this.currentStudent = null;
};

App.handlePasswordSubmit = function() {
    const input = document.getElementById("modalPasswordInput");
    if (!this.currentStudent) return;

    if (input.value === this.currentStudent.password) {
        const link = document.createElement("a");
        link.href = this.currentStudent.certificate;
        link.download = `${this.currentStudent.name}_${this.currentStudent.subject}.pdf`;
        link.click();
        this.closeModal();
    } else {
        input.classList.add("input-error");
        setTimeout(() => input.classList.remove("input-error"), 400);
        input.value = "";
        input.focus();
    }
};

App.initPasswordToggle = function() {
    const input = document.getElementById("modalPasswordInput");
    const btn = document.getElementById("togglePassword");
    if (!btn) return;

    btn.onclick = () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        btn.innerHTML = isPassword ? '👁️‍🗨️' : '👁️'; // Здесь можно оставить ваши SVG
    };
};

/* ===================================================
   🔎 SEARCH & MENU
=================================================== */
App.initSearch = function() {
    const input = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearSearch");
    if (!input) return;

    input.oninput = () => {
        const val = input.value.toLowerCase();
        const filtered = this.students.filter(s => s.name.toLowerCase().includes(val));
        this.renderTable(filtered);
        if (clearBtn) clearBtn.style.display = val ? "block" : "none";
    };

    if (clearBtn) {
        clearBtn.onclick = () => {
            input.value = "";
            this.renderTable(this.students);
            clearBtn.style.display = "none";
        };
    }
};

App.initMenu = function() {
    document.querySelectorAll(".toggle").forEach(toggle => {
        toggle.onclick = (e) => {
            e.stopPropagation();
            const submenu = toggle.nextElementSibling;
            if (submenu) submenu.classList.toggle("active"); // Или ваша логика открытия
        };
    });
};

// Запуск
document.addEventListener("DOMContentLoaded", () => App.init());
App.initMenu = function() {
    const toggles = document.querySelectorAll(".toggle");

    toggles.forEach(toggle => {
        toggle.onclick = (e) => {
            e.stopPropagation();
            const parent = toggle.parentElement;
            const submenu = toggle.nextElementSibling;
            if (!submenu) return;

            // закрываем соседей
            const siblings = parent.parentElement.children;
            for (let sib of siblings) {
                if (sib !== parent) {
                    sib.classList.remove("open");
                    const sub = sib.querySelector(".submenu");
                    if (sub) sub.style.display = "none";
                }
            }

            const isOpen = submenu.style.display === "block";
            submenu.style.display = isOpen ? "none" : "block";
            parent.classList.toggle("open", !isOpen);
        };
    });
};