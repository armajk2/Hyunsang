// ==========================================
// [신규 통합] 1. 다국어 제어 코어 시스템 & 글로벌 서체 연동
// ==========================================
function setLanguage(langCode) {
    const targetLang = langData[langCode] ? langCode : 'ko';
    
    // ★ [근본 해결] 이 코드가 들어가야 index.css의 [lang="jp"] 속성이 켜지면서 Pretendard JP 서체가 구동됩니다.
    document.documentElement.lang = targetLang; 
    
    // HTML 내부의 모든 data-lang 요소를 찾아서 번역 데이터 주입
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (langData[targetLang][key]) {
            // br 태그 등 서식이 깨지지 않도록 innerHTML로 바인딩
            element.innerHTML = langData[targetLang][key];
        }
    });
    
    // 버튼의 시각적 active 클래스 반전 토글
    document.querySelectorAll('.lang-selector button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`lang-${targetLang}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // 유저 언어 기호 브라우저 기억 장치에 저장
    localStorage.setItem('preferred_lang', targetLang);
}

// 로딩 직후 세팅 실행
document.addEventListener("DOMContentLoaded", function() {
    const savedLang = localStorage.getItem('preferred_lang') || 'ko';
    setLanguage(savedLang);
});


// ==========================================
// 2. 메인 정보 탭 토글 및 Active 디자인 시스템
// ==========================================
function clearActiveTabs() {
    const tabs = document.querySelectorAll('.click > *');
    tabs.forEach(tab => tab.classList.remove('active'));
}

function showInfo1() {
    const info = document.getElementById('info1');
    const btn = document.querySelector('.click > *:nth-child(1)');
    
    if (info.style.display === 'block') {
        info.style.display = 'none';
        btn.classList.remove('active');
    } else {
        clearActiveTabs();
        info.style.display = 'block';
        btn.classList.add('active');
        document.getElementById('info2').style.display = 'none';
        document.getElementById('info3').style.display = 'none';
        document.getElementById('info4').style.display = 'none';
    }
}

function showInfo2() {
    const info = document.getElementById('info2');
    const btn = document.querySelector('.click > *:nth-child(2)');
    
    if (info.style.display === 'block') {
        info.style.display = 'none';
        btn.classList.remove('active');
    } else {
        clearActiveTabs();
        info.style.display = 'block';
        btn.classList.add('active');
        document.getElementById('info1').style.display = 'none';
        document.getElementById('info3').style.display = 'none';
        document.getElementById('info4').style.display = 'none';
    }
}

function showInfo3() {
    const info = document.getElementById('info3');
    const btn = document.querySelector('.click > *:nth-child(3)');
    
    if (info.style.display === 'block') {
        info.style.display = 'none';
        btn.classList.remove('active');
    } else {
        clearActiveTabs();
        info.style.display = 'block';
        btn.classList.add('active');
        document.getElementById('info1').style.display = 'none';
        document.getElementById('info2').style.display = 'none';
        document.getElementById('info4').style.display = 'none';
    }
}

function showInfo4() {
    const info = document.getElementById('info4');
    const btn = document.querySelector('.click > *:nth-child(4)');
    
    if (info.style.display === 'block') {
        info.style.display = 'none';
        btn.classList.remove('active');
    } else {
        clearActiveTabs();
        info.style.display = 'block';
        btn.classList.add('active');
        document.getElementById('info1').style.display = 'none';
        document.getElementById('info2').style.display = 'none';
        document.getElementById('info3').style.display = 'none';
    }
}


// ==========================================
// 3. 하단 동의 유의사항 레이어 팝업 제어 함수
// ==========================================
function showPopup() { document.getElementById('popup').style.display = 'flex'; }
function closePopup() { document.getElementById('popup').style.display = 'none'; }

function showPopup1() { document.getElementById('popup1').style.display = 'flex'; }
function closePopup1() { document.getElementById('popup1').style.display = 'none'; }

function showPopup2() { document.getElementById('popup2').style.display = 'flex'; }
function closePopup2() { document.getElementById('popup2').style.display = 'none'; }