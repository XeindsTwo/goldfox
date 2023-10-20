import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

function initializeRateYo(selector, options) {
    $(selector).rateYo({
        ...options,
        ratedFill: "#F3B344",
        starWidth: "16.5px",
        'starsSvg': '<svg width="18" height="17" viewBox="0 0 18 17" xmlns="http://www.w3.org/2000/svg"> <path d="M8.76386 1.42935C8.84168 1.20546 9.15832 1.20546 9.23614 1.42935L10.8826 6.16592C10.9169 6.26469 11.0091 6.33166 11.1136 6.33379L16.1271 6.43596C16.3641 6.44079 16.462 6.74192 16.2731 6.88512L12.2771 9.91466C12.1938 9.97783 12.1586 10.0862 12.1889 10.1863L13.641 14.986C13.7096 15.2129 13.4534 15.399 13.2589 15.2636L9.1428 12.3994C9.05697 12.3396 8.94303 12.3396 8.8572 12.3994L4.74112 15.2636C4.54656 15.399 4.2904 15.2129 4.35904 14.986L5.81114 10.1863C5.84142 10.0862 5.80621 9.97783 5.72288 9.91466L1.72691 6.88512C1.53803 6.74192 1.63587 6.44079 1.87285 6.43596L6.88638 6.33379C6.99092 6.33166 7.08309 6.26469 7.11743 6.16592L8.76386 1.42935Z"stroke="#F3B344"stroke-width="1.4"fill="none"/></svg>',
        spacing: "7.5px",
        onChange: function (rating, rateYoInstance) {
            if (rating < 1) {
                rateYoInstance.rating(1);
            }
            if (rating > 5) {
                rateYoInstance.rating(5);
            }
        }
    });
}

function initializeReviewPageButtons() {
    const $reviews = $('.model-about__reviews-list .model-about__reviews-item');
    const numPerPage = 3;
    const totalReviews = $reviews.length;
    const numPages = Math.ceil(totalReviews / numPerPage);
    let currentPage = 1;
    $reviews.slice(numPerPage).hide();
    updatePageText();

    $('#nextPageReviews, #prevPageReviews').on('click', function () {
        if ($(this).attr('id') === 'nextPageReviews' && currentPage < numPages) {
            currentPage++;
        } else if ($(this).attr('id') === 'prevPageReviews' && currentPage > 1) {
            currentPage--;
        }

        $reviews.hide()
            .slice((currentPage - 1) * numPerPage, currentPage * numPerPage)
            .show();

        updatePageText();
    });

    function updatePageText() {
        const pageText = 'Страница ' + currentPage + ' - ' + numPages;
        $('.model-about__pages').text(pageText);
        if (currentPage === 1) {
            $('#prevPageReviews').css('opacity', 0).css('pointer-events', 'none');
        } else {
            $('#prevPageReviews').css('opacity', 1).css('pointer-events', 'auto');
        }
        $('#nextPageReviews').prop('disabled', currentPage === numPages);
    }
}

function initializeReviewValidation() {
    const $nameInput = $('#name');
    const $textInput = $('#text');
    const $nameError = $('#nameError');
    const $textError = $('#textError');
    const $addReviewButton = $('#addition-review');
    $addReviewButton.prop('disabled', true);

    function validateInput($input, $error, validator) {
        return function () {
            const value = $input.val();
            const hasError = typeof validator === 'function' ? validator(value) : !validator.test(value);
            $error.toggleClass('error--active', hasError);
            validateSubmitButton();
        };
    }

    $nameInput.on('input', validateInput($nameInput, $nameError, /^[a-zA-Zа-яА-Я ]+$/));
    $textInput.on('input', validateInput($textInput, $textError, (value) => value.length < 60));

    function validateSubmitButton() {
        const nameHasError = $nameError.hasClass('error--active');
        const textHasError = $textError.hasClass('error--active');
        const isTextTooShort = $textInput.val().length < 60;
        $addReviewButton.prop('disabled', nameHasError || textHasError || isTextTooShort);
    }
}

$(document).ready(function () {
    const swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        effect: 'fade',
        loop: true,
        navigation: {
            prevEl: ".model-content__arrow--prev",
            nextEl: ".model-content__arrow--next"
        },
        pagination: {
            el: ".model-content__pagination"
        }
    });

    $('#showPhoneBtn').on('click', function () {
        const phoneNumber = '+71234567890';
        const phoneLink = $('<a/>', {
            class: 'model-content__btn btn',
            href: 'tel:' + phoneNumber,
            text: phoneNumber
        });
        $('#showPhoneBtn').replaceWith(phoneLink);
    });

    initializeRateYo('.model-about__start', {rating: 4, fullStar: true});
    initializeRateYo('.star-review', {rating: 4, readOnly: true});
    initializeReviewPageButtons();
    initializeReviewValidation();
});