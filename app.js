const LIFE_PASSWORD = "1234";
const WORK_PASSWORD = "5678";

const drivers = [
  { name: "김OO", status: "운행중" },
  { name: "박OO", status: "대기" },
  { name: "이OO", status: "휴무" }
];

function showScreen(id){
document.querySelectorAll('.screen').forEach(screen=>{
screen.classList.remove('active');
});
document.getElementById(id).classList.add('active');
}

function loginLife(){
const pw = document.getElementById('lifePw').value;
if(pw === LIFE_PASSWORD){
showScreen('lifeMain');
loadDiary();
loadCalendar();
generateFortune();
} else {
alert("LIFE 비밀번호 틀림");
}
}

function loginWork(){
const pw = document.getElementById('workPw').value;
if(pw === WORK_PASSWORD){
showScreen('workMain');
renderDrivers();
loadSap();
loadSupport();
} else {
alert("WORK 비밀번호 틀림");
}
}

function saveDiary(){
const text = document.getElementById('diaryText').value;
localStorage.setItem('yb_diary', text);
alert("일기 저장 완료");
}

function loadDiary(){
const saved = localStorage.getItem('yb_diary');
if(saved){
document.getElementById('diaryText').value = saved;
}
}

function addCalendar(){
const text = document.getElementById('calendarText').value;
if(!text) return;

let items = JSON.parse(localStorage.getItem('yb_calendar') || '[]');
items.push(text);
localStorage.setItem('yb_calendar', JSON.stringify(items));

document.getElementById('calendarText').value = '';
loadCalendar();
}

function loadCalendar(){
const list = document.getElementById('calendarList');
list.innerHTML = '';

let items = JSON.parse(localStorage.getItem('yb_calendar') || '[]');

items.forEach((item,index)=>{
const li = document.createElement('li');
li.innerHTML = `
${item}
<button onclick="deleteCalendar(${index})">삭제</button>
`;
list.appendChild(li);
});
}

function deleteCalendar(index){
let items = JSON.parse(localStorage.getItem('yb_calendar') || '[]');
items.splice(index,1);
localStorage.setItem('yb_calendar', JSON.stringify(items));
loadCalendar();
}

function renderDrivers(){
const list = document.getElementById('driverList');
list.innerHTML = '';

drivers.forEach(driver=>{
const div = document.createElement('div');
div.innerText = `${driver.name} | ${driver.status}`;
list.appendChild(div);
});
}

function searchDrivers(){
const keyword = document.getElementById('driverSearch').value.toLowerCase();
const list = document.getElementById('driverList');
list.innerHTML = '';

drivers
.filter(driver=>driver.name.toLowerCase().includes(keyword))
.forEach(driver=>{
const div = document.createElement('div');
div.innerText = `${driver.name} | ${driver.status}`;
list.appendChild(div);
});
}

function saveSap(){
const text = document.getElementById('sapMemo').value;
localStorage.setItem('yb_sap', text);
alert("SAP 저장 완료");
}

function loadSap(){
const saved = localStorage.getItem('yb_sap');
if(saved){
document.getElementById('sapMemo').value = saved;
}
}

function saveSupport(){
const text = document.getElementById('supportMemo').value;
localStorage.setItem('yb_support', text);
alert("차량지원 저장 완료");
}

function loadSupport(){
const saved = localStorage.getItem('yb_support');
if(saved){
document.getElementById('supportMemo').value = saved;
}
}

function requestNotification(){
if(Notification.permission !== "granted"){
Notification.requestPermission();
}
}

function testAlarm(){
if(Notification.permission === "granted"){
new Notification("YB HUB", {
body: "공장점검 5분 전입니다."
});
} else {
alert("알림 권한 먼저 허용");
}
}

function generateFortune(){
const fortunes = [
"오늘 집중력 최고 🔥",
"작은 행운이 들어옵니다 🍀",
"컨디션 관리가 중요해요 ☕",
"회피보다 실행이 답 👀"
];

const random = fortunes[Math.floor(Math.random()*fortunes.length)];
const avoidance = Math.floor(Math.random()*100);

document.getElementById('fortuneText').innerText = random;
document.getElementById('avoidanceText').innerText = `회피지수 ${avoidance}%`;
}

function setMood(mood){
document.getElementById('moodResult').innerText = `${mood} 기록됨`;
}
