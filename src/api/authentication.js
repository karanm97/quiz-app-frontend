// register user
export const registerUser = async (email, password) => {
	const response = await fetch("http://localhost:3000/api/users/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	const responseJSON = await response.json();
	return responseJSON;
};

export const loginUser = async (email, password) => {
	const response = await fetch("http://localhost:3000/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	const responseJSON = await response.json();
	return responseJSON;
};
