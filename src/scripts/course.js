/* eslint-disable no-unused-expressions */
import {
  defineCourseTextColor,
  calculateWeightedGrade,
  getTotalWeight,
  getItemsDueInNextNDays,
  getSumWeight,
  getAverage,
  getCourseLetters,
  getRemainingWeight,
  calculatePotentialGrade,
} from './calculationFunctions.js';
import {
  createModalData,
  closeModalButton,
} from './courseHelperFunctions.js';
import { ref, db, push, child } from './firebase.js';
import { creteModalConfirm, handleConfirmModalButtons } from './confirm.js';
import { getDataFromDB, updateCourseInDB, removeItemFromDB } from './databaseHelpersFunctions.js';
import {showSpinner, hideSpinner} from "./loaderPage.js";
import { sortedLettersGradeArray } from './gradeItemHelperFunc.js';

const userId = localStorage.getItem('userId');
const modalComponent = defineModalComponent();
const modalRoot = initializeModalComponent(modalComponent);

if (!userId) {
  // User is not logged in, redirect them to the login page
  window.location.href = 'login.html';
  localStorage.clear();
}

function handleSearch(searchQuery) {
  const filter = searchQuery.toUpperCase();
  const courseComponent = document.querySelectorAll('course-component');
  for (let i = 0; i < courseComponent.length; i++) {
    const txtValueTitle = courseComponent[i].getAttribute('title').toUpperCase();
    const txtValueCode = courseComponent[i].getAttribute('code').toUpperCase();
    if (txtValueTitle.indexOf(filter) > -1 || txtValueCode.indexOf(filter) > -1) {
      courseComponent[i].style.display = '';
    } else {
      courseComponent[i].style.display = 'none';
    }
  }
}

function initializeSearch() {
  const subheaderComponent = document.querySelector('subheader-component');
  const searchComponent = subheaderComponent.shadowRoot.querySelector('search-component');
  searchComponent.setPageSpecificSearchHandler(handleSearch);
}

// update header component
function initializeHeader() {
  const headerComponent = document.querySelector('header-component');
  const el = headerComponent.shadowRoot.querySelector('.site-header .container');
  const content = '<h1 class="main-title">Grade Tracker - <span class="course-name">Courses</span></h1>';
  el.insertAdjacentHTML('beforeend', content);
  initializeSearch();
}

function defineModalComponent() {
  return document.querySelector('modal-component');
}

function initializeModalComponent(modal) {
  return modal.shadowRoot;
}

initializeHeader();

// Add a function to initialize the page and get the data from the database
async function initializePage() {
  const courseRef = ref(db, `users/${userId}/courses/`);
  try {
    showSpinner();
    const coursesData = await getDataFromDB(courseRef); // get data from DB

    if (coursesData) {
      const courses = coursesData; // Store the data in a variable for later use
      createCourseComponents(courses);
      const sortedCoursesData = sortCoursesData(courses);
      showOveralAverage(sortedCoursesData);
      showGPAAverage(sortedCoursesData);
      hideSpinner();
    } else {
      document.querySelector('.site-main').classList.add('no-courses');
      hideSpinner();
    }
  } catch (error) {
    console.error('Error while initializing the page:', error);
    return null;
  }
}

initializePage();
// Call initializePage() when the page visibility is set to visible
document.addEventListener('visibilitychange', () => {
  const courseContainer = document.getElementById('course-container');
  if (document.visibilityState === 'visible') {
    courseContainer.innerHTML = '';
    initializePage();
  }
});

function sortCoursesData(coursesData) {
  return Object.keys(coursesData)?.map((courseKey) => ({
    courseID: courseKey,
    ...coursesData[courseKey],
  }));
}

// Calculate Average for all Courses
function calculateOverallAverage(sortedCoursesData) {
  const averageList = [];
  sortedCoursesData.forEach((course) => {
    averageList.push(((calculateWeightedGrade(course['Grade Items']) * 100) / getTotalWeight()).toFixed(2));
  });
  const numericArray = averageList.map(Number);
  return getAverage(numericArray);
}

function showOveralAverage(sortedCoursesData) {
  const averageTotal = calculateOverallAverage(sortedCoursesData);
  document.getElementById('averageTotal').innerHTML = isNaN(averageTotal) ? 0 : averageTotal;
}

// Calculate GPA for All Courses
function getCourseLetterGradeObj(currentCourse) {
  const lettesItemArr = sortedLettersGradeArray(currentCourse['GPA Scale']);
  const average = calculateWeightedGrade(currentCourse['Grade Items']);
  return lettesItemArr.find((prop) => prop.value <= average);
}

