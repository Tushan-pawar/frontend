import React, { Component } from 'react';
import axios from 'axios';
import withRouter from "./with_router"

class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state={
        postId:this.props.params.id,
        comments:[]
    }
    }

componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/comments?postId=1'+this.state.postId)
    .then(response=>this.setState({

comments:response.data


    }))
}
  
  render() {
    return (
      <div>
<h1>Comments</h1> 


{
this.state.comments.map((c,index)=>
<div key={index}>
    {c.body} <br />
    By: {c.email}
    <br /><br />
</div>
)
}
</div>
)
}

}
export default withRouter(CommentComponent);