export function getDate(date) {

    const options = { year: 'numeric', month: 'short', day: '2-digit' };

    const dateString = new Date(date);
    const formatedResult = dateString.toLocaleDateString('en-US', options);

    return formatedResult;
}