
export function convertResponse<T>(responseData) {
    return <T[]>responseData.map(response => {
        const retrievedPlaces: Object = response.payload.doc.data();
        return {
            id: response.payload.doc.id,
            ...retrievedPlaces
        }
    });
}