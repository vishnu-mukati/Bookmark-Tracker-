function handleformadd(event) {
  // when the form is submited the event occurs
  event.preventDefault();
  
  let title = event.target.title.value;
  let link = event.target.link.value;
  
  let obj = {
    title,
    link,
  };
  
  axios
  .post(
      "https://crudcrud.com/api/9ff4c39bf4cd464c879a7e46e93f25fe/bookmarks",
      obj
    )
    .then((response) => {
        console.log(response);
        showuserscreen(response.data);
    })
    .catch((error) => {
        document.body.innerHTML =
        document.body.innerHTML + "<h4>Something gone wrong </h4>";
    });

    event.target.title.value = '';
    event.target.link.value = '';
}
    document.addEventListener("DOMContentLoaded", () => {
      // when the page is reload the dom content is load
  axios.get("https://crudcrud.com/api/9ff4c39bf4cd464c879a7e46e93f25fe/bookmarks")
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
  li.appendChild(deletebtn);

  deletebtn.addEventListener("click", function (event) {
    let id = event.target.parentElement.getAttribute("data-id");
    axios
      .delete(
        `https://crudcrud.com/api/9ff4c39bf4cd464c879a7e46e93f25fe/bookmarks/${id}`
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


  editbtn.addEventListener('click', function(event){
    let id = event.target.parentElement.getAttribute('data-id');
    axios.get(`https://crudcrud.com/api/9ff4c39bf4cd464c879a7e46e93f25fe/bookmarks/${id}`)
    .then((response)=>{
      console.log(response.data);
      let obj = response.data;
      let titlefield = document.getElementById('title');
      let linkfield = document.getElementById('link');

      titlefield.value = obj.title;
      linkfield.value = obj.link;
      
      axios.delete(`https://crudcrud.com/api/9ff4c39bf4cd464c879a7e46e93f25fe/bookmarks/${id}`)
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
