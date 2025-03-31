export default function parse(element, { document }) {
  // Create the header row (block type)
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (striped, bordered)';
  const headerRow = [headerCell];

  // Initialize rows array
  const rows = [];

  // Extract title
  const title = element.querySelector('h1')?.textContent.trim();
  if (title) {
    rows.push([title]);
  }

  // Extract author name
  const author = element.querySelector('.text-xl.font-bold.text-balance')?.textContent.trim();
  if (author) {
    rows.push([author]);
  }

  // Extract publication date
  const publicationDate = element.querySelector('time')?.textContent.trim();
  if (publicationDate) {
    rows.push([publicationDate]);
  }

  // Extract main article paragraphs (prevent duplicate paragraphs & summarize)
  const uniqueParagraphs = new Set();
  const paragraphs = element.querySelectorAll('.PostBody_portableText__Fbo7V p');
  paragraphs.forEach((p) => {
    const text = p.textContent.trim();
    if (text && !uniqueParagraphs.has(text)) {
      uniqueParagraphs.add(text);
      rows.push([text]);
    }
  });

  // Extract images and their captions (refine fallback captions)
  const figures = element.querySelectorAll('figure');
  figures.forEach((figure) => {
    const img = figure.querySelector('img');
    const caption = figure.querySelector('figcaption');

    if (img) {
      const imgElement = document.createElement('img');
      imgElement.src = img.src;
      imgElement.alt = img.alt;
      imgElement.width = img.width;
      imgElement.height = img.height;

      const captionText = caption ? caption.textContent.trim() : 'Caption not provided'; // Refined fallback caption
      rows.push([imgElement, captionText]);
    }
  });

  // Combine header row and refined content rows into table data
  const tableData = [headerRow, ...rows];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new structured table
  element.replaceWith(table);
}