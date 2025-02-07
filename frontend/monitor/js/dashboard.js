const btnAsistencia = document.getElementById('btnAsistencia');
const btnDashboard = document.getElementById('btnDashboard');
const btnCronograma = document.getElementById('btnCronograma');
const tablaAsistencia = document.getElementById('tablaAsistencia');
const tablaCronograma = document.getElementById('tablaCronograma');
const activityCard = document.getElementById('activity-card');
const activityDescription = document.getElementsByClassName('activity-description');
const dashBoardContentContainer = document.getElementById('dashboard-content-container');


btnCronograma.addEventListener('click',function(){
    if(tablaCronograma.style.display ==="none"){
        tablaCronograma.style.display = "block";
        activityCard.style.display = "none";
        tablaAsistencia.style.display = "none";
        dashBoardContentContainer.style.display = "none";
    }
})

btnDashboard.addEventListener('click',function(){
    if(dashBoardContentContainer.style.display ==="none"){
        dashBoardContentContainer.style.display = "block";
        activityCard.style.display = "block";
        tablaAsistencia.style.display = "none";
        tablaCronograma.style.display = "none";
    }
})

btnAsistencia.addEventListener('click',function(){
    if(tablaAsistencia.style.display ==="none"){
        tablaAsistencia.style.display = "block";
        activityCard.style.display = "none";
        dashBoardContentContainer.style.display = "none";
        tablaCronograma.style.display = "none";
    } 
})

document.querySelectorAll('.editable').forEach(cell =>{
    cell.addEventListener('click', ()=>{
        if(cell.innerHTML.trim() === ""){
            const input = document.createElement('input');
            input.type='text';
            input.placeholder = "Añadir actividad";

            cell.innerHTML = '';
            cell.appendChild(input);
            input.focus();

            input.addEventListener('blur', ()=>{
                cell.innerHTML = input.value;
            });
            input.addEventListener('keypress', (e)=>{
                if(e.key === 'Enter'){
                    cell.innerHTML = input.value;
                }
            });
        }
    });
})

document.querySelectorAll('menu-item').forEach(item=>{
    item.addEventListener('click', ()=>{
        document.querySelector('.menu-item').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('contenido').forEach(el =>el.classList.remove('active'));
        let targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    })
})

document.querySelectorAll('.asistencia').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        let nombre = this.closest('tr').querySelector('td').innerText;
        let estado = this.checked ? "Presente" : "Ausente";
        console.log(`${nombre}: ${estado}`);
    });
});