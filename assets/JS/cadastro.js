// cadastro.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            Swal.fire({
                icon: "warning",
                title: "Campos obrigatórios",
                text: "Preencha todos os campos antes de continuar.",
                confirmButtonColor: "#F28907"
            });
            return;
        }

        // Simulando "Banco de Dados" com LocalStorage
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar se já existe
        const existe = usuarios.find(u => u.username === username);

        if (existe) {
            Swal.fire({
                icon: "error",
                title: "Usuário já existe",
                text: "Escolha outro nome de usuário.",
                confirmButtonColor: "#F28907"
            });
            return;
        }

        // Salvar usuário
        usuarios.push({ username, password });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Guardar que está logado
        localStorage.setItem("usuarioLogado", JSON.stringify({ username }));

        Swal.fire({
            icon: "success",
            title: "Cadastro realizado!",
            text: "Bem-vindo(a), " + username + " 🎉",
            confirmButtonColor: "#F28907"
        }).then(() => {
            // Redirecionar para index.html após sucesso
            window.location.href = "index.html";
        });
    });
});
