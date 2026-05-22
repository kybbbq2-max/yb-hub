const LIFE_PASSWORD = "1234";
const WORK_PASSWORD = "5678";

function showScreen(id){
  document.querySelectorAll('.screen').forEach(screen=>{
    screen.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

/* LOGIN */
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
    renderTasks();
    updateKPI();
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
    "무리하지 말고 쉬어가기 ☕",
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

/* WORK TASK DB */
function getTasks(){
  return JSON.parse(localStorage.getItem('yb_tasks') || '[]');
}

function saveTask(){
  const title = document.getElementById('taskTitle').value;
  const type = document.getElementById('taskType').value;
  const owner = document.getElementById('taskOwner').value;
  const memo = document.getElementById('taskMemo').value;

  if(!title) return;

  const tasks = getTasks();

  tasks.push({
    title,
    type,
    owner,
    memo,
    createdAt:new Date().toLocaleString()
  });

  localStorage.setItem('yb_tasks', JSON.stringify(tasks));

  document.getElementById('taskTitle').value = '';
  document.getElementById('taskOwner').value = '';
  document.getElementById('taskMemo').value = '';

  renderTasks();
  updateKPI();
}

function renderTasks(){
  const list = document.getElementById('taskList');
  const keyword = document.getElementById('searchInput').value.toLowerCase();

  list.innerHTML = '';

  getTasks()
    .filter(task =>
      task.title.toLowerCase().includes(keyword) ||
      task.type.toLowerCase().includes(keyword) ||
      task.owner.toLowerCase().includes(keyword) ||
      task.memo.toLowerCase().includes(keyword)
    )
    .reverse()
    .forEach((task,index)=>{
      const div = document.createElement('div');

      div.innerHTML = `
        <strong>${task.type}</strong> | ${task.title}<br>
        담당: ${task.owner || '-'}<br>
        메모: ${task.memo || '-'}<br>
        <small>${task.createdAt}</small><br><br>
        <button onclick="deleteTask(${index})">삭제</button>
      `;

      list.appendChild(div);
    });
}

function deleteTask(index){
  const tasks = getTasks();
  tasks.splice(tasks.length - 1 - index,1);
  localStorage.setItem('yb_tasks', JSON.stringify(tasks));
  renderTasks();
  updateKPI();
}

function updateKPI(){
  const tasks = getTasks();

  const ship = tasks.filter(t=>t.type==="출하").length;
  const returns = tasks.filter(t=>t.type==="반품").length;
  const inspect = tasks.filter(t=>t.type==="공장점검").length;

  document.getElementById('shipCount').innerText = ship;
  document.getElementById('returnCount').innerText = returns;
  document.getElementById('inspectCount').innerText = inspect;
}
