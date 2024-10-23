const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIyM2M0NDQyMzMwN2IwZDc3OWU3Yjk1NjM4OGI4NSIsIm5iZiI6MTcyODk3Njc3Mi40NTIzODgsInN1YiI6IjYyMjk3ZmI3ZDM0ZWIzMDA2ZDQ0N2M5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r28Ud34p0r508gtNUEooqNx6GJ19fZp8LXDHC0GA9iY`
    }
};

/********************************************************************************/

/* TMDB API 영화 목록 URL 만들기 */
function makeListUrl(page) {
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
    const option = `language=ko-KR&page=${page}&sort_by=popularity.desc`;

    return `${baseUrl}?${option}`;
}

/* TMDB API 영화 검색 목록 URL 만들기 */
function makeSearchUrl(page, keyword) {
    console.log(page);

    const baseUrl = 'https://api.themoviedb.org/3/search/movie';
    const option = `language=ko-KR&query=${encodeURIComponent(keyword)}&page=${page}`;

    return `${baseUrl}?${option}`;
}

/* TMDB API 영화 상세 정보 URL 만들기 */
function makeDetailUrl(id) {
    const baseUrl = `https://api.themoviedb.org/3/movie/${id}`;
    const option = 'language=ko-KR';

    return `${baseUrl}?${option}`;
}

/********************************************************************************/

export { options, makeListUrl, makeSearchUrl, makeDetailUrl };
