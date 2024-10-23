import { makeListUrl, makeSearchUrl } from '../config/api.js';
import { $footer, setPage } from './variable.js';
import { keyword } from './header.js';
import { getMovieData } from './movie.js';

let throttling;

/* 화면 새로고침 시 페이지 최상단으로 이동 */
history.scrollRestoration = 'manual';

/* 화면 스크롤 이벤트 */
window.addEventListener('wheel', async function () {
    // 페이지가 '전체' 모드인 경우
    if (window.localStorage.getItem('page-state') === 'total') {
        const browserBottom = window.innerHeight; // 화면의 height 값
        const footerBottom = $footer.getBoundingClientRect().bottom; // footer 요소의 bottom 값

        // 화면의 height 값과 footer 요소의 bottom 값의 차이가 50 미만인 경우
        if (Math.abs(browserBottom - footerBottom) < 50) {
            clearTimeout(throttling);

            throttling = setTimeout(async () => {
                // 검색어가 있는 경우
                if (keyword) {
                    await getMovieData(makeSearchUrl(setPage(), keyword), 'search');
                }
                // 검색어가 없는 경우
                else {
                    await getMovieData(makeListUrl(setPage()), 'list');
                }
            }, 500);
        }
    }
});
