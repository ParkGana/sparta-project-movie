/* logo 클릭 이벤트 */
$logo.addEventListener('click', changeToTotal);

/* 북마크 버튼 클릭 이벤트 */
$bookmarkBtn.addEventListener('click', changeToBookmark);

/********************************************************************************/

/* 페이지를 전체 모드로 변환하기 */
function changeToTotal() {
    window.localStorage.setItem('page-state', 'total');

    $movieList.forEach((movie) => {
        movie.style.display = 'flex';
    });
}

/* 페이지를 북마크 모드로 변환하기 */
function changeToBookmark() {
    window.localStorage.setItem('page-state', 'bookmark');

    bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    $movieList.forEach((movie) => {
        movie.style.display = bookmarkList.includes(movie.id) ? 'flex' : 'none';
    });
}
