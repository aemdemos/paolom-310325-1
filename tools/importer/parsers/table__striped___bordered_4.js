export default function parse(element, { document }) {
  // Correcting the header row to match the example format exactly

  // Create the header row
  const headerRow = ['Table (striped & bordered)'];

  // Extract dynamic content from the provided element

  // Extracting the article title
  const titleElement = element.querySelector('h1');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extracting the author details
  const authorElement = element.querySelector('.text-xl.font-bold.text-balance');
  const author = authorElement ? authorElement.textContent.trim() : '';

  // Extracting the publication date
  const dateElement = element.querySelector('time');
  const publicationDate = dateElement ? dateElement.textContent.trim() : '';

  // Extracting the main image
  const mainImageElement = element.querySelector('img.h-auto.w-full');
  const mainImageSrc = mainImageElement ? mainImageElement.src : '';

  // Compose rows dynamically
  const rows = [];

  if (title) {
    rows.push(['Article Title', title]);
  }

  if (author) {
    rows.push(['Author', author]);
  }

  if (publicationDate) {
    rows.push(['Publication Date', publicationDate]);
  }

  if (mainImageSrc) {
    const imageElement = document.createElement('img');
    imageElement.src = mainImageSrc;
    rows.push(['Main Image', imageElement]);
  }

  // Add header and rows to the table data
  const tableData = [headerRow, ...rows];

  // Create the table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created table
  element.replaceWith(blockTable);
}