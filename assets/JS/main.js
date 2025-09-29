// SWEET ALERT PARA LOGIN
document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.querySelector('.icon-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            Swal.fire({
                title: 'Entrar na sua conta',
                html:
                    '<input id="swal-input-email" class="swal2-input" placeholder="E-mail" type="email" style="font-family: \"Eurostile Extended\", Arial, sans-serif;">' +
                    '<input id="swal-input-password" class="swal2-input" placeholder="Senha" type="password" style="font-family: \"Eurostile Extended\", Arial, sans-serif;">' +
                    '<div style="margin-top:10px; font-size: 0.95em;">' +
                    '<a href="cadastro.html" style="color:#ff9800; text-decoration:underline; font-family: \"Eurostile Extended\", Arial, sans-serif;">Não tem cadastro? Cadastre-se</a>' +
                    '</div>',
                focusConfirm: false,
                confirmButtonText: 'Entrar',
                confirmButtonColor: '#ff9800',
                background: '#181818',
                color: '#fff',
                customClass: {
                    popup: 'swal2-dragonball',
                    confirmButton: 'btn-ver-produtos',
                    title: 'title',
                },
                preConfirm: () => {
                    const email = document.getElementById('swal-input-email').value;
                    const password = document.getElementById('swal-input-password').value;
                    if (!email || !password) {
                        Swal.showValidationMessage('Por favor, preencha todos os campos.');
                        return false;
                    }
                    // Aqui você pode adicionar lógica de autenticação real
                    return { email, password };
                }
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login realizado!',
                        text: 'Bem-vindo de volta!',
                        confirmButtonColor: '#ff9800',
                        background: '#181818',
                        color: '#fff',
                        customClass: {
                            popup: 'swal2-dragonball',
                            confirmButton: 'btn-ver-produtos',
                            title: 'title',
                        }
                    });
                }
            });
        });
    }
});
