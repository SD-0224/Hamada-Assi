
export const fetchTopics = async function(){
    try {
        const response = await fetch('https://tap-web-1.herokuapp.com/topics/list');
        if (!response.ok) {
            throw new Error('Something went wrong. Web topics failed to load.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Something went wrong. Web topics failed to load.', error);
        throw error;
    }
}