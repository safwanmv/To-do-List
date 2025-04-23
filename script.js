const listContainer = document.getElementById('list-container');

function toggleCheck(el) {
    el.classList.toggle("line-through");
    el.classList.toggle("text-[#555]");

    const icon = el.querySelector(".checkbox-icon");
    const isChecked = el.classList.contains("line-through");

    icon.style.backgroundImage = isChecked
        ? "url('assests/img/checked.png')"
        : "url('assests/img/unchecked.png')";

    saveData();
}

function addTask() {
    const input = document.getElementById('input-box');

    if (input.value === '') {
        alert("Write Something!!!!");
    } else {
        const li = document.createElement("li");
        li.className = "relative list-none text-[17px] pl-[50px] pr-10 py-3 select-none cursor-pointer container bg-gray-100 rounded shadow-sm flex gap-2 transition-all duration-300";

        li.innerHTML = `
            <span class="checkbox-icon absolute top-[12px] left-[8px] w-[28px] h-[28px] bg-center bg-cover rounded-full" 
                style="background-image: url('assests/img/unchecked.png');"></span>
            <span class="absolute top-[5px] right-1 w-10 h-10 text-[22px] text-[#555] leading-[40px] text-center rounded-lg hover:bg-gray-400 cursor-pointer transition-all ease-in-out" 
                onclick="removeTask(this)">×</span>
            ${input.value}
        `;

        li.addEventListener("click", function () {
            toggleCheck(li);
        });

        listContainer.appendChild(li);
        input.value = "";
        saveData();
    }
}

function removeTask(el) {
    const listItem = el.closest("li");
    listItem.remove();
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";

    const allTasks = listContainer.querySelectorAll("li");
    allTasks.forEach(li => {
        li.addEventListener("click", function () {
            toggleCheck(li);
        });
    });
}

document.addEventListener("DOMContentLoaded", showTask);
