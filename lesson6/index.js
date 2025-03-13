const newPromise = new Promise((res, rej) => {
	setTimeout(() => {
		res("good")
		rej("error")
	}, 1000)
})

async function getData() {
	try {
		const res = await newPromise
		console.log(res);
	} catch (error) {
		console.log(error);
	}
}

getData()
