import { ref, update, remove, db, get } from './firebase.js';

const getDataFromDB = async (dataRef) => {
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error('Error while getting data from the database:', error);
  }
};

const updateCourseInDB = async (editRef, courseObj) => {
  try {
    const updates = { [editRef]: courseObj };
    await update(ref(db), updates);
    console.log('Course updated');
    window.location.reload();
  } catch (error) {
    console.error('Error while updating course:', error);
  }
};

const removeItemFromDB = async (editRef) => {
  try {
    await remove(editRef);
    console.log('Item deleted');
    window.location.reload();
  } catch (error) {
    console.error('Error while deleting item:', error);
  }
};

export { getDataFromDB, updateCourseInDB, removeItemFromDB };
