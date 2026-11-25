const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('visible')),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('enrolForm').addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(e.target);
  const msg=`Assalamu alaikum, I would like to enrol.\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nClass: ${d.get('class')}\nMessage: ${d.get('message')||'-'}`;
  document.getElementById('formOk').classList.add('show');
  // TODO: replace 27000000000 with Madressa WhatsApp number, then uncomment:
  // window.open(`https://wa.me/27000000000?text=${encodeURIComponent(msg)}`,'_blank');
  console.log(msg);
});
