import deleteInspiration from '../deleteInspiration.js';

const deletePost = async (id) => {
    try {
        const {data} = await axios.delete(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              }
        });

        deleteInspiration()
        return data;

    } catch (err) {
        console.log(err)
    }
}

export default deletePost;

