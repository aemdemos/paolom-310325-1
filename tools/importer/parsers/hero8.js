export default function parse(element, { document }) {
  // Extract the title and subheading
  const titleElement = element.querySelector('h1');
  const subheadingElement = element.querySelector('h4');

  // Ensure dynamic extraction of content and handle edge cases
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Prepare the content row
  const contentRow = [];

  // Add title (mandatory)
  if (titleElement) {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent.trim(); // Ensure proper formatting
    contentRow.push(title);
  }

  // Add subheading (optional)
  if (subheadingElement) {
    const subheadingParagraph = document.createElement('p');
    subheadingParagraph.textContent = subheadingElement.textContent.trim(); // Use textContent to avoid nested tags
    contentRow.push(subheadingParagraph);
  }

  // Handle edge cases where content row might be empty
  if (contentRow.length === 0) {
    const placeholder = document.createElement('p');
    placeholder.textContent = 'Content not available';
    contentRow.push(placeholder);
  }

  // Assemble the table
  const tableData = [headerRow, [contentRow]]; // Content row must be encapsulated in an array for a single cell
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}