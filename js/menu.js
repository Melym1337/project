export function initMenu() {
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
}


// App.initMenu = function() {
