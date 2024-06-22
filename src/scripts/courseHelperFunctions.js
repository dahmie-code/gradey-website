const closeModalButton = () => {
  const modalComponent = document.querySelector('modal-component');
  const cancelButton = modalComponent.shadowRoot.querySelector('.add-item__button--cancel');
  cancelButton.addEventListener('click', () => {
    modalComponent.setAttribute('hidden', '');
  });
};

const createModalData = async (modalTitle) => {
  const modalComponent = document.querySelector('modal-component');
  const title = modalComponent.shadowRoot.querySelector('.modal__title');
  title.textContent = modalTitle || 'Edit Course';
  const body = modalComponent.shadowRoot.querySelector('.modal__body');
  let listHTML = '';
  listHTML += `
      <div class='form-container'>
        <div class="form-item">
          <label class='add-item__content' for="codebox">Course Code *</label>
          <input  type='text' class="add-item__input" id='codebox' placeholder='CPS500'> </input>
          <em id='courseError' class="error-box" style='color: red;'></em>
        </div>
        <div class="form-item">
          <label class='add-item__content' for="titlebox">Course Name *</label>
          <input  type='text' class="add-item__input" id='titlebox' placeholder='Python'> </input>
          <em id='titleError' class="error-box" style='color: red;'></em>
        </div>
        <div class="form-item">
          <label class='add-item__content' for="goalbox">Goal(%)</label>
          <input  type='text' class="add-item__input" id='goalbox' placeholder='100.00'/>
          <em id='goalError' class="error-box" style='color: red;'></em>
        </div>
        <div class="form-item form-item__checkbox">
        <label class='add-item__content' for="showgpabox">GPA Based Course</label>
        <div class="checkbox-container">
          <input  type='checkbox' class="add-item__input" id='showgpabox'/>
        </div>
        <div class="inactive" id="gpaScale">
          <div class="course__content" id="gpaLabel">GPA Scale</div>

          <div class="course__content">Enter the mininmun grade required to achieve each letter grade for this course. For courses that do not have a gpa scale, you may leave this section blank.
          </div>

          <div class="enter__gpaScales">
              <div class="input__a gpa-scale-input">
                  <label class="input__gpa">A+<input type="text" class="input__gpaScale" id="aPlusbox"></label>
                  <label class="input__gpa">A<input type="text" class="input__gpaScale" id="abox"></label>
                  <label class="input__gpa">A-<input type="text" class="input__gpaScale" id="aMinusbox"></label>
              </div>
              <div class="input__b gpa-scale-input">
                  <label class="input__gpa">B+<input type="text" class="input__gpaScale" id="bPlusbox"></label>
                  <label class="input__gpa">B<input type="text" class="input__gpaScale" id="bbox"></label>
                  <label class="input__gpa">B-<input type="text" class="input__gpaScale" id="bMinusbox"></label>
              </div>
              <div class="input__c gpa-scale-input">
                  <label class="input__gpa">C+<input type="text" class="input__gpaScale" id="cPlusbox"></label>
                  <label class="input__gpa">C<input type="text" class="input__gpaScale" id="cbox"></label>
                  <label class="input__gpa">C-<input type="text" class="input__gpaScale" id="cMinusbox"></label>
              </div>
              <div class="input__d gpa-scale-input">
                  <label class="input__gpa">D+<input type="text" class="input__gpaScale" id="dPlusbox"></label>
                  <label class="input__gpa">D<input type="text" class="input__gpaScale" id="dbox"></label>
              </div>
          </div>
          <em id="gpaScaleError" class="error__message"></em>

      </div>
      </div>
      <div class="selectColor">
          <div class="course__content">Select A Course Color</div>
            <div id="colorButtonsContainer" class="color__buttons">
            <button class="color__button" id="lightPink" style="background-color: var(--lightPink);"></button>
            <button class="color__button" id="pink" style="background-color: var(--pink);"></button>
            <button class="color__button" id="red" style="background-color: var(--red);"></button>
            <button class="color__button" id="orange" style="background-color: var(--orange);"></button>
            <button class="color__button" id="yellow" style="background-color: var(--yellow);"></button>
            <button class="color__button" id="lightYellow" style="background-color: var(--lightYellow);"></button>
            <button class="color__button" id="lightPurple" style="background-color: var(--lightPurple);"></button>
            <button class="color__button" id="purple" style="background-color: var(--purple);"></button>
            <button class="color__button" id="darkPurple" style="background-color: var(--darkPurple);"></button>
            <button class="color__button" id="darkBlue" style="background-color: var(--darkBlue);"></button>
            <button class="color__button" id="blue" style="background-color: var(--blue);"></button>
            <button class="color__button" id="lightBlue" style="background-color: var(--lightBlue);"></button>
            <button class="color__button" id="lightGreen" style="background-color: var(--lightGreen);"></button>
            <button class="color__button" id="green" style="background-color: var(--green);"></button>
            <button class="color__button" id="darkGreen" style="background-color: var(--darkGreen);"></button>
            <button class="color__button" id="darkGray" style="background-color: var(--darkGray);"></button>
          </div>
      </div>

      </div>  
      <div class="add-item__buttons">
        <button class="add-item__button add-item__button--save add-item__button--fill" aria-label="Save">Save</button>
        <button class="add-item__button add-item__button--cancel" aria-label="Cancel">Cancel</button>
      </div>
      `;
  body.innerHTML = listHTML;
};

export { createModalData, closeModalButton };
