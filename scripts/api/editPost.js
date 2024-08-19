const editPost = async (id, editedData) => {
    try {

        const {data} = await axios.put(`https://ajax.test-danit.com/api/v2/cards/${id}`, editedData, {
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

export default editPost;