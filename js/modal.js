/* modal 창 닫기 버튼 클릭 이벤트 */
$modalCloseBtn.addEventListener('click', closeModal);

/* 북마크 추가(제거) 버튼 클릭 이벤트 */
$modalBookmarkBtn.addEventListener('click', function () {
    bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    if (bookmarkList.includes(this.id)) deleteBookmark(this);
    else addBookmark(this);
});

/********************************************************************************/

/* modal 창 닫기 */
function closeModal() {
    $modal.style.display = 'none';
}

/* 북마크 추가하기 */
function addBookmark(target) {
    bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    bookmarkList.push(target.id);
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
    target.innerText = '북마크 제거';
    window.alert('북마크에 추가되었습니다.');

    closeModal();
}

/* 북마크 제거하기 */
function deleteBookmark(target) {
    bookmarkList = JSON.parse(window.localStorage.getItem('bookmarks'));

    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarkList.filter((bookmark) => bookmark !== target.id)));
    target.innerText = '북마크 추가';
    window.alert('북마크가 제거되었습니다.');

    window.localStorage.getItem('page-state') === 'bookmark' && changeToBookmark();

    closeModal();
}
