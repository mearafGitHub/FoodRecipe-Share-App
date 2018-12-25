import axios from 'axios';
const url = 'http://localhost:5000/recipes/';

class RecipeService {
    //Get posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(list => ({
                        ...list,
                        createdAt: new Date(list.createdAt)
                    }))
                );
            } catch (error) {
                reject(error);
            }
        });

    }

    static insertPost(item) {
        return axios.post(url, { ...item});
    }

    //Delete post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }

}

export default RecipeService;