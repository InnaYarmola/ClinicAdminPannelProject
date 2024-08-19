const getAllPosts = async () => {

    try {
        const { data } = await axios.get('https://ajax.test-danit.com/api/v2/cards', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
      
        return data;
        
    } catch (err) {
        console.log(err)
    }
}

export default getAllPosts;