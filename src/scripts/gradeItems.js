import { creteModalConfirm, handleConfirmModalButtons } from './confirm.js';
import { sortedLettersGradeArray, createModalData, closeModalButton, createButton } from './gradeItemHelperFunc.js';
import { db, ref, child, push } from './firebase.js';
import { showSpinner, hideSpinner } from "./loaderPage.js";
import { getDataFromDB, updateCourseInDB, removeItemFromDB } from './databaseHelpersFunctions.js';
import { getRemainingWeight, getSumWeight, calculatePotentialGrade, calculateWeightedGrade } from './calculationFunctions.js';

showSpinner();
const courseId = localStorage.getItem('courseId');
const courseName = localStorage.getItem('courseName');
const courseCode = localStorage.getItem('courseCode');
const userId = localStorage.getItem('userId');
const letterGrades = JSON.parse(localStorage.getItem('letterGrade'));

const modalComponent = defineModalComponent();
const modalRoot = initializeModalComponent(modalComponent);

if (!userId) { // User is not logged in, redirect them to the login page
  window.location.href = 'login.html';
  localStorage.clear();
}

(async function() {
  const gradeItemsData = await getGradeItemsData();
  console.log(gradeItemsData); // Do something with the data
})();

function initializeSearch() {
  const subheaderComponent = document.querySelector('subheader-component');
  const searchComponent = subheaderComponent.shadowRoot.querySelector('search-component');
  searchComponent.setPageSpecificSearchHandler(handleSearch);
}

function handleSearch(searchItem) {
  const filter = searchItem.toUpperCase();
  const sortedGradeItems = sortGradeItemsData(gradeItemsData);
  const filteredGradeItems = sortedGradeItems.filter((gradeItemKey) => (gradeItemKey['Asmt Title'].toUpperCase().indexOf(filter) > -1 || gradeItemKey['Asmt Category'].toUpperCase().indexOf(filter)) > -1 ? gradeItemKey : null);
  if (filteredGradeItems.length > 0) {
    const tableElementItem = createTable(filteredGradeItems);
    document.getElementById('tableContainer').innerHTML = '';
    document.getElementById('tableContainer').appendChild(tableElementItem);
  } else {
    document.getElementById('tableContainer').innerHTML = `<h3>No results for <span style="color:#0279fe">${filter}</span></h3>`;
  }
  sortTable();
}

// update header component
function initializeHeader() {
  const headerComponent = document.querySelector('header-component');
  const el = headerComponent.shadowRoot.querySelector('.site-header .container');
  const content = `<h1 class="main-title">Grade Items - <span class="course-name">${courseCode}: ${courseName}</span></h1>`;
  el.insertAdjacentHTML('beforeend', content);
  initializeSearch();
}

function defineModalComponent() {
  return document.querySelector('modal-component');
}

function initializeModalComponent(modal) {
  return modal.shadowRoot;
}

function sortGradeItemsData(gradeItems) {
  return Object.keys(gradeItems)?.map((gradeItemKey) => ({
    itemID: gradeItemKey,
    ...gradeItems[gradeItemKey],
  }));
}

function displayGradeSummary(ListItemsDB) {
  const courseAverageData = document.querySelector('.grade-summary__average-data');
  const lettesItemArr = sortedLettersGradeArray(letterGrades);
  const average = calculateWeightedGrade(ListItemsDB).toFixed(2);
  courseAverageData.textContent = average;

  const potentialGrade = document.querySelector('.grade-summary__potential-grade-data');
  const remainingWeight = getRemainingWeight(100, getSumWeight(ListItemsDB));
  potentialGrade.textContent = calculatePotentialGrade(ListItemsDB, remainingWeight).toFixed(2);
  localStorage.setItem('remainingWeight', remainingWeight);
  const letterGradeItem = lettesItemArr.find((prop) => prop.value <= average);
  const letterGrade = !letterGradeItem ? 'N/A' : letterGradeItem.key;
  const letterGradeContainer = document.querySelector('.grade-summary__letter-grade-data');
  letterGradeContainer.textContent = letterGrade;
}

