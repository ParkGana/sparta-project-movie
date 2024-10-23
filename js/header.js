import { $logo, $search, $bookmarkBtn, $movieList, bookmarkList, setBookmarkList } from './variable.js';

/********************************************************************************/

let keyword = '';

/********************************************************************************/

/* logo 클릭 이벤트 */
$logo.addEventListener('click', changeToTotal);

/* 북마크 버튼 클릭 이벤트 */
$bookmarkBtn.addEventListener('click', changeToBookmark);

/* 검색 키워드 입력 이벤트 */
$search.addEventListener('input', function () {
    // 페이지를 '전체' 모드로 설정
    window.localStorage.setItem('page-state', 'total');

    // 검색어 입력 시, 모두 소문자로 바꾸고 공백 제거
    keyword = this.value.toLowerCase().replaceAll(' ', '');

    filterMovieList();
});

/********************************************************************************/

/* 페이지를 전체 모드로 전환하기 */
function changeToTotal() {
    // 페이지를 '전체' 모드로 설정
    window.localStorage.setItem('page-state', 'total');

    // 모든 영화가 보이도록 css 설정
    $movieList.forEach((movie) => {
        movie.style.display = 'flex';
    });

    // 검색창이 보이도록 css 설정
    $search.style.display = 'block';
}

/* 페이지를 북마크 모드로 전환하기 */
function changeToBookmark() {
    // 페이지를 '북마크' 모드로 설정
    window.localStorage.setItem('page-state', 'bookmark');

    // 북마크된 영화 목록 가져오기
    setBookmarkList(JSON.parse(window.localStorage.getItem('bookmarks')));

    // 북마크된 영화만 보이도록 css 설정
    $movieList.forEach((movie) => {
        movie.style.display = bookmarkList.includes(movie.id) ? 'flex' : 'none';
    });

    // 검색창이 숨겨지도록 css 설정
    $search.style.display = 'none';
}

/* 영화 검색하기 */
function filterMovieList() {
    if ($movieList) {
        $movieList.forEach((movie) => {
            const titleDiv = movie.children[0];

            if (titleDiv) {
                // 영화 제목을 모두 소문자로 바꾸고 공백 제거
                const title = titleDiv.innerText.toLowerCase().replaceAll(' ', '');

                // 영화 제목에 검색어가 포함된 영화만 보이도록 css 설정
                movie.style.display = keyword === '' || title.includes(keyword) ? 'flex' : 'none';
            }
        });
    }
}

/********************************************************************************/

export { changeToBookmark };
