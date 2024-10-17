/* TMDB API를 사용해서 데이터 받아오기 */
document.addEventListener('DOMContentLoaded', async function () {
    setLocalStorage();

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc', options)
        .then((response) => response.json())
        .then((response) => {
            movieDataList = response.results;

            $movieSection.innerHTML = '';

            // 받아온 데이터를 동적으로 화면에 그려주기
            response.results.map((movie) => {
                const poster = document.createElement('div');
                poster.id = movie.id;
                poster.className = 'movie-poster';
                poster.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`;

                // 영화 상세 정보 Modal 창 열기 이벤트
                poster.addEventListener('click', function () {
                    openModal(movie);
                });

                const title = document.createElement('div');
                title.className = 'movie-title';
                title.innerText = movie.title;

                poster.appendChild(title);
                $movieSection.appendChild(poster);
            });
        })
        .then(() => {
            $movieList = document.querySelectorAll('.movie-poster');
        })
        .catch((err) => console.error(err));
});

/********************************************************************************/

/* localStorage 데이터 세팅하기 */
function setLocalStorage() {
    window.localStorage.setItem('page-state', 'total');

    if (!window.localStorage.getItem('bookmarks')) {
        window.localStorage.setItem('bookmarks', JSON.stringify([]));
    }
}

/* modal 창 열기 */
async function openModal(data) {
    await printModalData(data);
    $modal.style.display = 'flex';
}

/* modal 창에 데이터 놓기 */
async function printModalData(data) {
    bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    $modalPoster.src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
    $modalTitle.innerText = data.title;
    $modalOverview.innerText = data.overview;
    $modalRelease.innerText = data.release_date;
    $modalAverage.innerText = `⭐ ${data.vote_average}`;

    $modalBookmarkBtn.id = data.id;
    $modalBookmarkBtn.innerText = `북마크 ${bookmarkList.includes(data.id.toString()) ? '제거' : '추가'}`;
}
