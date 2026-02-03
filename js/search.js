export function initSearch(students, render) {
    const input = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearSearch");
    if (!input) return;

    input.oninput = () => {
        const val = input.value.toLowerCase();
        const filtered = students.filter(s =>
            s.name.toLowerCase().includes(val)
        );
        render(filtered);
        if (clearBtn) clearBtn.style.display = val ? "block" : "none";
    };

    if (clearBtn) {
        clearBtn.onclick = () => {
            input.value = "";
            render(students);
            clearBtn.style.display = "none";
        };
    }
}