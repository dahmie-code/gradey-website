## Project Name: Gradey – Grade Tracker Website
### Team members: Archana Patil, Natalia Zhelonkina, Damilola Ogungbenro, Jiji Raghavan, Anna Prysiazhniuk


# 1. Introduction
## Project Overview, Purpose, and Objectives:
Gradey – Grade Tracker Website is a comprehensive tool tailored to assist students in efficiently managing their academic progress. **The primary goal** of this project is to provide a user-friendly platform for tracking grades, organizing courses, and managing assignments. Gradey offers a range of functionalities designed to streamline the process of monitoring academic performance.

**The purpose** of Gradey is to empower students with a centralized system to keep tabs on their grades across various courses. Its main features include the ability to add and edit courses, manage assignments, calculate GPA, set grade goals, and receive reminders for upcoming assignments. By providing a clear and intuitive interface, Gradey aims to enhance students' organizational skills and promote academic success.

**Getting started:**

• To use Gradey, simply sign up with your email address and create a password.

• Once logged in, you will be taken to the screen where you can view your current grades and courses.

**Adding a course:**

• To add a new course, click on the “Add Course” button on the dashboard.

• Enter the course code, course name, target grade, color and optionally select and add GPA scale.

**Managing a course:**

• Click on “edit” button to edit the course information.

• Click on “delete” button delete course.

**Adding assessnments/course items and grades:**

• To add an assignment to a course, click on the course card and this navigates to all grades for the course screen.

• Click on the “Add Item” button and enter the title of the assessment, category, weight of item, due date, and optionally grade of item.

• Once the assessment is added, you can edit and enter the grade you received.

**Viewing your grades:**

• To view your grades, simply click on the course from the courses page.

• Here you will see a breakdown of your assessments and the grades you received for each one in a table format. These can be managed using the “Edit” and “Delete” buttons.

• You can also see your current grade for the course, letter grade if GPA scale was selected and potential grade of the course.

**Other features:**

• GPA is calculated and displayed on the top left of the courses page.

• Gradey allows you to set grade goals for each course and will show you the grade you need to achieve your goal.

• You can view upcoming assessments and due dates from the “Upcoming Assessments button.

• View your progress on course completion through the progress bar on each course card.

• You also have the option of customizing and selecting a color to represent a course.

• If you need to sort Grade items, simply click on the heading you want to sort with.

• You can also search for a particular course or Grade Item using the search feature on the Courses or Grade Item pages.

### Objectives:
i. Streamlined Grade Tracking: Gradey strives to simplify the process of tracking grades by offering an intuitive interface for adding, editing, and deleting courses and assignments.
Comprehensive Course Management: The platform enables users to efficiently manage courses by providing options to edit course information, set grade goals, and customize course colors.

ii. Efficient Assignment Management: Gradey facilitates the addition and editing of assignments, including essential details like title, category, weight, and due date, along with an optional grade entry.

iii. Accurate GPA Calculation: The system automatically computes and displays the Grade Point Average (GPA) for each course, providing students with a clear understanding of their overall performance.

iv. Grade Goal Setting: Gradey empowers students to set specific grade targets for each course, offering a visual representation of the required performance to achieve their goals.

v. Progress Tracking: Gradey offers a progress bar for each course, allowing users to monitor their progress towards course completion.

vi. User-Friendly Interface: The platform is designed with user experience in mind, ensuring easy navigation and accessibility for students of all levels.

### Achievement of Objectives:
Gradey has successfully achieved its objectives. It provides a seamless experience for students to manage their grades, courses, and assignments. The intuitive interface and range of features contribute to effective organization and improved academic performance.

### Target Audience:
1. **End-Users (Students):** Gradey is primarily designed for students of all levels, from high school to university, who wish to maintain a structured approach to monitoring their grades and assignments.

2. **Educators and Administrators:** While the primary focus is on students, Gradey may also be used by educators and administrators to gain insights into students' performance and provide tailored support.

Overall, Gradey caters to individuals directly involved in the academic process, ensuring they have access to a reliable platform for effective grade management.

# 2. Setup Instructions

The main development branch is `MAIN_DEV`

