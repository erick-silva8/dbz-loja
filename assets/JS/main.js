// Lista de produtos
const produtos = [
    { id: 1, nome: "Funko pop Goku", preco: 139.99, img: "assets/images/goku pop.jpg" },
    { id: 2, nome: "Funko pop Majin boo", preco: 309.99, img: "assets/images/majin boo magro pop.webp" },
    { id: 3, nome: "Funko pop Beerus", preco: 1000.00, img: "assets/images/beerus pop.jpg" },
    { id: 4, nome: "Funko Pop Son Gohan (Beast)", preco: 269.99, img: "assets/images/gohan pop.webp" },
    { id: 5, nome: "Funko pop Shenlong", preco: 609.50, img: "assets/images/sheylong pop.jpg" },
    { id: 6, nome: "Funko pop Bulma", preco: 350.90, img: "assets/images/bulma pop.jpg" },
    { id: 7, nome: "Funko pop Perfect Cell", preco: 139.90, img: "assets/images/cell pop.webp" },
    { id: 8, nome: "Funko pop Trunks & Gill", preco: 165.00, img: "assets/images/trunks pop.jpg" },
    { id: 9, nome: "Funko pop Vegeta", preco: 190.90, img: "assets/images/vegeta pop.jpg" }
];

// Torna a função global
window.adicionarAoCarrinho = function (id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const existe = carrinho.find(item => item.id === produto.id);
    if (existe) {
        existe.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Feedback visual (opcional)
    if (typeof Swal !== "undefined") {
        Swal.fire({
            icon: 'success',
            title: 'Adicionado!',
            text: `${produto.nome} foi adicionado ao carrinho.`,
            timer: 1200,
            showConfirmButton: false
        });
    } else {
        alert(`${produto.nome} adicionado ao carrinho!`);
    }
};


