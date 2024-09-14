function handleformadd(event) {
  // when the form is submited the event occurs
  event.preventDefault();
  
  let title = event.target.title.value;
  let link = event.target.link.value;
  
  let obj = {
    title,
    link,
  };
  
  async function postrequest(){
     try{
      await axios
      .post(
          "https://crudcrud.com/api/bfcfbdbd5ad245199207b50702299b29/bookmarks",
          obj
        )

        .then((response) => {
            console.log(response);
            showuserscreen(response.data);
        })
        .catch((error) => {
            document.body.innerHTML =
            document.body.innerHTML + "<h4>Something gone wrong </h4>";
            console.log(error);
        });
     }catch(error){
        console.log(error);
     }
  }
  axios
  .post(
      "https://crudcrud.com/api/bfcfbdbd5ad245199207b50702299b29/bookmarks",
      obj
    )
    .then((response) => {
        console.log(response);
        showuserscreen(response.data);
    })
    .catch((error) => {
        document.body.innerHTML =
        document.body.innerHTML + "<h4>Something gone wrong </h4>";
        console.log(error);
    });

    event.target.title.value = '';
    event.target.link.value = '';
}
    document.addEventListener("DOMContentLoaded", () => {
      // when the page is reload the dom content is load
  axios.get("https://crudcrud.com/api/bfcfbdbd5ad245199207b50702299b29/bookmarks")
    .then((response) => {
        console.log(response);
        
        for (let i = 0; i < response.data.length; i++) {
            showuserscreen(response.data[i]);
        }
    })
    .catch((error) => {
        console.log(error);
    });
});


// show on the user screen
function showuserscreen(obj) {
  let li = document.createElement("li");

  listitem = document.createTextNode(`${obj.title} - `);

  li.appendChild(listitem);

  let ancor = document.createElement("a");

  ancor.href = obj.link;

  ancor.textContent = obj.link;

  ancor.target = "_black";

  li.appendChild(ancor);

  let ul = document.getElementById("userlist");
  ul.appendChild(li);

  // set attribute to the id with unique identifier
  li.setAttribute("data-id", obj._id);

  let deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  deletebtn.setAttribute('class','delete-btn');
  li.appendChild(deletebtn);

  deletebtn.addEventListener("click", function (event) {
    let id = event.target.parentElement.getAttribute("data-id");
    axios
      .delete(
        `https://crudcrud.com/api/bfcfbdbd5ad245199207b50702299b29/bookmarks/${id}`
      )
      .then((response) => {
        console.log(response);
        ul.removeChild(event.target.parentElement);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  let editbtn = document.createElement('button');
  editbtn.textContent = 'Edit';
  editbtn.setAttribute('class','edit-btn');


  editbtn.addEventListener('click', function(event){
    let id = event.target.parentElement.getAttribute('data-id');
    axios.get(`https://crudcrud.com/api/bfcfbdbd5ad245199207b50702299b29/bookmarks/${id}`)
    .then((response)=>{
      console.log(response.data);
      let obj = response.data;
      let titlefield = document.getElementById('title');
      let linkfield = document.getElementById('link');

      titlefield.value = obj.title;
      linkfield.value = obj.link;
      
      axios.delete(`https://crudcrud.com/api/bfcfbdbd5ad245199207b50702299b29/bookmarks/${id}`)
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      })
      ul.removeChild(event.target.parentElement);
    })
    .catch((error)=>{
      console.log(error);
    })
  })
  li.appendChild(editbtn);
}

