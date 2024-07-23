let fetchData;
const leftArrow = document.querySelector('#left-nav')
const rightArrow = document.querySelector('#right-nav')

const page1 = document.querySelector('#page1')
const page2 = document.querySelector('#page2')
const page3 = document.querySelector('#page3')
const page4 = document.querySelector('#page4')
const page5 = document.querySelector('#page5')
const page6 = document.querySelector('#page6')
const page7 = document.querySelector('#page7')
const page8 = document.querySelector('#page8')
const page9 = document.querySelector('#page9')
const page10 = document.querySelector('#page10')
const page11 = document.querySelector('#page11')
const page12 = document.querySelector('#page12')

let pages = [0, 1,2,3,4,5,6,7,8,9,10,11,12]


let pageNumber = 0



const getPage = (pageNumber, paginateArrays) => {
    return paginateArrays[pageNumber]
}


const getPaginatedArray = (items, itemsPerPage) => {
  totalItems = items.length
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let page in pages){

    if (page > totalPages) {
        element = document.querySelector(`#page${page}`)
        element.style.display = 'none';
    }
  }

  let paginatedArrays = []

  for (let page = 0; page < totalPages; page++) {
    // Calculate the start and end index for the current page
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Slice the array to get the items for the current page and push to the result array
    paginatedArrays.push(items.slice(startIndex, endIndex));
  }

  return paginatedArrays
}
