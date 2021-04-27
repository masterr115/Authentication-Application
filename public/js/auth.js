async function apiRegister() {

    console.log(document.getElementById('password').value)
    console.log(document.getElementById('repassword').value)

    if ($('#name').val() == '' || $('#email').val() == '' || $('#password').val() == '' || $('#repassword').val() == '') {

        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Fill in all fields!");

    } else if ($('#password').val() == $('#repassword').val()) {

        alertify.set('notifier', 'position', 'top-right');
        alertify.warning("Passwords not matching!");

        const response = await axios.post('/account/create', {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val()
        })

        if (response.data.error == true) {

            alertify.set('notifier', 'position', 'top-right');
            alertify.error(response.data.errormessage);

        } else {

            alertify.set('notifier', 'position', 'top-right');
            alertify.success(response.data.message);

            await sleep(2500)

            window.location.href = '/'

        }

    } else {
        alertify.set('notifier', 'position', 'top-right');
        alertify.warning("a");
    }

}

async function apiLogin() {

    if ($('#email').val() == '' || $('#password').val() == '') {

        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Fill in all fields!");

    } else {

        const response = await axios.post('/account/login', {
            email: $('#email').val(),
            password: $('#password').val(),
        })

        if (response.data.error == true) {

            if (response.data.status == 900) {

                alertify.set('notifier', 'position', 'top-right');
                alertify.warning(response.data.errormessage);

            } else {

                alertify.set('notifier', 'position', 'top-right');
                alertify.error(response.data.errormessage);
            }
        } else {

            alertify.set('notifier', 'position', 'top-right');
            alertify.success("Successfully authenticated!");

            await sleep(500)

            window.location.href = '/dashboard'

        }

    }
}