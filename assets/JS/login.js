(function () {
    function dicionario() {
        if (!localStorage.getItem("dados")) {
            const dados = [
                { usuario: "Erick", senha: "123" }, //0
                { usuario: "Gustavo", senha: "456" }, //1
                { usuario: "Luiz", senha: "789" }, //2
                { usuario: "Ryan", senha: "101112" }, //3
                { usuario: "Carlos", senha: "131415" }, //4
                { usuario: "Janelson", senha: "161718" }, //5
                { usuario: "Fagner", senha: "192021" } //6
            ];
            localStorage.setItem("dados", JSON.stringify(dados));
        }
    }
    // Função de login: valida e informa usuário
    function logar() {
        const lg = document.querySelector("#loginEmail").value.trim();
        const ps = document.querySelector("#loginSenha").value.trim();

        if (!lg || !ps) {
            Swal.fire({
                icon: "warning",
                title: "Preencha os campos",
                text: "Informe usuário e senha.",
                confirmButtonColor: "#F28907"
            });
            return;
        }

        const dados = JSON.parse(localStorage.getItem("dados")) || [];

        const encontrado = dados.find(item => item.usuario === lg && item.senha === ps);

        if (encontrado) {
            sessionStorage.setItem("usuarioLogado", encontrado.usuario);

            Swal.fire({
                icon: "success",
                title: "Login efetuado com sucesso!",
                text: `Bem-vindo, ${encontrado.usuario}!`,
                showConfirmButton: false,
                timer: 1100
            }).then(() => {
                window.location.href = "index.html";
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Usuário ou senha inválidos",
                text: "Verifique seus dados e tente novamente.",
                confirmButtonColor: "#F28907"
            });
        }
    }
    // Função para exibir usuário logado na navbar
    function userLogado() {
        const usuario = sessionStorage.getItem("usuarioLogado");
        if (!usuario) return;

        const target = document.getElementById("userLogado");
        if (target) {
            target.textContent = usuario;
            return;
        }
        const actions = document.querySelector(".actions");
        if (!actions) return;
        if (document.querySelector(".nav-user")) return;

        const wrapper = document.createElement("div");
        wrapper.className = "nav-user";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "8px";

        const span = document.createElement("span");
        span.className = "nav-username";
        span.textContent = usuario;
        span.style.color = "#F28907";
        span.style.fontWeight = "700";

        const btn = document.createElement("button");
        btn.className = "nav-logout";
        btn.textContent = "Sair";
        btn.style.padding = "4px 8px";
        btn.style.borderRadius = "6px";
        btn.style.border = "1px solid transparent";
        btn.style.cursor = "pointer";
        btn.style.background = "transparent";
        btn.style.color = "#fff";
        btn.addEventListener("mouseenter", () => {
            btn.style.background = "#F25C05";
            btn.style.color = "#000";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.background = "transparent";
            btn.style.color = "#fff";
        });

        btn.addEventListener("click", () => {
            sessionStorage.removeItem("usuarioLogado");
            Swal.fire({
                icon: "info",
                title: "Logout",
                text: "Você saiu da sua conta.",
                confirmButtonColor: "#F28907"
            }).then(() => {
                location.reload();
            });
        });

        wrapper.appendChild(span);
        wrapper.appendChild(btn);

        actions.insertBefore(wrapper, actions.firstChild);
    }

    document.addEventListener("DOMContentLoaded", function () {
        dicionario();

        const loginForm = document.getElementById("loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault();
                logar();
            });
        }

        const btnThree = document.querySelector(".btn-three");
        if (btnThree) {
            btnThree.addEventListener("click", function (e) {
                e.preventDefault();
                logar();
            });
        }

        // mostra usuário logado (se houver)
        userLogado();
    });

})();
