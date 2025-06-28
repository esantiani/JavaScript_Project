const accordion = document.getElementsByClassName  /*grabs all elements in class */
('contentBx');

for (i=0; i<accordion.length; i++) {                             /*loop to open and close */
    accordion[i].addEventListener('click',function(){            /* refers to contentbx that was clicked */
        this.classList.toggle('active')
    })
}


