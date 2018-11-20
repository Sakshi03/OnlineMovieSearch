import React from 'react';
import './App.css';


class App extends React.Component {
	constructor(){
    super();
		this.state={
      data:[],
      search:'',
      searchbylang: '',
      selectedLanguage: "all"
    }
    this.onChange=this.onChange.bind(this);
		
  }
  filteredMovies = [];
  availableLanguages = ['Language'];
  allMovies = [];
  
  languageOptions = () => {
    return this.availableLanguages.map((language, index) => { 
     return <option key={index} value={language}>{language}</option>
     })
  }
	componentDidMount(){
    fetch('http://starlord.hackerearth.com/movieslisting')
    .then((response)=>response.json())
    .then((response)=>{
        response.map((movie) => {
          console.log(movie.language)
            if(movie.language && this.availableLanguages.indexOf(movie.language) < 0) {
              this.availableLanguages.push(movie.language);
            }          
            return this.availableLanguages;
        });
        this.setState({data: response});
        this.allMovies = response;
      })
  
  }

  onChange(event){
    this.setState({search: event.target.value})
  }
  onLanguageChange = (event) => {
    let languageFilteredMovies;
    if(event.target.value === 'all'){
      languageFilteredMovies = this.allMovies;
    } else {
      languageFilteredMovies = this.allMovies.filter(movie => {
        return movie.language === event.target.value
      })
    }
    this.setState({
      data: languageFilteredMovies
    })
  }

render() {
  const {search}=this.state;
  this.filteredMovies=this.state.data.filter(movie=>{
    return movie.movie_title.toLowerCase().indexOf(search.toLowerCase()) !==-1
  })

    return (
      <div>
       <input type="text" placeholder="Search for Movies" onChange={this.onChange} className="searchMovies" />
       {
         this.availableLanguages ? (<select
          id="lang"
            name="lang"
            onChange={this.onLanguageChange}
            className="languageSelection">
          { this.languageOptions()}
         </select>): ''
       }
     { 
       this.state.data ?
       (this.filteredMovies.map((movie, index) => 
       <div key={index} className="flex-container">
       <div>MOVIE TITLE : {movie.movie_title}
       <div>DIRECTOR:  {movie.director_name}</div>
       <div>COUNTRY:   {movie.country}</div>
       <div>LANGUAGE: {movie.language} </div>
       <div>RATING: {movie.content_rating} </div>
       <div>GENRES: {movie.genres} </div>
       </div>
       </div>
       )) 
       :
       <h3>Data Loading</h3>
      }
      </div>
    );
  }
}
export default (App);