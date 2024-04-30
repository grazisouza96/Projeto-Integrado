// script.js

// URL da API
const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card';

// Função para exibir as cartas de magia
async function exibirCartasDeMagia() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const spellCards = data.data;

        const main = document.querySelector('main');
        spellCards.forEach(spellCard => {
            const card = document.createElement('div');
            card.classList.add('card');

            const nome = document.createElement('h2');
            nome.textContent = spellCard.name;

            const descricao = document.createElement('p');
            descricao.textContent = spellCard.desc;

            const imagem = document.createElement('img');
            imagem.src = spellCard.card_images[0].image_url;
            imagem.alt = spellCard.name;

            card.appendChild(imagem);
            card.appendChild(nome);
            card.appendChild(descricao);

            main.appendChild(card);

            // Adicionando evento de mouseover para exibir informações da carta
            card.addEventListener('mouseover', async () => {
                const cardInfoDiv = document.getElementById('cardInfo');
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    const randomIndex = Math.floor(Math.random() * data.data.length);
                    const card = data.data[randomIndex];
                    cardInfoDiv.innerHTML = `<h3>${card.name}</h3><p>${card.desc}</p>`;
                    cardInfoDiv.style.display = 'block';
                } catch (error) {
                    console.error('Erro ao buscar informações da carta:', error);
                }
            });

            // Adicionando evento de mouseout para ocultar informações da carta
            card.addEventListener('mouseout', () => {
                const cardInfoDiv = document.getElementById('cardInfo');
                cardInfoDiv.style.display = 'none';
            });
        });
    } catch (error) {
        console.error('Erro ao buscar e exibir as cartas de magia:', error);
    }
}

// Chamada da função para exibir as cartas de magia quando a página carrega
window.addEventListener('DOMContentLoaded', exibirCartasDeMagia);

function realizarPesquisa() {
    // Obtém o valor do campo de pesquisa
    var termoPesquisa = document.getElementById('campoPesquisa').value.trim();

    // Verifica se o campo de pesquisa não está vazio
    if (termoPesquisa !== '') {
        // Constrói a URL da API com o termo de pesquisa
        var url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&fname=${encodeURIComponent(termoPesquisa)}`;

        // Realiza a requisição à API
        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados da API');
                }
                return response.json();
            })
            .then(function(data) {
                // Limpa o conteúdo atual do elemento 'main'
                var main = document.querySelector('main');
                main.innerHTML = '';

                // Verifica se foram encontradas cartas de feitiço
                if (data.data.length > 0) {
                    // Itera sobre os dados recebidos e cria elementos para exibir as cartas
                    data.data.forEach(spellCard => {
                        const card = document.createElement('div');
                        card.classList.add('card');

                        const nome = document.createElement('h2');
                        nome.textContent = spellCard.name;

                        const descricao = document.createElement('p');
                        descricao.textContent = spellCard.desc;

                        const imagem = document.createElement('img');
                        imagem.src = spellCard.card_images[0].image_url;
                        imagem.alt = spellCard.name;

                        card.appendChild(imagem);
                        card.appendChild(nome);
                        card.appendChild(descricao);

                        main.appendChild(card);
                    });
                } else {
                    // Se nenhuma carta de feitiço for encontrada, exibe uma mensagem
                    main.innerHTML = '<p>Nenhuma carta de feitiço encontrada.</p>';
                }
            })
            .catch(function(error) {
                console.error('Erro:', error);
            });
    } else {
        // Caso o campo de pesquisa esteja vazio, exiba uma mensagem de erro ou tome outra ação adequada
        console.error('O campo de pesquisa está vazio');
    }
}

