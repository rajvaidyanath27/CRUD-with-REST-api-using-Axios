import "../App.css";
import { useEffect, useState } from "react";  // useState and useEffect are React hooks
import { deletePost, getPost } from "../api/Postapi";  // getPost is a function to fetch data from an API

// This is the Posts component, where we'll display the posts fetched from an API
const Posts = () => {
  
  // useState hook to define a state variable 'data' and its setter function 'setData'
  // Initially, 'data' is an empty array, but it will be filled with fetched posts later
  const [data, setData] = useState([]);  
  
  // The function 'getPostData' will fetch the posts from the API
  const getPostData = async () => {
    // Calling the 'getPost' function to fetch data from the API
    const res = await getPost(); 
    
    // Logging the fetched data to the console (for debugging purposes)
    console.log(res.data);
    
    // After fetching the data, we update the 'data' state with the received posts
    setData(res.data);
  }

  // useEffect hook will run the 'getPostData' function when the component mounts (on initial render)
  useEffect(() => {
    getPostData();
  }, []);  // Empty array as second argument means it will only run once (on component mount)

  // handleDeletePost function will delete a post based on its ID
  const handleDeletePost = async (id) => {
    try {
      // Making the delete request to the API
      const res = await deletePost(id);

      // Check if the deletion was successful
      if (res.status === 200) {
        // Filter the posts and remove the post with the matching ID
        const newUpdatedPosts = data.filter((curPost) => {
          // Ensure both IDs are the same type before comparison
          return curPost.id !== id;
        });

        // Update the state with the filtered posts (excluding the deleted one)
        setData(newUpdatedPosts);
      } else {
        // If the API response status is not 200, log the error
        console.error('Failed to delete post', res.status);
      }
    } catch (error) {
      // Catch and log any errors from the delete operation
      console.error('Error while deleting post:', error);
    }
  };

  return (
    <section className="section-post">
      <ol>
        {/* Mapping over the data array to display posts */}
        {data.map((curElem) => {
          const { id, body, title } = curElem;  // Destructuring post properties
          return (
            <li key={id}>
              <p>Title: {title}</p>
              <p>Body: {body}</p>
              <button>Edit</button>
              <button className="btn-delete" onClick={() => handleDeletePost(id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Posts;

