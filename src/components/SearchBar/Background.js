import React from 'react'
import Yelp from '../../util/Yelp'
import random from 'random-country-name'

class Background extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          businesses: [],
          url : ""
        };
        this.searchYelp = this.searchYelp.bind(this);
      }
      searchYelp(term, location, sortBy) {
        Yelp.search(term, location, sortBy)
        .then((businesses) => {
          this.setState({
            businesses: businesses
          })
        })
      }
      componentWillMount(){
        const country = random.random()
        console.log(country)
        this.searchYelp('food',`${country}`,'best_match')
      }
      findSrc(){
        const element = this.state.businesses[0]
        if(element!=null){
          console.log(element.imageSrc)
          this.state.url = element.imageSrc
          console.log(this.state.url)
        }else{
          this.state.url = "./background_search_desktop.jpg"
        }
      }
    render(){ 
        this.findSrc();
        return(
            <div style={{backgroundImage:`url(${this.state.url})`,backgroundSize:"cover"}}>
              {this.props.children}
            </div>
        )
    }

}

export default Background