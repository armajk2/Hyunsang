// ==========================================
// 1. 다국어 제어 코어 시스템 & 글로벌 서체 강제 연동
// ==========================================
function setLanguage(langCode) {
    const targetLang = langData[langCode] ? langCode : 'ko';
    
    // ★ [근본 해결] 브라우저가 CSS의 [lang="jp"] 저격 규칙을 인지하도록 뼈대 언어 속성 동기화
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

    // 폼 인풋창 내부의 플레이스홀더(placeholder)도 실시간 다국어 번역 처리
    const placeholders = document.querySelectorAll('[data-lang-placeholder]');
    placeholders.forEach(input => {
        const key = input.getAttribute('data-lang-placeholder');
        if (langData[targetLang][key]) {
            input.placeholder = langData[targetLang][key];
        }
    });

    // 폼 인풋창 내부에 고정된 서비스 고정값 value (게임, 운동, 식사) 다국어 처리
    const values = document.querySelectorAll('[data-lang-val]');
    values.forEach(input => {
        const key = input.getAttribute('data-lang-val');
        if (langData[targetLang][key]) {
            input.value = langData[targetLang][key];
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
// 2. 글로벌 전역 변수 및 페이지 로드 초기화
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const popupCalendar = document.getElementById('popup-calendar');
    const showCalendarButton = document.getElementById('show-calendar');
    let selectedDateElement = null;

    // 현재 접속한 페이지가 '운동(sports)' 페이지인지 판단하는 플래그
    const isSportsPage = window.location.href.includes('sports.html');

    // [통합 달력 생성기]
    function createCalendar(year, month) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
        const daysInMonth = new Date(year, month, 0).getDate();
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

        // 달력 상단 제목 바 및 X 닫기 버튼 배치
        let calendarHtml = '<div class="calendar-header">';
        calendarHtml += `  <span class="calendar-title">${year}년 ${month}월</span>`;
        calendarHtml += '  <button type="button" class="calendar-close" id="close-calendar">&#10005;</button>';
        calendarHtml += '</div>';
        
        calendarHtml += '<table class="calendar"><thead><tr>';
        for (let i = 0; i < 7; i++) {
            calendarHtml += `<th>${weekdays[i]}</th>`;
        }
        calendarHtml += '</tr></thead><tbody>';

        let count = 1;
        let isFirstRow = true;

        while (count <= daysInMonth) {
            calendarHtml += '<tr>'; 
            
            for (let i = 0; i < 7; i++) {
                if (isFirstRow && i < firstDayOfMonth) {
                    calendarHtml += '<td></td>';
                } else if (count > daysInMonth) {
                    calendarHtml += '<td></td>';
                } else {
                    if ((year < currentYear) || (year === currentYear && month < currentMonth) || (year === currentYear && month === currentMonth && count < currentDay)) {
                        calendarHtml += `<td class="past">${count}</td>`;
                    } else if (year === currentYear && month === currentMonth && count === currentDay) {
                        calendarHtml += `<td class="today selectable">${count}</td>`;
                    } else {
                        // ★ [자동 분기] 운동 페이지이면서 홀수 날짜인 경우 선택 잠금
                        if (isSportsPage && count % 2 !== 0) {
                            calendarHtml += `<td class="odd-day past">${count}</td>`; 
                        } else {
                            if (selectedDateElement && parseInt(selectedDateElement.textContent) === count) {
                                calendarHtml += `<td class="selected selectable">${count}</td>`;
                            } else {
                                calendarHtml += `<td class="selectable">${count}</td>`;
                            }
                        }
                    }
                    count++;
                }
            }
            calendarHtml += '</tr>'; 
            isFirstRow = false;
        }

        calendarHtml += '</tbody></table>';
        popupCalendar.innerHTML = calendarHtml;

        document.getElementById('close-calendar').addEventListener('click', function(e) {
            e.stopPropagation(); 
            popupCalendar.style.display = 'none';
        });

        const selectableDates = document.querySelectorAll('.selectable');
        selectableDates.forEach(date => {
            date.addEventListener('click', function() {
                if (!this.classList.contains('past')) {
                    const clickedDate = parseInt(this.textContent);
                    const selectedDate = new Date(year, month - 1, clickedDate);

                    if (selectedDateElement) {
                        selectedDateElement.classList.remove('selected');
                    }
                    selectedDateElement = this;
                    this.classList.add('selected');

                    selectedDate.setDate(selectedDate.getDate() + 1); 
                    const formattedDate = selectedDate.toISOString().split('T')[0];
                    showCalendarButton.textContent = formattedDate;

                    popupCalendar.style.display = 'none'; 
                }
            });
        });
    }

    function updateButton() {
        const todayDate = new Date();
        const formattedDate = todayDate.toISOString().split('T')[0];
        showCalendarButton.textContent = formattedDate;
    }

    showCalendarButton.addEventListener('click', function() {
        const today = new Date();
        popupCalendar.style.display = 'block'; 
        createCalendar(today.getFullYear(), today.getMonth() + 1);
    });

    updateButton();
});


// ==========================================
// 3. 구글 스프레드시트 비동기 예약 폼 전송
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const url = 'https://script.google.com/macros/s/AKfycbyhbL3BfSSgyCIDro7c8lykROv6RFmhYj95XPzOMcFjZJCvweKgnYeTPRhuEypRj1SI/exec';

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const formData = new FormData(bookingForm);

            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response error');
                return response.json();
            })
            .then(data => {
                if (data && data.result === 'success') {
                    // 완료되면 예약 입력 창은 끄고 성공 메시지만 띄움
                    document.getElementById('bookModal').style.display = 'none'; 
                    successMessage.style.display = 'block'; 
                    errorMessage.style.display = 'none';
                    bookingForm.reset(); 
                } else {
                    errorMessage.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                errorMessage.style.display = 'block';
            });
        });
    }
});


// ==========================================
// 4. 모달 및 캐로셀 공통 유틸리티 함수
// ==========================================
function selectTime(time) {
    const selectedDateText = document.getElementById('show-calendar').textContent.trim();
    document.getElementById('selectedTime').value = time;
    document.getElementById('selectedDate').value = selectedDateText;
    
    // 원본 구조 아이디인 'bookModal' 상자를 열어줍니다.
    document.getElementById('bookModal').style.display = 'block'; 
}

function closeBookingForm() {
    document.getElementById('bookModal').style.display = 'none';
}

function closeMessage() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('bookModal').style.display = 'none';
}

function scrollCarousel(direction) {
    const container = document.getElementById('carouselContainer');
    const scrollAmount = 272; // 스포츠 파일 수치와 통일
    
    if (direction === 1) {
        container.scrollLeft += scrollAmount;
    } else if (direction === -1) {
        container.scrollLeft -= scrollAmount;
    }
}