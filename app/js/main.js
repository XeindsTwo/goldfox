document.querySelector('.filters__btn').addEventListener('click', function () {
    const filtersContent = document.querySelector('.filters__content');
    const currentHeight = window.getComputedStyle(filtersContent).height;

    if (currentHeight !== '0px' && currentHeight !== 'auto') {
        filtersContent.style.height = '0px';
        filtersContent.style.marginTop = '0px';
    } else {
        const clone = filtersContent.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.height = 'auto';
        document.body.appendChild(clone);
        const contentHeight = clone.clientHeight;
        document.body.removeChild(clone);
        filtersContent.style.height = contentHeight + 'px';
        filtersContent.style.marginTop = '50px';
    }
});

const showAllButton = document.getElementById('showAllButton');
const modelsList = document.querySelector('.models__list');
const modelsContainer = document.querySelector('.models');

showAllButton.addEventListener('click', function () {
    modelsContainer.classList.add('show-all');
    showAllButton.classList.remove('active');
});

const models = modelsList.querySelectorAll('.model');
if (models.length > 6) {
    showAllButton.classList.add('active');
}