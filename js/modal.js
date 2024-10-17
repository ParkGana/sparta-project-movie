/* DOM 요소 */
const $modal = document.querySelector('.modal');
const $modalClose = document.querySelector('.modal-close');
const $modalPoster = document.querySelector('.modal-poster > img');
const $modalTitle = document.querySelector('.modal-title');
const $modalOverview = document.querySelector('.modal-overview');
const $modalRelease = document.querySelector('.modal-release');
const $modalAverage = document.querySelector('.modal-average');
const $modalBookmark = document.querySelector('.modal-bookmark');

/********************************************************************************/

/* 영화 상세 정보 Modal 창 닫기 */
$modalClose.addEventListener('click', function () {
    $modal.style.display = 'none';
});

/* 영화 상세 정보 Modal 창에 데이터 넣기 */
async function printData(data) {
    const bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    $modalPoster.src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
    $modalTitle.innerText = data.title;
    $modalOverview.innerText = data.overview;
    $modalRelease.innerText = data.release_date;
    $modalAverage.innerText = `⭐ ${data.vote_average}`;
    $modalBookmark.id = data.id;
    $modalBookmark.innerText = `북마크 ${bookmarkList.includes(data.id.toString()) ? '제거' : '추가'}`;
}

/* 북마크 추가 및 제거하기 */
$modalBookmark.addEventListener('click', function () {
    const bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    // 북마크에 등록되어 있는 경우
    if (bookmarkList.includes(this.id)) {
        window.localStorage.setItem('bookmarks', JSON.stringify(bookmarkList.filter((bookmark) => bookmark !== this.id)));
        this.innerText = '북마크 추가';
        window.alert('북마크가 제거되었습니다.');
    }
    // 북마크에 등록되어있지 않은 경우
    else {
        bookmarkList.push(this.id);
        window.localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
        this.innerText = '북마크 제거';
        window.alert('북마크에 추가되었습니다.');
    }

    $modal.style.display = 'none';

    window.localStorage.getItem('page-state') === 'total' ? changeToTotal() : changeToBookmark();
});
