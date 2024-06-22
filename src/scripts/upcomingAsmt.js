import {
  ref, get, db,
} from './firebase.js';

const userId = localStorage.getItem('userId');

async function getCoursesFor(id) {
  try {
    const courseRef = ref(db, `users/${id}/courses/`);
    const snapshot = await get(courseRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error('Error fetching user data from Firebase', error);
  }
}

function formatData(inputDate) {
  const dateComponents = inputDate.split('-');
  const year = Number(dateComponents[0]);
  const month = Number(dateComponents[1]) - 1; // Months are zero-based
  const day = Number(dateComponents[2]) + 1;
  const utcDate = new Date(Date.UTC(year, month, day));
  return utcDate;
}

function getAllUpcomingAssessments(courses) {
  const assessments = [];
  const dateNow = new Date();
  if (!courses) { return null; }
  Object.values(courses).forEach((course) => {
    if (course['Grade Items']) {
      Object.values(course['Grade Items']).forEach((gradeItem) => {
        if (formatData(gradeItem['Asmt Due Date']) >= dateNow) {
          assessments.push({
            courseTitle: course['Course Title'],
            courseCode: course['Course Code'],
            courseColor: course['Course Color'],
            asmtTitle: gradeItem['Asmt Title'],
            asmtCategory: gradeItem['Asmt Category'],
            asmtDueDate: formatData(gradeItem['Asmt Due Date']),
          });
        }
      });
    }
  });
  return assessments;
}

function filterAssessmentsByDueDate(assessments, selectedValue) {
  const dateNow = new Date();
  const filteredAssessment = assessments.filter((assessment) => {
    switch (selectedValue) {
      case 'dueToday':
        return isSameDay(assessment.asmtDueDate, dateNow);
      case 'dueTomorrow':
        const tomorrow = new Date(dateNow);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return isSameDay(assessment.asmtDueDate, tomorrow);
      case 'dueThisWeek':
        const endOfWeek = new Date(dateNow);
        endOfWeek.setDate(dateNow.getDate() + (6 - dateNow.getDay()));
        endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day
        return assessment.asmtDueDate <= endOfWeek;
      case 'dueLater':
        return assessment.asmtDueDate > dateNow;
      case 'all':
        return true;
      default:
        return false;
    }
  });

  // Sort filtered assignments by due date in ascending order
  filteredAssessment.sort((a, b) => a.asmtDueDate - b.asmtDueDate);
  return filteredAssessment;
}

// Helper function to check if two dates are the same day
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

const modalComponent = document.querySelector('modal-component');
const subheaderComponent = document.querySelector('subheader-component');
const openModalButton = subheaderComponent.shadowRoot.querySelector('.assignments');

const userData = await getCoursesFor(userId);
const assessments = getAllUpcomingAssessments(userData);

const createModalData = async () => {
  const title = modalComponent.shadowRoot.querySelector('.modal__title');
  title.textContent = 'Upcoming Assessments';
  const body = modalComponent.shadowRoot.querySelector('.modal__body');
  let listHTML = '';
  listHTML += `
  <select id="assessments" class="assessment__date-select">
    <option value="all">Show All</option>
    <option value="dueToday">Due Today</option>
    <option value="dueTomorrow">Due Tomorrow</option>
    <option value="dueThisWeek">Due Later This Week</option>
    <option value="dueLater">Due Later</option>
  </select>
  `;
  const showAssignments = assessments ? filterAssessmentsByDueDate(assessments, 'all') : false;
  if (showAssignments) {
    listHTML += '<ul class="assessment__container">';
    showAssignments.forEach((assessment) => {
      listHTML += `
        <li class="assessment__item  ${assessment.courseColor}">
          <p>Course: ${assessment.courseTitle} | ${assessment.courseCode}</p>
          <h3>Assessment: ${assessment.asmtTitle} | ${assessment.asmtCategory}</h3>
          <p>Due Date: ${assessment.asmtDueDate.toLocaleDateString()}</p>
        </li>
      `;
    });
    listHTML += '</ul>';
  } else {
    listHTML += `
    <p>There are no Upcoming Assessments</p>
  `;
  }
  body.innerHTML = listHTML;
};

const updateDisplayedAssessments = (selectedValue) => {
  const filteredAssignments = assessments ? filterAssessmentsByDueDate(assessments, selectedValue) : false;
  const body = modalComponent.shadowRoot.querySelector('.assessment__container');
  let listHTML = '';
  if (!filteredAssignments) { return; }
  if (filteredAssignments.length === 0) {
    body.innerHTML = '<p class="no-assessments">There are no Upcoming Assessments</p>';
    return;
  }

  filteredAssignments.forEach((assessment) => {
    listHTML += `
      <li class="assessment__item  ${assessment.courseColor}">
        <p>Course: ${assessment.courseTitle} | ${assessment.courseCode}</p>
        <h3>Assessment: ${assessment.asmtTitle} | ${assessment.asmtCategory}</h3>
        <p>Due Date: ${assessment.asmtDueDate.toLocaleDateString()}</p>
      </li>
    `;
  });
  body.innerHTML = listHTML;
};
const selectValueFromDropdown = () => {
  const selectedValueElement = modalComponent.shadowRoot.getElementById('assessments');
  selectedValueElement.addEventListener('change', () => {
    const selectedValue = selectedValueElement.value;
    updateDisplayedAssessments(selectedValue);
  });
};

openModalButton.addEventListener('click', () => {
  createModalData().then(() => {
    selectValueFromDropdown();
    modalComponent.showModal();
  });
});
