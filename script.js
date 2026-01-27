document.getElementById("searchInput").addEventListener("keyup", searchStudent);

function searchStudent() {
    let input = document.getElementById("searchInput");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("studentsTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            let textValue = td.textContent || td.innerText;
            if (textValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("studentsTable");

    students.forEach((student, index) => {
        let row = table.insertRow();

        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = student.name;
        row.insertCell(2).textContent = student.subject;

        let linkCell = row.insertCell(3);
        let link = document.createElement("a");
        link.href = student.certificate;
        link.target = "_blank";
        link.textContent = "Открыть";
        linkCell.appendChild(link);
    });
});
