export const fetchTopic = async function(id){
    try {
        const response = await fetch(`https://tap-web-1.herokuapp.com/topics/details/${id}`);
        if (!response.ok) {
            throw new Error('Something went wrong. this topic failed to load.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Something went wrong. this topic failed to load.', error);
        throw error;
    }
}