### System Requirements:
1. **Processor:** Any modern multi-core processor.
2. **Memory (RAM):** At least 4GB of RAM.
3. **Free Disk Space:** At least 20GB of free disk space.
4. **Operating System:** Compatible with Windows, macOS, and Linux.
5. **Web Browser:** Modern web browser (e.g., Chrome, Firefox, Safari, etc.)
6. **Firebase:** [WIT Gradey Firebase](https://console.firebase.google.com/u/1/project/wit-gradey-web/overview); **API Key** provided in the file `src/firebase.js`
7. **Node.js:** Version 14.x or later
8. **npm:** Version 7.x or later
9. **Text Editor(IDE):** A code editor such as Visual Studio Code

### Steps to Install, Configure, and Run the Project:
1. Clone the project from Bitbucket and 
Run the command: 

`git clone git@bitbucket.org:nageebdamani/gradey-website.git`

2. Open the gradey-website folder: 

`cd gradey-website`

3. Switch to MAIN_DEV branch:

`git checkout MAIN_DEV`

4. Install project dependencies using npm, run the command:

`npm install`

5. Run the project using the defined scripts in package.json, run the command:

`npm run gulp`

# 3. Project Structure
## Directory Layout:
* `/src` - This is the core directory containing all the source code for the Gradey website.
    * `/components` - This directory holds all the reusable JavaScript components used in the project. Each component serves a specific purpose in the website's UI([See Components Directory for the Details](#markdown-header-components-directory)).
        * `/burger-menu` - This directory contains the script and style files for the burger menu component.
        * `/buttons` - This directory contains the script and style files for buttons used throughout the website.
        * `/course-card` - This directory contains the script and style files for the course card component.
        * `/footer` - This directory contains the script and style files for the footer component.
        * `/header` - This directory contains the script and style files for the header component.
        * `/menu-overlay` - This directory contains the script and style files for the menu overlay component.
        * `/modal` -  This directory contains the script and style files for modal components, including modal-form styles.
        * `/search` -  This directory contains the script and style files for the search component.
        * `/sidebar` -  This directory contains the script and style files for the sidebar component.
        * `/subheader` -  This directory contains the script and style files for the subheader component.
    * `/img` - This directory contains image files and an svg sub-directory for scalable vector graphics.
        * `/svg` - This directory contains SVG images used in the project.
    * `/scripts` - This directory contains additional JavaScript files that are not components but are related to the project’s functionality and serve specific functions in the project([See Scripts Directory for the Details](#markdown-header-scripts-directory)).
    * `/styles` - Contains global styles.
        * `/404_errorpage` - Styles specific to the 404 error page
        * `/base` - Base styles that are applied globally.
        * `/contact-page` - Styles specific to the contact page.
        * `/courses` - Styles specific to the courses section.
        * `/grade` - Styles specific to the grading functionality.
        * `/landing` - Styles specific to the landing page.
        * `/user-auth` - Styles specific to user authentication (Sign-up & login) pages.
    * `404.html` - HTML file for the 404 error page.
    * `contact.html` - HTML file for the contact page.
    * `course.html` - HTML file for displaying individual courses.
    * `gradeItemsList.html` - HTML file for displaying a list of grade items.
    * `index.html` - Main HTML file for the website's landing page.
    * `login.html` - HTML file for the login page.
    * `password-recovery.html` -  HTML file for the password recovery page.
    * `register.html` - HTML file for the registration page.
* `/node_modules` - This directory houses all the project dependencies. These are external libraries and packages that are used to build and run the project.
* `/dist` - This directory contains the distribution or deployment-ready files. These are typically minified and optimized versions of the source code, suitable for deployment on a web server.
* `.eslintrc.json` - Configuration file for ESLint, a tool for identifying and fixing problems in JavaScript code. 
* `.gitignore` - File specifying which files should be ignored by version control (Git).
* `gulp.config.js` - Configuration file for Gulp, a task runner used for automating development workflows.
* `gulpfile.js` - Contains the actual Gulp tasks used to build, optimize, and deploy the project.
* `package.json` - Contains metadata about the project, including dependencies and scripts.

The project follows a consistent set of naming conventions and organizational standards to maintain clarity, consistency, and readability. Here are the key conventions and standards being followed:

1. **Directory Structure:** The project follows a modular structure, with directories organized by functionality or component type. This promotes separation of concerns and reusability.
Components are grouped under the /components directory, making it clear where to find and manage UI elements.

2. **Component Naming:** Component directories under /components are named after the specific functionality they represent, such as burger-menu, buttons, course-card, etc. This makes it easy to identify and locate components based on their purpose.
Within component directories, there are script and style files named similarly, maintaining consistency.

3. **Global Styles:** Global styles, such as those in the /styles/base directory, are applied universally across the website. This follows the convention of separating global styles from component-specific styles.

4. **HTML Files:** HTML files are named after the primary purpose or content they represent, such as index.html for the landing page, login.html for the login page, and so on. This makes it intuitive to identify the purpose of each HTML file.

5. **Configuration Files:** Configuration files like .eslintrc.json, .gitignore, gulp.config.js, and package.json have clear and conventional names, making it evident that they are configuration or setup files for tools and dependencies.

6. **Dependency Management:** Dependencies are managed using Node.js and npm, as evidenced by the presence of the /node_modules directory and package.json. This is a common standard for JavaScript projects.

7. **Build Output:** The /dist directory contains the output of the build process, possibly with minified and optimized code ready for deployment. This follows the convention of separating source code from the production-ready code.

## Component and Module Descriptions:
#### Components Directory:

*BurgerMenu (burger-menu.js):* This module exports the default BurgerMenu component. It contains the functionality and styling for a burger menu, commonly used for mobile navigation.

*Button (button.js):* This module exports the default Button component. It contains the functionality and styling for buttons used throughout the website.

*Course (course-card.js):* This module exports the default Course component. It contains the functionality and styling for displaying individual course cards.

*Footer (footer.js):* This module exports the default Footer component. It contains the functionality and styling for the website's footer section.

*Header (header.js):* This module exports the default Header component. It contains the functionality and styling for the website's header section.

*MenuOverlay (menu-overlay.js):* This module exports the default MenuOverlay component. It contains the functionality and styling for an overlay menu.

*Modal (modal.js):* This module exports the default Modal component. It contains the functionality and styling for modal dialogs used in the project.

*Search (search.js):* This module exports the default Search component. It contains the functionality and styling for the search functionality on the website.

*Sidebar (sidebar.js):* This module exports the default Sidebar component. It contains the functionality and styling for a sidebar menu.

*SubHeader (subheader.js):* This module exports the default SubHeader component. It contains the functionality and styling for a subheader section.


#### Scripts Directory:

**addActiveLink.js:** This module is responsible for adding an "active" class to the currently selected navigation link. Uses for the Menu nav on the Landing Page.

**confirm.js:** This module is responsible for creating a confirmation Modal window and handling action Buttons such as Confirm or Cancel, etc. 
*Inter-module Dependencies:* Numerous functions within the application rely on this module to display various confirmation windows, e.g. `course.js` and `gradeItems.js` used for creating a confirmation modal window for deleting items.

**auth.js:** This module handles authentication-related functionality, including sign-in with email and password.
**register.js:** This module handles user registration functionality, including creating new user accounts.
*Dependencies:* They both use `Firebase` authentication methods - Firebase Authentication SDK, and also uses `showHidePassword` function and `showSpinner` and `hideSpinner` functions from showHidePassword.js and loaderPage.js respectively.
*Inter-module Dependencies:*
The main application modules `course.js` and `gradeItems.js` (Courses/Grade Items Pages) depend on this module to ensure that only authenticated users can access certain functionalities.

**databaseHelpersFunctions.js:** This module provides helper functions for interacting with the database, including updating, removing, and retrieving data.
*Dependencies:*
It depends on Firebase's database methods - `ref, update, remove, db, get` from firebase.js.
*Inter-module Dependencies:* Various modules across the application depend on this module to store and retrieve data(e.g. `course.js` and `gradeItems.js` that manage all the functionality and interaction on the Course page and Grade Items page).


**firebase.js:** This module initializes and configures the Firebase SDK. It also imports specific functionalities from Firebase modules.
It depends on Firebase SDK modules for authentication, database, and app initialization.
*Dependencies:* modules from
`firebase-database`,
`firebase-auth`, and 
`firebase-app`.
*Inter-module Dependencies:* Essential for various modules to store, retrieve and deleting data (e.g., `course.js`, `gradeItems.js`).  Also this module uses for handles authentication, registration related functionality (e.g., `auth.js`, `register.js`)

**index.js:** This module is responsible for handling functionality related to the contact page, including sending emails.
*Dependencies:* It depends on the Email class from `smtp.js`.

**password-recovery.js:** This module manages functionality related to password recovery, including sending reset emails.
It depends on Firebase authentication methods.
*Dependencies:*
`auth, sendPasswordResetEmail` from Firebase.

**courseHelperFunctions.js:** This module provides functions for the management of modal buttons and the creation of a modal window, which is utilized for creating/editing course items.
*Inter-module Dependencies:* The `course.js` module is relying on these helper functions.

**calculationFunctions.js:** This module provides various calculation functions related to grading, such as calculating weighted grades, and averages, getting a number of items due in the next 5 days, getting a sum of weights for all grades, getting the remaining weight, calculating potential grades, getting course's letters for the calculating GPA Scale, etc.
*Dependencies:* It also depends on a helper function `getAccentColorFor` from helperFunctions.js that uses for the defining the course text color.
*Inter-module Dependencies:* The `course.js` and `gradeItems.js` modules are relying on these helper calculation functions.


**gradeItemHelperFunc.js:** This module provides functions for the management of modal buttons and the creation of a modal window, which is utilized for creating/editing the Grade items. Contain the function foor creating the Edit/Delete Buttons uses in table on the Grade items Page. Also contains sorted letters function.
*Inter-module Dependencies::* The `gradeItems.js` module is relying on these helper functions.
Some functions such as `sortedLettersGradeArray` are used in `course.js` to Calculate GPA for All Courses and in `gradeItems.js` to show a letter grade for a specific Course.

**course.js:** This module handles functionality related to individual courses, including creating/editing/deleting the Course Items, modal creation, confirmation, and database interactions.
*Dependencies:* It relies on functions from various other modules including `calculationFunctions.js`, `courseHelperFunctions.js`,`databaseHelpersFunctions.js`, `firebase.js`, `confirm.js`, `gradeItemHelperFunc.js`, and `loaderPage.js`.


**gradeItems.js:** This module handles functionality related to grade items, including modal creation, confirmation, and database interactions.
*Dependencies:* It relies on functions from various other modules listed in Dependencies.
`confirm.js`,
`gradeItemHelperFunc.js`,
`firebase.js`,
`loaderPage.js`,
`databaseHelpersFunctions.js`,
`calculationFunctions.js`.

**upcomingAsmt.js:** This module deals with upcoming assessments. It imports functionalities from Firebase for database interactions.

**loaderPage.js:** Uses for showing/hiding spinner during page loading.


# 4. Future Development Ideas
This document outlines potential future features and improvements to enhance the "Gradey" application. These ideas aim to improve user experience, add functionality, and address potential areas of enhancement. These ideas have been gathered from various sources, including peer input and the development team's own observations. 

### Feature 1: Grade Analytics Dashboard.
Include visual analytics dashboard that provides insights into my academic performance over time, including trends, subject-wise comparisons, and upcoming assessments.

**Value:** This feature would empower students to identify patterns in their performance, enabling better study strategies and focus on weaker areas. The analytics dashboard could show performance trends, helping the student allocate more time to subjects where improvement is needed.

**Implementation** involves aggregating and visualizing data, possibly using charting libraries. Integration with the existing database to extract and process historical grade data is essential. 

**Potential challenges** include ensuring data accuracy and real-time updates. 

### Feature 2: Import and Export Functionality
This feature provides students the ability to import and export grade data to and from external files (e.g., CSV, Excel) to facilitate easy data transfer and backup. If a student receives grades via email in a CSV format, with the import feature, the student can easily bring these grades into the app without manual entry.

**Value:** This feature streamlines the data management process, allowing users to import grades from external sources or export them for offline analysis or backup.

**Implementation** involves creating import and export modules that support common file formats. Integration with the existing database schema is crucial. 

**Potential challenges** include handling various file formats and ensuring data integrity during import.

### Feature 3: Notification System for Upcoming Assessments 
At present, students can view the upcoming assessment. As a future enhancement, receiving notifications for upcoming assessments, deadlines, or grade releases, help the student stay organized and plan his study schedule effectively. The notification system would alert the student a few days before the deadline, ensuring ample preparation time.

**Value:** This feature enhances user engagement by providing timely reminders, reducing the risk of missed deadlines.

**Implementation** involves integrating a notification service into the app, possibly using push notifications. 

**Challenges** may include ensuring timely delivery across various devices.

### Feature 4: User Profile Customization
Customizing user profile by adding a profile picture, personal details, and preferences to enhance the personalization of user experience.

**Value:** Profile customization provides users with a sense of ownership and a personalized experience within the application.

**Implementation** involves expanding the user profile database schema to accommodate additional details. Front-end changes are necessary to allow users to edit and manage their profiles. 

**Challenges** may include ensuring a smooth and intuitive user interface for profile customization.

### Feature 5: Calendar Integration
The Calendar Integration feature enhances the Grade Tracking App by seamlessly integrating with calendar applications. This allows users to sync their academic schedule, assignment deadlines, and exam dates with their preferred (external)calendar tools (eg: Google calendar). Consider a scenario where a student has multiple assignments and exams across different courses. With Calendar Integration, the student can sync these events to their external calendar, allowing for timely reminders and better time management.

**Value:** This feature provides users with a centralized and visual representation of their academic schedule, helping them manage their time effectively and reducing the likelihood of missing deadlines.

**Implementation** includes API integrations with popular calendar services (Google Calendar, Apple Calendar) to enable seamless data transfer. 

**Potential challenges:** This feature requires a secure user authorization protocol to ensure that calendar data is accessed only by authorized users.

### Future development
- Reorganizing the file structure within the script folder to optimize it, with the aim of categorizing files into separate folders like modules, helpers, etc.

- Restructuring the `helperFunctions.js` file, specifically removing unused and commented code, and enhancing the `getAccentColorFor` function to generate a variety of colors, which improves accessibility. 

- Reveal Animations on the Landing Page when scrolling, e.g. wow.js animation

- Add Button/Icon 'Back to Top' on the Landing Page

# 5. Known Bugs and Issues

1. Delete accounts from Firebase Authentication that were created before the updated DB structure or add an alert of User can't log in anymore.

2. Landing page - update the container for large screens as content is flexible on the whole width now.

3. Update the Text color function generation on the Courses Item to improve readability.

**Steps to reproduce:**
- go to the Course page
- click the Button 'Add course', fill in all the fields, choose the Dark green or Dark blue course color
- click 'Save' Button

4. Add a Sticky Subheader for the Courses and Grade Items Pages.

5. Search on the Course page - different appearance of search results.

**Steps to reproduce:**
- log in to acc with at least 6-8 created Courses or Create the courses with the different titles and Course Code
- start typing the Course Title/Course Code in the Search field
- try a couple of times with different Search text
- see the result on the screen 

6. Search on the Course Page - add behavior for the "Not Found" case.

**Steps to reproduce:**
- log in to account with the existing Courses or Create at least one Course
- start typing the Course Title/Course Code in the Search field that isn't present on the page
- see the result on the screen - the result is a blank screen; expected result - message 'Not found' or something similar

7. Links in the Sidebar don't work, as most of the pages don't exist. For Upcoming Assessments, there is a Button on the Course Page on the Subheader.

8. Improve Accessibility such as:
- add/update the descriptive alt text for all images
- ensure Keyboard Accessibility and provide focus styles for interactive elements on the Landing Page
- enhance Color Contrast, especially for some course items (some colors have a low contrast)

# 6. Troubleshooting

1. Error in plugin "sass", Error: File to import not found or unreadable: ./base/font

Try to delete the line `@import './base/font';` from the file src/styles/main.scss and run the gulp, then add the `@import './base/font';`. 

2. Error: Cannot find module 'node-sass'

delete `node-sass` from package.json
run `npm install node-sass --save-dev`

3. Error: Cannot find module 'sass'

delete `sass` from package.json
run `npm install sass --save-dev`

