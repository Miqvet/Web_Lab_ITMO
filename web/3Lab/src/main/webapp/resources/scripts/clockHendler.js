const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
const date = document.querySelector('#text3d')
function synchroniseClock() {
    const d = new Date();
    const hr = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    const day = d.getDate();
    const hr_rotation = (30) * hr + min / (4);
    const min_rotation =(6) * min;
    const sec_rotation = 6 * sec;
    date.textContent = day.toString();
    hour.style.transform = `rotate(${hr_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;

}
window.onload = function () {
    synchroniseClock()
}
setInterval(synchroniseClock, 12000);