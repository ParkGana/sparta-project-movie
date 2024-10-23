import { makeDetailUrl, makeListUrl, makeSearchUrl } from '../config/api.js';
import { getMovieData } from './movie.js';
import { $logo, $search, $bookmarkBtn, bookmarkList, setBookmarkList, $movieSection } from './variable.js';

/********************************************************************************/

let keyword = '';
let throttling;

/********************************************************************************/

/* logo 클릭 이벤트 */
$logo.addEventListener('click', changeToTotal);

/* 북마크 버튼 클릭 이벤트 */
$bookmarkBtn.addEventListener('click', changeToBookmark);

/* 검색 키워드 입력 이벤트 */
$search.addEventListener('input', async function () {
    // 페이지를 '전체' 모드로 설정
    window.localStorage.setItem('page-state', 'total');

    keyword = this.value;

    clearTimeout(throttling);

    throttling = setTimeout(async () => {
        // 검색어가 있는 경우
        if (keyword) {
            await getMovieData(makeSearchUrl(1, keyword), 'search', true);
        }
        // 검색어가 없는 경우
        else {
            await getMovieData(makeListUrl(1), 'list', true);
        }
    }, 500);
});

/********************************************************************************/

/* 페이지를 전체 모드로 전환하기 */
async function changeToTotal() {
    // 페이지를 '전체' 모드로 설정
    window.localStorage.setItem('page-state', 'total');

    // 페이지 최상단으로 이동
    window.scrollTo({ top: 0 });

    await getMovieData(makeListUrl(1), 'list', true);

    // 검색창이 보이도록 css 설정
    $search.style.display = 'block';
}

/* 페이지를 북마크 모드로 전환하기 */
function changeToBookmark() {
    // 페이지를 '북마크' 모드로 설정
    window.localStorage.setItem('page-state', 'bookmark');

    // 페이지 최상단으로 이동
    window.scrollTo({ top: 0 });

    // 북마크된 영화 목록 가져오기
    setBookmarkList(JSON.parse(window.localStorage.getItem('bookmarks')));

    $movieSection.innerHTML = '';

    bookmarkList.forEach(async (bookmark) => {
        await getMovieData(makeDetailUrl(bookmark), 'bookmark');
    });

    // 검색창이 숨겨지도록 css 설정
    $search.style.display = 'none';
}

/********************************************************************************/

export { keyword, changeToBookmark };
