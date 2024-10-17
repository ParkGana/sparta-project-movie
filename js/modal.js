/* DOM 요소 */
const $modal = document.querySelector('.modal');
const $modalClose = document.querySelector('.modal-close');
const $modalPoster = document.querySelector('.modal-poster > img');
const $modalTitle = document.querySelector('.modal-title');
const $modalOverview = document.querySelector('.modal-overview');
const $modalRelease = document.querySelector('.modal-release');
const $modalAverage = document.querySelector('.modal-average');

/********************************************************************************/

/* 영화 상세 정보 Modal 창 닫기 */
$modalClose.addEventListener('click', function () {
    $modal.style.display = 'none';
});

/* 영화 상세 정보 Modal 창에 데이터 넣기 */
async function printData(data) {
    $modalPoster.src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
    $modalTitle.innerText = data.title;
    $modalOverview.innerText = data.overview;
    $modalRelease.innerText = data.release_date;
    $modalAverage.innerText = `⭐ ${data.vote_average}`;
}
