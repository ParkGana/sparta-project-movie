/* logo 클릭 이벤트 */
$logo.addEventListener('click', changeToTotal);

/* 북마크 버튼 클릭 이벤트 */
$bookmarkBtn.addEventListener('click', changeToBookmark);

/* 검색 키워드 입력 이벤트 */
$search.addEventListener('input', function () {
    window.localStorage.setItem('page-state', 'total');

    keyword = this.value.toLowerCase().replaceAll(' ', '');

    filterMovieList();
});

/********************************************************************************/

/* 페이지를 전체 모드로 변환하기 */
function changeToTotal() {
    window.localStorage.setItem('page-state', 'total');

    $movieList.forEach((movie) => {
        movie.style.display = 'flex';
    });

    $search.style.display = 'block';
}

/* 페이지를 북마크 모드로 변환하기 */
function changeToBookmark() {
    window.localStorage.setItem('page-state', 'bookmark');

    bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    $movieList.forEach((movie) => {
        movie.style.display = bookmarkList.includes(movie.id) ? 'flex' : 'none';
    });

    $search.style.display = 'none';
}

/* 영화 검색하기 */
function filterMovieList() {
    if ($movieList) {
        $movieList.forEach((movie) => {
            const titleDiv = movie.children[0];

            if (titleDiv) {
                const title = titleDiv.innerText.toLowerCase().replaceAll(' ', '');

                movie.style.display = keyword === '' || title.includes(keyword) ? 'flex' : 'none';
            }
        });
    }
}