// CREATE TABLE
function createTable(ListItemsDB) {
  const tableData = ['Item Title', 'Category', 'Weight', 'Due Date', 'Grade', 'Actions'];
  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');
  table.className = 'items-table';
  table.id = 'itemsTable';

  const headerRow = document.createElement('tr');
  // eslint-disable-next-line no-restricted-syntax
  for (const header of tableData) {
    const th = document.createElement('th');
    const span = document.createElement('span');
    span.textContent = header;
    th.appendChild(span);
    headerRow.appendChild(th);
  }
  tableHead.appendChild(headerRow);

  const columnOrder = ['Asmt Title', 'Asmt Category', 'Asmt Weight', 'Asmt Due Date', 'Asmt Grade'];
  ListItemsDB?.forEach((item) => {
    const row = document.createElement('tr');
    const { itemID } = item;
    columnOrder.forEach((key) => {
      const td = document.createElement('td');
      if (key === 'Asmt Title' || key === 'Asmt Category') {
        td.classList.add('search-field');
      }
      td.textContent = item[key];
      row.appendChild(td);
    });

    const td = document.createElement('td');
    td.appendChild(createButton(
      'manageEdit',
      `<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1.81491H9C4 1.81491 2 3.62984 2 8.16715V13.6119C2 18.1492 4 19.9642 9 19.9642H15C20 19.9642 22 18.1492 22 13.6119V11.797" stroke="#3C3CD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.0399 2.74054L8.15988 9.89134C7.85988 10.1636 7.55988 10.699 7.49988 11.0892L7.06988 13.8207C6.90988 14.8098 7.67988 15.4995 8.76988 15.3633L11.7799 14.9731C12.1999 14.9187 12.7899 14.6464 13.0999 14.3742L20.9799 7.2234C22.3399 5.98925 22.9799 4.55546 20.9799 2.74054C18.9799 0.925612 17.3999 1.50639 16.0399 2.74054Z" stroke="#3C3CD0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.9102 3.76596C15.2417 4.83447 15.8701 5.80781 16.7351 6.59275C17.6001 7.37769 18.6727 7.94792 19.8502 8.24883" stroke="#3C3CD0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>      
      `,
      `${itemID}`,
      'edit',
    ));

    td.appendChild(createButton(
      'manageDelete',
      `<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 5.42661C17.67 5.12715 14.32 4.97288 10.98 4.97288C9 4.97288 7.02 5.06363 5.04 5.24512L3 5.42661M8.5 4.51007L8.72 3.3213C8.88 2.45921 9 1.81491 10.69 1.81491H13.31C15 1.81491 15.13 2.49551 15.28 3.33037L15.5 4.51007M18.85 8.29419L18.2 17.4323C18.09 18.8571 18 19.9642 15.21 19.9642H8.79C6 19.9642 5.91 18.8571 5.8 17.4323L5.15 8.29419M10.33 14.9731H13.66M9.5 11.3433H14.5" stroke="#FA114F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      `${itemID}`,
      'delete',
    ));

    row.appendChild(td);
    tableBody.appendChild(row);
  });
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  return table;
}

// Sort table
const getCellValue = (tr, index) => tr.children[index].innerText || tr.children[index].textContent;
const comparer = (idx, asc) => (a, b) => {
  const valueA = getCellValue(asc ? a : b, idx);
  const valueB = getCellValue(asc ? b : a, idx);
  return valueA !== '' && valueB !== '' && !isNaN(valueA) && !isNaN(valueB) ? valueA - valueB : valueA.toString().localeCompare(valueB);
};
function sortTable() {
  const toggleSortOrder = (th, sortOrderAsc) => {
    th.classList.toggle('asc', sortOrderAsc);
    th.classList.toggle('desc', !sortOrderAsc);
  };

  const clearSortClasses = () => {
    document.querySelectorAll('th').forEach((th) => {
      th.classList.remove('asc', 'desc');
    });
  };
  let sortOrderAsc = true;
  document.querySelectorAll('th').forEach((th) => th.addEventListener('click', (() => {
    const table = th.closest('table');
    sortOrderAsc = !sortOrderAsc;
    clearSortClasses();
    toggleSortOrder(th, sortOrderAsc);
    Array.from(table.querySelectorAll('tbody tr'))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), sortOrderAsc))
      .forEach((tr) => document.querySelector('tbody').appendChild(tr));
  })));
}

// click the delete button
function deleteGradeItem() {
  document.querySelectorAll('.manageDelete').forEach((btn) => {
    btn.addEventListener('click', () => {
      const clickedItemId = btn.id;
      const editRef = ref(db, `users/${userId}/courses/${courseId}/Grade Items/${clickedItemId}`);

      creteModalConfirm({
        modalTitle: 'Delete Grade Item',
        modalMessage: 'The Grade Item will be removed. Are you sure you wish to continue?',
        confirmText: 'Yes, Delete',
        cancelText: 'Cancel',
      }).then(() => {
        modalComponent.showModal();
        handleConfirmModalButtons({
          onconfirm: () => removeItemFromDB(editRef),
          oncancel: () => console.log('cancel'),
        });
      });
    });
  });
}

const setErrorMessage = (element, message) => {
  element.textContent = message;
};

const getTitleInput = () => {
  const titleInput = modalRoot.getElementById('titlebox');
  const titleError = modalRoot.getElementById('grade-title-error');
  const title = titleInput.value.trim();

  if (title === '') {
    setErrorMessage(titleError, 'Item title cannot be empty. Please provide a valid title.');
    return null;
  }

  setErrorMessage(titleError, '');
  return title;
};

const getWeightInput = (weightboxValue = 0) => {
  let remainingWeight = Number(localStorage.getItem('remainingWeight'));
  remainingWeight += Number(weightboxValue);
  const weightInput = modalRoot.getElementById('weightbox');
  const weightError = modalRoot.getElementById('grade-weight-error');
  const weight = Number(weightInput.value.trim());

  if (isNaN(weight) || weight <= 0) {
    setErrorMessage(weightError, 'Please provide a weight for your Item. The weight should be a Number between 1 and 100.');
    return null;
  }
  if (remainingWeight === 0) {
    setErrorMessage(weightError, 'You cannot add more Items. The weight of all the Items cannot be more than 100');
    return null;
  }
  if (weight > remainingWeight) {
    setErrorMessage(weightError, `Weight cannot be more than ${remainingWeight}. Please provide a valid weight for your Item.`);
    return null;
  }

  weightError.textContent = '';
  return weight;
};

const getDateInput = () => {
  const dateInput = modalRoot.getElementById('datebox');
  const dateError = modalRoot.getElementById('grade-date-error');
  const duedate = dateInput.value.trim();
  if (duedate === '') {
    setErrorMessage(dateError, 'Date field cannot be empty. Please provide a valid date for your Item.');
    return null;
  }
  dateError.textContent = '';
  return duedate;
};

const getDataFromInputs = (weightboxValue) => {
  const categorybox = modalRoot.getElementById('categorybox').value;
  const gradebox = modalRoot.getElementById('gradebox').value;
  const gradeObj = {
    'Asmt Title': getTitleInput(),
    'Asmt Category': categorybox,
    'Asmt Grade': gradebox,
    'Asmt Weight': getWeightInput(weightboxValue),
    'Asmt Due Date': getDateInput(),
  };
  return gradeObj;
};

function validateInputFields(titleInput, weightInput, dateInput) {
  return titleInput !== null && weightInput !== null && dateInput !== null;
}

function editGradeItem(ListItemsDB) {
  document.querySelectorAll('.manageEdit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const clickedItemId = btn.id; // Extract the ID from the button's ID
      const relevantItem = ListItemsDB.find((item) => item.itemID === clickedItemId);
      const editRef = `users/${userId}/courses/${courseId}/Grade Items/${clickedItemId}`;

      const weightboxValue = relevantItem['Asmt Weight'];

      createModalData('Edit Item').then(() => {
        modalComponent.showModal();

        const titlebox = modalRoot.getElementById('titlebox');
        const categorybox = modalRoot.getElementById('categorybox');
        const gradebox = modalRoot.getElementById('gradebox');
        const weightbox = modalRoot.getElementById('weightbox');
        const datebox = modalRoot.getElementById('datebox');
        titlebox.value = relevantItem['Asmt Title'];
        categorybox.value = relevantItem['Asmt Category'];
        gradebox.value = relevantItem['Asmt Grade'];
        weightbox.value = relevantItem['Asmt Weight'];
        datebox.value = relevantItem['Asmt Due Date'];

        modalRoot.querySelector('.add-item__button--save').addEventListener('click', () => {
          if (!validateInputFields(getTitleInput(), getWeightInput(weightboxValue), getDateInput())) { return; }
          updateCourseInDB(editRef, getDataFromInputs(weightboxValue));
        });

        closeModalButton(); // Event Handler on Click Close Button
      });
    });
  });
}

function createGradeItem() {
  const subheaderComponent = document.querySelector('subheader-component');
  const addItemButton = subheaderComponent.shadowRoot.querySelector('.new-item');
  const addItemAdditionalButton = document.querySelector('button-component[action="addItem"]');
  [addItemButton, addItemAdditionalButton]?.forEach((btn) => {
    btn.addEventListener('click', () => {
      createModalData('Add Item').then(() => {
        modalComponent.showModal();
      });
      modalRoot.querySelector('.add-item__button--save').addEventListener('click', () => {
        if (!validateInputFields(getTitleInput(), getWeightInput(), getDateInput())) { return; }
        const newGradeItemID = push(child(ref(db), 'courses')).key;
        const addRef = `users/${userId}/courses/${courseId}/Grade Items/${newGradeItemID}`;
        updateCourseInDB(addRef, getDataFromInputs());
      });
      closeModalButton(); // Event Handler on Click Close Button
    });
  });
}

async function getGradeItemsData() {
  const ListItemsRef = ref(db, `users/${userId}/courses/${courseId}/Grade Items`);
  try {
    const gradeItems = await getDataFromDB(ListItemsRef);
    return gradeItems;
  } catch (error) {
    console.error('Error while initializing the page:', error);
  }
}

function initializePageWithData(gradeItems) {
  if (gradeItems) {
    const sortedGradeItems = sortGradeItemsData(gradeItems);
    const tableElementItem = createTable(sortedGradeItems);
    document.getElementById('tableContainer').appendChild(tableElementItem);
    displayGradeSummary(sortedGradeItems);
    editGradeItem(sortedGradeItems);
    deleteGradeItem();
    sortTable();
  } else {
    document.querySelector('.site-main').classList.add('no-grade-items');
    localStorage.setItem('remainingWeight', 100);
  }
}

async function initializePage() {
  initializeHeader();
  createGradeItem();
  try {
    initializePageWithData(gradeItemsData);
  } catch (error) {
    console.error('Error while initializing the page:', error);
  } finally {
    hideSpinner();
  }
}

initializePage();
