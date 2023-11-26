class BookSchema 
{
    constructor(id, title, author, publicationDate, publisher, category, ageRange, synopsis, ISBN, pageCount, isRented) 
    {
        this.id = id;
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.publisher = publisher;
        this.synopsis = synopsis;
        this.publicationDate = publicationDate;
        this.pageCount = pageCount;
        this.category = category;
        this.ageRange = ageRange;

        switch(isRented)
        {
            case 0: 
                this.isRented = false;
                break;
            case 1:
                this.isRented = true;
                break;
            default: 
                this.isRented = false;
        }
    }
}

module.exports = BookSchema;