function getCourseLetterGrade(courseLetterGradeObj) {
  return courseLetterGradeObj ? courseLetterGradeObj.key : null;
}

function calculateGPAAverage(sortedCoursesData) {
  const GPAValuesObj = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
  };
  const averageList = [];
  sortedCoursesData.forEach((course) => {
    const letter = getCourseLetterGrade(getCourseLetterGradeObj(course));
    if (letter) {
      averageList.push(GPAValuesObj[letter]);
    }
  });
  return getAverage(averageList);
}

function showGPAAverage(sortedCoursesData) {
  const averageTotal = calculateGPAAverage(sortedCoursesData);
  document.getElementById('gpaTotal').innerHTML = isNaN(averageTotal) ? 'N/A' : averageTotal;
}

function createCourseComponents(coursesData) {
  const courseContainer = document.getElementById('course-container');
  let courses = [];
  coursesData
    ? courses = sortCoursesData(coursesData)
    : document.querySelector('.site-main').classList.add('no-courses');

  courses.length && courses.forEach((currentCourse) => {
    const courseComponent = document.createElement('course-component');
    const remainingWeight = getRemainingWeight(100, getSumWeight(currentCourse['Grade Items']));
    let courseAverageGrade = (calculateWeightedGrade(currentCourse['Grade Items']));
    let potentialGrade = calculatePotentialGrade(currentCourse['Grade Items'], remainingWeight);
    courseAverageGrade = courseAverageGrade.toFixed(2);
    potentialGrade = potentialGrade.toFixed(2);

    // formula for neededToAchieveTarget (Goal - (( 1 - RemainingWeight ) * CurrentGrade)) / RemainingWeight
    const decimalRemainingWeight = remainingWeight / 100;
    const neededToAchieveTarget = ((currentCourse['Course Goal'] - ((1 - decimalRemainingWeight) * courseAverageGrade)) / decimalRemainingWeight).toFixed(2);
    const targetMessage =
      neededToAchieveTarget > 100
        ? 'It looks like you can no longer reach your target grade for this course'
        : neededToAchieveTarget <= 0
        ? 'Target achieved'
        : `${neededToAchieveTarget}% needed to achieve the target grade`;

    courseComponent.setAttribute('target-needed', targetMessage);

    setCourseComponentAttributes(currentCourse, courseAverageGrade, potentialGrade, courseComponent)
    showProgressBar(courseComponent, currentCourse);

    courseContainer.appendChild(courseComponent);

    // click on Course -> open Grade Items Page
    courseComponent.shadowRoot.querySelectorAll('.course__item').forEach((card) => {
      card.addEventListener('click', () => {
        handleCourseItemClick(currentCourse, courseAverageGrade, potentialGrade);
      });
    });

    // click the Edit Button
    courseComponent.shadowRoot.querySelector('.course__item--btn-edit').addEventListener('click', (e) => {
      editCourse(currentCourse);
      closeModalButton();
      e.stopPropagation();
    });

    // click the Delete Button
    courseComponent.shadowRoot.querySelectorAll('.course__item--btn-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const courseId = btn.id;
        const editRef = ref(db, `users/${userId}/courses/${courseId}/`);

        creteModalConfirm({
          modalTitle: 'Course Delete',
          modalMessage: 'The course will be removed. Are you sure you want to continue?',
          confirmText: 'Yes, Delete',
          cancelText: 'Cancel',
        }).then(() => {
          modalComponent.showModal();
          handleConfirmModalButtons({
            onconfirm: () => removeItemFromDB(editRef),
            oncancel: () => console.log('cancel'),
          });
        });
        e.stopPropagation();
      });
    });
  });
}

function getLettersForGPAObj(GPAScale) {
  const defaultScale = {
    'A+': null,
    'A': null,
    'A-': null,
    'B+': null,
    'B': null,
    'B-': null,
    'C+': null,
    'C': null,
    'C-': null,
    'D+': null,
    'D': null,
  };

  if (!modalRoot.querySelector('input[type="checkbox"]').checked) {
    return { ...defaultScale };
  } else {
    return {
      'A+': GPAScale?.aPlus,
      'A': GPAScale?.a,
      'A-': GPAScale?.aMinus,
      'B+': GPAScale?.bPlus,
      'B': GPAScale?.b,
      'B-': GPAScale?.bMinus,
      'C+': GPAScale?.cPlus,
      'C': GPAScale?.c,
      'C-': GPAScale?.cMinus,
      'D+': GPAScale?.dPlus,
      'D': GPAScale?.d,
    };
  }
}

