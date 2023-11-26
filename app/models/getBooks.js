const connection = require('../../config/connection');
const BookSchema = require('./bookSchema');

async function getBooks(query) 
{
    const [results] = await connection.execute(
        "select l.id, l.titulo, l.autor, l.dataPublicacao as 'dataDePublicação', l.editora, c.nome as categoria, f.nome as 'faixaEtaria', l.sinopse, l.ISBN, l.numeroPaginas as 'numeroDePaginas', l.alugado from tb_livro l inner join tb_faixaEtaria f on l.id_faixaEtaria = f.id inner join tb_livroCategoria lc on l.id = lc.id_livro inner join tb_categoria c on lc.id_categoria = c.id where l.titulo like ?;",
        [query+'%']
    );

    if(results.length == 0)
    {
        throw new Error('Livro não encontrado!');
    }

    const books = [];
    
    results.forEach(result => 
    {
        let book = new BookSchema(result.id, result.titulo, result.autor, result.anoDePublicação, result.editora, result.categoria, result.faixaEtaria, result.sinopse, result.ISBN, result.numeroDePaginas, result.alugado);
        books.push(book);
    })

    return books;
}

module.exports = getBooks;