document.addEventListener('DOMContentLoaded', () => {
    const carrinhoTable = document.getElementById('carrinho');
    const precoTotal = document.getElementById('carrinho-preco');
    const precoTotal2 = document.getElementById('carrinho-preco2');

    function renderizarCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinhoTable.innerHTML = '';

        if (carrinho.length === 0) {
            carrinhoTable.innerHTML = `
        <tr>
          <td colspan="3" style="text-align:center; font-weight:600;">
            Seu carrinho está vazio!
          </td>
        </tr>
      `;
            precoTotal.textContent = "R$ 0,00";
            precoTotal2.textContent = "R$ 0,00";
            return;
        }

        let total = 0;

        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            const tr = document.createElement('tr');
            tr.classList.add('carrinho-item');
            tr.innerHTML = `
        <td>
          <img src="${item.img}" alt="${item.nome}" class="carrinho-img">
          ${item.nome}
        </td>
        <td>
          <div class="quantidade-wrapper">
            <button class="quant-btn decrement" data-id="${item.id}">-</button>
            <span class="quantidade">${item.quantidade}</span>
            <button class="quant-btn increment" data-id="${item.id}">+</button>
          </div>
          <div class="subtotal">R$ ${subtotal.toFixed(2)}</div>
        </td>
        <td>
          <button class="remover" data-id="${item.id}" title="Remover item">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
            carrinhoTable.appendChild(tr);
        });

        precoTotal.textContent = `R$ ${total.toFixed(2)}`;
        precoTotal2.textContent = `R$ ${total.toFixed(2)}`;

        // Eventos remover
        document.querySelectorAll('.remover').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: 'Remover item?',
                    text: "Você tem certeza que quer remover este produto do carrinho?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sim, remover!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        removerDoCarrinho(parseInt(btn.dataset.id));
                        Swal.fire({
                            icon: 'success',
                            title: 'Removido!',
                            text: 'O produto foi removido do carrinho.',
                            timer: 1200,
                            showConfirmButton: false
                        });
                    }
                });
            });
        });

        // Eventos quantidade
        document.querySelectorAll('.quant-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const acao = btn.classList.contains('increment') ? 'increment' : 'decrement';
                alterarQuantidade(id, acao);
            });
        });
    }

    function removerDoCarrinho(id) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho = carrinho.filter(item => item.id !== id);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
    }

    function alterarQuantidade(id, acao) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const produto = carrinho.find(item => item.id === id);
        if (!produto) return;

        if (acao === "increment") produto.quantidade += 1;
        if (acao === "decrement") produto.quantidade -= 1;

        if (produto.quantidade <= 0) {
            carrinho = carrinho.filter(item => item.id !== id);
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();
    }

    renderizarCarrinho();
});

// Botão Finalizar Compra
const btnFinalizar = document.getElementById('btn-finalizar');

if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

        if (carrinho.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Carrinho vazio!',
                text: 'Adicione produtos ao carrinho antes de finalizar a compra.',
            });
            return;
        }

        Swal.fire({
            title: 'Compra finalizada!',
            html: `Parabéns! 🎉<br>Sua compra de <b>${carrinho.length} produto(s)</b> foi realizada com sucesso!`,
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 4000,
            timerProgressBar: true
        }).then(() => {
            // Limpa o carrinho após finalizar
            localStorage.removeItem('carrinho');
            // Atualiza a tela
            renderizarCarrinho();
        });
    });
}
