window.onload=function(){let e=new IntersectionObserver(e=>{e.forEach(e=>{let t=e.target;e.isIntersecting&&e.intersectionRatio>0&&t.classList.add("visible")})},{root:null,rootMargin:"0px",threshold:1});document.querySelectorAll(".listitem").forEach(t=>{e.observe(t)})};