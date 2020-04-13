const list = document.querySelectorAll('.student-item');
const itemsPerPage = 10; // Set how many items to show per page.
const initialPage = 1; // Set which page loads first.

const pageHeader = document.querySelector('.page-header');
const title = pageHeader.querySelector('h2');
const searchBox = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
searchBox.className = 'student-search';
searchBox.appendChild(searchInput);
searchBox.appendChild(searchButton);
searchInput.type = 'search';
searchQuery = searchInput.value;
searchInput.value = '';
searchButton.type = 'submit';
searchButton.textContent = 'Search';
pageHeader.append(searchBox);

searchBox.addEventListener('submit', (e) => {
  e.target.preventDefault();
});


const showPage = (list, page) => {
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;
  for (let i = 0; i < list.length; i += 1) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }
};
showPage(list, initialPage);

const appendPageLinks = (list) => {
  const page = document.querySelector('.page');
  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  const paginationUL = document.createElement('ul');
  pagination.appendChild(paginationUL);
  const paginationPageCount = list.length / itemsPerPage;
  for (let i = 0; i < paginationPageCount; i += 1) {
    const paginationLI = document.createElement('li');
    paginationUL.appendChild(paginationLI);
    const paginationLink = document.createElement('a');
    paginationLI.appendChild(paginationLink);
    paginationLinkLabel = i + 1;
    paginationLink.textContent = paginationLinkLabel;
    if (paginationLinkLabel === initialPage) {
      paginationLink.className = 'active';
    }
    pagination.addEventListener('click',  (e) => {
      if (e.target.tagName === 'A') {
        const paginationButton = e.target;
        for (let i = 0; i < paginationPageCount; i += 1) {
          paginationLink.className = '';
          showPage(list, paginationButton.textContent);
        }
        paginationButton.className = 'active';
      }
    });
  }
  page.appendChild(pagination);
}
appendPageLinks(list);