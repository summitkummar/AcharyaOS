// डेटा लोड करने का फंक्शन
function loadData() {
    let classes = localStorage.getItem('classesCount') || 0;
    let students = localStorage.getItem('studentsCount') || 0;
    let diary = localStorage.getItem('diaryCount') || 0;

    // नोट: नीचे दिए गए ID (जैसे 'classes-count') आपकी HTML फाइल में होने चाहिए।
    // अगर अलग हैं तो उन्हें बदल लें।
    if(document.getElementById('classes-count')) document.getElementById('classes-count').innerText = classes;
    if(document.getElementById('students-count')) document.getElementById('students-count').innerText = students;
    if(document.getElementById('diary-count')) document.getElementById('diary-count').innerText = diary;
}

// नया क्लास जोड़ने का फंक्शन
function addClass() {
    let classes = parseInt(localStorage.getItem('classesCount') || 0);
    classes++;
    localStorage.setItem('classesCount', classes);
    loadData();
    alert("नया क्लास जोड़ दिया गया है!");
}

// नया स्टूडेंट जोड़ने का फंक्शन
function addStudent() {
    let students = parseInt(localStorage.getItem('studentsCount') || 0);
    students++;
    localStorage.setItem('studentsCount', students);
    loadData();
    alert("नया स्टूडेंट जोड़ दिया गया है!");
}

// पेज लोड होते ही डेटा दिखाएं
document.addEventListener('DOMContentLoaded', loadData);
