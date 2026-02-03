export function openModal(student, setCurrent) {
    setCurrent(student);
    document.getElementById("modalStudentName").textContent = student.name;
    const input = document.getElementById("modalPasswordInput");
    input.value = "";
    document.getElementById("passwordModal").style.display = "flex";
    setTimeout(() => input.focus(), 50);
}

export function closeModal(clearCurrent) {
    document.getElementById("passwordModal").style.display = "none";
    clearCurrent();
}

export function handlePasswordSubmit(getCurrent) {
    const student = getCurrent();
    const input = document.getElementById("modalPasswordInput");
    if (!student) return;

    if (input.value === student.password) {
        const link = document.createElement("a");
        link.href = student.certificate;
        link.download = `${student.name}_${student.subject}.pdf`;
        link.click();
        closeModal(() => {});
    } else {
        input.classList.add("input-error");
        setTimeout(() => input.classList.remove("input-error"), 400);
        input.value = "";
        input.focus();
    }
}


