
const getToken = async (formData) => {

    try {
        const { data: token } = await axios.post('https://ajax.test-danit.com/api/v2/cards/login', formData)
        localStorage.setItem('token', token);
        return token;

    } catch (err) {

        console.log(err)
    }
}

export default getToken;



