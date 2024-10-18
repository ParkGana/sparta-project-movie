const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIyM2M0NDQyMzMwN2IwZDc3OWU3Yjk1NjM4OGI4NSIsIm5iZiI6MTcyODk3Njc3Mi40NTIzODgsInN1YiI6IjYyMjk3ZmI3ZDM0ZWIzMDA2ZDQ0N2M5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r28Ud34p0r508gtNUEooqNx6GJ19fZp8LXDHC0GA9iY`
    }
};

const apiDefaultBaseUrl = 'https://api.themoviedb.org/3/discover/movie';
const apiSearchBaseUrl = 'https://api.themoviedb.org/3/search/movie';

/********************************************************************************/

/* TMDB API URL 만들기 */
function makeUrl(page, keyword) {
    const baseUrl = keyword ? apiSearchBaseUrl : apiDefaultBaseUrl;
    const query = keyword ? `query=${encodeURIComponent(keyword)}` : '';
    const option = `include_adult=false&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc`;

    return `${baseUrl}?${query}&${option}`;
}
