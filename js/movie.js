/* DOM 요소 */
const $section = document.getElementById('movie-section');

/********************************************************************************/

/* TMDB API를 사용해서 데이터 받아오기 */
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc', options)
        .then((response) => response.json())
        .then((response) => {
            $section.innerHTML = '';

            // 받아온 데이터를 동적으로 화면에 그려주기
            response.results.map((movie) => {
                const poster = document.createElement('div');
                poster.className = 'movie-poster';
                poster.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`;

                // 영화 상세 정보 Modal 창 닫기
                poster.addEventListener('click', async function () {
                    await printData(movie);
                    $modal.style.display = 'flex';
                });

                const title = document.createElement('div');
                title.className = 'movie-title';
                title.innerText = movie.title;

                poster.appendChild(title);
                $section.appendChild(poster);
            });
        })
        .catch((err) => console.error(err));
});
