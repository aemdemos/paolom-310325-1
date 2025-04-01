export default function parse(element, { document }) {
  // Extract the title
  const titleElement = element.querySelector('h3 a');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the publication date
  const dateElement = element.querySelector('time');
  const publicationDate = dateElement ? dateElement.textContent.trim() : '';

  // Extract the description
  const descriptionElement = element.querySelector('p');
  const description = descriptionElement ? descriptionElement.textContent.trim() : '';

  // Extract the author name and image
  const authorElement = element.querySelector('.flex.items-center .text-xl');
  const authorName = authorElement ? authorElement.textContent.trim() : '';

  const authorImageElement = element.querySelector('.flex.items-center .relative img');
  const authorImage = authorImageElement ? authorImageElement.src : '';

  // Extract the main image
  const mainImageElement = element.querySelector('.shadow-small img');
  const mainImage = mainImageElement ? mainImageElement.src : '';

  // Extract the link to the post
  const linkElement = element.querySelector('h3 a');
  const postLink = linkElement ? linkElement.href : '';

  // Create the table header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Blog Post';
  const headerRow = [headerCell];

  // Create the table content row
  const contentRow = [
    title,
    `Published on: ${publicationDate}`,
    description,
    `Author: ${authorName}`,
    authorImage ? (() => {
      const img = document.createElement('img');
      img.src = authorImage;
      return img;
    })() : '',
    mainImage ? (() => {
      const img = document.createElement('img');
      img.src = mainImage;
      return img;
    })() : '',
    postLink ? (() => {
      const link = document.createElement('a');
      link.href = postLink;
      link.textContent = postLink;
      return link;
    })() : '',
  ];

  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}