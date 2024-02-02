function searchPost() {
    const postIdInput = document.getElementById('postIdInput').value;

    if (!postIdInput || postIdInput < 1 || postIdInput > 100) {
      alert('Please enter a valid Post ID between 1 and 100.');
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${postIdInput}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Post not found for ID ${postIdInput}`);
        }
        return response.json();
      })
      .then(post => {
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = `
          <h2>Post ID: ${post.id}</h2>
          <h3>Title: ${post.title}</h3>
          <p>${post.body}</p>
          <button onclick="getComments(${post.id})">Get Comments</button>
        `;
      })
      .catch(error => {
        alert(`Error: ${error.message}`);
      });
  }

function getComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => response.json())
      .then(comments => {
        alert(`Comments for Post ID ${postId}:\n\n${JSON.stringify(comments, null, 2)}`);
      })
      .catch(error => {
        alert(`Error fetching comments: ${error.message}`);
      });
  }