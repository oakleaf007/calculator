  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('keydown', e=>{
      if(e.key === 'Enter' || e.key === ' '){ btn.click(); }
    });
  });

