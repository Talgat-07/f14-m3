const url = "http://localhost:3000/products"

const openCart = document.querySelector(".cart")
const closeCart = document.querySelector(".closeCart")
const wrapperCart = document.querySelector(".cartWrapper")
const items = document.querySelector('.items')
const add = document.querySelector('.add')
const module = document.querySelector('.module')
const moduleClose = document.querySelector('.moduleClose')
const addProduct = document.querySelector('.moduleAdd')

const title = document.querySelector('#title')
const price = document.querySelector('#price')
const description = document.querySelector('#description')
const category = document.querySelector('#category')
const image = document.querySelector('#image')
const rate = document.querySelector('#rate')
const count = document.querySelector('#count')



addProduct.addEventListener("click", async (e) => {
	e.preventDefault()
	const newProduct = {
		id: `${Math.floor(Math.random() * 10000)}`,
		title: title.value,
		price: price.value,
		description: description.value,
		category: category.value,
		image: image.value,
		rating: {
			rate: rate.value,
			count: count.value
		}
	}

	

	await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newProduct)
	})

})

add.addEventListener("click", () => {
	module.classList.add("openModule")
})

moduleClose.addEventListener("click", () => {
	module.classList.remove("openCart")
})

openCart.addEventListener("click", () => {
	wrapperCart.classList.add("openCart")
})

closeCart.addEventListener("click", () => {
	wrapperCart.classList.remove("openCart")
})

let products = []

const editProduct = (id) => {
	if (id) {
		addProduct.textContent = "edit"
		module.classList.add("openModule")
		const product = products.filter((el) => el.id !== id)
		title.value = product[0].title
	}
	
}

const renderProducts = () => {
	items.innerHTML = ""
	products.forEach((product) => {
		items.innerHTML += `
			<div class='item'>
				<div class='image'>
					<img src="${product.image}" alt="image">
				</div>
				<h2>${product.title}</h2>
				<div class='bottomItem'>
					<p>${product.price}</p>
					<button>Add</button>
					<button id="${product.id}" class="delete">delete</button>
					<button id="${product.id}" class="edit">edit</button>
				</div>
			</div>`
	})
	const deletes = document.querySelectorAll(".delete")
	const edits = document.querySelectorAll(".edit")

	edits.forEach((button) => {
		button.addEventListener("click", () => {
			editProduct(button.id)
		})
	})

	deletes.forEach((button) => {
		button.addEventListener("click", () => {
			products = products.filter((el) => el.id !== button.id)
			renderProducts()
			fetch(`${url}/${button.id}`, {
				method: "DELETE",
			})
		})
	})
}

const startApp = () => {
	fetch(url)
	.then((res) => res.json())
	.then((productsData) => {
		products = productsData
		renderProducts()
	})
}


startApp()