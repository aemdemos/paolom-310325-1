export default function parse(element, { document }) {
  const cardsHeader = [document.createElement('strong')];
  cardsHeader[0].textContent = 'Cards';

  const cardElements = element.querySelectorAll('.grid > div');
  const tableRows = Array.from(cardElements).map(card => {
    const imageElement = card.querySelector('img');
    const img = imageElement.cloneNode(true);

    const titleElement = card.querySelector('h3 a');
    const title = document.createElement('strong');
    title.textContent = titleElement.textContent;

    const descriptionElement = card.querySelector('p');
    const description = document.createTextNode(descriptionElement?.textContent || '');

    const authorElement = card.querySelector('.text-xl.font-bold');
    const author = document.createElement('div');
    author.textContent = authorElement ? `Author: ${authorElement.textContent}` : '';

    const contentCell = [title, document.createElement('br'), description, document.createElement('br'), author];
    return [img, contentCell];
  });

  const tableData = [cardsHeader, ...tableRows];
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(tableBlock);
}