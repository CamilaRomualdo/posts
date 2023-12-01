import { Component } from 'react';

import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';

import './styles.css';
import { Input } from '../../components/Input/indedx';

export class Home extends Component {
  state = {
    allPosts: [],
    page: 0,
    posts: [],
    postsPerPage: 10,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const photosAndPosts = await loadPosts();
    this.setState({ 
      allPosts: photosAndPosts,
      posts: photosAndPosts.slice(page, postsPerPage)
    });
  }

  loadMorePosts = () => {
    const {     
      allPosts,
      page,
      posts,
      postsPerPage
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value});
  }

  render() {
    const { allPosts, page, posts, postsPerPage, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      }) 
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}
          <Input 
            handleChange={this.handleChange} 
            searchValue={searchValue} 
          />
        </div>
        
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        
        {filteredPosts.length === 0 && (
          <p>No more posts</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button 
              disabled={noMorePosts}
              onClick={this.loadMorePosts} 
              text="Load more posts" 
            />
          )}
        </div>
      </section>
      
    )
  }
}