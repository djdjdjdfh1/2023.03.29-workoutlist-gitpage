const workoutForm = document.querySelector("#workout_form");
workoutForm.addEventListener("submit", handleWorkoutForm);

/* 서브밋 다루는 함수 */
function handleWorkoutForm(event) {
    event.preventDefault();

    const workoutText = document.querySelector("#workout_text");
    const workoutValue = workoutText.value;
    //innerHTMl이 아닌 value값에 "", 즉 빈칸을 줘야함
    workoutText.value= "";
    paintWorkout(workoutValue);
    
    // 저장 버튼의 히든 클래스 제거.classList.remove("hidden");
    saveForm.classList.remove("hidden");
}
/* 리스트 추가하는 함수 */
function paintWorkout(workoutValue) {
    const ul = document.querySelector("#workout_list");
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = workoutValue;
    const button = document.createElement("button");
    button.innerHTML = "X";

    ul.appendChild(li);
    li.appendChild(span);
    li.appendChild(button);

    button.addEventListener("click",deleteWorkout);
}
/* 리스트를 삭제하는 함수 */
function deleteWorkout(event) {
    const li = event.target.parentNode;
    li.remove();
}


/* 운동리스트를 로컬스토리지에 저장*/
// 날짜 제출 폼
const saveForm = document.querySelector("#workout_save");
saveForm.addEventListener("submit", saveWorkout);


let savedWorkoutList = [];

// 로컬스토리지에 리스트 추가저장하기
// 이 조건문을 안달면 리스트가 초기화돼서 추가해도 리셋됨
const savedList = localStorage.getItem("list");
if(savedList != null) {
    const parsedList = JSON.parse(savedList);
    savedWorkoutList = parsedList;
}

/* 저장하는 함수 */
function saveWorkout(event) {
    event.preventDefault();
    saveForm.lastElementChild.disabled = true;

    // 저장할 날짜 input값 변수설정
    const workoutDate = document.querySelector("#workout_date");

    // span 배열을 for문을 돌려서 값 출력
    // 배열 2개
    const span = document.querySelectorAll("span");
    let array = [];

    for(let i=0; i<span.length; i++) {
        // span[i]만 하면 dom이 들어가기에 안의 값만 가져오려면 innerHTML
        array.push(span[i].innerHTML);
    }
    
    savedWorkoutList.push(new Workout(workoutDate.value, array));
    
    function Workout(workoutDate, workoutList) {
    this.date = workoutDate;
    this.workout = workoutList;
    }
    
    localStorage.setItem("list",JSON.stringify(savedWorkoutList));
}

/* 날짜버튼 리스트 출력하는 함수 */
const listBtn = document.querySelector("#list-btn");
const dates = [];
if(savedList != null) {
    function dateList () {
    for(let i = 0; i<savedWorkoutList.length; i++){
        dates.push(savedWorkoutList[i].date);

        const button = document.createElement("button");
        const span = document.createElement("span");
        listBtn.appendChild(button);
        button.appendChild(span);
        button.innerHTML = savedWorkoutList[i].date;
        
        button.addEventListener("click", function() {
            savedWorkoutList[i].workout.forEach(paintWorkout); 
            saveForm.classList.remove("hidden");
        })
    }
    /*for(let j = 0; j<buttonList.length; j++) {
        buttonList[j].addEventListener("click", function() {
            savedWorkoutList[j].workout.forEach(paintWorkout); 
            saveForm.classList.remove("hidden");
        })
    }*/
  }
  dateList();
}

/* 로컬스토리지에서 리스트를 불러오는 함수 */
const workoutLoad = document.querySelector("#workout_load");
workoutLoad.addEventListener("submit", loadWorkout);

function loadWorkout(e) {
    e.preventDefault();

    const loadValue = workoutLoad.firstElementChild.value;
    workoutLoad.firstElementChild.value = "";

    // 콘솔로 타입확인
    console.log(typeof loadValue);
    console.log(typeof savedWorkoutList[1].date);

    for(let i =0; i<savedWorkoutList.length;i++) {
        if(savedWorkoutList[i].date === loadValue) {
            savedWorkoutList[i].workout.forEach(paintWorkout);
            saveForm.classList.remove("hidden");
        };
    }
}

/* 삭제하는 함수 */
const workoutDelete = document.querySelector("#workout_delete");
workoutDelete.addEventListener("submit", deleteList)

function deleteList(e) {
    e.preventDefault();

    const deleteValue = workoutDelete.firstElementChild.value;
    workoutDelete.firstElementChild.value= "";
    
    savedWorkoutList = savedWorkoutList.filter((item) => item.date !== deleteValue);
    localStorage.setItem("list",JSON.stringify(savedWorkoutList));
}

/*  dates 라는 배열을 만들어서 배열리스트를 화면에 출력하고
    버튼을 누르면 바로 운동목록을 띄우게끔 작성 */
// 리스트가 많아지면 overflow hidden 사용?