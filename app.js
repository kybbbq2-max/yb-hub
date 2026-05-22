const LIFE_PASSWORD = "1234";
const WORK_PASSWORD = "5678";

const drivers = [
  { name: "김OO", status: "운행중" },
  { name: "박OO", status: "대기" },
  { name: "이OO", status: "휴무" },
  { name: "최OO", status: "점검중" }
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
  }else{
    alert("LIFE 비밀번호 틀림");
  }
}

function loginWork(){
  const pw = document.getElementById('workPw').value;

  if(pw === WORK_PASSWORD){
    showScreen('workMain');
    renderDrivers();
    loadSap();
  }else{
    alert("WORK 비밀번호 틀림");
  }
}

/* LIFE */
function saveDiary(){
  const diary = document.getElementById('diaryText').value;
  localStorage.setItem('yb_diary', diary);
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

function generateFortune(){
  const fortunes = [
    "오늘 집중력 최고 🔥",
    "좋은 소식이 들어옵니다 🍀",
    "무리하지 말고 컨디션 관리 ☕",
    "결정 미루지 말기 👀"
  ];

  const random = fortunes[Math.floor(Math.random()*fortunes.length)];
  const avoidance = Math.floor(Math.random()*100);

  document.getElementById('fortuneText').innerText = random;
  document.getElementById('avoidanceText').innerText = `회피지수 ${avoidance}%`;
}

function setMood(mood){
  document.getElementById('moodResult').innerText = `${mood} 기록됨`;
}

/* WORK */
function renderDrivers(){
  const list = document.getElementById('driverList');
  list.innerHTML = '';

  drivers.forEach(driver=>{
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${driver.name}</strong><br>
      <small>${driver.status}</small>
    `;
    list.appendChild(div);
  });
}

function searchDrivers(){
  const keyword = document.getElementById('driverSearch').value.toLowerCase();
  const list = document.getElementById('driverList');

  list.innerHTML = '';

  drivers
    .filter(driver => driver.name.toLowerCase().includes(keyword))
    .forEach(driver=>{
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${driver.name}</strong><br>
        <small>${driver.status}</small>
      `;
      list.appendChild(div);
    });
}

function saveSap(){
  const memo = document.getElementById('sapMemo').value;
  localStorage.setItem('yb_sap', memo);
  alert("SAP 메모 저장 완료");
}

function loadSap(){
  const saved = localStorage.getItem('yb_sap');
  if(saved){
    document.getElementById('sapMemo').value = saved;
  }
}
