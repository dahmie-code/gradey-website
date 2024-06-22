import { getAccentColorFor } from './helperFunctions.js';

const defineCourseTextColor = (color) => {
  const body = document.querySelector('body');
  const style = window.getComputedStyle(body);
  const courseColorRGB = style.getPropertyValue(`--${color}`).match(/\d+/g);
  const accentColor = courseColorRGB !== null
    ? getAccentColorFor(...courseColorRGB)
    : getAccentColorFor(33, 30, 30);
  return accentColor;
};

const doesExist = (argument) => argument !== undefined && argument !== null;

const getTotalWeight = () => 100;

const getGradeItems = (courseGradeItems) => {
  if (!courseGradeItems) { return null; }
  const gradeItems = Object.keys(courseGradeItems)?.map((itemKey) => ({
    gradeItemID: itemKey,
    ...courseGradeItems[itemKey],
  }));
  return gradeItems;
};

const calculateWeightedGrade = (items) => {
  let weightedGrade = 0;
  let totalWeight = 0;
  const gradeItems = getGradeItems(items);

  if (gradeItems !== null) {
    for (const gradeItem of gradeItems) {
      const asmtGrade = gradeItem['Asmt Grade'];
      const asmtWeight = gradeItem['Asmt Weight'];
      if (doesExist(asmtGrade) && doesExist(asmtWeight)) {
        weightedGrade += asmtGrade * asmtWeight;
        totalWeight += asmtWeight;
      }
    }
  }

  return totalWeight === 0 ? 0 : weightedGrade / totalWeight;
};

const getItemsDueInNextNDays = (courseGradeItems, numDays) => {
  const MILLISECONDS_PER_SECOND = 1000;
  const SECONDS_PER_HOUR = 3600;
  const HOURS_PER_DAY = 24;
  const todayDate = new Date();
  const gradeItems = getGradeItems(courseGradeItems);

  const dueItems = gradeItems?.filter((gradeItem) => {
    if (doesExist(gradeItem['Asmt Due Date'])) {
      const asmtDueDate = new Date(gradeItem['Asmt Due Date']);
      const timeDifference = asmtDueDate - todayDate;
      const daysDifference = timeDifference / (MILLISECONDS_PER_SECOND * SECONDS_PER_HOUR * HOURS_PER_DAY);
      return daysDifference >= 0 && daysDifference <= numDays;
    }
    return false;
  });

  return !dueItems ? [] : dueItems;
};

const getSumWeight = (courseGradeItems) => {
  let sumWeight = 0;
  const gradeItems = getGradeItems(courseGradeItems);

  gradeItems?.forEach((gradeItem) => {
    if (doesExist(gradeItem['Asmt Weight']) && gradeItem['Asmt Grade'] !== '') {
      sumWeight += gradeItem['Asmt Weight'];
    }
  });
  return sumWeight;
};

const getRemainingWeight = (totalWeight, sumWeight) => totalWeight - sumWeight;

const calculatePotentialGrade = (items, remainingWeight) => {
  let weightedGrade = 0;
  const gradeItems = getGradeItems(items);

  if (gradeItems !== null) {
    for (const gradeItem of gradeItems) {
      const asmtGrade = gradeItem['Asmt Grade'];
      const asmtWeight = gradeItem['Asmt Weight'];
      if (doesExist(asmtGrade) && doesExist(asmtWeight)) {
        weightedGrade += asmtGrade * (asmtWeight / 100); // to get weight in Decimal devided by 100
      }
    }
  }
  const potentionalGrade = weightedGrade + remainingWeight;

  return potentionalGrade;
};

const getAverage = (list) => (list.reduce((prev, curr) => prev + curr, 0) / list.length).toFixed(2);

const getCourseLetters = (gpaScale) => {
  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D'];
  const lettersGradeArr = {};

  grades.forEach((grade) => {
    const letterValue = gpaScale && gpaScale[grade] ? gpaScale[grade] : '';
    lettersGradeArr[grade] = letterValue;
  });

  return lettersGradeArr;
};

export {
  defineCourseTextColor,
  calculateWeightedGrade,
  getTotalWeight,
  getItemsDueInNextNDays,
  getSumWeight,
  getAverage,
  getCourseLetters,
  getRemainingWeight,
  calculatePotentialGrade,
};