function getCodeInput() {
  const codebox = modalRoot.getElementById('codebox');
  const codeInput = codebox.value.trim().toUpperCase();

  const codePattern = /^[A-Za-z0-9]{7}$/;
  const courseError = modalRoot.getElementById('courseError');

  if (codeInput === null || codeInput === '' || !codePattern.test(codeInput)) {
    courseError.innerHTML = 'Course code input is not valid. Please enter a 7-character alphanumeric code (e.g., CPSC235).';
    return null;
  } else {
    courseError.innerHTML = '';
    return codeInput;
  }
}

function getTitleInput() {
  const titlebox = modalRoot.getElementById('titlebox');
  let titleInput = titlebox.value.trim().toLowerCase().split(' ').map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
  const titleError = modalRoot.getElementById('titleError');

  if (titleInput === null || titleInput === '') {
    titleError.innerHTML = 'Course Name cannot be empty.';
    return null;
  } else if (titleInput.length > 50) {
    titleError.innerHTML = 'Course Name must be less than 50 characters.';
  } else {
    titleError.innerHTML = '';
  }
  return titleInput;
}

function getGoalInput() {
  const goalbox = modalRoot.getElementById('goalbox');
  const goalInput = goalbox.value.trim();
  const goalError = modalRoot.getElementById('goalError');

  if (
    goalInput === null
    || goalInput === ''
    || isNaN(goalInput)
    || parseFloat(goalInput) < 1
    || parseFloat(goalInput) > 100
  ) {
    goalError.innerHTML = 'Goal input is not valid. Please enter a number between 1 and 100.';
    return null;
  } else {
    goalError.innerHTML = '';
    return /^\d+\.\d+$/.test(goalInput) ? goalInput : goalInput + '.00';
  }
}

function isValidInputs(codeInput, titleInput, goalInput) {
  return codeInput !== null && titleInput !== null && goalInput !== null;
}

function getFormFieldsValues(currentCourse) {
  const lettersForGPAScale = currentCourse ? getCourseLetters(currentCourse['GPA Scale']) : {};

  ['aPlus', 'a', 'aMinus', 'bPlus', 'b', 'bMinus', 'cPlus', 'c', 'cMinus', 'dPlus', 'd'].forEach((gpaGrade) => {
    const gradeValue = modalRoot.getElementById(`${gpaGrade}box`).value;
    gradeValue ? lettersForGPAScale[gpaGrade] = gradeValue : lettersForGPAScale[gpaGrade] = null;
  });

  const gpaScaleObj = getLettersForGPAObj(lettersForGPAScale);

  const codeInput = getCodeInput();
  const titleInput = getTitleInput();
  const goalInput = getGoalInput();
  const courseObj = {
    'Course Code': codeInput,
    'Course Title': titleInput,
    'Course Goal': goalInput,
    'Course Color': 'darkGray',
    'GPA Scale': gpaScaleObj,
    'Grade Items': currentCourse && currentCourse['Grade Items'] ? currentCourse['Grade Items'] : {},
  };

  if (isValidInputs(codeInput, titleInput, goalInput)) {
    return courseObj;
  }
}

function toggleGPABox() {
  modalRoot.querySelector('#showgpabox').addEventListener('click', () => {
    const container = modalRoot.querySelector('.checkbox-container');
    const el = modalRoot.getElementById('gpaScale');
    el.className === 'inactive' ? el.className = 'active' : el.className = 'inactive';
    container.classList.toggle('checked');
  });
}

function showChosenCourseColor() {
  const btnContainer = modalRoot.querySelector('.color__buttons');
  btnContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('color__button')) {
      const buttons = btnContainer.querySelectorAll('.color__button');
      buttons.forEach((btn) => {
        btn.style.borderColor = btn === e.target ? 'rgb(0, 17, 79)' : 'transparent';
      });
    }
  });
}

