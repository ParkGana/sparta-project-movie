/* DOM 요소 */
const $movieList = document.querySelectorAll('.movie-poster');
const $modal = document.querySelector('.modal');
const $modalClose = document.querySelector('.modal-close');

/********************************************************************************/

/* 영화 상세 정보 Modal 창 열기 */
$movieList.forEach(function (movie) {
    movie.addEventListener('click', function () {
        $modal.style.display = 'flex';
    });
});

/* 영화 상세 정보 Modal 창 닫기 */
$modalClose.addEventListener('click', function () {
    $modal.style.display = 'none';
});
