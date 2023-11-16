const form = document.getElementById('user-post');

const ul = document.getElementById('post-list')

function displayDetails(obj) {
    let li = document.createElement('li');
    li.id = obj.id;
    li.innerHTML = `${obj.title} +`;
    ul.appendChild(li);
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let content = document.getElementById('content').value;
    let obj = {
        title,
        author,
        content
    }
    try{
        let result = await axios.post('http://localhost:3000/add-post', obj);
        displayDetails(result.data);
        document.getElementById('user-post').reset();
    }
    catch{
        console.log('error - post error');
    }
})

window.addEventListener('DOMContentLoaded', async () => {
    try {
        let result = await axios.get('http://localhost:3000/get-post');
        result.data.forEach(blog => {
            displayDetails(blog);
        })
    }
    catch{
        console.log('error - get error')
    }
});