$(function () {
var landing = {
    store: {
        state: 1
    },
    init: function () {
        this.bindEvents();
    },
    initVar: function () {
        this.$btnNext = $('.js-button-next');
        this.$btnReg = $('.js-btn-reg');
        this.$regForm = $('.js-form');
        this.currentStep = '.js-question-block';

        this.$gender = $('.js-gender-checkbox');
        this.$searchGender = $('.js-search-gender-checkbox');
        this.$genderAdvice = $('.js-gender-advice');

        this.$name = $('.js-name');
        this.$nameError = $('.js-username-error');

        this.$bday = $('.js-bday');
        this.$bdayInput = $('#birthday');
        this.$bdayError = $('.js-bday-error');

        this.$email = $('.js-email');
        this.$emailError = $('.js-email-error');

        this.$pass = $('.js-password');
        this.$passError = $('.js-password-error');

        this.$termsCheckbox = $('.js-terms-checkbox');
        this.$checkboxFrame = $('.js-checkbox-custom');
        this.$checkboxLabel = $('.js-checkbox-label');
    },
    bindEvents: function () {
        var self = this;

        this.$btnNext.on('click', function (e) {
            self.showNextStep(self.store.state + 1);

        });
    },
    showNextStep: function (nextStep) {

        $(this.currentStep + '[data-step=' + this.store.state + ']').removeClass('active');
        $(this.currentStep + '[data-step=' + nextStep + ']').addClass('active');
        this.store.state = nextStep;

        if (nextStep === 11) {
            this.validationForm();
        }
    },
    validationForm: function () {
        var self = this;

        this.$btnReg.on('click', function (e) {
            e.preventDefault();

            self.genderValid();
            self.nameValid();
            self.ageValid();
            self.emailValid();
            self.passwordValid();
            self.termsValid();
            if (self.genderFlag && self.searchGenderFlag && self.nameFlag && self.ageFlag && self.emailFlag && self.passFlag && self.termsFlag ) {
                alert('well done');
                self.$regForm.submit()
            }
        })

    },
    genderValid: function () {
        this.genderFlag = false;
        this.searchGenderFlag = false;

        if ($(this.$gender).eq(0).is(':checked') || $(this.$gender).eq(1).is(':checked')) {
            this.genderFlag = true;
        } else {
            this.$genderAdvice.eq(0).addClass('active-error');
        }

        if ($(this.$searchGender).eq(0).is(':checked') || $(this.$searchGender).eq(1).is(':checked')) {
            this.searchGenderFlag = true;
        } else {
            this.$genderAdvice.eq(1).addClass('active-error');
        }

    },
    nameValid: function () {
        this.$nameVal = $('.js-name').val();

        this.nameFlag = false;
        var regName = /^[a-zA-Zа-яА-Я]+$/;

        if (this.$nameVal === '') {
            this.$nameError.eq(0).addClass('active-error');
            this.$name.addClass('error-block');
            return this.nameFlag = false;
        }
        if (!(regName.test(this.$nameVal)) || this.$nameVal.length < 2) {
            this.$nameError.eq(1).addClass('active-error');
            this.$name.addClass('error-block');
            return this.nameFlag = false;
        }

        this.$nameError.removeClass('active-error');
        this.$name.removeClass('error-block');
        return this.nameFlag = true;

    },
    ageValid: function () {
        this.ageFlag = false;

        var $dayVal = $('.js-day').val();
        var $monthVal = $('.js-month').val();
        var $yearVal = $('.js-year').val();


        if ($dayVal === null || $monthVal === null || $yearVal === null) {

            this.$bdayError.eq(1).removeClass('active-error');
            this.$bdayError.eq(0).addClass('active-error');
            this.$bday.addClass('error-block');
            return this.ageFlag = false;

        } else {
            this.$bdayError.removeClass('active-error');
            this.$bday.removeClass('error-block');
        }

        var chooseMonth = $('.js-month').find(':selected').data('month');
        var checkAge = Math.floor(new Date().getTime() - new Date("" + chooseMonth + "/" + $dayVal + "/" + $yearVal + "")) / (24 * 3600 * 365.25 * 1000);

        if (checkAge < 18 && chooseMonth !== undefined && $yearVal !== null) {
            this.$bdayError.eq(0).removeClass('active-error');
            this.$bdayError.eq(1).addClass('active-error');
            this.$bday.addClass('error-block');
            return this.ageFlag = false;
        }
        this.$bdayError.removeClass('active-error');
        this.$bday.removeClass('error-block');

        var birthDay = "" + $yearVal + "-" + chooseMonth + "-" + $dayVal + "";

        this.$bdayInput.attr('value', birthDay);
        return this.ageFlag = true;
    },
    emailValid: function () {
        this.emailFlag = false;

        var $emailVal = $('.js-email').val();
        var regEmail = /^[a-zA-Z0-9.$&’*+/=^_`{|}~-]+@[a-zA-Z0-9-]([\.-]?[A-zА-я0-9_-]+)*(\.[A-zА-я0-9_-]{2,10})+$/;
        var productId = document.querySelector(".product-id").innerHTML;

        var $emailErrorAjax = $('.js-email-error-ajax');
        var $errorTypeZero = $('.js-email-error-type-zero');
        var $errorTypeTwo = $('.js-email-error-type-two');
        var $errorTypeThree = $('.js-email-error-type-three');

        if ($emailVal.trim() === '') {
            this.$emailError.removeClass('active-error');
            this.$email.addClass('error-block');
            this.$emailError.eq(0).addClass('active-error');
            return this.emailFlag = false;
        }
        if (!regEmail.test($emailVal)) {
            this.$emailError.removeClass('active-error');
            this.$email.addClass('error-block');
            this.$emailError.eq(1).addClass('active-error');
            return this.emailFlag = false;
        }
        this.$emailError.removeClass('active-error');
        this.$email.removeClass('error-block');

        return this.emailFlag = true;   // delete when plugin ajax

        // $.ajax({
        //     url: "/restapi/sign/checkemail?email=" + $emailVal + "&product_id=" + productId,
        //     method: "GET",
        //     success: function (data) {
        //         var statusRes = data.response.status;
        //         var fixedEmail = data.response.fixed_email;
        //         switch (statusRes) {
        //             case 3:
        //                 $emailErrorAjax.removeClass('active-error');
        //                 $emailError.removeClass('active-error');
        //                 $email.addClass('error-block');
        //                 $errorTypeThree.addClass('active-error');
        //                 break;
        //             case 2:
        //                 $emailErrorAjax.removeClass('active-error');
        //                 $emailError.removeClass('active-error');
        //                 $email.addClass('error-block');
        //                 $errorTypeTwo.addClass('active-error');
        //                 break;
        //             case 0:
        //                 if (fixedEmail) {
        //                     $email.val(fixedEmail);
        //                     $emailErrorAjax.removeClass('active-error');
        //                     $emailError.removeClass('active-error');
        //                     $errorTypeZero.addClass('active-error');
        //                     return;
        //                 }
        //
        //                 $emailErrorAjax.removeClass('error');
        //                 $emailError.removeClass('error');
        //                 $email.removeClass('error-block');
        //                 $('#email').attr('value', $emailVal);
        //
        //                 return this.emailFlag = true;
        //         }
        //     },
        //     error: function () {
        //
        //     }
        // });

    },
    passwordValid: function () {
        this.passFlag = false;

        var $passVal = $('.js-password').val();

        if ( $passVal.length < 8 ) {
            this.$passError.addClass('active-error');
            this.$pass.addClass('error-block');
            return this.passFlag = false;
        }

        $(this.$passError).removeClass('active-error');
        this.$pass.removeClass('error-block');

        return this.passFlag = true;
    }, 
    termsValid: function () {
        this.termsFlag = false;

        if ( ! $(this.$termsCheckbox).is(':checked') ) {
            this.$btnReg.attr('disabled', true);
            this.$btnReg.addClass('js-disable');
            this.$checkboxLabel.addClass('checkbox-error');
            this.$checkboxFrame.addClass('checkbox-frame-error');
            return this.termsFlag = false;
        }
        this.$btnReg.attr('disabled', false);
        this.$btnReg.removeClass('js-disable');
        this.$checkboxLabel.removeClass('checkbox-error');
        this.$checkboxFrame.removeClass('checkbox-frame-error');
        return this.termsFlag = true;
    }

};

// HIDE ERRORS
$('.js-name').focus(function () {
    $('.js-username-error').removeClass("active-error");
    $('.js-name').removeClass("error-block");
});
// $('.js-gender-checkbox').on('change', function () {
//     // if ( $('.js-search-gender-checkbox').eq(0).prop('checked') || $('.js-search-gender-checkbox').eq(1).prop('checked') ) {
//     //     $('.js-gender-checkbox').off('change');
//     //     return false;
//     // }
//     if ( $(this).val() === 'm' ) {
//         $('.js-search-gender-checkbox').eq(1).attr('checked', true);
//     } else {
//         $('.js-search-gender-checkbox').eq(0).attr('checked', true);
//     }
//     // $('.js-gender-checkbox').off('change');
// });
$('.js-gender-checkbox').on('change', function () {
    if ( $(".js-gender-checkbox[value='m']").is(':checked') ) {
        $(".js-search-gender-checkbox[value='f']").prop('checked', true);
    } else {
        $(".js-search-gender-checkbox[value='m']").prop('checked', true);
    }
    $('.js-gender-advice').removeClass('active-error')
});
$('.js-search-gender-checkbox').change(function () {
    $('.js-gender-advice').removeClass('active-error')
});
$('.js-bday').focus(function () {
    $('.js-bday').removeClass('error-block');
    $('.js-bday-error').removeClass('active-error');
});

$('.js-email').focus(function () {
    $(this).removeClass('error-block');
    $('.js-email-error').removeClass('active-error');
});
$('.js-password').focus(function () {
    $('.js-password').removeClass('error-block');
    $('.js-password-error').removeClass('active-error');
});
$('.js-terms-checkbox').change(landing.termsValid.bind(landing));
// HIDE ERRORS


// RENDER YEAR
for (var j = 2000; j >= 1943; j--) {
    $(".js-year").append(renderSelects(j));
}

function renderSelects(j) {
    return '<option class="selector-item" data-year=' + j + ' >' + j + '</option>';
}

// RENDER YEAR

landing.initVar();
landing.init();


});

