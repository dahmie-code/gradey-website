const sortedLettersGradeArray = (letterGrades) => {
  const lettesItemArr = [];
  if (letterGrades) {
    Object.keys(letterGrades).forEach((item) => {
      lettesItemArr.push({
        key: item,
        value: letterGrades[item],
      });
    });
  }
  return lettesItemArr.sort((a, b) => b.value - a.value);
};

const createModalData = async (modalTitle) => {
  const modalComponent = document.querySelector('modal-component');
  const title = modalComponent.shadowRoot.querySelector('.modal__title');
  title.textContent = modalTitle || 'Create Item';
  const body = modalComponent.shadowRoot.querySelector('.modal__body');
  let listHTML = '';
  listHTML += `
      <div class='form-container'>
        <div class="form-item">
          <label class='add-item__content' for="titlebox">Title *</label>
          <input  type='text' class="add-item__input" id='titlebox' placeholder='Chapter 1 Reading Quiz'> </input>
          <em id='grade-title-error' class="error-box"></em>
        </div>
        <div class="form-item">
          <label class='add-item__content' for="categorybox">Category *</label>
            <select name="category" class="add-item__input" id="categorybox" placeholder='Quizzes'>
              <option value="Final Exam">Final Exam</option>
              <option value="Labs">Labs</option>
              <option value="Midterms">Midterms</option>
              <option value="Quizzes">Quizzes</option>
              <option value="Tests">Tests</option>
            </select>
          
        </div>
        <div class="form-item">
          <label class='add-item__content' for="gradebox">Grade *</label>
          <input  type='text' class="add-item__input" id='gradebox' placeholder='%'/>
          <em id='grade-error' class="error-box"></em>
        </div>
        <div class="form-item">
          <label class='add-item__content' for="weightbox">Weight *</label>
          <input  type='text' class="add-item__input" id='weightbox' placeholder='%'/>
          <em id='grade-weight-error' class="error-box"></em>
        </div>
        <div class="form-item">
          <label class='add-item__content' for="datebox">Due Date *</label>
          <input  type='date' class="add-item__input" id='datebox' placeholder='October 24, 2023'/>
          <em id='grade-date-error' class="error-box"></em>
        </div>
      </div>  
      <div class="add-item__buttons">
        <button class="add-item__button add-item__button--save add-item__button--fill" aria-label="Save">Save</button>
        <button class="add-item__button add-item__button--cancel" aria-label="Cancel">Cancel</button>
      </div>
      `;
  body.innerHTML = listHTML;
};

const closeModalButton = () => {
  const modalComponent = document.querySelector('modal-component');
  const cancelButton = modalComponent.shadowRoot.querySelector('.add-item__button--cancel');
  cancelButton.addEventListener('click', () => {
    modalComponent.setAttribute('hidden', '');
  });
};

function createButton(className, btnIcon, buttonId, action) {
  const actionEditButton = document.createElement('button');
  actionEditButton.className = className;
  actionEditButton.innerHTML = btnIcon;
  actionEditButton.id = buttonId;
  actionEditButton.setAttribute('action', action);
  actionEditButton.setAttribute('aria-label', action);
  return actionEditButton;
}

export { sortedLettersGradeArray, createModalData, closeModalButton, createButton };
