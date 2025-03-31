export default function parse(element, { document }) {
  // Extract the content of the header
  const headerLink = element.querySelector('a');
  const headerText = headerLink ? headerLink.textContent.trim() : '';

  // Handle edge cases: missing or empty header text
  if (!headerText) {
    console.warn('Header text is missing or empty');
    return;
  }

  // Create the header row with the block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (no header)';
  const headerRow = [headerCell];

  // Create the content row with the extracted header text
  const contentRow = [headerText];

  // Generate the table using createTable helper function
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}