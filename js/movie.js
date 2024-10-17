/* DOM 요소 */
const $section = document.getElementById('movie-section');
const $totalBtn = document.querySelector('.logo');
const $bookmarkBtn = document.querySelector('.bookmark');

let dataList;

/********************************************************************************/

/* TMDB API를 사용해서 데이터 받아오기 */
document.addEventListener('DOMContentLoaded', async function () {
    window.localStorage.setItem('page-state', 'total');

    // localStorage에 bookmarks 데이터 생성하기 (없을 경우)
    if (!window.localStorage.getItem('bookmarks')) {
        window.localStorage.setItem('bookmarks', JSON.stringify([]));
    }

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc', options)
        .then((response) => response.json())
        .then((response) => {
            dataList = response.results;

            $section.innerHTML = '';

            // 받아온 데이터를 동적으로 화면에 그려주기
            response.results.map((movie) => {
                const poster = document.createElement('div');
                poster.id = movie.id;
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

/* 로고 버튼 클릭 이벤트 */
$totalBtn.addEventListener('click', changeToTotal);

/* 북마크 버튼 클릭 이벤트 */
$bookmarkBtn.addEventListener('click', changeToBookmark);

/********************************************************************************/

/* 페이지를 전체 모드로 변환하기 */
function changeToTotal() {
    const $movieList = document.querySelectorAll('.movie-poster');

    window.localStorage.setItem('page-state', 'total');

    $movieList.forEach((movie) => {
        movie.style.display = 'flex';
    });
}

/* 페이지를 북마크 모드로 변환하기 */
function changeToBookmark() {
    const $movieList = document.querySelectorAll('.movie-poster');

    window.localStorage.setItem('page-state', 'bookmark');

    const bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    $movieList.forEach((movie) => {
        movie.style.display = bookmarkList.includes(movie.id) ? 'flex' : 'none';
    });
}
