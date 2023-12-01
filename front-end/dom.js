const form = document.getElementById('user-post');

const ul = document.getElementById('post-list')

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
    try {
        let result = await axios.post('http://localhost:3000/add-blog ', obj);
        console.log(result.data);
        displayDetails(result.data);
        document.getElementById('user-post').reset();
    }
    catch {
        console.log('error - post error');
    }
})

async function showBlog(id) {
    try {
        console.log(id);
        let result = await axios.get(`http://localhost:3000/get-blog/${id}`);
        console.log(result.data);
        let comment = await axios.get(`http://localhost:3000/get-comments/${id}`);
        document.getElementById(id).innerHTML = `${result.data.title} <button type='button' class='button' onclick='shortBlog(${id}, "${result.data.title}")'> - </button><br>
        Author - ${result.data.author}<br>
        ${result.data.content}<br>
        <div><input type="text" id=input${id} name="comment" placeholder="comment here" style="padding-left: 10px;"><button id="comment" class="commentButton" style="padding-bottom: 10px;" onclick="postComment(${id})">send</button></div>`
        
        const div = document.createElement("div");
        div.id = `div${result.data.id}`
        comment.data.forEach((c) => {
            let li = document.createElement('li');
            li.id = `delete${c.id}`;
            //console.log(result);
            li.innerHTML = `<div>${c.comment}<button onclick="deleteComment(${c.id})">Delete</button></div>`
            div.appendChild(li);
        })
        document.getElementById(id).appendChild(div);


        //console.log(result.data);
        //displayDetails(result.data);
        //console.log(expandBlog);
        //expandBlog.classList.add("expand")
        //expandBlog.innerHTML =`<div><input type="text" name="comment" placeholder="comment here" style="padding-left: 10px;"><button id="comment" class="commentButton" style="padding-bottom: 10px;" onclick="displayCommet()">send</button></div>`
    }
    catch {
        console.log('error - post error');
    }
}

function shortBlog(id, title){
    const li = document.getElementById(`${id}`);
    li.innerHTML = `<div>${title} <button type='button' class="button" onclick='showBlog(${id})'> + </button></div>`;
}



async function postComment(id) {

    //console.log(id)
    try {
        const comment = document.getElementById(`input${id}`).value
        //console.log('hii' + comment);

        const result = await axios.post(`http://localhost:3000/add-comment`, { comment, id })
        console.log(result)
        //console.log(result.comment);


        let li = document.createElement('li');
        li.id = `delete${result.data.id}`;
        //console.log(result);
        li.innerHTML = `<div>${result.data.comment}<button onclick="deleteComment(${result.data.id})">Delete</button></div>`
        const div = document.getElementById(`div${id}`)
        div.appendChild(li);
    }
    catch (error) {
        console.error('Error:', error.message);
        console.log('Error occurred while adding the comment.');
    }
}

async function deleteComment(id) {
    console.log('hii' + id)
    try {
        var result = await axios.get(`http://localhost:3000/delete-comment/${id}`)
        console.log(result)
        document.getElementById(`delete${id}`).remove();
    }
    catch {
        console.log('error - get error')
    }
}

function displayDetails(object) {
    let li = document.createElement('li');
    li.id = object.id;
    li.classList.add("firstLi")
    li.innerHTML = `<div>${object.title} <button type='button' class="button" onclick='showBlog(${object.id})'> + </button></div>`;
    ul.appendChild(li);

}

/*li.addEventListener('+', async (event) => {
    event.preventDefault();
    blogDetail = obj;  
})*/

window.addEventListener('DOMContentLoaded', async () => {
    try {
        let result = await axios.get('http://localhost:3000/get-blogs');
        console.log(result)
        console.log(result.data)
        result.data.forEach((blog) => {
            console.log(blog);
            displayDetails(blog);
        })
    }
    catch {
        console.log('error - get error')
        console.error('Error occurred while fetching or processing data.');
    }
});