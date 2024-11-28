
// register user
export const registerUser = async (email, password) => {
	const apiUrl = process.env.NODE_API_URL;
	const response = await fetch(`${apiUrl}/api/users/register`, {
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
	const apiUrl = process.env.NODE_API_URL;
	const response = await fetch(`${apiUrl}/api/users/login`, {

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
