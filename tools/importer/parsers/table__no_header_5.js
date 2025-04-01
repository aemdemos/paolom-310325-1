export default function parse(element, { document }) {
  // Extract the relevant content from the element
  const header = element.querySelector('h2');
  const headerText = header ? header.textContent.trim() : '';

  // Define the table header
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Table (no header)';

  // Data row extracted from the header
  const dataRow = [headerText];

  // Create the table structure
  const cells = [
    headerRow, // Header row
    dataRow,   // Data row
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}