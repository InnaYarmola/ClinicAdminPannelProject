const getPost = async (id) => {
    try {

        const {data} = await axios.get(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              }
        })

        return data;

    } catch (err) {

        console.log(err)
    }
}

export default getPost;