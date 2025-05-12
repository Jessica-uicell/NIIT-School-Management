# School Management App - Product Requirements Document (PRD)

## **Date:**  
May 2, 2025  

---

## **1. Objective**  
The School Management App is a web-based platform designed to streamline student registration, course management, and attendance tracking for educational institutions. The app will include an admin dashboard for managing data and provide optional features to enhance functionality.

---

## **2. Target Audience**  
- Educational institutions (schools, colleges, training centers)  
- Administrators managing student and course data  
- Students accessing course and attendance information

---

## **3. Tech Stack**  
- **Frontend:** HTML, CSS, JavaScript
- **Backend/Database:** Supabase (open-source Firebase alternative)  
- **Deployment:** Vercel (1-click deploy)  

---

## **4. Features**  

### **4.1 Required Features (Minimum)**  

1. **Student Registration**  
   - Fields: Name, Email, Program, Course, Phone  
   - Ability to add, view, and edit student details  

2. **Course Management**  
   - Add and view available courses  
   - Assign students to specific courses  

3. **Attendance Tracking**  
   - Daily student check-in (manual entry for now)  
   - View attendance records for students  

4. **Admin Dashboard**  
   - Basic view to manage students, courses, and attendance  

---

### **4.2 Bonus Features (Optional)**  

1. **Quiz Upload/Download Area**  
   - Admins can upload quizzes for students to download  
   - Students can upload completed quizzes  

2. **Google Login Integration**  
   - Allow users to log in using their Google accounts  

3. **Email Notification on Attendance**  
   - Notify students via email when their attendance is marked  

---

## **5. User Stories**  

### **5.1 Admin User Stories**  
- As an admin, I want to register students with their details so that I can manage their data  
- As an admin, I want to add and view courses so that I can assign students to them  
- As an admin, I want to manually mark attendance for students so that I can track their participation  
- As an admin, I want a dashboard to view and manage all data in one place  

### **5.2 Student User Stories**  
- As a student, I want to view my assigned courses so that I know what I am enrolled in  
- As a student, I want to check my attendance records so that I can track my participation  

---

## **6. Functional Requirements**  

### **6.1 Frontend**  
- Responsive UI for student registration, course management, and attendance tracking  
- Admin dashboard with basic data visualization  

### **6.2 Backend**  
- Supabase for managing user authentication, database, and API endpoints  
- Real-time updates for attendance and course assignments  

### **6.3 Deployment**  
- Deploy the app on Vercel for easy access and scalability  

---

## **7. Non-Functional Requirements**  
- **Scalability:** The app should handle a growing number of students and courses  
- **Performance:** Ensure fast load times and smooth interactions  
- **Security:** Protect user data with secure authentication and database practices  

---

## **8. Milestones & Timeline**  

1. **Week 1:**  
   - Set up the project structure and tech stack  
   - Implement student registration  

2. **Week 2:**  
   - Develop course management features  
   - Create the admin dashboard  

3. **Week 3:**  
   - Add attendance tracking functionality  
   - Test and debug core features  

4. **Week 4:**  
   - Implement bonus features (if time permits)  
   - Deploy the app on Vercel  

---

## **9. Success Metrics**  
- Successful registration of students and courses
- Accurate attendance tracking
- Positive feedback from users on usability and performance