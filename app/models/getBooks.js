const connection = require('../../config/connection');
const BookSchema = require('./bookSchema');

async function getBooks(query) 
{
    const [results] = await connection.execute(
        "select l.id, l.titulo, l.autor, l.dataPublicacao as 'dataDePublicação', l.editora, c.nome as categoria, f.nome as 'faixaEtaria', l.sinopse, l.ISBN, l.numeroPaginas as 'numeroDePaginas', CASE WHEN ep.id_livro IS NOT NULL THEN 1 ELSE 0 END AS 'alugado' from tb_livro l inner join tb_faixaEtaria f on l.id_faixaEtaria = f.id inner join tb_livroCategoria lc on l.id = lc.id_livro inner join tb_categoria c on lc.id_categoria = c.id left join tb_emprestimoLivro ep on ep.id_livro = l.id where l.titulo like ? or l.id like ? or l.titulo like ?;",
        [`${query}%`, `${query}%`, `%${query}%`,]
    );

    if(!results.length || results.length === 0)
    {
        return false;
    }

    const books = [];
    
    results.forEach(result => 
    {
        function isRented(element)
        {
            if(element === 1)
            {
                return true;
            }
            return false
        }
        
        let book = new BookSchema(result.id, result.titulo, result.autor, result.dataDePublicação, result.editora, result.categoria, result.faixaEtaria, result.sinopse, result.ISBN, result.numeroDePaginas, isRented(result.alugado));
        books.push(book);
    })

    return books;
}

module.exports = getBooks;