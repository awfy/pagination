const list = document.querySelectorAll('.student-item');
const itemsPerPage = 10; // Set how many items to show per page.
const initialPageNum = 1; // Set which page number loads first.

const pageHeader = document.querySelector('.page-header');
const title = pageHeader.querySelector('h2');
const searchBox = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
searchBox.className = 'student-search';
searchBox.appendChild(searchInput);
searchBox.appendChild(searchButton);
searchInput.placeholder = 'Search for students...';  
searchInput.type = 'search';
searchButton.textContent = 'Search';
pageHeader.append(searchBox);

/**
 * 
 * @param {*} list 
 * @param {*} query 
 * @param {*} page 
 */
const showPage = (list, query, page) => {
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;
  if (query) {
    for (let i = 0; i < list.length; i += 1) {
      const name = list[i].querySelector('h3');
      const comparison = name.textContent.indexOf(query) !== -1;
      if (comparison) {
        list[i].style.display = '';
      } else {
        list[i].style.display = 'none';
      }
    }
  } else {
    for (let i = 0; i < list.length; i += 1) {
      if (i >= startIndex && i < endIndex) {
        list[i].style.display = '';
      } else {
        list[i].style.display = 'none';
      }
    }
  }
};
showPage(list, null, initialPage); 

/**
 * The event listener on `input` allows the user to see search results as they 
 * type instead of waiting for them to click the button. This automatically 
 * gives us the advantage of the input[type="search"]'s clear event returning 
 * all of the results back to normal.
 */
searchBox.addEventListener('input', (e) => {
  showPage(list, searchInput.value);
});

/**
 * In addition to the listener on `input`, we include one of `click` which 
 * targets the "Search" button. If for any reason the input event fails to 
 * trigger this is backup.
 */
searchBox.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON'){
    showPage(list, searchInput.value);
  }
});

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
          showPage(list, null, paginationButton.textContent);
        }
        paginationButton.className = 'active';
      }
    });
  }
  page.appendChild(pagination);
}
appendPageLinks(list);