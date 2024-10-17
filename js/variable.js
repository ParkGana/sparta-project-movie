/* DOM 요소 */
const $logo = document.querySelector('.logo');
const $bookmarkBtn = document.querySelector('.bookmark');
const $movieSection = document.getElementById('movie-section');
const $modal = document.querySelector('.modal');
const $modalPoster = document.querySelector('.modal-poster > img');
const $modalTitle = document.querySelector('.modal-title');
const $modalOverview = document.querySelector('.modal-overview');
const $modalRelease = document.querySelector('.modal-release');
const $modalAverage = document.querySelector('.modal-average');
const $modalCloseBtn = document.querySelector('.modal-close');
const $modalBookmarkBtn = document.querySelector('.modal-bookmark');

let $movieList;

/********************************************************************************/

/* localStorage 데이터 */
let bookmarkList;

/********************************************************************************/

/* TMDB API 데이터 */
let movieDataList;