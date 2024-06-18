
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

function showPopup1() {
    document.getElementById('popup1').style.display = 'block';
}

function showPopup2() {
    document.getElementById('popup2').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function closePopup1() {
    document.getElementById('popup1').style.display = 'none';
}

function closePopup2() {
    document.getElementById('popup2').style.display = 'none';
}

function showInfo1() {
    // info1 요소 보이기
    document.getElementById('info1').style.display = 'block';
    // 나머지 info 요소 숨기기
    document.getElementById('info2').style.display = 'none';
    document.getElementById('info3').style.display = 'none';
    document.getElementById('info4').style.display = 'none';
}

function showInfo2() {
    // info2 요소 보이기
    document.getElementById('info2').style.display = 'block';
    // 나머지 info 요소 숨기기
    document.getElementById('info1').style.display = 'none';
    document.getElementById('info3').style.display = 'none';
    document.getElementById('info4').style.display = 'none';
}

function showInfo3() {
    // info3 요소 보이기
    document.getElementById('info3').style.display = 'block';
    // 나머지 info 요소 숨기기
    document.getElementById('info1').style.display = 'none';
    document.getElementById('info2').style.display = 'none';
    document.getElementById('info4').style.display = 'none';
}

function showInfo4() {
    // info4 요소 보이기
    document.getElementById('info4').style.display = 'block';
    // 나머지 info 요소 숨기기
    document.getElementById('info1').style.display = 'none';
    document.getElementById('info2').style.display = 'none';
    document.getElementById('info3').style.display = 'none';
}