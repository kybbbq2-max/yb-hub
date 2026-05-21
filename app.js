function show(id){
document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

function alarmTest(){
alert("📱 공장점검 5분 전입니다.");
}