// Edit Course
function editCourse(currentCourse) {
  const GPAScale = getCourseLetters(currentCourse['GPA Scale']);

  createModalData('Edit Course').then(() => {
    toggleGPABox(); // slider GPA Scale

    const titlebox = modalRoot.getElementById('titlebox');
    const goalbox = modalRoot.getElementById('goalbox');
    const colorButtons = modalRoot.querySelectorAll('.color__button');
    const codebox = modalRoot.getElementById('codebox');
    codebox.value = currentCourse['Course Code'];
    titlebox.value = currentCourse['Course Title'];
    goalbox.value = currentCourse['Course Goal'];

    const gradeToGPAKey = {
      'aPlus': 'A+',
      'a': 'A',
      'aMinus': 'A-',
      'bPlus': 'B+',
      'b': 'B',
      'bMinus': 'B-',
      'cPlus': 'C+',
      'c': 'C',
      'cMinus': 'C-',
      'dPlus': 'D+',
      'd': 'D'
    };

    ['aPlus', 'a', 'aMinus', 'bPlus', 'b', 'bMinus', 'cPlus', 'c', 'cMinus', 'dPlus', 'd'].forEach((grade) => {
      const inputField = modalRoot.getElementById(`${grade}box`);
      const gpaKey = gradeToGPAKey[grade];
      const gpaScaleValue = GPAScale[gpaKey];
      if (inputField && gpaScaleValue !== undefined) {
        inputField.value = gpaScaleValue;
      }
    });

    const courseColorElement = modalRoot.getElementById(currentCourse['Course Color']);
    if (courseColorElement) {
      courseColorElement.style.borderColor = 'rgb(0, 17, 79)';
    }

    let courseColorValue = currentCourse['Course Color'];
    colorButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        courseColorValue = btn.getAttribute('id');
      });
    });

    modalComponent.showModal();
    showChosenCourseColor();

    modalRoot.querySelector('.add-item__button--save').addEventListener('click', () => {
      const courseObj = getFormFieldsValues(currentCourse);// get value on submit OR on change input
      const editRef = `users/${userId}/courses/${currentCourse.courseID}/`;
      if (courseColorValue) { courseObj['Course Color'] = courseColorValue; }
      if (courseObj) { updateCourseInDB(editRef, courseObj); }
    });
  });
}

// Add Course
const subheaderComponent = document.querySelector('subheader-component');
const openModalButton = subheaderComponent.shadowRoot.querySelector('button-component[action="openAddCourseModal"]');
const openModalAdditionalButton = document.querySelector('button-component[action="openAddCourseModal"]');
[openModalButton, openModalAdditionalButton]?.forEach((btn) => {
  btn?.addEventListener('click', () => {
    createModalData('Add Course').then(() => {
      modalRoot.getElementById('darkGray').style.borderColor = 'rgb(0, 17, 79)';
      toggleGPABox();
      showChosenCourseColor();

      let courseColorValue = 'darkGray';
      modalRoot.querySelectorAll('.color__button').forEach((btn) => {
        btn.addEventListener('click', () => {
          courseColorValue = btn.getAttribute('id');
        });
      });

      function createNewCourse() {
        const objFormValues = getFormFieldsValues();
        objFormValues['Course Color'] = courseColorValue;
        const newCourseID = push(child(ref(db), 'courses')).key;
        const addRef = `users/${userId}/courses/${newCourseID}`;
        if (objFormValues) { updateCourseInDB(addRef, objFormValues); }
      }
      modalComponent.showModal();
      modalRoot.querySelector('.add-item__button--save').addEventListener('click', () => {
        createNewCourse();
      });
    });
    closeModalButton();
  });
});

function showProgressBar(courseComponent, currentCourse) {
  const progressBar = ((getSumWeight(currentCourse['Grade Items']) / getTotalWeight()) * 100).toFixed(0);
  const progressBarValue = parseFloat(progressBar);
  const progressBarColor = progressBarValue < 50 ? '#ff0000' : progressBarValue < 80 ? '#ffbc0d' : '#008000';
  courseComponent.setAttribute('progress-bar', progressBarValue);
  courseComponent.setAttribute('progress-bar-color', progressBarColor);
}

function handleCourseItemClick(courseData, courseAverageGrade, potentialGrade) {
  localStorage.setItem('courseId', courseData.courseID);
  localStorage.setItem('courseCode', courseData['Course Code']);
  localStorage.setItem('courseName', courseData['Course Title']);
  localStorage.setItem('average', courseAverageGrade);
  localStorage.setItem('potential', potentialGrade);
  localStorage.setItem('letterGrade', JSON.stringify(courseData['GPA Scale'] || null));
  window.location.href = './gradeItemsList.html';
}

function setCourseComponentAttributes(currentCourse, courseAverageGrade, potentialGrade, courseComponent) {
  const courseAttributes = {
    'title': currentCourse['Course Title'],
    'code': currentCourse['Course Code'],
    'color': defineCourseTextColor(currentCourse['Course Color']),
    'course-color': currentCourse['Course Color'],
    'goal': currentCourse['Course Goal'],
    'average': courseAverageGrade,
    'item-due': getItemsDueInNextNDays(currentCourse['Grade Items'], 5).length, //assignements due in the next 5 days
    'potential-grade': potentialGrade,
    'id': currentCourse.courseID,
  };
  Object.entries(courseAttributes).forEach(([attribute, value]) => {
    courseComponent.setAttribute(attribute, value);
  });
}
