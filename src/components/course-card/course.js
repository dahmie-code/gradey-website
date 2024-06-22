export default class Course extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'Course title';
    const code = this.getAttribute('code') || 'Course code';
    const goal = this.getAttribute('goal') || 0.00;
    const color = this.getAttribute('color') || 'rgb(114, 114, 114)';
    const courseColor = this.getAttribute('course-color');
    const itemDue = this.getAttribute('item-due');
    const average = this.getAttribute('average');
    const potentialGrade = this.getAttribute('potential-grade');
    const targetNeeded = this.getAttribute('target-needed');
    const progressBarValue = this.getAttribute('progress-bar') || 0;
    const progressBarColor = this.getAttribute('progress-bar-color') || '';
    const courseID = this.getAttribute('id');
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/course-card/course.css">
      <div class="course__item" id="${courseID}" course-color="${courseColor}">
        <div class="course__item--left" style="background: var(--${courseColor}); color: ${color}">
            <h3 class="course__item--grade-title">Course grade</h3>
            <h4 class="course__item--average">${average}%</h4>
            <div class="progress__bar progress__bar--container">
                <div class="progress__bar--progress-line">
                    <div class="progress__bar--progress-achieved" style="width: ${progressBarValue}%; background-color:${progressBarColor}"></div>
                </div>
                <p class="progress__bar--progress-title">${progressBarValue}% Complete</p>
            </div>
        </div>
        <div class="course__item--right">
            <h3 class="course__item--course-lable">Course summary</h3>
            <h4 class="course__item--course-title">
                <span class="course__item--course-code">${code}</span>: 
                <span class="course__item--course-name">${title}</span>
            </h4>
            <ul class="course__item--summary">
                <li>
                    <img class="course__item--details-img" src="./img/svg/calendar.svg" alt="calendar icon">
                    <span class="course__item--details"><span>${itemDue}</span> items due in the next 5 days</span>
                </li>
                <li>
                    <img class="course__item--details-img" src="./img/svg/medalstar.svg" alt="medalstar icon">
                    <span class="course__item--details">Target Grade: <span>${goal}</span>%</span>
                </li>
                <li>
                    <img class="course__item--details-img" src="./img/svg/teacher.svg" alt="teacher icon">
                    <span class="course__item--details">Potential Grade: <span>${potentialGrade}</span>%</span>
                </li>
                <li>
                    <img class="course__item--details-img" src="./img/svg/percentagecircle.svg" alt="percentagecircle icon">
                    <span class="course__item--details"><span>${targetNeeded}</span></span>
                </li>
            </ul>
            <div class="course__item--btn-container">
                <button class="button course__item--btn-edit" aria-label="Edit Course">
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1.81491H9C4 1.81491 2 3.62984 2 8.16715V13.6119C2 18.1492 4 19.9642 9 19.9642H15C20 19.9642 22 18.1492 22 13.6119V11.797" stroke="#3C3CD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.0399 2.74054L8.15988 9.89134C7.85988 10.1636 7.55988 10.699 7.49988 11.0892L7.06988 13.8207C6.90988 14.8098 7.67988 15.4995 8.76988 15.3633L11.7799 14.9731C12.1999 14.9187 12.7899 14.6464 13.0999 14.3742L20.9799 7.2234C22.3399 5.98925 22.9799 4.55546 20.9799 2.74054C18.9799 0.925612 17.3999 1.50639 16.0399 2.74054Z" stroke="#3C3CD0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.9102 3.76596C15.2417 4.83447 15.8701 5.80781 16.7351 6.59275C17.6001 7.37769 18.6727 7.94792 19.8502 8.24883" stroke="#3C3CD0" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Edit</span>
                </button>
                <button class="button course__item--btn-delete" id="${courseID}" aria-label="Delete Course">
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 5.42661C17.67 5.12715 14.32 4.97288 10.98 4.97288C9 4.97288 7.02 5.06363 5.04 5.24512L3 5.42661M8.5 4.51007L8.72 3.3213C8.88 2.45921 9 1.81491 10.69 1.81491H13.31C15 1.81491 15.13 2.49551 15.28 3.33037L15.5 4.51007M18.85 8.29419L18.2 17.4323C18.09 18.8571 18 19.9642 15.21 19.9642H8.79C6 19.9642 5.91 18.8571 5.8 17.4323L5.15 8.29419M10.33 14.9731H13.66M9.5 11.3433H14.5" stroke="#FA114F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Delete</span>
                </button>
            </div>
        </div>
      </div>
    `;
  }
}

customElements.define('course-component', Course);
