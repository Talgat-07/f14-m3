const url = "https://jsonplaceholder.typicode.com/todos";

const input = document.querySelector(".input");
const button = document.querySelector(".button");
const todos = document.querySelector(".todos");

button.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value !== "") {
    todos.innerHTML += `<div class='task'>
		<p>${input.value}</p>
		<button class='delete'>Удалить</button>
		</div>`;

    input.value = "";
  } else {
    alert("Поле не должно быть пустым");
  }
});

function fetchToDo() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) => {
        todos.innerHTML += `<div class='task'>
				<p>${el.title}</p>
				<button id="${el.id}" class='delete'>Удалить</button>
				</div>`;
      });
      const buttons = document.querySelectorAll(".delete");

      // console.log(buttons);

      buttons.forEach((el) => {
        el.addEventListener("click", () => {
          fetch(`${url}/${el.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
        });
      });
    });
}

fetchToDo();
