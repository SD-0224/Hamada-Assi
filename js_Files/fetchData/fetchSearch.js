export const fetchSearch = async function(phrase){
    try {
        const response = await fetch(`https://tap-web-1.herokuapp.com/topics/list?phrase=${phrase}`);
        if (!response.ok) {
            throw new Error('Something went wrong. failed to load.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Something went wrong. failed to load.', error);
        throw error;
    }
}