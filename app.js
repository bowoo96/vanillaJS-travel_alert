// 국가명을 적고 검색 버튼을 누르면
// input.value와 국가명이 같은 정보를 요청

// 정보를 넣어줄 Element
const formEl = document.querySelector("form");
const flagEl = document.querySelector(".national-flag>img");
const nameKrEl = document.querySelector(".country-name-kr");
const isoEl = document.querySelector(".country-iso");
const nameEnEl = document.querySelector(".country-name-en");
const nameEl = document.querySelector(".continent-name");
const alarmEl = document.querySelector(".alarm-lvl");
const noticeEl = document.querySelector('.notice');

// form에 이벤트 걸어주는 함수
formEl.addEventListener('submit',addSearchData);

// 서버에서 데이터를 가져와 출력하는 함수
function addSearchData (event){
    event.preventDefault();

    // input value 가져와서 변수로 담기
    let inputValue = document.querySelector('.search > input').value;

    // inputValue를 가진 데이터 서버에서 호출
    fetch(`http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?ServiceKey=ewBFpDoyqaqI1Tcmr2r8oXSmIW6JyeV%2BWiK%2FbJVohnj7YQkO%2FR9mMVifVO%2B3cHnvdI8%2F9zhaDgljvyxF8qDFIQ%3D%3D&numOfRows=1&pageNo=1&cond[country_nm::EQ]=${inputValue}`)
    .then( response => {
        // response의 body를 바로 사용할 수 없어서, json을 사용해서 promise객체로 변환
        const json = response.json();
        return json;
    })
    .then( json => {

        // 호출된 데이터 정보를 변수에 담기
        const flagData = json.data[0].flag_download_url;
        const nameKrData = json.data[0].country_nm;
        const isoData = json.data[0].country_iso_alp2;
        const nameEnData = json.data[0].country_eng_nm;
        const nameData = json.data[0].continent_eng_nm;
        const alarmData = json.data[0].alarm_lvl;
        
        // CSS : flag 이미지 엑박 none으로 감춘걸 이미지가 들어가면서 block으로 변환, error로 변한 스타일 다시 초기화.
        flagEl.style.display = "block";
        noticeEl.style.color = "#000";

        // 호출된 데이터 html에 넣어주기.
        flagEl.src = flagData;
        nameKrEl.innerHTML = nameKrData;
        isoEl.innerHTML = isoData;
        nameEnEl.innerHTML = nameEnData;
        nameEl.innerHTML = nameData;

        // alarmData의 호출된 데이터값에 따라서 출력.
        if(alarmData == null){
            alarmEl.innerHTML = "특별여행주의보"
        }else{
            alarmEl.innerHTML = alarmData;
        }
    })
    .catch( error => { // 한글로 검색을 안했을 때 에러 처리
        return noticeEl.style.color = "red";
    })
}


