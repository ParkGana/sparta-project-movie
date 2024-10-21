/* modal 창 닫기 버튼 클릭 이벤트 */
$modalCloseBtn.addEventListener('click', closeModal);

/* 북마크 추가(제거) 버튼 클릭 이벤트 */
$modalBookmarkBtn.addEventListener('click', function () {
    // 북마크된 영화 목록 가져오기
    bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    // 북마크되어 있는 경우
    if (bookmarkList.includes(this.id)) deleteBookmark(this);
    // 북마크 되어있지 않은 경우
    else addBookmark(this);
});

/********************************************************************************/

/* modal 창 닫기 */
function closeModal() {
    // modal 창이 숨겨지도록 css 설정
    $modal.style.display = 'none';
}

/* 북마크 추가하기 */
function addBookmark(target) {
    // 북마크된 영화 목록 가져오기
    bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    // 북마크 목록에 추가
    bookmarkList.push(target.id);
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
    target.innerText = '북마크 제거';
    window.alert('북마크에 추가되었습니다.');

    closeModal();
}

/* 북마크 제거하기 */
function deleteBookmark(target) {
    // 북마크된 영화 목록 가져오기
    bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    // 북마크 목록에서 제거
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarkList.filter((bookmark) => bookmark !== target.id)));
    target.innerText = '북마크 추가';
    window.alert('북마크가 제거되었습니다.');

    // 페이지를 '북마크' 모드로 유지
    window.localStorage.getItem('page-state') === 'bookmark' && changeToBookmark();

    closeModal();
}
