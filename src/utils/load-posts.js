export const loadPosts = async () => {
  const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
  
  const [photos, posts] = await Promise.all([photosResponse, postsResponse])

  const photosJson = await photos.json()
  const postsJson = await posts.json()

  const photosAndPosts = await postsJson.map((post, index) => {
    return {...post, cover: photosJson[index].url}
  })

  return photosAndPosts
}