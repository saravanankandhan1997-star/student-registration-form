const form = document.getElementById("studentForm");

const studentList = document.getElementById("studentList");

const count = document.getElementById("count");

const popup = document.getElementById("popup");
 
let students = JSON.parse(localStorage.getItem("students")) || [];
 
// Display all registered students

function displayStudents() {

    studentList.innerHTML = "";

    count.textContent = students.length;
 
    if (students.length === 0) {

        studentList.innerHTML = `
<tr>
<td colspan="9" class="empty">

                    No students registered yet.
</td>
</tr>

        `;

        return;

    }
 
    students.forEach(function(student, index) {

        const row = document.createElement("tr");
 
        const values = [

            index + 1,

            student.name,

            student.dob,

            student.gender,

            student.contact,

            student.email,

            student.address,

            student.course

        ];
 
        values.forEach(function(value) {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });
 
        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");
 
        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";
 
        deleteButton.addEventListener("click", function() {

            if (confirm("Do you want to delete this student?")) {

                students.splice(index, 1);

                saveStudents();

            }

        });
 
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        studentList.appendChild(row);

    });

}
 
// Save student details in the browser

function saveStudents() {

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

}
 
// Register a new student

form.addEventListener("submit", function(event) {

    event.preventDefault();
 
    const student = {

        name:

            document.getElementById("firstName").value.trim() + " " +

            document.getElementById("lastName").value.trim(),
 
        dob: document.getElementById("dob").value,

        gender: document.getElementById("gender").value,

        contact: document.getElementById("contact").value,

        email: document.getElementById("email").value.trim(),

        address: document.getElementById("address").value.trim(),

        course: document.getElementById("course").value

    };
 
    // Check whether the email is already registered

    const duplicate = students.some(function(existingStudent) {

        return existingStudent.email.toLowerCase() ===

            student.email.toLowerCase();

    });
 
    if (duplicate) {

        alert("This email is already registered!");

        return;

    }
 
    // Check the student's age

    const birthDate = new Date(student.dob + "T00:00:00");

    const today = new Date();
 
    let age = today.getFullYear() - birthDate.getFullYear();
 
    const monthDifference = today.getMonth() - birthDate.getMonth();
 
    if (

        monthDifference < 0 ||

        (monthDifference === 0 &&

            today.getDate() < birthDate.getDate())

    ) {

        age--;

    }
 
    if (age < 16) {

        alert("Student must be at least 16 years old.");

        return;

    }
 
    // Add student to the list

    students.push(student);

    saveStudents();
 
    // Clear the form

    form.reset();
 
    // Show success popup

    popup.style.display = "flex";

});
 
// Reset form fields

form.addEventListener("reset", function() {

    // The browser automatically clears the form fields.

});
 
// Close popup

document.getElementById("closePopup").addEventListener("click", function() {

    popup.style.display = "none";

});
 
// Close popup by clicking outside

popup.addEventListener("click", function(event) {

    if (event.target === popup) {

        popup.style.display = "none";

    }

});
 
// Prevent future dates of birth

document.getElementById("dob").max =

    new Date().toLocaleDateString("en-CA");
 
// Show previously registered students

displayStudents();

 