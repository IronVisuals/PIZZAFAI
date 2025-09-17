var opcao = ["1-Cadastro", "2-Pedido", "3-FeedBack", "4-Acesso Administrativo", "5-Histórico de pedidos", "0-Sair"];
var opcoes;
do {
    console.log(opcao.join(" | "));
    // Usando readline-sync para simular prompt síncrono (mais adequado para menus)
    // Em ambiente browser, prompt é síncrono por natureza
    opcoes = prompt("Escolha uma das opções do menu: ");
    switch (opcoes) {
        case "1":
            var nome = prompt("Insira nome completo: ");
            var idade = prompt("Informe sua idade: ");
            var endereco = prompt("Informe sua localização: ");
            var numero = prompt("Informe número de contato: ");
            console.log("Verifique se as informações estão corretas: ");
            console.log("Seu nome \u00E9: ".concat(nome, " sua idade \u00E9: ").concat(idade));
            console.log("Seu endere\u00E7o informado \u00E9: ".concat(endereco));
            console.log("Seu n\u00FAmero de contato \u00E9: ".concat(numero));
            var correto = prompt("Essas informações estão corretas? (Sim/Não)");
            switch (correto) {
                case "não":
                case "nao":
                    console.log("Tente novamente");
                    break;
                case "sim":
                    console.log("Perfeito! Usuário cadastrado");
                    break;
                default:
                    console.log("Opção inválida");
            }
            break;
        case "0":
            console.log("Encerrando programa...");
            break;
        default:
            console.log("Opção inválida! Tente novamente.");
    }
} while (opcoes !== "0");
console.log("Programa encerrado");
