export default function parse(element, { document }) {
  // Extract the relevant content from the input element
  const heading = element.querySelector('h1');
  const authorImage = element.querySelector('.mb-12 img');
  const authorName = element.querySelector('.text-xl.font-bold');
  const dateElement = element.querySelector('time');

  // Ensure all elements are properly extracted
  const headingText = heading ? heading.textContent.trim() : '';
  const authorContent = authorImage && authorName 
    ? [authorImage.cloneNode(true), document.createTextNode(` ${authorName.textContent.trim()}`)]
    : '';
  const dateText = dateElement ? dateElement.textContent.trim() : '';

  // Create the header row exactly as specified in the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (striped, bordered)';
  const headerRow = [headerCell];

  // Create content rows
  const headingRow = [headingText];
  const authorRow = [authorContent];
  const dateRow = [dateText];

  // Assemble the table
  const cells = [headerRow, headingRow, authorRow, dateRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}