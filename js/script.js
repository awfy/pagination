const list = document.querySelectorAll('.student-item');
const itemsPerPage = 10; // Set how many items to show per page.
const initialPage = 1; // Which page is loaded in first.

/**
 * Function for traversing the list's DOM and applying the required display 
 * styles to the relevant items.
**/
const showPage = (list, page) => {

  /**
   * We take the current page multiplied by the items per page which will give 
   * us the total number of items the user will have seen in the list then 
   * minus a further items per page so that it minuses out to the first index 
   * of the page.
  **/
  let startIndex = page * itemsPerPage - itemsPerPage; 

  /**
   * Continuing on from the `startIndex` logic, we simply don't apply the last 
   * minus part of the sum which gives us the index of the items which will 
   * follow on from the items per page that are visible.
  **/
  let endIndex = page * itemsPerPage;

  /**
   * For each item with an index that is between the start and end indexes 
   * will get no display style applied, whilst the rest will recieve a none 
   * value for display.
  **/
  for (let i = 0; i < list.length; i += 1) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = '';
    } else {
      list[i].style.display = 'none';
    }
  }

};


/**
 * For each item with an index that is between the start and end indexes 
 * will get no display style applied, whilst the rest will recieve a none 
 * value for display.
**/
const appendPageLinks = (list) => {

  const page = document.querySelector('.page');
  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  const paginationUL = document.createElement('ul');
  pagination.appendChild(paginationUL);

  /**
   * Sum to take the total length of the list and divide it by how many items 
   * per page to work out how many pages there will be.
  **/
  const paginationPageCount = list.length / itemsPerPage; 

  for (let i = 0; i < paginationPageCount; i += 1) {

    /**
     * Constructs the pagination link along with the page number.
    **/
    const paginationLI = document.createElement('li');
    paginationUL.appendChild(paginationLI);
    const paginationLink = document.createElement('a');
    paginationLI.appendChild(paginationLink);
    paginationLinkLabel = i + 1;
    paginationLink.textContent = paginationLinkLabel;

    /**
     * Apply active to the initial page that is loaded
    **/
    if (paginationLinkLabel === initialPage) {
      paginationLink.className = 'active';
    }

    /**
     * Event listener to listen for clicks on the pagination links and remove 
     * any existing active class then apply one to the clicked link.
    **/
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

  page.appendChild(pagination); // Append the pagination to the page.

}

showPage(list, initialPage); // Loads the initial page before any pagination has been clicked.
appendPageLinks(list); // Displays the pagination.