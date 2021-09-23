'use-strict';


{
  const modalopen = document.querySelectorAll('.modalopen');
  const shut = document.getElementById('shut');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');
  
  modalopen.forEach((moda) => {
    moda.addEventListener('click',()=>{
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
    });
  });
  
  shut.addEventListener('click',()=>{
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });
  
  mask.addEventListener('click',()=>{
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });
}