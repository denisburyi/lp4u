$(document).ready(function() {
    $('[data-toggle="modal"]').on('click', function() {
        $('#feedback .modal-title').text($(this).attr('data-title'));
    });

    $('.input').on('input', function(event) {
        $(this).attr('value', event.target.value);
    });

    $('.btn-clear').on('click', function() {
        $(this).prevAll('.input').removeClass('error');
        $(this).prevAll('.input').val('');
    });

    $('.header__btn-work-example').on('click', function() {
        $('html, body').animate({
            scrollTop: $('.portfolio-and-how-it-works-wrap').offset().top
        }, 1000);
    });

    $('.portfolio-item[data-image]').on('click', function() {
        var img = $(this).attr('data-image');
        $('#project .modal-dialog').html('<img src="/imgs/projects/' + img + '" alt="">');
        $('#project').modal('show');
    });

    $('.ajax-form').submit(function(event) {
        event.preventDefault();

        var form = $(this);

        var state = $(this).find('[name="state"]').val();
        var username = $(this).find('[name="username"]').val();
        var email = $(this).find('[name="email"]').val();
        var phone = $(this).find('[name="phone"]').val();

        $(this).find('[name="username"]').removeClass('error');
        $(this).find('[name="email"]').removeClass('error');
        $(this).find('[name="phone"]').removeClass('error');

        var isError = false;

        if (!username) {
            $(this).find('[name="username"]').addClass('error');
            isError = true;
        }

        if (!email) {
            $(this).find('[name="email"]').addClass('error');
            isError = true;
        }

        if (!phone) {
            $(this).find('[name="phone"]').addClass('error');
            isError = true;
        }

        if (!state && !isError) {
            $(this).find('[name="state"]').val(1);
            $.ajax({
                url: '/',
                dataType: 'json',
                data: form.serialize(),
                method: 'POST',
                success: function(data) {
                    form.find('[name="state"]').val('');
                    $('#success').modal('show');
                    $('#feedback').modal('hide');

                    dataLayer.push({'event': 'submit_success'});

                    console.log(form.serialize());

                    form.find('[name="username"]').val('');
                    form.find('[name="email"]').val('');
                    form.find('[name="phone"]').val('');

                    form.find('[name="username"]').attr('value', '');
                    form.find('[name="email"]').attr('value', '');
                    form.find('[name="phone"]').attr('value', '');
                },
                error: function() {
                    form.find('[name="state"]').val('');
                    alert('Возникла ошибка, повторите, пожалуйста, операцию позже');
                }
            });
        }
    });
});
