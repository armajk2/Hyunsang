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
    const firstDayOfMonth = date.getDay(); // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    let table = '<table class="calendar">';
    table += '<thead>';
    table += '<tr>';

    // 요일 헤더 생성 (실제 달력과 동일하게)
    for (let i = 0; i < 7; i++) {
      table += `<th>${weekdays[i]}</th>`;
    }
    table += '</tr>';
    table += '</thead>';
    table += '<tbody>';

    let count = 1;
    let isFirstRow = true; // 첫 번째 행 여부

    // 주간 단위로 행을 생성하여 첫 번째 날짜를 삽입
    while (count <= daysInMonth) {
      table += '<tr>';

      for (let i = 0; i < 7; i++) {
        if (isFirstRow && i < firstDayOfMonth) {
          // 첫 번째 행의 시작 요일 전까지 빈 셀 삽입
          table += '<td></td>';
        } else if (count > daysInMonth) {
          // 날짜가 초과되면 빈 셀 삽입
          table += '<td></td>';
        } else {
          // 실제 날짜 삽입
          if ((year < currentYear) || (year === currentYear && month < currentMonth) || (year === currentYear && month === currentMonth && count < currentDay)) {
            table += `<td class="past">${count}</td>`; // 과거 날짜
          } else if (year === currentYear && month === currentMonth && count === currentDay) {
            table += `<td class="today">${count}</td>`; // 오늘 날짜
          } else {
            if (count % 2 !== 0) {
              table += `<td class="odd-day">${count}</td>`; // 홀수 날짜를 선택할 수 없음
            } else {
              if (selectedDateElement && parseInt(selectedDateElement.textContent) === count) {
                table += `<td class="selected">${count}</td>`; // 선택된 날짜
              } else {
                table += `<td class="selectable">${count}</td>`; // 선택 가능한 날짜
              }
            }
          }
          count++;
        }
      }
      table += '</tr>';
      isFirstRow = false;
    }

    table += '</tbody>';
    table += '</table>';

    popupCalendar.innerHTML = table;

    // 달력 날짜 클릭 이벤트 처리
    const selectableDates = document.querySelectorAll('.selectable, .today');
    selectableDates.forEach(date => {
      date.addEventListener('click', function() {
        if (!this.classList.contains('past') && !this.classList.contains('weekend')) {
          const clickedDate = parseInt(this.textContent);
          const selectedDate = new Date(year, month - 1, clickedDate);

          if (selectedDateElement) {
            selectedDateElement.classList.remove('selected');
          }
          selectedDateElement = this;
          selectedDateElement.classList.add('selected');

          // 선택된 날짜 표시 업데이트
          selectedDate.setDate(selectedDate.getDate() + 1); // 선택된 날짜에 1일 추가
          const formattedDate = selectedDate.toISOString().split('T')[0]; // 클릭된 날짜를 포함한 ISO 형식의 날짜 생성
          showCalendarButton.textContent = formattedDate;

          // 달력 숨기기
          popupCalendar.style.display = 'none';
        }
      });
    });
  }

  // 초기화 함수 - 내일 날짜로 버튼 업데이트
  function updateButton() {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() ); // 오늘 날짜에 1일 추가하여 내일로 설정
    const formattedDate = tomorrowDate.toISOString().split('T')[0]; // 내일 날짜의 ISO 형식의 날짜 생성
    showCalendarButton.textContent = formattedDate; // "show-calendar" 버튼에 내일 날짜 표시
  }

  // 달력 표시 버튼 클릭 시 달력 표시
  showCalendarButton.addEventListener('click', function() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    popupCalendar.style.display = 'block';
    createCalendar(currentYear, currentMonth); // 현재 월의 달력 표시
  });

  // 페이지 로드 시 버튼 업데이트
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

document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('bookingForm');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  bookingForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = new FormData(bookingForm);

    // Customize your fetch URL here
    const url = 'https://script.google.com/macros/s/AKfycbwc_3jknr_WPVfCVSzPpe7rDLboe7A4CP6cIKYg5FCCzgIILA7OLfsUEFjO_EZtzBgz/exec';

    // Use fetch to send data asynchronously
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON response
    })
    .then(data => {
      // Handle JSON response here
      console.log('Response:', data);
      // Example: check if data contains success message or status
      if (data && data.result === 'success') {
        showSuccessMessage();
        bookingForm.reset(); // Reset form fields after successful submission
      } else {
        showErrorMessage();
      }
    })
    .catch(error => {
      // Handle fetch errors here
      console.error('Fetch Error:', error);
      showErrorMessage();
    });
  });

  // Function to show success message
  function showSuccessMessage() {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
  }

  // Function to show error message
  function showErrorMessage() {
    successMessage.style.display = 'none';
    errorMessage.style.display = 'block';
  }

  // Function to close the booking form (if needed)
  function closeBookingForm() {
    // Implement closing logic here
    console.log('Booking form closed.');
  }
});

function selectTime(time) {
  document.getElementById('selectedTime').value = time;
  document.getElementById('book').style.display = 'block';
}

function closeBookingForm() {
  document.getElementById('book').style.display = 'none';
}

function closeMessage() {
  var successDiv = document.getElementById('successMessage');
  var bookingDiv = document.getElementById('book');

  successDiv.style.display = 'none';
  bookingDiv.style.display = 'none';
}

function selectTime(time) {
  // Get the selected date from the calendar button text
  const selectedDateText = document.getElementById('show-calendar').textContent.trim();
  document.getElementById('selectedTime').value = time;
  document.getElementById('selectedDate').value = selectedDateText;
  document.getElementById('book').style.display = 'block';
}

const formData = new FormData(bookingForm);

