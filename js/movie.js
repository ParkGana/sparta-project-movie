import { options, makeListUrl, makeDetailUrl, makeSearchUrl } from '../config/api.js';
import {
    $movieSection,
    $modal,
    $modalPoster,
    $modalTitle,
    $modalOverview,
    $modalRelease,
    $modalAverage,
    $modalBookmarkBtn,
    $footer,
    bookmarkList,
    setMovieList,
    setBookmarkList,
    setPage
} from './variable.js';
import { keyword } from './header.js';

/********************************************************************************/

/* TMDB API를 사용해서 데이터 받아오기 */
document.addEventListener('DOMContentLoaded', async function () {
    setLocalStorage();
    await getMovieData(makeListUrl(1), 'list', true);
});

/* 화면 스크롤 이벤트 */
window.addEventListener('wheel', async function () {
    // 페이지가 '전체' 모드인 경우
    if (window.localStorage.getItem('page-state') === 'total') {
        const browserBottom = window.innerHeight; // 화면의 height 값
        const footerBottom = $footer.getBoundingClientRect().bottom; // footer 요소의 bottom 값

        // 화면의 height 값과 footer 요소의 bottom 값의 차이가 10 미만인 경우
        if (Math.abs(browserBottom - footerBottom) < 10) {
            // 검색어가 있는 경우
            if (keyword) {
                await getMovieData(makeSearchUrl(setPage(), keyword), 'search');
            }
            // 검색어가 없는 경우
            else {
                await getMovieData(makeListUrl(setPage()), 'list');
            }
        }
    }
});

/* 영화 포스터 클릭 이벤트 */
$movieSection.addEventListener('click', function (e) {
    if (e.target.className === 'movie-title') {
        openModal(e.target.id);
    }
});

/********************************************************************************/

/* localStorage 데이터 세팅하기 */
function setLocalStorage() {
    // 페이지를 '전체' 모드로 설정
    window.localStorage.setItem('page-state', 'total');

    // localStorage에 bookmarks 데이터가 없는 경우
    if (!window.localStorage.getItem('bookmarks')) {
        window.localStorage.setItem('bookmarks', JSON.stringify([]));
    }
}

/* TMDB API로 영화 데이터 가져오기 */
async function getMovieData(url, state, isReset) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // 영화 목록 또는 검색 데이터를 가져온 경우
        (state === 'list' || state === 'search') && appendMovieList(data.results, isReset);
        // 영화 상세 정보 데이터를 가져온 겨우
        state === 'detail' && printModalData(data);

        setMovieList(document.querySelectorAll('.movie-poster'));
    } catch (err) {
        console.error(err);
        window.alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
}

/* TMDB API로 가져온 영화 데이터 화면에 그려주기 */
function appendMovieList(data, isReset) {
    if (isReset) {
        $movieSection.innerHTML = '';
    }

    // 받아온 데이터를 동적으로 화면에 그려주기
    data.map((movie) => {
        const poster = document.createElement('div');
        poster.id = movie.id;
        poster.className = 'movie-poster';
        poster.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`;

        const title = document.createElement('div');
        title.id = movie.id;
        title.className = 'movie-title';
        title.innerText = movie.title;

        poster.appendChild(title);
        $movieSection.appendChild(poster);
    });
}

/* modal 창 열기 */
async function openModal(id) {
    await getMovieData(makeDetailUrl(id), 'detail');
    $modal.style.display = 'flex';
}

/* modal 창에 데이터 놓기 */
function printModalData(data) {
    // 북마크된 영화 목록 가져오기
    setBookmarkList(JSON.parse(window.localStorage.getItem('bookmarks')));

    $modalPoster.src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
    $modalTitle.innerText = data.title;
    $modalOverview.innerText = data.overview;
    $modalRelease.innerText = data.release_date;
    $modalAverage.innerText = `⭐ ${data.vote_average}`;

    $modalBookmarkBtn.id = data.id;
    $modalBookmarkBtn.innerText = `북마크 ${bookmarkList.includes(data.id.toString()) ? '제거' : '추가'}`;
}

/********************************************************************************/

export { getMovieData };
