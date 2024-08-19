

const postData = async (data) => {

    try {

        const { data: result } = await axios.post("https://ajax.test-danit.com/api/v2/cards", data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })

        return result;

    } catch (err) {
        
        console.log(err)
    }


}


export default postData;