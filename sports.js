document.addEventListener("DOMContentLoaded", function() {
  const popupCalendar = document.getElementById('popup-calendar');
  const showCalendarButton = document.getElementById('show-calendar');
  let selectedDateElement = null;

  function createCalendar(year, month) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const date = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = date.getDay();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    let table = '<table class="calendar">';

    // Header
    table += '<tr>';
    for (let day of weekdays) {
      table += `<th>${day}</th>`;
    }
    table += '</tr>';

    // Days
    let count = 0;
    let day = 1;
    while (count < daysInMonth) {
      table += '<tr>';
      for (let i = 0; i < 7; i++) {
        if ((count >= firstDayOfMonth || i > 0) && count < daysInMonth) {
          if ((year < currentYear) || (year === currentYear && month < currentMonth) || (year === currentYear && month === currentMonth && day < currentDay)) {
            table += `<td class="past">${day}</td>`; // 과거 날짜
          } else if (year === currentYear && month === currentMonth && day === currentDay) {
            table += `<td class="today">${day}</td>`; // 오늘 날짜
          } else {
            if (selectedDateElement && selectedDateElement.textContent === day.toString()) {
              table += `<td class="selected">${day}</td>`; // 선택된 날짜
            } else {
              table += `<td class="selectable">${day}</td>`; // 선택 가능한 날짜
            }
          }
          day++;
        } else {
          table += '<td></td>';
        }
        count++;
      }
      table += '</tr>';
    }
    table += '</table>';

    popupCalendar.innerHTML = table;

    // Add event listeners to selectable dates
    const selectableDates = document.querySelectorAll('.selectable, .today'); // 오늘 날짜도 선택 가능하도록 클래스 추가
    selectableDates.forEach(date => {
      date.addEventListener('click', function() {
        if (!this.classList.contains('past')) { // 과거 날짜인지 확인
          const clickedDate = parseInt(this.textContent); // 클릭된 날짜
          const selectedDate = new Date(year, month - 1, clickedDate);

          if (selectedDateElement) {
            selectedDateElement.classList.remove('selected');
          }
          selectedDateElement = this;
          selectedDateElement.classList.add('selected');

          // "show-calendar" 버튼에 선택한 날짜 표시
          selectedDate.setDate(selectedDate.getDate() + 1); // 선택한 날짜에서 1일을 더함
          const formattedDate = selectedDate.toISOString().split('T')[0]; // 클릭된 날짜를 포함한 ISO 형식의 날짜 생성
          showCalendarButton.textContent = formattedDate;

          // 달력 숨기기
          popupCalendar.style.display = 'none';
        }
      });
    });
  }

  // Update button text to tomorrow's date on page load
  function updateButton() {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1); // 오늘 날짜에 1을 더하여 다음 날짜로 설정
    const formattedDate = tomorrowDate.toISOString().split('T')[0]; // 다음 날짜의 ISO 형식의 날짜 생성
    showCalendarButton.textContent = formattedDate; // "show-calendar" 버튼에 다음 날짜 표시
  }

  // Show calendar popup when button is clicked
  showCalendarButton.addEventListener('click', function() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    popupCalendar.style.display = 'block';
    createCalendar(currentYear, currentMonth); // 현재 월
  });

  // Update button text on page load
  updateButton();
});

///예약창뜨게하기

function openbook() {
  document.getElementById('book').style.display = 'block';
}

function closeBookingForm() {
  document.getElementById('book').style.display = 'none';
}

function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
