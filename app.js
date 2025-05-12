// Supabase configuration
const SUPABASE_URL = 'https://bccvxcotrphlbhaywxiz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjY3Z4Y290cnBobGJoYXl3eGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDUxNDEsImV4cCI6MjA2MjYyMTE0MX0.b4ulDb6IS60s-0I3-44tAZArm2oqJhcZGjFqilTAwzw';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// DOM Elements
const studentForm = document.getElementById('studentForm');
const courseForm = document.getElementById('courseForm');
const studentsTableBody = document.getElementById('studentsTableBody');
const coursesTableBody = document.getElementById('coursesTableBody');
const courseSelect = document.getElementById('courseSelect');
const attendanceTableBody = document.getElementById('attendanceTableBody');

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    if (sectionId === 'dashboard') {
        updateDashboardStats();
    }
}

// Student Management
studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const student = {
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        program: document.getElementById('studentProgram').value,
        course: document.getElementById('studentCourse').value,
        phone: document.getElementById('studentPhone').value
    };

    try {
        const { data, error } = await supabase
            .from('students')
            .insert([student]);
        
        if (error) throw error;
        
        loadStudents();
        studentForm.reset();
        alert('Student registered successfully!');
    } catch (error) {
        alert('Error registering student: ' + error.message);
    }
});

async function loadStudents() {
    try {
        const { data: students, error } = await supabase
            .from('students')
            .select('*');
        
        if (error) throw error;
        
        studentsTableBody.innerHTML = students.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.program}</td>
                <td>${student.course}</td>
                <td>${student.phone}</td>
                <td>
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        alert('Error loading students: ' + error.message);
    }
}

// Course Management
courseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const course = {
        name: document.getElementById('courseName').value,
        code: document.getElementById('courseCode').value
    };

    try {
        const { data, error } = await supabase
            .from('courses')
            .insert([course]);
        
        if (error) throw error;
        
        loadCourses();
        courseForm.reset();
        alert('Course added successfully!');
    } catch (error) {
        alert('Error adding course: ' + error.message);
    }
});

async function loadCourses() {
    try {
        const { data: courses, error } = await supabase
            .from('courses')
            .select('*');
        
        if (error) throw error;
        
        coursesTableBody.innerHTML = courses.map(course => `
            <tr>
                <td>${Economics}</td>
                <td>${ECON212}</td>
                <td>
                    <button onclick="editCourse(${course.id})">Edit</button>
                    <button onclick="deleteCourse(${course.id})">Delete</button>
                </td>
            </tr>
        `).join('');

        // Update course select in attendance section
        courseSelect.innerHTML = `
            <option value="">Select Course</option>
            ${courses.map(course => `
                <option value="${course.id}">${course.name}</option>
            `).join('')}
        `;
    } catch (error) {
        alert('Error loading courses: ' + error.message);
    }
}

// Attendance Management
async function loadAttendanceList() {
    const courseId = courseSelect.value;
    if (!courseId) return;

    try {
        const { data: students, error } = await supabase
            .from('students')
            .select('*')
            .eq('course_id', courseId);
        
        if (error) throw error;
        
        attendanceTableBody.innerHTML = students.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>
                    <input type="checkbox" name="attendance_${student.id}">
                </td>
            </tr>
        `).join('');
    } catch (error) {
        alert('Error loading attendance list: ' + error.message);
    }
}

async function saveAttendance() {
    const courseId = courseSelect.value;
    const date = document.getElementById('attendanceDate').value;
    if (!courseId || !date) {
        alert('Please select a course and date');
        return;
    }

    const attendanceRecords = [];
    document.querySelectorAll('[name^="attendance_"]').forEach(checkbox => {
        const studentId = checkbox.name.split('_')[1];
        attendanceRecords.push({
            student_id: studentId,
            course_id: courseId,
            date: date,
            present: checkbox.checked
        });
    });

    try {
        const { data, error } = await supabase
            .from('attendance')
            .insert(attendanceRecords);
        
        if (error) throw error;
        
        alert('Attendance saved successfully!');
        updateDashboardStats();
    } catch (error) {
        alert('Error saving attendance: ' + error.message);
    }
}

// Dashboard
async function updateDashboardStats() {
    try {
        // Get total students
        const { data: students, error: studentsError } = await supabase
            .from('students')
            .select('count', { count: 'exact' });
        
        if (studentsError) throw studentsError;
        document.getElementById('totalStudents').textContent = students[0].count;

        // Get total courses
        const { data: courses, error: coursesError } = await supabase
            .from('courses')
            .select('count', { count: 'exact' });
        
        if (coursesError) throw coursesError;
        document.getElementById('totalCourses').textContent = courses[0].count;

        // Get today's attendance percentage
        const today = new Date().toISOString().split('T')[0];
        const { data: attendance, error: attendanceError } = await supabase
            .from('attendance')
            .select('present')
            .eq('date', today);
        
        if (attendanceError) throw attendanceError;
        
        const presentCount = attendance.filter(a => a.present).length;
        const totalCount = attendance.length;
        const attendancePercentage = totalCount ? Math.round((presentCount / totalCount) * 100) : 0;
        document.getElementById('todayAttendance').textContent = `${attendancePercentage}%`;
    } catch (error) {
        alert('Error updating dashboard: ' + error.message);
    }
}

// Initial loads
loadStudents();
loadCourses();
updateDashboardStats();

// Event listeners
courseSelect.addEventListener('change', loadAttendanceList);