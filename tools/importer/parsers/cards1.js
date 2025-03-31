export default function parse(element, { document }) {
  const cards = [];

  // Extract individual card elements
  const cardElements = element.querySelectorAll(':scope > div');

  cardElements.forEach(cardElement => {
    const img = cardElement.querySelector('img');
    const titleElement = cardElement.querySelector('h3 a');
    const descriptionElement = cardElement.querySelector('p');
    const authorElement = cardElement.querySelector('.text-xl');

    // Skip if critical content is missing
    if (!img || !titleElement || !descriptionElement || !authorElement) {
      return;
    }

    const imgElement = document.createElement('img');
    imgElement.src = img.src;
    imgElement.alt = img.alt || '';

    const title = document.createElement('strong');
    title.textContent = titleElement.textContent;

    const description = document.createElement('div');
    description.innerHTML = `<p>${descriptionElement.textContent}</p>`;

    const author = document.createElement('div');
    author.textContent = authorElement.textContent;

    const textContent = [title, description, author];

    cards.push([imgElement, textContent]);
  });

  // Create the header row exactly as required
  const headerRow = ['Cards'];

  // Build table data
  const tableData = [headerRow, ...cards];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}