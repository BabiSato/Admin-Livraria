/********************************************************************
 * Objetivo: Sistema de cadastro, edição, exclusão e listagem de livros
 * Data: 30/10/2024
 * Autor: Barbara Nayumi
 * Versão: 1.0
 ********************************************************************/

//Receber o botão salvar do HTML
const botaoSalvar = document.getElementById('salvar')


//Receber os dados do formulário
const getDadosForm = function(){
    let livroJSON = {}
    let status = true

    //Recebe das caixas do HTML os dados a serão enviados para a API
    let nomeLivro       = document.getElementById('title')
    let descricaoLivro  = document.getElementById('subtitle')
    let fotoLivro       = document.getElementById('image')
    let valorLivro      = document.getElementById('price')

    if(nomeLivro == '' || descricaoLivro == '' || fotoLivro == '' || valorLivro == ''){
        alert('Todos os dados devem ser preenchidos.')
        status = false
    }else{
        //Criamos um objeto JSON como os atributos necessário
        livroJSON.title     = nomeLivro.value
        livroJSON.subtitle  = descricaoLivro.value
        livroJSON.image     = fotoLivro.value
        livroJSON.price     = valorLivro.value
    }

    if(status){
        return livroJSON
    }else{
        return false
    }

}

//Função para salvar um livro novo
const postLivro = async function(dadosLivro){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro'

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosLivro)
    })

    if(response.status == 201){
        alert('Registro inserido com sucesso.')
    }else{
        alert('Não foi possível inserir o livro, verifique os dados encaminhados.')
    }
}

//Função para alterar um livro existente
const putLivro = function(){

}

//Função para excluir um livro
const deleteLivro = async function(id){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/excluir/livro/'+id

    let response = await fetch(url, {
        method: 'DELETE'
    })

    if(response.status == 200){
        alert('Registro excluído com sucesso!')
    }else{
        alert('Não foi possível excluir o registro.')
    }
}

//Função para listar todos os livros
const getLivros = async function(){
    //URL da API
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livros'

    //Executa a URL no servidor para trazer a lista de livros
    let response = await fetch(url)

    //Converte o retorno em JSON
    let dados = await response.json()

    //Chama a função para criar a lista de livros
    setCardItens(dados)
}

//Função para criar a lista de itens no HTML
const setCardItens = function(dadosLivros){
    //Recebe a caixa principal onde será criado a lista de livros
    let divListDados = document.getElementById('listDados')

    divListDados.innerText=''

    dadosLivros.books.forEach(function(livro){

        //Cria os elementos no HTML
        let divDados    = document.createElement('div')
        let divTitle    = document.createElement('div')  
        let divSubTitle = document.createElement('div')
        let divPrice    = document.createElement('div')
        let divOpcoes   = document.createElement('div')
        let spanEditar  = document.createElement('span')
        let spanExcluir = document.createElement('span')
        let imgEditar   = document.createElement('img')
        let imgExcluir  = document.createElement('img')

        //Escrevendo os dados do ARRAY de livros nos elementos HTML
        divTitle.innerText      = livro.title
        divSubTitle.innerText   = livro.subtitle
        divPrice.innerText      = livro.price


        //Adiciona atributos nas tags HTML
        divDados.setAttribute('id', 'dados')
        divDados.setAttribute('class', 'linha dados')
        imgEditar.setAttribute('src', 'icones/editar.png')
        imgExcluir.setAttribute('src', 'icones/excluir.png')

        imgEditar.setAttribute('idLivro', livro.id)
        imgExcluir.setAttribute('idLivro', livro.id)

        //Associa um elemento dentro de outro no HTML
        divListDados.appendChild(divDados)
        divDados.appendChild(divTitle)
        divDados.appendChild(divSubTitle)
        divDados.appendChild(divPrice)
        divDados.appendChild(divOpcoes)
        divOpcoes.appendChild(spanEditar)
        divOpcoes.appendChild(spanExcluir)
        spanEditar.appendChild(imgEditar)
        spanExcluir.appendChild(imgExcluir)


        //Craindo eventos de click para os elementos do excluir e editar
        imgExcluir.addEventListener('click',function(){
            let id = imgExcluir.getAttribute('idLivro')
            let resposta = confirm('Deseja realmente excluir o livro?')
            if(resposta){
                deleteLivro(id)
            }
        })

        imgEditar.addEventListener('click', function(){
            let id = imgEditar.getAttribute('idLivro')

            getBuscarLivro(id)
        })

    })


}

//Função para buscar um livro pelo ID
const getBuscarLivro = async function(){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro/'+id

    let response = await fetch(url)

    let dados = await response.json()

    if(response.status == 200){
        document.getElementById('title').value = dados.books[0].title
        document.getElementById('subtitle').value = dados.book[0].subtitle
        document.getElementById('image').value = dados.book[0].image
        document.getElementById('price').value = dados.book[0].price

        document.getElementById('salvar').innerText = 'Atualizar'
    }
}

botaoSalvar.addEventListener('click', function(){
    //postLivro()
    let dados = getDadosForm()

    if(dados){
        postLivro(dados)
    }
})

window.addEventListener('load', function(){
    getLivros()
})